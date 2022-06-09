package dialogs;

import haxe.io.Bytes;
import haxe.ui.containers.dialogs.Dialog;
import js.html.ArrayBuffer;
import js.html.FileReader;
import project.Project;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/dialogs/import.xml"))
class ImportDialog extends Dialog {
    public var projectZippedBytes:Bytes;
    
    public function new() {
        super();
        
        buttons = DialogButton.CANCEL | "Import";
    }
    
    private override function validateDialog(button:DialogButton, fn:Bool->Void) {
        if (button == "Import") {
            var reader:FileReader = new FileReader();
            reader.onload = function(upload) {
                var buffer:ArrayBuffer = upload.target.result;
                //var bytes:Bytes = Bytes.ofData(buffer);
                projectZippedBytes = Bytes.ofData(buffer);
                /*
                Project.instance.importFromZippedBytes(bytes, function(filename, current, max) {
                    trace(filename, current, max);
                });
                */
                fn(true);
            }
            reader.readAsArrayBuffer(zipFile.file);
        } else {
            fn(true);
        }
        /*
        var f = zipFile.file;
        var reader:FileReader = new FileReader();
        reader.onload = function(upload) {
            var buffer:ArrayBuffer = upload.target.result;
            var bytes:Bytes = Bytes.ofData(buffer);
            Project.instance.importFromZippedBytes(bytes, function(filename, current, max) {
                trace(filename, current, max);
            });
        }
        reader.readAsArrayBuffer(f);
        fn(false);
        */
    }
}