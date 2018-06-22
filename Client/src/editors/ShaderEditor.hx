package editors;

import haxe.ui.containers.TabView;
import project.Resource;

class ShaderEditor extends TextEditor {
    public function new(resource:Resource = null, tabs:TabView = null) {
        super(resource, tabs);
        editor.language = "glsl";
    }
}
