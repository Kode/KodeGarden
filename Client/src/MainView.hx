package;

import dialogs.AddResourceDialog;
import haxe.ui.ToolkitAssets;
import haxe.ui.core.Component;
import haxe.ui.core.Screen;
import haxe.ui.util.Timer;
import js.Browser;
import js.html.ArrayBuffer;
import js.html.FileReader;
import panels.Log;
import project.Project;
import project.ResourceType;

@:build(haxe.ui.macros.ComponentMacros.build("assets/ui/main.xml"))
class MainView extends Component {
    private var sha:String = '28773311499a4587e77e02c3d083fcd52c117eee';
    
    public function new() {
        super();
        percentWidth = percentHeight = 100;

        Project.instance.registerListener(resourceManager);
        Project.instance.registerListener(tabs);
        
        Server.log = log.logMessage;
        
        if (Browser.window.location.hash.length > 1) {
            sha = Browser.window.location.hash.substr(1);
        }

        Browser.window.onhashchange = function() {
            var newSha = Browser.window.location.hash.substr(1);
            if (newSha != sha) {
                Browser.window.location.reload();
            }
        };
        
        Browser.window.addEventListener("keydown", function(e) {
            var key = null;
            var possible = [e.key, e.keyIdentifier, e.keyCode, e.which];
            while (key == null && possible.length > 0) {
                key = possible.pop();
            }
            
            if (key != null && (key == '115' || key == '83' ) && (e.ctrlKey || e.metaKey) && !(e.altKey)) {
                e.preventDefault();
                Project.instance.saveAll();
                return false;
            }
            
            return true;
        });
        
        var scriptElement = Browser.document.createScriptElement();
        scriptElement.onload = function(e) {
            trace("kha.js loaded");
            WorkerKha.instance.load('/projects/' + sha + '/khaworker.js');
            Project.instance.refresh(sha, function() {
            });
            log.logMessage("Kode Garden ready", false);
        }
        scriptElement.src = "kha.js";
        Browser.document.body.appendChild(scriptElement);
        
        buttonInject.onClick = function(e) {
            Project.instance.inject();
        }
        
        buttonRestart.onClick = function(e) {
            Project.instance.build();
        }
        
        buttonDownload.onClick = function(e) {
            Project.instance.download();
        }
        
        addResourceButton.onClick = function(e) {
            startAddResource();
        }
        
        new Timer(60 * 1000, function() {
            Project.instance.saveAll(true);
        });
    }
    
    private function startAddResource() {
        var dialog = new AddResourceDialog();
        
        var contextPath = "";
        if (Navigation.instance.selectedResource != null) {
            var r = Navigation.instance.selectedResource;
            if (r.type == ResourceType.SOURCE) {
                r = r.parent;
            }
            if (r.type == ResourceType.FOLDER) {
                contextPath = r.fullName;
            }
            contextPath = StringTools.replace(contextPath, "Sources", "");
            contextPath = StringTools.replace(contextPath, "Shaders", "");
            contextPath = StringTools.replace(contextPath, "Assets", "");
            if (StringTools.startsWith(contextPath, "/")) {
                contextPath = contextPath.substring(1);
            }
        }

        dialog.contextPath = contextPath;
        
        var options = {
            title: "Add Resource",
            buttons: []
        }
        var dialogContainer = null;
        Screen.instance.showDialog(dialog, options, function(b) {
            if (b.id == "confirm") {
                switch (dialog.resourceType) {
                    case "Source":
                        var sourceFile = dialog.sourceFile.text;
                        if (StringTools.endsWith(sourceFile, ".hx") == false) {
                            sourceFile += ".hx";
                        }

                        var content = applyResourceTemplate("sources/" + dialog.sourceType + ".template", sourceFile);
                        
                        Project.instance.activeResource = Project.instance.addResource(ResourceType.SOURCE, sourceFile, content);
                        Server.addSource(sha, sourceFile).handle(function(newSha:Dynamic) {
                            Server.setSource(newSha, sourceFile, content).handle(function(newSha:Dynamic) {
                                sha = newSha;
                                Project.instance.sha = newSha;
                                WorkerKha.instance.load('/projects/' + newSha + '/khaworker.js');
                                Browser.window.history.pushState('', '', '#' + sha);
                            });
                        });
                    case "Shader":
                        var shaderFile = dialog.shaderFile.text + dialog.shaderType.text;
                        var content = applyResourceTemplate("shaders/" + dialog.shaderTemplate.text + dialog.shaderType.text + ".template", shaderFile);
                        Project.instance.activeResource = Project.instance.addResource(ResourceType.SHADER, shaderFile, content);

                        Server.addShader(sha, shaderFile).handle(function(newSha:Dynamic) {
                            Server.setShader(newSha, shaderFile, content).handle(function(newSha:Dynamic) {
                                sha = newSha;
                                Project.instance.sha = newSha;
                                WorkerKha.instance.load('/projects/' + newSha + '/khaworker.js');
                                Browser.window.history.pushState('', '', '#' + sha);
                            });
                        });

                    case "Asset":
                        var reader:FileReader = new FileReader();
                        reader.onload = function(upload) {
                            Project.instance.activeResource = Project.instance.addResource(ResourceType.ASSET, dialog.assetFile.file.name);
                            
                            var buffer:ArrayBuffer = upload.target.result;
                            trace(dialog.assetFile.text);
                            Server.addAsset(sha, dialog.assetFile.text, buffer).handle(function(newSha:Dynamic) {
                                sha = newSha;
                                Project.instance.sha = newSha;
                                WorkerKha.instance.load('/projects/' + newSha + '/khaworker.js');
                                Browser.window.history.pushState('', '', '#' + sha);
                            });
                        }
                        reader.readAsArrayBuffer(dialog.assetFile.file);
                }
            }
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
}