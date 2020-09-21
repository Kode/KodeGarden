package editors;

import haxe.ui.containers.VBox;
import haxe.ui.events.UIEvent;
import project.Resource;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/editors/shader-editor.xml"))
class ShaderEditor extends VBox implements IEditor {
    public function new() {
        super();
    }
    
    @:bind(editor, UIEvent.CHANGE)
    private function onEditorChange(e) {
        if (_resource.content != editor.text) {
            dirty = true;
            _resource.content = editor.text;
            dispatch(new UIEvent(UIEvent.CHANGE));
        }
    }
    
    private var _dirty:Bool = false;
    private var dirty(get, set):Bool;
    private function get_dirty():Bool {
        return _dirty;
    }
    private function set_dirty(value:Bool):Bool {
        if (value == _dirty) {
            return value;
        }
        
        _dirty = value;
        _resource.dirty = value;
        
        if (_dirty == true && StringTools.endsWith(this.text, "*") == false) {
            this.text += "*";
        } else if (_dirty == false  && StringTools.endsWith(this.text, "*") == true) {
            this.text = this.text.substr(0, this.text.length - 1);
        }
        
        return value;
    }
    
    private var _resource:Resource = null;
    public var resource(get, set):Resource;
    private function get_resource():Resource {
        return _resource;
    }
    private function set_resource(value:Resource):Resource {
        _resource = value;
        editor.text = _resource.content;
        return value;
    }
}