package dialogs;

import haxe.ui.containers.dialogs.Dialog;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/dialogs/about.xml"))
class AboutDialog extends Dialog {
    public function new() {
        super();
        buttons = DialogButton.CLOSE;
    }
}