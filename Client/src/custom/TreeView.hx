package custom;

import haxe.ui.components.Image;
import haxe.ui.components.Label;
import haxe.ui.components.Spacer;
import haxe.ui.containers.HBox;
import haxe.ui.containers.ScrollView;
import haxe.ui.containers.VBox;
import haxe.ui.core.MouseEvent;
import haxe.ui.core.UIEvent;

class TreeView extends ScrollView {
    public var selectedNode:TreeViewNode = null;
    
    public function new() {
        super();
        styleString = "padding: 1px;border: 0px solid #ABABAB;border-radius: 1px;";
    }
    
    public function addNode(text:String, icon:String = null):TreeViewNode {
       var node = null;
       if (text.indexOf("/") == -1) {
           node = new TreeViewNode(this);
           node.text = text;
           node.icon = icon;
           addComponent(node);
       } else {
           var parts = text.split("/");
           text = parts.pop();
           
           var first = parts.shift();
           var ref = findNode(first);
           if (ref == null) {
               ref = new TreeViewNode(this);
               ref.text = first;
               addComponent(ref);
           }
           ref.icon = "img/folder.png";
           
           for (p in parts) {
                var temp = ref.findNode(p);
                if (temp == null) {
                    ref = ref.addNode(p, "img/folder.png");
                } else {
                   ref = temp;
                   ref.icon = "img/folder.png";
                }
           }
           
           node = ref.addNode(text, icon);
       }
    
       return node;
    }
    
    public function clear() {
        selectedNode = null;
        this.clearContents();
    }
    
    public function findNode(path:String):TreeViewNode {
        var parts = path.split("/");
        var first = parts.shift();
        
        var node:TreeViewNode = null;
        for (c in _contents.childComponents) {
            var label = c.findComponent(Label, true);
            if (label != null && label.text == first) {
                node = cast(c, TreeViewNode);
                break;
            }
        }
        
        if (parts.length > 0 && node != null) {
            node = node.findNode(parts.join("/"));
        }
        
        return node;
    }
}

class TreeViewNode extends VBox {
    private var _hbox:HBox;
    private var _label:Label;
    private var _nodeExpander:Image;
    private var _nodeIcon:Image;
    
    private var _expanded:Bool = false;
    
    public var parentNode:TreeViewNode = null;
    
    private var _tv:TreeView = null;
    public function new(tv:TreeView = null) {
        super();
        
        _tv = tv;
        this.styleString = "spacing: 2;background-color:#1e1e1e";
        
        _hbox = new HBox();
        _hbox.styleString = "spacing: 0;background-color:#1e1e1e";
        
        _nodeExpander = new Image();
        _nodeExpander.resource = "img/blank.png";
        _nodeExpander.styleString = "vertical-align: center;cursor:pointer;";
        _nodeExpander.onClick = function(e) {
            if (_expanded == false) {
                _nodeExpander.resource = "img/control-270-small.png";
                _expanded = true;
            } else {
                _nodeExpander.resource = "img/control-000-small.png";
                _expanded = false;
            }
            
            for (c in childComponents) {
                if (c == _hbox) {
                    continue;
                }
                
                if (_expanded == false) {
                    c.hide();
                } else {
                    c.show();
                }
            }
        }
        _hbox.addComponent(_nodeExpander);
        
        var hbox:HBox = new HBox();
        hbox.id = "node";
        hbox.styleString = "spacing: 4;cursor:pointer;";
        
        _nodeIcon = new Image();
        hbox.addComponent(_nodeIcon);
        
        var spacer:Spacer = new Spacer();
        spacer.width = 5;
        //hbox.addComponent(spacer);
        
        _label = new Label();
        _label.verticalAlign = "center";
        hbox.addComponent(_label);

        hbox.registerEvent(MouseEvent.MOUSE_OVER, function(e) {
            _hbox.findComponent("node").addClass(":hover");
        });
        
        hbox.registerEvent(MouseEvent.MOUSE_OUT, function(e) {
            _hbox.findComponent("node").removeClass(":hover");
        });
        
        hbox.registerEvent(MouseEvent.CLICK, function(e) {
            select();
        });
        
        _hbox.addComponent(hbox);
        addComponent(_hbox);
    }
    
    public function select() {
        if (_tv.selectedNode == this) {
            return;
        }
        
        if (_tv.selectedNode != null && _tv.selectedNode.findComponent("node") != null) {
            _tv.selectedNode.findComponent("node").removeClass(":selected");
            _tv.selectedNode = null;
        }
        _hbox.findComponent("node").addClass(":selected");
        _tv.selectedNode = this;
        
        var delta = (_tv.selectedNode.screenTop - _tv.screenTop + _tv.vscrollPos);
        if (delta < _tv.vscrollPos || delta > _tv.height - 10) {
            delta -= _tv.selectedNode.height + 10;
            if (delta > _tv.vscrollMax) {
                delta = _tv.vscrollMax;
            }
            _tv.vscrollPos = delta;
        }
        
        _tv.dispatch(new UIEvent(UIEvent.CHANGE));
    }
    
    public var path(get, null):String;
    private function get_path():String {
        var ref = this;
        var parts:Array<String> = [];
        while (ref != null) {
            parts.push(ref._label.text);
            ref = ref.parentNode;
        }
        parts.reverse();
        return parts.join("/");
    }
    
    public override function get_text():String {
        return _label.text;
    }
    
    public override function set_text(value:String):String {
        super.set_text(value);
        _label.text = value;
        return value;
    }
    
    public override function get_icon():String {
        return _nodeIcon.resource;
    }
    
    public override function set_icon(value:String):String {
        super.set_icon(value);
        _nodeIcon.resource = value;
        return value;
    }
    
    public var isFolder(get, null):Bool;
    private function get_isFolder():Bool {
        return icon == "img/folder.png";
    }
    
    public function addNode(text:String, icon:String = null):TreeViewNode {
        _nodeExpander.resource = "img/control-000-small.png";
        _nodeExpander.resource = "img/control-270-small.png";
        _hbox.styleString = "spacing: 0";
        _expanded = true;
        
       var node = new TreeViewNode(_tv);
       node.marginLeft = 16;
       node.text = text;
       node.icon = icon;
       node.parentNode = this;
       addComponent(node);
       return node;
    }
    
    public function findNode(path:String):TreeViewNode {
        
        var parts = path.split("/");
        var first = parts.shift();
        
        var node:TreeViewNode = null;
        for (c in childComponents) {
            var label = c.findComponent(Label, true);
            if (label != null && label.text == first) {
                node = cast(c, TreeViewNode);
                break;
            }
        }
        
        if (parts.length > 0) {
            node = node.findNode(parts.join("/"));
        }
        
        return node;
    }
}