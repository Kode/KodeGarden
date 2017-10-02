package dialogs;

import haxe.ui.core.Component;
import haxe.ui.containers.dialogs.Dialog;
import haxe.ui.containers.dialogs.DialogButton;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/dialogs/add-resource.xml"))
class AddResourceDialog extends Component {
    public function new() {
        super();
        percentWidth = 100;
        
        resourceTypeSelector.onChange = function(e) {
            updateUI();
        }

        cancelButton.onClick = function(e) {
            findAncestor(Dialog).close("cancel");
        }

        confirmButton.onClick = function(e) {
            errorContainer.hide();

            switch (resourceType) {
                case "Source":
                    if (sourceFile.text == null || StringTools.trim(sourceFile.text).length == 0) {
                        error.text = "Please name your source.";
                        errorContainer.show();
                    } else if (sourceFile.text.length >= 44) {
                        error.text = "Please use a shorter source name.";
                        errorContainer.show();
                    } else if (Main.sourceList.indexOf(sourceFile.text) != -1 || Main.sourceList.indexOf(sourceFile.text + ".hx") != -1) {
                        error.text = "Source already exists.";
                        errorContainer.show();
                    }

                case "Shader":
                    var name = shaderFile.text + shaderType.text;
                    if (shaderFile.text == null || StringTools.trim(shaderFile.text).length == 0) {
                        error.text = "Please name your shader.";
                        errorContainer.show();
                    } else if (shaderFile.text.length >= 44) {
                        error.text = "Please use a shorter shader name.";
                        errorContainer.show();
                    } else if (Main.shaderList.indexOf(name) != -1) {
                        error.text = "Shader already exists.";
                        errorContainer.show();
                    }

                case "Asset":
                    if (assetFile.file == null || assetFile.file.name == null || StringTools.trim(assetFile.file.name).length == 0) {
                        error.text = "Please select an asset.";
                        errorContainer.show();
                    } else if (Main.assetList.indexOf(assetFile.file.name) != -1) {
                        error.text = "Asset already exists.";
                        errorContainer.show();
                    }
            }

            if (errorContainer.hidden == true) {
                findAncestor(Dialog).close("confirm");
            }
        }
    }
    
    private function updateUI() {
        if (resourceTypeSelector.selectedItem == null) {
            return;
        }
        
        errorContainer.hide();

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