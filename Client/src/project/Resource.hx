package project;

class Resource { // beginning of a resource tree for better file management when server API supports it
    public var type:ResourceType;
    public var name:String;
    public var parent:Resource;
    public var content:String;
    public var dirty:Bool;
    
    private var _childResources:Array<Resource>;
    
    public function new(type:ResourceType, name:String = null, parent:Resource = null, content:String = "") {
        this.type = type;
        this.name = name;
        this.parent = parent;
        this.content = content;
    }

    public var childResources(get, null):Array<Resource>;
    private function get_childResources():Array<Resource> {
        if (_childResources == null) {
            return [];
        }
        
        return _childResources;
    }
    
    public function flatten():Array<Resource> {
        var resources = [];
        
        resources = resources.concat(childResources);
        for (r in childResources) {
            resources = resources.concat(r.flatten());
        }
        
        return resources;
    }
    
    public function addResource(type:ResourceType, name:String, content:String = ""):Resource {
        if (this.type != ResourceType.FOLDER) {
            throw "Can only added child resources to a folder";
        }
        if (hasResource(type, name)) {
            return findResource(type, name);
        }
        
        if (_childResources == null) {
            _childResources = new Array<Resource>();
        }

        var resource = null;
        if (name.indexOf("/") != -1) {
            var path = name.split("/");
            name = path.pop();
            var ref = this;
            for (p in path) {
                p = StringTools.trim(p);
                if (p.length == 0) {
                    continue;
                }
                ref = ref.addResource(ResourceType.FOLDER, p);
            }
            resource = ref.addResource(type, name, content);
        } else {
            resource = new Resource(type, name, this, content);
            _childResources.push(resource);
        }
        
        sort();
        
        return resource;
    }
    
    public function sort() {
        if (_childResources != null) {
            _childResources.sort(function(r1, r2) {
                if (r1.type == ResourceType.FOLDER && r2.type != ResourceType.FOLDER) {
                    return -1;
                }
                if (r1.type != ResourceType.FOLDER && r2.type == ResourceType.FOLDER) {
                    return 1;
                }
                
                var a = r1.name.toLowerCase();
                var b = r2.name.toLowerCase();
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });
        }
    }
    
    public function findResource(type:ResourceType, name:String):Resource {
        var match:Resource = null;
        if (_childResources != null) {
            for (child in _childResources) {
                if (child.type == type && child.name.toLowerCase() == name.toLowerCase()) {
                    match = child;
                    break;
                }
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
            case ResourceType.FOLDER:
                icon = "img/folder.png";
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
    
    public var fullName(get, null):String;
    private function get_fullName():String {
        var p = parent;
        var parts = [];
        while (p != null) {
            if (p.name != null) {
                parts.push(p.name);
            }
            p = p.parent;
        }
        parts.reverse();
        parts.push(name);
        return parts.join("/");
    }
    
    public function toString():String {
        return fullName;
    }
}