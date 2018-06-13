package project;

import js.Browser;

class Project {
    private static var _instance:Project;
    public static var instance(get, null):Project;
    private static function get_instance():Project {
        if (_instance == null) {
            _instance = new Project();
        }
        return _instance;
    }
    
    public var resourcesRoot:Resource = new Resource(ResourceType.FOLDER);
    private var _listeners:Array<IProjectListener> = [];
    
    public var sha:String;
    
    
    public function new() {
    }
    
    public function addResource(type:ResourceType, name:String, content:String = ""):Resource {
        var r = null;
        
        switch (type) {
            case ResourceType.ASSET:
                var folder = resourcesRoot.findResource(ResourceType.FOLDER, "Assets");
                if (folder == null) {
                    folder = resourcesRoot.addResource(ResourceType.FOLDER, "Assets");
                }
                r = folder.addResource(type, name, content);
            case ResourceType.SHADER:
                var folder = resourcesRoot.findResource(ResourceType.FOLDER, "Shaders");
                if (folder == null) {
                    folder = resourcesRoot.addResource(ResourceType.FOLDER, "Shaders");
                }
                r = folder.addResource(type, name, content);
            case ResourceType.SOURCE:
                var folder = resourcesRoot.findResource(ResourceType.FOLDER, "Sources");
                if (folder == null) {
                    folder = resourcesRoot.addResource(ResourceType.FOLDER, "Sources");
                }
                r = folder.addResource(type, name, content);
            case _:
                r = resourcesRoot.addResource(type, name, content);
        }
                        
        for (l in _listeners) {
            l.projectResourceAdded(r);
        }
        return r;
    }
    
    public function findResource(type:ResourceType, name:String):Resource {
        return resourcesRoot.findResource(type, name);
    }
    
    public function hasResource(type:ResourceType, name:String):Bool {
        return resourcesRoot.hasResource(type, name);
    }
    
    public function registerListener(listener:IProjectListener) {
        _listeners.push(listener);
    }
    
    private var _activeResource:Resource;
    public var activeResource(get, set):Resource;
    private function get_activeResource():Resource {
        return _activeResource;
    }
    private function set_activeResource(value:Resource):Resource {
        if (value == _activeResource) {
            return value;
        }
        
        _activeResource = value;
        for (l in _listeners) {
            l.activeResourceChanged(_activeResource);
        }
        return value;
    }
    
    public function refresh(sha:String, callback:Void->Void) {
        this.sha = sha;
        
        Server.loadProject(sha).handle(function(x) {
            Server.sources(sha).handle(function(sources:Array<String>) {
                for (source in sources) {
                    Server.source(sha, source).handle(function(content:Dynamic) {
                        addResource(ResourceType.SOURCE, source, content);
                    });
                }
                
                Server.shaders(sha).handle(function(shaders:Array<String>) {
                    for (shader in shaders) {
                        Server.shader(sha, shader).handle(function(content:Dynamic) {
                            addResource(ResourceType.SHADER, shader, content);
                        });
                    }
                    
                    Server.assets(sha).handle(function(assets:Array<String>) {
                        for (asset in assets) {
                            addResource(ResourceType.ASSET, asset);
                        }
                    });
                    
                    var cookie = Browser.document.cookie.split(";");
                    var lastFile = null;
                    for (c in cookie) {
                        c = StringTools.trim(c);
                        var parts = c.split("=");
                        if (StringTools.trim(parts[0]) == "lastFile") {
                            lastFile = StringTools.trim(parts[1]);
                            break;
                        }
                    }
                    
                    var lastResource = null;
                    for (r in resourcesRoot.flatten()) {
                        if (r.fullName == lastFile) {
                            lastResource = r;
                            break;
                        }
                    }
                    
                    if (lastResource != null) {
                        activeResource = lastResource;
                    }
                    
                    if (callback != null) {
                        callback();
                    }
                    
                });
            });
        });
        
    }
    
    public function saveAll() {
        var oldSha = sha;
        saveResources(resourcesRoot.flatten(), function() {
            if (sha != oldSha) {
                Browser.window.history.pushState('', '', '#' + sha);
            }
        });
    }
    
    private function saveResources(list:Array<Resource>, callback:Void->Void) {
        if (list.length == 0) {
            callback();
            return;
        }
        
        var resource = list.shift();
        if (resource.dirty == true) {
            trace("saving = " + resource.fullName);
            switch (resource.type) {
                case ResourceType.SOURCE:
                    Server.setSource(sha, StringTools.replace(resource.fullName, "Sources/", ""), resource.content).handle(function(newSha:Dynamic) {
                        sha = newSha;
                        resource.dirty = false;
                        saveResources(list, callback);
                    });
                case ResourceType.SHADER:
                    Server.setShader(sha, StringTools.replace(resource.fullName, "Shaders/", ""), resource.content).handle(function(newSha:Dynamic) {
                        sha = newSha;
                        resource.dirty = false;
                        saveResources(list, callback);
                    });
                case _:    
                    saveResources(list, callback);
            }
        } else {
            saveResources(list, callback);
        }
    }
    
    public function build(name:String = null, content:String = null) {
        Server.compile(sha).handle(function(result:Dynamic) {
            trace(result);
        });
        
        /*
        if (name == null && content == null && activeResource != null) {
            name = activeResource.name;
            content = activeResource.content;
        }
        trace("1 - " + content);
        
        if (StringTools.endsWith(name, ".hx")) {
        trace("2");
            Server.setSource(sha, name, content).handle(function(newSha:Dynamic) {
                sha = newSha;
                WorkerKha.instance.load('/projects/' + newSha + '/khaworker.js');
                Browser.window.history.pushState('', '', '#' + sha);
            });
        } else {
        trace("3");
            Server.setShader(sha, name, content).handle(function(newSha:Dynamic) {
                sha = newSha;
                WorkerKha.instance.load('/projects/' + newSha + '/khaworker.js');
                Browser.window.history.pushState('', '', '#' + sha);
            });
        }
        */
    }

    public function inject(name:String = null, content:String = null) {
        /*
        if (name == null && content == null && activeResource != null) {
            name = activeResource.name;
            content = activeResource.content;
        }
        
        if (StringTools.endsWith(name, ".hx")) {
            Server.setSource(sha, name, content).handle(function(newSha:Dynamic) {
                sha = newSha;
                WorkerKha.instance.inject('/projects/' + newSha + '/khaworker.js');
                Browser.window.history.pushState('', '', '#' + sha);
            });
        } else {
            Server.setShader(sha, name, content).handle(function(newSha:Dynamic) {
                sha = newSha;
                WorkerKha.instance.injectShader('/projects/' + newSha + '/' + name);
                Browser.window.history.pushState('', '', '#' + sha);
            });
        }
        */
    }
    
    public function download() {
        Server.download(sha).handle(function(e:Dynamic) {
            Browser.window.location.replace('/archives/' + sha + '.zip');
        });
    }
}