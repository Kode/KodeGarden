package panels;

import haxe.ui.core.Component;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/panels/khanvas.xml"))
class Khanvas extends Component {
    public function new() {
        super();
        
        fullscreen.onClick = function(e) {
            khanvasContainer.fullscreen();
        }
    }
}