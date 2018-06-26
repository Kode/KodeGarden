package custom;

import haxe.ui.core.Component;
import haxe.ui.core.UIEvent;
import js.Browser;
import vs.monaco.editor.EditorModule;
import vs.monaco.editor.Languages;
import vs.monaco.editor.Require;
import vs.monaco.editor.StandaloneCodeEditor;

class MonacoLoader {
    private var _loaded:Bool = false;
    private var _loading:Bool = false;
    private var _callbacks:Array<Void->Void> = [];
    
    public function new() {
    }
    
    public function register(fn:Void->Void) {
        if (_loaded == false) {
            _callbacks.push(fn);
            if (_loading == false) {
                _loading = true;
                
                var scriptElement = Browser.document.createScriptElement();
                scriptElement.onload = function(e) {
                    Require.config( { paths: { 'vs': 'monaco-editor-0.13.1/min/vs' }} );
                    Require.require(["vs/editor/editor.main"], function() {
                        Languages.register( { id: "haxe" } );
                        Languages.setMonarchTokensProvider("haxe", Syntax.haxe());
                        Languages.register( { id: "glsl" } );
                        Languages.setMonarchTokensProvider("glsl", Syntax.glsl());
                        
                        _loaded = true;
                        
                        for (f in _callbacks) {
                            f();
                        }
                    });
                }
                scriptElement.src = "monaco-editor-0.13.1/min/vs/loader.js";
                Browser.document.body.appendChild(scriptElement);
            }
        } else {
            fn();
        }
    }
    
}

class MonacoEditor extends Component {
    private static var loader:MonacoLoader = new MonacoLoader();
    
    private var _editor:StandaloneCodeEditor;

    public function new() {
        super();
    }
    
    public override function onReady() {
        super.onReady();
        
        loader.register(monacoReady);
    }
    
    private function monacoReady() {
        _editor = EditorModule.create(this.element, {
            language: "haxe",
            theme: 'vs-dark'
        });

        _editor.getModel().updateOptions({
            insertSpaces: false,
            tabSize: 4
        });
        
        _editor.setValue(_text);
        _editor.getModel().onDidChangeContent(function(e) {
            dispatch(new UIEvent(UIEvent.CHANGE));
            _dirty = true;
        });
        
        invalidateComponent();
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