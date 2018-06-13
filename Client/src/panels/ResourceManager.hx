package panels;

import haxe.ui.core.Component;
import haxe.ui.util.Timer;
import project.IProjectListener;
import project.Project;
import project.Resource;
import project.ResourceType;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/panels/resource-manager.xml"))
class ResourceManager extends Component implements IProjectListener implements IListener {
    public function new() {
        super();
        
        EventDispatcher.instance.registerListener(this);
        
        resourceList.onChange = function(e) {
            //Project.instance.activeResource = resourceList.selectedItem.data.resource;
        }
        
        resourceTree.onChange = function(e) {
            Project.instance.activeResource = resourceTree.selectedNode.userData;
            
            EventDispatcher.instance.dispatchEvent(EventType.NAVIGATION_CHANGED, resourceTree.selectedNode.userData);
        }
    }
    
    public function projectResourceAdded(resource:Resource):Void {
        resourceList.dataSource.add({name: resource.fullName, icon: resource.icon, resource: resource});
        if (resourceList.selectedIndex == -1) {
            resourceList.selectedIndex = 0;
        }

        resourceTree.clear();
        for (r in Project.instance.resourcesRoot.flatten()) {
            resourceTree.addNode(r.fullName, r.icon).userData = r;
        }
    }
    
    public function activeResourceChanged(resource:Resource):Void {
        var index = indexFromResource(resource);
        if (index != -1) {
            //resourceList.selectedIndex = index;
        }
        Timer.delay(function() { // <------ HACK!
            resourceTree.findNode(resource.fullName).select();
        }, 100);
    }
    
    private function indexFromResource(resource:Resource):Int {
        var index = -1;
        
        for (i in 0...resourceList.dataSource.size) {
            if (resourceList.dataSource.get(i).resource == resource) {
                index = i;
                break;
            }
        }
        
        return index;
    }
    
    public function onEvent(event:EventType, data:Any) {
        if (event == EventType.NAVIGATION_CHANGED) {
            var resource:Resource = data;
            trace(resource.fullName);
            resourceTree.findNode(resource.fullName).select();
            //trace();
        }
    }
}