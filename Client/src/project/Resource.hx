package project;

class Resource { // beginning of a resource tree for better file management when server API supports it
    public var type:ResourceType;
    public var name:String;
    public var content:String;
    
    private var _childResources:Array<Resource>;
    
    public function new(type:ResourceType, name:String = null, content:String = "") {
        this.type = type;
        this.name = name;
        this.content = content;
    }
    
    public function addResource(type:ResourceType, name:String, content:String = ""):Resource {
        if (this.type != ResourceType.FOLDER) {
            throw "Can only added child resources to a folder";
        }
        
        if (_childResources == null) {
            _childResources = new Array<Resource>();
        }
        
        var resource = new Resource(type, name, content);
        _childResources.push(resource);
        return resource;
    }
    
    public function findResource(type:ResourceType, name:String):Resource {
        var match:Resource = null;
        for (child in _childResources) {
            if (child.type == type && child.name.toLowerCase() == name.toLowerCase()) {
                match = child;
                break;
            }
        }
        return match;
    }
    
    public function hasResource(type:ResourceType, name:String):Bool {
        return (findResource(type, name) != null);
    }
    
    public var icon(get, null):String;
    private function get_icon():String {
        var icon = null;
        
        switch (type) {
            case ResourceType.SOURCE:
                icon = "img/file_grey.png";
            case ResourceType.SHADER:
                icon = "img/layers_grey.png";
            case ResourceType.ASSET:
                icon = IconUtil.assetIcon(name);
            case _:    
        }
        
        return icon;
    }
}