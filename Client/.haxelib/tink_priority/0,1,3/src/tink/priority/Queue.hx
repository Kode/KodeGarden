package tink.priority;

import haxe.PosInfos;

using StringTools;

abstract Queue<T>({ items: Array<Item<T>>, ?sequence:Array<T> }) {
	public function new() 
		this = { items: [], sequence: [] };
	
	inline function invalidate()
		this.sequence = null;
		
	public function add(item:Item<T>, ?pos:PosInfos) {
		if (item.id == null)
				@:privateAccess item.id = pos;
		
		for (i in 0...this.items.length)
			if (this.items[i].id == item.id) {
				var old = this.items[i];
				this.items[i] = item;
				
				if (this.sequence == null) return;
				
				if (old.after == item.after && old.before == item.before) return;
				
				switch item.after {
					case null:
					case after:
						for (i in 0...i) 
							if (after.matches(this.items[i])) {
								invalidate();
								return;
							}
				}
				
				switch item.before {
					case null:
					case before:
						for (i in i+1...this.items.length) 
							if (before.matches(this.items[i])) {
								invalidate();
								return;
							}
				}
				
				return;
			}
			
		invalidate();
		this.items.push(item);
	}
	
	public function whenever(data:T, ?id:ID, ?pos:PosInfos)
		add({ data: data, id: id }, pos);
	
	public function before(s:Selector<T>, data:T, ?id:ID, ?pos:PosInfos)
		add({ data: data, id: id, before: s }, pos);
		
	public function after(s:Selector<T>, data:T, ?id:ID, ?pos:PosInfos)
		add({ data: data, id: id, after: s }, pos);
	
	public function between(first:Selector<T>, then:Selector<T>, data:T, ?id:ID, ?pos:PosInfos)
		add({ data: data, id: id, after: first, before: then }, pos);
	
	public function iterator():Iterator<T>
		return toArray().iterator();
	
	public function getData(?optimistic = true) {	
		if (!optimistic)
			throw 'sorry, this is not yet implemented';
			
		if (this.sequence == null) {
			for (i in 0...this.items.length) {
				var best = this.items[i];
				var last = null;
				
				var after = [], //unneeded maybe?
					maybe = [],
					rest = this.items.slice(i + 1);
				
				while (last != best) {
					last = best;
					for (cur in rest) {
						if (best.before.matches(cur) || cur.after.matches(best)) {		
							after.push(cur);
						}
						else if (best.after.matches(cur) || cur.before.matches(best)) {
							after.push(best);
							best = cur;
						}
						else maybe.push(cur);
					}
					rest = maybe;
					maybe = [];
				}
				
				var index = this.items.indexOf(best);
				this.items[index] = this.items[i];
				this.items[i] = best;
				
			}
			
			this.sequence = [for (item in this.items) item.data];
		}
		return this.sequence;
	}
	
	@:to inline function toArray():Array<T> 
		return getData();
}