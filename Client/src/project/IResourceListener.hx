package project;

interface IResourceListener {
    function onDirtyChanged():Void;
    function onContentUpdated():Void;
}