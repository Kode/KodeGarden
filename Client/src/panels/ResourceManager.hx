package panels;

import haxe.ui.core.Component;
import haxe.ui.util.Timer;
import project.IProjectListener;
import project.Project;
import project.Resource;
import project.ResourceType;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/panels/resource-manager.xml"))
class ResourceManager extends Component implements IProjectListener implements IListener {
    public static var instance:ResourceManager;
    
    public function new() {
        super();
        
        ResourceManager.instance = this;
        
        EventDispatcher.instance.registerListener(this);
        
        resourceTree.onChange = function(e) {
            Project.instance.activeResource = resourceTree.selectedNode.userData;
            
            EventDispatcher.instance.dispatchEvent(EventType.NAVIGATION_CHANGED, resourceTree.selectedNode.userData);
        }
    }
    
    private var _loaded:Bool = false;
    public function projectRefreshed() {
        resourceTree.clear();
        for (r in Project.instance.resourcesRoot.flatten()) {
            resourceTree.addNode(r.fullName, r.icon).userData = r;
        }
        _loaded = true;
    }
    
    public function projectResourceAdded(resource:Resource):Void {
        if (_loaded == false) {
            return;
        }
        
        resourceTree.clear();
        for (r in Project.instance.resourcesRoot.flatten()) {
            resourceTree.addNode(r.fullName, r.icon).userData = r;
        }
    }

    public function activeResourceChanged(resource:Resource):Void {
        /*
        Timer.delay(function() { // <------ HACK! 
            resourceTree.findNode(resource.fullName).select(); 
        }, 100); 
        */
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