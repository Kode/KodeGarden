package custom;

import haxe.ui.components.Button;
import haxe.ui.components.TextField;
import haxe.ui.containers.HBox;
import haxe.ui.events.UIEvent;
import js.Browser;
import js.html.File;
import js.html.InputElement;

class FileSelector extends HBox {
    private var _fileInput:InputElement;
    
    public function new() {
        super();
    
        var textfield = new TextField();
        textfield.percentWidth = 100;
        addComponent(textfield);
        
        var button = new Button();
        button.text = "Select";
        addComponent(button);
        button.onClick = function(e) {
            _fileInput.click();
        }
    }
    
    private override function onReady() {
        super.onReady();
        
        _fileInput = Browser.document.createInputElement();
        _fileInput.type = "file";
        _fileInput.style.display = "none";
        this.element.appendChild(_fileInput);
        _fileInput.onchange = function(e) {
            findComponent(TextField).text = _fileInput.files[0].name;
            dispatch(new UIEvent(UIEvent.CHANGE));
        }
    }

    public override function get_text():String {
        return findComponent(TextField).text;
    }
    
    public var file(get, null):File;
    private function get_file():File {
        return _fileInput.files[0];
    }
}