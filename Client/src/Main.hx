package;

import haxe.ui.HaxeUIApp;
import haxe.ui.ToolkitAssets;
import haxe.ui.editors.code.monaco.MonacoLoader;

class Main {
    public static function main() {
        new MonacoLoader().register(null);
        
        var app = new HaxeUIApp();
        app.ready(function() {
            Navigation.instance;
            
            app.addComponent(new MainView());
            app.start();
        });
    }
}
