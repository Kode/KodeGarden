package panels;

import editors.ImageEditor;
import editors.ShaderEditor;
import editors.SourceEditor;
import haxe.ui.containers.Box;
import haxe.ui.containers.VBox;
import haxe.ui.events.UIEvent;
import project.IProjectListener;
import project.Project;
import project.Resource;
import project.ResourceType;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/panels/tab-manager.xml"))
class TabManager extends VBox implements IProjectListener implements IListener {
    public static var instance:TabManager = null;    
    
    public function new() {
        super();
        
        instance = this;
        
        EventDispatcher.instance.registerListener(this);
    }
    
    public var activeEditor(get, null):IEditor;
    private function get_activeEditor():IEditor {
        return cast(resources.selectedPage, IEditor);
    }
    
    @:bind(resources, UIEvent.CHANGE)
    private function onTabChange(e) {
        if (resources.selectedPage == null) {
            return;
        }
        
        var resource:Resource = cast(resources.selectedPage.userData, Resource);
        Project.instance.activeResource = resource;
    }
    
    public function projectRefreshed() {
        
    }
    
    public function projectResourceAdded(resource:Resource):Void {
        /*
        var editor:Box = null;
        
        switch (resource.type) {
            case ResourceType.SOURCE:
                //editor = new SourceEditor(resource, resources);
                //editor = new SourceEditor_OLD();
                editor = new SourceEditor();
                cast(editor, SourceEditor).content = resource.content;
                trace("here");
                //cast(editor, SourceEditor_OLD).content = resource.content;
            case ResourceType.SHADER:    
                //editor = new ShaderEditor(resource, resources);
                editor = new ShaderEditor();
            case ResourceType.ASSET:
                editor = new AssetEditor(resource, resources);
            case _:    
        }
        
        if (editor != null) {
            //editor.percentWidth = editor.percentHeight = 100;
            editor.text = resource.name;
            editor.icon = resource.icon;
            editor.userData = { resource: resource, index: resources.pageCount };
            resources.addComponent(editor);
        }
        */
    }
    
    public function activeResourceChanged(resource:Resource):Void {
        var index = findTabIndexFromResource(resource);
        if (index == -1) {
            var tab = createTabFromResource(resource);
            if (tab == null) {
                return;
            }
            tab.userData = resource;
            resources.addComponent(tab);
            index = resources.pageCount - 1;
        }
        
        resources.pageIndex = index;
    }
    
    public function onEvent(event:EventType, data:Any) {
        
    }
    
    private function createTabFromResource(resource:Resource):Box {
        var tab:Box = null;
        
        switch (resource.type) {
            case ResourceType.SOURCE:
                tab = new SourceEditor();
                cast(tab, SourceEditor).resource = resource;
            case ResourceType.SHADER:
                tab = new ShaderEditor();
                cast(tab, ShaderEditor).resource = resource;
            case ResourceType.ASSET:
                if (resource.isImage) {
                    tab = new ImageEditor();
                    trace(resource.content);
                    cast(tab, ImageEditor).resource = resource;
                }
            case _:    
        }
        
        if (tab != null) {
            tab.text = resource.name;
            tab.icon = resource.icon;
        }
        
        return tab;
    }
    
    private function findTabIndexFromResource(resource:Resource):Int {
        var index:Int = -1;
        
        for (i in 0...resources.pageCount) {
            if (resources.getPage(i).userData == resource) {
                index = i;
                break;
            }
        }
        
        return index;
    }
}