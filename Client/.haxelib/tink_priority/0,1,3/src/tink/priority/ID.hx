package tink.priority;

import haxe.PosInfos;

using StringTools;

abstract ID({ cls:String, ?method:String, str:String }) {
	
	public var cls(get, never):String;
	public var method(get, never):Null<String>;
	
	public function new(cls:String, ?method:String)
		this = { 
			cls: cls, 
			method: method,
			str: 
					if (method == null) cls
					else '$cls::$method'

		};
		
	inline function get_cls() 
		return this.cls;
		
	inline function get_method()
		return this.method;
		
	@:to public inline function toString():String 
		return this.str;
	
	@:from static function ofString(s:String) {
		var parts = s.split('::');
		return new ID(parts[0], parts[1]);
	}
	
	@:from static function ofPosInfos(pos:PosInfos)
		return new ID(pos.className, pos.methodName);
		
	@:op(A == B) static function equals(a:ID, b:ID) 
		return 
			switch [a, b] {
				case [null, null]: true;
				case [null, _] | [_, null]: false;
				default: a.toString() == b.toString();
			}
}