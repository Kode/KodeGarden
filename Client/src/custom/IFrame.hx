package custom;

import haxe.ui.core.Component;
import js.Browser;
import js.html.IFrameElement;

class IFrame extends Component {
    private var _iframe:IFrameElement;
    
    public function new() {
        super();
    }
    
    private override function onReady() {
        super.onReady();
        
        _iframe = Browser.document.createIFrameElement();
        _iframe.frameBorder = "none";
        this.element.appendChild(_iframe);
        invalidateComponent();
    }
    
    private override function validateComponentLayout():Bool {
        var r = super.validateComponentLayout();
        
        if (_iframe != null && this.width > 0 && this.height > 0) {
            _iframe.style.width = this.width + "px";
            _iframe.style.height = this.height + "px";
        }
        
        return r;
    }
    
    public var iframeElement(get, null):IFrameElement;
    private function get_iframeElement():IFrameElement {
        return _iframe;
    }
}