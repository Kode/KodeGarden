package project;

import haxe.ui.ToolkitAssets;
import js.Browser;
import js.html.ArrayBuffer;
import js.html.FileReader;
import panels.LogManager;

typedef AddResourceParams = {
    var type:String;
    @:optional var subType:String;
    var filename:String;
    @:optional var template:String;
    @:optional var file:js.html.File;
}

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
    
    private var changing = false;
    private var changes:Array<String->(String->Void)->Void> = [];
    
    public function new() {
    }

    public function add(params:AddResourceParams) {
        switch (params.type) {
            case "Source":
                var sourceFile = params.filename;
                if (StringTools.endsWith(sourceFile, ".hx") == false) {
                    sourceFile += ".hx";
                }

                var content = applyResourceTemplate("sources/" + params.template + ".template", sourceFile);
                Project.instance.activeResource = Project.instance.addResource(ResourceType.SOURCE, sourceFile, content);
                
                scheduleChange(function(sha:String, done:String->Void) {
                    Server.addSource(sha, sourceFile).handle(function(newSha:Dynamic) {
                        Server.setSource(newSha, sourceFile, content).handle(function(newSha:Dynamic) {
                            done(newSha);
                        });
                    });
                });
                
            case "Shader":
                var shaderFile = params.filename + params.subType;
                
                var content = applyResourceTemplate("shaders/" + params.template + params.subType + ".template", shaderFile);
                Project.instance.activeResource = Project.instance.addResource(ResourceType.SHADER, shaderFile, content);

                scheduleChange(function(sha:String, done:String->Void) {
                    Server.addShader(sha, shaderFile).handle(function(newSha:Dynamic) {
                        Server.setShader(newSha, shaderFile, content).handle(function(newSha:Dynamic) {
                            done(newSha);
                        });
                    });
                });

            case "Asset":
                var reader:FileReader = new FileReader();
                reader.onload = function(upload) {
                    Project.instance.activeResource = Project.instance.addResource(ResourceType.ASSET, params.filename);
                    
                    var buffer:ArrayBuffer = upload.target.result;
                    scheduleChange(function(sha:String, done:String->Void) {
                        Server.addAsset(sha, params.filename, buffer).handle(function(newSha:Dynamic) {
                            done(newSha);
                        });
                    });
                }
                reader.readAsArrayBuffer(params.file);
        }
    }

    private function scheduleChange(change:String->(String->Void)->Void) {
        changes.push(change);
        if (!changing) {
            runChanges();
        }
    }

    private function runChanges() {
        changing = true;
        if (changes.length == 0) {
            changing = false;
            return;
        }
        var first = changes[0];
        changes.remove(first);
        first(sha, function(sha:String) {
            this.sha = sha;
            Browser.window.history.pushState('', '', '#' + sha);
            runChanges();
        });
    }

    private function applyResourceTemplate(templateName:String, resource:String):String {
        var full = "templates/" + templateName;
        var content = ToolkitAssets.instance.getText(full);
        
        var parts = resource.split("/");
        var name = parts.pop();
        name = StringTools.replace(name, ".hx", "");
        var pckg = "";
        if (parts.length > 0) {
            pckg = parts.join(".");
        }
        
        content = StringTools.replace(content, "$package", pckg);
        content = StringTools.replace(content, "$name", name);
        
        return content;
    }
    
    private function addResource(type:ResourceType, name:String, content:String = ""):Resource {
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
                        //lastFile = StringTools.trim(parts[1]);
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
                
                for (l in _listeners) {
                    l.projectRefreshed();
                }
                
            });
        });
        
    }
    
    public function save(resource:Resource, cb:Void->Void = null, autoSave:Bool = false) {
        if (resource == null) {
            if (cb != null) {
                cb();
            }
            return;
        }
        saveResources([resource], function() {
            if (cb != null) {
                cb();
            }
        }, autoSave);
    }
    
    public function saveAll(cb:Void->Void = null, autoSave:Bool = false) {
        saveResources(resourcesRoot.flatten(), function() {
            if (cb != null) {
                cb();
            }
        }, autoSave);
    }
    
    private function saveResources(list:Array<Resource>, callback:Void->Void, autoSave:Bool) {
        if (list.length == 0) {
            callback();
            return;
        }
        
        var resource = list.shift();
        if (resource.dirty == true) {
            switch (resource.type) {
                case ResourceType.SOURCE:
                    scheduleChange(function(sha:String, done:String->Void) {
                        trace("Changing " + resource.fullName + " (" + sha + ")");
                        Server.setSource(sha, StringTools.replace(resource.fullName, "Sources/", ""), resource.content).handle(function(newSha:Dynamic) {
                            trace("Changed " + resource.fullName + " (" + newSha + ")");
                            resource.dirty = false;
                            if (autoSave == true) {
                                LogManager.instance.logMessage("" + resource.fullName + " auto saved");
                            } else {
                                LogManager.instance.logMessage("" + resource.fullName + " saved");
                            }
                            saveResources(list, callback, autoSave);
                            done(newSha);
                        });
                    });
                case ResourceType.SHADER:
                    scheduleChange(function(sha:String, done:String->Void) {
                        Server.setShader(sha, StringTools.replace(resource.fullName, "Shaders/", ""), resource.content).handle(function(newSha:Dynamic) {
                            resource.dirty = false;
                            if (autoSave == true) {
                                LogManager.instance.logMessage("" + resource.fullName + " auto saved");
                            } else {
                                LogManager.instance.logMessage("" + resource.fullName + " saved");
                            }
                            saveResources(list, callback, autoSave);
                            done(newSha);
                        });
                    });
                case _:    
                    saveResources(list, callback, autoSave);
            }
        } else {
            saveResources(list, callback, autoSave);
        }
    }
    
    public function build(name:String = null, content:String = null) {
        saveAll(function() {
            Server.compile(sha).handle(function(result:Dynamic) {
                WorkerKha.instance.load('/projects/' + sha + '/khaworker.js');
            });
        });
    }

    public function inject(name:String = null, content:String = null) {
        saveAll(function() {
            Server.compile(sha).handle(function(result:Dynamic) {
                WorkerKha.instance.inject('/projects/' + sha + '/khaworker.js');
            });
        });
    }
    
    public function download() {
        Server.download(sha).handle(function(e:Dynamic) {
            Browser.window.location.replace('/archives/' + sha + '.zip');
        });
    }
}