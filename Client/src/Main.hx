package;

import haxe.ui.HaxeUIApp;
import haxe.ui.ToolkitAssets;

class Main {
    public static function main() {
        // test
        var app = new HaxeUIApp();
        app.ready(function() {
            // TODO: pretty crappy way to "preload" images - create preloader as part of HaxeUIApp (ready only called once loaded - should be optional)
            ToolkitAssets.instance.getImage("img/play-button_grey.png", function(e) {});
            ToolkitAssets.instance.getImage("img/repeat_grey.png", function(e) {});
            ToolkitAssets.instance.getImage("img/attachment_grey.png", function(e) {});
            ToolkitAssets.instance.getImage("img/plus_grey.png", function(e) {});
            ToolkitAssets.instance.getImage("img/file_grey.png", function(e) {});
            ToolkitAssets.instance.getImage("img/layers_grey.png", function(e) {});
            ToolkitAssets.instance.getImage("img/picture_grey.png", function(e) {});
            ToolkitAssets.instance.getImage("img/folder.png", function(e) {});
            ToolkitAssets.instance.getImage("img/control-000-small.png", function(e) {});
            ToolkitAssets.instance.getImage("img/control-270-small.png", function(e) {});
            ToolkitAssets.instance.getImage("img/blank.png", function(e) {});

            Navigation.instance;
            
            app.addComponent(new MainView());
            app.start();
        });
    }
}
