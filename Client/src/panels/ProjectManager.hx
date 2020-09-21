package panels;

import custom.TreeView.TreeViewEvent;
import custom.TreeView.TreeViewNode;
import haxe.ui.containers.VBox;
import haxe.ui.events.MouseEvent;
import project.IProjectListener;
import project.Project;
import project.Resource;
import project.ResourceType;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/panels/project-manager.xml"))
class ProjectManager extends VBox implements IProjectListener implements IListener { 
    public static var instance:ProjectManager;
    
    public function new() {
        super();
        ProjectManager.instance = this;
        EventDispatcher.instance.registerListener(this);
    }
    
    @:bind(addResourceButton, MouseEvent.CLICK)
    private function onAddResource(e) {
        MainView.instance.startAddResource();
    }

    @:bind(projectTree, TreeViewEvent.NODE_SELECTED)
    private function onNodeSelected(e:TreeViewEvent) {
        var resource:Resource = cast(e.node.userData, Resource);
        if (resource == null || resource.type == ResourceType.FOLDER || resource.type == ResourceType.UNKNOWN) {
            return;
        }
        Project.instance.activeResource = resource;
        EventDispatcher.instance.dispatchEvent(EventType.NAVIGATION_CHANGED, resource);
    }

    @:bind(projectTree, TreeViewEvent.NODE_RIGHT_CLICK)
    private function onNodeRightClicked(e:TreeViewEvent) {
        if (projectTree.selectedNode == null || projectTree.selectedNode.expandable == false) {
            return;
        }
        var contextPath = projectTree.selectedNode.nodePath;
        var parts = contextPath.split("/");
        if (parts[parts.length - 1].indexOf(".") != -1) {
            parts.pop();
        }
        
        var type = parts[1];
        parts.shift();
        parts.shift();
        contextPath = "";
        if (parts.length > 0) {
            contextPath = parts.join("/") + "/";
        }
    }
    
    private var _firstLoad:Bool = true;
    private var _root:TreeViewNode = null;
    public function projectRefreshed() {
        if (_root == null) {
            _root = projectTree.addNode("Kha Project", "icons/folder.png", true);
            _root.expand();
        }
        //_root.clear();
        for (r in Project.instance.resourcesRoot.flatten()) {
            projectResourceAdded(r);
            if (_firstLoad == true && r.fullName == "Sources/Main.hx") {
                projectTree.selectedNode = _root.findNodeByPath("Sources/Main.hx");
            }
        }
        
        if (_firstLoad == true) {
            _firstLoad = false;
        }
    }
    
    public function projectResourceAdded(resource:Resource):Void {
        if (_root == null) {
            _root = projectTree.addNode("Kha Project", "icons/folder.png", true);
            _root.expand();
        }

        var node = _root.findNodeByPath(resource.fullName);
        if (node == null) {
            var isExpandable = false;
            if (resource.type == ResourceType.FOLDER) {
                isExpandable = true;
            }
            node = _root.addNodeByPath(resource.fullName, resource.icon, isExpandable);
            node.userData = resource;
            if (node.nodeDepth <= 3) {
                node.expandPath();
            }
        }
    }
    
    public function activeResourceChanged(resource:Resource):Void {
        if (_root != null) {
            var node = _root.findNodeByPath(resource.fullName);
            if (node != null) {
                node.expandPath();
                projectTree.selectedNode = node;
            }
        }
    }
    
    public function onEvent(event:EventType, data:Any) {
        
    }
}