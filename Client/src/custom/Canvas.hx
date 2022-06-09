package custom;

import haxe.ui.core.Component;
import js.Browser;
import js.html.CanvasElement;

class Canvas extends Component {
    private var _el:CanvasElement;

    public function new() {
        super();

    }

    public function fullscreen() {
        if (Reflect.getProperty(_el, "webkitRequestFullScreen") != null) {
            Reflect.callMethod(_el, Reflect.getProperty(_el, "webkitRequestFullScreen"), []);          
        } else if (Reflect.getProperty(_el, "mozRequestFullScreen") != null) {
            Reflect.callMethod(_el, Reflect.getProperty(_el, "mozRequestFullScreen"), []);          
        }
    }
    
    public override function onReady() {
        super.onReady();
        _el = Browser.document.createCanvasElement();
        _el.style.outline = "none";
        _el.id = "khanvas";
        this.element.appendChild(_el);
        invalidateComponentLayout();
    }

    public override function validateComponentLayout():Bool {
        var b = super.validateComponentLayout();
        if (_el != null && this.width > 0 && this.height > 0) {
            _el.style.width = '${this.width}px';
            _el.style.height = '${this.height}px';
        }

        return b;
    }
}
