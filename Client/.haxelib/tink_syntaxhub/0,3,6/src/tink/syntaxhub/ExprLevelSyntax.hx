package tink.syntaxhub;

import haxe.ds.Option;
import haxe.macro.Expr;
import tink.macro.ClassBuilder;
import tink.priority.ID;

import tink.priority.Queue;

using tink.MacroApi;

class ExprLevelSyntax {
  public var inward(default, null):Queue<ExprLevelRule>;  
  public var outward(default, null):Queue<ExprLevelRule>;  
  public var id(default, null):ID;
  
  public function new(id) {
    this.inward = new Queue();
    this.outward = new Queue();
    this.id = id;
  }
  
  public function appliedTo(c:ClassBuilder):Option<Expr->Expr> {
    function getRelevant(q:Queue<ExprLevelRule>)
      return [for (p in q.getData()) if (p.appliesTo(c)) p];
      
    var inward = getRelevant(inward),
        outward = getRelevant(outward);
        
    if (inward.length + outward.length == 0)
      return None;
      
    function apply(e:Expr) 
      return 
        if (e == null || e.expr == null) e;
        else 
          switch e.expr {
            case EMeta( { name: ':diet' }, _): e;
            default: 
              for (rule in inward)
                e = rule.apply(e);
                
              e = e.map(apply);
              
              for (rule in outward)
                e = rule.apply(e);
                
              e;
          }    
          
    return Some(apply);    
  }
}

typedef ExprLevelRule = {
  function appliesTo(c:ClassBuilder):Bool;
  function apply(e:Expr):Expr;
}