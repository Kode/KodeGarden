package;

import haxe.Json;
import js.Browser;
import js.html.ArrayBuffer;
import js.html.Uint16Array;
import js.html.Uint32Array;
import js.html.Uint8Array;
import js.html.WebSocket;
import tink.core.Future;

class Server {
    public static var log:String->Bool->Void;

    private static var _socket:WebSocket;
    private static var _connected:Bool;
    private static var _lastId:Int = 0;
    private static var _calls:Map<Int, Dynamic> = new Map<Int, Dynamic>();
    
    public static function start() {
        return Future.async(function(cb) {
            if (_connected == true) {
                cb(true);
                return;
            }
            
            _socket = new WebSocket('ws://' + Browser.window.location.host + '/');
            _socket.onopen = function(e) {
                _connected = true;
                cb(true);
            }
            
            _socket.onclose = function(e) {
                _connected = false;
                _socket = null;
            }

            _socket.onmessage = function(event) {
                var data = Json.parse(event.data);
                if (data.callid) {
                    _calls.get(Std.parseInt("" + data.callid))(data.ret);
                    _calls.remove(Std.parseInt("" + data.callid));
                } else {
                    switch (data.method) {
                        case 'compilation-message':
                            log(data.data.message, false);
                        case 'compilation-error':
                            log(data.data.message, true);
                    }
                }
            }
        });
    }
    
    public static function stop() {
        if (_socket != null) {
            _socket.close();
        }
    }

    public static function call(func:String, args:Dynamic) {
        return Future.async(function(cb) {
            args.func = func;
            args.callid = ++_lastId;
            start().handle(function(b) {
                _calls.set(_lastId, cb);
                _socket.send(Json.stringify(args));
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

    private static function concat(buffer1:ArrayBuffer, buffer2:ArrayBuffer) {
        var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    	tmp.set(new Uint8Array(buffer1), 0);
		tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
		return tmp.buffer;
    }
    
    private static function arrayBufferFromString(str:String) {
        var buffer = new ArrayBuffer(str.length * 2);
        var view = new Uint16Array(buffer);
        for (i in 0...str.length) {
            view[i] = str.charCodeAt(i);
        }
        return buffer;
    }
    
    public static function addAsset(id:String, filename:String, buffer:ArrayBuffer) {
        return Future.async(function(cb) {
            var headContent = arrayBufferFromString(id + '/' + filename);
            var headBuffer = new ArrayBuffer(8);
            var headView = new Uint32Array(headBuffer);
            headView[0] = ++_lastId;
            headView[1] = headContent.byteLength;
            var head = concat(headBuffer, headContent);
            _calls.set(_lastId, cb);
            _socket.send(concat(head, buffer));
        });
    }
}
