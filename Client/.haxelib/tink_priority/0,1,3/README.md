# Tink Prioritization

This is a very simple utility for prioritizing items in a queue. Mostly used for plugin handling in `tink_lang`.

Often you have the need to run a number of things in specific order. Say you have routines A, B and C, possibly from different libraries, that should be run in that order. C was written first. Now somebody else publishes A, knowing of C and knowing that they need to run first. Then the author of B publishes his code, knowing that it must run before C and after A.

Please note that nowhere it is checked that the items that a specific items needs to be queued after or before actually exist.

## The Queue

And this is what the priority queue looks like:

```
abstract Queue<T> {
	public function new():Void
	
	public function add(item:Item<T>, ?pos:haxe.PosInfos):Void;
	
	public function whenever(data:T, ?id:ID, ?pos:haxe.PosInfos):Void;
	public function before(s:Selector<T>, data:T, ?id:ID, ?pos:haxe.PosInfos):Void;
	public function after(s:Selector<T>, data:T, ?id:ID, ?pos:haxe.PosInfos):Void;
	public function between(before:Selector<T>, after:Selector<T>, data:T, ?id:ID, ?pos:haxe.PosInfos):Void;
	
	public function iterator():Iterator<T>;
	public function getData(?optimistic:Bool = true):Array<T>;
	@:to function toArray():Array<T>;
}
```

While this is an item:

```
typedef Item<T> = {
	data: T,
	?id: ID,
	?before: Selector<T>,
	?after: Selector<T>,
}
```

Generally you will probably get the job done with `before` and `after` and `between`. But you can construct the item by hand and add it directly.

The `id` is what identifies your item. Note how all registration methods accept `haxe.PosInfos` which is filled with the call site by the Haxe compiler. If you omit the `ID` it will be constructed from the position information.

Generally you will add items and then at some time `getData` to get the ordered data or alternatively iterate over the queue. Currently there is only an optimistic implementation which doesn't deal with the fact that the input data could be contradictory.

## Simple use case

This is how we can put it to use:

```
package core;

import tink.priority.Queue;

class Boot {
	static public var queue(default, never):Queue<Void->Void>;
	static function __init__()
		queue = new Queue();
}

package lib_c;

class C {
	static function __init__() 
		core.Boot.queue.whenever(setup);
		
	static function setup() trace('setting up C');
}

package lib_a;

class A {
	static function __init__() 
		core.Boot.queue.before('lib_c.C', setup);
	
	static function setup() trace('setting up A');
}

package lib_b;

class B {
	static function __init__() 
		core.Boot.queue.between('lib_a.A', 'lib_c.C', setup);
	
	static function setup() trace('setting up B');
}

package ;

class Main {
	static function main() {
		for (f in core.Boot.queue) f();//setting up A, setting up B, setting up C
	}
}
```

In general you can use this in any situation where some application event occurs, that many parts of the app can respond to, but you need to maintain some order.

You can also make this asynchronous and what not.

```
var q:Queue<Event->Future<Option<Result>>> = new Queue();

function dispatch(e:Event):Future<Option<Result>> {
	var ret = Future.sync(None);
	for (handler in q)
		ret = ret.flatMap(function (result) return switch result {
			case Some(result): Future.sync(Some(result));
			case None: handler(e);
		});
	return ret;
}
```

With this set up we can dispatch an event to a queue of handlers, each of which can asynchronously return an optional result and as soon as we have a result, we propagate that. Note that because of the lazyness of futures you have to actually handle the future for anything to happen.

## Identification

To identify items, we use the following IDs:

```
abstract ID {
	public var cls(get, never):String;
	public var method(get, never):Null<String>;
	
	public function new(cls:String, ?method:String):Void;
	
	@:to public function toString():String;
	
	@:from static function ofString(s:String):ID;
	@:from static function ofPosInfos(pos:PosInfos):ID;
}
```

As you can see, we use class names and methods to identify items (all the while method names are optional).
Note that the string representation is `"path.to.Class::method"`.

The idea of using class names is that they have to be unique in Haxe projects and sticking to this convention should do the trick. The value of `cls` doesn't *have to be* a class and certainly the value of `method` doesn't have to be an existing method name, but can be something descriptive instead. Just make sure it is unique and easy to remember. 

## Selectors

To match against other items we use selectors, defined as follows

```
abstract Selector<T> from Item<T>->Bool {
	
	public function matches(item:Item<T>)
		return this != null && this(item);

	@:from static function ofString<A>(s:String):Selector<A>;
	@:from static function ofRegex<A>(e:EReg):Selector<A>;
	
	@:op(a && b) static function and<A>(a:Selector<A>, b:Selector<A>):Selector<A>
		return function (x)
			return a.matches(x) && b.matches(x);
}
```

A selector made of a string will check whether the string representation of the id starts with said string. So for example `'haxe.io'` will match anything registered from the `haxe.io` package. Similarly, a regex selector will also match against the string representation of the id.