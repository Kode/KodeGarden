package editors;

import haxe.ui.containers.VBox;
import project.Resource;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/editors/image-editor.xml"))
class ImageEditor extends VBox implements IEditor {
    public function new() {
        super();
    }
    
    private var _resource:Resource = null;
    public var resource(get, set):Resource;
    private function get_resource():Resource {
        return _resource;
    }
    private function set_resource(value:Resource):Resource {
        _resource = value;
        return value;
    }
}