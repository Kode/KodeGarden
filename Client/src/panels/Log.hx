package panels;

import haxe.ui.components.Label;
import haxe.ui.containers.HBox;
import haxe.ui.core.Component;
import js.Browser;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/panels/log.xml"))
class Log extends Component {
    public function new() {
        super();
        
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
 
    public function logMessage(message:String, error:Bool = false) {
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
        log.vscrollPos = log.vscrollMax + 200;
    }
}
