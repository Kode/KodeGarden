package;

class IconUtil {
    public static function assetIcon(asset:String):String {
        var icon = "img/picture_grey.png";
        if (StringTools.endsWith(asset, ".wav") || StringTools.endsWith(asset, ".ogg") || StringTools.endsWith(asset, ".mp3")) {
            icon = "img/audio-file_grey.png";
        }

        return icon;
    }
}