package tink.syntaxhub;

import haxe.macro.Context;
import haxe.macro.Expr;

import haxe.ds.Option;
import tink.core.Lazy;
import tink.priority.Queue;

using sys.FileSystem;
using tink.MacroApi;

enum IncludeKind {
  KImport(i:ImportExpr);
  KUsing(u:TypePath);
}

class FrontendContext {
  var types:Array<TypeDefinition>;
  public var name(default, null):String;
  public var pack(default, null):Array<String>;
  
  var dependencies:Array<String>;
  var includes:Array<{ kind: IncludeKind, pos:Position }>;
  
  function new(name, pack) {
    types = [];
    dependencies = [];
    includes = [];
    
    this.name = name;
    this.pack = pack;
  }
  
  public function getType(?name:String, ?orCreate:Lazy<TypeDefinition>) {
    if (name == null)
      name = this.name;
      
    for (t in types) {
      if (t.name == name) return t;
    }
    
    var ret = 
      if (orCreate != null) orCreate.get();
      else macro class { };
      
    ret.name = name;
    ret.pack = this.pack;
    
    types.push(ret);
    
    return ret;
  }
  
  public function addDependency(file:String)
    this.dependencies.push(file);
    
  public function addImport(name:String, mode:ImportMode, pos:Position)     
    includes.push({
      pos: pos,
      kind: KImport({
        mode: mode,
        path: [for (p in name.split('.')) {
          name: p,
          pos: pos,
        }]
      })
    });
  
  public function addUsing(name:String, pos:Position) 
    includes.push( {
      pos: pos,
      kind: KUsing(name.asTypePath())
    });
  
  static public var plugins(default, null) = new Queue<FrontendPlugin>();
  
  static function buildModule(pack:Array<String>, name:String) {
    var ret = new FrontendContext(name, pack);
    
    for (result in seekFile(pack, name, plugins.getData())) {
      ret.addDependency(result.file);
      result.plugin.parse(result.file, ret);
    }
    
    return ret;
  }
  static public function seekFile<T:FrontendPlugin>(pack:Array<String>, name:String, plugins:Iterable<T>) {
    var ret = [];
    for (cp in Context.getClassPath()) {
      var fileName = '$cp/${pack.join("/")}/$name';
      for (p in plugins) 
        for (ext in p.extensions()) {
          var candidate = '$fileName.$ext';
          if (candidate.exists()) 
            ret.push({ file: candidate, plugin: p });
        }
    }
    return ret;
  }
  
  static function moduleForType(name:String) {
    if (name.indexOf('__impl') != -1 || plugins.getData().length == 0) return None;
    var pack = name.split('.');
    var name = pack.pop();
    var actual = pack.concat(['__impl', name]).join('.');
    var exists = 
      try {
        Context.getModule(actual);
        true;
      }
      catch (e:Dynamic) false;
    
    if (!exists) {
      var module = buildModule(pack, name);
      if (module.types.length == 0) return None;
      
      var imports = [],
          usings = [];
          
      for (d in module.includes)
        switch d.kind {
          case KImport(i):
            imports.push(i);
          case KUsing(u):
            var ct = TPath(u);
            (macro @:pos(d.pos) ([][0] : $ct)).typeof().sure();
            usings.push(u);  
        }
        
      Context.defineModule(actual, module.types, imports, usings);
      for (d in module.dependencies)
        Context.registerModuleDependency(actual, d);
    }  
    return Some(actual);
  }
  
  static var cache;
  static public function resetCache()
    cache = new Map();
    
  @:noDoc
  static public function findType(name:String):TypeDefinition 
    return 
      if (cache.exists(name))
        cache[name];
      else 
        cache[name] =           
          switch moduleForType(name) {
            case Some(actual):
              var pack = name.split('.');
              var name = pack.pop();
              {
                pack: pack,
                name: name, 
                pos: Context.currentPos(),
                fields: [],
                kind: TDAlias(actual.asComplexType())
              }
            case None: 
              null;
          }
    
}