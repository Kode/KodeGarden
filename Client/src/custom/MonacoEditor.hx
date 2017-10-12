package custom;

import haxe.Json;
import haxe.ui.ToolkitAssets;
import haxe.ui.core.Component;
import vs.monaco.editor.EditorModule;
import vs.monaco.editor.Languages;
import vs.monaco.editor.Require;
import vs.monaco.editor.StandaloneCodeEditor;
import js.Browser;

class MonacoEditor extends Component {
    private var _editor:StandaloneCodeEditor;
    private static var _loaded:Bool = false;
    
    public function new() {
        super();
    }
    
    public override function onReady() {
        super.onReady();
        if (_loaded == false) {
            var scriptElement = Browser.document.createScriptElement();
            scriptElement.onload = function(e) {
                Require.config( { paths: { 'vs': 'monaco-editor-0.10.0/min/vs' }} );
                _loaded = true;
                createEditor();
            }
            scriptElement.src = "monaco-editor-0.10.0/min/vs/loader.js";
            Browser.document.body.appendChild(scriptElement);
        } else {
            createEditor();
        }
    }
    
    private function createEditor() {
        Require.require(["vs/editor/editor.main"], function() {
            Languages.register( { id: "haxe" } );
            Languages.setMonarchTokensProvider("haxe", Syntax.haxe());
            Languages.register( { id: "glsl" } );
            Languages.setMonarchTokensProvider("glsl", Syntax.glsl());

            _editor = EditorModule.create(this.element, {
                language: "haxe",
                theme: 'vs-dark'
            } );
            
            _editor.setValue(_text);
            _editor.onKeyDown(function(e) {
                _dirty = true;
            });
        });
    }

    private var _dirty:Bool;
    public var dirty(get, set):Bool;
    private function get_dirty():Bool {
        return _dirty;
    }
    private function set_dirty(value:Bool):Bool {
        _dirty = value;
        return value;
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

    private var _language:String;
    public var language(get, set):String;
    private function get_language():String {
        return _language;
    }
    private function set_language(value:String):String {
        //EditorModule.setModelLanguage(_editor.getModel(), value);
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