# Tinkerbell Syntax Hub
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000)](https://gitter.im/haxetink/public)

As you add more and more macros to a code base, they begin stepping onto each others feet. The issue in fact arose a lot in the development of `tink_lang` which for a long time had its own plugin in system to make it perform its magic in an orderly fashion. This plugin system has been extracted and expanded to `tink_syntaxhub` which provides a plugin architecture for 4 things:
	
1. A plugin point for additional macro based frontends
2. A plugin point for expression level syntax sugar
3. A plugin point for class wide build macros
4. A plugin point for macros that need to modify just the main function

With the advent of `haxe.macro.Compiler.addGlobalMetadata` it is possible to define global build macros and that is what `tink_syntaxhub` does: register one global build macro that runs all of the plugins in an orderly fashion.

## Basic structure

The syntax hub is organized on `tink_priority` queues, which in allow for plugins to take priority over one another. This still means that if two libraries conflict, one of them must resolve the conflict by registering its steps so they no longer conflict with those of the other library (by either running sooner or later or whatever). While not perfect, it is a step forward from having to make changes for both libraries, possibly introducing more dependencies. Being based on `tink_priority`, a dependency is only loosely expressed against IDs, which are just arbitrary strings, although they should reflect fully qualified class names - they in fact do this by default.

## Additional macro based frontends

By using `haxe.macro.Context.onTypeNotFound`, you can add additional frontends to the haxe compiler. With `tink_syntaxhub` this should turn out a little less raw. A frontend is expressed like so:

```haxe
interface FrontendPlugin {
	function extensions():Iterator<String>;
	function parse(file:String, context:FrontendContext):Void;
}
```

There's not much to it. Before we go into detail and look at what a FrontendContext is, let's have an example.

### Example Frontend

Let's build our own silly frontend! One that takes text files and turns them into classes with one static property.

```haxe
import tink.syntaxhub.*;
import haxe.macro.Expr;
import haxe.macro.Context;

class TxtFrontend implements FrontendPlugin {
	
	public function new() {}
	
	public function extensions() 
		return ['txt'].iterator();
	
	public function parse(file:String, context:FrontendContext):Void {
		
		var text = sys.io.File.getContent(file);
		var pos = Context.makePosition({ file: file, min: 0, max: text.length });
		
		context.getType().fields.push({
			name: 'TEXT',
			access: [AStatic, APublic],
			kind: FProp('default', 'null', macro : String, macro $v{text}),
			pos: pos,
		});
	}
	static function use()
		tink.SyntaxHub.frontends.whenever(new TxtFrontend());
}
```

Put a `HelloWorld.txt` in your classpath and compile this with `haxe --macro TxtFrontend.use() -main Main --interp` :
	
```haxe
class Main {
	static function main()
		trace(HelloWorld.TEXT);
}
```

Et voila! Awesome sauce! So hey, why not do the same for XMLs?

```haxe
import tink.syntaxhub.*;
import haxe.macro.Expr;
import haxe.macro.Context;

class XmlFrontend implements FrontendPlugin {
	
	public function new() {}
	
	public function extensions() 
		return ['xml'].iterator();
		
	public function parse(file:String, context:FrontendContext):Void {
		
		var text = sys.io.File.getContent(file);
		var pos = Context.makePosition({ file: file, min: 0, max: text.length });
		
		try
			Xml.parse(text)
		catch (e:Dynamic)
			Context.error('Failed to parse $file because: $e', pos);
		
		context.getType().fields.push({
			name: 'XML',
			access: [AStatic, APublic],
			kind: FProp('default', 'null', macro : Xml, macro Xml.parse($v{text})),
			pos: pos,
		});
	}
	static function use()
		tink.SyntaxHub.frontends.whenever(new XmlFrontend());
}
```

Add a `HelloWorld.xml` in your classpath and this time compile with `haxe --macro TxtFrontend.use() --macro XmlFrontend.use() -main Main --interp`:
	
```haxe
class Main {
	static function main() {
		trace(HelloWorld.TEXT);
		trace(HelloWorld.XML);
	}
}
```

So now both frontends affect the same class. That was easy, right? You can use the tests to see a working setup.

### The Frontend API

Let's recall what a frontend is:
	
```haxe
interface FrontendPlugin {
	function extensions():Iterator<String>;
	function parse(file:String, context:FrontendContext):Void;
}
```

When the compiler cannot find a specific file, the syntax hub looks through all classpaths looking for files that have extensions matching any of the registered frontends and then leaves the parsing to said frontends. In the above example, we asked for `HelloWorld`, for which no `.hx` file exists. The two frontends jumped in and declared the class and each added a static field to it.

Now to understand *how* a frontend would do its work, we need to know what `FrontendContext` is. A context represents an interface to building the module that was not found by the Haxe compiler. This is what it looks like:

```haxe
class FrontendContext {

	public var name(default, null):String;
	public var pack(default, null):Array<String>;
	
	public function getType(?name:String, ?orCreate:tink.core.Lazy<TypeDefinition>):TypeDefinition;
	
	public function addDependency(file:String):Void;
	public function addImport(name:String, mode:ImportMode, pos:Position):Void;
	public function addUsing(name:String, pos:Position):Void;
}
```

First we have the name and the package of the module beeing processed. The last three calls are also quite self explanatory, assuming you are familiar with `haxe.macro.Context`. The little magic there is, is in `getType`, which if no name is supplied gets the module's main type. If the requested type was not yet created, you get to create one with the `orCreate` argument. It defaults to `macro class {}` but you may find more complex use cases.

### Registering Frontends

You register a `FrontendPlugin` on the `tink.SyntaxHub.frontends` priority queue. No magic here.

### Implement frontend as class level macro

The suggested way of implementing a frontend is to actually by pushing down the heavy lifting to a class level macro. So instead of constructing the whole class in your `FrontendPlugin` it is wiser to generate an empty class with a `@:build` directive that then fills the class. This approach leads to more understandable error messages and also helps to reduce loops.

## Expression level syntax sugar

Under `tink.SyntaxHub.exprLevel` you will find an object defined like this:

```haxe
class ExprLevelSyntax {
	public var inward(default, null):Queue<ExprLevelRule>;	
	public var outward(default, null):Queue<ExprLevelRule>;	
	public var id(default, null):ID;
}

typedef ExprLevelRule = {
	function appliesTo(c:ClassBuilder):Bool;
	function apply(e:Expr):Expr;
}
```

First, let's examine what an `ExprLevelRule` is. That's where you plugin in your magic. The `appliesTo` method should tell `tink_syntaxhub` whether the rule should be applied to the current class, and if so, `apply` is given practically every expression found in that class. For example all `tink_lang` syntax rules implement their `appliesTo` function with `c.target.meta.has(':tink')`. Your implementation of `appliesTo` should not cause side effects if possible.

Now, what's the `inward` and `outward` stuff all about? When the rules are applied, complex expressions are first traversed inward, i.e. from the outside to the inside or from the root to the leafs if you will, and then back outward. This nuance becomes particularly interesting when certain syntaxes are being nested into one another.

## Class level syntax sugar

You will find `tink.SyntaxHub.classLevel` to define a `Queue<ClassBuilder->Bool>`. All registered plugins are called in order of priority and if none of them returns `true`, then the class will be considered unmodified and the build macro will thus return `null`.

In this queue, there is already one item under the the same ID as `tink.SyntaxHub.exprLevel.id`. Use that to either run before or after expression level plugins.

## Modifying the main function

This is no doubt the least spectacular bit. You will find `tink.SyntaxHub.mainTransform` to define a `Queue<Expr->Expr>`, which passes the main functions body to each plugin in order of priority. Nothing fancy, but very handy!
