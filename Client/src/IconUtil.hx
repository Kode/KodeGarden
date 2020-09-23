package;

class IconUtil {
    public static function iconFromExtension(name:String):String {
        var icon = "icons/file.png";
        if (StringTools.endsWith(name, ".hx")) {
            icon = "icons/document.png";
        } else if (StringTools.endsWith(name, ".glsl")) {
            icon = "icons/puzzle.png";
        } else if (StringTools.endsWith(name, ".png") || StringTools.endsWith(name, ".jpg") || StringTools.endsWith(name, ".jpeg") || StringTools.endsWith(name, ".bmp")) {
            icon = "icons/picture.png";
        } else if (StringTools.endsWith(name, ".wav") || StringTools.endsWith(name, ".mp3") || StringTools.endsWith(name, ".flac")) {
            icon = "icons/sound.png";
        } else if (StringTools.endsWith(name, ".map")) {
            icon = "icons/map.png";
        }
        return icon;
    }
}