package editors;

import haxe.ui.containers.Box;
import project.Resource;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/editors/shader-editor.xml"))
class ShaderEditor extends Box {
    private var _resource:Resource;
    
    public function new(resource:Resource = null) {
        super();
        _resource = resource;
        this.content = resource.content;
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
