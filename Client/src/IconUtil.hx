package;

class IconUtil {
    public static function assetIcon(asset:String):String {
        var icon = "img/picture_grey.png";
        if (StringTools.endsWith(asset, ".wav") || StringTools.endsWith(asset, ".ogg") || StringTools.endsWith(asset, ".mp3")) {
            icon = "img/audio-file_grey.png";
        }

        return icon;
    }
    
    public static function iconFromExtension(name:String):String {
        var icon = "icons/file.png";
        if (StringTools.endsWith(name, ".hx")) {
            icon = "icons/document.png";
        } else if (StringTools.endsWith(name, ".glsl")) {
            icon = "icons/puzzle.png";
        } else if (StringTools.endsWith(name, ".png") || StringTools.endsWith(name, ".jpg") || StringTools.endsWith(name, ".jpeg") || StringTools.endsWith(name, ".bmp")) {
            icon = "icons/picture.png";
        }
        return icon;
    }
}