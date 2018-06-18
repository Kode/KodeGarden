package vs.monaco.editor;

@:native("IStandaloneCodeEditor")
extern class StandaloneCodeEditor {
    public function getValue():String;
    public function setValue(value:String):Void;
    public function layout(size:Dynamic):Void;
    public function onKeyDown(fn:Dynamic):Dynamic;
    public function onKeyUp(fn:Dynamic):Dynamic;
    public function getModel():Dynamic;
}