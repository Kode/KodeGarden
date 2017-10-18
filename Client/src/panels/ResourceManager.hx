package panels;

import haxe.ui.core.Component;
import project.IProjectListener;
import project.Project;
import project.Resource;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/panels/resource-manager.xml"))
class ResourceManager extends Component implements IProjectListener {
    public function new() {
        super();
        
        resourceList.onChange = function(e) {
            Project.instance.activeResource = resourceList.selectedItem.data.resource;
        }
    }
    
    public function projectResourceAdded(resource:Resource):Void {
        resourceList.dataSource.add({name: resource.name, icon: resource.icon, resource: resource});
        if (resourceList.selectedIndex == -1) {
            resourceList.selectedIndex = 0;
        }
    }
    
    public function activeResourceChanged(resource:Resource):Void {
        var index = indexFromResource(resource);
        if (index != -1) {
            resourceList.selectedIndex = index;
        }
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
}