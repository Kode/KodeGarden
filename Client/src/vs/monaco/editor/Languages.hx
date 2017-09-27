package vs.monaco.editor;

@:native("monaco.languages")
extern class Languages {
    public static function register(config:Dynamic):Void;
    public static function setMonarchTokensProvider(id:String, syntax:Dynamic):Void;
}