package dialogs;

import haxe.ui.containers.dialogs.Dialog;
import haxe.ui.events.KeyboardEvent;
import haxe.ui.events.UIEvent;
import project.Project.AddResourceParams;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/dialogs/add-resource.xml"))
class AddResourceDialog extends Dialog {
    
    public var addResourceParams:AddResourceParams = null;
    
    public function new() {
        super();
        
        buttons = DialogButton.CANCEL | "Confirm";
    }
    
    @:bind(resourceType, UIEvent.CHANGE)
    private function onResourceType(e) {
        errorContainer.hide();
        updateUI();
    }
    
    @:bind(sourceName, KeyboardEvent.KEY_DOWN)
    @:bind(shaderName, KeyboardEvent.KEY_DOWN)
    @:bind(assetName, KeyboardEvent.KEY_DOWN)
    private function onKeyDown(e:KeyboardEvent) {
        if (e.keyCode == 13) {
            hideDialog("Confirm");
        }
    }
    
    public var contextPath(null, set):String;
    private function set_contextPath(value:String):String {
        sourceName.text = value;
        shaderName.text = value;
        assetName.text = value;
        return value;
    }
    
    public var type(null, set):String;
    private function set_type(value:String):String {
        if (value == null) {
            return value;
        }
        switch (value.toLowerCase()) {
            case "source" | "sources":
                resourceType.selectedIndex = 0;
            case "shader" | "shaders":
                resourceType.selectedIndex = 1;
            case "asset" | "assets":
                resourceType.selectedIndex = 2;
        }
        return value;
    }
    
    private override function validateDialog(button:DialogButton, fn:Bool->Void) {
        addResourceParams = null;
        errorContainer.hide();
        if (button == "Confirm") {
            var errorMessage = null;
            switch (resourceType.selectedItem.text) {
                case "Source":
                    if (sourceName.text == null || StringTools.trim(sourceName.text).length == 0) {
                        errorMessage = "Enter source filename";
                    }
                case "Shader":
                    if (shaderName.text == null || StringTools.trim(shaderName.text).length == 0) {
                        errorMessage = "Enter shader filename";
                    }
                case "Asset":    
                    if (assetName.text == null || StringTools.trim(assetName.text).length == 0) {
                        errorMessage = "Enter asset filename";
                    }
            }
            if (errorMessage != null) {
                errorText.text = errorMessage;
                errorContainer.show();
                AnimationUtil.shake(this);
                fn(false);
            } else {
                switch (resourceType.selectedItem.text) {
                    case "Source":
                        addResourceParams = {
                            type: resourceType.selectedItem.text,
                            filename: sourceName.text,
                            template: sourceTemplate.selectedItem.text
                        }
                    case "Shader":
                        addResourceParams = {
                            type: resourceType.selectedItem.text,
                            filename: shaderName.text,
                            template: shaderTemplate.selectedItem.text,
                            subType: shaderType.selectedItem.text
                        }
                    case "Asset":    
                        addResourceParams = {
                            type: resourceType.selectedItem.text,
                            filename: assetName.text,
                            file: assetName.file
                        }
                }
                fn(true);
            }
        } else {
            fn(true);
        }
    }
    
    private function updateUI() {
        switch (resourceType.selectedItem.text) {
            case "Source":
                showSourceComponents(true);
                showShaderComponents(false);
                showAssetComponents(false);
                sourceName.focus = true;
            case "Shader":
                showSourceComponents(false);
                showShaderComponents(true);
                showAssetComponents(false);
                shaderName.focus = true;
            case "Asset":
                showSourceComponents(false);
                showShaderComponents(false);
                showAssetComponents(true);
                //assetName.focus = true;
        }
    }
    
    private function showSourceComponents(show:Bool = true) {
        sourceTemplateLabel.hidden = !show;
        sourceTemplate.hidden = !show;
        sourceNameLabel.hidden = !show;
        sourceName.hidden = !show;
    }
    
    private function showShaderComponents(show:Bool = true) {
        shaderTemplateLabel.hidden = !show;
        shaderTemplate.hidden = !show;
        shaderNameLabel.hidden = !show;
        shaderNameContainer.hidden = !show;
    }
    
    private function showAssetComponents(show:Bool = true) {
        assetNameLabel.hidden = !show;
        assetNameContainer.hidden = !show;
    }
}