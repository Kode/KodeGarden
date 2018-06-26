package;

import dialogs.AddResourceDialog;
import haxe.ui.ToolkitAssets;
import haxe.ui.core.Component;
import haxe.ui.core.MouseEvent;
import haxe.ui.core.Screen;
import haxe.ui.util.Timer;
import js.Browser;
import js.html.ArrayBuffer;
import js.html.FileReader;
import panels.Log;
import project.Project;
import project.ResourceType;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/main.xml"))
class MainView extends Component {
    private var _resizeConstrants:Map<Component, Dynamic> = new Map<Component, Dynamic>();
    
    public function new() {
        super();
        percentWidth = percentHeight = 100;

        Project.instance.registerListener(resourceManager);
        Project.instance.registerListener(tabs);
        
        Server.log = log.logMessage;

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
            log.logMessage("Kode Garden ready", false);
        }
        scriptElement.src = "kha.js";
        Browser.document.body.appendChild(scriptElement);
        
        buttonInject.onClick = function(e) {
            Project.instance.inject();
        }
        
        buttonRestart.onClick = function(e) {
            Project.instance.build();
        }
        
        buttonDownload.onClick = function(e) {
            Project.instance.download();
        }
        
        addResourceButton.onClick = function(e) {
            startAddResource();
        }
        
        new Timer(60 * 1000, function() {
            Project.instance.saveAll(true);
        });
        
        registerResizeConstraint(sizer1, {
            component1: khanvasPanel,
            component2: log,
            component1Min: 200,
            component2Min: 200,
            direction: "vertical"
        });
        
        registerResizeConstraint(sizer2, {
            component1: box1,
            component2: box2,
            component1Min: 200,
            component2Min: 200,
            direction: "horizontal"
        });
        
        registerResizeConstraint(sizer3, {
            component1: box2,
            component2: box3,
            component1Min: 200,
            component2Min: 200,
            direction: "horizontal"
        });
    }
    
    private var _dragOffsetX:Float = -1;
    private var _dragOffsetY:Float = -1;
    private var _dragSizer:Component;
    private function registerResizeConstraint(sizer:Component, details:Dynamic) {
        _resizeConstrants.set(sizer, details);
        sizer.registerEvent(MouseEvent.MOUSE_DOWN, onSizerMouseDown);
    }
    
    private function onSizerMouseDown(event:MouseEvent) {
        _dragSizer = event.target;
        _dragOffsetX = event.screenX;
        _dragOffsetY = event.screenY;
        Screen.instance.registerEvent(MouseEvent.MOUSE_MOVE, onScreenMouseMove);
        Screen.instance.registerEvent(MouseEvent.MOUSE_UP, onScreenMouseUp);
        var details = _resizeConstrants.get(_dragSizer);
        if (details.direction == "horizontal") {
            Browser.document.body.style.cursor = "col-resize";
        } else if (details.direction == "vertical") {
            Browser.document.body.style.cursor = "row-resize";
        }
    }
    
    
    private function onScreenMouseMove(event:MouseEvent) {
        if (_dragSizer != null) {
            var details = _resizeConstrants.get(_dragSizer);
            var c1:Component = details.component1;
            var c2:Component = details.component2;
            var min1 = details.component1Min;
            var min2 = details.component2Min;
            
            if (details.direction == "horizontal") {
                var delta = event.screenX - _dragOffsetX;
                var n1 = c1.width + delta;
                var n2 = c2.width - delta;
                
                if (n1 < min1 || n2 < min2) {
                    return;
                }
                
                _dragOffsetX = event.screenX;
                
                trace(c1.percentWidth + ", " + c1.width + ", " + n1);
                trace(c2.percentWidth + ", " + c2.width + ", " + n2);
                
                if (c2 == box3) {
                    c2.width = n2;
                } else {
                    c1.percentWidth = (n1 / c1.width) * c1.percentWidth;
                    c2.percentWidth = (n2 / c2.width) * c2.percentWidth;
                }
            } else if (details.direction == "vertical") {
                var delta = event.screenY - _dragOffsetY;
                var n1 = c1.height + delta;
                var n2 = c2.height - delta;
                
                if (n1 < min1 || n2 < min2) {
                    return;
                }

                _dragOffsetY = event.screenY;
                c1.percentHeight = (n1 / c1.height) * c1.percentHeight;
                c2.percentHeight = (n2 / c2.height) * c2.percentHeight;
            }
        }
    }
    
    private function onScreenMouseUp(event) {
        Screen.instance.unregisterEvent(MouseEvent.MOUSE_MOVE, onScreenMouseMove);
        Screen.instance.unregisterEvent(MouseEvent.MOUSE_UP, onScreenMouseUp);
        Browser.document.body.style.cursor = null;
        _dragSizer = null;
        _dragOffsetX = -1;
        _dragOffsetY = -1;
    }
    
    private function startAddResource() {
        var dialog = new AddResourceDialog();
        
        var contextPath = "";
        if (Navigation.instance.selectedResource != null) {
            var r = Navigation.instance.selectedResource;
            if (r.type == ResourceType.SOURCE) {
                r = r.parent;
            }
            if (r.type == ResourceType.FOLDER) {
                contextPath = r.fullName;
            }
            contextPath = StringTools.replace(contextPath, "Sources", "");
            contextPath = StringTools.replace(contextPath, "Shaders", "");
            contextPath = StringTools.replace(contextPath, "Assets", "");
            if (StringTools.startsWith(contextPath, "/")) {
                contextPath = contextPath.substring(1);
            }
        }

        dialog.contextPath = contextPath;
        
        var options = {
            title: "Add Resource",
            buttons: []
        }
        var dialogContainer = null;
        Screen.instance.showDialog(dialog, options, function(b) {
            if (b.id == "confirm") {
                Project.instance.add(dialog);
            }
        });
    }
}