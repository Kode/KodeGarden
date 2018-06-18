package;
import js.Browser;
import project.Resource;

class Navigation implements IListener {
    private static var _instance:Navigation;
    public static var instance(get, null):Navigation;
    private static function get_instance():Navigation {
        if (_instance == null) {
            _instance = new Navigation();
        }
        return _instance;
    }
    
    public var selectedResource:Resource;
    
    public function new() {
        EventDispatcher.instance.registerListener(this);
    }
    
    public function onEvent(event:EventType, data:Any) {
        if (event == EventType.NAVIGATION_CHANGED) {
            selectedResource = data;
            Browser.document.cookie = "lastFile=" + selectedResource.fullName;
        }
    }
}