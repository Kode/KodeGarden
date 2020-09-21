package panels;

import haxe.ui.Toolkit;
import haxe.ui.components.Label;
import haxe.ui.containers.HBox;
import haxe.ui.containers.VBox;
import haxe.ui.core.Component;
import haxe.ui.events.MouseEvent;
import js.Browser;
import project.Project;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/panels/log-manager.xml"))
class LogManager extends VBox {
    public static var instance:LogManager;
    
    public function new() {
        super();
        instance = this;
    }
    
    @:bind(copyButton, MouseEvent.CLICK)
    private function onCopyButton(e) {
        // gotta love html/js!
        var temp = Browser.document.createTextAreaElement();
        temp.style.border = 'none';
        temp.style.outline = 'none';
        temp.style.boxShadow = 'none';
        temp.style.background = 'transparent';
        Browser.document.body.appendChild(temp);
        temp.value = _rawLog;
        temp.select();

        try {
            var successful = Browser.document.execCommand('copy');
        } catch (e:Dynamic) { }

        Browser.document.body.removeChild(temp);
    }
    
    @:bind(clearButton, MouseEvent.CLICK)
    private function onClearButton(e) {
        _rawLog = "";
        log.findComponent("scrollview-contents", Component).removeAllComponents();
    }
    
    private var khaLocation:String;
    private var kgLocationWin:String;
    private var kgLocationLin:String;
    public function logMessage(message:String, error:Bool = false) {
        var messages = message.split("\n");
        for (m in messages) {
            m = StringTools.trim(m);
            if (m.length == 0) {
                continue;
            }
            
            createLogMessageUI(m, error);
        }
    }
    
    private var _rawLog:String = "";
    private function createLogMessageUI(message:String, error:Bool = false) {
        if (StringTools.startsWith(message, "Using Kha from ")) {
            khaLocation = message.substring("Using Kha from ".length);
            
            var parts = khaLocation.split("\\");
            parts.pop();
            kgLocationWin = parts.join("\\");
            
            var parts = khaLocation.split("/");
            parts.pop();
            kgLocationLin = parts.join("/");
            
            return; // lets not reveal anything about the system
        }
        
        if (kgLocationWin != null) {
            message = StringTools.replace(message, kgLocationWin + "\\Projects\\Checkouts\\" + Project.instance.sha + "\\", "");
        }
        
        if (kgLocationLin != null) {
            message = StringTools.replace(message, kgLocationLin + "/Projects/Checkouts/" + Project.instance.sha + "/", "");
        }
        
        var n = message.indexOf("\\" + Project.instance.sha + "\\");
        if (n == -1) {
            message.indexOf("/" + Project.instance.sha + "/");
        }
        if (n != -1) {
            message = message.substr(n + Project.instance.sha.length + 2);
        }

        _rawLog += message + "\n";
        
        var hbox = new HBox();
        hbox.styleString = "spacing: 0";
        hbox.percentWidth = 100;
        
        var resourceRegExp = new EReg("(^.*.hx(:\\d*)?)", "");
        if (resourceRegExp.match(message)) {
            var pos = resourceRegExp.matchedPos();
            var resourcePart = message.substr(pos.pos, pos.len);
            message = message.substr(pos.len);
            var resourceLabel = new Label();
            resourceLabel.styleNames = "resource-link";
            resourceLabel.text = message;
            if (error == true) {
                resourceLabel.styleNames = "error-resource-link";
            }
            resourceLabel.text = resourcePart;
            resourceLabel.registerEvent(MouseEvent.CLICK, onResourceLabelClick);
            hbox.addComponent(resourceLabel);
        }
        

        var label = new Label();
        label.percentWidth = 100;
        message = StringTools.replace(message, " ", "&nbsp;");
        label.text = message;
        if (error == true) {
            label.styleNames = "error";
        }

        hbox.addComponent(label);

        log.addComponent(hbox);
        Toolkit.callLater(function() {
            log.vscrollPos = log.vscrollMax;
        });
    }
    
    private function onResourceLabelClick(e:MouseEvent) {
        var text = e.target.text;
        var parts = text.split(":");
        var f = parts[0];
        var resources = Project.instance.resourcesRoot.flatten();
        var r = null;
        for (t in resources) {
            if (t.fullName == f) {
                r = t;
            }
        }
        if (r != null) {
            Project.instance.activeResource = r;
        }
    }
}