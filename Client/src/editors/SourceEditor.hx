package editors;

import haxe.ui.containers.Box;
import project.Resource;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/editors/source-editor.xml"))
class SourceEditor extends Box {
    private var _resource:Resource;
    
    public function new(resource:Resource = null) {
        super();
        _resource = resource;
        this.content = resource.content;
        
        editor.onChange = function(e) {
            _resource.content = content;
            _resource.dirty = true;
        }
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
