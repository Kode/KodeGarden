package panels;

import haxe.ui.components.Label;
import haxe.ui.containers.HBox;
import haxe.ui.core.Component;
import haxe.ui.util.Timer;
import js.Browser;
import js.html.DOMMatrix;
import project.Project;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/panels/log.xml"))
class Log extends Component {
    public static var instance:Log;
    
    public function new() {
        super();
    
        instance = this;
        
        clearLog.onClick = function(e) {
            log.clearContents();
        }
        
        copyLog.onClick = function(e) {
            var data = "";
            for (c in log.contents.childComponents) {
                data += c.findComponent(Label).text + "\n";
            }

            // gotta love html/js!
            var temp = Browser.document.createTextAreaElement();
            temp.style.border = 'none';
            temp.style.outline = 'none';
            temp.style.boxShadow = 'none';
            temp.style.background = 'transparent';
            Browser.document.body.appendChild(temp);
            temp.value = data;
            temp.select();

            try {
                var successful = Browser.document.execCommand('copy');
            } catch (e:Dynamic) { }

            Browser.document.body.removeChild(temp);
        }
    }
 
    private var khaLocation:String;
    private var kgLocationWin:String;
    private var kgLocationLin:String;
    public function logMessage(message:String, error:Bool = false) {
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
        
        var hbox = new HBox();
        hbox.percentWidth = 100;

        var label = new Label();
        label.percentWidth = 100;
        label.text = message;
        if (error == true) {
            label.styleNames = "error";
        }

        hbox.addComponent(label);

        log.addComponent(hbox);
        Timer.delay(function() { // <------ HACK! Should be gone in new branch
            log.vscrollPos = log.vscrollMax + 200;
        }, 50);
    }
}
