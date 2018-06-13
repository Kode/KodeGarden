package;

class EventDispatcher {
    private static var _instance:EventDispatcher;
    public static var instance(get, null):EventDispatcher;
    private static function get_instance():EventDispatcher {
        if (_instance == null) {
            _instance = new EventDispatcher();
        }
        return _instance;
    }
    
    private var _listeners:Array<IListener> = [];
    
    public function new() {
    }
    
    public function registerListener(listener:IListener) {
        _listeners.push(listener);
    }

    public function dispatchEvent(event:EventType, data:Any) {
        for (l in _listeners) {
            l.onEvent(event, data);
        }
    }
}