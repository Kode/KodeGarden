package project;

@:enum
abstract ResourceType(Int) from Int to Int {
    var UNKNOWN:Int = 0;
    var FOLDER:Int = 1;
    var SOURCE:Int = 2;
    var SHADER:Int = 3;
    var ASSET:Int = 4;
}
