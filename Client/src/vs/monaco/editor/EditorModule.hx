package vs.monaco.editor;

import js.html.Element;

@:native("monaco.editor")
extern class EditorModule {
    public static function create(el:Element, config:Dynamic):StandaloneCodeEditor;
}