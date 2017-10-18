package;

import haxe.ui.HaxeUIApp;
import haxe.ui.ToolkitAssets;

class Main {
    public static function main() {
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

            app.addComponent(new MainView());
            app.start();
        });
    }
}
