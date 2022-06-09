package dialogs;

import haxe.ui.Toolkit;
import haxe.ui.containers.VBox;
import haxe.ui.containers.dialogs.Dialog;
import js.Browser;
import js.html.Blob;
import js.html.IFrameElement;
import js.html.URL;

typedef ExampleItemData = {
    var sha:String;
    var title:String;
}

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/dialogs/examples.xml"))
class ExamplesDialog extends Dialog {
    private var _exampleItems:Array<ExampleItemData> = [];
    
    public function new() {
        super();
        buttons = DialogButton.CLOSE;
        
        for (i in 0...20) {
            _exampleItems.push({
                sha: "25650ad726587fc19b57699851b609531209256e",
                title: "Example " + i
            });
        }
    }
    
    private override function onReady() {
        super.onReady();
        populateExamples();
    }
    
    private function populateExamples() {
        examplesGrid.removeAllComponents();
        for (example in _exampleItems) {
            var item = new ExampleItem();
            examplesGrid.addComponent(item);
            Toolkit.callLater(function() {
                item.itemData = example;
            });
        }
    }
}

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/dialogs/example-item.xml"))
class ExampleItem extends VBox {
    public function new() {
        super();
    }
    
    private var _itemData:ExampleItemData;
    public var itemData(get, set):ExampleItemData;
    private function get_itemData():ExampleItemData {
        return _itemData;
    }
    private function set_itemData(value:ExampleItemData):ExampleItemData {
        _itemData = value;
        var el:IFrameElement = iframe.iframeElement;
        el.src = generatePage("html,body { width: 100%; height: 100%; margin: 0; }");
        el.onload = function() {
            var scriptElement = el.contentWindow.document.createScriptElement();
            scriptElement.type = "text/javascript";
            scriptElement.src = "kha.js";
            scriptElement.onload = function() {
                trace("SCRIPT LOADED");
            }
            scriptElement.onerror = function(e, i) {
                trace("ERROR - " + e);
                Browser.console.log(e);
            }
            el.contentWindow.document.body.appendChild(scriptElement);
        }
//        el.src = generatePage('<p>Hello, world!</p>', 'p { color: blue; }', 'console.log("hi")');
        //el.src = "about:blank";
        //var scriptElement = el.contentWindow.document.createScriptElement();
//        scriptElement.src = "http://localhost:9090/projects/25650ad726587fc19b57699851b609531209256e/khaworker.js";
        //scriptElement.src = generatePage('<p>Hello, world!</p>', 'p { color: blue; }', 'console.log("hi")');
        //el.contentWindow.document.body.appendChild(scriptElement);
        //var scriptElement = el.doc
        /*
        scriptElement.onload = function(e) {
            trace("kha.js loaded");
            WorkerKha.instance.load('/projects/' + sha + '/khaworker.js');
            Project.instance.refresh(sha, function() {
            });
            logManager.logMessage("KodeGarden ready");
        }
        scriptElement.src = "kha.js";
        Browser.document.body.appendChild(scriptElement);
        */
        
        return value;
    }
    
    private function generatePage(css:String = null, html:String = null, js:String = null) {
        var sb:StringBuf = new StringBuf();
        sb.add("<html>");
        sb.add("<head>");
        if (css != null) {
            var cssURL = getBlobURL(css, 'text/css');
            sb.add('<link rel="stylesheet" type="text/css" href="${cssURL.toString()}" />');
        }
        if (js != null) {
            var jsURL = getBlobURL(js, 'text/javascript');
            sb.add('<script src="${jsURL.toString()}"></script>');
        }
        sb.add("</head>");
        sb.add("<body>");
        if (html != null) {
            sb.add(html);
        }
        
        sb.add('<canvas id="khanvas" tabindex="0" style="outline: none; cursor: default;width:100px;height:100px;"></canvas>');
        /*
        sb.add('<script src="http://localhost:9090/projects/25650ad726587fc19b57699851b609531209256e/khaworker.js"></script>');
        */
        sb.add('<script src="kha.js" onload="console.log(\'ready\');KhaWorker.instance.load(\'projects/25650ad726587fc19b57699851b609531209256e/khaworker.js\')"></script>');
        
        sb.add("</body>");
        sb.add("</html>");
        
        var source = sb.toString();
        return getBlobURL(source, 'text/html');
    }
    
    private function getBlobURL(code:String, type:String) {
        var b = new Blob([code], { type: type });
        return URL.createObjectURL(b);
    }
}