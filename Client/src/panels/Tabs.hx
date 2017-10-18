package panels;

import custom.MonacoEditor;
import editors.AssetEditor;
import editors.ShaderEditor;
import editors.SourceEditor;
import haxe.ui.containers.Box;
import haxe.ui.core.Component;
import project.IProjectListener;
import project.Project;
import project.Resource;
import project.ResourceType;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/panels/tabs.xml"))
class Tabs extends Component implements IProjectListener {
    public function new() {
        super();
        
        resources.onBeforeChange = function(e) {
            if (resources.selectedPage == null) {
                return;
            }

            var selectedEditor = resources.selectedPage.findComponent(MonacoEditor, true);
            if (selectedEditor != null && selectedEditor.dirty == true) {
                Project.instance.inject(resources.selectedButton.text, selectedEditor.text);
                selectedEditor.dirty = false;
            }
        }
        
        resources.onChange = function(e) {
            if (resources.selectedPage == null) {
                return;
            }
            
            Project.instance.activeResource = resources.selectedPage.userData;
        }
    }
    
    public function removeAllTabs() {
        resources.removeAllTabs();
    }
    
    public function projectResourceAdded(resource:Resource):Void {
        var editor:Box = null;
        
        switch (resource.type) {
            case ResourceType.SOURCE:
                editor = new SourceEditor(resource.content);
            case ResourceType.SHADER:    
                editor = new ShaderEditor(resource.content);
            case ResourceType.ASSET:
                editor = new AssetEditor();
            case _:    
        }
        
        if (editor != null) {
            editor.percentWidth = editor.percentHeight = 100;
            editor.text = resource.name;
            editor.icon = resource.icon;
            editor.userData = resource;
            resources.addComponent(editor);
        }
    }
    
    public function activeResourceChanged(resource:Resource):Void {
        var index = indexFromResource(resource);
        if (index != -1) {
            resources.pageIndex = index;
        }
    }
    
    private function indexFromResource(resource:Resource):Int {
        var index = -1;
        
        var n = 0;
        for (page in resources.pages) {
            if (page.userData == resource) {
                index = n;
                break;
            }
            n++;
        }
        
        return index;
    }
}