package vs.monaco.editor;

@:native("require")
extern class Require {
    public static function config(config:Dynamic):Void;
    
    public static inline function require(modules:Array<String>, cb:Void->Void):Void {
        untyped __js__("require({0}, {1})", modules, cb);
    }
}