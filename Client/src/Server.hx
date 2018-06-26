package;

import js.html.ArrayBuffer;
import tink.core.Future;

@:native("io")
extern class IoSocket {
    @:selfCall public function new();
    public function emit(name:String, ?data:Dynamic):Void;
    public function on(event:String, ?func:Dynamic->Void):Void;
}

class Server {
    public static var log:String->Bool->Void;

    private static var _socket:IoSocket;
    private static var _connected:Bool;
    private static var _lastId:Int = 0;
    private static var _calls:Map<Int, Dynamic> = new Map<Int, Dynamic>();
    
    public static function start() {
        return Future.async(function(cb) {
            if (_connected == true) {
                cb(true);
                return;
            }
            
            _socket = new IoSocket();

            _socket.on('connect', function(e) {
                _connected = true;
                cb(true);
            });

            _socket.on('callback', function(msg) {
                if (msg.callid) {
                    _calls.get(Std.parseInt("" + msg.callid))(msg.ret);
                    _calls.remove(Std.parseInt("" + msg.callid));
                }
            });
            
            /*_socket.on('disconnect', function(e) {
                _connected = false;
                _socket = null;
            });*/

            _socket.on('compilation-message', function(msg) {
                log(msg.message, false);
            });

            _socket.on('compilation-error', function(msg) {
                log(msg.message, true);
            });
        });
    }
    
    /*public static function stop() {
        if (_socket != null) {
            _socket.close();
        }
    }*/

    public static function call(func:String, args:Dynamic) {
        return Future.async(function(cb) {
            args.callid = ++_lastId;
            args.func = func;
            start().handle(function(b) {
                _calls.set(_lastId, cb);
                _socket.emit("project", args);
            });
        });
    }

    public static function loadProject(id:String) {
        return Future.async(function(cb) {
            var callid = ++_lastId;
            start().handle(function(b) {
                _calls.set(_lastId, cb);
                _socket.emit("loadProject", { id: id, callid: callid } );
            });
        });
    }
    
    public static function sources(id:String) {
        return call("sources", { id: id } );
    }
    
    public static function source(id:String, file:String) {
        return call("source", { id: id, file: file } );
    }
    
    public static function setSource(id:String, file:String, content:String) {
        return call("setSource", {id: id, file: file, content: content});
    }
    
    public static function addSource(id:String, file:String) {
        return call("addSource", {id: id, file: file});
    }

    public static function shaders(id:String) {
        return call("shaders", { id: id } );
    }

    public static function shader(id:String, file:String) {
        return call("shader", { id: id, file: file } );
    }
    
    public static function setShader(id:String, file:String, content:String) {
        return call("setShader", {id: id, file: file, content: content});
    }
 
    public static function addShader(id:String, file:String) {
        return call("addShader", {id: id, file: file});
    }

    public static function assets(id:String) {
        return call("assets", { id: id } );
    }

    public static function download(id:String) {
        return call("download", { id: id } );
    }

    public static function compile(id:String) {
        return call("compile", { id: id } );
    }

    public static function addAsset(id:String, filename:String, buffer:ArrayBuffer) {
         return Future.async(function(cb) {
            var callid = ++_lastId;
            start().handle(function(b) {
                _calls.set(_lastId, cb);
                _socket.emit("uploadAsset", {callid: callid, filename: id + "/" + filename, buffer: buffer});
            });
        });
    }
}
