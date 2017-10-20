package editors;

import haxe.ui.containers.Box;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/editors/source-editor.xml"))
class SourceEditor extends Box {
    public function new(content:String = "") {
        super();
        this.content = content;
    }
    
    public var content(get, set):String;
    private function get_content():String {
        return editor.text;
    }
    private function set_content(value:String):String {
        editor.text = value;
        return value;
    }
}
