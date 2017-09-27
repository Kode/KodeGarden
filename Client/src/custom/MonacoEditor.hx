package custom;

import haxe.Json;
import haxe.ui.ToolkitAssets;
import haxe.ui.core.Component;
import vs.monaco.editor.EditorModule;
import vs.monaco.editor.Languages;
import vs.monaco.editor.Require;
import vs.monaco.editor.StandaloneCodeEditor;

class MonacoEditor extends Component {
    private var _editor:StandaloneCodeEditor;
    
    public function new() {
        super();
        
        Require.config( { paths: { 'vs': 'monaco-editor-0.10.0/min/vs' }} );
    }
    
    public override function onReady() {
        super.onReady();
        Require.require(["vs/editor/editor.main"], function() {
            var s = ToolkitAssets.instance.getText("syntax/haxe.json");
            var j = Json.parse(s);
            
            Languages.register( { id: "haxe" } );
            Languages.setMonarchTokensProvider("haxe", j);    
            
            _editor = EditorModule.create(this.element, {
                language: "haxe",
                theme: 'vs-dark'
            } );
            
            _editor.setValue(_text);
        });
    }
    
    private override function get_text():String {
        if (_editor != null) {
            return _editor.getValue();
        }
        return _text;
    }
    private override function set_text(value:String):String {
        _text = value;
        if (_editor != null) {
            _editor.setValue(value);
        }
        return value;
    }

    public override function validateLayout():Bool {
        var b = super.validateLayout();
        if (this.width > 0 && this.height > 0 && _editor != null) {
            _editor.layout({
               width: this.width,
               height: this.height
            });
        }
        return b;
    }
}