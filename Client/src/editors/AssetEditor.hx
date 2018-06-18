package editors;

import haxe.ui.containers.Box;
import project.Resource;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/editors/asset-editor.xml"))
class AssetEditor extends Box {
    private var _resource:Resource;
    
    public function new(resource:Resource = null) {
        super();
        _resource = resource;
    }
}