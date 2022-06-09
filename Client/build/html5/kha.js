(function ($hx_exports, $global) { "use strict";
$hx_exports["kha"] = $hx_exports["kha"] || {};
$hx_exports["kha"]["input"] = $hx_exports["kha"]["input"] || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw haxe_Exception.thrown("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = [];
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		a.push(i1);
	}
	return a;
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.main = function() {
	kha_System.start(new kha_SystemOptions("WorkerKha",640,480,null,null),function(_) {
		var worker = new WorkerKha();
		kha_System.notifyOnFrames($bind(worker,worker.render));
	});
};
Math.__name__ = true;
var Pipeline = function() {
	this.textureUnits = new haxe_ds_StringMap();
	this.constantLocations = new haxe_ds_StringMap();
	this.state = new kha_graphics4_PipelineState();
};
$hxClasses["Pipeline"] = Pipeline;
Pipeline.__name__ = true;
Pipeline.prototype = {
	state: null
	,constantLocations: null
	,textureUnits: null
	,getConstantLocation: function(name) {
		var location = this.state.getConstantLocation(name);
		this.constantLocations.h[name] = location;
		return location;
	}
	,getTextureUnit: function(name) {
		var unit = this.state.getTextureUnit(name);
		this.textureUnits.h[name] = unit;
		return unit;
	}
	,update: function() {
		var h = this.constantLocations.h;
		var name_h = h;
		var name_keys = Object.keys(h);
		var name_length = name_keys.length;
		var name_current = 0;
		while(name_current < name_length) {
			var name = name_keys[name_current++];
			var oldLocation = this.constantLocations.h[name];
			var newLocation = this.state.getConstantLocation(name);
			oldLocation.type = newLocation.type;
			oldLocation.value = newLocation.value;
		}
		var h = this.textureUnits.h;
		var name_h = h;
		var name_keys = Object.keys(h);
		var name_length = name_keys.length;
		var name_current = 0;
		while(name_current < name_length) {
			var name = name_keys[name_current++];
			var oldUnit = this.textureUnits.h[name];
			var newUnit = this.state.getTextureUnit(name);
			oldUnit.value = newUnit.value;
		}
	}
	,__class__: Pipeline
};
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) {
		throw haxe_Exception.thrown("No such constructor " + constr);
	}
	if(Reflect.isFunction(f)) {
		if(params == null) {
			throw haxe_Exception.thrown("Constructor " + constr + " need parameters");
		}
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) {
		throw haxe_Exception.thrown("Constructor " + constr + " does not need parameters");
	}
	return f;
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
var UInt = {};
UInt.gt = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) {
		return aNeg;
	} else {
		return a > b;
	}
};
UInt.gte = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) {
		return aNeg;
	} else {
		return a >= b;
	}
};
UInt.toFloat = function(this1) {
	var int = this1;
	if(int < 0) {
		return 4294967296.0 + int;
	} else {
		return int + 0.0;
	}
};
var Frame = function() {
	this.commands = [];
};
$hxClasses["Frame"] = Frame;
Frame.__name__ = true;
Frame.prototype = {
	commands: null
	,__class__: Frame
};
var WorkerKha = $hx_exports["WorkerKha"] = function() {
	WorkerKha.instance = this;
	this.frames = [];
	this.currentFrame = new Frame();
	this.images = new haxe_ds_IntMap();
	this.shaders = new haxe_ds_StringMap();
	this.pipelines = new haxe_ds_IntMap();
	this.pipelinesByVertexShader = new haxe_ds_StringMap();
	this.pipelinesByFragmentShader = new haxe_ds_StringMap();
	this.indexBuffers = new haxe_ds_IntMap();
	this.vertexBuffers = new haxe_ds_IntMap();
	this.constantLocations = new haxe_ds_IntMap();
	this.textureUnits = new haxe_ds_IntMap();
	this.renderTargets = new haxe_ds_IntMap();
	this.sounds = new haxe_ds_IntMap();
	this.lastImageId = 0;
	kha_input_Keyboard.get().notify($bind(this,this.keyDown),$bind(this,this.keyUp),$bind(this,this.keyPress));
	kha_input_Mouse.get().notify($bind(this,this.mouseDown),$bind(this,this.mouseUp),$bind(this,this.mouseMove),$bind(this,this.mouseWheel));
	this.worker = null;
	this.renderTarget = kha_Image.createRenderTarget(window.screen.width,window.screen.height,0,2);
};
$hxClasses["WorkerKha"] = WorkerKha;
WorkerKha.__name__ = true;
WorkerKha.prototype = {
	worker: null
	,frames: null
	,currentFrame: null
	,images: null
	,lastImageId: null
	,shaders: null
	,pipelines: null
	,pipelinesByVertexShader: null
	,pipelinesByFragmentShader: null
	,indexBuffers: null
	,vertexBuffers: null
	,constantLocations: null
	,textureUnits: null
	,renderTargets: null
	,sounds: null
	,workerDir: null
	,width: null
	,height: null
	,renderTarget: null
	,loadText: function(path,callback) {
		var request = new XMLHttpRequest();
		request.open("GET",path,true);
		request.responseType = "text";
		request.onreadystatechange = function() {
			if(request.readyState != 4) {
				return;
			}
			if(request.status >= 200 && request.status < 400) {
				callback(request.response);
			} else {
				haxe_Log.trace("Error loading " + path,{ fileName : "WorkerKha.hx", lineNumber : 100, className : "WorkerKha", methodName : "loadText"});
			}
		};
		request.send(null);
	}
	,load: function(workerPath) {
		var _gthis = this;
		this.loadText(workerPath,function(source) {
			if(_gthis.worker != null) {
				_gthis.worker.terminate();
			}
			var image = _gthis.images.iterator();
			while(image.hasNext()) {
				var image1 = image.next();
				image1.unload();
			}
			var pipeline = _gthis.pipelines.iterator();
			while(pipeline.hasNext()) {
				var pipeline1 = pipeline.next();
				pipeline1.state.delete();
			}
			var buffer = _gthis.indexBuffers.iterator();
			while(buffer.hasNext()) {
				var buffer1 = buffer.next();
				buffer1.delete();
			}
			var buffer = _gthis.vertexBuffers.iterator();
			while(buffer.hasNext()) {
				var buffer1 = buffer.next();
				buffer1.delete();
			}
			var image = _gthis.renderTargets.iterator();
			while(image.hasNext()) {
				var image1 = image.next();
				image1.unload();
			}
			var sound = _gthis.sounds.iterator();
			while(sound.hasNext()) {
				var sound1 = sound.next();
				sound1.unload();
			}
			_gthis.images = new haxe_ds_IntMap();
			_gthis.shaders = new haxe_ds_StringMap();
			_gthis.pipelines = new haxe_ds_IntMap();
			_gthis.pipelinesByVertexShader = new haxe_ds_StringMap();
			_gthis.pipelinesByFragmentShader = new haxe_ds_StringMap();
			_gthis.indexBuffers = new haxe_ds_IntMap();
			_gthis.vertexBuffers = new haxe_ds_IntMap();
			_gthis.constantLocations = new haxe_ds_IntMap();
			_gthis.textureUnits = new haxe_ds_IntMap();
			_gthis.renderTargets = new haxe_ds_IntMap();
			_gthis.sounds = new haxe_ds_IntMap();
			_gthis.width = -1;
			_gthis.height = -1;
			_gthis.frames = [];
			_gthis.lastImageId = 0;
			_gthis.workerDir = workerPath.substring(0,workerPath.lastIndexOf("/") + 1);
			_gthis.worker = new Worker(workerPath);
			_gthis.worker.addEventListener("message",$bind(_gthis,_gthis.onMessage),false);
		});
	}
	,inject: function(workerPath) {
		this.loadText(workerPath,function(source) {
		});
	}
	,transformShaderName: function(name,type) {
		if(kha_SystemImpl.gl2) {
			return name + "-webgl2." + type + ".essl";
		} else {
			var highp = kha_SystemImpl.gl.getShaderPrecisionFormat(35632,36338);
			var highpSupported = highp.precision != 0;
			if(!highpSupported) {
				return name + "-relaxed." + type + ".essl";
			} else {
				return name + "." + type + ".essl";
			}
		}
	}
	,injectShader: function(shaderPath) {
		var _gthis = this;
		var localPath = HxOverrides.substr(shaderPath,shaderPath.lastIndexOf("/") + 1,null);
		localPath = HxOverrides.substr(localPath,0,localPath.length - 4) + "essl";
		if(StringTools.endsWith(shaderPath,".frag.glsl")) {
			shaderPath = this.transformShaderName(HxOverrides.substr(shaderPath,0,shaderPath.length - 10),"frag");
		} else {
			shaderPath = this.transformShaderName(HxOverrides.substr(shaderPath,0,shaderPath.length - 10),"vert");
		}
		this.loadText(shaderPath,function(source) {
			if(StringTools.endsWith(shaderPath,".frag.essl")) {
				var shader = kha_graphics4_FragmentShader.fromSource(source);
				_gthis.shaders.h[localPath] = shader;
				var pipeline = _gthis.pipelinesByFragmentShader.h[localPath];
				if(pipeline != null) {
					pipeline.state.fragmentShader = shader;
					pipeline.state.compile();
					pipeline.update();
				}
			} else if(StringTools.endsWith(shaderPath,".vert.essl")) {
				var shader = kha_graphics4_VertexShader.fromSource(source);
				_gthis.shaders.h[localPath] = shader;
				var pipeline = _gthis.pipelinesByVertexShader.h[localPath];
				if(pipeline != null) {
					pipeline.state.vertexShader = shader;
					pipeline.state.compile();
					pipeline.update();
				}
			}
		});
	}
	,render: function(framebuffers) {
		var framebuffer = framebuffers[0];
		if(kha_System.windowWidth() != this.width || kha_System.windowHeight() != this.height) {
			this.width = kha_System.windowWidth();
			this.height = kha_System.windowHeight();
			if(this.worker != null) {
				this.worker.postMessage({ command : "setWindowSize", width : this.width, height : this.height});
			}
		}
		if(this.frames.length > 0) {
			var g = this.renderTarget.get_g4();
			var _g = 0;
			var _g1 = this.frames;
			while(_g < _g1.length) {
				var frame = _g1[_g];
				++_g;
				var commands = frame.commands;
				var _g2 = 0;
				while(_g2 < commands.length) {
					var command = commands[_g2];
					++_g2;
					switch(command.command) {
					case "begin":
						if(command.renderTarget < 0) {
							g = this.renderTarget.get_g4();
							g.begin();
							g.viewport(0,0,this.width,this.height);
						} else {
							g = this.renderTargets.h[command.renderTarget].get_g4();
							g.begin();
						}
						break;
					case "clear":
						g.clear(command.color == null ? null : kha_Color._new(command.color),command.hasDepth ? command.depth : null,command.hasStencil ? command.stencil : null);
						break;
					case "createConstantLocation":
						var this1 = this.constantLocations;
						var k = command.id;
						var v = this.pipelines.h[command.pipeline].getConstantLocation(command.name);
						this1.h[k] = v;
						break;
					case "createTextureUnit":
						var this2 = this.textureUnits;
						var k1 = command.id;
						var v1 = this.pipelines.h[command.pipeline].getTextureUnit(command.name);
						this2.h[k1] = v1;
						break;
					case "disableScissor":
						g.disableScissor();
						break;
					case "drawIndexedVertices":
						g.drawIndexedVertices(command.start,command.count);
						break;
					case "drawIndexedVerticesInstanced":
						g.drawIndexedVerticesInstanced(command.instanceCount,command.start,command.count);
						break;
					case "end":
						g.end();
						break;
					case "scissor":
						g.scissor(command.x,command.y,command.width,command.height);
						break;
					case "setBool":
						g.setBool(this.constantLocations.h[command.location],command.value);
						break;
					case "setFloat":
						g.setFloat(this.constantLocations.h[command.location],command.value);
						break;
					case "setFloat2":
						g.setFloat2(this.constantLocations.h[command.location],command._0,command._1);
						break;
					case "setFloat3":
						g.setFloat3(this.constantLocations.h[command.location],command._0,command._1,command._2);
						break;
					case "setFloat4":
						g.setFloat4(this.constantLocations.h[command.location],command._0,command._1,command._2,command._3);
						break;
					case "setFloats":
						g.setFloats(this.constantLocations.h[command.location],command.values);
						break;
					case "setIndexBuffer":
						g.setIndexBuffer(this.indexBuffers.h[command.id]);
						break;
					case "setInt":
						g.setInt(this.constantLocations.h[command.location],command.value);
						break;
					case "setMatrix3":
						g.setMatrix3(this.constantLocations.h[command.location],new kha_math_FastMatrix3(command._00,command._10,command._20,command._01,command._11,command._21,command._02,command._12,command._22));
						break;
					case "setMatrix4":
						g.setMatrix(this.constantLocations.h[command.location],new kha_math_FastMatrix4(command._00,command._10,command._20,command._30,command._01,command._11,command._21,command._31,command._02,command._12,command._22,command._32,command._03,command._13,command._23,command._33));
						break;
					case "setPipeline":
						g.setPipeline(this.pipelines.h[command.id].state);
						break;
					case "setTexture":
						if(command.texture < 0 && command.renderTarget < 0) {
							g.setTexture(this.textureUnits.h[command.stage],null);
						} else if(command.texture < 0) {
							g.setTexture(this.textureUnits.h[command.stage],this.renderTargets.h[command.renderTarget]);
						} else {
							g.setTexture(this.textureUnits.h[command.stage],this.images.h[command.texture]);
						}
						break;
					case "setTextureParameters":
						g.setTextureParameters(this.textureUnits.h[command.id],command.uAddressing,command.vAddressing,command.minificationFilter,command.magnificationFilter,command.mipmapFilter);
						break;
					case "setVector2":
						g.setVector2(this.constantLocations.h[command.location],new kha_math_FastVector2(command.x,command.y));
						break;
					case "setVector3":
						g.setVector3(this.constantLocations.h[command.location],new kha_math_FastVector3(command.x,command.y,command.z));
						break;
					case "setVector4":
						g.setVector4(this.constantLocations.h[command.location],new kha_math_FastVector4(command.x,command.y,command.z,command.w));
						break;
					case "setVertexBuffer":
						g.setVertexBuffer(this.vertexBuffers.h[command.id]);
						break;
					case "setVertexBuffers":
						var buffers = [];
						var _g3 = 0;
						var _g4 = command.ids.length;
						while(_g3 < _g4) {
							var i = _g3++;
							buffers.push(this.vertexBuffers.h[command.ids[i]]);
						}
						g.setVertexBuffers(buffers);
						break;
					case "unlockImage":
						var image = this.images.h[command.id];
						var bytes = image.lock();
						new Uint8Array(bytes.b.bufferValue).set(new Uint8Array(command.bytes));
						image.unlock();
						break;
					case "updateIndexBuffer":
						var indexBuffer = this.indexBuffers.h[command.id];
						var data = indexBuffer.lock().buffer;
						new Uint8Array(data).set(new Uint8Array(command.data.buffer));
						indexBuffer.unlock();
						break;
					case "updateVertexBuffer":
						var vertexBuffer = this.vertexBuffers.h[command.id];
						var start = command.start;
						var count = command.count;
						var data1 = vertexBuffer.lock(start,count).buffer;
						new Uint8Array(data1).set(new Uint8Array(command.data.buffer));
						vertexBuffer.unlock();
						break;
					case "viewport":
						g.viewport(command.x,command.y,command.width,command.height);
						break;
					}
				}
			}
			this.frames = [];
		}
		if(this.worker != null) {
			this.worker.postMessage({ command : "frame"});
		}
		framebuffer.get_g2().begin();
		framebuffer.get_g2().clear(-16777216);
		if(kha_Image.renderTargetsInvertedY()) {
			framebuffer.get_g2().drawScaledSubImage(this.renderTarget,0,this.height,this.width,-this.height,0,0,this.width,this.height);
		} else {
			framebuffer.get_g2().drawImage(this.renderTarget,0,0);
		}
		framebuffer.get_g2().end();
	}
	,keyDown: function(key) {
		if(this.worker != null) {
			this.worker.postMessage({ command : "keyDown", key : key});
		}
	}
	,keyUp: function(key) {
		if(this.worker != null) {
			this.worker.postMessage({ command : "keyUp", key : key});
		}
	}
	,keyPress: function(character) {
		if(this.worker != null) {
			this.worker.postMessage({ command : "keyPress", character : character});
		}
	}
	,mouseDown: function(button,x,y) {
		if(this.worker != null) {
			this.worker.postMessage({ command : "mouseDown", button : button, x : x, y : y});
		}
	}
	,mouseUp: function(button,x,y) {
		if(this.worker != null) {
			this.worker.postMessage({ command : "mouseUp", button : button, x : x, y : y});
		}
	}
	,mouseMove: function(x,y,mx,my) {
		if(this.worker != null) {
			this.worker.postMessage({ command : "mouseMove", x : x, y : y, mx : mx, my : my});
		}
	}
	,mouseWheel: function(delta) {
		if(this.worker != null) {
			this.worker.postMessage({ command : "mouseWheel", delta : delta});
		}
	}
	,onMessage: function(message) {
		var _gthis = this;
		var data = message.data;
		switch(data.command) {
		case "beginFrame":
			break;
		case "compilePipeline":
			var pipe = new Pipeline();
			pipe.state.fragmentShader = this.shaders.h[data.frag];
			this.pipelinesByFragmentShader.h[pipe.state.fragmentShader.files[0]] = pipe;
			pipe.state.vertexShader = this.shaders.h[data.vert];
			this.pipelinesByVertexShader.h[pipe.state.vertexShader.files[0]] = pipe;
			pipe.state.inputLayout = [];
			var layout = data.layout;
			var _g = 0;
			while(_g < layout.length) {
				var structure = layout[_g];
				++_g;
				var newstructure = new kha_graphics4_VertexStructure();
				var elements = structure.elements;
				var _g1 = 0;
				while(_g1 < elements.length) {
					var element = elements[_g1];
					++_g1;
					var newelement = new kha_graphics4_VertexElement(element.name,element.data);
					newstructure.elements.push(newelement);
				}
				pipe.state.inputLayout.push(newstructure);
			}
			var state = data.state;
			pipe.state.cullMode = state.cullMode;
			pipe.state.depthWrite = state.depthWrite;
			pipe.state.depthMode = state.depthMode;
			pipe.state.stencilFrontMode = state.stencilFrontMode;
			pipe.state.stencilFrontBothPass = state.stencilFrontBothPass;
			pipe.state.stencilFrontDepthFail = state.stencilFrontDepthFail;
			pipe.state.stencilFrontFail = state.stencilFrontFail;
			pipe.state.stencilBackMode = state.stencilBackMode;
			pipe.state.stencilBackBothPass = state.stencilBackBothPass;
			pipe.state.stencilBackDepthFail = state.stencilBackDepthFail;
			pipe.state.stencilBackFail = state.stencilBackFail;
			pipe.state.stencilReferenceValue = state.stencilReferenceValue;
			pipe.state.stencilReadMask = state.stencilReadMask;
			pipe.state.stencilWriteMask = state.stencilWriteMask;
			pipe.state.blendSource = state.blendSource;
			pipe.state.blendDestination = state.blendDestination;
			pipe.state.alphaBlendSource = state.alphaBlendSource;
			pipe.state.alphaBlendDestination = state.alphaBlendDestination;
			pipe.state.colorWriteMasksRed[0] = state.colorWriteMaskRed;
			pipe.state.colorWriteMasksGreen[0] = state.colorWriteMaskGreen;
			pipe.state.colorWriteMasksBlue[0] = state.colorWriteMaskBlue;
			pipe.state.colorWriteMasksAlpha[0] = state.colorWriteMaskAlpha;
			pipe.state.conservativeRasterization = state.conservativeRasterization;
			pipe.state.compile();
			this.pipelines.h[data.id] = pipe;
			break;
		case "createImage":
			var this1 = this.images;
			var k = data.id;
			var v = kha_Image.create(data.width,data.height,data.format,data.usage);
			this1.h[k] = v;
			break;
		case "createIndexBuffer":
			var this1 = this.indexBuffers;
			var k = data.id;
			var v = new kha_graphics4_IndexBuffer(data.size,data.usage);
			this1.h[k] = v;
			break;
		case "createRenderTarget":
			var this1 = this.renderTargets;
			var k = data.id;
			var v = kha_Image.createRenderTarget(data.width,data.height);
			this1.h[k] = v;
			break;
		case "createVertexBuffer":
			var structure = new kha_graphics4_VertexStructure();
			var elements = data.structure.elements;
			var _g = 0;
			while(_g < elements.length) {
				var element = elements[_g];
				++_g;
				var newelement = new kha_graphics4_VertexElement(element.name,element.data);
				structure.elements.push(newelement);
			}
			var this1 = this.vertexBuffers;
			var k = data.id;
			var v = new kha_graphics4_VertexBuffer(data.size,structure,data.usage);
			this1.h[k] = v;
			break;
		case "endFrame":
			this.frames.push(this.currentFrame);
			this.currentFrame = new Frame();
			break;
		case "loadBlob":
			kha_Assets.loadBlobFromPath(this.workerDir + data.file,function(blob) {
				if(_gthis.worker != null) {
					_gthis.worker.postMessage({ command : "loadedBlob", id : data.id, data : blob.bytes.b.bufferValue});
				}
			},null,{ fileName : "WorkerKha.hx", lineNumber : 390, className : "WorkerKha", methodName : "onMessage"});
			break;
		case "loadImage":
			kha_Assets.loadImageFromPath(this.workerDir + data.file,false,function(image) {
				_gthis.images.h[data.id] = image;
				if(_gthis.worker != null) {
					_gthis.worker.postMessage({ command : "loadedImage", id : data.id, width : image.get_width(), height : image.get_height(), realWidth : image.get_realWidth(), realHeight : image.get_realHeight()});
				}
			},null,{ fileName : "WorkerKha.hx", lineNumber : 396, className : "WorkerKha", methodName : "onMessage"});
			break;
		case "loadSound":
			kha_Assets.loadSoundFromPath(this.workerDir + data.file,function(sound) {
				_gthis.sounds.h[data.id] = sound;
				if(_gthis.worker != null) {
					_gthis.worker.postMessage({ command : "loadedSound", id : data.id, file : data.file});
				}
			},null,{ fileName : "WorkerKha.hx", lineNumber : 403, className : "WorkerKha", methodName : "onMessage"});
			break;
		case "playSound":
			kha_audio2_Audio1.play(this.sounds.h[data.id],data.loop);
			break;
		case "setShaders":
			var shaders = data.shaders;
			var _g = 0;
			while(_g < shaders.length) {
				var shader = shaders[_g];
				++_g;
				var name = shader.name;
				if(StringTools.endsWith(name,"_frag")) {
					var this1 = this.shaders;
					var k = shader.files[0];
					var v = new kha_graphics4_FragmentShader(shader.sources,shader.files);
					this1.h[k] = v;
				} else if(StringTools.endsWith(name,"_vert")) {
					var this2 = this.shaders;
					var k1 = shader.files[0];
					var v1 = new kha_graphics4_VertexShader(shader.sources,shader.files);
					this2.h[k1] = v1;
				}
			}
			break;
		case "begin":case "clear":case "createConstantLocation":case "createTextureUnit":case "disableScissor":case "drawIndexedVertices":case "drawIndexedVerticesInstanced":case "end":case "scissor":case "setBool":case "setFloat":case "setFloat2":case "setFloat3":case "setFloat4":case "setFloats":case "setIndexBuffer":case "setInt":case "setMatrix3":case "setMatrix4":case "setPipeline":case "setTexture":case "setTextureParameters":case "setVector2":case "setVector3":case "setVector4":case "setVertexBuffer":case "setVertexBuffers":case "unlockImage":case "updateIndexBuffer":case "updateVertexBuffer":case "viewport":
			this.currentFrame.commands.push(data);
			break;
		case "streamSound":
			kha_audio2_Audio1.stream(this.sounds.h[data.id],data.loop);
			break;
		case "uncompressSound":
			this.sounds.h[data.id].uncompress(function() {
				if(_gthis.worker != null) {
					_gthis.worker.postMessage({ command : "uncompressedSound", id : data.id});
				}
			});
			break;
		}
	}
	,__class__: WorkerKha
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
haxe_IMap.__isInterface__ = true;
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = true;
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,get_message: function() {
		return this.message;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = true;
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			str += ", " + Std.string(v);
		}
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
var haxe__$Unserializer_DefaultResolver = function() {
};
$hxClasses["haxe._Unserializer.DefaultResolver"] = haxe__$Unserializer_DefaultResolver;
haxe__$Unserializer_DefaultResolver.__name__ = true;
haxe__$Unserializer_DefaultResolver.prototype = {
	resolveClass: function(name) {
		return $hxClasses[name];
	}
	,resolveEnum: function(name) {
		return $hxEnums[name];
	}
	,__class__: haxe__$Unserializer_DefaultResolver
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = this.buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = new haxe__$Unserializer_DefaultResolver();
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.resolver = r;
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = true;
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g = 0;
	var _g1 = haxe_Unserializer.BASE64.length;
	while(_g < _g1) {
		var i = _g++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) {
				break;
			}
			if(c == 45) {
				if(this.pos != fpos) {
					break;
				}
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) {
				break;
			}
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) {
			k *= -1;
		}
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) {
				break;
			}
			if(c >= 43 && c < 58 || c == 101 || c == 69) {
				this.pos++;
			} else {
				break;
			}
		}
		return parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) {
				throw haxe_Exception.thrown("Invalid object");
			}
			if(this.buf.charCodeAt(this.pos) == 103) {
				break;
			}
			var k = this.unserialize();
			if(typeof(k) != "string") {
				throw haxe_Exception.thrown("Invalid object key");
			}
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) {
			throw haxe_Exception.thrown("Invalid enum format");
		}
		var nargs = this.readDigits();
		if(nargs == 0) {
			return Type.createEnum(edecl,tag);
		}
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		switch(this.buf.charCodeAt(this.pos++)) {
		case 65:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			return cl;
		case 66:
			var name = this.unserialize();
			var e = this.resolver.resolveEnum(name);
			if(e == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			return e;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			var o = Object.create(cl.prototype);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) {
				throw haxe_Exception.thrown("Invalid custom data");
			}
			return o;
		case 77:
			var h = new haxe_ds_ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) {
				throw haxe_Exception.thrown("Invalid string reference");
			}
			return this.scache[n];
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else {
					a.push(this.unserialize());
				}
			}
			return a;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				var value = this.unserialize();
				h.h[s] = value;
			}
			this.pos++;
			return h;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			var o = Object.create(cl.prototype);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 100:
			return this.readFloat();
		case 102:
			return false;
		case 105:
			return this.readDigits();
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			this.pos++;
			var index = this.readDigits();
			var _this = edecl.__constructs__;
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while(_g < _g1) {
				var i = _g++;
				result[i] = _this[i]._hx_name;
			}
			var tag = result[index];
			if(tag == null) {
				throw haxe_Exception.thrown("Unknown enum index " + name + "@" + index);
			}
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 107:
			return NaN;
		case 108:
			var l = new haxe_ds_List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 109:
			return -Infinity;
		case 110:
			return null;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 112:
			return Infinity;
		case 113:
			var h = new haxe_ds_IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				var value = this.unserialize();
				h.h[i] = value;
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) {
				throw haxe_Exception.thrown("Invalid IntMap format");
			}
			return h;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) {
				throw haxe_Exception.thrown("Invalid reference");
			}
			return this.cache[n];
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) {
				throw haxe_Exception.thrown("Invalid bytes length");
			}
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2 ? rest - 1 : 0);
			var max = i + (len - rest);
			var bytes = new haxe_io_Bytes(new ArrayBuffer(size));
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c1 << 2 | c2 >> 4;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c2 << 4 | c3 >> 2;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c3 << 6 | c4;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c1 << 2 | c2 >> 4;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = c2 << 4 | c3 >> 2;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 116:
			return true;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
				this.pos += 19;
			} else {
				d = new Date(this.readFloat());
			}
			this.cache.push(d);
			return d;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 120:
			throw haxe_Exception.thrown(this.unserialize());
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) {
				throw haxe_Exception.thrown("Invalid string length");
			}
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 122:
			return 0;
		default:
		}
		this.pos--;
		throw haxe_Exception.thrown("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	value: null
	,unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,data: null
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		return new haxe_io_Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	,getDouble: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat64(pos,true);
	}
	,getFloat: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat32(pos,true);
	}
	,setDouble: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat64(pos,v,true);
	}
	,setFloat: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat32(pos,v,true);
	}
	,getUInt16: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getUint16(pos,true);
	}
	,getInt32: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getInt32(pos,true);
	}
	,setInt32: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setInt32(pos,v,true);
	}
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = true;
haxe_crypto_Base64.encode = function(bytes,complement) {
	if(complement == null) {
		complement = true;
	}
	var str = new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).encodeBytes(bytes).toString();
	if(complement) {
		switch(bytes.length % 3) {
		case 1:
			str += "==";
			break;
		case 2:
			str += "=";
			break;
		default:
		}
	}
	return str;
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) ++nbits;
	if(nbits > 8 || len != 1 << nbits) {
		throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
	}
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = true;
haxe_crypto_BaseCode.prototype = {
	base: null
	,nbits: null
	,encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = new haxe_io_Bytes(new ArrayBuffer(size + (b.length * 8 % nbits == 0 ? 0 : 1)));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.b[pin++];
			}
			curbits -= nbits;
			out.b[pout++] = base.b[buf >> curbits & mask];
		}
		if(curbits > 0) {
			out.b[pout++] = base.b[buf << nbits - curbits & mask];
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	h: null
	,keys: function() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) a.push(+key);
		return new haxe_iterators_ArrayIterator(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_List = function() {
	this.length = 0;
};
$hxClasses["haxe.ds.List"] = haxe_ds_List;
haxe_ds_List.__name__ = true;
haxe_ds_List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
$hxClasses["haxe.ds._List.ListNode"] = haxe_ds__$List_ListNode;
haxe_ds__$List_ListNode.__name__ = true;
haxe_ds__$List_ListNode.prototype = {
	item: null
	,next: null
	,__class__: haxe_ds__$List_ListNode
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,__class__: haxe_ds_StringMap
};
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
};
$hxClasses["haxe.exceptions.PosException"] = haxe_exceptions_PosException;
haxe_exceptions_PosException.__name__ = true;
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	posInfos: null
	,toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
	,__class__: haxe_exceptions_PosException
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
};
$hxClasses["haxe.exceptions.NotImplementedException"] = haxe_exceptions_NotImplementedException;
haxe_exceptions_NotImplementedException.__name__ = true;
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
	__class__: haxe_exceptions_NotImplementedException
});
var haxe_io_BytesBuffer = function() {
	this.pos = 0;
	this.size = 0;
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = true;
haxe_io_BytesBuffer.prototype = {
	buffer: null
	,view: null
	,u8: null
	,pos: null
	,size: null
	,addByte: function(byte) {
		if(this.pos == this.size) {
			this.grow(1);
		}
		this.view.setUint8(this.pos++,byte);
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.pos + len > this.size) {
			this.grow(len);
		}
		if(this.size == 0) {
			return;
		}
		var sub = new Uint8Array(src.b.buffer,src.b.byteOffset + pos,len);
		this.u8.set(sub,this.pos);
		this.pos += len;
	}
	,grow: function(delta) {
		var req = this.pos + delta;
		var nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		var nbuf = new ArrayBuffer(nsize);
		var nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	,getBytes: function() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		var b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Input = function() { };
$hxClasses["haxe.io.Input"] = haxe_io_Input;
haxe_io_Input.__name__ = true;
haxe_io_Input.prototype = {
	bigEndian: null
	,readByte: function() {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Input.hx", lineNumber : 53, className : "haxe.io.Input", methodName : "readByte"});
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		try {
			while(k > 0) {
				b[pos] = this.readByte();
				++pos;
				--k;
			}
		} catch( _g ) {
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return len - k;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = new haxe_io_Bytes(new ArrayBuffer(nbytes));
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) {
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
		}
	}
	,readString: function(len,encoding) {
		var b = new haxe_io_Bytes(new ArrayBuffer(len));
		this.readFullBytes(b,0,len);
		return b.getString(0,len,encoding);
	}
	,__class__: haxe_io_Input
};
var haxe_io_BytesInput = function(b,pos,len) {
	if(pos == null) {
		pos = 0;
	}
	if(len == null) {
		len = b.length - pos;
	}
	if(pos < 0 || len < 0 || pos + len > b.length) {
		throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
	}
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe_io_BytesInput;
haxe_io_BytesInput.__name__ = true;
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	b: null
	,pos: null
	,len: null
	,totlen: null
	,set_position: function(p) {
		if(p < 0) {
			p = 0;
		} else if(p > this.totlen) {
			p = this.totlen;
		}
		this.len = this.totlen - p;
		return this.pos = p;
	}
	,readByte: function() {
		if(this.len == 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.len == 0 && len > 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		if(this.len < len) {
			len = this.len;
		}
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe_io_BytesInput
});
var haxe_io_Output = function() { };
$hxClasses["haxe.io.Output"] = haxe_io_Output;
haxe_io_Output.__name__ = true;
haxe_io_Output.prototype = {
	bigEndian: null
	,writeByte: function(c) {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Output.hx", lineNumber : 47, className : "haxe.io.Output", methodName : "writeByte"});
	}
	,writeBytes: function(s,pos,len) {
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		var b = s.b;
		var k = len;
		while(k > 0) {
			this.writeByte(b[pos]);
			++pos;
			--k;
		}
		return len;
	}
	,write: function(s) {
		var l = s.length;
		var p = 0;
		while(l > 0) {
			var k = this.writeBytes(s,p,l);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			l -= k;
		}
	}
	,writeFloat: function(x) {
		this.writeInt32(haxe_io_FPHelper.floatToI32(x));
	}
	,writeInt32: function(x) {
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	,__class__: haxe_io_Output
};
var haxe_io_BytesOutput = function() {
	this.b = new haxe_io_BytesBuffer();
};
$hxClasses["haxe.io.BytesOutput"] = haxe_io_BytesOutput;
haxe_io_BytesOutput.__name__ = true;
haxe_io_BytesOutput.__super__ = haxe_io_Output;
haxe_io_BytesOutput.prototype = $extend(haxe_io_Output.prototype,{
	b: null
	,writeByte: function(c) {
		this.b.addByte(c);
	}
	,writeBytes: function(buf,pos,len) {
		this.b.addBytes(buf,pos,len);
		return len;
	}
	,getBytes: function() {
		return this.b.getBytes();
	}
	,__class__: haxe_io_BytesOutput
});
var haxe_io_Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.floatToI32 = function(f) {
	haxe_io_FPHelper.helper.setFloat32(0,f,true);
	return haxe_io_FPHelper.helper.getInt32(0,true);
};
var haxe_io_UInt8Array = {};
haxe_io_UInt8Array.fromBytes = function(bytes,bytePos,length) {
	if(bytePos == null) {
		bytePos = 0;
	}
	if(length == null) {
		length = bytes.length - bytePos;
	}
	return new Uint8Array(bytes.b.bufferValue,bytePos,length);
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_lib__$ArrayBuffer_ArrayBufferCompat = function() { };
$hxClasses["js.lib._ArrayBuffer.ArrayBufferCompat"] = js_lib__$ArrayBuffer_ArrayBufferCompat;
js_lib__$ArrayBuffer_ArrayBufferCompat.__name__ = true;
js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null ? null : end - begin);
	var resultArray = new Uint8Array(u.byteLength);
	resultArray.set(u);
	return resultArray.buffer;
};
var kha__$Assets_ImageList = function() {
	this.names = [];
};
$hxClasses["kha._Assets.ImageList"] = kha__$Assets_ImageList;
kha__$Assets_ImageList.__name__ = true;
kha__$Assets_ImageList.prototype = {
	get: function(name) {
		return Reflect.field(this,name);
	}
	,names: null
	,__class__: kha__$Assets_ImageList
};
var kha__$Assets_SoundList = function() {
	this.names = [];
};
$hxClasses["kha._Assets.SoundList"] = kha__$Assets_SoundList;
kha__$Assets_SoundList.__name__ = true;
kha__$Assets_SoundList.prototype = {
	get: function(name) {
		return Reflect.field(this,name);
	}
	,names: null
	,__class__: kha__$Assets_SoundList
};
var kha__$Assets_BlobList = function() {
	this.names = [];
};
$hxClasses["kha._Assets.BlobList"] = kha__$Assets_BlobList;
kha__$Assets_BlobList.__name__ = true;
kha__$Assets_BlobList.prototype = {
	get: function(name) {
		return Reflect.field(this,name);
	}
	,names: null
	,__class__: kha__$Assets_BlobList
};
var kha__$Assets_FontList = function() {
	this.names = [];
};
$hxClasses["kha._Assets.FontList"] = kha__$Assets_FontList;
kha__$Assets_FontList.__name__ = true;
kha__$Assets_FontList.prototype = {
	get: function(name) {
		return Reflect.field(this,name);
	}
	,names: null
	,__class__: kha__$Assets_FontList
};
var kha__$Assets_VideoList = function() {
	this.names = [];
};
$hxClasses["kha._Assets.VideoList"] = kha__$Assets_VideoList;
kha__$Assets_VideoList.__name__ = true;
kha__$Assets_VideoList.prototype = {
	get: function(name) {
		return Reflect.field(this,name);
	}
	,names: null
	,__class__: kha__$Assets_VideoList
};
var kha_Assets = function() { };
$hxClasses["kha.Assets"] = kha_Assets;
kha_Assets.__name__ = true;
kha_Assets.loadEverything = function(callback,filter,uncompressSoundsFilter,failed) {
	var lists = [kha__$Assets_ImageList,kha__$Assets_SoundList,kha__$Assets_BlobList,kha__$Assets_FontList,kha__$Assets_VideoList];
	var listInstances = [kha_Assets.images,kha_Assets.sounds,kha_Assets.blobs,kha_Assets.fonts,kha_Assets.videos];
	var fileCount = 0;
	var byteCount = 0;
	var _g = 0;
	var _g1 = lists.length;
	while(_g < _g1) {
		var i = _g++;
		var list = lists[i];
		var _g2 = 0;
		var _g3 = Type.getInstanceFields(list);
		while(_g2 < _g3.length) {
			var file = _g3[_g2];
			++_g2;
			if(StringTools.endsWith(file,"Description")) {
				++fileCount;
			} else if(StringTools.endsWith(file,"Size")) {
				var size = Reflect.field(listInstances[i],file);
				byteCount += size;
			}
		}
	}
	if(fileCount == 0) {
		callback();
		return;
	}
	var filesLeft = fileCount;
	var bytesLeft = byteCount;
	var onLoaded = function(bytes) {
		filesLeft -= 1;
		bytesLeft -= bytes;
		kha_Assets.progress = 1 - bytesLeft / byteCount;
		if(filesLeft == 0) {
			callback();
		}
	};
	var onError = function(err,bytes) {
		(kha_Assets.reporter(failed,{ fileName : "kha/Assets.hx", lineNumber : 116, className : "kha.Assets", methodName : "loadEverything"}))(err);
		onLoaded(bytes);
	};
	var loadFunc = function(desc,done,failure) {
		var name = desc.name;
		var size = desc.file_sizes[0];
		switch(desc.type) {
		case "blob":
			kha_Assets.loadBlob(name,function(blob) {
				done(size);
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 142, className : "kha.Assets", methodName : "loadEverything"});
			break;
		case "font":
			kha_Assets.loadFont(name,function(font) {
				done(size);
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 146, className : "kha.Assets", methodName : "loadEverything"});
			break;
		case "image":
			kha_Assets.loadImage(name,function(image) {
				done(size);
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 125, className : "kha.Assets", methodName : "loadEverything"});
			break;
		case "sound":
			kha_Assets.loadSound(name,function(sound) {
				if(uncompressSoundsFilter == null || uncompressSoundsFilter(desc)) {
					sound.uncompress(function() {
						done(size);
					});
				} else {
					done(size);
				}
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 129, className : "kha.Assets", methodName : "loadEverything"});
			break;
		case "video":
			kha_Assets.loadVideo(name,function(video) {
				done(size);
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 150, className : "kha.Assets", methodName : "loadEverything"});
			break;
		}
	};
	var _g = 0;
	var _g1 = lists.length;
	while(_g < _g1) {
		var i = _g++;
		var list = lists[i];
		var listInstance = listInstances[i];
		var _g2 = 0;
		var _g3 = Type.getInstanceFields(list);
		while(_g2 < _g3.length) {
			var field = _g3[_g2];
			++_g2;
			if(!StringTools.endsWith(field,"Description")) {
				continue;
			}
			var desc = Reflect.field(listInstance,field);
			if(filter == null || filter(desc)) {
				loadFunc(desc,onLoaded,onError);
			} else {
				onLoaded(desc.file_sizes[0]);
			}
		}
	}
};
kha_Assets.loadImage = function(name,done,failed,pos) {
	var description = Reflect.field(kha_Assets.images,name + "Description");
	if(description == null) {
		(kha_Assets.reporter(failed,pos))({ url : name, error : "Name not found"});
		return;
	}
	kha_LoaderImpl.loadImageFromDescription(description,function(image) {
		kha_Assets.images[name] = image;
		done(image);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadImageFromPath = function(path,readable,done,failed,pos) {
	var description = { files : [path], readable : readable};
	kha_LoaderImpl.loadImageFromDescription(description,done,kha_Assets.reporter(failed,pos));
};
kha_Assets.get_imageFormats = function() {
	return kha_LoaderImpl.getImageFormats();
};
kha_Assets.loadBlob = function(name,done,failed,pos) {
	var description = Reflect.field(kha_Assets.blobs,name + "Description");
	if(description == null) {
		(kha_Assets.reporter(failed,pos))({ url : name, error : "Name not found"});
		return;
	}
	kha_LoaderImpl.loadBlobFromDescription(description,function(blob) {
		kha_Assets.blobs[name] = blob;
		done(blob);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadBlobFromPath = function(path,done,failed,pos) {
	var description = { files : [path]};
	kha_LoaderImpl.loadBlobFromDescription(description,done,kha_Assets.reporter(failed,pos));
};
kha_Assets.loadSound = function(name,done,failed,pos) {
	var description = Reflect.field(kha_Assets.sounds,name + "Description");
	if(description == null) {
		(kha_Assets.reporter(failed,pos))({ url : name, error : "Name not found"});
		return;
	}
	kha_LoaderImpl.loadSoundFromDescription(description,function(sound) {
		kha_Assets.sounds[name] = sound;
		done(sound);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadSoundFromPath = function(path,done,failed,pos) {
	var description = { files : [path]};
	kha_LoaderImpl.loadSoundFromDescription(description,done,kha_Assets.reporter(failed,pos));
};
kha_Assets.get_soundFormats = function() {
	return kha_LoaderImpl.getSoundFormats();
};
kha_Assets.loadFont = function(name,done,failed,pos) {
	var description = Reflect.field(kha_Assets.fonts,name + "Description");
	if(description == null) {
		(kha_Assets.reporter(failed,pos))({ url : name, error : "Name not found"});
		return;
	}
	kha_LoaderImpl.loadFontFromDescription(description,function(font) {
		kha_Assets.fonts[name] = font;
		done(font);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadFontFromPath = function(path,done,failed,pos) {
	var description = { files : [path]};
	kha_LoaderImpl.loadFontFromDescription(description,done,kha_Assets.reporter(failed,pos));
};
kha_Assets.get_fontFormats = function() {
	return ["ttf"];
};
kha_Assets.loadVideo = function(name,done,failed,pos) {
	var description = Reflect.field(kha_Assets.videos,name + "Description");
	if(description == null) {
		(kha_Assets.reporter(failed,pos))({ url : name, error : "Name not found"});
		return;
	}
	kha_LoaderImpl.loadVideoFromDescription(description,function(video) {
		kha_Assets.videos[name] = video;
		done(video);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadVideoFromPath = function(path,done,failed,pos) {
	var description = { files : [path]};
	kha_LoaderImpl.loadVideoFromDescription(description,done,kha_Assets.reporter(failed,pos));
};
kha_Assets.get_videoFormats = function() {
	return kha_LoaderImpl.getVideoFormats();
};
kha_Assets.reporter = function(custom,pos) {
	if(custom != null) {
		return custom;
	} else {
		var _g = haxe_Log.trace;
		var infos = pos;
		return function(v) {
			_g(v,infos);
		};
	}
};
var kha_Canvas = function() { };
$hxClasses["kha.Canvas"] = kha_Canvas;
kha_Canvas.__name__ = true;
kha_Canvas.__isInterface__ = true;
kha_Canvas.prototype = {
	get_width: null
	,get_height: null
	,get_g1: null
	,get_g2: null
	,get_g4: null
	,width: null
	,height: null
	,g1: null
	,g2: null
	,g4: null
	,__class__: kha_Canvas
};
var kha_Resource = function() { };
$hxClasses["kha.Resource"] = kha_Resource;
kha_Resource.__name__ = true;
kha_Resource.__isInterface__ = true;
kha_Resource.prototype = {
	unload: null
	,__class__: kha_Resource
};
var kha_Image = function() { };
$hxClasses["kha.Image"] = kha_Image;
kha_Image.__name__ = true;
kha_Image.__interfaces__ = [kha_Resource,kha_Canvas];
kha_Image.create = function(width,height,format,usage) {
	if(format == null) {
		format = 0;
	}
	if(usage == null) {
		usage = 0;
	}
	if(kha_SystemImpl.gl == null) {
		return new kha_CanvasImage(width,height,format,false);
	} else {
		return new kha_WebGLImage(width,height,format,false,0,1);
	}
};
kha_Image.create3D = function(width,height,depth,format,usage) {
	return null;
};
kha_Image.createRenderTarget = function(width,height,format,depthStencil,antiAliasingSamples,contextId) {
	if(contextId == null) {
		contextId = 0;
	}
	if(antiAliasingSamples == null) {
		antiAliasingSamples = 1;
	}
	if(depthStencil == null) {
		depthStencil = 0;
	}
	if(format == null) {
		format = 0;
	}
	if(kha_SystemImpl.gl == null) {
		return new kha_CanvasImage(width,height,format,true);
	} else {
		return new kha_WebGLImage(width,height,format,true,depthStencil,antiAliasingSamples);
	}
};
kha_Image.fromCanvas = function(canvas) {
	if(kha_SystemImpl.gl == null) {
		var img = new kha_CanvasImage(canvas.width,canvas.height,0,false);
		img.image = canvas;
		img.createTexture();
		return img;
	} else {
		var img = new kha_WebGLImage(canvas.width,canvas.height,0,false,0,1);
		img.image = canvas;
		img.createTexture();
		return img;
	}
};
kha_Image.fromImage = function(image,readable) {
	if(kha_SystemImpl.gl == null) {
		var img = new kha_CanvasImage(image.width,image.height,0,false);
		img.image = image;
		img.createTexture();
		return img;
	} else {
		var img = new kha_WebGLImage(image.width,image.height,0,false,0,1);
		img.image = image;
		img.createTexture();
		return img;
	}
};
kha_Image.fromBytes = function(bytes,width,height,format,usage) {
	if(format == null) {
		format = 0;
	}
	if(usage == null) {
		usage = 0;
	}
	if(kha_SystemImpl.gl != null) {
		var img = new kha_WebGLImage(width,height,format,false,0,1);
		img.image = img.bytesToArray(bytes);
		img.createTexture();
		return img;
	}
	var img = new kha_CanvasImage(width,height,format,false);
	var g2 = img.get_g2();
	var canvas = g2.canvas;
	var imageData = new ImageData(new Uint8ClampedArray(bytes.b.bufferValue),width,height);
	canvas.putImageData(imageData,0,0);
	return img;
};
kha_Image.fromBytes3D = function(bytes,width,height,depth,format,usage) {
	return null;
};
kha_Image.fromEncodedBytes = function(bytes,fileExtention,doneCallback,errorCallback,readable) {
	if(readable == null) {
		readable = false;
	}
	var dataUrl = "data:image;base64," + haxe_crypto_Base64.encode(bytes);
	var imageElement = js_Boot.__cast(window.document.createElement("img") , HTMLImageElement);
	imageElement.onload = function() {
		doneCallback(kha_Image.fromImage(imageElement,readable));
	};
	imageElement.onerror = function() {
		errorCallback("Image was not created");
	};
	imageElement.src = dataUrl;
};
kha_Image.fromVideo = function(video) {
	var jsvideo = video;
	if(kha_SystemImpl.gl == null) {
		var img = new kha_CanvasImage(jsvideo.element.videoWidth,jsvideo.element.videoHeight,0,false);
		img.video = jsvideo.element;
		img.createTexture();
		return img;
	} else {
		var img = new kha_WebGLImage(jsvideo.element.videoWidth,jsvideo.element.videoHeight,0,false,0,1);
		img.video = jsvideo.element;
		img.createTexture();
		return img;
	}
};
kha_Image.get_maxSize = function() {
	if(kha_SystemImpl.gl == null) {
		return 8192;
	} else {
		return kha_SystemImpl.gl.getParameter(3379);
	}
};
kha_Image.get_nonPow2Supported = function() {
	return kha_SystemImpl.gl != null;
};
kha_Image.renderTargetsInvertedY = function() {
	return true;
};
kha_Image.prototype = {
	isOpaque: function(x,y) {
		return false;
	}
	,at: function(x,y) {
		return -16777216;
	}
	,unload: function() {
	}
	,lock: function(level) {
		if(level == null) {
			level = 0;
		}
		return null;
	}
	,unlock: function() {
	}
	,getPixels: function() {
		return null;
	}
	,generateMipmaps: function(levels) {
	}
	,setMipmaps: function(mipmaps) {
	}
	,setDepthStencilFrom: function(image) {
	}
	,clear: function(x,y,z,width,height,depth,color) {
	}
	,get_width: function() {
		return 0;
	}
	,get_height: function() {
		return 0;
	}
	,get_depth: function() {
		return 1;
	}
	,get_format: function() {
		return 0;
	}
	,get_realWidth: function() {
		return 0;
	}
	,get_realHeight: function() {
		return 0;
	}
	,get_stride: function() {
		return 0;
	}
	,get_g1: function() {
		return null;
	}
	,get_g2: function() {
		return null;
	}
	,get_g4: function() {
		return null;
	}
	,__class__: kha_Image
};
var kha_CanvasImage = function(width,height,format,renderTarget) {
	this.g2canvas = null;
	this.myWidth = width;
	this.myHeight = height;
	this.myFormat = format;
	this.renderTarget = renderTarget;
	this.image = null;
	this.video = null;
	if(renderTarget) {
		this.createTexture();
	}
};
$hxClasses["kha.CanvasImage"] = kha_CanvasImage;
kha_CanvasImage.__name__ = true;
kha_CanvasImage.init = function() {
	var canvas = window.document.createElement("canvas");
	if(canvas != null) {
		kha_CanvasImage.context = canvas.getContext("2d");
		canvas.width = 2048;
		canvas.height = 2048;
		kha_CanvasImage.context.globalCompositeOperation = "copy";
	}
};
kha_CanvasImage.upperPowerOfTwo = function(v) {
	--v;
	v |= v >>> 1;
	v |= v >>> 2;
	v |= v >>> 4;
	v |= v >>> 8;
	v |= v >>> 16;
	return ++v;
};
kha_CanvasImage.__super__ = kha_Image;
kha_CanvasImage.prototype = $extend(kha_Image.prototype,{
	image: null
	,video: null
	,data: null
	,myWidth: null
	,myHeight: null
	,myFormat: null
	,renderTarget: null
	,frameBuffer: null
	,graphics1: null
	,g2canvas: null
	,get_g1: function() {
		if(this.graphics1 == null) {
			this.graphics1 = new kha_graphics2_Graphics1(this);
		}
		return this.graphics1;
	}
	,get_g2: function() {
		if(this.g2canvas == null) {
			var canvas = window.document.createElement("canvas");
			this.image = canvas;
			var context = canvas.getContext("2d");
			canvas.width = this.get_width();
			canvas.height = this.get_height();
			this.g2canvas = new kha_js_CanvasGraphics(context);
		}
		return this.g2canvas;
	}
	,get_g4: function() {
		return null;
	}
	,get_width: function() {
		return this.myWidth;
	}
	,get_height: function() {
		return this.myHeight;
	}
	,get_format: function() {
		return this.myFormat;
	}
	,get_realWidth: function() {
		return this.myWidth;
	}
	,get_realHeight: function() {
		return this.myHeight;
	}
	,get_stride: function() {
		if(this.myFormat == 0) {
			return 4 * this.get_width();
		} else {
			return this.get_width();
		}
	}
	,isOpaque: function(x,y) {
		if(this.data == null) {
			if(kha_CanvasImage.context == null) {
				return true;
			} else {
				this.createImageData();
			}
		}
		return this.data.data[y * (this.image.width | 0) * 4 + x * 4 + 3] != 0;
	}
	,at: function(x,y) {
		if(this.data == null) {
			if(kha_CanvasImage.context == null) {
				return -16777216;
			} else {
				this.createImageData();
			}
		}
		var r = this.data.data[y * (this.image.width | 0) * 4 + x * 4];
		var g = this.data.data[y * (this.image.width | 0) * 4 + x * 4 + 1];
		var b = this.data.data[y * (this.image.width | 0) * 4 + x * 4 + 2];
		var a = this.data.data[y * (this.image.width | 0) * 4 + x * 4 + 3];
		return kha_Color._new(a << 24 | r << 16 | g << 8 | b);
	}
	,createImageData: function() {
		kha_CanvasImage.context.strokeStyle = "rgba(0,0,0,0)";
		kha_CanvasImage.context.fillStyle = "rgba(0,0,0,0)";
		kha_CanvasImage.context.fillRect(0,0,this.image.width,this.image.height);
		kha_CanvasImage.context.drawImage(this.image,0,0,this.image.width,this.image.height,0,0,this.image.width,this.image.height);
		this.data = kha_CanvasImage.context.getImageData(0,0,this.image.width,this.image.height);
	}
	,texture: null
	,createTexture: function() {
		if(kha_SystemImpl.gl == null) {
			return;
		}
		this.texture = kha_SystemImpl.gl.createTexture();
		kha_SystemImpl.gl.bindTexture(3553,this.texture);
		kha_SystemImpl.gl.texParameteri(3553,10240,9729);
		kha_SystemImpl.gl.texParameteri(3553,10241,9729);
		kha_SystemImpl.gl.texParameteri(3553,10242,33071);
		kha_SystemImpl.gl.texParameteri(3553,10243,33071);
		if(this.renderTarget) {
			this.frameBuffer = kha_SystemImpl.gl.createFramebuffer();
			kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
			kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_realWidth(),this.get_realHeight(),0,6408,5121,null);
			kha_SystemImpl.gl.framebufferTexture2D(36160,36064,3553,this.texture,0);
			kha_SystemImpl.gl.bindFramebuffer(36160,null);
		} else if(this.video != null) {
			kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.video);
		} else {
			kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.image);
		}
		kha_SystemImpl.gl.bindTexture(3553,null);
	}
	,set: function(stage) {
		kha_SystemImpl.gl.activeTexture(33984 + stage);
		kha_SystemImpl.gl.bindTexture(3553,this.texture);
		if(this.video != null) {
			kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.video);
		}
	}
	,bytes: null
	,lock: function(level) {
		if(level == null) {
			level = 0;
		}
		this.bytes = new haxe_io_Bytes(new ArrayBuffer(this.myFormat == 0 ? 4 * this.get_width() * this.get_height() : this.get_width() * this.get_height()));
		return this.bytes;
	}
	,unlock: function() {
		if(kha_SystemImpl.gl != null) {
			this.texture = kha_SystemImpl.gl.createTexture();
			kha_SystemImpl.gl.bindTexture(3553,this.texture);
			kha_SystemImpl.gl.texParameteri(3553,10240,9729);
			kha_SystemImpl.gl.texParameteri(3553,10241,9729);
			kha_SystemImpl.gl.texParameteri(3553,10242,33071);
			kha_SystemImpl.gl.texParameteri(3553,10243,33071);
			kha_SystemImpl.gl.texImage2D(3553,0,6409,this.get_width(),this.get_height(),0,6409,5121,new Uint8Array(this.bytes.b.bufferValue));
			if(kha_SystemImpl.ie && kha_SystemImpl.gl.getError() == 1282) {
				var rgbaBytes = new haxe_io_Bytes(new ArrayBuffer(this.get_width() * this.get_height() * 4));
				var _g = 0;
				var _g1 = this.get_height();
				while(_g < _g1) {
					var y = _g++;
					var _g2 = 0;
					var _g3 = this.get_width();
					while(_g2 < _g3) {
						var x = _g2++;
						var _this = this.bytes;
						var pos = y * this.get_width() + x;
						var value = _this.b[pos];
						var pos1 = y * this.get_width() * 4 + x * 4;
						rgbaBytes.b[pos1] = value;
						var pos2 = y * this.get_width() * 4 + x * 4 + 1;
						rgbaBytes.b[pos2] = value;
						var pos3 = y * this.get_width() * 4 + x * 4 + 2;
						rgbaBytes.b[pos3] = value;
						var pos4 = y * this.get_width() * 4 + x * 4 + 3;
						rgbaBytes.b[pos4] = 255;
					}
				}
				kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_width(),this.get_height(),0,6408,5121,new Uint8Array(rgbaBytes.b.bufferValue));
			}
			kha_SystemImpl.gl.bindTexture(3553,null);
			this.bytes = null;
		}
	}
	,getPixels: function() {
		var context = this.g2canvas.canvas;
		var imageData = context.getImageData(0,0,this.get_width(),this.get_height());
		var bytes = new haxe_io_Bytes(new ArrayBuffer(imageData.data.length));
		var _g = 0;
		var _g1 = imageData.data.length;
		while(_g < _g1) {
			var i = _g++;
			bytes.b[i] = imageData.data[i];
		}
		return bytes;
	}
	,unload: function() {
		this.image = null;
		this.video = null;
		this.data = null;
	}
	,__class__: kha_CanvasImage
});
var kha_Color = {};
kha_Color.fromValue = function(value) {
	return kha_Color._new(value);
};
kha_Color.fromBytes = function(r,g,b,a) {
	if(a == null) {
		a = 255;
	}
	return kha_Color._new(a << 24 | r << 16 | g << 8 | b);
};
kha_Color.fromFloats = function(r,g,b,a) {
	if(a == null) {
		a = 1;
	}
	return kha_Color._new((a * 255 | 0) << 24 | (r * 255 | 0) << 16 | (g * 255 | 0) << 8 | (b * 255 | 0));
};
kha_Color.fromString = function(value) {
	if((value.length == 7 || value.length == 9) && value.charCodeAt(0) == 35) {
		var colorValue = Std.parseInt("0x" + HxOverrides.substr(value,1,null));
		if(value.length == 7) {
			colorValue += -16777216;
		}
		return kha_Color._new(colorValue | 0);
	} else {
		throw haxe_Exception.thrown("Invalid Color string: '" + value + "'");
	}
};
kha_Color._new = function(value) {
	var this1 = value;
	return this1;
};
kha_Color.get_value = function(this1) {
	return this1;
};
kha_Color.set_value = function(this1,value) {
	this1 = value;
	return this1;
};
kha_Color.get_Rb = function(this1) {
	return (this1 & 16711680) >>> 16;
};
kha_Color.get_Gb = function(this1) {
	return (this1 & 65280) >>> 8;
};
kha_Color.get_Bb = function(this1) {
	return this1 & 255;
};
kha_Color.get_Ab = function(this1) {
	return this1 >>> 24;
};
kha_Color.set_Rb = function(this1,i) {
	this1 = this1 >>> 24 << 24 | i << 16 | (this1 & 65280) >>> 8 << 8 | this1 & 255;
	return i;
};
kha_Color.set_Gb = function(this1,i) {
	this1 = this1 >>> 24 << 24 | (this1 & 16711680) >>> 16 << 16 | i << 8 | this1 & 255;
	return i;
};
kha_Color.set_Bb = function(this1,i) {
	this1 = this1 >>> 24 << 24 | (this1 & 16711680) >>> 16 << 16 | (this1 & 65280) >>> 8 << 8 | i;
	return i;
};
kha_Color.set_Ab = function(this1,i) {
	this1 = i << 24 | (this1 & 16711680) >>> 16 << 16 | (this1 & 65280) >>> 8 << 8 | this1 & 255;
	return i;
};
kha_Color.get_R = function(this1) {
	return ((this1 & 16711680) >>> 16) * 0.00392156862745098;
};
kha_Color.get_G = function(this1) {
	return ((this1 & 65280) >>> 8) * 0.00392156862745098;
};
kha_Color.get_B = function(this1) {
	return (this1 & 255) * 0.00392156862745098;
};
kha_Color.get_A = function(this1) {
	return (this1 >>> 24) * 0.00392156862745098;
};
kha_Color.set_R = function(this1,f) {
	this1 = ((this1 >>> 24) * 0.00392156862745098 * 255 | 0) << 24 | (f * 255 | 0) << 16 | (((this1 & 65280) >>> 8) * 0.00392156862745098 * 255 | 0) << 8 | ((this1 & 255) * 0.00392156862745098 * 255 | 0);
	return f;
};
kha_Color.set_G = function(this1,f) {
	this1 = ((this1 >>> 24) * 0.00392156862745098 * 255 | 0) << 24 | (((this1 & 16711680) >>> 16) * 0.00392156862745098 * 255 | 0) << 16 | (f * 255 | 0) << 8 | ((this1 & 255) * 0.00392156862745098 * 255 | 0);
	return f;
};
kha_Color.set_B = function(this1,f) {
	this1 = ((this1 >>> 24) * 0.00392156862745098 * 255 | 0) << 24 | (((this1 & 16711680) >>> 16) * 0.00392156862745098 * 255 | 0) << 16 | (((this1 & 65280) >>> 8) * 0.00392156862745098 * 255 | 0) << 8 | (f * 255 | 0);
	return f;
};
kha_Color.set_A = function(this1,f) {
	this1 = (f * 255 | 0) << 24 | (((this1 & 16711680) >>> 16) * 0.00392156862745098 * 255 | 0) << 16 | (((this1 & 65280) >>> 8) * 0.00392156862745098 * 255 | 0) << 8 | ((this1 & 255) * 0.00392156862745098 * 255 | 0);
	return f;
};
var kha_Display = function() {
};
$hxClasses["kha.Display"] = kha_Display;
kha_Display.__name__ = true;
kha_Display.init = function() {
};
kha_Display.get_primary = function() {
	return kha_Display.instance;
};
kha_Display.get_all = function() {
	return [kha_Display.get_primary()];
};
kha_Display.prototype = {
	get_available: function() {
		return true;
	}
	,get_name: function() {
		return "Display";
	}
	,get_x: function() {
		return window.screen.left;
	}
	,get_y: function() {
		return window.screen.top;
	}
	,get_width: function() {
		return window.screen.width;
	}
	,get_height: function() {
		return window.screen.height;
	}
	,get_frequency: function() {
		return kha_SystemImpl.estimatedRefreshRate;
	}
	,get_pixelsPerInch: function() {
		var dpiElement = window.document.createElement("div");
		dpiElement.style.position = "absolute";
		dpiElement.style.width = "1in";
		dpiElement.style.height = "1in";
		dpiElement.style.left = "-100%";
		dpiElement.style.top = "-100%";
		window.document.body.appendChild(dpiElement);
		var dpi = dpiElement.offsetHeight;
		dpiElement.remove();
		return dpi;
	}
	,get_modes: function() {
		return [];
	}
	,__class__: kha_Display
};
var kha_DisplayMode = function(width,height,frequency,bitsPerPixel) {
	this.width = width;
	this.height = height;
	this.frequency = frequency;
	this.bitsPerPixel = bitsPerPixel;
};
$hxClasses["kha.DisplayMode"] = kha_DisplayMode;
kha_DisplayMode.__name__ = true;
kha_DisplayMode.prototype = {
	width: null
	,height: null
	,frequency: null
	,bitsPerPixel: null
	,__class__: kha_DisplayMode
};
var kha_Framebuffer = function($window,g1,g2,g4) {
	this.window = $window;
	this.graphics1 = g1;
	this.graphics2 = g2;
	this.graphics4 = g4;
};
$hxClasses["kha.Framebuffer"] = kha_Framebuffer;
kha_Framebuffer.__name__ = true;
kha_Framebuffer.__interfaces__ = [kha_Canvas];
kha_Framebuffer.prototype = {
	window: null
	,graphics1: null
	,graphics2: null
	,graphics4: null
	,init: function(g1,g2,g4) {
		this.graphics1 = g1;
		this.graphics2 = g2;
		this.graphics4 = g4;
	}
	,get_g1: function() {
		return this.graphics1;
	}
	,get_g2: function() {
		return this.graphics2;
	}
	,get_g4: function() {
		return this.graphics4;
	}
	,width: null
	,get_width: function() {
		return kha_System.windowWidth(this.window);
	}
	,height: null
	,get_height: function() {
		return kha_System.windowHeight(this.window);
	}
	,__class__: kha_Framebuffer
};
var kha_FramebufferOptions = function(frequency,verticalSync,colorBufferBits,depthBufferBits,stencilBufferBits,samplesPerPixel) {
	if(samplesPerPixel == null) {
		samplesPerPixel = 1;
	}
	if(stencilBufferBits == null) {
		stencilBufferBits = 8;
	}
	if(depthBufferBits == null) {
		depthBufferBits = 16;
	}
	if(colorBufferBits == null) {
		colorBufferBits = 32;
	}
	if(verticalSync == null) {
		verticalSync = true;
	}
	if(frequency == null) {
		frequency = 60;
	}
	this.samplesPerPixel = 1;
	this.stencilBufferBits = 8;
	this.depthBufferBits = 16;
	this.colorBufferBits = 32;
	this.verticalSync = true;
	this.frequency = 60;
	this.frequency = frequency;
	this.verticalSync = verticalSync;
	this.colorBufferBits = colorBufferBits;
	this.depthBufferBits = depthBufferBits;
	this.stencilBufferBits = stencilBufferBits;
	this.samplesPerPixel = samplesPerPixel;
};
$hxClasses["kha.FramebufferOptions"] = kha_FramebufferOptions;
kha_FramebufferOptions.__name__ = true;
kha_FramebufferOptions.prototype = {
	frequency: null
	,verticalSync: null
	,colorBufferBits: null
	,depthBufferBits: null
	,stencilBufferBits: null
	,samplesPerPixel: null
	,__class__: kha_FramebufferOptions
};
var kha_AlignedQuad = function() {
};
$hxClasses["kha.AlignedQuad"] = kha_AlignedQuad;
kha_AlignedQuad.__name__ = true;
kha_AlignedQuad.prototype = {
	x0: null
	,y0: null
	,s0: null
	,t0: null
	,x1: null
	,y1: null
	,s1: null
	,t1: null
	,xadvance: null
	,__class__: kha_AlignedQuad
};
var kha_KravurImage = function(size,ascent,descent,lineGap,width,height,chars,pixels) {
	this.mySize = size;
	this.width = width;
	this.height = height;
	this.chars = chars;
	this.baseline = ascent;
	var _g = 0;
	while(_g < chars.length) {
		var char = chars[_g];
		++_g;
		char.yoff += this.baseline;
	}
	this.texture = kha_Image.create(width,height,1);
	var bytes = this.texture.lock();
	var pos = 0;
	var _g = 0;
	var _g1 = height;
	while(_g < _g1) {
		var y = _g++;
		var _g2 = 0;
		var _g3 = width;
		while(_g2 < _g3) {
			var x = _g2++;
			var v = pixels.readU8(pos);
			bytes.b[pos] = v;
			++pos;
		}
	}
	this.texture.unlock();
};
$hxClasses["kha.KravurImage"] = kha_KravurImage;
kha_KravurImage.__name__ = true;
kha_KravurImage.prototype = {
	mySize: null
	,chars: null
	,texture: null
	,width: null
	,height: null
	,baseline: null
	,getTexture: function() {
		return this.texture;
	}
	,getBakedQuad: function(q,char_index,xpos,ypos) {
		if(char_index >= this.chars.length) {
			return null;
		}
		var ipw = 1.0 / this.width;
		var iph = 1.0 / this.height;
		var b = this.chars[char_index];
		if(b == null) {
			return null;
		}
		var round_x = Math.round(xpos + b.xoff);
		var round_y = Math.round(ypos + b.yoff);
		q.x0 = round_x;
		q.y0 = round_y;
		q.x1 = round_x + b.x1 - b.x0;
		q.y1 = round_y + b.y1 - b.y0;
		q.s0 = b.x0 * ipw;
		q.t0 = b.y0 * iph;
		q.s1 = b.x1 * ipw;
		q.t1 = b.y1 * iph;
		q.xadvance = b.xadvance;
		return q;
	}
	,getCharWidth: function(charIndex) {
		if(this.chars.length == 0) {
			return 0;
		}
		var offset = kha_KravurImage.charBlocks[0];
		if(charIndex < offset) {
			return this.chars[0].xadvance;
		}
		var _g = 1;
		var _g1 = kha_KravurImage.charBlocks.length / 2 | 0;
		while(_g < _g1) {
			var i = _g++;
			var prevEnd = kha_KravurImage.charBlocks[i * 2 - 1];
			var start = kha_KravurImage.charBlocks[i * 2];
			if(charIndex > start - 1) {
				offset += start - 1 - prevEnd;
			}
		}
		if(charIndex - offset >= this.chars.length) {
			return this.chars[0].xadvance;
		}
		return this.chars[charIndex - offset].xadvance;
	}
	,getHeight: function() {
		return this.mySize;
	}
	,stringWidth: function(str) {
		var width = 0;
		var _g = 0;
		var _g1 = str.length;
		while(_g < _g1) {
			var c = _g++;
			width += this.getCharWidth(HxOverrides.cca(str,c));
		}
		return width;
	}
	,charactersWidth: function(characters,start,length) {
		var width = 0;
		var _g = start;
		var _g1 = start + length;
		while(_g < _g1) {
			var i = _g++;
			width += this.getCharWidth(characters[i]);
		}
		return width;
	}
	,getBaselinePosition: function() {
		return this.baseline;
	}
	,__class__: kha_KravurImage
};
var kha_Kravur = function(blob,fontIndex) {
	if(fontIndex == null) {
		fontIndex = 0;
	}
	this.images = new haxe_ds_IntMap();
	this.blob = blob;
	this.fontIndex = fontIndex;
};
$hxClasses["kha.Kravur"] = kha_Kravur;
kha_Kravur.__name__ = true;
kha_Kravur.__interfaces__ = [kha_Resource];
kha_Kravur.fromBytes = function(bytes,fontIndex) {
	if(fontIndex == null) {
		fontIndex = 0;
	}
	return new kha_Kravur(kha_internal_BytesBlob.fromBytes(bytes),fontIndex);
};
kha_Kravur.prototype = {
	oldGlyphs: null
	,blob: null
	,images: null
	,fontIndex: null
	,_get: function(fontSize) {
		var glyphs = kha_graphics2_Graphics.fontGlyphs;
		if(glyphs != this.oldGlyphs) {
			this.oldGlyphs = glyphs;
			kha_KravurImage.charBlocks = [glyphs[0]];
			var nextChar = kha_KravurImage.charBlocks[0] + 1;
			var _g = 1;
			var _g1 = glyphs.length;
			while(_g < _g1) {
				var i = _g++;
				if(glyphs[i] != nextChar) {
					kha_KravurImage.charBlocks.push(glyphs[i - 1]);
					kha_KravurImage.charBlocks.push(glyphs[i]);
					nextChar = glyphs[i] + 1;
				} else {
					++nextChar;
				}
			}
			kha_KravurImage.charBlocks.push(glyphs[glyphs.length - 1]);
		}
		var imageIndex = this.fontIndex * 10000000 + fontSize * 10000 + glyphs.length;
		if(!this.images.h.hasOwnProperty(imageIndex)) {
			var width = 64;
			var height = 32;
			var this1 = new Array(glyphs.length);
			var baked = this1;
			var _g = 0;
			var _g1 = baked.length;
			while(_g < _g1) {
				var i = _g++;
				baked[i] = new kha_graphics2_truetype_Stbtt_$bakedchar();
			}
			var pixels = null;
			var offset = kha_graphics2_truetype_StbTruetype.stbtt_GetFontOffsetForIndex(this.blob,this.fontIndex);
			if(offset == -1) {
				offset = kha_graphics2_truetype_StbTruetype.stbtt_GetFontOffsetForIndex(this.blob,0);
			}
			var status = -1;
			while(status <= 0) {
				if(height < width) {
					height *= 2;
				} else {
					width *= 2;
				}
				pixels = kha_internal_BytesBlob.alloc(width * height);
				status = kha_graphics2_truetype_StbTruetype.stbtt_BakeFontBitmap(this.blob,offset,fontSize,pixels,width,height,glyphs,baked);
			}
			var info = new kha_graphics2_truetype_Stbtt_$fontinfo();
			kha_graphics2_truetype_StbTruetype.stbtt_InitFont(info,this.blob,offset);
			var metrics = kha_graphics2_truetype_StbTruetype.stbtt_GetFontVMetrics(info);
			var scale = kha_graphics2_truetype_StbTruetype.stbtt_ScaleForPixelHeight(info,fontSize);
			var ascent = Math.round(metrics.ascent * scale);
			var descent = Math.round(metrics.descent * scale);
			var lineGap = Math.round(metrics.lineGap * scale);
			var image = new kha_KravurImage(fontSize | 0,ascent,descent,lineGap,width,height,baked,pixels);
			this.images.h[imageIndex] = image;
			return image;
		}
		return this.images.h[imageIndex];
	}
	,height: function(fontSize) {
		return this._get(fontSize).getHeight();
	}
	,width: function(fontSize,str) {
		return this._get(fontSize).stringWidth(str);
	}
	,widthOfCharacters: function(fontSize,characters,start,length) {
		return this._get(fontSize).charactersWidth(characters,start,length);
	}
	,baseline: function(fontSize) {
		return this._get(fontSize).getBaselinePosition();
	}
	,setFontIndex: function(fontIndex) {
		this.fontIndex = fontIndex;
	}
	,unload: function() {
		this.blob = null;
		this.images = null;
	}
	,__class__: kha_Kravur
};
var kha_LoaderImpl = function() { };
$hxClasses["kha.LoaderImpl"] = kha_LoaderImpl;
kha_LoaderImpl.__name__ = true;
kha_LoaderImpl.getImageFormats = function() {
	return ["png","jpg","hdr"];
};
kha_LoaderImpl.loadImageFromDescription = function(desc,done,failed) {
	var readable = Object.prototype.hasOwnProperty.call(desc,"readable") && desc.readable;
	if(StringTools.endsWith(desc.files[0],".hdr")) {
		kha_LoaderImpl.loadBlobFromDescription(desc,function(blob) {
			var hdrImage = kha_internal_HdrFormat.parse(blob.toBytes());
			done(kha_Image.fromBytes(haxe_io_Bytes.ofData(hdrImage.data.buffer),hdrImage.width,hdrImage.height,2,readable ? 1 : 0));
		},failed);
	} else {
		var img = window.document.createElement("img");
		img.onerror = function(event) {
			failed({ url : desc.files[0], error : event});
		};
		img.onload = function(event) {
			done(kha_Image.fromImage(img,readable));
		};
		img.crossOrigin = "";
		img.src = desc.files[0];
	}
};
kha_LoaderImpl.getSoundFormats = function() {
	var element = window.document.createElement("audio");
	var formats = [];
	if(element.canPlayType("audio/mp4") != "") {
		formats.push("mp4");
	}
	if(element.canPlayType("audio/mp3") != "") {
		formats.push("mp3");
	}
	if(element.canPlayType("audio/wav") != "") {
		formats.push("wav");
	}
	if(kha_SystemImpl._hasWebAudio || element.canPlayType("audio/ogg") != "") {
		formats.push("ogg");
	}
	return formats;
};
kha_LoaderImpl.loadSoundFromDescription = function(desc,done,failed) {
	if(kha_SystemImpl._hasWebAudio) {
		var element = window.document.createElement("audio");
		if(element.canPlayType("audio/mp4") != "") {
			var _g = 0;
			var _g1 = desc.files.length;
			while(_g < _g1) {
				var i = _g++;
				var file = desc.files[i];
				if(StringTools.endsWith(file,".mp4")) {
					new kha_js_WebAudioSound(file,done,failed);
					return;
				}
			}
		}
		if(element.canPlayType("audio/mp3") != "") {
			var _g = 0;
			var _g1 = desc.files.length;
			while(_g < _g1) {
				var i = _g++;
				var file = desc.files[i];
				if(StringTools.endsWith(file,".mp3")) {
					new kha_js_WebAudioSound(file,done,failed);
					return;
				}
			}
		}
		if(element.canPlayType("audio/wav") != "") {
			var _g = 0;
			var _g1 = desc.files.length;
			while(_g < _g1) {
				var i = _g++;
				var file = desc.files[i];
				if(StringTools.endsWith(file,".wav")) {
					new kha_js_WebAudioSound(file,done,failed);
					return;
				}
			}
		}
		var _g = 0;
		var _g1 = desc.files.length;
		while(_g < _g1) {
			var i = _g++;
			var file = desc.files[i];
			if(StringTools.endsWith(file,".ogg")) {
				new kha_js_WebAudioSound(file,done,failed);
				return;
			}
		}
		failed({ url : desc.files.join(","), error : "Unable to find sound files with supported audio formats"});
	} else if(kha_SystemImpl.mobile) {
		var element = window.document.createElement("audio");
		if(element.canPlayType("audio/mp4") != "") {
			var _g = 0;
			var _g1 = desc.files.length;
			while(_g < _g1) {
				var i = _g++;
				var file = desc.files[i];
				if(StringTools.endsWith(file,".mp4")) {
					new kha_js_MobileWebAudioSound(file,done,failed);
					return;
				}
			}
		}
		if(element.canPlayType("audio/mp3") != "") {
			var _g = 0;
			var _g1 = desc.files.length;
			while(_g < _g1) {
				var i = _g++;
				var file = desc.files[i];
				if(StringTools.endsWith(file,".mp3")) {
					new kha_js_MobileWebAudioSound(file,done,failed);
					return;
				}
			}
		}
		if(element.canPlayType("audio/wav") != "") {
			var _g = 0;
			var _g1 = desc.files.length;
			while(_g < _g1) {
				var i = _g++;
				var file = desc.files[i];
				if(StringTools.endsWith(file,".wav")) {
					new kha_js_MobileWebAudioSound(file,done,failed);
					return;
				}
			}
		}
		var _g = 0;
		var _g1 = desc.files.length;
		while(_g < _g1) {
			var i = _g++;
			var file = desc.files[i];
			if(StringTools.endsWith(file,".ogg")) {
				new kha_js_MobileWebAudioSound(file,done,failed);
				return;
			}
		}
		failed({ url : desc.files.join(","), error : "Unable to find sound files with supported audio formats"});
	} else {
		new kha_js_Sound(desc.files,done,failed);
	}
};
kha_LoaderImpl.getVideoFormats = function() {
	return ["mp4","webm"];
};
kha_LoaderImpl.loadVideoFromDescription = function(desc,done,failed) {
	kha_js_Video.fromFile(desc.files,done);
};
kha_LoaderImpl.loadRemote = function(desc,done,failed) {
	var request = new XMLHttpRequest();
	request.open("GET",desc.files[0],true);
	request.responseType = "arraybuffer";
	request.onreadystatechange = function() {
		if(request.readyState != 4) {
			return;
		}
		if(request.status >= 200 && request.status < 400 || request.status == 0 && request.statusText == "") {
			var bytes = null;
			var arrayBuffer = request.response;
			if(arrayBuffer != null) {
				var byteArray = new Uint8Array(arrayBuffer);
				bytes = haxe_io_Bytes.ofData(byteArray);
			} else if(request.responseBody != null) {
				var data = VBArray(request.responseBody).toArray();
				bytes = new haxe_io_Bytes(new ArrayBuffer(data.length));
				var _g = 0;
				var _g1 = data.length;
				while(_g < _g1) {
					var i = _g++;
					bytes.b[i] = data[i];
				}
			} else {
				failed({ url : desc.files[0]});
				return;
			}
			done(new kha_internal_BytesBlob(bytes));
		} else {
			failed({ url : desc.files[0]});
		}
	};
	request.send(null);
};
kha_LoaderImpl.loadBlobFromDescription = function(desc,done,failed) {
	kha_LoaderImpl.loadRemote(desc,done,failed);
};
kha_LoaderImpl.loadFontFromDescription = function(desc,done,failed) {
	kha_LoaderImpl.loadBlobFromDescription(desc,function(blob) {
		done(new kha_Kravur(blob));
	},failed);
};
var kha_Macros = function() { };
$hxClasses["kha.Macros"] = kha_Macros;
kha_Macros.__name__ = true;
var kha_TimeTask = function() {
};
$hxClasses["kha.TimeTask"] = kha_TimeTask;
kha_TimeTask.__name__ = true;
kha_TimeTask.prototype = {
	task: null
	,start: null
	,period: null
	,duration: null
	,next: null
	,id: null
	,groupId: null
	,active: null
	,paused: null
	,__class__: kha_TimeTask
};
var kha_FrameTask = function(task,priority,id) {
	this.task = task;
	this.priority = priority;
	this.id = id;
	this.active = true;
	this.paused = false;
};
$hxClasses["kha.FrameTask"] = kha_FrameTask;
kha_FrameTask.__name__ = true;
kha_FrameTask.prototype = {
	task: null
	,priority: null
	,id: null
	,active: null
	,paused: null
	,__class__: kha_FrameTask
};
var kha_Scheduler = function() { };
$hxClasses["kha.Scheduler"] = kha_Scheduler;
kha_Scheduler.__name__ = true;
kha_Scheduler.get_onedifhz = function() {
	return 1.0 / kha_Display.get_primary().get_frequency();
};
kha_Scheduler.init = function() {
	kha_Scheduler.deltas = [];
	var _g = 0;
	var _g1 = kha_Scheduler.DIF_COUNT;
	while(_g < _g1) {
		var i = _g++;
		kha_Scheduler.deltas[i] = 0;
	}
	kha_Scheduler.stopped = true;
	kha_Scheduler.frame_tasks_sorted = true;
	kha_Scheduler.current = kha_Scheduler.lastTime = kha_Scheduler.lastFrameEnd = kha_Scheduler.realTime();
	kha_Scheduler.currentFrameTaskId = 0;
	kha_Scheduler.currentTimeTaskId = 0;
	kha_Scheduler.currentGroupId = 0;
	kha_Scheduler.timeTasks = [];
	kha_Scheduler.pausedTimeTasks = [];
	kha_Scheduler.outdatedTimeTasks = [];
	kha_Scheduler.timeTasksScratchpad = [];
	kha_Scheduler.frameTasks = [];
	kha_Scheduler.toDeleteFrame = [];
};
kha_Scheduler.start = function(restartTimers) {
	if(restartTimers == null) {
		restartTimers = false;
	}
	kha_Scheduler.vsync = kha_Window.get(0).get_vSynced();
	kha_Scheduler.stopped = false;
	kha_Scheduler.resetTime();
	kha_Scheduler.lastTime = kha_Scheduler.realTime() - kha_Scheduler.startTime;
	var _g = 0;
	var _g1 = kha_Scheduler.DIF_COUNT;
	while(_g < _g1) {
		var i = _g++;
		kha_Scheduler.deltas[i] = 0;
	}
	if(restartTimers) {
		var _g = 0;
		var _g1 = kha_Scheduler.timeTasks;
		while(_g < _g1.length) {
			var timeTask = _g1[_g];
			++_g;
			timeTask.paused = false;
		}
		var _g = 0;
		var _g1 = kha_Scheduler.frameTasks;
		while(_g < _g1.length) {
			var frameTask = _g1[_g];
			++_g;
			frameTask.paused = false;
		}
	}
};
kha_Scheduler.stop = function() {
	kha_Scheduler.stopped = true;
};
kha_Scheduler.isStopped = function() {
	return kha_Scheduler.stopped;
};
kha_Scheduler.warpTimeTasksBack = function(time,tasks) {
	var _g = 0;
	while(_g < tasks.length) {
		var timeTask = tasks[_g];
		++_g;
		if(timeTask.start >= time) {
			timeTask.next = timeTask.start;
		} else if(timeTask.period > 0) {
			var sinceStart = time - timeTask.start;
			var times = Math.ceil(sinceStart / timeTask.period);
			timeTask.next = timeTask.start + times * timeTask.period;
		}
	}
};
kha_Scheduler.warp = function(time) {
	if(time < kha_Scheduler.lastTime) {
		kha_Scheduler.current = time;
		kha_Scheduler.lastTime = time;
		kha_Scheduler.lastFrameEnd = time;
		kha_Scheduler.warpTimeTasksBack(time,kha_Scheduler.outdatedTimeTasks);
		kha_Scheduler.warpTimeTasksBack(time,kha_Scheduler.timeTasks);
		var _g = 0;
		var _g1 = kha_Scheduler.outdatedTimeTasks;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			if(task.next >= time) {
				kha_Scheduler.timeTasksScratchpad.push(task);
			}
		}
		var _g = 0;
		var _g1 = kha_Scheduler.timeTasksScratchpad;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			HxOverrides.remove(kha_Scheduler.outdatedTimeTasks,task);
		}
		var _g = 0;
		var _g1 = kha_Scheduler.timeTasksScratchpad;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			kha_Scheduler.insertSorted(kha_Scheduler.timeTasks,task);
		}
		while(kha_Scheduler.timeTasksScratchpad.length > 0) HxOverrides.remove(kha_Scheduler.timeTasksScratchpad,kha_Scheduler.timeTasksScratchpad[0]);
	} else if(time > kha_Scheduler.lastTime) {
		kha_Scheduler.startTime -= time - kha_Scheduler.lastTime;
		kha_Scheduler.current = time;
		kha_Scheduler.lastTime = time;
		kha_Scheduler.lastFrameEnd = time;
		kha_Scheduler.executeTimeTasks(time);
	}
};
kha_Scheduler.executeFrame = function() {
	var real = kha_Scheduler.realTime();
	var now = real - kha_Scheduler.startTime;
	var delta = now - kha_Scheduler.lastTime;
	var frameEnd = kha_Scheduler.lastFrameEnd;
	if(delta >= 0) {
		if(kha_netsync_Session.the() == null) {
			if(delta > kha_Scheduler.maxframetime) {
				kha_Scheduler.startTime += delta - kha_Scheduler.maxframetime;
				now = real - kha_Scheduler.startTime;
				delta = kha_Scheduler.maxframetime;
				frameEnd += delta;
			} else if(kha_Scheduler.vsync) {
				var frames = Math.round(delta / (1.0 / kha_Display.get_primary().get_frequency()));
				if(frames < 1) {
					return;
				}
				var realdif = frames * (1.0 / kha_Display.get_primary().get_frequency());
				delta = realdif;
				var _g = 0;
				var _g1 = kha_Scheduler.DIF_COUNT - 2;
				while(_g < _g1) {
					var i = _g++;
					delta += kha_Scheduler.deltas[i];
					kha_Scheduler.deltas[i] = kha_Scheduler.deltas[i + 1];
				}
				delta += kha_Scheduler.deltas[kha_Scheduler.DIF_COUNT - 2];
				delta /= kha_Scheduler.DIF_COUNT;
				kha_Scheduler.deltas[kha_Scheduler.DIF_COUNT - 2] = realdif;
				frameEnd += delta;
			} else {
				var _g = 0;
				var _g1 = kha_Scheduler.DIF_COUNT - 1;
				while(_g < _g1) {
					var i = _g++;
					kha_Scheduler.deltas[i] = kha_Scheduler.deltas[i + 1];
				}
				kha_Scheduler.deltas[kha_Scheduler.DIF_COUNT - 1] = delta;
				var next = 0;
				var _g = 0;
				var _g1 = kha_Scheduler.DIF_COUNT;
				while(_g < _g1) {
					var i = _g++;
					next += kha_Scheduler.deltas[i];
				}
				next /= kha_Scheduler.DIF_COUNT;
				frameEnd += next;
			}
		} else {
			frameEnd += delta;
		}
		kha_Scheduler.lastTime = now;
		if(!kha_Scheduler.stopped) {
			kha_Scheduler.lastFrameEnd = frameEnd;
		}
		var _g = 0;
		var _g1 = kha_Scheduler.pausedTimeTasks;
		while(_g < _g1.length) {
			var pausedTask = _g1[_g];
			++_g;
			pausedTask.next += delta;
		}
		if(kha_Scheduler.stopped) {
			var _g = 0;
			var _g1 = kha_Scheduler.timeTasks;
			while(_g < _g1.length) {
				var timeTask = _g1[_g];
				++_g;
				timeTask.next += delta;
			}
		}
		kha_Scheduler.executeTimeTasks(frameEnd);
		var _g = 0;
		var _g1 = kha_Scheduler.outdatedTimeTasks;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			if(task.next < frameEnd - 10.0) {
				kha_Scheduler.timeTasksScratchpad.push(task);
			}
		}
		var _g = 0;
		var _g1 = kha_Scheduler.timeTasksScratchpad;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			HxOverrides.remove(kha_Scheduler.outdatedTimeTasks,task);
		}
		while(kha_Scheduler.timeTasksScratchpad.length > 0) HxOverrides.remove(kha_Scheduler.timeTasksScratchpad,kha_Scheduler.timeTasksScratchpad[0]);
	}
	kha_Scheduler.current = frameEnd;
	kha_Scheduler.sortFrameTasks();
	var _g = 0;
	var _g1 = kha_Scheduler.frameTasks;
	while(_g < _g1.length) {
		var frameTask = _g1[_g];
		++_g;
		if(!kha_Scheduler.stopped && !frameTask.paused && frameTask.active) {
			if(!frameTask.task()) {
				frameTask.active = false;
			}
		}
	}
	var _g = 0;
	var _g1 = kha_Scheduler.frameTasks;
	while(_g < _g1.length) {
		var frameTask = _g1[_g];
		++_g;
		if(!frameTask.active) {
			kha_Scheduler.toDeleteFrame.push(frameTask);
		}
	}
	while(kha_Scheduler.toDeleteFrame.length > 0) HxOverrides.remove(kha_Scheduler.frameTasks,kha_Scheduler.toDeleteFrame.pop());
};
kha_Scheduler.executeTimeTasks = function(until) {
	while(kha_Scheduler.timeTasks.length > 0) {
		kha_Scheduler.activeTimeTask = kha_Scheduler.timeTasks[0];
		if(kha_Scheduler.activeTimeTask.next <= until) {
			kha_Scheduler.current = kha_Scheduler.activeTimeTask.next;
			kha_Scheduler.activeTimeTask.next += kha_Scheduler.activeTimeTask.period;
			HxOverrides.remove(kha_Scheduler.timeTasks,kha_Scheduler.activeTimeTask);
			if(kha_Scheduler.activeTimeTask.active && kha_Scheduler.activeTimeTask.task()) {
				if(kha_Scheduler.activeTimeTask.period > 0 && (kha_Scheduler.activeTimeTask.duration == 0 || kha_Scheduler.activeTimeTask.duration >= kha_Scheduler.activeTimeTask.start + kha_Scheduler.activeTimeTask.next)) {
					kha_Scheduler.insertSorted(kha_Scheduler.timeTasks,kha_Scheduler.activeTimeTask);
				} else {
					kha_Scheduler.archiveTimeTask(kha_Scheduler.activeTimeTask,until);
				}
			} else {
				kha_Scheduler.activeTimeTask.active = false;
				kha_Scheduler.archiveTimeTask(kha_Scheduler.activeTimeTask,until);
			}
		} else {
			break;
		}
	}
	kha_Scheduler.activeTimeTask = null;
};
kha_Scheduler.archiveTimeTask = function(timeTask,frameEnd) {
};
kha_Scheduler.time = function() {
	return kha_Scheduler.current;
};
kha_Scheduler.realTime = function() {
	return kha_System.get_time();
};
kha_Scheduler.resetTime = function() {
	var now = kha_System.get_time();
	var dif = now - kha_Scheduler.startTime;
	kha_Scheduler.startTime = now;
	var _g = 0;
	var _g1 = kha_Scheduler.timeTasks;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		timeTask.start -= dif;
		timeTask.next -= dif;
	}
	var _g = 0;
	var _g1 = kha_Scheduler.DIF_COUNT;
	while(_g < _g1) {
		var i = _g++;
		kha_Scheduler.deltas[i] = 0;
	}
	kha_Scheduler.current = 0;
	kha_Scheduler.lastTime = 0;
	kha_Scheduler.lastFrameEnd = 0;
};
kha_Scheduler.addBreakableFrameTask = function(task,priority) {
	kha_Scheduler.frameTasks.push(new kha_FrameTask(task,priority,++kha_Scheduler.currentFrameTaskId));
	kha_Scheduler.frame_tasks_sorted = false;
	return kha_Scheduler.currentFrameTaskId;
};
kha_Scheduler.addFrameTask = function(task,priority) {
	return kha_Scheduler.addBreakableFrameTask(function() {
		task();
		return true;
	},priority);
};
kha_Scheduler.pauseFrameTask = function(id,paused) {
	var _g = 0;
	var _g1 = kha_Scheduler.frameTasks;
	while(_g < _g1.length) {
		var frameTask = _g1[_g];
		++_g;
		if(frameTask.id == id) {
			frameTask.paused = paused;
			break;
		}
	}
};
kha_Scheduler.removeFrameTask = function(id) {
	var _g = 0;
	var _g1 = kha_Scheduler.frameTasks;
	while(_g < _g1.length) {
		var frameTask = _g1[_g];
		++_g;
		if(frameTask.id == id) {
			frameTask.active = false;
			break;
		}
	}
};
kha_Scheduler.generateGroupId = function() {
	return ++kha_Scheduler.currentGroupId;
};
kha_Scheduler.addBreakableTimeTaskToGroup = function(groupId,task,start,period,duration) {
	if(duration == null) {
		duration = 0;
	}
	if(period == null) {
		period = 0;
	}
	var t = new kha_TimeTask();
	t.active = true;
	t.task = task;
	t.id = ++kha_Scheduler.currentTimeTaskId;
	t.groupId = groupId;
	t.start = kha_Scheduler.current + start;
	t.period = 0;
	if(period != 0) {
		t.period = period;
	}
	t.duration = 0;
	if(duration != 0) {
		t.duration = t.start + duration;
	}
	t.next = t.start;
	kha_Scheduler.insertSorted(kha_Scheduler.timeTasks,t);
	return t.id;
};
kha_Scheduler.addTimeTaskToGroup = function(groupId,task,start,period,duration) {
	if(duration == null) {
		duration = 0;
	}
	if(period == null) {
		period = 0;
	}
	return kha_Scheduler.addBreakableTimeTaskToGroup(groupId,function() {
		task();
		return true;
	},start,period,duration);
};
kha_Scheduler.addBreakableTimeTask = function(task,start,period,duration) {
	if(duration == null) {
		duration = 0;
	}
	if(period == null) {
		period = 0;
	}
	return kha_Scheduler.addBreakableTimeTaskToGroup(0,task,start,period,duration);
};
kha_Scheduler.addTimeTask = function(task,start,period,duration) {
	if(duration == null) {
		duration = 0;
	}
	if(period == null) {
		period = 0;
	}
	return kha_Scheduler.addTimeTaskToGroup(0,task,start,period,duration);
};
kha_Scheduler.getTimeTask = function(id) {
	if(kha_Scheduler.activeTimeTask != null && kha_Scheduler.activeTimeTask.id == id) {
		return kha_Scheduler.activeTimeTask;
	}
	var _g = 0;
	var _g1 = kha_Scheduler.timeTasks;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		if(timeTask.id == id) {
			return timeTask;
		}
	}
	var _g = 0;
	var _g1 = kha_Scheduler.pausedTimeTasks;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		if(timeTask.id == id) {
			return timeTask;
		}
	}
	return null;
};
kha_Scheduler.pauseTimeTask = function(id,paused) {
	var timeTask = kha_Scheduler.getTimeTask(id);
	if(timeTask != null) {
		kha_Scheduler.pauseRunningTimeTask(timeTask,paused);
	}
	if(kha_Scheduler.activeTimeTask != null && kha_Scheduler.activeTimeTask.id == id) {
		kha_Scheduler.activeTimeTask.paused = paused;
	}
};
kha_Scheduler.pauseRunningTimeTask = function(timeTask,paused) {
	timeTask.paused = paused;
	if(paused) {
		HxOverrides.remove(kha_Scheduler.timeTasks,timeTask);
		kha_Scheduler.pausedTimeTasks.push(timeTask);
	} else {
		kha_Scheduler.insertSorted(kha_Scheduler.timeTasks,timeTask);
		HxOverrides.remove(kha_Scheduler.pausedTimeTasks,timeTask);
	}
};
kha_Scheduler.pauseTimeTasks = function(groupId,paused) {
	var _g = 0;
	var _g1 = kha_Scheduler.timeTasks;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		if(timeTask.groupId == groupId) {
			kha_Scheduler.pauseRunningTimeTask(timeTask,paused);
		}
	}
	if(kha_Scheduler.activeTimeTask != null && kha_Scheduler.activeTimeTask.groupId == groupId) {
		kha_Scheduler.activeTimeTask.paused = paused;
	}
};
kha_Scheduler.removeTimeTask = function(id) {
	var timeTask = kha_Scheduler.getTimeTask(id);
	if(timeTask != null) {
		timeTask.active = false;
		HxOverrides.remove(kha_Scheduler.timeTasks,timeTask);
	}
};
kha_Scheduler.removeTimeTasks = function(groupId) {
	var _g = 0;
	var _g1 = kha_Scheduler.timeTasks;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		if(timeTask.groupId == groupId) {
			timeTask.active = false;
			kha_Scheduler.timeTasksScratchpad.push(timeTask);
		}
	}
	var _g = 0;
	var _g1 = kha_Scheduler.timeTasksScratchpad;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		HxOverrides.remove(kha_Scheduler.timeTasks,timeTask);
	}
	while(kha_Scheduler.timeTasksScratchpad.length > 0) HxOverrides.remove(kha_Scheduler.timeTasksScratchpad,kha_Scheduler.timeTasksScratchpad[0]);
	if(kha_Scheduler.activeTimeTask != null && kha_Scheduler.activeTimeTask.groupId == groupId) {
		kha_Scheduler.activeTimeTask.active = false;
	}
};
kha_Scheduler.numTasksInSchedule = function() {
	return kha_Scheduler.timeTasks.length + kha_Scheduler.frameTasks.length;
};
kha_Scheduler.insertSorted = function(list,task) {
	var _g = 0;
	var _g1 = list.length;
	while(_g < _g1) {
		var i = _g++;
		if(list[i].next > task.next) {
			list.splice(i,0,task);
			return;
		}
	}
	list.push(task);
};
kha_Scheduler.sortFrameTasks = function() {
	if(kha_Scheduler.frame_tasks_sorted) {
		return;
	}
	kha_Scheduler.frameTasks.sort(function(a,b) {
		if(a.priority > b.priority) {
			return 1;
		} else if(a.priority < b.priority) {
			return -1;
		} else {
			return 0;
		}
	});
	kha_Scheduler.frame_tasks_sorted = true;
};
var kha_Shaders = function() { };
$hxClasses["kha.Shaders"] = kha_Shaders;
kha_Shaders.__name__ = true;
kha_Shaders.init = function() {
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_colored_fragData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_colored_fragData" + 1);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_colored_fragData" + 2);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_colored_frag = new kha_graphics4_FragmentShader(blobs,["painter-colored.frag.essl","painter-colored-webgl2.frag.essl","painter-colored-relaxed.frag.essl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_colored_vertData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_colored_vertData" + 1);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_colored_vertData" + 2);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_colored_vert = new kha_graphics4_VertexShader(blobs,["painter-colored.vert.essl","painter-colored-webgl2.vert.essl","painter-colored-relaxed.vert.essl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_image_fragData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_image_fragData" + 1);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_image_fragData" + 2);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_image_frag = new kha_graphics4_FragmentShader(blobs,["painter-image.frag.essl","painter-image-webgl2.frag.essl","painter-image-relaxed.frag.essl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_image_vertData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_image_vertData" + 1);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_image_vertData" + 2);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_image_vert = new kha_graphics4_VertexShader(blobs,["painter-image.vert.essl","painter-image-webgl2.vert.essl","painter-image-relaxed.vert.essl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_text_fragData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_text_fragData" + 1);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_text_fragData" + 2);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_text_frag = new kha_graphics4_FragmentShader(blobs,["painter-text.frag.essl","painter-text-webgl2.frag.essl","painter-text-relaxed.frag.essl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_text_vertData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_text_vertData" + 1);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_text_vertData" + 2);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_text_vert = new kha_graphics4_VertexShader(blobs,["painter-text.vert.essl","painter-text-webgl2.vert.essl","painter-text-relaxed.vert.essl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_video_fragData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_video_fragData" + 1);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_video_fragData" + 2);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_video_frag = new kha_graphics4_FragmentShader(blobs,["painter-video.frag.essl","painter-video-webgl2.frag.essl","painter-video-relaxed.frag.essl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_video_vertData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_video_vertData" + 1);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	var data = Reflect.field(kha_Shaders,"painter_video_vertData" + 2);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_video_vert = new kha_graphics4_VertexShader(blobs,["painter-video.vert.essl","painter-video-webgl2.vert.essl","painter-video-relaxed.vert.essl"]);
};
var kha_Sound = function() {
	this.sampleRate = 0;
	this.channels = 0;
	this.length = 0;
};
$hxClasses["kha.Sound"] = kha_Sound;
kha_Sound.__name__ = true;
kha_Sound.__interfaces__ = [kha_Resource];
kha_Sound.prototype = {
	compressedData: null
	,uncompressedData: null
	,length: null
	,channels: null
	,sampleRate: null
	,uncompress: function(done) {
		if(this.uncompressedData != null) {
			done();
			return;
		}
		var output = new haxe_io_BytesOutput();
		var header = kha_audio2_ogg_vorbis_Reader.readAll(this.compressedData,output,true);
		var soundBytes = output.getBytes();
		var count = soundBytes.length / 4 | 0;
		if(header.channel == 1) {
			this.length = count / kha_audio2_Audio.samplesPerSecond;
			this.uncompressedData = kha_arrays_Float32Array._new(count * 2);
			var _g = 0;
			var _g1 = count;
			while(_g < _g1) {
				var i = _g++;
				var this1 = this.uncompressedData;
				var v = soundBytes.getFloat(i * 4);
				this1.setFloat32(i * 2 * 4,v,true);
				var this2 = this.uncompressedData;
				var v1 = soundBytes.getFloat(i * 4);
				this2.setFloat32((i * 2 + 1) * 4,v1,true);
			}
		} else {
			this.length = count / 2 / kha_audio2_Audio.samplesPerSecond;
			this.uncompressedData = kha_arrays_Float32Array._new(count);
			var _g = 0;
			var _g1 = count;
			while(_g < _g1) {
				var i = _g++;
				var this1 = this.uncompressedData;
				var v = soundBytes.getFloat(i * 4);
				this1.setFloat32(i * 4,v,true);
			}
		}
		this.channels = header.channel;
		this.sampleRate = header.sampleRate;
		this.compressedData = null;
		done();
	}
	,unload: function() {
		this.compressedData = null;
		this.uncompressedData = null;
	}
	,__class__: kha_Sound
};
var kha_SystemOptions = function(title,width,height,$window,framebuffer) {
	if(height == null) {
		height = -1;
	}
	if(width == null) {
		width = -1;
	}
	if(title == null) {
		title = "Kha";
	}
	this.framebuffer = null;
	this.window = null;
	this.height = -1;
	this.width = -1;
	this.title = "Kha";
	this.title = title;
	this.window = $window == null ? new kha_WindowOptions(null,-1,-1,800,600,-1,true,null,0) : $window;
	if(width > 0) {
		this.window.width = width;
		this.width = width;
	} else {
		this.width = this.window.width;
	}
	if(height > 0) {
		this.window.height = height;
		this.height = height;
	} else {
		this.height = this.window.height;
	}
	if(this.window.title == null) {
		this.window.title = title;
	}
	this.framebuffer = framebuffer == null ? new kha_FramebufferOptions(60,true,32,16,8,1) : framebuffer;
};
$hxClasses["kha.SystemOptions"] = kha_SystemOptions;
kha_SystemOptions.__name__ = true;
kha_SystemOptions.prototype = {
	title: null
	,width: null
	,height: null
	,window: null
	,framebuffer: null
	,__class__: kha_SystemOptions
};
var kha_System = function() { };
$hxClasses["kha.System"] = kha_System;
kha_System.__name__ = true;
kha_System.init = function(options,callback) {
	var features = 0;
	if(options.resizable) {
		features |= 1;
	}
	if(options.maximizable) {
		features |= 4;
	}
	if(options.minimizable) {
		features |= 2;
	}
	var newOptions = new kha_SystemOptions(options.title,options.width,options.height,new kha_WindowOptions(null,-1,-1,800,600,-1,true,features,options.windowMode),new kha_FramebufferOptions(60,options.vSync,32,16,8,options.samplesPerPixel));
	kha_System.start(newOptions,function(_) {
		callback();
	});
};
kha_System.start = function(options,callback) {
	kha_System.theTitle = options.title;
	kha_SystemImpl.init(options,callback);
};
kha_System.get_title = function() {
	return kha_System.theTitle;
};
kha_System.notifyOnRender = function(listener,id) {
	if(id == null) {
		id = 0;
	}
	kha_System.renderListeners.push(function(framebuffers) {
		if(id < framebuffers.length) {
			listener(framebuffers[id]);
		}
	});
};
kha_System.notifyOnFrames = function(listener) {
	kha_System.renderListeners.push(listener);
};
kha_System.removeFramesListener = function(listener) {
	HxOverrides.remove(kha_System.renderListeners,listener);
};
kha_System.notifyOnApplicationState = function(foregroundListener,resumeListener,pauseListener,backgroundListener,shutdownListener) {
	if(foregroundListener != null) {
		kha_System.foregroundListeners.push(foregroundListener);
	}
	if(resumeListener != null) {
		kha_System.resumeListeners.push(resumeListener);
	}
	if(pauseListener != null) {
		kha_System.pauseListeners.push(pauseListener);
	}
	if(backgroundListener != null) {
		kha_System.backgroundListeners.push(backgroundListener);
	}
	if(shutdownListener != null) {
		kha_System.shutdownListeners.push(shutdownListener);
	}
};
kha_System.removeApplicationStateListeners = function(foregroundListener,resumeListener,pauseListener,backgroundListener,shutdownListener) {
	if(foregroundListener != null) {
		HxOverrides.remove(kha_System.foregroundListeners,foregroundListener);
	}
	if(resumeListener != null) {
		HxOverrides.remove(kha_System.resumeListeners,resumeListener);
	}
	if(pauseListener != null) {
		HxOverrides.remove(kha_System.pauseListeners,pauseListener);
	}
	if(backgroundListener != null) {
		HxOverrides.remove(kha_System.backgroundListeners,backgroundListener);
	}
	if(shutdownListener != null) {
		HxOverrides.remove(kha_System.shutdownListeners,shutdownListener);
	}
};
kha_System.notifyOnDropFiles = function(dropFilesListener) {
	kha_System.dropFilesListeners.push(dropFilesListener);
};
kha_System.removeDropListener = function(listener) {
	HxOverrides.remove(kha_System.dropFilesListeners,listener);
};
kha_System.notifyOnCutCopyPaste = function(cutListener,copyListener,pasteListener) {
	kha_System.cutListener = cutListener;
	kha_System.copyListener = copyListener;
	kha_System.pasteListener = pasteListener;
};
kha_System.notifyOnLoginLogout = function(loginListener,logoutListener) {
	kha_System.loginListener = loginListener;
	kha_System.logoutListener = logoutListener;
};
kha_System.login = function() {
	kha_SystemImpl.login();
};
kha_System.waitingForLogin = function() {
	return kha_SystemImpl.waitingForLogin();
};
kha_System.allowUserChange = function() {
	kha_SystemImpl.allowUserChange();
};
kha_System.disallowUserChange = function() {
	kha_SystemImpl.disallowUserChange();
};
kha_System.render = function(framebuffers) {
	var _g = 0;
	var _g1 = kha_System.renderListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener(framebuffers);
	}
};
kha_System.foreground = function() {
	var _g = 0;
	var _g1 = kha_System.foregroundListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener();
	}
};
kha_System.resume = function() {
	var _g = 0;
	var _g1 = kha_System.resumeListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener();
	}
};
kha_System.pause = function() {
	var _g = 0;
	var _g1 = kha_System.pauseListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener();
	}
};
kha_System.background = function() {
	var _g = 0;
	var _g1 = kha_System.backgroundListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener();
	}
};
kha_System.shutdown = function() {
	var _g = 0;
	var _g1 = kha_System.shutdownListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener();
	}
};
kha_System.dropFiles = function(filePath) {
	var _g = 0;
	var _g1 = kha_System.dropFilesListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener(filePath);
	}
};
kha_System.get_time = function() {
	return kha_SystemImpl.getTime();
};
kha_System.windowWidth = function($window) {
	if($window == null) {
		$window = 0;
	}
	return kha_Window.get($window).get_width();
};
kha_System.windowHeight = function($window) {
	if($window == null) {
		$window = 0;
	}
	return kha_Window.get_all()[$window].get_height();
};
kha_System.get_screenRotation = function() {
	return 0;
};
kha_System.get_systemId = function() {
	return kha_SystemImpl.getSystemId();
};
kha_System.vibrate = function(ms) {
	kha_SystemImpl.vibrate(ms);
};
kha_System.get_language = function() {
	return kha_SystemImpl.getLanguage();
};
kha_System.stop = function() {
	return kha_SystemImpl.requestShutdown();
};
kha_System.loadUrl = function(url) {
	kha_SystemImpl.loadUrl(url);
};
kha_System.canSwitchFullscreen = function() {
	return true;
};
kha_System.isFullscreen = function() {
	if(kha_Window.get(0).get_mode() != 1) {
		return kha_Window.get(0).get_mode() == 2;
	} else {
		return true;
	}
};
kha_System.requestFullscreen = function() {
	kha_Window.get(0).set_mode(1);
};
kha_System.exitFullscreen = function() {
	kha_Window.get(0).set_mode(0);
};
kha_System.notifyOnFullscreenChange = function(func,error) {
};
kha_System.removeFullscreenListener = function(func,error) {
};
kha_System.changeResolution = function(width,height) {
};
kha_System.requestShutdown = function() {
	kha_System.stop();
};
kha_System.get_vsync = function() {
	return kha_Window.get(0).get_vSynced();
};
kha_System.get_refreshRate = function() {
	return kha_Display.get_primary().get_frequency();
};
kha_System.screenDpi = function() {
	return kha_Display.get_primary().get_pixelsPerInch();
};
kha_System.safeZone = function() {
	return kha_SystemImpl.safeZone();
};
kha_System.automaticSafeZone = function() {
	return kha_SystemImpl.automaticSafeZone();
};
kha_System.setSafeZone = function(value) {
	kha_SystemImpl.setSafeZone(value);
};
kha_System.unlockAchievement = function(id) {
	kha_SystemImpl.unlockAchievement(id);
};
var kha_GamepadStates = function() {
	this.axes = [];
	this.buttons = [];
};
$hxClasses["kha.GamepadStates"] = kha_GamepadStates;
kha_GamepadStates.__name__ = true;
kha_GamepadStates.prototype = {
	axes: null
	,buttons: null
	,__class__: kha_GamepadStates
};
var kha_SystemImpl = function() { };
$hxClasses["kha.SystemImpl"] = kha_SystemImpl;
kha_SystemImpl.__name__ = true;
kha_SystemImpl.errorHandler = function(message,source,lineno,colno,error) {
	$global.console.error("Error: " + message);
	$global.console.error("Stack:\n" + Std.string(error.stack));
	return true;
};
kha_SystemImpl.init = function(options,callback) {
	kha_SystemImpl.options = options;
	kha_SystemImpl.mobile = kha_SystemImpl.isMobile();
	kha_SystemImpl.ios = kha_SystemImpl.isIOS();
	kha_SystemImpl.chrome = kha_SystemImpl.isChrome();
	kha_SystemImpl.firefox = kha_SystemImpl.isFirefox();
	kha_SystemImpl.safari = kha_SystemImpl.isSafari();
	kha_SystemImpl.ie = kha_SystemImpl.isIE();
	kha_SystemImpl.mobileAudioPlaying = !kha_SystemImpl.mobile && !kha_SystemImpl.chrome && !kha_SystemImpl.firefox;
	kha_SystemImpl.initSecondStep(callback);
};
kha_SystemImpl.initSecondStep = function(callback) {
	kha_SystemImpl.init2(kha_SystemImpl.options.window.width,kha_SystemImpl.options.window.height);
	kha_SystemImpl.initAnimate(callback);
};
kha_SystemImpl.initSensor = function() {
	if(kha_SystemImpl.ios) {
		window.ondevicemotion = function(event) {
			kha_input_Sensor._changed(0,-event.accelerationIncludingGravity.x,-event.accelerationIncludingGravity.y,-event.accelerationIncludingGravity.z);
		};
	} else {
		window.ondevicemotion = function(event) {
			kha_input_Sensor._changed(0,event.accelerationIncludingGravity.x,event.accelerationIncludingGravity.y,event.accelerationIncludingGravity.z);
		};
	}
	window.ondeviceorientation = function(event) {
		kha_input_Sensor._changed(1,event.beta,event.gamma,event.alpha);
	};
};
kha_SystemImpl.isMobile = function() {
	var agent = $global.navigator.userAgent;
	if(agent.indexOf("Android") != -1 || agent.indexOf("webOS") != -1 || agent.indexOf("BlackBerry") != -1 || agent.indexOf("Windows Phone") != -1) {
		return true;
	}
	if(kha_SystemImpl.isIOS()) {
		return true;
	}
	return false;
};
kha_SystemImpl.isIOS = function() {
	var agent = $global.navigator.userAgent;
	if(agent.indexOf("iPhone") != -1 || agent.indexOf("iPad") != -1 || agent.indexOf("iPod") != -1) {
		return true;
	}
	return false;
};
kha_SystemImpl.isChrome = function() {
	var agent = $global.navigator.userAgent;
	if(agent.indexOf("Chrome") != -1) {
		return true;
	}
	return false;
};
kha_SystemImpl.isFirefox = function() {
	var agent = $global.navigator.userAgent;
	if(agent.indexOf("Firefox") != -1) {
		return true;
	}
	return false;
};
kha_SystemImpl.isSafari = function() {
	var agent = $global.navigator.userAgent;
	if(agent.indexOf("Safari") != -1 && agent.indexOf("Chrome") == -1) {
		return true;
	}
	return false;
};
kha_SystemImpl.isIE = function() {
	var agent = $global.navigator.userAgent;
	if(agent.indexOf("MSIE ") != -1 || agent.indexOf("Trident/") != -1) {
		return true;
	}
	return false;
};
kha_SystemImpl.setCanvas = function(canvas) {
	kha_SystemImpl.khanvas = canvas;
};
kha_SystemImpl.getScreenRotation = function() {
	return 0;
};
kha_SystemImpl.getTime = function() {
	var now = window.performance != null ? window.performance.now() : Date.now();
	return now / 1000;
};
kha_SystemImpl.getSystemId = function() {
	return "HTML5";
};
kha_SystemImpl.vibrate = function(ms) {
	$global.navigator.vibrate(ms);
};
kha_SystemImpl.getLanguage = function() {
	var lang = $global.navigator.language;
	return HxOverrides.substr(lang,0,2).toLowerCase();
};
kha_SystemImpl.requestShutdown = function() {
	window.close();
	return true;
};
kha_SystemImpl.init2 = function(defaultWidth,defaultHeight,backbufferFormat) {
	kha_SystemImpl.keyboard = new kha_input_Keyboard();
	kha_SystemImpl.mouse = new kha_input_MouseImpl();
	kha_SystemImpl.surface = new kha_input_Surface();
	kha_SystemImpl.gamepads = [];
	kha_SystemImpl.gamepadStates = [];
	kha_SystemImpl.gamepads[0] = new kha_input_Gamepad(0);
	kha_SystemImpl.gamepadStates[0] = new kha_GamepadStates();
	kha_SystemImpl.gamepads[1] = new kha_input_Gamepad(1);
	kha_SystemImpl.gamepadStates[1] = new kha_GamepadStates();
	kha_SystemImpl.gamepads[2] = new kha_input_Gamepad(2);
	kha_SystemImpl.gamepadStates[2] = new kha_GamepadStates();
	kha_SystemImpl.gamepads[3] = new kha_input_Gamepad(3);
	kha_SystemImpl.gamepadStates[3] = new kha_GamepadStates();
	window.addEventListener("gamepadconnected",function(e) {
		var pad = e.gamepad;
		kha_input_Gamepad.sendConnectEvent(pad.index);
		var _g = 0;
		var _g1 = pad.buttons.length;
		while(_g < _g1) {
			var i = _g++;
			kha_SystemImpl.gamepadStates[pad.index].buttons[i] = 0;
		}
	});
	window.addEventListener("gamepaddisconnected",function(e) {
		kha_input_Gamepad.sendDisconnectEvent(e.gamepad.index);
	});
	var sysGamepads = kha_SystemImpl.getGamepads();
	if(sysGamepads != null) {
		var _g = 0;
		var _g1 = sysGamepads.length;
		while(_g < _g1) {
			var i = _g++;
			var pad = sysGamepads[i];
			if(pad != null) {
				kha_SystemImpl.gamepads[pad.index].connected = true;
			}
		}
	}
	var onCopy = function(e) {
		if(kha_System.copyListener != null) {
			var data = kha_System.copyListener();
			if(data != null) {
				e.clipboardData.setData("text/plain",data);
			}
			e.preventDefault();
		}
	};
	var onCut = function(e) {
		if(kha_System.cutListener != null) {
			var data = kha_System.cutListener();
			if(data != null) {
				e.clipboardData.setData("text/plain",data);
			}
			e.preventDefault();
		}
	};
	var onPaste = function(e) {
		if(kha_System.pasteListener != null) {
			var onPaste = e.clipboardData.getData("text/plain");
			kha_System.pasteListener(onPaste);
			e.preventDefault();
		}
	};
	var document = window.document;
	document.addEventListener("copy",onCopy);
	document.addEventListener("cut",onCut);
	document.addEventListener("paste",onPaste);
	kha_CanvasImage.init();
	kha_Scheduler.init();
	kha_SystemImpl.loadFinished(defaultWidth,defaultHeight);
};
kha_SystemImpl.copyToClipboard = function(text) {
	var textArea = window.document.createElement("textarea");
	textArea.value = text;
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";
	window.document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	try {
		window.document.execCommand("copy");
	} catch( _g ) {
	}
	window.document.body.removeChild(textArea);
};
kha_SystemImpl.getMouse = function(num) {
	if(num != 0) {
		return null;
	}
	return kha_SystemImpl.mouse;
};
kha_SystemImpl.getKeyboard = function(num) {
	if(num != 0) {
		return null;
	}
	return kha_SystemImpl.keyboard;
};
kha_SystemImpl.checkGamepad = function(pad) {
	var _g = 0;
	var _g1 = pad.axes.length;
	while(_g < _g1) {
		var i = _g++;
		if(pad.axes[i] != null) {
			var axis = pad.axes[i];
			if(kha_SystemImpl.gamepadStates[pad.index].axes[i] != axis) {
				kha_SystemImpl.gamepadStates[pad.index].axes[i] = axis;
				kha_SystemImpl.gamepads[pad.index].sendAxisEvent(i,axis);
			}
		}
	}
	var _g = 0;
	var _g1 = pad.buttons.length;
	while(_g < _g1) {
		var i = _g++;
		if(pad.buttons[i] != null) {
			if(kha_SystemImpl.gamepadStates[pad.index].buttons[i] != pad.buttons[i].value) {
				kha_SystemImpl.gamepadStates[pad.index].buttons[i] = pad.buttons[i].value;
				kha_SystemImpl.gamepads[pad.index].sendButtonEvent(i,pad.buttons[i].value);
			}
		}
	}
	if(pad.axes.length <= 4 && pad.buttons.length > 7) {
		kha_SystemImpl.gamepadStates[pad.index].axes[4] = pad.buttons[6].value;
		kha_SystemImpl.gamepads[pad.index].sendAxisEvent(4,pad.buttons[6].value);
		kha_SystemImpl.gamepadStates[pad.index].axes[5] = pad.buttons[7].value;
		kha_SystemImpl.gamepads[pad.index].sendAxisEvent(5,pad.buttons[7].value);
	}
};
kha_SystemImpl.getCanvasElement = function() {
	if(kha_SystemImpl.khanvas != null) {
		return kha_SystemImpl.khanvas;
	}
	return window.document.getElementById("khanvas");
};
kha_SystemImpl.loadFinished = function(defaultWidth,defaultHeight) {
	var canvas = kha_SystemImpl.getCanvasElement();
	canvas.style.cursor = "default";
	var gl = false;
	try {
		kha_SystemImpl.gl = canvas.getContext("webgl2",{ alpha : false, antialias : kha_SystemImpl.options.framebuffer.samplesPerPixel > 1, stencil : true});
		kha_SystemImpl.gl.pixelStorei(37441,1);
		kha_SystemImpl.halfFloat = { HALF_FLOAT_OES : 5131};
		kha_SystemImpl.depthTexture = { UNSIGNED_INT_24_8_WEBGL : 34042};
		kha_SystemImpl.drawBuffers = { COLOR_ATTACHMENT0_WEBGL : 36064};
		kha_SystemImpl.elementIndexUint = true;
		kha_SystemImpl.gl.getExtension("EXT_color_buffer_float");
		kha_SystemImpl.gl.getExtension("OES_texture_float_linear");
		kha_SystemImpl.gl.getExtension("OES_texture_half_float_linear");
		kha_SystemImpl.anisotropicFilter = kha_SystemImpl.gl.getExtension("EXT_texture_filter_anisotropic");
		if(kha_SystemImpl.anisotropicFilter == null) {
			kha_SystemImpl.anisotropicFilter = kha_SystemImpl.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
		}
		gl = true;
		kha_SystemImpl.gl2 = true;
		kha_Shaders.init();
	} catch( _g ) {
		haxe_Log.trace("Could not initialize WebGL 2, falling back to WebGL.",{ fileName : "kha/SystemImpl.hx", lineNumber : 395, className : "kha.SystemImpl", methodName : "loadFinished"});
	}
	if(!kha_SystemImpl.gl2) {
		try {
			kha_SystemImpl.gl = canvas.getContext("experimental-webgl",{ alpha : false, antialias : kha_SystemImpl.options.framebuffer.samplesPerPixel > 1, stencil : true});
			kha_SystemImpl.gl.pixelStorei(37441,1);
			kha_SystemImpl.gl.getExtension("OES_texture_float");
			kha_SystemImpl.gl.getExtension("OES_texture_float_linear");
			kha_SystemImpl.halfFloat = kha_SystemImpl.gl.getExtension("OES_texture_half_float");
			kha_SystemImpl.gl.getExtension("OES_texture_half_float_linear");
			kha_SystemImpl.depthTexture = kha_SystemImpl.gl.getExtension("WEBGL_depth_texture");
			kha_SystemImpl.gl.getExtension("EXT_shader_texture_lod");
			kha_SystemImpl.gl.getExtension("OES_standard_derivatives");
			kha_SystemImpl.anisotropicFilter = kha_SystemImpl.gl.getExtension("EXT_texture_filter_anisotropic");
			if(kha_SystemImpl.anisotropicFilter == null) {
				kha_SystemImpl.anisotropicFilter = kha_SystemImpl.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
			}
			kha_SystemImpl.drawBuffers = kha_SystemImpl.gl.getExtension("WEBGL_draw_buffers");
			kha_SystemImpl.elementIndexUint = kha_SystemImpl.gl.getExtension("OES_element_index_uint");
			gl = true;
			kha_Shaders.init();
		} catch( _g ) {
			haxe_Log.trace("Could not initialize WebGL, falling back to <canvas>.",{ fileName : "kha/SystemImpl.hx", lineNumber : 423, className : "kha.SystemImpl", methodName : "loadFinished"});
		}
	}
	kha_SystemImpl.setCanvas(canvas);
	kha_SystemImpl.window = new kha_Window(0,defaultWidth,defaultHeight,canvas);
	if(gl) {
		var g4 = new kha_js_graphics4_Graphics();
		kha_SystemImpl.frame = new kha_Framebuffer(0,null,null,g4);
		kha_SystemImpl.frame.init(new kha_graphics2_Graphics1(kha_SystemImpl.frame),new kha_js_graphics4_Graphics2(kha_SystemImpl.frame),g4);
	} else {
		kha_js_Font.Kravur = kha_Kravur; kha_Kravur = kha_js_Font;
		var g2 = new kha_js_CanvasGraphics(canvas.getContext("2d"));
		kha_SystemImpl.frame = new kha_Framebuffer(0,null,g2,null);
		kha_SystemImpl.frame.init(new kha_graphics2_Graphics1(kha_SystemImpl.frame),g2,null);
	}
	if(!kha_SystemImpl.mobile && kha_audio2_Audio._init()) {
		kha_SystemImpl._hasWebAudio = true;
		kha_audio2_Audio1._init();
	} else if(kha_SystemImpl.mobile) {
		kha_SystemImpl._hasWebAudio = false;
		kha_js_MobileWebAudio._init();
		kha_audio2_Audio1 = kha_js_MobileWebAudio;
	} else {
		kha_SystemImpl._hasWebAudio = false;
		kha_audio2_Audio1 = kha_js_AudioElementAudio;
	}
	kha_vr_VrInterface.instance = new kha_js_vr_VrInterface();
	canvas.focus();
	canvas.onmousedown = kha_SystemImpl.mouseDown;
	canvas.onmousemove = kha_SystemImpl.mouseMove;
	if(kha_SystemImpl.keyboard != null) {
		canvas.onkeydown = kha_SystemImpl.keyDown;
		canvas.onkeyup = kha_SystemImpl.keyUp;
		canvas.onkeypress = kha_SystemImpl.keyPress;
	}
	canvas.onblur = kha_SystemImpl.onBlur;
	canvas.onfocus = kha_SystemImpl.onFocus;
	canvas.onmouseleave = kha_SystemImpl.mouseLeave;
	canvas.addEventListener("wheel",kha_SystemImpl.mouseWheel,false);
	canvas.addEventListener("touchstart",kha_SystemImpl.touchDown,false);
	canvas.addEventListener("touchend",kha_SystemImpl.touchUp,false);
	canvas.addEventListener("touchmove",kha_SystemImpl.touchMove,false);
	canvas.addEventListener("touchcancel",kha_SystemImpl.touchCancel,false);
	window.document.addEventListener("dragover",function(event) {
		event.preventDefault();
	});
	window.document.addEventListener("drop",function(event) {
		event.preventDefault();
		if(event.dataTransfer != null && event.dataTransfer.files != null) {
			var _g = 0;
			var _g1 = event.dataTransfer.files;
			while(_g < _g1.length) {
				var file = _g1[_g];
				++_g;
				kha_LoaderImpl.dropFiles.h[file.name] = file;
				kha_System.dropFiles("drop://" + file.name);
			}
		}
	});
	window.addEventListener("unload",function() {
		kha_System.shutdown();
	});
};
kha_SystemImpl.initAnimate = function(callback) {
	var canvas = kha_SystemImpl.getCanvasElement();
	var $window = window;
	var requestAnimationFrame = $window.requestAnimationFrame;
	if(requestAnimationFrame == null) {
		requestAnimationFrame = $window.mozRequestAnimationFrame;
	}
	if(requestAnimationFrame == null) {
		requestAnimationFrame = $window.webkitRequestAnimationFrame;
	}
	if(requestAnimationFrame == null) {
		requestAnimationFrame = $window.msRequestAnimationFrame;
	}
	var isRefreshRateDetectionActive = false;
	var lastTimestamp = 0.0;
	var possibleRefreshRates = [30,60,75,90,120,144,240,340,360];
	var _g = [];
	var _g1 = 0;
	var _g2 = possibleRefreshRates.length;
	while(_g1 < _g2) {
		var _ = _g1++;
		_g.push(0);
	}
	var refreshRatesCounts = _g;
	var animate = null;
	animate = function(timestamp) {
		if(requestAnimationFrame == null) {
			window.setTimeout(animate,16.666666666666668);
		} else {
			requestAnimationFrame(animate);
		}
		var sysGamepads = kha_SystemImpl.getGamepads();
		if(sysGamepads != null) {
			var _g = 0;
			var _g1 = sysGamepads.length;
			while(_g < _g1) {
				var i = _g++;
				var pad = sysGamepads[i];
				if(pad != null) {
					kha_SystemImpl.checkGamepad(pad);
				}
			}
		}
		kha_Scheduler.executeFrame();
		if(canvas.getContext != null) {
			if(kha_SystemImpl.lastCanvasClientWidth != canvas.clientWidth || kha_SystemImpl.lastCanvasClientHeight != canvas.clientHeight) {
				var scale = window.devicePixelRatio;
				var clientWidth = canvas.clientWidth;
				var clientHeight = canvas.clientHeight;
				canvas.width = clientWidth;
				canvas.height = clientHeight;
				if(scale != 1) {
					canvas.style.width = (clientWidth / scale | 0) + "px";
					canvas.style.height = (clientHeight / scale | 0) + "px";
				}
				kha_SystemImpl.lastCanvasClientWidth = canvas.clientWidth;
				kha_SystemImpl.lastCanvasClientHeight = canvas.clientHeight;
			}
			kha_System.render([kha_SystemImpl.frame]);
			if(kha_SystemImpl.ie && kha_SystemImpl.gl != null) {
				kha_SystemImpl.gl.clearColor(1,1,1,1);
				kha_SystemImpl.gl.colorMask(false,false,false,true);
				kha_SystemImpl.gl.clear(16384);
				kha_SystemImpl.gl.colorMask(true,true,true,true);
			}
		}
		if(!isRefreshRateDetectionActive) {
			return;
		}
		if(lastTimestamp == 0) {
			lastTimestamp = timestamp;
			return;
		}
		var fps = Math.floor(1000 / (timestamp - lastTimestamp));
		if(kha_SystemImpl.estimatedRefreshRate < fps) {
			kha_SystemImpl.estimatedRefreshRate = fps;
		}
		lastTimestamp = timestamp;
		var _g3_current = 0;
		var _g3_array = possibleRefreshRates;
		while(_g3_current < _g3_array.length) {
			var _g4_value = _g3_array[_g3_current];
			var _g4_key = _g3_current++;
			var i = _g4_key;
			var rate = _g4_value;
			if(fps > rate - 3 && fps < rate + 3) {
				refreshRatesCounts[i]++;
			}
		}
	};
	window.setTimeout(function() {
		isRefreshRateDetectionActive = true;
		return window.setTimeout(function() {
			isRefreshRateDetectionActive = false;
			var index = possibleRefreshRates.indexOf(60);
			var max = 0;
			var _g3_current = 0;
			var _g3_array = refreshRatesCounts;
			while(_g3_current < _g3_array.length) {
				var _g4_value = _g3_array[_g3_current];
				var _g4_key = _g3_current++;
				var i = _g4_key;
				var count = _g4_value;
				if(count > max) {
					max = count;
					index = i;
				}
			}
			return kha_SystemImpl.estimatedRefreshRate = possibleRefreshRates[index];
		},1000);
	},500);
	kha_Scheduler.start();
	requestAnimationFrame(animate);
	callback(kha_SystemImpl.window);
};
kha_SystemImpl.lockMouse = function() {
	if(($_=kha_SystemImpl.khanvas,$bind($_,$_.requestPointerLock))) {
		kha_SystemImpl.khanvas.requestPointerLock();
	} else if(kha_SystemImpl.khanvas.mozRequestPointerLock) {
		kha_SystemImpl.khanvas.mozRequestPointerLock();
	} else if(kha_SystemImpl.khanvas.webkitRequestPointerLock) {
		kha_SystemImpl.khanvas.webkitRequestPointerLock();
	}
};
kha_SystemImpl.unlockMouse = function() {
	if(document.exitPointerLock) {
		document.exitPointerLock();
	} else if(document.mozExitPointerLock) {
		document.mozExitPointerLock();
	} else if(document.webkitExitPointerLock) {
		document.webkitExitPointerLock();
	}
};
kha_SystemImpl.canLockMouse = function() {
	return 'pointerLockElement' in document ||
		'mozPointerLockElement' in document ||
		'webkitPointerLockElement' in document;
};
kha_SystemImpl.isMouseLocked = function() {
	return document.pointerLockElement === kha_SystemImpl.khanvas ||
			document.mozPointerLockElement === kha_SystemImpl.khanvas ||
			document.webkitPointerLockElement === kha_SystemImpl.khanvas;
};
kha_SystemImpl.notifyOfMouseLockChange = function(func,error) {
	window.document.addEventListener("pointerlockchange",func,false);
	window.document.addEventListener("mozpointerlockchange",func,false);
	window.document.addEventListener("webkitpointerlockchange",func,false);
	window.document.addEventListener("pointerlockerror",error,false);
	window.document.addEventListener("mozpointerlockerror",error,false);
	window.document.addEventListener("webkitpointerlockerror",error,false);
};
kha_SystemImpl.removeFromMouseLockChange = function(func,error) {
	window.document.removeEventListener("pointerlockchange",func,false);
	window.document.removeEventListener("mozpointerlockchange",func,false);
	window.document.removeEventListener("webkitpointerlockchange",func,false);
	window.document.removeEventListener("pointerlockerror",error,false);
	window.document.removeEventListener("mozpointerlockerror",error,false);
	window.document.removeEventListener("webkitpointerlockerror",error,false);
};
kha_SystemImpl.setMouseXY = function(event) {
	var rect = kha_SystemImpl.khanvas.getBoundingClientRect();
	var borderWidth = kha_SystemImpl.khanvas.clientLeft;
	var borderHeight = kha_SystemImpl.khanvas.clientTop;
	kha_SystemImpl.mouseX = (event.clientX - rect.left - borderWidth) * kha_SystemImpl.khanvas.width / (rect.width - 2 * borderWidth) | 0;
	kha_SystemImpl.mouseY = (event.clientY - rect.top - borderHeight) * kha_SystemImpl.khanvas.height / (rect.height - 2 * borderHeight) | 0;
};
kha_SystemImpl.unlockiOSSound = function() {
	if(!kha_SystemImpl.ios || kha_SystemImpl.iosSoundEnabled) {
		return;
	}
	var buffer = kha_js_MobileWebAudio._context.createBuffer(1,1,22050);
	var source = kha_js_MobileWebAudio._context.createBufferSource();
	source.buffer = buffer;
	source.connect(kha_js_MobileWebAudio._context.destination);
	source.start();
	source.stop();
	kha_SystemImpl.iosSoundEnabled = true;
};
kha_SystemImpl.unlockSound = function() {
	if(!kha_SystemImpl.soundEnabled) {
		var context = kha_audio2_Audio._context;
		if(context == null) {
			context = kha_audio2_Audio1._context;
		}
		if(context != null) {
			context.resume().then(function(c) {
				kha_SystemImpl.soundEnabled = true;
			}).catch(function(err) {
				haxe_Log.trace(err,{ fileName : "kha/SystemImpl.hx", lineNumber : 717, className : "kha.SystemImpl", methodName : "unlockSound"});
			});
		}
		kha_audio2_Audio.wakeChannels();
	}
	kha_SystemImpl.unlockiOSSound();
};
kha_SystemImpl.mouseLeave = function() {
	kha_SystemImpl.mouse.sendLeaveEvent(0);
};
kha_SystemImpl.mouseWheel = function(event) {
	kha_SystemImpl.unlockSound();
	kha_SystemImpl.insideInputEvent = true;
	var _g = kha_input_Mouse.wheelEventBlockBehavior;
	switch(_g._hx_index) {
	case 0:
		event.preventDefault();
		break;
	case 1:
		break;
	case 2:
		var func = _g.func;
		if(func(event)) {
			event.preventDefault();
		}
		break;
	}
	if(event.deltaMode == 0) {
		if(event.deltaY < 0) {
			kha_SystemImpl.mouse.sendWheelEvent(0,-1);
		} else if(event.deltaY > 0) {
			kha_SystemImpl.mouse.sendWheelEvent(0,1);
		}
		kha_SystemImpl.insideInputEvent = false;
		return;
	}
	if(event.deltaMode == 1) {
		kha_SystemImpl.minimumScroll = Math.min(kha_SystemImpl.minimumScroll,Math.abs(event.deltaY)) | 0;
		kha_SystemImpl.mouse.sendWheelEvent(0,event.deltaY / kha_SystemImpl.minimumScroll | 0);
		kha_SystemImpl.insideInputEvent = false;
		return;
	}
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.mouseDown = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	kha_SystemImpl.setMouseXY(event);
	if(event.which == 1) {
		kha_SystemImpl.mouse.sendDownEvent(0,0,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
		kha_SystemImpl.khanvas.ownerDocument.addEventListener("mousemove",kha_SystemImpl.documentMouseMove,true);
		kha_SystemImpl.khanvas.ownerDocument.addEventListener("mouseup",kha_SystemImpl.mouseLeftUp);
	} else if(event.which == 2) {
		kha_SystemImpl.mouse.sendDownEvent(0,2,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
		kha_SystemImpl.khanvas.ownerDocument.addEventListener("mouseup",kha_SystemImpl.mouseMiddleUp);
	} else if(event.which == 3) {
		kha_SystemImpl.mouse.sendDownEvent(0,1,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
		kha_SystemImpl.khanvas.ownerDocument.addEventListener("mouseup",kha_SystemImpl.mouseRightUp);
	} else if(event.which == 4) {
		kha_SystemImpl.mouse.sendDownEvent(0,3,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
		kha_SystemImpl.khanvas.ownerDocument.addEventListener("mouseup",kha_SystemImpl.mouseBackUp);
	} else if(event.which == 5) {
		kha_SystemImpl.mouse.sendDownEvent(0,4,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
		kha_SystemImpl.khanvas.ownerDocument.addEventListener("mouseup",kha_SystemImpl.mouseForwardUp);
	}
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.mouseLeftUp = function(event) {
	kha_SystemImpl.unlockSound();
	if(event.which != 1) {
		return;
	}
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.khanvas.ownerDocument.removeEventListener("mouseup",kha_SystemImpl.mouseLeftUp);
	kha_SystemImpl.khanvas.ownerDocument.removeEventListener("mousemove",kha_SystemImpl.documentMouseMove,true);
	kha_SystemImpl.mouse.sendUpEvent(0,0,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.mouseMiddleUp = function(event) {
	kha_SystemImpl.unlockSound();
	if(event.which != 2) {
		return;
	}
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.khanvas.ownerDocument.removeEventListener("mouseup",kha_SystemImpl.mouseMiddleUp);
	kha_SystemImpl.mouse.sendUpEvent(0,2,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.mouseRightUp = function(event) {
	kha_SystemImpl.unlockSound();
	if(event.which != 3) {
		return;
	}
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.khanvas.ownerDocument.removeEventListener("mouseup",kha_SystemImpl.mouseRightUp);
	kha_SystemImpl.mouse.sendUpEvent(0,1,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.mouseBackUp = function(event) {
	kha_SystemImpl.unlockSound();
	if(event.which != 4) {
		return;
	}
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.khanvas.ownerDocument.removeEventListener("mouseup",kha_SystemImpl.mouseBackUp);
	kha_SystemImpl.mouse.sendUpEvent(0,3,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.mouseForwardUp = function(event) {
	kha_SystemImpl.unlockSound();
	if(event.which != 5) {
		return;
	}
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.khanvas.ownerDocument.removeEventListener("mouseup",kha_SystemImpl.mouseForwardUp);
	kha_SystemImpl.mouse.sendUpEvent(0,4,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.documentMouseMove = function(event) {
	event.stopPropagation();
	kha_SystemImpl.mouseMove(event);
};
kha_SystemImpl.mouseMove = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	var lastMouseX = kha_SystemImpl.mouseX;
	var lastMouseY = kha_SystemImpl.mouseY;
	kha_SystemImpl.setMouseXY(event);
	var movementX = event.movementX;
	var movementY = event.movementY;
	if(event.movementX == null) {
		movementX = event.mozMovementX != null ? event.mozMovementX : event.webkitMovementX != null ? event.webkitMovementX : kha_SystemImpl.mouseX - lastMouseX;
		movementY = event.mozMovementY != null ? event.mozMovementY : event.webkitMovementY != null ? event.webkitMovementY : kha_SystemImpl.mouseY - lastMouseY;
	}
	if(kha_SystemImpl.firefox) {
		movementX = movementX * window.devicePixelRatio | 0;
		movementY = movementY * window.devicePixelRatio | 0;
	}
	kha_SystemImpl.mouse.sendMoveEvent(0,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY,movementX,movementY);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.setTouchXY = function(touch) {
	var rect = kha_SystemImpl.khanvas.getBoundingClientRect();
	var borderWidth = kha_SystemImpl.khanvas.clientLeft;
	var borderHeight = kha_SystemImpl.khanvas.clientTop;
	kha_SystemImpl.touchX = (touch.clientX - rect.left - borderWidth) * kha_SystemImpl.khanvas.width / (rect.width - 2 * borderWidth) | 0;
	kha_SystemImpl.touchY = (touch.clientY - rect.top - borderHeight) * kha_SystemImpl.khanvas.height / (rect.height - 2 * borderHeight) | 0;
};
kha_SystemImpl.touchDown = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	event.stopPropagation();
	var _g = kha_input_Surface.touchDownEventBlockBehavior;
	switch(_g._hx_index) {
	case 0:
		event.preventDefault();
		break;
	case 1:
		break;
	case 2:
		var func = _g.func;
		if(func(event)) {
			event.preventDefault();
		}
		break;
	}
	var index = 0;
	var _g = 0;
	var _g1 = event.changedTouches;
	while(_g < _g1.length) {
		var touch = _g1[_g];
		++_g;
		var id = touch.identifier;
		if(kha_SystemImpl.ios) {
			id = kha_SystemImpl.iosTouchs.indexOf(-1);
			if(id == -1) {
				id = kha_SystemImpl.iosTouchs.length;
			}
			kha_SystemImpl.iosTouchs[id] = touch.identifier;
		}
		kha_SystemImpl.setTouchXY(touch);
		kha_SystemImpl.mouse.sendDownEvent(0,0,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
		kha_SystemImpl.surface.sendTouchStartEvent(id,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
		if(index == 0) {
			kha_SystemImpl.lastFirstTouchX = kha_SystemImpl.touchX;
			kha_SystemImpl.lastFirstTouchY = kha_SystemImpl.touchY;
		}
		++index;
	}
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.touchUp = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	var _g = 0;
	var _g1 = event.changedTouches;
	while(_g < _g1.length) {
		var touch = _g1[_g];
		++_g;
		var id = touch.identifier;
		if(kha_SystemImpl.ios) {
			id = kha_SystemImpl.iosTouchs.indexOf(id);
			kha_SystemImpl.iosTouchs[id] = -1;
		}
		kha_SystemImpl.setTouchXY(touch);
		kha_SystemImpl.mouse.sendUpEvent(0,0,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
		kha_SystemImpl.surface.sendTouchEndEvent(id,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
	}
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.touchMove = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	var index = 0;
	var _g = 0;
	var _g1 = event.changedTouches;
	while(_g < _g1.length) {
		var touch = _g1[_g];
		++_g;
		kha_SystemImpl.setTouchXY(touch);
		if(index == 0) {
			var movementX = kha_SystemImpl.touchX - kha_SystemImpl.lastFirstTouchX;
			var movementY = kha_SystemImpl.touchY - kha_SystemImpl.lastFirstTouchY;
			kha_SystemImpl.lastFirstTouchX = kha_SystemImpl.touchX;
			kha_SystemImpl.lastFirstTouchY = kha_SystemImpl.touchY;
			kha_SystemImpl.mouse.sendMoveEvent(0,kha_SystemImpl.touchX,kha_SystemImpl.touchY,movementX,movementY);
		}
		var id = touch.identifier;
		if(kha_SystemImpl.ios) {
			id = kha_SystemImpl.iosTouchs.indexOf(id);
		}
		kha_SystemImpl.surface.sendMoveEvent(id,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
		++index;
	}
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.touchCancel = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	var _g = 0;
	var _g1 = event.changedTouches;
	while(_g < _g1.length) {
		var touch = _g1[_g];
		++_g;
		var id = touch.identifier;
		if(kha_SystemImpl.ios) {
			id = kha_SystemImpl.iosTouchs.indexOf(id);
		}
		kha_SystemImpl.setTouchXY(touch);
		kha_SystemImpl.mouse.sendUpEvent(0,0,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
		kha_SystemImpl.surface.sendTouchEndEvent(id,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
	}
	kha_SystemImpl.iosTouchs = [];
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.onBlur = function() {
	kha_System.background();
};
kha_SystemImpl.onFocus = function() {
	kha_System.foreground();
};
kha_SystemImpl.keycodeToChar = function(key,keycode,shift) {
	if(key != null) {
		if(key.length == 1) {
			return key;
		}
		switch(key) {
		case "Add":
			return "+";
		case "Divide":
			return "/";
		case "Multiply":
			return "*";
		case "Subtract":
			return "-";
		}
	}
	switch(keycode) {
	case 48:
		if(shift) {
			return "=";
		} else {
			return "0";
		}
		break;
	case 49:
		if(shift) {
			return "!";
		} else {
			return "1";
		}
		break;
	case 50:
		if(shift) {
			return "\"";
		} else {
			return "2";
		}
		break;
	case 51:
		if(shift) {
			return "§";
		} else {
			return "3";
		}
		break;
	case 52:
		if(shift) {
			return "$";
		} else {
			return "4";
		}
		break;
	case 53:
		if(shift) {
			return "%";
		} else {
			return "5";
		}
		break;
	case 54:
		if(shift) {
			return "&";
		} else {
			return "6";
		}
		break;
	case 55:
		if(shift) {
			return "/";
		} else {
			return "7";
		}
		break;
	case 56:
		if(shift) {
			return "(";
		} else {
			return "8";
		}
		break;
	case 57:
		if(shift) {
			return ")";
		} else {
			return "9";
		}
		break;
	case 106:
		return "*";
	case 107:
		return "+";
	case 109:
		return "-";
	case 111:
		return "/";
	case 187:
		if(shift) {
			return "*";
		} else {
			return "+";
		}
		break;
	case 188:
		if(shift) {
			return ";";
		} else {
			return ",";
		}
		break;
	case 189:
		if(shift) {
			return "_";
		} else {
			return "-";
		}
		break;
	case 190:
		if(shift) {
			return ":";
		} else {
			return ".";
		}
		break;
	case 191:
		if(shift) {
			return "'";
		} else {
			return "#";
		}
		break;
	case 212:
		if(shift) {
			return "`";
		} else {
			return "´";
		}
		break;
	case 219:
		if(shift) {
			return "?";
		} else {
			return "ß";
		}
		break;
	case 226:
		if(shift) {
			return ">";
		} else {
			return "<";
		}
		break;
	}
	if(keycode >= 96 && keycode <= 105) {
		return String.fromCodePoint((-48 + keycode));
	}
	if(keycode >= 65 && keycode <= 90) {
		if(shift) {
			return String.fromCodePoint(keycode);
		} else {
			return String.fromCodePoint((keycode - 65 + 97));
		}
	}
	return String.fromCodePoint(keycode);
};
kha_SystemImpl.keyDown = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	kha_SystemImpl.preventDefaultKeyBehavior(event);
	event.stopPropagation();
	if(event.repeat) {
		event.preventDefault();
		return;
	}
	var keyCode = kha_SystemImpl.fixedKeyCode(event);
	kha_SystemImpl.keyboard.sendDownEvent(keyCode);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.fixedKeyCode = function(event) {
	switch(event.keyCode) {
	case 91:case 93:
		return 224;
	case 186:
		return 59;
	case 187:
		return 61;
	case 189:
		return 173;
	default:
		return event.keyCode;
	}
};
kha_SystemImpl.preventDefaultKeyBehavior = function(event) {
	var _g = kha_input_Keyboard.keyBehavior;
	switch(_g._hx_index) {
	case 0:
		kha_SystemImpl.defaultKeyBlock(event);
		break;
	case 1:
		event.preventDefault();
		break;
	case 2:
		break;
	case 3:
		var func = _g.func;
		if(func(event.keyCode)) {
			event.preventDefault();
		}
		break;
	}
};
kha_SystemImpl.defaultKeyBlock = function(e) {
	if(e.ctrlKey || e.metaKey) {
		if(e.keyCode == 67 || e.keyCode == 88 || e.keyCode == 86) {
			return;
		}
		if(e.metaKey && e.keyCode == 81) {
			return;
		}
		e.preventDefault();
		return;
	}
	if(e.keyCode >= 112 && e.keyCode <= 123) {
		return;
	}
	if(e.key == null || e.key.length == 1) {
		return;
	}
	e.preventDefault();
};
kha_SystemImpl.keyUp = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	kha_SystemImpl.preventDefaultKeyBehavior(event);
	event.stopPropagation();
	var keyCode = kha_SystemImpl.fixedKeyCode(event);
	kha_SystemImpl.keyboard.sendUpEvent(keyCode);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.keyPress = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	if(event.which == 0) {
		return;
	}
	kha_SystemImpl.preventDefaultKeyBehavior(event);
	event.stopPropagation();
	var code = event.which;
	kha_SystemImpl.keyboard.sendPressEvent(String.fromCodePoint(code));
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.canSwitchFullscreen = function() {
	return 'fullscreenElement ' in document ||
		'mozFullScreenElement' in document ||
		'webkitFullscreenElement' in document ||
		'msFullscreenElement' in document
		;
};
kha_SystemImpl.notifyOfFullscreenChange = function(func,error) {
	window.document.addEventListener("fullscreenchange",func,false);
	window.document.addEventListener("mozfullscreenchange",func,false);
	window.document.addEventListener("webkitfullscreenchange",func,false);
	window.document.addEventListener("MSFullscreenChange",func,false);
	window.document.addEventListener("fullscreenerror",error,false);
	window.document.addEventListener("mozfullscreenerror",error,false);
	window.document.addEventListener("webkitfullscreenerror",error,false);
	window.document.addEventListener("MSFullscreenError",error,false);
};
kha_SystemImpl.removeFromFullscreenChange = function(func,error) {
	window.document.removeEventListener("fullscreenchange",func,false);
	window.document.removeEventListener("mozfullscreenchange",func,false);
	window.document.removeEventListener("webkitfullscreenchange",func,false);
	window.document.removeEventListener("MSFullscreenChange",func,false);
	window.document.removeEventListener("fullscreenerror",error,false);
	window.document.removeEventListener("mozfullscreenerror",error,false);
	window.document.removeEventListener("webkitfullscreenerror",error,false);
	window.document.removeEventListener("MSFullscreenError",error,false);
};
kha_SystemImpl.setKeepScreenOn = function(on) {
};
kha_SystemImpl.loadUrl = function(url) {
	window.open(url,"_blank");
};
kha_SystemImpl.getGamepadId = function(index) {
	var sysGamepads = kha_SystemImpl.getGamepads();
	if(sysGamepads != null && sysGamepads[index]) {
		return sysGamepads[index].id;
	}
	return "unknown";
};
kha_SystemImpl.getGamepadVendor = function(index) {
	return "unknown";
};
kha_SystemImpl.setGamepadRumble = function(index,leftAmount,rightAmount) {
};
kha_SystemImpl.getGamepads = function() {
	if(kha_SystemImpl.chrome && kha_vr_VrInterface.instance != null && kha_vr_VrInterface.instance.IsVrEnabled()) {
		return null;
	}
	if(navigator.getGamepads) {
		return $global.navigator.getGamepads();
	} else {
		return null;
	}
};
kha_SystemImpl.getPen = function(num) {
	return null;
};
kha_SystemImpl.safeZone = function() {
	return 1.0;
};
kha_SystemImpl.login = function() {
};
kha_SystemImpl.automaticSafeZone = function() {
	return true;
};
kha_SystemImpl.setSafeZone = function(value) {
};
kha_SystemImpl.unlockAchievement = function(id) {
};
kha_SystemImpl.waitingForLogin = function() {
	return false;
};
kha_SystemImpl.disallowUserChange = function() {
};
kha_SystemImpl.allowUserChange = function() {
};
var kha_Video = function() {
};
$hxClasses["kha.Video"] = kha_Video;
kha_Video.__name__ = true;
kha_Video.__interfaces__ = [kha_Resource];
kha_Video.prototype = {
	width: function() {
		return 100;
	}
	,height: function() {
		return 100;
	}
	,play: function(loop) {
		if(loop == null) {
			loop = false;
		}
	}
	,update: function(dt) {
	}
	,pause: function() {
	}
	,stop: function() {
	}
	,getLength: function() {
		return 0;
	}
	,getCurrentPos: function() {
		return 0;
	}
	,get_position: function() {
		return 0;
	}
	,set_position: function(value) {
		return 0;
	}
	,getVolume: function() {
		return 1;
	}
	,setVolume: function(volume) {
	}
	,isFinished: function() {
		return this.getCurrentPos() >= this.getLength();
	}
	,unload: function() {
	}
	,__class__: kha_Video
};
var kha_WebGLImage = function(width,height,format,renderTarget,depthStencilFormat,samples) {
	this.pixels = null;
	this.MSAAFrameBuffer = null;
	this.depthTexture = null;
	this.texture = null;
	this.renderBuffer = null;
	this.frameBuffer = null;
	this.myWidth = width;
	this.myHeight = height;
	this.myFormat = format;
	this.renderTarget = renderTarget;
	this.samples = samples;
	this.image = null;
	this.video = null;
	this.depthStencilFormat = depthStencilFormat;
	kha_WebGLImage.init();
	if(renderTarget) {
		this.createTexture();
	}
};
$hxClasses["kha.WebGLImage"] = kha_WebGLImage;
kha_WebGLImage.__name__ = true;
kha_WebGLImage.init = function() {
	if(kha_WebGLImage.context == null) {
		kha_WebGLImage.canvas = window.document.createElement("canvas");
		if(kha_WebGLImage.canvas != null) {
			kha_WebGLImage.context = kha_WebGLImage.canvas.getContext("2d");
			kha_WebGLImage.canvas.width = 4096;
			kha_WebGLImage.canvas.height = 4096;
			kha_WebGLImage.context.globalCompositeOperation = "copy";
		}
	}
};
kha_WebGLImage.upperPowerOfTwo = function(v) {
	--v;
	v |= v >>> 1;
	v |= v >>> 2;
	v |= v >>> 4;
	v |= v >>> 8;
	v |= v >>> 16;
	return ++v;
};
kha_WebGLImage.formatByteSize = function(format) {
	switch(format) {
	case 0:
		return 4;
	case 1:
		return 1;
	case 2:
		return 16;
	case 3:
		return 2;
	case 4:
		return 8;
	case 5:
		return 4;
	case 6:
		return 2;
	default:
		return 4;
	}
};
kha_WebGLImage.__super__ = kha_Image;
kha_WebGLImage.prototype = $extend(kha_Image.prototype,{
	image: null
	,video: null
	,data: null
	,myWidth: null
	,myHeight: null
	,myFormat: null
	,renderTarget: null
	,samples: null
	,frameBuffer: null
	,renderBuffer: null
	,texture: null
	,depthTexture: null
	,MSAAFrameBuffer: null
	,MSAAColorBuffer: null
	,MSAADepthBuffer: null
	,graphics1: null
	,graphics2: null
	,graphics4: null
	,depthStencilFormat: null
	,get_g1: function() {
		if(this.graphics1 == null) {
			this.graphics1 = new kha_graphics2_Graphics1(this);
		}
		return this.graphics1;
	}
	,get_g2: function() {
		if(this.graphics2 == null) {
			this.graphics2 = new kha_js_graphics4_Graphics2(this);
		}
		return this.graphics2;
	}
	,get_g4: function() {
		if(this.graphics4 == null) {
			this.graphics4 = new kha_js_graphics4_Graphics(this);
		}
		return this.graphics4;
	}
	,get_width: function() {
		return this.myWidth;
	}
	,get_height: function() {
		return this.myHeight;
	}
	,get_format: function() {
		return this.myFormat;
	}
	,get_realWidth: function() {
		return this.myWidth;
	}
	,get_realHeight: function() {
		return this.myHeight;
	}
	,get_stride: function() {
		return kha_WebGLImage.formatByteSize(this.myFormat) * this.get_width();
	}
	,isOpaque: function(x,y) {
		if(this.data == null) {
			if(kha_WebGLImage.context == null) {
				return true;
			} else {
				this.createImageData();
			}
		}
		return this.data.data[y * (this.image.width | 0) * 4 + x * 4 + 3] != 0;
	}
	,at: function(x,y) {
		if(this.data == null) {
			if(kha_WebGLImage.context == null) {
				return -16777216;
			} else {
				this.createImageData();
			}
		}
		var r = this.data.data[y * this.get_width() * 4 + x * 4];
		var g = this.data.data[y * this.get_width() * 4 + x * 4 + 1];
		var b = this.data.data[y * this.get_width() * 4 + x * 4 + 2];
		var a = this.data.data[y * this.get_width() * 4 + x * 4 + 3];
		return kha_Color._new(a << 24 | r << 16 | g << 8 | b);
	}
	,createImageData: function() {
		if(((this.image) instanceof Uint8Array)) {
			this.data = new ImageData(new Uint8ClampedArray(this.image.buffer),this.get_width(),this.get_height());
		} else {
			if(this.get_width() > kha_WebGLImage.canvas.width || this.get_height() > kha_WebGLImage.canvas.height) {
				var cw = kha_WebGLImage.canvas.width;
				var ch = kha_WebGLImage.canvas.height;
				while(this.get_width() > cw || this.get_height() > ch) {
					cw *= 2;
					ch *= 2;
				}
				kha_WebGLImage.canvas.width = cw;
				kha_WebGLImage.canvas.height = ch;
			}
			kha_WebGLImage.context.strokeStyle = "rgba(0,0,0,0)";
			kha_WebGLImage.context.fillStyle = "rgba(0,0,0,0)";
			kha_WebGLImage.context.fillRect(0,0,this.image.width,this.image.height);
			kha_WebGLImage.context.drawImage(this.image,0,0,this.image.width,this.image.height,0,0,this.image.width,this.image.height);
			this.data = kha_WebGLImage.context.getImageData(0,0,this.image.width,this.image.height);
		}
	}
	,createTexture: function() {
		if(kha_SystemImpl.gl == null) {
			return;
		}
		this.texture = kha_SystemImpl.gl.createTexture();
		kha_SystemImpl.gl.bindTexture(3553,this.texture);
		kha_SystemImpl.gl.texParameteri(3553,10240,9729);
		kha_SystemImpl.gl.texParameteri(3553,10241,9729);
		kha_SystemImpl.gl.texParameteri(3553,10242,33071);
		kha_SystemImpl.gl.texParameteri(3553,10243,33071);
		if(this.renderTarget) {
			this.frameBuffer = kha_SystemImpl.gl.createFramebuffer();
			kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
			switch(this.myFormat) {
			case 0:
				kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_realWidth(),this.get_realHeight(),0,6408,5121,null);
				break;
			case 2:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.get_realWidth(),this.get_realHeight(),0,6408,5126,null);
				break;
			case 3:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.get_realWidth(),this.get_realHeight(),0,6402,5123,null);
				break;
			case 4:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.get_realWidth(),this.get_realHeight(),0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				break;
			case 5:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.get_realWidth(),this.get_realHeight(),0,kha_SystemImpl.gl2 ? 6403 : 6406,5126,null);
				break;
			case 6:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.get_realWidth(),this.get_realHeight(),0,kha_SystemImpl.gl2 ? 6403 : 6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				break;
			default:
				kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_realWidth(),this.get_realHeight(),0,6408,5121,null);
			}
			if(this.myFormat == 3) {
				kha_SystemImpl.gl.texParameteri(3553,10240,9728);
				kha_SystemImpl.gl.texParameteri(3553,10241,9728);
				kha_SystemImpl.gl.framebufferTexture2D(36160,36096,3553,this.texture,0);
				if(!kha_SystemImpl.gl2) {
					var colortex = kha_SystemImpl.gl.createTexture();
					kha_SystemImpl.gl.bindTexture(3553,colortex);
					kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_realWidth(),this.get_realHeight(),0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,3553,colortex,0);
					kha_SystemImpl.gl.bindTexture(3553,this.texture);
				}
			} else {
				if(this.samples > 1 && kha_SystemImpl.gl2) {
					this.MSAAFrameBuffer = kha_SystemImpl.gl.createFramebuffer();
					this.MSAAColorBuffer = kha_SystemImpl.gl.createRenderbuffer();
					kha_SystemImpl.gl.bindRenderbuffer(36161,this.MSAAColorBuffer);
					var MSAAFormat;
					switch(this.myFormat) {
					case 0:
						MSAAFormat = kha_SystemImpl.gl.RGBA8;
						break;
					case 2:
						MSAAFormat = kha_SystemImpl.gl.RGBA32F;
						break;
					case 4:
						MSAAFormat = kha_SystemImpl.gl.RGBA16F;
						break;
					case 5:
						MSAAFormat = 33326;
						break;
					case 6:
						MSAAFormat = 33325;
						break;
					default:
						MSAAFormat = kha_SystemImpl.gl.RGBA8;
					}
					kha_SystemImpl.gl.renderbufferStorageMultisample(36161,this.samples,MSAAFormat,this.get_realWidth(),this.get_realHeight());
					kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
					kha_SystemImpl.gl.framebufferRenderbuffer(36160,36064,36161,this.MSAAColorBuffer);
					kha_SystemImpl.gl.bindFramebuffer(36160,this.MSAAFrameBuffer);
				}
				kha_SystemImpl.gl.framebufferTexture2D(36160,36064,3553,this.texture,0);
				kha_SystemImpl.gl.bindFramebuffer(36160,null);
			}
			this.initDepthStencilBuffer(this.depthStencilFormat);
			var e = kha_SystemImpl.gl.checkFramebufferStatus(36160);
			if(e != 36053) {
				haxe_Log.trace("checkframebufferStatus error " + e,{ fileName : "kha/WebGLImage.hx", lineNumber : 270, className : "kha.WebGLImage", methodName : "createTexture"});
			}
			kha_SystemImpl.gl.bindRenderbuffer(36161,null);
			kha_SystemImpl.gl.bindFramebuffer(36160,null);
		} else if(this.video != null) {
			kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.video);
		} else {
			switch(this.myFormat) {
			case 0:
				if(((this.image) instanceof Uint8Array)) {
					kha_SystemImpl.gl.texImage2D(3553,0,6408,this.myWidth,this.myHeight,0,6408,5121,this.image);
				} else {
					kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.image);
				}
				break;
			case 1:
				kha_SystemImpl.gl.texImage2D(3553,0,6409,this.myWidth,this.myHeight,0,6409,5121,this.image);
				break;
			case 2:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,this.image);
				break;
			case 4:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,this.image);
				break;
			case 5:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,kha_SystemImpl.gl2 ? 6403 : 6406,5126,this.image);
				break;
			case 6:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,kha_SystemImpl.gl2 ? 6403 : 6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,this.image);
				break;
			default:
				kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.image);
			}
		}
		kha_SystemImpl.gl.bindTexture(3553,null);
	}
	,initDepthStencilBuffer: function(depthStencilFormat) {
		switch(depthStencilFormat) {
		case 0:
			break;
		case 1:case 5:
			if(kha_SystemImpl.depthTexture == null) {
				this.renderBuffer = kha_SystemImpl.gl.createRenderbuffer();
				kha_SystemImpl.gl.bindRenderbuffer(36161,this.renderBuffer);
				kha_SystemImpl.gl.renderbufferStorage(36161,33189,this.get_realWidth(),this.get_realHeight());
				kha_SystemImpl.gl.framebufferRenderbuffer(36160,36096,36161,this.renderBuffer);
			} else {
				this.depthTexture = kha_SystemImpl.gl.createTexture();
				kha_SystemImpl.gl.bindTexture(3553,this.depthTexture);
				if(depthStencilFormat == 1) {
					kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33190 : 6402,this.get_realWidth(),this.get_realHeight(),0,6402,5125,null);
				} else {
					kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.get_realWidth(),this.get_realHeight(),0,6402,5123,null);
				}
				kha_SystemImpl.gl.texParameteri(3553,10240,9728);
				kha_SystemImpl.gl.texParameteri(3553,10241,9728);
				kha_SystemImpl.gl.texParameteri(3553,10242,33071);
				kha_SystemImpl.gl.texParameteri(3553,10243,33071);
				kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
				if(this.samples > 1 && kha_SystemImpl.gl2) {
					this.MSAADepthBuffer = kha_SystemImpl.gl.createRenderbuffer();
					kha_SystemImpl.gl.bindRenderbuffer(36161,this.MSAADepthBuffer);
					if(depthStencilFormat == 1) {
						kha_SystemImpl.gl.renderbufferStorageMultisample(36161,this.samples,33190,this.get_realWidth(),this.get_realHeight());
					} else {
						kha_SystemImpl.gl.renderbufferStorageMultisample(36161,this.samples,33189,this.get_realWidth(),this.get_realHeight());
					}
					kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
					kha_SystemImpl.gl.framebufferRenderbuffer(36160,36096,36161,this.MSAADepthBuffer);
					kha_SystemImpl.gl.bindFramebuffer(36160,this.MSAAFrameBuffer);
				}
				kha_SystemImpl.gl.framebufferTexture2D(36160,36096,3553,this.depthTexture,0);
				kha_SystemImpl.gl.bindFramebuffer(36160,null);
			}
			break;
		case 2:case 3:case 4:
			if(kha_SystemImpl.depthTexture == null) {
				this.renderBuffer = kha_SystemImpl.gl.createRenderbuffer();
				kha_SystemImpl.gl.bindRenderbuffer(36161,this.renderBuffer);
				kha_SystemImpl.gl.renderbufferStorage(36161,34041,this.get_realWidth(),this.get_realHeight());
				kha_SystemImpl.gl.framebufferRenderbuffer(36160,33306,36161,this.renderBuffer);
			} else {
				this.depthTexture = kha_SystemImpl.gl.createTexture();
				kha_SystemImpl.gl.bindTexture(3553,this.depthTexture);
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 35056 : 34041,this.get_realWidth(),this.get_realHeight(),0,34041,kha_SystemImpl.depthTexture.UNSIGNED_INT_24_8_WEBGL,null);
				kha_SystemImpl.gl.texParameteri(3553,10240,9728);
				kha_SystemImpl.gl.texParameteri(3553,10241,9728);
				kha_SystemImpl.gl.texParameteri(3553,10242,33071);
				kha_SystemImpl.gl.texParameteri(3553,10243,33071);
				kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
				if(this.samples > 1 && kha_SystemImpl.gl2) {
					this.MSAADepthBuffer = kha_SystemImpl.gl.createRenderbuffer();
					kha_SystemImpl.gl.bindRenderbuffer(36161,this.MSAADepthBuffer);
					kha_SystemImpl.gl.renderbufferStorageMultisample(36161,this.samples,35056,this.get_realWidth(),this.get_realHeight());
					kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
					kha_SystemImpl.gl.framebufferRenderbuffer(36160,33306,36161,this.MSAADepthBuffer);
					kha_SystemImpl.gl.bindFramebuffer(36160,this.MSAAFrameBuffer);
				}
				kha_SystemImpl.gl.framebufferTexture2D(36160,33306,3553,this.depthTexture,0);
			}
			break;
		}
	}
	,set: function(stage) {
		kha_SystemImpl.gl.activeTexture(33984 + stage);
		kha_SystemImpl.gl.bindTexture(3553,this.texture);
		if(this.video != null) {
			kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.video);
		}
	}
	,setDepth: function(stage) {
		kha_SystemImpl.gl.activeTexture(33984 + stage);
		kha_SystemImpl.gl.bindTexture(3553,this.depthTexture);
	}
	,setDepthStencilFrom: function(image) {
		this.depthTexture = (js_Boot.__cast(image , kha_WebGLImage)).depthTexture;
		kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
		kha_SystemImpl.gl.framebufferTexture2D(36160,36096,3553,this.depthTexture,0);
		if(this.samples > 1 && kha_SystemImpl.gl2) {
			this.MSAADepthBuffer = (js_Boot.__cast(image , kha_WebGLImage)).MSAADepthBuffer;
			kha_SystemImpl.gl.framebufferRenderbuffer(36160,36096,36161,this.MSAADepthBuffer);
		}
	}
	,bytesToArray: function(bytes) {
		switch(this.myFormat) {
		case 0:case 1:
			return new Uint8Array(bytes.b.bufferValue);
		case 2:case 4:case 5:case 6:
			return new Float32Array(bytes.b.bufferValue);
		default:
			return new Uint8Array(bytes.b.bufferValue);
		}
	}
	,bytes: null
	,lock: function(level) {
		if(level == null) {
			level = 0;
		}
		this.bytes = new haxe_io_Bytes(new ArrayBuffer(kha_WebGLImage.formatByteSize(this.myFormat) * this.get_width() * this.get_height()));
		return this.bytes;
	}
	,unlock: function() {
		if(kha_SystemImpl.gl != null) {
			this.texture = kha_SystemImpl.gl.createTexture();
			kha_SystemImpl.gl.bindTexture(3553,this.texture);
			kha_SystemImpl.gl.texParameteri(3553,10240,9729);
			kha_SystemImpl.gl.texParameteri(3553,10241,9729);
			kha_SystemImpl.gl.texParameteri(3553,10242,33071);
			kha_SystemImpl.gl.texParameteri(3553,10243,33071);
			switch(this.myFormat) {
			case 0:
				kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_width(),this.get_height(),0,6408,5121,this.bytesToArray(this.bytes));
				break;
			case 1:
				kha_SystemImpl.gl.texImage2D(3553,0,6409,this.get_width(),this.get_height(),0,6409,5121,this.bytesToArray(this.bytes));
				if(kha_SystemImpl.ie && kha_SystemImpl.gl.getError() == 1282) {
					var rgbaBytes = new haxe_io_Bytes(new ArrayBuffer(this.get_width() * this.get_height() * 4));
					var _g = 0;
					var _g1 = this.get_height();
					while(_g < _g1) {
						var y = _g++;
						var _g2 = 0;
						var _g3 = this.get_width();
						while(_g2 < _g3) {
							var x = _g2++;
							var _this = this.bytes;
							var pos = y * this.get_width() + x;
							var value = _this.b[pos];
							var pos1 = y * this.get_width() * 4 + x * 4;
							rgbaBytes.b[pos1] = value;
							var pos2 = y * this.get_width() * 4 + x * 4 + 1;
							rgbaBytes.b[pos2] = value;
							var pos3 = y * this.get_width() * 4 + x * 4 + 2;
							rgbaBytes.b[pos3] = value;
							var pos4 = y * this.get_width() * 4 + x * 4 + 3;
							rgbaBytes.b[pos4] = 255;
						}
					}
					kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_width(),this.get_height(),0,6408,5121,this.bytesToArray(rgbaBytes));
				}
				break;
			case 2:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.get_width(),this.get_height(),0,6408,5126,this.bytesToArray(this.bytes));
				break;
			case 4:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.get_width(),this.get_height(),0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,this.bytesToArray(this.bytes));
				break;
			case 5:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.get_width(),this.get_height(),0,kha_SystemImpl.gl2 ? 6403 : 6406,5126,this.bytesToArray(this.bytes));
				break;
			case 6:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.get_width(),this.get_height(),0,kha_SystemImpl.gl2 ? 6403 : 6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,this.bytesToArray(this.bytes));
				break;
			default:
				kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_width(),this.get_height(),0,6408,5121,this.bytesToArray(this.bytes));
			}
			kha_SystemImpl.gl.bindTexture(3553,null);
			this.bytes = null;
		}
	}
	,pixels: null
	,getPixels: function() {
		if(this.frameBuffer == null) {
			return null;
		}
		if(this.pixels == null) {
			switch(this.myFormat) {
			case 0:case 1:
				this.pixels = new Uint8Array(kha_WebGLImage.formatByteSize(this.myFormat) * this.get_width() * this.get_height());
				break;
			case 2:case 5:
				this.pixels = new Float32Array((kha_WebGLImage.formatByteSize(this.myFormat) / 4 | 0) * this.get_width() * this.get_height());
				break;
			case 4:case 6:
				this.pixels = new Uint16Array((kha_WebGLImage.formatByteSize(this.myFormat) / 2 | 0) * this.get_width() * this.get_height());
				break;
			default:
				this.pixels = new Uint8Array(kha_WebGLImage.formatByteSize(this.myFormat) * this.get_width() * this.get_height());
			}
		}
		kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
		switch(this.myFormat) {
		case 0:
			kha_SystemImpl.gl.readPixels(0,0,this.myWidth,this.myHeight,6408,5121,this.pixels);
			break;
		case 1:
			kha_SystemImpl.gl.readPixels(0,0,this.myWidth,this.myHeight,kha_SystemImpl.gl2 ? 6403 : 6406,5121,this.pixels);
			break;
		case 2:
			kha_SystemImpl.gl.readPixels(0,0,this.myWidth,this.myHeight,6408,5126,this.pixels);
			break;
		case 4:
			kha_SystemImpl.gl.readPixels(0,0,this.myWidth,this.myHeight,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,this.pixels);
			break;
		case 5:
			kha_SystemImpl.gl.readPixels(0,0,this.myWidth,this.myHeight,kha_SystemImpl.gl2 ? 6403 : 6406,5126,this.pixels);
			break;
		case 6:
			kha_SystemImpl.gl.readPixels(0,0,this.myWidth,this.myHeight,kha_SystemImpl.gl2 ? 6403 : 6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,this.pixels);
			break;
		default:
			kha_SystemImpl.gl.readPixels(0,0,this.myWidth,this.myHeight,6408,5121,this.pixels);
		}
		return haxe_io_Bytes.ofData(this.pixels.buffer);
	}
	,unload: function() {
		if(this.texture != null) {
			kha_SystemImpl.gl.deleteTexture(this.texture);
		}
		if(this.depthTexture != null) {
			kha_SystemImpl.gl.deleteTexture(this.depthTexture);
		}
		if(this.frameBuffer != null) {
			kha_SystemImpl.gl.deleteFramebuffer(this.frameBuffer);
		}
		if(this.renderBuffer != null) {
			kha_SystemImpl.gl.deleteRenderbuffer(this.renderBuffer);
		}
		if(this.MSAAFrameBuffer != null) {
			kha_SystemImpl.gl.deleteFramebuffer(this.MSAAFrameBuffer);
		}
		if(this.MSAAColorBuffer != null) {
			kha_SystemImpl.gl.deleteRenderbuffer(this.MSAAColorBuffer);
		}
		if(this.MSAADepthBuffer != null) {
			kha_SystemImpl.gl.deleteRenderbuffer(this.MSAADepthBuffer);
		}
	}
	,generateMipmaps: function(levels) {
		kha_SystemImpl.gl.bindTexture(3553,this.texture);
		kha_SystemImpl.gl.generateMipmap(3553);
	}
	,setMipmaps: function(mipmaps) {
		kha_SystemImpl.gl.bindTexture(3553,this.texture);
		if(this.myFormat == 2) {
			var _g = 0;
			var _g1 = mipmaps.length;
			while(_g < _g1) {
				var i = _g++;
				kha_SystemImpl.gl.texImage2D(3553,i + 1,kha_SystemImpl.gl2 ? 34836 : 6408,mipmaps[i].get_width(),mipmaps[i].get_height(),0,6408,5126,(js_Boot.__cast(mipmaps[i] , kha_WebGLImage)).image);
			}
		} else if(this.myFormat == 4) {
			var _g = 0;
			var _g1 = mipmaps.length;
			while(_g < _g1) {
				var i = _g++;
				kha_SystemImpl.gl.texImage2D(3553,i + 1,kha_SystemImpl.gl2 ? 34842 : 6408,mipmaps[i].get_width(),mipmaps[i].get_height(),0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,(js_Boot.__cast(mipmaps[i] , kha_WebGLImage)).image);
			}
		} else {
			var _g = 0;
			var _g1 = mipmaps.length;
			while(_g < _g1) {
				var i = _g++;
				kha_SystemImpl.gl.texImage2D(3553,i + 1,6408,6408,5121,(js_Boot.__cast(mipmaps[i] , kha_WebGLImage)).image);
			}
		}
	}
	,__class__: kha_WebGLImage
});
var kha_Window = function(num,defaultWidth,defaultHeight,canvas) {
	var _gthis = this;
	this.num = num;
	this.canvas = canvas;
	this.defaultWidth = defaultWidth;
	this.defaultHeight = defaultHeight;
	kha_Window.windows.push(this);
	kha_Window.resizeCallbacks[num] = [];
	kha_Window.windows.push(this);
	var observer = new MutationObserver(function(mutations,observer) {
		var isResize = false;
		var _g = 0;
		while(_g < mutations.length) {
			var mutation = mutations[_g];
			++_g;
			if(mutation.attributeName == "width" || mutation.attributeName == "height") {
				isResize = true;
				break;
			}
		}
		if(isResize) {
			_gthis.resize(canvas.width,canvas.height);
		}
	});
	observer.observe(canvas,{ attributes : true});
};
$hxClasses["kha.Window"] = kha_Window;
kha_Window.__name__ = true;
kha_Window.create = function(win,frame) {
	return null;
};
kha_Window.destroy = function($window) {
};
kha_Window.get = function(index) {
	return kha_Window.windows[index];
};
kha_Window.get_all = function() {
	return kha_Window.windows;
};
kha_Window.prototype = {
	num: null
	,canvas: null
	,defaultWidth: null
	,defaultHeight: null
	,resize: function(width,height) {
		var _g = 0;
		var _g1 = kha_Window.resizeCallbacks[this.num];
		while(_g < _g1.length) {
			var callback = _g1[_g];
			++_g;
			callback(width,height);
		}
	}
	,move: function(x,y) {
	}
	,changeWindowFeatures: function(features) {
	}
	,changeFramebuffer: function(frame) {
	}
	,get_x: function() {
		return 0;
	}
	,set_x: function(value) {
		return 0;
	}
	,get_y: function() {
		return 0;
	}
	,set_y: function(value) {
		return 0;
	}
	,get_width: function() {
		if(this.canvas.width == 0) {
			return this.defaultWidth;
		} else {
			return this.canvas.width;
		}
	}
	,set_width: function(value) {
		return 800;
	}
	,get_height: function() {
		if(this.canvas.height == 0) {
			return this.defaultHeight;
		} else {
			return this.canvas.height;
		}
	}
	,set_height: function(value) {
		return 600;
	}
	,get_mode: function() {
		if(this.isFullscreen()) {
			return 1;
		} else {
			return 0;
		}
	}
	,set_mode: function(mode) {
		if(mode == 1 || mode == 2) {
			if(!this.isFullscreen()) {
				this.requestFullscreen();
			}
		} else if(this.isFullscreen()) {
			this.exitFullscreen();
		}
		return mode;
	}
	,isFullscreen: function() {
		return document.fullscreenElement === this.canvas ||
			document.mozFullScreenElement === this.canvas ||
			document.webkitFullscreenElement === this.canvas ||
			document.msFullscreenElement === this.canvas ;
	}
	,requestFullscreen: function() {
		if(($_=this.canvas,$bind($_,$_.requestFullscreen))) {
			var c = this.canvas;
			c.requestFullscreen({ navigationUI : "hide"});
		} else if(this.canvas.msRequestFullscreen) {
			this.canvas.msRequestFullscreen();
		} else if(this.canvas.mozRequestFullScreen) {
			this.canvas.mozRequestFullScreen();
		} else if(this.canvas.webkitRequestFullscreen) {
			this.canvas.webkitRequestFullscreen();
		}
	}
	,exitFullscreen: function() {
		if(document.exitFullscreen) {
			document.exitFullscreen();
		} else if(document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if(document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
	,get_visible: function() {
		return true;
	}
	,set_visible: function(value) {
		return true;
	}
	,get_title: function() {
		return "Kha";
	}
	,set_title: function(value) {
		return "Kha";
	}
	,notifyOnResize: function(callback) {
		kha_Window.resizeCallbacks[this.num].push(callback);
	}
	,get_vSynced: function() {
		return true;
	}
	,__class__: kha_Window
};
var kha_WindowFeatures = {};
kha_WindowFeatures._new = function(value) {
	var this1 = value;
	return this1;
};
var kha_WindowOptions = function(title,x,y,width,height,display,visible,windowFeatures,mode) {
	if(mode == null) {
		mode = 0;
	}
	if(visible == null) {
		visible = true;
	}
	if(display == null) {
		display = -1;
	}
	if(height == null) {
		height = 600;
	}
	if(width == null) {
		width = 800;
	}
	if(y == null) {
		y = -1;
	}
	if(x == null) {
		x = -1;
	}
	this.mode = 0;
	this.windowFeatures = 1 | 4 | 2;
	this.visible = true;
	this.display = -1;
	this.height = 600;
	this.width = 800;
	this.y = -1;
	this.x = -1;
	this.title = null;
	this.title = title;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.display = display;
	this.visible = visible;
	this.windowFeatures = windowFeatures == null ? 1 | 4 | 2 : windowFeatures;
	this.mode = mode;
};
$hxClasses["kha.WindowOptions"] = kha_WindowOptions;
kha_WindowOptions.__name__ = true;
kha_WindowOptions.prototype = {
	title: null
	,x: null
	,y: null
	,width: null
	,height: null
	,display: null
	,visible: null
	,windowFeatures: null
	,mode: null
	,__class__: kha_WindowOptions
};
var kha_arrays_ByteArray = {};
kha_arrays_ByteArray.get_buffer = function(this1) {
	return this1.buffer;
};
kha_arrays_ByteArray._new = function(buffer,byteOffset,byteLength) {
	var this1 = new DataView(buffer,byteOffset,byteLength);
	return this1;
};
kha_arrays_ByteArray.make = function(byteLength) {
	return kha_arrays_ByteArray._new(kha_arrays_ByteBuffer.create(byteLength));
};
kha_arrays_ByteArray.getInt8 = function(this1,byteOffset) {
	return this1.getInt8(byteOffset);
};
kha_arrays_ByteArray.getUint8 = function(this1,byteOffset) {
	return this1.getUint8(byteOffset);
};
kha_arrays_ByteArray.getInt16 = function(this1,byteOffset) {
	return this1.getInt16(byteOffset,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_ByteArray.getUint16 = function(this1,byteOffset) {
	return this1.getUint16(byteOffset,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_ByteArray.getInt32 = function(this1,byteOffset) {
	return this1.getInt32(byteOffset,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_ByteArray.getUint32 = function(this1,byteOffset) {
	return this1.getUint32(byteOffset,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_ByteArray.getFloat32 = function(this1,byteOffset) {
	return this1.getFloat32(byteOffset,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_ByteArray.getFloat64 = function(this1,byteOffset) {
	return this1.getFloat64(byteOffset,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_ByteArray.setInt8 = function(this1,byteOffset,value) {
	this1.setInt8(byteOffset,value);
};
kha_arrays_ByteArray.setUint8 = function(this1,byteOffset,value) {
	this1.setUint8(byteOffset,value);
};
kha_arrays_ByteArray.setInt16 = function(this1,byteOffset,value) {
	this1.setInt16(byteOffset,value,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_ByteArray.setUint16 = function(this1,byteOffset,value) {
	this1.setUint16(byteOffset,value,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_ByteArray.setInt32 = function(this1,byteOffset,value) {
	this1.setInt32(byteOffset,value,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_ByteArray.setUint32 = function(this1,byteOffset,value) {
	this1.setUint32(byteOffset,value,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_ByteArray.setFloat32 = function(this1,byteOffset,value) {
	this1.setFloat32(byteOffset,value,true);
};
kha_arrays_ByteArray.setFloat64 = function(this1,byteOffset,value) {
	this1.setFloat64(byteOffset,value,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_ByteArray.getInt16LE = function(this1,byteOffset) {
	return this1.getInt16(byteOffset,true);
};
kha_arrays_ByteArray.getUint16LE = function(this1,byteOffset) {
	return this1.getUint16(byteOffset,true);
};
kha_arrays_ByteArray.getInt32LE = function(this1,byteOffset) {
	return this1.getInt32(byteOffset,true);
};
kha_arrays_ByteArray.getUint32LE = function(this1,byteOffset) {
	return this1.getUint32(byteOffset,true);
};
kha_arrays_ByteArray.getFloat32LE = function(this1,byteOffset) {
	return this1.getFloat32(byteOffset,true);
};
kha_arrays_ByteArray.getFloat64LE = function(this1,byteOffset) {
	return this1.getFloat64(byteOffset,true);
};
kha_arrays_ByteArray.setInt16LE = function(this1,byteOffset,value) {
	this1.setInt16(byteOffset,value,true);
};
kha_arrays_ByteArray.setUint16LE = function(this1,byteOffset,value) {
	this1.setUint16(byteOffset,value,true);
};
kha_arrays_ByteArray.setInt32LE = function(this1,byteOffset,value) {
	this1.setInt32(byteOffset,value,true);
};
kha_arrays_ByteArray.setUint32LE = function(this1,byteOffset,value) {
	this1.setUint32(byteOffset,value,true);
};
kha_arrays_ByteArray.setFloat32LE = function(this1,byteOffset,value) {
	this1.setFloat32(byteOffset,value,true);
};
kha_arrays_ByteArray.setFloat64LE = function(this1,byteOffset,value) {
	this1.setFloat64(byteOffset,value,true);
};
kha_arrays_ByteArray.getInt16BE = function(this1,byteOffset) {
	return this1.getInt16(byteOffset);
};
kha_arrays_ByteArray.getUint16BE = function(this1,byteOffset) {
	return this1.getUint16(byteOffset);
};
kha_arrays_ByteArray.getInt32BE = function(this1,byteOffset) {
	return this1.getInt32(byteOffset);
};
kha_arrays_ByteArray.getUint32BE = function(this1,byteOffset) {
	return this1.getUint32(byteOffset);
};
kha_arrays_ByteArray.getFloat32BE = function(this1,byteOffset) {
	return this1.getFloat32(byteOffset);
};
kha_arrays_ByteArray.getFloat64BE = function(this1,byteOffset) {
	return this1.getFloat64(byteOffset);
};
kha_arrays_ByteArray.setInt16BE = function(this1,byteOffset,value) {
	this1.setInt16(byteOffset,value);
};
kha_arrays_ByteArray.setUint16BE = function(this1,byteOffset,value) {
	this1.setUint16(byteOffset,value);
};
kha_arrays_ByteArray.setInt32BE = function(this1,byteOffset,value) {
	this1.setInt32(byteOffset,value);
};
kha_arrays_ByteArray.setUint32BE = function(this1,byteOffset,value) {
	this1.setUint32(byteOffset,value);
};
kha_arrays_ByteArray.setFloat32BE = function(this1,byteOffset,value) {
	this1.setFloat32(byteOffset,value);
};
kha_arrays_ByteArray.setFloat64BE = function(this1,byteOffset,value) {
	this1.setFloat64(byteOffset,value);
};
kha_arrays_ByteArray.subarray = function(this1,start,end) {
	return kha_arrays_ByteArray._new(this1.buffer,start,end != null ? end - start : null);
};
var kha_arrays_ByteBuffer = {};
kha_arrays_ByteBuffer.create = function(length) {
	return kha_arrays_ByteBuffer._new(length);
};
kha_arrays_ByteBuffer._new = function(length) {
	var this1 = new ArrayBuffer(length);
	return this1;
};
var kha_arrays_Float32Array = {};
kha_arrays_Float32Array.get_length = function(this1) {
	return this1.byteLength >> 2;
};
kha_arrays_Float32Array._new = function(elements) {
	var this1 = kha_arrays_ByteArray.make(elements * 4);
	return this1;
};
kha_arrays_Float32Array.get = function(this1,k) {
	return this1.getFloat32(k * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_Float32Array.set = function(this1,k,v) {
	this1.setFloat32(k * 4,v,true);
	return v;
};
kha_arrays_Float32Array.subarray = function(this1,start,end) {
	var start1 = start * 4;
	var end1 = end != null ? end * 4 : end;
	return kha_arrays_ByteArray._new(this1.buffer,start1,end1 != null ? end1 - start1 : null);
};
var kha_arrays_Int32Array = {};
kha_arrays_Int32Array.get_length = function(this1) {
	return this1.byteLength >> 2;
};
kha_arrays_Int32Array._new = function(elements) {
	var this1 = kha_arrays_ByteArray.make(elements * 4);
	return this1;
};
kha_arrays_Int32Array.get = function(this1,k) {
	return this1.getInt32(k * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_Int32Array.set = function(this1,k,v) {
	this1.setInt32(k * 4,v,kha_arrays_ByteArray.LITTLE_ENDIAN);
	return this1.getInt32(k * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_Int32Array.subarray = function(this1,start,end) {
	var start1 = start * 4;
	var end1 = end != null ? end * 4 : null;
	return kha_arrays_ByteArray._new(this1.buffer,start1,end1 != null ? end1 - start1 : null);
};
var kha_arrays_Uint32Array = {};
kha_arrays_Uint32Array.get_length = function(this1) {
	return this1.byteLength >> 2;
};
kha_arrays_Uint32Array._new = function(elements) {
	var this1 = kha_arrays_ByteArray.make(elements * 4);
	return this1;
};
kha_arrays_Uint32Array.get = function(this1,k) {
	return this1.getUint32(k * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_Uint32Array.set = function(this1,k,v) {
	this1.setUint32(k * 4,v,kha_arrays_ByteArray.LITTLE_ENDIAN);
	return this1.getUint32(k * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
};
kha_arrays_Uint32Array.subarray = function(this1,start,end) {
	var start1 = start * 4;
	var end1 = end != null ? end * 4 : null;
	return kha_arrays_ByteArray._new(this1.buffer,start1,end1 != null ? end1 - start1 : null);
};
var kha_audio1_AudioChannel = function() { };
$hxClasses["kha.audio1.AudioChannel"] = kha_audio1_AudioChannel;
kha_audio1_AudioChannel.__name__ = true;
kha_audio1_AudioChannel.__isInterface__ = true;
kha_audio1_AudioChannel.prototype = {
	play: null
	,pause: null
	,stop: null
	,length: null
	,get_length: null
	,get_position: null
	,set_position: null
	,get_volume: null
	,set_volume: null
	,finished: null
	,get_finished: null
	,__class__: kha_audio1_AudioChannel
};
var kha_internal_IntBox = function(value) {
	this.value = value;
};
$hxClasses["kha.internal.IntBox"] = kha_internal_IntBox;
kha_internal_IntBox.__name__ = true;
kha_internal_IntBox.prototype = {
	value: null
	,__class__: kha_internal_IntBox
};
var kha_audio2_Audio = function() { };
$hxClasses["kha.audio2.Audio"] = kha_audio2_Audio;
kha_audio2_Audio.__name__ = true;
kha_audio2_Audio.initContext = function() {
	try {
		kha_audio2_Audio._context = new AudioContext();
		return;
	} catch( _g ) {
	}
	try {
		this._context = new webkitAudioContext();
		return;
	} catch( _g ) {
	}
};
kha_audio2_Audio._init = function() {
	kha_audio2_Audio.initContext();
	if(kha_audio2_Audio._context == null) {
		return false;
	}
	kha_audio2_Audio.samplesPerSecond = Math.round(kha_audio2_Audio._context.sampleRate);
	var bufferSize = 2048;
	kha_audio2_Audio.buffer = new kha_audio2_Buffer(bufferSize * 4,2,kha_audio2_Audio._context.sampleRate | 0);
	kha_audio2_Audio.processingNode = kha_audio2_Audio._context.createScriptProcessor(bufferSize,0,2);
	kha_audio2_Audio.processingNode.onaudioprocess = function(e) {
		var output1 = e.outputBuffer.getChannelData(0);
		var output2 = e.outputBuffer.getChannelData(1);
		if(kha_audio2_Audio.audioCallback != null) {
			kha_audio2_Audio.intBox.value = e.outputBuffer.length * 2;
			kha_audio2_Audio.audioCallback(kha_audio2_Audio.intBox,kha_audio2_Audio.buffer);
			var _g = 0;
			var _g1 = e.outputBuffer.length;
			while(_g < _g1) {
				var i = _g++;
				output1[i] = kha_audio2_Audio.buffer.data.getFloat32(kha_audio2_Audio.buffer.readLocation * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				kha_audio2_Audio.buffer.readLocation += 1;
				output2[i] = kha_audio2_Audio.buffer.data.getFloat32(kha_audio2_Audio.buffer.readLocation * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				kha_audio2_Audio.buffer.readLocation += 1;
				if(kha_audio2_Audio.buffer.readLocation >= kha_audio2_Audio.buffer.size) {
					kha_audio2_Audio.buffer.readLocation = 0;
				}
			}
		} else {
			var _g = 0;
			var _g1 = e.outputBuffer.length;
			while(_g < _g1) {
				var i = _g++;
				output1[i] = 0;
				output2[i] = 0;
			}
		}
	};
	kha_audio2_Audio.processingNode.connect(kha_audio2_Audio._context.destination);
	return true;
};
kha_audio2_Audio.wakeChannels = function() {
	kha_SystemImpl.mobileAudioPlaying = true;
	var _g = 0;
	var _g1 = kha_audio2_Audio.virtualChannels;
	while(_g < _g1.length) {
		var channel = _g1[_g];
		++_g;
		channel.wake();
	}
};
kha_audio2_Audio.stream = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	var element = window.document.createElement("audio");
	var blob = new Blob([sound.compressedData.b.bufferValue],{ type : "audio/mp4"});
	element.src = URL.createObjectURL(blob);
	element.loop = loop;
	var channel = new kha_js_AEAudioChannel(element,loop);
	if(kha_SystemImpl.mobileAudioPlaying) {
		channel.play();
		return channel;
	} else {
		var virtualChannel = new kha_audio2_VirtualStreamChannel(channel,loop);
		kha_audio2_Audio.virtualChannels.push(virtualChannel);
		return virtualChannel;
	}
};
var kha_audio2_Audio1 = function() { };
$hxClasses["kha.audio2.Audio1"] = kha_audio2_Audio1;
kha_audio2_Audio1.__name__ = true;
kha_audio2_Audio1._init = function() {
	var this1 = new Array(32);
	kha_audio2_Audio1.soundChannels = this1;
	var this1 = new Array(32);
	kha_audio2_Audio1.streamChannels = this1;
	var this1 = new Array(32);
	kha_audio2_Audio1.internalSoundChannels = this1;
	var this1 = new Array(32);
	kha_audio2_Audio1.internalStreamChannels = this1;
	kha_audio2_Audio1.sampleCache1 = kha_arrays_Float32Array._new(512);
	kha_audio2_Audio1.sampleCache2 = kha_arrays_Float32Array._new(512);
	kha_audio2_Audio1.lastAllocationCount = 0;
	kha_audio2_Audio.audioCallback = kha_audio2_Audio1.mix;
};
kha_audio2_Audio1.max = function(a,b) {
	if(a > b) {
		return a;
	} else {
		return b;
	}
};
kha_audio2_Audio1.min = function(a,b) {
	if(a < b) {
		return a;
	} else {
		return b;
	}
};
kha_audio2_Audio1.mix = function(samplesBox,buffer) {
	var samples = samplesBox.value;
	if(kha_audio2_Audio1.sampleCache1.byteLength >> 2 < samples) {
		if(kha_audio2_Audio.disableGcInteractions) {
			haxe_Log.trace("Unexpected allocation request in audio thread.",{ fileName : "kha/audio2/Audio1.hx", lineNumber : 50, className : "kha.audio2.Audio1", methodName : "mix"});
			var _g = 0;
			var _g1 = samples;
			while(_g < _g1) {
				var i = _g++;
				buffer.data.setFloat32(buffer.writeLocation * 4,0,true);
				buffer.writeLocation += 1;
				if(buffer.writeLocation >= buffer.size) {
					buffer.writeLocation = 0;
				}
			}
			kha_audio2_Audio1.lastAllocationCount = 0;
			kha_audio2_Audio.disableGcInteractions = false;
			return;
		}
		kha_audio2_Audio1.sampleCache1 = kha_arrays_Float32Array._new(samples * 2);
		kha_audio2_Audio1.sampleCache2 = kha_arrays_Float32Array._new(samples * 2);
		kha_audio2_Audio1.lastAllocationCount = 0;
	} else if(kha_audio2_Audio1.lastAllocationCount > 100) {
		kha_audio2_Audio.disableGcInteractions = true;
	} else {
		kha_audio2_Audio1.lastAllocationCount += 1;
	}
	var _g = 0;
	var _g1 = samples;
	while(_g < _g1) {
		var i = _g++;
		kha_audio2_Audio1.sampleCache2.setFloat32(i * 4,0,true);
	}
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		kha_audio2_Audio1.internalSoundChannels[i] = kha_audio2_Audio1.soundChannels[i];
	}
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		kha_audio2_Audio1.internalStreamChannels[i] = kha_audio2_Audio1.streamChannels[i];
	}
	var _g = 0;
	var _g1 = kha_audio2_Audio1.internalSoundChannels;
	while(_g < _g1.length) {
		var channel = _g1[_g];
		++_g;
		if(channel == null || channel.get_finished()) {
			continue;
		}
		channel.nextSamples(kha_audio2_Audio1.sampleCache1,samples,buffer.samplesPerSecond);
		var _g2 = 0;
		var _g3 = samples;
		while(_g2 < _g3) {
			var i = _g2++;
			var _g4 = i;
			var _g5 = kha_audio2_Audio1.sampleCache2;
			var v = _g5.getFloat32(_g4 * 4,kha_arrays_ByteArray.LITTLE_ENDIAN) + kha_audio2_Audio1.sampleCache1.getFloat32(i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN) * channel.get_volume();
			_g5.setFloat32(_g4 * 4,v,true);
		}
	}
	var _g = 0;
	var _g1 = kha_audio2_Audio1.internalStreamChannels;
	while(_g < _g1.length) {
		var channel = _g1[_g];
		++_g;
		if(channel == null || channel.get_finished()) {
			continue;
		}
		channel.nextSamples(kha_audio2_Audio1.sampleCache1,samples,buffer.samplesPerSecond);
		var _g2 = 0;
		var _g3 = samples;
		while(_g2 < _g3) {
			var i = _g2++;
			var _g4 = i;
			var _g5 = kha_audio2_Audio1.sampleCache2;
			var v = _g5.getFloat32(_g4 * 4,kha_arrays_ByteArray.LITTLE_ENDIAN) + kha_audio2_Audio1.sampleCache1.getFloat32(i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN) * channel.get_volume();
			_g5.setFloat32(_g4 * 4,v,true);
		}
	}
	var _g = 0;
	var _g1 = samples;
	while(_g < _g1) {
		var i = _g++;
		var a = kha_audio2_Audio1.sampleCache2.getFloat32(i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
		var a1 = a < 1.0 ? a : 1.0;
		var v = a1 > -1.0 ? a1 : -1.0;
		buffer.data.setFloat32(buffer.writeLocation * 4,v,true);
		buffer.writeLocation += 1;
		if(buffer.writeLocation >= buffer.size) {
			buffer.writeLocation = 0;
		}
	}
};
kha_audio2_Audio1.play = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	var channel = null;
	if(kha_audio2_Audio.samplesPerSecond != sound.sampleRate) {
		channel = new kha_audio2_ResamplingAudioChannel(loop,sound.sampleRate);
	} else {
		channel = new kha_audio2_AudioChannel(loop);
	}
	channel.data = sound.uncompressedData;
	var foundChannel = false;
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		if(kha_audio2_Audio1.soundChannels[i] == null || kha_audio2_Audio1.soundChannels[i].get_finished()) {
			kha_audio2_Audio1.soundChannels[i] = channel;
			foundChannel = true;
			break;
		}
	}
	if(foundChannel) {
		return channel;
	} else {
		return null;
	}
};
kha_audio2_Audio1._playAgain = function(channel) {
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		if(kha_audio2_Audio1.soundChannels[i] == channel) {
			kha_audio2_Audio1.soundChannels[i] = null;
		}
	}
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		if(kha_audio2_Audio1.soundChannels[i] == null || kha_audio2_Audio1.soundChannels[i].get_finished() || kha_audio2_Audio1.soundChannels[i] == channel) {
			kha_audio2_Audio1.soundChannels[i] = channel;
			break;
		}
	}
};
kha_audio2_Audio1.stream = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	var hardwareChannel = kha_audio2_Audio.stream(sound,loop);
	if(hardwareChannel != null) {
		return hardwareChannel;
	}
	var channel = new kha_audio2_StreamChannel(sound.compressedData,loop);
	var foundChannel = false;
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		if(kha_audio2_Audio1.streamChannels[i] == null || kha_audio2_Audio1.streamChannels[i].get_finished()) {
			kha_audio2_Audio1.streamChannels[i] = channel;
			foundChannel = true;
			break;
		}
	}
	if(foundChannel) {
		return channel;
	} else {
		return null;
	}
};
var kha_audio2_AudioChannel = function(looping) {
	this.data = null;
	this.looping = looping;
	this.stopped = false;
	this.paused = false;
	this.myPosition = 0;
	this.myVolume = 1;
};
$hxClasses["kha.audio2.AudioChannel"] = kha_audio2_AudioChannel;
kha_audio2_AudioChannel.__name__ = true;
kha_audio2_AudioChannel.__interfaces__ = [kha_audio1_AudioChannel];
kha_audio2_AudioChannel.max = function(a,b) {
	if(a > b) {
		return a;
	} else {
		return b;
	}
};
kha_audio2_AudioChannel.min = function(a,b) {
	if(a < b) {
		return a;
	} else {
		return b;
	}
};
kha_audio2_AudioChannel.prototype = {
	data: null
	,myVolume: null
	,myPosition: null
	,paused: null
	,stopped: null
	,looping: null
	,nextSamples: function(requestedSamples,requestedLength,sampleRate) {
		if(this.paused || this.stopped) {
			var _g = 0;
			var _g1 = requestedLength;
			while(_g < _g1) {
				var i = _g++;
				requestedSamples.setFloat32(i * 4,0,true);
			}
			return;
		}
		var requestedSamplesIndex = 0;
		while(requestedSamplesIndex < requestedLength) {
			var _g = 0;
			var a = (this.data.byteLength >> 2) - this.myPosition;
			var b = requestedLength - requestedSamplesIndex;
			var _g1 = a < b ? a : b;
			while(_g < _g1) {
				var i = _g++;
				var v = this.data.getFloat32(this.myPosition++ * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				requestedSamples.setFloat32(requestedSamplesIndex++ * 4,v,true);
			}
			if(this.myPosition >= this.data.byteLength >> 2) {
				this.myPosition = 0;
				if(!this.looping) {
					this.stopped = true;
					break;
				}
			}
		}
		while(requestedSamplesIndex < requestedLength) requestedSamples.setFloat32(requestedSamplesIndex++ * 4,0,true);
	}
	,play: function() {
		this.paused = false;
		this.stopped = false;
		kha_audio2_Audio1._playAgain(this);
	}
	,pause: function() {
		this.paused = true;
	}
	,stop: function() {
		this.myPosition = 0;
		this.stopped = true;
	}
	,length: null
	,get_length: function() {
		return (this.data.byteLength >> 2) / kha_audio2_Audio.samplesPerSecond / 2;
	}
	,get_position: function() {
		return this.myPosition / kha_audio2_Audio.samplesPerSecond / 2;
	}
	,set_position: function(value) {
		this.myPosition = Math.round(value * kha_audio2_Audio.samplesPerSecond * 2);
		var a = this.myPosition;
		var b = this.data.byteLength >> 2;
		var a1 = a < b ? a : b;
		this.myPosition = a1 > 0 ? a1 : 0;
		return value;
	}
	,get_volume: function() {
		return this.myVolume;
	}
	,set_volume: function(value) {
		return this.myVolume = value;
	}
	,finished: null
	,get_finished: function() {
		return this.stopped;
	}
	,__class__: kha_audio2_AudioChannel
};
var kha_audio2_Buffer = function(size,channels,samplesPerSecond) {
	this.size = size;
	this.data = kha_arrays_Float32Array._new(size);
	this.channels = channels;
	this.samplesPerSecond = samplesPerSecond;
	this.readLocation = 0;
	this.writeLocation = 0;
};
$hxClasses["kha.audio2.Buffer"] = kha_audio2_Buffer;
kha_audio2_Buffer.__name__ = true;
kha_audio2_Buffer.prototype = {
	channels: null
	,samplesPerSecond: null
	,data: null
	,size: null
	,readLocation: null
	,writeLocation: null
	,__class__: kha_audio2_Buffer
};
var kha_audio2_ResamplingAudioChannel = function(looping,sampleRate) {
	kha_audio2_AudioChannel.call(this,looping);
	this.sampleRate = sampleRate;
};
$hxClasses["kha.audio2.ResamplingAudioChannel"] = kha_audio2_ResamplingAudioChannel;
kha_audio2_ResamplingAudioChannel.__name__ = true;
kha_audio2_ResamplingAudioChannel.max = function(a,b) {
	if(a > b) {
		return a;
	} else {
		return b;
	}
};
kha_audio2_ResamplingAudioChannel.min = function(a,b) {
	if(a < b) {
		return a;
	} else {
		return b;
	}
};
kha_audio2_ResamplingAudioChannel.__super__ = kha_audio2_AudioChannel;
kha_audio2_ResamplingAudioChannel.prototype = $extend(kha_audio2_AudioChannel.prototype,{
	sampleRate: null
	,nextSamples: function(requestedSamples,requestedLength,sampleRate) {
		if(this.paused || this.stopped) {
			var _g = 0;
			var _g1 = requestedLength;
			while(_g < _g1) {
				var i = _g++;
				requestedSamples.setFloat32(i * 4,0,true);
			}
			return;
		}
		var requestedSamplesIndex = 0;
		while(requestedSamplesIndex < requestedLength) {
			var _g = 0;
			var value = Math.ceil((this.data.byteLength >> 2) * (sampleRate / this.sampleRate));
			var a = (value % 2 == 0 ? value : value + 1) - this.myPosition;
			var b = requestedLength - requestedSamplesIndex;
			var _g1 = a < b ? a : b;
			while(_g < _g1) {
				var i = _g++;
				var k = requestedSamplesIndex++;
				var position = this.myPosition++;
				var even = position % 2 == 0;
				var factor = this.sampleRate / sampleRate;
				var v;
				if(even) {
					position = position / 2 | 0;
					var pos = factor * position;
					var pos1 = Math.floor(pos);
					var pos2 = Math.floor(pos + 1);
					pos1 *= 2;
					pos2 *= 2;
					var minimum = 0;
					var maximum = (this.data.byteLength >> 2) - 1;
					if(maximum % 2 != 0) {
						--maximum;
					}
					var a1 = pos1 < minimum || pos1 > maximum ? 0 : this.data.getFloat32(pos1 * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
					var b1 = pos2 < minimum || pos2 > maximum ? 0 : this.data.getFloat32(pos2 * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
					var t = pos - Math.floor(pos);
					v = (1 - t) * a1 + t * b1;
				} else {
					position = position / 2 | 0;
					var pos3 = factor * position;
					var pos11 = Math.floor(pos3);
					var pos21 = Math.floor(pos3 + 1);
					pos11 = pos11 * 2 + 1;
					pos21 = pos21 * 2 + 1;
					var minimum1 = 1;
					var maximum1 = (this.data.byteLength >> 2) - 1;
					if(maximum1 % 2 == 0) {
						--maximum1;
					}
					var a2 = pos11 < minimum1 || pos11 > maximum1 ? 0 : this.data.getFloat32(pos11 * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
					var b2 = pos21 < minimum1 || pos21 > maximum1 ? 0 : this.data.getFloat32(pos21 * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
					var t1 = pos3 - Math.floor(pos3);
					v = (1 - t1) * a2 + t1 * b2;
				}
				requestedSamples.setFloat32(k * 4,v,true);
			}
			var value1 = Math.ceil((this.data.byteLength >> 2) * (sampleRate / this.sampleRate));
			if(this.myPosition >= (value1 % 2 == 0 ? value1 : value1 + 1)) {
				this.myPosition = 0;
				if(!this.looping) {
					this.stopped = true;
					break;
				}
			}
		}
		while(requestedSamplesIndex < requestedLength) requestedSamples.setFloat32(requestedSamplesIndex++ * 4,0,true);
	}
	,sample: function(position,sampleRate) {
		var even = position % 2 == 0;
		var factor = this.sampleRate / sampleRate;
		if(even) {
			position = position / 2 | 0;
			var pos = factor * position;
			var pos1 = Math.floor(pos);
			var pos2 = Math.floor(pos + 1);
			pos1 *= 2;
			pos2 *= 2;
			var minimum = 0;
			var maximum = (this.data.byteLength >> 2) - 1;
			if(maximum % 2 != 0) {
				--maximum;
			}
			var a = pos1 < minimum || pos1 > maximum ? 0 : this.data.getFloat32(pos1 * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
			var b = pos2 < minimum || pos2 > maximum ? 0 : this.data.getFloat32(pos2 * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
			var t = pos - Math.floor(pos);
			return (1 - t) * a + t * b;
		} else {
			position = position / 2 | 0;
			var pos = factor * position;
			var pos1 = Math.floor(pos);
			var pos2 = Math.floor(pos + 1);
			pos1 = pos1 * 2 + 1;
			pos2 = pos2 * 2 + 1;
			var minimum = 1;
			var maximum = (this.data.byteLength >> 2) - 1;
			if(maximum % 2 == 0) {
				--maximum;
			}
			var a = pos1 < minimum || pos1 > maximum ? 0 : this.data.getFloat32(pos1 * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
			var b = pos2 < minimum || pos2 > maximum ? 0 : this.data.getFloat32(pos2 * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
			var t = pos - Math.floor(pos);
			return (1 - t) * a + t * b;
		}
	}
	,lerp: function(v0,v1,t) {
		return (1 - t) * v0 + t * v1;
	}
	,sampleLength: function(sampleRate) {
		var value = Math.ceil((this.data.byteLength >> 2) * (sampleRate / this.sampleRate));
		if(value % 2 == 0) {
			return value;
		} else {
			return value + 1;
		}
	}
	,play: function() {
		this.paused = false;
		this.stopped = false;
		kha_audio2_Audio1._playAgain(this);
	}
	,pause: function() {
		this.paused = true;
	}
	,stop: function() {
		this.myPosition = 0;
		this.stopped = true;
	}
	,get_length: function() {
		return (this.data.byteLength >> 2) / this.sampleRate / 2;
	}
	,get_position: function() {
		return this.myPosition / kha_audio2_Audio.samplesPerSecond / 2;
	}
	,set_position: function(value) {
		var pos = Math.round(value * kha_audio2_Audio.samplesPerSecond * 2.0);
		if(pos % 2 != 0) {
			++pos;
		}
		var value1 = Math.ceil((this.data.byteLength >> 2) * (kha_audio2_Audio.samplesPerSecond / this.sampleRate));
		var b = value1 % 2 == 0 ? value1 : value1 + 1;
		var a = pos < b ? pos : b;
		this.myPosition = a > 0 ? a : 0;
		return value;
	}
	,get_volume: function() {
		return this.myVolume;
	}
	,set_volume: function(value) {
		return this.myVolume = value;
	}
	,get_finished: function() {
		return this.stopped;
	}
	,__class__: kha_audio2_ResamplingAudioChannel
});
var kha_audio2_StreamChannel = function(data,loop) {
	this.paused = false;
	this.atend = false;
	this.myVolume = 1;
	this.loop = loop;
	this.reader = kha_audio2_ogg_vorbis_Reader.openFromBytes(data);
};
$hxClasses["kha.audio2.StreamChannel"] = kha_audio2_StreamChannel;
kha_audio2_StreamChannel.__name__ = true;
kha_audio2_StreamChannel.__interfaces__ = [kha_audio1_AudioChannel];
kha_audio2_StreamChannel.prototype = {
	reader: null
	,atend: null
	,loop: null
	,myVolume: null
	,paused: null
	,nextSamples: function(samples,length,sampleRate) {
		if(this.paused) {
			var _g = 0;
			var _g1 = length;
			while(_g < _g1) {
				var i = _g++;
				samples.setFloat32(i * 4,0,true);
			}
			return;
		}
		var count = this.reader.read(samples,length / 2 | 0,2,sampleRate,true) * 2;
		if(count < length) {
			if(this.loop) {
				this.reader.set_currentMillisecond(0);
			} else {
				this.atend = true;
			}
			var _g = count;
			var _g1 = length;
			while(_g < _g1) {
				var i = _g++;
				samples.setFloat32(i * 4,0,true);
			}
		}
	}
	,play: function() {
		this.paused = false;
	}
	,pause: function() {
		this.paused = true;
	}
	,stop: function() {
		this.atend = true;
	}
	,length: null
	,get_length: function() {
		return this.reader.get_totalMillisecond() / 1000.0;
	}
	,get_position: function() {
		return this.reader.get_currentMillisecond() / 1000.0;
	}
	,set_position: function(value) {
		return value;
	}
	,get_volume: function() {
		return this.myVolume;
	}
	,set_volume: function(value) {
		return this.myVolume = value;
	}
	,finished: null
	,get_finished: function() {
		return this.atend;
	}
	,__class__: kha_audio2_StreamChannel
};
var kha_audio2_VirtualStreamChannel = function(aeChannel,looping) {
	this.mode = 2;
	this.aeChannel = aeChannel;
	this.looping = looping;
	this.lastTickTime = kha_Scheduler.realTime();
	this.lastPosition = 0;
};
$hxClasses["kha.audio2.VirtualStreamChannel"] = kha_audio2_VirtualStreamChannel;
kha_audio2_VirtualStreamChannel.__name__ = true;
kha_audio2_VirtualStreamChannel.__interfaces__ = [kha_audio1_AudioChannel];
kha_audio2_VirtualStreamChannel.prototype = {
	aeChannel: null
	,mode: null
	,lastTickTime: null
	,lastPosition: null
	,looping: null
	,wake: function() {
		this.updatePosition();
		this.aeChannel.set_position(this.lastPosition);
		this.aeChannel.play();
	}
	,updatePosition: function() {
		var now = kha_Scheduler.realTime();
		switch(this.mode) {
		case 0:
			this.lastPosition = 0;
			break;
		case 1:
			break;
		case 2:
			this.lastPosition += now - this.lastTickTime;
			while(this.lastPosition > this.get_length()) this.lastPosition -= this.get_length();
			break;
		}
		this.lastTickTime = now;
	}
	,play: function() {
		if(kha_SystemImpl.mobileAudioPlaying) {
			this.aeChannel.play();
		} else {
			this.updatePosition();
			this.mode = 2;
		}
	}
	,pause: function() {
		if(kha_SystemImpl.mobileAudioPlaying) {
			this.aeChannel.pause();
		} else {
			this.updatePosition();
			this.mode = 1;
		}
	}
	,stop: function() {
		if(kha_SystemImpl.mobileAudioPlaying) {
			this.aeChannel.stop();
		} else {
			this.updatePosition();
			this.mode = 0;
		}
	}
	,get_length: function() {
		return this.aeChannel.get_length();
	}
	,get_position: function() {
		if(kha_SystemImpl.mobileAudioPlaying) {
			return this.aeChannel.get_position();
		} else {
			this.updatePosition();
			return this.lastPosition;
		}
	}
	,set_position: function(value) {
		if(kha_SystemImpl.mobileAudioPlaying) {
			return this.aeChannel.set_position(value);
		} else {
			this.updatePosition();
			return this.lastPosition = value;
		}
	}
	,get_volume: function() {
		return this.aeChannel.get_volume();
	}
	,set_volume: function(value) {
		return this.aeChannel.set_volume(value);
	}
	,get_finished: function() {
		if(kha_SystemImpl.mobileAudioPlaying) {
			return this.aeChannel.get_finished();
		} else if(this.mode != 0) {
			if(!this.looping) {
				return this.get_position() >= this.get_length();
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	,__class__: kha_audio2_VirtualStreamChannel
};
var kha_audio2_ogg_tools_Crc32 = function() { };
$hxClasses["kha.audio2.ogg.tools.Crc32"] = kha_audio2_ogg_tools_Crc32;
kha_audio2_ogg_tools_Crc32.__name__ = true;
kha_audio2_ogg_tools_Crc32.init = function() {
	if(kha_audio2_ogg_tools_Crc32.table != null) {
		return;
	}
	var this1 = new Array(256);
	kha_audio2_ogg_tools_Crc32.table = this1;
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		var s = i << 24;
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		kha_audio2_ogg_tools_Crc32.table[i] = s;
	}
};
kha_audio2_ogg_tools_Crc32.update = function(crc,byte) {
	return crc << 8 ^ kha_audio2_ogg_tools_Crc32.table[byte ^ crc >>> 24];
};
var kha_audio2_ogg_tools_MathTools = function() { };
$hxClasses["kha.audio2.ogg.tools.MathTools"] = kha_audio2_ogg_tools_MathTools;
kha_audio2_ogg_tools_MathTools.__name__ = true;
kha_audio2_ogg_tools_MathTools.ilog = function(n) {
	var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
	if(n < 16384) {
		if(n < 16) {
			return log2_4[n];
		} else if(n < 512) {
			return 5 + log2_4[n >> 5];
		} else {
			return 10 + log2_4[n >> 10];
		}
	} else if(n < 16777216) {
		if(n < 524288) {
			return 15 + log2_4[n >> 15];
		} else {
			return 20 + log2_4[n >> 20];
		}
	} else if(n < 536870912) {
		return 25 + log2_4[n >> 25];
	} else if(n < -2147483648) {
		return 30 + log2_4[n >> 30];
	} else {
		return 0;
	}
};
var kha_audio2_ogg_tools_Mdct = function() { };
$hxClasses["kha.audio2.ogg.tools.Mdct"] = kha_audio2_ogg_tools_Mdct;
kha_audio2_ogg_tools_Mdct.__name__ = true;
kha_audio2_ogg_tools_Mdct.inverseTransform = function(buffer,n,a,b,c,bitReverse) {
	var n2 = n >> 1;
	var n4 = n >> 2;
	var n8 = n >> 3;
	var this1 = new Array(n2);
	var buf2 = this1;
	var dOffset = n2 - 2;
	var aaOffset = 0;
	var eOffset = 0;
	var eStopOffset = n2;
	while(eOffset != eStopOffset) {
		buf2[dOffset + 1] = buffer[eOffset] * a[aaOffset] - buffer[eOffset + 2] * a[aaOffset + 1];
		buf2[dOffset] = buffer[eOffset] * a[aaOffset + 1] + buffer[eOffset + 2] * a[aaOffset];
		dOffset -= 2;
		aaOffset += 2;
		eOffset += 4;
	}
	eOffset = n2 - 3;
	while(dOffset >= 0) {
		buf2[dOffset + 1] = -buffer[eOffset + 2] * a[aaOffset] - -buffer[eOffset] * a[aaOffset + 1];
		buf2[dOffset] = -buffer[eOffset + 2] * a[aaOffset + 1] + -buffer[eOffset] * a[aaOffset];
		dOffset -= 2;
		aaOffset += 2;
		eOffset -= 4;
	}
	var u = buffer;
	var v = buf2;
	var aaOffset = n2 - 8;
	var eOffset0 = n4;
	var eOffset1 = 0;
	var dOffset0 = n4;
	var dOffset1 = 0;
	while(aaOffset >= 0) {
		var v41_21 = v[eOffset0 + 1] - v[eOffset1 + 1];
		var v40_20 = v[eOffset0] - v[eOffset1];
		u[dOffset0 + 1] = v[eOffset0 + 1] + v[eOffset1 + 1];
		u[dOffset0] = v[eOffset0] + v[eOffset1];
		u[dOffset1 + 1] = v41_21 * a[aaOffset + 4] - v40_20 * a[aaOffset + 5];
		u[dOffset1] = v40_20 * a[aaOffset + 4] + v41_21 * a[aaOffset + 5];
		v41_21 = v[eOffset0 + 3] - v[eOffset1 + 3];
		v40_20 = v[eOffset0 + 2] - v[eOffset1 + 2];
		u[dOffset0 + 3] = v[eOffset0 + 3] + v[eOffset1 + 3];
		u[dOffset0 + 2] = v[eOffset0 + 2] + v[eOffset1 + 2];
		u[dOffset1 + 3] = v41_21 * a[aaOffset] - v40_20 * a[aaOffset + 1];
		u[dOffset1 + 2] = v40_20 * a[aaOffset] + v41_21 * a[aaOffset + 1];
		aaOffset -= 8;
		dOffset0 += 4;
		dOffset1 += 4;
		eOffset0 += 4;
		eOffset1 += 4;
	}
	var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
	var ld = (n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0) - 1;
	var i_off = n2 - 1 - n4 * 0;
	var eeOffset0 = i_off;
	var eeOffset2 = i_off + -(n >> 3);
	var aOffset = 0;
	var i = (n >> 4 >> 2) + 1;
	while(--i > 0) {
		var k00_20 = u[eeOffset0] - u[eeOffset2];
		var k01_21 = u[eeOffset0 + (-1)] - u[eeOffset2 + (-1)];
		u[eeOffset0] += u[eeOffset2];
		u[eeOffset0 + (-1)] += u[eeOffset2 + (-1)];
		u[eeOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = u[eeOffset0 + (-2)] - u[eeOffset2 + (-2)];
		k01_21 = u[eeOffset0 + (-3)] - u[eeOffset2 + (-3)];
		u[eeOffset0 + (-2)] += u[eeOffset2 + (-2)];
		u[eeOffset0 + (-3)] += u[eeOffset2 + (-3)];
		u[eeOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = u[eeOffset0 + (-4)] - u[eeOffset2 + (-4)];
		k01_21 = u[eeOffset0 + (-5)] - u[eeOffset2 + (-5)];
		u[eeOffset0 + (-4)] += u[eeOffset2 + (-4)];
		u[eeOffset0 + (-5)] += u[eeOffset2 + (-5)];
		u[eeOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = u[eeOffset0 + (-6)] - u[eeOffset2 + (-6)];
		k01_21 = u[eeOffset0 + (-7)] - u[eeOffset2 + (-7)];
		u[eeOffset0 + (-6)] += u[eeOffset2 + (-6)];
		u[eeOffset0 + (-7)] += u[eeOffset2 + (-7)];
		u[eeOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		eeOffset0 -= 8;
		eeOffset2 -= 8;
	}
	var i_off = n2 - 1 - n4;
	var eeOffset0 = i_off;
	var eeOffset2 = i_off + -(n >> 3);
	var aOffset = 0;
	var i = (n >> 4 >> 2) + 1;
	while(--i > 0) {
		var k00_20 = u[eeOffset0] - u[eeOffset2];
		var k01_21 = u[eeOffset0 + (-1)] - u[eeOffset2 + (-1)];
		u[eeOffset0] += u[eeOffset2];
		u[eeOffset0 + (-1)] += u[eeOffset2 + (-1)];
		u[eeOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = u[eeOffset0 + (-2)] - u[eeOffset2 + (-2)];
		k01_21 = u[eeOffset0 + (-3)] - u[eeOffset2 + (-3)];
		u[eeOffset0 + (-2)] += u[eeOffset2 + (-2)];
		u[eeOffset0 + (-3)] += u[eeOffset2 + (-3)];
		u[eeOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = u[eeOffset0 + (-4)] - u[eeOffset2 + (-4)];
		k01_21 = u[eeOffset0 + (-5)] - u[eeOffset2 + (-5)];
		u[eeOffset0 + (-4)] += u[eeOffset2 + (-4)];
		u[eeOffset0 + (-5)] += u[eeOffset2 + (-5)];
		u[eeOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = u[eeOffset0 + (-6)] - u[eeOffset2 + (-6)];
		k01_21 = u[eeOffset0 + (-7)] - u[eeOffset2 + (-7)];
		u[eeOffset0 + (-6)] += u[eeOffset2 + (-6)];
		u[eeOffset0 + (-7)] += u[eeOffset2 + (-7)];
		u[eeOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		eeOffset0 -= 8;
		eeOffset2 -= 8;
	}
	var d0 = n2 - 1 - n8 * 0;
	var aOffset = 0;
	var eOffset0 = d0;
	var eOffset2 = d0 + -(n >> 4);
	var i = (n >> 5 >> 2) + 1;
	while(--i > 0) {
		var k00_20 = u[eOffset0] - u[eOffset2];
		var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
		u[eOffset0] += u[eOffset2];
		u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
		u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
		k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
		u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
		u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
		u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
		k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
		u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
		u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
		u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
		k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
		u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
		u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
		u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		eOffset0 -= 8;
		eOffset2 -= 8;
		aOffset += 16;
	}
	var d0 = n2 - 1 - n8;
	var aOffset = 0;
	var eOffset0 = d0;
	var eOffset2 = d0 + -(n >> 4);
	var i = (n >> 5 >> 2) + 1;
	while(--i > 0) {
		var k00_20 = u[eOffset0] - u[eOffset2];
		var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
		u[eOffset0] += u[eOffset2];
		u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
		u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
		k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
		u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
		u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
		u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
		k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
		u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
		u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
		u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
		k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
		u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
		u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
		u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		eOffset0 -= 8;
		eOffset2 -= 8;
		aOffset += 16;
	}
	var d0 = n2 - 1 - n8 * 2;
	var aOffset = 0;
	var eOffset0 = d0;
	var eOffset2 = d0 + -(n >> 4);
	var i = (n >> 5 >> 2) + 1;
	while(--i > 0) {
		var k00_20 = u[eOffset0] - u[eOffset2];
		var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
		u[eOffset0] += u[eOffset2];
		u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
		u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
		k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
		u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
		u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
		u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
		k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
		u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
		u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
		u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
		k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
		u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
		u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
		u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		eOffset0 -= 8;
		eOffset2 -= 8;
		aOffset += 16;
	}
	var d0 = n2 - 1 - n8 * 3;
	var aOffset = 0;
	var eOffset0 = d0;
	var eOffset2 = d0 + -(n >> 4);
	var i = (n >> 5 >> 2) + 1;
	while(--i > 0) {
		var k00_20 = u[eOffset0] - u[eOffset2];
		var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
		u[eOffset0] += u[eOffset2];
		u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
		u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
		k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
		u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
		u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
		u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
		k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
		u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
		u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
		u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
		k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
		u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
		u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
		u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		eOffset0 -= 8;
		eOffset2 -= 8;
		aOffset += 16;
	}
	var _g = 2;
	var _g1 = ld - 3 >> 1;
	while(_g < _g1) {
		var l = _g++;
		var k0 = n >> l + 2;
		var k0_2 = k0 >> 1;
		var lim = 1 << l + 1;
		var _g2 = 0;
		var _g3 = lim;
		while(_g2 < _g3) {
			var i = _g2++;
			var d0 = n2 - 1 - k0 * i;
			var k1 = 1 << l + 3;
			var aOffset = 0;
			var eOffset0 = d0;
			var eOffset2 = d0 + -k0_2;
			var i1 = (n >> l + 4 >> 2) + 1;
			while(--i1 > 0) {
				var k00_20 = u[eOffset0] - u[eOffset2];
				var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
				u[eOffset0] += u[eOffset2];
				u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
				u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
				u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
				aOffset += k1;
				k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
				k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
				u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
				u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
				u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
				u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
				aOffset += k1;
				k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
				k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
				u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
				u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
				u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
				u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
				aOffset += k1;
				k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
				k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
				u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
				u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
				u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
				u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
				eOffset0 -= 8;
				eOffset2 -= 8;
				aOffset += k1;
			}
		}
	}
	var _g = ld - 3 >> 1;
	var _g1 = ld - 6;
	while(_g < _g1) {
		var l = _g++;
		var k0 = n >> l + 2;
		var k1 = 1 << l + 3;
		var k0_2 = k0 >> 1;
		var rlim = n >> l + 6;
		var lim = 1 << l + 1;
		var aOffset = 0;
		var i_off = n2 - 1;
		var r = rlim + 1;
		while(--r > 0) {
			var A0 = a[aOffset];
			var A1 = a[aOffset + 1];
			var A2 = a[aOffset + k1];
			var A3 = a[aOffset + k1 + 1];
			var A4 = a[aOffset + k1 * 2];
			var A5 = a[aOffset + k1 * 2 + 1];
			var A6 = a[aOffset + k1 * 3];
			var A7 = a[aOffset + k1 * 3 + 1];
			var eeOffset0 = i_off;
			var eeOffset2 = i_off + -k0_2;
			var i = lim + 1;
			while(--i > 0) {
				var k00 = u[eeOffset0] - u[eeOffset2];
				var k11 = u[eeOffset0 + (-1)] - u[eeOffset2 + (-1)];
				u[eeOffset0] += u[eeOffset2];
				u[eeOffset0 + (-1)] += u[eeOffset2 + (-1)];
				u[eeOffset2] = k00 * A0 - k11 * A1;
				u[eeOffset2 + (-1)] = k11 * A0 + k00 * A1;
				k00 = u[eeOffset0 + (-2)] - u[eeOffset2 + (-2)];
				k11 = u[eeOffset0 + (-3)] - u[eeOffset2 + (-3)];
				u[eeOffset0 + (-2)] += u[eeOffset2 + (-2)];
				u[eeOffset0 + (-3)] += u[eeOffset2 + (-3)];
				u[eeOffset2 + (-2)] = k00 * A2 - k11 * A3;
				u[eeOffset2 + (-3)] = k11 * A2 + k00 * A3;
				k00 = u[eeOffset0 + (-4)] - u[eeOffset2 + (-4)];
				k11 = u[eeOffset0 + (-5)] - u[eeOffset2 + (-5)];
				u[eeOffset0 + (-4)] += u[eeOffset2 + (-4)];
				u[eeOffset0 + (-5)] += u[eeOffset2 + (-5)];
				u[eeOffset2 + (-4)] = k00 * A4 - k11 * A5;
				u[eeOffset2 + (-5)] = k11 * A4 + k00 * A5;
				k00 = u[eeOffset0 + (-6)] - u[eeOffset2 + (-6)];
				k11 = u[eeOffset0 + (-7)] - u[eeOffset2 + (-7)];
				u[eeOffset0 + (-6)] += u[eeOffset2 + (-6)];
				u[eeOffset0 + (-7)] += u[eeOffset2 + (-7)];
				u[eeOffset2 + (-6)] = k00 * A6 - k11 * A7;
				u[eeOffset2 + (-7)] = k11 * A6 + k00 * A7;
				eeOffset0 -= k0;
				eeOffset2 -= k0;
			}
			aOffset += k1 * 4;
			i_off -= 8;
		}
	}
	var i_off = n2 - 1;
	var A2 = a[n >> 3];
	var zOffset = i_off;
	var baseOffset = i_off - 16 * (n >> 5);
	while(zOffset > baseOffset) {
		var t0 = u[zOffset];
		var t1 = u[zOffset + (-8)];
		u[zOffset + (-8)] = t0 - t1;
		u[zOffset] = t0 + t1;
		t0 = u[zOffset + (-1)];
		t1 = u[zOffset + (-9)];
		u[zOffset + (-9)] = t0 - t1;
		u[zOffset + (-1)] = t0 + t1;
		t0 = u[zOffset + (-2)];
		t1 = u[zOffset + (-10)];
		var k00 = t0 - t1;
		u[zOffset + (-2)] = t0 + t1;
		t0 = u[zOffset + (-3)];
		t1 = u[zOffset + (-11)];
		var k11 = t0 - t1;
		u[zOffset + (-3)] = t0 + t1;
		u[zOffset + (-10)] = (k00 + k11) * A2;
		u[zOffset + (-11)] = (k11 - k00) * A2;
		t0 = u[zOffset + (-4)];
		t1 = u[zOffset + (-12)];
		k00 = t1 - t0;
		u[zOffset + (-4)] = t0 + t1;
		t0 = u[zOffset + (-5)];
		t1 = u[zOffset + (-13)];
		k11 = t0 - t1;
		u[zOffset + (-5)] = t0 + t1;
		u[zOffset + (-12)] = k11;
		u[zOffset + (-13)] = k00;
		t0 = u[zOffset + (-6)];
		t1 = u[zOffset + (-14)];
		k00 = t1 - t0;
		u[zOffset + (-6)] = t0 + t1;
		t0 = u[zOffset + (-7)];
		t1 = u[zOffset + (-15)];
		k11 = t0 - t1;
		u[zOffset + (-7)] = t0 + t1;
		u[zOffset + (-14)] = (k00 + k11) * A2;
		u[zOffset + (-15)] = (k00 - k11) * A2;
		var t01 = u[zOffset];
		var t11 = u[zOffset + (-4)];
		var k001 = t01 - t11;
		var y0 = t01 + t11;
		t01 = u[zOffset + (-2)];
		t11 = u[zOffset + (-6)];
		var y2 = t01 + t11;
		var k22 = t01 - t11;
		u[zOffset] = y0 + y2;
		u[zOffset + (-2)] = y0 - y2;
		var k33 = u[zOffset + (-3)] - u[zOffset + (-7)];
		u[zOffset + (-4)] = k001 + k33;
		u[zOffset + (-6)] = k001 - k33;
		t01 = u[zOffset + (-1)];
		t11 = u[zOffset + (-5)];
		var k111 = t01 - t11;
		var y1 = t01 + t11;
		var y3 = u[zOffset + (-3)] + u[zOffset + (-7)];
		u[zOffset + (-1)] = y1 + y3;
		u[zOffset + (-3)] = y1 - y3;
		u[zOffset + (-5)] = k111 - k22;
		u[zOffset + (-7)] = k111 + k22;
		var zOffset1 = zOffset - 8;
		var t02 = u[zOffset1];
		var t12 = u[zOffset1 + (-4)];
		var k002 = t02 - t12;
		var y01 = t02 + t12;
		t02 = u[zOffset1 + (-2)];
		t12 = u[zOffset1 + (-6)];
		var y21 = t02 + t12;
		var k221 = t02 - t12;
		u[zOffset1] = y01 + y21;
		u[zOffset1 + (-2)] = y01 - y21;
		var k331 = u[zOffset1 + (-3)] - u[zOffset1 + (-7)];
		u[zOffset1 + (-4)] = k002 + k331;
		u[zOffset1 + (-6)] = k002 - k331;
		t02 = u[zOffset1 + (-1)];
		t12 = u[zOffset1 + (-5)];
		var k112 = t02 - t12;
		var y11 = t02 + t12;
		var y31 = u[zOffset1 + (-3)] + u[zOffset1 + (-7)];
		u[zOffset1 + (-1)] = y11 + y31;
		u[zOffset1 + (-3)] = y11 - y31;
		u[zOffset1 + (-5)] = k112 - k221;
		u[zOffset1 + (-7)] = k112 + k221;
		zOffset -= 16;
	}
	var brOffset = 0;
	var dOffset0 = n4 - 4;
	var dOffset1 = n2 - 4;
	while(dOffset0 >= 0) {
		var k4 = bitReverse[brOffset];
		v[dOffset1 + 3] = u[k4];
		v[dOffset1 + 2] = u[k4 + 1];
		v[dOffset0 + 3] = u[k4 + 2];
		v[dOffset0 + 2] = u[k4 + 3];
		k4 = bitReverse[brOffset + 1];
		v[dOffset1 + 1] = u[k4];
		v[dOffset1] = u[k4 + 1];
		v[dOffset0 + 1] = u[k4 + 2];
		v[dOffset0] = u[k4 + 3];
		dOffset0 -= 4;
		dOffset1 -= 4;
		brOffset += 2;
	}
	var cOffset = 0;
	var dOffset = 0;
	var eOffset = n2 - 4;
	while(dOffset < eOffset) {
		var a02 = v[dOffset] - v[eOffset + 2];
		var a11 = v[dOffset + 1] + v[eOffset + 3];
		var b0 = c[cOffset + 1] * a02 + c[cOffset] * a11;
		var b1 = c[cOffset + 1] * a11 - c[cOffset] * a02;
		var b2 = v[dOffset] + v[eOffset + 2];
		var b3 = v[dOffset + 1] - v[eOffset + 3];
		v[dOffset] = b2 + b0;
		v[dOffset + 1] = b3 + b1;
		v[eOffset + 2] = b2 - b0;
		v[eOffset + 3] = b1 - b3;
		a02 = v[dOffset + 2] - v[eOffset];
		a11 = v[dOffset + 3] + v[eOffset + 1];
		b0 = c[cOffset + 3] * a02 + c[cOffset + 2] * a11;
		b1 = c[cOffset + 3] * a11 - c[cOffset + 2] * a02;
		b2 = v[dOffset + 2] + v[eOffset];
		b3 = v[dOffset + 3] - v[eOffset + 1];
		v[dOffset + 2] = b2 + b0;
		v[dOffset + 3] = b3 + b1;
		v[eOffset] = b2 - b0;
		v[eOffset + 1] = b1 - b3;
		cOffset += 4;
		dOffset += 4;
		eOffset -= 4;
	}
	var bOffset = n2 - 8;
	var eOffset = n2 - 8;
	var dOffset0 = 0;
	var dOffset1 = n2 - 4;
	var dOffset2 = n2;
	var dOffset3 = n - 4;
	while(eOffset >= 0) {
		var p3 = buf2[eOffset + 6] * b[bOffset + 7] - buf2[eOffset + 7] * b[bOffset + 6];
		var p2 = -buf2[eOffset + 6] * b[bOffset + 6] - buf2[eOffset + 7] * b[bOffset + 7];
		buffer[dOffset0] = p3;
		buffer[dOffset1 + 3] = -p3;
		buffer[dOffset2] = p2;
		buffer[dOffset3 + 3] = p2;
		var p1 = buf2[eOffset + 4] * b[bOffset + 5] - buf2[eOffset + 5] * b[bOffset + 4];
		var p0 = -buf2[eOffset + 4] * b[bOffset + 4] - buf2[eOffset + 5] * b[bOffset + 5];
		buffer[dOffset0 + 1] = p1;
		buffer[dOffset1 + 2] = -p1;
		buffer[dOffset2 + 1] = p0;
		buffer[dOffset3 + 2] = p0;
		p3 = buf2[eOffset + 2] * b[bOffset + 3] - buf2[eOffset + 3] * b[bOffset + 2];
		p2 = -buf2[eOffset + 2] * b[bOffset + 2] - buf2[eOffset + 3] * b[bOffset + 3];
		buffer[dOffset0 + 2] = p3;
		buffer[dOffset1 + 1] = -p3;
		buffer[dOffset2 + 2] = p2;
		buffer[dOffset3 + 1] = p2;
		p1 = buf2[eOffset] * b[bOffset + 1] - buf2[eOffset + 1] * b[bOffset];
		p0 = -buf2[eOffset] * b[bOffset] - buf2[eOffset + 1] * b[bOffset + 1];
		buffer[dOffset0 + 3] = p1;
		buffer[dOffset1] = -p1;
		buffer[dOffset2 + 3] = p0;
		buffer[dOffset3] = p0;
		bOffset -= 8;
		eOffset -= 8;
		dOffset0 += 4;
		dOffset2 += 4;
		dOffset1 -= 4;
		dOffset3 -= 4;
	}
};
kha_audio2_ogg_tools_Mdct.step3Iter0Loop = function(n,e,i_off,k_off,a) {
	var eeOffset0 = i_off;
	var eeOffset2 = i_off + k_off;
	var aOffset = 0;
	var i = (n >> 2) + 1;
	while(--i > 0) {
		var k00_20 = e[eeOffset0] - e[eeOffset2];
		var k01_21 = e[eeOffset0 + (-1)] - e[eeOffset2 + (-1)];
		e[eeOffset0] += e[eeOffset2];
		e[eeOffset0 + (-1)] += e[eeOffset2 + (-1)];
		e[eeOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eeOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = e[eeOffset0 + (-2)] - e[eeOffset2 + (-2)];
		k01_21 = e[eeOffset0 + (-3)] - e[eeOffset2 + (-3)];
		e[eeOffset0 + (-2)] += e[eeOffset2 + (-2)];
		e[eeOffset0 + (-3)] += e[eeOffset2 + (-3)];
		e[eeOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eeOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = e[eeOffset0 + (-4)] - e[eeOffset2 + (-4)];
		k01_21 = e[eeOffset0 + (-5)] - e[eeOffset2 + (-5)];
		e[eeOffset0 + (-4)] += e[eeOffset2 + (-4)];
		e[eeOffset0 + (-5)] += e[eeOffset2 + (-5)];
		e[eeOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eeOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = e[eeOffset0 + (-6)] - e[eeOffset2 + (-6)];
		k01_21 = e[eeOffset0 + (-7)] - e[eeOffset2 + (-7)];
		e[eeOffset0 + (-6)] += e[eeOffset2 + (-6)];
		e[eeOffset0 + (-7)] += e[eeOffset2 + (-7)];
		e[eeOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eeOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		eeOffset0 -= 8;
		eeOffset2 -= 8;
	}
};
kha_audio2_ogg_tools_Mdct.step3InnerRLoop = function(lim,e,d0,k_off,a,k1) {
	var aOffset = 0;
	var eOffset0 = d0;
	var eOffset2 = d0 + k_off;
	var i = (lim >> 2) + 1;
	while(--i > 0) {
		var k00_20 = e[eOffset0] - e[eOffset2];
		var k01_21 = e[eOffset0 + (-1)] - e[eOffset2 + (-1)];
		e[eOffset0] += e[eOffset2];
		e[eOffset0 + (-1)] += e[eOffset2 + (-1)];
		e[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += k1;
		k00_20 = e[eOffset0 + (-2)] - e[eOffset2 + (-2)];
		k01_21 = e[eOffset0 + (-3)] - e[eOffset2 + (-3)];
		e[eOffset0 + (-2)] += e[eOffset2 + (-2)];
		e[eOffset0 + (-3)] += e[eOffset2 + (-3)];
		e[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += k1;
		k00_20 = e[eOffset0 + (-4)] - e[eOffset2 + (-4)];
		k01_21 = e[eOffset0 + (-5)] - e[eOffset2 + (-5)];
		e[eOffset0 + (-4)] += e[eOffset2 + (-4)];
		e[eOffset0 + (-5)] += e[eOffset2 + (-5)];
		e[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += k1;
		k00_20 = e[eOffset0 + (-6)] - e[eOffset2 + (-6)];
		k01_21 = e[eOffset0 + (-7)] - e[eOffset2 + (-7)];
		e[eOffset0 + (-6)] += e[eOffset2 + (-6)];
		e[eOffset0 + (-7)] += e[eOffset2 + (-7)];
		e[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		eOffset0 -= 8;
		eOffset2 -= 8;
		aOffset += k1;
	}
};
kha_audio2_ogg_tools_Mdct.step3InnerSLoop = function(n,e,i_off,k_off,a,aOffset0,aOffset1,k0) {
	var A0 = a[aOffset0];
	var A1 = a[aOffset0 + 1];
	var A2 = a[aOffset0 + aOffset1];
	var A3 = a[aOffset0 + aOffset1 + 1];
	var A4 = a[aOffset0 + aOffset1 * 2];
	var A5 = a[aOffset0 + aOffset1 * 2 + 1];
	var A6 = a[aOffset0 + aOffset1 * 3];
	var A7 = a[aOffset0 + aOffset1 * 3 + 1];
	var eeOffset0 = i_off;
	var eeOffset2 = i_off + k_off;
	var i = n + 1;
	while(--i > 0) {
		var k00 = e[eeOffset0] - e[eeOffset2];
		var k11 = e[eeOffset0 + (-1)] - e[eeOffset2 + (-1)];
		e[eeOffset0] += e[eeOffset2];
		e[eeOffset0 + (-1)] += e[eeOffset2 + (-1)];
		e[eeOffset2] = k00 * A0 - k11 * A1;
		e[eeOffset2 + (-1)] = k11 * A0 + k00 * A1;
		k00 = e[eeOffset0 + (-2)] - e[eeOffset2 + (-2)];
		k11 = e[eeOffset0 + (-3)] - e[eeOffset2 + (-3)];
		e[eeOffset0 + (-2)] += e[eeOffset2 + (-2)];
		e[eeOffset0 + (-3)] += e[eeOffset2 + (-3)];
		e[eeOffset2 + (-2)] = k00 * A2 - k11 * A3;
		e[eeOffset2 + (-3)] = k11 * A2 + k00 * A3;
		k00 = e[eeOffset0 + (-4)] - e[eeOffset2 + (-4)];
		k11 = e[eeOffset0 + (-5)] - e[eeOffset2 + (-5)];
		e[eeOffset0 + (-4)] += e[eeOffset2 + (-4)];
		e[eeOffset0 + (-5)] += e[eeOffset2 + (-5)];
		e[eeOffset2 + (-4)] = k00 * A4 - k11 * A5;
		e[eeOffset2 + (-5)] = k11 * A4 + k00 * A5;
		k00 = e[eeOffset0 + (-6)] - e[eeOffset2 + (-6)];
		k11 = e[eeOffset0 + (-7)] - e[eeOffset2 + (-7)];
		e[eeOffset0 + (-6)] += e[eeOffset2 + (-6)];
		e[eeOffset0 + (-7)] += e[eeOffset2 + (-7)];
		e[eeOffset2 + (-6)] = k00 * A6 - k11 * A7;
		e[eeOffset2 + (-7)] = k11 * A6 + k00 * A7;
		eeOffset0 -= k0;
		eeOffset2 -= k0;
	}
};
kha_audio2_ogg_tools_Mdct.iter54 = function(e,zOffset) {
	var t0 = e[zOffset];
	var t1 = e[zOffset + (-4)];
	var k00 = t0 - t1;
	var y0 = t0 + t1;
	t0 = e[zOffset + (-2)];
	t1 = e[zOffset + (-6)];
	var y2 = t0 + t1;
	var k22 = t0 - t1;
	e[zOffset] = y0 + y2;
	e[zOffset + (-2)] = y0 - y2;
	var k33 = e[zOffset + (-3)] - e[zOffset + (-7)];
	e[zOffset + (-4)] = k00 + k33;
	e[zOffset + (-6)] = k00 - k33;
	t0 = e[zOffset + (-1)];
	t1 = e[zOffset + (-5)];
	var k11 = t0 - t1;
	var y1 = t0 + t1;
	var y3 = e[zOffset + (-3)] + e[zOffset + (-7)];
	e[zOffset + (-1)] = y1 + y3;
	e[zOffset + (-3)] = y1 - y3;
	e[zOffset + (-5)] = k11 - k22;
	e[zOffset + (-7)] = k11 + k22;
};
kha_audio2_ogg_tools_Mdct.step3InnerSLoopLd654 = function(n,e,i_off,a,baseN) {
	var A2 = a[baseN >> 3];
	var zOffset = i_off;
	var baseOffset = i_off - 16 * n;
	while(zOffset > baseOffset) {
		var t0 = e[zOffset];
		var t1 = e[zOffset + (-8)];
		e[zOffset + (-8)] = t0 - t1;
		e[zOffset] = t0 + t1;
		t0 = e[zOffset + (-1)];
		t1 = e[zOffset + (-9)];
		e[zOffset + (-9)] = t0 - t1;
		e[zOffset + (-1)] = t0 + t1;
		t0 = e[zOffset + (-2)];
		t1 = e[zOffset + (-10)];
		var k00 = t0 - t1;
		e[zOffset + (-2)] = t0 + t1;
		t0 = e[zOffset + (-3)];
		t1 = e[zOffset + (-11)];
		var k11 = t0 - t1;
		e[zOffset + (-3)] = t0 + t1;
		e[zOffset + (-10)] = (k00 + k11) * A2;
		e[zOffset + (-11)] = (k11 - k00) * A2;
		t0 = e[zOffset + (-4)];
		t1 = e[zOffset + (-12)];
		k00 = t1 - t0;
		e[zOffset + (-4)] = t0 + t1;
		t0 = e[zOffset + (-5)];
		t1 = e[zOffset + (-13)];
		k11 = t0 - t1;
		e[zOffset + (-5)] = t0 + t1;
		e[zOffset + (-12)] = k11;
		e[zOffset + (-13)] = k00;
		t0 = e[zOffset + (-6)];
		t1 = e[zOffset + (-14)];
		k00 = t1 - t0;
		e[zOffset + (-6)] = t0 + t1;
		t0 = e[zOffset + (-7)];
		t1 = e[zOffset + (-15)];
		k11 = t0 - t1;
		e[zOffset + (-7)] = t0 + t1;
		e[zOffset + (-14)] = (k00 + k11) * A2;
		e[zOffset + (-15)] = (k00 - k11) * A2;
		var t01 = e[zOffset];
		var t11 = e[zOffset + (-4)];
		var k001 = t01 - t11;
		var y0 = t01 + t11;
		t01 = e[zOffset + (-2)];
		t11 = e[zOffset + (-6)];
		var y2 = t01 + t11;
		var k22 = t01 - t11;
		e[zOffset] = y0 + y2;
		e[zOffset + (-2)] = y0 - y2;
		var k33 = e[zOffset + (-3)] - e[zOffset + (-7)];
		e[zOffset + (-4)] = k001 + k33;
		e[zOffset + (-6)] = k001 - k33;
		t01 = e[zOffset + (-1)];
		t11 = e[zOffset + (-5)];
		var k111 = t01 - t11;
		var y1 = t01 + t11;
		var y3 = e[zOffset + (-3)] + e[zOffset + (-7)];
		e[zOffset + (-1)] = y1 + y3;
		e[zOffset + (-3)] = y1 - y3;
		e[zOffset + (-5)] = k111 - k22;
		e[zOffset + (-7)] = k111 + k22;
		var zOffset1 = zOffset - 8;
		var t02 = e[zOffset1];
		var t12 = e[zOffset1 + (-4)];
		var k002 = t02 - t12;
		var y01 = t02 + t12;
		t02 = e[zOffset1 + (-2)];
		t12 = e[zOffset1 + (-6)];
		var y21 = t02 + t12;
		var k221 = t02 - t12;
		e[zOffset1] = y01 + y21;
		e[zOffset1 + (-2)] = y01 - y21;
		var k331 = e[zOffset1 + (-3)] - e[zOffset1 + (-7)];
		e[zOffset1 + (-4)] = k002 + k331;
		e[zOffset1 + (-6)] = k002 - k331;
		t02 = e[zOffset1 + (-1)];
		t12 = e[zOffset1 + (-5)];
		var k112 = t02 - t12;
		var y11 = t02 + t12;
		var y31 = e[zOffset1 + (-3)] + e[zOffset1 + (-7)];
		e[zOffset1 + (-1)] = y11 + y31;
		e[zOffset1 + (-3)] = y11 - y31;
		e[zOffset1 + (-5)] = k112 - k221;
		e[zOffset1 + (-7)] = k112 + k221;
		zOffset -= 16;
	}
};
var kha_audio2_ogg_vorbis_Reader = function(input,seekFunc,inputLength) {
	this.seekFunc = seekFunc;
	this.inputLength = inputLength;
	this.decoder = kha_audio2_ogg_vorbis_VorbisDecoder.start(input);
	this.decoder.setupSampleNumber(seekFunc,inputLength);
	this.loopStart = this.get_header().comment.get_loopStart();
	this.loopLength = this.get_header().comment.get_loopLength();
};
$hxClasses["kha.audio2.ogg.vorbis.Reader"] = kha_audio2_ogg_vorbis_Reader;
kha_audio2_ogg_vorbis_Reader.__name__ = true;
kha_audio2_ogg_vorbis_Reader.openFromBytes = function(bytes) {
	var input = new haxe_io_BytesInput(bytes);
	var bytes1 = input;
	return new kha_audio2_ogg_vorbis_Reader(input,function(pos) {
		kha_audio2_ogg_vorbis_Reader.seekBytes(bytes1,pos);
	},bytes.length);
};
kha_audio2_ogg_vorbis_Reader.seekBytes = function(bytes,pos) {
	bytes.set_position(pos);
};
kha_audio2_ogg_vorbis_Reader.readAll = function(bytes,output,useFloat) {
	if(useFloat == null) {
		useFloat = false;
	}
	var input = new haxe_io_BytesInput(bytes);
	var decoder = kha_audio2_ogg_vorbis_VorbisDecoder.start(input);
	var bytes1 = input;
	decoder.setupSampleNumber(function(pos) {
		kha_audio2_ogg_vorbis_Reader.seekBytes(bytes1,pos);
	},bytes.length);
	var header = decoder.header;
	var count = 0;
	var bufferSize = 4096;
	var buffer = kha_arrays_Float32Array._new(bufferSize * header.channel);
	while(true) {
		var n = decoder.read(buffer,bufferSize,header.channel,header.sampleRate,useFloat);
		var _g = 0;
		var _g1 = n * header.channel;
		while(_g < _g1) {
			var i = _g++;
			output.writeFloat(buffer.getFloat32(i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN));
		}
		if(n == 0) {
			break;
		}
		count += n;
	}
	return decoder.header;
};
kha_audio2_ogg_vorbis_Reader.prototype = {
	decoder: null
	,get_header: function() {
		return this.decoder.header;
	}
	,get_totalSample: function() {
		return this.decoder.totalSample;
	}
	,get_totalMillisecond: function() {
		var samples = this.decoder.totalSample;
		var b = this.get_header().sampleRate;
		return UInt.toFloat(samples) / UInt.toFloat(b) * 1000;
	}
	,get_currentSample: function() {
		return this.decoder.currentSample;
	}
	,set_currentSample: function(value) {
		this.decoder.seek(this.seekFunc,this.inputLength,value);
		return this.decoder.currentSample;
	}
	,get_currentMillisecond: function() {
		var samples = this.get_currentSample();
		var b = this.get_header().sampleRate;
		return UInt.toFloat(samples) / UInt.toFloat(b) * 1000;
	}
	,set_currentMillisecond: function(value) {
		this.set_currentSample(Math.floor(UInt.toFloat(this.get_header().sampleRate) * (value / 1000)));
		return this.get_currentMillisecond();
	}
	,loopStart: null
	,loopLength: null
	,seekFunc: null
	,inputLength: null
	,read: function(output,samples,channels,sampleRate,useFloat) {
		if(useFloat == null) {
			useFloat = false;
		}
		this.decoder.ensurePosition(this.seekFunc);
		if(samples == null) {
			samples = this.decoder.totalSample;
		}
		if(channels == null) {
			channels = this.get_header().channel;
		}
		if(sampleRate == null) {
			sampleRate = this.get_header().sampleRate;
		}
		return this.decoder.read(output,samples,channels,sampleRate,useFloat);
	}
	,clone: function() {
		var reader = Object.create(kha_audio2_ogg_vorbis_Reader.prototype);
		reader.seekFunc = this.seekFunc;
		reader.inputLength = this.inputLength;
		reader.decoder = this.decoder.clone(this.seekFunc);
		reader.loopStart = this.loopStart;
		reader.loopLength = this.loopLength;
		return reader;
	}
	,sampleToMillisecond: function(samples) {
		var b = this.get_header().sampleRate;
		return UInt.toFloat(samples) / UInt.toFloat(b) * 1000;
	}
	,millisecondToSample: function(millseconds) {
		return Math.floor(UInt.toFloat(this.get_header().sampleRate) * (millseconds / 1000));
	}
	,__class__: kha_audio2_ogg_vorbis_Reader
};
var kha_audio2_ogg_vorbis_VorbisDecodeState = function(input) {
	this.nextSeg = 0;
	this.firstDecode = false;
	this.bytesInSeg = 0;
	this.validBits = 0;
	this.input = input;
	this.inputPosition = 0;
	this.page = new kha_audio2_ogg_vorbis_data_Page();
	kha_audio2_ogg_tools_Crc32.init();
};
$hxClasses["kha.audio2.ogg.vorbis.VorbisDecodeState"] = kha_audio2_ogg_vorbis_VorbisDecodeState;
kha_audio2_ogg_vorbis_VorbisDecodeState.__name__ = true;
kha_audio2_ogg_vorbis_VorbisDecodeState.prototype = {
	page: null
	,eof: null
	,pFirst: null
	,pLast: null
	,validBits: null
	,inputPosition: null
	,input: null
	,discardSamplesDeferred: null
	,segments: null
	,bytesInSeg: null
	,channelBuffers: null
	,channelBufferStart: null
	,channelBufferEnd: null
	,currentSample: null
	,previousWindow: null
	,previousLength: null
	,finalY: null
	,firstDecode: null
	,nextSeg: null
	,acc: null
	,lastSeg: null
	,lastSegWhich: null
	,endSegWithKnownLoc: null
	,knownLocForPacket: null
	,error: null
	,currentLoc: null
	,currentLocValid: null
	,firstAudioPageOffset: null
	,setup: function(loc0,loc1) {
		this.inputPosition += 1;
		var segmentCount = this.input.readByte();
		this.inputPosition += segmentCount;
		var this1 = new Array(segmentCount);
		var vec = this1;
		var _g = 0;
		var _g1 = segmentCount;
		while(_g < _g1) {
			var i = _g++;
			vec[i] = this.input.readByte();
		}
		this.segments = vec;
		this.endSegWithKnownLoc = -2;
		if(loc0 != -1 || loc1 != -1) {
			var i = segmentCount - 1;
			while(i >= 0) {
				if(this.segments[i] < 255) {
					break;
				}
				if(i >= 0) {
					this.endSegWithKnownLoc = i;
					this.knownLocForPacket = loc0;
				}
				--i;
			}
		}
		if(this.firstDecode) {
			var i = 0;
			var len = 0;
			var p = new kha_audio2_ogg_vorbis_data_ProbedPage();
			var _g = 0;
			var _g1 = segmentCount;
			while(_g < _g1) {
				var i = _g++;
				len += this.segments[i];
			}
			len += 27 + segmentCount;
			p.pageStart = this.firstAudioPageOffset;
			p.pageEnd = p.pageStart + len;
			p.firstDecodedSample = 0;
			p.lastDecodedSample = loc0;
			this.pFirst = p;
		}
		this.nextSeg = 0;
	}
	,clone: function(seekFunc) {
		var state = Object.create(kha_audio2_ogg_vorbis_VorbisDecodeState.prototype);
		seekFunc(this.inputPosition);
		state.input = this.input;
		state.eof = this.eof;
		state.validBits = this.validBits;
		state.discardSamplesDeferred = this.discardSamplesDeferred;
		state.firstDecode = this.firstDecode;
		state.nextSeg = this.nextSeg;
		state.bytesInSeg = this.bytesInSeg;
		state.acc = state.acc;
		state.lastSeg = this.lastSeg;
		state.lastSegWhich = this.lastSegWhich;
		state.currentLoc = this.currentLoc;
		state.currentLocValid = this.currentLocValid;
		state.inputPosition = this.inputPosition;
		state.firstAudioPageOffset = this.firstAudioPageOffset;
		state.error = this.error;
		state.segments = this.segments;
		state.pFirst = this.pFirst;
		state.pLast = this.pLast;
		state.page = this.page.clone();
		return state;
	}
	,next: function() {
		if(this.lastSeg) {
			return 0;
		}
		if(this.nextSeg == -1) {
			this.lastSegWhich = this.segments.length - 1;
			try {
				this.page.start(this);
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				if(((_g1) instanceof kha_audio2_ogg_vorbis_data_ReaderError)) {
					var e = _g1;
					this.lastSeg = true;
					this.error = e;
					return 0;
				} else {
					throw _g;
				}
			}
			if((this.page.flag & 1) == 0) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.CONTINUED_PACKET_FLAG_INVALID,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 171, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "next"}));
			}
		}
		var len = this.segments[this.nextSeg++];
		if(len < 255) {
			this.lastSeg = true;
			this.lastSegWhich = this.nextSeg - 1;
		}
		if(this.nextSeg >= this.segments.length) {
			this.nextSeg = -1;
		}
		this.bytesInSeg = len;
		return len;
	}
	,startPacket: function() {
		while(this.nextSeg == -1) {
			this.page.start(this);
			if((this.page.flag & 1) != 0) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 193, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "startPacket"}));
			}
		}
		this.lastSeg = false;
		this.validBits = 0;
		this.bytesInSeg = 0;
	}
	,maybeStartPacket: function() {
		if(this.nextSeg == -1) {
			var eof = false;
			var x;
			try {
				this.inputPosition += 1;
				x = this.input.readByte();
			} catch( _g ) {
				if(((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
					eof = true;
					x = 0;
				} else {
					throw _g;
				}
			}
			if(eof) {
				return false;
			}
			var tmp;
			var tmp1;
			var tmp2;
			if(x == 79) {
				this.inputPosition += 1;
				tmp2 = this.input.readByte() != 103;
			} else {
				tmp2 = true;
			}
			if(!tmp2) {
				this.inputPosition += 1;
				tmp1 = this.input.readByte() != 103;
			} else {
				tmp1 = true;
			}
			if(!tmp1) {
				this.inputPosition += 1;
				tmp = this.input.readByte() != 83;
			} else {
				tmp = true;
			}
			if(tmp) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 218, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "maybeStartPacket"}));
			}
			this.page.startWithoutCapturePattern(this);
		}
		this.startPacket();
		return true;
	}
	,readBits: function(n) {
		if(this.validBits < 0) {
			return 0;
		} else if(this.validBits < n) {
			if(n > 24) {
				return this.readBits(24) + (this.readBits(n - 24) << 24);
			} else {
				if(this.validBits == 0) {
					this.acc = 0;
				}
				while(true) {
					if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
						this.validBits = -1;
						break;
					} else {
						this.bytesInSeg--;
						this.inputPosition += 1;
						this.acc = this.acc + (this.input.readByte() << this.validBits);
						this.validBits += 8;
					}
					if(!(this.validBits < n)) {
						break;
					}
				}
				if(this.validBits < 0) {
					return 0;
				} else {
					var z = this.acc & (1 << n) - 1;
					this.acc = this.acc >>> n;
					this.validBits -= n;
					return z;
				}
			}
		} else {
			var z = this.acc & (1 << n) - 1;
			this.acc = this.acc >>> n;
			this.validBits -= n;
			return z;
		}
	}
	,readPacketRaw: function() {
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			return -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			return this.input.readByte();
		}
	}
	,readPacket: function() {
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		return x;
	}
	,flushPacket: function() {
		while(this.bytesInSeg != 0 || !this.lastSeg && this.next() != 0) {
			this.bytesInSeg--;
			this.inputPosition += 1;
			this.input.readByte();
		}
	}
	,vorbisValidate: function() {
		var header = new haxe_io_Bytes(new ArrayBuffer(6));
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		header.b[0] = x;
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		header.b[1] = x;
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		header.b[2] = x;
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		header.b[3] = x;
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		header.b[4] = x;
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		header.b[5] = x;
		if(header.toString() != "vorbis") {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"vorbis header",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 301, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "vorbisValidate"}));
		}
	}
	,firstPageValidate: function() {
		if(this.segments.length != 1) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"segmentCount",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 308, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "firstPageValidate"}));
		}
		if(this.segments[0] != 30) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"decodeState head",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 311, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "firstPageValidate"}));
		}
	}
	,startFirstDecode: function() {
		this.firstAudioPageOffset = this.inputPosition;
		this.firstDecode = true;
	}
	,capturePattern: function() {
		var tmp;
		var tmp1;
		var tmp2;
		this.inputPosition += 1;
		if(this.input.readByte() == 79) {
			this.inputPosition += 1;
			tmp2 = this.input.readByte() != 103;
		} else {
			tmp2 = true;
		}
		if(!tmp2) {
			this.inputPosition += 1;
			tmp1 = this.input.readByte() != 103;
		} else {
			tmp1 = true;
		}
		if(!tmp1) {
			this.inputPosition += 1;
			tmp = this.input.readByte() != 83;
		} else {
			tmp = true;
		}
		if(tmp) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 324, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "capturePattern"}));
		}
	}
	,skip: function(len) {
		this.inputPosition += len;
		var this1 = new Array(len);
		var vec = this1;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			vec[i] = this.input.readByte();
		}
	}
	,prepHuffman: function() {
		if(this.validBits <= 24) {
			if(this.validBits == 0) {
				this.acc = 0;
			}
			while(true) {
				if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
					return;
				} else {
					this.bytesInSeg--;
					this.inputPosition += 1;
					this.acc = this.acc + (this.input.readByte() << this.validBits);
					this.validBits += 8;
				}
				if(!(this.validBits <= 24)) {
					break;
				}
			}
		}
	}
	,decode: function(c) {
		if(this.validBits < 10) {
			this.prepHuffman();
		}
		var i = c.fastHuffman[this.acc & 1023];
		var val;
		if(i >= 0) {
			var l = c.codewordLengths[i];
			this.acc = this.acc >>> l;
			this.validBits -= l;
			if(this.validBits < 0) {
				this.validBits = 0;
				val = -1;
			} else {
				val = i;
			}
		} else {
			val = this.decodeScalarRaw(c);
		}
		if(c.sparse) {
			val = c.sortedValues[val];
		}
		return val;
	}
	,decodeRaw: function(c) {
		if(this.validBits < 10) {
			this.prepHuffman();
		}
		var i = c.fastHuffman[this.acc & 1023];
		if(i >= 0) {
			var l = c.codewordLengths[i];
			this.acc = this.acc >>> l;
			this.validBits -= l;
			if(this.validBits < 0) {
				this.validBits = 0;
				return -1;
			} else {
				return i;
			}
		} else {
			return this.decodeScalarRaw(c);
		}
	}
	,isLastByte: function() {
		if(this.bytesInSeg == 0) {
			return this.lastSeg;
		} else {
			return false;
		}
	}
	,finishDecodePacket: function(previousLength,n,r) {
		var left = r.left.start;
		var currentLocValid = false;
		var n2 = n >> 1;
		if(this.firstDecode) {
			this.currentLoc = -n2;
			this.discardSamplesDeferred = n - r.right.end;
			currentLocValid = true;
			this.firstDecode = false;
		} else if(this.discardSamplesDeferred != 0) {
			r.left.start += this.discardSamplesDeferred;
			left = r.left.start;
			this.discardSamplesDeferred = 0;
		} else {
			var tmp = previousLength == 0 && currentLocValid;
		}
		if(this.lastSegWhich == this.endSegWithKnownLoc) {
			if(currentLocValid && (this.page.flag & 4) != 0) {
				var currentEnd = this.knownLocForPacket - (n - r.right.end);
				if(currentEnd < this.currentLoc + r.right.end) {
					var len = currentEnd < this.currentLoc ? 0 : currentEnd - this.currentLoc;
					len += r.left.start;
					this.currentLoc += len;
					return { len : len, left : left, right : r.right.start};
				}
			}
			this.currentLoc = this.knownLocForPacket - (n2 - r.left.start);
			currentLocValid = true;
		}
		if(currentLocValid) {
			this.currentLoc += r.right.start - r.left.start;
		}
		return { len : r.right.end, left : left, right : r.right.start};
	}
	,readInt32: function() {
		this.inputPosition += 4;
		return this.input.readInt32();
	}
	,readByte: function() {
		this.inputPosition += 1;
		return this.input.readByte();
	}
	,read: function(n) {
		this.inputPosition += n;
		var this1 = new Array(n);
		var vec = this1;
		var _g = 0;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			vec[i] = this.input.readByte();
		}
		return vec;
	}
	,readBytes: function(n) {
		this.inputPosition += n;
		return this.input.read(n);
	}
	,readString: function(n) {
		this.inputPosition += n;
		return this.input.readString(n);
	}
	,getSampleNumber: function(seekFunc,inputLength) {
		var restoreOffset = this.inputPosition;
		var previousSafe = UInt.gte(inputLength,65536) && UInt.gte(inputLength - 65536,this.firstAudioPageOffset) ? inputLength - 65536 : this.firstAudioPageOffset;
		seekFunc(this.inputPosition = previousSafe);
		var end = 0;
		var last = false;
		var _g = this.findPage(seekFunc,inputLength);
		switch(_g._hx_index) {
		case 0:
			var e = _g.end;
			var l = _g.last;
			end = e;
			last = l;
			break;
		case 1:
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.CANT_FIND_LAST_PAGE,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 519, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "getSampleNumber"}));
		}
		var lastPageLoc = this.inputPosition;
		_hx_loop1: while(!last) {
			seekFunc(this.inputPosition = end);
			var _g = this.findPage(seekFunc,inputLength);
			switch(_g._hx_index) {
			case 0:
				var e = _g.end;
				var l = _g.last;
				end = e;
				last = l;
				break;
			case 1:
				break _hx_loop1;
			}
			previousSafe = lastPageLoc + 1;
			lastPageLoc = this.inputPosition;
		}
		seekFunc(this.inputPosition = lastPageLoc);
		this.inputPosition += 6;
		var this1 = new Array(6);
		var vec = this1;
		var _g = 0;
		var _g1 = 6;
		while(_g < _g1) {
			var i = _g++;
			vec[i] = this.input.readByte();
		}
		var vorbisHeader = vec;
		this.inputPosition += 4;
		var lo = this.input.readInt32();
		this.inputPosition += 4;
		var hi = this.input.readInt32();
		if(lo == -1 && hi == -1 || hi > 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.CANT_FIND_LAST_PAGE,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 553, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "getSampleNumber"}));
		}
		this.pLast = new kha_audio2_ogg_vorbis_data_ProbedPage();
		this.pLast.pageStart = lastPageLoc;
		this.pLast.pageEnd = end;
		this.pLast.lastDecodedSample = lo;
		this.pLast.firstDecodedSample = null;
		this.pLast.afterPreviousPageStart = previousSafe;
		seekFunc(this.inputPosition = restoreOffset);
		return lo;
	}
	,forcePageResync: function() {
		this.nextSeg = -1;
	}
	,setInputOffset: function(seekFunc,n) {
		seekFunc(this.inputPosition = n);
	}
	,findPage: function(seekFunc,inputLength) {
		try {
			while(true) {
				this.inputPosition += 1;
				var n = this.input.readByte();
				if(n == 79) {
					var retryLoc = this.inputPosition;
					if(retryLoc - 25 > inputLength) {
						return kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.NotFound;
					}
					var tmp;
					var tmp1;
					this.inputPosition += 1;
					if(this.input.readByte() == 103) {
						this.inputPosition += 1;
						tmp1 = this.input.readByte() != 103;
					} else {
						tmp1 = true;
					}
					if(!tmp1) {
						this.inputPosition += 1;
						tmp = this.input.readByte() != 83;
					} else {
						tmp = true;
					}
					if(tmp) {
						continue;
					}
					var this1 = new Array(27);
					var header = this1;
					header[0] = 79;
					header[1] = 103;
					header[2] = 103;
					header[3] = 83;
					this.inputPosition += 1;
					header[4] = this.input.readByte();
					this.inputPosition += 1;
					header[5] = this.input.readByte();
					this.inputPosition += 1;
					header[6] = this.input.readByte();
					this.inputPosition += 1;
					header[7] = this.input.readByte();
					this.inputPosition += 1;
					header[8] = this.input.readByte();
					this.inputPosition += 1;
					header[9] = this.input.readByte();
					this.inputPosition += 1;
					header[10] = this.input.readByte();
					this.inputPosition += 1;
					header[11] = this.input.readByte();
					this.inputPosition += 1;
					header[12] = this.input.readByte();
					this.inputPosition += 1;
					header[13] = this.input.readByte();
					this.inputPosition += 1;
					header[14] = this.input.readByte();
					this.inputPosition += 1;
					header[15] = this.input.readByte();
					this.inputPosition += 1;
					header[16] = this.input.readByte();
					this.inputPosition += 1;
					header[17] = this.input.readByte();
					this.inputPosition += 1;
					header[18] = this.input.readByte();
					this.inputPosition += 1;
					header[19] = this.input.readByte();
					this.inputPosition += 1;
					header[20] = this.input.readByte();
					this.inputPosition += 1;
					header[21] = this.input.readByte();
					this.inputPosition += 1;
					header[22] = this.input.readByte();
					this.inputPosition += 1;
					header[23] = this.input.readByte();
					this.inputPosition += 1;
					header[24] = this.input.readByte();
					this.inputPosition += 1;
					header[25] = this.input.readByte();
					this.inputPosition += 1;
					header[26] = this.input.readByte();
					if(header[4] != 0) {
						seekFunc(this.inputPosition = retryLoc);
						continue;
					}
					var goal = header[22] + (header[23] << 8) + (header[24] << 16) + (header[25] << 24);
					header[22] = 0;
					header[23] = 0;
					header[24] = 0;
					header[25] = 0;
					var crc = 0;
					var _g = 0;
					while(_g < 27) {
						var i = _g++;
						crc = crc << 8 ^ kha_audio2_ogg_tools_Crc32.table[header[i] ^ crc >>> 24];
					}
					var len = 0;
					try {
						var _g1 = 0;
						var _g2 = header[26];
						while(_g1 < _g2) {
							var i1 = _g1++;
							this.inputPosition += 1;
							var s = this.input.readByte();
							crc = crc << 8 ^ kha_audio2_ogg_tools_Crc32.table[s ^ crc >>> 24];
							len += s;
						}
						var _g3 = 0;
						var _g4 = len;
						while(_g3 < _g4) {
							var i2 = _g3++;
							this.inputPosition += 1;
							var byte = this.input.readByte();
							crc = crc << 8 ^ kha_audio2_ogg_tools_Crc32.table[byte ^ crc >>> 24];
						}
					} catch( _g5 ) {
						if(((haxe_Exception.caught(_g5).unwrap()) instanceof haxe_io_Eof)) {
							return kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.NotFound;
						} else {
							throw _g5;
						}
					}
					if(crc == goal) {
						var end = this.inputPosition;
						seekFunc(this.inputPosition = retryLoc - 1);
						return kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.Found(end,(header[5] & 4) != 0);
					}
				}
			}
		} catch( _g ) {
			if(((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				return kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.NotFound;
			} else {
				throw _g;
			}
		}
	}
	,analyzePage: function(seekFunc,h) {
		var z = new kha_audio2_ogg_vorbis_data_ProbedPage();
		var this1 = new Array(255);
		var packetType = this1;
		z.pageStart = this.inputPosition;
		this.inputPosition += 27;
		var this1 = new Array(27);
		var vec = this1;
		var _g = 0;
		var _g1 = 27;
		while(_g < _g1) {
			var i = _g++;
			vec[i] = this.input.readByte();
		}
		var pageHeader = vec;
		var n = pageHeader[26];
		this.inputPosition += n;
		var this1 = new Array(n);
		var vec = this1;
		var _g = 0;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			vec[i] = this.input.readByte();
		}
		var lacing = vec;
		var len = 0;
		var _g = 0;
		var _g1 = pageHeader[26];
		while(_g < _g1) {
			var i = _g++;
			len += lacing[i];
		}
		z.pageEnd = z.pageStart + 27 + pageHeader[26] + len;
		z.lastDecodedSample = pageHeader[6] + (pageHeader[7] << 8) + (pageHeader[8] << 16) + (pageHeader[9] << 16);
		if((pageHeader[5] & 4) != 0) {
			z.firstDecodedSample = null;
			seekFunc(this.inputPosition = z.pageStart);
			return z;
		}
		var numPacket = 0;
		var packetStart = (pageHeader[5] & 1) == 0;
		var modeCount = h.modes.length;
		var _g = 0;
		var _g1 = pageHeader[26];
		while(_g < _g1) {
			var i = _g++;
			if(packetStart) {
				if(lacing[i] == 0) {
					seekFunc(this.inputPosition = z.pageStart);
					return null;
				}
				this.inputPosition += 1;
				var n = this.input.readByte();
				if((n & 1) != 0) {
					seekFunc(this.inputPosition = z.pageStart);
					return null;
				}
				n >>= 1;
				var n1 = modeCount - 1;
				var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
				var b = n1 < 16384 ? n1 < 16 ? log2_4[n1] : n1 < 512 ? 5 + log2_4[n1 >> 5] : 10 + log2_4[n1 >> 10] : n1 < 16777216 ? n1 < 524288 ? 15 + log2_4[n1 >> 15] : 20 + log2_4[n1 >> 20] : n1 < 536870912 ? 25 + log2_4[n1 >> 25] : n1 < -2147483648 ? 30 + log2_4[n1 >> 30] : 0;
				n &= (1 << b) - 1;
				if(n >= modeCount) {
					seekFunc(this.inputPosition = z.pageStart);
					return null;
				}
				packetType[numPacket++] = h.modes[n].blockflag;
				var len = lacing[i] - 1;
				this.inputPosition += len;
				var this1 = new Array(len);
				var vec = this1;
				var _g2 = 0;
				var _g3 = len;
				while(_g2 < _g3) {
					var i1 = _g2++;
					vec[i1] = this.input.readByte();
				}
			} else {
				var len1 = lacing[i];
				this.inputPosition += len1;
				var this2 = new Array(len1);
				var vec1 = this2;
				var _g4 = 0;
				var _g5 = len1;
				while(_g4 < _g5) {
					var i2 = _g4++;
					vec1[i2] = this.input.readByte();
				}
			}
			packetStart = lacing[i] < 255;
		}
		var samples = 0;
		if(numPacket > 1) {
			samples += packetType[numPacket - 1] ? h.blocksize1 : h.blocksize0;
		}
		var i = numPacket - 2;
		while(i >= 1) {
			--i;
			if(packetType[i]) {
				if(packetType[i + 1]) {
					samples += h.blocksize1 >> 1;
				} else {
					samples += (h.blocksize1 - h.blocksize0 >> 2) + (h.blocksize0 >> 1);
				}
			} else {
				samples += h.blocksize0 >> 1;
			}
			--i;
		}
		z.firstDecodedSample = z.lastDecodedSample - samples;
		seekFunc(this.inputPosition = z.pageStart);
		return z;
	}
	,decodeScalarRaw: function(c) {
		this.prepHuffman();
		var codewordLengths = c.codewordLengths;
		var codewords = c.codewords;
		var sortedCodewords = c.sortedCodewords;
		if(c.entries > 8 ? sortedCodewords != null : codewords != null) {
			var n = this.acc;
			n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
			n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
			n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
			n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
			var code = n >>> 16 | n << 16;
			var x = 0;
			var n = c.sortedEntries;
			while(n > 1) {
				var m = x + (n >> 1);
				if(UInt.gte(code,sortedCodewords[m])) {
					x = m;
					n -= n >> 1;
				} else {
					n >>= 1;
				}
			}
			if(!c.sparse) {
				x = c.sortedValues[x];
			}
			var len = codewordLengths[x];
			if(this.validBits >= len) {
				this.acc = this.acc >>> len;
				this.validBits -= len;
				return x;
			}
			this.validBits = 0;
			return -1;
		}
		var _g = 0;
		var _g1 = c.entries;
		while(_g < _g1) {
			var i = _g++;
			var cl = codewordLengths[i];
			if(cl == 255) {
				continue;
			}
			if(codewords[i] == (this.acc & (1 << cl) - 1)) {
				if(this.validBits >= cl) {
					this.acc = this.acc >>> cl;
					this.validBits -= cl;
					return i;
				}
				this.validBits = 0;
				return -1;
			}
		}
		this.error = new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 847, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "decodeScalarRaw"});
		this.validBits = 0;
		return -1;
	}
	,__class__: kha_audio2_ogg_vorbis_VorbisDecodeState
};
var kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult = $hxEnums["kha.audio2.ogg.vorbis._VorbisDecodeState.FindPageResult"] = { __ename__:true,__constructs__:null
	,Found: ($_=function(end,last) { return {_hx_index:0,end:end,last:last,__enum__:"kha.audio2.ogg.vorbis._VorbisDecodeState.FindPageResult",toString:$estr}; },$_._hx_name="Found",$_.__params__ = ["end","last"],$_)
	,NotFound: {_hx_name:"NotFound",_hx_index:1,__enum__:"kha.audio2.ogg.vorbis._VorbisDecodeState.FindPageResult",toString:$estr}
};
kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.__constructs__ = [kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.Found,kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.NotFound];
var kha_audio2_ogg_vorbis_VorbisDecoder = function(header,decodeState) {
	this.header = header;
	this.decodeState = decodeState;
	this.totalSample = null;
	this.currentSample = 0;
	this.previousLength = 0;
	var this1 = new Array(header.channel);
	this.channelBuffers = this1;
	var this1 = new Array(header.channel);
	this.previousWindow = this1;
	var this1 = new Array(header.channel);
	this.finalY = this1;
	var _g = 0;
	var _g1 = header.channel;
	while(_g < _g1) {
		var i = _g++;
		var this1 = this.channelBuffers;
		var this2 = new Array(header.blocksize1);
		var vec = this2;
		this1[i] = vec;
		var this3 = this.previousWindow;
		var this4 = new Array(header.blocksize1 / 2 | 0);
		var vec1 = this4;
		this3[i] = vec1;
		this.finalY[i] = [];
	}
	var this1 = new Array(2);
	this.a = this1;
	var this1 = new Array(2);
	this.b = this1;
	var this1 = new Array(2);
	this.c = this1;
	var this1 = new Array(2);
	this.window = this1;
	var this1 = new Array(2);
	this.bitReverseData = this1;
	this.initBlocksize(0,header.blocksize0);
	this.initBlocksize(1,header.blocksize1);
};
$hxClasses["kha.audio2.ogg.vorbis.VorbisDecoder"] = kha_audio2_ogg_vorbis_VorbisDecoder;
kha_audio2_ogg_vorbis_VorbisDecoder.__name__ = true;
kha_audio2_ogg_vorbis_VorbisDecoder.start = function(input) {
	var decodeState = new kha_audio2_ogg_vorbis_VorbisDecodeState(input);
	var header = kha_audio2_ogg_vorbis_data_Header.read(decodeState);
	var decoder = new kha_audio2_ogg_vorbis_VorbisDecoder(header,decodeState);
	decodeState.startFirstDecode();
	decoder.pumpFirstFrame();
	return decoder;
};
kha_audio2_ogg_vorbis_VorbisDecoder.prototype = {
	previousWindow: null
	,previousLength: null
	,finalY: null
	,a: null
	,b: null
	,c: null
	,window: null
	,bitReverseData: null
	,channelBuffers: null
	,channelBufferStart: null
	,channelBufferEnd: null
	,header: null
	,currentSample: null
	,totalSample: null
	,decodeState: null
	,read: function(output,samples,channels,sampleRate,useFloat) {
		var b = this.header.sampleRate;
		if((UInt.toFloat(sampleRate) % UInt.toFloat(b) | 0) != 0) {
			throw haxe_Exception.thrown("Unsupported sampleRate : can't convert " + (this.header.sampleRate == null ? "null" : Std.string(UInt.toFloat(this.header.sampleRate))) + " to " + sampleRate);
		}
		if(channels % this.header.channel != 0) {
			throw haxe_Exception.thrown("Unsupported channels : can't convert " + this.header.channel + " to " + channels);
		}
		var b = this.header.sampleRate;
		var sampleRepeat = UInt.toFloat(sampleRate) / UInt.toFloat(b) | 0;
		var channelRepeat = channels / this.header.channel | 0;
		var n = 0;
		var len = Math.floor(samples / sampleRepeat);
		if(this.totalSample != null && len > this.totalSample - this.currentSample) {
			len = this.totalSample - this.currentSample;
		}
		var index = 0;
		while(n < len) {
			var k = this.channelBufferEnd - this.channelBufferStart;
			if(k >= len - n) {
				k = len - n;
			}
			var _g = this.channelBufferStart;
			var _g1 = this.channelBufferStart + k;
			while(_g < _g1) {
				var j = _g++;
				var _g2 = 0;
				var _g3 = sampleRepeat;
				while(_g2 < _g3) {
					var sr = _g2++;
					var _g4 = 0;
					var _g5 = this.header.channel;
					while(_g4 < _g5) {
						var i = _g4++;
						var _g6 = 0;
						var _g7 = channelRepeat;
						while(_g6 < _g7) {
							var cr = _g6++;
							var value = this.channelBuffers[i][j];
							if(value > 1) {
								value = 1;
							} else if(value < -1) {
								value = -1;
							}
							if(useFloat) {
								output.setFloat32(index * 4,value,true);
								++index;
							}
						}
					}
				}
			}
			n += k;
			this.channelBufferStart += k;
			if(n == len || this.getFrameFloat() == 0) {
				break;
			}
		}
		var _g = n;
		var _g1 = len;
		while(_g < _g1) {
			var j = _g++;
			var _g2 = 0;
			var _g3 = sampleRepeat;
			while(_g2 < _g3) {
				var sr = _g2++;
				var _g4 = 0;
				var _g5 = this.header.channel;
				while(_g4 < _g5) {
					var i = _g4++;
					var _g6 = 0;
					var _g7 = channelRepeat;
					while(_g6 < _g7) {
						var cr = _g6++;
						if(useFloat) {
							output.setFloat32(index * 4,0,true);
							++index;
						}
					}
				}
			}
		}
		this.currentSample += len;
		return len * sampleRepeat;
	}
	,skipSamples: function(len) {
		var n = 0;
		if(this.totalSample != null && len > this.totalSample - this.currentSample) {
			len = this.totalSample - this.currentSample;
		}
		while(n < len) {
			var k = this.channelBufferEnd - this.channelBufferStart;
			if(k >= len - n) {
				k = len - n;
			}
			n += k;
			this.channelBufferStart += k;
			if(n == len || this.getFrameFloat() == 0) {
				break;
			}
		}
		this.currentSample += len;
		return len;
	}
	,setupSampleNumber: function(seekFunc,inputLength) {
		if(this.totalSample == null) {
			this.totalSample = this.decodeState.getSampleNumber(seekFunc,inputLength);
		}
	}
	,seek: function(seekFunc,inputLength,sampleNumber) {
		if(this.currentSample == sampleNumber) {
			return;
		}
		if(this.totalSample == null) {
			this.setupSampleNumber(seekFunc,inputLength);
			if(this.totalSample == 0) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.CANT_FIND_LAST_PAGE,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 187, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
			}
		}
		if(sampleNumber < 0) {
			sampleNumber = 0;
		}
		var p0 = this.decodeState.pFirst;
		var p1 = this.decodeState.pLast;
		if(sampleNumber >= p1.lastDecodedSample) {
			sampleNumber = p1.lastDecodedSample - 1;
		}
		if(sampleNumber < p0.lastDecodedSample) {
			this.seekFrameFromPage(seekFunc,p0.pageStart,0,sampleNumber);
		} else {
			var attempts = 0;
			while(p0.pageEnd < p1.pageStart) {
				var startOffset = p0.pageEnd;
				var endOffset = p1.afterPreviousPageStart;
				var startSample = p0.lastDecodedSample;
				var endSample = p1.lastDecodedSample;
				if(startSample == null || endSample == null) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 219, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
				}
				if(UInt.gt(endOffset,startOffset + 4000)) {
					endOffset = endOffset - 4000;
				}
				var probe = startOffset + Math.floor(UInt.toFloat(endOffset - startOffset) / UInt.toFloat(endSample - startSample) * (sampleNumber - startSample));
				if(attempts >= 4) {
					var probe2 = startOffset + (endOffset - startOffset >>> 1);
					probe = attempts >= 8 ? probe2 : UInt.gt(probe2,probe) ? probe + (probe2 - probe >>> 1) : probe2 + (probe - probe2 >>> 1);
				}
				++attempts;
				seekFunc(this.decodeState.inputPosition = probe);
				var _g = this.decodeState.findPage(seekFunc,inputLength);
				switch(_g._hx_index) {
				case 0:
					var _g1 = _g.end;
					var _g2 = _g.last;
					break;
				case 1:
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 249, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
				}
				var q = this.decodeState.analyzePage(seekFunc,this.header);
				if(q == null) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 255, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
				}
				q.afterPreviousPageStart = probe;
				if(q.pageStart == p1.pageStart) {
					p1 = q;
					continue;
				}
				if(sampleNumber < q.lastDecodedSample) {
					p1 = q;
				} else {
					p0 = q;
				}
			}
			if(p0.lastDecodedSample <= sampleNumber && sampleNumber < p1.lastDecodedSample) {
				this.seekFrameFromPage(seekFunc,p1.pageStart,p0.lastDecodedSample,sampleNumber);
			} else {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 275, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
			}
		}
	}
	,seekFrameFromPage: function(seekFunc,pageStart,firstSample,targetSample) {
		var frame = 0;
		var frameStart = firstSample;
		seekFunc(this.decodeState.inputPosition = pageStart);
		this.decodeState.nextSeg = -1;
		var leftEnd = 0;
		var leftStart = 0;
		var prevState = null;
		var lastState = null;
		while(true) {
			prevState = lastState;
			lastState = this.decodeState.clone(seekFunc);
			var initialResult = this.decodeInitial();
			if(initialResult == null) {
				lastState = prevState;
				break;
			}
			leftStart = initialResult.left.start;
			leftEnd = initialResult.left.end;
			var start = frame == 0 ? leftEnd : leftStart;
			if(targetSample < frameStart + initialResult.right.start - start) {
				break;
			}
			var _this = this.decodeState;
			while(_this.bytesInSeg != 0 || !_this.lastSeg && _this.next() != 0) {
				_this.bytesInSeg--;
				_this.inputPosition += 1;
				_this.input.readByte();
			}
			frameStart += initialResult.right.start - start;
			++frame;
		}
		this.decodeState = lastState;
		seekFunc(this.decodeState.inputPosition);
		this.previousLength = 0;
		this.pumpFirstFrame();
		this.currentSample = frameStart;
		this.skipSamples(targetSample - frameStart);
	}
	,clone: function(seekFunc) {
		var decoder = Object.create(kha_audio2_ogg_vorbis_VorbisDecoder.prototype);
		decoder.currentSample = this.currentSample;
		decoder.totalSample = this.totalSample;
		decoder.previousLength = this.previousLength;
		decoder.channelBufferStart = this.channelBufferStart;
		decoder.channelBufferEnd = this.channelBufferEnd;
		decoder.a = this.a;
		decoder.b = this.b;
		decoder.c = this.c;
		decoder.window = this.window;
		decoder.bitReverseData = this.bitReverseData;
		decoder.header = this.header;
		decoder.decodeState = this.decodeState.clone(seekFunc);
		var this1 = new Array(this.header.channel);
		decoder.channelBuffers = this1;
		var this1 = new Array(this.header.channel);
		decoder.previousWindow = this1;
		var this1 = new Array(this.header.channel);
		decoder.finalY = this1;
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			decoder.channelBuffers[i] = kha_audio2_ogg_vorbis_VorbisTools.copyVector(this.channelBuffers[i]);
			decoder.previousWindow[i] = kha_audio2_ogg_vorbis_VorbisTools.copyVector(this.previousWindow[i]);
			decoder.finalY[i] = Lambda.array(this.finalY[i]);
		}
		return decoder;
	}
	,ensurePosition: function(seekFunc) {
		seekFunc(this.decodeState.inputPosition);
	}
	,getFrameFloat: function() {
		var result = this.decodePacket();
		if(result == null) {
			this.channelBufferStart = this.channelBufferEnd = 0;
			return 0;
		}
		var len = this.finishFrame(result);
		this.channelBufferStart = result.left;
		this.channelBufferEnd = result.left + len;
		return len;
	}
	,pumpFirstFrame: function() {
		this.finishFrame(this.decodePacket());
	}
	,finishFrame: function(r) {
		var len = r.len;
		var right = r.right;
		var left = r.left;
		if(this.previousLength != 0) {
			var n = this.previousLength;
			var w = this.getWindow(n);
			var _g = 0;
			var _g1 = this.header.channel;
			while(_g < _g1) {
				var i = _g++;
				var cb = this.channelBuffers[i];
				var pw = this.previousWindow[i];
				var _g2 = 0;
				var _g3 = n;
				while(_g2 < _g3) {
					var j = _g2++;
					cb[left + j] = cb[left + j] * w[j] + pw[j] * w[n - 1 - j];
				}
			}
		}
		var prev = this.previousLength;
		this.previousLength = len - right;
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			var pw = this.previousWindow[i];
			var cb = this.channelBuffers[i];
			var _g2 = 0;
			var _g3 = len - right;
			while(_g2 < _g3) {
				var j = _g2++;
				pw[j] = cb[right + j];
			}
		}
		if(prev == 0) {
			return 0;
		}
		if(len < right) {
			right = len;
		}
		return right - left;
	}
	,getWindow: function(len) {
		len <<= 1;
		if(len == this.header.blocksize0) {
			return this.window[0];
		} else if(len == this.header.blocksize1) {
			return this.window[1];
		} else {
			return null;
		}
	}
	,initBlocksize: function(bs,n) {
		var n2 = n >> 1;
		var n4 = n >> 2;
		var n8 = n >> 3;
		var this1 = this.a;
		var this2 = new Array(n2);
		this1[bs] = this2;
		var this1 = this.b;
		var this2 = new Array(n2);
		this1[bs] = this2;
		var this1 = this.c;
		var this2 = new Array(n4);
		this1[bs] = this2;
		var this1 = this.window;
		var this2 = new Array(n2);
		this1[bs] = this2;
		var this1 = this.bitReverseData;
		var this2 = new Array(n8);
		this1[bs] = this2;
		kha_audio2_ogg_vorbis_VorbisTools.computeTwiddleFactors(n,this.a[bs],this.b[bs],this.c[bs]);
		kha_audio2_ogg_vorbis_VorbisTools.computeWindow(n,this.window[bs]);
		kha_audio2_ogg_vorbis_VorbisTools.computeBitReverse(n,this.bitReverseData[bs]);
	}
	,inverseMdct: function(buffer,n,blocktype) {
		var bt = blocktype ? 1 : 0;
		var a = this.a[bt];
		var b = this.b[bt];
		var c = this.c[bt];
		var bitReverse = this.bitReverseData[bt];
		var n2 = n >> 1;
		var n4 = n >> 2;
		var n8 = n >> 3;
		var this1 = new Array(n2);
		var buf2 = this1;
		var dOffset = n2 - 2;
		var aaOffset = 0;
		var eOffset = 0;
		var eStopOffset = n2;
		while(eOffset != eStopOffset) {
			buf2[dOffset + 1] = buffer[eOffset] * a[aaOffset] - buffer[eOffset + 2] * a[aaOffset + 1];
			buf2[dOffset] = buffer[eOffset] * a[aaOffset + 1] + buffer[eOffset + 2] * a[aaOffset];
			dOffset -= 2;
			aaOffset += 2;
			eOffset += 4;
		}
		eOffset = n2 - 3;
		while(dOffset >= 0) {
			buf2[dOffset + 1] = -buffer[eOffset + 2] * a[aaOffset] - -buffer[eOffset] * a[aaOffset + 1];
			buf2[dOffset] = -buffer[eOffset + 2] * a[aaOffset + 1] + -buffer[eOffset] * a[aaOffset];
			dOffset -= 2;
			aaOffset += 2;
			eOffset -= 4;
		}
		var u = buffer;
		var v = buf2;
		var aaOffset = n2 - 8;
		var eOffset0 = n4;
		var eOffset1 = 0;
		var dOffset0 = n4;
		var dOffset1 = 0;
		while(aaOffset >= 0) {
			var v41_21 = v[eOffset0 + 1] - v[eOffset1 + 1];
			var v40_20 = v[eOffset0] - v[eOffset1];
			u[dOffset0 + 1] = v[eOffset0 + 1] + v[eOffset1 + 1];
			u[dOffset0] = v[eOffset0] + v[eOffset1];
			u[dOffset1 + 1] = v41_21 * a[aaOffset + 4] - v40_20 * a[aaOffset + 5];
			u[dOffset1] = v40_20 * a[aaOffset + 4] + v41_21 * a[aaOffset + 5];
			v41_21 = v[eOffset0 + 3] - v[eOffset1 + 3];
			v40_20 = v[eOffset0 + 2] - v[eOffset1 + 2];
			u[dOffset0 + 3] = v[eOffset0 + 3] + v[eOffset1 + 3];
			u[dOffset0 + 2] = v[eOffset0 + 2] + v[eOffset1 + 2];
			u[dOffset1 + 3] = v41_21 * a[aaOffset] - v40_20 * a[aaOffset + 1];
			u[dOffset1 + 2] = v40_20 * a[aaOffset] + v41_21 * a[aaOffset + 1];
			aaOffset -= 8;
			dOffset0 += 4;
			dOffset1 += 4;
			eOffset0 += 4;
			eOffset1 += 4;
		}
		var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
		var ld = (n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0) - 1;
		var i_off = n2 - 1 - n4 * 0;
		var eeOffset0 = i_off;
		var eeOffset2 = i_off + -(n >> 3);
		var aOffset = 0;
		var i = (n >> 4 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = u[eeOffset0] - u[eeOffset2];
			var k01_21 = u[eeOffset0 + (-1)] - u[eeOffset2 + (-1)];
			u[eeOffset0] += u[eeOffset2];
			u[eeOffset0 + (-1)] += u[eeOffset2 + (-1)];
			u[eeOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = u[eeOffset0 + (-2)] - u[eeOffset2 + (-2)];
			k01_21 = u[eeOffset0 + (-3)] - u[eeOffset2 + (-3)];
			u[eeOffset0 + (-2)] += u[eeOffset2 + (-2)];
			u[eeOffset0 + (-3)] += u[eeOffset2 + (-3)];
			u[eeOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = u[eeOffset0 + (-4)] - u[eeOffset2 + (-4)];
			k01_21 = u[eeOffset0 + (-5)] - u[eeOffset2 + (-5)];
			u[eeOffset0 + (-4)] += u[eeOffset2 + (-4)];
			u[eeOffset0 + (-5)] += u[eeOffset2 + (-5)];
			u[eeOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = u[eeOffset0 + (-6)] - u[eeOffset2 + (-6)];
			k01_21 = u[eeOffset0 + (-7)] - u[eeOffset2 + (-7)];
			u[eeOffset0 + (-6)] += u[eeOffset2 + (-6)];
			u[eeOffset0 + (-7)] += u[eeOffset2 + (-7)];
			u[eeOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			eeOffset0 -= 8;
			eeOffset2 -= 8;
		}
		var i_off = n2 - 1 - n4;
		var eeOffset0 = i_off;
		var eeOffset2 = i_off + -(n >> 3);
		var aOffset = 0;
		var i = (n >> 4 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = u[eeOffset0] - u[eeOffset2];
			var k01_21 = u[eeOffset0 + (-1)] - u[eeOffset2 + (-1)];
			u[eeOffset0] += u[eeOffset2];
			u[eeOffset0 + (-1)] += u[eeOffset2 + (-1)];
			u[eeOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = u[eeOffset0 + (-2)] - u[eeOffset2 + (-2)];
			k01_21 = u[eeOffset0 + (-3)] - u[eeOffset2 + (-3)];
			u[eeOffset0 + (-2)] += u[eeOffset2 + (-2)];
			u[eeOffset0 + (-3)] += u[eeOffset2 + (-3)];
			u[eeOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = u[eeOffset0 + (-4)] - u[eeOffset2 + (-4)];
			k01_21 = u[eeOffset0 + (-5)] - u[eeOffset2 + (-5)];
			u[eeOffset0 + (-4)] += u[eeOffset2 + (-4)];
			u[eeOffset0 + (-5)] += u[eeOffset2 + (-5)];
			u[eeOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = u[eeOffset0 + (-6)] - u[eeOffset2 + (-6)];
			k01_21 = u[eeOffset0 + (-7)] - u[eeOffset2 + (-7)];
			u[eeOffset0 + (-6)] += u[eeOffset2 + (-6)];
			u[eeOffset0 + (-7)] += u[eeOffset2 + (-7)];
			u[eeOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			eeOffset0 -= 8;
			eeOffset2 -= 8;
		}
		var d0 = n2 - 1 - n8 * 0;
		var aOffset = 0;
		var eOffset0 = d0;
		var eOffset2 = d0 + -(n >> 4);
		var i = (n >> 5 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = u[eOffset0] - u[eOffset2];
			var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
			u[eOffset0] += u[eOffset2];
			u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
			u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
			k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
			u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
			u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
			u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
			k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
			u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
			u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
			u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
			k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
			u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
			u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
			u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			eOffset0 -= 8;
			eOffset2 -= 8;
			aOffset += 16;
		}
		var d0 = n2 - 1 - n8;
		var aOffset = 0;
		var eOffset0 = d0;
		var eOffset2 = d0 + -(n >> 4);
		var i = (n >> 5 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = u[eOffset0] - u[eOffset2];
			var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
			u[eOffset0] += u[eOffset2];
			u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
			u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
			k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
			u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
			u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
			u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
			k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
			u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
			u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
			u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
			k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
			u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
			u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
			u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			eOffset0 -= 8;
			eOffset2 -= 8;
			aOffset += 16;
		}
		var d0 = n2 - 1 - n8 * 2;
		var aOffset = 0;
		var eOffset0 = d0;
		var eOffset2 = d0 + -(n >> 4);
		var i = (n >> 5 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = u[eOffset0] - u[eOffset2];
			var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
			u[eOffset0] += u[eOffset2];
			u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
			u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
			k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
			u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
			u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
			u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
			k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
			u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
			u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
			u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
			k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
			u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
			u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
			u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			eOffset0 -= 8;
			eOffset2 -= 8;
			aOffset += 16;
		}
		var d0 = n2 - 1 - n8 * 3;
		var aOffset = 0;
		var eOffset0 = d0;
		var eOffset2 = d0 + -(n >> 4);
		var i = (n >> 5 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = u[eOffset0] - u[eOffset2];
			var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
			u[eOffset0] += u[eOffset2];
			u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
			u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
			k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
			u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
			u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
			u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
			k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
			u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
			u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
			u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
			k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
			u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
			u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
			u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			eOffset0 -= 8;
			eOffset2 -= 8;
			aOffset += 16;
		}
		var _g = 2;
		var _g1 = ld - 3 >> 1;
		while(_g < _g1) {
			var l = _g++;
			var k0 = n >> l + 2;
			var k0_2 = k0 >> 1;
			var lim = 1 << l + 1;
			var _g2 = 0;
			var _g3 = lim;
			while(_g2 < _g3) {
				var i = _g2++;
				var d0 = n2 - 1 - k0 * i;
				var k1 = 1 << l + 3;
				var aOffset = 0;
				var eOffset0 = d0;
				var eOffset2 = d0 + -k0_2;
				var i1 = (n >> l + 4 >> 2) + 1;
				while(--i1 > 0) {
					var k00_20 = u[eOffset0] - u[eOffset2];
					var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
					u[eOffset0] += u[eOffset2];
					u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
					u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
					u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
					aOffset += k1;
					k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
					k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
					u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
					u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
					u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
					u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
					aOffset += k1;
					k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
					k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
					u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
					u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
					u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
					u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
					aOffset += k1;
					k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
					k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
					u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
					u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
					u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
					u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
					eOffset0 -= 8;
					eOffset2 -= 8;
					aOffset += k1;
				}
			}
		}
		var _g = ld - 3 >> 1;
		var _g1 = ld - 6;
		while(_g < _g1) {
			var l = _g++;
			var k0 = n >> l + 2;
			var k1 = 1 << l + 3;
			var k0_2 = k0 >> 1;
			var rlim = n >> l + 6;
			var lim = 1 << l + 1;
			var aOffset = 0;
			var i_off = n2 - 1;
			var r = rlim + 1;
			while(--r > 0) {
				var A0 = a[aOffset];
				var A1 = a[aOffset + 1];
				var A2 = a[aOffset + k1];
				var A3 = a[aOffset + k1 + 1];
				var A4 = a[aOffset + k1 * 2];
				var A5 = a[aOffset + k1 * 2 + 1];
				var A6 = a[aOffset + k1 * 3];
				var A7 = a[aOffset + k1 * 3 + 1];
				var eeOffset0 = i_off;
				var eeOffset2 = i_off + -k0_2;
				var i = lim + 1;
				while(--i > 0) {
					var k00 = u[eeOffset0] - u[eeOffset2];
					var k11 = u[eeOffset0 + (-1)] - u[eeOffset2 + (-1)];
					u[eeOffset0] += u[eeOffset2];
					u[eeOffset0 + (-1)] += u[eeOffset2 + (-1)];
					u[eeOffset2] = k00 * A0 - k11 * A1;
					u[eeOffset2 + (-1)] = k11 * A0 + k00 * A1;
					k00 = u[eeOffset0 + (-2)] - u[eeOffset2 + (-2)];
					k11 = u[eeOffset0 + (-3)] - u[eeOffset2 + (-3)];
					u[eeOffset0 + (-2)] += u[eeOffset2 + (-2)];
					u[eeOffset0 + (-3)] += u[eeOffset2 + (-3)];
					u[eeOffset2 + (-2)] = k00 * A2 - k11 * A3;
					u[eeOffset2 + (-3)] = k11 * A2 + k00 * A3;
					k00 = u[eeOffset0 + (-4)] - u[eeOffset2 + (-4)];
					k11 = u[eeOffset0 + (-5)] - u[eeOffset2 + (-5)];
					u[eeOffset0 + (-4)] += u[eeOffset2 + (-4)];
					u[eeOffset0 + (-5)] += u[eeOffset2 + (-5)];
					u[eeOffset2 + (-4)] = k00 * A4 - k11 * A5;
					u[eeOffset2 + (-5)] = k11 * A4 + k00 * A5;
					k00 = u[eeOffset0 + (-6)] - u[eeOffset2 + (-6)];
					k11 = u[eeOffset0 + (-7)] - u[eeOffset2 + (-7)];
					u[eeOffset0 + (-6)] += u[eeOffset2 + (-6)];
					u[eeOffset0 + (-7)] += u[eeOffset2 + (-7)];
					u[eeOffset2 + (-6)] = k00 * A6 - k11 * A7;
					u[eeOffset2 + (-7)] = k11 * A6 + k00 * A7;
					eeOffset0 -= k0;
					eeOffset2 -= k0;
				}
				aOffset += k1 * 4;
				i_off -= 8;
			}
		}
		var i_off = n2 - 1;
		var A2 = a[n >> 3];
		var zOffset = i_off;
		var baseOffset = i_off - 16 * (n >> 5);
		while(zOffset > baseOffset) {
			var t0 = u[zOffset];
			var t1 = u[zOffset + (-8)];
			u[zOffset + (-8)] = t0 - t1;
			u[zOffset] = t0 + t1;
			t0 = u[zOffset + (-1)];
			t1 = u[zOffset + (-9)];
			u[zOffset + (-9)] = t0 - t1;
			u[zOffset + (-1)] = t0 + t1;
			t0 = u[zOffset + (-2)];
			t1 = u[zOffset + (-10)];
			var k00 = t0 - t1;
			u[zOffset + (-2)] = t0 + t1;
			t0 = u[zOffset + (-3)];
			t1 = u[zOffset + (-11)];
			var k11 = t0 - t1;
			u[zOffset + (-3)] = t0 + t1;
			u[zOffset + (-10)] = (k00 + k11) * A2;
			u[zOffset + (-11)] = (k11 - k00) * A2;
			t0 = u[zOffset + (-4)];
			t1 = u[zOffset + (-12)];
			k00 = t1 - t0;
			u[zOffset + (-4)] = t0 + t1;
			t0 = u[zOffset + (-5)];
			t1 = u[zOffset + (-13)];
			k11 = t0 - t1;
			u[zOffset + (-5)] = t0 + t1;
			u[zOffset + (-12)] = k11;
			u[zOffset + (-13)] = k00;
			t0 = u[zOffset + (-6)];
			t1 = u[zOffset + (-14)];
			k00 = t1 - t0;
			u[zOffset + (-6)] = t0 + t1;
			t0 = u[zOffset + (-7)];
			t1 = u[zOffset + (-15)];
			k11 = t0 - t1;
			u[zOffset + (-7)] = t0 + t1;
			u[zOffset + (-14)] = (k00 + k11) * A2;
			u[zOffset + (-15)] = (k00 - k11) * A2;
			var t01 = u[zOffset];
			var t11 = u[zOffset + (-4)];
			var k001 = t01 - t11;
			var y0 = t01 + t11;
			t01 = u[zOffset + (-2)];
			t11 = u[zOffset + (-6)];
			var y2 = t01 + t11;
			var k22 = t01 - t11;
			u[zOffset] = y0 + y2;
			u[zOffset + (-2)] = y0 - y2;
			var k33 = u[zOffset + (-3)] - u[zOffset + (-7)];
			u[zOffset + (-4)] = k001 + k33;
			u[zOffset + (-6)] = k001 - k33;
			t01 = u[zOffset + (-1)];
			t11 = u[zOffset + (-5)];
			var k111 = t01 - t11;
			var y1 = t01 + t11;
			var y3 = u[zOffset + (-3)] + u[zOffset + (-7)];
			u[zOffset + (-1)] = y1 + y3;
			u[zOffset + (-3)] = y1 - y3;
			u[zOffset + (-5)] = k111 - k22;
			u[zOffset + (-7)] = k111 + k22;
			var zOffset1 = zOffset - 8;
			var t02 = u[zOffset1];
			var t12 = u[zOffset1 + (-4)];
			var k002 = t02 - t12;
			var y01 = t02 + t12;
			t02 = u[zOffset1 + (-2)];
			t12 = u[zOffset1 + (-6)];
			var y21 = t02 + t12;
			var k221 = t02 - t12;
			u[zOffset1] = y01 + y21;
			u[zOffset1 + (-2)] = y01 - y21;
			var k331 = u[zOffset1 + (-3)] - u[zOffset1 + (-7)];
			u[zOffset1 + (-4)] = k002 + k331;
			u[zOffset1 + (-6)] = k002 - k331;
			t02 = u[zOffset1 + (-1)];
			t12 = u[zOffset1 + (-5)];
			var k112 = t02 - t12;
			var y11 = t02 + t12;
			var y31 = u[zOffset1 + (-3)] + u[zOffset1 + (-7)];
			u[zOffset1 + (-1)] = y11 + y31;
			u[zOffset1 + (-3)] = y11 - y31;
			u[zOffset1 + (-5)] = k112 - k221;
			u[zOffset1 + (-7)] = k112 + k221;
			zOffset -= 16;
		}
		var brOffset = 0;
		var dOffset0 = n4 - 4;
		var dOffset1 = n2 - 4;
		while(dOffset0 >= 0) {
			var k4 = bitReverse[brOffset];
			v[dOffset1 + 3] = u[k4];
			v[dOffset1 + 2] = u[k4 + 1];
			v[dOffset0 + 3] = u[k4 + 2];
			v[dOffset0 + 2] = u[k4 + 3];
			k4 = bitReverse[brOffset + 1];
			v[dOffset1 + 1] = u[k4];
			v[dOffset1] = u[k4 + 1];
			v[dOffset0 + 1] = u[k4 + 2];
			v[dOffset0] = u[k4 + 3];
			dOffset0 -= 4;
			dOffset1 -= 4;
			brOffset += 2;
		}
		var cOffset = 0;
		var dOffset = 0;
		var eOffset = n2 - 4;
		while(dOffset < eOffset) {
			var a02 = v[dOffset] - v[eOffset + 2];
			var a11 = v[dOffset + 1] + v[eOffset + 3];
			var b0 = c[cOffset + 1] * a02 + c[cOffset] * a11;
			var b1 = c[cOffset + 1] * a11 - c[cOffset] * a02;
			var b2 = v[dOffset] + v[eOffset + 2];
			var b3 = v[dOffset + 1] - v[eOffset + 3];
			v[dOffset] = b2 + b0;
			v[dOffset + 1] = b3 + b1;
			v[eOffset + 2] = b2 - b0;
			v[eOffset + 3] = b1 - b3;
			a02 = v[dOffset + 2] - v[eOffset];
			a11 = v[dOffset + 3] + v[eOffset + 1];
			b0 = c[cOffset + 3] * a02 + c[cOffset + 2] * a11;
			b1 = c[cOffset + 3] * a11 - c[cOffset + 2] * a02;
			b2 = v[dOffset + 2] + v[eOffset];
			b3 = v[dOffset + 3] - v[eOffset + 1];
			v[dOffset + 2] = b2 + b0;
			v[dOffset + 3] = b3 + b1;
			v[eOffset] = b2 - b0;
			v[eOffset + 1] = b1 - b3;
			cOffset += 4;
			dOffset += 4;
			eOffset -= 4;
		}
		var bOffset = n2 - 8;
		var eOffset = n2 - 8;
		var dOffset0 = 0;
		var dOffset1 = n2 - 4;
		var dOffset2 = n2;
		var dOffset3 = n - 4;
		while(eOffset >= 0) {
			var p3 = buf2[eOffset + 6] * b[bOffset + 7] - buf2[eOffset + 7] * b[bOffset + 6];
			var p2 = -buf2[eOffset + 6] * b[bOffset + 6] - buf2[eOffset + 7] * b[bOffset + 7];
			buffer[dOffset0] = p3;
			buffer[dOffset1 + 3] = -p3;
			buffer[dOffset2] = p2;
			buffer[dOffset3 + 3] = p2;
			var p1 = buf2[eOffset + 4] * b[bOffset + 5] - buf2[eOffset + 5] * b[bOffset + 4];
			var p0 = -buf2[eOffset + 4] * b[bOffset + 4] - buf2[eOffset + 5] * b[bOffset + 5];
			buffer[dOffset0 + 1] = p1;
			buffer[dOffset1 + 2] = -p1;
			buffer[dOffset2 + 1] = p0;
			buffer[dOffset3 + 2] = p0;
			p3 = buf2[eOffset + 2] * b[bOffset + 3] - buf2[eOffset + 3] * b[bOffset + 2];
			p2 = -buf2[eOffset + 2] * b[bOffset + 2] - buf2[eOffset + 3] * b[bOffset + 3];
			buffer[dOffset0 + 2] = p3;
			buffer[dOffset1 + 1] = -p3;
			buffer[dOffset2 + 2] = p2;
			buffer[dOffset3 + 1] = p2;
			p1 = buf2[eOffset] * b[bOffset + 1] - buf2[eOffset + 1] * b[bOffset];
			p0 = -buf2[eOffset] * b[bOffset] - buf2[eOffset + 1] * b[bOffset + 1];
			buffer[dOffset0 + 3] = p1;
			buffer[dOffset1] = -p1;
			buffer[dOffset2 + 3] = p0;
			buffer[dOffset3] = p0;
			bOffset -= 8;
			eOffset -= 8;
			dOffset0 += 4;
			dOffset2 += 4;
			dOffset1 -= 4;
			dOffset3 -= 4;
		}
	}
	,decodePacket: function() {
		var result = this.decodeInitial();
		if(result == null) {
			return null;
		}
		var rest = this.decodePacketRest(result);
		return rest;
	}
	,decodeInitial: function() {
		this.channelBufferStart = this.channelBufferEnd = 0;
		while(true) {
			if(!this.decodeState.maybeStartPacket()) {
				return null;
			}
			if(this.decodeState.readBits(1) != 0) {
				while(true) {
					var _this = this.decodeState;
					var x;
					if(_this.bytesInSeg == 0 && (_this.lastSeg || _this.next() == 0)) {
						x = -1;
					} else {
						_this.bytesInSeg--;
						_this.inputPosition += 1;
						x = _this.input.readByte();
					}
					_this.validBits = 0;
					if(!(-1 != x)) {
						break;
					}
				}
				continue;
			}
			break;
		}
		var n = this.header.modes.length - 1;
		var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
		var i = this.decodeState.readBits(n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0);
		if(i == -1 || i >= this.header.modes.length) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 519, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "decodeInitial"}));
		}
		var m = this.header.modes[i];
		var n;
		var prev;
		var next;
		if(m.blockflag) {
			n = this.header.blocksize1;
			prev = this.decodeState.readBits(1);
			next = this.decodeState.readBits(1);
		} else {
			next = 0;
			prev = next;
			n = this.header.blocksize0;
		}
		var windowCenter = n >> 1;
		return { mode : i, left : m.blockflag && prev == 0 ? { start : n - this.header.blocksize0 >> 2, end : n + this.header.blocksize0 >> 2} : { start : 0, end : windowCenter}, right : m.blockflag && next == 0 ? { start : n * 3 - this.header.blocksize0 >> 2, end : n * 3 + this.header.blocksize0 >> 2} : { start : windowCenter, end : n}};
	}
	,decodePacketRest: function(r) {
		var len = 0;
		var m = this.header.modes[r.mode];
		var this1 = new Array(256);
		var zeroChannel = this1;
		var this1 = new Array(256);
		var reallyZeroChannel = this1;
		var n = m.blockflag ? this.header.blocksize1 : this.header.blocksize0;
		var map = this.header.mapping[m.mapping];
		var n2 = n >> 1;
		var rangeList = [256,128,86,64];
		var codebooks = this.header.codebooks;
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			var s = map.chan[i].mux;
			zeroChannel[i] = false;
			var floor = this.header.floorConfig[map.submapFloor[s]];
			if(floor.type == 0) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 581, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "decodePacketRest"}));
			} else {
				var g = floor.floor1;
				if(this.decodeState.readBits(1) != 0) {
					var fy = [];
					var this1 = new Array(256);
					var step2Flag = this1;
					var range = rangeList[g.floor1Multiplier - 1];
					var offset = 2;
					fy = this.finalY[i];
					var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
					fy[0] = this.decodeState.readBits((range < 16384 ? range < 16 ? log2_4[range] : range < 512 ? 5 + log2_4[range >> 5] : 10 + log2_4[range >> 10] : range < 16777216 ? range < 524288 ? 15 + log2_4[range >> 15] : 20 + log2_4[range >> 20] : range < 536870912 ? 25 + log2_4[range >> 25] : range < -2147483648 ? 30 + log2_4[range >> 30] : 0) - 1);
					var log2_41 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
					fy[1] = this.decodeState.readBits((range < 16384 ? range < 16 ? log2_41[range] : range < 512 ? 5 + log2_41[range >> 5] : 10 + log2_41[range >> 10] : range < 16777216 ? range < 524288 ? 15 + log2_41[range >> 15] : 20 + log2_41[range >> 20] : range < 536870912 ? 25 + log2_41[range >> 25] : range < -2147483648 ? 30 + log2_41[range >> 30] : 0) - 1);
					var _g2 = 0;
					var _g3 = g.partitions;
					while(_g2 < _g3) {
						var j = _g2++;
						var pclass = g.partitionClassList[j];
						var cdim = g.classDimensions[pclass];
						var cbits = g.classSubclasses[pclass];
						var csub = (1 << cbits) - 1;
						var cval = 0;
						if(cbits != 0) {
							var c = codebooks[g.classMasterbooks[pclass]];
							var _this = this.decodeState;
							if(_this.validBits < 10) {
								_this.prepHuffman();
							}
							var i1 = c.fastHuffman[_this.acc & 1023];
							var val;
							if(i1 >= 0) {
								var l = c.codewordLengths[i1];
								_this.acc = _this.acc >>> l;
								_this.validBits -= l;
								if(_this.validBits < 0) {
									_this.validBits = 0;
									val = -1;
								} else {
									val = i1;
								}
							} else {
								val = _this.decodeScalarRaw(c);
							}
							if(c.sparse) {
								val = c.sortedValues[val];
							}
							cval = val;
						}
						var books = g.subclassBooks[pclass];
						var _g4 = 0;
						var _g5 = cdim;
						while(_g4 < _g5) {
							var k = _g4++;
							var book = books[cval & csub];
							cval >>= cbits;
							var tmp = offset++;
							var tmp1;
							if(book >= 0) {
								var _this1 = this.decodeState;
								var c1 = codebooks[book];
								if(_this1.validBits < 10) {
									_this1.prepHuffman();
								}
								var i2 = c1.fastHuffman[_this1.acc & 1023];
								var val1;
								if(i2 >= 0) {
									var l1 = c1.codewordLengths[i2];
									_this1.acc = _this1.acc >>> l1;
									_this1.validBits -= l1;
									if(_this1.validBits < 0) {
										_this1.validBits = 0;
										val1 = -1;
									} else {
										val1 = i2;
									}
								} else {
									val1 = _this1.decodeScalarRaw(c1);
								}
								if(c1.sparse) {
									val1 = c1.sortedValues[val1];
								}
								tmp1 = val1;
							} else {
								tmp1 = 0;
							}
							fy[tmp] = tmp1;
						}
					}
					if(this.decodeState.validBits == -1) {
						zeroChannel[i] = true;
						continue;
					}
					step2Flag[0] = step2Flag[1] = true;
					var naighbors = g.neighbors;
					var xlist = g.xlist;
					var _g6 = 2;
					var _g7 = g.values;
					while(_g6 < _g7) {
						var j1 = _g6++;
						var low = naighbors[j1][0];
						var high = naighbors[j1][1];
						var x0 = xlist[low];
						var y0 = fy[low];
						var dy = fy[high] - y0;
						var adx = xlist[high] - x0;
						var err = Math.abs(dy) * (xlist[j1] - x0);
						var off = err / adx | 0;
						var lowroom = dy < 0 ? y0 - off : y0 + off;
						var val2 = fy[j1];
						var highroom = range - lowroom;
						var room = highroom < lowroom ? highroom * 2 : lowroom * 2;
						if(val2 != 0) {
							step2Flag[low] = step2Flag[high] = true;
							step2Flag[j1] = true;
							if(val2 >= room) {
								if(highroom > lowroom) {
									fy[j1] = val2 - lowroom + lowroom;
								} else {
									fy[j1] = lowroom - val2 + highroom - 1;
								}
							} else if((val2 & 1) != 0) {
								fy[j1] = lowroom - (val2 + 1 >> 1);
							} else {
								fy[j1] = lowroom + (val2 >> 1);
							}
						} else {
							step2Flag[j1] = false;
							fy[j1] = lowroom;
						}
					}
					var _g8 = 0;
					var _g9 = g.values;
					while(_g8 < _g9) {
						var j2 = _g8++;
						if(!step2Flag[j2]) {
							fy[j2] = -1;
						}
					}
				} else {
					zeroChannel[i] = true;
				}
			}
		}
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			reallyZeroChannel[i] = zeroChannel[i];
		}
		var _g = 0;
		var _g1 = map.couplingSteps;
		while(_g < _g1) {
			var i = _g++;
			if(!zeroChannel[map.chan[i].magnitude] || !zeroChannel[map.chan[i].angle]) {
				zeroChannel[map.chan[i].magnitude] = zeroChannel[map.chan[i].angle] = false;
			}
		}
		var _g = 0;
		var _g1 = map.submaps;
		while(_g < _g1) {
			var i = _g++;
			var this1 = new Array(this.header.channel);
			var residueBuffers = this1;
			var this2 = new Array(256);
			var doNotDecode = this2;
			var ch = 0;
			var _g2 = 0;
			var _g3 = this.header.channel;
			while(_g2 < _g3) {
				var j = _g2++;
				if(map.chan[j].mux == i) {
					if(zeroChannel[j]) {
						doNotDecode[ch] = true;
						residueBuffers[ch] = null;
					} else {
						doNotDecode[ch] = false;
						residueBuffers[ch] = this.channelBuffers[j];
					}
					++ch;
				}
			}
			var r1 = map.submapResidue[i];
			var residue = this.header.residueConfig[r1];
			residue.decode(this.decodeState,this.header,residueBuffers,ch,n2,doNotDecode,this.channelBuffers);
		}
		var i = map.couplingSteps;
		var n2 = n >> 1;
		while(--i >= 0) {
			var m1 = this.channelBuffers[map.chan[i].magnitude];
			var a = this.channelBuffers[map.chan[i].angle];
			var _g = 0;
			var _g1 = n2;
			while(_g < _g1) {
				var j = _g++;
				var a2;
				var m2;
				if(m1[j] > 0) {
					if(a[j] > 0) {
						m2 = m1[j];
						a2 = m1[j] - a[j];
					} else {
						a2 = m1[j];
						m2 = m1[j] + a[j];
					}
				} else if(a[j] > 0) {
					m2 = m1[j];
					a2 = m1[j] + a[j];
				} else {
					a2 = m1[j];
					m2 = m1[j] - a[j];
				}
				m1[j] = m2;
				a[j] = a2;
			}
		}
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			if(reallyZeroChannel[i]) {
				var _g2 = 0;
				var _g3 = n2;
				while(_g2 < _g3) {
					var j = _g2++;
					this.channelBuffers[i][j] = 0;
				}
			} else {
				map.doFloor(this.header.floorConfig,i,n,this.channelBuffers[i],this.finalY[i],null);
			}
		}
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			this.inverseMdct(this.channelBuffers[i],n,m.blockflag);
		}
		var _this = this.decodeState;
		while(_this.bytesInSeg != 0 || !_this.lastSeg && _this.next() != 0) {
			_this.bytesInSeg--;
			_this.inputPosition += 1;
			_this.input.readByte();
		}
		return this.decodeState.finishDecodePacket(this.previousLength,n,r);
	}
	,__class__: kha_audio2_ogg_vorbis_VorbisDecoder
};
var kha_audio2_ogg_vorbis_VorbisTools = function() { };
$hxClasses["kha.audio2.ogg.vorbis.VorbisTools"] = kha_audio2_ogg_vorbis_VorbisTools;
kha_audio2_ogg_vorbis_VorbisTools.__name__ = true;
kha_audio2_ogg_vorbis_VorbisTools.assert = function(b,p) {
};
kha_audio2_ogg_vorbis_VorbisTools.neighbors = function(x,n) {
	var low = -1;
	var high = 65536;
	var plow = 0;
	var phigh = 0;
	var _g = 0;
	var _g1 = n;
	while(_g < _g1) {
		var i = _g++;
		if(x[i] > low && x[i] < x[n]) {
			plow = i;
			low = x[i];
		}
		if(x[i] < high && x[i] > x[n]) {
			phigh = i;
			high = x[i];
		}
	}
	return { low : plow, high : phigh};
};
kha_audio2_ogg_vorbis_VorbisTools.floatUnpack = function(x) {
	var mantissa = UInt.toFloat(x & 2097151);
	var sign = x & -2147483648;
	var exp = (x & 2145386496) >>> 21;
	var res = sign != 0 ? -mantissa : mantissa;
	return res * Math.pow(2,exp - 788);
};
kha_audio2_ogg_vorbis_VorbisTools.bitReverse = function(n) {
	n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
	n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
	n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
	n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
	return n >>> 16 | n << 16;
};
kha_audio2_ogg_vorbis_VorbisTools.pointCompare = function(a,b) {
	if(a.x < b.x) {
		return -1;
	} else if(a.x > b.x) {
		return 1;
	} else {
		return 0;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.uintAsc = function(a,b) {
	if(UInt.gt(b,a)) {
		return -1;
	} else if(a == b) {
		return 0;
	} else {
		return 1;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.lookup1Values = function(entries,dim) {
	var r = Math.exp(Math.log(entries) / dim) | 0;
	if((Math.pow(r + 1,dim) | 0) <= entries) {
		++r;
	}
	return r;
};
kha_audio2_ogg_vorbis_VorbisTools.computeWindow = function(n,$window) {
	var n2 = n >> 1;
	var _g = 0;
	var _g1 = n2;
	while(_g < _g1) {
		var i = _g++;
		$window[i] = Math.sin(1.5707963267948966 * kha_audio2_ogg_vorbis_VorbisTools.square(Math.sin((i + 0.5) / n2 * 0.5 * 3.14159265358979323846264)));
	}
};
kha_audio2_ogg_vorbis_VorbisTools.square = function(f) {
	return f * f;
};
kha_audio2_ogg_vorbis_VorbisTools.computeBitReverse = function(n,rev) {
	var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
	var ld = (n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0) - 1;
	var n8 = n >> 3;
	var _g = 0;
	var _g1 = n8;
	while(_g < _g1) {
		var i = _g++;
		var n = i;
		n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
		n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
		n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
		n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
		rev[i] = (n >>> 16 | n << 16) >>> 32 - ld + 3 << 2;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.computeTwiddleFactors = function(n,af,bf,cf) {
	var n4 = n >> 2;
	var n8 = n >> 3;
	var k2 = 0;
	var _g = 0;
	var _g1 = n4;
	while(_g < _g1) {
		var k = _g++;
		af[k2] = Math.cos(4 * k * 3.14159265358979323846264 / n);
		af[k2 + 1] = -Math.sin(4 * k * 3.14159265358979323846264 / n);
		bf[k2] = Math.cos((k2 + 1) * 3.14159265358979323846264 / n / 2) * 0.5;
		bf[k2 + 1] = Math.sin((k2 + 1) * 3.14159265358979323846264 / n / 2) * 0.5;
		k2 += 2;
	}
	var k2 = 0;
	var _g = 0;
	var _g1 = n8;
	while(_g < _g1) {
		var k = _g++;
		cf[k2] = Math.cos(2 * (k2 + 1) * 3.14159265358979323846264 / n);
		cf[k2 + 1] = -Math.sin(2 * (k2 + 1) * 3.14159265358979323846264 / n);
		k2 += 2;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.drawLine = function(output,x0,y0,x1,y1,n) {
	if(kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable == null) {
		var this1 = new Array(32);
		kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable = this1;
		var _g = 0;
		while(_g < 32) {
			var i = _g++;
			var this1 = kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable;
			var this2 = new Array(64);
			this1[i] = this2;
			var _g1 = 1;
			while(_g1 < 64) {
				var j = _g1++;
				kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable[i][j] = i / j | 0;
			}
		}
	}
	var dy = y1 - y0;
	var adx = x1 - x0;
	var ady = dy < 0 ? -dy : dy;
	var base;
	var x = x0;
	var y = y0;
	var err = 0;
	var sy;
	if(adx < 64 && ady < 32) {
		if(dy < 0) {
			base = -kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable[ady][adx];
			sy = base - 1;
		} else {
			base = kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable[ady][adx];
			sy = base + 1;
		}
	} else {
		base = dy / adx | 0;
		sy = dy < 0 ? base - 1 : base + 1;
	}
	ady -= (base < 0 ? -base : base) * adx;
	if(x1 > n) {
		x1 = n;
	}
	output[x] *= kha_audio2_ogg_vorbis_VorbisTools.INVERSE_DB_TABLE[y];
	var _g = x + 1;
	var _g1 = x1;
	while(_g < _g1) {
		var i = _g++;
		err += ady;
		if(err >= adx) {
			err -= adx;
			y += sy;
		} else {
			y += base;
		}
		output[i] *= kha_audio2_ogg_vorbis_VorbisTools.INVERSE_DB_TABLE[y];
	}
};
kha_audio2_ogg_vorbis_VorbisTools.predictPoint = function(x,x0,x1,y0,y1) {
	var dy = y1 - y0;
	var adx = x1 - x0;
	var err = Math.abs(dy) * (x - x0);
	var off = err / adx | 0;
	if(dy < 0) {
		return y0 - off;
	} else {
		return y0 + off;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.emptyFloatVector = function(len) {
	var this1 = new Array(len);
	var vec = this1;
	return vec;
};
kha_audio2_ogg_vorbis_VorbisTools.copyVector = function(source) {
	var this1 = new Array(source.length);
	var dest = this1;
	var _g = 0;
	var _g1 = source.length;
	while(_g < _g1) {
		var i = _g++;
		dest[i] = source[i];
	}
	return dest;
};
var kha_audio2_ogg_vorbis_data_Codebook = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Codebook"] = kha_audio2_ogg_vorbis_data_Codebook;
kha_audio2_ogg_vorbis_data_Codebook.__name__ = true;
kha_audio2_ogg_vorbis_data_Codebook.read = function(decodeState) {
	var c = new kha_audio2_ogg_vorbis_data_Codebook();
	if(decodeState.readBits(8) != 66 || decodeState.readBits(8) != 67 || decodeState.readBits(8) != 86) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 40, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
	}
	var x = decodeState.readBits(8);
	c.dimensions = (decodeState.readBits(8) << 8) + x;
	var x = decodeState.readBits(8);
	var y = decodeState.readBits(8);
	c.entries = (decodeState.readBits(8) << 16) + (y << 8) + x;
	var ordered = decodeState.readBits(1);
	c.sparse = ordered != 0 ? false : decodeState.readBits(1) != 0;
	var this1 = new Array(c.entries);
	var lengths = this1;
	if(!c.sparse) {
		c.codewordLengths = lengths;
	}
	var total = 0;
	if(ordered != 0) {
		var currentEntry = 0;
		var currentLength = decodeState.readBits(5) + 1;
		while(currentEntry < c.entries) {
			var limit = c.entries - currentEntry;
			var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
			var n = decodeState.readBits(limit < 16384 ? limit < 16 ? log2_4[limit] : limit < 512 ? 5 + log2_4[limit >> 5] : 10 + log2_4[limit >> 10] : limit < 16777216 ? limit < 524288 ? 15 + log2_4[limit >> 15] : 20 + log2_4[limit >> 20] : limit < 536870912 ? 25 + log2_4[limit >> 25] : limit < -2147483648 ? 30 + log2_4[limit >> 30] : 0);
			if(currentEntry + n > c.entries) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"codebook entrys",{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 67, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
			}
			var _g = 0;
			var _g1 = n;
			while(_g < _g1) {
				var i = _g++;
				lengths[currentEntry + i] = currentLength;
			}
			currentEntry += n;
			++currentLength;
		}
	} else {
		var _g = 0;
		var _g1 = c.entries;
		while(_g < _g1) {
			var j = _g++;
			var present = c.sparse ? decodeState.readBits(1) : 1;
			if(present != 0) {
				lengths[j] = decodeState.readBits(5) + 1;
				++total;
			} else {
				lengths[j] = 255;
			}
		}
	}
	if(c.sparse && total >= c.entries >> 2) {
		c.codewordLengths = lengths;
		c.sparse = false;
	}
	var tmp;
	if(c.sparse) {
		tmp = total;
	} else {
		var sortedCount = 0;
		var _g = 0;
		var _g1 = c.entries;
		while(_g < _g1) {
			var j = _g++;
			var l = lengths[j];
			if(l > 10 && l != 255) {
				++sortedCount;
			}
		}
		tmp = sortedCount;
	}
	c.sortedEntries = tmp;
	var values = null;
	if(!c.sparse) {
		var this1 = new Array(c.entries);
		c.codewords = this1;
	} else {
		if(c.sortedEntries != 0) {
			var this1 = new Array(c.sortedEntries);
			c.codewordLengths = this1;
			var this1 = new Array(c.entries);
			c.codewords = this1;
			var this1 = new Array(c.entries);
			values = this1;
		}
		var size = c.entries + 64 * c.sortedEntries;
	}
	if(!c.computeCodewords(lengths,c.entries,values)) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"compute codewords",{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 120, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
	}
	if(c.sortedEntries != 0) {
		c.sortedCodewords = [];
		var this1 = new Array(c.sortedEntries);
		c.sortedValues = this1;
		c.computeSortedHuffman(lengths,values);
	}
	if(c.sparse) {
		values = null;
		c.codewords = null;
		lengths = null;
	}
	c.computeAcceleratedHuffman();
	c.lookupType = decodeState.readBits(4);
	if(c.lookupType > 2) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"codebook lookup type",{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 143, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
	}
	if(c.lookupType > 0) {
		var x = decodeState.readBits(32);
		var mantissa = UInt.toFloat(x & 2097151);
		var sign = x & -2147483648;
		var exp = (x & 2145386496) >>> 21;
		var res = sign != 0 ? -mantissa : mantissa;
		c.minimumValue = res * Math.pow(2,exp - 788);
		var x = decodeState.readBits(32);
		var mantissa = UInt.toFloat(x & 2097151);
		var sign = x & -2147483648;
		var exp = (x & 2145386496) >>> 21;
		var res = sign != 0 ? -mantissa : mantissa;
		c.deltaValue = res * Math.pow(2,exp - 788);
		c.valueBits = decodeState.readBits(4) + 1;
		c.sequenceP = decodeState.readBits(1) != 0;
		if(c.lookupType == 1) {
			c.lookupValues = kha_audio2_ogg_vorbis_VorbisTools.lookup1Values(c.entries,c.dimensions);
		} else {
			c.lookupValues = c.entries * c.dimensions;
		}
		var this1 = new Array(c.lookupValues);
		var mults = this1;
		var _g = 0;
		var _g1 = c.lookupValues;
		while(_g < _g1) {
			var j = _g++;
			var q = decodeState.readBits(c.valueBits);
			if(q == -1) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"fail lookup",{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 161, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
			}
			mults[j] = q;
		}
		var this1 = new Array(c.lookupValues);
		c.multiplicands = this1;
		var _g = 0;
		var _g1 = c.lookupValues;
		while(_g < _g1) {
			var j = _g++;
			c.multiplicands[j] = mults[j] * c.deltaValue + c.minimumValue;
		}
		if(c.lookupType == 2 && c.sequenceP) {
			var _g = 1;
			var _g1 = c.lookupValues;
			while(_g < _g1) {
				var j = _g++;
				c.multiplicands[j] = c.multiplicands[j - 1];
			}
			c.sequenceP = false;
		}
	}
	return c;
};
kha_audio2_ogg_vorbis_data_Codebook.prototype = {
	dimensions: null
	,entries: null
	,codewordLengths: null
	,minimumValue: null
	,deltaValue: null
	,valueBits: null
	,lookupType: null
	,sequenceP: null
	,sparse: null
	,lookupValues: null
	,multiplicands: null
	,codewords: null
	,fastHuffman: null
	,sortedCodewords: null
	,sortedValues: null
	,sortedEntries: null
	,addEntry: function(huffCode,symbol,count,len,values) {
		if(!this.sparse) {
			this.codewords[symbol] = huffCode;
		} else {
			this.codewords[count] = huffCode;
			this.codewordLengths[count] = len;
			values[count] = symbol;
		}
	}
	,includeInSort: function(len) {
		if(this.sparse) {
			return true;
		} else if(len == 255) {
			return false;
		} else if(len > 10) {
			return true;
		} else {
			return false;
		}
	}
	,computeCodewords: function(len,n,values) {
		var this1 = new Array(32);
		var available = this1;
		available[0] = 0;
		available[1] = 0;
		available[2] = 0;
		available[3] = 0;
		available[4] = 0;
		available[5] = 0;
		available[6] = 0;
		available[7] = 0;
		available[8] = 0;
		available[9] = 0;
		available[10] = 0;
		available[11] = 0;
		available[12] = 0;
		available[13] = 0;
		available[14] = 0;
		available[15] = 0;
		available[16] = 0;
		available[17] = 0;
		available[18] = 0;
		available[19] = 0;
		available[20] = 0;
		available[21] = 0;
		available[22] = 0;
		available[23] = 0;
		available[24] = 0;
		available[25] = 0;
		available[26] = 0;
		available[27] = 0;
		available[28] = 0;
		available[29] = 0;
		available[30] = 0;
		available[31] = 0;
		var k = 0;
		while(k < n) {
			if(len[k] < 255) {
				break;
			}
			++k;
		}
		if(k == n) {
			return true;
		}
		var m = 0;
		var count = m++;
		if(!this.sparse) {
			this.codewords[k] = 0;
		} else {
			this.codewords[count] = 0;
			this.codewordLengths[count] = len[k];
			values[count] = k;
		}
		var i = 0;
		while(++i <= len[k]) available[i] = 1 << 32 - i;
		i = k;
		while(++i < n) {
			var z = len[i];
			if(z == 255) {
				continue;
			}
			while(z > 0 && available[z] == 0) --z;
			if(z == 0) {
				return false;
			}
			var res = available[z];
			available[z] = 0;
			var n1 = res;
			n1 = (n1 & -1431655766) >>> 1 | (n1 & 1431655765) << 1;
			n1 = (n1 & -858993460) >>> 2 | (n1 & 858993459) << 2;
			n1 = (n1 & -252645136) >>> 4 | (n1 & 252645135) << 4;
			n1 = (n1 & -16711936) >>> 8 | (n1 & 16711935) << 8;
			var huffCode = n1 >>> 16 | n1 << 16;
			var count = m++;
			if(!this.sparse) {
				this.codewords[i] = huffCode;
			} else {
				this.codewords[count] = huffCode;
				this.codewordLengths[count] = len[i];
				values[count] = i;
			}
			if(z != len[i]) {
				var y = len[i];
				while(y > z) {
					available[y] = res + (1 << 32 - y);
					--y;
				}
			}
		}
		return true;
	}
	,computeSortedHuffman: function(lengths,values) {
		if(!this.sparse) {
			var k = 0;
			var _g = 0;
			var _g1 = this.entries;
			while(_g < _g1) {
				var i = _g++;
				var len = lengths[i];
				if(this.sparse ? true : len == 255 ? false : len > 10) {
					var n = this.codewords[i];
					n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
					n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
					n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
					n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
					this.sortedCodewords[k++] = n >>> 16 | n << 16;
				}
			}
		} else {
			var _g = 0;
			var _g1 = this.sortedEntries;
			while(_g < _g1) {
				var i = _g++;
				var n = this.codewords[i];
				n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
				n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
				n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
				n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
				this.sortedCodewords[i] = n >>> 16 | n << 16;
			}
		}
		this.sortedCodewords[this.sortedEntries] = -1;
		this.sortedCodewords.sort(kha_audio2_ogg_vorbis_VorbisTools.uintAsc);
		var len = this.sparse ? this.sortedEntries : this.entries;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			var huffLen = this.sparse ? lengths[values[i]] : lengths[i];
			if(this.sparse ? true : huffLen == 255 ? false : huffLen > 10) {
				var n = this.codewords[i];
				n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
				n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
				n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
				n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
				var code = n >>> 16 | n << 16;
				var x = 0;
				var n1 = this.sortedEntries;
				while(n1 > 1) {
					var m = x + (n1 >> 1);
					if(UInt.gte(code,this.sortedCodewords[m])) {
						x = m;
						n1 -= n1 >> 1;
					} else {
						n1 >>= 1;
					}
				}
				if(this.sparse) {
					this.sortedValues[x] = values[i];
					this.codewordLengths[x] = huffLen;
				} else {
					this.sortedValues[x] = i;
				}
			}
		}
	}
	,computeAcceleratedHuffman: function() {
		var this1 = new Array(1024);
		this.fastHuffman = this1;
		this.fastHuffman[0] = -1;
		var _g = 0;
		var _g1 = 1024;
		while(_g < _g1) {
			var i = _g++;
			this.fastHuffman[i] = -1;
		}
		var len = this.sparse ? this.sortedEntries : this.entries;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			if(this.codewordLengths[i] <= 10) {
				var z;
				if(this.sparse) {
					var n = this.sortedCodewords[i];
					n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
					n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
					n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
					n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
					z = n >>> 16 | n << 16;
				} else {
					z = this.codewords[i];
				}
				while(z < 1024) {
					this.fastHuffman[z] = i;
					z += 1 << this.codewordLengths[i];
				}
			}
		}
	}
	,codebookDecode: function(decodeState,output,offset,len) {
		if(decodeState.validBits < 10) {
			decodeState.prepHuffman();
		}
		var i = this.fastHuffman[decodeState.acc & 1023];
		var val;
		if(i >= 0) {
			var l = this.codewordLengths[i];
			decodeState.acc = decodeState.acc >>> l;
			decodeState.validBits -= l;
			if(decodeState.validBits < 0) {
				decodeState.validBits = 0;
				val = -1;
			} else {
				val = i;
			}
		} else {
			val = decodeState.decodeScalarRaw(this);
		}
		if(this.sparse) {
			val = this.sortedValues[val];
		}
		var z = val;
		var lookupValues = this.lookupValues;
		var sequenceP = this.sequenceP;
		var multiplicands = this.multiplicands;
		var minimumValue = this.minimumValue;
		if(z < 0) {
			return false;
		}
		if(len > this.dimensions) {
			len = this.dimensions;
		}
		if(this.lookupType == 1) {
			var div = 1;
			var last = 0.0;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var i = _g++;
				var off = UInt.toFloat(z / div | 0) % UInt.toFloat(lookupValues) | 0;
				var val = multiplicands[off] + last;
				output[offset + i] += val;
				if(sequenceP) {
					last = val + minimumValue;
				}
				div = div * lookupValues;
			}
			return true;
		}
		z *= this.dimensions;
		if(sequenceP) {
			var last = 0.0;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var i = _g++;
				var val = multiplicands[z + i] + last;
				output[offset + i] += val;
				last = val + minimumValue;
			}
		} else {
			var last = 0.0;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var i = _g++;
				output[offset + i] += multiplicands[z + i] + last;
			}
		}
		return true;
	}
	,codebookDecodeStep: function(decodeState,output,offset,len,step) {
		if(decodeState.validBits < 10) {
			decodeState.prepHuffman();
		}
		var i = this.fastHuffman[decodeState.acc & 1023];
		var val;
		if(i >= 0) {
			var l = this.codewordLengths[i];
			decodeState.acc = decodeState.acc >>> l;
			decodeState.validBits -= l;
			if(decodeState.validBits < 0) {
				decodeState.validBits = 0;
				val = -1;
			} else {
				val = i;
			}
		} else {
			val = decodeState.decodeScalarRaw(this);
		}
		if(this.sparse) {
			val = this.sortedValues[val];
		}
		var z = val;
		var last = 0.0;
		if(z < 0) {
			return false;
		}
		if(len > this.dimensions) {
			len = this.dimensions;
		}
		var lookupValues = this.lookupValues;
		var sequenceP = this.sequenceP;
		var multiplicands = this.multiplicands;
		if(this.lookupType == 1) {
			var div = 1;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var i = _g++;
				var off = UInt.toFloat(z / div | 0) % UInt.toFloat(lookupValues) | 0;
				var val = multiplicands[off] + last;
				output[offset + i * step] += val;
				if(sequenceP) {
					last = val;
				}
				div = div * lookupValues;
			}
			return true;
		}
		z *= this.dimensions;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			var val = multiplicands[z + i] + last;
			output[offset + i * step] += val;
			if(sequenceP) {
				last = val;
			}
		}
		return true;
	}
	,decodeStart: function(decodeState) {
		if(decodeState.validBits < 10) {
			decodeState.prepHuffman();
		}
		var i = this.fastHuffman[decodeState.acc & 1023];
		var val;
		if(i >= 0) {
			var l = this.codewordLengths[i];
			decodeState.acc = decodeState.acc >>> l;
			decodeState.validBits -= l;
			if(decodeState.validBits < 0) {
				decodeState.validBits = 0;
				val = -1;
			} else {
				val = i;
			}
		} else {
			val = decodeState.decodeScalarRaw(this);
		}
		if(this.sparse) {
			val = this.sortedValues[val];
		}
		return val;
	}
	,decodeDeinterleaveRepeat: function(decodeState,residueBuffers,ch,cInter,pInter,len,totalDecode) {
		var effective = this.dimensions;
		if(this.lookupType == 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 488, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "decodeDeinterleaveRepeat"}));
		}
		var multiplicands = this.multiplicands;
		var sequenceP = this.sequenceP;
		var lookupValues = this.lookupValues;
		while(totalDecode > 0) {
			var last = 0.0;
			if(decodeState.validBits < 10) {
				decodeState.prepHuffman();
			}
			var i = this.fastHuffman[decodeState.acc & 1023];
			var val;
			if(i >= 0) {
				var l = this.codewordLengths[i];
				decodeState.acc = decodeState.acc >>> l;
				decodeState.validBits -= l;
				if(decodeState.validBits < 0) {
					decodeState.validBits = 0;
					val = -1;
				} else {
					val = i;
				}
			} else {
				val = decodeState.decodeScalarRaw(this);
			}
			if(this.sparse) {
				val = this.sortedValues[val];
			}
			var z = val;
			if(z < 0) {
				if(decodeState.bytesInSeg == 0 && decodeState.lastSeg) {
					return null;
				}
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 503, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "decodeDeinterleaveRepeat"}));
			}
			if(cInter + pInter * ch + effective > len * ch) {
				effective = len * ch - (pInter * ch - cInter);
			}
			if(this.lookupType == 1) {
				var div = 1;
				if(sequenceP) {
					var _g = 0;
					var _g1 = effective;
					while(_g < _g1) {
						var i1 = _g++;
						var off = UInt.toFloat(z / div | 0) % UInt.toFloat(lookupValues) | 0;
						var val1 = multiplicands[off] + last;
						residueBuffers[cInter][pInter] += val1;
						if(++cInter == ch) {
							cInter = 0;
							++pInter;
						}
						last = val1;
						div = div * lookupValues;
					}
				} else {
					var _g2 = 0;
					var _g3 = effective;
					while(_g2 < _g3) {
						var i2 = _g2++;
						var off1 = UInt.toFloat(z / div | 0) % UInt.toFloat(lookupValues) | 0;
						var val2 = multiplicands[off1] + last;
						residueBuffers[cInter][pInter] += val2;
						if(++cInter == ch) {
							cInter = 0;
							++pInter;
						}
						div = div * lookupValues;
					}
				}
			} else {
				z *= this.dimensions;
				if(sequenceP) {
					var _g4 = 0;
					var _g5 = effective;
					while(_g4 < _g5) {
						var i3 = _g4++;
						var val3 = multiplicands[z + i3] + last;
						residueBuffers[cInter][pInter] += val3;
						if(++cInter == ch) {
							cInter = 0;
							++pInter;
						}
						last = val3;
					}
				} else {
					var _g6 = 0;
					var _g7 = effective;
					while(_g6 < _g7) {
						var i4 = _g6++;
						var val4 = multiplicands[z + i4] + last;
						residueBuffers[cInter][pInter] += val4;
						if(++cInter == ch) {
							cInter = 0;
							++pInter;
						}
					}
				}
			}
			totalDecode -= effective;
		}
		return { cInter : cInter, pInter : pInter};
	}
	,residueDecode: function(decodeState,target,offset,n,rtype) {
		if(rtype == 0) {
			var step = n / this.dimensions | 0;
			var _g = 0;
			var _g1 = step;
			while(_g < _g1) {
				var k = _g++;
				if(!this.codebookDecodeStep(decodeState,target,offset + k,n - offset - k,step)) {
					return false;
				}
			}
		} else {
			var k = 0;
			while(k < n) {
				if(!this.codebookDecode(decodeState,target,offset,n - k)) {
					return false;
				}
				k += this.dimensions;
				offset += this.dimensions;
			}
		}
		return true;
	}
	,__class__: kha_audio2_ogg_vorbis_data_Codebook
};
var kha_audio2_ogg_vorbis_data_Comment = function() {
	this.data = new haxe_ds_StringMap();
};
$hxClasses["kha.audio2.ogg.vorbis.data.Comment"] = kha_audio2_ogg_vorbis_data_Comment;
kha_audio2_ogg_vorbis_data_Comment.__name__ = true;
kha_audio2_ogg_vorbis_data_Comment.prototype = {
	data: null
	,get_title: function() {
		return this.getString("title");
	}
	,get_loopStart: function() {
		return Std.parseInt(this.getString("loopstart"));
	}
	,get_loopLength: function() {
		return Std.parseInt(this.getString("looplength"));
	}
	,get_version: function() {
		return this.getString("version");
	}
	,get_album: function() {
		return this.getString("album");
	}
	,get_organization: function() {
		return this.getString("organization");
	}
	,get_tracknumber: function() {
		return this.getString("tracknumber");
	}
	,get_performer: function() {
		return this.getString("performer");
	}
	,get_copyright: function() {
		return this.getString("copyright");
	}
	,get_license: function() {
		return this.getString("license");
	}
	,get_artist: function() {
		return this.getString("artist");
	}
	,get_description: function() {
		return this.getString("description");
	}
	,get_genre: function() {
		return this.getString("genre");
	}
	,get_date: function() {
		return this.getString("date");
	}
	,get_location: function() {
		return this.getString("location");
	}
	,get_contact: function() {
		return this.getString("contact");
	}
	,get_isrc: function() {
		return this.getString("isrc");
	}
	,get_artists: function() {
		return this.getArray("artist");
	}
	,add: function(key,value) {
		key = key.toLowerCase();
		if(Object.prototype.hasOwnProperty.call(this.data.h,key)) {
			this.data.h[key].push(value);
		} else {
			var v = [value];
			this.data.h[key] = v;
		}
	}
	,getString: function(key) {
		key = key.toLowerCase();
		if(Object.prototype.hasOwnProperty.call(this.data.h,key)) {
			return this.data.h[key][0];
		} else {
			return null;
		}
	}
	,getArray: function(key) {
		key = key.toLowerCase();
		if(Object.prototype.hasOwnProperty.call(this.data.h,key)) {
			return this.data.h[key];
		} else {
			return null;
		}
	}
	,__class__: kha_audio2_ogg_vorbis_data_Comment
};
var kha_audio2_ogg_vorbis_data_Floor = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Floor"] = kha_audio2_ogg_vorbis_data_Floor;
kha_audio2_ogg_vorbis_data_Floor.__name__ = true;
kha_audio2_ogg_vorbis_data_Floor.read = function(decodeState,codebooks) {
	var floor = new kha_audio2_ogg_vorbis_data_Floor();
	floor.type = decodeState.readBits(16);
	if(floor.type > 1) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Floor.hx", lineNumber : 28, className : "kha.audio2.ogg.vorbis.data.Floor", methodName : "read"}));
	}
	if(floor.type == 0) {
		var g = floor.floor0 = new kha_audio2_ogg_vorbis_data_Floor0();
		g.order = decodeState.readBits(8);
		g.rate = decodeState.readBits(16);
		g.barkMapSize = decodeState.readBits(16);
		g.amplitudeBits = decodeState.readBits(6);
		g.amplitudeOffset = decodeState.readBits(8);
		g.numberOfBooks = decodeState.readBits(4) + 1;
		var _g = 0;
		var _g1 = g.numberOfBooks;
		while(_g < _g1) {
			var j = _g++;
			g.bookList[j] = decodeState.readBits(8);
		}
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.FEATURE_NOT_SUPPORTED,null,{ fileName : "kha/audio2/ogg/vorbis/data/Floor.hx", lineNumber : 41, className : "kha.audio2.ogg.vorbis.data.Floor", methodName : "read"}));
	} else {
		var p = [];
		var g = floor.floor1 = new kha_audio2_ogg_vorbis_data_Floor1();
		var maxClass = -1;
		g.partitions = decodeState.readBits(5);
		var this1 = new Array(g.partitions);
		g.partitionClassList = this1;
		var _g = 0;
		var _g1 = g.partitions;
		while(_g < _g1) {
			var j = _g++;
			g.partitionClassList[j] = decodeState.readBits(4);
			if(g.partitionClassList[j] > maxClass) {
				maxClass = g.partitionClassList[j];
			}
		}
		var this1 = new Array(maxClass + 1);
		g.classDimensions = this1;
		var this1 = new Array(maxClass + 1);
		g.classMasterbooks = this1;
		var this1 = new Array(maxClass + 1);
		g.classSubclasses = this1;
		var this1 = new Array(maxClass + 1);
		g.subclassBooks = this1;
		var _g = 0;
		var _g1 = maxClass + 1;
		while(_g < _g1) {
			var j = _g++;
			g.classDimensions[j] = decodeState.readBits(3) + 1;
			g.classSubclasses[j] = decodeState.readBits(2);
			if(g.classSubclasses[j] != 0) {
				g.classMasterbooks[j] = decodeState.readBits(8);
				if(g.classMasterbooks[j] >= codebooks.length) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Floor.hx", lineNumber : 64, className : "kha.audio2.ogg.vorbis.data.Floor", methodName : "read"}));
				}
			}
			var kl = 1 << g.classSubclasses[j];
			var this1 = g.subclassBooks;
			var this2 = new Array(kl);
			this1[j] = this2;
			var _g2 = 0;
			var _g3 = kl;
			while(_g2 < _g3) {
				var k = _g2++;
				g.subclassBooks[j][k] = decodeState.readBits(8) - 1;
				if(g.subclassBooks[j][k] >= codebooks.length) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Floor.hx", lineNumber : 73, className : "kha.audio2.ogg.vorbis.data.Floor", methodName : "read"}));
				}
			}
		}
		g.floor1Multiplier = decodeState.readBits(2) + 1;
		g.rangebits = decodeState.readBits(4);
		var this1 = new Array(250);
		g.xlist = this1;
		g.xlist[0] = 0;
		g.xlist[1] = 1 << g.rangebits;
		g.values = 2;
		var _g = 0;
		var _g1 = g.partitions;
		while(_g < _g1) {
			var j = _g++;
			var c = g.partitionClassList[j];
			var _g2 = 0;
			var _g3 = g.classDimensions[c];
			while(_g2 < _g3) {
				var k = _g2++;
				g.xlist[g.values] = decodeState.readBits(g.rangebits);
				g.values++;
			}
		}
		var _g = 0;
		var _g1 = g.values;
		while(_g < _g1) {
			var j = _g++;
			p.push(new kha_audio2_ogg_vorbis_data_IntPoint());
			p[j].x = g.xlist[j];
			p[j].y = j;
		}
		p.sort(kha_audio2_ogg_vorbis_VorbisTools.pointCompare);
		var this1 = new Array(g.values);
		g.sortedOrder = this1;
		var _g = 0;
		var _g1 = g.values;
		while(_g < _g1) {
			var j = _g++;
			g.sortedOrder[j] = p[j].y;
		}
		var this1 = new Array(g.values);
		g.neighbors = this1;
		var _g = 2;
		var _g1 = g.values;
		while(_g < _g1) {
			var j = _g++;
			var x = g.xlist;
			var low = -1;
			var high = 65536;
			var plow = 0;
			var phigh = 0;
			var _g2 = 0;
			var _g3 = j;
			while(_g2 < _g3) {
				var i = _g2++;
				if(x[i] > low && x[i] < x[j]) {
					plow = i;
					low = x[i];
				}
				if(x[i] < high && x[i] > x[j]) {
					phigh = i;
					high = x[i];
				}
			}
			var ne_low = plow;
			var ne_high = phigh;
			var this1 = g.neighbors;
			var this2 = new Array(g.values);
			this1[j] = this2;
			g.neighbors[j][0] = ne_low;
			g.neighbors[j][1] = ne_high;
		}
	}
	return floor;
};
kha_audio2_ogg_vorbis_data_Floor.prototype = {
	floor0: null
	,floor1: null
	,type: null
	,__class__: kha_audio2_ogg_vorbis_data_Floor
};
var kha_audio2_ogg_vorbis_data_Floor0 = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Floor0"] = kha_audio2_ogg_vorbis_data_Floor0;
kha_audio2_ogg_vorbis_data_Floor0.__name__ = true;
kha_audio2_ogg_vorbis_data_Floor0.prototype = {
	order: null
	,rate: null
	,barkMapSize: null
	,amplitudeBits: null
	,amplitudeOffset: null
	,numberOfBooks: null
	,bookList: null
	,__class__: kha_audio2_ogg_vorbis_data_Floor0
};
var kha_audio2_ogg_vorbis_data_Floor1 = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Floor1"] = kha_audio2_ogg_vorbis_data_Floor1;
kha_audio2_ogg_vorbis_data_Floor1.__name__ = true;
kha_audio2_ogg_vorbis_data_Floor1.prototype = {
	partitions: null
	,partitionClassList: null
	,classDimensions: null
	,classSubclasses: null
	,classMasterbooks: null
	,subclassBooks: null
	,xlist: null
	,sortedOrder: null
	,neighbors: null
	,floor1Multiplier: null
	,rangebits: null
	,values: null
	,__class__: kha_audio2_ogg_vorbis_data_Floor1
};
var kha_audio2_ogg_vorbis_data_Header = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Header"] = kha_audio2_ogg_vorbis_data_Header;
kha_audio2_ogg_vorbis_data_Header.__name__ = true;
kha_audio2_ogg_vorbis_data_Header.read = function(decodeState) {
	var page = decodeState.page;
	page.start(decodeState);
	if((page.flag & 2) == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"not firstPage",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 46, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	if((page.flag & 4) != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"lastPage",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 49, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	if((page.flag & 1) != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"continuedPacket",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 52, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.firstPageValidate();
	decodeState.inputPosition += 1;
	if(decodeState.input.readByte() != 1) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"decodeState head",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 57, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	var header = new haxe_io_Bytes(new ArrayBuffer(6));
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[0] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[1] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[2] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[3] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[4] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[5] = x;
	if(header.toString() != "vorbis") {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"vorbis header",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 301, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "vorbisValidate"}));
	}
	decodeState.inputPosition += 4;
	var version = decodeState.input.readInt32();
	if(version != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"vorbis version : " + version,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 66, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	var header = new kha_audio2_ogg_vorbis_data_Header();
	decodeState.inputPosition += 1;
	header.channel = decodeState.input.readByte();
	if(header.channel == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"no channel",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 73, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	} else if(header.channel > 16) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.TOO_MANY_CHANNELS,"too many channels",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 75, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.inputPosition += 4;
	header.sampleRate = decodeState.input.readInt32();
	if(header.sampleRate == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"no sampling rate",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 80, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.inputPosition += 4;
	header.maximumBitRate = decodeState.input.readInt32();
	decodeState.inputPosition += 4;
	header.nominalBitRate = decodeState.input.readInt32();
	decodeState.inputPosition += 4;
	header.minimumBitRate = decodeState.input.readInt32();
	decodeState.inputPosition += 1;
	var x = decodeState.input.readByte();
	var log0 = x & 15;
	var log1 = x >> 4;
	header.blocksize0 = 1 << log0;
	header.blocksize1 = 1 << log1;
	if(log0 < 6 || log0 > 13) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 93, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	if(log1 < 6 || log1 > 13) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 96, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	if(log0 > log1) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 99, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.inputPosition += 1;
	var x = decodeState.input.readByte();
	if((x & 1) == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 105, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.page.start(decodeState);
	decodeState.startPacket();
	var len = 0;
	var output = new haxe_io_BytesOutput();
	while(true) {
		len = decodeState.next();
		if(!(len != 0)) {
			break;
		}
		decodeState.inputPosition += len;
		output.write(decodeState.input.read(len));
		decodeState.bytesInSeg = 0;
	}
	var packetInput = new haxe_io_BytesInput(output.getBytes());
	packetInput.readByte();
	packetInput.read(6);
	var vendorLength = packetInput.readInt32();
	header.vendor = packetInput.readString(vendorLength);
	header.comment = new kha_audio2_ogg_vorbis_data_Comment();
	var commentCount = packetInput.readInt32();
	var _g = 0;
	var _g1 = commentCount;
	while(_g < _g1) {
		var i = _g++;
		var n = packetInput.readInt32();
		var str = packetInput.readString(n);
		var splitter = str.indexOf("=");
		if(splitter != -1) {
			header.comment.add(str.substring(0,splitter),str.substring(splitter + 1));
		}
	}
	var x1 = packetInput.readByte();
	if((x1 & 1) == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 141, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.startPacket();
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	if(x1 != 5) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"setup packet",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 149, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	var header1 = new haxe_io_Bytes(new ArrayBuffer(6));
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[0] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[1] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[2] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[3] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[4] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[5] = x1;
	if(header1.toString() != "vorbis") {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"vorbis header",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 301, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "vorbisValidate"}));
	}
	var codebookCount = decodeState.readBits(8) + 1;
	var this1 = new Array(codebookCount);
	header.codebooks = this1;
	var _g = 0;
	var _g1 = codebookCount;
	while(_g < _g1) {
		var i = _g++;
		header.codebooks[i] = kha_audio2_ogg_vorbis_data_Codebook.read(decodeState);
	}
	x = decodeState.readBits(6) + 1;
	var _g = 0;
	var _g1 = x;
	while(_g < _g1) {
		var i = _g++;
		if(decodeState.readBits(16) != 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 165, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
		}
	}
	var floorCount = decodeState.readBits(6) + 1;
	var this1 = new Array(floorCount);
	header.floorConfig = this1;
	var _g = 0;
	var _g1 = floorCount;
	while(_g < _g1) {
		var i = _g++;
		header.floorConfig[i] = kha_audio2_ogg_vorbis_data_Floor.read(decodeState,header.codebooks);
	}
	var residueCount = decodeState.readBits(6) + 1;
	var this1 = new Array(residueCount);
	header.residueConfig = this1;
	var _g = 0;
	var _g1 = residueCount;
	while(_g < _g1) {
		var i = _g++;
		header.residueConfig[i] = kha_audio2_ogg_vorbis_data_Residue.read(decodeState,header.codebooks);
	}
	var mappingCount = decodeState.readBits(6) + 1;
	var this1 = new Array(mappingCount);
	header.mapping = this1;
	var _g = 0;
	var _g1 = mappingCount;
	while(_g < _g1) {
		var i = _g++;
		var map = kha_audio2_ogg_vorbis_data_Mapping.read(decodeState,header.channel);
		header.mapping[i] = map;
		var _g2 = 0;
		var _g3 = map.submaps;
		while(_g2 < _g3) {
			var j = _g2++;
			if(map.submapFloor[j] >= header.floorConfig.length) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 191, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
			}
			if(map.submapResidue[j] >= header.residueConfig.length) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 194, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
			}
		}
	}
	var modeCount = decodeState.readBits(6) + 1;
	var this1 = new Array(modeCount);
	header.modes = this1;
	var _g = 0;
	var _g1 = modeCount;
	while(_g < _g1) {
		var i = _g++;
		var mode = kha_audio2_ogg_vorbis_data_Mode.read(decodeState);
		header.modes[i] = mode;
		if(mode.mapping >= header.mapping.length) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 205, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
		}
	}
	while(decodeState.bytesInSeg != 0 || !decodeState.lastSeg && decodeState.next() != 0) {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		decodeState.input.readByte();
	}
	return header;
};
kha_audio2_ogg_vorbis_data_Header.prototype = {
	maximumBitRate: null
	,nominalBitRate: null
	,minimumBitRate: null
	,sampleRate: null
	,channel: null
	,blocksize0: null
	,blocksize1: null
	,codebooks: null
	,floorConfig: null
	,residueConfig: null
	,mapping: null
	,modes: null
	,comment: null
	,vendor: null
	,__class__: kha_audio2_ogg_vorbis_data_Header
};
var kha_audio2_ogg_vorbis_data_IntPoint = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.IntPoint"] = kha_audio2_ogg_vorbis_data_IntPoint;
kha_audio2_ogg_vorbis_data_IntPoint.__name__ = true;
kha_audio2_ogg_vorbis_data_IntPoint.prototype = {
	x: null
	,y: null
	,__class__: kha_audio2_ogg_vorbis_data_IntPoint
};
var kha_audio2_ogg_vorbis_data_Mapping = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Mapping"] = kha_audio2_ogg_vorbis_data_Mapping;
kha_audio2_ogg_vorbis_data_Mapping.__name__ = true;
kha_audio2_ogg_vorbis_data_Mapping.read = function(decodeState,channels) {
	var m = new kha_audio2_ogg_vorbis_data_Mapping();
	var mappingType = decodeState.readBits(16);
	if(mappingType != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"mapping type " + mappingType,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 22, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
	}
	var this1 = new Array(channels);
	m.chan = this1;
	var _g = 0;
	var _g1 = channels;
	while(_g < _g1) {
		var j = _g++;
		m.chan[j] = new kha_audio2_ogg_vorbis_data_MappingChannel();
	}
	if(decodeState.readBits(1) != 0) {
		m.submaps = decodeState.readBits(4) + 1;
	} else {
		m.submaps = 1;
	}
	if(decodeState.readBits(1) != 0) {
		m.couplingSteps = decodeState.readBits(8) + 1;
		var _g = 0;
		var _g1 = m.couplingSteps;
		while(_g < _g1) {
			var k = _g++;
			var n = channels - 1;
			var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
			m.chan[k].magnitude = decodeState.readBits(n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0);
			var n1 = channels - 1;
			var log2_41 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
			m.chan[k].angle = decodeState.readBits(n1 < 16384 ? n1 < 16 ? log2_41[n1] : n1 < 512 ? 5 + log2_41[n1 >> 5] : 10 + log2_41[n1 >> 10] : n1 < 16777216 ? n1 < 524288 ? 15 + log2_41[n1 >> 15] : 20 + log2_41[n1 >> 20] : n1 < 536870912 ? 25 + log2_41[n1 >> 25] : n1 < -2147483648 ? 30 + log2_41[n1 >> 30] : 0);
			if(m.chan[k].magnitude >= channels) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 46, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
			}
			if(m.chan[k].angle >= channels) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 49, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
			}
			if(m.chan[k].magnitude == m.chan[k].angle) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 52, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
			}
		}
	} else {
		m.couplingSteps = 0;
	}
	if(decodeState.readBits(2) != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 61, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
	}
	if(m.submaps > 1) {
		var _g = 0;
		var _g1 = channels;
		while(_g < _g1) {
			var j = _g++;
			m.chan[j].mux = decodeState.readBits(4);
			if(m.chan[j].mux >= m.submaps) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 67, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
			}
		}
	} else {
		var _g = 0;
		var _g1 = channels;
		while(_g < _g1) {
			var j = _g++;
			m.chan[j].mux = 0;
		}
	}
	var this1 = new Array(m.submaps);
	m.submapFloor = this1;
	var this1 = new Array(m.submaps);
	m.submapResidue = this1;
	var _g = 0;
	var _g1 = m.submaps;
	while(_g < _g1) {
		var j = _g++;
		decodeState.readBits(8);
		m.submapFloor[j] = decodeState.readBits(8);
		m.submapResidue[j] = decodeState.readBits(8);
	}
	return m;
};
kha_audio2_ogg_vorbis_data_Mapping.prototype = {
	couplingSteps: null
	,chan: null
	,submaps: null
	,submapFloor: null
	,submapResidue: null
	,doFloor: function(floors,i,n,target,finalY,step2Flag) {
		var n2 = n >> 1;
		var s = this.chan[i].mux;
		var floor;
		var floor = floors[this.submapFloor[s]];
		if(floor.type == 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 94, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "doFloor"}));
		} else {
			var g = floor.floor1;
			var lx = 0;
			var ly = finalY[0] * g.floor1Multiplier;
			var _g = 1;
			var _g1 = g.values;
			while(_g < _g1) {
				var q = _g++;
				var j = g.sortedOrder[q];
				if(finalY[j] >= 0) {
					var hy = finalY[j] * g.floor1Multiplier;
					var hx = g.xlist[j];
					kha_audio2_ogg_vorbis_VorbisTools.drawLine(target,lx,ly,hx,hy,n2);
					lx = hx;
					ly = hy;
				}
			}
			if(lx < n2) {
				var _g = lx;
				var _g1 = n2;
				while(_g < _g1) {
					var j = _g++;
					target[j] *= kha_audio2_ogg_vorbis_VorbisTools.INVERSE_DB_TABLE[ly];
				}
			}
		}
	}
	,__class__: kha_audio2_ogg_vorbis_data_Mapping
};
var kha_audio2_ogg_vorbis_data_MappingChannel = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.MappingChannel"] = kha_audio2_ogg_vorbis_data_MappingChannel;
kha_audio2_ogg_vorbis_data_MappingChannel.__name__ = true;
kha_audio2_ogg_vorbis_data_MappingChannel.prototype = {
	magnitude: null
	,angle: null
	,mux: null
	,__class__: kha_audio2_ogg_vorbis_data_MappingChannel
};
var kha_audio2_ogg_vorbis_data_Mode = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Mode"] = kha_audio2_ogg_vorbis_data_Mode;
kha_audio2_ogg_vorbis_data_Mode.__name__ = true;
kha_audio2_ogg_vorbis_data_Mode.read = function(decodeState) {
	var m = new kha_audio2_ogg_vorbis_data_Mode();
	m.blockflag = decodeState.readBits(1) != 0;
	m.windowtype = decodeState.readBits(16);
	m.transformtype = decodeState.readBits(16);
	m.mapping = decodeState.readBits(8);
	if(m.windowtype != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mode.hx", lineNumber : 22, className : "kha.audio2.ogg.vorbis.data.Mode", methodName : "read"}));
	}
	if(m.transformtype != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mode.hx", lineNumber : 25, className : "kha.audio2.ogg.vorbis.data.Mode", methodName : "read"}));
	}
	return m;
};
kha_audio2_ogg_vorbis_data_Mode.prototype = {
	blockflag: null
	,mapping: null
	,windowtype: null
	,transformtype: null
	,__class__: kha_audio2_ogg_vorbis_data_Mode
};
var kha_audio2_ogg_vorbis_data_Page = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Page"] = kha_audio2_ogg_vorbis_data_Page;
kha_audio2_ogg_vorbis_data_Page.__name__ = true;
kha_audio2_ogg_vorbis_data_Page.prototype = {
	flag: null
	,clone: function() {
		var page = new kha_audio2_ogg_vorbis_data_Page();
		page.flag = this.flag;
		return page;
	}
	,start: function(decodeState) {
		var tmp;
		var tmp1;
		var tmp2;
		decodeState.inputPosition += 1;
		if(decodeState.input.readByte() == 79) {
			decodeState.inputPosition += 1;
			tmp2 = decodeState.input.readByte() != 103;
		} else {
			tmp2 = true;
		}
		if(!tmp2) {
			decodeState.inputPosition += 1;
			tmp1 = decodeState.input.readByte() != 103;
		} else {
			tmp1 = true;
		}
		if(!tmp1) {
			decodeState.inputPosition += 1;
			tmp = decodeState.input.readByte() != 83;
		} else {
			tmp = true;
		}
		if(tmp) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 324, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "capturePattern"}));
		}
		this.startWithoutCapturePattern(decodeState);
	}
	,startWithoutCapturePattern: function(decodeState) {
		decodeState.inputPosition += 1;
		var version = decodeState.input.readByte();
		if(version != 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM_STRUCTURE_VERSION,"" + version,{ fileName : "kha/audio2/ogg/vorbis/data/Page.hx", lineNumber : 34, className : "kha.audio2.ogg.vorbis.data.Page", methodName : "startWithoutCapturePattern"}));
		}
		decodeState.inputPosition += 1;
		this.flag = decodeState.input.readByte();
		decodeState.inputPosition += 4;
		var loc0 = decodeState.input.readInt32();
		decodeState.inputPosition += 4;
		var loc1 = decodeState.input.readInt32();
		decodeState.inputPosition += 4;
		decodeState.input.readInt32();
		decodeState.inputPosition += 4;
		decodeState.input.readInt32();
		decodeState.inputPosition += 4;
		decodeState.input.readInt32();
		decodeState.setup(loc0,loc1);
	}
	,__class__: kha_audio2_ogg_vorbis_data_Page
};
var kha_audio2_ogg_vorbis_data_PageFlag = function() { };
$hxClasses["kha.audio2.ogg.vorbis.data.PageFlag"] = kha_audio2_ogg_vorbis_data_PageFlag;
kha_audio2_ogg_vorbis_data_PageFlag.__name__ = true;
var kha_audio2_ogg_vorbis_data_ProbedPage = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.ProbedPage"] = kha_audio2_ogg_vorbis_data_ProbedPage;
kha_audio2_ogg_vorbis_data_ProbedPage.__name__ = true;
kha_audio2_ogg_vorbis_data_ProbedPage.prototype = {
	pageStart: null
	,pageEnd: null
	,afterPreviousPageStart: null
	,firstDecodedSample: null
	,lastDecodedSample: null
	,__class__: kha_audio2_ogg_vorbis_data_ProbedPage
};
var kha_audio2_ogg_vorbis_data_ReaderError = function(type,message,posInfos) {
	if(message == null) {
		message = "";
	}
	this.type = type;
	this.message = message;
	this.posInfos = posInfos;
};
$hxClasses["kha.audio2.ogg.vorbis.data.ReaderError"] = kha_audio2_ogg_vorbis_data_ReaderError;
kha_audio2_ogg_vorbis_data_ReaderError.__name__ = true;
kha_audio2_ogg_vorbis_data_ReaderError.prototype = {
	type: null
	,message: null
	,posInfos: null
	,__class__: kha_audio2_ogg_vorbis_data_ReaderError
};
var kha_audio2_ogg_vorbis_data_ReaderErrorType = $hxEnums["kha.audio2.ogg.vorbis.data.ReaderErrorType"] = { __ename__:true,__constructs__:null
	,NEED_MORE_DATA: {_hx_name:"NEED_MORE_DATA",_hx_index:0,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_API_MIXING: {_hx_name:"INVALID_API_MIXING",_hx_index:1,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,OUTOFMEM: {_hx_name:"OUTOFMEM",_hx_index:2,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,FEATURE_NOT_SUPPORTED: {_hx_name:"FEATURE_NOT_SUPPORTED",_hx_index:3,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,TOO_MANY_CHANNELS: {_hx_name:"TOO_MANY_CHANNELS",_hx_index:4,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,FILE_OPEN_FAILURE: {_hx_name:"FILE_OPEN_FAILURE",_hx_index:5,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,SEEK_WITHOUT_LENGTH: {_hx_name:"SEEK_WITHOUT_LENGTH",_hx_index:6,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,UNEXPECTED_EOF: {_hx_name:"UNEXPECTED_EOF",_hx_index:7,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,SEEK_INVALID: {_hx_name:"SEEK_INVALID",_hx_index:8,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_SETUP: {_hx_name:"INVALID_SETUP",_hx_index:9,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_STREAM: {_hx_name:"INVALID_STREAM",_hx_index:10,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,MISSING_CAPTURE_PATTERN: {_hx_name:"MISSING_CAPTURE_PATTERN",_hx_index:11,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_STREAM_STRUCTURE_VERSION: {_hx_name:"INVALID_STREAM_STRUCTURE_VERSION",_hx_index:12,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,CONTINUED_PACKET_FLAG_INVALID: {_hx_name:"CONTINUED_PACKET_FLAG_INVALID",_hx_index:13,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INCORRECT_STREAM_SERIAL_NUMBER: {_hx_name:"INCORRECT_STREAM_SERIAL_NUMBER",_hx_index:14,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_FIRST_PAGE: {_hx_name:"INVALID_FIRST_PAGE",_hx_index:15,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,BAD_PACKET_TYPE: {_hx_name:"BAD_PACKET_TYPE",_hx_index:16,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,CANT_FIND_LAST_PAGE: {_hx_name:"CANT_FIND_LAST_PAGE",_hx_index:17,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,SEEK_FAILED: {_hx_name:"SEEK_FAILED",_hx_index:18,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,OTHER: {_hx_name:"OTHER",_hx_index:19,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
};
kha_audio2_ogg_vorbis_data_ReaderErrorType.__constructs__ = [kha_audio2_ogg_vorbis_data_ReaderErrorType.NEED_MORE_DATA,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_API_MIXING,kha_audio2_ogg_vorbis_data_ReaderErrorType.OUTOFMEM,kha_audio2_ogg_vorbis_data_ReaderErrorType.FEATURE_NOT_SUPPORTED,kha_audio2_ogg_vorbis_data_ReaderErrorType.TOO_MANY_CHANNELS,kha_audio2_ogg_vorbis_data_ReaderErrorType.FILE_OPEN_FAILURE,kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_WITHOUT_LENGTH,kha_audio2_ogg_vorbis_data_ReaderErrorType.UNEXPECTED_EOF,kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_INVALID,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM_STRUCTURE_VERSION,kha_audio2_ogg_vorbis_data_ReaderErrorType.CONTINUED_PACKET_FLAG_INVALID,kha_audio2_ogg_vorbis_data_ReaderErrorType.INCORRECT_STREAM_SERIAL_NUMBER,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,kha_audio2_ogg_vorbis_data_ReaderErrorType.BAD_PACKET_TYPE,kha_audio2_ogg_vorbis_data_ReaderErrorType.CANT_FIND_LAST_PAGE,kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,kha_audio2_ogg_vorbis_data_ReaderErrorType.OTHER];
var kha_audio2_ogg_vorbis_data_Residue = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Residue"] = kha_audio2_ogg_vorbis_data_Residue;
kha_audio2_ogg_vorbis_data_Residue.__name__ = true;
kha_audio2_ogg_vorbis_data_Residue.read = function(decodeState,codebooks) {
	var r = new kha_audio2_ogg_vorbis_data_Residue();
	r.type = decodeState.readBits(16);
	if(r.type > 2) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Residue.hx", lineNumber : 29, className : "kha.audio2.ogg.vorbis.data.Residue", methodName : "read"}));
	}
	var this1 = new Array(64);
	var residueCascade = this1;
	r.begin = decodeState.readBits(24);
	r.end = decodeState.readBits(24);
	r.partSize = decodeState.readBits(24) + 1;
	var classifications = r.classifications = decodeState.readBits(6) + 1;
	r.classbook = decodeState.readBits(8);
	var _g = 0;
	var _g1 = r.classifications;
	while(_g < _g1) {
		var j = _g++;
		var highBits = 0;
		var lowBits = decodeState.readBits(3);
		if(decodeState.readBits(1) != 0) {
			highBits = decodeState.readBits(5);
		}
		residueCascade[j] = highBits * 8 + lowBits;
	}
	var this1 = new Array(r.classifications);
	r.residueBooks = this1;
	var _g = 0;
	var _g1 = r.classifications;
	while(_g < _g1) {
		var j = _g++;
		var this1 = r.residueBooks;
		var this2 = new Array(8);
		this1[j] = this2;
		var _g2 = 0;
		while(_g2 < 8) {
			var k = _g2++;
			if((residueCascade[j] & 1 << k) != 0) {
				r.residueBooks[j][k] = decodeState.readBits(8);
				if(r.residueBooks[j][k] >= codebooks.length) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Residue.hx", lineNumber : 55, className : "kha.audio2.ogg.vorbis.data.Residue", methodName : "read"}));
				}
			} else {
				r.residueBooks[j][k] = -1;
			}
		}
	}
	var el = codebooks[r.classbook].entries;
	var classwords = codebooks[r.classbook].dimensions;
	var this1 = new Array(el);
	r.classdata = this1;
	var _g = 0;
	var _g1 = el;
	while(_g < _g1) {
		var j = _g++;
		var temp = j;
		var k = classwords;
		var this1 = r.classdata;
		var this2 = new Array(classwords);
		var cd = this1[j] = this2;
		while(--k >= 0) {
			cd[k] = temp % classifications;
			temp = temp / classifications | 0;
		}
	}
	return r;
};
kha_audio2_ogg_vorbis_data_Residue.prototype = {
	begin: null
	,end: null
	,partSize: null
	,classifications: null
	,classbook: null
	,classdata: null
	,residueBooks: null
	,type: null
	,decode: function(decodeState,header,residueBuffers,ch,n,doNotDecode,channelBuffers) {
		var codebooks = header.codebooks;
		var classwords = codebooks[this.classbook].dimensions;
		var nRead = this.end - this.begin;
		var partSize = this.partSize;
		var partRead = UInt.toFloat(nRead) / UInt.toFloat(partSize) | 0;
		var this1 = new Array(header.channel * partRead + 1);
		var classifications = this1;
		var _g = 0;
		var _g1 = ch;
		while(_g < _g1) {
			var i = _g++;
			if(!doNotDecode[i]) {
				var buffer = residueBuffers[i];
				var _g2 = 0;
				var _g3 = buffer.length;
				while(_g2 < _g3) {
					var j = _g2++;
					buffer[j] = 0;
				}
			}
		}
		if(this.type == 2 && ch != 1) {
			var _g = 0;
			var _g1 = ch;
			while(_g < _g1) {
				var j = _g++;
				if(!doNotDecode[j]) {
					break;
				} else if(j == ch - 1) {
					return;
				}
			}
			var _g = 0;
			while(_g < 8) {
				var pass = _g++;
				var pcount = 0;
				var classSet = 0;
				if(ch == 2) {
					while(pcount < partRead) {
						var z = this.begin + pcount * partSize;
						var cInter = z & 1;
						var pInter = z >>> 1;
						if(pass == 0) {
							var c = codebooks[this.classbook];
							if(decodeState.validBits < 10) {
								decodeState.prepHuffman();
							}
							var i = c.fastHuffman[decodeState.acc & 1023];
							var val;
							if(i >= 0) {
								var l = c.codewordLengths[i];
								decodeState.acc = decodeState.acc >>> l;
								decodeState.validBits -= l;
								if(decodeState.validBits < 0) {
									decodeState.validBits = 0;
									val = -1;
								} else {
									val = i;
								}
							} else {
								val = decodeState.decodeScalarRaw(c);
							}
							if(c.sparse) {
								val = c.sortedValues[val];
							}
							var q = val;
							if(q == -1) {
								return;
							}
							var i1 = classwords;
							while(--i1 >= 0) {
								classifications[i1 + pcount] = q % this.classifications;
								q = q / this.classifications | 0;
							}
						}
						var _g1 = 0;
						var _g2 = classwords;
						while(_g1 < _g2) {
							var i2 = _g1++;
							if(pcount >= partRead) {
								break;
							}
							var z1 = this.begin + pcount * partSize;
							var c1 = classifications[pcount];
							var b = this.residueBooks[c1][pass];
							if(b >= 0) {
								var book = codebooks[b];
								var result = book.decodeDeinterleaveRepeat(decodeState,residueBuffers,ch,cInter,pInter,n,partSize);
								if(result == null) {
									return;
								} else {
									cInter = result.cInter;
									pInter = result.pInter;
								}
							} else {
								z1 = z1 + partSize;
								cInter = z1 & 1;
								pInter = z1 >>> 1;
							}
							++pcount;
						}
					}
				} else if(ch == 1) {
					while(pcount < partRead) {
						var z2 = this.begin + pcount * partSize;
						var cInter1 = 0;
						var pInter1 = z2;
						if(pass == 0) {
							var c2 = codebooks[this.classbook];
							if(decodeState.validBits < 10) {
								decodeState.prepHuffman();
							}
							var i3 = c2.fastHuffman[decodeState.acc & 1023];
							var val1;
							if(i3 >= 0) {
								var l1 = c2.codewordLengths[i3];
								decodeState.acc = decodeState.acc >>> l1;
								decodeState.validBits -= l1;
								if(decodeState.validBits < 0) {
									decodeState.validBits = 0;
									val1 = -1;
								} else {
									val1 = i3;
								}
							} else {
								val1 = decodeState.decodeScalarRaw(c2);
							}
							if(c2.sparse) {
								val1 = c2.sortedValues[val1];
							}
							var q1 = val1;
							if(q1 == -1) {
								return;
							}
							var i4 = classwords;
							while(--i4 >= 0) {
								classifications[i4 + pcount] = q1 % this.classifications;
								q1 = q1 / this.classifications | 0;
							}
						}
						var _g3 = 0;
						var _g4 = classwords;
						while(_g3 < _g4) {
							var i5 = _g3++;
							if(pcount >= partRead) {
								break;
							}
							var z3 = this.begin + pcount * partSize;
							var b1 = this.residueBooks[classifications[pcount]][pass];
							if(b1 >= 0) {
								var book1 = codebooks[b1];
								var result1 = book1.decodeDeinterleaveRepeat(decodeState,residueBuffers,ch,cInter1,pInter1,n,partSize);
								if(result1 == null) {
									return;
								} else {
									cInter1 = result1.cInter;
									pInter1 = result1.pInter;
								}
							} else {
								z3 = z3 + partSize;
								cInter1 = 0;
								pInter1 = z3;
							}
							++pcount;
						}
					}
				} else {
					while(pcount < partRead) {
						var z4 = this.begin + pcount * partSize;
						var cInter2 = UInt.toFloat(z4) % UInt.toFloat(ch) | 0;
						var pInter2 = UInt.toFloat(z4) / UInt.toFloat(ch) | 0;
						if(pass == 0) {
							var c3 = codebooks[this.classbook];
							if(decodeState.validBits < 10) {
								decodeState.prepHuffman();
							}
							var i6 = c3.fastHuffman[decodeState.acc & 1023];
							var val2;
							if(i6 >= 0) {
								var l2 = c3.codewordLengths[i6];
								decodeState.acc = decodeState.acc >>> l2;
								decodeState.validBits -= l2;
								if(decodeState.validBits < 0) {
									decodeState.validBits = 0;
									val2 = -1;
								} else {
									val2 = i6;
								}
							} else {
								val2 = decodeState.decodeScalarRaw(c3);
							}
							if(c3.sparse) {
								val2 = c3.sortedValues[val2];
							}
							var q2 = val2;
							if(q2 == -1) {
								return;
							}
							var i7 = classwords;
							while(--i7 >= 0) {
								classifications[i7 + pcount] = q2 % this.classifications;
								q2 = q2 / this.classifications | 0;
							}
						}
						var _g5 = 0;
						var _g6 = classwords;
						while(_g5 < _g6) {
							var i8 = _g5++;
							if(pcount >= partRead) {
								break;
							}
							var z5 = this.begin + pcount * partSize;
							var b2 = this.residueBooks[classifications[pcount]][pass];
							if(b2 >= 0) {
								var book2 = codebooks[b2];
								var result2 = book2.decodeDeinterleaveRepeat(decodeState,residueBuffers,ch,cInter2,pInter2,n,partSize);
								if(result2 == null) {
									return;
								} else {
									cInter2 = result2.cInter;
									pInter2 = result2.pInter;
								}
							} else {
								z5 = z5 + partSize;
								cInter2 = UInt.toFloat(z5) % UInt.toFloat(ch) | 0;
								pInter2 = UInt.toFloat(z5) / UInt.toFloat(ch) | 0;
							}
							++pcount;
						}
					}
				}
			}
			return;
		}
		var _g = 0;
		while(_g < 8) {
			var pass = _g++;
			var pcount = 0;
			var classSet = 0;
			while(pcount < partRead) {
				if(pass == 0) {
					var _g1 = 0;
					var _g2 = ch;
					while(_g1 < _g2) {
						var j = _g1++;
						if(!doNotDecode[j]) {
							var c = codebooks[this.classbook];
							if(decodeState.validBits < 10) {
								decodeState.prepHuffman();
							}
							var i = c.fastHuffman[decodeState.acc & 1023];
							var val;
							if(i >= 0) {
								var l = c.codewordLengths[i];
								decodeState.acc = decodeState.acc >>> l;
								decodeState.validBits -= l;
								if(decodeState.validBits < 0) {
									decodeState.validBits = 0;
									val = -1;
								} else {
									val = i;
								}
							} else {
								val = decodeState.decodeScalarRaw(c);
							}
							if(c.sparse) {
								val = c.sortedValues[val];
							}
							var temp = val;
							if(temp == -1) {
								return;
							}
							var i1 = classwords;
							while(--i1 >= 0) {
								classifications[j * partRead + i1 + pcount] = temp % this.classifications;
								temp = temp / this.classifications | 0;
							}
						}
					}
				}
				var _g3 = 0;
				var _g4 = classwords;
				while(_g3 < _g4) {
					var i2 = _g3++;
					if(pcount >= partRead) {
						break;
					}
					var _g5 = 0;
					var _g6 = ch;
					while(_g5 < _g6) {
						var j1 = _g5++;
						if(!doNotDecode[j1]) {
							var c1 = classifications[j1 * partRead + pcount];
							var b = this.residueBooks[c1][pass];
							if(b >= 0) {
								var target = residueBuffers[j1];
								var offset = this.begin + pcount * partSize;
								var n = partSize;
								var book = codebooks[b];
								if(!book.residueDecode(decodeState,target,offset,n,this.type)) {
									return;
								}
							}
						}
					}
					++pcount;
				}
			}
		}
	}
	,__class__: kha_audio2_ogg_vorbis_data_Residue
};
var kha_audio2_ogg_vorbis_data_Setting = function() { };
$hxClasses["kha.audio2.ogg.vorbis.data.Setting"] = kha_audio2_ogg_vorbis_data_Setting;
kha_audio2_ogg_vorbis_data_Setting.__name__ = true;
var kha_graphics1_Graphics = function() { };
$hxClasses["kha.graphics1.Graphics"] = kha_graphics1_Graphics;
kha_graphics1_Graphics.__name__ = true;
kha_graphics1_Graphics.__isInterface__ = true;
kha_graphics1_Graphics.prototype = {
	begin: null
	,end: null
	,setPixel: null
	,__class__: kha_graphics1_Graphics
};
var kha_graphics2_Graphics = function() {
	this.transformations = [new kha_math_FastMatrix3(1,0,0,0,1,0,0,0,1)];
	this.transformationIndex = 0;
	this.opacities = [1];
	this.myFontSize = 12;
	this.pipe = null;
};
$hxClasses["kha.graphics2.Graphics"] = kha_graphics2_Graphics;
kha_graphics2_Graphics.__name__ = true;
kha_graphics2_Graphics.prototype = {
	begin: function(clear,clearColor) {
		if(clear == null) {
			clear = true;
		}
	}
	,end: function() {
	}
	,flush: function() {
	}
	,clear: function(color) {
	}
	,drawImage: function(img,x,y) {
		this.drawSubImage(img,x,y,0,0,img.get_width(),img.get_height());
	}
	,drawSubImage: function(img,x,y,sx,sy,sw,sh) {
		this.drawScaledSubImage(img,sx,sy,sw,sh,x,y,sw,sh);
	}
	,drawScaledImage: function(img,dx,dy,dw,dh) {
		this.drawScaledSubImage(img,0,0,img.get_width(),img.get_height(),dx,dy,dw,dh);
	}
	,drawScaledSubImage: function(img,sx,sy,sw,sh,dx,dy,dw,dh) {
	}
	,drawRect: function(x,y,width,height,strength) {
		if(strength == null) {
			strength = 1.0;
		}
	}
	,fillRect: function(x,y,width,height) {
	}
	,drawString: function(text,x,y) {
	}
	,drawCharacters: function(text,start,length,x,y) {
	}
	,drawLine: function(x1,y1,x2,y2,strength) {
		if(strength == null) {
			strength = 1.0;
		}
	}
	,drawVideo: function(video,x,y,width,height) {
	}
	,fillTriangle: function(x1,y1,x2,y2,x3,y3) {
	}
	,get_imageScaleQuality: function() {
		return 0;
	}
	,set_imageScaleQuality: function(value) {
		return 1;
	}
	,get_mipmapScaleQuality: function() {
		return 0;
	}
	,set_mipmapScaleQuality: function(value) {
		return 1;
	}
	,get_color: function() {
		return -16777216;
	}
	,set_color: function(color) {
		return -16777216;
	}
	,get_font: function() {
		return null;
	}
	,set_font: function(font) {
		return null;
	}
	,get_fontSize: function() {
		return this.myFontSize;
	}
	,set_fontSize: function(value) {
		return this.myFontSize = value;
	}
	,get_transformation: function() {
		return this.transformations[this.transformationIndex];
	}
	,set_transformation: function(transformation) {
		this.setTransformation(transformation);
		var _this = this.transformations[this.transformationIndex];
		_this._00 = transformation._00;
		_this._10 = transformation._10;
		_this._20 = transformation._20;
		_this._01 = transformation._01;
		_this._11 = transformation._11;
		_this._21 = transformation._21;
		_this._02 = transformation._02;
		_this._12 = transformation._12;
		_this._22 = transformation._22;
		return transformation;
	}
	,pushTransformation: function(trans) {
		this.transformationIndex++;
		if(this.transformationIndex == this.transformations.length) {
			this.transformations.push(new kha_math_FastMatrix3(1,0,0,0,1,0,0,0,1));
		}
		var _this = this.transformations[this.transformationIndex];
		_this._00 = trans._00;
		_this._10 = trans._10;
		_this._20 = trans._20;
		_this._01 = trans._01;
		_this._11 = trans._11;
		_this._21 = trans._21;
		_this._02 = trans._02;
		_this._12 = trans._12;
		_this._22 = trans._22;
		this.setTransformation(this.transformations[this.transformationIndex]);
	}
	,popTransformation: function() {
		this.transformationIndex--;
		if(this.transformationIndex == -1) {
			throw haxe_Exception.thrown("There is no transformation matrix to remove, check your push/popTransformation code");
		}
		this.setTransformation(this.transformations[this.transformationIndex]);
		return this.transformations[this.transformationIndex + 1];
	}
	,scale: function(x,y) {
		var _this = this.transformations[this.transformationIndex];
		var _this__00 = x;
		var _this__10 = 0;
		var _this__20 = 0;
		var _this__01 = 0;
		var _this__11 = y;
		var _this__21 = 0;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m = this.transformations[this.transformationIndex];
		var m__00 = _this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02;
		var m__10 = _this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12;
		var m__20 = _this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22;
		var m__01 = _this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02;
		var m__11 = _this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12;
		var m__21 = _this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22;
		var m__02 = _this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02;
		var m__12 = _this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12;
		var m__22 = _this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22;
		_this._00 = m__00;
		_this._10 = m__10;
		_this._20 = m__20;
		_this._01 = m__01;
		_this._11 = m__11;
		_this._21 = m__21;
		_this._02 = m__02;
		_this._12 = m__12;
		_this._22 = m__22;
	}
	,pushScale: function(x,y) {
		var _this__00 = x;
		var _this__10 = 0;
		var _this__20 = 0;
		var _this__01 = 0;
		var _this__11 = y;
		var _this__21 = 0;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m = this.transformations[this.transformationIndex];
		var mat__00 = _this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02;
		var mat__10 = _this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12;
		var mat__20 = _this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22;
		var mat__01 = _this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02;
		var mat__11 = _this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12;
		var mat__21 = _this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22;
		var mat__02 = _this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02;
		var mat__12 = _this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12;
		var mat__22 = _this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22;
		this.transformationIndex++;
		if(this.transformationIndex == this.transformations.length) {
			this.transformations.push(new kha_math_FastMatrix3(1,0,0,0,1,0,0,0,1));
		}
		var _this = this.transformations[this.transformationIndex];
		_this._00 = mat__00;
		_this._10 = mat__10;
		_this._20 = mat__20;
		_this._01 = mat__01;
		_this._11 = mat__11;
		_this._21 = mat__21;
		_this._02 = mat__02;
		_this._12 = mat__12;
		_this._22 = mat__22;
		this.setTransformation(this.transformations[this.transformationIndex]);
	}
	,translation: function(tx,ty) {
		var _this__00 = 1;
		var _this__10 = 0;
		var _this__20 = tx;
		var _this__01 = 0;
		var _this__11 = 1;
		var _this__21 = ty;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m = this.transformations[this.transformationIndex];
		return new kha_math_FastMatrix3(_this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02,_this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12,_this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22,_this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02,_this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12,_this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22,_this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02,_this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12,_this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22);
	}
	,translate: function(tx,ty) {
		var _this = this.transformations[this.transformationIndex];
		var _this__00 = 1;
		var _this__10 = 0;
		var _this__20 = tx;
		var _this__01 = 0;
		var _this__11 = 1;
		var _this__21 = ty;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m = this.transformations[this.transformationIndex];
		var m__00 = _this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02;
		var m__10 = _this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12;
		var m__20 = _this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22;
		var m__01 = _this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02;
		var m__11 = _this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12;
		var m__21 = _this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22;
		var m__02 = _this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02;
		var m__12 = _this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12;
		var m__22 = _this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22;
		_this._00 = m__00;
		_this._10 = m__10;
		_this._20 = m__20;
		_this._01 = m__01;
		_this._11 = m__11;
		_this._21 = m__21;
		_this._02 = m__02;
		_this._12 = m__12;
		_this._22 = m__22;
	}
	,pushTranslation: function(tx,ty) {
		var _this__00 = 1;
		var _this__10 = 0;
		var _this__20 = tx;
		var _this__01 = 0;
		var _this__11 = 1;
		var _this__21 = ty;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m = this.transformations[this.transformationIndex];
		var trans__00 = _this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02;
		var trans__10 = _this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12;
		var trans__20 = _this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22;
		var trans__01 = _this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02;
		var trans__11 = _this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12;
		var trans__21 = _this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22;
		var trans__02 = _this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02;
		var trans__12 = _this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12;
		var trans__22 = _this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22;
		this.transformationIndex++;
		if(this.transformationIndex == this.transformations.length) {
			this.transformations.push(new kha_math_FastMatrix3(1,0,0,0,1,0,0,0,1));
		}
		var _this = this.transformations[this.transformationIndex];
		_this._00 = trans__00;
		_this._10 = trans__10;
		_this._20 = trans__20;
		_this._01 = trans__01;
		_this._11 = trans__11;
		_this._21 = trans__21;
		_this._02 = trans__02;
		_this._12 = trans__12;
		_this._22 = trans__22;
		this.setTransformation(this.transformations[this.transformationIndex]);
	}
	,rotation: function(angle,centerx,centery) {
		var _this__00 = 1;
		var _this__10 = 0;
		var _this__20 = centerx;
		var _this__01 = 0;
		var _this__11 = 1;
		var _this__21 = centery;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m__00 = Math.cos(angle);
		var m__10 = -Math.sin(angle);
		var m__20 = 0;
		var m__01 = Math.sin(angle);
		var m__11 = Math.cos(angle);
		var m__21 = 0;
		var m__02 = 0;
		var m__12 = 0;
		var m__22 = 1;
		var _this__001 = _this__00 * m__00 + _this__10 * m__01 + _this__20 * m__02;
		var _this__101 = _this__00 * m__10 + _this__10 * m__11 + _this__20 * m__12;
		var _this__201 = _this__00 * m__20 + _this__10 * m__21 + _this__20 * m__22;
		var _this__011 = _this__01 * m__00 + _this__11 * m__01 + _this__21 * m__02;
		var _this__111 = _this__01 * m__10 + _this__11 * m__11 + _this__21 * m__12;
		var _this__211 = _this__01 * m__20 + _this__11 * m__21 + _this__21 * m__22;
		var _this__021 = _this__02 * m__00 + _this__12 * m__01 + _this__22 * m__02;
		var _this__121 = _this__02 * m__10 + _this__12 * m__11 + _this__22 * m__12;
		var _this__221 = _this__02 * m__20 + _this__12 * m__21 + _this__22 * m__22;
		var m__00 = 1;
		var m__10 = 0;
		var m__20 = -centerx;
		var m__01 = 0;
		var m__11 = 1;
		var m__21 = -centery;
		var m__02 = 0;
		var m__12 = 0;
		var m__22 = 1;
		var _this__00 = _this__001 * m__00 + _this__101 * m__01 + _this__201 * m__02;
		var _this__10 = _this__001 * m__10 + _this__101 * m__11 + _this__201 * m__12;
		var _this__20 = _this__001 * m__20 + _this__101 * m__21 + _this__201 * m__22;
		var _this__01 = _this__011 * m__00 + _this__111 * m__01 + _this__211 * m__02;
		var _this__11 = _this__011 * m__10 + _this__111 * m__11 + _this__211 * m__12;
		var _this__21 = _this__011 * m__20 + _this__111 * m__21 + _this__211 * m__22;
		var _this__02 = _this__021 * m__00 + _this__121 * m__01 + _this__221 * m__02;
		var _this__12 = _this__021 * m__10 + _this__121 * m__11 + _this__221 * m__12;
		var _this__22 = _this__021 * m__20 + _this__121 * m__21 + _this__221 * m__22;
		var m = this.transformations[this.transformationIndex];
		return new kha_math_FastMatrix3(_this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02,_this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12,_this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22,_this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02,_this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12,_this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22,_this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02,_this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12,_this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22);
	}
	,rotate: function(angle,centerx,centery) {
		var _this = this.transformations[this.transformationIndex];
		var _this__00 = 1;
		var _this__10 = 0;
		var _this__20 = centerx;
		var _this__01 = 0;
		var _this__11 = 1;
		var _this__21 = centery;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m__00 = Math.cos(angle);
		var m__10 = -Math.sin(angle);
		var m__20 = 0;
		var m__01 = Math.sin(angle);
		var m__11 = Math.cos(angle);
		var m__21 = 0;
		var m__02 = 0;
		var m__12 = 0;
		var m__22 = 1;
		var _this__001 = _this__00 * m__00 + _this__10 * m__01 + _this__20 * m__02;
		var _this__101 = _this__00 * m__10 + _this__10 * m__11 + _this__20 * m__12;
		var _this__201 = _this__00 * m__20 + _this__10 * m__21 + _this__20 * m__22;
		var _this__011 = _this__01 * m__00 + _this__11 * m__01 + _this__21 * m__02;
		var _this__111 = _this__01 * m__10 + _this__11 * m__11 + _this__21 * m__12;
		var _this__211 = _this__01 * m__20 + _this__11 * m__21 + _this__21 * m__22;
		var _this__021 = _this__02 * m__00 + _this__12 * m__01 + _this__22 * m__02;
		var _this__121 = _this__02 * m__10 + _this__12 * m__11 + _this__22 * m__12;
		var _this__221 = _this__02 * m__20 + _this__12 * m__21 + _this__22 * m__22;
		var m__00 = 1;
		var m__10 = 0;
		var m__20 = -centerx;
		var m__01 = 0;
		var m__11 = 1;
		var m__21 = -centery;
		var m__02 = 0;
		var m__12 = 0;
		var m__22 = 1;
		var _this__00 = _this__001 * m__00 + _this__101 * m__01 + _this__201 * m__02;
		var _this__10 = _this__001 * m__10 + _this__101 * m__11 + _this__201 * m__12;
		var _this__20 = _this__001 * m__20 + _this__101 * m__21 + _this__201 * m__22;
		var _this__01 = _this__011 * m__00 + _this__111 * m__01 + _this__211 * m__02;
		var _this__11 = _this__011 * m__10 + _this__111 * m__11 + _this__211 * m__12;
		var _this__21 = _this__011 * m__20 + _this__111 * m__21 + _this__211 * m__22;
		var _this__02 = _this__021 * m__00 + _this__121 * m__01 + _this__221 * m__02;
		var _this__12 = _this__021 * m__10 + _this__121 * m__11 + _this__221 * m__12;
		var _this__22 = _this__021 * m__20 + _this__121 * m__21 + _this__221 * m__22;
		var m = this.transformations[this.transformationIndex];
		var m__00 = _this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02;
		var m__10 = _this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12;
		var m__20 = _this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22;
		var m__01 = _this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02;
		var m__11 = _this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12;
		var m__21 = _this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22;
		var m__02 = _this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02;
		var m__12 = _this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12;
		var m__22 = _this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22;
		_this._00 = m__00;
		_this._10 = m__10;
		_this._20 = m__20;
		_this._01 = m__01;
		_this._11 = m__11;
		_this._21 = m__21;
		_this._02 = m__02;
		_this._12 = m__12;
		_this._22 = m__22;
	}
	,pushRotation: function(angle,centerx,centery) {
		var _this__00 = 1;
		var _this__10 = 0;
		var _this__20 = centerx;
		var _this__01 = 0;
		var _this__11 = 1;
		var _this__21 = centery;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m__00 = Math.cos(angle);
		var m__10 = -Math.sin(angle);
		var m__20 = 0;
		var m__01 = Math.sin(angle);
		var m__11 = Math.cos(angle);
		var m__21 = 0;
		var m__02 = 0;
		var m__12 = 0;
		var m__22 = 1;
		var _this__001 = _this__00 * m__00 + _this__10 * m__01 + _this__20 * m__02;
		var _this__101 = _this__00 * m__10 + _this__10 * m__11 + _this__20 * m__12;
		var _this__201 = _this__00 * m__20 + _this__10 * m__21 + _this__20 * m__22;
		var _this__011 = _this__01 * m__00 + _this__11 * m__01 + _this__21 * m__02;
		var _this__111 = _this__01 * m__10 + _this__11 * m__11 + _this__21 * m__12;
		var _this__211 = _this__01 * m__20 + _this__11 * m__21 + _this__21 * m__22;
		var _this__021 = _this__02 * m__00 + _this__12 * m__01 + _this__22 * m__02;
		var _this__121 = _this__02 * m__10 + _this__12 * m__11 + _this__22 * m__12;
		var _this__221 = _this__02 * m__20 + _this__12 * m__21 + _this__22 * m__22;
		var m__00 = 1;
		var m__10 = 0;
		var m__20 = -centerx;
		var m__01 = 0;
		var m__11 = 1;
		var m__21 = -centery;
		var m__02 = 0;
		var m__12 = 0;
		var m__22 = 1;
		var _this__00 = _this__001 * m__00 + _this__101 * m__01 + _this__201 * m__02;
		var _this__10 = _this__001 * m__10 + _this__101 * m__11 + _this__201 * m__12;
		var _this__20 = _this__001 * m__20 + _this__101 * m__21 + _this__201 * m__22;
		var _this__01 = _this__011 * m__00 + _this__111 * m__01 + _this__211 * m__02;
		var _this__11 = _this__011 * m__10 + _this__111 * m__11 + _this__211 * m__12;
		var _this__21 = _this__011 * m__20 + _this__111 * m__21 + _this__211 * m__22;
		var _this__02 = _this__021 * m__00 + _this__121 * m__01 + _this__221 * m__02;
		var _this__12 = _this__021 * m__10 + _this__121 * m__11 + _this__221 * m__12;
		var _this__22 = _this__021 * m__20 + _this__121 * m__21 + _this__221 * m__22;
		var m = this.transformations[this.transformationIndex];
		var trans__00 = _this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02;
		var trans__10 = _this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12;
		var trans__20 = _this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22;
		var trans__01 = _this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02;
		var trans__11 = _this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12;
		var trans__21 = _this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22;
		var trans__02 = _this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02;
		var trans__12 = _this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12;
		var trans__22 = _this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22;
		this.transformationIndex++;
		if(this.transformationIndex == this.transformations.length) {
			this.transformations.push(new kha_math_FastMatrix3(1,0,0,0,1,0,0,0,1));
		}
		var _this = this.transformations[this.transformationIndex];
		_this._00 = trans__00;
		_this._10 = trans__10;
		_this._20 = trans__20;
		_this._01 = trans__01;
		_this._11 = trans__11;
		_this._21 = trans__21;
		_this._02 = trans__02;
		_this._12 = trans__12;
		_this._22 = trans__22;
		this.setTransformation(this.transformations[this.transformationIndex]);
	}
	,pushOpacity: function(opacity) {
		this.setOpacity(opacity);
		this.opacities.push(opacity);
	}
	,popOpacity: function() {
		var ret = this.opacities.pop();
		this.setOpacity(this.get_opacity());
		return ret;
	}
	,get_opacity: function() {
		return this.opacities[this.opacities.length - 1];
	}
	,set_opacity: function(opacity) {
		this.setOpacity(opacity);
		return this.opacities[this.opacities.length - 1] = opacity;
	}
	,scissor: function(x,y,width,height) {
	}
	,disableScissor: function() {
	}
	,pipe: null
	,get_pipeline: function() {
		return this.pipe;
	}
	,set_pipeline: function(pipeline) {
		this.setPipeline(pipeline);
		return this.pipe = pipeline;
	}
	,transformations: null
	,transformationIndex: null
	,opacities: null
	,myFontSize: null
	,setTransformation: function(transformation) {
	}
	,setOpacity: function(opacity) {
	}
	,setPipeline: function(pipeline) {
	}
	,__class__: kha_graphics2_Graphics
};
var kha_graphics2_Graphics1 = function(canvas) {
	this.canvas = canvas;
};
$hxClasses["kha.graphics2.Graphics1"] = kha_graphics2_Graphics1;
kha_graphics2_Graphics1.__name__ = true;
kha_graphics2_Graphics1.__interfaces__ = [kha_graphics1_Graphics];
kha_graphics2_Graphics1.prototype = {
	canvas: null
	,texture: null
	,pixels: null
	,begin: function() {
		if(this.texture == null || (this.texture.get_realWidth() != this.canvas.get_width() || this.texture.get_realHeight() != this.canvas.get_height())) {
			this.texture = kha_Image.create(this.canvas.get_width(),this.canvas.get_height(),0,2);
		}
		this.pixels = this.texture.lock();
	}
	,end: function() {
		this.texture.unlock();
		this.canvas.get_g2().begin(false);
		this.canvas.get_g2().drawImage(this.texture,0,0);
		this.canvas.get_g2().end();
	}
	,setPixel: function(x,y,color) {
		this.pixels.setInt32(y * this.texture.get_stride() + x * 4,kha_Color.fromBytes(color & 255,(color & 65280) >>> 8,(color & 16711680) >>> 16,color >>> 24));
	}
	,__class__: kha_graphics2_Graphics1
};
var kha_graphics2_truetype_VectorOfIntPointer = function() {
};
$hxClasses["kha.graphics2.truetype.VectorOfIntPointer"] = kha_graphics2_truetype_VectorOfIntPointer;
kha_graphics2_truetype_VectorOfIntPointer.__name__ = true;
kha_graphics2_truetype_VectorOfIntPointer.prototype = {
	value: null
	,__class__: kha_graphics2_truetype_VectorOfIntPointer
};
var kha_graphics2_truetype_Stbtt_$temp_$rect = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_temp_rect"] = kha_graphics2_truetype_Stbtt_$temp_$rect;
kha_graphics2_truetype_Stbtt_$temp_$rect.__name__ = true;
kha_graphics2_truetype_Stbtt_$temp_$rect.prototype = {
	x0: null
	,y0: null
	,x1: null
	,y1: null
	,__class__: kha_graphics2_truetype_Stbtt_$temp_$rect
};
var kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_temp_glyph_h_metrics"] = kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics;
kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics.__name__ = true;
kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics.prototype = {
	advanceWidth: null
	,leftSideBearing: null
	,__class__: kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics
};
var kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_temp_font_v_metrics"] = kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics;
kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics.__name__ = true;
kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics.prototype = {
	ascent: null
	,descent: null
	,lineGap: null
	,__class__: kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics
};
var kha_graphics2_truetype_Stbtt_$temp_$region = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_temp_region"] = kha_graphics2_truetype_Stbtt_$temp_$region;
kha_graphics2_truetype_Stbtt_$temp_$region.__name__ = true;
kha_graphics2_truetype_Stbtt_$temp_$region.prototype = {
	width: null
	,height: null
	,xoff: null
	,yoff: null
	,__class__: kha_graphics2_truetype_Stbtt_$temp_$region
};
var kha_graphics2_truetype_Stbtt_$_$buf = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__buf"] = kha_graphics2_truetype_Stbtt_$_$buf;
kha_graphics2_truetype_Stbtt_$_$buf.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$buf.prototype = {
	data: null
	,cursor: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$buf
};
var kha_graphics2_truetype_Stbtt_$bakedchar = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_bakedchar"] = kha_graphics2_truetype_Stbtt_$bakedchar;
kha_graphics2_truetype_Stbtt_$bakedchar.__name__ = true;
kha_graphics2_truetype_Stbtt_$bakedchar.prototype = {
	x0: null
	,y0: null
	,x1: null
	,y1: null
	,xoff: null
	,yoff: null
	,xadvance: null
	,__class__: kha_graphics2_truetype_Stbtt_$bakedchar
};
var kha_graphics2_truetype_Stbtt_$aligned_$quad = function() { };
$hxClasses["kha.graphics2.truetype.Stbtt_aligned_quad"] = kha_graphics2_truetype_Stbtt_$aligned_$quad;
kha_graphics2_truetype_Stbtt_$aligned_$quad.__name__ = true;
kha_graphics2_truetype_Stbtt_$aligned_$quad.prototype = {
	x0: null
	,y0: null
	,s0: null
	,t0: null
	,x1: null
	,y1: null
	,s1: null
	,t1: null
	,__class__: kha_graphics2_truetype_Stbtt_$aligned_$quad
};
var kha_graphics2_truetype_Stbtt_$packedchar = function() { };
$hxClasses["kha.graphics2.truetype.Stbtt_packedchar"] = kha_graphics2_truetype_Stbtt_$packedchar;
kha_graphics2_truetype_Stbtt_$packedchar.__name__ = true;
kha_graphics2_truetype_Stbtt_$packedchar.prototype = {
	x0: null
	,y0: null
	,x1: null
	,y1: null
	,xoff: null
	,yoff: null
	,xadvance: null
	,xoff2: null
	,yoff2: null
	,__class__: kha_graphics2_truetype_Stbtt_$packedchar
};
var kha_graphics2_truetype_Stbtt_$pack_$range = function() { };
$hxClasses["kha.graphics2.truetype.Stbtt_pack_range"] = kha_graphics2_truetype_Stbtt_$pack_$range;
kha_graphics2_truetype_Stbtt_$pack_$range.__name__ = true;
kha_graphics2_truetype_Stbtt_$pack_$range.prototype = {
	font_size: null
	,first_unicode_codepoint_in_range: null
	,array_of_unicode_codepoints: null
	,num_chars: null
	,chardata_for_range: null
	,h_oversample: null
	,v_oversample: null
	,__class__: kha_graphics2_truetype_Stbtt_$pack_$range
};
var kha_graphics2_truetype_Stbtt_$pack_$context = function() { };
$hxClasses["kha.graphics2.truetype.Stbtt_pack_context"] = kha_graphics2_truetype_Stbtt_$pack_$context;
kha_graphics2_truetype_Stbtt_$pack_$context.__name__ = true;
kha_graphics2_truetype_Stbtt_$pack_$context.prototype = {
	width: null
	,height: null
	,stride_in_bytes: null
	,padding: null
	,h_oversample: null
	,v_oversample: null
	,pixels: null
	,__class__: kha_graphics2_truetype_Stbtt_$pack_$context
};
var kha_graphics2_truetype_Stbtt_$fontinfo = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_fontinfo"] = kha_graphics2_truetype_Stbtt_$fontinfo;
kha_graphics2_truetype_Stbtt_$fontinfo.__name__ = true;
kha_graphics2_truetype_Stbtt_$fontinfo.prototype = {
	data: null
	,fontstart: null
	,numGlyphs: null
	,loca: null
	,head: null
	,glyf: null
	,hhea: null
	,hmtx: null
	,kern: null
	,gpos: null
	,index_map: null
	,indexToLocFormat: null
	,cff: null
	,charstrings: null
	,gsubrs: null
	,subrs: null
	,fontdicts: null
	,fdselect: null
	,__class__: kha_graphics2_truetype_Stbtt_$fontinfo
};
var kha_graphics2_truetype_Stbtt_$vertex = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_vertex"] = kha_graphics2_truetype_Stbtt_$vertex;
kha_graphics2_truetype_Stbtt_$vertex.__name__ = true;
kha_graphics2_truetype_Stbtt_$vertex.prototype = {
	x: null
	,y: null
	,cx: null
	,cy: null
	,cx1: null
	,cy1: null
	,type: null
	,padding: null
	,__class__: kha_graphics2_truetype_Stbtt_$vertex
};
var kha_graphics2_truetype_Stbtt_$_$bitmap = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__bitmap"] = kha_graphics2_truetype_Stbtt_$_$bitmap;
kha_graphics2_truetype_Stbtt_$_$bitmap.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$bitmap.prototype = {
	w: null
	,h: null
	,stride: null
	,pixels: null
	,pixels_offset: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$bitmap
};
var kha_graphics2_truetype_Stbtt_$_$edge = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__edge"] = kha_graphics2_truetype_Stbtt_$_$edge;
kha_graphics2_truetype_Stbtt_$_$edge.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$edge.prototype = {
	x0: null
	,y0: null
	,x1: null
	,y1: null
	,invert: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$edge
};
var kha_graphics2_truetype_Stbtt_$_$active_$edge = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__active_edge"] = kha_graphics2_truetype_Stbtt_$_$active_$edge;
kha_graphics2_truetype_Stbtt_$_$active_$edge.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$active_$edge.prototype = {
	next: null
	,fx: null
	,fdx: null
	,fdy: null
	,direction: null
	,sy: null
	,ey: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$active_$edge
};
var kha_graphics2_truetype_Stbtt_$_$point = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__point"] = kha_graphics2_truetype_Stbtt_$_$point;
kha_graphics2_truetype_Stbtt_$_$point.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$point.prototype = {
	x: null
	,y: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$point
};
var kha_graphics2_truetype_Stbtt_$_$csctx = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__csctx"] = kha_graphics2_truetype_Stbtt_$_$csctx;
kha_graphics2_truetype_Stbtt_$_$csctx.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$csctx.prototype = {
	bounds: null
	,started: null
	,first_x: null
	,first_y: null
	,x: null
	,y: null
	,min_x: null
	,min_y: null
	,max_x: null
	,max_y: null
	,pvertices: null
	,num_vertices: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$csctx
};
var kha_graphics2_truetype_StbTruetype = function() { };
$hxClasses["kha.graphics2.truetype.StbTruetype"] = kha_graphics2_truetype_StbTruetype;
kha_graphics2_truetype_StbTruetype.__name__ = true;
kha_graphics2_truetype_StbTruetype.STBTT_assert = function(value) {
	if(!value) {
		throw haxe_Exception.thrown("Error");
	}
};
kha_graphics2_truetype_StbTruetype.STBTT_POINT_SIZE = function(x) {
	return -x;
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_get8 = function(b) {
	if(b.cursor >= b.data.get_length()) {
		return 0;
	}
	var pos = b.cursor++;
	if(pos == null) {
		pos = 0;
	}
	return b.data.readU8(pos);
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_peek8 = function(b) {
	if(b.cursor >= b.data.get_length()) {
		return 0;
	}
	var pos = b.cursor;
	if(pos == null) {
		pos = 0;
	}
	return b.data.readU8(pos);
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_seek = function(b,o) {
	if(o > b.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_skip = function(b,o) {
	var o1 = b.cursor + o;
	if(o1 > b.data.get_length() || o1 < 0) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = o1 > b.data.get_length() || o1 < 0 ? b.data.get_length() : o1;
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_get = function(b,n) {
	var v = 0;
	if(!(n >= 1 && n <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = n;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	return v;
};
kha_graphics2_truetype_StbTruetype.stbtt__new_buf = function(p,size) {
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	if(size >= 1073741824) {
		throw haxe_Exception.thrown("Error");
	}
	r.data = p;
	r.cursor = 0;
	return r;
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_get16 = function(b) {
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	return v;
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_get32 = function(b) {
	var v = 0;
	var _g = 0;
	var _g1 = 4;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	return v;
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_range = function(b,o,s) {
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	var r1 = r;
	if(o < 0 || s < 0 || o > b.data.get_length() || s > b.data.get_length() - o) {
		return r1;
	}
	r1.data = b.data.sub(o,s);
	return r1;
};
kha_graphics2_truetype_StbTruetype.stbtt__cff_get_index = function(b) {
	var start = b.cursor;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var count = v;
	if(count > 0) {
		var offsize;
		if(b.cursor >= b.data.get_length()) {
			offsize = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			offsize = b.data.readU8(pos);
		}
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var o = b.cursor + offsize * count;
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var v = 0;
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var _g = 0;
		var _g1 = offsize;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var o = b.cursor + (v - 1);
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var s = b.cursor - start;
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
			return r1;
		} else {
			r1.data = b.data.sub(start,s);
			return r1;
		}
	}
	return b;
};
kha_graphics2_truetype_StbTruetype.stbtt__cff_int = function(b) {
	var b0;
	if(b.cursor >= b.data.get_length()) {
		b0 = 0;
	} else {
		var pos = b.cursor++;
		if(pos == null) {
			pos = 0;
		}
		b0 = b.data.readU8(pos);
	}
	if(b0 >= 32 && b0 <= 246) {
		return b0 - 139;
	} else if(b0 >= 247 && b0 <= 250) {
		var tmp;
		if(b.cursor >= b.data.get_length()) {
			tmp = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			tmp = b.data.readU8(pos);
		}
		return (b0 - 247) * 256 + tmp + 108;
	} else if(b0 >= 251 && b0 <= 254) {
		var tmp;
		if(b.cursor >= b.data.get_length()) {
			tmp = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			tmp = b.data.readU8(pos);
		}
		return -(b0 - 251) * 256 - tmp - 108;
	} else if(b0 == 28) {
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		return v;
	} else if(b0 == 29) {
		var v = 0;
		var _g = 0;
		var _g1 = 4;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		return v;
	} else {
		throw haxe_Exception.thrown("Error");
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__cff_skip_operand = function(b) {
	var v;
	var b0;
	if(b.cursor >= b.data.get_length()) {
		b0 = 0;
	} else {
		var pos = b.cursor;
		if(pos == null) {
			pos = 0;
		}
		b0 = b.data.readU8(pos);
	}
	if(b0 < 28) {
		throw haxe_Exception.thrown("Error");
	}
	if(b0 == 30) {
		var o = b.cursor + 1;
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		while(b.cursor < b.data.get_length()) {
			if(b.cursor >= b.data.get_length()) {
				v = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v = b.data.readU8(pos);
			}
			if((v & 15) == 15 || v >> 4 == 15) {
				break;
			}
		}
	} else {
		var b0;
		if(b.cursor >= b.data.get_length()) {
			b0 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = b.data.readU8(pos);
		}
		if(!(b0 >= 32 && b0 <= 246)) {
			if(b0 >= 247 && b0 <= 250) {
				if(b.cursor < b.data.get_length()) {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					b.data.readU8(pos);
				}
			} else if(b0 >= 251 && b0 <= 254) {
				if(b.cursor < b.data.get_length()) {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					b.data.readU8(pos);
				}
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i = _g++;
					var v1;
					if(b.cursor >= b.data.get_length()) {
						v1 = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						v1 = b.data.readU8(pos);
					}
					v = v << 8 | v1;
				}
			} else if(b0 == 29) {
				var v = 0;
				var _g = 0;
				var _g1 = 4;
				while(_g < _g1) {
					var i = _g++;
					var v1;
					if(b.cursor >= b.data.get_length()) {
						v1 = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						v1 = b.data.readU8(pos);
					}
					v = v << 8 | v1;
				}
			} else {
				throw haxe_Exception.thrown("Error");
			}
		}
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__dict_get = function(b,key) {
	if(0 > b.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = 0 > b.data.get_length() ? b.data.get_length() : 0;
	var ret = null;
	while(b.cursor < b.data.get_length()) {
		var start = b.cursor;
		var op;
		while(true) {
			var tmp;
			if(b.cursor >= b.data.get_length()) {
				tmp = 0;
			} else {
				var pos = b.cursor;
				if(pos == null) {
					pos = 0;
				}
				tmp = b.data.readU8(pos);
			}
			if(!(tmp >= 28)) {
				break;
			}
			var v;
			var b0;
			if(b.cursor >= b.data.get_length()) {
				b0 = 0;
			} else {
				var pos1 = b.cursor;
				if(pos1 == null) {
					pos1 = 0;
				}
				b0 = b.data.readU8(pos1);
			}
			if(b0 < 28) {
				throw haxe_Exception.thrown("Error");
			}
			if(b0 == 30) {
				var o = b.cursor + 1;
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				while(b.cursor < b.data.get_length()) {
					if(b.cursor >= b.data.get_length()) {
						v = 0;
					} else {
						var pos2 = b.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						v = b.data.readU8(pos2);
					}
					if((v & 15) == 15 || v >> 4 == 15) {
						break;
					}
				}
			} else {
				var b01;
				if(b.cursor >= b.data.get_length()) {
					b01 = 0;
				} else {
					var pos3 = b.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					b01 = b.data.readU8(pos3);
				}
				if(!(b01 >= 32 && b01 <= 246)) {
					if(b01 >= 247 && b01 <= 250) {
						if(b.cursor < b.data.get_length()) {
							var pos4 = b.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							b.data.readU8(pos4);
						}
					} else if(b01 >= 251 && b01 <= 254) {
						if(b.cursor < b.data.get_length()) {
							var pos5 = b.cursor++;
							if(pos5 == null) {
								pos5 = 0;
							}
							b.data.readU8(pos5);
						}
					} else if(b01 == 28) {
						var v1 = 0;
						var _g = 0;
						var _g1 = 2;
						while(_g < _g1) {
							var i = _g++;
							var v2;
							if(b.cursor >= b.data.get_length()) {
								v2 = 0;
							} else {
								var pos6 = b.cursor++;
								if(pos6 == null) {
									pos6 = 0;
								}
								v2 = b.data.readU8(pos6);
							}
							v1 = v1 << 8 | v2;
						}
					} else if(b01 == 29) {
						var v3 = 0;
						var _g2 = 0;
						var _g3 = 4;
						while(_g2 < _g3) {
							var i1 = _g2++;
							var v4;
							if(b.cursor >= b.data.get_length()) {
								v4 = 0;
							} else {
								var pos7 = b.cursor++;
								if(pos7 == null) {
									pos7 = 0;
								}
								v4 = b.data.readU8(pos7);
							}
							v3 = v3 << 8 | v4;
						}
					} else {
						throw haxe_Exception.thrown("Error");
					}
				}
			}
		}
		var end = b.cursor;
		if(b.cursor >= b.data.get_length()) {
			op = 0;
		} else {
			var pos8 = b.cursor++;
			if(pos8 == null) {
				pos8 = 0;
			}
			op = b.data.readU8(pos8);
		}
		if(op == 12) {
			var op1;
			if(b.cursor >= b.data.get_length()) {
				op1 = 0;
			} else {
				var pos9 = b.cursor++;
				if(pos9 == null) {
					pos9 = 0;
				}
				op1 = b.data.readU8(pos9);
			}
			op = op1 | 256;
		}
		if(op == key) {
			var s = end - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				ret = r1;
			} else {
				r1.data = b.data.sub(start,s);
				ret = r1;
			}
			break;
		}
	}
	if(ret != null) {
		return ret;
	} else {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(0 > b.data.get_length() || 0 > b.data.get_length()) {
			return r1;
		} else {
			r1.data = b.data.sub(0,0);
			return r1;
		}
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__dict_get_ints = function(b,key,outcount,out) {
	var i = 0;
	if(0 > b.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = 0 > b.data.get_length() ? b.data.get_length() : 0;
	var ret = null;
	while(b.cursor < b.data.get_length()) {
		var start = b.cursor;
		var op;
		while(true) {
			var tmp;
			if(b.cursor >= b.data.get_length()) {
				tmp = 0;
			} else {
				var pos = b.cursor;
				if(pos == null) {
					pos = 0;
				}
				tmp = b.data.readU8(pos);
			}
			if(!(tmp >= 28)) {
				break;
			}
			var v;
			var b0;
			if(b.cursor >= b.data.get_length()) {
				b0 = 0;
			} else {
				var pos1 = b.cursor;
				if(pos1 == null) {
					pos1 = 0;
				}
				b0 = b.data.readU8(pos1);
			}
			if(b0 < 28) {
				throw haxe_Exception.thrown("Error");
			}
			if(b0 == 30) {
				var o = b.cursor + 1;
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				while(b.cursor < b.data.get_length()) {
					if(b.cursor >= b.data.get_length()) {
						v = 0;
					} else {
						var pos2 = b.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						v = b.data.readU8(pos2);
					}
					if((v & 15) == 15 || v >> 4 == 15) {
						break;
					}
				}
			} else {
				var b01;
				if(b.cursor >= b.data.get_length()) {
					b01 = 0;
				} else {
					var pos3 = b.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					b01 = b.data.readU8(pos3);
				}
				if(!(b01 >= 32 && b01 <= 246)) {
					if(b01 >= 247 && b01 <= 250) {
						if(b.cursor < b.data.get_length()) {
							var pos4 = b.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							b.data.readU8(pos4);
						}
					} else if(b01 >= 251 && b01 <= 254) {
						if(b.cursor < b.data.get_length()) {
							var pos5 = b.cursor++;
							if(pos5 == null) {
								pos5 = 0;
							}
							b.data.readU8(pos5);
						}
					} else if(b01 == 28) {
						var v1 = 0;
						var _g = 0;
						var _g1 = 2;
						while(_g < _g1) {
							var i1 = _g++;
							var v2;
							if(b.cursor >= b.data.get_length()) {
								v2 = 0;
							} else {
								var pos6 = b.cursor++;
								if(pos6 == null) {
									pos6 = 0;
								}
								v2 = b.data.readU8(pos6);
							}
							v1 = v1 << 8 | v2;
						}
					} else if(b01 == 29) {
						var v3 = 0;
						var _g2 = 0;
						var _g3 = 4;
						while(_g2 < _g3) {
							var i2 = _g2++;
							var v4;
							if(b.cursor >= b.data.get_length()) {
								v4 = 0;
							} else {
								var pos7 = b.cursor++;
								if(pos7 == null) {
									pos7 = 0;
								}
								v4 = b.data.readU8(pos7);
							}
							v3 = v3 << 8 | v4;
						}
					} else {
						throw haxe_Exception.thrown("Error");
					}
				}
			}
		}
		var end = b.cursor;
		if(b.cursor >= b.data.get_length()) {
			op = 0;
		} else {
			var pos8 = b.cursor++;
			if(pos8 == null) {
				pos8 = 0;
			}
			op = b.data.readU8(pos8);
		}
		if(op == 12) {
			var op1;
			if(b.cursor >= b.data.get_length()) {
				op1 = 0;
			} else {
				var pos9 = b.cursor++;
				if(pos9 == null) {
					pos9 = 0;
				}
				op1 = b.data.readU8(pos9);
			}
			op = op1 | 256;
		}
		if(op == key) {
			var s = end - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				ret = r1;
			} else {
				r1.data = b.data.sub(start,s);
				ret = r1;
			}
			break;
		}
	}
	var operands;
	if(ret != null) {
		operands = ret;
	} else {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(0 > b.data.get_length() || 0 > b.data.get_length()) {
			operands = r1;
		} else {
			r1.data = b.data.sub(0,0);
			operands = r1;
		}
	}
	while(i < outcount && operands.cursor < operands.data.get_length()) {
		var b0;
		if(operands.cursor >= operands.data.get_length()) {
			b0 = 0;
		} else {
			var pos = operands.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = operands.data.readU8(pos);
		}
		var tmp;
		if(b0 >= 32 && b0 <= 246) {
			tmp = b0 - 139;
		} else if(b0 >= 247 && b0 <= 250) {
			var tmp1;
			if(operands.cursor >= operands.data.get_length()) {
				tmp1 = 0;
			} else {
				var pos1 = operands.cursor++;
				if(pos1 == null) {
					pos1 = 0;
				}
				tmp1 = operands.data.readU8(pos1);
			}
			tmp = (b0 - 247) * 256 + tmp1 + 108;
		} else if(b0 >= 251 && b0 <= 254) {
			var tmp2;
			if(operands.cursor >= operands.data.get_length()) {
				tmp2 = 0;
			} else {
				var pos2 = operands.cursor++;
				if(pos2 == null) {
					pos2 = 0;
				}
				tmp2 = operands.data.readU8(pos2);
			}
			tmp = -(b0 - 251) * 256 - tmp2 - 108;
		} else if(b0 == 28) {
			var v = 0;
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i1 = _g++;
				var v1;
				if(operands.cursor >= operands.data.get_length()) {
					v1 = 0;
				} else {
					var pos3 = operands.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					v1 = operands.data.readU8(pos3);
				}
				v = v << 8 | v1;
			}
			tmp = v;
		} else if(b0 == 29) {
			var v2 = 0;
			var _g2 = 0;
			var _g3 = 4;
			while(_g2 < _g3) {
				var i2 = _g2++;
				var v3;
				if(operands.cursor >= operands.data.get_length()) {
					v3 = 0;
				} else {
					var pos4 = operands.cursor++;
					if(pos4 == null) {
						pos4 = 0;
					}
					v3 = operands.data.readU8(pos4);
				}
				v2 = v2 << 8 | v3;
			}
			tmp = v2;
		} else {
			throw haxe_Exception.thrown("Error");
		}
		out[i] = tmp;
		++i;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__cff_index_count = function(b) {
	if(0 > b.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = 0 > b.data.get_length() ? b.data.get_length() : 0;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	return v;
};
kha_graphics2_truetype_StbTruetype.stbtt__cff_index_get = function(b,i) {
	if(0 > b.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = 0 > b.data.get_length() ? b.data.get_length() : 0;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i1 = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var count = v;
	var offsize;
	if(b.cursor >= b.data.get_length()) {
		offsize = 0;
	} else {
		var pos = b.cursor++;
		if(pos == null) {
			pos = 0;
		}
		offsize = b.data.readU8(pos);
	}
	if(!(i >= 0 && i < count)) {
		throw haxe_Exception.thrown("Error");
	}
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var o = b.cursor + i * offsize;
	if(o > b.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
	var v = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var start = v;
	var v = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var end = v;
	var o = 2 + (count + 1) * offsize + start;
	var s = end - start;
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	var r1 = r;
	if(o < 0 || s < 0 || o > b.data.get_length() || s > b.data.get_length() - o) {
		return r1;
	} else {
		r1.data = b.data.sub(o,s);
		return r1;
	}
};
kha_graphics2_truetype_StbTruetype.ttBYTE = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	return p.readU8(pos);
};
kha_graphics2_truetype_StbTruetype.ttCHAR = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	var n = p.readU8(pos);
	if(n >= 128) {
		return n - 256;
	}
	return n;
};
kha_graphics2_truetype_StbTruetype.ttUSHORT = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	return ch2 | ch1 << 8;
};
kha_graphics2_truetype_StbTruetype.ttSHORT = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	if((n & 32768) != 0) {
		return n - 65536;
	}
	return n;
};
kha_graphics2_truetype_StbTruetype.ttULONG = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	var pos1 = pos;
	if(pos1 == null) {
		pos1 = 0;
	}
	var ch1 = p.readU8(pos1);
	var ch2 = p.readU8(pos1 + 1);
	var ch3 = p.readU8(pos1 + 2);
	var ch4 = p.readU8(pos1 + 3);
	return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
};
kha_graphics2_truetype_StbTruetype.ttLONG = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var ch3 = p.readU8(pos + 2);
	var ch4 = p.readU8(pos + 3);
	return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
};
kha_graphics2_truetype_StbTruetype.to_stbtt_uint16 = function(value) {
	return value & 65535;
};
kha_graphics2_truetype_StbTruetype.ttFixed = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	var pos1 = pos;
	if(pos1 == null) {
		pos1 = 0;
	}
	var ch1 = p.readU8(pos1);
	var ch2 = p.readU8(pos1 + 1);
	var ch3 = p.readU8(pos1 + 2);
	var ch4 = p.readU8(pos1 + 3);
	return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
};
kha_graphics2_truetype_StbTruetype.stbtt_tag4 = function(p,pos,c0,c1,c2,c3) {
	if(p.readU8(pos) == c0 && p.readU8(pos + 1) == c1 && p.readU8(pos + 2) == c2) {
		return p.readU8(pos + 3) == c3;
	} else {
		return false;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_tag = function(p,pos,str) {
	var c0 = HxOverrides.cca(str,0);
	var c1 = HxOverrides.cca(str,1);
	var c2 = HxOverrides.cca(str,2);
	var c3 = HxOverrides.cca(str,3);
	if(p.readU8(pos) == c0 && p.readU8(pos + 1) == c1 && p.readU8(pos + 2) == c2) {
		return p.readU8(pos + 3) == c3;
	} else {
		return false;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__isfont = function(font) {
	var c0 = HxOverrides.cca("1",0);
	if(font.readU8(0) == c0 && font.readU8(1) == 0 && font.readU8(2) == 0 && font.readU8(3) == 0) {
		return true;
	}
	var c0 = HxOverrides.cca("typ1",0);
	var c1 = HxOverrides.cca("typ1",1);
	var c2 = HxOverrides.cca("typ1",2);
	var c3 = HxOverrides.cca("typ1",3);
	if(font.readU8(0) == c0 && font.readU8(1) == c1 && font.readU8(2) == c2 && font.readU8(3) == c3) {
		return true;
	}
	var c0 = HxOverrides.cca("OTTO",0);
	var c1 = HxOverrides.cca("OTTO",1);
	var c2 = HxOverrides.cca("OTTO",2);
	var c3 = HxOverrides.cca("OTTO",3);
	if(font.readU8(0) == c0 && font.readU8(1) == c1 && font.readU8(2) == c2 && font.readU8(3) == c3) {
		return true;
	}
	if(font.readU8(0) == 0 && font.readU8(1) == 1 && font.readU8(2) == 0 && font.readU8(3) == 0) {
		return true;
	}
	var c0 = HxOverrides.cca("true",0);
	var c1 = HxOverrides.cca("true",1);
	var c2 = HxOverrides.cca("true",2);
	var c3 = HxOverrides.cca("true",3);
	if(font.readU8(0) == c0 && font.readU8(1) == c1 && font.readU8(2) == c2 && font.readU8(3) == c3) {
		return true;
	}
	return false;
};
kha_graphics2_truetype_StbTruetype.stbtt__find_table = function(data,fontstart,tag) {
	var pos = fontstart + 4;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	var num_tables = ch2 | ch1 << 8;
	var tabledir = fontstart + 12;
	var _g = 0;
	var _g1 = num_tables;
	while(_g < _g1) {
		var i = _g++;
		var loc = tabledir + 16 * i;
		var c0 = HxOverrides.cca(tag,0);
		var c1 = HxOverrides.cca(tag,1);
		var c2 = HxOverrides.cca(tag,2);
		var c3 = HxOverrides.cca(tag,3);
		if(data.readU8(loc) == c0 && data.readU8(loc + 1) == c1 && data.readU8(loc + 2) == c2 && data.readU8(loc + 3) == c3) {
			var pos = loc + 8;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = data.readU8(pos1);
			var ch2 = data.readU8(pos1 + 1);
			var ch3 = data.readU8(pos1 + 2);
			var ch4 = data.readU8(pos1 + 3);
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		}
	}
	return 0;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetFontOffsetForIndex = function(font_collection,index) {
	if(kha_graphics2_truetype_StbTruetype.stbtt__isfont(font_collection)) {
		if(index == 0) {
			return 0;
		} else {
			return -1;
		}
	}
	var c0 = HxOverrides.cca("ttcf",0);
	var c1 = HxOverrides.cca("ttcf",1);
	var c2 = HxOverrides.cca("ttcf",2);
	var c3 = HxOverrides.cca("ttcf",3);
	if(font_collection.readU8(0) == c0 && font_collection.readU8(1) == c1 && font_collection.readU8(2) == c2 && font_collection.readU8(3) == c3) {
		var tmp;
		var pos = 4;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = font_collection.readU8(pos1);
		var ch2 = font_collection.readU8(pos1 + 1);
		var ch3 = font_collection.readU8(pos1 + 2);
		var ch4 = font_collection.readU8(pos1 + 3);
		if((ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24) != 65536) {
			var pos = 4;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = font_collection.readU8(pos1);
			var ch2 = font_collection.readU8(pos1 + 1);
			var ch3 = font_collection.readU8(pos1 + 2);
			var ch4 = font_collection.readU8(pos1 + 3);
			tmp = (ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24) == 131072;
		} else {
			tmp = true;
		}
		if(tmp) {
			var pos = 8;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = font_collection.readU8(pos);
			var ch2 = font_collection.readU8(pos + 1);
			var ch3 = font_collection.readU8(pos + 2);
			var ch4 = font_collection.readU8(pos + 3);
			var n = ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
			if(index >= n) {
				return -1;
			}
			var pos = 12 + index * 4;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = font_collection.readU8(pos1);
			var ch2 = font_collection.readU8(pos1 + 1);
			var ch3 = font_collection.readU8(pos1 + 2);
			var ch4 = font_collection.readU8(pos1 + 3);
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		}
	}
	return -1;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetNumberOfFonts = function(font_collection) {
	if(kha_graphics2_truetype_StbTruetype.stbtt__isfont(font_collection)) {
		return 1;
	}
	var c0 = HxOverrides.cca("ttcf",0);
	var c1 = HxOverrides.cca("ttcf",1);
	var c2 = HxOverrides.cca("ttcf",2);
	var c3 = HxOverrides.cca("ttcf",3);
	if(font_collection.readU8(0) == c0 && font_collection.readU8(1) == c1 && font_collection.readU8(2) == c2 && font_collection.readU8(3) == c3) {
		var tmp;
		var pos = 4;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = font_collection.readU8(pos1);
		var ch2 = font_collection.readU8(pos1 + 1);
		var ch3 = font_collection.readU8(pos1 + 2);
		var ch4 = font_collection.readU8(pos1 + 3);
		if((ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24) != 65536) {
			var pos = 4;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = font_collection.readU8(pos1);
			var ch2 = font_collection.readU8(pos1 + 1);
			var ch3 = font_collection.readU8(pos1 + 2);
			var ch4 = font_collection.readU8(pos1 + 3);
			tmp = (ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24) == 131072;
		} else {
			tmp = true;
		}
		if(tmp) {
			var pos = 8;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = font_collection.readU8(pos);
			var ch2 = font_collection.readU8(pos + 1);
			var ch3 = font_collection.readU8(pos + 2);
			var ch4 = font_collection.readU8(pos + 3);
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		}
	}
	return 0;
};
kha_graphics2_truetype_StbTruetype.stbtt__get_subrs = function(cff,fontdict) {
	var subrsoff = [0];
	var private_loc = [0,0];
	var i = 0;
	if(0 > fontdict.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	fontdict.cursor = 0 > fontdict.data.get_length() ? fontdict.data.get_length() : 0;
	var ret = null;
	while(fontdict.cursor < fontdict.data.get_length()) {
		var start = fontdict.cursor;
		var op;
		while(true) {
			var tmp;
			if(fontdict.cursor >= fontdict.data.get_length()) {
				tmp = 0;
			} else {
				var pos = fontdict.cursor;
				if(pos == null) {
					pos = 0;
				}
				tmp = fontdict.data.readU8(pos);
			}
			if(!(tmp >= 28)) {
				break;
			}
			var v;
			var b0;
			if(fontdict.cursor >= fontdict.data.get_length()) {
				b0 = 0;
			} else {
				var pos1 = fontdict.cursor;
				if(pos1 == null) {
					pos1 = 0;
				}
				b0 = fontdict.data.readU8(pos1);
			}
			if(b0 < 28) {
				throw haxe_Exception.thrown("Error");
			}
			if(b0 == 30) {
				var o = fontdict.cursor + 1;
				if(o > fontdict.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				fontdict.cursor = o > fontdict.data.get_length() || o < 0 ? fontdict.data.get_length() : o;
				while(fontdict.cursor < fontdict.data.get_length()) {
					if(fontdict.cursor >= fontdict.data.get_length()) {
						v = 0;
					} else {
						var pos2 = fontdict.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						v = fontdict.data.readU8(pos2);
					}
					if((v & 15) == 15 || v >> 4 == 15) {
						break;
					}
				}
			} else {
				var b01;
				if(fontdict.cursor >= fontdict.data.get_length()) {
					b01 = 0;
				} else {
					var pos3 = fontdict.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					b01 = fontdict.data.readU8(pos3);
				}
				if(!(b01 >= 32 && b01 <= 246)) {
					if(b01 >= 247 && b01 <= 250) {
						if(fontdict.cursor < fontdict.data.get_length()) {
							var pos4 = fontdict.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							fontdict.data.readU8(pos4);
						}
					} else if(b01 >= 251 && b01 <= 254) {
						if(fontdict.cursor < fontdict.data.get_length()) {
							var pos5 = fontdict.cursor++;
							if(pos5 == null) {
								pos5 = 0;
							}
							fontdict.data.readU8(pos5);
						}
					} else if(b01 == 28) {
						var v1 = 0;
						var _g = 0;
						var _g1 = 2;
						while(_g < _g1) {
							var i1 = _g++;
							var v2;
							if(fontdict.cursor >= fontdict.data.get_length()) {
								v2 = 0;
							} else {
								var pos6 = fontdict.cursor++;
								if(pos6 == null) {
									pos6 = 0;
								}
								v2 = fontdict.data.readU8(pos6);
							}
							v1 = v1 << 8 | v2;
						}
					} else if(b01 == 29) {
						var v3 = 0;
						var _g2 = 0;
						var _g3 = 4;
						while(_g2 < _g3) {
							var i2 = _g2++;
							var v4;
							if(fontdict.cursor >= fontdict.data.get_length()) {
								v4 = 0;
							} else {
								var pos7 = fontdict.cursor++;
								if(pos7 == null) {
									pos7 = 0;
								}
								v4 = fontdict.data.readU8(pos7);
							}
							v3 = v3 << 8 | v4;
						}
					} else {
						throw haxe_Exception.thrown("Error");
					}
				}
			}
		}
		var end = fontdict.cursor;
		if(fontdict.cursor >= fontdict.data.get_length()) {
			op = 0;
		} else {
			var pos8 = fontdict.cursor++;
			if(pos8 == null) {
				pos8 = 0;
			}
			op = fontdict.data.readU8(pos8);
		}
		if(op == 12) {
			var op1;
			if(fontdict.cursor >= fontdict.data.get_length()) {
				op1 = 0;
			} else {
				var pos9 = fontdict.cursor++;
				if(pos9 == null) {
					pos9 = 0;
				}
				op1 = fontdict.data.readU8(pos9);
			}
			op = op1 | 256;
		}
		if(op == 18) {
			var s = end - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > fontdict.data.get_length() || s > fontdict.data.get_length() - start) {
				ret = r1;
			} else {
				r1.data = fontdict.data.sub(start,s);
				ret = r1;
			}
			break;
		}
	}
	var operands;
	if(ret != null) {
		operands = ret;
	} else {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(0 > fontdict.data.get_length() || 0 > fontdict.data.get_length()) {
			operands = r1;
		} else {
			r1.data = fontdict.data.sub(0,0);
			operands = r1;
		}
	}
	while(i < 2 && operands.cursor < operands.data.get_length()) {
		var b0;
		if(operands.cursor >= operands.data.get_length()) {
			b0 = 0;
		} else {
			var pos = operands.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = operands.data.readU8(pos);
		}
		var tmp;
		if(b0 >= 32 && b0 <= 246) {
			tmp = b0 - 139;
		} else if(b0 >= 247 && b0 <= 250) {
			var tmp1;
			if(operands.cursor >= operands.data.get_length()) {
				tmp1 = 0;
			} else {
				var pos1 = operands.cursor++;
				if(pos1 == null) {
					pos1 = 0;
				}
				tmp1 = operands.data.readU8(pos1);
			}
			tmp = (b0 - 247) * 256 + tmp1 + 108;
		} else if(b0 >= 251 && b0 <= 254) {
			var tmp2;
			if(operands.cursor >= operands.data.get_length()) {
				tmp2 = 0;
			} else {
				var pos2 = operands.cursor++;
				if(pos2 == null) {
					pos2 = 0;
				}
				tmp2 = operands.data.readU8(pos2);
			}
			tmp = -(b0 - 251) * 256 - tmp2 - 108;
		} else if(b0 == 28) {
			var v = 0;
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i1 = _g++;
				var v1;
				if(operands.cursor >= operands.data.get_length()) {
					v1 = 0;
				} else {
					var pos3 = operands.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					v1 = operands.data.readU8(pos3);
				}
				v = v << 8 | v1;
			}
			tmp = v;
		} else if(b0 == 29) {
			var v2 = 0;
			var _g2 = 0;
			var _g3 = 4;
			while(_g2 < _g3) {
				var i2 = _g2++;
				var v3;
				if(operands.cursor >= operands.data.get_length()) {
					v3 = 0;
				} else {
					var pos4 = operands.cursor++;
					if(pos4 == null) {
						pos4 = 0;
					}
					v3 = operands.data.readU8(pos4);
				}
				v2 = v2 << 8 | v3;
			}
			tmp = v2;
		} else {
			throw haxe_Exception.thrown("Error");
		}
		private_loc[i] = tmp;
		++i;
	}
	if(private_loc[1] == 0 || private_loc[0] == 0) {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		return r;
	}
	var o = private_loc[1];
	var s = private_loc[0];
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	var r1 = r;
	var pdict;
	if(o < 0 || s < 0 || o > cff.data.get_length() || s > cff.data.get_length() - o) {
		pdict = r1;
	} else {
		r1.data = cff.data.sub(o,s);
		pdict = r1;
	}
	var i = 0;
	if(0 > pdict.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	pdict.cursor = 0 > pdict.data.get_length() ? pdict.data.get_length() : 0;
	var ret = null;
	while(pdict.cursor < pdict.data.get_length()) {
		var start = pdict.cursor;
		var op;
		while(true) {
			var tmp;
			if(pdict.cursor >= pdict.data.get_length()) {
				tmp = 0;
			} else {
				var pos = pdict.cursor;
				if(pos == null) {
					pos = 0;
				}
				tmp = pdict.data.readU8(pos);
			}
			if(!(tmp >= 28)) {
				break;
			}
			var v;
			var b0;
			if(pdict.cursor >= pdict.data.get_length()) {
				b0 = 0;
			} else {
				var pos1 = pdict.cursor;
				if(pos1 == null) {
					pos1 = 0;
				}
				b0 = pdict.data.readU8(pos1);
			}
			if(b0 < 28) {
				throw haxe_Exception.thrown("Error");
			}
			if(b0 == 30) {
				var o = pdict.cursor + 1;
				if(o > pdict.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				pdict.cursor = o > pdict.data.get_length() || o < 0 ? pdict.data.get_length() : o;
				while(pdict.cursor < pdict.data.get_length()) {
					if(pdict.cursor >= pdict.data.get_length()) {
						v = 0;
					} else {
						var pos2 = pdict.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						v = pdict.data.readU8(pos2);
					}
					if((v & 15) == 15 || v >> 4 == 15) {
						break;
					}
				}
			} else {
				var b01;
				if(pdict.cursor >= pdict.data.get_length()) {
					b01 = 0;
				} else {
					var pos3 = pdict.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					b01 = pdict.data.readU8(pos3);
				}
				if(!(b01 >= 32 && b01 <= 246)) {
					if(b01 >= 247 && b01 <= 250) {
						if(pdict.cursor < pdict.data.get_length()) {
							var pos4 = pdict.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							pdict.data.readU8(pos4);
						}
					} else if(b01 >= 251 && b01 <= 254) {
						if(pdict.cursor < pdict.data.get_length()) {
							var pos5 = pdict.cursor++;
							if(pos5 == null) {
								pos5 = 0;
							}
							pdict.data.readU8(pos5);
						}
					} else if(b01 == 28) {
						var v1 = 0;
						var _g = 0;
						var _g1 = 2;
						while(_g < _g1) {
							var i1 = _g++;
							var v2;
							if(pdict.cursor >= pdict.data.get_length()) {
								v2 = 0;
							} else {
								var pos6 = pdict.cursor++;
								if(pos6 == null) {
									pos6 = 0;
								}
								v2 = pdict.data.readU8(pos6);
							}
							v1 = v1 << 8 | v2;
						}
					} else if(b01 == 29) {
						var v3 = 0;
						var _g2 = 0;
						var _g3 = 4;
						while(_g2 < _g3) {
							var i2 = _g2++;
							var v4;
							if(pdict.cursor >= pdict.data.get_length()) {
								v4 = 0;
							} else {
								var pos7 = pdict.cursor++;
								if(pos7 == null) {
									pos7 = 0;
								}
								v4 = pdict.data.readU8(pos7);
							}
							v3 = v3 << 8 | v4;
						}
					} else {
						throw haxe_Exception.thrown("Error");
					}
				}
			}
		}
		var end = pdict.cursor;
		if(pdict.cursor >= pdict.data.get_length()) {
			op = 0;
		} else {
			var pos8 = pdict.cursor++;
			if(pos8 == null) {
				pos8 = 0;
			}
			op = pdict.data.readU8(pos8);
		}
		if(op == 12) {
			var op1;
			if(pdict.cursor >= pdict.data.get_length()) {
				op1 = 0;
			} else {
				var pos9 = pdict.cursor++;
				if(pos9 == null) {
					pos9 = 0;
				}
				op1 = pdict.data.readU8(pos9);
			}
			op = op1 | 256;
		}
		if(op == 19) {
			var s = end - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > pdict.data.get_length() || s > pdict.data.get_length() - start) {
				ret = r1;
			} else {
				r1.data = pdict.data.sub(start,s);
				ret = r1;
			}
			break;
		}
	}
	var operands;
	if(ret != null) {
		operands = ret;
	} else {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(0 > pdict.data.get_length() || 0 > pdict.data.get_length()) {
			operands = r1;
		} else {
			r1.data = pdict.data.sub(0,0);
			operands = r1;
		}
	}
	while(i < 1 && operands.cursor < operands.data.get_length()) {
		var b0;
		if(operands.cursor >= operands.data.get_length()) {
			b0 = 0;
		} else {
			var pos = operands.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = operands.data.readU8(pos);
		}
		var tmp;
		if(b0 >= 32 && b0 <= 246) {
			tmp = b0 - 139;
		} else if(b0 >= 247 && b0 <= 250) {
			var tmp1;
			if(operands.cursor >= operands.data.get_length()) {
				tmp1 = 0;
			} else {
				var pos1 = operands.cursor++;
				if(pos1 == null) {
					pos1 = 0;
				}
				tmp1 = operands.data.readU8(pos1);
			}
			tmp = (b0 - 247) * 256 + tmp1 + 108;
		} else if(b0 >= 251 && b0 <= 254) {
			var tmp2;
			if(operands.cursor >= operands.data.get_length()) {
				tmp2 = 0;
			} else {
				var pos2 = operands.cursor++;
				if(pos2 == null) {
					pos2 = 0;
				}
				tmp2 = operands.data.readU8(pos2);
			}
			tmp = -(b0 - 251) * 256 - tmp2 - 108;
		} else if(b0 == 28) {
			var v = 0;
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i1 = _g++;
				var v1;
				if(operands.cursor >= operands.data.get_length()) {
					v1 = 0;
				} else {
					var pos3 = operands.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					v1 = operands.data.readU8(pos3);
				}
				v = v << 8 | v1;
			}
			tmp = v;
		} else if(b0 == 29) {
			var v2 = 0;
			var _g2 = 0;
			var _g3 = 4;
			while(_g2 < _g3) {
				var i2 = _g2++;
				var v3;
				if(operands.cursor >= operands.data.get_length()) {
					v3 = 0;
				} else {
					var pos4 = operands.cursor++;
					if(pos4 == null) {
						pos4 = 0;
					}
					v3 = operands.data.readU8(pos4);
				}
				v2 = v2 << 8 | v3;
			}
			tmp = v2;
		} else {
			throw haxe_Exception.thrown("Error");
		}
		subrsoff[i] = tmp;
		++i;
	}
	if(subrsoff[0] == 0) {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		return r;
	}
	var o = private_loc[1] + subrsoff[0];
	if(o > cff.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	cff.cursor = o > cff.data.get_length() || o < 0 ? cff.data.get_length() : o;
	var start = cff.cursor;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(cff.cursor >= cff.data.get_length()) {
			v1 = 0;
		} else {
			var pos = cff.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = cff.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var count = v;
	if(count > 0) {
		var offsize;
		if(cff.cursor >= cff.data.get_length()) {
			offsize = 0;
		} else {
			var pos = cff.cursor++;
			if(pos == null) {
				pos = 0;
			}
			offsize = cff.data.readU8(pos);
		}
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var o = cff.cursor + offsize * count;
		if(o > cff.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		cff.cursor = o > cff.data.get_length() || o < 0 ? cff.data.get_length() : o;
		var v = 0;
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var _g = 0;
		var _g1 = offsize;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(cff.cursor >= cff.data.get_length()) {
				v1 = 0;
			} else {
				var pos = cff.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = cff.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var o = cff.cursor + (v - 1);
		if(o > cff.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		cff.cursor = o > cff.data.get_length() || o < 0 ? cff.data.get_length() : o;
		var s = cff.cursor - start;
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(start < 0 || s < 0 || start > cff.data.get_length() || s > cff.data.get_length() - start) {
			return r1;
		} else {
			r1.data = cff.data.sub(start,s);
			return r1;
		}
	} else {
		return cff;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_InitFont = function(info,data,fontstart) {
	info.data = data;
	info.fontstart = fontstart;
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	info.cff = r;
	var cmap = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"cmap");
	info.loca = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"loca");
	info.head = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"head");
	info.glyf = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"glyf");
	info.hhea = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"hhea");
	info.hmtx = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"hmtx");
	info.kern = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"kern");
	info.gpos = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"GPOS");
	if(cmap == 0 || info.head == 0 || info.hhea == 0 || info.hmtx == 0) {
		return false;
	}
	if(info.glyf != 0) {
		if(info.loca == 0) {
			return false;
		}
	} else {
		var topdict;
		var topdictidx;
		var cstype = [2];
		var charstrings = [0];
		var fdarrayoff = [0];
		var fdselectoff = [0];
		var cff = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"CFF ");
		if(cff == 0) {
			return false;
		}
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		info.fontdicts = r;
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		info.fdselect = r;
		var cff_data = data.sub(cff,data.get_length() - cff);
		var size = cff_data.get_length();
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		if(size >= 1073741824) {
			throw haxe_Exception.thrown("Error");
		}
		r.data = cff_data;
		r.cursor = 0;
		info.cff = r;
		var b = info.cff;
		var o = b.cursor + 2;
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var o;
		if(b.cursor >= b.data.get_length()) {
			o = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			o = b.data.readU8(pos);
		}
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(!(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start)) {
				r1.data = b.data.sub(start,s);
			}
		}
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				topdictidx = r1;
			} else {
				r1.data = b.data.sub(start,s);
				topdictidx = r1;
			}
		} else {
			topdictidx = b;
		}
		if(0 > topdictidx.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdictidx.cursor = 0 > topdictidx.data.get_length() ? topdictidx.data.get_length() : 0;
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(topdictidx.cursor >= topdictidx.data.get_length()) {
				v1 = 0;
			} else {
				var pos = topdictidx.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = topdictidx.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		var offsize;
		if(topdictidx.cursor >= topdictidx.data.get_length()) {
			offsize = 0;
		} else {
			var pos = topdictidx.cursor++;
			if(pos == null) {
				pos = 0;
			}
			offsize = topdictidx.data.readU8(pos);
		}
		if(0 >= count) {
			throw haxe_Exception.thrown("Error");
		}
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var o = topdictidx.cursor + 0 * offsize;
		if(o > topdictidx.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		topdictidx.cursor = o > topdictidx.data.get_length() || o < 0 ? topdictidx.data.get_length() : o;
		var v = 0;
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var _g = 0;
		var _g1 = offsize;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(topdictidx.cursor >= topdictidx.data.get_length()) {
				v1 = 0;
			} else {
				var pos = topdictidx.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = topdictidx.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var start = v;
		var v = 0;
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var _g = 0;
		var _g1 = offsize;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(topdictidx.cursor >= topdictidx.data.get_length()) {
				v1 = 0;
			} else {
				var pos = topdictidx.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = topdictidx.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var end = v;
		var o = 2 + (count + 1) * offsize + start;
		var s = end - start;
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(o < 0 || s < 0 || o > topdictidx.data.get_length() || s > topdictidx.data.get_length() - o) {
			topdict = r1;
		} else {
			r1.data = topdictidx.data.sub(o,s);
			topdict = r1;
		}
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(!(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start)) {
				r1.data = b.data.sub(start,s);
			}
		}
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		var tmp;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				tmp = r1;
			} else {
				r1.data = b.data.sub(start,s);
				tmp = r1;
			}
		} else {
			tmp = b;
		}
		info.gsubrs = tmp;
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var v1 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i1 = _g++;
								var v2;
								if(topdict.cursor >= topdict.data.get_length()) {
									v2 = 0;
								} else {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v2 = topdict.data.readU8(pos6);
								}
								v1 = v1 << 8 | v2;
							}
						} else if(b01 == 29) {
							var v3 = 0;
							var _g2 = 0;
							var _g3 = 4;
							while(_g2 < _g3) {
								var i2 = _g2++;
								var v4;
								if(topdict.cursor >= topdict.data.get_length()) {
									v4 = 0;
								} else {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									v4 = topdict.data.readU8(pos7);
								}
								v3 = v3 << 8 | v4;
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 17) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r1;
				} else {
					r1.data = topdict.data.sub(start,s);
					ret = r1;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r1;
			} else {
				r1.data = topdict.data.sub(0,0);
				operands = r1;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i1 = _g++;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g2 = 0;
				var _g3 = 4;
				while(_g2 < _g3) {
					var i2 = _g2++;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			charstrings[i] = tmp;
			++i;
		}
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var v1 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i1 = _g++;
								var v2;
								if(topdict.cursor >= topdict.data.get_length()) {
									v2 = 0;
								} else {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v2 = topdict.data.readU8(pos6);
								}
								v1 = v1 << 8 | v2;
							}
						} else if(b01 == 29) {
							var v3 = 0;
							var _g2 = 0;
							var _g3 = 4;
							while(_g2 < _g3) {
								var i2 = _g2++;
								var v4;
								if(topdict.cursor >= topdict.data.get_length()) {
									v4 = 0;
								} else {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									v4 = topdict.data.readU8(pos7);
								}
								v3 = v3 << 8 | v4;
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 262) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r1;
				} else {
					r1.data = topdict.data.sub(start,s);
					ret = r1;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r1;
			} else {
				r1.data = topdict.data.sub(0,0);
				operands = r1;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i1 = _g++;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g2 = 0;
				var _g3 = 4;
				while(_g2 < _g3) {
					var i2 = _g2++;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			cstype[i] = tmp;
			++i;
		}
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var v1 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i1 = _g++;
								var v2;
								if(topdict.cursor >= topdict.data.get_length()) {
									v2 = 0;
								} else {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v2 = topdict.data.readU8(pos6);
								}
								v1 = v1 << 8 | v2;
							}
						} else if(b01 == 29) {
							var v3 = 0;
							var _g2 = 0;
							var _g3 = 4;
							while(_g2 < _g3) {
								var i2 = _g2++;
								var v4;
								if(topdict.cursor >= topdict.data.get_length()) {
									v4 = 0;
								} else {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									v4 = topdict.data.readU8(pos7);
								}
								v3 = v3 << 8 | v4;
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 292) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r1;
				} else {
					r1.data = topdict.data.sub(start,s);
					ret = r1;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r1;
			} else {
				r1.data = topdict.data.sub(0,0);
				operands = r1;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i1 = _g++;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g2 = 0;
				var _g3 = 4;
				while(_g2 < _g3) {
					var i2 = _g2++;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			fdarrayoff[i] = tmp;
			++i;
		}
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var v1 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i1 = _g++;
								var v2;
								if(topdict.cursor >= topdict.data.get_length()) {
									v2 = 0;
								} else {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v2 = topdict.data.readU8(pos6);
								}
								v1 = v1 << 8 | v2;
							}
						} else if(b01 == 29) {
							var v3 = 0;
							var _g2 = 0;
							var _g3 = 4;
							while(_g2 < _g3) {
								var i2 = _g2++;
								var v4;
								if(topdict.cursor >= topdict.data.get_length()) {
									v4 = 0;
								} else {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									v4 = topdict.data.readU8(pos7);
								}
								v3 = v3 << 8 | v4;
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 293) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r1;
				} else {
					r1.data = topdict.data.sub(start,s);
					ret = r1;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r1;
			} else {
				r1.data = topdict.data.sub(0,0);
				operands = r1;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i1 = _g++;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g2 = 0;
				var _g3 = 4;
				while(_g2 < _g3) {
					var i2 = _g2++;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			fdselectoff[i] = tmp;
			++i;
		}
		var subrsoff = [0];
		var private_loc = [0,0];
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var v1 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i1 = _g++;
								var v2;
								if(topdict.cursor >= topdict.data.get_length()) {
									v2 = 0;
								} else {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v2 = topdict.data.readU8(pos6);
								}
								v1 = v1 << 8 | v2;
							}
						} else if(b01 == 29) {
							var v3 = 0;
							var _g2 = 0;
							var _g3 = 4;
							while(_g2 < _g3) {
								var i2 = _g2++;
								var v4;
								if(topdict.cursor >= topdict.data.get_length()) {
									v4 = 0;
								} else {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									v4 = topdict.data.readU8(pos7);
								}
								v3 = v3 << 8 | v4;
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 18) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r1;
				} else {
					r1.data = topdict.data.sub(start,s);
					ret = r1;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r1;
			} else {
				r1.data = topdict.data.sub(0,0);
				operands = r1;
			}
		}
		while(i < 2 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i1 = _g++;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g2 = 0;
				var _g3 = 4;
				while(_g2 < _g3) {
					var i2 = _g2++;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			private_loc[i] = tmp;
			++i;
		}
		var tmp;
		if(private_loc[1] == 0 || private_loc[0] == 0) {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			tmp = r;
		} else {
			var o = private_loc[1];
			var s = private_loc[0];
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			var pdict;
			if(o < 0 || s < 0 || o > b.data.get_length() || s > b.data.get_length() - o) {
				pdict = r1;
			} else {
				r1.data = b.data.sub(o,s);
				pdict = r1;
			}
			var i = 0;
			if(0 > pdict.data.get_length()) {
				throw haxe_Exception.thrown("Error");
			}
			pdict.cursor = 0 > pdict.data.get_length() ? pdict.data.get_length() : 0;
			var ret = null;
			while(pdict.cursor < pdict.data.get_length()) {
				var start = pdict.cursor;
				var op;
				while(true) {
					var tmp1;
					if(pdict.cursor >= pdict.data.get_length()) {
						tmp1 = 0;
					} else {
						var pos = pdict.cursor;
						if(pos == null) {
							pos = 0;
						}
						tmp1 = pdict.data.readU8(pos);
					}
					if(!(tmp1 >= 28)) {
						break;
					}
					var v;
					var b0;
					if(pdict.cursor >= pdict.data.get_length()) {
						b0 = 0;
					} else {
						var pos1 = pdict.cursor;
						if(pos1 == null) {
							pos1 = 0;
						}
						b0 = pdict.data.readU8(pos1);
					}
					if(b0 < 28) {
						throw haxe_Exception.thrown("Error");
					}
					if(b0 == 30) {
						var o = pdict.cursor + 1;
						if(o > pdict.data.get_length() || o < 0) {
							throw haxe_Exception.thrown("Error");
						}
						pdict.cursor = o > pdict.data.get_length() || o < 0 ? pdict.data.get_length() : o;
						while(pdict.cursor < pdict.data.get_length()) {
							if(pdict.cursor >= pdict.data.get_length()) {
								v = 0;
							} else {
								var pos2 = pdict.cursor++;
								if(pos2 == null) {
									pos2 = 0;
								}
								v = pdict.data.readU8(pos2);
							}
							if((v & 15) == 15 || v >> 4 == 15) {
								break;
							}
						}
					} else {
						var b01;
						if(pdict.cursor >= pdict.data.get_length()) {
							b01 = 0;
						} else {
							var pos3 = pdict.cursor++;
							if(pos3 == null) {
								pos3 = 0;
							}
							b01 = pdict.data.readU8(pos3);
						}
						if(!(b01 >= 32 && b01 <= 246)) {
							if(b01 >= 247 && b01 <= 250) {
								if(pdict.cursor < pdict.data.get_length()) {
									var pos4 = pdict.cursor++;
									if(pos4 == null) {
										pos4 = 0;
									}
									pdict.data.readU8(pos4);
								}
							} else if(b01 >= 251 && b01 <= 254) {
								if(pdict.cursor < pdict.data.get_length()) {
									var pos5 = pdict.cursor++;
									if(pos5 == null) {
										pos5 = 0;
									}
									pdict.data.readU8(pos5);
								}
							} else if(b01 == 28) {
								var v1 = 0;
								var _g = 0;
								var _g1 = 2;
								while(_g < _g1) {
									var i1 = _g++;
									var v2;
									if(pdict.cursor >= pdict.data.get_length()) {
										v2 = 0;
									} else {
										var pos6 = pdict.cursor++;
										if(pos6 == null) {
											pos6 = 0;
										}
										v2 = pdict.data.readU8(pos6);
									}
									v1 = v1 << 8 | v2;
								}
							} else if(b01 == 29) {
								var v3 = 0;
								var _g2 = 0;
								var _g3 = 4;
								while(_g2 < _g3) {
									var i2 = _g2++;
									var v4;
									if(pdict.cursor >= pdict.data.get_length()) {
										v4 = 0;
									} else {
										var pos7 = pdict.cursor++;
										if(pos7 == null) {
											pos7 = 0;
										}
										v4 = pdict.data.readU8(pos7);
									}
									v3 = v3 << 8 | v4;
								}
							} else {
								throw haxe_Exception.thrown("Error");
							}
						}
					}
				}
				var end = pdict.cursor;
				if(pdict.cursor >= pdict.data.get_length()) {
					op = 0;
				} else {
					var pos8 = pdict.cursor++;
					if(pos8 == null) {
						pos8 = 0;
					}
					op = pdict.data.readU8(pos8);
				}
				if(op == 12) {
					var op1;
					if(pdict.cursor >= pdict.data.get_length()) {
						op1 = 0;
					} else {
						var pos9 = pdict.cursor++;
						if(pos9 == null) {
							pos9 = 0;
						}
						op1 = pdict.data.readU8(pos9);
					}
					op = op1 | 256;
				}
				if(op == 19) {
					var s = end - start;
					var r = new kha_graphics2_truetype_Stbtt_$_$buf();
					r.data = null;
					r.cursor = 0;
					var r1 = r;
					if(start < 0 || s < 0 || start > pdict.data.get_length() || s > pdict.data.get_length() - start) {
						ret = r1;
					} else {
						r1.data = pdict.data.sub(start,s);
						ret = r1;
					}
					break;
				}
			}
			var operands;
			if(ret != null) {
				operands = ret;
			} else {
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(0 > pdict.data.get_length() || 0 > pdict.data.get_length()) {
					operands = r1;
				} else {
					r1.data = pdict.data.sub(0,0);
					operands = r1;
				}
			}
			while(i < 1 && operands.cursor < operands.data.get_length()) {
				var b0;
				if(operands.cursor >= operands.data.get_length()) {
					b0 = 0;
				} else {
					var pos = operands.cursor++;
					if(pos == null) {
						pos = 0;
					}
					b0 = operands.data.readU8(pos);
				}
				var tmp1;
				if(b0 >= 32 && b0 <= 246) {
					tmp1 = b0 - 139;
				} else if(b0 >= 247 && b0 <= 250) {
					var tmp2;
					if(operands.cursor >= operands.data.get_length()) {
						tmp2 = 0;
					} else {
						var pos1 = operands.cursor++;
						if(pos1 == null) {
							pos1 = 0;
						}
						tmp2 = operands.data.readU8(pos1);
					}
					tmp1 = (b0 - 247) * 256 + tmp2 + 108;
				} else if(b0 >= 251 && b0 <= 254) {
					var tmp3;
					if(operands.cursor >= operands.data.get_length()) {
						tmp3 = 0;
					} else {
						var pos2 = operands.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						tmp3 = operands.data.readU8(pos2);
					}
					tmp1 = -(b0 - 251) * 256 - tmp3 - 108;
				} else if(b0 == 28) {
					var v = 0;
					var _g = 0;
					var _g1 = 2;
					while(_g < _g1) {
						var i1 = _g++;
						var v1;
						if(operands.cursor >= operands.data.get_length()) {
							v1 = 0;
						} else {
							var pos3 = operands.cursor++;
							if(pos3 == null) {
								pos3 = 0;
							}
							v1 = operands.data.readU8(pos3);
						}
						v = v << 8 | v1;
					}
					tmp1 = v;
				} else if(b0 == 29) {
					var v2 = 0;
					var _g2 = 0;
					var _g3 = 4;
					while(_g2 < _g3) {
						var i2 = _g2++;
						var v3;
						if(operands.cursor >= operands.data.get_length()) {
							v3 = 0;
						} else {
							var pos4 = operands.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							v3 = operands.data.readU8(pos4);
						}
						v2 = v2 << 8 | v3;
					}
					tmp1 = v2;
				} else {
					throw haxe_Exception.thrown("Error");
				}
				subrsoff[i] = tmp1;
				++i;
			}
			if(subrsoff[0] == 0) {
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				tmp = r;
			} else {
				var o = private_loc[1] + subrsoff[0];
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				var start = b.cursor;
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i = _g++;
					var v1;
					if(b.cursor >= b.data.get_length()) {
						v1 = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						v1 = b.data.readU8(pos);
					}
					v = v << 8 | v1;
				}
				var count = v;
				if(count > 0) {
					var offsize;
					if(b.cursor >= b.data.get_length()) {
						offsize = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						offsize = b.data.readU8(pos);
					}
					if(!(offsize >= 1 && offsize <= 4)) {
						throw haxe_Exception.thrown("Error");
					}
					var o = b.cursor + offsize * count;
					if(o > b.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
					var v = 0;
					if(!(offsize >= 1 && offsize <= 4)) {
						throw haxe_Exception.thrown("Error");
					}
					var _g = 0;
					var _g1 = offsize;
					while(_g < _g1) {
						var i = _g++;
						var v1;
						if(b.cursor >= b.data.get_length()) {
							v1 = 0;
						} else {
							var pos = b.cursor++;
							if(pos == null) {
								pos = 0;
							}
							v1 = b.data.readU8(pos);
						}
						v = v << 8 | v1;
					}
					var o = b.cursor + (v - 1);
					if(o > b.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
					var s = b.cursor - start;
					var r = new kha_graphics2_truetype_Stbtt_$_$buf();
					r.data = null;
					r.cursor = 0;
					var r1 = r;
					if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
						tmp = r1;
					} else {
						r1.data = b.data.sub(start,s);
						tmp = r1;
					}
				} else {
					tmp = b;
				}
			}
		}
		info.subrs = tmp;
		if(cstype[0] != 2) {
			return false;
		}
		if(charstrings[0] == 0) {
			return false;
		}
		if(fdarrayoff[0] != 0) {
			if(fdselectoff[0] == 0) {
				return false;
			}
			var o = fdarrayoff[0];
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var start = b.cursor;
			var v = 0;
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var count = v;
			var tmp;
			if(count > 0) {
				var offsize;
				if(b.cursor >= b.data.get_length()) {
					offsize = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					offsize = b.data.readU8(pos);
				}
				if(!(offsize >= 1 && offsize <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var o = b.cursor + offsize * count;
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				var v = 0;
				if(!(offsize >= 1 && offsize <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var _g = 0;
				var _g1 = offsize;
				while(_g < _g1) {
					var i = _g++;
					var v1;
					if(b.cursor >= b.data.get_length()) {
						v1 = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						v1 = b.data.readU8(pos);
					}
					v = v << 8 | v1;
				}
				var o = b.cursor + (v - 1);
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				var s = b.cursor - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
					tmp = r1;
				} else {
					r1.data = b.data.sub(start,s);
					tmp = r1;
				}
			} else {
				tmp = b;
			}
			info.fontdicts = tmp;
			var o = fdselectoff[0];
			var s = b.data.get_length() - fdselectoff[0];
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			var tmp;
			if(o < 0 || s < 0 || o > b.data.get_length() || s > b.data.get_length() - o) {
				tmp = r1;
			} else {
				r1.data = b.data.sub(o,s);
				tmp = r1;
			}
			info.fdselect = tmp;
		}
		var o = charstrings[0];
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		var tmp;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				tmp = r1;
			} else {
				r1.data = b.data.sub(start,s);
				tmp = r1;
			}
		} else {
			tmp = b;
		}
		info.charstrings = tmp;
	}
	var t = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"maxp");
	if(t != 0) {
		var pos = t + 4;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		info.numGlyphs = ch2 | ch1 << 8;
	} else {
		info.numGlyphs = 65535;
	}
	var pos = cmap + 2;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	var numTables = ch2 | ch1 << 8;
	info.index_map = 0;
	var _g = 0;
	var _g1 = numTables;
	while(_g < _g1) {
		var i = _g++;
		var encoding_record = cmap + 4 + 8 * i;
		var pos = encoding_record;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		switch(ch2 | ch1 << 8) {
		case 0:
			var pos1 = encoding_record + 4;
			if(pos1 == null) {
				pos1 = 0;
			}
			var pos2 = pos1;
			if(pos2 == null) {
				pos2 = 0;
			}
			var ch11 = data.readU8(pos2);
			var ch21 = data.readU8(pos2 + 1);
			var ch3 = data.readU8(pos2 + 2);
			var ch4 = data.readU8(pos2 + 3);
			info.index_map = cmap + (ch4 | ch3 << 8 | ch21 << 16 | ch11 << 24);
			break;
		case 3:
			var pos3 = encoding_record + 2;
			if(pos3 == null) {
				pos3 = 0;
			}
			var ch12 = data.readU8(pos3);
			var ch22 = data.readU8(pos3 + 1);
			switch(ch22 | ch12 << 8) {
			case 1:case 10:
				var pos4 = encoding_record + 4;
				if(pos4 == null) {
					pos4 = 0;
				}
				var pos5 = pos4;
				if(pos5 == null) {
					pos5 = 0;
				}
				var ch13 = data.readU8(pos5);
				var ch23 = data.readU8(pos5 + 1);
				var ch31 = data.readU8(pos5 + 2);
				var ch41 = data.readU8(pos5 + 3);
				info.index_map = cmap + (ch41 | ch31 << 8 | ch23 << 16 | ch13 << 24);
				break;
			}
			break;
		}
	}
	if(info.index_map == 0) {
		return false;
	}
	var pos = info.head + 50;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	info.indexToLocFormat = ch2 | ch1 << 8;
	return true;
};
kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex = function(info,unicode_codepoint) {
	var data = info.data;
	var index_map = info.index_map;
	var pos = index_map;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	var format = ch2 | ch1 << 8;
	if(format == 0) {
		var pos = index_map + 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var bytes = ch2 | ch1 << 8;
		if(unicode_codepoint < bytes - 6) {
			var pos = index_map + 6 + unicode_codepoint;
			if(pos == null) {
				pos = 0;
			}
			return data.readU8(pos);
		}
		return 0;
	} else if(format == 6) {
		var pos = index_map + 6;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var first = ch2 | ch1 << 8;
		var pos = index_map + 8;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var count = ch2 | ch1 << 8;
		if(unicode_codepoint >= first && unicode_codepoint < first + count) {
			var pos = index_map + 10 + (unicode_codepoint - first) * 2;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = data.readU8(pos);
			var ch2 = data.readU8(pos + 1);
			return ch2 | ch1 << 8;
		}
		return 0;
	} else if(format == 2) {
		throw haxe_Exception.thrown("Error");
	} else if(format == 4) {
		var pos = index_map + 6;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var segcount = (ch2 | ch1 << 8) >> 1;
		var pos = index_map + 8;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var searchRange = (ch2 | ch1 << 8) >> 1;
		var pos = index_map + 10;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var entrySelector = ch2 | ch1 << 8;
		var pos = index_map + 12;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var rangeShift = (ch2 | ch1 << 8) >> 1;
		var endCount = index_map + 14;
		var search = endCount;
		if(unicode_codepoint > 65535) {
			return 0;
		}
		var pos = search + rangeShift * 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		if(unicode_codepoint >= (ch2 | ch1 << 8)) {
			search += rangeShift * 2;
		}
		search -= 2;
		while(entrySelector != 0) {
			searchRange >>= 1;
			var pos = search + searchRange * 2;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = data.readU8(pos);
			var ch2 = data.readU8(pos + 1);
			var end = ch2 | ch1 << 8;
			if(unicode_codepoint > end) {
				search += searchRange * 2;
			}
			--entrySelector;
		}
		search += 2;
		var item = search - endCount >> 1 & 65535;
		var pos = endCount + 2 * item;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		if(unicode_codepoint > (ch2 | ch1 << 8)) {
			throw haxe_Exception.thrown("Error");
		}
		var pos = index_map + 14 + segcount * 2 + 2 + 2 * item;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var start = ch2 | ch1 << 8;
		if(unicode_codepoint < start) {
			return 0;
		}
		var pos = index_map + 14 + segcount * 6 + 2 + 2 * item;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var offset = ch2 | ch1 << 8;
		if(offset == 0) {
			var pos = index_map + 14 + segcount * 4 + 2 + 2 * item;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = data.readU8(pos);
			var ch2 = data.readU8(pos + 1);
			var n = ch2 | ch1 << 8;
			return unicode_codepoint + ((n & 32768) != 0 ? n - 65536 : n) & 65535;
		}
		var pos = offset + (unicode_codepoint - start) * 2 + index_map + 14 + segcount * 6 + 2 + 2 * item;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		return ch2 | ch1 << 8;
	} else if(format == 12 || format == 13) {
		var pos = index_map + 12;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = data.readU8(pos1);
		var ch2 = data.readU8(pos1 + 1);
		var ch3 = data.readU8(pos1 + 2);
		var ch4 = data.readU8(pos1 + 3);
		var ngroups = ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		var low = 0;
		var high = ngroups;
		while(low < high) {
			var mid = low + (high - low >> 1);
			var pos = index_map + 16 + mid * 12;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = data.readU8(pos1);
			var ch2 = data.readU8(pos1 + 1);
			var ch3 = data.readU8(pos1 + 2);
			var ch4 = data.readU8(pos1 + 3);
			var start_char = ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
			var pos2 = index_map + 16 + mid * 12 + 4;
			if(pos2 == null) {
				pos2 = 0;
			}
			var pos3 = pos2;
			if(pos3 == null) {
				pos3 = 0;
			}
			var ch11 = data.readU8(pos3);
			var ch21 = data.readU8(pos3 + 1);
			var ch31 = data.readU8(pos3 + 2);
			var ch41 = data.readU8(pos3 + 3);
			var end_char = ch41 | ch31 << 8 | ch21 << 16 | ch11 << 24;
			if(unicode_codepoint < start_char) {
				high = mid;
			} else if(unicode_codepoint > end_char) {
				low = mid + 1;
			} else {
				var pos4 = index_map + 16 + mid * 12 + 8;
				if(pos4 == null) {
					pos4 = 0;
				}
				var pos5 = pos4;
				if(pos5 == null) {
					pos5 = 0;
				}
				var ch12 = data.readU8(pos5);
				var ch22 = data.readU8(pos5 + 1);
				var ch32 = data.readU8(pos5 + 2);
				var ch42 = data.readU8(pos5 + 3);
				var start_glyph = ch42 | ch32 << 8 | ch22 << 16 | ch12 << 24;
				if(format == 12) {
					return start_glyph + unicode_codepoint - start_char;
				} else {
					return start_glyph;
				}
			}
		}
		return 0;
	}
	throw haxe_Exception.thrown("Error");
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointShape = function(info,unicode_codepoint) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape(info,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,unicode_codepoint));
};
kha_graphics2_truetype_StbTruetype.stbtt_setvertex = function(v,type,x,y,cx,cy) {
	v.type = type;
	v.x = x;
	v.y = y;
	v.cx = cx;
	v.cy = cy;
};
kha_graphics2_truetype_StbTruetype.stbtt__GetGlyfOffset = function(info,glyph_index) {
	var g1;
	var g2;
	if(!(info.cff.data == null || info.cff.data.get_length() == 0)) {
		throw haxe_Exception.thrown("Error");
	}
	if(glyph_index >= info.numGlyphs) {
		return -1;
	}
	if(info.indexToLocFormat >= 2) {
		return -1;
	}
	if(info.indexToLocFormat == 0) {
		var info1 = info.glyf;
		var p = info.data;
		var pos = info.loca + glyph_index * 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		g1 = info1 + (ch2 | ch1 << 8) * 2;
		var info1 = info.glyf;
		var p = info.data;
		var pos = info.loca + glyph_index * 2 + 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		g2 = info1 + (ch2 | ch1 << 8) * 2;
	} else {
		var info1 = info.glyf;
		var p = info.data;
		var pos = info.loca + glyph_index * 4;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = p.readU8(pos1);
		var ch2 = p.readU8(pos1 + 1);
		var ch3 = p.readU8(pos1 + 2);
		var ch4 = p.readU8(pos1 + 3);
		g1 = info1 + (ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24);
		var info1 = info.glyf;
		var p = info.data;
		var pos = info.loca + glyph_index * 4 + 4;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = p.readU8(pos1);
		var ch2 = p.readU8(pos1 + 1);
		var ch3 = p.readU8(pos1 + 2);
		var ch4 = p.readU8(pos1 + 3);
		g2 = info1 + (ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24);
	}
	if(g1 == g2) {
		return -1;
	} else {
		return g1;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBox = function(info,glyph_index,rect) {
	if(info.cff.data != null && info.cff.data.get_length() > 0) {
		kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphInfoT2(info,glyph_index,rect);
	} else {
		var g = kha_graphics2_truetype_StbTruetype.stbtt__GetGlyfOffset(info,glyph_index);
		if(g < 0) {
			return false;
		}
		var p = info.data;
		var pos = g + 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		rect.x0 = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = g + 4;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		rect.y0 = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = g + 6;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		rect.x1 = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = g + 8;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		rect.y1 = (n & 32768) != 0 ? n - 65536 : n;
	}
	return true;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBox = function(info,codepoint,rect) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBox(info,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,codepoint),rect);
};
kha_graphics2_truetype_StbTruetype.stbtt_IsGlyphEmpty = function(info,glyph_index) {
	if(info.cff.data != null && info.cff.data.get_length() > 0) {
		return kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphInfoT2(info,glyph_index,null) == 0;
	}
	var g = kha_graphics2_truetype_StbTruetype.stbtt__GetGlyfOffset(info,glyph_index);
	if(g < 0) {
		return true;
	}
	var p = info.data;
	var pos = g;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	var numberOfContours = (n & 32768) != 0 ? n - 65536 : n;
	return numberOfContours == 0;
};
kha_graphics2_truetype_StbTruetype.stbtt__close_shape = function(vertices,num_vertices,was_off,start_off,sx,sy,scx,scy,cx,cy) {
	if(start_off) {
		if(was_off) {
			kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,cx + scx >> 1,cy + scy >> 1,cx,cy);
		}
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,sx,sy,scx,scy);
	} else if(was_off) {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,sx,sy,cx,cy);
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],2,sx,sy,0,0);
	}
	return num_vertices;
};
kha_graphics2_truetype_StbTruetype.copyVertices = function(from,to,offset,count) {
	var _g = 0;
	var _g1 = count;
	while(_g < _g1) {
		var i = _g++;
		to[offset + i] = from[i];
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphShapeTT = function(info,glyph_index) {
	var data = info.data;
	var vertices = null;
	var num_vertices = 0;
	var g = kha_graphics2_truetype_StbTruetype.stbtt__GetGlyfOffset(info,glyph_index);
	if(g < 0) {
		return null;
	}
	var pos = g;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	var numberOfContours = (n & 32768) != 0 ? n - 65536 : n;
	if(numberOfContours > 0) {
		var flags = 0;
		var j = 0;
		var next_move = 0;
		var off = 0;
		var was_off = false;
		var start_off = false;
		var endPtsOfContoursOffset = g + 10;
		var pos = endPtsOfContoursOffset + numberOfContours * 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var ins = ch2 | ch1 << 8;
		var pointsIndex = endPtsOfContoursOffset + numberOfContours * 2 + 2 + ins;
		var pos = endPtsOfContoursOffset + numberOfContours * 2 - 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var n = 1 + (ch2 | ch1 << 8);
		var m = n + 2 * numberOfContours;
		var this1 = new Array(m);
		vertices = this1;
		if(vertices == null) {
			return null;
		} else {
			var _g = 0;
			var _g1 = vertices.length;
			while(_g < _g1) {
				var i = _g++;
				vertices[i] = new kha_graphics2_truetype_Stbtt_$vertex();
			}
		}
		next_move = 0;
		var flagcount = 0;
		off = m - n;
		var _g = 0;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			if(flagcount == 0) {
				flags = data.readU8(pointsIndex++);
				if((flags & 8) != 0) {
					flagcount = data.readU8(pointsIndex++);
				}
			} else {
				--flagcount;
			}
			vertices[off + i].type = flags;
		}
		var x = 0;
		var _g = 0;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			flags = vertices[off + i].type;
			if((flags & 2) != 0) {
				var dx = data.readU8(pointsIndex++);
				x += (flags & 16) != 0 ? dx : -dx;
			} else if((flags & 16) == 0) {
				var value;
				var ch1 = data.readU8(pointsIndex);
				var ch2 = data.readU8(pointsIndex + 1);
				var n1 = ch2 | ch1 << 8;
				if((n1 & 32768) != 0) {
					value = n1 - 65536;
				} else {
					value = n1;
				}
				x += value;
				pointsIndex += 2;
			}
			vertices[off + i].x = x;
		}
		var y = 0;
		var _g = 0;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			flags = vertices[off + i].type;
			if((flags & 4) != 0) {
				var dy = data.readU8(pointsIndex++);
				y += (flags & 32) != 0 ? dy : -dy;
			} else if((flags & 32) == 0) {
				var value;
				var ch1 = data.readU8(pointsIndex);
				var ch2 = data.readU8(pointsIndex + 1);
				var n1 = ch2 | ch1 << 8;
				if((n1 & 32768) != 0) {
					value = n1 - 65536;
				} else {
					value = n1;
				}
				y += value;
				pointsIndex += 2;
			}
			vertices[off + i].y = y;
		}
		num_vertices = 0;
		var scy = 0;
		var scx = scy;
		var cy = scx;
		var cx = cy;
		var sy = cx;
		var sx = sy;
		var i = 0;
		while(i < n) {
			flags = vertices[off + i].type;
			x = vertices[off + i].x;
			y = vertices[off + i].y;
			if(next_move == i) {
				if(i != 0) {
					num_vertices = kha_graphics2_truetype_StbTruetype.stbtt__close_shape(vertices,num_vertices,was_off,start_off,sx,sy,scx,scy,cx,cy);
				}
				start_off = (flags & 1) == 0;
				if(start_off) {
					scx = x;
					scy = y;
					if((vertices[off + i + 1].type & 1) == 0) {
						sx = x + vertices[off + i + 1].x >> 1;
						sy = y + vertices[off + i + 1].y >> 1;
					} else {
						sx = vertices[off + i + 1].x;
						sy = vertices[off + i + 1].y;
						++i;
					}
				} else {
					sx = x;
					sy = y;
				}
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],1,sx,sy,0,0);
				was_off = false;
				var pos = endPtsOfContoursOffset + j * 2;
				if(pos == null) {
					pos = 0;
				}
				var ch1 = data.readU8(pos);
				var ch2 = data.readU8(pos + 1);
				next_move = 1 + (ch2 | ch1 << 8);
				++j;
			} else if((flags & 1) == 0) {
				if(was_off) {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,cx + x >> 1,cy + y >> 1,cx,cy);
				}
				cx = x;
				cy = y;
				was_off = true;
			} else {
				if(was_off) {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,x,y,cx,cy);
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],2,x,y,0,0);
				}
				was_off = false;
			}
			++i;
		}
		num_vertices = kha_graphics2_truetype_StbTruetype.stbtt__close_shape(vertices,num_vertices,was_off,start_off,sx,sy,scx,scy,cx,cy);
	} else if(numberOfContours < 0) {
		var more = 1;
		var compIndex = g + 10;
		num_vertices = 0;
		vertices = null;
		while(more != 0) {
			var comp_num_verts = 0;
			var i;
			var comp_verts = null;
			var tmp = null;
			var mtx0 = 1;
			var mtx1 = 0;
			var mtx2 = 0;
			var mtx3 = 1;
			var mtx4 = 0;
			var mtx5 = 0;
			var pos = compIndex;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = data.readU8(pos);
			var ch2 = data.readU8(pos + 1);
			var n = ch2 | ch1 << 8;
			var flags = (n & 32768) != 0 ? n - 65536 : n;
			var pos1 = compIndex += 2;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch11 = data.readU8(pos1);
			var ch21 = data.readU8(pos1 + 1);
			var n1 = ch21 | ch11 << 8;
			var gidx = (n1 & 32768) != 0 ? n1 - 65536 : n1;
			compIndex += 2;
			if((flags & 2) != 0) {
				if((flags & 1) != 0) {
					var pos2 = compIndex;
					if(pos2 == null) {
						pos2 = 0;
					}
					var ch12 = data.readU8(pos2);
					var ch22 = data.readU8(pos2 + 1);
					var n2 = ch22 | ch12 << 8;
					mtx4 = (n2 & 32768) != 0 ? n2 - 65536 : n2;
					var pos3 = compIndex += 2;
					if(pos3 == null) {
						pos3 = 0;
					}
					var ch13 = data.readU8(pos3);
					var ch23 = data.readU8(pos3 + 1);
					var n3 = ch23 | ch13 << 8;
					mtx5 = (n3 & 32768) != 0 ? n3 - 65536 : n3;
					compIndex += 2;
				} else {
					var pos4 = compIndex;
					if(pos4 == null) {
						pos4 = 0;
					}
					var n4 = data.readU8(pos4);
					mtx4 = n4 >= 128 ? n4 - 256 : n4;
					var pos5 = ++compIndex;
					if(pos5 == null) {
						pos5 = 0;
					}
					var n5 = data.readU8(pos5);
					mtx5 = n5 >= 128 ? n5 - 256 : n5;
					++compIndex;
				}
			} else {
				throw haxe_Exception.thrown("Error");
			}
			if((flags & 8) != 0) {
				var pos6 = compIndex;
				if(pos6 == null) {
					pos6 = 0;
				}
				var ch14 = data.readU8(pos6);
				var ch24 = data.readU8(pos6 + 1);
				var n6 = ch24 | ch14 << 8;
				mtx3 = ((n6 & 32768) != 0 ? n6 - 65536 : n6) / 16384.0;
				mtx0 = mtx3;
				compIndex += 2;
				mtx2 = 0;
				mtx1 = mtx2;
			} else if((flags & 64) != 0) {
				var pos7 = compIndex;
				if(pos7 == null) {
					pos7 = 0;
				}
				var ch15 = data.readU8(pos7);
				var ch25 = data.readU8(pos7 + 1);
				var n7 = ch25 | ch15 << 8;
				mtx0 = ((n7 & 32768) != 0 ? n7 - 65536 : n7) / 16384.0;
				compIndex += 2;
				mtx2 = 0;
				mtx1 = mtx2;
				var pos8 = compIndex;
				if(pos8 == null) {
					pos8 = 0;
				}
				var ch16 = data.readU8(pos8);
				var ch26 = data.readU8(pos8 + 1);
				var n8 = ch26 | ch16 << 8;
				mtx3 = ((n8 & 32768) != 0 ? n8 - 65536 : n8) / 16384.0;
				compIndex += 2;
			} else if((flags & 128) != 0) {
				var pos9 = compIndex;
				if(pos9 == null) {
					pos9 = 0;
				}
				var ch17 = data.readU8(pos9);
				var ch27 = data.readU8(pos9 + 1);
				var n9 = ch27 | ch17 << 8;
				mtx0 = ((n9 & 32768) != 0 ? n9 - 65536 : n9) / 16384.0;
				var pos10 = compIndex += 2;
				if(pos10 == null) {
					pos10 = 0;
				}
				var ch18 = data.readU8(pos10);
				var ch28 = data.readU8(pos10 + 1);
				var n10 = ch28 | ch18 << 8;
				mtx1 = ((n10 & 32768) != 0 ? n10 - 65536 : n10) / 16384.0;
				var pos11 = compIndex += 2;
				if(pos11 == null) {
					pos11 = 0;
				}
				var ch19 = data.readU8(pos11);
				var ch29 = data.readU8(pos11 + 1);
				var n11 = ch29 | ch19 << 8;
				mtx2 = ((n11 & 32768) != 0 ? n11 - 65536 : n11) / 16384.0;
				var pos12 = compIndex += 2;
				if(pos12 == null) {
					pos12 = 0;
				}
				var ch110 = data.readU8(pos12);
				var ch210 = data.readU8(pos12 + 1);
				var n12 = ch210 | ch110 << 8;
				mtx3 = ((n12 & 32768) != 0 ? n12 - 65536 : n12) / 16384.0;
				compIndex += 2;
			}
			var m = Math.sqrt(mtx0 * mtx0 + mtx1 * mtx1);
			var n13 = Math.sqrt(mtx2 * mtx2 + mtx3 * mtx3);
			comp_verts = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape(info,gidx);
			comp_num_verts = comp_verts == null ? 0 : comp_verts.length;
			if(comp_num_verts > 0) {
				var _g = 0;
				var _g1 = comp_num_verts;
				while(_g < _g1) {
					var i1 = _g++;
					var v = comp_verts[i1];
					var x = v.x;
					var y = v.y;
					v.x = m * (mtx0 * x + mtx2 * y + mtx4) | 0;
					v.y = n13 * (mtx1 * x + mtx3 * y + mtx5) | 0;
					x = v.cx;
					y = v.cy;
					v.cx = m * (mtx0 * x + mtx2 * y + mtx4) | 0;
					v.cy = n13 * (mtx1 * x + mtx3 * y + mtx5) | 0;
				}
				var this1 = new Array(num_vertices + comp_num_verts);
				tmp = this1;
				if(tmp == null) {
					return null;
				}
				if(num_vertices > 0) {
					kha_graphics2_truetype_StbTruetype.copyVertices(vertices,tmp,0,num_vertices);
				}
				kha_graphics2_truetype_StbTruetype.copyVertices(comp_verts,tmp,num_vertices,comp_num_verts);
				vertices = tmp;
				num_vertices += comp_num_verts;
			}
			more = flags & 32;
		}
	}
	if(vertices == null) {
		return null;
	}
	if(vertices.length < num_vertices) {
		throw haxe_Exception.thrown("Error");
	}
	if(num_vertices < vertices.length) {
		var this1 = new Array(num_vertices);
		var tmp = this1;
		kha_graphics2_truetype_StbTruetype.copyVertices(vertices,tmp,0,num_vertices);
		return tmp;
	} else {
		return vertices;
	}
};
kha_graphics2_truetype_StbTruetype.STBTT__CSCTX_INIT = function(bounds) {
	var tmp = new kha_graphics2_truetype_Stbtt_$_$csctx();
	tmp.bounds = bounds;
	tmp.started = false;
	tmp.first_x = 0;
	tmp.first_y = 0;
	tmp.x = 0;
	tmp.y = 0;
	tmp.min_x = 0;
	tmp.min_y = 0;
	tmp.max_x = 0;
	tmp.max_y = 0;
	tmp.pvertices = null;
	tmp.num_vertices = 0;
	return tmp;
};
kha_graphics2_truetype_StbTruetype.stbtt__track_vertex = function(c,x,y) {
	if(x > c.max_x || !c.started) {
		c.max_x = x;
	}
	if(y > c.max_y || !c.started) {
		c.max_y = y;
	}
	if(x < c.min_x || !c.started) {
		c.min_x = x;
	}
	if(y < c.min_y || !c.started) {
		c.min_y = y;
	}
	c.started = true;
};
kha_graphics2_truetype_StbTruetype.stbtt__csctx_v = function(c,type,x,y,cx,cy,cx1,cy1) {
	if(c.bounds) {
		if(x > c.max_x || !c.started) {
			c.max_x = x;
		}
		if(y > c.max_y || !c.started) {
			c.max_y = y;
		}
		if(x < c.min_x || !c.started) {
			c.min_x = x;
		}
		if(y < c.min_y || !c.started) {
			c.min_y = y;
		}
		c.started = true;
		if(type == 4) {
			if(cx > c.max_x || !c.started) {
				c.max_x = cx;
			}
			if(cy > c.max_y || !c.started) {
				c.max_y = cy;
			}
			if(cx < c.min_x || !c.started) {
				c.min_x = cx;
			}
			if(cy < c.min_y || !c.started) {
				c.min_y = cy;
			}
			c.started = true;
			if(cx1 > c.max_x || !c.started) {
				c.max_x = cx1;
			}
			if(cy1 > c.max_y || !c.started) {
				c.max_y = cy1;
			}
			if(cx1 < c.min_x || !c.started) {
				c.min_x = cx1;
			}
			if(cy1 < c.min_y || !c.started) {
				c.min_y = cy1;
			}
			c.started = true;
		}
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],type,x,y,cx,cy);
		c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx1 , Int);
		c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy1 , Int);
	}
	c.num_vertices++;
};
kha_graphics2_truetype_StbTruetype.stbtt__csctx_close_shape = function(ctx) {
	if(ctx.first_x != ctx.x || ctx.first_y != ctx.y) {
		var x = ctx.first_x | 0;
		var y = ctx.first_y | 0;
		if(ctx.bounds) {
			if(x > ctx.max_x || !ctx.started) {
				ctx.max_x = x;
			}
			if(y > ctx.max_y || !ctx.started) {
				ctx.max_y = y;
			}
			if(x < ctx.min_x || !ctx.started) {
				ctx.min_x = x;
			}
			if(y < ctx.min_y || !ctx.started) {
				ctx.min_y = y;
			}
			ctx.started = true;
		} else {
			kha_graphics2_truetype_StbTruetype.stbtt_setvertex(ctx.pvertices[ctx.num_vertices],2,x,y,0,0);
			ctx.pvertices[ctx.num_vertices].cx1 = js_Boot.__cast(0 , Int);
			ctx.pvertices[ctx.num_vertices].cy1 = js_Boot.__cast(0 , Int);
		}
		ctx.num_vertices++;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__csctx_rmove_to = function(ctx,dx,dy) {
	if(ctx.first_x != ctx.x || ctx.first_y != ctx.y) {
		var x = ctx.first_x | 0;
		var y = ctx.first_y | 0;
		if(ctx.bounds) {
			if(x > ctx.max_x || !ctx.started) {
				ctx.max_x = x;
			}
			if(y > ctx.max_y || !ctx.started) {
				ctx.max_y = y;
			}
			if(x < ctx.min_x || !ctx.started) {
				ctx.min_x = x;
			}
			if(y < ctx.min_y || !ctx.started) {
				ctx.min_y = y;
			}
			ctx.started = true;
		} else {
			kha_graphics2_truetype_StbTruetype.stbtt_setvertex(ctx.pvertices[ctx.num_vertices],2,x,y,0,0);
			ctx.pvertices[ctx.num_vertices].cx1 = js_Boot.__cast(0 , Int);
			ctx.pvertices[ctx.num_vertices].cy1 = js_Boot.__cast(0 , Int);
		}
		ctx.num_vertices++;
	}
	ctx.first_x = ctx.x = ctx.x + dx;
	ctx.first_y = ctx.y = ctx.y + dy;
	var x = ctx.x | 0;
	var y = ctx.y | 0;
	if(ctx.bounds) {
		if(x > ctx.max_x || !ctx.started) {
			ctx.max_x = x;
		}
		if(y > ctx.max_y || !ctx.started) {
			ctx.max_y = y;
		}
		if(x < ctx.min_x || !ctx.started) {
			ctx.min_x = x;
		}
		if(y < ctx.min_y || !ctx.started) {
			ctx.min_y = y;
		}
		ctx.started = true;
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(ctx.pvertices[ctx.num_vertices],1,x,y,0,0);
		ctx.pvertices[ctx.num_vertices].cx1 = js_Boot.__cast(0 , Int);
		ctx.pvertices[ctx.num_vertices].cy1 = js_Boot.__cast(0 , Int);
	}
	ctx.num_vertices++;
};
kha_graphics2_truetype_StbTruetype.stbtt__csctx_rline_to = function(ctx,dx,dy) {
	ctx.x += dx;
	ctx.y += dy;
	var x = ctx.x | 0;
	var y = ctx.y | 0;
	if(ctx.bounds) {
		if(x > ctx.max_x || !ctx.started) {
			ctx.max_x = x;
		}
		if(y > ctx.max_y || !ctx.started) {
			ctx.max_y = y;
		}
		if(x < ctx.min_x || !ctx.started) {
			ctx.min_x = x;
		}
		if(y < ctx.min_y || !ctx.started) {
			ctx.min_y = y;
		}
		ctx.started = true;
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(ctx.pvertices[ctx.num_vertices],2,x,y,0,0);
		ctx.pvertices[ctx.num_vertices].cx1 = js_Boot.__cast(0 , Int);
		ctx.pvertices[ctx.num_vertices].cy1 = js_Boot.__cast(0 , Int);
	}
	ctx.num_vertices++;
};
kha_graphics2_truetype_StbTruetype.stbtt__csctx_rccurve_to = function(ctx,dx1,dy1,dx2,dy2,dx3,dy3) {
	var cx1 = ctx.x + dx1;
	var cy1 = ctx.y + dy1;
	var cx2 = cx1 + dx2;
	var cy2 = cy1 + dy2;
	ctx.x = cx2 + dx3;
	ctx.y = cy2 + dy3;
	var x = ctx.x | 0;
	var y = ctx.y | 0;
	var cx = cx1 | 0;
	var cy = cy1 | 0;
	var cx1 = cx2 | 0;
	var cy1 = cy2 | 0;
	if(ctx.bounds) {
		if(x > ctx.max_x || !ctx.started) {
			ctx.max_x = x;
		}
		if(y > ctx.max_y || !ctx.started) {
			ctx.max_y = y;
		}
		if(x < ctx.min_x || !ctx.started) {
			ctx.min_x = x;
		}
		if(y < ctx.min_y || !ctx.started) {
			ctx.min_y = y;
		}
		ctx.started = true;
		if(cx > ctx.max_x || !ctx.started) {
			ctx.max_x = cx;
		}
		if(cy > ctx.max_y || !ctx.started) {
			ctx.max_y = cy;
		}
		if(cx < ctx.min_x || !ctx.started) {
			ctx.min_x = cx;
		}
		if(cy < ctx.min_y || !ctx.started) {
			ctx.min_y = cy;
		}
		ctx.started = true;
		if(cx1 > ctx.max_x || !ctx.started) {
			ctx.max_x = cx1;
		}
		if(cy1 > ctx.max_y || !ctx.started) {
			ctx.max_y = cy1;
		}
		if(cx1 < ctx.min_x || !ctx.started) {
			ctx.min_x = cx1;
		}
		if(cy1 < ctx.min_y || !ctx.started) {
			ctx.min_y = cy1;
		}
		ctx.started = true;
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(ctx.pvertices[ctx.num_vertices],4,x,y,cx,cy);
		ctx.pvertices[ctx.num_vertices].cx1 = js_Boot.__cast(cx1 , Int);
		ctx.pvertices[ctx.num_vertices].cy1 = js_Boot.__cast(cy1 , Int);
	}
	ctx.num_vertices++;
};
kha_graphics2_truetype_StbTruetype.stbtt__get_subr = function(idx,n) {
	if(0 > idx.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	idx.cursor = 0 > idx.data.get_length() ? idx.data.get_length() : 0;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(idx.cursor >= idx.data.get_length()) {
			v1 = 0;
		} else {
			var pos = idx.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = idx.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var count = v;
	var bias = 107;
	if(count >= 33900) {
		bias = 32768;
	} else if(count >= 1240) {
		bias = 1131;
	}
	n += bias;
	if(n < 0 || n >= count) {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		return r;
	}
	if(0 > idx.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	idx.cursor = 0 > idx.data.get_length() ? idx.data.get_length() : 0;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(idx.cursor >= idx.data.get_length()) {
			v1 = 0;
		} else {
			var pos = idx.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = idx.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var count = v;
	var offsize;
	if(idx.cursor >= idx.data.get_length()) {
		offsize = 0;
	} else {
		var pos = idx.cursor++;
		if(pos == null) {
			pos = 0;
		}
		offsize = idx.data.readU8(pos);
	}
	if(!(n >= 0 && n < count)) {
		throw haxe_Exception.thrown("Error");
	}
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var o = idx.cursor + n * offsize;
	if(o > idx.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	idx.cursor = o > idx.data.get_length() || o < 0 ? idx.data.get_length() : o;
	var v = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(idx.cursor >= idx.data.get_length()) {
			v1 = 0;
		} else {
			var pos = idx.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = idx.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var start = v;
	var v = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(idx.cursor >= idx.data.get_length()) {
			v1 = 0;
		} else {
			var pos = idx.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = idx.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var end = v;
	var o = 2 + (count + 1) * offsize + start;
	var s = end - start;
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	var r1 = r;
	if(o < 0 || s < 0 || o > idx.data.get_length() || s > idx.data.get_length() - o) {
		return r1;
	} else {
		r1.data = idx.data.sub(o,s);
		return r1;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__cid_get_glyph_subrs = function(info,glyph_index) {
	var fdselect = info.fdselect;
	var nranges;
	var start;
	var end;
	var v;
	var fmt;
	var fdselector = -1;
	var i;
	if(0 > fdselect.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	fdselect.cursor = 0 > fdselect.data.get_length() ? fdselect.data.get_length() : 0;
	if(fdselect.cursor >= fdselect.data.get_length()) {
		fmt = 0;
	} else {
		var pos = fdselect.cursor++;
		if(pos == null) {
			pos = 0;
		}
		fmt = fdselect.data.readU8(pos);
	}
	if(fmt == 0) {
		var o = fdselect.cursor + glyph_index;
		if(o > fdselect.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		fdselect.cursor = o > fdselect.data.get_length() || o < 0 ? fdselect.data.get_length() : o;
		if(fdselect.cursor >= fdselect.data.get_length()) {
			fdselector = 0;
		} else {
			var pos = fdselect.cursor++;
			if(pos == null) {
				pos = 0;
			}
			fdselector = fdselect.data.readU8(pos);
		}
	} else if(fmt == 3) {
		var v1 = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v2;
			if(fdselect.cursor >= fdselect.data.get_length()) {
				v2 = 0;
			} else {
				var pos = fdselect.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v2 = fdselect.data.readU8(pos);
			}
			v1 = v1 << 8 | v2;
		}
		nranges = v1;
		var v1 = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v2;
			if(fdselect.cursor >= fdselect.data.get_length()) {
				v2 = 0;
			} else {
				var pos = fdselect.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v2 = fdselect.data.readU8(pos);
			}
			v1 = v1 << 8 | v2;
		}
		start = v1;
		var _g = 0;
		var _g1 = nranges;
		while(_g < _g1) {
			var i = _g++;
			if(fdselect.cursor >= fdselect.data.get_length()) {
				v = 0;
			} else {
				var pos = fdselect.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v = fdselect.data.readU8(pos);
			}
			var v1 = 0;
			var _g2 = 0;
			var _g3 = 2;
			while(_g2 < _g3) {
				var i1 = _g2++;
				var v2;
				if(fdselect.cursor >= fdselect.data.get_length()) {
					v2 = 0;
				} else {
					var pos1 = fdselect.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					v2 = fdselect.data.readU8(pos1);
				}
				v1 = v1 << 8 | v2;
			}
			end = v1;
			if(glyph_index >= start && glyph_index < end) {
				fdselector = v;
				break;
			}
			start = end;
		}
	}
	if(fdselector == -1) {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
	}
	var cff = info.cff;
	var b = info.fontdicts;
	if(0 > b.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = 0 > b.data.get_length() ? b.data.get_length() : 0;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var count = v;
	var offsize;
	if(b.cursor >= b.data.get_length()) {
		offsize = 0;
	} else {
		var pos = b.cursor++;
		if(pos == null) {
			pos = 0;
		}
		offsize = b.data.readU8(pos);
	}
	if(!(fdselector >= 0 && fdselector < count)) {
		throw haxe_Exception.thrown("Error");
	}
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var o = b.cursor + fdselector * offsize;
	if(o > b.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
	var v = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var start = v;
	var v = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var end = v;
	var o = 2 + (count + 1) * offsize + start;
	var s = end - start;
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	var r1 = r;
	var fontdict;
	if(o < 0 || s < 0 || o > b.data.get_length() || s > b.data.get_length() - o) {
		fontdict = r1;
	} else {
		r1.data = b.data.sub(o,s);
		fontdict = r1;
	}
	var subrsoff = [0];
	var private_loc = [0,0];
	var i = 0;
	if(0 > fontdict.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	fontdict.cursor = 0 > fontdict.data.get_length() ? fontdict.data.get_length() : 0;
	var ret = null;
	while(fontdict.cursor < fontdict.data.get_length()) {
		var start = fontdict.cursor;
		var op;
		while(true) {
			var tmp;
			if(fontdict.cursor >= fontdict.data.get_length()) {
				tmp = 0;
			} else {
				var pos = fontdict.cursor;
				if(pos == null) {
					pos = 0;
				}
				tmp = fontdict.data.readU8(pos);
			}
			if(!(tmp >= 28)) {
				break;
			}
			var v;
			var b0;
			if(fontdict.cursor >= fontdict.data.get_length()) {
				b0 = 0;
			} else {
				var pos1 = fontdict.cursor;
				if(pos1 == null) {
					pos1 = 0;
				}
				b0 = fontdict.data.readU8(pos1);
			}
			if(b0 < 28) {
				throw haxe_Exception.thrown("Error");
			}
			if(b0 == 30) {
				var o = fontdict.cursor + 1;
				if(o > fontdict.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				fontdict.cursor = o > fontdict.data.get_length() || o < 0 ? fontdict.data.get_length() : o;
				while(fontdict.cursor < fontdict.data.get_length()) {
					if(fontdict.cursor >= fontdict.data.get_length()) {
						v = 0;
					} else {
						var pos2 = fontdict.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						v = fontdict.data.readU8(pos2);
					}
					if((v & 15) == 15 || v >> 4 == 15) {
						break;
					}
				}
			} else {
				var b01;
				if(fontdict.cursor >= fontdict.data.get_length()) {
					b01 = 0;
				} else {
					var pos3 = fontdict.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					b01 = fontdict.data.readU8(pos3);
				}
				if(!(b01 >= 32 && b01 <= 246)) {
					if(b01 >= 247 && b01 <= 250) {
						if(fontdict.cursor < fontdict.data.get_length()) {
							var pos4 = fontdict.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							fontdict.data.readU8(pos4);
						}
					} else if(b01 >= 251 && b01 <= 254) {
						if(fontdict.cursor < fontdict.data.get_length()) {
							var pos5 = fontdict.cursor++;
							if(pos5 == null) {
								pos5 = 0;
							}
							fontdict.data.readU8(pos5);
						}
					} else if(b01 == 28) {
						var v1 = 0;
						var _g = 0;
						var _g1 = 2;
						while(_g < _g1) {
							var i1 = _g++;
							var v2;
							if(fontdict.cursor >= fontdict.data.get_length()) {
								v2 = 0;
							} else {
								var pos6 = fontdict.cursor++;
								if(pos6 == null) {
									pos6 = 0;
								}
								v2 = fontdict.data.readU8(pos6);
							}
							v1 = v1 << 8 | v2;
						}
					} else if(b01 == 29) {
						var v3 = 0;
						var _g2 = 0;
						var _g3 = 4;
						while(_g2 < _g3) {
							var i2 = _g2++;
							var v4;
							if(fontdict.cursor >= fontdict.data.get_length()) {
								v4 = 0;
							} else {
								var pos7 = fontdict.cursor++;
								if(pos7 == null) {
									pos7 = 0;
								}
								v4 = fontdict.data.readU8(pos7);
							}
							v3 = v3 << 8 | v4;
						}
					} else {
						throw haxe_Exception.thrown("Error");
					}
				}
			}
		}
		var end = fontdict.cursor;
		if(fontdict.cursor >= fontdict.data.get_length()) {
			op = 0;
		} else {
			var pos8 = fontdict.cursor++;
			if(pos8 == null) {
				pos8 = 0;
			}
			op = fontdict.data.readU8(pos8);
		}
		if(op == 12) {
			var op1;
			if(fontdict.cursor >= fontdict.data.get_length()) {
				op1 = 0;
			} else {
				var pos9 = fontdict.cursor++;
				if(pos9 == null) {
					pos9 = 0;
				}
				op1 = fontdict.data.readU8(pos9);
			}
			op = op1 | 256;
		}
		if(op == 18) {
			var s = end - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > fontdict.data.get_length() || s > fontdict.data.get_length() - start) {
				ret = r1;
			} else {
				r1.data = fontdict.data.sub(start,s);
				ret = r1;
			}
			break;
		}
	}
	var operands;
	if(ret != null) {
		operands = ret;
	} else {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(0 > fontdict.data.get_length() || 0 > fontdict.data.get_length()) {
			operands = r1;
		} else {
			r1.data = fontdict.data.sub(0,0);
			operands = r1;
		}
	}
	while(i < 2 && operands.cursor < operands.data.get_length()) {
		var b0;
		if(operands.cursor >= operands.data.get_length()) {
			b0 = 0;
		} else {
			var pos = operands.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = operands.data.readU8(pos);
		}
		var tmp;
		if(b0 >= 32 && b0 <= 246) {
			tmp = b0 - 139;
		} else if(b0 >= 247 && b0 <= 250) {
			var tmp1;
			if(operands.cursor >= operands.data.get_length()) {
				tmp1 = 0;
			} else {
				var pos1 = operands.cursor++;
				if(pos1 == null) {
					pos1 = 0;
				}
				tmp1 = operands.data.readU8(pos1);
			}
			tmp = (b0 - 247) * 256 + tmp1 + 108;
		} else if(b0 >= 251 && b0 <= 254) {
			var tmp2;
			if(operands.cursor >= operands.data.get_length()) {
				tmp2 = 0;
			} else {
				var pos2 = operands.cursor++;
				if(pos2 == null) {
					pos2 = 0;
				}
				tmp2 = operands.data.readU8(pos2);
			}
			tmp = -(b0 - 251) * 256 - tmp2 - 108;
		} else if(b0 == 28) {
			var v = 0;
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i1 = _g++;
				var v1;
				if(operands.cursor >= operands.data.get_length()) {
					v1 = 0;
				} else {
					var pos3 = operands.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					v1 = operands.data.readU8(pos3);
				}
				v = v << 8 | v1;
			}
			tmp = v;
		} else if(b0 == 29) {
			var v2 = 0;
			var _g2 = 0;
			var _g3 = 4;
			while(_g2 < _g3) {
				var i2 = _g2++;
				var v3;
				if(operands.cursor >= operands.data.get_length()) {
					v3 = 0;
				} else {
					var pos4 = operands.cursor++;
					if(pos4 == null) {
						pos4 = 0;
					}
					v3 = operands.data.readU8(pos4);
				}
				v2 = v2 << 8 | v3;
			}
			tmp = v2;
		} else {
			throw haxe_Exception.thrown("Error");
		}
		private_loc[i] = tmp;
		++i;
	}
	if(private_loc[1] == 0 || private_loc[0] == 0) {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		return r;
	} else {
		var o = private_loc[1];
		var s = private_loc[0];
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		var pdict;
		if(o < 0 || s < 0 || o > cff.data.get_length() || s > cff.data.get_length() - o) {
			pdict = r1;
		} else {
			r1.data = cff.data.sub(o,s);
			pdict = r1;
		}
		var i = 0;
		if(0 > pdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		pdict.cursor = 0 > pdict.data.get_length() ? pdict.data.get_length() : 0;
		var ret = null;
		while(pdict.cursor < pdict.data.get_length()) {
			var start = pdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(pdict.cursor >= pdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = pdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = pdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(pdict.cursor >= pdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = pdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = pdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = pdict.cursor + 1;
					if(o > pdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					pdict.cursor = o > pdict.data.get_length() || o < 0 ? pdict.data.get_length() : o;
					while(pdict.cursor < pdict.data.get_length()) {
						if(pdict.cursor >= pdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = pdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = pdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(pdict.cursor >= pdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = pdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = pdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(pdict.cursor < pdict.data.get_length()) {
								var pos4 = pdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								pdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(pdict.cursor < pdict.data.get_length()) {
								var pos5 = pdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								pdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var v1 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i1 = _g++;
								var v2;
								if(pdict.cursor >= pdict.data.get_length()) {
									v2 = 0;
								} else {
									var pos6 = pdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v2 = pdict.data.readU8(pos6);
								}
								v1 = v1 << 8 | v2;
							}
						} else if(b01 == 29) {
							var v3 = 0;
							var _g2 = 0;
							var _g3 = 4;
							while(_g2 < _g3) {
								var i2 = _g2++;
								var v4;
								if(pdict.cursor >= pdict.data.get_length()) {
									v4 = 0;
								} else {
									var pos7 = pdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									v4 = pdict.data.readU8(pos7);
								}
								v3 = v3 << 8 | v4;
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = pdict.cursor;
			if(pdict.cursor >= pdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = pdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = pdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(pdict.cursor >= pdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = pdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = pdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 19) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > pdict.data.get_length() || s > pdict.data.get_length() - start) {
					ret = r1;
				} else {
					r1.data = pdict.data.sub(start,s);
					ret = r1;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(0 > pdict.data.get_length() || 0 > pdict.data.get_length()) {
				operands = r1;
			} else {
				r1.data = pdict.data.sub(0,0);
				operands = r1;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i1 = _g++;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g2 = 0;
				var _g3 = 4;
				while(_g2 < _g3) {
					var i2 = _g2++;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			subrsoff[i] = tmp;
			++i;
		}
		if(subrsoff[0] == 0) {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			return r;
		} else {
			var o = private_loc[1] + subrsoff[0];
			if(o > cff.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			cff.cursor = o > cff.data.get_length() || o < 0 ? cff.data.get_length() : o;
			var start = cff.cursor;
			var v = 0;
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(cff.cursor >= cff.data.get_length()) {
					v1 = 0;
				} else {
					var pos = cff.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = cff.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var count = v;
			if(count > 0) {
				var offsize;
				if(cff.cursor >= cff.data.get_length()) {
					offsize = 0;
				} else {
					var pos = cff.cursor++;
					if(pos == null) {
						pos = 0;
					}
					offsize = cff.data.readU8(pos);
				}
				if(!(offsize >= 1 && offsize <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var o = cff.cursor + offsize * count;
				if(o > cff.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				cff.cursor = o > cff.data.get_length() || o < 0 ? cff.data.get_length() : o;
				var v = 0;
				if(!(offsize >= 1 && offsize <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var _g = 0;
				var _g1 = offsize;
				while(_g < _g1) {
					var i = _g++;
					var v1;
					if(cff.cursor >= cff.data.get_length()) {
						v1 = 0;
					} else {
						var pos = cff.cursor++;
						if(pos == null) {
							pos = 0;
						}
						v1 = cff.data.readU8(pos);
					}
					v = v << 8 | v1;
				}
				var o = cff.cursor + (v - 1);
				if(o > cff.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				cff.cursor = o > cff.data.get_length() || o < 0 ? cff.data.get_length() : o;
				var s = cff.cursor - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > cff.data.get_length() || s > cff.data.get_length() - start) {
					return r1;
				} else {
					r1.data = cff.data.sub(start,s);
					return r1;
				}
			} else {
				return cff;
			}
		}
	}
};
kha_graphics2_truetype_StbTruetype.STBTT__CSERR = function(s) {
	return false;
};
kha_graphics2_truetype_StbTruetype.stbtt__run_charstring = function(info,glyph_index,c) {
	var in_header = true;
	var maskbits = 0;
	var subr_stack_height = 0;
	var sp = 0;
	var v;
	var i;
	var b0;
	var has_subrs = false;
	var clear_stack;
	var _g = [];
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	var s = _g;
	var _g = [];
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	var subr_stack = _g;
	var subrs = info.subrs;
	var b;
	var f;
	var b1 = info.charstrings;
	if(0 > b1.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b1.cursor = 0 > b1.data.get_length() ? b1.data.get_length() : 0;
	var v1 = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i1 = _g++;
		var v2;
		if(b1.cursor >= b1.data.get_length()) {
			v2 = 0;
		} else {
			var pos = b1.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v2 = b1.data.readU8(pos);
		}
		v1 = v1 << 8 | v2;
	}
	var count = v1;
	var offsize;
	if(b1.cursor >= b1.data.get_length()) {
		offsize = 0;
	} else {
		var pos = b1.cursor++;
		if(pos == null) {
			pos = 0;
		}
		offsize = b1.data.readU8(pos);
	}
	if(!(glyph_index >= 0 && glyph_index < count)) {
		throw haxe_Exception.thrown("Error");
	}
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var o = b1.cursor + glyph_index * offsize;
	if(o > b1.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	b1.cursor = o > b1.data.get_length() || o < 0 ? b1.data.get_length() : o;
	var v1 = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i1 = _g++;
		var v2;
		if(b1.cursor >= b1.data.get_length()) {
			v2 = 0;
		} else {
			var pos = b1.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v2 = b1.data.readU8(pos);
		}
		v1 = v1 << 8 | v2;
	}
	var start = v1;
	var v1 = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i1 = _g++;
		var v2;
		if(b1.cursor >= b1.data.get_length()) {
			v2 = 0;
		} else {
			var pos = b1.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v2 = b1.data.readU8(pos);
		}
		v1 = v1 << 8 | v2;
	}
	var end = v1;
	var o = 2 + (count + 1) * offsize + start;
	var s1 = end - start;
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	var r1 = r;
	if(o < 0 || s1 < 0 || o > b1.data.get_length() || s1 > b1.data.get_length() - o) {
		b = r1;
	} else {
		r1.data = b1.data.sub(o,s1);
		b = r1;
	}
	while(b.cursor < b.data.get_length()) {
		i = 0;
		clear_stack = true;
		if(b.cursor >= b.data.get_length()) {
			b0 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = b.data.readU8(pos);
		}
		switch(b0) {
		case 1:case 3:case 18:case 23:
			maskbits += sp / 2 | 0;
			break;
		case 4:
			in_header = false;
			if(sp < 1) {
				return false;
			}
			if(c.first_x != c.x || c.first_y != c.y) {
				var x = c.first_x | 0;
				var y = c.first_y | 0;
				if(c.bounds) {
					if(x > c.max_x || !c.started) {
						c.max_x = x;
					}
					if(y > c.max_y || !c.started) {
						c.max_y = y;
					}
					if(x < c.min_x || !c.started) {
						c.min_x = x;
					}
					if(y < c.min_y || !c.started) {
						c.min_y = y;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x,y,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
			}
			c.first_x = c.x = c.x;
			c.first_y = c.y = c.y + s[sp - 1];
			var x1 = c.x | 0;
			var y1 = c.y | 0;
			if(c.bounds) {
				if(x1 > c.max_x || !c.started) {
					c.max_x = x1;
				}
				if(y1 > c.max_y || !c.started) {
					c.max_y = y1;
				}
				if(x1 < c.min_x || !c.started) {
					c.min_x = x1;
				}
				if(y1 < c.min_y || !c.started) {
					c.min_y = y1;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],1,x1,y1,0,0);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
			}
			c.num_vertices++;
			break;
		case 5:
			if(sp < 2) {
				return false;
			}
			while(i + 1 < sp) {
				c.x += s[i];
				c.y += s[i + 1];
				var x2 = c.x | 0;
				var y2 = c.y | 0;
				if(c.bounds) {
					if(x2 > c.max_x || !c.started) {
						c.max_x = x2;
					}
					if(y2 > c.max_y || !c.started) {
						c.max_y = y2;
					}
					if(x2 < c.min_x || !c.started) {
						c.min_x = x2;
					}
					if(y2 < c.min_y || !c.started) {
						c.min_y = y2;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x2,y2,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				i += 2;
			}
			break;
		case 6:
			if(sp < 1) {
				return false;
			}
			while(i < sp) {
				c.x += s[i];
				c.y += 0;
				var x3 = c.x | 0;
				var y3 = c.y | 0;
				if(c.bounds) {
					if(x3 > c.max_x || !c.started) {
						c.max_x = x3;
					}
					if(y3 > c.max_y || !c.started) {
						c.max_y = y3;
					}
					if(x3 < c.min_x || !c.started) {
						c.min_x = x3;
					}
					if(y3 < c.min_y || !c.started) {
						c.min_y = y3;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x3,y3,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				++i;
				if(i >= sp) {
					break;
				}
				c.x += 0;
				c.y += s[i];
				var x4 = c.x | 0;
				var y4 = c.y | 0;
				if(c.bounds) {
					if(x4 > c.max_x || !c.started) {
						c.max_x = x4;
					}
					if(y4 > c.max_y || !c.started) {
						c.max_y = y4;
					}
					if(x4 < c.min_x || !c.started) {
						c.min_x = x4;
					}
					if(y4 < c.min_y || !c.started) {
						c.min_y = y4;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x4,y4,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				++i;
			}
			break;
		case 7:
			if(sp < 1) {
				return false;
			}
			while(i < sp) {
				c.x += 0;
				c.y += s[i];
				var x5 = c.x | 0;
				var y5 = c.y | 0;
				if(c.bounds) {
					if(x5 > c.max_x || !c.started) {
						c.max_x = x5;
					}
					if(y5 > c.max_y || !c.started) {
						c.max_y = y5;
					}
					if(x5 < c.min_x || !c.started) {
						c.min_x = x5;
					}
					if(y5 < c.min_y || !c.started) {
						c.min_y = y5;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x5,y5,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				++i;
				if(i >= sp) {
					break;
				}
				c.x += s[i];
				c.y += 0;
				var x6 = c.x | 0;
				var y6 = c.y | 0;
				if(c.bounds) {
					if(x6 > c.max_x || !c.started) {
						c.max_x = x6;
					}
					if(y6 > c.max_y || !c.started) {
						c.max_y = y6;
					}
					if(x6 < c.min_x || !c.started) {
						c.min_x = x6;
					}
					if(y6 < c.min_y || !c.started) {
						c.min_y = y6;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x6,y6,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				++i;
			}
			break;
		case 8:
			if(sp < 6) {
				return false;
			}
			while(i + 5 < sp) {
				var cx1 = c.x + s[i];
				var cy1 = c.y + s[i + 1];
				var cx2 = cx1 + s[i + 2];
				var cy2 = cy1 + s[i + 3];
				c.x = cx2 + s[i + 4];
				c.y = cy2 + s[i + 5];
				var x7 = c.x | 0;
				var y7 = c.y | 0;
				var cx = cx1 | 0;
				var cy = cy1 | 0;
				var cx11 = cx2 | 0;
				var cy11 = cy2 | 0;
				if(c.bounds) {
					if(x7 > c.max_x || !c.started) {
						c.max_x = x7;
					}
					if(y7 > c.max_y || !c.started) {
						c.max_y = y7;
					}
					if(x7 < c.min_x || !c.started) {
						c.min_x = x7;
					}
					if(y7 < c.min_y || !c.started) {
						c.min_y = y7;
					}
					c.started = true;
					if(cx > c.max_x || !c.started) {
						c.max_x = cx;
					}
					if(cy > c.max_y || !c.started) {
						c.max_y = cy;
					}
					if(cx < c.min_x || !c.started) {
						c.min_x = cx;
					}
					if(cy < c.min_y || !c.started) {
						c.min_y = cy;
					}
					c.started = true;
					if(cx11 > c.max_x || !c.started) {
						c.max_x = cx11;
					}
					if(cy11 > c.max_y || !c.started) {
						c.max_y = cy11;
					}
					if(cx11 < c.min_x || !c.started) {
						c.min_x = cx11;
					}
					if(cy11 < c.min_y || !c.started) {
						c.min_y = cy11;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x7,y7,cx,cy);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx11 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy11 , Int);
				}
				c.num_vertices++;
				i += 6;
			}
			break;
		case 11:
			if(subr_stack_height <= 0) {
				return false;
			}
			b = subr_stack[--subr_stack_height];
			clear_stack = false;
			break;
		case 12:
			var dx1;
			var dx2;
			var dx3;
			var dx4;
			var dx5;
			var dx6;
			var dy1;
			var dy2;
			var dy3;
			var dy4;
			var dy5;
			var dy6;
			var dx;
			var dy;
			var b1;
			if(b.cursor >= b.data.get_length()) {
				b1 = 0;
			} else {
				var pos1 = b.cursor++;
				if(pos1 == null) {
					pos1 = 0;
				}
				b1 = b.data.readU8(pos1);
			}
			switch(b1) {
			case 34:
				if(sp < 7) {
					return false;
				}
				dx1 = s[0];
				dx2 = s[1];
				dy2 = s[2];
				dx3 = s[3];
				dx4 = s[4];
				dx5 = s[5];
				dx6 = s[6];
				var cx12 = c.x + dx1;
				var cy12 = c.y;
				var cx21 = cx12 + dx2;
				var cy21 = cy12 + dy2;
				c.x = cx21 + dx3;
				c.y = cy21;
				var x8 = c.x | 0;
				var y8 = c.y | 0;
				var cx3 = cx12 | 0;
				var cy3 = cy12 | 0;
				var cx13 = cx21 | 0;
				var cy13 = cy21 | 0;
				if(c.bounds) {
					if(x8 > c.max_x || !c.started) {
						c.max_x = x8;
					}
					if(y8 > c.max_y || !c.started) {
						c.max_y = y8;
					}
					if(x8 < c.min_x || !c.started) {
						c.min_x = x8;
					}
					if(y8 < c.min_y || !c.started) {
						c.min_y = y8;
					}
					c.started = true;
					if(cx3 > c.max_x || !c.started) {
						c.max_x = cx3;
					}
					if(cy3 > c.max_y || !c.started) {
						c.max_y = cy3;
					}
					if(cx3 < c.min_x || !c.started) {
						c.min_x = cx3;
					}
					if(cy3 < c.min_y || !c.started) {
						c.min_y = cy3;
					}
					c.started = true;
					if(cx13 > c.max_x || !c.started) {
						c.max_x = cx13;
					}
					if(cy13 > c.max_y || !c.started) {
						c.max_y = cy13;
					}
					if(cx13 < c.min_x || !c.started) {
						c.min_x = cx13;
					}
					if(cy13 < c.min_y || !c.started) {
						c.min_y = cy13;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x8,y8,cx3,cy3);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx13 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy13 , Int);
				}
				c.num_vertices++;
				var cx14 = c.x + dx4;
				var cy14 = c.y;
				var cx22 = cx14 + dx5;
				var cy22 = cy14 + -dy2;
				c.x = cx22 + dx6;
				c.y = cy22;
				var x9 = c.x | 0;
				var y9 = c.y | 0;
				var cx4 = cx14 | 0;
				var cy4 = cy14 | 0;
				var cx15 = cx22 | 0;
				var cy15 = cy22 | 0;
				if(c.bounds) {
					if(x9 > c.max_x || !c.started) {
						c.max_x = x9;
					}
					if(y9 > c.max_y || !c.started) {
						c.max_y = y9;
					}
					if(x9 < c.min_x || !c.started) {
						c.min_x = x9;
					}
					if(y9 < c.min_y || !c.started) {
						c.min_y = y9;
					}
					c.started = true;
					if(cx4 > c.max_x || !c.started) {
						c.max_x = cx4;
					}
					if(cy4 > c.max_y || !c.started) {
						c.max_y = cy4;
					}
					if(cx4 < c.min_x || !c.started) {
						c.min_x = cx4;
					}
					if(cy4 < c.min_y || !c.started) {
						c.min_y = cy4;
					}
					c.started = true;
					if(cx15 > c.max_x || !c.started) {
						c.max_x = cx15;
					}
					if(cy15 > c.max_y || !c.started) {
						c.max_y = cy15;
					}
					if(cx15 < c.min_x || !c.started) {
						c.min_x = cx15;
					}
					if(cy15 < c.min_y || !c.started) {
						c.min_y = cy15;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x9,y9,cx4,cy4);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx15 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy15 , Int);
				}
				c.num_vertices++;
				break;
			case 35:
				if(sp < 13) {
					return false;
				}
				dx1 = s[0];
				dy1 = s[1];
				dx2 = s[2];
				dy2 = s[3];
				dx3 = s[4];
				dy3 = s[5];
				dx4 = s[6];
				dy4 = s[7];
				dx5 = s[8];
				dy5 = s[9];
				dx6 = s[10];
				dy6 = s[11];
				var cx16 = c.x + dx1;
				var cy16 = c.y + dy1;
				var cx23 = cx16 + dx2;
				var cy23 = cy16 + dy2;
				c.x = cx23 + dx3;
				c.y = cy23 + dy3;
				var x10 = c.x | 0;
				var y10 = c.y | 0;
				var cx5 = cx16 | 0;
				var cy5 = cy16 | 0;
				var cx17 = cx23 | 0;
				var cy17 = cy23 | 0;
				if(c.bounds) {
					if(x10 > c.max_x || !c.started) {
						c.max_x = x10;
					}
					if(y10 > c.max_y || !c.started) {
						c.max_y = y10;
					}
					if(x10 < c.min_x || !c.started) {
						c.min_x = x10;
					}
					if(y10 < c.min_y || !c.started) {
						c.min_y = y10;
					}
					c.started = true;
					if(cx5 > c.max_x || !c.started) {
						c.max_x = cx5;
					}
					if(cy5 > c.max_y || !c.started) {
						c.max_y = cy5;
					}
					if(cx5 < c.min_x || !c.started) {
						c.min_x = cx5;
					}
					if(cy5 < c.min_y || !c.started) {
						c.min_y = cy5;
					}
					c.started = true;
					if(cx17 > c.max_x || !c.started) {
						c.max_x = cx17;
					}
					if(cy17 > c.max_y || !c.started) {
						c.max_y = cy17;
					}
					if(cx17 < c.min_x || !c.started) {
						c.min_x = cx17;
					}
					if(cy17 < c.min_y || !c.started) {
						c.min_y = cy17;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x10,y10,cx5,cy5);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx17 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy17 , Int);
				}
				c.num_vertices++;
				var cx18 = c.x + dx4;
				var cy18 = c.y + dy4;
				var cx24 = cx18 + dx5;
				var cy24 = cy18 + dy5;
				c.x = cx24 + dx6;
				c.y = cy24 + dy6;
				var x11 = c.x | 0;
				var y11 = c.y | 0;
				var cx6 = cx18 | 0;
				var cy6 = cy18 | 0;
				var cx19 = cx24 | 0;
				var cy19 = cy24 | 0;
				if(c.bounds) {
					if(x11 > c.max_x || !c.started) {
						c.max_x = x11;
					}
					if(y11 > c.max_y || !c.started) {
						c.max_y = y11;
					}
					if(x11 < c.min_x || !c.started) {
						c.min_x = x11;
					}
					if(y11 < c.min_y || !c.started) {
						c.min_y = y11;
					}
					c.started = true;
					if(cx6 > c.max_x || !c.started) {
						c.max_x = cx6;
					}
					if(cy6 > c.max_y || !c.started) {
						c.max_y = cy6;
					}
					if(cx6 < c.min_x || !c.started) {
						c.min_x = cx6;
					}
					if(cy6 < c.min_y || !c.started) {
						c.min_y = cy6;
					}
					c.started = true;
					if(cx19 > c.max_x || !c.started) {
						c.max_x = cx19;
					}
					if(cy19 > c.max_y || !c.started) {
						c.max_y = cy19;
					}
					if(cx19 < c.min_x || !c.started) {
						c.min_x = cx19;
					}
					if(cy19 < c.min_y || !c.started) {
						c.min_y = cy19;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x11,y11,cx6,cy6);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx19 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy19 , Int);
				}
				c.num_vertices++;
				break;
			case 36:
				if(sp < 9) {
					return false;
				}
				dx1 = s[0];
				dy1 = s[1];
				dx2 = s[2];
				dy2 = s[3];
				dx3 = s[4];
				dx4 = s[5];
				dx5 = s[6];
				dy5 = s[7];
				dx6 = s[8];
				var cx110 = c.x + dx1;
				var cy110 = c.y + dy1;
				var cx25 = cx110 + dx2;
				var cy25 = cy110 + dy2;
				c.x = cx25 + dx3;
				c.y = cy25;
				var x12 = c.x | 0;
				var y12 = c.y | 0;
				var cx7 = cx110 | 0;
				var cy7 = cy110 | 0;
				var cx111 = cx25 | 0;
				var cy111 = cy25 | 0;
				if(c.bounds) {
					if(x12 > c.max_x || !c.started) {
						c.max_x = x12;
					}
					if(y12 > c.max_y || !c.started) {
						c.max_y = y12;
					}
					if(x12 < c.min_x || !c.started) {
						c.min_x = x12;
					}
					if(y12 < c.min_y || !c.started) {
						c.min_y = y12;
					}
					c.started = true;
					if(cx7 > c.max_x || !c.started) {
						c.max_x = cx7;
					}
					if(cy7 > c.max_y || !c.started) {
						c.max_y = cy7;
					}
					if(cx7 < c.min_x || !c.started) {
						c.min_x = cx7;
					}
					if(cy7 < c.min_y || !c.started) {
						c.min_y = cy7;
					}
					c.started = true;
					if(cx111 > c.max_x || !c.started) {
						c.max_x = cx111;
					}
					if(cy111 > c.max_y || !c.started) {
						c.max_y = cy111;
					}
					if(cx111 < c.min_x || !c.started) {
						c.min_x = cx111;
					}
					if(cy111 < c.min_y || !c.started) {
						c.min_y = cy111;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x12,y12,cx7,cy7);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx111 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy111 , Int);
				}
				c.num_vertices++;
				var cx112 = c.x + dx4;
				var cy112 = c.y;
				var cx26 = cx112 + dx5;
				var cy26 = cy112 + dy5;
				c.x = cx26 + dx6;
				c.y = cy26 + -(dy1 + dy2 + dy5);
				var x13 = c.x | 0;
				var y13 = c.y | 0;
				var cx8 = cx112 | 0;
				var cy8 = cy112 | 0;
				var cx113 = cx26 | 0;
				var cy113 = cy26 | 0;
				if(c.bounds) {
					if(x13 > c.max_x || !c.started) {
						c.max_x = x13;
					}
					if(y13 > c.max_y || !c.started) {
						c.max_y = y13;
					}
					if(x13 < c.min_x || !c.started) {
						c.min_x = x13;
					}
					if(y13 < c.min_y || !c.started) {
						c.min_y = y13;
					}
					c.started = true;
					if(cx8 > c.max_x || !c.started) {
						c.max_x = cx8;
					}
					if(cy8 > c.max_y || !c.started) {
						c.max_y = cy8;
					}
					if(cx8 < c.min_x || !c.started) {
						c.min_x = cx8;
					}
					if(cy8 < c.min_y || !c.started) {
						c.min_y = cy8;
					}
					c.started = true;
					if(cx113 > c.max_x || !c.started) {
						c.max_x = cx113;
					}
					if(cy113 > c.max_y || !c.started) {
						c.max_y = cy113;
					}
					if(cx113 < c.min_x || !c.started) {
						c.min_x = cx113;
					}
					if(cy113 < c.min_y || !c.started) {
						c.min_y = cy113;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x13,y13,cx8,cy8);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx113 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy113 , Int);
				}
				c.num_vertices++;
				break;
			case 37:
				if(sp < 11) {
					return false;
				}
				dx1 = s[0];
				dy1 = s[1];
				dx2 = s[2];
				dy2 = s[3];
				dx3 = s[4];
				dy3 = s[5];
				dx4 = s[6];
				dy4 = s[7];
				dx5 = s[8];
				dy5 = s[9];
				dy6 = s[10];
				dx6 = dy6;
				dx = dx1 + dx2 + dx3 + dx4 + dx5;
				dy = dy1 + dy2 + dy3 + dy4 + dy5;
				if(Math.abs(dx) > Math.abs(dy)) {
					dy6 = -dy;
				} else {
					dx6 = -dx;
				}
				var cx114 = c.x + dx1;
				var cy114 = c.y + dy1;
				var cx27 = cx114 + dx2;
				var cy27 = cy114 + dy2;
				c.x = cx27 + dx3;
				c.y = cy27 + dy3;
				var x14 = c.x | 0;
				var y14 = c.y | 0;
				var cx9 = cx114 | 0;
				var cy9 = cy114 | 0;
				var cx115 = cx27 | 0;
				var cy115 = cy27 | 0;
				if(c.bounds) {
					if(x14 > c.max_x || !c.started) {
						c.max_x = x14;
					}
					if(y14 > c.max_y || !c.started) {
						c.max_y = y14;
					}
					if(x14 < c.min_x || !c.started) {
						c.min_x = x14;
					}
					if(y14 < c.min_y || !c.started) {
						c.min_y = y14;
					}
					c.started = true;
					if(cx9 > c.max_x || !c.started) {
						c.max_x = cx9;
					}
					if(cy9 > c.max_y || !c.started) {
						c.max_y = cy9;
					}
					if(cx9 < c.min_x || !c.started) {
						c.min_x = cx9;
					}
					if(cy9 < c.min_y || !c.started) {
						c.min_y = cy9;
					}
					c.started = true;
					if(cx115 > c.max_x || !c.started) {
						c.max_x = cx115;
					}
					if(cy115 > c.max_y || !c.started) {
						c.max_y = cy115;
					}
					if(cx115 < c.min_x || !c.started) {
						c.min_x = cx115;
					}
					if(cy115 < c.min_y || !c.started) {
						c.min_y = cy115;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x14,y14,cx9,cy9);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx115 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy115 , Int);
				}
				c.num_vertices++;
				var cx116 = c.x + dx4;
				var cy116 = c.y + dy4;
				var cx28 = cx116 + dx5;
				var cy28 = cy116 + dy5;
				c.x = cx28 + dx6;
				c.y = cy28 + dy6;
				var x15 = c.x | 0;
				var y15 = c.y | 0;
				var cx10 = cx116 | 0;
				var cy10 = cy116 | 0;
				var cx117 = cx28 | 0;
				var cy117 = cy28 | 0;
				if(c.bounds) {
					if(x15 > c.max_x || !c.started) {
						c.max_x = x15;
					}
					if(y15 > c.max_y || !c.started) {
						c.max_y = y15;
					}
					if(x15 < c.min_x || !c.started) {
						c.min_x = x15;
					}
					if(y15 < c.min_y || !c.started) {
						c.min_y = y15;
					}
					c.started = true;
					if(cx10 > c.max_x || !c.started) {
						c.max_x = cx10;
					}
					if(cy10 > c.max_y || !c.started) {
						c.max_y = cy10;
					}
					if(cx10 < c.min_x || !c.started) {
						c.min_x = cx10;
					}
					if(cy10 < c.min_y || !c.started) {
						c.min_y = cy10;
					}
					c.started = true;
					if(cx117 > c.max_x || !c.started) {
						c.max_x = cx117;
					}
					if(cy117 > c.max_y || !c.started) {
						c.max_y = cy117;
					}
					if(cx117 < c.min_x || !c.started) {
						c.min_x = cx117;
					}
					if(cy117 < c.min_y || !c.started) {
						c.min_y = cy117;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x15,y15,cx10,cy10);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx117 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy117 , Int);
				}
				c.num_vertices++;
				break;
			default:
				return false;
			}
			break;
		case 14:
			if(c.first_x != c.x || c.first_y != c.y) {
				var x16 = c.first_x | 0;
				var y16 = c.first_y | 0;
				if(c.bounds) {
					if(x16 > c.max_x || !c.started) {
						c.max_x = x16;
					}
					if(y16 > c.max_y || !c.started) {
						c.max_y = y16;
					}
					if(x16 < c.min_x || !c.started) {
						c.min_x = x16;
					}
					if(y16 < c.min_y || !c.started) {
						c.min_y = y16;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x16,y16,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
			}
			return true;
		case 19:case 20:
			if(in_header) {
				maskbits += sp / 2 | 0;
			}
			in_header = false;
			var o = b.cursor + ((maskbits + 7) / 8 | 0);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			break;
		case 21:
			in_header = false;
			if(sp < 2) {
				return false;
			}
			if(c.first_x != c.x || c.first_y != c.y) {
				var x17 = c.first_x | 0;
				var y17 = c.first_y | 0;
				if(c.bounds) {
					if(x17 > c.max_x || !c.started) {
						c.max_x = x17;
					}
					if(y17 > c.max_y || !c.started) {
						c.max_y = y17;
					}
					if(x17 < c.min_x || !c.started) {
						c.min_x = x17;
					}
					if(y17 < c.min_y || !c.started) {
						c.min_y = y17;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x17,y17,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
			}
			c.first_x = c.x = c.x + s[sp - 2];
			c.first_y = c.y = c.y + s[sp - 1];
			var x18 = c.x | 0;
			var y18 = c.y | 0;
			if(c.bounds) {
				if(x18 > c.max_x || !c.started) {
					c.max_x = x18;
				}
				if(y18 > c.max_y || !c.started) {
					c.max_y = y18;
				}
				if(x18 < c.min_x || !c.started) {
					c.min_x = x18;
				}
				if(y18 < c.min_y || !c.started) {
					c.min_y = y18;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],1,x18,y18,0,0);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
			}
			c.num_vertices++;
			break;
		case 22:
			in_header = false;
			if(sp < 1) {
				return false;
			}
			if(c.first_x != c.x || c.first_y != c.y) {
				var x19 = c.first_x | 0;
				var y19 = c.first_y | 0;
				if(c.bounds) {
					if(x19 > c.max_x || !c.started) {
						c.max_x = x19;
					}
					if(y19 > c.max_y || !c.started) {
						c.max_y = y19;
					}
					if(x19 < c.min_x || !c.started) {
						c.min_x = x19;
					}
					if(y19 < c.min_y || !c.started) {
						c.min_y = y19;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x19,y19,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
			}
			c.first_x = c.x = c.x + s[sp - 1];
			c.first_y = c.y = c.y;
			var x20 = c.x | 0;
			var y20 = c.y | 0;
			if(c.bounds) {
				if(x20 > c.max_x || !c.started) {
					c.max_x = x20;
				}
				if(y20 > c.max_y || !c.started) {
					c.max_y = y20;
				}
				if(x20 < c.min_x || !c.started) {
					c.min_x = x20;
				}
				if(y20 < c.min_y || !c.started) {
					c.min_y = y20;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],1,x20,y20,0,0);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
			}
			c.num_vertices++;
			break;
		case 24:
			if(sp < 8) {
				return false;
			}
			while(i + 5 < sp - 2) {
				var cx118 = c.x + s[i];
				var cy118 = c.y + s[i + 1];
				var cx29 = cx118 + s[i + 2];
				var cy29 = cy118 + s[i + 3];
				c.x = cx29 + s[i + 4];
				c.y = cy29 + s[i + 5];
				var x21 = c.x | 0;
				var y21 = c.y | 0;
				var cx20 = cx118 | 0;
				var cy20 = cy118 | 0;
				var cx119 = cx29 | 0;
				var cy119 = cy29 | 0;
				if(c.bounds) {
					if(x21 > c.max_x || !c.started) {
						c.max_x = x21;
					}
					if(y21 > c.max_y || !c.started) {
						c.max_y = y21;
					}
					if(x21 < c.min_x || !c.started) {
						c.min_x = x21;
					}
					if(y21 < c.min_y || !c.started) {
						c.min_y = y21;
					}
					c.started = true;
					if(cx20 > c.max_x || !c.started) {
						c.max_x = cx20;
					}
					if(cy20 > c.max_y || !c.started) {
						c.max_y = cy20;
					}
					if(cx20 < c.min_x || !c.started) {
						c.min_x = cx20;
					}
					if(cy20 < c.min_y || !c.started) {
						c.min_y = cy20;
					}
					c.started = true;
					if(cx119 > c.max_x || !c.started) {
						c.max_x = cx119;
					}
					if(cy119 > c.max_y || !c.started) {
						c.max_y = cy119;
					}
					if(cx119 < c.min_x || !c.started) {
						c.min_x = cx119;
					}
					if(cy119 < c.min_y || !c.started) {
						c.min_y = cy119;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x21,y21,cx20,cy20);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx119 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy119 , Int);
				}
				c.num_vertices++;
				i += 6;
			}
			if(i + 1 >= sp) {
				return false;
			}
			c.x += s[i];
			c.y += s[i + 1];
			var x22 = c.x | 0;
			var y22 = c.y | 0;
			if(c.bounds) {
				if(x22 > c.max_x || !c.started) {
					c.max_x = x22;
				}
				if(y22 > c.max_y || !c.started) {
					c.max_y = y22;
				}
				if(x22 < c.min_x || !c.started) {
					c.min_x = x22;
				}
				if(y22 < c.min_y || !c.started) {
					c.min_y = y22;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x22,y22,0,0);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
			}
			c.num_vertices++;
			break;
		case 25:
			if(sp < 8) {
				return false;
			}
			while(i + 1 < sp - 6) {
				c.x += s[i];
				c.y += s[i + 1];
				var x23 = c.x | 0;
				var y23 = c.y | 0;
				if(c.bounds) {
					if(x23 > c.max_x || !c.started) {
						c.max_x = x23;
					}
					if(y23 > c.max_y || !c.started) {
						c.max_y = y23;
					}
					if(x23 < c.min_x || !c.started) {
						c.min_x = x23;
					}
					if(y23 < c.min_y || !c.started) {
						c.min_y = y23;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x23,y23,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				i += 2;
			}
			if(i + 5 >= sp) {
				return false;
			}
			var cx120 = c.x + s[i];
			var cy120 = c.y + s[i + 1];
			var cx210 = cx120 + s[i + 2];
			var cy210 = cy120 + s[i + 3];
			c.x = cx210 + s[i + 4];
			c.y = cy210 + s[i + 5];
			var x24 = c.x | 0;
			var y24 = c.y | 0;
			var cx30 = cx120 | 0;
			var cy30 = cy120 | 0;
			var cx121 = cx210 | 0;
			var cy121 = cy210 | 0;
			if(c.bounds) {
				if(x24 > c.max_x || !c.started) {
					c.max_x = x24;
				}
				if(y24 > c.max_y || !c.started) {
					c.max_y = y24;
				}
				if(x24 < c.min_x || !c.started) {
					c.min_x = x24;
				}
				if(y24 < c.min_y || !c.started) {
					c.min_y = y24;
				}
				c.started = true;
				if(cx30 > c.max_x || !c.started) {
					c.max_x = cx30;
				}
				if(cy30 > c.max_y || !c.started) {
					c.max_y = cy30;
				}
				if(cx30 < c.min_x || !c.started) {
					c.min_x = cx30;
				}
				if(cy30 < c.min_y || !c.started) {
					c.min_y = cy30;
				}
				c.started = true;
				if(cx121 > c.max_x || !c.started) {
					c.max_x = cx121;
				}
				if(cy121 > c.max_y || !c.started) {
					c.max_y = cy121;
				}
				if(cx121 < c.min_x || !c.started) {
					c.min_x = cx121;
				}
				if(cy121 < c.min_y || !c.started) {
					c.min_y = cy121;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x24,y24,cx30,cy30);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx121 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy121 , Int);
			}
			c.num_vertices++;
			break;
		case 26:case 27:
			if(sp < 4) {
				return false;
			}
			f = 0.0;
			if((sp & 1) != 0) {
				f = s[i];
				++i;
			}
			while(i + 3 < sp) {
				if(b0 == 27) {
					var cx122 = c.x + s[i];
					var cy122 = c.y + f;
					var cx211 = cx122 + s[i + 1];
					var cy211 = cy122 + s[i + 2];
					c.x = cx211 + s[i + 3];
					c.y = cy211;
					var x25 = c.x | 0;
					var y25 = c.y | 0;
					var cx31 = cx122 | 0;
					var cy31 = cy122 | 0;
					var cx123 = cx211 | 0;
					var cy123 = cy211 | 0;
					if(c.bounds) {
						if(x25 > c.max_x || !c.started) {
							c.max_x = x25;
						}
						if(y25 > c.max_y || !c.started) {
							c.max_y = y25;
						}
						if(x25 < c.min_x || !c.started) {
							c.min_x = x25;
						}
						if(y25 < c.min_y || !c.started) {
							c.min_y = y25;
						}
						c.started = true;
						if(cx31 > c.max_x || !c.started) {
							c.max_x = cx31;
						}
						if(cy31 > c.max_y || !c.started) {
							c.max_y = cy31;
						}
						if(cx31 < c.min_x || !c.started) {
							c.min_x = cx31;
						}
						if(cy31 < c.min_y || !c.started) {
							c.min_y = cy31;
						}
						c.started = true;
						if(cx123 > c.max_x || !c.started) {
							c.max_x = cx123;
						}
						if(cy123 > c.max_y || !c.started) {
							c.max_y = cy123;
						}
						if(cx123 < c.min_x || !c.started) {
							c.min_x = cx123;
						}
						if(cy123 < c.min_y || !c.started) {
							c.min_y = cy123;
						}
						c.started = true;
					} else {
						kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x25,y25,cx31,cy31);
						c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx123 , Int);
						c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy123 , Int);
					}
					c.num_vertices++;
				} else {
					var cx124 = c.x + f;
					var cy124 = c.y + s[i];
					var cx212 = cx124 + s[i + 1];
					var cy212 = cy124 + s[i + 2];
					c.x = cx212;
					c.y = cy212 + s[i + 3];
					var x26 = c.x | 0;
					var y26 = c.y | 0;
					var cx32 = cx124 | 0;
					var cy32 = cy124 | 0;
					var cx125 = cx212 | 0;
					var cy125 = cy212 | 0;
					if(c.bounds) {
						if(x26 > c.max_x || !c.started) {
							c.max_x = x26;
						}
						if(y26 > c.max_y || !c.started) {
							c.max_y = y26;
						}
						if(x26 < c.min_x || !c.started) {
							c.min_x = x26;
						}
						if(y26 < c.min_y || !c.started) {
							c.min_y = y26;
						}
						c.started = true;
						if(cx32 > c.max_x || !c.started) {
							c.max_x = cx32;
						}
						if(cy32 > c.max_y || !c.started) {
							c.max_y = cy32;
						}
						if(cx32 < c.min_x || !c.started) {
							c.min_x = cx32;
						}
						if(cy32 < c.min_y || !c.started) {
							c.min_y = cy32;
						}
						c.started = true;
						if(cx125 > c.max_x || !c.started) {
							c.max_x = cx125;
						}
						if(cy125 > c.max_y || !c.started) {
							c.max_y = cy125;
						}
						if(cx125 < c.min_x || !c.started) {
							c.min_x = cx125;
						}
						if(cy125 < c.min_y || !c.started) {
							c.min_y = cy125;
						}
						c.started = true;
					} else {
						kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x26,y26,cx32,cy32);
						c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx125 , Int);
						c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy125 , Int);
					}
					c.num_vertices++;
				}
				f = 0.0;
				i += 4;
			}
			break;
		case 10:case 29:
			if(b0 == 10) {
				if(!has_subrs) {
					if(info.fdselect.data.get_length() != 0) {
						var fdselect = info.fdselect;
						var nranges;
						var start;
						var end;
						var v1;
						var fmt;
						var fdselector = -1;
						var i1;
						if(0 > fdselect.data.get_length()) {
							throw haxe_Exception.thrown("Error");
						}
						fdselect.cursor = 0 > fdselect.data.get_length() ? fdselect.data.get_length() : 0;
						if(fdselect.cursor >= fdselect.data.get_length()) {
							fmt = 0;
						} else {
							var pos2 = fdselect.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							fmt = fdselect.data.readU8(pos2);
						}
						if(fmt == 0) {
							var o1 = fdselect.cursor + glyph_index;
							if(o1 > fdselect.data.get_length() || o1 < 0) {
								throw haxe_Exception.thrown("Error");
							}
							fdselect.cursor = o1 > fdselect.data.get_length() || o1 < 0 ? fdselect.data.get_length() : o1;
							if(fdselect.cursor >= fdselect.data.get_length()) {
								fdselector = 0;
							} else {
								var pos3 = fdselect.cursor++;
								if(pos3 == null) {
									pos3 = 0;
								}
								fdselector = fdselect.data.readU8(pos3);
							}
						} else if(fmt == 3) {
							var v2 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i2 = _g++;
								var v3;
								if(fdselect.cursor >= fdselect.data.get_length()) {
									v3 = 0;
								} else {
									var pos4 = fdselect.cursor++;
									if(pos4 == null) {
										pos4 = 0;
									}
									v3 = fdselect.data.readU8(pos4);
								}
								v2 = v2 << 8 | v3;
							}
							nranges = v2;
							var v4 = 0;
							var _g2 = 0;
							var _g3 = 2;
							while(_g2 < _g3) {
								var i3 = _g2++;
								var v5;
								if(fdselect.cursor >= fdselect.data.get_length()) {
									v5 = 0;
								} else {
									var pos5 = fdselect.cursor++;
									if(pos5 == null) {
										pos5 = 0;
									}
									v5 = fdselect.data.readU8(pos5);
								}
								v4 = v4 << 8 | v5;
							}
							start = v4;
							var _g4 = 0;
							var _g5 = nranges;
							while(_g4 < _g5) {
								var i4 = _g4++;
								if(fdselect.cursor >= fdselect.data.get_length()) {
									v1 = 0;
								} else {
									var pos6 = fdselect.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v1 = fdselect.data.readU8(pos6);
								}
								var v6 = 0;
								var _g6 = 0;
								var _g7 = 2;
								while(_g6 < _g7) {
									var i5 = _g6++;
									var v7;
									if(fdselect.cursor >= fdselect.data.get_length()) {
										v7 = 0;
									} else {
										var pos7 = fdselect.cursor++;
										if(pos7 == null) {
											pos7 = 0;
										}
										v7 = fdselect.data.readU8(pos7);
									}
									v6 = v6 << 8 | v7;
								}
								end = v6;
								if(glyph_index >= start && glyph_index < end) {
									fdselector = v1;
									break;
								}
								start = end;
							}
						}
						if(fdselector == -1) {
							var r = new kha_graphics2_truetype_Stbtt_$_$buf();
							r.data = null;
							r.cursor = 0;
						}
						var cff = info.cff;
						var b2 = info.fontdicts;
						if(0 > b2.data.get_length()) {
							throw haxe_Exception.thrown("Error");
						}
						b2.cursor = 0 > b2.data.get_length() ? b2.data.get_length() : 0;
						var v8 = 0;
						var _g8 = 0;
						var _g9 = 2;
						while(_g8 < _g9) {
							var i6 = _g8++;
							var v9;
							if(b2.cursor >= b2.data.get_length()) {
								v9 = 0;
							} else {
								var pos8 = b2.cursor++;
								if(pos8 == null) {
									pos8 = 0;
								}
								v9 = b2.data.readU8(pos8);
							}
							v8 = v8 << 8 | v9;
						}
						var count = v8;
						var offsize;
						if(b2.cursor >= b2.data.get_length()) {
							offsize = 0;
						} else {
							var pos9 = b2.cursor++;
							if(pos9 == null) {
								pos9 = 0;
							}
							offsize = b2.data.readU8(pos9);
						}
						if(!(fdselector >= 0 && fdselector < count)) {
							throw haxe_Exception.thrown("Error");
						}
						if(!(offsize >= 1 && offsize <= 4)) {
							throw haxe_Exception.thrown("Error");
						}
						var o2 = b2.cursor + fdselector * offsize;
						if(o2 > b2.data.get_length() || o2 < 0) {
							throw haxe_Exception.thrown("Error");
						}
						b2.cursor = o2 > b2.data.get_length() || o2 < 0 ? b2.data.get_length() : o2;
						var v10 = 0;
						if(!(offsize >= 1 && offsize <= 4)) {
							throw haxe_Exception.thrown("Error");
						}
						var _g10 = 0;
						var _g11 = offsize;
						while(_g10 < _g11) {
							var i7 = _g10++;
							var v11;
							if(b2.cursor >= b2.data.get_length()) {
								v11 = 0;
							} else {
								var pos10 = b2.cursor++;
								if(pos10 == null) {
									pos10 = 0;
								}
								v11 = b2.data.readU8(pos10);
							}
							v10 = v10 << 8 | v11;
						}
						var start1 = v10;
						var v12 = 0;
						if(!(offsize >= 1 && offsize <= 4)) {
							throw haxe_Exception.thrown("Error");
						}
						var _g12 = 0;
						var _g13 = offsize;
						while(_g12 < _g13) {
							var i8 = _g12++;
							var v13;
							if(b2.cursor >= b2.data.get_length()) {
								v13 = 0;
							} else {
								var pos11 = b2.cursor++;
								if(pos11 == null) {
									pos11 = 0;
								}
								v13 = b2.data.readU8(pos11);
							}
							v12 = v12 << 8 | v13;
						}
						var end1 = v12;
						var o3 = 2 + (count + 1) * offsize + start1;
						var s1 = end1 - start1;
						var r1 = new kha_graphics2_truetype_Stbtt_$_$buf();
						r1.data = null;
						r1.cursor = 0;
						var r2 = r1;
						var fontdict;
						if(o3 < 0 || s1 < 0 || o3 > b2.data.get_length() || s1 > b2.data.get_length() - o3) {
							fontdict = r2;
						} else {
							r2.data = b2.data.sub(o3,s1);
							fontdict = r2;
						}
						var subrsoff = [0];
						var private_loc = [0,0];
						var i9 = 0;
						if(0 > fontdict.data.get_length()) {
							throw haxe_Exception.thrown("Error");
						}
						fontdict.cursor = 0 > fontdict.data.get_length() ? fontdict.data.get_length() : 0;
						var ret = null;
						while(fontdict.cursor < fontdict.data.get_length()) {
							var start2 = fontdict.cursor;
							var op;
							while(true) {
								var subrs1;
								if(fontdict.cursor >= fontdict.data.get_length()) {
									subrs1 = 0;
								} else {
									var pos12 = fontdict.cursor;
									if(pos12 == null) {
										pos12 = 0;
									}
									subrs1 = fontdict.data.readU8(pos12);
								}
								if(!(subrs1 >= 28)) {
									break;
								}
								var v14;
								var b01;
								if(fontdict.cursor >= fontdict.data.get_length()) {
									b01 = 0;
								} else {
									var pos13 = fontdict.cursor;
									if(pos13 == null) {
										pos13 = 0;
									}
									b01 = fontdict.data.readU8(pos13);
								}
								if(b01 < 28) {
									throw haxe_Exception.thrown("Error");
								}
								if(b01 == 30) {
									var o4 = fontdict.cursor + 1;
									if(o4 > fontdict.data.get_length() || o4 < 0) {
										throw haxe_Exception.thrown("Error");
									}
									fontdict.cursor = o4 > fontdict.data.get_length() || o4 < 0 ? fontdict.data.get_length() : o4;
									while(fontdict.cursor < fontdict.data.get_length()) {
										if(fontdict.cursor >= fontdict.data.get_length()) {
											v14 = 0;
										} else {
											var pos14 = fontdict.cursor++;
											if(pos14 == null) {
												pos14 = 0;
											}
											v14 = fontdict.data.readU8(pos14);
										}
										if((v14 & 15) == 15 || v14 >> 4 == 15) {
											break;
										}
									}
								} else {
									var b02;
									if(fontdict.cursor >= fontdict.data.get_length()) {
										b02 = 0;
									} else {
										var pos15 = fontdict.cursor++;
										if(pos15 == null) {
											pos15 = 0;
										}
										b02 = fontdict.data.readU8(pos15);
									}
									if(!(b02 >= 32 && b02 <= 246)) {
										if(b02 >= 247 && b02 <= 250) {
											if(fontdict.cursor < fontdict.data.get_length()) {
												var pos16 = fontdict.cursor++;
												if(pos16 == null) {
													pos16 = 0;
												}
												fontdict.data.readU8(pos16);
											}
										} else if(b02 >= 251 && b02 <= 254) {
											if(fontdict.cursor < fontdict.data.get_length()) {
												var pos17 = fontdict.cursor++;
												if(pos17 == null) {
													pos17 = 0;
												}
												fontdict.data.readU8(pos17);
											}
										} else if(b02 == 28) {
											var v15 = 0;
											var _g14 = 0;
											var _g15 = 2;
											while(_g14 < _g15) {
												var i10 = _g14++;
												var v16;
												if(fontdict.cursor >= fontdict.data.get_length()) {
													v16 = 0;
												} else {
													var pos18 = fontdict.cursor++;
													if(pos18 == null) {
														pos18 = 0;
													}
													v16 = fontdict.data.readU8(pos18);
												}
												v15 = v15 << 8 | v16;
											}
										} else if(b02 == 29) {
											var v17 = 0;
											var _g16 = 0;
											var _g17 = 4;
											while(_g16 < _g17) {
												var i11 = _g16++;
												var v18;
												if(fontdict.cursor >= fontdict.data.get_length()) {
													v18 = 0;
												} else {
													var pos19 = fontdict.cursor++;
													if(pos19 == null) {
														pos19 = 0;
													}
													v18 = fontdict.data.readU8(pos19);
												}
												v17 = v17 << 8 | v18;
											}
										} else {
											throw haxe_Exception.thrown("Error");
										}
									}
								}
							}
							var end2 = fontdict.cursor;
							if(fontdict.cursor >= fontdict.data.get_length()) {
								op = 0;
							} else {
								var pos20 = fontdict.cursor++;
								if(pos20 == null) {
									pos20 = 0;
								}
								op = fontdict.data.readU8(pos20);
							}
							if(op == 12) {
								var op1;
								if(fontdict.cursor >= fontdict.data.get_length()) {
									op1 = 0;
								} else {
									var pos21 = fontdict.cursor++;
									if(pos21 == null) {
										pos21 = 0;
									}
									op1 = fontdict.data.readU8(pos21);
								}
								op = op1 | 256;
							}
							if(op == 18) {
								var s2 = end2 - start2;
								var r3 = new kha_graphics2_truetype_Stbtt_$_$buf();
								r3.data = null;
								r3.cursor = 0;
								var r4 = r3;
								if(start2 < 0 || s2 < 0 || start2 > fontdict.data.get_length() || s2 > fontdict.data.get_length() - start2) {
									ret = r4;
								} else {
									r4.data = fontdict.data.sub(start2,s2);
									ret = r4;
								}
								break;
							}
						}
						var operands;
						if(ret != null) {
							operands = ret;
						} else {
							var r5 = new kha_graphics2_truetype_Stbtt_$_$buf();
							r5.data = null;
							r5.cursor = 0;
							var r6 = r5;
							if(0 > fontdict.data.get_length() || 0 > fontdict.data.get_length()) {
								operands = r6;
							} else {
								r6.data = fontdict.data.sub(0,0);
								operands = r6;
							}
						}
						while(i9 < 2 && operands.cursor < operands.data.get_length()) {
							var b03;
							if(operands.cursor >= operands.data.get_length()) {
								b03 = 0;
							} else {
								var pos22 = operands.cursor++;
								if(pos22 == null) {
									pos22 = 0;
								}
								b03 = operands.data.readU8(pos22);
							}
							var subrs2;
							if(b03 >= 32 && b03 <= 246) {
								subrs2 = b03 - 139;
							} else if(b03 >= 247 && b03 <= 250) {
								var subrs3;
								if(operands.cursor >= operands.data.get_length()) {
									subrs3 = 0;
								} else {
									var pos23 = operands.cursor++;
									if(pos23 == null) {
										pos23 = 0;
									}
									subrs3 = operands.data.readU8(pos23);
								}
								subrs2 = (b03 - 247) * 256 + subrs3 + 108;
							} else if(b03 >= 251 && b03 <= 254) {
								var subrs4;
								if(operands.cursor >= operands.data.get_length()) {
									subrs4 = 0;
								} else {
									var pos24 = operands.cursor++;
									if(pos24 == null) {
										pos24 = 0;
									}
									subrs4 = operands.data.readU8(pos24);
								}
								subrs2 = -(b03 - 251) * 256 - subrs4 - 108;
							} else if(b03 == 28) {
								var v19 = 0;
								var _g18 = 0;
								var _g19 = 2;
								while(_g18 < _g19) {
									var i12 = _g18++;
									var v20;
									if(operands.cursor >= operands.data.get_length()) {
										v20 = 0;
									} else {
										var pos25 = operands.cursor++;
										if(pos25 == null) {
											pos25 = 0;
										}
										v20 = operands.data.readU8(pos25);
									}
									v19 = v19 << 8 | v20;
								}
								subrs2 = v19;
							} else if(b03 == 29) {
								var v21 = 0;
								var _g20 = 0;
								var _g21 = 4;
								while(_g20 < _g21) {
									var i13 = _g20++;
									var v22;
									if(operands.cursor >= operands.data.get_length()) {
										v22 = 0;
									} else {
										var pos26 = operands.cursor++;
										if(pos26 == null) {
											pos26 = 0;
										}
										v22 = operands.data.readU8(pos26);
									}
									v21 = v21 << 8 | v22;
								}
								subrs2 = v21;
							} else {
								throw haxe_Exception.thrown("Error");
							}
							private_loc[i9] = subrs2;
							++i9;
						}
						if(private_loc[1] == 0 || private_loc[0] == 0) {
							var r7 = new kha_graphics2_truetype_Stbtt_$_$buf();
							r7.data = null;
							r7.cursor = 0;
							subrs = r7;
						} else {
							var o5 = private_loc[1];
							var s3 = private_loc[0];
							var r8 = new kha_graphics2_truetype_Stbtt_$_$buf();
							r8.data = null;
							r8.cursor = 0;
							var r9 = r8;
							var pdict;
							if(o5 < 0 || s3 < 0 || o5 > cff.data.get_length() || s3 > cff.data.get_length() - o5) {
								pdict = r9;
							} else {
								r9.data = cff.data.sub(o5,s3);
								pdict = r9;
							}
							var i14 = 0;
							if(0 > pdict.data.get_length()) {
								throw haxe_Exception.thrown("Error");
							}
							pdict.cursor = 0 > pdict.data.get_length() ? pdict.data.get_length() : 0;
							var ret1 = null;
							while(pdict.cursor < pdict.data.get_length()) {
								var start3 = pdict.cursor;
								var op2;
								while(true) {
									var subrs5;
									if(pdict.cursor >= pdict.data.get_length()) {
										subrs5 = 0;
									} else {
										var pos27 = pdict.cursor;
										if(pos27 == null) {
											pos27 = 0;
										}
										subrs5 = pdict.data.readU8(pos27);
									}
									if(!(subrs5 >= 28)) {
										break;
									}
									var v23;
									var b04;
									if(pdict.cursor >= pdict.data.get_length()) {
										b04 = 0;
									} else {
										var pos28 = pdict.cursor;
										if(pos28 == null) {
											pos28 = 0;
										}
										b04 = pdict.data.readU8(pos28);
									}
									if(b04 < 28) {
										throw haxe_Exception.thrown("Error");
									}
									if(b04 == 30) {
										var o6 = pdict.cursor + 1;
										if(o6 > pdict.data.get_length() || o6 < 0) {
											throw haxe_Exception.thrown("Error");
										}
										pdict.cursor = o6 > pdict.data.get_length() || o6 < 0 ? pdict.data.get_length() : o6;
										while(pdict.cursor < pdict.data.get_length()) {
											if(pdict.cursor >= pdict.data.get_length()) {
												v23 = 0;
											} else {
												var pos29 = pdict.cursor++;
												if(pos29 == null) {
													pos29 = 0;
												}
												v23 = pdict.data.readU8(pos29);
											}
											if((v23 & 15) == 15 || v23 >> 4 == 15) {
												break;
											}
										}
									} else {
										var b05;
										if(pdict.cursor >= pdict.data.get_length()) {
											b05 = 0;
										} else {
											var pos30 = pdict.cursor++;
											if(pos30 == null) {
												pos30 = 0;
											}
											b05 = pdict.data.readU8(pos30);
										}
										if(!(b05 >= 32 && b05 <= 246)) {
											if(b05 >= 247 && b05 <= 250) {
												if(pdict.cursor < pdict.data.get_length()) {
													var pos31 = pdict.cursor++;
													if(pos31 == null) {
														pos31 = 0;
													}
													pdict.data.readU8(pos31);
												}
											} else if(b05 >= 251 && b05 <= 254) {
												if(pdict.cursor < pdict.data.get_length()) {
													var pos32 = pdict.cursor++;
													if(pos32 == null) {
														pos32 = 0;
													}
													pdict.data.readU8(pos32);
												}
											} else if(b05 == 28) {
												var v24 = 0;
												var _g22 = 0;
												var _g23 = 2;
												while(_g22 < _g23) {
													var i15 = _g22++;
													var v25;
													if(pdict.cursor >= pdict.data.get_length()) {
														v25 = 0;
													} else {
														var pos33 = pdict.cursor++;
														if(pos33 == null) {
															pos33 = 0;
														}
														v25 = pdict.data.readU8(pos33);
													}
													v24 = v24 << 8 | v25;
												}
											} else if(b05 == 29) {
												var v26 = 0;
												var _g24 = 0;
												var _g25 = 4;
												while(_g24 < _g25) {
													var i16 = _g24++;
													var v27;
													if(pdict.cursor >= pdict.data.get_length()) {
														v27 = 0;
													} else {
														var pos34 = pdict.cursor++;
														if(pos34 == null) {
															pos34 = 0;
														}
														v27 = pdict.data.readU8(pos34);
													}
													v26 = v26 << 8 | v27;
												}
											} else {
												throw haxe_Exception.thrown("Error");
											}
										}
									}
								}
								var end3 = pdict.cursor;
								if(pdict.cursor >= pdict.data.get_length()) {
									op2 = 0;
								} else {
									var pos35 = pdict.cursor++;
									if(pos35 == null) {
										pos35 = 0;
									}
									op2 = pdict.data.readU8(pos35);
								}
								if(op2 == 12) {
									var op3;
									if(pdict.cursor >= pdict.data.get_length()) {
										op3 = 0;
									} else {
										var pos36 = pdict.cursor++;
										if(pos36 == null) {
											pos36 = 0;
										}
										op3 = pdict.data.readU8(pos36);
									}
									op2 = op3 | 256;
								}
								if(op2 == 19) {
									var s4 = end3 - start3;
									var r10 = new kha_graphics2_truetype_Stbtt_$_$buf();
									r10.data = null;
									r10.cursor = 0;
									var r11 = r10;
									if(start3 < 0 || s4 < 0 || start3 > pdict.data.get_length() || s4 > pdict.data.get_length() - start3) {
										ret1 = r11;
									} else {
										r11.data = pdict.data.sub(start3,s4);
										ret1 = r11;
									}
									break;
								}
							}
							var operands1;
							if(ret1 != null) {
								operands1 = ret1;
							} else {
								var r12 = new kha_graphics2_truetype_Stbtt_$_$buf();
								r12.data = null;
								r12.cursor = 0;
								var r13 = r12;
								if(0 > pdict.data.get_length() || 0 > pdict.data.get_length()) {
									operands1 = r13;
								} else {
									r13.data = pdict.data.sub(0,0);
									operands1 = r13;
								}
							}
							while(i14 < 1 && operands1.cursor < operands1.data.get_length()) {
								var b06;
								if(operands1.cursor >= operands1.data.get_length()) {
									b06 = 0;
								} else {
									var pos37 = operands1.cursor++;
									if(pos37 == null) {
										pos37 = 0;
									}
									b06 = operands1.data.readU8(pos37);
								}
								var subrs6;
								if(b06 >= 32 && b06 <= 246) {
									subrs6 = b06 - 139;
								} else if(b06 >= 247 && b06 <= 250) {
									var subrs7;
									if(operands1.cursor >= operands1.data.get_length()) {
										subrs7 = 0;
									} else {
										var pos38 = operands1.cursor++;
										if(pos38 == null) {
											pos38 = 0;
										}
										subrs7 = operands1.data.readU8(pos38);
									}
									subrs6 = (b06 - 247) * 256 + subrs7 + 108;
								} else if(b06 >= 251 && b06 <= 254) {
									var subrs8;
									if(operands1.cursor >= operands1.data.get_length()) {
										subrs8 = 0;
									} else {
										var pos39 = operands1.cursor++;
										if(pos39 == null) {
											pos39 = 0;
										}
										subrs8 = operands1.data.readU8(pos39);
									}
									subrs6 = -(b06 - 251) * 256 - subrs8 - 108;
								} else if(b06 == 28) {
									var v28 = 0;
									var _g26 = 0;
									var _g27 = 2;
									while(_g26 < _g27) {
										var i17 = _g26++;
										var v29;
										if(operands1.cursor >= operands1.data.get_length()) {
											v29 = 0;
										} else {
											var pos40 = operands1.cursor++;
											if(pos40 == null) {
												pos40 = 0;
											}
											v29 = operands1.data.readU8(pos40);
										}
										v28 = v28 << 8 | v29;
									}
									subrs6 = v28;
								} else if(b06 == 29) {
									var v30 = 0;
									var _g28 = 0;
									var _g29 = 4;
									while(_g28 < _g29) {
										var i18 = _g28++;
										var v31;
										if(operands1.cursor >= operands1.data.get_length()) {
											v31 = 0;
										} else {
											var pos41 = operands1.cursor++;
											if(pos41 == null) {
												pos41 = 0;
											}
											v31 = operands1.data.readU8(pos41);
										}
										v30 = v30 << 8 | v31;
									}
									subrs6 = v30;
								} else {
									throw haxe_Exception.thrown("Error");
								}
								subrsoff[i14] = subrs6;
								++i14;
							}
							if(subrsoff[0] == 0) {
								var r14 = new kha_graphics2_truetype_Stbtt_$_$buf();
								r14.data = null;
								r14.cursor = 0;
								subrs = r14;
							} else {
								var o7 = private_loc[1] + subrsoff[0];
								if(o7 > cff.data.get_length() || o7 < 0) {
									throw haxe_Exception.thrown("Error");
								}
								cff.cursor = o7 > cff.data.get_length() || o7 < 0 ? cff.data.get_length() : o7;
								var start4 = cff.cursor;
								var v32 = 0;
								var _g30 = 0;
								var _g31 = 2;
								while(_g30 < _g31) {
									var i19 = _g30++;
									var v33;
									if(cff.cursor >= cff.data.get_length()) {
										v33 = 0;
									} else {
										var pos42 = cff.cursor++;
										if(pos42 == null) {
											pos42 = 0;
										}
										v33 = cff.data.readU8(pos42);
									}
									v32 = v32 << 8 | v33;
								}
								var count1 = v32;
								if(count1 > 0) {
									var offsize1;
									if(cff.cursor >= cff.data.get_length()) {
										offsize1 = 0;
									} else {
										var pos43 = cff.cursor++;
										if(pos43 == null) {
											pos43 = 0;
										}
										offsize1 = cff.data.readU8(pos43);
									}
									if(!(offsize1 >= 1 && offsize1 <= 4)) {
										throw haxe_Exception.thrown("Error");
									}
									var o8 = cff.cursor + offsize1 * count1;
									if(o8 > cff.data.get_length() || o8 < 0) {
										throw haxe_Exception.thrown("Error");
									}
									cff.cursor = o8 > cff.data.get_length() || o8 < 0 ? cff.data.get_length() : o8;
									var v34 = 0;
									if(!(offsize1 >= 1 && offsize1 <= 4)) {
										throw haxe_Exception.thrown("Error");
									}
									var _g32 = 0;
									var _g33 = offsize1;
									while(_g32 < _g33) {
										var i20 = _g32++;
										var v35;
										if(cff.cursor >= cff.data.get_length()) {
											v35 = 0;
										} else {
											var pos44 = cff.cursor++;
											if(pos44 == null) {
												pos44 = 0;
											}
											v35 = cff.data.readU8(pos44);
										}
										v34 = v34 << 8 | v35;
									}
									var o9 = cff.cursor + (v34 - 1);
									if(o9 > cff.data.get_length() || o9 < 0) {
										throw haxe_Exception.thrown("Error");
									}
									cff.cursor = o9 > cff.data.get_length() || o9 < 0 ? cff.data.get_length() : o9;
									var s5 = cff.cursor - start4;
									var r15 = new kha_graphics2_truetype_Stbtt_$_$buf();
									r15.data = null;
									r15.cursor = 0;
									var r16 = r15;
									if(start4 < 0 || s5 < 0 || start4 > cff.data.get_length() || s5 > cff.data.get_length() - start4) {
										subrs = r16;
									} else {
										r16.data = cff.data.sub(start4,s5);
										subrs = r16;
									}
								} else {
									subrs = cff;
								}
							}
						}
					}
					has_subrs = true;
				}
			}
			if(sp < 1) {
				return false;
			}
			v = s[--sp] | 0;
			if(subr_stack_height >= 10) {
				return false;
			}
			subr_stack[subr_stack_height++] = b;
			var idx = b0 == 10 ? subrs : info.gsubrs;
			var n = v;
			if(0 > idx.data.get_length()) {
				throw haxe_Exception.thrown("Error");
			}
			idx.cursor = 0 > idx.data.get_length() ? idx.data.get_length() : 0;
			var v36 = 0;
			var _g34 = 0;
			var _g35 = 2;
			while(_g34 < _g35) {
				var i21 = _g34++;
				var v37;
				if(idx.cursor >= idx.data.get_length()) {
					v37 = 0;
				} else {
					var pos45 = idx.cursor++;
					if(pos45 == null) {
						pos45 = 0;
					}
					v37 = idx.data.readU8(pos45);
				}
				v36 = v36 << 8 | v37;
			}
			var count2 = v36;
			var bias = 107;
			if(count2 >= 33900) {
				bias = 32768;
			} else if(count2 >= 1240) {
				bias = 1131;
			}
			n += bias;
			if(n < 0 || n >= count2) {
				var r17 = new kha_graphics2_truetype_Stbtt_$_$buf();
				r17.data = null;
				r17.cursor = 0;
				b = r17;
			} else {
				if(0 > idx.data.get_length()) {
					throw haxe_Exception.thrown("Error");
				}
				idx.cursor = 0 > idx.data.get_length() ? idx.data.get_length() : 0;
				var v38 = 0;
				var _g36 = 0;
				var _g37 = 2;
				while(_g36 < _g37) {
					var i22 = _g36++;
					var v39;
					if(idx.cursor >= idx.data.get_length()) {
						v39 = 0;
					} else {
						var pos46 = idx.cursor++;
						if(pos46 == null) {
							pos46 = 0;
						}
						v39 = idx.data.readU8(pos46);
					}
					v38 = v38 << 8 | v39;
				}
				var count3 = v38;
				var offsize2;
				if(idx.cursor >= idx.data.get_length()) {
					offsize2 = 0;
				} else {
					var pos47 = idx.cursor++;
					if(pos47 == null) {
						pos47 = 0;
					}
					offsize2 = idx.data.readU8(pos47);
				}
				if(!(n >= 0 && n < count3)) {
					throw haxe_Exception.thrown("Error");
				}
				if(!(offsize2 >= 1 && offsize2 <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var o10 = idx.cursor + n * offsize2;
				if(o10 > idx.data.get_length() || o10 < 0) {
					throw haxe_Exception.thrown("Error");
				}
				idx.cursor = o10 > idx.data.get_length() || o10 < 0 ? idx.data.get_length() : o10;
				var v40 = 0;
				if(!(offsize2 >= 1 && offsize2 <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var _g38 = 0;
				var _g39 = offsize2;
				while(_g38 < _g39) {
					var i23 = _g38++;
					var v41;
					if(idx.cursor >= idx.data.get_length()) {
						v41 = 0;
					} else {
						var pos48 = idx.cursor++;
						if(pos48 == null) {
							pos48 = 0;
						}
						v41 = idx.data.readU8(pos48);
					}
					v40 = v40 << 8 | v41;
				}
				var start5 = v40;
				var v42 = 0;
				if(!(offsize2 >= 1 && offsize2 <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var _g40 = 0;
				var _g41 = offsize2;
				while(_g40 < _g41) {
					var i24 = _g40++;
					var v43;
					if(idx.cursor >= idx.data.get_length()) {
						v43 = 0;
					} else {
						var pos49 = idx.cursor++;
						if(pos49 == null) {
							pos49 = 0;
						}
						v43 = idx.data.readU8(pos49);
					}
					v42 = v42 << 8 | v43;
				}
				var end4 = v42;
				var o11 = 2 + (count3 + 1) * offsize2 + start5;
				var s6 = end4 - start5;
				var r18 = new kha_graphics2_truetype_Stbtt_$_$buf();
				r18.data = null;
				r18.cursor = 0;
				var r19 = r18;
				if(o11 < 0 || s6 < 0 || o11 > idx.data.get_length() || s6 > idx.data.get_length() - o11) {
					b = r19;
				} else {
					r19.data = idx.data.sub(o11,s6);
					b = r19;
				}
			}
			if(b.data.get_length() == 0) {
				return false;
			}
			b.cursor = 0;
			clear_stack = false;
			break;
		case 30:
			if(sp < 4) {
				return false;
			}
			while(i + 3 < sp) {
				var cx126 = c.x;
				var cy126 = c.y + s[i];
				var cx213 = cx126 + s[i + 1];
				var cy213 = cy126 + s[i + 2];
				c.x = cx213 + s[i + 3];
				c.y = cy213 + (sp - i == 5 ? s[i + 4] : 0);
				var x27 = c.x | 0;
				var y27 = c.y | 0;
				var cx33 = cx126 | 0;
				var cy33 = cy126 | 0;
				var cx127 = cx213 | 0;
				var cy127 = cy213 | 0;
				if(c.bounds) {
					if(x27 > c.max_x || !c.started) {
						c.max_x = x27;
					}
					if(y27 > c.max_y || !c.started) {
						c.max_y = y27;
					}
					if(x27 < c.min_x || !c.started) {
						c.min_x = x27;
					}
					if(y27 < c.min_y || !c.started) {
						c.min_y = y27;
					}
					c.started = true;
					if(cx33 > c.max_x || !c.started) {
						c.max_x = cx33;
					}
					if(cy33 > c.max_y || !c.started) {
						c.max_y = cy33;
					}
					if(cx33 < c.min_x || !c.started) {
						c.min_x = cx33;
					}
					if(cy33 < c.min_y || !c.started) {
						c.min_y = cy33;
					}
					c.started = true;
					if(cx127 > c.max_x || !c.started) {
						c.max_x = cx127;
					}
					if(cy127 > c.max_y || !c.started) {
						c.max_y = cy127;
					}
					if(cx127 < c.min_x || !c.started) {
						c.min_x = cx127;
					}
					if(cy127 < c.min_y || !c.started) {
						c.min_y = cy127;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x27,y27,cx33,cy33);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx127 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy127 , Int);
				}
				c.num_vertices++;
				i += 4;
				if(i + 3 >= sp) {
					break;
				}
				var cx128 = c.x + s[i];
				var cy128 = c.y;
				var cx214 = cx128 + s[i + 1];
				var cy214 = cy128 + s[i + 2];
				c.x = cx214 + (sp - i == 5 ? s[i + 4] : 0);
				c.y = cy214 + s[i + 3];
				var x28 = c.x | 0;
				var y28 = c.y | 0;
				var cx34 = cx128 | 0;
				var cy34 = cy128 | 0;
				var cx129 = cx214 | 0;
				var cy129 = cy214 | 0;
				if(c.bounds) {
					if(x28 > c.max_x || !c.started) {
						c.max_x = x28;
					}
					if(y28 > c.max_y || !c.started) {
						c.max_y = y28;
					}
					if(x28 < c.min_x || !c.started) {
						c.min_x = x28;
					}
					if(y28 < c.min_y || !c.started) {
						c.min_y = y28;
					}
					c.started = true;
					if(cx34 > c.max_x || !c.started) {
						c.max_x = cx34;
					}
					if(cy34 > c.max_y || !c.started) {
						c.max_y = cy34;
					}
					if(cx34 < c.min_x || !c.started) {
						c.min_x = cx34;
					}
					if(cy34 < c.min_y || !c.started) {
						c.min_y = cy34;
					}
					c.started = true;
					if(cx129 > c.max_x || !c.started) {
						c.max_x = cx129;
					}
					if(cy129 > c.max_y || !c.started) {
						c.max_y = cy129;
					}
					if(cx129 < c.min_x || !c.started) {
						c.min_x = cx129;
					}
					if(cy129 < c.min_y || !c.started) {
						c.min_y = cy129;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x28,y28,cx34,cy34);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx129 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy129 , Int);
				}
				c.num_vertices++;
				i += 4;
			}
			break;
		case 31:
			if(sp < 4) {
				return false;
			}
			while(i + 3 < sp) {
				var cx130 = c.x + s[i];
				var cy130 = c.y;
				var cx215 = cx130 + s[i + 1];
				var cy215 = cy130 + s[i + 2];
				c.x = cx215 + (sp - i == 5 ? s[i + 4] : 0);
				c.y = cy215 + s[i + 3];
				var x29 = c.x | 0;
				var y29 = c.y | 0;
				var cx35 = cx130 | 0;
				var cy35 = cy130 | 0;
				var cx131 = cx215 | 0;
				var cy131 = cy215 | 0;
				if(c.bounds) {
					if(x29 > c.max_x || !c.started) {
						c.max_x = x29;
					}
					if(y29 > c.max_y || !c.started) {
						c.max_y = y29;
					}
					if(x29 < c.min_x || !c.started) {
						c.min_x = x29;
					}
					if(y29 < c.min_y || !c.started) {
						c.min_y = y29;
					}
					c.started = true;
					if(cx35 > c.max_x || !c.started) {
						c.max_x = cx35;
					}
					if(cy35 > c.max_y || !c.started) {
						c.max_y = cy35;
					}
					if(cx35 < c.min_x || !c.started) {
						c.min_x = cx35;
					}
					if(cy35 < c.min_y || !c.started) {
						c.min_y = cy35;
					}
					c.started = true;
					if(cx131 > c.max_x || !c.started) {
						c.max_x = cx131;
					}
					if(cy131 > c.max_y || !c.started) {
						c.max_y = cy131;
					}
					if(cx131 < c.min_x || !c.started) {
						c.min_x = cx131;
					}
					if(cy131 < c.min_y || !c.started) {
						c.min_y = cy131;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x29,y29,cx35,cy35);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx131 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy131 , Int);
				}
				c.num_vertices++;
				i += 4;
				if(i + 3 >= sp) {
					break;
				}
				var cx132 = c.x;
				var cy132 = c.y + s[i];
				var cx216 = cx132 + s[i + 1];
				var cy216 = cy132 + s[i + 2];
				c.x = cx216 + s[i + 3];
				c.y = cy216 + (sp - i == 5 ? s[i + 4] : 0);
				var x30 = c.x | 0;
				var y30 = c.y | 0;
				var cx36 = cx132 | 0;
				var cy36 = cy132 | 0;
				var cx133 = cx216 | 0;
				var cy133 = cy216 | 0;
				if(c.bounds) {
					if(x30 > c.max_x || !c.started) {
						c.max_x = x30;
					}
					if(y30 > c.max_y || !c.started) {
						c.max_y = y30;
					}
					if(x30 < c.min_x || !c.started) {
						c.min_x = x30;
					}
					if(y30 < c.min_y || !c.started) {
						c.min_y = y30;
					}
					c.started = true;
					if(cx36 > c.max_x || !c.started) {
						c.max_x = cx36;
					}
					if(cy36 > c.max_y || !c.started) {
						c.max_y = cy36;
					}
					if(cx36 < c.min_x || !c.started) {
						c.min_x = cx36;
					}
					if(cy36 < c.min_y || !c.started) {
						c.min_y = cy36;
					}
					c.started = true;
					if(cx133 > c.max_x || !c.started) {
						c.max_x = cx133;
					}
					if(cy133 > c.max_y || !c.started) {
						c.max_y = cy133;
					}
					if(cx133 < c.min_x || !c.started) {
						c.min_x = cx133;
					}
					if(cy133 < c.min_y || !c.started) {
						c.min_y = cy133;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x30,y30,cx36,cy36);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx133 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy133 , Int);
				}
				c.num_vertices++;
				i += 4;
			}
			break;
		default:
			if(b0 != 255 && b0 != 28 && (b0 < 32 || b0 > 254)) {
				return false;
			}
			if(b0 == 255) {
				var v44 = 0;
				var _g42 = 0;
				var _g43 = 4;
				while(_g42 < _g43) {
					var i25 = _g42++;
					var v45;
					if(b.cursor >= b.data.get_length()) {
						v45 = 0;
					} else {
						var pos50 = b.cursor++;
						if(pos50 == null) {
							pos50 = 0;
						}
						v45 = b.data.readU8(pos50);
					}
					v44 = v44 << 8 | v45;
				}
				f = v44 / 65536;
			} else {
				var o12 = b.cursor + (-1);
				if(o12 > b.data.get_length() || o12 < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o12 > b.data.get_length() || o12 < 0 ? b.data.get_length() : o12;
				var b07;
				if(b.cursor >= b.data.get_length()) {
					b07 = 0;
				} else {
					var pos51 = b.cursor++;
					if(pos51 == null) {
						pos51 = 0;
					}
					b07 = b.data.readU8(pos51);
				}
				if(b07 >= 32 && b07 <= 246) {
					f = b07 - 139;
				} else if(b07 >= 247 && b07 <= 250) {
					var f1;
					if(b.cursor >= b.data.get_length()) {
						f1 = 0;
					} else {
						var pos52 = b.cursor++;
						if(pos52 == null) {
							pos52 = 0;
						}
						f1 = b.data.readU8(pos52);
					}
					f = (b07 - 247) * 256 + f1 + 108;
				} else if(b07 >= 251 && b07 <= 254) {
					var f2;
					if(b.cursor >= b.data.get_length()) {
						f2 = 0;
					} else {
						var pos53 = b.cursor++;
						if(pos53 == null) {
							pos53 = 0;
						}
						f2 = b.data.readU8(pos53);
					}
					f = -(b07 - 251) * 256 - f2 - 108;
				} else if(b07 == 28) {
					var v46 = 0;
					var _g44 = 0;
					var _g45 = 2;
					while(_g44 < _g45) {
						var i26 = _g44++;
						var v47;
						if(b.cursor >= b.data.get_length()) {
							v47 = 0;
						} else {
							var pos54 = b.cursor++;
							if(pos54 == null) {
								pos54 = 0;
							}
							v47 = b.data.readU8(pos54);
						}
						v46 = v46 << 8 | v47;
					}
					f = v46;
				} else if(b07 == 29) {
					var v48 = 0;
					var _g46 = 0;
					var _g47 = 4;
					while(_g46 < _g47) {
						var i27 = _g46++;
						var v49;
						if(b.cursor >= b.data.get_length()) {
							v49 = 0;
						} else {
							var pos55 = b.cursor++;
							if(pos55 == null) {
								pos55 = 0;
							}
							v49 = b.data.readU8(pos55);
						}
						v48 = v48 << 8 | v49;
					}
					f = v48;
				} else {
					throw haxe_Exception.thrown("Error");
				}
			}
			if(sp >= 48) {
				return false;
			}
			s[sp++] = f;
			clear_stack = false;
		}
		if(clear_stack) {
			sp = 0;
		}
	}
	return false;
};
kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphShapeT2 = function(info,glyph_index) {
	var tmp = new kha_graphics2_truetype_Stbtt_$_$csctx();
	tmp.bounds = true;
	tmp.started = false;
	tmp.first_x = 0;
	tmp.first_y = 0;
	tmp.x = 0;
	tmp.y = 0;
	tmp.min_x = 0;
	tmp.min_y = 0;
	tmp.max_x = 0;
	tmp.max_y = 0;
	tmp.pvertices = null;
	tmp.num_vertices = 0;
	var count_ctx = tmp;
	var tmp = new kha_graphics2_truetype_Stbtt_$_$csctx();
	tmp.bounds = false;
	tmp.started = false;
	tmp.first_x = 0;
	tmp.first_y = 0;
	tmp.x = 0;
	tmp.y = 0;
	tmp.min_x = 0;
	tmp.min_y = 0;
	tmp.max_x = 0;
	tmp.max_y = 0;
	tmp.pvertices = null;
	tmp.num_vertices = 0;
	var output_ctx = tmp;
	if(kha_graphics2_truetype_StbTruetype.stbtt__run_charstring(info,glyph_index,count_ctx)) {
		var this1 = new Array(count_ctx.num_vertices);
		output_ctx.pvertices = this1;
		var _g = 0;
		var _g1 = count_ctx.num_vertices;
		while(_g < _g1) {
			var i = _g++;
			output_ctx.pvertices[i] = new kha_graphics2_truetype_Stbtt_$vertex();
		}
		if(kha_graphics2_truetype_StbTruetype.stbtt__run_charstring(info,glyph_index,output_ctx)) {
			if(output_ctx.num_vertices != count_ctx.num_vertices) {
				throw haxe_Exception.thrown("Error");
			}
			return output_ctx.pvertices;
		}
	}
	return null;
};
kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphInfoT2 = function(info,glyph_index,rect) {
	var tmp = new kha_graphics2_truetype_Stbtt_$_$csctx();
	tmp.bounds = true;
	tmp.started = false;
	tmp.first_x = 0;
	tmp.first_y = 0;
	tmp.x = 0;
	tmp.y = 0;
	tmp.min_x = 0;
	tmp.min_y = 0;
	tmp.max_x = 0;
	tmp.max_y = 0;
	tmp.pvertices = null;
	tmp.num_vertices = 0;
	var c = tmp;
	var r = kha_graphics2_truetype_StbTruetype.stbtt__run_charstring(info,glyph_index,c);
	if(rect != null) {
		rect.x0 = r ? c.min_x : 0;
		rect.y0 = r ? c.min_y : 0;
		rect.x1 = r ? c.max_x : 0;
		rect.y1 = r ? c.max_y : 0;
	}
	if(r) {
		return c.num_vertices;
	} else {
		return 0;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape = function(info,glyph_index) {
	if(info.cff.data == null || info.cff.data.get_length() == 0) {
		return kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphShapeTT(info,glyph_index);
	} else {
		return kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphShapeT2(info,glyph_index);
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphHMetrics = function(info,glyph_index) {
	var p = info.data;
	var pos = info.hhea + 34;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var numOfLongHorMetrics = ch2 | ch1 << 8;
	var metrics = new kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics();
	if(glyph_index < numOfLongHorMetrics) {
		var p = info.data;
		var pos = info.hmtx + 4 * glyph_index;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		metrics.advanceWidth = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = info.hmtx + 4 * glyph_index + 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		metrics.leftSideBearing = (n & 32768) != 0 ? n - 65536 : n;
	} else {
		var p = info.data;
		var pos = info.hmtx + 4 * (numOfLongHorMetrics - 1);
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		metrics.advanceWidth = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = info.hmtx + 4 * numOfLongHorMetrics + 2 * (glyph_index - numOfLongHorMetrics);
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		metrics.leftSideBearing = (n & 32768) != 0 ? n - 65536 : n;
	}
	return metrics;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphKernAdvance = function(info,glyph1,glyph2) {
	var kern = info.kern;
	var data = info.data;
	var straw;
	var m;
	if(info.kern == 0) {
		return 0;
	}
	var pos = kern + 2;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	if((ch2 | ch1 << 8) < 1) {
		return 0;
	}
	var pos = kern + 8;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	if((ch2 | ch1 << 8) != 1) {
		return 0;
	}
	var l = 0;
	var pos = kern + 10;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	var r = (ch2 | ch1 << 8) - 1;
	var needle = glyph1 << 16 | glyph2;
	while(l <= r) {
		m = l + r >> 1;
		var pos = kern + 18 + m * 6;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = data.readU8(pos1);
		var ch2 = data.readU8(pos1 + 1);
		var ch3 = data.readU8(pos1 + 2);
		var ch4 = data.readU8(pos1 + 3);
		straw = ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		if(needle < straw) {
			r = m - 1;
		} else if(needle > straw) {
			l = m + 1;
		} else {
			var pos2 = kern + 22 + m * 6;
			if(pos2 == null) {
				pos2 = 0;
			}
			var ch11 = data.readU8(pos2);
			var ch21 = data.readU8(pos2 + 1);
			var n = ch21 | ch11 << 8;
			if((n & 32768) != 0) {
				return n - 65536;
			} else {
				return n;
			}
		}
	}
	return 0;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointKernAdvance = function(info,ch1,ch2) {
	if(info.kern == 0) {
		return 0;
	}
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphKernAdvance(info,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,ch1),kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,ch2));
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointHMetrics = function(info,codepoint) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphHMetrics(info,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,codepoint));
};
kha_graphics2_truetype_StbTruetype.stbtt_GetFontVMetrics = function(info) {
	var metrics = new kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics();
	var p = info.data;
	var pos = info.hhea + 4;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	metrics.ascent = (n & 32768) != 0 ? n - 65536 : n;
	var p = info.data;
	var pos = info.hhea + 6;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	metrics.descent = (n & 32768) != 0 ? n - 65536 : n;
	var p = info.data;
	var pos = info.hhea + 8;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	metrics.lineGap = (n & 32768) != 0 ? n - 65536 : n;
	return metrics;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetFontBoundingBox = function(info) {
	var rect = new kha_graphics2_truetype_Stbtt_$temp_$rect();
	var p = info.data;
	var pos = info.head + 36;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	rect.x0 = (n & 32768) != 0 ? n - 65536 : n;
	var p = info.data;
	var pos = info.head + 38;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	rect.y0 = (n & 32768) != 0 ? n - 65536 : n;
	var p = info.data;
	var pos = info.head + 40;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	rect.x1 = (n & 32768) != 0 ? n - 65536 : n;
	var p = info.data;
	var pos = info.head + 42;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	rect.y1 = (n & 32768) != 0 ? n - 65536 : n;
	return rect;
};
kha_graphics2_truetype_StbTruetype.stbtt_ScaleForPixelHeight = function(info,height) {
	var p = info.data;
	var pos = info.hhea + 4;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	var p = info.data;
	var pos = info.hhea + 6;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n1 = ch2 | ch1 << 8;
	var fheight = ((n & 32768) != 0 ? n - 65536 : n) - ((n1 & 32768) != 0 ? n1 - 65536 : n1);
	return height / fheight;
};
kha_graphics2_truetype_StbTruetype.stbtt_ScaleForMappingEmToPixels = function(info,pixels) {
	var p = info.data;
	var pos = info.head + 18;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var unitsPerEm = ch2 | ch1 << 8;
	return pixels / unitsPerEm;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel = function(font,glyph,scale_x,scale_y,shift_x,shift_y) {
	var rect = new kha_graphics2_truetype_Stbtt_$temp_$rect();
	if(!kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBox(font,glyph,rect)) {
		rect.x0 = 0;
		rect.y0 = 0;
		rect.x1 = 0;
		rect.y1 = 0;
	} else {
		var x0 = rect.x0;
		var x1 = rect.x1;
		var y0 = rect.y0;
		var y1 = rect.y1;
		rect.x0 = Math.floor(x0 * scale_x + shift_x);
		rect.y0 = Math.floor(-y1 * scale_y + shift_y);
		rect.x1 = Math.ceil(x1 * scale_x + shift_x);
		rect.y1 = Math.ceil(-y0 * scale_y + shift_y);
	}
	return rect;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBox = function(font,glyph,scale_x,scale_y) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel(font,glyph,scale_x,scale_y,0.0,0.0);
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBitmapBoxSubpixel = function(font,codepoint,scale_x,scale_y,shift_x,shift_y) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel(font,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(font,codepoint),scale_x,scale_y,shift_x,shift_y);
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBitmapBox = function(font,codepoint,scale_x,scale_y) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBitmapBoxSubpixel(font,codepoint,scale_x,scale_y,0.0,0.0);
};
kha_graphics2_truetype_StbTruetype.stbtt__new_active = function(e,eIndex,off_x,start_point) {
	var z = new kha_graphics2_truetype_Stbtt_$_$active_$edge();
	var dxdy = (e[eIndex].x1 - e[eIndex].x0) / (e[eIndex].y1 - e[eIndex].y0);
	if(z == null) {
		throw haxe_Exception.thrown("Error");
	}
	if(z == null) {
		return z;
	}
	z.fdx = dxdy;
	z.fdy = dxdy != 0.0 ? 1.0 / dxdy : 0.0;
	z.fx = e[eIndex].x0 + dxdy * (start_point - e[eIndex].y0);
	z.fx -= off_x;
	z.direction = e[eIndex].invert ? 1.0 : -1.0;
	z.sy = e[eIndex].y0;
	z.ey = e[eIndex].y1;
	z.next = null;
	return z;
};
kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge = function(scanline,scanlineIndex,x,e,x0,y0,x1,y1) {
	if(y0 == y1) {
		return;
	}
	if(!(y0 < y1)) {
		throw haxe_Exception.thrown("Error");
	}
	if(!(e.sy <= e.ey)) {
		throw haxe_Exception.thrown("Error");
	}
	if(y0 > e.ey) {
		return;
	}
	if(y1 < e.sy) {
		return;
	}
	if(y0 < e.sy) {
		x0 += (x1 - x0) * (e.sy - y0) / (y1 - y0);
		y0 = e.sy;
	}
	if(y1 > e.ey) {
		x1 += (x1 - x0) * (e.ey - y1) / (y1 - y0);
		y1 = e.ey;
	}
	if(x0 == x) {
		if(!(x1 <= x + 1)) {
			throw haxe_Exception.thrown("Error");
		}
	} else if(x0 == x + 1) {
		if(!(x1 >= x)) {
			throw haxe_Exception.thrown("Error");
		}
	} else if(x0 <= x) {
		if(!(x1 <= x)) {
			throw haxe_Exception.thrown("Error");
		}
	} else if(x0 >= x + 1) {
		if(!(x1 >= x + 1)) {
			throw haxe_Exception.thrown("Error");
		}
	} else if(!(x1 >= x && x1 <= x + 1)) {
		throw haxe_Exception.thrown("Error");
	}
	if(x0 <= x && x1 <= x) {
		scanline[scanlineIndex + x] += e.direction * (y1 - y0);
	} else if(!(x0 >= x + 1 && x1 >= x + 1)) {
		if(!(x0 >= x && x0 <= x + 1 && x1 >= x && x1 <= x + 1)) {
			throw haxe_Exception.thrown("Error");
		}
		scanline[scanlineIndex + x] += e.direction * (y1 - y0) * (1 - (x0 - x + (x1 - x)) / 2);
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__fill_active_edges_new = function(scanline,scanline_fill,scanline_fillIndex,len,e,y_top) {
	var y_bottom = y_top + 1;
	while(e != null) {
		if(!(e.ey >= y_top)) {
			throw haxe_Exception.thrown("Error");
		}
		if(e.fdx == 0) {
			var x0 = e.fx;
			if(x0 < len) {
				if(x0 >= 0) {
					kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x0 | 0,e,x0,y_top,x0,y_bottom);
					kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline_fill,scanline_fillIndex - 1,x0 + 1 | 0,e,x0,y_top,x0,y_bottom);
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline_fill,scanline_fillIndex - 1,0,e,x0,y_top,x0,y_bottom);
				}
			}
		} else {
			var x01 = e.fx;
			var dx = e.fdx;
			var xb = x01 + dx;
			var x_top;
			var x_bottom;
			var sy0;
			var sy1;
			var dy = e.fdy;
			if(!(e.sy <= y_bottom && e.ey >= y_top)) {
				throw haxe_Exception.thrown("Error");
			}
			if(e.sy > y_top) {
				x_top = x01 + dx * (e.sy - y_top);
				sy0 = e.sy;
			} else {
				x_top = x01;
				sy0 = y_top;
			}
			if(e.ey < y_bottom) {
				x_bottom = x01 + dx * (e.ey - y_top);
				sy1 = e.ey;
			} else {
				x_bottom = xb;
				sy1 = y_bottom;
			}
			if(x_top >= 0 && x_bottom >= 0 && x_top < len && x_bottom < len) {
				if((x_top | 0) == (x_bottom | 0)) {
					var x = x_top | 0;
					var height = sy1 - sy0;
					if(!(x >= 0 && x < len)) {
						throw haxe_Exception.thrown("Error");
					}
					scanline[x] += e.direction * (1 - (x_top - x + (x_bottom - x)) / 2) * height;
					scanline_fill[scanline_fillIndex + x] += e.direction * height;
				} else {
					var x1;
					if(x_top > x_bottom) {
						sy0 = y_bottom - (sy0 - y_top);
						sy1 = y_bottom - (sy1 - y_top);
						var t = sy0;
						sy0 = sy1;
						sy1 = t;
						t = x_bottom;
						x_bottom = x_top;
						x_top = t;
						dx = -dx;
						dy = -dy;
						t = x01;
						x01 = xb;
						xb = t;
					}
					var x11 = x_top | 0;
					var x2 = x_bottom | 0;
					var y_crossing = (x11 + 1 - x01) * dy + y_top;
					var sign = e.direction;
					var area = sign * (y_crossing - sy0);
					scanline[x11] += area * (1 - (x_top - x11 + (x11 + 1 - x11)) / 2);
					var step = sign * dy;
					var _g = x11 + 1;
					var _g1 = x2;
					while(_g < _g1) {
						var x3 = _g++;
						scanline[x3] += area + step / 2;
						area += step;
					}
					y_crossing += dy * (x2 - (x11 + 1));
					if(!(Math.abs(area) <= 1.01)) {
						throw haxe_Exception.thrown("Error");
					}
					scanline[x2] += area + sign * (1 - (x2 - x2 + (x_bottom - x2)) / 2) * (sy1 - y_crossing);
					scanline_fill[scanline_fillIndex + x2] += sign * (sy1 - sy0);
				}
			} else {
				var _g2 = 0;
				var _g3 = len;
				while(_g2 < _g3) {
					var x4 = _g2++;
					var y0 = y_top;
					var x12 = x4;
					var x21 = x4 + 1;
					var x31 = xb;
					var y3 = y_bottom;
					var y1 = (x4 - x01) / dx + y_top;
					var y2 = (x4 + 1 - x01) / dx + y_top;
					if(x01 < x12 && x31 > x21) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x12,y1);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x12,y1,x21,y2);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x21,y2,x31,y3);
					} else if(x31 < x12 && x01 > x21) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x21,y2);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x21,y2,x12,y1);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x12,y1,x31,y3);
					} else if(x01 < x12 && x31 > x12) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x12,y1);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x12,y1,x31,y3);
					} else if(x31 < x12 && x01 > x12) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x12,y1);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x12,y1,x31,y3);
					} else if(x01 < x21 && x31 > x21) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x21,y2);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x21,y2,x31,y3);
					} else if(x31 < x21 && x01 > x21) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x21,y2);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x21,y2,x31,y3);
					} else {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x31,y3);
					}
				}
			}
		}
		e = e.next;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__rasterize_sorted_edges = function(result,e,n,vsubsample,off_x,off_y) {
	var active = null;
	var j = 0;
	var scanline;
	var scanline2Index = 0;
	var eIndex = 0;
	if(result.w > 64) {
		var this1 = new Array(result.w * 2 + 1);
		scanline = this1;
	} else {
		var this1 = new Array(129);
		scanline = this1;
	}
	var scanline2 = scanline;
	scanline2Index = result.w;
	var y = off_y;
	e[eIndex + n].y0 = off_y + result.h + 1;
	while(j < result.h) {
		var scan_y_top = y + 0.0;
		var scan_y_bottom = y + 1.0;
		var step_value = active;
		var step_parent = null;
		var _g = 0;
		var _g1 = result.w;
		while(_g < _g1) {
			var i = _g++;
			scanline[i] = 0;
		}
		var _g2 = 0;
		var _g3 = result.w + 1;
		while(_g2 < _g3) {
			var i1 = _g2++;
			scanline2[scanline2Index + i1] = 0;
		}
		while(step_value != null) {
			var z = step_value;
			if(z.ey <= scan_y_top) {
				if(step_parent == null) {
					active = z.next;
					step_value = z.next;
				} else {
					step_parent.next = z.next;
					step_value = z.next;
				}
				if(z.direction == 0) {
					throw haxe_Exception.thrown("Error");
				}
				z.direction = 0;
			} else {
				step_parent = step_value;
				step_value = step_value.next;
			}
		}
		while(e[eIndex].y0 <= scan_y_bottom) {
			if(e[eIndex].y0 != e[eIndex].y1) {
				var z1 = kha_graphics2_truetype_StbTruetype.stbtt__new_active(e,eIndex,off_x,scan_y_top);
				if(!(z1.ey >= scan_y_top)) {
					throw haxe_Exception.thrown("Error");
				}
				if(z1 != null) {
					if(j == 0 && off_y != 0) {
						if(z1.ey < scan_y_top) {
							z1.ey = scan_y_top;
						}
					}
					if(!(z1.ey >= scan_y_top)) {
						throw haxe_Exception.thrown("Error");
					}
				}
				z1.next = active;
				active = z1;
			}
			++eIndex;
		}
		if(active != null) {
			kha_graphics2_truetype_StbTruetype.stbtt__fill_active_edges_new(scanline,scanline2,scanline2Index + 1,result.w,active,scan_y_top);
		}
		var sum = 0;
		var _g4 = 0;
		var _g5 = result.w;
		while(_g4 < _g5) {
			var i2 = _g4++;
			sum += scanline2[scanline2Index + i2];
			var k = scanline[i2] + sum;
			k = Math.abs(k) * 255.0 + 0.5;
			var m = k | 0;
			if(m > 255) {
				m = 255;
			}
			result.pixels.writeU8(result.pixels_offset + j * result.stride + i2,m);
		}
		step_parent = null;
		step_value = active;
		while(step_value != null) {
			var z2 = step_value;
			z2.fx += z2.fdx;
			step_parent = step_value;
			step_value = step_value.next;
		}
		++y;
		++j;
	}
};
kha_graphics2_truetype_StbTruetype.STBTT__COMPARE = function(a,b) {
	return a.y0 < b.y0;
};
kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_ins_sort = function(p,n) {
	var i;
	var j;
	var _g = 1;
	var _g1 = n;
	while(_g < _g1) {
		var i = _g++;
		var t = p[i];
		var a = t;
		j = i;
		while(j > 0) {
			var b = p[j - 1];
			var c = kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(a,b);
			if(!c) {
				break;
			}
			p[j] = p[j - 1];
			--j;
		}
		if(i != j) {
			p[j] = t;
		}
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_quicksort = function(p,pIndex,n) {
	while(n > 12) {
		var t;
		var c;
		var m = n >> 1;
		var c01 = kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex],p[pIndex + m]);
		var c12 = kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex + m],p[pIndex + n - 1]);
		if(c01 != c12) {
			c = kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex],p[pIndex + n - 1]);
			var z = c == c12 ? 0 : n - 1;
			t = p[pIndex + z];
			p[pIndex + z] = p[pIndex + m];
			p[pIndex + m] = t;
		}
		t = p[pIndex];
		p[pIndex] = p[pIndex + m];
		p[pIndex + m] = t;
		var i = 1;
		var j = n - 1;
		while(true) {
			while(kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex + i],p[pIndex])) ++i;
			while(kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex],p[pIndex + j])) --j;
			if(i >= j) {
				break;
			}
			t = p[pIndex + i];
			p[pIndex + i] = p[pIndex + j];
			p[pIndex + j] = t;
			++i;
			--j;
		}
		if(j < n - i) {
			kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_quicksort(p,pIndex,j);
			pIndex += i;
			n -= i;
		} else {
			kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_quicksort(p,pIndex + i,n - i);
			n = j;
		}
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__sort_edges = function(p,n) {
	kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_quicksort(p,0,n);
	kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_ins_sort(p,n);
};
kha_graphics2_truetype_StbTruetype.stbtt__rasterize = function(result,pts,wcount,windings,scale_x,scale_y,shift_x,shift_y,off_x,off_y,invert) {
	var y_scale_inv = invert ? -scale_y : scale_y;
	var i;
	var j;
	var k;
	var vsubsample = 1;
	var ptsIndex = 0;
	var n = 0;
	var _g = 0;
	var _g1 = windings;
	while(_g < _g1) {
		var i = _g++;
		n += wcount[i];
	}
	var this1 = new Array(n + 1);
	var e = this1;
	if(e == null) {
		return;
	} else {
		var _g = 0;
		var _g1 = e.length;
		while(_g < _g1) {
			var i = _g++;
			e[i] = new kha_graphics2_truetype_Stbtt_$_$edge();
		}
	}
	n = 0;
	var m = 0;
	var _g = 0;
	var _g1 = windings;
	while(_g < _g1) {
		var i = _g++;
		var p = pts;
		var pIndex = ptsIndex + m;
		m += wcount[i];
		j = wcount[i] - 1;
		var _g2 = 0;
		var _g3 = wcount[i];
		while(_g2 < _g3) {
			var k = _g2++;
			var a = k;
			var b = j;
			if(p[pIndex + j].y == p[pIndex + k].y) {
				j = k;
				continue;
			}
			e[n].invert = false;
			if(invert ? p[pIndex + j].y > p[pIndex + k].y : p[pIndex + j].y < p[pIndex + k].y) {
				e[n].invert = true;
				a = j;
				b = k;
			}
			e[n].x0 = p[pIndex + a].x * scale_x + shift_x;
			e[n].y0 = (p[pIndex + a].y * y_scale_inv + shift_y) * vsubsample;
			e[n].x1 = p[pIndex + b].x * scale_x + shift_x;
			e[n].y1 = (p[pIndex + b].y * y_scale_inv + shift_y) * vsubsample;
			++n;
			j = k;
		}
	}
	kha_graphics2_truetype_StbTruetype.stbtt__sort_edges(e,n);
	kha_graphics2_truetype_StbTruetype.stbtt__rasterize_sorted_edges(result,e,n,vsubsample,off_x,off_y);
};
kha_graphics2_truetype_StbTruetype.stbtt__add_point = function(points,n,x,y) {
	if(points == null) {
		return;
	}
	points[n].x = x;
	points[n].y = y;
};
kha_graphics2_truetype_StbTruetype.stbtt__tesselate_curve = function(points,num_points,x0,y0,x1,y1,x2,y2,objspace_flatness_squared,n) {
	var mx = (x0 + 2 * x1 + x2) / 4;
	var my = (y0 + 2 * y1 + y2) / 4;
	var dx = (x0 + x2) / 2 - mx;
	var dy = (y0 + y2) / 2 - my;
	if(n > 16) {
		return 1;
	}
	if(dx * dx + dy * dy > objspace_flatness_squared) {
		kha_graphics2_truetype_StbTruetype.stbtt__tesselate_curve(points,num_points,x0,y0,(x0 + x1) / 2.0,(y0 + y1) / 2.0,mx,my,objspace_flatness_squared,n + 1);
		kha_graphics2_truetype_StbTruetype.stbtt__tesselate_curve(points,num_points,mx,my,(x1 + x2) / 2.0,(y1 + y2) / 2.0,x2,y2,objspace_flatness_squared,n + 1);
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt__add_point(points,num_points.value,x2,y2);
		num_points.value += 1;
	}
	return 1;
};
kha_graphics2_truetype_StbTruetype.stbtt__tesselate_cubic = function(points,num_points,x0,y0,x1,y1,x2,y2,x3,y3,objspace_flatness_squared,n) {
	var dx0 = x1 - x0;
	var dy0 = y1 - y0;
	var dx1 = x2 - x1;
	var dy1 = y2 - y1;
	var dx2 = x3 - x2;
	var dy2 = y3 - y2;
	var dx = x3 - x0;
	var dy = y3 - y0;
	var longlen = Math.sqrt(dx0 * dx0 + dy0 * dy0) + Math.sqrt(dx1 * dx1 + dy1 * dy1) + Math.sqrt(dx2 * dx2 + dy2 * dy2);
	var shortlen = Math.sqrt(dx * dx + dy * dy);
	var flatness_squared = longlen * longlen - shortlen * shortlen;
	if(n > 16) {
		return;
	}
	if(flatness_squared > objspace_flatness_squared) {
		var x01 = (x0 + x1) / 2;
		var y01 = (y0 + y1) / 2;
		var x12 = (x1 + x2) / 2;
		var y12 = (y1 + y2) / 2;
		var x23 = (x2 + x3) / 2;
		var y23 = (y2 + y3) / 2;
		var xa = (x01 + x12) / 2;
		var ya = (y01 + y12) / 2;
		var xb = (x12 + x23) / 2;
		var yb = (y12 + y23) / 2;
		var mx = (xa + xb) / 2;
		var my = (ya + yb) / 2;
		kha_graphics2_truetype_StbTruetype.stbtt__tesselate_cubic(points,num_points,x0,y0,x01,y01,xa,ya,mx,my,objspace_flatness_squared,n + 1);
		kha_graphics2_truetype_StbTruetype.stbtt__tesselate_cubic(points,num_points,mx,my,xb,yb,x23,y23,x3,y3,objspace_flatness_squared,n + 1);
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt__add_point(points,num_points.value,x3,y3);
		num_points.value += 1;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_FlattenCurves = function(vertices,num_verts,objspace_flatness,contour_lengths,num_contours) {
	var points = null;
	var num_points = 0;
	var objspace_flatness_squared = objspace_flatness * objspace_flatness;
	var i;
	var n = 0;
	var start = 0;
	var pass;
	var _g = 0;
	var _g1 = num_verts;
	while(_g < _g1) {
		var i = _g++;
		if(vertices[i].type == 1) {
			++n;
		}
	}
	num_contours.value = n;
	if(n == 0) {
		return null;
	}
	var this1 = new Array(n);
	contour_lengths.value = this1;
	if(contour_lengths.value == null) {
		num_contours.value = 0;
		return null;
	}
	var _g = 0;
	while(_g < 2) {
		var pass = _g++;
		var x = 0;
		var y = 0;
		if(pass == 1) {
			var this1 = new Array(num_points);
			points = this1;
			if(points == null) {
				contour_lengths.value = null;
				num_contours.value = 0;
				return null;
			} else {
				var _g1 = 0;
				var _g2 = points.length;
				while(_g1 < _g2) {
					var i = _g1++;
					points[i] = new kha_graphics2_truetype_Stbtt_$_$point();
				}
			}
		}
		num_points = 0;
		n = -1;
		var _g3 = 0;
		var _g4 = num_verts;
		while(_g3 < _g4) {
			var i1 = _g3++;
			switch(vertices[i1].type) {
			case 1:
				if(n >= 0) {
					contour_lengths.value[n] = num_points - start;
				}
				++n;
				start = num_points;
				x = vertices[i1].x;
				y = vertices[i1].y;
				kha_graphics2_truetype_StbTruetype.stbtt__add_point(points,num_points++,x,y);
				break;
			case 2:
				x = vertices[i1].x;
				y = vertices[i1].y;
				kha_graphics2_truetype_StbTruetype.stbtt__add_point(points,num_points++,x,y);
				break;
			case 3:
				var num_points_reference = { value : num_points};
				kha_graphics2_truetype_StbTruetype.stbtt__tesselate_curve(points,num_points_reference,x,y,vertices[i1].cx,vertices[i1].cy,vertices[i1].x,vertices[i1].y,objspace_flatness_squared,0);
				num_points = num_points_reference.value;
				x = vertices[i1].x;
				y = vertices[i1].y;
				break;
			case 4:
				var num_points_reference1 = { value : num_points};
				kha_graphics2_truetype_StbTruetype.stbtt__tesselate_cubic(points,num_points_reference1,x,y,vertices[i1].cx,vertices[i1].cy,vertices[i1].cx1,vertices[i1].cy1,vertices[i1].x,vertices[i1].y,objspace_flatness_squared,0);
				num_points = num_points_reference1.value;
				x = vertices[i1].x;
				y = vertices[i1].y;
				break;
			}
		}
		contour_lengths.value[n] = num_points - start;
	}
	return points;
};
kha_graphics2_truetype_StbTruetype.stbtt_Rasterize = function(result,flatness_in_pixels,vertices,num_verts,scale_x,scale_y,shift_x,shift_y,x_off,y_off,invert) {
	var scale = scale_x > scale_y ? scale_y : scale_x;
	var winding_count = 0;
	var winding_lengths = null;
	var winding_count_reference = { value : winding_count};
	var winding_lengths_reference = new kha_graphics2_truetype_VectorOfIntPointer();
	var windings = kha_graphics2_truetype_StbTruetype.stbtt_FlattenCurves(vertices,num_verts,flatness_in_pixels / scale,winding_lengths_reference,winding_count_reference);
	winding_count = winding_count_reference.value;
	winding_lengths = winding_lengths_reference.value;
	if(windings != null) {
		kha_graphics2_truetype_StbTruetype.stbtt__rasterize(result,windings,winding_lengths,winding_count,scale_x,scale_y,shift_x,shift_y,x_off,y_off,invert);
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapSubpixel = function(info,scale_x,scale_y,shift_x,shift_y,glyph,region) {
	var gbm = new kha_graphics2_truetype_Stbtt_$_$bitmap();
	var vertices = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape(info,glyph);
	var num_verts = vertices.length;
	if(scale_x == 0) {
		scale_x = scale_y;
	}
	if(scale_y == 0) {
		if(scale_x == 0) {
			return null;
		}
		scale_y = scale_x;
	}
	var rect = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel(info,glyph,scale_x,scale_y,shift_x,shift_y);
	var ix0 = rect.x0;
	var iy0 = rect.y0;
	var ix1 = rect.x1;
	var iy1 = rect.y1;
	gbm.w = ix1 - ix0;
	gbm.h = iy1 - iy0;
	gbm.pixels = null;
	region.width = gbm.w;
	region.height = gbm.h;
	region.xoff = ix0;
	region.yoff = iy0;
	if(gbm.w != 0 && gbm.h != 0) {
		gbm.pixels = kha_internal_BytesBlob.alloc(gbm.w * gbm.h);
		if(gbm.pixels != null) {
			gbm.stride = gbm.w;
			kha_graphics2_truetype_StbTruetype.stbtt_Rasterize(gbm,0.35,vertices,num_verts,scale_x,scale_y,shift_x,shift_y,ix0,iy0,true);
		}
	}
	return gbm.pixels;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmap = function(info,scale_x,scale_y,glyph,region) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapSubpixel(info,scale_x,scale_y,0.0,0.0,glyph,region);
};
kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmapSubpixel = function(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,shift_x,shift_y,glyph) {
	var ix0 = 0;
	var iy0 = 0;
	var vertices = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape(info,glyph);
	var num_verts = vertices == null ? 0 : vertices.length;
	var gbm = new kha_graphics2_truetype_Stbtt_$_$bitmap();
	var rect = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel(info,glyph,scale_x,scale_y,shift_x,shift_y);
	ix0 = rect.x0;
	iy0 = rect.y0;
	gbm.pixels = output;
	gbm.pixels_offset = output_offset;
	gbm.w = out_w;
	gbm.h = out_h;
	gbm.stride = out_stride;
	if(gbm.w != 0 && gbm.h != 0) {
		kha_graphics2_truetype_StbTruetype.stbtt_Rasterize(gbm,0.35,vertices,num_verts,scale_x,scale_y,shift_x,shift_y,ix0,iy0,true);
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmap = function(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,glyph) {
	kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmapSubpixel(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,0.0,0.0,glyph);
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBitmapSubpixel = function(info,scale_x,scale_y,shift_x,shift_y,codepoint,region) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapSubpixel(info,scale_x,scale_y,shift_x,shift_y,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,codepoint),region);
};
kha_graphics2_truetype_StbTruetype.stbtt_MakeCodepointBitmapSubpixel = function(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,shift_x,shift_y,codepoint) {
	kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmapSubpixel(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,shift_x,shift_y,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,codepoint));
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBitmap = function(info,scale_x,scale_y,codepoint,region) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBitmapSubpixel(info,scale_x,scale_y,0.0,0.0,codepoint,region);
};
kha_graphics2_truetype_StbTruetype.stbtt_MakeCodepointBitmap = function(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,codepoint) {
	kha_graphics2_truetype_StbTruetype.stbtt_MakeCodepointBitmapSubpixel(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,0.0,0.0,codepoint);
};
kha_graphics2_truetype_StbTruetype.stbtt_BakeFontBitmap = function(data,offset,pixel_height,pixels,pw,ph,chars,chardata) {
	var f = new kha_graphics2_truetype_Stbtt_$fontinfo();
	if(!kha_graphics2_truetype_StbTruetype.stbtt_InitFont(f,data,offset)) {
		return -1;
	}
	var y = 1;
	var x = y;
	var bottom_y = 1;
	var scale = kha_graphics2_truetype_StbTruetype.stbtt_ScaleForPixelHeight(f,pixel_height);
	var i = 0;
	var _g = 0;
	while(_g < chars.length) {
		var index = chars[_g];
		++_g;
		var g = kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(f,index);
		var metrics = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphHMetrics(f,g);
		var advance = metrics.advanceWidth;
		var lsb = metrics.leftSideBearing;
		var rect = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBox(f,g,scale,scale);
		var x0 = rect.x0;
		var y0 = rect.y0;
		var x1 = rect.x1;
		var y1 = rect.y1;
		var gw = x1 - x0;
		var gh = y1 - y0;
		if(x + gw + 1 >= pw) {
			y = bottom_y;
			x = 1;
		}
		if(y + gh + 1 >= ph) {
			return -i;
		}
		if(x + gw >= pw) {
			throw haxe_Exception.thrown("Error");
		}
		if(y + gh >= ph) {
			throw haxe_Exception.thrown("Error");
		}
		chardata[i].x0 = x;
		chardata[i].y0 = y;
		chardata[i].x1 = x + gw;
		chardata[i].y1 = y + gh;
		chardata[i].xadvance = scale * advance;
		chardata[i].xoff = x0;
		chardata[i].yoff = y0;
		x = x + gw + 1;
		if(y + gh + 1 > bottom_y) {
			bottom_y = y + gh + 1;
		}
		++i;
	}
	var _g = 0;
	var _g1 = pw * ph;
	while(_g < _g1) {
		var i1 = _g++;
		pixels.writeU8(i1,0);
	}
	i = 0;
	var ch;
	var _g = 0;
	while(_g < chars.length) {
		var index = chars[_g];
		++_g;
		var g = kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(f,index);
		ch = chardata[i];
		kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmap(f,pixels,ch.x0 + ch.y0 * pw,ch.x1 - ch.x0,ch.y1 - ch.y0,pw,scale,scale,g);
		++i;
	}
	return bottom_y;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetBakedQuad = function(chardata,pw,ph,char_index,xpos,ypos,q,opengl_fillrule) {
	var d3d_bias = opengl_fillrule ? 0 : -0.5;
	var ipw = 1.0 / pw;
	var iph = 1.0 / ph;
	var b = chardata[char_index];
	var round_x = Math.floor(xpos.value + b.xoff + 0.5);
	var round_y = Math.floor(ypos.value + b.yoff + 0.5);
	q.x0 = round_x + d3d_bias;
	q.y0 = round_y + d3d_bias;
	q.x1 = round_x + b.x1 - b.x0 + d3d_bias;
	q.y1 = round_y + b.y1 - b.y0 + d3d_bias;
	q.s0 = b.x0 * ipw;
	q.t0 = b.y0 * iph;
	q.s1 = b.x1 * ipw;
	q.t1 = b.y1 * iph;
	xpos.value += b.xadvance;
};
var kha_graphics4_ConstantLocation = function() { };
$hxClasses["kha.graphics4.ConstantLocation"] = kha_graphics4_ConstantLocation;
kha_graphics4_ConstantLocation.__name__ = true;
kha_graphics4_ConstantLocation.__isInterface__ = true;
var kha_graphics4_CubeMap = function(size,format,renderTarget,depthStencilFormat) {
	this.isDepthAttachment = false;
	this.depthTexture = null;
	this.texture = null;
	this.frameBuffer = null;
	this.myWidth = size;
	this.myHeight = size;
	this.format = format;
	this.renderTarget = renderTarget;
	this.depthStencilFormat = depthStencilFormat;
	if(renderTarget) {
		this.createTexture();
	}
};
$hxClasses["kha.graphics4.CubeMap"] = kha_graphics4_CubeMap;
kha_graphics4_CubeMap.__name__ = true;
kha_graphics4_CubeMap.__interfaces__ = [kha_Resource,kha_Canvas];
kha_graphics4_CubeMap.createRenderTarget = function(size,format,depthStencil,contextId) {
	if(contextId == null) {
		contextId = 0;
	}
	if(format == null) {
		format = 0;
	}
	if(depthStencil == null) {
		depthStencil = 0;
	}
	return new kha_graphics4_CubeMap(size,format,true,depthStencil);
};
kha_graphics4_CubeMap.prototype = {
	myWidth: null
	,myHeight: null
	,format: null
	,renderTarget: null
	,depthStencilFormat: null
	,graphics4: null
	,frameBuffer: null
	,texture: null
	,depthTexture: null
	,isDepthAttachment: null
	,createTexture: function() {
		if(kha_SystemImpl.gl == null) {
			return;
		}
		this.texture = kha_SystemImpl.gl.createTexture();
		kha_SystemImpl.gl.bindTexture(34067,this.texture);
		kha_SystemImpl.gl.texParameteri(34067,10240,9729);
		kha_SystemImpl.gl.texParameteri(34067,10241,9729);
		kha_SystemImpl.gl.texParameteri(34067,10242,33071);
		kha_SystemImpl.gl.texParameteri(34067,10243,33071);
		if(this.renderTarget) {
			this.frameBuffer = kha_SystemImpl.gl.createFramebuffer();
			kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
			switch(this.format) {
			case 0:
				kha_SystemImpl.gl.texImage2D(34069,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34070,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34071,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34072,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34073,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34074,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				break;
			case 2:
				kha_SystemImpl.gl.texImage2D(34069,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,null);
				kha_SystemImpl.gl.texImage2D(34070,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,null);
				kha_SystemImpl.gl.texImage2D(34071,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,null);
				kha_SystemImpl.gl.texImage2D(34072,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,null);
				kha_SystemImpl.gl.texImage2D(34073,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,null);
				kha_SystemImpl.gl.texImage2D(34074,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,null);
				break;
			case 3:
				kha_SystemImpl.gl.texImage2D(34069,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
				kha_SystemImpl.gl.texImage2D(34070,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
				kha_SystemImpl.gl.texImage2D(34071,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
				kha_SystemImpl.gl.texImage2D(34072,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
				kha_SystemImpl.gl.texImage2D(34073,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
				kha_SystemImpl.gl.texImage2D(34074,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
				break;
			case 4:
				kha_SystemImpl.gl.texImage2D(34069,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34070,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34071,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34072,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34073,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34074,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				break;
			case 5:
				kha_SystemImpl.gl.texImage2D(34069,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,6406,5126,null);
				kha_SystemImpl.gl.texImage2D(34070,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,6406,5126,null);
				kha_SystemImpl.gl.texImage2D(34071,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,6406,5126,null);
				kha_SystemImpl.gl.texImage2D(34072,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,6406,5126,null);
				kha_SystemImpl.gl.texImage2D(34073,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,6406,5126,null);
				kha_SystemImpl.gl.texImage2D(34074,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,6406,5126,null);
				break;
			case 6:
				kha_SystemImpl.gl.texImage2D(34069,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34070,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34071,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34072,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34073,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34074,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				break;
			default:
				kha_SystemImpl.gl.texImage2D(34069,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34070,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34071,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34072,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34073,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34074,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
			}
			if(this.format == 3) {
				kha_SystemImpl.gl.texParameteri(34067,10240,9728);
				kha_SystemImpl.gl.texParameteri(34067,10241,9728);
				this.isDepthAttachment = true;
				if(!kha_SystemImpl.gl2) {
					var colortex = kha_SystemImpl.gl.createTexture();
					kha_SystemImpl.gl.bindTexture(34067,colortex);
					kha_SystemImpl.gl.texImage2D(34069,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,34069,colortex,0);
					kha_SystemImpl.gl.texImage2D(34070,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,34070,colortex,0);
					kha_SystemImpl.gl.texImage2D(34071,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,34071,colortex,0);
					kha_SystemImpl.gl.texImage2D(34072,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,34072,colortex,0);
					kha_SystemImpl.gl.texImage2D(34073,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,34073,colortex,0);
					kha_SystemImpl.gl.texImage2D(34074,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,34074,colortex,0);
					kha_SystemImpl.gl.bindTexture(34067,this.texture);
				}
			}
			this.initDepthStencilBuffer(this.depthStencilFormat);
			kha_SystemImpl.gl.bindFramebuffer(36160,null);
		}
		kha_SystemImpl.gl.bindTexture(34067,null);
	}
	,initDepthStencilBuffer: function(depthStencilFormat) {
		switch(depthStencilFormat) {
		case 0:
			break;
		case 1:case 5:
			this.depthTexture = kha_SystemImpl.gl.createTexture();
			kha_SystemImpl.gl.bindTexture(34067,this.depthTexture);
			if(depthStencilFormat == 1) {
				kha_SystemImpl.gl.texImage2D(34067,0,kha_SystemImpl.gl2 ? 33190 : 6402,this.myWidth,this.myHeight,0,6402,5125,null);
			} else {
				kha_SystemImpl.gl.texImage2D(34067,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
			}
			kha_SystemImpl.gl.texParameteri(34067,10240,9728);
			kha_SystemImpl.gl.texParameteri(34067,10241,9728);
			kha_SystemImpl.gl.texParameteri(34067,10242,33071);
			kha_SystemImpl.gl.texParameteri(34067,10243,33071);
			kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
			kha_SystemImpl.gl.framebufferTexture2D(36160,36096,34067,this.depthTexture,0);
			break;
		case 2:case 3:case 4:
			this.depthTexture = kha_SystemImpl.gl.createTexture();
			kha_SystemImpl.gl.bindTexture(34067,this.depthTexture);
			kha_SystemImpl.gl.texImage2D(34067,0,kha_SystemImpl.gl2 ? 35056 : 34041,this.myWidth,this.myHeight,0,34041,kha_SystemImpl.depthTexture.UNSIGNED_INT_24_8_WEBGL,null);
			kha_SystemImpl.gl.texParameteri(34067,10240,9728);
			kha_SystemImpl.gl.texParameteri(34067,10241,9728);
			kha_SystemImpl.gl.texParameteri(34067,10242,33071);
			kha_SystemImpl.gl.texParameteri(34067,10243,33071);
			kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
			kha_SystemImpl.gl.framebufferTexture2D(36160,33306,34067,this.depthTexture,0);
			break;
		}
	}
	,set: function(stage) {
		kha_SystemImpl.gl.activeTexture(33984 + stage);
		kha_SystemImpl.gl.bindTexture(34067,this.texture);
	}
	,setDepth: function(stage) {
		kha_SystemImpl.gl.activeTexture(33984 + stage);
		kha_SystemImpl.gl.bindTexture(34067,this.depthTexture);
	}
	,unload: function() {
	}
	,lock: function(level) {
		if(level == null) {
			level = 0;
		}
		return null;
	}
	,unlock: function() {
	}
	,get_width: function() {
		return this.myWidth;
	}
	,get_height: function() {
		return this.myHeight;
	}
	,get_g1: function() {
		return null;
	}
	,get_g2: function() {
		return null;
	}
	,get_g4: function() {
		if(this.graphics4 == null) {
			this.graphics4 = new kha_js_graphics4_Graphics(this);
		}
		return this.graphics4;
	}
	,__class__: kha_graphics4_CubeMap
};
var kha_graphics4_FragmentShader = function(sources,files) {
	this.sources = [];
	var _g = 0;
	while(_g < sources.length) {
		var source = sources[_g];
		++_g;
		this.sources.push(source.toString());
	}
	this.type = 35632;
	this.shader = null;
	this.files = files;
};
$hxClasses["kha.graphics4.FragmentShader"] = kha_graphics4_FragmentShader;
kha_graphics4_FragmentShader.__name__ = true;
kha_graphics4_FragmentShader.fromSource = function(source) {
	var shader = new kha_graphics4_FragmentShader([],["runtime-string"]);
	shader.sources.push(source);
	return shader;
};
kha_graphics4_FragmentShader.prototype = {
	sources: null
	,type: null
	,shader: null
	,files: null
	,'delete': function() {
		kha_SystemImpl.gl.deleteShader(this.shader);
		this.shader = null;
		this.sources = null;
	}
	,__class__: kha_graphics4_FragmentShader
};
var kha_graphics4_GeometryShader = function(sources) {
};
$hxClasses["kha.graphics4.GeometryShader"] = kha_graphics4_GeometryShader;
kha_graphics4_GeometryShader.__name__ = true;
kha_graphics4_GeometryShader.prototype = {
	'delete': function() {
	}
	,__class__: kha_graphics4_GeometryShader
};
var kha_graphics4_Graphics = function() { };
$hxClasses["kha.graphics4.Graphics"] = kha_graphics4_Graphics;
kha_graphics4_Graphics.__name__ = true;
kha_graphics4_Graphics.__isInterface__ = true;
kha_graphics4_Graphics.prototype = {
	begin: null
	,beginFace: null
	,beginEye: null
	,end: null
	,vsynced: null
	,refreshRate: null
	,clear: null
	,viewport: null
	,scissor: null
	,disableScissor: null
	,setVertexBuffer: null
	,setVertexBuffers: null
	,setIndexBuffer: null
	,setTexture: null
	,setTextureDepth: null
	,setTextureArray: null
	,setVideoTexture: null
	,setImageTexture: null
	,setTextureParameters: null
	,setTexture3DParameters: null
	,setTextureCompareMode: null
	,setCubeMapCompareMode: null
	,setCubeMap: null
	,setCubeMapDepth: null
	,maxBoundTextures: null
	,setStencilReferenceValue: null
	,instancedRenderingAvailable: null
	,setPipeline: null
	,setBool: null
	,setInt: null
	,setInt2: null
	,setInt3: null
	,setInt4: null
	,setInts: null
	,setFloat: null
	,setFloat2: null
	,setFloat3: null
	,setFloat4: null
	,setFloats: null
	,setVector2: null
	,setVector3: null
	,setVector4: null
	,setMatrix: null
	,setMatrix3: null
	,drawIndexedVertices: null
	,drawIndexedVerticesInstanced: null
	,flush: null
	,__class__: kha_graphics4_Graphics
};
var kha_graphics4_InternalPipeline = function(pipeline,projectionLocation,textureLocation) {
	this.pipeline = pipeline;
	this.projectionLocation = projectionLocation;
	this.textureLocation = textureLocation;
};
$hxClasses["kha.graphics4.InternalPipeline"] = kha_graphics4_InternalPipeline;
kha_graphics4_InternalPipeline.__name__ = true;
kha_graphics4_InternalPipeline.prototype = {
	pipeline: null
	,projectionLocation: null
	,textureLocation: null
	,__class__: kha_graphics4_InternalPipeline
};
var kha_graphics4_PipelineCache = function() { };
$hxClasses["kha.graphics4.PipelineCache"] = kha_graphics4_PipelineCache;
kha_graphics4_PipelineCache.__name__ = true;
kha_graphics4_PipelineCache.__isInterface__ = true;
kha_graphics4_PipelineCache.prototype = {
	get: null
	,__class__: kha_graphics4_PipelineCache
};
var kha_graphics4_SimplePipelineCache = function(pipeline,texture) {
	var projectionLocation = null;
	try {
		projectionLocation = pipeline.getConstantLocation("projectionMatrix");
	} catch( _g ) {
		var x = haxe_Exception.caught(_g).unwrap();
		haxe_Log.trace(x,{ fileName : "kha/graphics4/Graphics2.hx", lineNumber : 58, className : "kha.graphics4.SimplePipelineCache", methodName : "new"});
	}
	var textureLocation = null;
	if(texture) {
		try {
			textureLocation = pipeline.getTextureUnit("tex");
		} catch( _g ) {
			var x = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace(x,{ fileName : "kha/graphics4/Graphics2.hx", lineNumber : 67, className : "kha.graphics4.SimplePipelineCache", methodName : "new"});
		}
	}
	this.pipeline = new kha_graphics4_InternalPipeline(pipeline,projectionLocation,textureLocation);
};
$hxClasses["kha.graphics4.SimplePipelineCache"] = kha_graphics4_SimplePipelineCache;
kha_graphics4_SimplePipelineCache.__name__ = true;
kha_graphics4_SimplePipelineCache.__interfaces__ = [kha_graphics4_PipelineCache];
kha_graphics4_SimplePipelineCache.prototype = {
	pipeline: null
	,get: function(colorFormats,depthStencilFormat) {
		return this.pipeline;
	}
	,__class__: kha_graphics4_SimplePipelineCache
};
var kha_graphics4_PerFramebufferPipelineCache = function(pipeline,texture) {
	this.pipelines = [];
	pipeline.compile();
	var projectionLocation = null;
	try {
		projectionLocation = pipeline.getConstantLocation("projectionMatrix");
	} catch( _g ) {
		var x = haxe_Exception.caught(_g).unwrap();
		haxe_Log.trace(x,{ fileName : "kha/graphics4/Graphics2.hx", lineNumber : 90, className : "kha.graphics4.PerFramebufferPipelineCache", methodName : "new"});
	}
	var textureLocation = null;
	if(texture) {
		try {
			textureLocation = pipeline.getTextureUnit("tex");
		} catch( _g ) {
			var x = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace(x,{ fileName : "kha/graphics4/Graphics2.hx", lineNumber : 99, className : "kha.graphics4.PerFramebufferPipelineCache", methodName : "new"});
		}
	}
	this.pipelines.push(new kha_graphics4_InternalPipeline(pipeline,projectionLocation,textureLocation));
};
$hxClasses["kha.graphics4.PerFramebufferPipelineCache"] = kha_graphics4_PerFramebufferPipelineCache;
kha_graphics4_PerFramebufferPipelineCache.__name__ = true;
kha_graphics4_PerFramebufferPipelineCache.__interfaces__ = [kha_graphics4_PipelineCache];
kha_graphics4_PerFramebufferPipelineCache.prototype = {
	pipelines: null
	,get: function(colorFormats,depthStencilFormat) {
		return this.pipelines[this.hash(colorFormats,depthStencilFormat)];
	}
	,hash: function(colorFormats,depthStencilFormat) {
		return 0;
	}
	,__class__: kha_graphics4_PerFramebufferPipelineCache
};
var kha_graphics4_ImageShaderPainter = function(g4) {
	this.myPipeline = null;
	this.bilinearMipmaps = false;
	this.bilinear = false;
	this.g = g4;
	kha_graphics4_ImageShaderPainter.bufferStart = 0;
	kha_graphics4_ImageShaderPainter.bufferIndex = 0;
	kha_graphics4_ImageShaderPainter.initShaders();
	this.myPipeline = kha_graphics4_ImageShaderPainter.standardImagePipeline;
	this.initBuffers();
};
$hxClasses["kha.graphics4.ImageShaderPainter"] = kha_graphics4_ImageShaderPainter;
kha_graphics4_ImageShaderPainter.__name__ = true;
kha_graphics4_ImageShaderPainter.initShaders = function() {
	if(kha_graphics4_ImageShaderPainter.structure == null) {
		kha_graphics4_ImageShaderPainter.structure = kha_graphics4_Graphics2.createImageVertexStructure();
	}
	if(kha_graphics4_ImageShaderPainter.standardImagePipeline == null) {
		var pipeline = kha_graphics4_Graphics2.createImagePipeline(kha_graphics4_ImageShaderPainter.structure);
		kha_graphics4_ImageShaderPainter.standardImagePipeline = new kha_graphics4_PerFramebufferPipelineCache(pipeline,true);
	}
};
kha_graphics4_ImageShaderPainter.prototype = {
	projectionMatrix: null
	,bilinear: null
	,bilinearMipmaps: null
	,g: null
	,myPipeline: null
	,get_pipeline: function() {
		return this.myPipeline;
	}
	,set_pipeline: function(pipe) {
		this.myPipeline = pipe != null ? pipe : kha_graphics4_ImageShaderPainter.standardImagePipeline;
		return this.myPipeline;
	}
	,setProjection: function(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}
	,initBuffers: function() {
		if(kha_graphics4_ImageShaderPainter.rectVertexBuffer == null) {
			kha_graphics4_ImageShaderPainter.rectVertexBuffer = new kha_graphics4_VertexBuffer(6000,kha_graphics4_ImageShaderPainter.structure,1);
			kha_graphics4_ImageShaderPainter.rectVertices = kha_graphics4_ImageShaderPainter.rectVertexBuffer.lock();
			kha_graphics4_ImageShaderPainter.indexBuffer = new kha_graphics4_IndexBuffer(9000,0);
			var indices = kha_graphics4_ImageShaderPainter.indexBuffer.lock();
			var _g = 0;
			while(_g < 1500) {
				var i = _g++;
				var k = i * 3 * 2;
				indices.setUint32(k * 4,i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp = k * 4;
				var k1 = i * 3 * 2 + 1;
				indices.setUint32(k1 * 4,i * 4 + 1,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp1 = k1 * 4;
				var k2 = i * 3 * 2 + 2;
				indices.setUint32(k2 * 4,i * 4 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp2 = k2 * 4;
				var k3 = i * 3 * 2 + 3;
				indices.setUint32(k3 * 4,i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp3 = k3 * 4;
				var k4 = i * 3 * 2 + 4;
				indices.setUint32(k4 * 4,i * 4 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp4 = k4 * 4;
				var k5 = i * 3 * 2 + 5;
				indices.setUint32(k5 * 4,i * 4 + 3,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp5 = k5 * 4;
			}
			kha_graphics4_ImageShaderPainter.indexBuffer.unlock();
		}
	}
	,setRectVertices: function(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex,bottomleftx,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 4,bottomlefty,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 8,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 24,topleftx,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 28,toplefty,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 32,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 48,toprightx,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 52,toprighty,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 56,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 72,bottomrightx,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 76,bottomrighty,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 80,-5.0,true);
	}
	,setRectTexCoords: function(left,top,right,bottom) {
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 12,left,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 16,bottom,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 36,left,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 40,top,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 60,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 64,top,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 84,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 88,bottom,true);
	}
	,setRectColor: function(r,g,b,a) {
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 3,a * 255 | 0);
	}
	,drawBuffer: function(end) {
		if(kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart == 0) {
			return;
		}
		kha_graphics4_ImageShaderPainter.rectVertexBuffer.unlock((kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 4);
		var pipeline = this.myPipeline.get(null,3);
		this.g.setPipeline(pipeline.pipeline);
		this.g.setVertexBuffer(kha_graphics4_ImageShaderPainter.rectVertexBuffer);
		this.g.setIndexBuffer(kha_graphics4_ImageShaderPainter.indexBuffer);
		this.g.setTexture(pipeline.textureLocation,kha_graphics4_ImageShaderPainter.lastTexture);
		this.g.setTextureParameters(pipeline.textureLocation,2,2,this.bilinear ? 1 : 0,this.bilinear ? 1 : 0,this.bilinearMipmaps ? 2 : 0);
		this.g.setMatrix(pipeline.projectionLocation,this.projectionMatrix);
		this.g.drawIndexedVertices(kha_graphics4_ImageShaderPainter.bufferStart * 2 * 3,(kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 2 * 3);
		this.g.setTexture(pipeline.textureLocation,null);
		if(end || (kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1) * 4 >= 1500) {
			kha_graphics4_ImageShaderPainter.bufferStart = 0;
			kha_graphics4_ImageShaderPainter.bufferIndex = 0;
			kha_graphics4_ImageShaderPainter.rectVertices = kha_graphics4_ImageShaderPainter.rectVertexBuffer.lock(0);
		} else {
			kha_graphics4_ImageShaderPainter.bufferStart = kha_graphics4_ImageShaderPainter.bufferIndex;
			kha_graphics4_ImageShaderPainter.rectVertices = kha_graphics4_ImageShaderPainter.rectVertexBuffer.lock(kha_graphics4_ImageShaderPainter.bufferStart * 4);
		}
	}
	,setBilinearFilter: function(bilinear) {
		this.drawBuffer(false);
		kha_graphics4_ImageShaderPainter.lastTexture = null;
		this.bilinear = bilinear;
	}
	,setBilinearMipmapFilter: function(bilinear) {
		this.drawBuffer(false);
		kha_graphics4_ImageShaderPainter.lastTexture = null;
		this.bilinearMipmaps = bilinear;
	}
	,drawImage: function(img,bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty,opacity,color) {
		var tex = img;
		if(kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1 >= 1500 || kha_graphics4_ImageShaderPainter.lastTexture != null && tex != kha_graphics4_ImageShaderPainter.lastTexture) {
			this.drawBuffer(false);
		}
		var r = ((color & 16711680) >>> 16) * 0.00392156862745098;
		var g = ((color & 65280) >>> 8) * 0.00392156862745098;
		var b = (color & 255) * 0.00392156862745098;
		var a = (color >>> 24) * 0.00392156862745098 * opacity;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 3,a * 255 | 0);
		var right = tex.get_width() / tex.get_realWidth();
		var bottom = tex.get_height() / tex.get_realHeight();
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 12,0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 16,bottom,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 36,0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 40,0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 60,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 64,0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 84,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 88,bottom,true);
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex,bottomleftx,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 4,bottomlefty,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 8,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 24,topleftx,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 28,toplefty,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 32,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 48,toprightx,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 52,toprighty,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 56,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 72,bottomrightx,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 76,bottomrighty,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 80,-5.0,true);
		++kha_graphics4_ImageShaderPainter.bufferIndex;
		kha_graphics4_ImageShaderPainter.lastTexture = tex;
	}
	,drawImage2: function(img,sx,sy,sw,sh,bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty,opacity,color) {
		var tex = img;
		if(kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1 >= 1500 || kha_graphics4_ImageShaderPainter.lastTexture != null && tex != kha_graphics4_ImageShaderPainter.lastTexture) {
			this.drawBuffer(false);
		}
		var left = sx / tex.get_realWidth();
		var top = sy / tex.get_realHeight();
		var right = (sx + sw) / tex.get_realWidth();
		var bottom = (sy + sh) / tex.get_realHeight();
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 12,left,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 16,bottom,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 36,left,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 40,top,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 60,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 64,top,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 84,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 88,bottom,true);
		var r = ((color & 16711680) >>> 16) * 0.00392156862745098;
		var g = ((color & 65280) >>> 8) * 0.00392156862745098;
		var b = (color & 255) * 0.00392156862745098;
		var a = (color >>> 24) * 0.00392156862745098 * opacity;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 3,a * 255 | 0);
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex,bottomleftx,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 4,bottomlefty,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 8,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 24,topleftx,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 28,toplefty,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 32,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 48,toprightx,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 52,toprighty,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 56,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 72,bottomrightx,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 76,bottomrighty,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 80,-5.0,true);
		++kha_graphics4_ImageShaderPainter.bufferIndex;
		kha_graphics4_ImageShaderPainter.lastTexture = tex;
	}
	,drawImageScale: function(img,sx,sy,sw,sh,left,top,right,bottom,opacity,color) {
		var tex = img;
		if(kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1 >= 1500 || kha_graphics4_ImageShaderPainter.lastTexture != null && tex != kha_graphics4_ImageShaderPainter.lastTexture) {
			this.drawBuffer(false);
		}
		var left1 = sx / tex.get_realWidth();
		var top1 = sy / tex.get_realHeight();
		var right1 = (sx + sw) / tex.get_realWidth();
		var bottom1 = (sy + sh) / tex.get_realHeight();
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 12,left1,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 16,bottom1,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 36,left1,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 40,top1,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 60,right1,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 64,top1,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 84,right1,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 88,bottom1,true);
		var r = ((color & 16711680) >>> 16) * 0.00392156862745098;
		var g = ((color & 65280) >>> 8) * 0.00392156862745098;
		var b = (color & 255) * 0.00392156862745098;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 3,opacity * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 3,opacity * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 3,opacity * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 3,opacity * 255 | 0);
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex,left,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 4,bottom,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 8,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 24,left,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 28,top,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 32,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 48,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 52,top,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 56,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 72,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 76,bottom,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 80,-5.0,true);
		++kha_graphics4_ImageShaderPainter.bufferIndex;
		kha_graphics4_ImageShaderPainter.lastTexture = tex;
	}
	,end: function() {
		if(kha_graphics4_ImageShaderPainter.bufferIndex > 0) {
			this.drawBuffer(true);
		}
		kha_graphics4_ImageShaderPainter.lastTexture = null;
	}
	,__class__: kha_graphics4_ImageShaderPainter
};
var kha_graphics4_ColoredShaderPainter = function(g4) {
	this.myPipeline = null;
	this.g = g4;
	kha_graphics4_ColoredShaderPainter.bufferIndex = 0;
	kha_graphics4_ColoredShaderPainter.triangleBufferIndex = 0;
	kha_graphics4_ColoredShaderPainter.initShaders();
	this.myPipeline = kha_graphics4_ColoredShaderPainter.standardColorPipeline;
	this.initBuffers();
};
$hxClasses["kha.graphics4.ColoredShaderPainter"] = kha_graphics4_ColoredShaderPainter;
kha_graphics4_ColoredShaderPainter.__name__ = true;
kha_graphics4_ColoredShaderPainter.initShaders = function() {
	if(kha_graphics4_ColoredShaderPainter.structure == null) {
		kha_graphics4_ColoredShaderPainter.structure = kha_graphics4_Graphics2.createColoredVertexStructure();
	}
	if(kha_graphics4_ColoredShaderPainter.standardColorPipeline == null) {
		var pipeline = kha_graphics4_Graphics2.createColoredPipeline(kha_graphics4_ColoredShaderPainter.structure);
		kha_graphics4_ColoredShaderPainter.standardColorPipeline = new kha_graphics4_PerFramebufferPipelineCache(pipeline,false);
	}
};
kha_graphics4_ColoredShaderPainter.prototype = {
	projectionMatrix: null
	,g: null
	,myPipeline: null
	,get_pipeline: function() {
		return this.myPipeline;
	}
	,set_pipeline: function(pipe) {
		this.myPipeline = pipe != null ? pipe : kha_graphics4_ColoredShaderPainter.standardColorPipeline;
		return this.myPipeline;
	}
	,setProjection: function(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}
	,initBuffers: function() {
		if(kha_graphics4_ColoredShaderPainter.rectVertexBuffer == null) {
			kha_graphics4_ColoredShaderPainter.rectVertexBuffer = new kha_graphics4_VertexBuffer(4000,kha_graphics4_ColoredShaderPainter.structure,1);
			kha_graphics4_ColoredShaderPainter.rectVertices = kha_graphics4_ColoredShaderPainter.rectVertexBuffer.lock();
			kha_graphics4_ColoredShaderPainter.indexBuffer = new kha_graphics4_IndexBuffer(6000,0);
			var indices = kha_graphics4_ColoredShaderPainter.indexBuffer.lock();
			var _g = 0;
			while(_g < 1000) {
				var i = _g++;
				var k = i * 3 * 2;
				indices.setUint32(k * 4,i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp = k * 4;
				var k1 = i * 3 * 2 + 1;
				indices.setUint32(k1 * 4,i * 4 + 1,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp1 = k1 * 4;
				var k2 = i * 3 * 2 + 2;
				indices.setUint32(k2 * 4,i * 4 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp2 = k2 * 4;
				var k3 = i * 3 * 2 + 3;
				indices.setUint32(k3 * 4,i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp3 = k3 * 4;
				var k4 = i * 3 * 2 + 4;
				indices.setUint32(k4 * 4,i * 4 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp4 = k4 * 4;
				var k5 = i * 3 * 2 + 5;
				indices.setUint32(k5 * 4,i * 4 + 3,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp5 = k5 * 4;
			}
			kha_graphics4_ColoredShaderPainter.indexBuffer.unlock();
			kha_graphics4_ColoredShaderPainter.triangleVertexBuffer = new kha_graphics4_VertexBuffer(3000,kha_graphics4_ColoredShaderPainter.structure,1);
			kha_graphics4_ColoredShaderPainter.triangleVertices = kha_graphics4_ColoredShaderPainter.triangleVertexBuffer.lock();
			kha_graphics4_ColoredShaderPainter.triangleIndexBuffer = new kha_graphics4_IndexBuffer(3000,0);
			var triIndices = kha_graphics4_ColoredShaderPainter.triangleIndexBuffer.lock();
			var _g = 0;
			while(_g < 1000) {
				var i = _g++;
				var k = i * 3;
				triIndices.setUint32(k * 4,i * 3,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp = k * 4;
				var k1 = i * 3 + 1;
				triIndices.setUint32(k1 * 4,i * 3 + 1,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp1 = k1 * 4;
				var k2 = i * 3 + 2;
				triIndices.setUint32(k2 * 4,i * 3 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp2 = k2 * 4;
			}
			kha_graphics4_ColoredShaderPainter.triangleIndexBuffer.unlock();
		}
	}
	,setRectVertices: function(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		var baseIndex = kha_graphics4_ColoredShaderPainter.bufferIndex * 4 * 4;
		kha_graphics4_ColoredShaderPainter.rectVertices.setFloat32(baseIndex * 4,bottomleftx,true);
		kha_graphics4_ColoredShaderPainter.rectVertices.setFloat32((baseIndex + 1) * 4,bottomlefty,true);
		kha_graphics4_ColoredShaderPainter.rectVertices.setFloat32((baseIndex + 2) * 4,-5.0,true);
		kha_graphics4_ColoredShaderPainter.rectVertices.setFloat32((baseIndex + 4) * 4,topleftx,true);
		kha_graphics4_ColoredShaderPainter.rectVertices.setFloat32((baseIndex + 5) * 4,toplefty,true);
		kha_graphics4_ColoredShaderPainter.rectVertices.setFloat32((baseIndex + 6) * 4,-5.0,true);
		kha_graphics4_ColoredShaderPainter.rectVertices.setFloat32((baseIndex + 8) * 4,toprightx,true);
		kha_graphics4_ColoredShaderPainter.rectVertices.setFloat32((baseIndex + 9) * 4,toprighty,true);
		kha_graphics4_ColoredShaderPainter.rectVertices.setFloat32((baseIndex + 10) * 4,-5.0,true);
		kha_graphics4_ColoredShaderPainter.rectVertices.setFloat32((baseIndex + 12) * 4,bottomrightx,true);
		kha_graphics4_ColoredShaderPainter.rectVertices.setFloat32((baseIndex + 13) * 4,bottomrighty,true);
		kha_graphics4_ColoredShaderPainter.rectVertices.setFloat32((baseIndex + 14) * 4,-5.0,true);
	}
	,setRectColors: function(opacity,color) {
		var baseIndex = kha_graphics4_ColoredShaderPainter.bufferIndex * 4 * 4 * 4;
		var a = opacity * ((color >>> 24) * 0.00392156862745098);
		var r = a * (((color & 16711680) >>> 16) * 0.00392156862745098);
		var g = a * (((color & 65280) >>> 8) * 0.00392156862745098);
		var b = a * ((color & 255) * 0.00392156862745098);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 12,r * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 12 + 1,g * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 12 + 2,b * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 12 + 3,a * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 28,r * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 28 + 1,g * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 28 + 2,b * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 28 + 3,a * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 44,r * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 44 + 1,g * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 44 + 2,b * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 44 + 3,a * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 60,r * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 60 + 1,g * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 60 + 2,b * 255 | 0);
		kha_graphics4_ColoredShaderPainter.rectVertices.setUint8(baseIndex + 60 + 3,a * 255 | 0);
	}
	,setTriVertices: function(x1,y1,x2,y2,x3,y3) {
		var baseIndex = kha_graphics4_ColoredShaderPainter.triangleBufferIndex * 4 * 3;
		kha_graphics4_ColoredShaderPainter.triangleVertices.setFloat32(baseIndex * 4,x1,true);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setFloat32((baseIndex + 1) * 4,y1,true);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setFloat32((baseIndex + 2) * 4,-5.0,true);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setFloat32((baseIndex + 4) * 4,x2,true);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setFloat32((baseIndex + 5) * 4,y2,true);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setFloat32((baseIndex + 6) * 4,-5.0,true);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setFloat32((baseIndex + 8) * 4,x3,true);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setFloat32((baseIndex + 9) * 4,y3,true);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setFloat32((baseIndex + 10) * 4,-5.0,true);
	}
	,setTriColors: function(opacity,color) {
		var baseIndex = kha_graphics4_ColoredShaderPainter.triangleBufferIndex * 4 * 4 * 3;
		var a = opacity * ((color >>> 24) * 0.00392156862745098);
		var r = a * (((color & 16711680) >>> 16) * 0.00392156862745098);
		var g = a * (((color & 65280) >>> 8) * 0.00392156862745098);
		var b = a * ((color & 255) * 0.00392156862745098);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setUint8(baseIndex + 12,r * 255 | 0);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setUint8(baseIndex + 12 + 1,g * 255 | 0);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setUint8(baseIndex + 12 + 2,b * 255 | 0);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setUint8(baseIndex + 12 + 3,a * 255 | 0);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setUint8(baseIndex + 28,r * 255 | 0);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setUint8(baseIndex + 28 + 1,g * 255 | 0);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setUint8(baseIndex + 28 + 2,b * 255 | 0);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setUint8(baseIndex + 28 + 3,a * 255 | 0);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setUint8(baseIndex + 44,r * 255 | 0);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setUint8(baseIndex + 44 + 1,g * 255 | 0);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setUint8(baseIndex + 44 + 2,b * 255 | 0);
		kha_graphics4_ColoredShaderPainter.triangleVertices.setUint8(baseIndex + 44 + 3,a * 255 | 0);
	}
	,drawBuffer: function(trisDone) {
		if(kha_graphics4_ColoredShaderPainter.bufferIndex == 0) {
			return;
		}
		if(!trisDone) {
			if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
				this.drawTriBuffer(true);
			}
		}
		kha_graphics4_ColoredShaderPainter.rectVertexBuffer.unlock(kha_graphics4_ColoredShaderPainter.bufferIndex * 4);
		var pipeline = this.myPipeline.get(null,3);
		this.g.setPipeline(pipeline.pipeline);
		this.g.setVertexBuffer(kha_graphics4_ColoredShaderPainter.rectVertexBuffer);
		this.g.setIndexBuffer(kha_graphics4_ColoredShaderPainter.indexBuffer);
		this.g.setMatrix(pipeline.projectionLocation,this.projectionMatrix);
		this.g.drawIndexedVertices(0,kha_graphics4_ColoredShaderPainter.bufferIndex * 2 * 3);
		kha_graphics4_ColoredShaderPainter.bufferIndex = 0;
		kha_graphics4_ColoredShaderPainter.rectVertices = kha_graphics4_ColoredShaderPainter.rectVertexBuffer.lock();
	}
	,drawTriBuffer: function(rectsDone) {
		if(!rectsDone) {
			if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
				this.drawBuffer(true);
			}
		}
		kha_graphics4_ColoredShaderPainter.triangleVertexBuffer.unlock(kha_graphics4_ColoredShaderPainter.triangleBufferIndex * 3);
		var pipeline = this.myPipeline.get(null,3);
		this.g.setPipeline(pipeline.pipeline);
		this.g.setVertexBuffer(kha_graphics4_ColoredShaderPainter.triangleVertexBuffer);
		this.g.setIndexBuffer(kha_graphics4_ColoredShaderPainter.triangleIndexBuffer);
		this.g.setMatrix(pipeline.projectionLocation,this.projectionMatrix);
		this.g.drawIndexedVertices(0,kha_graphics4_ColoredShaderPainter.triangleBufferIndex * 3);
		kha_graphics4_ColoredShaderPainter.triangleBufferIndex = 0;
		kha_graphics4_ColoredShaderPainter.triangleVertices = kha_graphics4_ColoredShaderPainter.triangleVertexBuffer.lock();
	}
	,fillRect: function(opacity,color,bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			this.drawTriBuffer(true);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex + 1 >= 1000) {
			this.drawBuffer(false);
		}
		this.setRectColors(opacity,color);
		this.setRectVertices(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty);
		++kha_graphics4_ColoredShaderPainter.bufferIndex;
	}
	,fillTriangle: function(opacity,color,x1,y1,x2,y2,x3,y3) {
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			this.drawBuffer(true);
		}
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex + 1 >= 1000) {
			this.drawTriBuffer(false);
		}
		this.setTriColors(opacity,color);
		this.setTriVertices(x1,y1,x2,y2,x3,y3);
		++kha_graphics4_ColoredShaderPainter.triangleBufferIndex;
	}
	,endTris: function(rectsDone) {
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			this.drawTriBuffer(rectsDone);
		}
	}
	,endRects: function(trisDone) {
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			this.drawBuffer(trisDone);
		}
	}
	,end: function() {
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			this.drawBuffer(false);
		}
	}
	,__class__: kha_graphics4_ColoredShaderPainter
};
var kha_graphics4_TextShaderPainter = function(g4) {
	this.bakedQuadCache = new kha_AlignedQuad();
	this.bilinear = false;
	this.myPipeline = null;
	this.g = g4;
	kha_graphics4_TextShaderPainter.bufferIndex = 0;
	kha_graphics4_TextShaderPainter.initShaders();
	this.myPipeline = kha_graphics4_TextShaderPainter.standardTextPipeline;
	this.initBuffers();
};
$hxClasses["kha.graphics4.TextShaderPainter"] = kha_graphics4_TextShaderPainter;
kha_graphics4_TextShaderPainter.__name__ = true;
kha_graphics4_TextShaderPainter.initShaders = function() {
	if(kha_graphics4_TextShaderPainter.structure == null) {
		kha_graphics4_TextShaderPainter.structure = kha_graphics4_Graphics2.createTextVertexStructure();
	}
	if(kha_graphics4_TextShaderPainter.standardTextPipeline == null) {
		var pipeline = kha_graphics4_Graphics2.createTextPipeline(kha_graphics4_TextShaderPainter.structure);
		kha_graphics4_TextShaderPainter.standardTextPipeline = new kha_graphics4_PerFramebufferPipelineCache(pipeline,true);
	}
};
kha_graphics4_TextShaderPainter.findIndex = function(charCode) {
	var blocks = kha_KravurImage.charBlocks;
	var offset = 0;
	var _g = 0;
	var _g1 = blocks.length / 2 | 0;
	while(_g < _g1) {
		var i = _g++;
		var start = blocks[i * 2];
		var end = blocks[i * 2 + 1];
		if(charCode >= start && charCode <= end) {
			return offset + charCode - start;
		}
		offset += end - start + 1;
	}
	return 0;
};
kha_graphics4_TextShaderPainter.prototype = {
	projectionMatrix: null
	,font: null
	,g: null
	,myPipeline: null
	,fontSize: null
	,bilinear: null
	,get_pipeline: function() {
		return this.myPipeline;
	}
	,set_pipeline: function(pipe) {
		this.myPipeline = pipe != null ? pipe : kha_graphics4_TextShaderPainter.standardTextPipeline;
		return this.myPipeline;
	}
	,setProjection: function(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}
	,initBuffers: function() {
		if(kha_graphics4_TextShaderPainter.rectVertexBuffer == null) {
			kha_graphics4_TextShaderPainter.rectVertexBuffer = new kha_graphics4_VertexBuffer(4000,kha_graphics4_TextShaderPainter.structure,1);
			kha_graphics4_TextShaderPainter.rectVertices = kha_graphics4_TextShaderPainter.rectVertexBuffer.lock();
			kha_graphics4_TextShaderPainter.indexBuffer = new kha_graphics4_IndexBuffer(6000,0);
			var indices = kha_graphics4_TextShaderPainter.indexBuffer.lock();
			var _g = 0;
			while(_g < 1000) {
				var i = _g++;
				var k = i * 3 * 2;
				indices.setUint32(k * 4,i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp = k * 4;
				var k1 = i * 3 * 2 + 1;
				indices.setUint32(k1 * 4,i * 4 + 1,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp1 = k1 * 4;
				var k2 = i * 3 * 2 + 2;
				indices.setUint32(k2 * 4,i * 4 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp2 = k2 * 4;
				var k3 = i * 3 * 2 + 3;
				indices.setUint32(k3 * 4,i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp3 = k3 * 4;
				var k4 = i * 3 * 2 + 4;
				indices.setUint32(k4 * 4,i * 4 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp4 = k4 * 4;
				var k5 = i * 3 * 2 + 5;
				indices.setUint32(k5 * 4,i * 4 + 3,kha_arrays_ByteArray.LITTLE_ENDIAN);
				var tmp5 = k5 * 4;
			}
			kha_graphics4_TextShaderPainter.indexBuffer.unlock();
		}
	}
	,setRectVertices: function(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		var baseIndex = kha_graphics4_TextShaderPainter.bufferIndex * 9 * 4;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32(baseIndex * 4,bottomleftx,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 1) * 4,bottomlefty,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 2) * 4,-5.0,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 9) * 4,topleftx,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 10) * 4,toplefty,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 11) * 4,-5.0,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 18) * 4,toprightx,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 19) * 4,toprighty,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 20) * 4,-5.0,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 27) * 4,bottomrightx,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 28) * 4,bottomrighty,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 29) * 4,-5.0,true);
	}
	,setRectTexCoords: function(left,top,right,bottom) {
		var baseIndex = kha_graphics4_TextShaderPainter.bufferIndex * 9 * 4;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 3) * 4,left,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 4) * 4,bottom,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 12) * 4,left,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 13) * 4,top,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 21) * 4,right,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 22) * 4,top,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 30) * 4,right,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 31) * 4,bottom,true);
	}
	,setRectColors: function(opacity,color) {
		var baseIndex = kha_graphics4_TextShaderPainter.bufferIndex * 9 * 4;
		var a = opacity * ((color >>> 24) * 0.00392156862745098);
		var v = ((color & 16711680) >>> 16) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 5) * 4,v,true);
		var v = ((color & 65280) >>> 8) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 6) * 4,v,true);
		var v = (color & 255) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 7) * 4,v,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 8) * 4,a,true);
		var v = ((color & 16711680) >>> 16) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 14) * 4,v,true);
		var v = ((color & 65280) >>> 8) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 15) * 4,v,true);
		var v = (color & 255) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 16) * 4,v,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 17) * 4,a,true);
		var v = ((color & 16711680) >>> 16) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 23) * 4,v,true);
		var v = ((color & 65280) >>> 8) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 24) * 4,v,true);
		var v = (color & 255) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 25) * 4,v,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 26) * 4,a,true);
		var v = ((color & 16711680) >>> 16) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 32) * 4,v,true);
		var v = ((color & 65280) >>> 8) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 33) * 4,v,true);
		var v = (color & 255) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 34) * 4,v,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 35) * 4,a,true);
	}
	,drawBuffer: function() {
		if(kha_graphics4_TextShaderPainter.bufferIndex == 0) {
			return;
		}
		kha_graphics4_TextShaderPainter.rectVertexBuffer.unlock(kha_graphics4_TextShaderPainter.bufferIndex * 4);
		var pipeline = this.myPipeline.get(null,3);
		this.g.setPipeline(pipeline.pipeline);
		this.g.setVertexBuffer(kha_graphics4_TextShaderPainter.rectVertexBuffer);
		this.g.setIndexBuffer(kha_graphics4_TextShaderPainter.indexBuffer);
		this.g.setMatrix(pipeline.projectionLocation,this.projectionMatrix);
		this.g.setTexture(pipeline.textureLocation,kha_graphics4_TextShaderPainter.lastTexture);
		this.g.setTextureParameters(pipeline.textureLocation,2,2,this.bilinear ? 1 : 0,this.bilinear ? 1 : 0,0);
		this.g.drawIndexedVertices(0,kha_graphics4_TextShaderPainter.bufferIndex * 2 * 3);
		this.g.setTexture(pipeline.textureLocation,null);
		kha_graphics4_TextShaderPainter.bufferIndex = 0;
		kha_graphics4_TextShaderPainter.rectVertices = kha_graphics4_TextShaderPainter.rectVertexBuffer.lock();
	}
	,setBilinearFilter: function(bilinear) {
		this.end();
		this.bilinear = bilinear;
	}
	,setFont: function(font) {
		this.font = js_Boot.__cast(font , kha_Kravur);
	}
	,bakedQuadCache: null
	,drawString: function(text,opacity,color,x,y,transformation) {
		var font = this.font._get(this.fontSize);
		var tex = font.getTexture();
		if(kha_graphics4_TextShaderPainter.lastTexture != null && tex != kha_graphics4_TextShaderPainter.lastTexture) {
			this.drawBuffer();
		}
		kha_graphics4_TextShaderPainter.lastTexture = tex;
		var xpos = x;
		var ypos = y;
		var _g = 0;
		var _g1 = text.length;
		while(_g < _g1) {
			var i = _g++;
			var charCode = text.charCodeAt(i);
			var q = font.getBakedQuad(this.bakedQuadCache,kha_graphics4_TextShaderPainter.findIndex(charCode),xpos,ypos);
			if(q != null) {
				if(kha_graphics4_TextShaderPainter.bufferIndex + 1 >= 1000) {
					this.drawBuffer();
				}
				this.setRectColors(opacity,color);
				this.setRectTexCoords(q.s0 * tex.get_width() / tex.get_realWidth(),q.t0 * tex.get_height() / tex.get_realHeight(),q.s1 * tex.get_width() / tex.get_realWidth(),q.t1 * tex.get_height() / tex.get_realHeight());
				var x = q.x0;
				var y = q.y1;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var value_x = x;
				var value_y = y;
				var w = transformation._02 * value_x + transformation._12 * value_y + transformation._22;
				var x1 = (transformation._00 * value_x + transformation._10 * value_y + transformation._20) / w;
				var y1 = (transformation._01 * value_x + transformation._11 * value_y + transformation._21) / w;
				var x2 = x1;
				var y2 = y1;
				if(y2 == null) {
					y2 = 0;
				}
				if(x2 == null) {
					x2 = 0;
				}
				var p0_x = x2;
				var p0_y = y2;
				var x3 = q.x0;
				var y3 = q.y0;
				if(y3 == null) {
					y3 = 0;
				}
				if(x3 == null) {
					x3 = 0;
				}
				var value_x1 = x3;
				var value_y1 = y3;
				var w1 = transformation._02 * value_x1 + transformation._12 * value_y1 + transformation._22;
				var x4 = (transformation._00 * value_x1 + transformation._10 * value_y1 + transformation._20) / w1;
				var y4 = (transformation._01 * value_x1 + transformation._11 * value_y1 + transformation._21) / w1;
				var x5 = x4;
				var y5 = y4;
				if(y5 == null) {
					y5 = 0;
				}
				if(x5 == null) {
					x5 = 0;
				}
				var p1_x = x5;
				var p1_y = y5;
				var x6 = q.x1;
				var y6 = q.y0;
				if(y6 == null) {
					y6 = 0;
				}
				if(x6 == null) {
					x6 = 0;
				}
				var value_x2 = x6;
				var value_y2 = y6;
				var w2 = transformation._02 * value_x2 + transformation._12 * value_y2 + transformation._22;
				var x7 = (transformation._00 * value_x2 + transformation._10 * value_y2 + transformation._20) / w2;
				var y7 = (transformation._01 * value_x2 + transformation._11 * value_y2 + transformation._21) / w2;
				var x8 = x7;
				var y8 = y7;
				if(y8 == null) {
					y8 = 0;
				}
				if(x8 == null) {
					x8 = 0;
				}
				var p2_x = x8;
				var p2_y = y8;
				var x9 = q.x1;
				var y9 = q.y1;
				if(y9 == null) {
					y9 = 0;
				}
				if(x9 == null) {
					x9 = 0;
				}
				var value_x3 = x9;
				var value_y3 = y9;
				var w3 = transformation._02 * value_x3 + transformation._12 * value_y3 + transformation._22;
				var x10 = (transformation._00 * value_x3 + transformation._10 * value_y3 + transformation._20) / w3;
				var y10 = (transformation._01 * value_x3 + transformation._11 * value_y3 + transformation._21) / w3;
				var x11 = x10;
				var y11 = y10;
				if(y11 == null) {
					y11 = 0;
				}
				if(x11 == null) {
					x11 = 0;
				}
				var p3_x = x11;
				var p3_y = y11;
				this.setRectVertices(p0_x,p0_y,p1_x,p1_y,p2_x,p2_y,p3_x,p3_y);
				xpos += q.xadvance;
				++kha_graphics4_TextShaderPainter.bufferIndex;
			}
		}
	}
	,drawCharacters: function(text,start,length,opacity,color,x,y,transformation) {
		var font = this.font._get(this.fontSize);
		var tex = font.getTexture();
		if(kha_graphics4_TextShaderPainter.lastTexture != null && tex != kha_graphics4_TextShaderPainter.lastTexture) {
			this.drawBuffer();
		}
		kha_graphics4_TextShaderPainter.lastTexture = tex;
		var xpos = x;
		var ypos = y;
		var _g = start;
		var _g1 = start + length;
		while(_g < _g1) {
			var i = _g++;
			var q = font.getBakedQuad(this.bakedQuadCache,kha_graphics4_TextShaderPainter.findIndex(text[i]),xpos,ypos);
			if(q != null) {
				if(kha_graphics4_TextShaderPainter.bufferIndex + 1 >= 1000) {
					this.drawBuffer();
				}
				this.setRectColors(opacity,color);
				this.setRectTexCoords(q.s0 * tex.get_width() / tex.get_realWidth(),q.t0 * tex.get_height() / tex.get_realHeight(),q.s1 * tex.get_width() / tex.get_realWidth(),q.t1 * tex.get_height() / tex.get_realHeight());
				var x = q.x0;
				var y = q.y1;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var value_x = x;
				var value_y = y;
				var w = transformation._02 * value_x + transformation._12 * value_y + transformation._22;
				var x1 = (transformation._00 * value_x + transformation._10 * value_y + transformation._20) / w;
				var y1 = (transformation._01 * value_x + transformation._11 * value_y + transformation._21) / w;
				var x2 = x1;
				var y2 = y1;
				if(y2 == null) {
					y2 = 0;
				}
				if(x2 == null) {
					x2 = 0;
				}
				var p0_x = x2;
				var p0_y = y2;
				var x3 = q.x0;
				var y3 = q.y0;
				if(y3 == null) {
					y3 = 0;
				}
				if(x3 == null) {
					x3 = 0;
				}
				var value_x1 = x3;
				var value_y1 = y3;
				var w1 = transformation._02 * value_x1 + transformation._12 * value_y1 + transformation._22;
				var x4 = (transformation._00 * value_x1 + transformation._10 * value_y1 + transformation._20) / w1;
				var y4 = (transformation._01 * value_x1 + transformation._11 * value_y1 + transformation._21) / w1;
				var x5 = x4;
				var y5 = y4;
				if(y5 == null) {
					y5 = 0;
				}
				if(x5 == null) {
					x5 = 0;
				}
				var p1_x = x5;
				var p1_y = y5;
				var x6 = q.x1;
				var y6 = q.y0;
				if(y6 == null) {
					y6 = 0;
				}
				if(x6 == null) {
					x6 = 0;
				}
				var value_x2 = x6;
				var value_y2 = y6;
				var w2 = transformation._02 * value_x2 + transformation._12 * value_y2 + transformation._22;
				var x7 = (transformation._00 * value_x2 + transformation._10 * value_y2 + transformation._20) / w2;
				var y7 = (transformation._01 * value_x2 + transformation._11 * value_y2 + transformation._21) / w2;
				var x8 = x7;
				var y8 = y7;
				if(y8 == null) {
					y8 = 0;
				}
				if(x8 == null) {
					x8 = 0;
				}
				var p2_x = x8;
				var p2_y = y8;
				var x9 = q.x1;
				var y9 = q.y1;
				if(y9 == null) {
					y9 = 0;
				}
				if(x9 == null) {
					x9 = 0;
				}
				var value_x3 = x9;
				var value_y3 = y9;
				var w3 = transformation._02 * value_x3 + transformation._12 * value_y3 + transformation._22;
				var x10 = (transformation._00 * value_x3 + transformation._10 * value_y3 + transformation._20) / w3;
				var y10 = (transformation._01 * value_x3 + transformation._11 * value_y3 + transformation._21) / w3;
				var x11 = x10;
				var y11 = y10;
				if(y11 == null) {
					y11 = 0;
				}
				if(x11 == null) {
					x11 = 0;
				}
				var p3_x = x11;
				var p3_y = y11;
				this.setRectVertices(p0_x,p0_y,p1_x,p1_y,p2_x,p2_y,p3_x,p3_y);
				xpos += q.xadvance;
				++kha_graphics4_TextShaderPainter.bufferIndex;
			}
		}
	}
	,end: function() {
		if(kha_graphics4_TextShaderPainter.bufferIndex > 0) {
			this.drawBuffer();
		}
		kha_graphics4_TextShaderPainter.lastTexture = null;
	}
	,__class__: kha_graphics4_TextShaderPainter
};
var kha_graphics4_Graphics2 = function(canvas) {
	this.scissorH = -1;
	this.scissorW = -1;
	this.scissorY = -1;
	this.scissorX = -1;
	this.scissorEnabled = false;
	this.lastPipeline = null;
	this.pipelineCache = new haxe_ds_ObjectMap();
	this.myMipmapScaleQuality = 0;
	this.myImageScaleQuality = 0;
	kha_graphics2_Graphics.call(this);
	this.set_color(-1);
	this.canvas = canvas;
	this.g = canvas.get_g4();
	this.imagePainter = new kha_graphics4_ImageShaderPainter(this.g);
	this.coloredPainter = new kha_graphics4_ColoredShaderPainter(this.g);
	this.textPainter = new kha_graphics4_TextShaderPainter(this.g);
	this.textPainter.fontSize = this.get_fontSize();
	this.projectionMatrix = new kha_math_FastMatrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
	this.setProjection();
	if(kha_graphics4_Graphics2.videoPipeline == null) {
		kha_graphics4_Graphics2.videoPipeline = kha_graphics4_Graphics2.createImagePipeline(kha_graphics4_Graphics2.createImageVertexStructure());
		kha_graphics4_Graphics2.videoPipeline.fragmentShader = kha_Shaders.painter_video_frag;
		kha_graphics4_Graphics2.videoPipeline.vertexShader = kha_Shaders.painter_video_vert;
		kha_graphics4_Graphics2.videoPipeline.compile();
	}
};
$hxClasses["kha.graphics4.Graphics2"] = kha_graphics4_Graphics2;
kha_graphics4_Graphics2.__name__ = true;
kha_graphics4_Graphics2.upperPowerOfTwo = function(v) {
	--v;
	v |= v >>> 1;
	v |= v >>> 2;
	v |= v >>> 4;
	v |= v >>> 8;
	v |= v >>> 16;
	return ++v;
};
kha_graphics4_Graphics2.createImageVertexStructure = function() {
	var structure = new kha_graphics4_VertexStructure();
	structure.add("vertexPosition",2);
	structure.add("vertexUV",1);
	structure.add("vertexColor",16);
	return structure;
};
kha_graphics4_Graphics2.createImagePipeline = function(structure) {
	var shaderPipeline = new kha_graphics4_PipelineState();
	shaderPipeline.fragmentShader = kha_Shaders.painter_image_frag;
	shaderPipeline.vertexShader = kha_Shaders.painter_image_vert;
	shaderPipeline.inputLayout = [structure];
	shaderPipeline.blendSource = 1;
	shaderPipeline.blendDestination = 5;
	shaderPipeline.alphaBlendSource = 1;
	shaderPipeline.alphaBlendDestination = 5;
	return shaderPipeline;
};
kha_graphics4_Graphics2.createColoredVertexStructure = function() {
	var structure = new kha_graphics4_VertexStructure();
	structure.add("vertexPosition",2);
	structure.add("vertexColor",16);
	return structure;
};
kha_graphics4_Graphics2.createColoredPipeline = function(structure) {
	var shaderPipeline = new kha_graphics4_PipelineState();
	shaderPipeline.fragmentShader = kha_Shaders.painter_colored_frag;
	shaderPipeline.vertexShader = kha_Shaders.painter_colored_vert;
	shaderPipeline.inputLayout = [structure];
	shaderPipeline.blendSource = 1;
	shaderPipeline.blendDestination = 5;
	shaderPipeline.alphaBlendSource = 1;
	shaderPipeline.alphaBlendDestination = 5;
	return shaderPipeline;
};
kha_graphics4_Graphics2.createTextVertexStructure = function() {
	var structure = new kha_graphics4_VertexStructure();
	structure.add("vertexPosition",2);
	structure.add("vertexUV",1);
	structure.add("vertexColor",3);
	return structure;
};
kha_graphics4_Graphics2.createTextPipeline = function(structure) {
	var shaderPipeline = new kha_graphics4_PipelineState();
	shaderPipeline.fragmentShader = kha_Shaders.painter_text_frag;
	shaderPipeline.vertexShader = kha_Shaders.painter_text_vert;
	shaderPipeline.inputLayout = [structure];
	shaderPipeline.blendSource = 3;
	shaderPipeline.blendDestination = 5;
	shaderPipeline.alphaBlendSource = 3;
	shaderPipeline.alphaBlendDestination = 5;
	return shaderPipeline;
};
kha_graphics4_Graphics2.__super__ = kha_graphics2_Graphics;
kha_graphics4_Graphics2.prototype = $extend(kha_graphics2_Graphics.prototype,{
	myColor: null
	,myFont: null
	,projectionMatrix: null
	,imagePainter: null
	,coloredPainter: null
	,textPainter: null
	,canvas: null
	,g: null
	,setProjection: function() {
		var width = this.canvas.get_width();
		var height = this.canvas.get_height();
		if(((this.canvas) instanceof kha_Framebuffer)) {
			var _this = this.projectionMatrix;
			var tx = -width / width;
			var ty = -height / (0 - height);
			var tz = -1.0002000200020003;
			var m__00 = 2 / width;
			var m__10 = 0;
			var m__20 = 0;
			var m__30 = tx;
			var m__01 = 0;
			var m__11 = 2.0 / (0 - height);
			var m__21 = 0;
			var m__31 = ty;
			var m__02 = 0;
			var m__12 = 0;
			var m__22 = -0.002000200020002;
			var m__32 = tz;
			var m__03 = 0;
			var m__13 = 0;
			var m__23 = 0;
			var m__33 = 1;
			_this._00 = m__00;
			_this._10 = m__10;
			_this._20 = m__20;
			_this._30 = m__30;
			_this._01 = m__01;
			_this._11 = m__11;
			_this._21 = m__21;
			_this._31 = m__31;
			_this._02 = m__02;
			_this._12 = m__12;
			_this._22 = m__22;
			_this._32 = m__32;
			_this._03 = m__03;
			_this._13 = m__13;
			_this._23 = m__23;
			_this._33 = m__33;
		} else {
			if(!kha_Image.get_nonPow2Supported()) {
				width = kha_graphics4_Graphics2.upperPowerOfTwo(width);
				height = kha_graphics4_Graphics2.upperPowerOfTwo(height);
			}
			if(kha_Image.renderTargetsInvertedY()) {
				var _this = this.projectionMatrix;
				var tx = -width / width;
				var ty = -height / height;
				var tz = -1.0002000200020003;
				var m__00 = 2 / width;
				var m__10 = 0;
				var m__20 = 0;
				var m__30 = tx;
				var m__01 = 0;
				var m__11 = 2.0 / height;
				var m__21 = 0;
				var m__31 = ty;
				var m__02 = 0;
				var m__12 = 0;
				var m__22 = -0.002000200020002;
				var m__32 = tz;
				var m__03 = 0;
				var m__13 = 0;
				var m__23 = 0;
				var m__33 = 1;
				_this._00 = m__00;
				_this._10 = m__10;
				_this._20 = m__20;
				_this._30 = m__30;
				_this._01 = m__01;
				_this._11 = m__11;
				_this._21 = m__21;
				_this._31 = m__31;
				_this._02 = m__02;
				_this._12 = m__12;
				_this._22 = m__22;
				_this._32 = m__32;
				_this._03 = m__03;
				_this._13 = m__13;
				_this._23 = m__23;
				_this._33 = m__33;
			} else {
				var _this = this.projectionMatrix;
				var tx = -width / width;
				var ty = -height / (0 - height);
				var tz = -1.0002000200020003;
				var m__00 = 2 / width;
				var m__10 = 0;
				var m__20 = 0;
				var m__30 = tx;
				var m__01 = 0;
				var m__11 = 2.0 / (0 - height);
				var m__21 = 0;
				var m__31 = ty;
				var m__02 = 0;
				var m__12 = 0;
				var m__22 = -0.002000200020002;
				var m__32 = tz;
				var m__03 = 0;
				var m__13 = 0;
				var m__23 = 0;
				var m__33 = 1;
				_this._00 = m__00;
				_this._10 = m__10;
				_this._20 = m__20;
				_this._30 = m__30;
				_this._01 = m__01;
				_this._11 = m__11;
				_this._21 = m__21;
				_this._31 = m__31;
				_this._02 = m__02;
				_this._12 = m__12;
				_this._22 = m__22;
				_this._32 = m__32;
				_this._03 = m__03;
				_this._13 = m__13;
				_this._23 = m__23;
				_this._33 = m__33;
			}
		}
		this.imagePainter.setProjection(this.projectionMatrix);
		this.coloredPainter.setProjection(this.projectionMatrix);
		this.textPainter.setProjection(this.projectionMatrix);
	}
	,drawImage: function(img,x,y) {
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
		this.textPainter.end();
		var xw = x + img.get_width();
		var yh = y + img.get_height();
		var _this = this.transformations[this.transformationIndex];
		var x1 = x;
		var y1 = yh;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p1_x = x2;
		var p1_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p2_x = x1;
		var p2_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x = xw;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p3_x = x1;
		var p3_y = y1;
		var _this = this.transformations[this.transformationIndex];
		var x = xw;
		var y = yh;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p4_x = x1;
		var p4_y = y1;
		var _this = this.imagePainter;
		var opacity = this.get_opacity();
		var color = this.get_color();
		var tex = img;
		if(kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1 >= 1500 || kha_graphics4_ImageShaderPainter.lastTexture != null && tex != kha_graphics4_ImageShaderPainter.lastTexture) {
			_this.drawBuffer(false);
		}
		var r = ((color & 16711680) >>> 16) * 0.00392156862745098;
		var g = ((color & 65280) >>> 8) * 0.00392156862745098;
		var b = (color & 255) * 0.00392156862745098;
		var a = (color >>> 24) * 0.00392156862745098 * opacity;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 3,a * 255 | 0);
		var right = tex.get_width() / tex.get_realWidth();
		var bottom = tex.get_height() / tex.get_realHeight();
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 12,0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 16,bottom,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 36,0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 40,0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 60,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 64,0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 84,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 88,bottom,true);
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex,p1_x,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 4,p1_y,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 8,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 24,p2_x,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 28,p2_y,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 32,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 48,p3_x,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 52,p3_y,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 56,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 72,p4_x,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 76,p4_y,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 80,-5.0,true);
		++kha_graphics4_ImageShaderPainter.bufferIndex;
		kha_graphics4_ImageShaderPainter.lastTexture = tex;
	}
	,drawScaledSubImage: function(img,sx,sy,sw,sh,dx,dy,dw,dh) {
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
		this.textPainter.end();
		var _this = this.transformations[this.transformationIndex];
		var x = dx;
		var y = dy + dh;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p1_x = x1;
		var p1_y = y1;
		var _this = this.transformations[this.transformationIndex];
		var x = dx;
		var y = dy;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p2_x = x1;
		var p2_y = y1;
		var _this = this.transformations[this.transformationIndex];
		var x = dx + dw;
		var y = dy;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p3_x = x1;
		var p3_y = y1;
		var _this = this.transformations[this.transformationIndex];
		var x = dx + dw;
		var y = dy + dh;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p4_x = x1;
		var p4_y = y1;
		var _this = this.imagePainter;
		var opacity = this.get_opacity();
		var color = this.get_color();
		var tex = img;
		if(kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1 >= 1500 || kha_graphics4_ImageShaderPainter.lastTexture != null && tex != kha_graphics4_ImageShaderPainter.lastTexture) {
			_this.drawBuffer(false);
		}
		var left = sx / tex.get_realWidth();
		var top = sy / tex.get_realHeight();
		var right = (sx + sw) / tex.get_realWidth();
		var bottom = (sy + sh) / tex.get_realHeight();
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 12,left,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 16,bottom,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 36,left,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 40,top,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 60,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 64,top,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 84,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 88,bottom,true);
		var r = ((color & 16711680) >>> 16) * 0.00392156862745098;
		var g = ((color & 65280) >>> 8) * 0.00392156862745098;
		var b = (color & 255) * 0.00392156862745098;
		var a = (color >>> 24) * 0.00392156862745098 * opacity;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 20 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 44 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 68 + 3,a * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92,r * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 1,g * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 2,b * 255 | 0);
		kha_graphics4_ImageShaderPainter.rectVertices.setUint8(baseIndex + 92 + 3,a * 255 | 0);
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 6 * 4 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex,p1_x,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 4,p1_y,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 8,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 24,p2_x,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 28,p2_y,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 32,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 48,p3_x,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 52,p3_y,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 56,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 72,p4_x,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 76,p4_y,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex + 80,-5.0,true);
		++kha_graphics4_ImageShaderPainter.bufferIndex;
		kha_graphics4_ImageShaderPainter.lastTexture = tex;
	}
	,get_color: function() {
		return this.myColor;
	}
	,set_color: function(color) {
		return this.myColor = color;
	}
	,drawRect: function(x,y,width,height,strength) {
		if(strength == null) {
			strength = 1.0;
		}
		this.imagePainter.end();
		this.textPainter.end();
		var _this = this.transformations[this.transformationIndex];
		var x1 = x - strength / 2;
		var y1 = y + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p1_x = x2;
		var p1_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x - strength / 2;
		var y1 = y - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p2_x = x2;
		var p2_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width + strength / 2;
		var y1 = y - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p3_x = x2;
		var p3_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width + strength / 2;
		var y1 = y + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p4_x = x2;
		var p4_y = y2;
		this.coloredPainter.fillRect(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y,p4_x,p4_y);
		var _this = this.transformations[this.transformationIndex];
		var x1 = x - strength / 2;
		var y1 = y + height - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p1_x = v_x;
		p1_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x - strength / 2;
		var y1 = y + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p2_x = v_x;
		p2_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + strength / 2;
		var y1 = y + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p3_x = v_x;
		p3_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + strength / 2;
		var y1 = y + height - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p4_x = v_x;
		p4_y = v_y;
		this.coloredPainter.fillRect(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y,p4_x,p4_y);
		var _this = this.transformations[this.transformationIndex];
		var x1 = x - strength / 2;
		var y1 = y + height + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p1_x = v_x;
		p1_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x - strength / 2;
		var y1 = y + height - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p2_x = v_x;
		p2_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width + strength / 2;
		var y1 = y + height - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p3_x = v_x;
		p3_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width + strength / 2;
		var y1 = y + height + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p4_x = v_x;
		p4_y = v_y;
		this.coloredPainter.fillRect(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y,p4_x,p4_y);
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width - strength / 2;
		var y1 = y + height - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p1_x = v_x;
		p1_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width - strength / 2;
		var y1 = y + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p2_x = v_x;
		p2_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width + strength / 2;
		var y1 = y + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p3_x = v_x;
		p3_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width + strength / 2;
		var y1 = y + height - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var v_x = x1;
		var v_y = y1;
		p4_x = v_x;
		p4_y = v_y;
		this.coloredPainter.fillRect(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y,p4_x,p4_y);
	}
	,fillRect: function(x,y,width,height) {
		this.imagePainter.end();
		this.textPainter.end();
		var _this = this.transformations[this.transformationIndex];
		var x1 = x;
		var y1 = y + height;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p1_x = x2;
		var p1_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p2_x = x2;
		var p2_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p3_x = x2;
		var p3_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width;
		var y1 = y + height;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p4_x = x1;
		var p4_y = y1;
		this.coloredPainter.fillRect(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y,p4_x,p4_y);
	}
	,drawString: function(text,x,y) {
		this.imagePainter.end();
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
		this.textPainter.drawString(text,this.get_opacity(),this.get_color(),x,y,this.transformations[this.transformationIndex]);
	}
	,drawCharacters: function(text,start,length,x,y) {
		this.imagePainter.end();
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
		this.textPainter.drawCharacters(text,start,length,this.get_opacity(),this.get_color(),x,y,this.transformations[this.transformationIndex]);
	}
	,get_font: function() {
		return this.myFont;
	}
	,set_font: function(font) {
		this.textPainter.setFont(font);
		return this.myFont = font;
	}
	,set_fontSize: function(value) {
		return kha_graphics2_Graphics.prototype.set_fontSize.call(this,this.textPainter.fontSize = value);
	}
	,drawLine: function(x1,y1,x2,y2,strength) {
		if(strength == null) {
			strength = 1.0;
		}
		this.imagePainter.end();
		this.textPainter.end();
		var vec_x = 0;
		var vec_y = 0;
		if(y2 == y1) {
			var x = 0;
			var y = -1;
			if(y == null) {
				y = 0;
			}
			if(x == null) {
				x = 0;
			}
			var v_x = x;
			var v_y = y;
			vec_x = v_x;
			vec_y = v_y;
		} else {
			var x = 1;
			var y = -(x2 - x1) / (y2 - y1);
			if(y == null) {
				y = 0;
			}
			if(x == null) {
				x = 0;
			}
			var v_x = x;
			var v_y = y;
			vec_x = v_x;
			vec_y = v_y;
		}
		var currentLength = Math.sqrt(vec_x * vec_x + vec_y * vec_y);
		if(currentLength != 0) {
			var mul = strength / currentLength;
			vec_x *= mul;
			vec_y *= mul;
		}
		var x = x1 + 0.5 * vec_x;
		var y = y1 + 0.5 * vec_y;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var p1_x = x;
		var p1_y = y;
		var x = x2 + 0.5 * vec_x;
		var y = y2 + 0.5 * vec_y;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var p2_x = x;
		var p2_y = y;
		var x = p1_x - vec_x;
		var y = p1_y - vec_y;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var p3_x = x;
		var p3_y = y;
		var x = p2_x - vec_x;
		var y = p2_y - vec_y;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var p4_x = x;
		var p4_y = y;
		var _this = this.transformations[this.transformationIndex];
		var w = _this._02 * p1_x + _this._12 * p1_y + _this._22;
		var x = (_this._00 * p1_x + _this._10 * p1_y + _this._20) / w;
		var y = (_this._01 * p1_x + _this._11 * p1_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var v_x = x1;
		var v_y = y1;
		p1_x = v_x;
		p1_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var w = _this._02 * p2_x + _this._12 * p2_y + _this._22;
		var x = (_this._00 * p2_x + _this._10 * p2_y + _this._20) / w;
		var y = (_this._01 * p2_x + _this._11 * p2_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var v_x = x1;
		var v_y = y1;
		p2_x = v_x;
		p2_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var w = _this._02 * p3_x + _this._12 * p3_y + _this._22;
		var x = (_this._00 * p3_x + _this._10 * p3_y + _this._20) / w;
		var y = (_this._01 * p3_x + _this._11 * p3_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var v_x = x1;
		var v_y = y1;
		p3_x = v_x;
		p3_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var w = _this._02 * p4_x + _this._12 * p4_y + _this._22;
		var x = (_this._00 * p4_x + _this._10 * p4_y + _this._20) / w;
		var y = (_this._01 * p4_x + _this._11 * p4_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var v_x = x1;
		var v_y = y1;
		p4_x = v_x;
		p4_y = v_y;
		this.coloredPainter.fillTriangle(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y);
		this.coloredPainter.fillTriangle(this.get_opacity(),this.get_color(),p3_x,p3_y,p2_x,p2_y,p4_x,p4_y);
	}
	,fillTriangle: function(x1,y1,x2,y2,x3,y3) {
		this.imagePainter.end();
		this.textPainter.end();
		var _this = this.transformations[this.transformationIndex];
		var x = x1;
		var y = y1;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p1_x = x1;
		var p1_y = y1;
		var _this = this.transformations[this.transformationIndex];
		var x = x2;
		var y = y2;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p2_x = x1;
		var p2_y = y1;
		var _this = this.transformations[this.transformationIndex];
		var x = x3;
		var y = y3;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p3_x = x1;
		var p3_y = y1;
		this.coloredPainter.fillTriangle(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y);
	}
	,myImageScaleQuality: null
	,get_imageScaleQuality: function() {
		return this.myImageScaleQuality;
	}
	,set_imageScaleQuality: function(value) {
		if(value == this.myImageScaleQuality) {
			return value;
		}
		this.imagePainter.setBilinearFilter(value == 1);
		this.textPainter.setBilinearFilter(value == 1);
		return this.myImageScaleQuality = value;
	}
	,myMipmapScaleQuality: null
	,get_mipmapScaleQuality: function() {
		return this.myMipmapScaleQuality;
	}
	,set_mipmapScaleQuality: function(value) {
		this.imagePainter.setBilinearMipmapFilter(value == 1);
		return this.myMipmapScaleQuality = value;
	}
	,pipelineCache: null
	,lastPipeline: null
	,setPipeline: function(pipeline) {
		if(pipeline == this.lastPipeline) {
			return;
		}
		this.lastPipeline = pipeline;
		this.flush();
		if(pipeline == null) {
			this.imagePainter.set_pipeline(null);
			this.coloredPainter.set_pipeline(null);
			this.textPainter.set_pipeline(null);
		} else {
			var cache = this.pipelineCache.h[pipeline.__id__];
			if(cache == null) {
				cache = new kha_graphics4_SimplePipelineCache(pipeline,true);
				this.pipelineCache.set(pipeline,cache);
			}
			this.imagePainter.set_pipeline(cache);
			this.coloredPainter.set_pipeline(cache);
			this.textPainter.set_pipeline(cache);
		}
	}
	,scissorEnabled: null
	,scissorX: null
	,scissorY: null
	,scissorW: null
	,scissorH: null
	,scissor: function(x,y,width,height) {
		this.scissorEnabled = true;
		this.scissorX = x;
		this.scissorY = y;
		this.scissorW = width;
		this.scissorH = height;
		this.flush();
		this.g.scissor(x,y,width,height);
	}
	,disableScissor: function() {
		this.scissorEnabled = false;
		this.flush();
		this.g.disableScissor();
	}
	,begin: function(clear,clearColor) {
		if(clear == null) {
			clear = true;
		}
		if(kha_graphics4_Graphics2.current == null) {
			kha_graphics4_Graphics2.current = this;
		} else {
			throw haxe_Exception.thrown("End before you begin");
		}
		this.g.begin();
		if(clear) {
			this.clear(clearColor);
		}
		this.setProjection();
	}
	,clear: function(color) {
		this.flush();
		this.g.clear(color == null ? -16777216 : color);
	}
	,flush: function() {
		this.imagePainter.end();
		this.textPainter.end();
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
	}
	,end: function() {
		this.flush();
		this.g.end();
		if(kha_graphics4_Graphics2.current == this) {
			kha_graphics4_Graphics2.current = null;
		} else {
			throw haxe_Exception.thrown("Begin before you end");
		}
	}
	,drawVideoInternal: function(video,x,y,width,height) {
	}
	,drawVideo: function(video,x,y,width,height) {
		this.setPipeline(kha_graphics4_Graphics2.videoPipeline);
		this.drawVideoInternal(video,x,y,width,height);
		this.setPipeline(null);
	}
	,__class__: kha_graphics4_Graphics2
});
var kha_graphics4_IndexBuffer = function(indexCount,usage,canRead) {
	if(canRead == null) {
		canRead = false;
	}
	this.lockEnd = 0;
	this.lockStart = 0;
	this.usage = usage;
	this.mySize = indexCount;
	this.buffer = kha_SystemImpl.gl.createBuffer();
	this._data = kha_arrays_Uint32Array._new(indexCount);
};
$hxClasses["kha.graphics4.IndexBuffer"] = kha_graphics4_IndexBuffer;
kha_graphics4_IndexBuffer.__name__ = true;
kha_graphics4_IndexBuffer.prototype = {
	_data: null
	,buffer: null
	,mySize: null
	,usage: null
	,lockStart: null
	,lockEnd: null
	,'delete': function() {
		this._data = null;
		kha_SystemImpl.gl.deleteBuffer(this.buffer);
	}
	,lock: function(start,count) {
		this.lockStart = start != null ? start : 0;
		this.lockEnd = count != null ? start + count : this.mySize;
		var end = this.lockEnd;
		var start = this.lockStart * 4;
		var end1 = end != null ? end * 4 : null;
		return kha_arrays_ByteArray._new(this._data.buffer,start,end1 != null ? end1 - start : null);
	}
	,unlock: function(count) {
		if(count != null) {
			this.lockEnd = this.lockStart + count;
		}
		kha_SystemImpl.gl.bindBuffer(34963,this.buffer);
		var end = this.lockEnd;
		var start = this.lockStart * 4;
		var end1 = end != null ? end * 4 : null;
		var data = kha_arrays_ByteArray._new(this._data.buffer,start,end1 != null ? end1 - start : null);
		var glData = kha_SystemImpl.elementIndexUint == null ? new Uint16Array(data.buffer) : data;
		kha_SystemImpl.gl.bufferData(34963,glData,this.usage == 1 ? 35048 : 35044);
	}
	,set: function() {
		kha_SystemImpl.gl.bindBuffer(34963,this.buffer);
	}
	,count: function() {
		return this.mySize;
	}
	,__class__: kha_graphics4_IndexBuffer
};
var kha_graphics4_PipelineStateBase = function() {
	this.inputLayout = null;
	this.vertexShader = null;
	this.fragmentShader = null;
	this.geometryShader = null;
	this.tessellationControlShader = null;
	this.tessellationEvaluationShader = null;
	this.cullMode = 2;
	this.depthWrite = false;
	this.depthMode = 0;
	this.stencilFrontMode = 0;
	this.stencilFrontBothPass = 0;
	this.stencilFrontDepthFail = 0;
	this.stencilFrontFail = 0;
	this.stencilBackMode = 0;
	this.stencilBackBothPass = 0;
	this.stencilBackDepthFail = 0;
	this.stencilBackFail = 0;
	this.stencilReferenceValue = kha_graphics4_StencilValue.Static(0);
	this.stencilReadMask = 255;
	this.stencilWriteMask = 255;
	this.blendSource = 1;
	this.blendDestination = 2;
	this.blendOperation = 0;
	this.alphaBlendSource = 1;
	this.alphaBlendDestination = 2;
	this.alphaBlendOperation = 0;
	this.colorWriteMasksRed = [];
	this.colorWriteMasksGreen = [];
	this.colorWriteMasksBlue = [];
	this.colorWriteMasksAlpha = [];
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorAttachmentCount = 1;
	this.colorAttachments = [];
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.depthStencilAttachment = 0;
	this.conservativeRasterization = false;
};
$hxClasses["kha.graphics4.PipelineStateBase"] = kha_graphics4_PipelineStateBase;
kha_graphics4_PipelineStateBase.__name__ = true;
kha_graphics4_PipelineStateBase.prototype = {
	inputLayout: null
	,vertexShader: null
	,fragmentShader: null
	,geometryShader: null
	,tessellationControlShader: null
	,tessellationEvaluationShader: null
	,cullMode: null
	,depthWrite: null
	,depthMode: null
	,stencilFrontMode: null
	,stencilFrontBothPass: null
	,stencilFrontDepthFail: null
	,stencilFrontFail: null
	,stencilBackMode: null
	,stencilBackBothPass: null
	,stencilBackDepthFail: null
	,stencilBackFail: null
	,stencilReferenceValue: null
	,stencilReadMask: null
	,stencilWriteMask: null
	,blendSource: null
	,blendDestination: null
	,blendOperation: null
	,alphaBlendSource: null
	,alphaBlendDestination: null
	,alphaBlendOperation: null
	,colorWriteMasksRed: null
	,colorWriteMasksGreen: null
	,colorWriteMasksBlue: null
	,colorWriteMasksAlpha: null
	,colorAttachmentCount: null
	,colorAttachments: null
	,depthStencilAttachment: null
	,set_colorWriteMask: function(value) {
		var value1 = this.colorWriteMasksAlpha[0] = value;
		var value = this.colorWriteMasksGreen[0] = value1;
		var value1 = this.colorWriteMasksBlue[0] = value;
		return this.colorWriteMasksRed[0] = value1;
	}
	,get_colorWriteMaskRed: function() {
		return this.colorWriteMasksRed[0];
	}
	,set_colorWriteMaskRed: function(value) {
		return this.colorWriteMasksRed[0] = value;
	}
	,get_colorWriteMaskGreen: function() {
		return this.colorWriteMasksGreen[0];
	}
	,set_colorWriteMaskGreen: function(value) {
		return this.colorWriteMasksGreen[0] = value;
	}
	,get_colorWriteMaskBlue: function() {
		return this.colorWriteMasksBlue[0];
	}
	,set_colorWriteMaskBlue: function(value) {
		return this.colorWriteMasksBlue[0] = value;
	}
	,get_colorWriteMaskAlpha: function() {
		return this.colorWriteMasksAlpha[0];
	}
	,set_colorWriteMaskAlpha: function(value) {
		return this.colorWriteMasksAlpha[0] = value;
	}
	,conservativeRasterization: null
	,__class__: kha_graphics4_PipelineStateBase
};
var kha_graphics4_PipelineState = function() {
	this.program = null;
	kha_graphics4_PipelineStateBase.call(this);
	this.textures = [];
	this.textureValues = [];
};
$hxClasses["kha.graphics4.PipelineState"] = kha_graphics4_PipelineState;
kha_graphics4_PipelineState.__name__ = true;
kha_graphics4_PipelineState.__super__ = kha_graphics4_PipelineStateBase;
kha_graphics4_PipelineState.prototype = $extend(kha_graphics4_PipelineStateBase.prototype,{
	program: null
	,textures: null
	,textureValues: null
	,'delete': function() {
		if(this.program != null) {
			kha_SystemImpl.gl.deleteProgram(this.program);
		}
	}
	,compile: function() {
		if(this.program != null) {
			kha_SystemImpl.gl.deleteProgram(this.program);
		}
		this.program = kha_SystemImpl.gl.createProgram();
		this.compileShader(this.vertexShader);
		this.compileShader(this.fragmentShader);
		kha_SystemImpl.gl.attachShader(this.program,this.vertexShader.shader);
		kha_SystemImpl.gl.attachShader(this.program,this.fragmentShader.shader);
		var index = 0;
		var _g = 0;
		var _g1 = this.inputLayout;
		while(_g < _g1.length) {
			var structure = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = structure.elements;
			while(_g2 < _g3.length) {
				var element = _g3[_g2];
				++_g2;
				kha_SystemImpl.gl.bindAttribLocation(this.program,index,element.name);
				if(element.data == 4) {
					index += 4;
				} else {
					++index;
				}
			}
		}
		kha_SystemImpl.gl.linkProgram(this.program);
		if(!kha_SystemImpl.gl.getProgramParameter(this.program,35714)) {
			var message = "Could not link the shader program:\n" + kha_SystemImpl.gl.getProgramInfoLog(this.program);
			haxe_Log.trace("Error: " + message,{ fileName : "kha/graphics4/PipelineState.hx", lineNumber : 49, className : "kha.graphics4.PipelineState", methodName : "compile"});
			throw haxe_Exception.thrown(message);
		}
	}
	,set: function() {
		kha_SystemImpl.gl.useProgram(this.program);
		var _g = 0;
		var _g1 = this.textureValues.length;
		while(_g < _g1) {
			var index = _g++;
			kha_SystemImpl.gl.uniform1i(this.textureValues[index],index);
		}
		kha_SystemImpl.gl.colorMask(this.colorWriteMasksRed[0],this.colorWriteMasksGreen[0],this.colorWriteMasksBlue[0],this.colorWriteMasksAlpha[0]);
	}
	,compileShader: function(shader) {
		if(shader.shader != null) {
			return;
		}
		var s = kha_SystemImpl.gl.createShader(shader.type);
		var highp = kha_SystemImpl.gl.getShaderPrecisionFormat(35632,36338);
		var highpSupported = highp.precision != 0;
		var files = shader.files;
		var _g = 0;
		var _g1 = files.length;
		while(_g < _g1) {
			var i = _g++;
			if(kha_SystemImpl.gl2) {
				if(files[i].indexOf("-webgl2") >= 0 || files[i].indexOf("runtime-string") >= 0) {
					kha_SystemImpl.gl.shaderSource(s,shader.sources[i]);
					break;
				}
			} else {
				if(!highpSupported && (files[i].indexOf("-relaxed") >= 0 || files[i].indexOf("runtime-string") >= 0)) {
					kha_SystemImpl.gl.shaderSource(s,shader.sources[i]);
					break;
				}
				if(highpSupported && (files[i].indexOf("-relaxed") < 0 || files[i].indexOf("runtime-string") >= 0)) {
					kha_SystemImpl.gl.shaderSource(s,shader.sources[i]);
					break;
				}
			}
		}
		kha_SystemImpl.gl.compileShader(s);
		if(!kha_SystemImpl.gl.getShaderParameter(s,35713)) {
			var message = "Could not compile shader:\n" + kha_SystemImpl.gl.getShaderInfoLog(s);
			haxe_Log.trace("Error: " + message,{ fileName : "kha/graphics4/PipelineState.hx", lineNumber : 89, className : "kha.graphics4.PipelineState", methodName : "compileShader"});
			throw haxe_Exception.thrown(message);
		}
		shader.shader = s;
	}
	,getConstantLocation: function(name) {
		var location = kha_SystemImpl.gl.getUniformLocation(this.program,name);
		if(location == null) {
			haxe_Log.trace("Warning: Uniform " + name + " not found.",{ fileName : "kha/graphics4/PipelineState.hx", lineNumber : 98, className : "kha.graphics4.PipelineState", methodName : "getConstantLocation"});
		}
		var type = 5126;
		var count = kha_SystemImpl.gl.getProgramParameter(this.program,35718);
		var _g = 0;
		var _g1 = count;
		while(_g < _g1) {
			var i = _g++;
			var info = kha_SystemImpl.gl.getActiveUniform(this.program,i);
			if(info.name == name || info.name == name + "[0]") {
				type = info.type;
				break;
			}
		}
		return new kha_js_graphics4_ConstantLocation(location,type);
	}
	,getTextureUnit: function(name) {
		var index = this.findTexture(name);
		if(index < 0) {
			var location = kha_SystemImpl.gl.getUniformLocation(this.program,name);
			if(location == null) {
				haxe_Log.trace("Warning: Sampler " + name + " not found.",{ fileName : "kha/graphics4/PipelineState.hx", lineNumber : 117, className : "kha.graphics4.PipelineState", methodName : "getTextureUnit"});
			}
			index = this.textures.length;
			this.textureValues.push(location);
			this.textures.push(name);
		}
		return new kha_js_graphics4_TextureUnit(index);
	}
	,findTexture: function(name) {
		var _g = 0;
		var _g1 = this.textures.length;
		while(_g < _g1) {
			var index = _g++;
			if(this.textures[index] == name) {
				return index;
			}
		}
		return -1;
	}
	,__class__: kha_graphics4_PipelineState
});
var kha_graphics4_StencilValue = $hxEnums["kha.graphics4.StencilValue"] = { __ename__:true,__constructs__:null
	,Dynamic: {_hx_name:"Dynamic",_hx_index:0,__enum__:"kha.graphics4.StencilValue",toString:$estr}
	,Static: ($_=function(value) { return {_hx_index:1,value:value,__enum__:"kha.graphics4.StencilValue",toString:$estr}; },$_._hx_name="Static",$_.__params__ = ["value"],$_)
};
kha_graphics4_StencilValue.__constructs__ = [kha_graphics4_StencilValue.Dynamic,kha_graphics4_StencilValue.Static];
var kha_graphics4_TessellationControlShader = function(sources,files) {
};
$hxClasses["kha.graphics4.TessellationControlShader"] = kha_graphics4_TessellationControlShader;
kha_graphics4_TessellationControlShader.__name__ = true;
kha_graphics4_TessellationControlShader.prototype = {
	'delete': function() {
	}
	,__class__: kha_graphics4_TessellationControlShader
};
var kha_graphics4_TessellationEvaluationShader = function(sources,files) {
};
$hxClasses["kha.graphics4.TessellationEvaluationShader"] = kha_graphics4_TessellationEvaluationShader;
kha_graphics4_TessellationEvaluationShader.__name__ = true;
kha_graphics4_TessellationEvaluationShader.prototype = {
	'delete': function() {
	}
	,__class__: kha_graphics4_TessellationEvaluationShader
};
var kha_graphics4_TextureUnit = function() { };
$hxClasses["kha.graphics4.TextureUnit"] = kha_graphics4_TextureUnit;
kha_graphics4_TextureUnit.__name__ = true;
kha_graphics4_TextureUnit.__isInterface__ = true;
var kha_graphics4_VertexBuffer = function(vertexCount,structure,usage,instanceDataStepRate,canRead) {
	if(canRead == null) {
		canRead = false;
	}
	if(instanceDataStepRate == null) {
		instanceDataStepRate = 0;
	}
	this.lockEnd = 0;
	this.lockStart = 0;
	this.instanceDataStepRate = instanceDataStepRate;
	this.mySize = vertexCount;
	this.myStride = 0;
	var _g = 0;
	var _g1 = structure.elements;
	while(_g < _g1.length) {
		var element = _g1[_g];
		++_g;
		this.myStride += kha_graphics4_VertexStructure.dataByteSize(element.data);
	}
	this.buffer = kha_SystemImpl.gl.createBuffer();
	this._data = kha_arrays_ByteArray.make(vertexCount * this.myStride);
	this.sizes = [];
	this.offsets = [];
	this.types = [];
	this.sizes[structure.elements.length - 1] = 0;
	this.offsets[structure.elements.length - 1] = 0;
	this.types[structure.elements.length - 1] = 0;
	var offset = 0;
	var index = 0;
	var _g = 0;
	var _g1 = structure.elements;
	while(_g < _g1.length) {
		var element = _g1[_g];
		++_g;
		var size;
		var type;
		switch(element.data) {
		case 0:
			size = 1;
			type = 5126;
			break;
		case 1:
			size = 2;
			type = 5126;
			break;
		case 2:
			size = 3;
			type = 5126;
			break;
		case 3:
			size = 4;
			type = 5126;
			break;
		case 4:
			size = 16;
			type = 5126;
			break;
		case 5:case 7:
			size = 1;
			type = 5120;
			break;
		case 6:case 8:
			size = 1;
			type = 5121;
			break;
		case 10:case 12:
			size = 2;
			type = 5121;
			break;
		case 9:case 11:
			size = 2;
			type = 5120;
			break;
		case 13:case 15:
			size = 4;
			type = 5120;
			break;
		case 14:case 16:
			size = 4;
			type = 5121;
			break;
		case 17:case 19:
			size = 1;
			type = 5122;
			break;
		case 18:case 20:
			size = 1;
			type = 5123;
			break;
		case 21:case 23:
			size = 2;
			type = 5122;
			break;
		case 22:case 24:
			size = 2;
			type = 5123;
			break;
		case 25:case 27:
			size = 4;
			type = 5122;
			break;
		case 26:case 28:
			size = 4;
			type = 5123;
			break;
		case 29:
			size = 1;
			type = 5124;
			break;
		case 30:
			size = 1;
			type = 5125;
			break;
		case 31:
			size = 2;
			type = 5124;
			break;
		case 32:
			size = 2;
			type = 5125;
			break;
		case 33:
			size = 3;
			type = 5124;
			break;
		case 34:
			size = 3;
			type = 5125;
			break;
		case 35:
			size = 4;
			type = 5124;
			break;
		case 36:
			size = 4;
			type = 5125;
			break;
		}
		this.sizes[index] = size;
		this.offsets[index] = offset;
		this.types[index] = type;
		offset += kha_graphics4_VertexStructure.dataByteSize(element.data);
		++index;
	}
	kha_SystemImpl.gl.bindBuffer(34962,this.buffer);
	var tmp = kha_SystemImpl.gl;
	var this1 = this._data;
	var start = 0 * this.stride();
	var end = this.mySize * this.stride();
	tmp.bufferData(34962,kha_arrays_ByteArray._new(this1.buffer,start,end != null ? end - start : null),usage == 1 ? 35048 : 35044);
};
$hxClasses["kha.graphics4.VertexBuffer"] = kha_graphics4_VertexBuffer;
kha_graphics4_VertexBuffer.__name__ = true;
kha_graphics4_VertexBuffer.prototype = {
	_data: null
	,buffer: null
	,mySize: null
	,myStride: null
	,sizes: null
	,offsets: null
	,types: null
	,instanceDataStepRate: null
	,lockStart: null
	,lockEnd: null
	,'delete': function() {
		this._data = null;
		kha_SystemImpl.gl.deleteBuffer(this.buffer);
	}
	,lock: function(start,count) {
		this.lockStart = start != null ? start : 0;
		this.lockEnd = count != null ? start + count : this.mySize;
		var this1 = this._data;
		var start = this.lockStart * this.stride();
		var end = this.lockEnd * this.stride();
		return kha_arrays_ByteArray._new(this1.buffer,start,end != null ? end - start : null);
	}
	,unlock: function(count) {
		if(count != null) {
			this.lockEnd = this.lockStart + count;
		}
		kha_SystemImpl.gl.bindBuffer(34962,this.buffer);
		if(kha_SystemImpl.safari) {
			var tmp = kha_SystemImpl.gl;
			var this1 = this._data;
			var start = 0 * this.stride();
			var end = this.lockEnd * this.stride();
			tmp.bufferData(34962,kha_arrays_ByteArray._new(this1.buffer,start,end != null ? end - start : null),35048);
		} else {
			var tmp = kha_SystemImpl.gl;
			var tmp1 = this.lockStart * this.stride();
			var this1 = this._data;
			var start = this.lockStart * this.stride();
			var end = this.lockEnd * this.stride();
			tmp.bufferSubData(34962,tmp1,kha_arrays_ByteArray._new(this1.buffer,start,end != null ? end - start : null));
		}
	}
	,stride: function() {
		return this.myStride;
	}
	,count: function() {
		return this.mySize;
	}
	,set: function(offset) {
		var ext = kha_SystemImpl.gl2 ? true : kha_SystemImpl.gl.getExtension("ANGLE_instanced_arrays");
		kha_SystemImpl.gl.bindBuffer(34962,this.buffer);
		var attributesOffset = 0;
		var _g = 0;
		var _g1 = this.sizes.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.sizes[i] > 4) {
				var size = this.sizes[i];
				var addonOffset = 0;
				while(size > 0) {
					kha_SystemImpl.gl.enableVertexAttribArray(offset + attributesOffset);
					kha_SystemImpl.gl.vertexAttribPointer(offset + attributesOffset,4,5126,false,this.myStride,this.offsets[i] + addonOffset);
					if(ext) {
						if(kha_SystemImpl.gl2) {
							kha_SystemImpl.gl.vertexAttribDivisor(offset + attributesOffset,this.instanceDataStepRate);
						} else {
							ext.vertexAttribDivisorANGLE(offset + attributesOffset,this.instanceDataStepRate);
						}
					}
					size -= 4;
					addonOffset += 16;
					++attributesOffset;
				}
			} else {
				var normalized = this.types[i] == 5126 ? false : true;
				kha_SystemImpl.gl.enableVertexAttribArray(offset + attributesOffset);
				kha_SystemImpl.gl.vertexAttribPointer(offset + attributesOffset,this.sizes[i],this.types[i],normalized,this.myStride,this.offsets[i]);
				if(ext) {
					if(kha_SystemImpl.gl2) {
						kha_SystemImpl.gl.vertexAttribDivisor(offset + attributesOffset,this.instanceDataStepRate);
					} else {
						ext.vertexAttribDivisorANGLE(offset + attributesOffset,this.instanceDataStepRate);
					}
				}
				++attributesOffset;
			}
		}
		return attributesOffset;
	}
	,__class__: kha_graphics4_VertexBuffer
};
var kha_graphics4_VertexData = {};
kha_graphics4_VertexData.getStride = function(vertexData) {
	switch(vertexData) {
	case 0:
		return 4;
	case 1:
		return 8;
	case 2:
		return 12;
	case 3:
		return 16;
	case 4:
		return 64;
	case 5:
		return 1;
	case 6:
		return 1;
	case 7:
		return 1;
	case 8:
		return 1;
	case 9:
		return 2;
	case 10:
		return 2;
	case 11:
		return 2;
	case 12:
		return 2;
	case 13:
		return 4;
	case 14:
		return 4;
	case 15:
		return 4;
	case 16:
		return 4;
	case 17:
		return 2;
	case 18:
		return 2;
	case 19:
		return 2;
	case 20:
		return 2;
	case 21:
		return 4;
	case 22:
		return 4;
	case 23:
		return 4;
	case 24:
		return 4;
	case 25:
		return 8;
	case 26:
		return 8;
	case 27:
		return 8;
	case 28:
		return 8;
	case 29:
		return 4;
	case 30:
		return 4;
	case 31:
		return 8;
	case 32:
		return 8;
	case 33:
		return 12;
	case 34:
		return 12;
	case 35:
		return 16;
	case 36:
		return 16;
	}
};
var kha_graphics4_VertexElement = function(name,data) {
	this.name = name;
	this.data = data;
};
$hxClasses["kha.graphics4.VertexElement"] = kha_graphics4_VertexElement;
kha_graphics4_VertexElement.__name__ = true;
kha_graphics4_VertexElement.prototype = {
	name: null
	,data: null
	,__class__: kha_graphics4_VertexElement
};
var kha_graphics4_VertexShader = function(sources,files) {
	this.sources = [];
	var _g = 0;
	while(_g < sources.length) {
		var source = sources[_g];
		++_g;
		this.sources.push(source.toString());
	}
	this.type = 35633;
	this.shader = null;
	this.files = files;
};
$hxClasses["kha.graphics4.VertexShader"] = kha_graphics4_VertexShader;
kha_graphics4_VertexShader.__name__ = true;
kha_graphics4_VertexShader.fromSource = function(source) {
	var shader = new kha_graphics4_VertexShader([],["runtime-string"]);
	shader.sources.push(source);
	return shader;
};
kha_graphics4_VertexShader.prototype = {
	sources: null
	,type: null
	,shader: null
	,files: null
	,'delete': function() {
		kha_SystemImpl.gl.deleteShader(this.shader);
		this.shader = null;
		this.sources = null;
	}
	,__class__: kha_graphics4_VertexShader
};
var kha_graphics4_VertexStructure = function() {
	this.elements = [];
	this.instanced = false;
};
$hxClasses["kha.graphics4.VertexStructure"] = kha_graphics4_VertexStructure;
kha_graphics4_VertexStructure.__name__ = true;
kha_graphics4_VertexStructure.dataByteSize = function(data) {
	switch(data) {
	case 0:
		return 4;
	case 1:
		return 8;
	case 2:
		return 12;
	case 3:
		return 16;
	case 4:
		return 64;
	case 5:case 6:case 7:case 8:
		return 1;
	case 9:case 10:case 11:case 12:
		return 2;
	case 13:case 14:case 15:case 16:
		return 4;
	case 17:case 18:case 19:case 20:
		return 2;
	case 21:case 22:case 23:case 24:
		return 4;
	case 25:case 26:case 27:case 28:
		return 8;
	case 29:case 30:
		return 4;
	case 31:case 32:
		return 8;
	case 33:case 34:
		return 12;
	case 35:case 36:
		return 16;
	}
};
kha_graphics4_VertexStructure.prototype = {
	elements: null
	,instanced: null
	,add: function(name,data) {
		this.elements.push(new kha_graphics4_VertexElement(name,data));
	}
	,size: function() {
		return this.elements.length;
	}
	,byteSize: function() {
		var byteSize = 0;
		var _g = 0;
		var _g1 = this.elements.length;
		while(_g < _g1) {
			var i = _g++;
			byteSize += kha_graphics4_VertexStructure.dataByteSize(this.elements[i].data);
		}
		return byteSize;
	}
	,get: function(index) {
		return this.elements[index];
	}
	,__class__: kha_graphics4_VertexStructure
};
var kha_input_Gamepad = $hx_exports["kha"]["input"]["Gamepad"] = function(index,id) {
	if(id == null) {
		id = "unknown";
	}
	if(index == null) {
		index = 0;
	}
	this.connected = false;
	this.index = index;
	this.axisListeners = [];
	this.buttonListeners = [];
	kha_input_Gamepad.instances[index] = this;
};
$hxClasses["kha.input.Gamepad"] = kha_input_Gamepad;
kha_input_Gamepad.__name__ = true;
kha_input_Gamepad.get = function(index) {
	if(index == null) {
		index = 0;
	}
	if(index >= kha_input_Gamepad.instances.length) {
		return null;
	}
	return kha_input_Gamepad.instances[index];
};
kha_input_Gamepad.notifyOnConnect = function(connectListener,disconnectListener) {
	if(connectListener != null) {
		kha_input_Gamepad.connectListeners.push(connectListener);
	}
	if(disconnectListener != null) {
		kha_input_Gamepad.disconnectListeners.push(disconnectListener);
	}
};
kha_input_Gamepad.removeConnect = function(connectListener,disconnectListener) {
	if(connectListener != null) {
		HxOverrides.remove(kha_input_Gamepad.connectListeners,connectListener);
	}
	if(disconnectListener != null) {
		HxOverrides.remove(kha_input_Gamepad.disconnectListeners,disconnectListener);
	}
};
kha_input_Gamepad.sendConnectEvent = function(index) {
	kha_input_Gamepad.instances[index].connected = true;
	var _g = 0;
	var _g1 = kha_input_Gamepad.connectListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener(index);
	}
};
kha_input_Gamepad.sendDisconnectEvent = function(index) {
	kha_input_Gamepad.instances[index].connected = false;
	var _g = 0;
	var _g1 = kha_input_Gamepad.disconnectListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener(index);
	}
};
kha_input_Gamepad.prototype = {
	index: null
	,notify: function(axisListener,buttonListener) {
		if(axisListener != null) {
			this.axisListeners.push(axisListener);
		}
		if(buttonListener != null) {
			this.buttonListeners.push(buttonListener);
		}
	}
	,remove: function(axisListener,buttonListener) {
		if(axisListener != null) {
			HxOverrides.remove(this.axisListeners,axisListener);
		}
		if(buttonListener != null) {
			HxOverrides.remove(this.buttonListeners,buttonListener);
		}
	}
	,axisListeners: null
	,buttonListeners: null
	,id: null
	,vendor: null
	,connected: null
	,rumble: function(leftAmount,rightAmount) {
		kha_SystemImpl.setGamepadRumble(this.index,leftAmount,rightAmount);
	}
	,get_id: function() {
		return kha_SystemImpl.getGamepadId(this.index);
	}
	,get_vendor: function() {
		return kha_SystemImpl.getGamepadVendor(this.index);
	}
	,sendAxisEvent: function(axis,value) {
		var _g = 0;
		var _g1 = this.axisListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(axis,value);
		}
	}
	,sendButtonEvent: function(button,value) {
		var _g = 0;
		var _g1 = this.buttonListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(button,value);
		}
	}
	,__class__: kha_input_Gamepad
};
var kha_input_BlockInterventions = $hxEnums["kha.input.BlockInterventions"] = { __ename__:true,__constructs__:null
	,Default: {_hx_name:"Default",_hx_index:0,__enum__:"kha.input.BlockInterventions",toString:$estr}
	,Full: {_hx_name:"Full",_hx_index:1,__enum__:"kha.input.BlockInterventions",toString:$estr}
	,None: {_hx_name:"None",_hx_index:2,__enum__:"kha.input.BlockInterventions",toString:$estr}
	,Custom: ($_=function(func) { return {_hx_index:3,func:func,__enum__:"kha.input.BlockInterventions",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["func"],$_)
};
kha_input_BlockInterventions.__constructs__ = [kha_input_BlockInterventions.Default,kha_input_BlockInterventions.Full,kha_input_BlockInterventions.None,kha_input_BlockInterventions.Custom];
var kha_netsync_Controller = function() {
	this.__id = kha_netsync_ControllerBuilder.nextId++;
	this._inputBuffer = new haxe_io_Bytes(new ArrayBuffer(1));
};
$hxClasses["kha.netsync.Controller"] = kha_netsync_Controller;
kha_netsync_Controller.__name__ = true;
kha_netsync_Controller.prototype = {
	__id: null
	,_inputBufferIndex: null
	,_inputBuffer: null
	,_id: function() {
		return this.__id;
	}
	,_receive: function(bytes) {
	}
	,__class__: kha_netsync_Controller
};
var kha_input_Keyboard = $hx_exports["kha"]["input"]["Keyboard"] = function() {
	kha_netsync_Controller.call(this);
	this.downListeners = [];
	this.upListeners = [];
	this.pressListeners = [];
	kha_input_Keyboard.instance = this;
};
$hxClasses["kha.input.Keyboard"] = kha_input_Keyboard;
kha_input_Keyboard.__name__ = true;
kha_input_Keyboard.get = function(num) {
	if(num == null) {
		num = 0;
	}
	return kha_SystemImpl.getKeyboard(num);
};
kha_input_Keyboard.disableSystemInterventions = function(behavior) {
	kha_input_Keyboard.keyBehavior = behavior;
};
kha_input_Keyboard.__super__ = kha_netsync_Controller;
kha_input_Keyboard.prototype = $extend(kha_netsync_Controller.prototype,{
	notify: function(downListener,upListener,pressListener) {
		if(downListener != null) {
			this.downListeners.push(downListener);
		}
		if(upListener != null) {
			this.upListeners.push(upListener);
		}
		if(pressListener != null) {
			this.pressListeners.push(pressListener);
		}
	}
	,remove: function(downListener,upListener,pressListener) {
		if(downListener != null) {
			HxOverrides.remove(this.downListeners,downListener);
		}
		if(upListener != null) {
			HxOverrides.remove(this.upListeners,upListener);
		}
		if(pressListener != null) {
			HxOverrides.remove(this.pressListeners,pressListener);
		}
	}
	,show: function() {
	}
	,hide: function() {
	}
	,downListeners: null
	,upListeners: null
	,pressListeners: null
	,sendDownEvent: function(code) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(5));
			bytes.setInt32(0,0);
			bytes.b[4] = code;
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		var _g = 0;
		var _g1 = this.downListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(code);
		}
	}
	,sendUpEvent: function(code) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(5));
			bytes.setInt32(0,1);
			bytes.b[4] = code;
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		var _g = 0;
		var _g1 = this.upListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(code);
		}
	}
	,sendPressEvent: function(char) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(5));
			bytes.setInt32(0,2);
			bytes.b[4] = HxOverrides.cca(char,0);
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		var _g = 0;
		var _g1 = this.pressListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(char);
		}
	}
	,_receive: function(bytes) {
		var funcindex = bytes.getInt32(0);
		if(funcindex == 0) {
			var input0 = bytes.b[4];
			this.sendDownEvent(input0);
			return;
		}
		if(funcindex == 1) {
			var input0 = bytes.b[4];
			this.sendUpEvent(input0);
			return;
		}
		if(funcindex == 2) {
			var code = bytes.b[4];
			var input0 = String.fromCodePoint(code);
			this.sendPressEvent(input0);
			return;
		}
	}
	,__class__: kha_input_Keyboard
});
var kha_input_MouseEventBlockBehavior = $hxEnums["kha.input.MouseEventBlockBehavior"] = { __ename__:true,__constructs__:null
	,Full: {_hx_name:"Full",_hx_index:0,__enum__:"kha.input.MouseEventBlockBehavior",toString:$estr}
	,None: {_hx_name:"None",_hx_index:1,__enum__:"kha.input.MouseEventBlockBehavior",toString:$estr}
	,Custom: ($_=function(func) { return {_hx_index:2,func:func,__enum__:"kha.input.MouseEventBlockBehavior",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["func"],$_)
};
kha_input_MouseEventBlockBehavior.__constructs__ = [kha_input_MouseEventBlockBehavior.Full,kha_input_MouseEventBlockBehavior.None,kha_input_MouseEventBlockBehavior.Custom];
var kha_input_MouseCursor = $hxEnums["kha.input.MouseCursor"] = { __ename__:true,__constructs__:null
	,Default: {_hx_name:"Default",_hx_index:0,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Pointer: {_hx_name:"Pointer",_hx_index:1,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Text: {_hx_name:"Text",_hx_index:2,__enum__:"kha.input.MouseCursor",toString:$estr}
	,EastWestResize: {_hx_name:"EastWestResize",_hx_index:3,__enum__:"kha.input.MouseCursor",toString:$estr}
	,NorthSouthResize: {_hx_name:"NorthSouthResize",_hx_index:4,__enum__:"kha.input.MouseCursor",toString:$estr}
	,NorthEastResize: {_hx_name:"NorthEastResize",_hx_index:5,__enum__:"kha.input.MouseCursor",toString:$estr}
	,SouthEastResize: {_hx_name:"SouthEastResize",_hx_index:6,__enum__:"kha.input.MouseCursor",toString:$estr}
	,NorthWestResize: {_hx_name:"NorthWestResize",_hx_index:7,__enum__:"kha.input.MouseCursor",toString:$estr}
	,SouthWestResize: {_hx_name:"SouthWestResize",_hx_index:8,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Grab: {_hx_name:"Grab",_hx_index:9,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Grabbing: {_hx_name:"Grabbing",_hx_index:10,__enum__:"kha.input.MouseCursor",toString:$estr}
	,NotAllowed: {_hx_name:"NotAllowed",_hx_index:11,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Wait: {_hx_name:"Wait",_hx_index:12,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Crosshair: {_hx_name:"Crosshair",_hx_index:13,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Custom: ($_=function(image) { return {_hx_index:14,image:image,__enum__:"kha.input.MouseCursor",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["image"],$_)
};
kha_input_MouseCursor.__constructs__ = [kha_input_MouseCursor.Default,kha_input_MouseCursor.Pointer,kha_input_MouseCursor.Text,kha_input_MouseCursor.EastWestResize,kha_input_MouseCursor.NorthSouthResize,kha_input_MouseCursor.NorthEastResize,kha_input_MouseCursor.SouthEastResize,kha_input_MouseCursor.NorthWestResize,kha_input_MouseCursor.SouthWestResize,kha_input_MouseCursor.Grab,kha_input_MouseCursor.Grabbing,kha_input_MouseCursor.NotAllowed,kha_input_MouseCursor.Wait,kha_input_MouseCursor.Crosshair,kha_input_MouseCursor.Custom];
var kha_input_Mouse = $hx_exports["kha"]["input"]["Mouse"] = function() {
	kha_netsync_Controller.call(this);
	kha_input_Mouse.instance = this;
};
$hxClasses["kha.input.Mouse"] = kha_input_Mouse;
kha_input_Mouse.__name__ = true;
kha_input_Mouse.get = function(num) {
	if(num == null) {
		num = 0;
	}
	return kha_SystemImpl.getMouse(num);
};
kha_input_Mouse.setWheelEventBlockBehavior = function(behavior) {
	kha_input_Mouse.wheelEventBlockBehavior = behavior;
};
kha_input_Mouse.__super__ = kha_netsync_Controller;
kha_input_Mouse.prototype = $extend(kha_netsync_Controller.prototype,{
	notify: function(downListener,upListener,moveListener,wheelListener,leaveListener) {
		this.notifyWindowed(0,downListener,upListener,moveListener,wheelListener,leaveListener);
	}
	,remove: function(downListener,upListener,moveListener,wheelListener,leaveListener) {
		this.removeWindowed(0,downListener,upListener,moveListener,wheelListener,leaveListener);
	}
	,notifyWindowed: function(windowId,downListener,upListener,moveListener,wheelListener,leaveListener) {
		if(downListener != null) {
			if(this.windowDownListeners == null) {
				this.windowDownListeners = [];
			}
			while(this.windowDownListeners.length <= windowId) this.windowDownListeners.push([]);
			this.windowDownListeners[windowId].push(downListener);
		}
		if(upListener != null) {
			if(this.windowUpListeners == null) {
				this.windowUpListeners = [];
			}
			while(this.windowUpListeners.length <= windowId) this.windowUpListeners.push([]);
			this.windowUpListeners[windowId].push(upListener);
		}
		if(moveListener != null) {
			if(this.windowMoveListeners == null) {
				this.windowMoveListeners = [];
			}
			while(this.windowMoveListeners.length <= windowId) this.windowMoveListeners.push([]);
			this.windowMoveListeners[windowId].push(moveListener);
		}
		if(wheelListener != null) {
			if(this.windowWheelListeners == null) {
				this.windowWheelListeners = [];
			}
			while(this.windowWheelListeners.length <= windowId) this.windowWheelListeners.push([]);
			this.windowWheelListeners[windowId].push(wheelListener);
		}
		if(leaveListener != null) {
			if(this.windowLeaveListeners == null) {
				this.windowLeaveListeners = [];
			}
			while(this.windowLeaveListeners.length <= windowId) this.windowLeaveListeners.push([]);
			this.windowLeaveListeners[windowId].push(leaveListener);
		}
	}
	,removeWindowed: function(windowId,downListener,upListener,moveListener,wheelListener,leaveListener) {
		if(downListener != null) {
			if(this.windowDownListeners != null) {
				if(windowId < this.windowDownListeners.length) {
					HxOverrides.remove(this.windowDownListeners[windowId],downListener);
				} else {
					haxe_Log.trace("no downListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 152, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no downListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 156, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
		if(upListener != null) {
			if(this.windowUpListeners != null) {
				if(windowId < this.windowUpListeners.length) {
					HxOverrides.remove(this.windowUpListeners[windowId],upListener);
				} else {
					haxe_Log.trace("no upListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 166, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no upListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 170, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
		if(moveListener != null) {
			if(this.windowMoveListeners != null) {
				if(windowId < this.windowMoveListeners.length) {
					HxOverrides.remove(this.windowMoveListeners[windowId],moveListener);
				} else {
					haxe_Log.trace("no moveListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 180, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no moveListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 184, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
		if(wheelListener != null) {
			if(this.windowWheelListeners != null) {
				if(windowId < this.windowWheelListeners.length) {
					HxOverrides.remove(this.windowWheelListeners[windowId],wheelListener);
				} else {
					haxe_Log.trace("no wheelListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 194, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no wheelListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 198, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
		if(leaveListener != null) {
			if(this.windowLeaveListeners != null) {
				if(windowId < this.windowLeaveListeners.length) {
					HxOverrides.remove(this.windowLeaveListeners[windowId],leaveListener);
				} else {
					haxe_Log.trace("no leaveListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 208, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no leaveListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 212, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
	}
	,lock: function() {
	}
	,unlock: function() {
	}
	,canLock: function() {
		return false;
	}
	,isLocked: function() {
		return false;
	}
	,notifyOnLockChange: function(change,error) {
	}
	,removeFromLockChange: function(change,error) {
	}
	,hideSystemCursor: function() {
	}
	,showSystemCursor: function() {
	}
	,setSystemCursor: function(cursor) {
	}
	,windowDownListeners: null
	,windowUpListeners: null
	,windowMoveListeners: null
	,windowWheelListeners: null
	,windowLeaveListeners: null
	,sendLeaveEvent: function(windowId) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(8));
			bytes.setInt32(0,0);
			bytes.setInt32(4,windowId);
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		if(this.windowLeaveListeners != null) {
			var _g = 0;
			var _g1 = this.windowLeaveListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener();
			}
		}
	}
	,sendDownEvent: function(windowId,button,x,y) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(20));
			bytes.setInt32(0,1);
			bytes.setInt32(4,windowId);
			bytes.setInt32(8,button);
			bytes.setInt32(12,x);
			bytes.setInt32(16,y);
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		if(this.windowDownListeners != null) {
			var _g = 0;
			var _g1 = this.windowDownListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(button,x,y);
			}
		}
	}
	,sendUpEvent: function(windowId,button,x,y) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(20));
			bytes.setInt32(0,2);
			bytes.setInt32(4,windowId);
			bytes.setInt32(8,button);
			bytes.setInt32(12,x);
			bytes.setInt32(16,y);
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		if(this.windowUpListeners != null) {
			var _g = 0;
			var _g1 = this.windowUpListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(button,x,y);
			}
		}
	}
	,sendMoveEvent: function(windowId,x,y,movementX,movementY) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(24));
			bytes.setInt32(0,3);
			bytes.setInt32(4,windowId);
			bytes.setInt32(8,x);
			bytes.setInt32(12,y);
			bytes.setInt32(16,movementX);
			bytes.setInt32(20,movementY);
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		if(this.windowMoveListeners != null) {
			var _g = 0;
			var _g1 = this.windowMoveListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,movementX,movementY);
			}
		}
	}
	,sendWheelEvent: function(windowId,delta) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(12));
			bytes.setInt32(0,4);
			bytes.setInt32(4,windowId);
			bytes.setInt32(8,delta);
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		if(this.windowWheelListeners != null) {
			var _g = 0;
			var _g1 = this.windowWheelListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(delta);
			}
		}
	}
	,_receive: function(bytes) {
		var funcindex = bytes.getInt32(0);
		if(funcindex == 0) {
			var input0 = bytes.getInt32(4);
			this.sendLeaveEvent(input0);
			return;
		}
		if(funcindex == 1) {
			var input0 = bytes.getInt32(4);
			var input1 = bytes.getInt32(8);
			var input2 = bytes.getInt32(12);
			var input3 = bytes.getInt32(16);
			this.sendDownEvent(input0,input1,input2,input3);
			return;
		}
		if(funcindex == 2) {
			var input0 = bytes.getInt32(4);
			var input1 = bytes.getInt32(8);
			var input2 = bytes.getInt32(12);
			var input3 = bytes.getInt32(16);
			this.sendUpEvent(input0,input1,input2,input3);
			return;
		}
		if(funcindex == 3) {
			var input0 = bytes.getInt32(4);
			var input1 = bytes.getInt32(8);
			var input2 = bytes.getInt32(12);
			var input3 = bytes.getInt32(16);
			var input4 = bytes.getInt32(20);
			this.sendMoveEvent(input0,input1,input2,input3,input4);
			return;
		}
		if(funcindex == 4) {
			var input0 = bytes.getInt32(4);
			var input1 = bytes.getInt32(8);
			this.sendWheelEvent(input0,input1);
			return;
		}
	}
	,__class__: kha_input_Mouse
});
var kha_input_MouseImpl = function() {
	kha_input_Mouse.call(this);
};
$hxClasses["kha.input.MouseImpl"] = kha_input_MouseImpl;
kha_input_MouseImpl.__name__ = true;
kha_input_MouseImpl.__super__ = kha_input_Mouse;
kha_input_MouseImpl.prototype = $extend(kha_input_Mouse.prototype,{
	lock: function() {
		kha_SystemImpl.lockMouse();
	}
	,unlock: function() {
		kha_SystemImpl.unlockMouse();
	}
	,canLock: function() {
		return kha_SystemImpl.canLockMouse();
	}
	,isLocked: function() {
		return kha_SystemImpl.isMouseLocked();
	}
	,notifyOnLockChange: function(func,error) {
		kha_SystemImpl.notifyOfMouseLockChange(func,error);
	}
	,removeFromLockChange: function(func,error) {
		kha_SystemImpl.removeFromMouseLockChange(func,error);
	}
	,hideSystemCursor: function() {
		kha_SystemImpl.khanvas.style.cursor = "none";
	}
	,showSystemCursor: function() {
		kha_SystemImpl.khanvas.style.cursor = "default";
	}
	,setSystemCursor: function(cursor) {
		var tmp;
		switch(cursor._hx_index) {
		case 0:
			tmp = "default";
			break;
		case 1:
			tmp = "pointer";
			break;
		case 2:
			tmp = "text";
			break;
		case 3:
			tmp = "ew-resize";
			break;
		case 4:
			tmp = "ns-resize";
			break;
		case 5:
			tmp = "ne-resize";
			break;
		case 6:
			tmp = "se-resize";
			break;
		case 7:
			tmp = "nw-resize";
			break;
		case 8:
			tmp = "sw-resize";
			break;
		case 9:
			tmp = "grab";
			break;
		case 10:
			tmp = "grabbing";
			break;
		case 11:
			tmp = "not-allowed";
			break;
		case 12:
			tmp = "wait";
			break;
		case 13:
			tmp = "crosshair";
			break;
		case 14:
			var image = cursor.image;
			var canvas = window.document.createElement("canvas");
			canvas.width = image.get_width();
			canvas.height = image.get_height();
			if(((image) instanceof kha_WebGLImage)) {
				canvas.getContext("2d",null).drawImage((js_Boot.__cast(image , kha_WebGLImage)).image,0,0);
			} else {
				canvas.getContext("2d",null).drawImage((js_Boot.__cast(image , kha_CanvasImage)).image,0,0);
			}
			var dataURL = canvas.toDataURL("image/png");
			dataURL = StringTools.replace(dataURL,"/^data:image\\/(png|jpg);base64,/","");
			tmp = "url('" + dataURL + "'),auto";
			break;
		}
		kha_SystemImpl.khanvas.style.cursor = tmp;
	}
	,_receive: function(bytes) {
		var funcindex = bytes.getInt32(0);
	}
	,__class__: kha_input_MouseImpl
});
var kha_input_Pen = function() {
	kha_input_Pen.instance = this;
};
$hxClasses["kha.input.Pen"] = kha_input_Pen;
kha_input_Pen.__name__ = true;
kha_input_Pen.get = function(num) {
	if(num == null) {
		num = 0;
	}
	return kha_SystemImpl.getPen(num);
};
kha_input_Pen.prototype = {
	notify: function(downListener,upListener,moveListener) {
		this.notifyWindowed(0,downListener,upListener,moveListener);
	}
	,notifyEraser: function(eraserDownListener,eraserUpListener,eraserMoveListener) {
		this.notifyEraserWindowed(0,eraserDownListener,eraserUpListener,eraserMoveListener);
	}
	,remove: function(downListener,upListener,moveListener) {
		this.removeWindowed(0,downListener,upListener,moveListener);
	}
	,removeEraser: function(eraserDownListener,eraserUpListener,eraserMoveListener) {
		this.removeEraserWindowed(0,eraserDownListener,eraserUpListener,eraserMoveListener);
	}
	,notifyWindowed: function(windowId,downListener,upListener,moveListener) {
		if(downListener != null) {
			if(this.windowDownListeners == null) {
				this.windowDownListeners = [];
			}
			while(this.windowDownListeners.length <= windowId) this.windowDownListeners.push([]);
			this.windowDownListeners[windowId].push(downListener);
		}
		if(upListener != null) {
			if(this.windowUpListeners == null) {
				this.windowUpListeners = [];
			}
			while(this.windowUpListeners.length <= windowId) this.windowUpListeners.push([]);
			this.windowUpListeners[windowId].push(upListener);
		}
		if(moveListener != null) {
			if(this.windowMoveListeners == null) {
				this.windowMoveListeners = [];
			}
			while(this.windowMoveListeners.length <= windowId) this.windowMoveListeners.push([]);
			this.windowMoveListeners[windowId].push(moveListener);
		}
	}
	,notifyEraserWindowed: function(windowId,eraserDownListener,eraserUpListener,eraserMoveListener) {
		if(eraserDownListener != null) {
			if(this.windowEraserDownListeners == null) {
				this.windowEraserDownListeners = [];
			}
			while(this.windowEraserDownListeners.length <= windowId) this.windowEraserDownListeners.push([]);
			this.windowEraserDownListeners[windowId].push(eraserDownListener);
		}
		if(eraserUpListener != null) {
			if(this.windowEraserUpListeners == null) {
				this.windowEraserUpListeners = [];
			}
			while(this.windowEraserUpListeners.length <= windowId) this.windowEraserUpListeners.push([]);
			this.windowEraserUpListeners[windowId].push(eraserUpListener);
		}
		if(eraserMoveListener != null) {
			if(this.windowEraserMoveListeners == null) {
				this.windowEraserMoveListeners = [];
			}
			while(this.windowEraserMoveListeners.length <= windowId) this.windowEraserMoveListeners.push([]);
			this.windowEraserMoveListeners[windowId].push(eraserMoveListener);
		}
	}
	,removeWindowed: function(windowId,downListener,upListener,moveListener) {
		if(downListener != null && this.windowDownListeners != null) {
			if(windowId < this.windowDownListeners.length) {
				HxOverrides.remove(this.windowDownListeners[windowId],downListener);
			}
		}
		if(upListener != null && this.windowUpListeners != null) {
			if(windowId < this.windowUpListeners.length) {
				HxOverrides.remove(this.windowUpListeners[windowId],upListener);
			}
		}
		if(moveListener != null && this.windowMoveListeners != null) {
			if(windowId < this.windowMoveListeners.length) {
				HxOverrides.remove(this.windowMoveListeners[windowId],moveListener);
			}
		}
	}
	,removeEraserWindowed: function(windowId,eraserDownListener,eraserUpListener,eraserMoveListener) {
		if(eraserDownListener != null && this.windowEraserDownListeners != null) {
			if(windowId < this.windowEraserDownListeners.length) {
				HxOverrides.remove(this.windowEraserDownListeners[windowId],eraserDownListener);
			}
		}
		if(eraserUpListener != null && this.windowEraserUpListeners != null) {
			if(windowId < this.windowEraserUpListeners.length) {
				HxOverrides.remove(this.windowEraserUpListeners[windowId],eraserUpListener);
			}
		}
		if(eraserMoveListener != null && this.windowEraserMoveListeners != null) {
			if(windowId < this.windowEraserMoveListeners.length) {
				HxOverrides.remove(this.windowEraserMoveListeners[windowId],eraserMoveListener);
			}
		}
	}
	,windowDownListeners: null
	,windowUpListeners: null
	,windowMoveListeners: null
	,windowEraserDownListeners: null
	,windowEraserUpListeners: null
	,windowEraserMoveListeners: null
	,sendDownEvent: function(windowId,x,y,pressure) {
		if(this.windowDownListeners != null) {
			var _g = 0;
			var _g1 = this.windowDownListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,pressure);
			}
		}
	}
	,sendUpEvent: function(windowId,x,y,pressure) {
		if(this.windowUpListeners != null) {
			var _g = 0;
			var _g1 = this.windowUpListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,pressure);
			}
		}
	}
	,sendMoveEvent: function(windowId,x,y,pressure) {
		if(this.windowMoveListeners != null) {
			var _g = 0;
			var _g1 = this.windowMoveListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,pressure);
			}
		}
	}
	,sendEraserDownEvent: function(windowId,x,y,pressure) {
		if(this.windowEraserDownListeners != null) {
			var _g = 0;
			var _g1 = this.windowEraserDownListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,pressure);
			}
		}
	}
	,sendEraserUpEvent: function(windowId,x,y,pressure) {
		if(this.windowEraserUpListeners != null) {
			var _g = 0;
			var _g1 = this.windowEraserUpListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,pressure);
			}
		}
	}
	,sendEraserMoveEvent: function(windowId,x,y,pressure) {
		if(this.windowEraserMoveListeners != null) {
			var _g = 0;
			var _g1 = this.windowEraserMoveListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,pressure);
			}
		}
	}
	,__class__: kha_input_Pen
};
var kha_input_Sensor = function() {
	this.listeners = [];
};
$hxClasses["kha.input.Sensor"] = kha_input_Sensor;
kha_input_Sensor.__name__ = true;
kha_input_Sensor.get = function(type) {
	switch(type) {
	case 0:
		return kha_input_Sensor.accelerometer;
	case 1:
		return kha_input_Sensor.gyroscope;
	}
};
kha_input_Sensor._changed = function(type,x,y,z) {
	var sensor = kha_input_Sensor.get(type == 0 ? 0 : 1);
	var _g = 0;
	var _g1 = sensor.listeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener(x,y,z);
	}
};
kha_input_Sensor.prototype = {
	listeners: null
	,notify: function(listener) {
		if(!kha_input_Sensor.isInited) {
			kha_SystemImpl.initSensor();
			kha_input_Sensor.isInited = true;
		}
		this.listeners.push(listener);
	}
	,__class__: kha_input_Sensor
};
var kha_input_TouchDownEventBlockBehavior = $hxEnums["kha.input.TouchDownEventBlockBehavior"] = { __ename__:true,__constructs__:null
	,Full: {_hx_name:"Full",_hx_index:0,__enum__:"kha.input.TouchDownEventBlockBehavior",toString:$estr}
	,None: {_hx_name:"None",_hx_index:1,__enum__:"kha.input.TouchDownEventBlockBehavior",toString:$estr}
	,Custom: ($_=function(func) { return {_hx_index:2,func:func,__enum__:"kha.input.TouchDownEventBlockBehavior",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["func"],$_)
};
kha_input_TouchDownEventBlockBehavior.__constructs__ = [kha_input_TouchDownEventBlockBehavior.Full,kha_input_TouchDownEventBlockBehavior.None,kha_input_TouchDownEventBlockBehavior.Custom];
var kha_input_Surface = $hx_exports["kha"]["input"]["Surface"] = function() {
	this.touchStartListeners = [];
	this.touchEndListeners = [];
	this.moveListeners = [];
	kha_input_Surface.instance = this;
};
$hxClasses["kha.input.Surface"] = kha_input_Surface;
kha_input_Surface.__name__ = true;
kha_input_Surface.get = function(num) {
	if(num == null) {
		num = 0;
	}
	if(num != 0) {
		return null;
	}
	return kha_input_Surface.instance;
};
kha_input_Surface.setTouchDownEventBlockBehavior = function(behavior) {
	kha_input_Surface.touchDownEventBlockBehavior = behavior;
};
kha_input_Surface.prototype = {
	notify: function(touchStartListener,touchEndListener,moveListener) {
		if(touchStartListener != null) {
			this.touchStartListeners.push(touchStartListener);
		}
		if(touchEndListener != null) {
			this.touchEndListeners.push(touchEndListener);
		}
		if(moveListener != null) {
			this.moveListeners.push(moveListener);
		}
	}
	,remove: function(touchStartListener,touchEndListener,moveListener) {
		if(touchStartListener != null) {
			HxOverrides.remove(this.touchStartListeners,touchStartListener);
		}
		if(touchEndListener != null) {
			HxOverrides.remove(this.touchEndListeners,touchEndListener);
		}
		if(moveListener != null) {
			HxOverrides.remove(this.moveListeners,moveListener);
		}
	}
	,touchStartListeners: null
	,touchEndListeners: null
	,moveListeners: null
	,sendTouchStartEvent: function(index,x,y) {
		var _g = 0;
		var _g1 = this.touchStartListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(index,x,y);
		}
	}
	,sendTouchEndEvent: function(index,x,y) {
		var _g = 0;
		var _g1 = this.touchEndListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(index,x,y);
		}
	}
	,sendMoveEvent: function(index,x,y) {
		var _g = 0;
		var _g1 = this.moveListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(index,x,y);
		}
	}
	,__class__: kha_input_Surface
};
var kha_internal_BytesBlob = function(bytes) {
	this.bytes = bytes;
};
$hxClasses["kha.internal.BytesBlob"] = kha_internal_BytesBlob;
kha_internal_BytesBlob.__name__ = true;
kha_internal_BytesBlob.__interfaces__ = [kha_Resource];
kha_internal_BytesBlob.fromBytes = function(bytes) {
	return new kha_internal_BytesBlob(bytes);
};
kha_internal_BytesBlob.alloc = function(size) {
	return new kha_internal_BytesBlob(new haxe_io_Bytes(new ArrayBuffer(size)));
};
kha_internal_BytesBlob.readF32 = function(i) {
	var sign = (i & -2147483648) == 0 ? 1 : -1;
	var exp = i >> 23 & 255;
	var man = i & 8388607;
	switch(exp) {
	case 0:
		return 0.0;
	case 255:
		if(man != 0) {
			return NaN;
		} else if(sign > 0) {
			return Infinity;
		} else {
			return -Infinity;
		}
		break;
	default:
		return sign * ((man + 8388608) / 8388608.0) * Math.pow(2,exp - 127);
	}
};
kha_internal_BytesBlob.bit = function(value,position) {
	var b = (value >>> position & 1) == 1;
	if(b) {
		var a = 3;
		++a;
		return true;
	} else {
		var c = 4;
		--c;
		return false;
	}
};
kha_internal_BytesBlob.toText = function(chars,length) {
	var value = "";
	var _g = 0;
	var _g1 = length;
	while(_g < _g1) {
		var i = _g++;
		value += String.fromCodePoint(chars[i]);
	}
	return value;
};
kha_internal_BytesBlob.prototype = {
	bytes: null
	,sub: function(start,length) {
		return new kha_internal_BytesBlob(this.bytes.sub(start,length));
	}
	,length: null
	,get_length: function() {
		return this.bytes.length;
	}
	,writeU8: function(position,value) {
		this.bytes.b[position] = value;
	}
	,readU8: function(position) {
		var byte = this.bytes.b[position];
		++position;
		return byte;
	}
	,readS8: function(position) {
		var byte = this.bytes.b[position];
		++position;
		var sign = (byte & 128) == 0 ? 1 : -1;
		byte &= 127;
		return sign * byte;
	}
	,readU16BE: function(position) {
		var first = this.bytes.b[position];
		var second = this.bytes.b[position + 1];
		position += 2;
		return first * 256 + second;
	}
	,readU16LE: function(position) {
		var first = this.bytes.b[position];
		var second = this.bytes.b[position + 1];
		position += 2;
		return second * 256 + first;
	}
	,readU32LE: function(position) {
		var fourth = this.bytes.b[position];
		var third = this.bytes.b[position + 1];
		var second = this.bytes.b[position + 2];
		var first = this.bytes.b[position + 3];
		position += 4;
		return fourth + third * 256 + second * 256 * 256 + first * 256 * 256 * 256;
	}
	,readU32BE: function(position) {
		var fourth = this.bytes.b[position];
		var third = this.bytes.b[position + 1];
		var second = this.bytes.b[position + 2];
		var first = this.bytes.b[position + 3];
		position += 4;
		return first + second * 256 + third * 256 * 256 + fourth * 256 * 256 * 256;
	}
	,readS16BE: function(position) {
		var first = this.bytes.b[position];
		var second = this.bytes.b[position + 1];
		position += 2;
		var sign = (first & 128) == 0 ? 1 : -1;
		first &= 127;
		if(sign == -1) {
			return -32767 + first * 256 + second;
		} else {
			return first * 256 + second;
		}
	}
	,readS16LE: function(position) {
		var first = this.bytes.b[position];
		var second = this.bytes.b[position + 1];
		var sign = (second & 128) == 0 ? 1 : -1;
		second &= 127;
		position += 2;
		if(sign == -1) {
			return -32767 + second * 256 + first;
		} else {
			return second * 256 + first;
		}
	}
	,readS32LE: function(position) {
		var fourth = this.bytes.b[position];
		var third = this.bytes.b[position + 1];
		var second = this.bytes.b[position + 2];
		var first = this.bytes.b[position + 3];
		var sign = (first & 128) == 0 ? 1 : -1;
		first &= 127;
		position += 4;
		if(sign == -1) {
			return -2147483647 + fourth + third * 256 + second * 256 * 256 + first * 256 * 256 * 256;
		} else {
			return fourth + third * 256 + second * 256 * 256 + first * 256 * 256 * 256;
		}
	}
	,readS32BE: function(position) {
		var fourth = this.bytes.b[position];
		var third = this.bytes.b[position + 1];
		var second = this.bytes.b[position + 2];
		var first = this.bytes.b[position + 3];
		var sign = (fourth & 128) == 0 ? 1 : -1;
		fourth &= 127;
		position += 4;
		if(sign == -1) {
			return -2147483647 + first + second * 256 + third * 256 * 256 + fourth * 256 * 256 * 256;
		}
		return first + second * 256 + third * 256 * 256 + fourth * 256 * 256 * 256;
	}
	,readF32LE: function(position) {
		return kha_internal_BytesBlob.readF32(this.readS32LE(position));
	}
	,readF32BE: function(position) {
		return kha_internal_BytesBlob.readF32(this.readS32BE(position));
	}
	,toString: function() {
		return this.bytes.toString();
	}
	,readUtf8String: function() {
		return this.bytes.toString();
	}
	,toBytes: function() {
		return this.bytes;
	}
	,unload: function() {
		this.bytes = null;
	}
	,__class__: kha_internal_BytesBlob
};
var kha_internal_HdrFormat = function() { };
$hxClasses["kha.internal.HdrFormat"] = kha_internal_HdrFormat;
kha_internal_HdrFormat.__name__ = true;
kha_internal_HdrFormat.readBuf = function(buf) {
	var bytesRead = 0;
	while(true) {
		buf[bytesRead++] = kha_internal_HdrFormat.buffer[kha_internal_HdrFormat.fileOffset];
		if(!(++kha_internal_HdrFormat.fileOffset < kha_internal_HdrFormat.bufferLength && bytesRead < buf.length)) {
			break;
		}
	}
	return bytesRead;
};
kha_internal_HdrFormat.readBufOffset = function(buf,offset,length) {
	var bytesRead = 0;
	while(true) {
		buf[offset + bytesRead++] = kha_internal_HdrFormat.buffer[kha_internal_HdrFormat.fileOffset];
		if(!(++kha_internal_HdrFormat.fileOffset < kha_internal_HdrFormat.bufferLength && bytesRead < length)) {
			break;
		}
	}
	return bytesRead;
};
kha_internal_HdrFormat.readPixelsRaw = function(buffer,data,offset,numpixels) {
	var numExpected = 4 * numpixels;
	var numRead = kha_internal_HdrFormat.readBufOffset(data,offset,numExpected);
	if(numRead < numExpected) {
		haxe_Log.trace("Error reading raw pixels: got " + numRead + " bytes, expected " + numExpected,{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 39, className : "kha.internal.HdrFormat", methodName : "readPixelsRaw"});
		return;
	}
};
kha_internal_HdrFormat.readPixelsRawRLE = function(buffer,data,offset,scanline_width,num_scanlines) {
	var this1 = new Uint8Array(4);
	var rgbe = this1;
	var scanline_buffer = null;
	var ptr;
	var ptr_end;
	var count;
	var this1 = new Uint8Array(2);
	var buf = this1;
	while(num_scanlines > 0) {
		if(kha_internal_HdrFormat.readBuf(rgbe) < rgbe.length) {
			haxe_Log.trace("Error reading bytes: expected " + rgbe.length,{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 55, className : "kha.internal.HdrFormat", methodName : "readPixelsRawRLE"});
			return;
		}
		if(rgbe[0] != 2 || rgbe[1] != 2 || (rgbe[2] & 128) != 0) {
			data[offset++] = rgbe[0];
			data[offset++] = rgbe[1];
			data[offset++] = rgbe[2];
			data[offset++] = rgbe[3];
			kha_internal_HdrFormat.readPixelsRaw(buffer,data,offset,scanline_width * num_scanlines - 1);
			return;
		}
		if(((rgbe[2] & 255) << 8 | rgbe[3] & 255) != scanline_width) {
			haxe_Log.trace("Wrong scanline width " + ((rgbe[2] & 255) << 8 | rgbe[3] & 255) + ", expected " + scanline_width,{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 70, className : "kha.internal.HdrFormat", methodName : "readPixelsRawRLE"});
			return;
		}
		if(scanline_buffer == null) {
			var this1 = new Uint8Array(4 * scanline_width);
			scanline_buffer = this1;
		}
		ptr = 0;
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			ptr_end = (i + 1) * scanline_width;
			while(ptr < ptr_end) {
				if(kha_internal_HdrFormat.readBuf(buf) < buf.length) {
					haxe_Log.trace("Error reading 2-byte buffer",{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 84, className : "kha.internal.HdrFormat", methodName : "readPixelsRawRLE"});
					return;
				}
				if((buf[0] & 255) > 128) {
					count = (buf[0] & 255) - 128;
					if(count == 0 || count > ptr_end - ptr) {
						haxe_Log.trace("Bad scanline data",{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 91, className : "kha.internal.HdrFormat", methodName : "readPixelsRawRLE"});
						return;
					}
					while(count-- > 0) scanline_buffer[ptr++] = buf[1];
				} else {
					count = buf[0] & 255;
					if(count == 0 || count > ptr_end - ptr) {
						haxe_Log.trace("Bad scanline data",{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 102, className : "kha.internal.HdrFormat", methodName : "readPixelsRawRLE"});
						return;
					}
					scanline_buffer[ptr++] = buf[1];
					if(--count > 0) {
						if(kha_internal_HdrFormat.readBufOffset(scanline_buffer,ptr,count) < count) {
							haxe_Log.trace("Error reading non-run data",{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 108, className : "kha.internal.HdrFormat", methodName : "readPixelsRawRLE"});
							return;
						}
						ptr += count;
					}
				}
			}
		}
		var _g1 = 0;
		var _g2 = scanline_width;
		while(_g1 < _g2) {
			var i1 = _g1++;
			data[offset] = scanline_buffer[i1];
			data[offset + 1] = scanline_buffer[i1 + scanline_width];
			data[offset + 2] = scanline_buffer[i1 + 2 * scanline_width];
			data[offset + 3] = scanline_buffer[i1 + 3 * scanline_width];
			offset += 4;
		}
		--num_scanlines;
	}
};
kha_internal_HdrFormat.readLine = function() {
	var buf = "";
	while(true) {
		var b = kha_internal_HdrFormat.buffer[kha_internal_HdrFormat.fileOffset];
		if(b == 10) {
			++kha_internal_HdrFormat.fileOffset;
			break;
		}
		buf += String.fromCodePoint(b);
		if(!(++kha_internal_HdrFormat.fileOffset < kha_internal_HdrFormat.bufferLength)) {
			break;
		}
	}
	return buf;
};
kha_internal_HdrFormat.parse = function(bytes) {
	kha_internal_HdrFormat.buffer = haxe_io_UInt8Array.fromBytes(bytes);
	kha_internal_HdrFormat.bufferLength = kha_internal_HdrFormat.buffer.length;
	kha_internal_HdrFormat.fileOffset = 0;
	var width = 0;
	var height = 0;
	var exposure = 1.0;
	var rle = false;
	var _g = 0;
	while(_g < 20) {
		var i = _g++;
		var line = kha_internal_HdrFormat.readLine();
		if(kha_internal_HdrFormat.formatPattern.match(line)) {
			rle = true;
		} else if(kha_internal_HdrFormat.exposurePattern.match(line)) {
			exposure = parseFloat(kha_internal_HdrFormat.exposurePattern.matched(1));
		} else if(kha_internal_HdrFormat.widthHeightPattern.match(line)) {
			height = Std.parseInt(kha_internal_HdrFormat.widthHeightPattern.matched(1));
			width = Std.parseInt(kha_internal_HdrFormat.widthHeightPattern.matched(2));
			break;
		}
	}
	if(!rle) {
		haxe_Log.trace("File is not run length encoded!",{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 171, className : "kha.internal.HdrFormat", methodName : "parse"});
		return null;
	}
	var this1 = new Uint8Array(width * height * 4);
	var data = this1;
	var scanline_width = width;
	var num_scanlines = height;
	kha_internal_HdrFormat.readPixelsRawRLE(kha_internal_HdrFormat.buffer,data,0,scanline_width,num_scanlines);
	var this1 = new Float32Array(width * height * 4);
	var floatData = this1;
	var offset = 0;
	while(offset < data.length) {
		var r = data[offset] / 255;
		var g = data[offset + 1] / 255;
		var b = data[offset + 2] / 255;
		var e = data[offset + 3];
		var f = Math.pow(2.0,e - 128.0);
		r *= f;
		g *= f;
		b *= f;
		floatData[offset] = r;
		floatData[offset + 1] = g;
		floatData[offset + 2] = b;
		floatData[offset + 3] = 1.0;
		offset += 4;
	}
	return { width : width, height : height, data : floatData};
};
var kha_js_AEAudioChannel = function(element,looping) {
	this.stopped = false;
	this.element = element;
	this.looping = looping;
};
$hxClasses["kha.js.AEAudioChannel"] = kha_js_AEAudioChannel;
kha_js_AEAudioChannel.__name__ = true;
kha_js_AEAudioChannel.__interfaces__ = [kha_audio1_AudioChannel];
kha_js_AEAudioChannel.prototype = {
	element: null
	,stopped: null
	,looping: null
	,play: function() {
		this.stopped = false;
		this.element.play();
	}
	,pause: function() {
		try {
			this.element.pause();
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace(e,{ fileName : "kha/js/AEAudioChannel.hx", lineNumber : 26, className : "kha.js.AEAudioChannel", methodName : "pause"});
		}
	}
	,stop: function() {
		try {
			this.element.pause();
			this.element.currentTime = 0;
			this.stopped = true;
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace(e,{ fileName : "kha/js/AEAudioChannel.hx", lineNumber : 37, className : "kha.js.AEAudioChannel", methodName : "stop"});
		}
	}
	,get_length: function() {
		var f = this.element.duration;
		if(isFinite(f)) {
			return this.element.duration;
		} else {
			return Infinity;
		}
	}
	,get_position: function() {
		return this.element.currentTime;
	}
	,set_position: function(value) {
		return this.element.currentTime = value;
	}
	,get_volume: function() {
		return this.element.volume;
	}
	,set_volume: function(value) {
		return this.element.volume = value;
	}
	,get_finished: function() {
		if(!this.stopped) {
			if(!this.looping) {
				return this.get_position() >= this.get_length();
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	,__class__: kha_js_AEAudioChannel
};
var kha_js_AudioElementAudio = function() { };
$hxClasses["kha.js.AudioElementAudio"] = kha_js_AudioElementAudio;
kha_js_AudioElementAudio.__name__ = true;
kha_js_AudioElementAudio.play = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	return kha_js_AudioElementAudio.stream(sound,loop);
};
kha_js_AudioElementAudio.stream = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	sound.element.loop = loop;
	var channel = new kha_js_AEAudioChannel(sound.element,loop);
	channel.play();
	return channel;
};
var kha_js_CanvasGraphics = function(canvas) {
	this.bakedQuadCache = new kha_AlignedQuad();
	this.clipping = false;
	kha_graphics2_Graphics.call(this);
	this.canvas = canvas;
	kha_js_CanvasGraphics.instance = this;
	this.myColor = kha_Color.fromBytes(0,0,0);
};
$hxClasses["kha.js.CanvasGraphics"] = kha_js_CanvasGraphics;
kha_js_CanvasGraphics.__name__ = true;
kha_js_CanvasGraphics.stringWidth = function(font,text) {
	if(kha_js_CanvasGraphics.instance == null) {
		return 5 * text.length;
	} else {
		kha_js_CanvasGraphics.instance.set_font(font);
		return kha_js_CanvasGraphics.instance.canvas.measureText(text).width;
	}
};
kha_js_CanvasGraphics.__super__ = kha_graphics2_Graphics;
kha_js_CanvasGraphics.prototype = $extend(kha_graphics2_Graphics.prototype,{
	canvas: null
	,webfont: null
	,myColor: null
	,scaleQuality: null
	,clipping: null
	,begin: function(clear,clearColor) {
		if(clear == null) {
			clear = true;
		}
		if(clear) {
			this.clear(clearColor);
		}
	}
	,clear: function(color) {
		if(color == null) {
			color = 0;
		}
		this.canvas.strokeStyle = "rgba(" + ((color & 16711680) >>> 16) + "," + ((color & 65280) >>> 8) + "," + (color & 255) + "," + (color >>> 24) * 0.00392156862745098 + ")";
		this.canvas.fillStyle = "rgba(" + ((color & 16711680) >>> 16) + "," + ((color & 65280) >>> 8) + "," + (color & 255) + "," + (color >>> 24) * 0.00392156862745098 + ")";
		if((color >>> 24) * 0.00392156862745098 == 0) {
			this.canvas.clearRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height);
		} else {
			this.canvas.fillRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height);
		}
		this.set_color(this.myColor);
	}
	,end: function() {
	}
	,drawImage: function(img,x,y) {
		this.canvas.globalAlpha = this.get_opacity();
		this.canvas.drawImage((js_Boot.__cast(img , kha_CanvasImage)).image,x,y);
		this.canvas.globalAlpha = 1;
	}
	,drawScaledSubImage: function(image,sx,sy,sw,sh,dx,dy,dw,dh) {
		this.canvas.globalAlpha = this.get_opacity();
		try {
			if(dw < 0 || dh < 0) {
				this.canvas.save();
				this.canvas.translate(dx,dy);
				var x = 0.0;
				var y = 0.0;
				if(dw < 0) {
					this.canvas.scale(-1,1);
					x = -dw;
				}
				if(dh < 0) {
					this.canvas.scale(1,-1);
					y = -dh;
				}
				this.canvas.drawImage((js_Boot.__cast(image , kha_CanvasImage)).image,sx,sy,sw,sh,x,y,dw,dh);
				this.canvas.restore();
			} else {
				this.canvas.drawImage((js_Boot.__cast(image , kha_CanvasImage)).image,sx,sy,sw,sh,dx,dy,dw,dh);
			}
		} catch( _g ) {
		}
		this.canvas.globalAlpha = 1;
	}
	,set_color: function(color) {
		this.myColor = color;
		this.canvas.strokeStyle = "rgba(" + ((color & 16711680) >>> 16) + "," + ((color & 65280) >>> 8) + "," + (color & 255) + "," + (color >>> 24) * 0.00392156862745098 + ")";
		this.canvas.fillStyle = "rgba(" + ((color & 16711680) >>> 16) + "," + ((color & 65280) >>> 8) + "," + (color & 255) + "," + (color >>> 24) * 0.00392156862745098 + ")";
		return color;
	}
	,get_color: function() {
		return this.myColor;
	}
	,get_imageScaleQuality: function() {
		return this.scaleQuality;
	}
	,set_imageScaleQuality: function(value) {
		if(value == 0) {
			this.canvas.mozImageSmoothingEnabled = false;
			this.canvas.webkitImageSmoothingEnabled = false;
			this.canvas.msImageSmoothingEnabled = false;
			this.canvas.imageSmoothingEnabled = false;
		} else {
			this.canvas.mozImageSmoothingEnabled = true;
			this.canvas.webkitImageSmoothingEnabled = true;
			this.canvas.msImageSmoothingEnabled = true;
			this.canvas.imageSmoothingEnabled = true;
		}
		return this.scaleQuality = value;
	}
	,drawRect: function(x,y,width,height,strength) {
		if(strength == null) {
			strength = 1.0;
		}
		this.canvas.beginPath();
		var oldStrength = this.canvas.lineWidth;
		this.canvas.lineWidth = Math.round(strength);
		this.canvas.rect(x,y,width,height);
		this.canvas.stroke();
		this.canvas.lineWidth = oldStrength;
	}
	,fillRect: function(x,y,width,height) {
		var tmp = this.get_opacity();
		this.canvas.globalAlpha = tmp * ((this.myColor >>> 24) * 0.00392156862745098);
		this.canvas.fillRect(x,y,width,height);
		this.canvas.globalAlpha = this.get_opacity();
	}
	,drawArc: function(cx,cy,radius,sAngle,eAngle,strength,ccw) {
		if(ccw == null) {
			ccw = false;
		}
		if(strength == null) {
			strength = 1.0;
		}
		this.canvas.beginPath();
		var oldStrength = this.canvas.lineWidth;
		this.canvas.lineWidth = Math.round(strength);
		this.canvas.arc(cx,cy,radius,sAngle,eAngle,ccw);
		this.canvas.stroke();
		this.canvas.lineWidth = oldStrength;
	}
	,drawCircle: function(cx,cy,radius,strength) {
		if(strength == null) {
			strength = 1.0;
		}
		var eAngle = 2 * Math.PI;
		this.canvas.beginPath();
		var oldStrength = this.canvas.lineWidth;
		this.canvas.lineWidth = Math.round(strength);
		this.canvas.arc(cx,cy,radius,0,eAngle,false);
		this.canvas.stroke();
		this.canvas.lineWidth = oldStrength;
	}
	,_drawArc: function(cx,cy,radius,sAngle,eAngle,strength,ccw) {
		this.canvas.beginPath();
		var oldStrength = this.canvas.lineWidth;
		this.canvas.lineWidth = Math.round(strength);
		this.canvas.arc(cx,cy,radius,sAngle,eAngle,ccw);
		this.canvas.stroke();
		this.canvas.lineWidth = oldStrength;
	}
	,fillArc: function(cx,cy,radius,sAngle,eAngle,ccw) {
		if(ccw == null) {
			ccw = false;
		}
		this.canvas.beginPath();
		this.canvas.arc(cx,cy,radius,sAngle,eAngle,ccw);
		this.canvas.fill();
	}
	,fillCircle: function(cx,cy,radius) {
		this.canvas.beginPath();
		this.canvas.arc(cx,cy,radius,0,2 * Math.PI,false);
		this.canvas.fill();
	}
	,bakedQuadCache: null
	,drawString: function(text,x,y) {
		var image = this.webfont.getImage(this.get_fontSize(),this.myColor);
		if(image.width > 0) {
			var xpos = x;
			var ypos = y;
			var _g = 0;
			var _g1 = text.length;
			while(_g < _g1) {
				var i = _g++;
				var q = this.webfont.kravur._get(this.get_fontSize()).getBakedQuad(this.bakedQuadCache,kha_graphics2_Graphics.fontGlyphs.indexOf(HxOverrides.cca(text,i)),xpos,ypos);
				if(q != null) {
					if(q.s1 - q.s0 > 0 && q.t1 - q.t0 > 0 && q.x1 - q.x0 > 0 && q.y1 - q.y0 > 0) {
						this.canvas.drawImage(image,q.s0 * image.width,q.t0 * image.height,(q.s1 - q.s0) * image.width,(q.t1 - q.t0) * image.height,q.x0,q.y0,q.x1 - q.x0,q.y1 - q.y0);
					}
					xpos += q.xadvance;
				}
			}
		}
	}
	,drawCharacters: function(text,start,length,x,y) {
		var image = this.webfont.getImage(this.get_fontSize(),this.myColor);
		if(image.width > 0) {
			var xpos = x;
			var ypos = y;
			var _g = start;
			var _g1 = start + length;
			while(_g < _g1) {
				var i = _g++;
				var q = this.webfont.kravur._get(this.get_fontSize()).getBakedQuad(this.bakedQuadCache,kha_graphics2_Graphics.fontGlyphs.indexOf(text[i]),xpos,ypos);
				if(q != null) {
					if(q.s1 - q.s0 > 0 && q.t1 - q.t0 > 0 && q.x1 - q.x0 > 0 && q.y1 - q.y0 > 0) {
						this.canvas.drawImage(image,q.s0 * image.width,q.t0 * image.height,(q.s1 - q.s0) * image.width,(q.t1 - q.t0) * image.height,q.x0,q.y0,q.x1 - q.x0,q.y1 - q.y0);
					}
					xpos += q.xadvance;
				}
			}
		}
	}
	,set_font: function(font) {
		this.webfont = js_Boot.__cast(font , kha_js_Font);
		return this.webfont;
	}
	,get_font: function() {
		return this.webfont;
	}
	,drawLine: function(x1,y1,x2,y2,strength) {
		if(strength == null) {
			strength = 1.0;
		}
		this.canvas.beginPath();
		var oldWith = this.canvas.lineWidth;
		this.canvas.lineWidth = Math.round(strength);
		this.canvas.moveTo(x1,y1);
		this.canvas.lineTo(x2,y2);
		this.canvas.moveTo(0,0);
		this.canvas.stroke();
		this.canvas.lineWidth = oldWith;
	}
	,fillTriangle: function(x1,y1,x2,y2,x3,y3) {
		this.canvas.beginPath();
		this.canvas.moveTo(x1,y1);
		this.canvas.lineTo(x2,y2);
		this.canvas.lineTo(x3,y3);
		this.canvas.closePath();
		this.canvas.fill();
	}
	,scissor: function(x,y,width,height) {
		if(!this.clipping) {
			this.canvas.save();
			this.clipping = true;
		}
		this.canvas.beginPath();
		this.canvas.rect(x,y,width,height);
		this.canvas.clip();
	}
	,disableScissor: function() {
		if(this.clipping) {
			this.canvas.restore();
			this.clipping = false;
		}
	}
	,drawVideo: function(video,x,y,width,height) {
		this.canvas.drawImage((js_Boot.__cast(video , kha_js_Video)).element,x,y,width,height);
	}
	,setTransformation: function(transformation) {
		this.canvas.setTransform(transformation._00,transformation._01,transformation._10,transformation._11,transformation._20,transformation._21);
	}
	,__class__: kha_js_CanvasGraphics
});
var kha_js_Font = function(blob) {
	this.images = new haxe_ds_IntMap();
	this.kravur = new kha_js_Font.Kravur(blob);
};
$hxClasses["kha.js.Font"] = kha_js_Font;
kha_js_Font.__name__ = true;
kha_js_Font.__interfaces__ = [kha_Resource];
kha_js_Font.fromBytes = function(bytes) {
	return new kha_js_Font(kha_internal_BytesBlob.fromBytes(bytes));
};
kha_js_Font.prototype = {
	kravur: null
	,images: null
	,height: function(fontSize) {
		return this.kravur._get(fontSize).getHeight();
	}
	,width: function(fontSize,str) {
		return this.kravur._get(fontSize).stringWidth(str);
	}
	,widthOfCharacters: function(fontSize,characters,start,length) {
		return this.kravur._get(fontSize).charactersWidth(characters,start,length);
	}
	,baseline: function(fontSize) {
		return this.kravur._get(fontSize).getBaselinePosition();
	}
	,getImage: function(fontSize,color) {
		var glyphs = kha_graphics2_Graphics.fontGlyphs;
		var imageIndex = fontSize * 10000 + glyphs.length;
		if(!this.images.h.hasOwnProperty(imageIndex)) {
			var this1 = this.images;
			var v = new haxe_ds_IntMap();
			this1.h[imageIndex] = v;
		}
		if(!this.images.h[imageIndex].h.hasOwnProperty(color)) {
			var kravur = this.kravur._get(fontSize);
			var canvas = window.document.createElement("canvas");
			canvas.width = kravur.width;
			canvas.height = kravur.height;
			var ctx = canvas.getContext("2d");
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,kravur.width,kravur.height);
			var imageData = ctx.getImageData(0,0,kravur.width,kravur.height);
			var bytes = (js_Boot.__cast(kravur.getTexture() , kha_CanvasImage)).bytes;
			var _g = 0;
			var _g1 = bytes.length;
			while(_g < _g1) {
				var i = _g++;
				imageData.data[i * 4] = (color & 16711680) >>> 16;
				imageData.data[i * 4 + 1] = (color & 65280) >>> 8;
				imageData.data[i * 4 + 2] = color & 255;
				imageData.data[i * 4 + 3] = bytes.b[i];
			}
			ctx.putImageData(imageData,0,0);
			var img = window.document.createElement("img");
			img.src = canvas.toDataURL("image/png");
			this.images.h[imageIndex].h[color] = img;
			return img;
		}
		return this.images.h[imageIndex].h[color];
	}
	,unload: function() {
		this.kravur = null;
		this.images = null;
	}
	,__class__: kha_js_Font
};
var kha_js_MobileWebAudio = function() { };
$hxClasses["kha.js.MobileWebAudio"] = kha_js_MobileWebAudio;
kha_js_MobileWebAudio.__name__ = true;
kha_js_MobileWebAudio._init = function() {
	try {
		kha_js_MobileWebAudio._context = new AudioContext();
		return;
	} catch( _g ) {
	}
	try {
		this._context = new webkitAudioContext();
		return;
	} catch( _g ) {
	}
};
kha_js_MobileWebAudio.play = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	var channel = new kha_js_MobileWebAudioChannel(sound,loop);
	channel.play();
	return channel;
};
kha_js_MobileWebAudio.stream = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	return kha_js_MobileWebAudio.play(sound,loop);
};
var kha_js_MobileWebAudioChannel = function(sound,loop) {
	this.stopped = false;
	this.paused = false;
	this.buffer = sound._buffer;
	this.loop = loop;
	this.createSource();
};
$hxClasses["kha.js.MobileWebAudioChannel"] = kha_js_MobileWebAudioChannel;
kha_js_MobileWebAudioChannel.__name__ = true;
kha_js_MobileWebAudioChannel.__interfaces__ = [kha_audio1_AudioChannel];
kha_js_MobileWebAudioChannel.prototype = {
	buffer: null
	,loop: null
	,source: null
	,gain: null
	,startTime: null
	,pauseTime: null
	,paused: null
	,stopped: null
	,createSource: function() {
		var _gthis = this;
		this.source = kha_js_MobileWebAudio._context.createBufferSource();
		this.source.loop = this.loop;
		this.source.buffer = this.buffer;
		this.source.onended = function() {
			_gthis.stopped = true;
		};
		this.gain = kha_js_MobileWebAudio._context.createGain();
		this.source.connect(this.gain);
		this.gain.connect(kha_js_MobileWebAudio._context.destination);
	}
	,play: function() {
		if(this.paused || this.stopped) {
			this.createSource();
		}
		this.stopped = false;
		if(this.paused) {
			this.paused = false;
			this.startTime = kha_js_MobileWebAudio._context.currentTime - this.pauseTime;
			this.source.start(0,this.pauseTime);
		} else {
			this.startTime = kha_js_MobileWebAudio._context.currentTime;
			this.source.start();
		}
	}
	,pause: function() {
		var wasStopped = this.paused || this.stopped;
		this.pauseTime = kha_js_MobileWebAudio._context.currentTime - this.startTime;
		this.paused = true;
		if(wasStopped) {
			return;
		}
		this.source.stop();
	}
	,stop: function() {
		var wasStopped = this.paused || this.stopped;
		this.paused = false;
		this.stopped = true;
		if(wasStopped) {
			return;
		}
		this.source.stop();
	}
	,get_length: function() {
		return this.source.buffer.duration;
	}
	,get_position: function() {
		if(this.stopped) {
			return this.get_length();
		}
		if(this.paused) {
			return this.pauseTime;
		} else {
			return kha_js_MobileWebAudio._context.currentTime - this.startTime;
		}
	}
	,set_position: function(value) {
		return value;
	}
	,get_volume: function() {
		return this.gain.gain.value;
	}
	,set_volume: function(value) {
		return this.gain.gain.value = value;
	}
	,get_finished: function() {
		return this.stopped;
	}
	,__class__: kha_js_MobileWebAudioChannel
};
var kha_js_MobileWebAudioSound = function(filename,done,failed) {
	var _gthis = this;
	kha_Sound.call(this);
	var request = new XMLHttpRequest();
	request.open("GET",filename,true);
	request.responseType = "arraybuffer";
	request.onerror = function() {
		failed({ url : filename});
	};
	request.onload = function() {
		_gthis.compressedData = haxe_io_Bytes.ofData(request.response);
		_gthis.uncompressedData = null;
		kha_js_MobileWebAudio._context.decodeAudioData(_gthis.compressedData.b.bufferValue,function(buffer) {
			_gthis.length = buffer.duration;
			_gthis.channels = buffer.numberOfChannels;
			_gthis._buffer = buffer;
			done(_gthis);
		},function() {
			failed({ url : filename, error : "Audio format not supported"});
		});
	};
	request.send(null);
};
$hxClasses["kha.js.MobileWebAudioSound"] = kha_js_MobileWebAudioSound;
kha_js_MobileWebAudioSound.__name__ = true;
kha_js_MobileWebAudioSound.__super__ = kha_Sound;
kha_js_MobileWebAudioSound.prototype = $extend(kha_Sound.prototype,{
	_buffer: null
	,uncompress: function(done) {
		done();
	}
	,__class__: kha_js_MobileWebAudioSound
});
var kha_js_Sound = function(filenames,done,failed) {
	kha_Sound.call(this);
	this.done = done;
	this.failed = failed;
	kha_js_Sound.loading.push(this);
	this.element = window.document.createElement("audio");
	this.filenames = [];
	var _g = 0;
	while(_g < filenames.length) {
		var filename = filenames[_g];
		++_g;
		if(this.element.canPlayType("audio/ogg") != "" && StringTools.endsWith(filename,".ogg")) {
			this.filenames.push(filename);
		}
		if(this.element.canPlayType("audio/mp4") != "" && StringTools.endsWith(filename,".mp4")) {
			this.filenames.push(filename);
		}
		if(this.element.canPlayType("audio/wav") != "" && StringTools.endsWith(filename,".wav")) {
			this.filenames.push(filename);
		}
	}
	this.element.addEventListener("error",$bind(this,this.errorListener),false);
	this.element.addEventListener("canplay",$bind(this,this.canPlayThroughListener),false);
	this.element.src = this.filenames[0];
	this.element.preload = "auto";
	this.element.load();
};
$hxClasses["kha.js.Sound"] = kha_js_Sound;
kha_js_Sound.__name__ = true;
kha_js_Sound.__super__ = kha_Sound;
kha_js_Sound.prototype = $extend(kha_Sound.prototype,{
	filenames: null
	,done: null
	,failed: null
	,element: null
	,errorListener: function(eventInfo) {
		if(this.element.error.code == 4) {
			var _g = 0;
			var _g1 = this.filenames.length - 1;
			while(_g < _g1) {
				var i = _g++;
				if(this.element.src == this.filenames[i]) {
					this.element.src = this.filenames[i + 1];
					return;
				}
			}
		}
		this.failed({ url : this.element.src});
		this.finishAsset();
	}
	,canPlayThroughListener: function(eventInfo) {
		this.finishAsset();
	}
	,finishAsset: function() {
		this.element.removeEventListener("error",$bind(this,this.errorListener),false);
		this.element.removeEventListener("canplaythrough",$bind(this,this.canPlayThroughListener),false);
		this.done(this);
		HxOverrides.remove(kha_js_Sound.loading,this);
	}
	,uncompress: function(done) {
		done();
	}
	,__class__: kha_js_Sound
});
var kha_js_Video = function() {
	kha_Video.call(this);
};
$hxClasses["kha.js.Video"] = kha_js_Video;
kha_js_Video.__name__ = true;
kha_js_Video.fromElement = function(element) {
	var video = new kha_js_Video();
	video.element = element;
	if(kha_SystemImpl.gl != null) {
		video.texture = kha_Image.fromVideo(video);
	}
	return video;
};
kha_js_Video.fromFile = function(filenames,done) {
	var video = new kha_js_Video();
	video.done = done;
	video.element = window.document.createElement("video");
	video.filenames = [];
	var _g = 0;
	while(_g < filenames.length) {
		var filename = filenames[_g];
		++_g;
		if(video.element.canPlayType("video/webm") != "" && StringTools.endsWith(filename,".webm")) {
			video.filenames.push(filename);
		}
		if(video.element.canPlayType("video/mp4") != "" && StringTools.endsWith(filename,".mp4")) {
			video.filenames.push(filename);
		}
	}
	video.element.addEventListener("error",$bind(video,video.errorListener),false);
	video.element.addEventListener("canplaythrough",$bind(video,video.canPlayThroughListener),false);
	video.element.preload = "auto";
	video.element.src = video.filenames[0];
};
kha_js_Video.__super__ = kha_Video;
kha_js_Video.prototype = $extend(kha_Video.prototype,{
	element: null
	,texture: null
	,filenames: null
	,done: null
	,width: function() {
		return this.element.videoWidth;
	}
	,height: function() {
		return this.element.videoHeight;
	}
	,play: function(loop) {
		if(loop == null) {
			loop = false;
		}
		try {
			this.element.loop = loop;
			this.element.play();
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace(e,{ fileName : "kha/js/Video.hx", lineNumber : 68, className : "kha.js.Video", methodName : "play"});
		}
	}
	,pause: function() {
		try {
			this.element.pause();
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace(e,{ fileName : "kha/js/Video.hx", lineNumber : 77, className : "kha.js.Video", methodName : "pause"});
		}
	}
	,stop: function() {
		try {
			this.element.pause();
			this.element.currentTime = 0;
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace(e,{ fileName : "kha/js/Video.hx", lineNumber : 87, className : "kha.js.Video", methodName : "stop"});
		}
	}
	,getCurrentPos: function() {
		return Math.ceil(this.element.currentTime * 1000);
	}
	,get_position: function() {
		return Math.ceil(this.element.currentTime * 1000);
	}
	,set_position: function(value) {
		this.element.currentTime = value / 1000;
		return value;
	}
	,getVolume: function() {
		return this.element.volume;
	}
	,setVolume: function(volume) {
		this.element.volume = volume;
	}
	,getLength: function() {
		var f = this.element.duration;
		if(isFinite(f)) {
			return Math.floor(this.element.duration * 1000);
		} else {
			return -1;
		}
	}
	,errorListener: function(eventInfo) {
		if(this.element.error.code == 4) {
			var _g = 0;
			var _g1 = this.filenames.length - 1;
			while(_g < _g1) {
				var i = _g++;
				if(this.element.src == this.filenames[i]) {
					this.element.src = this.filenames[i + 1];
					return;
				}
			}
		}
		haxe_Log.trace("Error loading " + this.element.src,{ fileName : "kha/js/Video.hx", lineNumber : 132, className : "kha.js.Video", methodName : "errorListener"});
		this.finishAsset();
	}
	,canPlayThroughListener: function(eventInfo) {
		this.finishAsset();
	}
	,finishAsset: function() {
		this.element.removeEventListener("error",$bind(this,this.errorListener),false);
		this.element.removeEventListener("canplaythrough",$bind(this,this.canPlayThroughListener),false);
		if(kha_SystemImpl.gl != null) {
			this.texture = kha_Image.fromVideo(this);
		}
		this.done(this);
	}
	,__class__: kha_js_Video
});
var kha_js_WebAudioSound = function(filename,done,failed) {
	var _gthis = this;
	kha_Sound.call(this);
	var request = new XMLHttpRequest();
	request.open("GET",filename,true);
	request.responseType = "arraybuffer";
	request.onerror = function() {
		failed({ url : filename});
	};
	request.onload = function() {
		_gthis.compressedData = haxe_io_Bytes.ofData(request.response);
		_gthis.uncompressedData = null;
		done(_gthis);
	};
	request.send(null);
};
$hxClasses["kha.js.WebAudioSound"] = kha_js_WebAudioSound;
kha_js_WebAudioSound.__name__ = true;
kha_js_WebAudioSound.__super__ = kha_Sound;
kha_js_WebAudioSound.prototype = $extend(kha_Sound.prototype,{
	superUncompress: function(done) {
		kha_Sound.prototype.uncompress.call(this,done);
	}
	,uncompress: function(done) {
		var _gthis = this;
		kha_audio2_Audio._context.decodeAudioData(this.compressedData.b.bufferValue,function(buffer) {
			var ch0 = buffer.getChannelData(0);
			var ch1 = buffer.numberOfChannels == 1 ? ch0 : buffer.getChannelData(1);
			var len = ch0.length;
			_gthis.uncompressedData = kha_arrays_Float32Array._new(len * 2);
			_gthis.length = buffer.duration;
			_gthis.channels = buffer.numberOfChannels;
			_gthis.sampleRate = Math.round(buffer.sampleRate);
			var idx = 0;
			var i = 0;
			var lidx = len * 2;
			var uncompressInner = null;
			uncompressInner = function() {
				var chk_len = idx + 11025;
				var next_chk = chk_len > lidx ? lidx : chk_len;
				while(idx < next_chk) {
					var v = ch0[i];
					_gthis.uncompressedData.setFloat32(idx * 4,v,true);
					var v1 = ch1[i];
					_gthis.uncompressedData.setFloat32((idx + 1) * 4,v1,true);
					idx += 2;
					i += 1;
				}
				if(idx < lidx) {
					window.setTimeout(uncompressInner,0);
				} else {
					_gthis.compressedData = null;
					done();
				}
			};
			uncompressInner();
		},function() {
			_gthis.superUncompress(done);
		});
	}
	,__class__: kha_js_WebAudioSound
});
var kha_js_graphics4_ConstantLocation = function(value,type) {
	this.value = value;
	this.type = type;
};
$hxClasses["kha.js.graphics4.ConstantLocation"] = kha_js_graphics4_ConstantLocation;
kha_js_graphics4_ConstantLocation.__name__ = true;
kha_js_graphics4_ConstantLocation.__interfaces__ = [kha_graphics4_ConstantLocation];
kha_js_graphics4_ConstantLocation.prototype = {
	value: null
	,type: null
	,__class__: kha_js_graphics4_ConstantLocation
};
var kha_js_graphics4_Graphics = function(renderTarget) {
	this.matrix3Cache = kha_arrays_Float32Array._new(9);
	this.matrixCache = kha_arrays_Float32Array._new(16);
	this.isDepthAttachment = false;
	this.isCubeMap = false;
	this.colorMaskAlpha = true;
	this.colorMaskBlue = true;
	this.colorMaskGreen = true;
	this.colorMaskRed = true;
	this.depthMask = false;
	this.depthTest = false;
	this.currentPipeline = null;
	this.renderTarget = renderTarget;
	this.init();
	if(kha_SystemImpl.gl2) {
		this.instancedExtension = true;
	} else {
		this.instancedExtension = kha_SystemImpl.gl.getExtension("ANGLE_instanced_arrays");
		this.blendMinMaxExtension = kha_SystemImpl.gl.getExtension("EXT_blend_minmax");
	}
};
$hxClasses["kha.js.graphics4.Graphics"] = kha_js_graphics4_Graphics;
kha_js_graphics4_Graphics.__name__ = true;
kha_js_graphics4_Graphics.__interfaces__ = [kha_graphics4_Graphics];
kha_js_graphics4_Graphics.getBlendFunc = function(factor) {
	switch(factor) {
	case 1:
		return 1;
	case 0:case 2:
		return 0;
	case 3:
		return 770;
	case 4:
		return 772;
	case 5:
		return 771;
	case 6:
		return 773;
	case 7:
		return 768;
	case 8:
		return 774;
	case 9:
		return 769;
	case 10:
		return 775;
	}
};
kha_js_graphics4_Graphics.getBlendOp = function(op) {
	switch(op) {
	case 0:
		return 32774;
	case 1:
		return 32778;
	case 2:
		return 32779;
	case 3:
		return 32775;
	case 4:
		return 32776;
	}
};
kha_js_graphics4_Graphics.prototype = {
	currentPipeline: null
	,depthTest: null
	,depthMask: null
	,colorMaskRed: null
	,colorMaskGreen: null
	,colorMaskBlue: null
	,colorMaskAlpha: null
	,indicesCount: null
	,renderTarget: null
	,renderTargetFrameBuffer: null
	,renderTargetMSAA: null
	,renderTargetTexture: null
	,isCubeMap: null
	,isDepthAttachment: null
	,instancedExtension: null
	,blendMinMaxExtension: null
	,init: function() {
		if(this.renderTarget == null) {
			return;
		}
		this.isCubeMap = ((this.renderTarget) instanceof kha_graphics4_CubeMap);
		if(this.isCubeMap) {
			var cubeMap = js_Boot.__cast(this.renderTarget , kha_graphics4_CubeMap);
			this.renderTargetFrameBuffer = cubeMap.frameBuffer;
			this.renderTargetTexture = cubeMap.texture;
			this.isDepthAttachment = cubeMap.isDepthAttachment;
		} else {
			var image = js_Boot.__cast(this.renderTarget , kha_WebGLImage);
			this.renderTargetFrameBuffer = image.frameBuffer;
			this.renderTargetMSAA = image.MSAAFrameBuffer;
			this.renderTargetTexture = image.texture;
		}
	}
	,begin: function(additionalRenderTargets) {
		kha_SystemImpl.gl.enable(3042);
		kha_SystemImpl.gl.blendFunc(770,771);
		if(this.renderTarget == null) {
			kha_SystemImpl.gl.bindFramebuffer(36160,null);
			kha_SystemImpl.gl.viewport(0,0,kha_System.windowWidth(),kha_System.windowHeight());
		} else {
			kha_SystemImpl.gl.bindFramebuffer(36160,this.renderTargetFrameBuffer);
			kha_SystemImpl.gl.viewport(0,0,this.renderTarget.get_width(),this.renderTarget.get_height());
			if(additionalRenderTargets != null) {
				kha_SystemImpl.gl.framebufferTexture2D(36160,kha_SystemImpl.drawBuffers.COLOR_ATTACHMENT0_WEBGL,3553,this.renderTargetTexture,0);
				var _g = 0;
				var _g1 = additionalRenderTargets.length;
				while(_g < _g1) {
					var i = _g++;
					kha_SystemImpl.gl.framebufferTexture2D(36160,kha_SystemImpl.drawBuffers.COLOR_ATTACHMENT0_WEBGL + i + 1,3553,(js_Boot.__cast(additionalRenderTargets[i] , kha_WebGLImage)).texture,0);
				}
				var attachments = [kha_SystemImpl.drawBuffers.COLOR_ATTACHMENT0_WEBGL];
				var _g = 0;
				var _g1 = additionalRenderTargets.length;
				while(_g < _g1) {
					var i = _g++;
					attachments.push(kha_SystemImpl.drawBuffers.COLOR_ATTACHMENT0_WEBGL + i + 1);
				}
				if(kha_SystemImpl.gl2) {
					kha_SystemImpl.gl.drawBuffers(attachments);
				} else {
					kha_SystemImpl.drawBuffers.drawBuffersWEBGL(attachments);
				}
			}
		}
	}
	,beginFace: function(face) {
		kha_SystemImpl.gl.enable(3042);
		kha_SystemImpl.gl.blendFunc(770,771);
		kha_SystemImpl.gl.bindFramebuffer(36160,this.renderTargetFrameBuffer);
		kha_SystemImpl.gl.framebufferTexture2D(36160,this.isDepthAttachment ? 36096 : 36064,34069 + face,this.renderTargetTexture,0);
		kha_SystemImpl.gl.viewport(0,0,this.renderTarget.get_width(),this.renderTarget.get_height());
	}
	,beginEye: function(eye) {
		kha_SystemImpl.gl.enable(3042);
		kha_SystemImpl.gl.blendFunc(770,771);
		kha_SystemImpl.gl.bindFramebuffer(36160,null);
		if(eye == 0) {
			kha_SystemImpl.gl.viewport(0,0,kha_System.windowWidth() * 0.5 | 0,kha_System.windowHeight());
		} else {
			kha_SystemImpl.gl.viewport(kha_System.windowWidth() * 0.5 | 0,0,kha_System.windowWidth() * 0.5 | 0,kha_System.windowHeight());
		}
	}
	,end: function() {
		if(this.renderTargetMSAA != null) {
			kha_SystemImpl.gl.bindFramebuffer(kha_SystemImpl.gl.READ_FRAMEBUFFER,this.renderTargetFrameBuffer);
			kha_SystemImpl.gl.bindFramebuffer(kha_SystemImpl.gl.DRAW_FRAMEBUFFER,this.renderTargetMSAA);
			kha_SystemImpl.gl.blitFramebuffer(0,0,this.renderTarget.get_width(),this.renderTarget.get_height(),0,0,this.renderTarget.get_width(),this.renderTarget.get_height(),16384,9728);
		}
	}
	,flush: function() {
	}
	,vsynced: function() {
		return true;
	}
	,refreshRate: function() {
		return 60;
	}
	,clear: function(color,depth,stencil) {
		var clearMask = 0;
		if(color != null) {
			clearMask |= 16384;
			kha_SystemImpl.gl.colorMask(true,true,true,true);
			kha_SystemImpl.gl.clearColor(((color & 16711680) >>> 16) * 0.00392156862745098,((color & 65280) >>> 8) * 0.00392156862745098,(color & 255) * 0.00392156862745098,(color >>> 24) * 0.00392156862745098);
		}
		if(depth != null) {
			clearMask |= 256;
			kha_SystemImpl.gl.enable(2929);
			kha_SystemImpl.gl.depthMask(true);
			kha_SystemImpl.gl.clearDepth(depth);
		}
		if(stencil != null) {
			clearMask |= 1024;
			kha_SystemImpl.gl.enable(2960);
			kha_SystemImpl.gl.stencilMask(255);
			kha_SystemImpl.gl.clearStencil(stencil);
		}
		kha_SystemImpl.gl.clear(clearMask);
		kha_SystemImpl.gl.colorMask(this.colorMaskRed,this.colorMaskGreen,this.colorMaskBlue,this.colorMaskAlpha);
		if(this.depthTest) {
			kha_SystemImpl.gl.enable(2929);
		} else {
			kha_SystemImpl.gl.disable(2929);
		}
		kha_SystemImpl.gl.depthMask(this.depthMask);
	}
	,viewport: function(x,y,width,height) {
		if(this.renderTarget == null) {
			kha_SystemImpl.gl.viewport(x,kha_System.windowHeight(0) - y - height,width,height);
		} else {
			kha_SystemImpl.gl.viewport(x,y,width,height);
		}
	}
	,scissor: function(x,y,width,height) {
		kha_SystemImpl.gl.enable(3089);
		if(this.renderTarget == null) {
			kha_SystemImpl.gl.scissor(x,kha_System.windowHeight(0) - y - height,width,height);
		} else {
			kha_SystemImpl.gl.scissor(x,y,width,height);
		}
	}
	,disableScissor: function() {
		kha_SystemImpl.gl.disable(3089);
	}
	,setDepthMode: function(write,mode) {
		switch(mode) {
		case 0:
			if(write) {
				kha_SystemImpl.gl.enable(2929);
			} else {
				kha_SystemImpl.gl.disable(2929);
			}
			this.depthTest = write;
			kha_SystemImpl.gl.depthFunc(519);
			break;
		case 1:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(512);
			break;
		case 2:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(514);
			break;
		case 3:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(517);
			break;
		case 4:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(513);
			break;
		case 5:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(515);
			break;
		case 6:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(516);
			break;
		case 7:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(518);
			break;
		}
		kha_SystemImpl.gl.depthMask(write);
		this.depthMask = write;
	}
	,setBlendingMode: function(source,destination,operation,alphaSource,alphaDestination,alphaOperation) {
		if(source == 1 && destination == 2) {
			kha_SystemImpl.gl.disable(3042);
		} else {
			kha_SystemImpl.gl.enable(3042);
			kha_SystemImpl.gl.blendFuncSeparate(kha_js_graphics4_Graphics.getBlendFunc(source),kha_js_graphics4_Graphics.getBlendFunc(destination),kha_js_graphics4_Graphics.getBlendFunc(alphaSource),kha_js_graphics4_Graphics.getBlendFunc(alphaDestination));
			kha_SystemImpl.gl.blendEquationSeparate(kha_js_graphics4_Graphics.getBlendOp(operation),kha_js_graphics4_Graphics.getBlendOp(alphaOperation));
		}
	}
	,createVertexBuffer: function(vertexCount,structure,usage,canRead) {
		if(canRead == null) {
			canRead = false;
		}
		return new kha_graphics4_VertexBuffer(vertexCount,structure,usage);
	}
	,setVertexBuffer: function(vertexBuffer) {
		var _g = 0;
		var _g1 = kha_js_graphics4_Graphics.useVertexAttributes;
		while(_g < _g1) {
			var i = _g++;
			kha_SystemImpl.gl.disableVertexAttribArray(i);
		}
		kha_js_graphics4_Graphics.useVertexAttributes = (js_Boot.__cast(vertexBuffer , kha_graphics4_VertexBuffer)).set(0);
	}
	,setVertexBuffers: function(vertexBuffers) {
		var _g = 0;
		var _g1 = kha_js_graphics4_Graphics.useVertexAttributes;
		while(_g < _g1) {
			var i = _g++;
			kha_SystemImpl.gl.disableVertexAttribArray(i);
		}
		var offset = 0;
		var _g = 0;
		while(_g < vertexBuffers.length) {
			var vertexBuffer = vertexBuffers[_g];
			++_g;
			offset += (js_Boot.__cast(vertexBuffer , kha_graphics4_VertexBuffer)).set(offset);
		}
		kha_js_graphics4_Graphics.useVertexAttributes = offset;
	}
	,createIndexBuffer: function(indexCount,usage,canRead) {
		if(canRead == null) {
			canRead = false;
		}
		return new kha_graphics4_IndexBuffer(indexCount,usage);
	}
	,setIndexBuffer: function(indexBuffer) {
		this.indicesCount = indexBuffer.count();
		(js_Boot.__cast(indexBuffer , kha_graphics4_IndexBuffer)).set();
	}
	,setTexture: function(stage,texture) {
		if(texture == null) {
			kha_SystemImpl.gl.activeTexture(33984 + (js_Boot.__cast(stage , kha_js_graphics4_TextureUnit)).value);
			kha_SystemImpl.gl.bindTexture(3553,null);
		} else {
			(js_Boot.__cast(texture , kha_WebGLImage)).set((js_Boot.__cast(stage , kha_js_graphics4_TextureUnit)).value);
		}
	}
	,setTextureDepth: function(stage,texture) {
		(js_Boot.__cast(texture , kha_WebGLImage)).setDepth((js_Boot.__cast(stage , kha_js_graphics4_TextureUnit)).value);
	}
	,setTextureArray: function(unit,texture) {
	}
	,setVideoTexture: function(unit,texture) {
		if(texture == null) {
			kha_SystemImpl.gl.activeTexture(33984 + (js_Boot.__cast(unit , kha_js_graphics4_TextureUnit)).value);
			kha_SystemImpl.gl.bindTexture(3553,null);
		} else {
			(js_Boot.__cast((js_Boot.__cast(texture , kha_js_Video)).texture , kha_WebGLImage)).set((js_Boot.__cast(unit , kha_js_graphics4_TextureUnit)).value);
		}
	}
	,setImageTexture: function(unit,texture) {
	}
	,setTextureParameters: function(texunit,uAddressing,vAddressing,minificationFilter,magnificationFilter,mipmapFilter) {
		kha_SystemImpl.gl.activeTexture(33984 + (js_Boot.__cast(texunit , kha_js_graphics4_TextureUnit)).value);
		switch(uAddressing) {
		case 0:
			kha_SystemImpl.gl.texParameteri(3553,10242,10497);
			break;
		case 1:
			kha_SystemImpl.gl.texParameteri(3553,10242,33648);
			break;
		case 2:
			kha_SystemImpl.gl.texParameteri(3553,10242,33071);
			break;
		}
		switch(vAddressing) {
		case 0:
			kha_SystemImpl.gl.texParameteri(3553,10243,10497);
			break;
		case 1:
			kha_SystemImpl.gl.texParameteri(3553,10243,33648);
			break;
		case 2:
			kha_SystemImpl.gl.texParameteri(3553,10243,33071);
			break;
		}
		switch(minificationFilter) {
		case 0:
			switch(mipmapFilter) {
			case 0:
				kha_SystemImpl.gl.texParameteri(3553,10241,9728);
				break;
			case 1:
				kha_SystemImpl.gl.texParameteri(3553,10241,9984);
				break;
			case 2:
				kha_SystemImpl.gl.texParameteri(3553,10241,9986);
				break;
			}
			break;
		case 1:case 2:
			switch(mipmapFilter) {
			case 0:
				kha_SystemImpl.gl.texParameteri(3553,10241,9729);
				break;
			case 1:
				kha_SystemImpl.gl.texParameteri(3553,10241,9985);
				break;
			case 2:
				kha_SystemImpl.gl.texParameteri(3553,10241,9987);
				break;
			}
			if(minificationFilter == 2) {
				kha_SystemImpl.gl.texParameteri(3553,kha_SystemImpl.anisotropicFilter.TEXTURE_MAX_ANISOTROPY_EXT,4);
			}
			break;
		}
		switch(magnificationFilter) {
		case 0:
			kha_SystemImpl.gl.texParameteri(3553,10240,9728);
			break;
		case 1:case 2:
			kha_SystemImpl.gl.texParameteri(3553,10240,9729);
			break;
		}
	}
	,setTexture3DParameters: function(texunit,uAddressing,vAddressing,wAddressing,minificationFilter,magnificationFilter,mipmapFilter) {
	}
	,setTextureCompareMode: function(texunit,enabled) {
		if(enabled) {
			kha_SystemImpl.gl.texParameteri(3553,34892,34894);
			kha_SystemImpl.gl.texParameteri(3553,34893,515);
		} else {
			kha_SystemImpl.gl.texParameteri(3553,34892,0);
		}
	}
	,setCubeMapCompareMode: function(texunit,enabled) {
		if(enabled) {
			kha_SystemImpl.gl.texParameteri(34067,34892,34894);
			kha_SystemImpl.gl.texParameteri(34067,34893,515);
		} else {
			kha_SystemImpl.gl.texParameteri(34067,34892,0);
		}
	}
	,setCubeMap: function(stage,cubeMap) {
		if(cubeMap == null) {
			kha_SystemImpl.gl.activeTexture(33984 + (js_Boot.__cast(stage , kha_js_graphics4_TextureUnit)).value);
			kha_SystemImpl.gl.bindTexture(34067,null);
		} else {
			cubeMap.set((js_Boot.__cast(stage , kha_js_graphics4_TextureUnit)).value);
		}
	}
	,setCubeMapDepth: function(stage,cubeMap) {
		cubeMap.setDepth((js_Boot.__cast(stage , kha_js_graphics4_TextureUnit)).value);
	}
	,maxBoundTextures: function() {
		return kha_SystemImpl.gl.getParameter(34930);
	}
	,setCullMode: function(mode) {
		switch(mode) {
		case 0:
			kha_SystemImpl.gl.enable(2884);
			kha_SystemImpl.gl.cullFace(1029);
			break;
		case 1:
			kha_SystemImpl.gl.enable(2884);
			kha_SystemImpl.gl.cullFace(1028);
			break;
		case 2:
			kha_SystemImpl.gl.disable(2884);
			break;
		}
	}
	,setPipeline: function(pipe) {
		this.setCullMode(pipe.cullMode);
		this.setDepthMode(pipe.depthWrite,pipe.depthMode);
		if(pipe.stencilFrontMode == 0 && pipe.stencilBackMode == 0 && pipe.stencilFrontBothPass == 0 && pipe.stencilBackBothPass == 0 && pipe.stencilFrontDepthFail == 0 && pipe.stencilBackDepthFail == 0 && pipe.stencilFrontFail == 0 && pipe.stencilBackFail == 0) {
			kha_SystemImpl.gl.disable(2960);
		} else {
			kha_SystemImpl.gl.enable(2960);
			this.setStencilParameters(true,pipe.stencilFrontMode,pipe.stencilFrontBothPass,pipe.stencilFrontDepthFail,pipe.stencilFrontFail,pipe.stencilReferenceValue,pipe.stencilReadMask,pipe.stencilWriteMask);
			this.setStencilParameters(false,pipe.stencilBackMode,pipe.stencilBackBothPass,pipe.stencilBackDepthFail,pipe.stencilBackFail,pipe.stencilReferenceValue,pipe.stencilReadMask,pipe.stencilWriteMask);
		}
		this.setBlendingMode(pipe.blendSource,pipe.blendDestination,pipe.blendOperation,pipe.alphaBlendSource,pipe.alphaBlendDestination,pipe.alphaBlendOperation);
		this.currentPipeline = pipe;
		pipe.set();
		this.colorMaskRed = pipe.colorWriteMasksRed[0];
		this.colorMaskGreen = pipe.colorWriteMasksGreen[0];
		this.colorMaskBlue = pipe.colorWriteMasksBlue[0];
		this.colorMaskAlpha = pipe.colorWriteMasksAlpha[0];
	}
	,setStencilReferenceValue: function(value) {
		kha_SystemImpl.gl.stencilFuncSeparate(1028,this.convertCompareMode(this.currentPipeline.stencilFrontMode),value,this.currentPipeline.stencilReadMask);
		kha_SystemImpl.gl.stencilFuncSeparate(1029,this.convertCompareMode(this.currentPipeline.stencilBackMode),value,this.currentPipeline.stencilReadMask);
	}
	,setBool: function(location,value) {
		kha_SystemImpl.gl.uniform1i((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,value ? 1 : 0);
	}
	,setInt: function(location,value) {
		kha_SystemImpl.gl.uniform1i((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,value);
	}
	,setInt2: function(location,value1,value2) {
		kha_SystemImpl.gl.uniform2i((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,value1,value2);
	}
	,setInt3: function(location,value1,value2,value3) {
		kha_SystemImpl.gl.uniform3i((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,value1,value2,value3);
	}
	,setInt4: function(location,value1,value2,value3,value4) {
		kha_SystemImpl.gl.uniform4i((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,value1,value2,value3,value4);
	}
	,setInts: function(location,values) {
		var webglLocation = js_Boot.__cast(location , kha_js_graphics4_ConstantLocation);
		var rawValues = new Int32Array(values.buffer,values.byteOffset,values.byteLength >> 2);
		switch(webglLocation.type) {
		case 35667:
			kha_SystemImpl.gl.uniform2iv(webglLocation.value,rawValues);
			break;
		case 35668:
			kha_SystemImpl.gl.uniform3iv(webglLocation.value,rawValues);
			break;
		case 35669:
			kha_SystemImpl.gl.uniform4iv(webglLocation.value,rawValues);
			break;
		default:
			kha_SystemImpl.gl.uniform1iv(webglLocation.value,rawValues);
		}
	}
	,setFloat: function(location,value) {
		kha_SystemImpl.gl.uniform1f((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,value);
	}
	,setFloat2: function(location,value1,value2) {
		kha_SystemImpl.gl.uniform2f((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,value1,value2);
	}
	,setFloat3: function(location,value1,value2,value3) {
		kha_SystemImpl.gl.uniform3f((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,value1,value2,value3);
	}
	,setFloat4: function(location,value1,value2,value3,value4) {
		kha_SystemImpl.gl.uniform4f((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,value1,value2,value3,value4);
	}
	,setFloats: function(location,values) {
		var webglLocation = js_Boot.__cast(location , kha_js_graphics4_ConstantLocation);
		var rawValues = new Float32Array(values.buffer,values.byteOffset,values.byteLength >> 2);
		switch(webglLocation.type) {
		case 35664:
			kha_SystemImpl.gl.uniform2fv(webglLocation.value,rawValues);
			break;
		case 35665:
			kha_SystemImpl.gl.uniform3fv(webglLocation.value,rawValues);
			break;
		case 35666:
			kha_SystemImpl.gl.uniform4fv(webglLocation.value,rawValues);
			break;
		case 35676:
			kha_SystemImpl.gl.uniformMatrix4fv(webglLocation.value,false,rawValues);
			break;
		default:
			kha_SystemImpl.gl.uniform1fv(webglLocation.value,rawValues);
		}
	}
	,setVector2: function(location,value) {
		kha_SystemImpl.gl.uniform2f((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,value.x,value.y);
	}
	,setVector3: function(location,value) {
		kha_SystemImpl.gl.uniform3f((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,value.x,value.y,value.z);
	}
	,setVector4: function(location,value) {
		kha_SystemImpl.gl.uniform4f((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,value.x,value.y,value.z,value.w);
	}
	,matrixCache: null
	,setMatrix: function(location,matrix) {
		var v = matrix._00;
		this.matrixCache.setFloat32(0,v,true);
		var v = matrix._01;
		this.matrixCache.setFloat32(4,v,true);
		var v = matrix._02;
		this.matrixCache.setFloat32(8,v,true);
		var v = matrix._03;
		this.matrixCache.setFloat32(12,v,true);
		var v = matrix._10;
		this.matrixCache.setFloat32(16,v,true);
		var v = matrix._11;
		this.matrixCache.setFloat32(20,v,true);
		var v = matrix._12;
		this.matrixCache.setFloat32(24,v,true);
		var v = matrix._13;
		this.matrixCache.setFloat32(28,v,true);
		var v = matrix._20;
		this.matrixCache.setFloat32(32,v,true);
		var v = matrix._21;
		this.matrixCache.setFloat32(36,v,true);
		var v = matrix._22;
		this.matrixCache.setFloat32(40,v,true);
		var v = matrix._23;
		this.matrixCache.setFloat32(44,v,true);
		var v = matrix._30;
		this.matrixCache.setFloat32(48,v,true);
		var v = matrix._31;
		this.matrixCache.setFloat32(52,v,true);
		var v = matrix._32;
		this.matrixCache.setFloat32(56,v,true);
		var v = matrix._33;
		this.matrixCache.setFloat32(60,v,true);
		var rawMatrixCache = new Float32Array(this.matrixCache.buffer,this.matrixCache.byteOffset,this.matrixCache.byteLength >> 2);
		kha_SystemImpl.gl.uniformMatrix4fv((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,false,rawMatrixCache);
	}
	,matrix3Cache: null
	,setMatrix3: function(location,matrix) {
		var v = matrix._00;
		this.matrix3Cache.setFloat32(0,v,true);
		var v = matrix._01;
		this.matrix3Cache.setFloat32(4,v,true);
		var v = matrix._02;
		this.matrix3Cache.setFloat32(8,v,true);
		var v = matrix._10;
		this.matrix3Cache.setFloat32(12,v,true);
		var v = matrix._11;
		this.matrix3Cache.setFloat32(16,v,true);
		var v = matrix._12;
		this.matrix3Cache.setFloat32(20,v,true);
		var v = matrix._20;
		this.matrix3Cache.setFloat32(24,v,true);
		var v = matrix._21;
		this.matrix3Cache.setFloat32(28,v,true);
		var v = matrix._22;
		this.matrix3Cache.setFloat32(32,v,true);
		var rawMatrix3Cache = new Float32Array(this.matrix3Cache.buffer,this.matrix3Cache.byteOffset,this.matrix3Cache.byteLength >> 2);
		kha_SystemImpl.gl.uniformMatrix3fv((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,false,rawMatrix3Cache);
	}
	,drawIndexedVertices: function(start,count) {
		if(count == null) {
			count = -1;
		}
		if(start == null) {
			start = 0;
		}
		var type = kha_SystemImpl.elementIndexUint == null ? 5123 : 5125;
		var size = type == 5123 ? 2 : 4;
		kha_SystemImpl.gl.drawElements(4,count == -1 ? this.indicesCount : count,type,start * size);
	}
	,convertStencilAction: function(action) {
		switch(action) {
		case 0:
			return 7680;
		case 1:
			return 0;
		case 2:
			return 7681;
		case 3:
			return 7682;
		case 4:
			return 34055;
		case 5:
			return 7683;
		case 6:
			return 34056;
		case 7:
			return 5386;
		}
	}
	,convertCompareMode: function(compareMode) {
		switch(compareMode) {
		case 0:
			return 519;
		case 1:
			return 512;
		case 2:
			return 514;
		case 3:
			return 517;
		case 4:
			return 513;
		case 5:
			return 515;
		case 6:
			return 516;
		case 7:
			return 518;
		}
	}
	,setStencilParameters: function(front,compareMode,bothPass,depthFail,stencilFail,referenceValue,readMask,writeMask) {
		if(writeMask == null) {
			writeMask = 255;
		}
		if(readMask == null) {
			readMask = 255;
		}
		var stencilFunc = this.convertCompareMode(compareMode);
		kha_SystemImpl.gl.stencilMaskSeparate(front ? 1028 : 1029,writeMask);
		var tmp = kha_SystemImpl.gl;
		var tmp1 = this.convertStencilAction(stencilFail);
		tmp.stencilOpSeparate(front ? 1028 : 1029,tmp1,this.convertStencilAction(depthFail),this.convertStencilAction(bothPass));
		switch(referenceValue._hx_index) {
		case 0:
			kha_SystemImpl.gl.stencilFuncSeparate(front ? 1028 : 1029,stencilFunc,0,readMask);
			break;
		case 1:
			var value = referenceValue.value;
			kha_SystemImpl.gl.stencilFuncSeparate(front ? 1028 : 1029,stencilFunc,value,readMask);
			break;
		}
	}
	,drawIndexedVerticesInstanced: function(instanceCount,start,count) {
		if(count == null) {
			count = -1;
		}
		if(start == null) {
			start = 0;
		}
		if(this.instancedRenderingAvailable()) {
			var type = kha_SystemImpl.elementIndexUint == null ? 5123 : 5125;
			var typeSize = kha_SystemImpl.elementIndexUint == null ? 2 : 4;
			if(kha_SystemImpl.gl2) {
				kha_SystemImpl.gl.drawElementsInstanced(4,count == -1 ? this.indicesCount : count,type,start * typeSize,instanceCount);
			} else {
				this.instancedExtension.drawElementsInstancedANGLE(4,count == -1 ? this.indicesCount : count,type,start * typeSize,instanceCount);
			}
		}
	}
	,instancedRenderingAvailable: function() {
		return this.instancedExtension;
	}
	,__class__: kha_js_graphics4_Graphics
};
var kha_js_graphics4_Graphics2 = function(canvas) {
	kha_graphics4_Graphics2.call(this,canvas);
};
$hxClasses["kha.js.graphics4.Graphics2"] = kha_js_graphics4_Graphics2;
kha_js_graphics4_Graphics2.__name__ = true;
kha_js_graphics4_Graphics2.__super__ = kha_graphics4_Graphics2;
kha_js_graphics4_Graphics2.prototype = $extend(kha_graphics4_Graphics2.prototype,{
	drawVideoInternal: function(video,x,y,width,height) {
		var v = js_Boot.__cast(video , kha_js_Video);
		this.drawScaledSubImage(v.texture,0,0,v.texture.get_width(),v.texture.get_height(),x,y,width,height);
	}
	,begin: function(clear,clearColor) {
		if(clear == null) {
			clear = true;
		}
		kha_SystemImpl.gl.colorMask(true,true,true,true);
		kha_SystemImpl.gl.disable(2929);
		kha_SystemImpl.gl.depthFunc(519);
		kha_graphics4_Graphics2.prototype.begin.call(this,clear,clearColor);
	}
	,__class__: kha_js_graphics4_Graphics2
});
var kha_js_graphics4_TextureUnit = function(value) {
	this.value = value;
};
$hxClasses["kha.js.graphics4.TextureUnit"] = kha_js_graphics4_TextureUnit;
kha_js_graphics4_TextureUnit.__name__ = true;
kha_js_graphics4_TextureUnit.__interfaces__ = [kha_graphics4_TextureUnit];
kha_js_graphics4_TextureUnit.prototype = {
	value: null
	,__class__: kha_js_graphics4_TextureUnit
};
var kha_vr_VrInterface = function() {
};
$hxClasses["kha.vr.VrInterface"] = kha_vr_VrInterface;
kha_vr_VrInterface.__name__ = true;
kha_vr_VrInterface.prototype = {
	GetSensorState: function() {
		return null;
	}
	,GetPredictedSensorState: function(time) {
		return null;
	}
	,WarpSwapBlack: function() {
	}
	,WarpSwapLoadingIcon: function() {
	}
	,WarpSwap: function(parms) {
	}
	,IsPresenting: function() {
		return false;
	}
	,IsVrEnabled: function() {
		return false;
	}
	,GetTimeInSeconds: function() {
		return 0.0;
	}
	,GetProjectionMatrix: function(eye) {
		return null;
	}
	,GetViewMatrix: function(eye) {
		return null;
	}
	,onVRRequestPresent: function() {
	}
	,onVRExitPresent: function() {
	}
	,onResetPose: function() {
	}
	,__class__: kha_vr_VrInterface
};
var kha_js_vr_VrInterface = function() {
	this.vrHeight = 0;
	this.vrWidth = 0;
	this.height = 0;
	this.width = 0;
	this.rightViewMatrix = new kha_math_FastMatrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
	this.leftViewMatrix = new kha_math_FastMatrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
	this.rightProjectionMatrix = new kha_math_FastMatrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
	this.leftProjectionMatrix = new kha_math_FastMatrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
	this.vrEnabled = false;
	kha_vr_VrInterface.call(this);
	var displayEnabled = false;
	if(displayEnabled) {
		this.vrEnabled = true;
		this.getVRDisplays();
		haxe_Log.trace("Display enabled.",{ fileName : "kha/js/vr/VrInterface.hx", lineNumber : 40, className : "kha.js.vr.VrInterface", methodName : "new"});
	}
};
$hxClasses["kha.js.vr.VrInterface"] = kha_js_vr_VrInterface;
kha_js_vr_VrInterface.__name__ = true;
kha_js_vr_VrInterface.__super__ = kha_vr_VrInterface;
kha_js_vr_VrInterface.prototype = $extend(kha_vr_VrInterface.prototype,{
	vrEnabled: null
	,vrDisplay: null
	,frameData: null
	,leftProjectionMatrix: null
	,rightProjectionMatrix: null
	,leftViewMatrix: null
	,rightViewMatrix: null
	,width: null
	,height: null
	,vrWidth: null
	,vrHeight: null
	,getVRDisplays: function() {
		var _gthis = this;
		var vrDisplayInstance = navigator.getVRDisplays();
		vrDisplayInstance.then(function(displays) {
			if(displays.length > 0) {
				_gthis.frameData = new VRFrameData();
				_gthis.vrDisplay = displays[0];
				_gthis.vrDisplay.depthNear = 0.1;
				_gthis.vrDisplay.depthFar = 1024.0;
				var leftEye = _gthis.vrDisplay.getEyeParameters("left");
				var rightEye = _gthis.vrDisplay.getEyeParameters("right");
				_gthis.width = kha_SystemImpl.khanvas.width;
				_gthis.height = kha_SystemImpl.khanvas.height;
				_gthis.vrWidth = Math.max(leftEye.renderWidth,rightEye.renderWidth) * 2 | 0;
				_gthis.vrHeight = Math.max(leftEye.renderHeight,rightEye.renderHeight) | 0;
			} else {
				haxe_Log.trace("There are no VR displays connected.",{ fileName : "kha/js/vr/VrInterface.hx", lineNumber : 61, className : "kha.js.vr.VrInterface", methodName : "getVRDisplays"});
			}
		});
	}
	,onVRRequestPresent: function() {
		var _gthis = this;
		try {
			this.vrDisplay.requestPresent([{ source : kha_SystemImpl.khanvas}]).then(function() {
				_gthis.onResize();
				_gthis.vrDisplay.requestAnimationFrame($bind(_gthis,_gthis.onAnimationFrame));
			});
		} catch( _g ) {
			var err = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace("Failed to requestPresent.",{ fileName : "kha/js/vr/VrInterface.hx", lineNumber : 74, className : "kha.js.vr.VrInterface", methodName : "onVRRequestPresent"});
			haxe_Log.trace(err,{ fileName : "kha/js/vr/VrInterface.hx", lineNumber : 75, className : "kha.js.vr.VrInterface", methodName : "onVRRequestPresent"});
		}
	}
	,onVRExitPresent: function() {
		var _gthis = this;
		try {
			this.vrDisplay.exitPresent([{ source : kha_SystemImpl.khanvas}]).then(function() {
				_gthis.onResize();
			});
		} catch( _g ) {
			var err = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace("Failed to exitPresent.",{ fileName : "kha/js/vr/VrInterface.hx", lineNumber : 86, className : "kha.js.vr.VrInterface", methodName : "onVRExitPresent"});
			haxe_Log.trace(err,{ fileName : "kha/js/vr/VrInterface.hx", lineNumber : 87, className : "kha.js.vr.VrInterface", methodName : "onVRExitPresent"});
		}
	}
	,onResetPose: function() {
		try {
			this.vrDisplay.resetPose();
		} catch( _g ) {
			var err = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace("Failed to resetPose",{ fileName : "kha/js/vr/VrInterface.hx", lineNumber : 96, className : "kha.js.vr.VrInterface", methodName : "onResetPose"});
			haxe_Log.trace(err,{ fileName : "kha/js/vr/VrInterface.hx", lineNumber : 97, className : "kha.js.vr.VrInterface", methodName : "onResetPose"});
		}
	}
	,onAnimationFrame: function(timestamp) {
		if(this.vrDisplay != null && this.vrDisplay.isPresenting) {
			this.vrDisplay.requestAnimationFrame($bind(this,this.onAnimationFrame));
			this.vrDisplay.getFrameData(this.frameData);
			this.leftProjectionMatrix = this.createMatrixFromArray(this.frameData.leftProjectionMatrix);
			this.leftViewMatrix = this.createMatrixFromArray(this.frameData.leftViewMatrix);
			this.rightProjectionMatrix = this.createMatrixFromArray(this.frameData.rightProjectionMatrix);
			this.rightViewMatrix = this.createMatrixFromArray(this.frameData.rightViewMatrix);
			this.vrDisplay.submitFrame();
		}
	}
	,onResize: function() {
		if(this.vrDisplay != null && this.vrDisplay.isPresenting) {
			kha_SystemImpl.khanvas.width = this.vrWidth;
			kha_SystemImpl.khanvas.height = this.vrHeight;
		} else {
			kha_SystemImpl.khanvas.width = this.width;
			kha_SystemImpl.khanvas.height = this.height;
		}
	}
	,GetSensorState: function() {
		return this.GetPredictedSensorState(0.0);
	}
	,GetPredictedSensorState: function(time) {
		var result = new kha_vr_SensorState();
		result.Predicted = new kha_vr_PoseState();
		result.Recorded = result.Predicted;
		result.Predicted.AngularAcceleration = new kha_math_Vector3();
		result.Predicted.AngularVelocity = new kha_math_Vector3();
		result.Predicted.LinearAcceleration = new kha_math_Vector3();
		result.Predicted.LinearVelocity = new kha_math_Vector3();
		result.Predicted.TimeInSeconds = time;
		result.Predicted.Pose = new kha_vr_Pose();
		result.Predicted.Pose.Orientation = new kha_math_Quaternion();
		result.Predicted.Pose.Position = new kha_math_Vector3();
		var mPose = this.frameData.pose;
		if(mPose != null) {
			result.Predicted.AngularVelocity = this.createVectorFromArray(mPose.angularVelocity);
			result.Predicted.AngularAcceleration = this.createVectorFromArray(mPose.angularAcceleration);
			result.Predicted.LinearVelocity = this.createVectorFromArray(mPose.linearVelocity);
			result.Predicted.LinearAcceleration = this.createVectorFromArray(mPose.linearAcceleration);
			result.Predicted.Pose.Orientation = this.createQuaternion(mPose.orientation);
			result.Predicted.Pose.Position = this.createVectorFromArray(mPose.position);
		}
		return result;
	}
	,WarpSwapBlack: function() {
	}
	,WarpSwapLoadingIcon: function() {
	}
	,WarpSwap: function(parms) {
	}
	,IsPresenting: function() {
		if(this.vrDisplay != null) {
			return this.vrDisplay.isPresenting;
		}
		return false;
	}
	,IsVrEnabled: function() {
		return this.vrEnabled;
	}
	,GetTimeInSeconds: function() {
		return kha_Scheduler.time();
	}
	,GetProjectionMatrix: function(eye) {
		if(eye == 0) {
			return this.leftProjectionMatrix;
		} else {
			return this.rightProjectionMatrix;
		}
	}
	,GetViewMatrix: function(eye) {
		if(eye == 0) {
			return this.leftViewMatrix;
		} else {
			return this.rightViewMatrix;
		}
	}
	,createMatrixFromArray: function(array) {
		var matrix = new kha_math_FastMatrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
		matrix._00 = array[0];
		matrix._01 = array[1];
		matrix._02 = array[2];
		matrix._03 = array[3];
		matrix._10 = array[4];
		matrix._11 = array[5];
		matrix._12 = array[6];
		matrix._13 = array[7];
		matrix._20 = array[8];
		matrix._21 = array[9];
		matrix._22 = array[10];
		matrix._23 = array[11];
		matrix._30 = array[12];
		matrix._31 = array[13];
		matrix._32 = array[14];
		matrix._33 = array[15];
		return matrix;
	}
	,createVectorFromArray: function(array) {
		var vector = new kha_math_Vector3(0,0,0);
		if(array != null) {
			vector.x = array[0];
			vector.y = array[1];
			vector.z = array[2];
		}
		return vector;
	}
	,createQuaternion: function(array) {
		var quaternion = new kha_math_Quaternion(0,0,0,0);
		if(array != null) {
			quaternion.set_x(array[0]);
			quaternion.set_y(array[1]);
			quaternion.set_z(array[2]);
			quaternion.set_w(array[3]);
		}
		return quaternion;
	}
	,__class__: kha_js_vr_VrInterface
});
var kha_math_FastMatrix3 = function(_00,_10,_20,_01,_11,_21,_02,_12,_22) {
	this._00 = _00;
	this._10 = _10;
	this._20 = _20;
	this._01 = _01;
	this._11 = _11;
	this._21 = _21;
	this._02 = _02;
	this._12 = _12;
	this._22 = _22;
};
$hxClasses["kha.math.FastMatrix3"] = kha_math_FastMatrix3;
kha_math_FastMatrix3.__name__ = true;
kha_math_FastMatrix3.fromMatrix3 = function(m) {
	return new kha_math_FastMatrix3(m._00,m._10,m._20,m._01,m._11,m._21,m._02,m._12,m._22);
};
kha_math_FastMatrix3.prototype = {
	_00: null
	,_10: null
	,_20: null
	,_01: null
	,_11: null
	,_21: null
	,_02: null
	,_12: null
	,_22: null
	,__class__: kha_math_FastMatrix3
};
var kha_math_FastMatrix4 = function(_00,_10,_20,_30,_01,_11,_21,_31,_02,_12,_22,_32,_03,_13,_23,_33) {
	this._00 = _00;
	this._10 = _10;
	this._20 = _20;
	this._30 = _30;
	this._01 = _01;
	this._11 = _11;
	this._21 = _21;
	this._31 = _31;
	this._02 = _02;
	this._12 = _12;
	this._22 = _22;
	this._32 = _32;
	this._03 = _03;
	this._13 = _13;
	this._23 = _23;
	this._33 = _33;
};
$hxClasses["kha.math.FastMatrix4"] = kha_math_FastMatrix4;
kha_math_FastMatrix4.__name__ = true;
kha_math_FastMatrix4.fromMatrix4 = function(m) {
	return new kha_math_FastMatrix4(m._00,m._10,m._20,m._30,m._01,m._11,m._21,m._31,m._02,m._12,m._22,m._32,m._03,m._13,m._23,m._33);
};
kha_math_FastMatrix4.orthogonalProjection = function(left,right,bottom,top,zn,zf) {
	var tx = -(right + left) / (right - left);
	var ty = -(top + bottom) / (top - bottom);
	var tz = -(zf + zn) / (zf - zn);
	return new kha_math_FastMatrix4(2 / (right - left),0,0,tx,0,2.0 / (top - bottom),0,ty,0,0,-2 / (zf - zn),tz,0,0,0,1);
};
kha_math_FastMatrix4.perspectiveProjection = function(fovY,aspect,zn,zf) {
	var uh = 1.0 / Math.tan(fovY / 2);
	var uw = uh / aspect;
	return new kha_math_FastMatrix4(uw,0,0,0,0,uh,0,0,0,0,(zf + zn) / (zn - zf),2 * zf * zn / (zn - zf),0,0,-1,0);
};
kha_math_FastMatrix4.lookAt = function(eye,at,up) {
	var x = at.x - eye.x;
	var y = at.y - eye.y;
	var z = at.z - eye.z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var _this_x = x;
	var _this_y = y;
	var _this_z = z;
	var x = _this_x;
	var y = _this_y;
	var z = _this_z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var zaxis_x = x;
	var zaxis_y = y;
	var zaxis_z = z;
	var currentLength = Math.sqrt(zaxis_x * zaxis_x + zaxis_y * zaxis_y + zaxis_z * zaxis_z);
	if(currentLength != 0) {
		var mul = 1 / currentLength;
		zaxis_x *= mul;
		zaxis_y *= mul;
		zaxis_z *= mul;
	}
	var _x = zaxis_y * up.z - zaxis_z * up.y;
	var _y = zaxis_z * up.x - zaxis_x * up.z;
	var _z = zaxis_x * up.y - zaxis_y * up.x;
	var x = _x;
	var y = _y;
	var z = _z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var _this_x = x;
	var _this_y = y;
	var _this_z = z;
	var x = _this_x;
	var y = _this_y;
	var z = _this_z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var xaxis_x = x;
	var xaxis_y = y;
	var xaxis_z = z;
	var currentLength = Math.sqrt(xaxis_x * xaxis_x + xaxis_y * xaxis_y + xaxis_z * xaxis_z);
	if(currentLength != 0) {
		var mul = 1 / currentLength;
		xaxis_x *= mul;
		xaxis_y *= mul;
		xaxis_z *= mul;
	}
	var _x = xaxis_y * zaxis_z - xaxis_z * zaxis_y;
	var _y = xaxis_z * zaxis_x - xaxis_x * zaxis_z;
	var _z = xaxis_x * zaxis_y - xaxis_y * zaxis_x;
	var x = _x;
	var y = _y;
	var z = _z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var yaxis_x = x;
	var yaxis_y = y;
	var yaxis_z = z;
	return new kha_math_FastMatrix4(xaxis_x,xaxis_y,xaxis_z,-(xaxis_x * eye.x + xaxis_y * eye.y + xaxis_z * eye.z),yaxis_x,yaxis_y,yaxis_z,-(yaxis_x * eye.x + yaxis_y * eye.y + yaxis_z * eye.z),-zaxis_x,-zaxis_y,-zaxis_z,zaxis_x * eye.x + zaxis_y * eye.y + zaxis_z * eye.z,0,0,0,1);
};
kha_math_FastMatrix4.prototype = {
	_00: null
	,_10: null
	,_20: null
	,_30: null
	,_01: null
	,_11: null
	,_21: null
	,_31: null
	,_02: null
	,_12: null
	,_22: null
	,_32: null
	,_03: null
	,_13: null
	,_23: null
	,_33: null
	,__class__: kha_math_FastMatrix4
};
var kha_math_FastVector2 = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
};
$hxClasses["kha.math.FastVector2"] = kha_math_FastVector2;
kha_math_FastVector2.__name__ = true;
kha_math_FastVector2.fromVector2 = function(v) {
	return new kha_math_FastVector2(v.x,v.y);
};
kha_math_FastVector2.prototype = {
	x: null
	,y: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,set_length: function(length) {
		var currentLength = Math.sqrt(this.x * this.x + this.y * this.y);
		if(currentLength == 0) {
			return 0;
		}
		var mul = length / currentLength;
		this.x *= mul;
		this.y *= mul;
		return length;
	}
	,toString: function() {
		return "FastVector2(" + this.x + ", " + this.y + ")";
	}
	,__class__: kha_math_FastVector2
};
var kha_math_FastVector3 = function(x,y,z) {
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["kha.math.FastVector3"] = kha_math_FastVector3;
kha_math_FastVector3.__name__ = true;
kha_math_FastVector3.fromVector3 = function(v) {
	return new kha_math_FastVector3(v.x,v.y,v.z);
};
kha_math_FastVector3.prototype = {
	x: null
	,y: null
	,z: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,set_length: function(length) {
		var currentLength = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(currentLength == 0) {
			return 0;
		}
		var mul = length / currentLength;
		this.x *= mul;
		this.y *= mul;
		this.z *= mul;
		return length;
	}
	,toString: function() {
		return "FastVector3(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	,__class__: kha_math_FastVector3
};
var kha_math_FastVector4 = function(x,y,z,w) {
	if(w == null) {
		w = 1;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};
$hxClasses["kha.math.FastVector4"] = kha_math_FastVector4;
kha_math_FastVector4.__name__ = true;
kha_math_FastVector4.fromVector4 = function(v) {
	return new kha_math_FastVector4(v.x,v.y,v.z,v.w);
};
kha_math_FastVector4.prototype = {
	x: null
	,y: null
	,z: null
	,w: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	,set_length: function(length) {
		var currentLength = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
		if(currentLength == 0) {
			return 0;
		}
		var mul = length / currentLength;
		this.x *= mul;
		this.y *= mul;
		this.z *= mul;
		this.w *= mul;
		return length;
	}
	,toString: function() {
		return "FastVector4(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
	}
	,__class__: kha_math_FastVector4
};
var kha_math_Matrix3 = function(_00,_10,_20,_01,_11,_21,_02,_12,_22) {
	this._00 = _00;
	this._10 = _10;
	this._20 = _20;
	this._01 = _01;
	this._11 = _11;
	this._21 = _21;
	this._02 = _02;
	this._12 = _12;
	this._22 = _22;
};
$hxClasses["kha.math.Matrix3"] = kha_math_Matrix3;
kha_math_Matrix3.__name__ = true;
kha_math_Matrix3.fromFastMatrix3 = function(m) {
	return new kha_math_Matrix3(m._00,m._10,m._20,m._01,m._11,m._21,m._02,m._12,m._22);
};
kha_math_Matrix3.prototype = {
	_00: null
	,_10: null
	,_20: null
	,_01: null
	,_11: null
	,_21: null
	,_02: null
	,_12: null
	,_22: null
	,__class__: kha_math_Matrix3
};
var kha_math_Matrix4 = function(_00,_10,_20,_30,_01,_11,_21,_31,_02,_12,_22,_32,_03,_13,_23,_33) {
	this._00 = _00;
	this._10 = _10;
	this._20 = _20;
	this._30 = _30;
	this._01 = _01;
	this._11 = _11;
	this._21 = _21;
	this._31 = _31;
	this._02 = _02;
	this._12 = _12;
	this._22 = _22;
	this._32 = _32;
	this._03 = _03;
	this._13 = _13;
	this._23 = _23;
	this._33 = _33;
};
$hxClasses["kha.math.Matrix4"] = kha_math_Matrix4;
kha_math_Matrix4.__name__ = true;
kha_math_Matrix4.fromFastMatrix4 = function(m) {
	return new kha_math_Matrix4(m._00,m._10,m._20,m._30,m._01,m._11,m._21,m._31,m._02,m._12,m._22,m._32,m._03,m._13,m._23,m._33);
};
kha_math_Matrix4.orthogonalProjection = function(left,right,bottom,top,zn,zf) {
	var tx = -(right + left) / (right - left);
	var ty = -(top + bottom) / (top - bottom);
	var tz = -(zf + zn) / (zf - zn);
	return new kha_math_Matrix4(2 / (right - left),0,0,tx,0,2 / (top - bottom),0,ty,0,0,-2 / (zf - zn),tz,0,0,0,1);
};
kha_math_Matrix4.perspectiveProjection = function(fovY,aspect,zn,zf) {
	var uh = 1.0 / Math.tan(fovY / 2);
	var uw = uh / aspect;
	return new kha_math_Matrix4(uw,0,0,0,0,uh,0,0,0,0,(zf + zn) / (zn - zf),2 * zf * zn / (zn - zf),0,0,-1,0);
};
kha_math_Matrix4.lookAt = function(eye,at,up) {
	var x = at.x - eye.x;
	var y = at.y - eye.y;
	var z = at.z - eye.z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var _this_x = x;
	var _this_y = y;
	var _this_z = z;
	var x = _this_x;
	var y = _this_y;
	var z = _this_z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var zaxis_x = x;
	var zaxis_y = y;
	var zaxis_z = z;
	var currentLength = Math.sqrt(zaxis_x * zaxis_x + zaxis_y * zaxis_y + zaxis_z * zaxis_z);
	if(currentLength != 0) {
		var mul = 1 / currentLength;
		zaxis_x *= mul;
		zaxis_y *= mul;
		zaxis_z *= mul;
	}
	var _x = zaxis_y * up.z - zaxis_z * up.y;
	var _y = zaxis_z * up.x - zaxis_x * up.z;
	var _z = zaxis_x * up.y - zaxis_y * up.x;
	var x = _x;
	var y = _y;
	var z = _z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var _this_x = x;
	var _this_y = y;
	var _this_z = z;
	var x = _this_x;
	var y = _this_y;
	var z = _this_z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var xaxis_x = x;
	var xaxis_y = y;
	var xaxis_z = z;
	var currentLength = Math.sqrt(xaxis_x * xaxis_x + xaxis_y * xaxis_y + xaxis_z * xaxis_z);
	if(currentLength != 0) {
		var mul = 1 / currentLength;
		xaxis_x *= mul;
		xaxis_y *= mul;
		xaxis_z *= mul;
	}
	var _x = xaxis_y * zaxis_z - xaxis_z * zaxis_y;
	var _y = xaxis_z * zaxis_x - xaxis_x * zaxis_z;
	var _z = xaxis_x * zaxis_y - xaxis_y * zaxis_x;
	var x = _x;
	var y = _y;
	var z = _z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var yaxis_x = x;
	var yaxis_y = y;
	var yaxis_z = z;
	return new kha_math_Matrix4(xaxis_x,xaxis_y,xaxis_z,-(xaxis_x * eye.x + xaxis_y * eye.y + xaxis_z * eye.z),yaxis_x,yaxis_y,yaxis_z,-(yaxis_x * eye.x + yaxis_y * eye.y + yaxis_z * eye.z),-zaxis_x,-zaxis_y,-zaxis_z,zaxis_x * eye.x + zaxis_y * eye.y + zaxis_z * eye.z,0,0,0,1);
};
kha_math_Matrix4.prototype = {
	_00: null
	,_10: null
	,_20: null
	,_30: null
	,_01: null
	,_11: null
	,_21: null
	,_31: null
	,_02: null
	,_12: null
	,_22: null
	,_32: null
	,_03: null
	,_13: null
	,_23: null
	,_33: null
	,__class__: kha_math_Matrix4
};
var kha_math_Quaternion = function(x,y,z,w) {
	if(w == null) {
		w = 1;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.values = [];
	this.values.push(x);
	this.values.push(y);
	this.values.push(z);
	this.values.push(w);
};
$hxClasses["kha.math.Quaternion"] = kha_math_Quaternion;
kha_math_Quaternion.__name__ = true;
kha_math_Quaternion.fromAxisAngle = function(axis,radians) {
	var q = new kha_math_Quaternion();
	q.set_w(Math.cos(radians / 2.0));
	q.set_x(q.set_y(q.set_z(Math.sin(radians / 2.0))));
	q.set_x(q.get_x() * axis.x);
	q.set_y(q.get_y() * axis.y);
	q.set_z(q.get_z() * axis.z);
	return q;
};
kha_math_Quaternion.prototype = {
	values: null
	,slerp: function(t,q) {
		var epsilon = 0.0005;
		var dot = this.get_x() * q.get_x() + this.get_y() * q.get_y() + this.get_z() * q.get_z() + this.get_w() * q.get_w();
		if(dot > 1 - epsilon) {
			var _this = new kha_math_Quaternion(this.get_x() - q.get_x(),this.get_y() - q.get_y(),this.get_z() - q.get_z(),this.get_w() - q.get_w());
			var q1 = new kha_math_Quaternion(_this.get_x() * t,_this.get_y() * t,_this.get_z() * t,_this.get_w() * t);
			var result = new kha_math_Quaternion(q.get_x() + q1.get_x(),q.get_y() + q1.get_y(),q.get_z() + q1.get_z(),q.get_w() + q1.get_w());
			var scale = 1.0 / result.get_length();
			result.set_x(result.get_x() * scale);
			result.set_y(result.get_y() * scale);
			result.set_z(result.get_z() * scale);
			result.set_w(result.get_w() * scale);
			return result;
		}
		if(dot < 0) {
			dot = 0;
		}
		if(dot > 1) {
			dot = 1;
		}
		var theta0 = Math.acos(dot);
		var theta = theta0 * t;
		var q1 = new kha_math_Quaternion(this.get_x() * dot,this.get_y() * dot,this.get_z() * dot,this.get_w() * dot);
		var q2 = new kha_math_Quaternion(q.get_x() - q1.get_x(),q.get_y() - q1.get_y(),q.get_z() - q1.get_z(),q.get_w() - q1.get_w());
		var scale = 1.0 / q2.get_length();
		q2.set_x(q2.get_x() * scale);
		q2.set_y(q2.get_y() * scale);
		q2.set_z(q2.get_z() * scale);
		q2.set_w(q2.get_w() * scale);
		var scale = Math.cos(theta);
		var _this = new kha_math_Quaternion(this.get_x() * scale,this.get_y() * scale,this.get_z() * scale,this.get_w() * scale);
		var scale = Math.sin(theta);
		var q = new kha_math_Quaternion(q2.get_x() * scale,q2.get_y() * scale,q2.get_z() * scale,q2.get_w() * scale);
		var result = new kha_math_Quaternion(_this.get_x() + q.get_x(),_this.get_y() + q.get_y(),_this.get_z() + q.get_z(),_this.get_w() + q.get_w());
		var scale = 1.0 / result.get_length();
		result.set_x(result.get_x() * scale);
		result.set_y(result.get_y() * scale);
		result.set_z(result.get_z() * scale);
		result.set_w(result.get_w() * scale);
		return result;
	}
	,rotated: function(b) {
		var q = new kha_math_Quaternion();
		q.set_w(this.get_w() * b.get_w() - this.get_x() * b.get_x() - this.get_y() * b.get_y() - this.get_z() * b.get_z());
		q.set_x(this.get_w() * b.get_x() + this.get_x() * b.get_w() + this.get_y() * b.get_z() - this.get_z() * b.get_y());
		q.set_y(this.get_w() * b.get_y() + this.get_y() * b.get_w() + this.get_z() * b.get_x() - this.get_x() * b.get_z());
		q.set_z(this.get_w() * b.get_z() + this.get_z() * b.get_w() + this.get_x() * b.get_y() - this.get_y() * b.get_x());
		var scale = 1.0 / q.get_length();
		q.set_x(q.get_x() * scale);
		q.set_y(q.get_y() * scale);
		q.set_z(q.get_z() * scale);
		q.set_w(q.get_w() * scale);
		return q;
	}
	,scaled: function(scale) {
		return new kha_math_Quaternion(this.get_x() * scale,this.get_y() * scale,this.get_z() * scale,this.get_w() * scale);
	}
	,scale: function(scale) {
		this.set_x(this.get_x() * scale);
		this.set_y(this.get_y() * scale);
		this.set_z(this.get_z() * scale);
		this.set_w(this.get_w() * scale);
	}
	,matrix: function() {
		var s = 2.0;
		var xs = this.get_x() * s;
		var ys = this.get_y() * s;
		var zs = this.get_z() * s;
		var wx = this.get_w() * xs;
		var wy = this.get_w() * ys;
		var wz = this.get_w() * zs;
		var xx = this.get_x() * xs;
		var xy = this.get_x() * ys;
		var xz = this.get_x() * zs;
		var yy = this.get_y() * ys;
		var yz = this.get_y() * zs;
		var zz = this.get_z() * zs;
		return new kha_math_Matrix4(1 - (yy + zz),xy - wz,xz + wy,0,xy + wz,1 - (xx + zz),yz - wx,0,xz - wy,yz + wx,1 - (xx + yy),0,0,0,0,1);
	}
	,get: function(index) {
		return this.values[index];
	}
	,set: function(index,value) {
		this.values[index] = value;
	}
	,get_x: function() {
		return this.values[0];
	}
	,set_x: function(value) {
		return this.values[0] = value;
	}
	,get_y: function() {
		return this.values[1];
	}
	,set_y: function(value) {
		return this.values[1] = value;
	}
	,get_z: function() {
		return this.values[2];
	}
	,set_z: function(value) {
		return this.values[2] = value;
	}
	,get_w: function() {
		return this.values[3];
	}
	,set_w: function(value) {
		return this.values[3] = value;
	}
	,get_length: function() {
		return Math.sqrt(this.get_x() * this.get_x() + this.get_y() * this.get_y() + this.get_z() * this.get_z() + this.get_w() * this.get_w());
	}
	,set_length: function(length) {
		if(this.get_length() == 0) {
			return 0;
		}
		var mul = length / this.get_length();
		this.set_x(this.get_x() * mul);
		this.set_y(this.get_y() * mul);
		this.set_z(this.get_z() * mul);
		return length;
	}
	,addVector: function(vec) {
		var result = new kha_math_Quaternion(this.get_x(),this.get_y(),this.get_z(),this.get_w());
		var q1 = new kha_math_Quaternion(0,vec.x,vec.y,vec.z);
		var q = new kha_math_Quaternion();
		q.set_x(q1.get_w() * result.get_x() + q1.get_x() * result.get_w() + q1.get_y() * result.get_z() - q1.get_z() * result.get_y());
		q.set_y(q1.get_w() * result.get_y() - q1.get_x() * result.get_z() + q1.get_y() * result.get_w() + q1.get_z() * result.get_x());
		q.set_z(q1.get_w() * result.get_z() + q1.get_x() * result.get_y() - q1.get_y() * result.get_x() + q1.get_z() * result.get_w());
		q.set_w(q1.get_w() * result.get_w() - q1.get_x() * result.get_x() - q1.get_y() * result.get_y() - q1.get_z() * result.get_z());
		q1 = q;
		result.set_x(result.get_x() + q1.get_x() * 0.5);
		result.set_y(result.get_y() + q1.get_y() * 0.5);
		result.set_z(result.get_z() + q1.get_z() * 0.5);
		result.set_w(result.get_w() + q1.get_w() * 0.5);
		return result;
	}
	,add: function(q) {
		return new kha_math_Quaternion(this.get_x() + q.get_x(),this.get_y() + q.get_y(),this.get_z() + q.get_z(),this.get_w() + q.get_w());
	}
	,sub: function(q) {
		return new kha_math_Quaternion(this.get_x() - q.get_x(),this.get_y() - q.get_y(),this.get_z() - q.get_z(),this.get_w() - q.get_w());
	}
	,mult: function(r) {
		var q = new kha_math_Quaternion();
		q.set_x(this.get_w() * r.get_x() + this.get_x() * r.get_w() + this.get_y() * r.get_z() - this.get_z() * r.get_y());
		q.set_y(this.get_w() * r.get_y() - this.get_x() * r.get_z() + this.get_y() * r.get_w() + this.get_z() * r.get_x());
		q.set_z(this.get_w() * r.get_z() + this.get_x() * r.get_y() - this.get_y() * r.get_x() + this.get_z() * r.get_w());
		q.set_w(this.get_w() * r.get_w() - this.get_x() * r.get_x() - this.get_y() * r.get_y() - this.get_z() * r.get_z());
		return q;
	}
	,normalize: function() {
		var scale = 1.0 / this.get_length();
		this.set_x(this.get_x() * scale);
		this.set_y(this.get_y() * scale);
		this.set_z(this.get_z() * scale);
		this.set_w(this.get_w() * scale);
	}
	,dot: function(q) {
		return this.get_x() * q.get_x() + this.get_y() * q.get_y() + this.get_z() * q.get_z() + this.get_w() * q.get_w();
	}
	,getEulerAngles: function(A1,A2,A3,S,D) {
		if(D == null) {
			D = 1;
		}
		if(S == null) {
			S = 1;
		}
		var result = new kha_math_Vector3();
		var Q = [];
		Q[0] = this.get_x();
		Q[1] = this.get_y();
		Q[2] = this.get_z();
		var ww = this.get_w() * this.get_w();
		var Q11 = Q[A1] * Q[A1];
		var Q22 = Q[A2] * Q[A2];
		var Q33 = Q[A3] * Q[A3];
		var psign = -1;
		var SingularityRadius = 0.0000001;
		var PiOver2 = Math.PI / 2.0;
		if((A1 + 1) % 3 == A2 && (A2 + 1) % 3 == A3) {
			psign = 1;
		}
		var s2 = psign * 2.0 * (psign * this.get_w() * Q[A2] + Q[A1] * Q[A3]);
		if(s2 < -1 + SingularityRadius) {
			result.x = 0;
			result.y = -S * D * PiOver2;
			result.z = S * D * Math.atan2(2 * (psign * Q[A1] * Q[A2] + this.get_w() * Q[A3]),ww + Q22 - Q11 - Q33);
		} else if(s2 > 1 - SingularityRadius) {
			result.x = 0;
			result.y = S * D * PiOver2;
			result.z = S * D * Math.atan2(2 * (psign * Q[A1] * Q[A2] + this.get_w() * Q[A3]),ww + Q22 - Q11 - Q33);
		} else {
			result.x = -S * D * Math.atan2(-2 * (this.get_w() * Q[A1] - psign * Q[A2] * Q[A3]),ww + Q33 - Q11 - Q22);
			result.y = S * D * Math.asin(s2);
			result.z = S * D * Math.atan2(2 * (this.get_w() * Q[A3] - psign * Q[A1] * Q[A2]),ww + Q11 - Q22 - Q33);
		}
		return result;
	}
	,__class__: kha_math_Quaternion
};
var kha_math_Vector2 = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
};
$hxClasses["kha.math.Vector2"] = kha_math_Vector2;
kha_math_Vector2.__name__ = true;
kha_math_Vector2.prototype = {
	x: null
	,y: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,set_length: function(length) {
		var currentLength = Math.sqrt(this.x * this.x + this.y * this.y);
		if(currentLength == 0) {
			return 0;
		}
		var mul = length / currentLength;
		this.x *= mul;
		this.y *= mul;
		return length;
	}
	,__class__: kha_math_Vector2
};
var kha_math_Vector3 = function(x,y,z) {
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["kha.math.Vector3"] = kha_math_Vector3;
kha_math_Vector3.__name__ = true;
kha_math_Vector3.prototype = {
	x: null
	,y: null
	,z: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,set_length: function(length) {
		var currentLength = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(currentLength == 0) {
			return 0;
		}
		var mul = length / currentLength;
		this.x *= mul;
		this.y *= mul;
		this.z *= mul;
		return length;
	}
	,__class__: kha_math_Vector3
};
var kha_math_Vector4 = function(x,y,z,w) {
	if(w == null) {
		w = 1;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};
$hxClasses["kha.math.Vector4"] = kha_math_Vector4;
kha_math_Vector4.__name__ = true;
kha_math_Vector4.prototype = {
	x: null
	,y: null
	,z: null
	,w: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	,set_length: function(length) {
		var currentLength = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
		if(currentLength == 0) {
			return 0;
		}
		var mul = length / currentLength;
		this.x *= mul;
		this.y *= mul;
		this.z *= mul;
		this.w *= mul;
		return length;
	}
	,__class__: kha_math_Vector4
};
var kha_netsync_Client = function() { };
$hxClasses["kha.netsync.Client"] = kha_netsync_Client;
kha_netsync_Client.__name__ = true;
kha_netsync_Client.__isInterface__ = true;
kha_netsync_Client.prototype = {
	get_id: null
	,id: null
	,send: null
	,receive: null
	,onClose: null
	,__class__: kha_netsync_Client
};
var kha_netsync_ControllerBuilder = function() { };
$hxClasses["kha.netsync.ControllerBuilder"] = kha_netsync_ControllerBuilder;
kha_netsync_ControllerBuilder.__name__ = true;
var kha_netsync_Entity = function() { };
$hxClasses["kha.netsync.Entity"] = kha_netsync_Entity;
kha_netsync_Entity.__name__ = true;
kha_netsync_Entity.__isInterface__ = true;
kha_netsync_Entity.prototype = {
	_id: null
	,_size: null
	,_send: null
	,_receive: null
	,__class__: kha_netsync_Entity
};
var kha_netsync_LocalClient = function(id) {
	this.myId = id;
};
$hxClasses["kha.netsync.LocalClient"] = kha_netsync_LocalClient;
kha_netsync_LocalClient.__name__ = true;
kha_netsync_LocalClient.__interfaces__ = [kha_netsync_Client];
kha_netsync_LocalClient.prototype = {
	myId: null
	,send: function(bytes,mandatory) {
	}
	,receive: function(receiver) {
	}
	,onClose: function(close) {
	}
	,controllers: null
	,get_controllers: function() {
		return null;
	}
	,id: null
	,get_id: function() {
		return this.myId;
	}
	,__class__: kha_netsync_LocalClient
};
var kha_netsync_Network = function(url,port,errorCallback,closeCallback) {
	this.open = false;
	var _gthis = this;
	this.socket = new WebSocket("ws://" + url + ":" + port);
	this.socket.onerror = function(error) {
		haxe_Log.trace("Network error.",{ fileName : "kha/netsync/Network.hx", lineNumber : 14, className : "kha.netsync.Network", methodName : "new"});
		errorCallback();
	};
	this.socket.binaryType = "arraybuffer";
	this.socket.onopen = function() {
		_gthis.open = true;
	};
	this.socket.onclose = function(event) {
		haxe_Log.trace("Network connection closed. " + kha_netsync_Network.webSocketCloseReason(event.code) + " (" + event.reason + ").",{ fileName : "kha/netsync/Network.hx", lineNumber : 22, className : "kha.netsync.Network", methodName : "new"});
		closeCallback();
	};
};
$hxClasses["kha.netsync.Network"] = kha_netsync_Network;
kha_netsync_Network.__name__ = true;
kha_netsync_Network.webSocketCloseReason = function(code) {
	switch(code) {
	case 1000:
		return "Normal Closure";
	case 1001:
		return "Going Away";
	case 1002:
		return "Protocol error";
	case 1003:
		return "Unsupported Data";
	case 1005:
		return "No Status Rcvd";
	case 1006:
		return "Abnormal Closure";
	case 1007:
		return "Invalid frame";
	case 1008:
		return "Policy Violation";
	case 1009:
		return "Message Too Big";
	case 1010:
		return "Mandatory Ext.";
	case 1011:
		return "Internal Server Error";
	case 1015:
		return "TLS handshake";
	default:
		return "";
	}
};
kha_netsync_Network.prototype = {
	socket: null
	,open: null
	,send: function(bytes,mandatory) {
		if(this.open) {
			this.socket.send(bytes.b.bufferValue);
		}
	}
	,listen: function(listener) {
		this.socket.onmessage = function(message) {
			listener(haxe_io_Bytes.ofData(message.data));
		};
	}
	,__class__: kha_netsync_Network
};
var kha_netsync_State = function(time,data) {
	this.time = time;
	this.data = data;
};
$hxClasses["kha.netsync.State"] = kha_netsync_State;
kha_netsync_State.__name__ = true;
kha_netsync_State.prototype = {
	time: null
	,data: null
	,__class__: kha_netsync_State
};
var kha_netsync_Session = function(maxPlayers,address,port) {
	this.ping = 1;
	this.currentPlayers = 0;
	this.controllers = new haxe_ds_IntMap();
	this.entities = new haxe_ds_IntMap();
	kha_netsync_Session.instance = this;
	this.maxPlayers = maxPlayers;
	this.address = address;
	this.port = port;
};
$hxClasses["kha.netsync.Session"] = kha_netsync_Session;
kha_netsync_Session.__name__ = true;
kha_netsync_Session.the = function() {
	return kha_netsync_Session.instance;
};
kha_netsync_Session.prototype = {
	entities: null
	,controllers: null
	,maxPlayers: null
	,currentPlayers: null
	,ping: null
	,address: null
	,port: null
	,startCallback: null
	,refusedCallback: null
	,resetCallback: null
	,localClient: null
	,network: null
	,updateTaskId: null
	,pingTaskId: null
	,me: null
	,get_me: function() {
		return this.localClient;
	}
	,addEntity: function(entity) {
		var this1 = this.entities;
		var key = entity._id();
		this1.h[key] = entity;
	}
	,addController: function(controller) {
		haxe_Log.trace("Adding controller id " + controller._id(),{ fileName : "kha/netsync/Session.hx", lineNumber : 95, className : "kha.netsync.Session", methodName : "addController"});
		controller._inputBufferIndex = 0;
		var this1 = this.controllers;
		var key = controller._id();
		this1.h[key] = controller;
	}
	,sendControllerUpdate: function(id,bytes) {
		if(this.controllers.h.hasOwnProperty(id)) {
			if(this.controllers.h[id]._inputBuffer.length < this.controllers.h[id]._inputBufferIndex + 4 + bytes.length) {
				var newBuffer = new haxe_io_Bytes(new ArrayBuffer(this.controllers.h[id]._inputBufferIndex + 4 + bytes.length));
				newBuffer.blit(0,this.controllers.h[id]._inputBuffer,0,this.controllers.h[id]._inputBufferIndex);
				this.controllers.h[id]._inputBuffer = newBuffer;
			}
			this.controllers.h[id]._inputBuffer.setInt32(this.controllers.h[id]._inputBufferIndex,bytes.length);
			this.controllers.h[id]._inputBuffer.blit(this.controllers.h[id]._inputBufferIndex + 4,bytes,0,bytes.length);
			this.controllers.h[id]._inputBufferIndex += 4 + bytes.length;
		}
	}
	,sendPing: function() {
		var bytes = new haxe_io_Bytes(new ArrayBuffer(5));
		bytes.b[0] = 4;
		bytes.setFloat(1,kha_Scheduler.realTime());
		this.sendToServer(bytes);
	}
	,sendPlayerUpdate: function() {
	}
	,receive: function(bytes,client) {
		switch(bytes.b[0]) {
		case 0:
			var index = bytes.b[1];
			this.localClient = new kha_netsync_LocalClient(index);
			kha_Scheduler.resetTime();
			this.startCallback();
			break;
		case 1:
			var time = bytes.getDouble(1);
			var offset = 9;
			var entity = this.entities.iterator();
			while(entity.hasNext()) {
				var entity1 = entity.next();
				entity1._receive(offset,bytes);
				offset += entity1._size();
			}
			kha_Scheduler.warp(time);
			break;
		case 3:
			switch(bytes.b[1]) {
			case 0:
				break;
			case 1:
				this.executeRPC(bytes);
				break;
			}
			break;
		case 4:
			var sendTime = bytes.getFloat(1);
			this.ping = kha_Scheduler.realTime() - sendTime;
			break;
		case 5:
			this.refusedCallback();
			break;
		case 6:
			this.currentPlayers = bytes.getInt32(1);
			break;
		}
	}
	,executeRPC: function(bytes) {
		var args = [];
		var syncId = bytes.getInt32(2);
		var index = 6;
		var classnamelength = bytes.getUInt16(index);
		index += 2;
		var classname = "";
		var _g = 0;
		var _g1 = classnamelength;
		while(_g < _g1) {
			var i = _g++;
			var code = bytes.b[index];
			classname += String.fromCodePoint(code);
			++index;
		}
		var methodnamelength = bytes.getUInt16(index);
		index += 2;
		var methodname = "";
		var _g = 0;
		var _g1 = methodnamelength;
		while(_g < _g1) {
			var i = _g++;
			var code = bytes.b[index];
			methodname += String.fromCodePoint(code);
			++index;
		}
		while(index < bytes.length) {
			var type = bytes.b[index];
			++index;
			switch(type) {
			case 66:
				var value = bytes.b[index] == 1;
				++index;
				haxe_Log.trace("Bool: " + (value == null ? "null" : "" + value),{ fileName : "kha/netsync/Session.hx", lineNumber : 299, className : "kha.netsync.Session", methodName : "executeRPC"});
				args.push(value);
				break;
			case 70:
				var value1 = bytes.getDouble(index);
				index += 8;
				haxe_Log.trace("Float: " + value1,{ fileName : "kha/netsync/Session.hx", lineNumber : 304, className : "kha.netsync.Session", methodName : "executeRPC"});
				args.push(value1);
				break;
			case 73:
				var value2 = bytes.getInt32(index);
				index += 4;
				haxe_Log.trace("Int: " + value2,{ fileName : "kha/netsync/Session.hx", lineNumber : 309, className : "kha.netsync.Session", methodName : "executeRPC"});
				args.push(value2);
				break;
			case 83:
				var length = bytes.getUInt16(index);
				index += 2;
				var str = "";
				var _g = 0;
				var _g1 = length;
				while(_g < _g1) {
					var i = _g++;
					var code = bytes.b[index];
					str += String.fromCodePoint(code);
					++index;
				}
				haxe_Log.trace("String: " + str,{ fileName : "kha/netsync/Session.hx", lineNumber : 319, className : "kha.netsync.Session", methodName : "executeRPC"});
				args.push(str);
				break;
			default:
				haxe_Log.trace("Unknown argument type.",{ fileName : "kha/netsync/Session.hx", lineNumber : 322, className : "kha.netsync.Session", methodName : "executeRPC"});
			}
		}
		if(syncId == -1) {
			Reflect.field($hxClasses[classname],methodname + "_remotely").apply(null,args);
		} else {
			Reflect.field(kha_netsync_SyncBuilder.objects[syncId],methodname + "_remotely").apply(kha_netsync_SyncBuilder.objects[syncId],args);
		}
	}
	,waitForStart: function(callback,refuseCallback,errorCallback,closeCallback,resCallback) {
		var _gthis = this;
		this.startCallback = callback;
		this.refusedCallback = refuseCallback;
		this.resetCallback = resCallback;
		this.network = new kha_netsync_Network(this.address,this.port,errorCallback,function() {
			closeCallback();
			_gthis.reset();
		});
		this.network.listen(function(bytes) {
			_gthis.receive(bytes);
		});
		this.updateTaskId = kha_Scheduler.addFrameTask($bind(this,this.update),0);
		this.ping = 1;
		this.pingTaskId = kha_Scheduler.addTimeTask($bind(this,this.sendPing),0,1);
	}
	,reset: function() {
		kha_Scheduler.removeFrameTask(this.updateTaskId);
		kha_Scheduler.removeTimeTask(this.pingTaskId);
		this.currentPlayers = 0;
		this.ping = 1;
		this.controllers = new haxe_ds_IntMap();
		this.entities = new haxe_ds_IntMap();
		this.resetCallback();
	}
	,update: function() {
		var controller = this.controllers.iterator();
		while(controller.hasNext()) {
			var controller1 = controller.next();
			if(controller1._inputBufferIndex > 0) {
				var bytes = new haxe_io_Bytes(new ArrayBuffer(22 + controller1._inputBufferIndex));
				bytes.b[0] = 2;
				bytes.setInt32(1,controller1._id());
				bytes.setDouble(5,kha_Scheduler.time());
				bytes.setInt32(13,kha_System.windowWidth(0));
				bytes.setInt32(17,kha_System.windowHeight(0));
				bytes.b[21] = 0;
				bytes.blit(22,controller1._inputBuffer,0,controller1._inputBufferIndex);
				this.sendToServer(bytes);
				controller1._inputBufferIndex = 0;
			}
		}
	}
	,sendToServer: function(bytes) {
		this.network.send(bytes,false);
	}
	,__class__: kha_netsync_Session
};
var kha_netsync_SyncBuilder = function() { };
$hxClasses["kha.netsync.SyncBuilder"] = kha_netsync_SyncBuilder;
kha_netsync_SyncBuilder.__name__ = true;
var kha_simd_Float32x4 = function(_0,_1,_2,_3) {
	this._0 = _0;
	this._1 = _1;
	this._2 = _2;
	this._3 = _3;
};
$hxClasses["kha.simd.Float32x4"] = kha_simd_Float32x4;
kha_simd_Float32x4.__name__ = true;
kha_simd_Float32x4.create = function() {
	return new kha_simd_Float32x4(0,0,0,0);
};
kha_simd_Float32x4.loadAllFast = function(t) {
	return new kha_simd_Float32x4(t,t,t,t);
};
kha_simd_Float32x4.load = function(a,b,c,d) {
	return new kha_simd_Float32x4(a,b,c,d);
};
kha_simd_Float32x4.loadFast = function(a,b,c,d) {
	return new kha_simd_Float32x4(a,b,c,d);
};
kha_simd_Float32x4.get = function(t,index) {
	var value = 0;
	switch(index) {
	case 0:
		value = t._0;
		break;
	case 1:
		value = t._1;
		break;
	case 2:
		value = t._2;
		break;
	case 3:
		value = t._3;
		break;
	}
	return value;
};
kha_simd_Float32x4.getFast = function(t,index) {
	var value = 0;
	switch(index) {
	case 0:
		value = t._0;
		break;
	case 1:
		value = t._1;
		break;
	case 2:
		value = t._2;
		break;
	case 3:
		value = t._3;
		break;
	}
	return value;
};
kha_simd_Float32x4.abs = function(t) {
	return new kha_simd_Float32x4(Math.abs(t._0),Math.abs(t._1),Math.abs(t._2),Math.abs(t._3));
};
kha_simd_Float32x4.add = function(a,b) {
	return new kha_simd_Float32x4(a._0 + b._0,a._1 + b._1,a._2 + b._2,a._3 + b._3);
};
kha_simd_Float32x4.div = function(a,b) {
	return new kha_simd_Float32x4(a._0 / b._0,a._1 / b._1,a._2 / b._2,a._3 / b._3);
};
kha_simd_Float32x4.mul = function(a,b) {
	return new kha_simd_Float32x4(a._0 * b._0,a._1 * b._1,a._2 * b._2,a._3 * b._3);
};
kha_simd_Float32x4.neg = function(t) {
	return new kha_simd_Float32x4(-t._0,-t._1,-t._2,-t._3);
};
kha_simd_Float32x4.reciprocalApproximation = function(t) {
	return new kha_simd_Float32x4(0,0,0,0);
};
kha_simd_Float32x4.reciprocalSqrtApproximation = function(t) {
	return new kha_simd_Float32x4(0,0,0,0);
};
kha_simd_Float32x4.sub = function(a,b) {
	return new kha_simd_Float32x4(a._0 - b._0,a._1 - b._1,a._2 - b._2,a._3 - b._3);
};
kha_simd_Float32x4.sqrt = function(t) {
	return new kha_simd_Float32x4(Math.sqrt(t._0),Math.sqrt(t._1),Math.sqrt(t._2),Math.sqrt(t._3));
};
kha_simd_Float32x4.prototype = {
	_0: null
	,_1: null
	,_2: null
	,_3: null
	,__class__: kha_simd_Float32x4
};
var kha_vr_Pose = function() {
	this.Orientation = new kha_math_Quaternion();
	this.Position = new kha_math_Vector3();
};
$hxClasses["kha.vr.Pose"] = kha_vr_Pose;
kha_vr_Pose.__name__ = true;
kha_vr_Pose.prototype = {
	Orientation: null
	,Position: null
	,__class__: kha_vr_Pose
};
var kha_vr_PoseState = function() {
};
$hxClasses["kha.vr.PoseState"] = kha_vr_PoseState;
kha_vr_PoseState.__name__ = true;
kha_vr_PoseState.prototype = {
	Pose: null
	,AngularVelocity: null
	,LinearVelocity: null
	,AngularAcceleration: null
	,LinearAcceleration: null
	,TimeInSeconds: null
	,__class__: kha_vr_PoseState
};
var kha_vr_SensorState = function() {
};
$hxClasses["kha.vr.SensorState"] = kha_vr_SensorState;
kha_vr_SensorState.__name__ = true;
kha_vr_SensorState.prototype = {
	Predicted: null
	,Recorded: null
	,Temperature: null
	,Status: null
	,__class__: kha_vr_SensorState
};
var kha_vr_TimeWarpImage = function() {
};
$hxClasses["kha.vr.TimeWarpImage"] = kha_vr_TimeWarpImage;
kha_vr_TimeWarpImage.__name__ = true;
kha_vr_TimeWarpImage.prototype = {
	Image: null
	,TexCoordsFromTanAngles: null
	,Pose: null
	,__class__: kha_vr_TimeWarpImage
};
var kha_vr_TimeWarpParms = function() {
};
$hxClasses["kha.vr.TimeWarpParms"] = kha_vr_TimeWarpParms;
kha_vr_TimeWarpParms.__name__ = true;
kha_vr_TimeWarpParms.prototype = {
	LeftImage: null
	,RightImage: null
	,LeftOverlay: null
	,RightOverlay: null
	,__class__: kha_vr_TimeWarpParms
};
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = true;
$hxClasses["Array"] = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses["Date"] = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
if(ArrayBuffer.prototype.slice == null) {
	ArrayBuffer.prototype.slice = js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl;
}
haxe_Unserializer.DEFAULT_RESOLVER = new haxe__$Unserializer_DefaultResolver();
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_io_FPHelper.helper = new DataView(new ArrayBuffer(8));
kha_Assets.images = new kha__$Assets_ImageList();
kha_Assets.sounds = new kha__$Assets_SoundList();
kha_Assets.blobs = new kha__$Assets_BlobList();
kha_Assets.fonts = new kha__$Assets_FontList();
kha_Assets.videos = new kha__$Assets_VideoList();
kha_Color.Black = -16777216;
kha_Color.White = -1;
kha_Color.Red = -65536;
kha_Color.Blue = -16776961;
kha_Color.Green = -16711936;
kha_Color.Magenta = -65281;
kha_Color.Yellow = -256;
kha_Color.Cyan = -16711681;
kha_Color.Purple = -8388480;
kha_Color.Pink = -16181;
kha_Color.Orange = -23296;
kha_Color.Transparent = 0;
kha_Color.invMaxChannelValue = 0.00392156862745098;
kha_Display.instance = new kha_Display();
kha_LoaderImpl.dropFiles = new haxe_ds_StringMap();
kha_Scheduler.timeWarpSaveTime = 10.0;
kha_Scheduler.DIF_COUNT = 3;
kha_Scheduler.maxframetime = 0.5;
kha_Scheduler.startTime = 0;
kha_Shaders.painter_colored_fragData0 = "s198:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdmFyeWluZyBoaWdocCB2ZWM0IGZyYWdtZW50Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9GcmFnRGF0YVswXSA9IGZyYWdtZW50Q29sb3I7Cn0KCg";
kha_Shaders.painter_colored_fragData1 = "s223:I3ZlcnNpb24gMzAwIGVzCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKb3V0IGhpZ2hwIHZlYzQgRnJhZ0NvbG9yOwppbiBoaWdocCB2ZWM0IGZyYWdtZW50Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBGcmFnQ29sb3IgPSBmcmFnbWVudENvbG9yOwp9Cgo";
kha_Shaders.painter_colored_fragData2 = "s192:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gbWVkaXVtcCBpbnQ7Cgp2YXJ5aW5nIHZlYzQgZnJhZ21lbnRDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX0ZyYWdEYXRhWzBdID0gZnJhZ21lbnRDb2xvcjsKfQoK";
kha_Shaders.painter_colored_vertData0 = "s331:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmF0dHJpYnV0ZSB2ZWMzIHZlcnRleFBvc2l0aW9uOwp2YXJ5aW5nIHZlYzQgZnJhZ21lbnRDb2xvcjsKYXR0cmlidXRlIHZlYzQgdmVydGV4Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiB2ZWM0KHZlcnRleFBvc2l0aW9uLCAxLjApOwogICAgZnJhZ21lbnRDb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_Shaders.painter_colored_vertData1 = "s311:I3ZlcnNpb24gMzAwIGVzCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmluIHZlYzMgdmVydGV4UG9zaXRpb247Cm91dCB2ZWM0IGZyYWdtZW50Q29sb3I7CmluIHZlYzQgdmVydGV4Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiB2ZWM0KHZlcnRleFBvc2l0aW9uLCAxLjApOwogICAgZnJhZ21lbnRDb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_Shaders.painter_colored_vertData2 = "s374:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1lZGl1bXAgbWF0NCBwcm9qZWN0aW9uTWF0cml4OwoKYXR0cmlidXRlIG1lZGl1bXAgdmVjMyB2ZXJ0ZXhQb3NpdGlvbjsKdmFyeWluZyBtZWRpdW1wIHZlYzQgZnJhZ21lbnRDb2xvcjsKYXR0cmlidXRlIG1lZGl1bXAgdmVjNCB2ZXJ0ZXhDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIHZlYzQodmVydGV4UG9zaXRpb24sIDEuMCk7CiAgICBmcmFnbWVudENvbG9yID0gdmVydGV4Q29sb3I7Cn0KCg";
kha_Shaders.painter_image_fragData0 = "s471:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdW5pZm9ybSBoaWdocCBzYW1wbGVyMkQgdGV4OwoKdmFyeWluZyBoaWdocCB2ZWMyIHRleENvb3JkOwp2YXJ5aW5nIGhpZ2hwIHZlYzQgY29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBoaWdocCB2ZWM0IHRleGNvbG9yID0gdGV4dHVyZTJEKHRleCwgdGV4Q29vcmQpICogY29sb3I7CiAgICBoaWdocCB2ZWMzIF8zMiA9IHRleGNvbG9yLnh5eiAqIGNvbG9yLnc7CiAgICB0ZXhjb2xvciA9IHZlYzQoXzMyLngsIF8zMi55LCBfMzIueiwgdGV4Y29sb3Iudyk7CiAgICBnbF9GcmFnRGF0YVswXSA9IHRleGNvbG9yOwp9Cgo";
kha_Shaders.painter_image_fragData1 = "s487:I3ZlcnNpb24gMzAwIGVzCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdW5pZm9ybSBoaWdocCBzYW1wbGVyMkQgdGV4OwoKaW4gaGlnaHAgdmVjMiB0ZXhDb29yZDsKaW4gaGlnaHAgdmVjNCBjb2xvcjsKb3V0IGhpZ2hwIHZlYzQgRnJhZ0NvbG9yOwoKdm9pZCBtYWluKCkKewogICAgaGlnaHAgdmVjNCB0ZXhjb2xvciA9IHRleHR1cmUodGV4LCB0ZXhDb29yZCkgKiBjb2xvcjsKICAgIGhpZ2hwIHZlYzMgXzMyID0gdGV4Y29sb3IueHl6ICogY29sb3IudzsKICAgIHRleGNvbG9yID0gdmVjNChfMzIueCwgXzMyLnksIF8zMi56LCB0ZXhjb2xvci53KTsKICAgIEZyYWdDb2xvciA9IHRleGNvbG9yOwp9Cgo";
kha_Shaders.painter_image_fragData2 = "s444:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gbWVkaXVtcCBpbnQ7Cgp1bmlmb3JtIG1lZGl1bXAgc2FtcGxlcjJEIHRleDsKCnZhcnlpbmcgdmVjMiB0ZXhDb29yZDsKdmFyeWluZyB2ZWM0IGNvbG9yOwoKdm9pZCBtYWluKCkKewogICAgdmVjNCB0ZXhjb2xvciA9IHRleHR1cmUyRCh0ZXgsIHRleENvb3JkKSAqIGNvbG9yOwogICAgdmVjMyBfMzIgPSB0ZXhjb2xvci54eXogKiBjb2xvci53OwogICAgdGV4Y29sb3IgPSB2ZWM0KF8zMi54LCBfMzIueSwgXzMyLnosIHRleGNvbG9yLncpOwogICAgZ2xfRnJhZ0RhdGFbMF0gPSB0ZXhjb2xvcjsKfQoK";
kha_Shaders.painter_image_vertData0 = "s407:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmF0dHJpYnV0ZSB2ZWMzIHZlcnRleFBvc2l0aW9uOwp2YXJ5aW5nIHZlYzIgdGV4Q29vcmQ7CmF0dHJpYnV0ZSB2ZWMyIHZlcnRleFVWOwp2YXJ5aW5nIHZlYzQgY29sb3I7CmF0dHJpYnV0ZSB2ZWM0IHZlcnRleENvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvbiwgMS4wKTsKICAgIHRleENvb3JkID0gdmVydGV4VVY7CiAgICBjb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_Shaders.painter_image_vertData1 = "s372:I3ZlcnNpb24gMzAwIGVzCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmluIHZlYzMgdmVydGV4UG9zaXRpb247Cm91dCB2ZWMyIHRleENvb3JkOwppbiB2ZWMyIHZlcnRleFVWOwpvdXQgdmVjNCBjb2xvcjsKaW4gdmVjNCB2ZXJ0ZXhDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIHZlYzQodmVydGV4UG9zaXRpb24sIDEuMCk7CiAgICB0ZXhDb29yZCA9IHZlcnRleFVWOwogICAgY29sb3IgPSB2ZXJ0ZXhDb2xvcjsKfQoK";
kha_Shaders.painter_image_vertData2 = "s471:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1lZGl1bXAgbWF0NCBwcm9qZWN0aW9uTWF0cml4OwoKYXR0cmlidXRlIG1lZGl1bXAgdmVjMyB2ZXJ0ZXhQb3NpdGlvbjsKdmFyeWluZyBtZWRpdW1wIHZlYzIgdGV4Q29vcmQ7CmF0dHJpYnV0ZSBtZWRpdW1wIHZlYzIgdmVydGV4VVY7CnZhcnlpbmcgbWVkaXVtcCB2ZWM0IGNvbG9yOwphdHRyaWJ1dGUgbWVkaXVtcCB2ZWM0IHZlcnRleENvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvbiwgMS4wKTsKICAgIHRleENvb3JkID0gdmVydGV4VVY7CiAgICBjb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_Shaders.painter_text_fragData0 = "s351:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdW5pZm9ybSBoaWdocCBzYW1wbGVyMkQgdGV4OwoKdmFyeWluZyBoaWdocCB2ZWM0IGZyYWdtZW50Q29sb3I7CnZhcnlpbmcgaGlnaHAgdmVjMiB0ZXhDb29yZDsKCnZvaWQgbWFpbigpCnsKICAgIGdsX0ZyYWdEYXRhWzBdID0gdmVjNChmcmFnbWVudENvbG9yLnh5eiwgdGV4dHVyZTJEKHRleCwgdGV4Q29vcmQpLnggKiBmcmFnbWVudENvbG9yLncpOwp9Cgo";
kha_Shaders.painter_text_fragData1 = "s367:I3ZlcnNpb24gMzAwIGVzCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdW5pZm9ybSBoaWdocCBzYW1wbGVyMkQgdGV4OwoKb3V0IGhpZ2hwIHZlYzQgRnJhZ0NvbG9yOwppbiBoaWdocCB2ZWM0IGZyYWdtZW50Q29sb3I7CmluIGhpZ2hwIHZlYzIgdGV4Q29vcmQ7Cgp2b2lkIG1haW4oKQp7CiAgICBGcmFnQ29sb3IgPSB2ZWM0KGZyYWdtZW50Q29sb3IueHl6LCB0ZXh0dXJlKHRleCwgdGV4Q29vcmQpLnggKiBmcmFnbWVudENvbG9yLncpOwp9Cgo";
kha_Shaders.painter_text_fragData2 = "s340:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gbWVkaXVtcCBpbnQ7Cgp1bmlmb3JtIG1lZGl1bXAgc2FtcGxlcjJEIHRleDsKCnZhcnlpbmcgdmVjNCBmcmFnbWVudENvbG9yOwp2YXJ5aW5nIHZlYzIgdGV4Q29vcmQ7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9GcmFnRGF0YVswXSA9IHZlYzQoZnJhZ21lbnRDb2xvci54eXosIHRleHR1cmUyRCh0ZXgsIHRleENvb3JkKS54ICogZnJhZ21lbnRDb2xvci53KTsKfQoK";
kha_Shaders.painter_text_vertData0 = "s428:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmF0dHJpYnV0ZSB2ZWMzIHZlcnRleFBvc2l0aW9uOwp2YXJ5aW5nIHZlYzIgdGV4Q29vcmQ7CmF0dHJpYnV0ZSB2ZWMyIHZlcnRleFVWOwp2YXJ5aW5nIHZlYzQgZnJhZ21lbnRDb2xvcjsKYXR0cmlidXRlIHZlYzQgdmVydGV4Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiB2ZWM0KHZlcnRleFBvc2l0aW9uLCAxLjApOwogICAgdGV4Q29vcmQgPSB2ZXJ0ZXhVVjsKICAgIGZyYWdtZW50Q29sb3IgPSB2ZXJ0ZXhDb2xvcjsKfQoK";
kha_Shaders.painter_text_vertData1 = "s394:I3ZlcnNpb24gMzAwIGVzCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmluIHZlYzMgdmVydGV4UG9zaXRpb247Cm91dCB2ZWMyIHRleENvb3JkOwppbiB2ZWMyIHZlcnRleFVWOwpvdXQgdmVjNCBmcmFnbWVudENvbG9yOwppbiB2ZWM0IHZlcnRleENvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvbiwgMS4wKTsKICAgIHRleENvb3JkID0gdmVydGV4VVY7CiAgICBmcmFnbWVudENvbG9yID0gdmVydGV4Q29sb3I7Cn0KCg";
kha_Shaders.painter_text_vertData2 = "s492:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1lZGl1bXAgbWF0NCBwcm9qZWN0aW9uTWF0cml4OwoKYXR0cmlidXRlIG1lZGl1bXAgdmVjMyB2ZXJ0ZXhQb3NpdGlvbjsKdmFyeWluZyBtZWRpdW1wIHZlYzIgdGV4Q29vcmQ7CmF0dHJpYnV0ZSBtZWRpdW1wIHZlYzIgdmVydGV4VVY7CnZhcnlpbmcgbWVkaXVtcCB2ZWM0IGZyYWdtZW50Q29sb3I7CmF0dHJpYnV0ZSBtZWRpdW1wIHZlYzQgdmVydGV4Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiB2ZWM0KHZlcnRleFBvc2l0aW9uLCAxLjApOwogICAgdGV4Q29vcmQgPSB2ZXJ0ZXhVVjsKICAgIGZyYWdtZW50Q29sb3IgPSB2ZXJ0ZXhDb2xvcjsKfQoK";
kha_Shaders.painter_video_fragData0 = "s471:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdW5pZm9ybSBoaWdocCBzYW1wbGVyMkQgdGV4OwoKdmFyeWluZyBoaWdocCB2ZWMyIHRleENvb3JkOwp2YXJ5aW5nIGhpZ2hwIHZlYzQgY29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBoaWdocCB2ZWM0IHRleGNvbG9yID0gdGV4dHVyZTJEKHRleCwgdGV4Q29vcmQpICogY29sb3I7CiAgICBoaWdocCB2ZWMzIF8zMiA9IHRleGNvbG9yLnh5eiAqIGNvbG9yLnc7CiAgICB0ZXhjb2xvciA9IHZlYzQoXzMyLngsIF8zMi55LCBfMzIueiwgdGV4Y29sb3Iudyk7CiAgICBnbF9GcmFnRGF0YVswXSA9IHRleGNvbG9yOwp9Cgo";
kha_Shaders.painter_video_fragData1 = "s487:I3ZlcnNpb24gMzAwIGVzCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdW5pZm9ybSBoaWdocCBzYW1wbGVyMkQgdGV4OwoKaW4gaGlnaHAgdmVjMiB0ZXhDb29yZDsKaW4gaGlnaHAgdmVjNCBjb2xvcjsKb3V0IGhpZ2hwIHZlYzQgRnJhZ0NvbG9yOwoKdm9pZCBtYWluKCkKewogICAgaGlnaHAgdmVjNCB0ZXhjb2xvciA9IHRleHR1cmUodGV4LCB0ZXhDb29yZCkgKiBjb2xvcjsKICAgIGhpZ2hwIHZlYzMgXzMyID0gdGV4Y29sb3IueHl6ICogY29sb3IudzsKICAgIHRleGNvbG9yID0gdmVjNChfMzIueCwgXzMyLnksIF8zMi56LCB0ZXhjb2xvci53KTsKICAgIEZyYWdDb2xvciA9IHRleGNvbG9yOwp9Cgo";
kha_Shaders.painter_video_fragData2 = "s444:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gbWVkaXVtcCBpbnQ7Cgp1bmlmb3JtIG1lZGl1bXAgc2FtcGxlcjJEIHRleDsKCnZhcnlpbmcgdmVjMiB0ZXhDb29yZDsKdmFyeWluZyB2ZWM0IGNvbG9yOwoKdm9pZCBtYWluKCkKewogICAgdmVjNCB0ZXhjb2xvciA9IHRleHR1cmUyRCh0ZXgsIHRleENvb3JkKSAqIGNvbG9yOwogICAgdmVjMyBfMzIgPSB0ZXhjb2xvci54eXogKiBjb2xvci53OwogICAgdGV4Y29sb3IgPSB2ZWM0KF8zMi54LCBfMzIueSwgXzMyLnosIHRleGNvbG9yLncpOwogICAgZ2xfRnJhZ0RhdGFbMF0gPSB0ZXhjb2xvcjsKfQoK";
kha_Shaders.painter_video_vertData0 = "s407:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmF0dHJpYnV0ZSB2ZWMzIHZlcnRleFBvc2l0aW9uOwp2YXJ5aW5nIHZlYzIgdGV4Q29vcmQ7CmF0dHJpYnV0ZSB2ZWMyIHZlcnRleFVWOwp2YXJ5aW5nIHZlYzQgY29sb3I7CmF0dHJpYnV0ZSB2ZWM0IHZlcnRleENvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvbiwgMS4wKTsKICAgIHRleENvb3JkID0gdmVydGV4VVY7CiAgICBjb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_Shaders.painter_video_vertData1 = "s372:I3ZlcnNpb24gMzAwIGVzCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmluIHZlYzMgdmVydGV4UG9zaXRpb247Cm91dCB2ZWMyIHRleENvb3JkOwppbiB2ZWMyIHZlcnRleFVWOwpvdXQgdmVjNCBjb2xvcjsKaW4gdmVjNCB2ZXJ0ZXhDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIHZlYzQodmVydGV4UG9zaXRpb24sIDEuMCk7CiAgICB0ZXhDb29yZCA9IHZlcnRleFVWOwogICAgY29sb3IgPSB2ZXJ0ZXhDb2xvcjsKfQoK";
kha_Shaders.painter_video_vertData2 = "s471:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1lZGl1bXAgbWF0NCBwcm9qZWN0aW9uTWF0cml4OwoKYXR0cmlidXRlIG1lZGl1bXAgdmVjMyB2ZXJ0ZXhQb3NpdGlvbjsKdmFyeWluZyBtZWRpdW1wIHZlYzIgdGV4Q29vcmQ7CmF0dHJpYnV0ZSBtZWRpdW1wIHZlYzIgdmVydGV4VVY7CnZhcnlpbmcgbWVkaXVtcCB2ZWM0IGNvbG9yOwphdHRyaWJ1dGUgbWVkaXVtcCB2ZWM0IHZlcnRleENvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvbiwgMS4wKTsKICAgIHRleENvb3JkID0gdmVydGV4VVY7CiAgICBjb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_System.renderListeners = [];
kha_System.foregroundListeners = [];
kha_System.resumeListeners = [];
kha_System.pauseListeners = [];
kha_System.backgroundListeners = [];
kha_System.shutdownListeners = [];
kha_System.dropFilesListeners = [];
kha_SystemImpl.mobile = false;
kha_SystemImpl.ios = false;
kha_SystemImpl.mobileAudioPlaying = false;
kha_SystemImpl.chrome = false;
kha_SystemImpl.firefox = false;
kha_SystemImpl.safari = false;
kha_SystemImpl.ie = false;
kha_SystemImpl.insideInputEvent = false;
kha_SystemImpl.estimatedRefreshRate = 60;
kha_SystemImpl.maxGamepads = 4;
kha_SystemImpl.minimumScroll = 999;
kha_SystemImpl.lastFirstTouchX = 0;
kha_SystemImpl.lastFirstTouchY = 0;
kha_SystemImpl.lastCanvasClientWidth = -1;
kha_SystemImpl.lastCanvasClientHeight = -1;
kha_SystemImpl.iosSoundEnabled = false;
kha_SystemImpl.soundEnabled = false;
kha_SystemImpl.iosTouchs = [];
kha_WebGLImage.GL_RGBA16F = 34842;
kha_WebGLImage.GL_RGBA32F = 34836;
kha_WebGLImage.GL_R16F = 33325;
kha_WebGLImage.GL_R32F = 33326;
kha_WebGLImage.GL_RED = 6403;
kha_WebGLImage.GL_DEPTH_COMPONENT24 = 33190;
kha_WebGLImage.GL_DEPTH24_STENCIL8 = 35056;
kha_WebGLImage.GL_DEPTH32F_STENCIL8 = 36013;
kha_Window.windows = [];
kha_Window.resizeCallbacks = [];
kha_WindowFeatures.None = 0;
kha_WindowFeatures.FeatureResizable = 1;
kha_WindowFeatures.FeatureMinimizable = 2;
kha_WindowFeatures.FeatureMaximizable = 4;
kha_WindowFeatures.FeatureBorderless = 8;
kha_WindowFeatures.FeatureOnTop = 16;
kha_arrays_ByteArray.LITTLE_ENDIAN = new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78;
kha_audio2_Audio.disableGcInteractions = false;
kha_audio2_Audio.intBox = new kha_internal_IntBox(0);
kha_audio2_Audio.virtualChannels = [];
kha_audio2_Audio1.channelCount = 32;
kha_audio2_Audio1.lastAllocationCount = 0;
kha_audio2_ogg_tools_Crc32.POLY = 79764919;
kha_audio2_ogg_vorbis_VorbisDecodeState.INVALID_BITS = -1;
kha_audio2_ogg_vorbis_VorbisTools.EOP = -1;
kha_audio2_ogg_vorbis_VorbisTools.M__PI = 3.14159265358979323846264;
kha_audio2_ogg_vorbis_VorbisTools.DIVTAB_NUMER = 32;
kha_audio2_ogg_vorbis_VorbisTools.DIVTAB_DENOM = 64;
kha_audio2_ogg_vorbis_VorbisTools.INVERSE_DB_TABLE = [1.0649863e-07,1.1341951e-07,1.2079015e-07,1.2863978e-07,1.3699951e-07,1.4590251e-07,1.5538408e-07,1.6548181e-07,1.7623575e-07,1.8768855e-07,1.9988561e-07,2.1287530e-07,2.2670913e-07,2.4144197e-07,2.5713223e-07,2.7384213e-07,2.9163793e-07,3.1059021e-07,3.3077411e-07,3.5226968e-07,3.7516214e-07,3.9954229e-07,4.2550680e-07,4.5315863e-07,4.8260743e-07,5.1396998e-07,5.4737065e-07,5.8294187e-07,6.2082472e-07,6.6116941e-07,7.0413592e-07,7.4989464e-07,7.9862701e-07,8.5052630e-07,9.0579828e-07,9.6466216e-07,1.0273513e-06,1.0941144e-06,1.1652161e-06,1.2409384e-06,1.3215816e-06,1.4074654e-06,1.4989305e-06,1.5963394e-06,1.7000785e-06,1.8105592e-06,1.9282195e-06,2.0535261e-06,2.1869758e-06,2.3290978e-06,2.4804557e-06,2.6416497e-06,2.8133190e-06,2.9961443e-06,3.1908506e-06,3.3982101e-06,3.6190449e-06,3.8542308e-06,4.1047004e-06,4.3714470e-06,4.6555282e-06,4.9580707e-06,5.2802740e-06,5.6234160e-06,5.9888572e-06,6.3780469e-06,6.7925283e-06,7.2339451e-06,7.7040476e-06,8.2047000e-06,8.7378876e-06,9.3057248e-06,9.9104632e-06,1.0554501e-05,1.1240392e-05,1.1970856e-05,1.2748789e-05,1.3577278e-05,1.4459606e-05,1.5399272e-05,1.6400004e-05,1.7465768e-05,1.8600792e-05,1.9809576e-05,2.1096914e-05,2.2467911e-05,2.3928002e-05,2.5482978e-05,2.7139006e-05,2.8902651e-05,3.0780908e-05,3.2781225e-05,3.4911534e-05,3.7180282e-05,3.9596466e-05,4.2169667e-05,4.4910090e-05,4.7828601e-05,5.0936773e-05,5.4246931e-05,5.7772202e-05,6.1526565e-05,6.5524908e-05,6.9783085e-05,7.4317983e-05,7.9147585e-05,8.4291040e-05,8.9768747e-05,9.5602426e-05,0.00010181521,0.00010843174,0.00011547824,0.00012298267,0.00013097477,0.00013948625,0.00014855085,0.00015820453,0.00016848555,0.00017943469,0.00019109536,0.00020351382,0.00021673929,0.00023082423,0.00024582449,0.00026179955,0.00027881276,0.00029693158,0.00031622787,0.00033677814,0.00035866388,0.00038197188,0.00040679456,0.00043323036,0.00046138411,0.00049136745,0.00052329927,0.00055730621,0.00059352311,0.00063209358,0.00067317058,0.00071691700,0.00076350630,0.00081312324,0.00086596457,0.00092223983,0.00098217216,0.0010459992,0.0011139742,0.0011863665,0.0012634633,0.0013455702,0.0014330129,0.0015261382,0.0016253153,0.0017309374,0.0018434235,0.0019632195,0.0020908006,0.0022266726,0.0023713743,0.0025254795,0.0026895994,0.0028643847,0.0030505286,0.0032487691,0.0034598925,0.0036847358,0.0039241906,0.0041792066,0.0044507950,0.0047400328,0.0050480668,0.0053761186,0.0057254891,0.0060975636,0.0064938176,0.0069158225,0.0073652516,0.0078438871,0.0083536271,0.0088964928,0.009474637,0.010090352,0.010746080,0.011444421,0.012188144,0.012980198,0.013823725,0.014722068,0.015678791,0.016697687,0.017782797,0.018938423,0.020169149,0.021479854,0.022875735,0.024362330,0.025945531,0.027631618,0.029427276,0.031339626,0.033376252,0.035545228,0.037855157,0.040315199,0.042935108,0.045725273,0.048696758,0.051861348,0.055231591,0.058820850,0.062643361,0.066714279,0.071049749,0.075666962,0.080584227,0.085821044,0.091398179,0.097337747,0.10366330,0.11039993,0.11757434,0.12521498,0.13335215,0.14201813,0.15124727,0.16107617,0.17154380,0.18269168,0.19456402,0.20720788,0.22067342,0.23501402,0.25028656,0.26655159,0.28387361,0.30232132,0.32196786,0.34289114,0.36517414,0.38890521,0.41417847,0.44109412,0.46975890,0.50028648,0.53279791,0.56742212,0.60429640,0.64356699,0.68538959,0.72993007,0.77736504,0.82788260,0.88168307,0.9389798,1.0];
kha_audio2_ogg_vorbis_data_Codebook.NO_CODE = 255;
kha_audio2_ogg_vorbis_data_Codebook.delay = 0;
kha_audio2_ogg_vorbis_data_Header.PACKET_ID = 1;
kha_audio2_ogg_vorbis_data_Header.PACKET_COMMENT = 3;
kha_audio2_ogg_vorbis_data_Header.PACKET_SETUP = 5;
kha_audio2_ogg_vorbis_data_PageFlag.CONTINUED_PACKET = 1;
kha_audio2_ogg_vorbis_data_PageFlag.FIRST_PAGE = 2;
kha_audio2_ogg_vorbis_data_PageFlag.LAST_PAGE = 4;
kha_audio2_ogg_vorbis_data_Setting.MAX_CHANNELS = 16;
kha_audio2_ogg_vorbis_data_Setting.PUSHDATA_CRC_COUNT = 4;
kha_audio2_ogg_vorbis_data_Setting.FAST_HUFFMAN_LENGTH = 10;
kha_audio2_ogg_vorbis_data_Setting.FAST_HUFFMAN_TABLE_SIZE = 1024;
kha_audio2_ogg_vorbis_data_Setting.FAST_HUFFMAN_TABLE_MASK = 1023;
kha_graphics2_Graphics.fontGlyphs = (function($this) {
	var $r;
	var _g = [];
	{
		var _g1 = 32;
		while(_g1 < 256) {
			var i = _g1++;
			_g.push(i);
		}
	}
	$r = _g;
	return $r;
}(this));
kha_graphics2_truetype_StbTruetype.STBTT_vmove = 1;
kha_graphics2_truetype_StbTruetype.STBTT_vline = 2;
kha_graphics2_truetype_StbTruetype.STBTT_vcurve = 3;
kha_graphics2_truetype_StbTruetype.STBTT_vcubic = 4;
kha_graphics2_truetype_StbTruetype.STBTT_MACSTYLE_DONTCARE = 0;
kha_graphics2_truetype_StbTruetype.STBTT_MACSTYLE_BOLD = 1;
kha_graphics2_truetype_StbTruetype.STBTT_MACSTYLE_ITALIC = 2;
kha_graphics2_truetype_StbTruetype.STBTT_MACSTYLE_UNDERSCORE = 4;
kha_graphics2_truetype_StbTruetype.STBTT_MACSTYLE_NONE = 8;
kha_graphics2_truetype_StbTruetype.STBTT_PLATFORM_ID_UNICODE = 0;
kha_graphics2_truetype_StbTruetype.STBTT_PLATFORM_ID_MAC = 1;
kha_graphics2_truetype_StbTruetype.STBTT_PLATFORM_ID_ISO = 2;
kha_graphics2_truetype_StbTruetype.STBTT_PLATFORM_ID_MICROSOFT = 3;
kha_graphics2_truetype_StbTruetype.STBTT_UNICODE_EID_UNICODE_1_0 = 0;
kha_graphics2_truetype_StbTruetype.STBTT_UNICODE_EID_UNICODE_1_1 = 1;
kha_graphics2_truetype_StbTruetype.STBTT_UNICODE_EID_ISO_10646 = 2;
kha_graphics2_truetype_StbTruetype.STBTT_UNICODE_EID_UNICODE_2_0_BMP = 3;
kha_graphics2_truetype_StbTruetype.STBTT_UNICODE_EID_UNICODE_2_0_FULL = 4;
kha_graphics2_truetype_StbTruetype.STBTT_MS_EID_SYMBOL = 0;
kha_graphics2_truetype_StbTruetype.STBTT_MS_EID_UNICODE_BMP = 1;
kha_graphics2_truetype_StbTruetype.STBTT_MS_EID_SHIFTJIS = 2;
kha_graphics2_truetype_StbTruetype.STBTT_MS_EID_UNICODE_FULL = 10;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_ROMAN = 0;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_ARABIC = 4;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_JAPANESE = 1;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_HEBREW = 5;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_CHINESE_TRAD = 2;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_GREEK = 6;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_KOREAN = 3;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_RUSSIAN = 7;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_ENGLISH = 1033;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_ITALIAN = 1040;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_CHINESE = 2052;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_JAPANESE = 1041;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_DUTCH = 1043;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_KOREAN = 1042;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_FRENCH = 1036;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_RUSSIAN = 1049;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_GERMAN = 1031;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_SPANISH = 1033;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_HEBREW = 1037;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_SWEDISH = 1053;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_ENGLISH = 0;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_JAPANESE = 11;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_ARABIC = 12;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_KOREAN = 23;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_DUTCH = 4;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_RUSSIAN = 32;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_FRENCH = 1;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_SPANISH = 6;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_GERMAN = 2;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_SWEDISH = 5;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_HEBREW = 10;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_CHINESE_SIMPLIFIED = 33;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_ITALIAN = 3;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_CHINESE_TRAD = 19;
kha_graphics2_truetype_StbTruetype.STBTT_MAX_OVERSAMPLE = 8;
kha_graphics2_truetype_StbTruetype.STBTT_RASTERIZER_VERSION = 2;
kha_graphics4_CubeMap.GL_RGBA16F = 34842;
kha_graphics4_CubeMap.GL_RGBA32F = 34836;
kha_graphics4_CubeMap.GL_R16F = 33325;
kha_graphics4_CubeMap.GL_R32F = 33326;
kha_graphics4_CubeMap.GL_DEPTH_COMPONENT24 = 33190;
kha_graphics4_CubeMap.GL_DEPTH24_STENCIL8 = 35056;
kha_graphics4_CubeMap.GL_DEPTH32F_STENCIL8 = 36013;
kha_graphics4_ImageShaderPainter.bufferSize = 1500;
kha_graphics4_ImageShaderPainter.vertexSize = 6;
kha_graphics4_ColoredShaderPainter.bufferSize = 1000;
kha_graphics4_ColoredShaderPainter.triangleBufferSize = 1000;
kha_graphics4_TextShaderPainter.bufferSize = 1000;
kha_graphics4_VertexData.Float32_1X = 0;
kha_graphics4_VertexData.Float32_2X = 1;
kha_graphics4_VertexData.Float32_3X = 2;
kha_graphics4_VertexData.Float32_4X = 3;
kha_graphics4_VertexData.Float32_4X4 = 4;
kha_graphics4_VertexData.Int8_1X = 5;
kha_graphics4_VertexData.UInt8_1X = 6;
kha_graphics4_VertexData.Int8_1X_Normalized = 7;
kha_graphics4_VertexData.UInt8_1X_Normalized = 8;
kha_graphics4_VertexData.Int8_2X = 9;
kha_graphics4_VertexData.UInt8_2X = 10;
kha_graphics4_VertexData.Int8_2X_Normalized = 11;
kha_graphics4_VertexData.UInt8_2X_Normalized = 12;
kha_graphics4_VertexData.Int8_4X = 13;
kha_graphics4_VertexData.UInt8_4X = 14;
kha_graphics4_VertexData.Int8_4X_Normalized = 15;
kha_graphics4_VertexData.UInt8_4X_Normalized = 16;
kha_graphics4_VertexData.Int16_1X = 17;
kha_graphics4_VertexData.UInt16_1X = 18;
kha_graphics4_VertexData.Int16_1X_Normalized = 19;
kha_graphics4_VertexData.UInt16_1X_Normalized = 20;
kha_graphics4_VertexData.Int16_2X = 21;
kha_graphics4_VertexData.UInt16_2X = 22;
kha_graphics4_VertexData.Int16_2X_Normalized = 23;
kha_graphics4_VertexData.UInt16_2X_Normalized = 24;
kha_graphics4_VertexData.Int16_4X = 25;
kha_graphics4_VertexData.UInt16_4X = 26;
kha_graphics4_VertexData.Int16_4X_Normalized = 27;
kha_graphics4_VertexData.UInt16_4X_Normalized = 28;
kha_graphics4_VertexData.Int32_1X = 29;
kha_graphics4_VertexData.UInt32_1X = 30;
kha_graphics4_VertexData.Int32_2X = 31;
kha_graphics4_VertexData.UInt32_2X = 32;
kha_graphics4_VertexData.Int32_3X = 33;
kha_graphics4_VertexData.UInt32_3X = 34;
kha_graphics4_VertexData.Int32_4X = 35;
kha_graphics4_VertexData.UInt32_4X = 36;
kha_graphics4_VertexData.Float1 = 0;
kha_graphics4_VertexData.Float2 = 1;
kha_graphics4_VertexData.Float3 = 2;
kha_graphics4_VertexData.Float4 = 3;
kha_graphics4_VertexData.Float4x4 = 4;
kha_graphics4_VertexData.Short2Norm = 23;
kha_graphics4_VertexData.Short4Norm = 27;
kha_input_Gamepad.__meta__ = { statics : { sendConnectEvent : { input : null}, sendDisconnectEvent : { input : null}}, fields : { sendAxisEvent : { input : null}, sendButtonEvent : { input : null}}};
kha_input_Gamepad.instances = [];
kha_input_Gamepad.connectListeners = [];
kha_input_Gamepad.disconnectListeners = [];
kha_input_Keyboard.__meta__ = { fields : { sendDownEvent : { input : null}, sendUpEvent : { input : null}, sendPressEvent : { input : null}}};
kha_input_Keyboard.keyBehavior = kha_input_BlockInterventions.Default;
kha_input_Mouse.__meta__ = { fields : { sendLeaveEvent : { input : null}, sendDownEvent : { input : null}, sendUpEvent : { input : null}, sendMoveEvent : { input : null}, sendWheelEvent : { input : null}}};
kha_input_Mouse.wheelEventBlockBehavior = kha_input_MouseEventBlockBehavior.Full;
kha_input_Sensor.isInited = false;
kha_input_Sensor.accelerometer = new kha_input_Sensor();
kha_input_Sensor.gyroscope = new kha_input_Sensor();
kha_input_Surface.touchDownEventBlockBehavior = kha_input_TouchDownEventBlockBehavior.Full;
kha_internal_BytesBlob.bufferSize = 2000;
kha_internal_HdrFormat.radiancePattern = new EReg("#\\?RADIANCE","i");
kha_internal_HdrFormat.commentPattern = new EReg("#.*","i");
kha_internal_HdrFormat.gammaPattern = new EReg("GAMMA=","i");
kha_internal_HdrFormat.exposurePattern = new EReg("EXPOSURE=\\s*([0-9]*[.][0-9]*)","i");
kha_internal_HdrFormat.formatPattern = new EReg("FORMAT=32-bit_rle_rgbe","i");
kha_internal_HdrFormat.widthHeightPattern = new EReg("-Y ([0-9]+) \\+X ([0-9]+)","i");
kha_js_Sound.loading = [];
kha_js_graphics4_Graphics.useVertexAttributes = 0;
kha_math_FastMatrix3.width = 3;
kha_math_FastMatrix3.height = 3;
kha_math_FastMatrix4.width = 4;
kha_math_FastMatrix4.height = 4;
kha_math_Matrix3.width = 3;
kha_math_Matrix3.height = 3;
kha_math_Matrix4.width = 4;
kha_math_Matrix4.height = 4;
kha_math_Quaternion.AXIS_X = 0;
kha_math_Quaternion.AXIS_Y = 1;
kha_math_Quaternion.AXIS_Z = 2;
kha_netsync_ControllerBuilder.nextId = 0;
kha_netsync_Session.START = 0;
kha_netsync_Session.ENTITY_UPDATES = 1;
kha_netsync_Session.CONTROLLER_UPDATES = 2;
kha_netsync_Session.REMOTE_CALL = 3;
kha_netsync_Session.PING = 4;
kha_netsync_Session.SESSION_ERROR = 5;
kha_netsync_Session.PLAYER_UPDATES = 6;
kha_netsync_Session.RPC_SERVER = 0;
kha_netsync_Session.RPC_ALL = 1;
kha_netsync_SyncBuilder.nextId = 0;
kha_netsync_SyncBuilder.objects = [];
Main.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
