package;

import dialogs.AddResourceDialog;
import haxe.ui.core.Component;
import haxe.ui.core.Screen;
import js.Browser;
import js.html.ArrayBuffer;
import js.html.FileReader;
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
        
        var scriptElement = Browser.document.createScriptElement();
        scriptElement.onload = function(e) {
            trace("kha.js loaded");
            WorkerKha.instance.load('/projects/' + sha + '/khaworker.js');
            Project.instance.refresh(sha);
            log.logMessage("KodeGarden ready", false);
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
    }
    
    private function startAddResource() {
        var dialog = new AddResourceDialog();
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

                        Project.instance.activeResource = Project.instance.addResource(ResourceType.SOURCE, sourceFile, "package;\n");
                        Server.addSource(sha, sourceFile).handle(function(newSha:Dynamic) {
                            sha = newSha;
                            WorkerKha.instance.load('/projects/' + newSha + '/khaworker.js');
                            Browser.window.history.pushState('', '', '#' + sha);
                        });
                    case "Shader":
                        var shaderFile = dialog.shaderFile.text + dialog.shaderType.text;
                        Project.instance.activeResource = Project.instance.addResource(ResourceType.SHADER, shaderFile, "void main() {\n\n}\n");

                        Server.addShader(sha, shaderFile).handle(function(newSha:Dynamic) {
                            sha = newSha;
                            WorkerKha.instance.load('/projects/' + newSha + '/khaworker.js');
                            Browser.window.history.pushState('', '', '#' + sha);
                        });

                    case "Asset":
                        var reader:FileReader = new FileReader();
                        reader.onload = function(upload) {
                            Project.instance.activeResource = Project.instance.addResource(ResourceType.ASSET, dialog.assetFile.file.name);
                            
                            var buffer:ArrayBuffer = upload.target.result;
                            Server.addAsset(sha, dialog.assetFile.file.name, buffer).handle(function(newSha:Dynamic) {
                                sha = newSha;
                                WorkerKha.instance.load('/projects/' + newSha + '/khaworker.js');
                                Browser.window.history.pushState('', '', '#' + sha);
                            });
                        }
                        reader.readAsArrayBuffer(dialog.assetFile.file);
                }
            }
        });
    }
}