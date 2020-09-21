package custom;

import haxe.io.Path;
import haxe.ui.components.Image;
import haxe.ui.components.Label;
import haxe.ui.components.Spacer;
import haxe.ui.containers.HBox;
import haxe.ui.containers.ScrollView;
import haxe.ui.containers.VBox;
import haxe.ui.core.Component;
import haxe.ui.events.MouseEvent;
import haxe.ui.events.UIEvent;

class TreeViewEvent extends UIEvent {
    public static inline var NODE_EXPANDED:String = "nodeExpanded";
    public static inline var NODE_COLLAPSED:String = "nodeCollapsed";
    public static inline var NODE_SELECTED:String = "nodeSelected";
    public static inline var NODE_RIGHT_CLICK:String = "nodeRightClick";
    
    public var node(get, set):TreeViewNode;
    private function get_node():TreeViewNode {
        return cast(data, TreeViewNode);
    }
    private function set_node(value:TreeViewNode):TreeViewNode {
        data = value;
        return value;
    }
    
    public var screenX:Float;
    public var screenY:Float;
    
    public override function clone():TreeViewEvent {
        var c:TreeViewEvent = new TreeViewEvent(this.type);
        c.type = this.type;
        c.bubble = this.bubble; 
        c.target = this.target;
        c.data = this.data;
        c.canceled = this.canceled;
        c.screenX = this.screenX;
        c.screenY = this.screenY;
        postClone(c);
        return c;
    }
}

class TreeView extends ScrollView {
    // all a little hardcody, should be styles
    public static var BLANK_ICON = "icons/blank.png";
    public static var EXPANDED_ICON = "icons/control-270-small.png";
    public static var COLLAPSED_ICON = "icons/control-000-small.png";
    public static var FOLDER_ICON = "icons/folder.png";
    
    public function new() {
        super();
        styleString = "padding: 1px;__border: 1px solid #ABABAB;border-radius: 1px;";
    }
    
    public function addNode(text:String, icon:String = null, isExpandable:Bool = false):TreeViewNode {
       var node = new TreeViewNode(this);
       node.text = text;
       node.icon = icon;
       node.expandable = isExpandable;
       
       addComponent(node);
       return node;
    }
    
    private var _selectedNode:TreeViewNode = null;
    public var selectedNode(get, set):TreeViewNode;
    private function get_selectedNode():TreeViewNode {
        return _selectedNode;
    }
    private function set_selectedNode(value:TreeViewNode):TreeViewNode {
        if (_selectedNode == value) {
            return value;
        }
        
        if (_selectedNode != null) {
            _selectedNode.ui.removeClass(":selected");
            _selectedNode.findComponent(Label, true).removeClass(":selected");
        }
        _selectedNode = value;
        _selectedNode.ui.addClass(":selected");
        _selectedNode.findComponent(Label, true).addClass(":selected");
        
        var event = new TreeViewEvent(TreeViewEvent.NODE_SELECTED, _selectedNode);
        dispatch(event);
        
        return value;
    }
    
    public var softSelectedNode(get, set):TreeViewNode;
    private function get_softSelectedNode():TreeViewNode {
        return _selectedNode;
    }
    private function set_softSelectedNode(value:TreeViewNode):TreeViewNode {
        if (_selectedNode == value) {
            return value;
        }
        
        if (_selectedNode != null) {
            _selectedNode.ui.removeClass(":selected");
            _selectedNode.findComponent(Label, true).removeClass(":selected");
        }
        _selectedNode = value;
        _selectedNode.ui.addClass(":selected");
        _selectedNode.findComponent(Label, true).addClass(":selected");
        
        return value;
    }
    
    public var rootNode(get, null):TreeViewNode;
    private function get_rootNode():TreeViewNode {
        var node = findComponent("scrollview-contents", Component, false, "css").findComponent(TreeViewNode);
        return node;
    }
    
    public function findNodeByPath(path:String):TreeViewNode {
        if (path == null) {
            return null;
        }
        
        if (rootNode == null) {
            return null;
        }
        
        if (path == "/") {
            return rootNode;
        }
        return rootNode.findNodeByPath(path);
    }
}

class TreeViewNode extends VBox {
    private var _hbox:HBox;
    private var _label:Label;
    private var _nodeExpander:Image;
    private var _nodeIcon:Image;
    
    private var _expanded:Bool = false;
    private var _tree:TreeView;
    
    public var ui:HBox;
    
    public function new(tree:TreeView = null) {
        super();
        
        _tree = tree;
        
        this.styleString = "spacing: 2";
        
        _hbox = new HBox();
        _hbox.styleString = "spacing: 0";
        
        _nodeExpander = new Image();
        _nodeExpander.resource = TreeView.BLANK_ICON;
        _nodeExpander.styleString = "vertical-align: center;cursor:pointer;";
        _nodeExpander.onClick = function(e) {
            if (_expanded == false) {
                expand();
            } else {
                collapse();
            }
        }
        _hbox.addComponent(_nodeExpander);
        
        var hbox:HBox = new HBox();
        hbox.id = "node";
        ui = hbox;
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
            hbox.addClass(":hover");
        });
        
        hbox.registerEvent(MouseEvent.MOUSE_OUT, function(e) {
            hbox.removeClass(":hover");
        });
        
        hbox.registerEvent(MouseEvent.CLICK, function(e) {
            _tree.selectedNode = this;
        });
        
        hbox.registerEvent(MouseEvent.RIGHT_CLICK, function(e:MouseEvent) {
            _tree.softSelectedNode = this;
            var event = new TreeViewEvent(TreeViewEvent.NODE_RIGHT_CLICK, this);
            event.screenX = e.screenX;
            event.screenY = e.screenY;
            _tree.dispatch(event);
        });
        
        hbox.registerEvent(MouseEvent.DBL_CLICK, function(e:MouseEvent) {
            if (_expanded == false) {
                expand();
            } else {
                collapse();
            }
        });
        
        _hbox.addComponent(hbox);
        addComponent(_hbox);
    }
    
    public function findNodeByPath(path:String):TreeViewNode {
        if (path == null) {
            return null;
        }
        var node = null;
        
        path = Path.normalize(path);
        var temp = path.split("/");
        var parts = [];
        for (t in temp) {
            t = StringTools.trim(t);
            if (t.length == 0) {
                continue;
            }
            parts.push(t);
        }
        
        if (parts.length > 0) {
            var p = parts.shift();
            var nodes = findComponents(TreeViewNode);
            var foundNode = null;
            for (n in nodes) {
                if (n.text == p) {
                    foundNode = n;
                    break;
                }
            }
            
            if (foundNode != null) {
                if (parts.length > 0) {
                    node = foundNode.findNodeByPath(parts.join("/"));
                } else {
                    node = foundNode;
                }
            }
        }
        
        
        return node;
    }
    
    public function findNode(text:String) {
        var nodes = findComponents(TreeViewNode);
        for (n in nodes) {
            if (n.text == text) {
                return n;
            }
        }
        return null;
    }
    
    public function expand() {
        if (_expandable == false) {
            return;
        }
        _expanded = true;
        updateUI();
        var event = new TreeViewEvent(TreeViewEvent.NODE_EXPANDED, this);
        _tree.dispatch(event);
    }
    
    public function expandPath() {
        var ref = this;
        while (ref != null) {
            ref.expand();
            ref = ref.parentNode;
        }
    }
    
    public function collapse() {
        _expanded = false;
        updateUI();
        var event = new TreeViewEvent(TreeViewEvent.NODE_COLLAPSED, this);
        _tree.dispatch(event);
    }

    private function updateUI() {
        if (_expanded == false) {
            _expandable = true;
            _nodeExpander.resource = TreeView.COLLAPSED_ICON;
        } else {
            _expandable = true;
            _nodeExpander.resource = TreeView.EXPANDED_ICON;
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
    
    public override function get_text():String {
        return _label.text;
    }
    
    public override function set_text(value:String):String {
        super.set_text(value);
        _label.text = value;
        return value;
    }
    
    public override function set_icon(value:String):String {
        super.set_icon(value);
        _nodeIcon.resource = value;
        return value;
    }
    
    private var _expandable:Bool = false;
    public var expandable(get, set):Bool;
    private function get_expandable():Bool {
        return _expandable;
    }
    private function set_expandable(value:Bool) {
        if (value == true) {
            _nodeExpander.resource = TreeView.COLLAPSED_ICON;
        } else {
            _nodeExpander.resource = TreeView.BLANK_ICON;
        }
        _expandable = value;
        
        return value;
    }
    
    public var nodeDepth(get, null):Int;
    private function get_nodeDepth():Int {
        var n = 0;
        var ref = this;
        while (ref != null) {
            ref = ref.parentNode;
            n++;
        }
        return n;
    }
    
    public var nodePath(get, null):String;
    private function get_nodePath():String {
        var array = [];
        var ref = this;
        while (ref != null) {
            array.push(ref.text);
            ref = ref.parentNode;
        }
        array.reverse();
        return array.join("/");
    }
    
    public var parentNode:TreeViewNode;
    public function addNode(text:String, icon:String = null, isExpandable:Bool = false, expanded:Bool = false):TreeViewNode {
        _hbox.styleString = "spacing: 0";
        
        var node = new TreeViewNode(_tree);
        node.expandable = isExpandable;
        if (expanded == true) {
            node.expand();
        }
        node.parentNode = this;
        node.marginLeft = 16;
        node.text = text;
        node.icon = icon;

        var nodes:Array<TreeViewNode> = findComponents(TreeViewNode);
        nodes.push(node);
        nodes.sort(function(node1:TreeViewNode, node2:TreeViewNode) {
            if (node1.expandable == true && node2.expandable == false) {
                return -1;
            } else if (node1.expandable == false && node2.expandable == true) {
                return 1;
            }
            return Reflect.compare(node1.text, node2.text);
        });
        var index = nodes.indexOf(node);

        addComponentAt(node, index + 1);
        updateUI();
        
        return node;
    }
    
    public function addNodeByPath(path:String, icon:String = null, isExpandable:Bool = false):TreeViewNode {
        if (path == null) {
            return null;
        }
        var node = null;
        
        path = Path.normalize(path);
        var temp = path.split("/");
        var parts = [];
        for (t in temp) {
            t = StringTools.trim(t);
            if (t.length == 0) {
                continue;
            }
            parts.push(t);
        }
        
        if (parts.length > 0) {
            var ref = this;
            var n = 0;
            for (p in parts) {
                var t = ref.findNode(p);
                if (t == null) {
                    var ise = isExpandable;
                    var ico = icon;
                    if (n < parts.length - 1) {
                        ico = TreeView.FOLDER_ICON;
                        ise = true;
                    }
                    t = ref.addNode(p, ico, ise);
                }
                ref = t;
                n++;
            }
            
            node = ref;
        }
        
        return node;
    }
    
    public function insertNodeAfter(text:String, icon:String = null, insertAfter:TreeViewNode):TreeViewNode {
        _hbox.styleString = "spacing: 0";
        
        var index = getComponentIndex(insertAfter);
        if (index == -1) {
            return addNode(text, icon);
        }
        index += 1;
        if (index == childComponents.length) {
            return addNode(text, icon);
        }
        
        var node = new TreeViewNode(_tree);
        node.parentNode = this;
        node.marginLeft = 16;
        node.text = text;
        node.icon = icon;
        addComponentAt(node, index);
        updateUI();
        
        return node;
    }
    
    public function clear() {
        var nodes = findComponents(TreeViewNode);
        for (node in nodes) {
            removeComponent(node);
        }
    }
    
    public function sort() {
        var nodes:Array<TreeViewNode> = findComponents(TreeViewNode);
        nodes.sort(function(node1:TreeViewNode, node2:TreeViewNode) {
            if (node1.expandable == true && node2.expandable == false) {
                return -1;
            } else if (node1.expandable == false && node2.expandable == true) {
                return 1;
            }
            return Reflect.compare(node1.text, node2.text);
        });
        var i = 0;
        this.lockLayout();
        for (n in nodes) {
            trace(n.text + ", " + n.expandable);
            setComponentIndex(n, i + 1);
            i++;
        }
        this.unlockLayout();
    }
}