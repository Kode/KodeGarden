package panels;

import haxe.ui.containers.VBox;
import haxe.ui.core.Component;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/panels/khanvas.xml"))
class Khanvas extends VBox {
    public function new() {
        super();
        
        fullscreen.onClick = function(e) {
            khanvasContainer.fullscreen();
        }
    }
}