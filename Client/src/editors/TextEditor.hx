package editors;

import haxe.ui.components.Button;
import haxe.ui.containers.Box;
import haxe.ui.containers.TabView;
import project.IResourceListener;
import project.Resource;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/editors/text-editor.xml"))
class TextEditor extends Box implements IResourceListener {
    private var _resource:Resource;
    private var _tabs:TabView;
    
    public function new(resource:Resource = null, tabs:TabView = null) {
        super();
        _resource = resource;
        _tabs = tabs;
        this.content = resource.content;
        
        _resource.addListener(this);
        
        editor.onChange = function(e) {
            _resource.content = content;
            _resource.dirty = true;
        }
    }
    
    public function onDirtyChanged() {
        var index:Int = this.userData.index;
        if (index >= 0) {
            var tabContainer:Box = _tabs.findComponent("tabbar-contents");
            var button:Button = cast tabContainer.getComponentAt(index);
            if (_resource.dirty == true && StringTools.endsWith(button.text, "*") == false) {
                button.text += "*";
            } else if (_resource.dirty == false && StringTools.endsWith(button.text, "*") == true) {
                button.text = button.text.substr(0, button.text.length - 1);
            }
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