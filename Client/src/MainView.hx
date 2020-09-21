package;

import dialogs.AboutDialog;
import dialogs.AddResourceDialog;
import haxe.ui.containers.VBox;
import haxe.ui.containers.dialogs.Dialog.DialogEvent;
import haxe.ui.containers.menus.Menu.MenuEvent;
import haxe.ui.events.MouseEvent;
import js.Browser;
import panels.TabManager;
import project.Project;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/main.xml"))
class MainView extends VBox {
    public static var instance:MainView = null;
    
    public function new() {
        super();
        
        instance = this;
        
        Project.instance.registerListener(projectManager);
        Project.instance.registerListener(tabManager);
        
        Server.log = logManager.logMessage;
        
        var sha:String = 'f15101ea8cc3c1ad81450f0ca02210e34dae5132';
        
        if (Browser.window.location.hash.length > 1) {
            sha = Browser.window.location.hash.substr(1);
        }

        Browser.window.onhashchange = function() {
            var newSha = Browser.window.location.hash.substr(1);
            if (newSha != Project.instance.sha) {
                Browser.window.location.reload();
            }
        };
        
        Browser.window.addEventListener("keydown", function(e) {
            var key = null;
            var possible = [e.key, e.keyIdentifier, e.keyCode, e.which];
            while (key == null && possible.length > 0) {
                key = possible.pop();
            }
            
            if (key != null && (key == '115' || key == '83' ) && (e.ctrlKey || e.metaKey) && !(e.altKey)) {
                e.preventDefault();
                Project.instance.saveAll();
                return false;
            }
            
            return true;
        });
        
        var scriptElement = Browser.document.createScriptElement();
        scriptElement.onload = function(e) {
            trace("kha.js loaded");
            WorkerKha.instance.load('/projects/' + sha + '/khaworker.js');
            Project.instance.refresh(sha, function() {
            });
            logManager.logMessage("KodeGarden ready");
        }
        scriptElement.src = "kha.js";
        Browser.document.body.appendChild(scriptElement);
    }
    
    @:bind(compileAndRestartButton, MouseEvent.CLICK)
    private function onCompileAndRestart(e) {
        Project.instance.build();
    }
    
    @:bind(compileAndInjectButton, MouseEvent.CLICK)
    private function onCompileAndInject(e) {
        Project.instance.inject();
    }
    
    @:bind(mainMenu, MenuEvent.MENU_SELECTED)
    private function onMainMenu(e:MenuEvent) {
        switch (e.menuItem.id) {
            case "projectCompileAndInject":
                Project.instance.inject();
            case "projectCompileAndRestart":
                Project.instance.build();
            case "projectSave" | "resourcesSaveAll":
                Project.instance.saveAll();
            case "projectDownload":
                Project.instance.download();

            case "resourcesAddSource":
                startAddResource("source");
            case "resourcesAddShader":
                startAddResource("shader");
            case "resourcesAddAsset":
                startAddResource("asset");
            case "resourcesSaveActive":
                Project.instance.save(TabManager.instance.activeEditor.resource);
                
            case "helpAbout":
                var aboutDialog = new AboutDialog();
                aboutDialog.show();
        }
    }
    
    public function startAddResource(type:String = null, contextPath:String = "") {
        var addResourceDialog = new AddResourceDialog();
        addResourceDialog.type = type;
        addResourceDialog.contextPath = contextPath;
        addResourceDialog.onDialogClosed = function(e:DialogEvent) {
            if (e.button == "Confirm") {
                Project.instance.add(addResourceDialog.addResourceParams);
            }
        }
        addResourceDialog.show();
    }
}