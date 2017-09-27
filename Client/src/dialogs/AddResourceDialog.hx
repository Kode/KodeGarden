package dialogs;

import haxe.ui.core.Component;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/dialogs/add-resource.xml"))
class AddResourceDialog extends Component {
    public function new() {
        super();
        percentWidth = 100;
        
        resourceTypeSelector.onChange = function(e) {
            updateUI();
        }
    }
    
    private function updateUI() {
        if (resourceTypeSelector.selectedItem == null) {
            return;
        }
        
        switch(resourceTypeSelector.selectedItem.value) {
            case "Source":
                sourceGroup.show();
                shaderGroup.hide();
                assetGroup.hide();
            case "Shader":
                sourceGroup.hide();
                shaderGroup.show();
                assetGroup.hide();
            case "Asset":
                sourceGroup.hide();
                shaderGroup.hide();
                assetGroup.show();
        }
    }
    
    public var resourceType(get, set):String;
    private function get_resourceType():String {
        return resourceTypeSelector.text;
    }
    private function set_resourceType(value:String):String {
        resourceTypeSelector.text = value;
        
        for (i in 0...resourceTypeSelector.dataSource.size) {
            var item = resourceTypeSelector.dataSource.get(i);
            if (item.value == value) {
                resourceTypeSelector.selectedIndex = i;
                break;
            }
        }
        
        updateUI();
        return value;
    }
}