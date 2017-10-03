package custom;

import haxe.ui.core.Component;
import js.html.CanvasElement;
import js.Browser;

class Canvas extends Component {
    private var _el:CanvasElement;

    public function new() {
        super();

    }

    public override function onReady() {
        super.onReady();
        _el = Browser.document.createCanvasElement();
        _el.style.outline = "none";
        _el.id = "khanvas";
        this.element.appendChild(_el);
        onResized(); // TODO: find out why this has to be called
    }

    public override function validateLayout():Bool {
        var b = super.validateLayout();
        if (_el != null && this.width > 0 && this.height > 0) {
            _el.style.width = '${this.width}px';
            _el.style.height = '${this.height}px';
        }

        return b;
    }
}
