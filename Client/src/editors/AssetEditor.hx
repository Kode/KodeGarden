package editors;

import haxe.ui.containers.Box;
import haxe.ui.containers.TabView;
import project.Resource;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/editors/asset-editor.xml"))
class AssetEditor extends Box {
    private var _resource:Resource;
    
    public function new(resource:Resource = null, tabs:TabView = null) {
        super();
        _resource = resource;
    }
}