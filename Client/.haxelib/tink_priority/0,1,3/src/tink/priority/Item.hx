package tink.priority;

typedef Item<T> = {
	var data(default, null) : T;
	@:optional var id(default, null): ID;
	@:optional var before(default, null): Selector<T>;
	@:optional var after(default, null): Selector<T>;
}	