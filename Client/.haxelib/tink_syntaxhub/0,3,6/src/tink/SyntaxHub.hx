package tink;

import haxe.macro.*;
import haxe.macro.Expr;
import haxe.ds.Option;

import tink.macro.ClassBuilder;

import tink.priority.Queue;
import tink.syntaxhub.*;

using tink.CoreApi;
using haxe.macro.Tools;

class SyntaxHub {
  
  static var MAIN:Null<String> = null;
  static function use() {
    var args = Sys.args();
    
    MAIN =
      switch [args.indexOf('-main'), args.indexOf('-x')] {
        case [-1, -1]: null;
        case [v, -1] | [_, v]: args[v+1];
      }
      
    FrontendContext.resetCache();
    Context.onTypeNotFound(FrontendContext.findType);
    Compiler.addGlobalMetadata('', '@:build(tink.SyntaxHub.build())', true, true, false);
  }
  
  static function build():Array<Field>
    return 
      switch Context.getLocalType() {
        case null: null;
        case TInst(_.get() => c, _):
        
          var builder = new ClassBuilder();
          
          var changed = false;
          
          for (plugin in classLevel.getData())
            changed = plugin(builder) || changed;
            
          changed = applyMainTransform(builder) || changed;
          
          if (changed) 
            builder.export(builder.target.meta.has(':explain'));
          else
            null;
        default: null;
      }
  
  static public var classLevel(default, null) = new Queue<ClassBuilder->Bool>();
  static public var exprLevel(default, null) = new ExprLevelSyntax('tink.SyntaxHub::exprLevel');
  static public var transformMain(default, null) = new Queue<Expr->Expr>();  
  
  static public var frontends(get, never):Queue<FrontendPlugin>;
  
    static inline function get_frontends()
      return FrontendContext.plugins;
  
  static public function makeSyntax(rule:ClassBuilder->Option<Expr->Expr>):ClassBuilder->Bool
    return function (ctx:ClassBuilder) 
      return switch rule(ctx) {
        case Some(rule):
          
          function transform(f:Function)
            if (f.expr != null)
              f.expr = rule(f.expr);
              
          if (ctx.hasConstructor())
            ctx.getConstructor().onGenerate(transform);
            
          for (m in ctx)
            switch m.kind {
              case FFun(f): transform(f);
              case FProp(_, _, _, e), FVar(_, e): 
                if (e != null)
                  e.expr = rule(e).expr;//TODO: it might be better to just create a new kind, rather than modifying the expression in place
            }
            
          true;
        case None: 
          false;
      }
  
  static function applyMainTransform(c:ClassBuilder)
    return
      if (c.target.pack.concat([c.target.name]).join('.') == MAIN) {
        var main = c.memberByName('main').sure();
        var f = main.getFunction().sure();
        
        if (f.expr == null)
          f.expr = macro @:pos(main.pos) { };
          
        for (rule in transformMain)
          f.expr = rule(f.expr);
        
        true;
      }
      else false;
  
  static var INITIALIZED = {
    classLevel.whenever(makeSyntax(exprLevel.appliedTo), exprLevel.id);
    true;
  }
}