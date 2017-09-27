package vs.monaco.editor;

@:native("IStandaloneCodeEditor")
extern class StandaloneCodeEditor {
    public function getValue():String;
    public function setValue(value:String):Void;
    public function layout(size:Dynamic):Void;
}