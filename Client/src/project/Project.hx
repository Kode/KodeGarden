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
    
    private var _resourcesRoot:Resource = new Resource(ResourceType.FOLDER);
    private var _listeners:Array<IProjectListener> = [];
    
    public var sha:String;
    
    
    public function new() {
    }
    
    public function addResource(type:ResourceType, name:String, content:String = ""):Resource {
        var r = _resourcesRoot.addResource(type, name, content);
        for (l in _listeners) {
            l.projectResourceAdded(r);
        }
        return r;
    }
    
    public function findResource(type:ResourceType, name:String):Resource {
        return _resourcesRoot.findResource(type, name);
    }
    
    public function hasResource(type:ResourceType, name:String):Bool {
        return _resourcesRoot.hasResource(type, name);
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
    
    public function refresh(sha:String) {
        this.sha = sha;
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
            });
        });
    }
    
    public function build(name:String = null, content:String = null) {
        if (name == null && content == null && activeResource != null) {
            name = activeResource.name;
            content = activeResource.content;
        }
        
        if (StringTools.endsWith(name, ".hx")) {
            Server.setSource(sha, name, content).handle(function(newSha:Dynamic) {
                sha = newSha;
                WorkerKha.instance.load('/projects/' + newSha + '/khaworker.js');
                Browser.window.history.pushState('', '', '#' + sha);
            });
        } else {
            Server.setShader(sha, name, content).handle(function(newSha:Dynamic) {
                sha = newSha;
                WorkerKha.instance.load('/projects/' + newSha + '/khaworker.js');
                Browser.window.history.pushState('', '', '#' + sha);
            });
        }
    }

    public function inject(name:String = null, content:String = null) {
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
    }
    
    public function download() {
        Server.download(sha).handle(function(e:Dynamic) {
            Browser.window.location.replace('/archives/' + sha + '.zip');
        });
    }
}