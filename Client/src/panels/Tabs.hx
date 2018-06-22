package panels;

import custom.MonacoEditor;
import editors.AssetEditor;
import editors.ShaderEditor;
import editors.SourceEditor;
import haxe.ui.containers.Box;
import haxe.ui.core.Component;
import haxe.ui.util.Timer;
import project.IProjectListener;
import project.Project;
import project.Resource;
import project.ResourceType;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/panels/tabs.xml"))
class Tabs extends Component implements IProjectListener implements IListener {
    public function new() {
        super();
        
        EventDispatcher.instance.registerListener(this);
        
        resources.onBeforeChange = function(e) {
            if (resources.selectedPage == null) {
                return;
            }
            
            Project.instance.saveAll();
        }
        
        resources.onChange = function(e) {
            if (resources.selectedPage == null) {
                return;
            }
            
            Project.instance.activeResource = resources.selectedPage.userData.resource;
        }
    }
    
    public function projectRefreshed() {
    }
    
    public function onEvent(event:EventType, data:Any) {
        if (event == EventType.NAVIGATION_CHANGED) {
            var resource:Resource = data;
            Timer.delay(function() { // <------ HACK!
                var index = indexFromResource(resource);
                if (index != -1) {
                    resources.pageIndex = index;
                }
            }, 100);
            
        }
    }
      
    public function removeAllTabs() {
        resources.removeAllPages();
    }
    
    public function projectResourceAdded(resource:Resource):Void {
        var editor:Box = null;
        
        switch (resource.type) {
            case ResourceType.SOURCE:
                editor = new SourceEditor(resource, resources);
            case ResourceType.SHADER:    
                editor = new ShaderEditor(resource, resources);
            case ResourceType.ASSET:
                editor = new AssetEditor(resource, resources);
            case _:    
        }
        
        if (editor != null) {
            editor.percentWidth = editor.percentHeight = 100;
            editor.text = resource.name;
            editor.icon = resource.icon;
            editor.userData = { resource: resource, index: resources.pageCount };
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
            if (page.userData.resource == resource) {
                index = n;
                break;
            }
            n++;
        }
        
        return index;
    }
}