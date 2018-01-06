package tink.priority;

using StringTools;

abstract Selector<T>(Null<Item<T>->Bool>) from Item<T>->Bool {
	
	public function matches(item:Item<T>)
		return this != null && this(item);

	@:from static function ofString<A>(s:String):Selector<A>
		return function (i:Item<A>) 
			return i.id.toString().startsWith(s);
	
	@:from static function ofID<A>(id:ID):Selector<A>
		return function (i:Item<A>) 
			return i.id == id;
			
	@:from static function ofRegex<A>(e:EReg):Selector<A>
		return function (i:Item<A>) 
			return e.match(i.id);
	
	@:op(a && b) static function and<A>(a:Selector<A>, b:Selector<A>):Selector<A>
		return function (x)
			return a.matches(x) && b.matches(x);
}