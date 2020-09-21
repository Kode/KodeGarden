package dialogs;

import haxe.io.Bytes;
import haxe.ui.containers.dialogs.Dialog;
import project.Project;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/dialogs/import-progress.xml"))
class ImportProgressDialog extends Dialog {
    public var projectZippedBytes:Bytes;
    
    public function new() {
        super();
    }
    
    public override function onReady() {
        super.onReady();
        Project.instance.importFromZippedBytes(projectZippedBytes, function(filename, current, max) {
            trace(filename, current, max);
            if (filename != null) {
                importLabel.text = "Importing " + filename + " (" + current + " of " + max + ")";
            }
            importProgress.max = max;
            importProgress.pos = current;
            if (current == max) {
                Project.instance.build();
                hideDialog(DialogButton.CLOSE);
            }
        });
    }
}