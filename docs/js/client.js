(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var dn_struct_FixedArray = function(name,maxSize) {
	this.name = name;
	var this1 = new Array(maxSize);
	this.values = this1;
	this.nalloc = 0;
};
dn_struct_FixedArray.__name__ = "dn.struct.FixedArray";
dn_struct_FixedArray.prototype = {
	toString: function() {
		return (this.name == null ? "FixedArray" : this.name) + (" " + this.nalloc + " / " + this.values.length);
	}
	,dumpContent: function() {
		var sub = [];
		var _g = 0;
		var _g1 = this.nalloc;
		while(_g < _g1) {
			var i = _g++;
			sub[i] = this.values[i];
		}
		return "[ " + sub.join(", ") + " ]";
	}
	,remove: function(e) {
		var found = false;
		var _g = 0;
		var _g1 = this.nalloc;
		while(_g < _g1) {
			var i = _g++;
			if(this.values[i] == e) {
				this.removeIndex(i);
				found = true;
				break;
			}
		}
		return found;
	}
	,removeIndex: function(i) {
		if(i < this.nalloc) {
			this.values[i] = null;
			if(this.nalloc > 1) {
				this.values[i] = this.values[this.nalloc - 1];
				this.values[this.nalloc - 1] = null;
				this.nalloc--;
			} else {
				this.nalloc = 0;
			}
		}
	}
	,__class__: dn_struct_FixedArray
};
var dn_Process = function(parent) {
	this.tmpProfilerTimes = new haxe_ds_StringMap();
	this._initOnceDone = false;
	this._fixedUpdateAccu = 0.;
	this.ignoreTimeMultipliers = false;
	this.baseTimeMul = 1.0;
	this.init();
	if(parent == null) {
		var _this = dn_Process.ROOTS;
		if(_this.nalloc >= _this.values.length) {
			throw haxe_Exception.thrown("FixedArray limit reached (" + _this.values.length + ")");
		}
		_this.values[_this.nalloc] = this;
		_this.nalloc++;
	} else {
		parent.addChild(this);
	}
	dn_Process.resizeAll(false);
};
dn_Process.__name__ = "dn.Process";
dn_Process._doPreUpdate = function(p,utmod) {
	var tmp;
	if(p._manuallyPaused) {
		tmp = true;
	} else if(p.parent != null) {
		var _this = p.parent;
		tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
	} else {
		tmp = false;
	}
	if(!(!tmp && !p.destroyed)) {
		return;
	}
	p.utmod = utmod;
	p.ftime += p.utmod * p.getComputedTimeMultiplier();
	p.uftime += p.utmod;
	p.delayer.update(p.utmod * p.getComputedTimeMultiplier());
	var tmp;
	if(p._manuallyPaused) {
		tmp = true;
	} else if(p.parent != null) {
		var _this = p.parent;
		tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
	} else {
		tmp = false;
	}
	if(!tmp && !p.destroyed) {
		p.udelayer.update(p.utmod);
	}
	var tmp;
	if(p._manuallyPaused) {
		tmp = true;
	} else if(p.parent != null) {
		var _this = p.parent;
		tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
	} else {
		tmp = false;
	}
	if(!tmp && !p.destroyed) {
		p.cd.update(p.utmod * p.getComputedTimeMultiplier());
	}
	var tmp;
	if(p._manuallyPaused) {
		tmp = true;
	} else if(p.parent != null) {
		var _this = p.parent;
		tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
	} else {
		tmp = false;
	}
	if(!tmp && !p.destroyed) {
		p.ucd.update(p.utmod);
	}
	var tmp;
	if(p._manuallyPaused) {
		tmp = true;
	} else if(p.parent != null) {
		var _this = p.parent;
		tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
	} else {
		tmp = false;
	}
	if(!tmp && !p.destroyed) {
		p.tw.update(p.utmod * p.getComputedTimeMultiplier());
	}
	var tmp;
	if(p._manuallyPaused) {
		tmp = true;
	} else if(p.parent != null) {
		var _this = p.parent;
		tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
	} else {
		tmp = false;
	}
	if(!tmp && !p.destroyed) {
		if(!p._initOnceDone) {
			p.initOnceBeforeUpdate();
			p._initOnceDone = true;
		}
		p.preUpdate();
	}
	var tmp;
	if(p._manuallyPaused) {
		tmp = true;
	} else if(p.parent != null) {
		var _this = p.parent;
		tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
	} else {
		tmp = false;
	}
	if(!tmp && !p.destroyed) {
		var _g_arr = p.children;
		var _g_i = 0;
		while(_g_i < _g_arr.nalloc) {
			var c = _g_arr.values[_g_i++];
			dn_Process._doPreUpdate(c,p.utmod);
		}
	}
};
dn_Process._doMainUpdate = function(p) {
	var tmp;
	if(p._manuallyPaused) {
		tmp = true;
	} else if(p.parent != null) {
		var _this = p.parent;
		tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
	} else {
		tmp = false;
	}
	if(!(!tmp && !p.destroyed)) {
		return;
	}
	var id = "update";
	if(dn_Process.PROFILING) {
		var id1;
		if(p.name != null) {
			id1 = p.name;
		} else {
			if(p._cachedClassName == null) {
				var c = js_Boot.getClass(p);
				p._cachedClassName = c.__name__;
			}
			id1 = p._cachedClassName;
		}
		id = id1 + "." + id;
		p.tmpProfilerTimes.h[id] = HxOverrides.now() / 1000;
	}
	p.update();
	if(p.onUpdateCb != null) {
		p.onUpdateCb();
	}
	var id = "update";
	if(dn_Process.PROFILING) {
		var id1;
		if(p.name != null) {
			id1 = p.name;
		} else {
			if(p._cachedClassName == null) {
				var c = js_Boot.getClass(p);
				p._cachedClassName = c.__name__;
			}
			id1 = p._cachedClassName;
		}
		id = id1 + "." + id;
		if(Object.prototype.hasOwnProperty.call(p.tmpProfilerTimes.h,id)) {
			var t = HxOverrides.now() / 1000 - p.tmpProfilerTimes.h[id];
			var _this = p.tmpProfilerTimes;
			if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
				delete(_this.h[id]);
			}
			if(!Object.prototype.hasOwnProperty.call(dn_Process.PROFILER_TIMES.h,id)) {
				dn_Process.PROFILER_TIMES.h[id] = t;
			} else {
				dn_Process.PROFILER_TIMES.h[id] += t;
			}
		}
	}
	var tmp;
	if(p._manuallyPaused) {
		tmp = true;
	} else if(p.parent != null) {
		var _this = p.parent;
		tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
	} else {
		tmp = false;
	}
	if(!tmp && !p.destroyed) {
		var _g_arr = p.children;
		var _g_i = 0;
		while(_g_i < _g_arr.nalloc) {
			var p = _g_arr.values[_g_i++];
			dn_Process._doMainUpdate(p);
		}
	}
};
dn_Process._doFixedUpdate = function(p) {
	var tmp;
	if(p._manuallyPaused) {
		tmp = true;
	} else if(p.parent != null) {
		var _this = p.parent;
		tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
	} else {
		tmp = false;
	}
	if(!(!tmp && !p.destroyed)) {
		return;
	}
	var id = "fixed";
	if(dn_Process.PROFILING) {
		var id1;
		if(p.name != null) {
			id1 = p.name;
		} else {
			if(p._cachedClassName == null) {
				var c = js_Boot.getClass(p);
				p._cachedClassName = c.__name__;
			}
			id1 = p._cachedClassName;
		}
		id = id1 + "." + id;
		p.tmpProfilerTimes.h[id] = HxOverrides.now() / 1000;
	}
	p._fixedUpdateAccu += p.utmod * p.getComputedTimeMultiplier();
	while(p._fixedUpdateAccu >= p.getDefaultFrameRate() / dn_Process.FIXED_UPDATE_FPS) {
		p._fixedUpdateAccu -= p.getDefaultFrameRate() / dn_Process.FIXED_UPDATE_FPS;
		var tmp;
		if(p._manuallyPaused) {
			tmp = true;
		} else if(p.parent != null) {
			var _this = p.parent;
			tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
		} else {
			tmp = false;
		}
		if(!tmp && !p.destroyed) {
			p.fixedUpdate();
			if(p.onFixedUpdateCb != null) {
				p.onFixedUpdateCb();
			}
		}
	}
	var id = "fixed";
	if(dn_Process.PROFILING) {
		var id1;
		if(p.name != null) {
			id1 = p.name;
		} else {
			if(p._cachedClassName == null) {
				var c = js_Boot.getClass(p);
				p._cachedClassName = c.__name__;
			}
			id1 = p._cachedClassName;
		}
		id = id1 + "." + id;
		if(Object.prototype.hasOwnProperty.call(p.tmpProfilerTimes.h,id)) {
			var t = HxOverrides.now() / 1000 - p.tmpProfilerTimes.h[id];
			var _this = p.tmpProfilerTimes;
			if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
				delete(_this.h[id]);
			}
			if(!Object.prototype.hasOwnProperty.call(dn_Process.PROFILER_TIMES.h,id)) {
				dn_Process.PROFILER_TIMES.h[id] = t;
			} else {
				dn_Process.PROFILER_TIMES.h[id] += t;
			}
		}
	}
	var tmp;
	if(p._manuallyPaused) {
		tmp = true;
	} else if(p.parent != null) {
		var _this = p.parent;
		tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
	} else {
		tmp = false;
	}
	if(!tmp && !p.destroyed) {
		var _g_arr = p.children;
		var _g_i = 0;
		while(_g_i < _g_arr.nalloc) {
			var p = _g_arr.values[_g_i++];
			dn_Process._doFixedUpdate(p);
		}
	}
};
dn_Process._doPostUpdate = function(p) {
	var tmp;
	if(p._manuallyPaused) {
		tmp = true;
	} else if(p.parent != null) {
		var _this = p.parent;
		tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
	} else {
		tmp = false;
	}
	if(!(!tmp && !p.destroyed)) {
		return;
	}
	var id = "post";
	if(dn_Process.PROFILING) {
		var id1;
		if(p.name != null) {
			id1 = p.name;
		} else {
			if(p._cachedClassName == null) {
				var c = js_Boot.getClass(p);
				p._cachedClassName = c.__name__;
			}
			id1 = p._cachedClassName;
		}
		id = id1 + "." + id;
		p.tmpProfilerTimes.h[id] = HxOverrides.now() / 1000;
	}
	p.postUpdate();
	var id = "post";
	if(dn_Process.PROFILING) {
		var id1;
		if(p.name != null) {
			id1 = p.name;
		} else {
			if(p._cachedClassName == null) {
				var c = js_Boot.getClass(p);
				p._cachedClassName = c.__name__;
			}
			id1 = p._cachedClassName;
		}
		id = id1 + "." + id;
		if(Object.prototype.hasOwnProperty.call(p.tmpProfilerTimes.h,id)) {
			var t = HxOverrides.now() / 1000 - p.tmpProfilerTimes.h[id];
			var _this = p.tmpProfilerTimes;
			if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
				delete(_this.h[id]);
			}
			if(!Object.prototype.hasOwnProperty.call(dn_Process.PROFILER_TIMES.h,id)) {
				dn_Process.PROFILER_TIMES.h[id] = t;
			} else {
				dn_Process.PROFILER_TIMES.h[id] += t;
			}
		}
	}
	if(!p.destroyed) {
		var _g_arr = p.children;
		var _g_i = 0;
		while(_g_i < _g_arr.nalloc) {
			var c = _g_arr.values[_g_i++];
			dn_Process._doPostUpdate(c);
		}
	}
};
dn_Process._garbageCollector = function(plist) {
	var i = 0;
	var p;
	while(i < plist.nalloc) {
		p = i < 0 || i >= plist.nalloc ? null : plist.values[i];
		if(p.destroyed) {
			dn_Process._disposeProcess(p);
		} else {
			dn_Process._garbageCollector(p.children);
			++i;
		}
	}
};
dn_Process._disposeProcess = function(p) {
	var _g_arr = p.children;
	var _g_i = 0;
	while(_g_i < _g_arr.nalloc) {
		var p1 = _g_arr.values[_g_i++];
		p1.destroyed = true;
	}
	dn_Process._garbageCollector(p.children);
	p.delayer.destroy();
	p.udelayer.destroy();
	p.cd.dispose();
	p.ucd.dispose();
	p.tw.destroy();
	if(p.parent != null) {
		p.parent.children.remove(p);
	} else {
		dn_Process.ROOTS.remove(p);
	}
	if(p.root != null) {
		var _this = p.root;
		if(_this != null && _this.parent != null) {
			_this.parent.removeChild(_this);
		}
	}
	p.onDispose();
	if(p.onDisposeCb != null) {
		p.onDisposeCb();
	}
	p.parent = null;
	p.children = null;
	p.cd = null;
	p.ucd = null;
	p.delayer = null;
	p.udelayer = null;
	p.tw = null;
	p.root = null;
};
dn_Process._resizeProcess = function(p) {
	if(!p.destroyed) {
		p.onResize();
		var _g_arr = p.children;
		var _g_i = 0;
		while(_g_i < _g_arr.nalloc) {
			var p = _g_arr.values[_g_i++];
			dn_Process._resizeProcess(p);
		}
	}
};
dn_Process.updateAll = function(utmod) {
	if(dn_Process.BEGINNING_OF_FRAME_CALLBACKS.nalloc > 0) {
		var _g_arr = dn_Process.BEGINNING_OF_FRAME_CALLBACKS;
		var _g_i = 0;
		while(_g_i < _g_arr.nalloc) {
			var cb = _g_arr.values[_g_i++];
			cb();
		}
		dn_Process.BEGINNING_OF_FRAME_CALLBACKS.nalloc = 0;
	}
	var _g_arr = dn_Process.ROOTS;
	var _g_i = 0;
	while(_g_i < _g_arr.nalloc) {
		var p = _g_arr.values[_g_i++];
		var tmp;
		if(p._manuallyPaused) {
			tmp = true;
		} else if(p.parent != null) {
			var _this = p.parent;
			tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
		} else {
			tmp = false;
		}
		if(!tmp && !p.destroyed) {
			p.utmod = utmod;
			p.ftime += p.utmod * p.getComputedTimeMultiplier();
			p.uftime += p.utmod;
			p.delayer.update(p.utmod * p.getComputedTimeMultiplier());
			var tmp1;
			if(p._manuallyPaused) {
				tmp1 = true;
			} else if(p.parent != null) {
				var _this1 = p.parent;
				tmp1 = _this1._manuallyPaused ? true : _this1.parent != null && _this1.parent.isPaused();
			} else {
				tmp1 = false;
			}
			if(!tmp1 && !p.destroyed) {
				p.udelayer.update(p.utmod);
			}
			var tmp2;
			if(p._manuallyPaused) {
				tmp2 = true;
			} else if(p.parent != null) {
				var _this2 = p.parent;
				tmp2 = _this2._manuallyPaused ? true : _this2.parent != null && _this2.parent.isPaused();
			} else {
				tmp2 = false;
			}
			if(!tmp2 && !p.destroyed) {
				p.cd.update(p.utmod * p.getComputedTimeMultiplier());
			}
			var tmp3;
			if(p._manuallyPaused) {
				tmp3 = true;
			} else if(p.parent != null) {
				var _this3 = p.parent;
				tmp3 = _this3._manuallyPaused ? true : _this3.parent != null && _this3.parent.isPaused();
			} else {
				tmp3 = false;
			}
			if(!tmp3 && !p.destroyed) {
				p.ucd.update(p.utmod);
			}
			var tmp4;
			if(p._manuallyPaused) {
				tmp4 = true;
			} else if(p.parent != null) {
				var _this4 = p.parent;
				tmp4 = _this4._manuallyPaused ? true : _this4.parent != null && _this4.parent.isPaused();
			} else {
				tmp4 = false;
			}
			if(!tmp4 && !p.destroyed) {
				p.tw.update(p.utmod * p.getComputedTimeMultiplier());
			}
			var tmp5;
			if(p._manuallyPaused) {
				tmp5 = true;
			} else if(p.parent != null) {
				var _this5 = p.parent;
				tmp5 = _this5._manuallyPaused ? true : _this5.parent != null && _this5.parent.isPaused();
			} else {
				tmp5 = false;
			}
			if(!tmp5 && !p.destroyed) {
				if(!p._initOnceDone) {
					p.initOnceBeforeUpdate();
					p._initOnceDone = true;
				}
				p.preUpdate();
			}
			var tmp6;
			if(p._manuallyPaused) {
				tmp6 = true;
			} else if(p.parent != null) {
				var _this6 = p.parent;
				tmp6 = _this6._manuallyPaused ? true : _this6.parent != null && _this6.parent.isPaused();
			} else {
				tmp6 = false;
			}
			if(!tmp6 && !p.destroyed) {
				var _g_arr1 = p.children;
				var _g_i1 = 0;
				while(_g_i1 < _g_arr1.nalloc) {
					var c = _g_arr1.values[_g_i1++];
					var utmod1 = p.utmod;
					var tmp7;
					if(c._manuallyPaused) {
						tmp7 = true;
					} else if(c.parent != null) {
						var _this7 = c.parent;
						if(_this7._manuallyPaused) {
							tmp7 = true;
						} else if(_this7.parent != null) {
							var _this8 = _this7.parent;
							tmp7 = _this8._manuallyPaused ? true : _this8.parent != null && _this8.parent.isPaused();
						} else {
							tmp7 = false;
						}
					} else {
						tmp7 = false;
					}
					if(!tmp7 && !c.destroyed) {
						c.utmod = utmod1;
						c.ftime += c.utmod * c.getComputedTimeMultiplier();
						c.uftime += c.utmod;
						c.delayer.update(c.utmod * c.getComputedTimeMultiplier());
						var tmp8;
						if(c._manuallyPaused) {
							tmp8 = true;
						} else if(c.parent != null) {
							var _this9 = c.parent;
							if(_this9._manuallyPaused) {
								tmp8 = true;
							} else if(_this9.parent != null) {
								var _this10 = _this9.parent;
								tmp8 = _this10._manuallyPaused ? true : _this10.parent != null && _this10.parent.isPaused();
							} else {
								tmp8 = false;
							}
						} else {
							tmp8 = false;
						}
						if(!tmp8 && !c.destroyed) {
							c.udelayer.update(c.utmod);
						}
						var tmp9;
						if(c._manuallyPaused) {
							tmp9 = true;
						} else if(c.parent != null) {
							var _this11 = c.parent;
							if(_this11._manuallyPaused) {
								tmp9 = true;
							} else if(_this11.parent != null) {
								var _this12 = _this11.parent;
								tmp9 = _this12._manuallyPaused ? true : _this12.parent != null && _this12.parent.isPaused();
							} else {
								tmp9 = false;
							}
						} else {
							tmp9 = false;
						}
						if(!tmp9 && !c.destroyed) {
							c.cd.update(c.utmod * c.getComputedTimeMultiplier());
						}
						var tmp10;
						if(c._manuallyPaused) {
							tmp10 = true;
						} else if(c.parent != null) {
							var _this13 = c.parent;
							if(_this13._manuallyPaused) {
								tmp10 = true;
							} else if(_this13.parent != null) {
								var _this14 = _this13.parent;
								tmp10 = _this14._manuallyPaused ? true : _this14.parent != null && _this14.parent.isPaused();
							} else {
								tmp10 = false;
							}
						} else {
							tmp10 = false;
						}
						if(!tmp10 && !c.destroyed) {
							c.ucd.update(c.utmod);
						}
						var tmp11;
						if(c._manuallyPaused) {
							tmp11 = true;
						} else if(c.parent != null) {
							var _this15 = c.parent;
							if(_this15._manuallyPaused) {
								tmp11 = true;
							} else if(_this15.parent != null) {
								var _this16 = _this15.parent;
								tmp11 = _this16._manuallyPaused ? true : _this16.parent != null && _this16.parent.isPaused();
							} else {
								tmp11 = false;
							}
						} else {
							tmp11 = false;
						}
						if(!tmp11 && !c.destroyed) {
							c.tw.update(c.utmod * c.getComputedTimeMultiplier());
						}
						var tmp12;
						if(c._manuallyPaused) {
							tmp12 = true;
						} else if(c.parent != null) {
							var _this17 = c.parent;
							if(_this17._manuallyPaused) {
								tmp12 = true;
							} else if(_this17.parent != null) {
								var _this18 = _this17.parent;
								tmp12 = _this18._manuallyPaused ? true : _this18.parent != null && _this18.parent.isPaused();
							} else {
								tmp12 = false;
							}
						} else {
							tmp12 = false;
						}
						if(!tmp12 && !c.destroyed) {
							if(!c._initOnceDone) {
								c.initOnceBeforeUpdate();
								c._initOnceDone = true;
							}
							c.preUpdate();
						}
						var tmp13;
						if(c._manuallyPaused) {
							tmp13 = true;
						} else if(c.parent != null) {
							var _this19 = c.parent;
							if(_this19._manuallyPaused) {
								tmp13 = true;
							} else if(_this19.parent != null) {
								var _this20 = _this19.parent;
								tmp13 = _this20._manuallyPaused ? true : _this20.parent != null && _this20.parent.isPaused();
							} else {
								tmp13 = false;
							}
						} else {
							tmp13 = false;
						}
						if(!tmp13 && !c.destroyed) {
							var _g_arr2 = c.children;
							var _g_i2 = 0;
							while(_g_i2 < _g_arr2.nalloc) {
								var c1 = _g_arr2.values[_g_i2++];
								dn_Process._doPreUpdate(c1,c.utmod);
							}
						}
					}
				}
			}
		}
	}
	var _g1_arr = dn_Process.ROOTS;
	var _g1_i = 0;
	while(_g1_i < _g1_arr.nalloc) {
		var p = _g1_arr.values[_g1_i++];
		dn_Process._doMainUpdate(p);
	}
	var _g2_arr = dn_Process.ROOTS;
	var _g2_i = 0;
	while(_g2_i < _g2_arr.nalloc) {
		var p = _g2_arr.values[_g2_i++];
		dn_Process._doFixedUpdate(p);
	}
	var _g3_arr = dn_Process.ROOTS;
	var _g3_i = 0;
	while(_g3_i < _g3_arr.nalloc) {
		var p = _g3_arr.values[_g3_i++];
		var tmp;
		if(p._manuallyPaused) {
			tmp = true;
		} else if(p.parent != null) {
			var _this = p.parent;
			tmp = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
		} else {
			tmp = false;
		}
		if(!tmp && !p.destroyed) {
			var id = "post";
			if(dn_Process.PROFILING) {
				var id1;
				if(p.name != null) {
					id1 = p.name;
				} else {
					if(p._cachedClassName == null) {
						var c = js_Boot.getClass(p);
						p._cachedClassName = c.__name__;
					}
					id1 = p._cachedClassName;
				}
				id = id1 + "." + id;
				p.tmpProfilerTimes.h[id] = HxOverrides.now() / 1000;
			}
			p.postUpdate();
			var id2 = "post";
			if(dn_Process.PROFILING) {
				var id3;
				if(p.name != null) {
					id3 = p.name;
				} else {
					if(p._cachedClassName == null) {
						var c1 = js_Boot.getClass(p);
						p._cachedClassName = c1.__name__;
					}
					id3 = p._cachedClassName;
				}
				id2 = id3 + "." + id2;
				if(Object.prototype.hasOwnProperty.call(p.tmpProfilerTimes.h,id2)) {
					var t = HxOverrides.now() / 1000 - p.tmpProfilerTimes.h[id2];
					var _this1 = p.tmpProfilerTimes;
					if(Object.prototype.hasOwnProperty.call(_this1.h,id2)) {
						delete(_this1.h[id2]);
					}
					if(!Object.prototype.hasOwnProperty.call(dn_Process.PROFILER_TIMES.h,id2)) {
						dn_Process.PROFILER_TIMES.h[id2] = t;
					} else {
						dn_Process.PROFILER_TIMES.h[id2] += t;
					}
				}
			}
			if(!p.destroyed) {
				var _g_arr = p.children;
				var _g_i = 0;
				while(_g_i < _g_arr.nalloc) {
					var c2 = _g_arr.values[_g_i++];
					var tmp1;
					if(c2._manuallyPaused) {
						tmp1 = true;
					} else if(c2.parent != null) {
						var _this2 = c2.parent;
						if(_this2._manuallyPaused) {
							tmp1 = true;
						} else if(_this2.parent != null) {
							var _this3 = _this2.parent;
							tmp1 = _this3._manuallyPaused ? true : _this3.parent != null && _this3.parent.isPaused();
						} else {
							tmp1 = false;
						}
					} else {
						tmp1 = false;
					}
					if(!tmp1 && !c2.destroyed) {
						var id4 = "post";
						if(dn_Process.PROFILING) {
							var id5;
							if(c2.name != null) {
								id5 = c2.name;
							} else {
								if(c2._cachedClassName == null) {
									var c3 = js_Boot.getClass(c2);
									c2._cachedClassName = c3.__name__;
								}
								id5 = c2._cachedClassName;
							}
							id4 = id5 + "." + id4;
							c2.tmpProfilerTimes.h[id4] = HxOverrides.now() / 1000;
						}
						c2.postUpdate();
						var id6 = "post";
						if(dn_Process.PROFILING) {
							var id7;
							if(c2.name != null) {
								id7 = c2.name;
							} else {
								if(c2._cachedClassName == null) {
									var c4 = js_Boot.getClass(c2);
									c2._cachedClassName = c4.__name__;
								}
								id7 = c2._cachedClassName;
							}
							id6 = id7 + "." + id6;
							if(Object.prototype.hasOwnProperty.call(c2.tmpProfilerTimes.h,id6)) {
								var t1 = HxOverrides.now() / 1000 - c2.tmpProfilerTimes.h[id6];
								var _this4 = c2.tmpProfilerTimes;
								if(Object.prototype.hasOwnProperty.call(_this4.h,id6)) {
									delete(_this4.h[id6]);
								}
								if(!Object.prototype.hasOwnProperty.call(dn_Process.PROFILER_TIMES.h,id6)) {
									dn_Process.PROFILER_TIMES.h[id6] = t1;
								} else {
									dn_Process.PROFILER_TIMES.h[id6] += t1;
								}
							}
						}
						if(!c2.destroyed) {
							var _g_arr1 = c2.children;
							var _g_i1 = 0;
							while(_g_i1 < _g_arr1.nalloc) {
								var c5 = _g_arr1.values[_g_i1++];
								dn_Process._doPostUpdate(c5);
							}
						}
					}
				}
			}
		}
	}
	if(dn_Process.RESIZE_REQUESTED) {
		dn_Process.RESIZE_REQUESTED = false;
		var _g4_arr = dn_Process.ROOTS;
		var _g4_i = 0;
		while(_g4_i < _g4_arr.nalloc) {
			var p = _g4_arr.values[_g4_i++];
			if(!p.destroyed) {
				p.onResize();
				var _g_arr = p.children;
				var _g_i = 0;
				while(_g_i < _g_arr.nalloc) {
					var p1 = _g_arr.values[_g_i++];
					if(!p1.destroyed) {
						p1.onResize();
						var _g_arr1 = p1.children;
						var _g_i1 = 0;
						while(_g_i1 < _g_arr1.nalloc) {
							var p2 = _g_arr1.values[_g_i1++];
							dn_Process._resizeProcess(p2);
						}
					}
				}
			}
		}
	}
	dn_Process._garbageCollector(dn_Process.ROOTS);
	if(dn_Process.END_OF_FRAME_CALLBACKS.nalloc > 0) {
		var _g4_arr = dn_Process.END_OF_FRAME_CALLBACKS;
		var _g4_i = 0;
		while(_g4_i < _g4_arr.nalloc) {
			var cb = _g4_arr.values[_g4_i++];
			cb();
		}
		dn_Process.END_OF_FRAME_CALLBACKS.nalloc = 0;
	}
};
dn_Process.resizeAll = function(immediately) {
	if(immediately == null) {
		immediately = false;
	}
	if(immediately) {
		var _g_arr = dn_Process.ROOTS;
		var _g_i = 0;
		while(_g_i < _g_arr.nalloc) {
			var p = _g_arr.values[_g_i++];
			if(!p.destroyed) {
				p.onResize();
				var _g_arr1 = p.children;
				var _g_i1 = 0;
				while(_g_i1 < _g_arr1.nalloc) {
					var p1 = _g_arr1.values[_g_i1++];
					if(!p1.destroyed) {
						p1.onResize();
						var _g_arr2 = p1.children;
						var _g_i2 = 0;
						while(_g_i2 < _g_arr2.nalloc) {
							var p2 = _g_arr2.values[_g_i2++];
							dn_Process._resizeProcess(p2);
						}
					}
				}
			}
		}
	} else {
		dn_Process.RESIZE_REQUESTED = true;
	}
};
dn_Process.prototype = {
	init: function() {
		this.uniqId = dn_Process.UNIQ_ID++;
		this.children = new dn_struct_FixedArray(null,dn_Process.MAX_PROCESSES);
		this._manuallyPaused = false;
		this.destroyed = false;
		this.ftime = 0;
		this.uftime = 0;
		this.utmod = 1;
		this.baseTimeMul = 1;
		this.cd = new dn_Cooldown(this.getDefaultFrameRate());
		this.delayer = new dn_Delayer(this.getDefaultFrameRate());
		this.tw = new dn_Tweenie(this.getDefaultFrameRate());
		this.ucd = new dn_Cooldown(this.getDefaultFrameRate());
		this.udelayer = new dn_Delayer(this.getDefaultFrameRate());
	}
	,initOnceBeforeUpdate: function() {
	}
	,preUpdate: function() {
	}
	,update: function() {
	}
	,fixedUpdate: function() {
	}
	,postUpdate: function() {
	}
	,onResize: function() {
	}
	,onDispose: function() {
	}
	,onUpdateCb: function() {
	}
	,onFixedUpdateCb: function() {
	}
	,onDisposeCb: function() {
	}
	,toString: function() {
		var tmp = "#" + this.uniqId + " ";
		var tmp1;
		if(this.name != null) {
			tmp1 = this.name;
		} else {
			if(this._cachedClassName == null) {
				var c = js_Boot.getClass(this);
				this._cachedClassName = c.__name__;
			}
			tmp1 = this._cachedClassName;
		}
		var tmp2;
		if(this._manuallyPaused) {
			tmp2 = true;
		} else if(this.parent != null) {
			var _this = this.parent;
			tmp2 = _this._manuallyPaused ? true : _this.parent != null && _this.parent.isPaused();
		} else {
			tmp2 = false;
		}
		return tmp + tmp1 + (tmp2 ? " [PAUSED]" : "");
	}
	,getDefaultFrameRate: function() {
		var x = hxd_Timer.wantedFPS;
		return (x > 0 ? x + .5 : x < 0 ? x - .5 : 0) | 0;
	}
	,getComputedTimeMultiplier: function() {
		if(this.ignoreTimeMultipliers) {
			return 1.0;
		} else {
			var y = this.baseTimeMul * (this.parent == null ? 1 : this.parent.getComputedTimeMultiplier());
			if(0 > y) {
				return 0;
			} else {
				return y;
			}
		}
	}
	,isPaused: function() {
		if(this._manuallyPaused) {
			return true;
		} else if(this.parent != null) {
			return this.parent.isPaused();
		} else {
			return false;
		}
	}
	,addChild: function(p) {
		if(p.parent == null) {
			dn_Process.ROOTS.remove(p);
		} else {
			p.parent.children.remove(p);
		}
		p.parent = this;
		var _this = this.children;
		if(_this.nalloc >= _this.values.length) {
			throw haxe_Exception.thrown("FixedArray limit reached (" + _this.values.length + ")");
		}
		_this.values[_this.nalloc] = p;
		_this.nalloc++;
	}
	,__class__: dn_Process
};
var App = function() {
	dn_Process.call(this);
	App.ME = this;
	this.jDoc = $(window.document);
	this.jBody = $("body");
	this.jSite = this.jBody.find("#site");
	this.jSite.append("New test");
	this.jSite.append("New test again!");
	this.notify("test!");
};
App.__name__ = "App";
App.__super__ = dn_Process;
App.prototype = $extend(dn_Process.prototype,{
	onDispose: function() {
		dn_Process.prototype.onDispose.call(this);
		if(App.ME == this) {
			App.ME = null;
		}
	}
	,notify: function(str) {
		this.jBody.find("#notif").remove();
		var jNotif = $("<div id=\"notif\"/>");
		this.jBody.prepend(jNotif);
		jNotif.text(str);
		jNotif.stop(true).hide().slideDown(200).delay(1400).fadeOut(200);
	}
	,__class__: App
});
var hxd_App = function() {
	var _gthis = this;
	var engine = h3d_Engine.CURRENT;
	if(engine != null) {
		this.engine = engine;
		engine.onReady = $bind(this,this.setup);
		haxe_Timer.delay($bind(this,this.setup),0);
	} else {
		hxd_System.start(function() {
			engine = new h3d_Engine();
			_gthis.engine = engine;
			engine.onReady = $bind(_gthis,_gthis.setup);
			engine.init();
		});
	}
};
hxd_App.__name__ = "hxd.App";
hxd_App.staticHandler = function() {
};
hxd_App.prototype = {
	onResize: function() {
	}
	,render: function(e) {
		this.s3d.render(e);
		this.s2d.render(e);
	}
	,setup: function() {
		var _gthis = this;
		var initDone = false;
		this.engine.onReady = hxd_App.staticHandler;
		this.engine.onResized = function() {
			if(_gthis.s2d == null) {
				return;
			}
			_gthis.s2d.checkResize();
			if(initDone) {
				_gthis.onResize();
			}
		};
		this.s3d = new h3d_scene_Scene();
		this.s2d = new h2d_Scene();
		this.sevents = new hxd_SceneEvents();
		this.sevents.addScene(this.s2d);
		this.sevents.addScene(this.s3d);
		this.loadAssets(function() {
			initDone = true;
			_gthis.init();
			hxd_Timer.skip();
			_gthis.mainLoop();
			hxd_System.setLoop($bind(_gthis,_gthis.mainLoop));
			hxd_Key.initialize();
		});
	}
	,loadAssets: function(onLoaded) {
		onLoaded();
	}
	,init: function() {
	}
	,mainLoop: function() {
		hxd_Timer.update();
		this.sevents.checkEvents();
		if(this.isDisposed) {
			return;
		}
		this.update(hxd_Timer.dt);
		if(this.isDisposed) {
			return;
		}
		var dt = hxd_Timer.dt;
		if(this.s2d != null) {
			this.s2d.setElapsedTime(dt);
		}
		if(this.s3d != null) {
			this.s3d.setElapsedTime(dt);
		}
		this.engine.render(this);
	}
	,update: function(dt) {
	}
	,__class__: hxd_App
};
var Boot = function() {
	hxd_App.call(this);
};
Boot.__name__ = "Boot";
Boot.main = function() {
	new Boot();
};
Boot.__super__ = hxd_App;
Boot.prototype = $extend(hxd_App.prototype,{
	init: function() {
		hxd_App.prototype.init.call(this);
		new App();
	}
	,update: function(dt) {
		hxd_App.prototype.update.call(this,dt);
		dn_Process.updateAll(1);
	}
	,__class__: Boot
});
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.__name__ = "EReg";
EReg.prototype = {
	match: function(s) {
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
HxOverrides.__name__ = "HxOverrides";
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
Lambda.__name__ = "Lambda";
Lambda.array = function(it) {
	var a = [];
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		a.push(i1);
	}
	return a;
};
Math.__name__ = "Math";
var Reflect = function() { };
Reflect.__name__ = "Reflect";
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
Reflect.compare = function(a,b) {
	if(a == b) {
		return 0;
	} else if(a > b) {
		return 1;
	} else {
		return -1;
	}
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) {
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		return false;
	}
	if(f1.scope == f2.scope && f1.method == f2.method) {
		return f1.method != null;
	} else {
		return false;
	}
};
Reflect.isEnumValue = function(v) {
	if(v != null) {
		return v.__enum__ != null;
	} else {
		return false;
	}
};
var SiteProcess = function(p) {
	dn_Process.call(this,p == null ? App.ME : p);
};
SiteProcess.__name__ = "SiteProcess";
SiteProcess.__super__ = dn_Process;
SiteProcess.prototype = $extend(dn_Process.prototype,{
	__class__: SiteProcess
});
var Std = function() { };
Std.__name__ = "Std";
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
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = "StringBuf";
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = "StringTools";
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Type = function() { };
Type.__name__ = "Type";
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
Type.createEnumIndex = function(e,index,params) {
	var c;
	var _g = e.__constructs__[index];
	if(_g == null) {
		c = null;
	} else {
		var ctor = _g;
		c = ctor._hx_name;
	}
	if(c == null) {
		throw haxe_Exception.thrown(index + " is not a valid enum constructor index");
	}
	return Type.createEnum(e,c,params);
};
Type.enumEq = function(a,b) {
	if(a == b) {
		return true;
	}
	try {
		var e = a.__enum__;
		if(e == null || e != b.__enum__) {
			return false;
		}
		if(a._hx_index != b._hx_index) {
			return false;
		}
		var enm = $hxEnums[e];
		var params = enm.__constructs__[a._hx_index].__params__;
		var _g = 0;
		while(_g < params.length) {
			var f = params[_g];
			++_g;
			if(!Type.enumEq(a[f],b[f])) {
				return false;
			}
		}
	} catch( _g ) {
		return false;
	}
	return true;
};
Type.enumParameters = function(e) {
	var enm = $hxEnums[e.__enum__];
	var params = enm.__constructs__[e._hx_index].__params__;
	if(params != null) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < params.length) {
			var p = params[_g1];
			++_g1;
			_g.push(e[p]);
		}
		return _g;
	} else {
		return [];
	}
};
var dn_Cooldown = function(fps,maxSize) {
	if(dn_Cooldown.INDEXES == null) {
		if(haxe_rtti_Meta.getType(dn_Cooldown).indexes != null) {
			var _g = [];
			var _g1 = 0;
			var _g2 = haxe_rtti_Meta.getType(dn_Cooldown).indexes;
			while(_g1 < _g2.length) {
				var str = _g2[_g1];
				++_g1;
				_g.push(Std.string(str));
			}
			dn_Cooldown.INDEXES = _g;
		}
	}
	this.baseFps = fps;
	this.changeMaxSizeAndReset(maxSize == null ? dn_Cooldown.DEFAULT_COUNT_LIMIT : maxSize);
};
dn_Cooldown.__name__ = "dn.Cooldown";
dn_Cooldown.prototype = {
	changeMaxSizeAndReset: function(newMaxSize) {
		this.cds = new dn_struct_RecyclablePool(newMaxSize,function() {
			return new dn__$Cooldown_CdInst();
		});
		this.cds.nalloc = 0;
		this.fastCheck = new haxe_ds_IntMap();
	}
	,dispose: function() {
		this.cds.dispose(null);
		this.cds = null;
		this.fastCheck = null;
	}
	,toString: function() {
		return "Cooldowns(" + this.cds.nalloc + "/" + this.cds.size + ")";
	}
	,update: function(tmod) {
		var i = 0;
		var cd;
		var cb = null;
		while(i < this.cds.nalloc) {
			var _this = this.cds;
			cd = i < 0 || i >= _this.nalloc ? null : _this.pool[i];
			cd.frames -= tmod;
			if(cd.frames <= 0) {
				cb = cd.onCompleteOnce;
				var _this1 = this.cds;
				this.fastCheck.remove((i < 0 || i >= _this1.nalloc ? null : _this1.pool[i]).k);
				var _this2 = this.cds;
				if(i >= 0 && i < _this2.nalloc) {
					if(_this2.nalloc > 1) {
						var tmp = _this2.pool[i];
						_this2.pool[i] = _this2.pool[_this2.nalloc - 1];
						_this2.pool[_this2.nalloc - 1] = tmp;
						_this2.nalloc--;
					} else {
						_this2.nalloc = 0;
					}
				}
				if(cb != null) {
					cb();
				}
			} else {
				++i;
			}
		}
	}
	,__class__: dn_Cooldown
};
var dn__$Cooldown_CdInst = function() {
};
dn__$Cooldown_CdInst.__name__ = "dn._Cooldown.CdInst";
dn__$Cooldown_CdInst.prototype = {
	recycle: function() {
		this.onCompleteOnce = null;
	}
	,toString: function() {
		var x = (this.initial == 0 ? 0 : 1 - (this.initial == 0 ? 0 : this.frames / this.initial)) * 100;
		return dn_Cooldown.INDEXES[this.k >>> 22] + "|" + (this.k & 4194303) + (": " + this.frames + "/" + this.initial + " (" + ((x > 0 ? x + .5 : x < 0 ? x - .5 : 0) | 0) + "%)");
	}
	,__class__: dn__$Cooldown_CdInst
};
var dn__$Delayer_Task = function(id,t,cb) {
	this.t = t;
	this.cb = cb;
	this.id = id;
};
dn__$Delayer_Task.__name__ = "dn._Delayer.Task";
dn__$Delayer_Task.prototype = {
	__class__: dn__$Delayer_Task
};
var dn_Delayer = function(fps) {
	this.fps = fps;
	this.delays = [];
};
dn_Delayer.__name__ = "dn.Delayer";
dn_Delayer.prototype = {
	destroy: function() {
		this.delays = null;
	}
	,update: function(dt) {
		var i = 0;
		while(i < this.delays.length) {
			this.delays[i].t -= dt;
			if(this.delays[i].t <= 0) {
				this.delays[i].cb();
				if(this.delays == null || this.delays[i] == null) {
					break;
				}
				this.delays[i].cb = null;
				this.delays.shift();
			} else {
				++i;
			}
		}
	}
	,__class__: dn_Delayer
};
var dn_TType = $hxEnums["dn.TType"] = { __ename__:true,__constructs__:null
	,TLinear: {_hx_name:"TLinear",_hx_index:0,__enum__:"dn.TType",toString:$estr}
	,TLoop: {_hx_name:"TLoop",_hx_index:1,__enum__:"dn.TType",toString:$estr}
	,TLoopEaseIn: {_hx_name:"TLoopEaseIn",_hx_index:2,__enum__:"dn.TType",toString:$estr}
	,TLoopEaseOut: {_hx_name:"TLoopEaseOut",_hx_index:3,__enum__:"dn.TType",toString:$estr}
	,TEase: {_hx_name:"TEase",_hx_index:4,__enum__:"dn.TType",toString:$estr}
	,TEaseIn: {_hx_name:"TEaseIn",_hx_index:5,__enum__:"dn.TType",toString:$estr}
	,TEaseOut: {_hx_name:"TEaseOut",_hx_index:6,__enum__:"dn.TType",toString:$estr}
	,TBurn: {_hx_name:"TBurn",_hx_index:7,__enum__:"dn.TType",toString:$estr}
	,TBurnIn: {_hx_name:"TBurnIn",_hx_index:8,__enum__:"dn.TType",toString:$estr}
	,TBurnOut: {_hx_name:"TBurnOut",_hx_index:9,__enum__:"dn.TType",toString:$estr}
	,TZigZag: {_hx_name:"TZigZag",_hx_index:10,__enum__:"dn.TType",toString:$estr}
	,TRand: {_hx_name:"TRand",_hx_index:11,__enum__:"dn.TType",toString:$estr}
	,TShake: {_hx_name:"TShake",_hx_index:12,__enum__:"dn.TType",toString:$estr}
	,TShakeBoth: {_hx_name:"TShakeBoth",_hx_index:13,__enum__:"dn.TType",toString:$estr}
	,TJump: {_hx_name:"TJump",_hx_index:14,__enum__:"dn.TType",toString:$estr}
	,TElasticEnd: {_hx_name:"TElasticEnd",_hx_index:15,__enum__:"dn.TType",toString:$estr}
	,TBackOut: {_hx_name:"TBackOut",_hx_index:16,__enum__:"dn.TType",toString:$estr}
};
dn_TType.__constructs__ = [dn_TType.TLinear,dn_TType.TLoop,dn_TType.TLoopEaseIn,dn_TType.TLoopEaseOut,dn_TType.TEase,dn_TType.TEaseIn,dn_TType.TEaseOut,dn_TType.TBurn,dn_TType.TBurnIn,dn_TType.TBurnOut,dn_TType.TZigZag,dn_TType.TRand,dn_TType.TShake,dn_TType.TShakeBoth,dn_TType.TJump,dn_TType.TElasticEnd,dn_TType.TBackOut];
dn_TType.__empty_constructs__ = [dn_TType.TLinear,dn_TType.TLoop,dn_TType.TLoopEaseIn,dn_TType.TLoopEaseOut,dn_TType.TEase,dn_TType.TEaseIn,dn_TType.TEaseOut,dn_TType.TBurn,dn_TType.TBurnIn,dn_TType.TBurnOut,dn_TType.TZigZag,dn_TType.TRand,dn_TType.TShake,dn_TType.TShakeBoth,dn_TType.TJump,dn_TType.TElasticEnd,dn_TType.TBackOut];
var dn_Tween = function(tw) {
	this.tw = tw;
	this.paused = false;
	this.done = false;
	this.n = this.ln = 0;
	this.delay = 0;
	this.speed = 1;
	this.set_type(dn_TType.TEase);
	this.plays = 1;
	this.pixelSnap = false;
};
dn_Tween.__name__ = "dn.Tween";
dn_Tween.prototype = {
	set_type: function(t) {
		var _gthis = this;
		this.type = t;
		var tmp;
		switch(this.type._hx_index) {
		case 0:
			tmp = function(step) {
				return step;
			};
			break;
		case 1:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0 + 3 * step * (n1 * n1) * 1.33 + 3 * (step * step) * (1 - step) * 1.33 + step * step * step * 0;
			};
			break;
		case 2:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0 + 3 * step * (n1 * n1) * 0 + 3 * (step * step) * (1 - step) * 2.25 + step * step * step * 0;
			};
			break;
		case 3:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0 + 3 * step * (n1 * n1) * 2.25 + 3 * (step * step) * (1 - step) * 0 + step * step * step * 0;
			};
			break;
		case 4:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0 + 3 * step * (n1 * n1) * 0 + 3 * (step * step) * (1 - step) + step * step * step;
			};
			break;
		case 5:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0 + 3 * step * (n1 * n1) * 0 + 3 * (step * step) * (1 - step) * 0.5 + step * step * step;
			};
			break;
		case 6:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0 + 3 * step * (n1 * n1) * 0.5 + 3 * (step * step) * (1 - step) + step * step * step;
			};
			break;
		case 7:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0 + 3 * step * (n1 * n1) + 3 * (step * step) * (1 - step) * 0 + step * step * step;
			};
			break;
		case 8:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0 + 3 * step * (n1 * n1) + 3 * (step * step) * (1 - step) + step * step * step;
			};
			break;
		case 9:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0 + 3 * step * (n1 * n1) * 0 + 3 * (step * step) * (1 - step) * 0 + step * step * step;
			};
			break;
		case 10:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0 + 3 * step * (n1 * n1) * 2.5 + 3 * (step * step) * (1 - step) * -1.5 + step * step * step;
			};
			break;
		case 11:
			tmp = function(step) {
				return step;
			};
			break;
		case 12:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0.5 + 3 * step * (n1 * n1) * 1.22 + 3 * (step * step) * (1 - step) * 1.25 + step * step * step * 0;
			};
			break;
		case 13:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0.5 + 3 * step * (n1 * n1) * 1.22 + 3 * (step * step) * (1 - step) * 1.25 + step * step * step * 0;
			};
			break;
		case 14:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0 + 3 * step * (n1 * n1) * 2 + 3 * (step * step) * (1 - step) * 2.79 + step * step * step;
			};
			break;
		case 15:
			tmp = function(step) {
				var n = 1 - step;
				var n1 = 1 - step;
				return n * n * n * 0 + 3 * step * (n1 * n1) * 0.7 + 3 * (step * step) * (1 - step) * 1.5 + step * step * step;
			};
			break;
		case 16:
			tmp = function(step) {
				var s = 1.70158;
				step = step / 1 - 1;
				return step * step * ((s + 1) * step + s) + 1;
			};
			break;
		}
		this.interpolate = tmp;
		return this.type;
	}
	,onUpdate: function() {
	}
	,onUpdateT: function(t) {
	}
	,onEnd: function() {
	}
	,onStart: function() {
	}
	,chainedEvent: function() {
	}
	,interpolate: function(v) {
		return v;
	}
	,complete: function(fl_allowLoop) {
		if(fl_allowLoop == null) {
			fl_allowLoop = false;
		}
		var v = this.from + (this.to - this.from) * this.interpolate(1);
		if(this.pixelSnap) {
			v = (v > 0 ? v + .5 : v < 0 ? v - .5 : 0) | 0;
		}
		this.setter(v);
		this.onUpdate();
		this.onUpdateT(1);
		this.onEnd();
		this.chainedEvent();
		if(fl_allowLoop && (this.plays == -1 || this.plays > 1)) {
			if(this.plays != -1) {
				this.plays--;
			}
			this.n = this.ln = 0;
		} else {
			this.done = true;
		}
	}
	,internalUpdate: function(dt) {
		if(this.done) {
			return true;
		}
		if(this.paused) {
			return false;
		}
		if(this.delay > 0) {
			this.delay -= dt;
			return false;
		}
		if(this.onStart != null) {
			var cb = $bind(this,this.onStart);
			this.onStart = null;
			cb();
		}
		var dist = this.to - this.from;
		if(this.type == dn_TType.TRand) {
			this.ln += Std.random(100) < 33 ? this.speed * dt : 0;
		} else {
			this.ln += this.speed * dt;
		}
		this.n = this.interpolate(this.ln);
		if(this.ln < 1) {
			var val;
			if(this.type != dn_TType.TShake && this.type != dn_TType.TShakeBoth) {
				val = this.from + this.n * dist;
			} else if(this.type == dn_TType.TShake) {
				var val1 = this.from;
				var val2 = Math.random();
				var x = this.n * dist;
				val = val1 + val2 * (x < 0 ? -x : x) * (dist > 0 ? 1 : -1);
			} else {
				val = this.from + Math.random() * this.n * dist * (Std.random(2) * 2 - 1);
			}
			if(this.pixelSnap) {
				val = (val > 0 ? val + .5 : val < 0 ? val - .5 : 0) | 0;
			}
			this.setter(val);
			this.onUpdate();
			this.onUpdateT(this.ln);
		} else {
			this.complete(true);
		}
		return this.done;
	}
	,__class__: dn_Tween
};
var dn_Tweenie = function(fps) {
	this.baseFps = fps;
	this.allTweens = new dn_struct_FixedArray(null,512);
};
dn_Tweenie.__name__ = "dn.Tweenie";
dn_Tweenie.prototype = {
	destroy: function() {
		this.allTweens = null;
	}
	,update: function(dt) {
		if(dt == null) {
			dt = 1.0;
		}
		var _g_arr = this.allTweens;
		var _g_i = 0;
		while(_g_i < _g_arr.nalloc) {
			var t = _g_arr.values[_g_i++];
			if(t.internalUpdate(dt)) {
				this.allTweens.remove(t);
			}
		}
	}
	,__class__: dn_Tweenie
};
var dn_struct_RecyclablePool = function(size,valueConstructor) {
	this.nalloc = 0;
	this.size = size;
	var this1 = new Array(size);
	this.pool = this1;
	var _g = 0;
	var _g1 = this.pool.length;
	while(_g < _g1) {
		var i = _g++;
		this.pool[i] = valueConstructor();
	}
};
dn_struct_RecyclablePool.__name__ = "dn.struct.RecyclablePool";
dn_struct_RecyclablePool.prototype = {
	toString: function() {
		return "RecyclablePool(" + this.nalloc + "/" + this.size + ")";
	}
	,dispose: function(elementDisposer) {
		if(elementDisposer != null) {
			var _g = 0;
			var _g1 = this.pool;
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				elementDisposer(e);
			}
		}
		this.nalloc = 0;
		this.pool = null;
	}
	,__class__: dn_struct_RecyclablePool
};
var dn_struct__$RecyclablePool_TestObject = function(id) {
	this.id = id;
};
dn_struct__$RecyclablePool_TestObject.__name__ = "dn.struct._RecyclablePool.TestObject";
dn_struct__$RecyclablePool_TestObject.prototype = {
	toString: function() {
		return "#" + this.id + "=" + Std.string(this.value);
	}
	,recycle: function() {
		this.value = Std.random(999999);
	}
	,__class__: dn_struct__$RecyclablePool_TestObject
};
var h2d_Object = function(parent) {
	this.blendMode = h2d_BlendMode.Alpha;
	this.alpha = 1.;
	this.visible = true;
	this.rotation = 0;
	this.scaleY = 1;
	this.scaleX = 1;
	this.y = 0;
	this.x = 0;
	this.matA = 1;
	this.matB = 0;
	this.matC = 0;
	this.matD = 1;
	this.absX = 0;
	this.absY = 0;
	this.posChanged = parent != null;
	this.children = [];
	if(parent != null) {
		parent.addChild(this);
	}
};
h2d_Object.__name__ = "h2d.Object";
h2d_Object.prototype = {
	getBounds: function(relativeTo,out) {
		if(out == null) {
			out = new h2d_col_Bounds();
		} else {
			out.xMin = 1e20;
			out.yMin = 1e20;
			out.xMax = -1e20;
			out.yMax = -1e20;
		}
		if(relativeTo != null) {
			relativeTo.syncPos();
		}
		if(relativeTo != this) {
			this.syncPos();
		}
		this.getBoundsRec(relativeTo,out,false);
		if(out.xMax <= out.xMin || out.yMax <= out.yMin) {
			this.addBounds(relativeTo,out,-1,-1,2,2);
			out.xMax = out.xMin = (out.xMax + out.xMin) * 0.5;
			out.yMax = out.yMin = (out.yMax + out.yMin) * 0.5;
		}
		return out;
	}
	,getBoundsRec: function(relativeTo,out,forSize) {
		if(this.posChanged) {
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.posChanged = true;
			}
			this.posChanged = false;
		}
		var n = this.children.length;
		if(n == 0) {
			out.xMin = 1e20;
			out.yMin = 1e20;
			out.xMax = -1e20;
			out.yMax = -1e20;
			return;
		}
		if(n == 1) {
			var c = this.children[0];
			if(c.visible) {
				c.getBoundsRec(relativeTo,out,forSize);
			} else {
				out.xMin = 1e20;
				out.yMin = 1e20;
				out.xMax = -1e20;
				out.yMax = -1e20;
			}
			return;
		}
		var xmin = Infinity;
		var ymin = Infinity;
		var xmax = -Infinity;
		var ymax = -Infinity;
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(!c.visible) {
				continue;
			}
			c.getBoundsRec(relativeTo,out,forSize);
			if(out.xMin < xmin) {
				xmin = out.xMin;
			}
			if(out.yMin < ymin) {
				ymin = out.yMin;
			}
			if(out.xMax > xmax) {
				xmax = out.xMax;
			}
			if(out.yMax > ymax) {
				ymax = out.yMax;
			}
		}
		out.xMin = xmin;
		out.yMin = ymin;
		out.xMax = xmax;
		out.yMax = ymax;
	}
	,addBounds: function(relativeTo,out,dx,dy,width,height) {
		if(width <= 0 || height <= 0) {
			return;
		}
		if(relativeTo == null) {
			var x;
			var y;
			var x = dx * this.matA + dy * this.matC + this.absX;
			var y = dx * this.matB + dy * this.matD + this.absY;
			if(x < out.xMin) {
				out.xMin = x;
			}
			if(x > out.xMax) {
				out.xMax = x;
			}
			if(y < out.yMin) {
				out.yMin = y;
			}
			if(y > out.yMax) {
				out.yMax = y;
			}
			var x = (dx + width) * this.matA + dy * this.matC + this.absX;
			var y = (dx + width) * this.matB + dy * this.matD + this.absY;
			if(x < out.xMin) {
				out.xMin = x;
			}
			if(x > out.xMax) {
				out.xMax = x;
			}
			if(y < out.yMin) {
				out.yMin = y;
			}
			if(y > out.yMax) {
				out.yMax = y;
			}
			var x = dx * this.matA + (dy + height) * this.matC + this.absX;
			var y = dx * this.matB + (dy + height) * this.matD + this.absY;
			if(x < out.xMin) {
				out.xMin = x;
			}
			if(x > out.xMax) {
				out.xMax = x;
			}
			if(y < out.yMin) {
				out.yMin = y;
			}
			if(y > out.yMax) {
				out.yMax = y;
			}
			var x = (dx + width) * this.matA + (dy + height) * this.matC + this.absX;
			var y = (dx + width) * this.matB + (dy + height) * this.matD + this.absY;
			if(x < out.xMin) {
				out.xMin = x;
			}
			if(x > out.xMax) {
				out.xMax = x;
			}
			if(y < out.yMin) {
				out.yMin = y;
			}
			if(y > out.yMax) {
				out.yMax = y;
			}
			return;
		}
		if(relativeTo == this) {
			if(out.xMin > dx) {
				out.xMin = dx;
			}
			if(out.yMin > dy) {
				out.yMin = dy;
			}
			if(out.xMax < dx + width) {
				out.xMax = dx + width;
			}
			if(out.yMax < dy + height) {
				out.yMax = dy + height;
			}
			return;
		}
		var r = relativeTo.matA * relativeTo.matD - relativeTo.matB * relativeTo.matC;
		if(r == 0) {
			return;
		}
		var det = 1 / r;
		var rA = relativeTo.matD * det;
		var rB = -relativeTo.matB * det;
		var rC = -relativeTo.matC * det;
		var rD = relativeTo.matA * det;
		var rX = this.absX - relativeTo.absX;
		var rY = this.absY - relativeTo.absY;
		var x = dx * this.matA + dy * this.matC + rX;
		var y = dx * this.matB + dy * this.matD + rY;
		var x1 = x * rA + y * rC;
		var y1 = x * rB + y * rD;
		if(x1 < out.xMin) {
			out.xMin = x1;
		}
		if(x1 > out.xMax) {
			out.xMax = x1;
		}
		if(y1 < out.yMin) {
			out.yMin = y1;
		}
		if(y1 > out.yMax) {
			out.yMax = y1;
		}
		x = (dx + width) * this.matA + dy * this.matC + rX;
		y = (dx + width) * this.matB + dy * this.matD + rY;
		var x1 = x * rA + y * rC;
		var y1 = x * rB + y * rD;
		if(x1 < out.xMin) {
			out.xMin = x1;
		}
		if(x1 > out.xMax) {
			out.xMax = x1;
		}
		if(y1 < out.yMin) {
			out.yMin = y1;
		}
		if(y1 > out.yMax) {
			out.yMax = y1;
		}
		x = dx * this.matA + (dy + height) * this.matC + rX;
		y = dx * this.matB + (dy + height) * this.matD + rY;
		var x1 = x * rA + y * rC;
		var y1 = x * rB + y * rD;
		if(x1 < out.xMin) {
			out.xMin = x1;
		}
		if(x1 > out.xMax) {
			out.xMax = x1;
		}
		if(y1 < out.yMin) {
			out.yMin = y1;
		}
		if(y1 > out.yMax) {
			out.yMax = y1;
		}
		x = (dx + width) * this.matA + (dy + height) * this.matC + rX;
		y = (dx + width) * this.matB + (dy + height) * this.matD + rY;
		var x1 = x * rA + y * rC;
		var y1 = x * rB + y * rD;
		if(x1 < out.xMin) {
			out.xMin = x1;
		}
		if(x1 > out.xMax) {
			out.xMax = x1;
		}
		if(y1 < out.yMin) {
			out.yMin = y1;
		}
		if(y1 > out.yMax) {
			out.yMax = y1;
		}
	}
	,localToGlobal: function(pt) {
		this.syncPos();
		if(pt == null) {
			pt = new h2d_col_Point();
		}
		var px = pt.x * this.matA + pt.y * this.matC + this.absX;
		var py = pt.x * this.matB + pt.y * this.matD + this.absY;
		pt.x = px;
		pt.y = py;
		return pt;
	}
	,globalToLocal: function(pt) {
		this.syncPos();
		pt.x -= this.absX;
		pt.y -= this.absY;
		var invDet = 1 / (this.matA * this.matD - this.matB * this.matC);
		var px = (pt.x * this.matD - pt.y * this.matC) * invDet;
		var py = (-pt.x * this.matB + pt.y * this.matA) * invDet;
		pt.x = px;
		pt.y = py;
		return pt;
	}
	,getScene: function() {
		var p = this;
		while(p.parent != null) p = p.parent;
		if(((p) instanceof h2d_Scene)) {
			return p;
		} else {
			return null;
		}
	}
	,addChild: function(s) {
		this.addChildAt(s,this.children.length);
	}
	,addChildAt: function(s,pos) {
		if(pos < 0) {
			pos = 0;
		}
		if(pos > this.children.length) {
			pos = this.children.length;
		}
		var p = this;
		while(p != null) {
			if(p == s) {
				throw haxe_Exception.thrown("Recursive addChild");
			}
			p = p.parent;
		}
		if(s.parent != null) {
			var old = s.allocated;
			s.allocated = false;
			s.parent.removeChild(s);
			s.allocated = old;
		}
		this.children.splice(pos,0,s);
		if(!this.allocated && s.allocated) {
			s.onRemove();
		}
		s.parent = this;
		s.parentContainer = this.parentContainer;
		s.posChanged = true;
		if(this.allocated) {
			if(!s.allocated) {
				s.onAdd();
			} else {
				s.onHierarchyMoved(true);
			}
		}
		if(this.parentContainer != null) {
			this.parentContainer.contentChanged(this);
		}
	}
	,onHierarchyMoved: function(parentChanged) {
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.onHierarchyMoved(parentChanged);
		}
	}
	,onAdd: function() {
		this.allocated = true;
		if(this.filter != null) {
			this.filter.bind(this);
		}
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.onAdd();
		}
	}
	,onRemove: function() {
		this.allocated = false;
		if(this.filter != null) {
			this.filter.unbind(this);
		}
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.onRemove();
		}
	}
	,removeChild: function(s) {
		if(HxOverrides.remove(this.children,s)) {
			if(s.allocated) {
				s.onRemove();
			}
			s.parent = null;
			if(s.parentContainer != null) {
				s.setParentContainer(null);
			}
			s.posChanged = true;
			if(this.parentContainer != null) {
				this.parentContainer.contentChanged(this);
			}
		}
	}
	,setParentContainer: function(c) {
		this.parentContainer = c;
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			s.setParentContainer(c);
		}
	}
	,draw: function(ctx) {
	}
	,sync: function(ctx) {
		var changed = this.posChanged;
		if(changed) {
			this.calcAbsPos();
			this.posChanged = false;
		}
		this.lastFrame = ctx.frame;
		var p = 0;
		var len = this.children.length;
		while(p < len) {
			var c = this.children[p];
			if(c == null) {
				break;
			}
			if(c.lastFrame != ctx.frame) {
				if(changed) {
					c.posChanged = true;
				}
				c.sync(ctx);
			}
			if(this.children[p] != c) {
				p = 0;
				len = this.children.length;
			} else {
				++p;
			}
		}
	}
	,syncPos: function() {
		if(this.parent != null) {
			this.parent.syncPos();
		}
		if(this.posChanged) {
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.posChanged = true;
			}
			this.posChanged = false;
		}
	}
	,calcAbsPos: function() {
		if(this.parent == null) {
			var cr;
			var sr;
			if(this.rotation == 0) {
				cr = 1.;
				sr = 0.;
				this.matA = this.scaleX;
				this.matB = 0;
				this.matC = 0;
				this.matD = this.scaleY;
			} else {
				cr = Math.cos(this.rotation);
				sr = Math.sin(this.rotation);
				this.matA = this.scaleX * cr;
				this.matB = this.scaleX * sr;
				this.matC = this.scaleY * -sr;
				this.matD = this.scaleY * cr;
			}
			this.absX = this.x;
			this.absY = this.y;
		} else {
			if(this.rotation == 0) {
				this.matA = this.scaleX * this.parent.matA;
				this.matB = this.scaleX * this.parent.matB;
				this.matC = this.scaleY * this.parent.matC;
				this.matD = this.scaleY * this.parent.matD;
			} else {
				var cr = Math.cos(this.rotation);
				var sr = Math.sin(this.rotation);
				var tmpA = this.scaleX * cr;
				var tmpB = this.scaleX * sr;
				var tmpC = this.scaleY * -sr;
				var tmpD = this.scaleY * cr;
				this.matA = tmpA * this.parent.matA + tmpB * this.parent.matC;
				this.matB = tmpA * this.parent.matB + tmpB * this.parent.matD;
				this.matC = tmpC * this.parent.matA + tmpD * this.parent.matC;
				this.matD = tmpC * this.parent.matB + tmpD * this.parent.matD;
			}
			this.absX = this.x * this.parent.matA + this.y * this.parent.matC + this.parent.absX;
			this.absY = this.x * this.parent.matB + this.y * this.parent.matD + this.parent.absY;
		}
	}
	,emitTile: function(ctx,tile) {
		if(h2d_Object.nullDrawable == null) {
			h2d_Object.nullDrawable = new h2d_Drawable(null);
		}
		h2d_Object.nullDrawable.absX = this.absX;
		h2d_Object.nullDrawable.absY = this.absY;
		h2d_Object.nullDrawable.matA = this.matA;
		h2d_Object.nullDrawable.matB = this.matB;
		h2d_Object.nullDrawable.matC = this.matC;
		h2d_Object.nullDrawable.matD = this.matD;
		ctx.drawTile(h2d_Object.nullDrawable,tile);
	}
	,clipBounds: function(ctx,bounds) {
		var view = ctx.tmpBounds;
		var matA;
		var matB;
		var matC;
		var matD;
		var absX;
		var absY;
		if(ctx.inFilter != null) {
			var f1 = ctx.baseShader.filterMatrixA__;
			var f2 = ctx.baseShader.filterMatrixB__;
			var tmpA = this.matA * f1.x + this.matB * f1.y;
			var tmpB = this.matA * f2.x + this.matB * f2.y;
			var tmpC = this.matC * f1.x + this.matD * f1.y;
			var tmpD = this.matC * f2.x + this.matD * f2.y;
			var tmpX = this.absX * f1.x + this.absY * f1.y + f1.z;
			var tmpY = this.absX * f2.x + this.absY * f2.y + f2.z;
			matA = tmpA * ctx.viewA + tmpB * ctx.viewC;
			matB = tmpA * ctx.viewB + tmpB * ctx.viewD;
			matC = tmpC * ctx.viewA + tmpD * ctx.viewC;
			matD = tmpC * ctx.viewB + tmpD * ctx.viewD;
			absX = tmpX * ctx.viewA + tmpY * ctx.viewC + ctx.viewX;
			absY = tmpX * ctx.viewB + tmpY * ctx.viewD + ctx.viewY;
		} else {
			matA = this.matA * ctx.viewA + this.matB * ctx.viewC;
			matB = this.matA * ctx.viewB + this.matB * ctx.viewD;
			matC = this.matC * ctx.viewA + this.matD * ctx.viewC;
			matD = this.matC * ctx.viewB + this.matD * ctx.viewD;
			absX = this.absX * ctx.viewA + this.absY * ctx.viewC + ctx.viewX;
			absY = this.absX * ctx.viewB + this.absY * ctx.viewD + ctx.viewY;
		}
		view.xMin = 1e20;
		view.yMin = 1e20;
		view.xMax = -1e20;
		view.yMax = -1e20;
		var x = bounds.xMin;
		var y = bounds.yMin;
		var x1 = x * matA + y * matC + absX;
		var y1 = x * matB + y * matD + absY;
		if(x1 < view.xMin) {
			view.xMin = x1;
		}
		if(x1 > view.xMax) {
			view.xMax = x1;
		}
		if(y1 < view.yMin) {
			view.yMin = y1;
		}
		if(y1 > view.yMax) {
			view.yMax = y1;
		}
		var x = bounds.xMax;
		var y = bounds.yMin;
		var x1 = x * matA + y * matC + absX;
		var y1 = x * matB + y * matD + absY;
		if(x1 < view.xMin) {
			view.xMin = x1;
		}
		if(x1 > view.xMax) {
			view.xMax = x1;
		}
		if(y1 < view.yMin) {
			view.yMin = y1;
		}
		if(y1 > view.yMax) {
			view.yMax = y1;
		}
		var x = bounds.xMin;
		var y = bounds.yMax;
		var x1 = x * matA + y * matC + absX;
		var y1 = x * matB + y * matD + absY;
		if(x1 < view.xMin) {
			view.xMin = x1;
		}
		if(x1 > view.xMax) {
			view.xMax = x1;
		}
		if(y1 < view.yMin) {
			view.yMin = y1;
		}
		if(y1 > view.yMax) {
			view.yMax = y1;
		}
		var x = bounds.xMax;
		var y = bounds.yMax;
		var x1 = x * matA + y * matC + absX;
		var y1 = x * matB + y * matD + absY;
		if(x1 < view.xMin) {
			view.xMin = x1;
		}
		if(x1 > view.xMax) {
			view.xMax = x1;
		}
		if(y1 < view.yMin) {
			view.yMin = y1;
		}
		if(y1 > view.yMax) {
			view.yMax = y1;
		}
		if(view.xMin < -1) {
			view.xMin = -1;
		}
		if(view.yMin < -1) {
			view.yMin = -1;
		}
		if(view.xMax > 1) {
			view.xMax = 1;
		}
		if(view.yMax > 1) {
			view.yMax = 1;
		}
		var invDet = 1 / (matA * matD - matB * matC);
		var sxMin = view.xMin;
		var syMin = view.yMin;
		var sxMax = view.xMax;
		var syMax = view.yMax;
		view.xMin = 1e20;
		view.yMin = 1e20;
		view.xMax = -1e20;
		view.yMax = -1e20;
		var x = sxMin;
		var y = syMin;
		x -= absX;
		y -= absY;
		var x1 = (x * matD - y * matC) * invDet;
		var y1 = (-x * matB + y * matA) * invDet;
		if(x1 < view.xMin) {
			view.xMin = x1;
		}
		if(x1 > view.xMax) {
			view.xMax = x1;
		}
		if(y1 < view.yMin) {
			view.yMin = y1;
		}
		if(y1 > view.yMax) {
			view.yMax = y1;
		}
		var x = sxMax;
		var y = syMin;
		x -= absX;
		y -= absY;
		var x1 = (x * matD - y * matC) * invDet;
		var y1 = (-x * matB + y * matA) * invDet;
		if(x1 < view.xMin) {
			view.xMin = x1;
		}
		if(x1 > view.xMax) {
			view.xMax = x1;
		}
		if(y1 < view.yMin) {
			view.yMin = y1;
		}
		if(y1 > view.yMax) {
			view.yMax = y1;
		}
		var x = sxMin;
		var y = syMax;
		x -= absX;
		y -= absY;
		var x1 = (x * matD - y * matC) * invDet;
		var y1 = (-x * matB + y * matA) * invDet;
		if(x1 < view.xMin) {
			view.xMin = x1;
		}
		if(x1 > view.xMax) {
			view.xMax = x1;
		}
		if(y1 < view.yMin) {
			view.yMin = y1;
		}
		if(y1 > view.yMax) {
			view.yMax = y1;
		}
		var x = sxMax;
		var y = syMax;
		x -= absX;
		y -= absY;
		var x1 = (x * matD - y * matC) * invDet;
		var y1 = (-x * matB + y * matA) * invDet;
		if(x1 < view.xMin) {
			view.xMin = x1;
		}
		if(x1 > view.xMax) {
			view.xMax = x1;
		}
		if(y1 < view.yMin) {
			view.yMin = y1;
		}
		if(y1 > view.yMax) {
			view.yMax = y1;
		}
		var a = bounds.xMin;
		var b = view.xMin;
		bounds.xMin = a < b ? b : a;
		var a = bounds.yMin;
		var b = view.yMin;
		bounds.yMin = a < b ? b : a;
		var a = bounds.xMax;
		var b = view.xMax;
		bounds.xMax = a > b ? b : a;
		var a = bounds.yMax;
		var b = view.yMax;
		bounds.yMax = a > b ? b : a;
	}
	,drawFilters: function(ctx) {
		if(!ctx.pushFilter(this)) {
			return;
		}
		var bounds = ctx.tmpBounds;
		var total = new h2d_col_Bounds();
		var maxExtent = -1.;
		this.filter.sync(ctx,this);
		if(this.filter.autoBounds) {
			maxExtent = this.filter.boundsExtend;
		} else {
			this.filter.getBounds(this,bounds);
			if(bounds.xMin < total.xMin) {
				total.xMin = bounds.xMin;
			}
			if(bounds.xMax > total.xMax) {
				total.xMax = bounds.xMax;
			}
			if(bounds.yMin < total.yMin) {
				total.yMin = bounds.yMin;
			}
			if(bounds.yMax > total.yMax) {
				total.yMax = bounds.yMax;
			}
		}
		if(maxExtent >= 0) {
			this.getBounds(this,bounds);
			bounds.xMin -= maxExtent;
			bounds.yMin -= maxExtent;
			bounds.xMax += maxExtent;
			bounds.yMax += maxExtent;
			if(bounds.xMin < total.xMin) {
				total.xMin = bounds.xMin;
			}
			if(bounds.xMax > total.xMax) {
				total.xMax = bounds.xMax;
			}
			if(bounds.yMin < total.yMin) {
				total.yMin = bounds.yMin;
			}
			if(bounds.yMax > total.yMax) {
				total.yMax = bounds.yMax;
			}
		}
		this.clipBounds(ctx,total);
		var xMin = Math.floor(total.xMin + 1e-10);
		var yMin = Math.floor(total.yMin + 1e-10);
		var width = Math.ceil(total.xMax - xMin - 1e-10);
		var height = Math.ceil(total.yMax - yMin - 1e-10);
		if(width <= 0 || height <= 0 || total.xMax < total.xMin) {
			ctx.popFilter();
			return;
		}
		var t = ctx.textures.allocTarget("filterTemp",width,height,false);
		ctx.pushTarget(t,xMin,yMin,width,height);
		ctx.engine.clear(0);
		var oldAlpha = ctx.globalAlpha;
		var shader = ctx.baseShader;
		var _this = shader.filterMatrixA__;
		var x = _this.x;
		var y = _this.y;
		var z = _this.z;
		var w = _this.w;
		if(w == null) {
			w = 1.;
		}
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		var oldA_x = x;
		var oldA_y = y;
		var oldA_z = z;
		var oldA_w = w;
		var _this = shader.filterMatrixB__;
		var x = _this.x;
		var y = _this.y;
		var z = _this.z;
		var w = _this.w;
		if(w == null) {
			w = 1.;
		}
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		var oldB_x = x;
		var oldB_y = y;
		var oldB_z = z;
		var oldB_w = w;
		var invDet = 1 / (this.matA * this.matD - this.matB * this.matC);
		var invA = this.matD * invDet;
		var invB = -this.matB * invDet;
		var invC = -this.matC * invDet;
		var invD = this.matA * invDet;
		var invX = -(this.absX * invA + this.absY * invC);
		var invY = -(this.absX * invB + this.absY * invD);
		var _this = shader.filterMatrixA__;
		var x = invA;
		var y = invC;
		var z = invX;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		var _this = shader.filterMatrixB__;
		var x = invB;
		var y = invD;
		var z = invY;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		ctx.globalAlpha = 1;
		this.drawContent(ctx);
		var finalTile = h2d_Tile.fromTexture(t);
		finalTile.dx = xMin;
		finalTile.dy = yMin;
		var prev = finalTile;
		finalTile = this.filter.draw(ctx,finalTile);
		if(finalTile != prev && finalTile != null) {
			finalTile.dx += xMin;
			finalTile.dy += yMin;
		}
		var _this = shader.filterMatrixA__;
		_this.x = oldA_x;
		_this.y = oldA_y;
		_this.z = oldA_z;
		_this.w = oldA_w;
		var _this = shader.filterMatrixB__;
		_this.x = oldB_x;
		_this.y = oldB_y;
		_this.z = oldB_z;
		_this.w = oldB_w;
		ctx.popTarget();
		ctx.popFilter();
		ctx.globalAlpha = oldAlpha;
		if(finalTile == null) {
			return;
		}
		this.drawFiltered(ctx,finalTile);
	}
	,drawFiltered: function(ctx,tile) {
		var oldAlpha = ctx.globalAlpha;
		ctx.currentBlend = null;
		ctx.inFilterBlend = this.blendMode;
		ctx.globalAlpha *= this.alpha;
		this.emitTile(ctx,tile);
		ctx.globalAlpha = oldAlpha;
		ctx.inFilterBlend = null;
		ctx.currentBlend = null;
	}
	,drawRec: function(ctx) {
		if(!this.visible) {
			return;
		}
		if(this.posChanged) {
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.posChanged = true;
			}
			this.posChanged = false;
		}
		if(this.filter != null && this.filter.get_enable()) {
			this.drawFilters(ctx);
		} else {
			var old = ctx.globalAlpha;
			ctx.globalAlpha *= this.alpha;
			this.drawContent(ctx);
			ctx.globalAlpha = old;
		}
	}
	,drawContent: function(ctx) {
		if(ctx.front2back) {
			var i = this.children.length;
			while(i-- > 0) this.children[i].drawRec(ctx);
			this.draw(ctx);
		} else {
			this.draw(ctx);
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.drawRec(ctx);
			}
		}
	}
	,contentChanged: function(s) {
	}
	,__class__: h2d_Object
};
var h2d_Drawable = function(parent) {
	h2d_Object.call(this,parent);
	this.color = new h3d_Vector(1,1,1,1);
};
h2d_Drawable.__name__ = "h2d.Drawable";
h2d_Drawable.__super__ = h2d_Object;
h2d_Drawable.prototype = $extend(h2d_Object.prototype,{
	drawFiltered: function(ctx,tile) {
		var old = this.shaders;
		this.shaders = null;
		h2d_Object.prototype.drawFiltered.call(this,ctx,tile);
		this.shaders = old;
	}
	,emitTile: function(ctx,tile) {
		if(tile == null) {
			tile = new h2d_Tile(null,0,0,5,5);
		}
		if(!ctx.drawTile(this,tile)) {
			return;
		}
	}
	,__class__: h2d_Drawable
});
var h2d_BlendMode = $hxEnums["h2d.BlendMode"] = { __ename__:true,__constructs__:null
	,None: {_hx_name:"None",_hx_index:0,__enum__:"h2d.BlendMode",toString:$estr}
	,Alpha: {_hx_name:"Alpha",_hx_index:1,__enum__:"h2d.BlendMode",toString:$estr}
	,Add: {_hx_name:"Add",_hx_index:2,__enum__:"h2d.BlendMode",toString:$estr}
	,AlphaAdd: {_hx_name:"AlphaAdd",_hx_index:3,__enum__:"h2d.BlendMode",toString:$estr}
	,SoftAdd: {_hx_name:"SoftAdd",_hx_index:4,__enum__:"h2d.BlendMode",toString:$estr}
	,Multiply: {_hx_name:"Multiply",_hx_index:5,__enum__:"h2d.BlendMode",toString:$estr}
	,AlphaMultiply: {_hx_name:"AlphaMultiply",_hx_index:6,__enum__:"h2d.BlendMode",toString:$estr}
	,Erase: {_hx_name:"Erase",_hx_index:7,__enum__:"h2d.BlendMode",toString:$estr}
	,Screen: {_hx_name:"Screen",_hx_index:8,__enum__:"h2d.BlendMode",toString:$estr}
	,Sub: {_hx_name:"Sub",_hx_index:9,__enum__:"h2d.BlendMode",toString:$estr}
	,Max: {_hx_name:"Max",_hx_index:10,__enum__:"h2d.BlendMode",toString:$estr}
	,Min: {_hx_name:"Min",_hx_index:11,__enum__:"h2d.BlendMode",toString:$estr}
};
h2d_BlendMode.__constructs__ = [h2d_BlendMode.None,h2d_BlendMode.Alpha,h2d_BlendMode.Add,h2d_BlendMode.AlphaAdd,h2d_BlendMode.SoftAdd,h2d_BlendMode.Multiply,h2d_BlendMode.AlphaMultiply,h2d_BlendMode.Erase,h2d_BlendMode.Screen,h2d_BlendMode.Sub,h2d_BlendMode.Max,h2d_BlendMode.Min];
h2d_BlendMode.__empty_constructs__ = [h2d_BlendMode.None,h2d_BlendMode.Alpha,h2d_BlendMode.Add,h2d_BlendMode.AlphaAdd,h2d_BlendMode.SoftAdd,h2d_BlendMode.Multiply,h2d_BlendMode.AlphaMultiply,h2d_BlendMode.Erase,h2d_BlendMode.Screen,h2d_BlendMode.Sub,h2d_BlendMode.Max,h2d_BlendMode.Min];
var h2d_Camera = function(scene) {
	this.followRotation = false;
	this.posChanged = true;
	this.x = 0;
	this.posChanged = true;
	this.y = 0;
	this.posChanged = true;
	this.scaleX = 1;
	this.posChanged = true;
	this.scaleY = 1;
	this.posChanged = true;
	this.rotation = 0;
	this.posChanged = true;
	this.anchorX = 0;
	this.posChanged = true;
	this.anchorY = 0;
	this.viewX = 0;
	this.viewY = 0;
	this.viewW = 1;
	this.viewH = 1;
	this.visible = true;
	if(scene != null) {
		scene.addCamera(this);
	}
};
h2d_Camera.__name__ = "h2d.Camera";
h2d_Camera.prototype = {
	layerVisible: function(layer) {
		return true;
	}
	,enter: function(ctx) {
		ctx.pushCamera(this);
		if(this.clipViewport) {
			var old = ctx.inFilter;
			ctx.inFilter = null;
			ctx.pushRenderZone(this.viewX * this.scene.width,this.viewY * this.scene.height,this.viewW * this.scene.width,this.viewH * this.scene.height);
			ctx.inFilter = old;
		}
	}
	,exit: function(ctx) {
		if(this.clipViewport) {
			var old = ctx.inFilter;
			ctx.inFilter = null;
			ctx.popRenderZone();
			ctx.inFilter = old;
		}
		ctx.popCamera();
	}
	,sync: function(ctx,force) {
		if(force == null) {
			force = false;
		}
		if(this.scene == null) {
			return;
		}
		if(this.follow != null) {
			this.posChanged = true;
			this.x = this.follow.absX;
			this.posChanged = true;
			this.y = this.follow.absY;
			if(this.followRotation) {
				this.posChanged = true;
				this.rotation = -this.follow.rotation;
			}
		}
		if(this.posChanged || force) {
			if(this.rotation == 0) {
				this.matA = this.scaleX;
				this.matB = 0;
				this.matC = 0;
				this.matD = this.scaleY;
			} else {
				var cr = Math.cos(this.rotation);
				var sr = Math.sin(this.rotation);
				this.matA = this.scaleX * cr;
				this.matB = this.scaleX * sr;
				this.matC = this.scaleY * -sr;
				this.matD = this.scaleY * cr;
			}
			this.absX = Math.round(-(this.x * this.matA + this.y * this.matC) + this.scene.width * this.anchorX * this.viewW + this.scene.width * this.viewX);
			this.absY = Math.round(-(this.x * this.matB + this.y * this.matD) + this.scene.height * this.anchorY * this.viewH + this.scene.height * this.viewY);
			this.invDet = 1 / (this.matA * this.matD - this.matB * this.matC);
			this.posChanged = false;
		}
	}
	,eventToCamera: function(e) {
		var x = (e.relX - this.scene.offsetX) / this.scene.viewportScaleX - this.absX;
		var y = (e.relY - this.scene.offsetY) / this.scene.viewportScaleY - this.absY;
		e.relX = (x * this.matD - y * this.matC) * this.invDet;
		e.relY = (-x * this.matB + y * this.matA) * this.invDet;
	}
	,__class__: h2d_Camera
};
var h3d_prim_Primitive = function() {
	this.refCount = 0;
};
h3d_prim_Primitive.__name__ = "h3d.prim.Primitive";
h3d_prim_Primitive.prototype = {
	getBounds: function() {
		throw haxe_Exception.thrown("not implemented for " + Std.string(this));
	}
	,incref: function() {
		this.refCount++;
	}
	,decref: function() {
		this.refCount--;
		if(this.refCount <= 0) {
			this.refCount = 0;
			this.dispose();
		}
	}
	,alloc: function(engine) {
		throw haxe_Exception.thrown("not implemented");
	}
	,render: function(engine) {
		var tmp;
		if(this.buffer != null) {
			var _this = this.buffer;
			tmp = _this.buffer == null || _this.buffer.vbuf == null;
		} else {
			tmp = true;
		}
		if(tmp) {
			this.alloc(engine);
		}
		if(this.indexes == null) {
			if((this.buffer.flags & 1 << h3d_BufferFlag.Quads._hx_index) != 0) {
				engine.renderBuffer(this.buffer,engine.mem.quadIndexes,2,0,-1);
			} else {
				engine.renderBuffer(this.buffer,engine.mem.triIndexes,3,0,-1);
			}
		} else {
			engine.renderIndexed(this.buffer,this.indexes);
		}
	}
	,dispose: function() {
		if(this.buffer != null) {
			this.buffer.dispose();
			this.buffer = null;
		}
		if(this.indexes != null) {
			this.indexes.dispose();
			this.indexes = null;
		}
	}
	,toString: function() {
		var c = js_Boot.getClass(this);
		return c.__name__.split(".").pop();
	}
	,__class__: h3d_prim_Primitive
};
var h2d_Interactive = function(width,height,parent,shape) {
	this.shapeY = 0;
	this.shapeX = 0;
	this.mouseDownButton = -1;
	this.enableRightButton = false;
	this.propagateEvents = false;
	this.cancelEvents = false;
	this.cursor = hxd_Cursor.Button;
	h2d_Drawable.call(this,parent);
	this.width = width;
	this.height = height;
	this.shape = shape;
};
h2d_Interactive.__name__ = "h2d.Interactive";
h2d_Interactive.__super__ = h2d_Drawable;
h2d_Interactive.prototype = $extend(h2d_Drawable.prototype,{
	onAdd: function() {
		this.scene = this.getScene();
		if(this.scene != null) {
			this.scene.addEventTarget(this);
		}
		this.updateMask();
		h2d_Drawable.prototype.onAdd.call(this);
	}
	,draw: function(ctx) {
		if(this.backgroundColor != null) {
			this.emitTile(ctx,h2d_Tile.fromColor(this.backgroundColor,this.width | 0,this.height | 0,(this.backgroundColor >>> 24) / 255));
		}
	}
	,getBoundsRec: function(relativeTo,out,forSize) {
		h2d_Drawable.prototype.getBoundsRec.call(this,relativeTo,out,forSize);
		if(this.backgroundColor != null || forSize) {
			this.addBounds(relativeTo,out,0,0,this.width | 0,this.height | 0);
		}
	}
	,onHierarchyMoved: function(parentChanged) {
		h2d_Drawable.prototype.onHierarchyMoved.call(this,parentChanged);
		if(this.scene != null) {
			this.scene.removeEventTarget(this);
			this.scene = this.getScene();
			if(this.scene != null) {
				this.scene.addEventTarget(this);
			}
		}
		if(parentChanged) {
			this.updateMask();
		}
	}
	,updateMask: function() {
		this.parentMask = null;
		var p = this.parent;
		while(p != null) {
			var m = ((p) instanceof h2d_Mask) ? p : null;
			if(m != null) {
				this.parentMask = m;
				break;
			}
			p = p.parent;
		}
	}
	,onRemove: function() {
		if(this.scene != null) {
			this.scene.removeEventTarget(this,true);
			this.scene = null;
		}
		h2d_Drawable.prototype.onRemove.call(this);
	}
	,checkBounds: function(e) {
		switch(e.kind._hx_index) {
		case 4:case 6:case 7:case 10:
			return false;
		default:
			return true;
		}
	}
	,getInteractiveScene: function() {
		return this.scene;
	}
	,handleEvent: function(e) {
		if(this.parentMask != null && this.checkBounds(e)) {
			var p = this.parentMask;
			var pt = new h2d_col_Point(e.relX,e.relY);
			this.localToGlobal(pt);
			var saveX = pt.x;
			var saveY = pt.y;
			while(p != null) {
				pt.x = saveX;
				pt.y = saveY;
				var pt1 = p.globalToLocal(pt);
				if(pt1.x < 0 || pt1.y < 0 || pt1.x > p.width || pt1.y > p.height) {
					e.cancel = true;
					return;
				}
				p = p.parentMask;
			}
		}
		if(this.shape == null && this.isEllipse && this.checkBounds(e)) {
			var cx = this.width * 0.5;
			var cy = this.height * 0.5;
			var dx = (e.relX - cx) / cx;
			var dy = (e.relY - cy) / cy;
			if(dx * dx + dy * dy > 1) {
				e.cancel = true;
				return;
			}
		}
		if(this.propagateEvents) {
			e.propagate = true;
		}
		if(this.cancelEvents) {
			e.cancel = true;
		}
		switch(e.kind._hx_index) {
		case 0:
			if(this.enableRightButton || e.button == 0) {
				this.mouseDownButton = e.button;
				this.onPush(e);
				if(e.cancel) {
					this.mouseDownButton = -1;
				}
			}
			break;
		case 1:
			if(this.enableRightButton || e.button == 0) {
				this.onRelease(e);
				if(this.mouseDownButton == e.button) {
					this.onClick(e);
				}
			}
			this.mouseDownButton = -1;
			break;
		case 2:
			this.onMove(e);
			break;
		case 3:
			this.onOver(e);
			break;
		case 4:
			this.onOut(e);
			break;
		case 5:
			this.onWheel(e);
			break;
		case 6:
			this.onFocus(e);
			break;
		case 7:
			this.onFocusLost(e);
			break;
		case 8:
			this.onKeyDown(e);
			break;
		case 9:
			this.onKeyUp(e);
			break;
		case 10:
			if(this.enableRightButton || e.button == 0) {
				this.onRelease(e);
				if(this.mouseDownButton == e.button) {
					this.onReleaseOutside(e);
				}
			}
			this.mouseDownButton = -1;
			break;
		case 11:
			this.onTextInput(e);
			break;
		case 12:
			this.onCheck(e);
			break;
		}
	}
	,calcAbsPos: function() {
		h2d_Drawable.prototype.calcAbsPos.call(this);
		this.invDet = 1 / (this.matA * this.matD - this.matB * this.matC);
	}
	,onOver: function(e) {
	}
	,onOut: function(e) {
	}
	,onPush: function(e) {
	}
	,onRelease: function(e) {
	}
	,onReleaseOutside: function(e) {
	}
	,onClick: function(e) {
	}
	,onMove: function(e) {
	}
	,onWheel: function(e) {
	}
	,onFocus: function(e) {
	}
	,onFocusLost: function(e) {
	}
	,onKeyUp: function(e) {
	}
	,onKeyDown: function(e) {
	}
	,onCheck: function(e) {
	}
	,onTextInput: function(e) {
	}
	,__class__: h2d_Interactive
});
var h2d_Layers = function(parent) {
	h2d_Object.call(this,parent);
	this.layersIndexes = [];
	this.layerCount = 0;
};
h2d_Layers.__name__ = "h2d.Layers";
h2d_Layers.__super__ = h2d_Object;
h2d_Layers.prototype = $extend(h2d_Object.prototype,{
	addChild: function(s) {
		this.addChildAt(s,0);
	}
	,addChildAt: function(s,layer) {
		if(s.parent == this) {
			var old = s.allocated;
			s.allocated = false;
			this.removeChild(s);
			s.allocated = old;
		}
		while(layer >= this.layerCount) this.layersIndexes[this.layerCount++] = this.children.length;
		h2d_Object.prototype.addChildAt.call(this,s,this.layersIndexes[layer]);
		var _g = layer;
		var _g1 = this.layerCount;
		while(_g < _g1) {
			var i = _g++;
			this.layersIndexes[i]++;
		}
	}
	,removeChild: function(s) {
		var _g = 0;
		var _g1 = this.children.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.children[i] == s) {
				this.children.splice(i,1);
				if(s.allocated) {
					s.onRemove();
				}
				s.parent = null;
				s.posChanged = true;
				if(s.parentContainer != null) {
					s.setParentContainer(null);
				}
				var k = this.layerCount - 1;
				while(k >= 0 && this.layersIndexes[k] > i) {
					this.layersIndexes[k]--;
					--k;
				}
				if(this.parentContainer != null) {
					this.parentContainer.contentChanged(this);
				}
				break;
			}
		}
	}
	,__class__: h2d_Layers
});
var h2d_Mask = function(width,height,parent) {
	this.scrollY = 0;
	this.scrollX = 0;
	h2d_Object.call(this,parent);
	this.width = width;
	this.height = height;
};
h2d_Mask.__name__ = "h2d.Mask";
h2d_Mask.maskWith = function(ctx,object,width,height,scrollX,scrollY) {
	if(scrollY == null) {
		scrollY = 0;
	}
	if(scrollX == null) {
		scrollX = 0;
	}
	var x1 = object.absX + scrollX;
	var y1 = object.absY + scrollY;
	var x2 = width * object.matA + height * object.matC + x1;
	var y2 = width * object.matB + height * object.matD + y1;
	var tmp;
	if(x1 > x2) {
		tmp = x1;
		x1 = x2;
		x2 = tmp;
	}
	if(y1 > y2) {
		tmp = y1;
		y1 = y2;
		y2 = tmp;
	}
	ctx.pushRenderZone(x1,y1,x2 - x1,y2 - y1);
};
h2d_Mask.unmask = function(ctx) {
	ctx.popRenderZone();
};
h2d_Mask.__super__ = h2d_Object;
h2d_Mask.prototype = $extend(h2d_Object.prototype,{
	onHierarchyMoved: function(parentChanged) {
		h2d_Object.prototype.onHierarchyMoved.call(this,parentChanged);
		if(parentChanged) {
			this.updateMask();
		}
	}
	,onAdd: function() {
		h2d_Object.prototype.onAdd.call(this);
		this.updateMask();
	}
	,updateMask: function() {
		this.parentMask = null;
		var p = this.parent;
		while(p != null) {
			var m = ((p) instanceof h2d_Mask) ? p : null;
			if(m != null) {
				this.parentMask = m;
				break;
			}
			p = p.parent;
		}
	}
	,calcAbsPos: function() {
		h2d_Object.prototype.calcAbsPos.call(this);
		this.absX -= this.scrollX;
		this.absY -= this.scrollY;
	}
	,getBoundsRec: function(relativeTo,out,forSize) {
		var xMin = out.xMin;
		var yMin = out.yMin;
		var xMax = out.xMax;
		var yMax = out.yMax;
		out.xMin = 1e20;
		out.yMin = 1e20;
		out.xMax = -1e20;
		out.yMax = -1e20;
		if(this.posChanged) {
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.posChanged = true;
			}
			this.posChanged = false;
		}
		this.addBounds(relativeTo,out,this.scrollX,this.scrollY,this.width,this.height);
		var bxMin = out.xMin;
		var byMin = out.yMin;
		var bxMax = out.xMax;
		var byMax = out.yMax;
		out.xMin = xMin;
		out.xMax = xMax;
		out.yMin = yMin;
		out.yMax = yMax;
		h2d_Object.prototype.getBoundsRec.call(this,relativeTo,out,forSize);
		if(out.xMin < bxMin) {
			out.xMin = xMin > bxMin ? bxMin : xMin;
		}
		if(out.yMin < byMin) {
			out.yMin = yMin > byMin ? byMin : yMin;
		}
		if(out.xMax > bxMax) {
			out.xMax = xMax < bxMax ? bxMax : xMax;
		}
		if(out.yMax > byMax) {
			out.yMax = yMax < byMax ? byMax : yMax;
		}
	}
	,drawRec: function(ctx) {
		h2d_Mask.maskWith(ctx,this,this.width,this.height,this.scrollX,this.scrollY);
		h2d_Object.prototype.drawRec.call(this,ctx);
		h2d_Mask.unmask(ctx);
	}
	,__class__: h2d_Mask
});
var h3d_impl_RenderContext = function() {
	this.engine = h3d_Engine.CURRENT;
	this.frame = 0;
	this.time = 0.;
	this.elapsedTime = 1. / hxd_System.getDefaultFrameRate();
	this.textures = new h3d_impl_TextureCache(this);
};
h3d_impl_RenderContext.__name__ = "h3d.impl.RenderContext";
h3d_impl_RenderContext.prototype = {
	__class__: h3d_impl_RenderContext
};
var h2d_RenderContext = function(scene) {
	this.renderZoneIndex = 0;
	this.renderZoneStack = [];
	this.tmpBounds = new h2d_col_Bounds();
	this.defaultSmooth = false;
	this.globalAlpha = 1.;
	h3d_impl_RenderContext.call(this);
	this.scene = scene;
	this.bufPos = 0;
	this.manager = new h3d_pass_ShaderManager();
	this.pass = new h3d_mat_Pass("",null);
	this.pass.depth(true,h3d_mat_Compare.Always);
	this.pass.set_culling(h3d_mat_Face.None);
	this.baseShader = new h3d_shader_Base2d();
	this.baseShader.setPriority(100);
	this.baseShader.zValue__ = 0.;
	this.baseShaderList = new hxsl_ShaderList(this.baseShader);
	this.targetsStack = [];
	this.targetsStackIndex = 0;
	this.cameraStack = [];
	this.cameraStackIndex = 0;
	this.filterStack = [];
};
h2d_RenderContext.__name__ = "h2d.RenderContext";
h2d_RenderContext.__super__ = h3d_impl_RenderContext;
h2d_RenderContext.prototype = $extend(h3d_impl_RenderContext.prototype,{
	begin: function() {
		this.texture = null;
		this.currentObj = null;
		this.bufPos = 0;
		this.stride = 0;
		this.viewA = this.scene.viewportA;
		this.viewB = 0;
		this.viewC = 0;
		this.viewD = this.scene.viewportD;
		this.viewX = this.scene.viewportX;
		this.viewY = this.scene.viewportY;
		this.targetFlipY = this.engine.driver.hasFeature(h3d_impl_Feature.BottomLeftCoords) ? -1 : 1;
		this.baseFlipY = this.engine.getCurrentTarget() != null ? this.targetFlipY : 1;
		this.inFilter = null;
		this.manager.globals.set("time",this.time);
		this.manager.globals.set("global.time",this.time);
		var _this = this.baseShader;
		_this.constModified = true;
		_this.pixelAlign__ = false;
		var _this = this.baseShader.halfPixelInverse__;
		var x = 0.5 / this.engine.width;
		var y = 0.5 / this.engine.height;
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = 0.;
		_this.w = 1.;
		var _this = this.baseShader.viewportA__;
		var x = this.scene.viewportA;
		var y = 0;
		var z = this.scene.viewportX;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		var _this = this.baseShader.viewportB__;
		var x = 0;
		var y = this.scene.viewportD * -this.baseFlipY;
		var z = this.scene.viewportY * -this.baseFlipY;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		var _this = this.baseShader.filterMatrixA__;
		var x = 1;
		var y = 0;
		var z = 0;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		var _this = this.baseShader.filterMatrixB__;
		var x = 0;
		var y = 1;
		var z = 0;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		this.baseShaderList.next = null;
		this.initShaders(this.baseShaderList);
		this.engine.selectMaterial(this.pass);
		this.textures.begin();
	}
	,initShaders: function(shaders) {
		this.currentShaders = shaders;
		this.compiledShader = this.manager.compileShaders(shaders);
		if(this.buffers == null) {
			this.buffers = new h3d_shader_Buffers(this.compiledShader);
		} else {
			var _this = this.buffers;
			var s = this.compiledShader;
			_this.vertex.grow(s.vertex);
			_this.fragment.grow(s.fragment);
		}
		this.manager.fillGlobals(this.buffers,this.compiledShader);
		this.engine.selectShader(this.compiledShader);
		this.engine.uploadShaderBuffers(this.buffers,0);
	}
	,end: function() {
		this.texture = null;
		this.currentObj = null;
		this.baseShaderList.next = null;
		if(this.targetsStackIndex != 0) {
			throw haxe_Exception.thrown("Missing popTarget()");
		}
		if(this.cameraStackIndex != 0) {
			throw haxe_Exception.thrown("Missing popCamera()");
		}
	}
	,pushCamera: function(cam) {
		var entry = this.cameraStack[this.cameraStackIndex++];
		if(entry == null) {
			entry = { va : 0, vb : 0, vc : 0, vd : 0, vx : 0, vy : 0};
			this.cameraStack.push(entry);
		}
		var tmpA = this.viewA;
		var tmpB = this.viewB;
		var tmpC = this.viewC;
		var tmpD = this.viewD;
		entry.va = tmpA;
		entry.vb = tmpB;
		entry.vc = tmpC;
		entry.vd = tmpD;
		entry.vx = this.viewX;
		entry.vy = this.viewY;
		this.viewA = cam.matA * tmpA + cam.matB * tmpC;
		this.viewB = cam.matA * tmpB + cam.matB * tmpD;
		this.viewC = cam.matC * tmpA + cam.matD * tmpC;
		this.viewD = cam.matC * tmpB + cam.matD * tmpD;
		this.viewX = cam.absX * tmpA + cam.absY * tmpC + this.viewX;
		this.viewY = cam.absX * tmpB + cam.absY * tmpD + this.viewY;
		var flipY = this.curTarget != null ? -this.targetFlipY : -this.baseFlipY;
		var _this = this.baseShader.viewportA__;
		var x = this.viewA;
		var y = this.viewC;
		var z = this.viewX;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		var _this = this.baseShader.viewportB__;
		var x = this.viewB * flipY;
		var y = this.viewD * flipY;
		var z = this.viewY * flipY;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
	}
	,popCamera: function() {
		if(this.cameraStackIndex == 0) {
			throw haxe_Exception.thrown("Too many popCamera()");
		}
		var inf = this.cameraStack[--this.cameraStackIndex];
		this.viewA = inf.va;
		this.viewB = inf.vb;
		this.viewC = inf.vc;
		this.viewD = inf.vd;
		this.viewX = inf.vx;
		this.viewY = inf.vy;
		var flipY = this.curTarget != null ? -this.targetFlipY : -this.baseFlipY;
		var _this = this.baseShader.viewportA__;
		var x = this.viewA;
		var y = this.viewC;
		var z = this.viewX;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		var _this = this.baseShader.viewportB__;
		var x = this.viewB * flipY;
		var y = this.viewD * flipY;
		var z = this.viewY * flipY;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
	}
	,pushFilter: function(spr) {
		if(this.filterStack.length == 0 && this.onEnterFilter != null) {
			if(!this.onEnterFilter(spr)) {
				return false;
			}
		}
		this.filterStack.push(spr);
		this.inFilter = spr;
		return true;
	}
	,popFilter: function() {
		var spr = this.filterStack.pop();
		if(this.filterStack.length > 0) {
			this.inFilter = this.filterStack[this.filterStack.length - 1];
		} else {
			this.inFilter = null;
			if(this.onLeaveFilter != null) {
				this.onLeaveFilter(spr);
			}
		}
	}
	,pushTarget: function(t,startX,startY,width,height) {
		if(height == null) {
			height = -1;
		}
		if(width == null) {
			width = -1;
		}
		if(startY == null) {
			startY = 0;
		}
		if(startX == null) {
			startX = 0;
		}
		this.engine.pushTarget(t);
		this.initShaders(this.baseShaderList);
		var entry = this.targetsStack[this.targetsStackIndex++];
		if(entry == null) {
			entry = { t : null, va : 0, vb : 0, vc : 0, vd : 0, vx : 0, vy : 0, hasRZ : false, rzX : 0, rzY : 0, rzW : 0, rzH : 0};
			this.targetsStack.push(entry);
		}
		entry.t = this.curTarget;
		entry.va = this.viewA;
		entry.vb = this.viewB;
		entry.vc = this.viewC;
		entry.vd = this.viewD;
		entry.vx = this.viewX;
		entry.vy = this.viewY;
		entry.hasRZ = this.hasRenderZone;
		entry.rzX = this.renderX;
		entry.rzY = this.renderY;
		entry.rzW = this.renderW;
		entry.rzH = this.renderH;
		if(width < 0) {
			width = t == null ? this.scene.width : t.width;
		}
		if(height < 0) {
			height = t == null ? this.scene.height : t.height;
		}
		this.viewA = 2 / width;
		this.viewB = 0;
		this.viewC = 0;
		this.viewD = 2 / height;
		this.viewX = -1 - startX * this.viewA;
		this.viewY = -1 - startY * this.viewD;
		var _this = this.baseShader.halfPixelInverse__;
		var x = 0.5 / (t == null ? this.engine.width : t.width);
		var y = 0.5 / (t == null ? this.engine.height : t.height);
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = 0.;
		_this.w = 1.;
		var _this = this.baseShader.viewportA__;
		var x = this.viewA;
		var y = this.viewC;
		var z = this.viewX;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		var _this = this.baseShader.viewportB__;
		var x = this.viewB * -this.targetFlipY;
		var y = this.viewD * -this.targetFlipY;
		var z = this.viewY * -this.targetFlipY;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		this.curTarget = t;
		this.currentBlend = null;
		if(this.hasRenderZone) {
			this.hasRenderZone = false;
			this.engine.setRenderZone();
		}
	}
	,popTarget: function() {
		if(this.targetsStackIndex <= 0) {
			throw haxe_Exception.thrown("Too many popTarget()");
		}
		this.engine.popTarget();
		var tinf = this.targetsStack[--this.targetsStackIndex];
		var t = this.curTarget = tinf.t;
		this.viewA = tinf.va;
		this.viewB = tinf.vb;
		this.viewC = tinf.vc;
		this.viewD = tinf.vd;
		this.viewX = tinf.vx;
		this.viewY = tinf.vy;
		var flipY = t == null ? -this.baseFlipY : -this.targetFlipY;
		this.initShaders(this.baseShaderList);
		var _this = this.baseShader.halfPixelInverse__;
		var x = 0.5 / (t == null ? this.engine.width : t.width);
		var y = 0.5 / (t == null ? this.engine.height : t.height);
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = 0.;
		_this.w = 1.;
		var _this = this.baseShader.viewportA__;
		var x = this.viewA;
		var y = this.viewC;
		var z = this.viewX;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		var _this = this.baseShader.viewportB__;
		var x = this.viewB * flipY;
		var y = this.viewD * flipY;
		var z = this.viewY * flipY;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		if(tinf.hasRZ) {
			this.setRZ(tinf.rzX,tinf.rzY,tinf.rzW,tinf.rzH);
		}
	}
	,pushRenderZone: function(x,y,w,h) {
		var inf = this.renderZoneStack[this.renderZoneIndex++];
		if(inf == null) {
			inf = { hasRZ : this.hasRenderZone, x : this.renderX, y : this.renderY, w : this.renderW, h : this.renderH};
			this.renderZoneStack[this.renderZoneIndex - 1] = inf;
		} else if(this.hasRenderZone) {
			inf.hasRZ = true;
			inf.x = this.renderX;
			inf.y = this.renderY;
			inf.w = this.renderW;
			inf.h = this.renderH;
		} else {
			inf.hasRZ = false;
		}
		this.setRZ(x,y,w,h);
	}
	,popRenderZone: function() {
		if(this.renderZoneIndex == 0) {
			throw haxe_Exception.thrown("Too many popRenderZone()");
		}
		var inf = this.renderZoneStack[--this.renderZoneIndex];
		if(inf.hasRZ) {
			this.setRZ(inf.x,inf.y,inf.w,inf.h);
		} else {
			this.hasRenderZone = false;
			this.engine.setRenderZone();
		}
	}
	,setRZ: function(x,y,w,h) {
		this.hasRenderZone = true;
		this.renderX = x;
		this.renderY = y;
		this.renderW = w;
		this.renderH = h;
		var scaleX = this.scene.viewportA * this.engine.width / 2;
		var scaleY = this.scene.viewportD * this.engine.height / 2;
		if(this.inFilter != null) {
			var fa = this.baseShader.filterMatrixA__;
			var fb = this.baseShader.filterMatrixB__;
			var x2 = x + w;
			var y2 = y + h;
			var rx1 = x * fa.x + y * fa.y + fa.z;
			var ry1 = x * fb.x + y * fb.y + fb.z;
			var rx2 = x2 * fa.x + y2 * fa.y + fa.z;
			var ry2 = x2 * fb.x + y2 * fb.y + fb.z;
			x = rx1;
			y = ry1;
			w = rx2 - rx1;
			h = ry2 - ry1;
		}
		this.engine.setRenderZone(x * scaleX + (this.scene.viewportX + 1) * (this.engine.width / 2) + 1e-10 | 0,y * scaleY + (this.scene.viewportY + 1) * (this.engine.height / 2) + 1e-10 | 0,w * scaleX + 1e-10 | 0,h * scaleY + 1e-10 | 0);
	}
	,drawScene: function() {
		this.scene.drawRec(this);
	}
	,beforeDraw: function() {
		if(this.texture == null) {
			this.texture = h3d_mat_Texture.fromColor(16711935);
		}
		this.baseShader.texture__ = this.texture;
		this.texture.set_filter((this.currentObj.smooth == null ? this.defaultSmooth : this.currentObj.smooth) ? h3d_mat_Filter.Linear : h3d_mat_Filter.Nearest);
		this.texture.set_wrap(this.currentObj.tileWrap && (this.currentObj.filter == null || this.inFilter != null) ? h3d_mat_Wrap.Repeat : h3d_mat_Wrap.Clamp);
		var blend = this.currentObj.blendMode;
		if(this.inFilter == this.currentObj && blend == h2d_BlendMode.Erase) {
			blend = h2d_BlendMode.Add;
		}
		if(this.inFilterBlend != null) {
			blend = this.inFilterBlend;
		}
		if(blend != this.currentBlend) {
			this.currentBlend = blend;
			this.pass.setBlendMode(blend);
			if(blend == h2d_BlendMode.Alpha || blend == h2d_BlendMode.Add) {
				this.pass.set_blendAlphaSrc(h3d_mat_Blend.One);
				if(this.inFilterBlend != null) {
					this.pass.set_blendSrc(h3d_mat_Blend.One);
				}
			}
		}
		this.manager.fillParams(this.buffers,this.compiledShader,this.currentShaders);
		this.engine.selectMaterial(this.pass);
		this.engine.uploadShaderBuffers(this.buffers,1);
		this.engine.uploadShaderBuffers(this.buffers,2);
		this.engine.uploadShaderBuffers(this.buffers,3);
	}
	,drawTile: function(obj,tile) {
		var matA;
		var matB;
		var matC;
		var matD;
		var absX;
		var absY;
		if(this.inFilter != null) {
			var f1 = this.baseShader.filterMatrixA__;
			var f2 = this.baseShader.filterMatrixB__;
			var tmpA = obj.matA * f1.x + obj.matB * f1.y;
			var tmpB = obj.matA * f2.x + obj.matB * f2.y;
			var tmpC = obj.matC * f1.x + obj.matD * f1.y;
			var tmpD = obj.matC * f2.x + obj.matD * f2.y;
			var tmpX = obj.absX * f1.x + obj.absY * f1.y + f1.z;
			var tmpY = obj.absX * f2.x + obj.absY * f2.y + f2.z;
			matA = tmpA * this.viewA + tmpB * this.viewC;
			matB = tmpA * this.viewB + tmpB * this.viewD;
			matC = tmpC * this.viewA + tmpD * this.viewC;
			matD = tmpC * this.viewB + tmpD * this.viewD;
			absX = tmpX * this.viewA + tmpY * this.viewC + this.viewX;
			absY = tmpX * this.viewB + tmpY * this.viewD + this.viewY;
		} else {
			matA = obj.matA * this.viewA + obj.matB * this.viewC;
			matB = obj.matA * this.viewB + obj.matB * this.viewD;
			matC = obj.matC * this.viewA + obj.matD * this.viewC;
			matD = obj.matC * this.viewB + obj.matD * this.viewD;
			absX = obj.absX * this.viewA + obj.absY * this.viewC + this.viewX;
			absY = obj.absX * this.viewB + obj.absY * this.viewD + this.viewY;
		}
		if(matB == 0 && matC == 0) {
			var tx = tile.dx + tile.width * 0.5;
			var ty = tile.dy + tile.height * 0.5;
			var a = matA < 0 ? -matA : matA;
			var b = matD < 0 ? -matD : matD;
			var tr = (tile.width > tile.height ? tile.width : tile.height) * 1.5 * (a < b ? b : a);
			var cx = absX + tx * matA;
			var cy = absY + ty * matD;
			if(cx + tr < -1 || cx - tr > 1 || cy + tr < -1 || cy - tr > 1) {
				return false;
			}
		} else {
			var xMin = 1e20;
			var yMin = 1e20;
			var xMax = -1e20;
			var yMax = -1e20;
			var hw = tile.width * 0.5;
			var hh = tile.height * 0.5;
			var px = tile.dx * matA + tile.dy * matC;
			var py = tile.dx * matB + tile.dy * matD;
			if(px < xMin) {
				xMin = px;
			}
			if(px > xMax) {
				xMax = px;
			}
			if(py < yMin) {
				yMin = py;
			}
			if(py > yMax) {
				yMax = py;
			}
			var x = tile.width;
			var px = (x + tile.dx) * matA + tile.dy * matC;
			var py = (x + tile.dx) * matB + tile.dy * matD;
			if(px < xMin) {
				xMin = px;
			}
			if(px > xMax) {
				xMax = px;
			}
			if(py < yMin) {
				yMin = py;
			}
			if(py > yMax) {
				yMax = py;
			}
			var y = tile.height;
			var px = tile.dx * matA + (y + tile.dy) * matC;
			var py = tile.dx * matB + (y + tile.dy) * matD;
			if(px < xMin) {
				xMin = px;
			}
			if(px > xMax) {
				xMax = px;
			}
			if(py < yMin) {
				yMin = py;
			}
			if(py > yMax) {
				yMax = py;
			}
			var x = tile.width;
			var y = tile.height;
			var px = (x + tile.dx) * matA + (y + tile.dy) * matC;
			var py = (x + tile.dx) * matB + (y + tile.dy) * matD;
			if(px < xMin) {
				xMin = px;
			}
			if(px > xMax) {
				xMax = px;
			}
			if(py < yMin) {
				yMin = py;
			}
			if(py > yMax) {
				yMax = py;
			}
			if(absX + xMax < -1 || absY + yMax < -1 || absX + xMin > 1 || absY + yMin > 1) {
				return false;
			}
		}
		if(!this.beginDraw(obj,tile.innerTex,true,true)) {
			return false;
		}
		if(this.inFilter == obj) {
			var _this = this.baseShader.color__;
			var x = obj.color.x;
			var y = obj.color.y;
			var z = obj.color.z;
			var w = obj.color.w;
			if(w == null) {
				w = 1.;
			}
			if(z == null) {
				z = 0.;
			}
			if(y == null) {
				y = 0.;
			}
			if(x == null) {
				x = 0.;
			}
			_this.x = x;
			_this.y = y;
			_this.z = z;
			_this.w = w;
		} else if(this.inFilterBlend != null) {
			var _this = this.baseShader.color__;
			var x = this.globalAlpha;
			var y = this.globalAlpha;
			var z = this.globalAlpha;
			var w = this.globalAlpha;
			if(w == null) {
				w = 1.;
			}
			if(z == null) {
				z = 0.;
			}
			if(y == null) {
				y = 0.;
			}
			if(x == null) {
				x = 0.;
			}
			_this.x = x;
			_this.y = y;
			_this.z = z;
			_this.w = w;
		} else {
			var _this = this.baseShader.color__;
			var x = obj.color.x;
			var y = obj.color.y;
			var z = obj.color.z;
			var w = obj.color.w * this.globalAlpha;
			if(w == null) {
				w = 1.;
			}
			if(z == null) {
				z = 0.;
			}
			if(y == null) {
				y = 0.;
			}
			if(x == null) {
				x = 0.;
			}
			_this.x = x;
			_this.y = y;
			_this.z = z;
			_this.w = w;
		}
		var _this = this.baseShader.absoluteMatrixA__;
		var x = tile.width * obj.matA;
		var y = tile.height * obj.matC;
		var z = obj.absX + tile.dx * obj.matA + tile.dy * obj.matC;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		var _this = this.baseShader.absoluteMatrixB__;
		var x = tile.width * obj.matB;
		var y = tile.height * obj.matD;
		var z = obj.absY + tile.dx * obj.matB + tile.dy * obj.matD;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = 1.;
		var _this = this.baseShader.uvPos__;
		var x = tile.u;
		var y = tile.v;
		var z = tile.u2 - tile.u;
		var w = tile.v2 - tile.v;
		if(w == null) {
			w = 1.;
		}
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = z;
		_this.w = w;
		this.beforeDraw();
		var tmp;
		if(this.fixedBuffer != null) {
			var _this = this.fixedBuffer;
			tmp = _this.buffer == null || _this.buffer.vbuf == null;
		} else {
			tmp = true;
		}
		if(tmp) {
			this.fixedBuffer = new h3d_Buffer(4,8,[h3d_BufferFlag.Quads,h3d_BufferFlag.RawFormat]);
			var this1 = hxd__$FloatBuffer_Float32Expand._new(0);
			var k = this1;
			var v = 0;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 0;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 0;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 0;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 0;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 0;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 0;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 0;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			var v = 1;
			if(k.pos == k.array.length) {
				var newSize = k.array.length << 1;
				if(newSize < 128) {
					newSize = 128;
				}
				var newArray = new Float32Array(newSize);
				newArray.set(k.array);
				k.array = newArray;
			}
			k.array[k.pos++] = v;
			this.fixedBuffer.uploadVector(k,0,4);
		}
		var _this = this.engine;
		_this.renderBuffer(this.fixedBuffer,_this.mem.quadIndexes,2,0,-1);
		return true;
	}
	,beginDraw: function(obj,texture,isRelative,hasUVPos) {
		if(hasUVPos == null) {
			hasUVPos = false;
		}
		if(this.onBeginDraw != null && !this.onBeginDraw(obj)) {
			return false;
		}
		var stride = 8;
		var shaderChanged = false;
		var paramsChanged = false;
		var objShaders = obj.shaders;
		var curShaders = this.currentShaders.next;
		while(objShaders != null && curShaders != null) {
			var s = objShaders.s;
			var t = curShaders.s;
			objShaders = objShaders.next;
			curShaders = curShaders.next;
			var prevInst = t.instance;
			if(s != t) {
				paramsChanged = true;
			}
			s.updateConstants(this.manager.globals);
			if(s.instance != prevInst) {
				shaderChanged = true;
			}
		}
		if(objShaders != null || curShaders != null || this.baseShader.isRelative__ != isRelative || this.baseShader.hasUVPos__ != hasUVPos || this.baseShader.killAlpha__ != this.killAlpha) {
			shaderChanged = true;
		}
		if(shaderChanged) {
			var _this = this.baseShader;
			_this.constModified = true;
			_this.hasUVPos__ = hasUVPos;
			var _this = this.baseShader;
			_this.constModified = true;
			_this.isRelative__ = isRelative;
			var _this = this.baseShader;
			_this.constModified = true;
			_this.killAlpha__ = this.killAlpha;
			this.baseShader.updateConstants(this.manager.globals);
			this.baseShaderList.next = obj.shaders;
			this.initShaders(this.baseShaderList);
		} else if(paramsChanged) {
			if(this.currentShaders != this.baseShaderList) {
				throw haxe_Exception.thrown("!");
			}
			this.currentShaders.next = obj.shaders;
		}
		this.texture = texture;
		this.stride = stride;
		this.currentObj = obj;
		return true;
	}
	,__class__: h2d_RenderContext
});
var h2d_ScaleModeAlign = $hxEnums["h2d.ScaleModeAlign"] = { __ename__:true,__constructs__:null
	,Left: {_hx_name:"Left",_hx_index:0,__enum__:"h2d.ScaleModeAlign",toString:$estr}
	,Right: {_hx_name:"Right",_hx_index:1,__enum__:"h2d.ScaleModeAlign",toString:$estr}
	,Center: {_hx_name:"Center",_hx_index:2,__enum__:"h2d.ScaleModeAlign",toString:$estr}
	,Top: {_hx_name:"Top",_hx_index:3,__enum__:"h2d.ScaleModeAlign",toString:$estr}
	,Bottom: {_hx_name:"Bottom",_hx_index:4,__enum__:"h2d.ScaleModeAlign",toString:$estr}
};
h2d_ScaleModeAlign.__constructs__ = [h2d_ScaleModeAlign.Left,h2d_ScaleModeAlign.Right,h2d_ScaleModeAlign.Center,h2d_ScaleModeAlign.Top,h2d_ScaleModeAlign.Bottom];
h2d_ScaleModeAlign.__empty_constructs__ = [h2d_ScaleModeAlign.Left,h2d_ScaleModeAlign.Right,h2d_ScaleModeAlign.Center,h2d_ScaleModeAlign.Top,h2d_ScaleModeAlign.Bottom];
var h2d_ScaleMode = $hxEnums["h2d.ScaleMode"] = { __ename__:true,__constructs__:null
	,Resize: {_hx_name:"Resize",_hx_index:0,__enum__:"h2d.ScaleMode",toString:$estr}
	,Stretch: ($_=function(width,height) { return {_hx_index:1,width:width,height:height,__enum__:"h2d.ScaleMode",toString:$estr}; },$_._hx_name="Stretch",$_.__params__ = ["width","height"],$_)
	,LetterBox: ($_=function(width,height,integerScale,horizontalAlign,verticalAlign) { return {_hx_index:2,width:width,height:height,integerScale:integerScale,horizontalAlign:horizontalAlign,verticalAlign:verticalAlign,__enum__:"h2d.ScaleMode",toString:$estr}; },$_._hx_name="LetterBox",$_.__params__ = ["width","height","integerScale","horizontalAlign","verticalAlign"],$_)
	,Fixed: ($_=function(width,height,zoom,horizontalAlign,verticalAlign) { return {_hx_index:3,width:width,height:height,zoom:zoom,horizontalAlign:horizontalAlign,verticalAlign:verticalAlign,__enum__:"h2d.ScaleMode",toString:$estr}; },$_._hx_name="Fixed",$_.__params__ = ["width","height","zoom","horizontalAlign","verticalAlign"],$_)
	,Zoom: ($_=function(level) { return {_hx_index:4,level:level,__enum__:"h2d.ScaleMode",toString:$estr}; },$_._hx_name="Zoom",$_.__params__ = ["level"],$_)
	,AutoZoom: ($_=function(minWidth,minHeight,integerScaling) { return {_hx_index:5,minWidth:minWidth,minHeight:minHeight,integerScaling:integerScaling,__enum__:"h2d.ScaleMode",toString:$estr}; },$_._hx_name="AutoZoom",$_.__params__ = ["minWidth","minHeight","integerScaling"],$_)
};
h2d_ScaleMode.__constructs__ = [h2d_ScaleMode.Resize,h2d_ScaleMode.Stretch,h2d_ScaleMode.LetterBox,h2d_ScaleMode.Fixed,h2d_ScaleMode.Zoom,h2d_ScaleMode.AutoZoom];
h2d_ScaleMode.__empty_constructs__ = [h2d_ScaleMode.Resize];
var h2d_Scene = function() {
	this.scaleMode = h2d_ScaleMode.Resize;
	h2d_Layers.call(this,null);
	var e = h3d_Engine.CURRENT;
	this.ctx = new h2d_RenderContext(this);
	this._cameras = [];
	new h2d_Camera(this);
	this.set_interactiveCamera(this._cameras[0]);
	this.width = e.width;
	this.height = e.height;
	this.viewportA = 2 / e.width;
	this.viewportD = 2 / e.height;
	this.viewportX = -1;
	this.viewportY = -1;
	this.viewportScaleX = 1;
	this.viewportScaleY = 1;
	this.offsetX = 0;
	this.offsetY = 0;
	this.interactive = [];
	this.eventListeners = [];
	this.shapePoint = new h2d_col_Point();
	this.window = hxd_Window.getInstance();
	this.posChanged = true;
};
h2d_Scene.__name__ = "h2d.Scene";
h2d_Scene.__super__ = h2d_Layers;
h2d_Scene.prototype = $extend(h2d_Layers.prototype,{
	setEvents: function(events) {
		this.events = events;
	}
	,set_interactiveCamera: function(cam) {
		if(cam == null) {
			throw haxe_Exception.thrown("Interactive cammera cannot be null!");
		}
		if(cam.scene != this) {
			this.addCamera(cam);
		}
		return this.interactiveCamera = cam;
	}
	,addCamera: function(cam,pos) {
		if(cam.scene != null) {
			cam.scene.removeCamera(cam);
		}
		cam.scene = this;
		cam.posChanged = true;
		if(pos != null) {
			this._cameras.splice(pos,0,cam);
		} else {
			this._cameras.push(cam);
		}
	}
	,removeCamera: function(cam) {
		if(cam == this.interactiveCamera) {
			throw haxe_Exception.thrown("Current interactive Camera cannot be removed from camera list!");
		}
		cam.scene = null;
		HxOverrides.remove(this._cameras,cam);
	}
	,checkResize: function() {
		var _gthis = this;
		var engine = h3d_Engine.CURRENT;
		var _g = this.scaleMode;
		switch(_g._hx_index) {
		case 0:
			var w = engine.width;
			var h = engine.height;
			if(w != _gthis.width || h != _gthis.height) {
				_gthis.width = w;
				_gthis.height = h;
				_gthis.posChanged = true;
			}
			_gthis.viewportScaleX = 1;
			_gthis.viewportScaleY = 1;
			_gthis.viewportA = 2 / _gthis.width;
			_gthis.viewportD = 2 / _gthis.height;
			_gthis.viewportX = -1;
			_gthis.viewportY = -1;
			break;
		case 1:
			var _width = _g.width;
			var _height = _g.height;
			if(_width != _gthis.width || _height != _gthis.height) {
				_gthis.width = _width;
				_gthis.height = _height;
				_gthis.posChanged = true;
			}
			_gthis.viewportScaleX = engine.width / _width;
			_gthis.viewportScaleY = engine.height / _height;
			_gthis.viewportA = 2 / _gthis.width;
			_gthis.viewportD = 2 / _gthis.height;
			_gthis.viewportX = -1;
			_gthis.viewportY = -1;
			break;
		case 2:
			var _width = _g.width;
			var _height = _g.height;
			var integerScale = _g.integerScale;
			var horizontalAlign = _g.horizontalAlign;
			var verticalAlign = _g.verticalAlign;
			if(_width != _gthis.width || _height != _gthis.height) {
				_gthis.width = _width;
				_gthis.height = _height;
				_gthis.posChanged = true;
			}
			var a = engine.width / _width;
			var b = engine.height / _height;
			var zoom = a > b ? b : a;
			if(integerScale) {
				zoom = zoom | 0;
				if(zoom == 0) {
					zoom = 1;
				}
			}
			var horizontal = horizontalAlign;
			var vertical = verticalAlign;
			_gthis.viewportA = zoom * 2 / engine.width;
			_gthis.viewportD = zoom * 2 / engine.height;
			_gthis.viewportScaleX = zoom;
			_gthis.viewportScaleY = zoom;
			if(horizontal == null) {
				horizontal = h2d_ScaleModeAlign.Center;
			}
			switch(horizontal._hx_index) {
			case 0:
				_gthis.viewportX = -1;
				_gthis.offsetX = 0;
				break;
			case 1:
				_gthis.viewportX = 1 - _gthis.width * _gthis.viewportA;
				_gthis.offsetX = engine.width - _gthis.width * zoom;
				break;
			default:
				_gthis.viewportX = Math.floor((engine.width - _gthis.width * zoom) / (zoom * 2)) * _gthis.viewportA - 1.;
				_gthis.offsetX = Math.floor((engine.width - _gthis.width * zoom) / 2);
			}
			if(vertical == null) {
				vertical = h2d_ScaleModeAlign.Center;
			}
			switch(vertical._hx_index) {
			case 3:
				_gthis.viewportY = -1;
				_gthis.offsetY = 0;
				break;
			case 4:
				_gthis.viewportY = 1 - _gthis.height * _gthis.viewportD;
				_gthis.offsetY = engine.height - _gthis.height * zoom;
				break;
			default:
				_gthis.viewportY = Math.floor((engine.height - _gthis.height * zoom) / (zoom * 2)) * _gthis.viewportD - 1.;
				_gthis.offsetY = Math.floor((engine.height - _gthis.height * zoom) / 2);
			}
			break;
		case 3:
			var _width = _g.width;
			var _height = _g.height;
			var zoom = _g.zoom;
			var horizontalAlign = _g.horizontalAlign;
			var verticalAlign = _g.verticalAlign;
			if(_width != _gthis.width || _height != _gthis.height) {
				_gthis.width = _width;
				_gthis.height = _height;
				_gthis.posChanged = true;
			}
			var horizontal = horizontalAlign;
			var vertical = verticalAlign;
			_gthis.viewportA = zoom * 2 / engine.width;
			_gthis.viewportD = zoom * 2 / engine.height;
			_gthis.viewportScaleX = zoom;
			_gthis.viewportScaleY = zoom;
			if(horizontal == null) {
				horizontal = h2d_ScaleModeAlign.Center;
			}
			switch(horizontal._hx_index) {
			case 0:
				_gthis.viewportX = -1;
				_gthis.offsetX = 0;
				break;
			case 1:
				_gthis.viewportX = 1 - _gthis.width * _gthis.viewportA;
				_gthis.offsetX = engine.width - _gthis.width * zoom;
				break;
			default:
				_gthis.viewportX = Math.floor((engine.width - _gthis.width * zoom) / (zoom * 2)) * _gthis.viewportA - 1.;
				_gthis.offsetX = Math.floor((engine.width - _gthis.width * zoom) / 2);
			}
			if(vertical == null) {
				vertical = h2d_ScaleModeAlign.Center;
			}
			switch(vertical._hx_index) {
			case 3:
				_gthis.viewportY = -1;
				_gthis.offsetY = 0;
				break;
			case 4:
				_gthis.viewportY = 1 - _gthis.height * _gthis.viewportD;
				_gthis.offsetY = engine.height - _gthis.height * zoom;
				break;
			default:
				_gthis.viewportY = Math.floor((engine.height - _gthis.height * zoom) / (zoom * 2)) * _gthis.viewportD - 1.;
				_gthis.offsetY = Math.floor((engine.height - _gthis.height * zoom) / 2);
			}
			break;
		case 4:
			var level = _g.level;
			var w = Math.ceil(engine.width / level);
			var h = Math.ceil(engine.height / level);
			if(w != _gthis.width || h != _gthis.height) {
				_gthis.width = w;
				_gthis.height = h;
				_gthis.posChanged = true;
			}
			_gthis.viewportScaleX = level;
			_gthis.viewportScaleY = level;
			_gthis.viewportA = 2 / _gthis.width;
			_gthis.viewportD = 2 / _gthis.height;
			_gthis.viewportX = -1;
			_gthis.viewportY = -1;
			break;
		case 5:
			var minWidth = _g.minWidth;
			var minHeight = _g.minHeight;
			var integerScaling = _g.integerScaling;
			var a = engine.width / minWidth;
			var b = engine.height / minHeight;
			var zoom = a > b ? b : a;
			if(integerScaling) {
				zoom = zoom | 0;
				if(zoom == 0) {
					zoom = 1;
				}
			}
			var w = Math.ceil(engine.width / zoom);
			var h = Math.ceil(engine.height / zoom);
			if(w != _gthis.width || h != _gthis.height) {
				_gthis.width = w;
				_gthis.height = h;
				_gthis.posChanged = true;
			}
			_gthis.viewportScaleX = zoom;
			_gthis.viewportScaleY = zoom;
			_gthis.viewportA = 2 / _gthis.width;
			_gthis.viewportD = 2 / _gthis.height;
			_gthis.viewportX = -1;
			_gthis.viewportY = -1;
			break;
		}
	}
	,dispatchListeners: function(event) {
		this.screenToViewport(event);
		var _g = 0;
		var _g1 = this.eventListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(event);
			if(!event.propagate) {
				break;
			}
		}
	}
	,isInteractiveVisible: function(i) {
		var s = i;
		while(s != this) {
			if(s == null || !s.visible) {
				return false;
			}
			s = s.parent;
		}
		return true;
	}
	,screenToViewport: function(e) {
		this.interactiveCamera.eventToCamera(e);
	}
	,dispatchEvent: function(event,to) {
		var i = to;
		this.screenToViewport(event);
		var dx = event.relX - i.absX;
		var dy = event.relY - i.absY;
		var rx = (dx * i.matD - dy * i.matC) * i.invDet;
		var ry = (dy * i.matA - dx * i.matB) * i.invDet;
		event.relX = rx;
		event.relY = ry;
		i.handleEvent(event);
	}
	,handleEvent: function(event,last) {
		this.screenToViewport(event);
		var ex = event.relX;
		var ey = event.relY;
		var index = last == null ? 0 : this.interactive.indexOf(last) + 1;
		var pt = this.shapePoint;
		var _g = index;
		var _g1 = this.interactive.length;
		while(_g < _g1) {
			var idx = _g++;
			var i = this.interactive[idx];
			if(i == null) {
				break;
			}
			if(i.invDet == 0) {
				continue;
			}
			var dx = ex - i.absX;
			var dy = ey - i.absY;
			var rx = (dx * i.matD - dy * i.matC) * i.invDet;
			var ry = (dy * i.matA - dx * i.matB) * i.invDet;
			if(i.shape != null) {
				var x = rx + i.shapeX;
				var y = ry + i.shapeY;
				if(y == null) {
					y = 0.;
				}
				if(x == null) {
					x = 0.;
				}
				pt.x = x;
				pt.y = y;
				if(!i.shape.contains(pt)) {
					continue;
				}
			} else if(ry < 0 || rx < 0 || rx >= i.width || ry >= i.height) {
				continue;
			}
			var visible = true;
			var p = i;
			while(p != null) {
				if(!p.visible) {
					visible = false;
					break;
				}
				p = p.parent;
			}
			if(!visible) {
				continue;
			}
			event.relX = rx;
			event.relY = ry;
			i.handleEvent(event);
			if(event.cancel) {
				event.cancel = false;
				event.propagate = false;
				continue;
			}
			return i;
		}
		return null;
	}
	,addEventTarget: function(i) {
		var i1 = i;
		var lv = 0;
		while(i1 != null) {
			i1 = i1.parent;
			++lv;
		}
		var level = lv;
		var _g = 0;
		var _g1 = this.interactive.length;
		while(_g < _g1) {
			var index = _g++;
			var i1 = i;
			var i2 = this.interactive[index];
			var lv1 = level;
			var i3 = i2;
			var lv = 0;
			while(i3 != null) {
				i3 = i3.parent;
				++lv;
			}
			var lv2 = lv;
			var p1 = i1;
			var p2 = i2;
			while(lv1 > lv2) {
				i1 = p1;
				p1 = p1.parent;
				--lv1;
			}
			while(lv2 > lv1) {
				i2 = p2;
				p2 = p2.parent;
				--lv2;
			}
			while(p1 != p2) {
				i1 = p1;
				p1 = p1.parent;
				i2 = p2;
				p2 = p2.parent;
			}
			var id = -1;
			var _g2 = 0;
			var _g3 = p1.children.length;
			while(_g2 < _g3) {
				var k = _g2++;
				if(p1.children[k] == i1) {
					id = k;
					break;
				}
			}
			var tmp = id;
			var id1 = -1;
			var _g4 = 0;
			var _g5 = p2.children.length;
			while(_g4 < _g5) {
				var k1 = _g4++;
				if(p2.children[k1] == i2) {
					id1 = k1;
					break;
				}
			}
			if(tmp > id1) {
				this.interactive.splice(index,0,i);
				return;
			}
		}
		this.interactive.push(i);
	}
	,removeEventTarget: function(i,notify) {
		if(notify == null) {
			notify = false;
		}
		HxOverrides.remove(this.interactive,i);
		if(notify && this.events != null) {
			this.events.onRemove(i);
		}
	}
	,setElapsedTime: function(v) {
		this.ctx.elapsedTime = v;
	}
	,render: function(engine) {
		this.ctx.engine = engine;
		this.ctx.frame++;
		this.ctx.time += this.ctx.elapsedTime;
		this.ctx.globalAlpha = this.alpha;
		this.sync(this.ctx);
		if(this.children.length == 0) {
			return;
		}
		this.ctx.begin();
		this.ctx.drawScene();
		this.ctx.end();
	}
	,sync: function(ctx) {
		var forceCamSync = this.posChanged;
		if(!this.allocated) {
			this.onAdd();
		}
		h2d_Layers.prototype.sync.call(this,ctx);
		var _g = 0;
		var _g1 = this._cameras;
		while(_g < _g1.length) {
			var cam = _g1[_g];
			++_g;
			cam.sync(ctx,forceCamSync);
		}
	}
	,clipBounds: function(ctx,bounds) {
		var _gthis = this;
		if(this.rotation == 0) {
			var x = -this.absX;
			var y = -this.absY;
			if(x < bounds.xMin) {
				bounds.xMin = x;
			}
			if(x > bounds.xMax) {
				bounds.xMax = x;
			}
			if(y < bounds.yMin) {
				bounds.yMin = y;
			}
			if(y > bounds.yMax) {
				bounds.yMax = y;
			}
			var x = this.window.get_width() / this.matA - this.absX;
			var y = this.window.get_height() / this.matD - this.absY;
			if(x < bounds.xMin) {
				bounds.xMin = x;
			}
			if(x > bounds.xMax) {
				bounds.xMax = x;
			}
			if(y < bounds.yMin) {
				bounds.yMin = y;
			}
			if(y > bounds.yMax) {
				bounds.yMax = y;
			}
		} else {
			var ww = this.window.get_width() / this.matA - this.absX;
			var wh = this.window.get_height() / this.matD - this.absY;
			var x = -this.absX;
			var y = -this.absY;
			var x1 = x * _gthis.matA + y * _gthis.matC;
			var y1 = x * _gthis.matB + y * _gthis.matD;
			if(x1 < bounds.xMin) {
				bounds.xMin = x1;
			}
			if(x1 > bounds.xMax) {
				bounds.xMax = x1;
			}
			if(y1 < bounds.yMin) {
				bounds.yMin = y1;
			}
			if(y1 > bounds.yMax) {
				bounds.yMax = y1;
			}
			var x = ww - this.absX;
			var y = -this.absY;
			var x1 = x * _gthis.matA + y * _gthis.matC;
			var y1 = x * _gthis.matB + y * _gthis.matD;
			if(x1 < bounds.xMin) {
				bounds.xMin = x1;
			}
			if(x1 > bounds.xMax) {
				bounds.xMax = x1;
			}
			if(y1 < bounds.yMin) {
				bounds.yMin = y1;
			}
			if(y1 > bounds.yMax) {
				bounds.yMax = y1;
			}
			var x = -this.absX;
			var y = wh - this.absY;
			var x1 = x * _gthis.matA + y * _gthis.matC;
			var y1 = x * _gthis.matB + y * _gthis.matD;
			if(x1 < bounds.xMin) {
				bounds.xMin = x1;
			}
			if(x1 > bounds.xMax) {
				bounds.xMax = x1;
			}
			if(y1 < bounds.yMin) {
				bounds.yMin = y1;
			}
			if(y1 > bounds.yMax) {
				bounds.yMax = y1;
			}
			var x = ww - this.absX;
			var y = wh - this.absY;
			var x1 = x * _gthis.matA + y * _gthis.matC;
			var y1 = x * _gthis.matB + y * _gthis.matD;
			if(x1 < bounds.xMin) {
				bounds.xMin = x1;
			}
			if(x1 > bounds.xMax) {
				bounds.xMax = x1;
			}
			if(y1 < bounds.yMin) {
				bounds.yMin = y1;
			}
			if(y1 > bounds.yMax) {
				bounds.yMax = y1;
			}
		}
		h2d_Layers.prototype.clipBounds.call(this,ctx,bounds);
	}
	,drawContent: function(ctx) {
		if(ctx.front2back) {
			var _g = 0;
			var _g1 = this._cameras;
			while(_g < _g1.length) {
				var cam = _g1[_g];
				++_g;
				if(!cam.visible) {
					continue;
				}
				var i = this.children.length;
				var l = this.layerCount;
				cam.enter(ctx);
				while(l-- > 0) {
					var top = l == 0 ? 0 : this.layersIndexes[l - 1];
					if(cam.layerVisible(l)) {
						while(i >= top) this.children[i--].drawRec(ctx);
					} else {
						i = top - 1;
					}
				}
				cam.exit(ctx);
			}
			this.draw(ctx);
		} else {
			this.draw(ctx);
			var _g = 0;
			var _g1 = this._cameras;
			while(_g < _g1.length) {
				var cam = _g1[_g];
				++_g;
				if(!cam.visible) {
					continue;
				}
				var i = 0;
				var l = 0;
				cam.enter(ctx);
				while(l < this.layerCount) {
					var top = this.layersIndexes[l++];
					if(cam.layerVisible(l - 1)) {
						while(i < top) this.children[i++].drawRec(ctx);
					} else {
						i = top;
					}
				}
				cam.exit(ctx);
			}
		}
	}
	,onAdd: function() {
		this.checkResize();
		h2d_Layers.prototype.onAdd.call(this);
		this.window.addResizeEvent($bind(this,this.checkResize));
	}
	,onRemove: function() {
		h2d_Layers.prototype.onRemove.call(this);
		this.window.removeResizeEvent($bind(this,this.checkResize));
	}
	,__class__: h2d_Scene
});
var h2d_Tile = function(tex,x,y,w,h,dx,dy) {
	if(dy == null) {
		dy = 0;
	}
	if(dx == null) {
		dx = 0;
	}
	this.innerTex = tex;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.dx = dx;
	this.dy = dy;
	if(tex != null) {
		this.setTexture(tex);
	}
};
h2d_Tile.__name__ = "h2d.Tile";
h2d_Tile.fromColor = function(color,width,height,alpha) {
	if(alpha == null) {
		alpha = 1.;
	}
	if(height == null) {
		height = 1;
	}
	if(width == null) {
		width = 1;
	}
	var t = new h2d_Tile(h3d_mat_Texture.fromColor(color,alpha),0,0,1,1);
	t.width = width;
	t.height = height;
	return t;
};
h2d_Tile.fromTexture = function(t) {
	return new h2d_Tile(t,0,0,t.width,t.height);
};
h2d_Tile.prototype = {
	setTexture: function(tex) {
		this.innerTex = tex;
		if(tex != null) {
			this.u = this.x / tex.width;
			this.v = this.y / tex.height;
			this.u2 = (this.x + this.width) / tex.width;
			this.v2 = (this.y + this.height) / tex.height;
		}
	}
	,__class__: h2d_Tile
};
var h2d_col_Bounds = function() {
	this.xMin = 1e20;
	this.yMin = 1e20;
	this.xMax = -1e20;
	this.yMax = -1e20;
};
h2d_col_Bounds.__name__ = "h2d.col.Bounds";
h2d_col_Bounds.prototype = {
	__class__: h2d_col_Bounds
};
var h2d_col_Point = function(x,y) {
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	this.x = x;
	this.y = y;
};
h2d_col_Point.__name__ = "h2d.col.Point";
h2d_col_Point.prototype = {
	__class__: h2d_col_Point
};
var h2d_filter_Filter = function() {
	this.enable = true;
	this.boundsExtend = 0.;
	this.autoBounds = true;
};
h2d_filter_Filter.__name__ = "h2d.filter.Filter";
h2d_filter_Filter.prototype = {
	get_enable: function() {
		return this.enable;
	}
	,sync: function(ctx,s) {
	}
	,bind: function(s) {
	}
	,unbind: function(s) {
	}
	,getBounds: function(s,bounds) {
		s.getBounds(s,bounds);
		bounds.xMin -= this.boundsExtend;
		bounds.yMin -= this.boundsExtend;
		bounds.xMax += this.boundsExtend;
		bounds.yMax += this.boundsExtend;
	}
	,draw: function(ctx,input) {
		return input;
	}
	,__class__: h2d_filter_Filter
};
var h3d_BufferFlag = $hxEnums["h3d.BufferFlag"] = { __ename__:true,__constructs__:null
	,Dynamic: {_hx_name:"Dynamic",_hx_index:0,__enum__:"h3d.BufferFlag",toString:$estr}
	,Triangles: {_hx_name:"Triangles",_hx_index:1,__enum__:"h3d.BufferFlag",toString:$estr}
	,Quads: {_hx_name:"Quads",_hx_index:2,__enum__:"h3d.BufferFlag",toString:$estr}
	,Managed: {_hx_name:"Managed",_hx_index:3,__enum__:"h3d.BufferFlag",toString:$estr}
	,RawFormat: {_hx_name:"RawFormat",_hx_index:4,__enum__:"h3d.BufferFlag",toString:$estr}
	,NoAlloc: {_hx_name:"NoAlloc",_hx_index:5,__enum__:"h3d.BufferFlag",toString:$estr}
	,UniformBuffer: {_hx_name:"UniformBuffer",_hx_index:6,__enum__:"h3d.BufferFlag",toString:$estr}
	,LargeBuffer: {_hx_name:"LargeBuffer",_hx_index:7,__enum__:"h3d.BufferFlag",toString:$estr}
};
h3d_BufferFlag.__constructs__ = [h3d_BufferFlag.Dynamic,h3d_BufferFlag.Triangles,h3d_BufferFlag.Quads,h3d_BufferFlag.Managed,h3d_BufferFlag.RawFormat,h3d_BufferFlag.NoAlloc,h3d_BufferFlag.UniformBuffer,h3d_BufferFlag.LargeBuffer];
h3d_BufferFlag.__empty_constructs__ = [h3d_BufferFlag.Dynamic,h3d_BufferFlag.Triangles,h3d_BufferFlag.Quads,h3d_BufferFlag.Managed,h3d_BufferFlag.RawFormat,h3d_BufferFlag.NoAlloc,h3d_BufferFlag.UniformBuffer,h3d_BufferFlag.LargeBuffer];
var h3d_Buffer = function(vertices,stride,flags) {
	this.id = h3d_Buffer.GUID++;
	this.vertices = vertices;
	var this1 = 0;
	this.flags = this1;
	if(flags != null) {
		var _g = 0;
		while(_g < flags.length) {
			var f = flags[_g];
			++_g;
			this.flags |= 1 << f._hx_index;
		}
	}
	if((this.flags & 1 << h3d_BufferFlag.NoAlloc._hx_index) == 0) {
		h3d_Engine.CURRENT.mem.allocBuffer(this,stride);
	}
};
h3d_Buffer.__name__ = "h3d.Buffer";
h3d_Buffer.ofFloats = function(v,stride,flags) {
	var nvert = v.pos / stride | 0;
	var b = new h3d_Buffer(nvert,stride,flags);
	b.uploadVector(v,0,nvert);
	return b;
};
h3d_Buffer.prototype = {
	dispose: function() {
		if(this.buffer != null) {
			this.buffer.freeBuffer(this);
			this.buffer = null;
			if(this.next != null) {
				this.next.dispose();
			}
		}
	}
	,uploadVector: function(buf,bufPos,vertices,startVertice) {
		if(startVertice == null) {
			startVertice = 0;
		}
		var cur = this;
		while(cur != null && startVertice >= cur.vertices) {
			startVertice -= cur.vertices;
			cur = cur.next;
		}
		while(vertices > 0) {
			if(cur == null) {
				throw haxe_Exception.thrown("Too many vertices");
			}
			var count = vertices + startVertice > cur.vertices ? cur.vertices - startVertice : vertices;
			cur.buffer.uploadVertexBuffer(cur.position + startVertice,count,buf,bufPos);
			startVertice = 0;
			bufPos += count * this.buffer.stride;
			vertices -= count;
			cur = cur.next;
		}
	}
	,__class__: h3d_Buffer
};
var h3d_Camera = function(fovY,zoom,screenRatio,zNear,zFar,rightHanded) {
	if(rightHanded == null) {
		rightHanded = false;
	}
	if(zFar == null) {
		zFar = 4000.;
	}
	if(zNear == null) {
		zNear = 0.02;
	}
	if(screenRatio == null) {
		screenRatio = 1.333333;
	}
	if(zoom == null) {
		zoom = 1.;
	}
	if(fovY == null) {
		fovY = 25.;
	}
	this.viewY = 0.;
	this.viewX = 0.;
	this.fovY = fovY;
	this.zoom = zoom;
	this.screenRatio = screenRatio;
	this.zNear = zNear;
	this.zFar = zFar;
	this.rightHanded = rightHanded;
	this.pos = new h3d_Vector(2,3,4);
	this.up = new h3d_Vector(0,0,1);
	this.target = new h3d_Vector(0,0,0);
	this.m = new h3d_Matrix();
	this.mcam = new h3d_Matrix();
	this.mproj = new h3d_Matrix();
	this.frustum = new h3d_col_Frustum();
	this.update();
};
h3d_Camera.__name__ = "h3d.Camera";
h3d_Camera.prototype = {
	getInverseViewProj: function() {
		if(this.minv == null) {
			this.minv = new h3d_Matrix();
		}
		if(this.needInv) {
			this.minv.initInverse(this.m);
			this.needInv = false;
		}
		return this.minv;
	}
	,unproject: function(screenX,screenY,camZ) {
		var p = new h3d_Vector(screenX,screenY,camZ);
		var m = this.getInverseViewProj();
		var px = p.x * m._11 + p.y * m._21 + p.z * m._31 + p.w * m._41;
		var py = p.x * m._12 + p.y * m._22 + p.z * m._32 + p.w * m._42;
		var pz = p.x * m._13 + p.y * m._23 + p.z * m._33 + p.w * m._43;
		var iw = 1 / (p.x * m._14 + p.y * m._24 + p.z * m._34 + p.w * m._44);
		p.x = px * iw;
		p.y = py * iw;
		p.z = pz * iw;
		p.w = 1;
		return p;
	}
	,update: function() {
		if(this.follow != null) {
			var fpos = this.follow.pos.localToGlobal();
			var ftarget = this.follow.target.localToGlobal();
			var _this = this.pos;
			var x = fpos.x;
			var y = fpos.y;
			var z = fpos.z;
			if(z == null) {
				z = 0.;
			}
			if(y == null) {
				y = 0.;
			}
			if(x == null) {
				x = 0.;
			}
			_this.x = x;
			_this.y = y;
			_this.z = z;
			_this.w = 1.;
			var _this = this.target;
			var x = ftarget.x;
			var y = ftarget.y;
			var z = ftarget.z;
			if(z == null) {
				z = 0.;
			}
			if(y == null) {
				y = 0.;
			}
			if(x == null) {
				x = 0.;
			}
			_this.x = x;
			_this.y = y;
			_this.z = z;
			_this.w = 1.;
			if(this.follow.pos.name != null) {
				var p = this.follow.pos;
				while(p != null) {
					if(p.currentAnimation != null) {
						var v = p.currentAnimation.getPropValue(this.follow.pos.name,"FOVY");
						if(v != null) {
							this.fovY = v;
							break;
						}
					}
					p = p.parent;
				}
			}
		}
		this.makeCameraMatrix(this.mcam);
		this.makeFrustumMatrix(this.mproj);
		this.m.multiply(this.mcam,this.mproj);
		this.needInv = true;
		if(this.mcamInv != null) {
			this.mcamInv._44 = 0;
		}
		if(this.mprojInv != null) {
			this.mprojInv._44 = 0;
		}
		this.frustum.loadMatrix(this.m);
	}
	,getFrustumCorners: function(zMax,zMin) {
		if(zMin == null) {
			zMin = 0.;
		}
		if(zMax == null) {
			zMax = 1.;
		}
		return [this.unproject(-1,1,zMin),this.unproject(1,1,zMin),this.unproject(1,-1,zMin),this.unproject(-1,-1,zMin),this.unproject(-1,1,zMax),this.unproject(1,1,zMax),this.unproject(1,-1,zMax),this.unproject(-1,-1,zMax)];
	}
	,makeCameraMatrix: function(m) {
		var _this = this.target;
		var v = this.pos;
		var x = _this.x - v.x;
		var y = _this.y - v.y;
		var z = _this.z - v.z;
		var w = _this.w - v.w;
		if(w == null) {
			w = 1.;
		}
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		var az_x = x;
		var az_y = y;
		var az_z = z;
		var az_w = w;
		if(this.rightHanded) {
			az_x *= -1;
			az_y *= -1;
			az_z *= -1;
		}
		var k = az_x * az_x + az_y * az_y + az_z * az_z;
		if(k < 1e-10) {
			k = 0;
		} else {
			k = 1. / Math.sqrt(k);
		}
		az_x *= k;
		az_y *= k;
		az_z *= k;
		var _this = this.up;
		var x = _this.y * az_z - _this.z * az_y;
		var y = _this.z * az_x - _this.x * az_z;
		var z = _this.x * az_y - _this.y * az_x;
		var w = 1;
		if(w == null) {
			w = 1.;
		}
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		var ax_x = x;
		var ax_y = y;
		var ax_z = z;
		var ax_w = w;
		var k = ax_x * ax_x + ax_y * ax_y + ax_z * ax_z;
		if(k < 1e-10) {
			k = 0;
		} else {
			k = 1. / Math.sqrt(k);
		}
		ax_x *= k;
		ax_y *= k;
		ax_z *= k;
		if(Math.sqrt(ax_x * ax_x + ax_y * ax_y + ax_z * ax_z) == 0) {
			ax_x = az_y;
			ax_y = az_z;
			ax_z = az_x;
		}
		var x = az_y * ax_z - az_z * ax_y;
		var y = az_z * ax_x - az_x * ax_z;
		var z = az_x * ax_y - az_y * ax_x;
		var w = 1;
		if(w == null) {
			w = 1.;
		}
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		var ay_x = x;
		var ay_y = y;
		var ay_z = z;
		var ay_w = w;
		m._11 = ax_x;
		m._12 = ay_x;
		m._13 = az_x;
		m._14 = 0;
		m._21 = ax_y;
		m._22 = ay_y;
		m._23 = az_y;
		m._24 = 0;
		m._31 = ax_z;
		m._32 = ay_z;
		m._33 = az_z;
		m._34 = 0;
		var v = this.pos;
		m._41 = -(ax_x * v.x + ax_y * v.y + ax_z * v.z);
		var v = this.pos;
		m._42 = -(ay_x * v.x + ay_y * v.y + ay_z * v.z);
		var v = this.pos;
		m._43 = -(az_x * v.x + az_y * v.y + az_z * v.z);
		m._44 = 1;
	}
	,makeFrustumMatrix: function(m) {
		m.zero();
		var bounds = this.orthoBounds;
		if(bounds != null) {
			var w = 1 / (bounds.xMax - bounds.xMin);
			var h = 1 / (bounds.yMax - bounds.yMin);
			var d = 1 / (bounds.zMax - bounds.zMin);
			m._11 = 2 * w;
			m._22 = 2 * h;
			m._33 = d;
			m._41 = -(bounds.xMin + bounds.xMax) * w;
			m._42 = -(bounds.yMin + bounds.yMax) * h;
			m._43 = -bounds.zMin * d;
			m._44 = 1;
		} else {
			var degToRad = Math.PI / 180;
			var halfFovX = Math.atan(Math.tan(this.fovY * 0.5 * degToRad) * this.screenRatio);
			var scale = this.zoom / Math.tan(halfFovX);
			m._11 = scale;
			m._22 = scale * this.screenRatio;
			m._33 = this.zFar / (this.zFar - this.zNear);
			m._34 = 1;
			m._43 = -(this.zNear * this.zFar) / (this.zFar - this.zNear);
		}
		m._11 += this.viewX * m._14;
		m._21 += this.viewX * m._24;
		m._31 += this.viewX * m._34;
		m._41 += this.viewX * m._44;
		m._12 += this.viewY * m._14;
		m._22 += this.viewY * m._24;
		m._32 += this.viewY * m._34;
		m._42 += this.viewY * m._44;
		if(this.rightHanded) {
			m._33 *= -1;
			m._34 *= -1;
		}
	}
	,__class__: h3d_Camera
};
var h3d__$Engine_TargetTmp = function(t,n,l,m) {
	this.t = t;
	this.next = n;
	this.layer = l;
	this.mipLevel = m;
};
h3d__$Engine_TargetTmp.__name__ = "h3d._Engine.TargetTmp";
h3d__$Engine_TargetTmp.prototype = {
	__class__: h3d__$Engine_TargetTmp
};
var h3d_Engine = function() {
	this.resCache = new haxe_ds_ObjectMap();
	this.ready = false;
	this.inRender = false;
	this.textureColorCache = new haxe_ds_IntMap();
	this.tmpVector = new h3d_Vector();
	this.backgroundColor = -16777216;
	this.hardware = !h3d_Engine.SOFTWARE_DRIVER;
	this.antiAlias = h3d_Engine.ANTIALIASING;
	this.autoResize = true;
	this.set_fullScreen(!hxd_System.getValue(hxd_SystemValue.IsWindowed));
	this.window = hxd_Window.getInstance();
	this.realFps = hxd_System.getDefaultFrameRate();
	this.lastTime = HxOverrides.now() / 1000;
	this.window.addResizeEvent($bind(this,this.onWindowResize));
	this.driver = new h3d_impl_GlDriver(this.antiAlias);
	h3d_Engine.CURRENT = this;
};
h3d_Engine.__name__ = "h3d.Engine";
h3d_Engine.prototype = {
	init: function() {
		this.driver.init($bind(this,this.onCreate),!this.hardware);
	}
	,selectShader: function(shader) {
		if(this.needFlushTarget) {
			this.doFlushTarget();
		}
		if(this.driver.selectShader(shader)) {
			this.shaderSwitches++;
		}
	}
	,selectMaterial: function(pass) {
		this.driver.selectMaterial(pass);
	}
	,uploadShaderBuffers: function(buffers,which) {
		this.driver.uploadShaderBuffers(buffers,which);
	}
	,selectBuffer: function(buf) {
		if(buf.buffer == null || buf.buffer.vbuf == null) {
			return false;
		}
		if(this.needFlushTarget) {
			this.doFlushTarget();
		}
		this.driver.selectBuffer(buf);
		return true;
	}
	,renderBuffer: function(b,indexes,vertPerTri,startTri,drawTri) {
		if(drawTri == null) {
			drawTri = -1;
		}
		if(startTri == null) {
			startTri = 0;
		}
		if(indexes.isDisposed()) {
			return;
		}
		while(true) {
			var ntri = b.vertices / vertPerTri | 0;
			var pos = b.position / vertPerTri | 0;
			if(startTri > 0) {
				if(startTri >= ntri) {
					startTri -= ntri;
					b = b.next;
					if(!(b != null)) {
						break;
					} else {
						continue;
					}
				}
				pos += startTri;
				ntri -= startTri;
				startTri = 0;
			}
			if(drawTri >= 0) {
				if(drawTri == 0) {
					return;
				}
				drawTri -= ntri;
				if(drawTri < 0) {
					ntri += drawTri;
					drawTri = 0;
				}
			}
			if(ntri > 0 && this.selectBuffer(b)) {
				this.driver.draw(indexes.ibuf,pos * 3,ntri);
				this.drawTriangles += ntri;
				this.drawCalls++;
			}
			b = b.next;
			if(!(b != null)) {
				break;
			}
		}
	}
	,renderIndexed: function(b,indexes,startTri,drawTri) {
		if(drawTri == null) {
			drawTri = -1;
		}
		if(startTri == null) {
			startTri = 0;
		}
		if(b.next != null) {
			throw haxe_Exception.thrown("Buffer is split");
		}
		if(indexes.isDisposed()) {
			return;
		}
		var maxTri = indexes.count / 3 | 0;
		if(drawTri < 0) {
			drawTri = maxTri - startTri;
		}
		if(drawTri > 0 && this.selectBuffer(b)) {
			this.driver.draw(indexes.ibuf,startTri * 3,drawTri);
			this.drawTriangles += drawTri;
			this.drawCalls++;
		}
	}
	,set_debug: function(d) {
		this.debug = d;
		this.driver.setDebug(this.debug);
		return d;
	}
	,onCreate: function(disposed) {
		h3d_Engine.CURRENT = this;
		if(this.autoResize) {
			this.width = this.window.get_width();
			this.height = this.window.get_height();
		}
		if(disposed) {
			hxd_impl_Allocator.get().onContextLost();
			this.mem.onContextLost();
		} else {
			this.mem = new h3d_impl_MemoryManager(this.driver);
			this.mem.init();
			this.nullTexture = new h3d_mat_Texture(0,0,[h3d_mat_TextureFlags.NoAlloc]);
		}
		this.hardware = this.driver.hasFeature(h3d_impl_Feature.HardwareAccelerated);
		this.set_debug(this.debug);
		this.set_fullScreen(this.fullScreen);
		this.resize(this.width,this.height);
		if(disposed) {
			this.onContextLost();
		} else {
			this.onReady();
		}
		this.ready = true;
	}
	,onContextLost: function() {
	}
	,onReady: function() {
	}
	,onWindowResize: function() {
		if(this.autoResize && !this.driver.isDisposed()) {
			var w = this.window.get_width();
			var h = this.window.get_height();
			if(w != this.width || h != this.height) {
				this.resize(w,h);
			}
			this.onResized();
		}
	}
	,set_fullScreen: function(v) {
		this.fullScreen = v;
		if(this.mem != null && hxd_System.getValue(hxd_SystemValue.IsWindowed)) {
			this.window.set_displayMode(v ? hxd_DisplayMode.Borderless : hxd_DisplayMode.Windowed);
		}
		return v;
	}
	,onResized: function() {
	}
	,resize: function(width,height) {
		if(width < 32) {
			width = 32;
		}
		if(height < 32) {
			height = 32;
		}
		this.width = width;
		this.height = height;
		if(!this.driver.isDisposed()) {
			this.driver.resize(width,height);
		}
	}
	,begin: function() {
		if(this.driver.isDisposed()) {
			return false;
		}
		this.inRender = true;
		this.drawTriangles = 0;
		this.shaderSwitches = 0;
		this.drawCalls = 0;
		this.targetStack = null;
		this.needFlushTarget = this.currentTargetTex != null;
		this.driver.begin(hxd_Timer.frameCount);
		if(this.backgroundColor != null) {
			this.clear(this.backgroundColor,1,0);
		}
		return true;
	}
	,end: function() {
		this.inRender = false;
		this.driver.end();
	}
	,getCurrentTarget: function() {
		if(this.targetStack == null) {
			return null;
		} else if(this.targetStack.t == this.nullTexture) {
			return this.targetStack.textures[0];
		} else {
			return this.targetStack.t;
		}
	}
	,pushTarget: function(tex,layer,mipLevel) {
		if(mipLevel == null) {
			mipLevel = 0;
		}
		if(layer == null) {
			layer = 0;
		}
		var c = this.targetTmp;
		if(c == null) {
			c = new h3d__$Engine_TargetTmp(tex,this.targetStack,layer,mipLevel);
		} else {
			this.targetTmp = c.next;
			c.t = tex;
			c.next = this.targetStack;
			c.mipLevel = mipLevel;
			c.layer = layer;
		}
		this.targetStack = c;
		this.updateNeedFlush();
	}
	,updateNeedFlush: function() {
		var t = this.targetStack;
		if(t == null) {
			this.needFlushTarget = this.currentTargetTex != null;
		} else {
			this.needFlushTarget = this.currentTargetTex != t.t || this.currentTargetLayer != t.layer || this.currentTargetMip != t.mipLevel || t.textures != null;
		}
	}
	,popTarget: function() {
		var c = this.targetStack;
		if(c == null) {
			throw haxe_Exception.thrown("popTarget() with no matching pushTarget()");
		}
		this.targetStack = c.next;
		this.updateNeedFlush();
		c.t = null;
		c.textures = null;
		c.next = this.targetTmp;
		this.targetTmp = c;
	}
	,doFlushTarget: function() {
		var t = this.targetStack;
		if(t == null) {
			this.driver.setRenderTarget(null);
			this.currentTargetTex = null;
		} else {
			if(t.textures != null) {
				this.driver.setRenderTargets(t.textures);
			} else {
				this.driver.setRenderTarget(t.t,t.layer,t.mipLevel);
			}
			this.currentTargetTex = t.t;
			this.currentTargetLayer = t.layer;
			this.currentTargetMip = t.mipLevel;
		}
		this.needFlushTarget = false;
	}
	,clear: function(color,depth,stencil) {
		if(color != null) {
			var _this = this.tmpVector;
			_this.x = (color >> 16 & 255) / 255;
			_this.y = (color >> 8 & 255) / 255;
			_this.z = (color & 255) / 255;
			_this.w = (color >>> 24) / 255;
		}
		if(this.needFlushTarget) {
			this.doFlushTarget();
		}
		this.driver.clear(color == null ? null : this.tmpVector,depth,stencil);
	}
	,setRenderZone: function(x,y,width,height) {
		if(height == null) {
			height = -1;
		}
		if(width == null) {
			width = -1;
		}
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		if(this.needFlushTarget) {
			this.doFlushTarget();
		}
		this.driver.setRenderZone(x,y,width,height);
	}
	,render: function(obj) {
		if(!this.begin()) {
			return false;
		}
		obj.render(this);
		this.end();
		var delta = HxOverrides.now() / 1000 - this.lastTime;
		this.lastTime += delta;
		if(delta > 0) {
			var curFps = 1. / delta;
			if(curFps > this.realFps * 2) {
				curFps = this.realFps * 2;
			} else if(curFps < this.realFps * 0.5) {
				curFps = this.realFps * 0.5;
			}
			var f = delta / .5;
			if(f > 0.3) {
				f = 0.3;
			}
			this.realFps = this.realFps * (1 - f) + curFps * f;
		}
		return true;
	}
	,__class__: h3d_Engine
};
var h3d_Indexes = function(count,is32) {
	if(is32 == null) {
		is32 = false;
	}
	this.mem = h3d_Engine.CURRENT.mem;
	this.count = count;
	this.is32 = is32;
	this.mem.allocIndexes(this);
};
h3d_Indexes.__name__ = "h3d.Indexes";
h3d_Indexes.alloc = function(i,startPos,length) {
	if(length == null) {
		length = -1;
	}
	if(startPos == null) {
		startPos = 0;
	}
	if(length < 0) {
		length = i.length;
	}
	var idx = new h3d_Indexes(length);
	idx.upload(i,0,length);
	return idx;
};
h3d_Indexes.prototype = {
	isDisposed: function() {
		return this.ibuf == null;
	}
	,upload: function(indexes,pos,count,bufferPos) {
		if(bufferPos == null) {
			bufferPos = 0;
		}
		this.mem.driver.uploadIndexBuffer(this.ibuf,pos,count,indexes,bufferPos);
	}
	,dispose: function() {
		if(this.ibuf != null) {
			this.mem.deleteIndexes(this);
		}
	}
	,__class__: h3d_Indexes
};
var h3d_Matrix = function() {
};
h3d_Matrix.__name__ = "h3d.Matrix";
h3d_Matrix.L = function(a) {
	var m = new h3d_Matrix();
	m.loadValues(a);
	return m;
};
h3d_Matrix.prototype = {
	zero: function() {
		this._11 = 0.0;
		this._12 = 0.0;
		this._13 = 0.0;
		this._14 = 0.0;
		this._21 = 0.0;
		this._22 = 0.0;
		this._23 = 0.0;
		this._24 = 0.0;
		this._31 = 0.0;
		this._32 = 0.0;
		this._33 = 0.0;
		this._34 = 0.0;
		this._41 = 0.0;
		this._42 = 0.0;
		this._43 = 0.0;
		this._44 = 0.0;
	}
	,identity: function() {
		this._11 = 1.0;
		this._12 = 0.0;
		this._13 = 0.0;
		this._14 = 0.0;
		this._21 = 0.0;
		this._22 = 1.0;
		this._23 = 0.0;
		this._24 = 0.0;
		this._31 = 0.0;
		this._32 = 0.0;
		this._33 = 1.0;
		this._34 = 0.0;
		this._41 = 0.0;
		this._42 = 0.0;
		this._43 = 0.0;
		this._44 = 1.0;
	}
	,multiply3x4: function(a,b) {
		var m11 = a._11;
		var m12 = a._12;
		var m13 = a._13;
		var m21 = a._21;
		var m22 = a._22;
		var m23 = a._23;
		var a31 = a._31;
		var a32 = a._32;
		var a33 = a._33;
		var a41 = a._41;
		var a42 = a._42;
		var a43 = a._43;
		var b11 = b._11;
		var b12 = b._12;
		var b13 = b._13;
		var b21 = b._21;
		var b22 = b._22;
		var b23 = b._23;
		var b31 = b._31;
		var b32 = b._32;
		var b33 = b._33;
		var b41 = b._41;
		var b42 = b._42;
		var b43 = b._43;
		this._11 = m11 * b11 + m12 * b21 + m13 * b31;
		this._12 = m11 * b12 + m12 * b22 + m13 * b32;
		this._13 = m11 * b13 + m12 * b23 + m13 * b33;
		this._14 = 0;
		this._21 = m21 * b11 + m22 * b21 + m23 * b31;
		this._22 = m21 * b12 + m22 * b22 + m23 * b32;
		this._23 = m21 * b13 + m22 * b23 + m23 * b33;
		this._24 = 0;
		this._31 = a31 * b11 + a32 * b21 + a33 * b31;
		this._32 = a31 * b12 + a32 * b22 + a33 * b32;
		this._33 = a31 * b13 + a32 * b23 + a33 * b33;
		this._34 = 0;
		this._41 = a41 * b11 + a42 * b21 + a43 * b31 + b41;
		this._42 = a41 * b12 + a42 * b22 + a43 * b32 + b42;
		this._43 = a41 * b13 + a42 * b23 + a43 * b33 + b43;
		this._44 = 1;
	}
	,multiply: function(a,b) {
		var a11 = a._11;
		var a12 = a._12;
		var a13 = a._13;
		var a14 = a._14;
		var a21 = a._21;
		var a22 = a._22;
		var a23 = a._23;
		var a24 = a._24;
		var a31 = a._31;
		var a32 = a._32;
		var a33 = a._33;
		var a34 = a._34;
		var a41 = a._41;
		var a42 = a._42;
		var a43 = a._43;
		var a44 = a._44;
		var b11 = b._11;
		var b12 = b._12;
		var b13 = b._13;
		var b14 = b._14;
		var b21 = b._21;
		var b22 = b._22;
		var b23 = b._23;
		var b24 = b._24;
		var b31 = b._31;
		var b32 = b._32;
		var b33 = b._33;
		var b34 = b._34;
		var b41 = b._41;
		var b42 = b._42;
		var b43 = b._43;
		var b44 = b._44;
		this._11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		this._12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		this._13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		this._14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
		this._21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		this._22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		this._23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		this._24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
		this._31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		this._32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		this._33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		this._34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
		this._41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		this._42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		this._43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		this._44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
	}
	,inverse3x4: function(m) {
		var m11 = m._11;
		var m12 = m._12;
		var m13 = m._13;
		var m21 = m._21;
		var m22 = m._22;
		var m23 = m._23;
		var m31 = m._31;
		var m32 = m._32;
		var m33 = m._33;
		var m41 = m._41;
		var m42 = m._42;
		var m43 = m._43;
		this._11 = m22 * m33 - m23 * m32;
		this._12 = m13 * m32 - m12 * m33;
		this._13 = m12 * m23 - m13 * m22;
		this._14 = 0;
		this._21 = m23 * m31 - m21 * m33;
		this._22 = m11 * m33 - m13 * m31;
		this._23 = m13 * m21 - m11 * m23;
		this._24 = 0;
		this._31 = m21 * m32 - m22 * m31;
		this._32 = m12 * m31 - m11 * m32;
		this._33 = m11 * m22 - m12 * m21;
		this._34 = 0;
		this._41 = -m21 * m32 * m43 + m21 * m33 * m42 + m31 * m22 * m43 - m31 * m23 * m42 - m41 * m22 * m33 + m41 * m23 * m32;
		this._42 = m11 * m32 * m43 - m11 * m33 * m42 - m31 * m12 * m43 + m31 * m13 * m42 + m41 * m12 * m33 - m41 * m13 * m32;
		this._43 = -m11 * m22 * m43 + m11 * m23 * m42 + m21 * m12 * m43 - m21 * m13 * m42 - m41 * m12 * m23 + m41 * m13 * m22;
		this._44 = m11 * m22 * m33 - m11 * m23 * m32 - m21 * m12 * m33 + m21 * m13 * m32 + m31 * m12 * m23 - m31 * m13 * m22;
		this._44 = 1;
		var det = m11 * this._11 + m12 * this._21 + m13 * this._31;
		if((det < 0 ? -det : det) < 1e-10) {
			this.zero();
			return;
		}
		var invDet = 1.0 / det;
		this._11 *= invDet;
		this._12 *= invDet;
		this._13 *= invDet;
		this._21 *= invDet;
		this._22 *= invDet;
		this._23 *= invDet;
		this._31 *= invDet;
		this._32 *= invDet;
		this._33 *= invDet;
		this._41 *= invDet;
		this._42 *= invDet;
		this._43 *= invDet;
	}
	,initInverse: function(m) {
		var m11 = m._11;
		var m12 = m._12;
		var m13 = m._13;
		var m14 = m._14;
		var m21 = m._21;
		var m22 = m._22;
		var m23 = m._23;
		var m24 = m._24;
		var m31 = m._31;
		var m32 = m._32;
		var m33 = m._33;
		var m34 = m._34;
		var m41 = m._41;
		var m42 = m._42;
		var m43 = m._43;
		var m44 = m._44;
		this._11 = m22 * m33 * m44 - m22 * m34 * m43 - m32 * m23 * m44 + m32 * m24 * m43 + m42 * m23 * m34 - m42 * m24 * m33;
		this._12 = -m12 * m33 * m44 + m12 * m34 * m43 + m32 * m13 * m44 - m32 * m14 * m43 - m42 * m13 * m34 + m42 * m14 * m33;
		this._13 = m12 * m23 * m44 - m12 * m24 * m43 - m22 * m13 * m44 + m22 * m14 * m43 + m42 * m13 * m24 - m42 * m14 * m23;
		this._14 = -m12 * m23 * m34 + m12 * m24 * m33 + m22 * m13 * m34 - m22 * m14 * m33 - m32 * m13 * m24 + m32 * m14 * m23;
		this._21 = -m21 * m33 * m44 + m21 * m34 * m43 + m31 * m23 * m44 - m31 * m24 * m43 - m41 * m23 * m34 + m41 * m24 * m33;
		this._22 = m11 * m33 * m44 - m11 * m34 * m43 - m31 * m13 * m44 + m31 * m14 * m43 + m41 * m13 * m34 - m41 * m14 * m33;
		this._23 = -m11 * m23 * m44 + m11 * m24 * m43 + m21 * m13 * m44 - m21 * m14 * m43 - m41 * m13 * m24 + m41 * m14 * m23;
		this._24 = m11 * m23 * m34 - m11 * m24 * m33 - m21 * m13 * m34 + m21 * m14 * m33 + m31 * m13 * m24 - m31 * m14 * m23;
		this._31 = m21 * m32 * m44 - m21 * m34 * m42 - m31 * m22 * m44 + m31 * m24 * m42 + m41 * m22 * m34 - m41 * m24 * m32;
		this._32 = -m11 * m32 * m44 + m11 * m34 * m42 + m31 * m12 * m44 - m31 * m14 * m42 - m41 * m12 * m34 + m41 * m14 * m32;
		this._33 = m11 * m22 * m44 - m11 * m24 * m42 - m21 * m12 * m44 + m21 * m14 * m42 + m41 * m12 * m24 - m41 * m14 * m22;
		this._34 = -m11 * m22 * m34 + m11 * m24 * m32 + m21 * m12 * m34 - m21 * m14 * m32 - m31 * m12 * m24 + m31 * m14 * m22;
		this._41 = -m21 * m32 * m43 + m21 * m33 * m42 + m31 * m22 * m43 - m31 * m23 * m42 - m41 * m22 * m33 + m41 * m23 * m32;
		this._42 = m11 * m32 * m43 - m11 * m33 * m42 - m31 * m12 * m43 + m31 * m13 * m42 + m41 * m12 * m33 - m41 * m13 * m32;
		this._43 = -m11 * m22 * m43 + m11 * m23 * m42 + m21 * m12 * m43 - m21 * m13 * m42 - m41 * m12 * m23 + m41 * m13 * m22;
		this._44 = m11 * m22 * m33 - m11 * m23 * m32 - m21 * m12 * m33 + m21 * m13 * m32 + m31 * m12 * m23 - m31 * m13 * m22;
		var det = m11 * this._11 + m12 * this._21 + m13 * this._31 + m14 * this._41;
		if((det < 0 ? -det : det) < 1e-10) {
			this.zero();
			return;
		}
		det = 1.0 / det;
		this._11 *= det;
		this._12 *= det;
		this._13 *= det;
		this._14 *= det;
		this._21 *= det;
		this._22 *= det;
		this._23 *= det;
		this._24 *= det;
		this._31 *= det;
		this._32 *= det;
		this._33 *= det;
		this._34 *= det;
		this._41 *= det;
		this._42 *= det;
		this._43 *= det;
		this._44 *= det;
	}
	,loadValues: function(a) {
		this._11 = a[0];
		this._12 = a[1];
		this._13 = a[2];
		this._14 = a[3];
		this._21 = a[4];
		this._22 = a[5];
		this._23 = a[6];
		this._24 = a[7];
		this._31 = a[8];
		this._32 = a[9];
		this._33 = a[10];
		this._34 = a[11];
		this._41 = a[12];
		this._42 = a[13];
		this._43 = a[14];
		this._44 = a[15];
	}
	,__class__: h3d_Matrix
};
var h3d_Quat = function(x,y,z,w) {
	if(w == null) {
		w = 1.;
	}
	if(z == null) {
		z = 0.;
	}
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};
h3d_Quat.__name__ = "h3d.Quat";
h3d_Quat.prototype = {
	toMatrix: function(m) {
		if(m == null) {
			m = new h3d_Matrix();
		}
		var xx = this.x * this.x;
		var xy = this.x * this.y;
		var xz = this.x * this.z;
		var xw = this.x * this.w;
		var yy = this.y * this.y;
		var yz = this.y * this.z;
		var yw = this.y * this.w;
		var zz = this.z * this.z;
		var zw = this.z * this.w;
		m._11 = 1 - 2 * (yy + zz);
		m._12 = 2 * (xy + zw);
		m._13 = 2 * (xz - yw);
		m._14 = 0;
		m._21 = 2 * (xy - zw);
		m._22 = 1 - 2 * (xx + zz);
		m._23 = 2 * (yz + xw);
		m._24 = 0;
		m._31 = 2 * (xz + yw);
		m._32 = 2 * (yz - xw);
		m._33 = 1 - 2 * (xx + yy);
		m._34 = 0;
		m._41 = 0;
		m._42 = 0;
		m._43 = 0;
		m._44 = 1;
		return m;
	}
	,__class__: h3d_Quat
};
var h3d_Vector = function(x,y,z,w) {
	if(w == null) {
		w = 1.;
	}
	if(z == null) {
		z = 0.;
	}
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};
h3d_Vector.__name__ = "h3d.Vector";
h3d_Vector.prototype = {
	__class__: h3d_Vector
};
var h3d_anim_AnimatedObject = function() { };
h3d_anim_AnimatedObject.__name__ = "h3d.anim.AnimatedObject";
var h3d_anim_Animation = function(name,frameCount,sampling) {
	this.name = name;
	this.frameCount = frameCount;
	this.sampling = sampling;
	this.objects = [];
	this.lastEvent = -1;
	this.frame = 0.;
	this.speed = 1.;
	this.loop = true;
	this.pause = false;
};
h3d_anim_Animation.__name__ = "h3d.anim.Animation";
h3d_anim_Animation.prototype = {
	getPropValue: function(objectName,propName) {
		return null;
	}
	,sync: function(decompose) {
		if(decompose == null) {
			decompose = false;
		}
		throw haxe_Exception.thrown("assert");
	}
	,isPlaying: function() {
		if(!this.pause) {
			return (this.speed < 0 ? -this.speed : this.speed) > 0.000001;
		} else {
			return false;
		}
	}
	,endFrame: function() {
		return this.frameCount;
	}
	,update: function(dt) {
		if(!this.isInstance) {
			throw haxe_Exception.thrown("You must instanciate this animation first");
		}
		if(!this.isPlaying()) {
			return 0;
		}
		if(this.events != null && this.onEvent != null) {
			var f0 = this.frame | 0;
			var f1 = this.frame + dt * this.speed * this.sampling | 0;
			if(f1 >= this.frameCount) {
				f1 = this.frameCount - 1;
			}
			var _g = f0;
			var _g1 = f1 + 1;
			while(_g < _g1) {
				var f = _g++;
				if(f == this.lastEvent) {
					continue;
				}
				this.lastEvent = f;
				if(this.events[f] != null) {
					var oldF = this.frame;
					var oldDT = dt;
					dt -= (f - this.frame) / (this.speed * this.sampling);
					this.frame = f;
					var _g2 = 0;
					var _g3 = this.events[f];
					while(_g2 < _g3.length) {
						var e = _g3[_g2];
						++_g2;
						this.onEvent(e);
					}
					if(this.frame == f && f == this.frameCount - 1) {
						this.frame = oldF;
						dt = oldDT;
						break;
					} else {
						return dt;
					}
				}
			}
		}
		if(this.onAnimEnd != null) {
			var end = this.endFrame();
			var et = this.speed == 0 ? 0 : (end - this.frame) / (this.speed * this.sampling);
			if(et <= dt && et > 0) {
				this.frame = end;
				dt -= et;
				this.onAnimEnd();
				if(this.frame == end && this.isPlaying()) {
					if(this.loop) {
						this.frame = 0;
					} else {
						dt = 0;
					}
				}
				return dt;
			}
		}
		this.frame += dt * this.speed * this.sampling;
		if(this.frame >= this.frameCount) {
			if(this.loop) {
				this.frame %= this.frameCount;
			} else {
				this.frame = this.frameCount;
			}
		}
		return 0;
	}
	,__class__: h3d_anim_Animation
};
var h3d_col_Bounds = function() {
	this.xMin = 1e20;
	this.xMax = -1e20;
	this.yMin = 1e20;
	this.yMax = -1e20;
	this.zMin = 1e20;
	this.zMax = -1e20;
};
h3d_col_Bounds.__name__ = "h3d.col.Bounds";
h3d_col_Bounds.prototype = {
	inFrustum: function(f,m) {
		if(m != null) {
			throw haxe_Exception.thrown("Not implemented");
		}
		return f.hasBounds(this);
	}
	,rayIntersection: function(r,bestMatch) {
		var minTx = (this.xMin - r.px) / r.lx;
		var minTy = (this.yMin - r.py) / r.ly;
		var minTz = (this.zMin - r.pz) / r.lz;
		var maxTx = (this.xMax - r.px) / r.lx;
		var maxTy = (this.yMax - r.py) / r.ly;
		var maxTz = (this.zMax - r.pz) / r.lz;
		var realMinTx = minTx > maxTx ? maxTx : minTx;
		var realMinTy = minTy > maxTy ? maxTy : minTy;
		var realMinTz = minTz > maxTz ? maxTz : minTz;
		var realMaxTx = minTx < maxTx ? maxTx : minTx;
		var realMaxTy = minTy < maxTy ? maxTy : minTy;
		var realMaxTz = minTz < maxTz ? maxTz : minTz;
		var a = realMaxTx > realMaxTy ? realMaxTy : realMaxTx;
		var minmax = a > realMaxTz ? realMaxTz : a;
		var a = realMinTx < realMinTy ? realMinTy : realMinTx;
		var maxmin = a < realMinTz ? realMinTz : a;
		if(minmax < maxmin) {
			return -1;
		}
		return maxmin;
	}
	,intersection: function(a,b) {
		var a1 = a.xMin;
		var b1 = b.xMin;
		var xMin = a1 < b1 ? b1 : a1;
		var a1 = a.yMin;
		var b1 = b.yMin;
		var yMin = a1 < b1 ? b1 : a1;
		var a1 = a.zMin;
		var b1 = b.zMin;
		var zMin = a1 < b1 ? b1 : a1;
		var a1 = a.xMax;
		var b1 = b.xMax;
		var xMax = a1 > b1 ? b1 : a1;
		var a1 = a.yMax;
		var b1 = b.yMax;
		var yMax = a1 > b1 ? b1 : a1;
		var a1 = a.zMax;
		var b1 = b.zMax;
		var zMax = a1 > b1 ? b1 : a1;
		this.xMin = xMin;
		this.xMax = xMax;
		this.yMin = yMin;
		this.yMax = yMax;
		this.zMin = zMin;
		this.zMax = zMax;
	}
	,load: function(b) {
		this.xMin = b.xMin;
		this.xMax = b.xMax;
		this.yMin = b.yMin;
		this.yMax = b.yMax;
		this.zMin = b.zMin;
		this.zMax = b.zMax;
	}
	,scaleCenter: function(v) {
		var dx = (this.xMax - this.xMin) * 0.5 * v;
		var dy = (this.yMax - this.yMin) * 0.5 * v;
		var dz = (this.zMax - this.zMin) * 0.5 * v;
		var mx = (this.xMax + this.xMin) * 0.5;
		var my = (this.yMax + this.yMin) * 0.5;
		var mz = (this.zMax + this.zMin) * 0.5;
		this.xMin = mx - dx;
		this.yMin = my - dy;
		this.zMin = mz - dz;
		this.xMax = mx + dx;
		this.yMax = my + dy;
		this.zMax = mz + dz;
	}
	,__class__: h3d_col_Bounds
};
var h3d_col_Frustum = function(mvp) {
	this.checkNearFar = true;
	this.pleft = new h3d_col_Plane(1,0,0,0.0);
	this.pright = new h3d_col_Plane(1,0,0,0.0);
	this.ptop = new h3d_col_Plane(1,0,0,0.0);
	this.pbottom = new h3d_col_Plane(1,0,0,0.0);
	this.pnear = new h3d_col_Plane(1,0,0,0.0);
	this.pfar = new h3d_col_Plane(1,0,0,0.0);
	if(mvp != null) {
		this.loadMatrix(mvp);
	}
};
h3d_col_Frustum.__name__ = "h3d.col.Frustum";
h3d_col_Frustum.prototype = {
	loadMatrix: function(mvp) {
		var _this = this.pleft;
		var p_nx = mvp._14 + mvp._11;
		var p_ny = mvp._24 + mvp._21;
		var p_nz = mvp._34 + mvp._31;
		var p_d = -(mvp._44 + mvp._41);
		_this.nx = p_nx;
		_this.ny = p_ny;
		_this.nz = p_nz;
		_this.d = p_d;
		var _this = this.pright;
		var p_nx = mvp._14 - mvp._11;
		var p_ny = mvp._24 - mvp._21;
		var p_nz = mvp._34 - mvp._31;
		var p_d = mvp._41 - mvp._44;
		_this.nx = p_nx;
		_this.ny = p_ny;
		_this.nz = p_nz;
		_this.d = p_d;
		var _this = this.ptop;
		var p_nx = mvp._14 - mvp._12;
		var p_ny = mvp._24 - mvp._22;
		var p_nz = mvp._34 - mvp._32;
		var p_d = mvp._42 - mvp._44;
		_this.nx = p_nx;
		_this.ny = p_ny;
		_this.nz = p_nz;
		_this.d = p_d;
		var _this = this.pbottom;
		var p_nx = mvp._14 + mvp._12;
		var p_ny = mvp._24 + mvp._22;
		var p_nz = mvp._34 + mvp._32;
		var p_d = -(mvp._44 + mvp._42);
		_this.nx = p_nx;
		_this.ny = p_ny;
		_this.nz = p_nz;
		_this.d = p_d;
		var _this = this.pnear;
		var p_nx = mvp._13;
		var p_ny = mvp._23;
		var p_nz = mvp._33;
		var p_d = -mvp._43;
		_this.nx = p_nx;
		_this.ny = p_ny;
		_this.nz = p_nz;
		_this.d = p_d;
		var _this = this.pfar;
		var p_nx = mvp._14 - mvp._13;
		var p_ny = mvp._24 - mvp._23;
		var p_nz = mvp._34 - mvp._33;
		var p_d = mvp._43 - mvp._44;
		_this.nx = p_nx;
		_this.ny = p_ny;
		_this.nz = p_nz;
		_this.d = p_d;
		var _this = this.pleft;
		var len = 1. / Math.sqrt(_this.nx * _this.nx + _this.ny * _this.ny + _this.nz * _this.nz);
		_this.nx *= len;
		_this.ny *= len;
		_this.nz *= len;
		_this.d *= len;
		var _this = this.pright;
		var len = 1. / Math.sqrt(_this.nx * _this.nx + _this.ny * _this.ny + _this.nz * _this.nz);
		_this.nx *= len;
		_this.ny *= len;
		_this.nz *= len;
		_this.d *= len;
		var _this = this.ptop;
		var len = 1. / Math.sqrt(_this.nx * _this.nx + _this.ny * _this.ny + _this.nz * _this.nz);
		_this.nx *= len;
		_this.ny *= len;
		_this.nz *= len;
		_this.d *= len;
		var _this = this.pbottom;
		var len = 1. / Math.sqrt(_this.nx * _this.nx + _this.ny * _this.ny + _this.nz * _this.nz);
		_this.nx *= len;
		_this.ny *= len;
		_this.nz *= len;
		_this.d *= len;
		var _this = this.pnear;
		var len = 1. / Math.sqrt(_this.nx * _this.nx + _this.ny * _this.ny + _this.nz * _this.nz);
		_this.nx *= len;
		_this.ny *= len;
		_this.nz *= len;
		_this.d *= len;
		var _this = this.pfar;
		var len = 1. / Math.sqrt(_this.nx * _this.nx + _this.ny * _this.ny + _this.nz * _this.nz);
		_this.nx *= len;
		_this.ny *= len;
		_this.nz *= len;
		_this.d *= len;
	}
	,hasSphere: function(s) {
		var x = s.x;
		var y = s.y;
		var z = s.z;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		var p_x = x;
		var p_y = y;
		var p_z = z;
		var _this = this.pleft;
		if(_this.nx * p_x + _this.ny * p_y + _this.nz * p_z - _this.d < -s.r) {
			return false;
		}
		var _this = this.pright;
		if(_this.nx * p_x + _this.ny * p_y + _this.nz * p_z - _this.d < -s.r) {
			return false;
		}
		var _this = this.ptop;
		if(_this.nx * p_x + _this.ny * p_y + _this.nz * p_z - _this.d < -s.r) {
			return false;
		}
		var _this = this.pbottom;
		if(_this.nx * p_x + _this.ny * p_y + _this.nz * p_z - _this.d < -s.r) {
			return false;
		}
		if(this.checkNearFar) {
			var _this = this.pnear;
			if(_this.nx * p_x + _this.ny * p_y + _this.nz * p_z - _this.d < -s.r) {
				return false;
			}
			var _this = this.pfar;
			if(_this.nx * p_x + _this.ny * p_y + _this.nz * p_z - _this.d < -s.r) {
				return false;
			}
		}
		return true;
	}
	,hasBounds: function(b) {
		var p = this.pleft;
		var a = p.nx;
		var b1 = p.ny;
		var c = p.nz;
		var dd = a * (b.xMax + b.xMin) + b1 * (b.yMax + b.yMin) + c * (b.zMax + b.zMin);
		if(a < 0) {
			a = -a;
		}
		if(b1 < 0) {
			b1 = -b1;
		}
		if(c < 0) {
			c = -c;
		}
		var rr = a * (b.xMax - b.xMin) + b1 * (b.yMax - b.yMin) + c * (b.zMax - b.zMin);
		if(dd + rr - p.d * 2 < 0) {
			return false;
		}
		var p = this.pright;
		var a = p.nx;
		var b1 = p.ny;
		var c = p.nz;
		var dd = a * (b.xMax + b.xMin) + b1 * (b.yMax + b.yMin) + c * (b.zMax + b.zMin);
		if(a < 0) {
			a = -a;
		}
		if(b1 < 0) {
			b1 = -b1;
		}
		if(c < 0) {
			c = -c;
		}
		var rr = a * (b.xMax - b.xMin) + b1 * (b.yMax - b.yMin) + c * (b.zMax - b.zMin);
		if(dd + rr - p.d * 2 < 0) {
			return false;
		}
		var p = this.ptop;
		var a = p.nx;
		var b1 = p.ny;
		var c = p.nz;
		var dd = a * (b.xMax + b.xMin) + b1 * (b.yMax + b.yMin) + c * (b.zMax + b.zMin);
		if(a < 0) {
			a = -a;
		}
		if(b1 < 0) {
			b1 = -b1;
		}
		if(c < 0) {
			c = -c;
		}
		var rr = a * (b.xMax - b.xMin) + b1 * (b.yMax - b.yMin) + c * (b.zMax - b.zMin);
		if(dd + rr - p.d * 2 < 0) {
			return false;
		}
		var p = this.ptop;
		var a = p.nx;
		var b1 = p.ny;
		var c = p.nz;
		var dd = a * (b.xMax + b.xMin) + b1 * (b.yMax + b.yMin) + c * (b.zMax + b.zMin);
		if(a < 0) {
			a = -a;
		}
		if(b1 < 0) {
			b1 = -b1;
		}
		if(c < 0) {
			c = -c;
		}
		var rr = a * (b.xMax - b.xMin) + b1 * (b.yMax - b.yMin) + c * (b.zMax - b.zMin);
		if(dd + rr - p.d * 2 < 0) {
			return false;
		}
		var p = this.pnear;
		var a = p.nx;
		var b1 = p.ny;
		var c = p.nz;
		var dd = a * (b.xMax + b.xMin) + b1 * (b.yMax + b.yMin) + c * (b.zMax + b.zMin);
		if(a < 0) {
			a = -a;
		}
		if(b1 < 0) {
			b1 = -b1;
		}
		if(c < 0) {
			c = -c;
		}
		var rr = a * (b.xMax - b.xMin) + b1 * (b.yMax - b.yMin) + c * (b.zMax - b.zMin);
		if(dd + rr - p.d * 2 < 0) {
			return false;
		}
		var p = this.pfar;
		var a = p.nx;
		var b1 = p.ny;
		var c = p.nz;
		var dd = a * (b.xMax + b.xMin) + b1 * (b.yMax + b.yMin) + c * (b.zMax + b.zMin);
		if(a < 0) {
			a = -a;
		}
		if(b1 < 0) {
			b1 = -b1;
		}
		if(c < 0) {
			c = -c;
		}
		var rr = a * (b.xMax - b.xMin) + b1 * (b.yMax - b.yMin) + c * (b.zMax - b.zMin);
		if(dd + rr - p.d * 2 < 0) {
			return false;
		}
		return true;
	}
	,__class__: h3d_col_Frustum
};
var h3d_col_Ray = function() {
};
h3d_col_Ray.__name__ = "h3d.col.Ray";
h3d_col_Ray.prototype = {
	normalize: function() {
		var l = this.lx * this.lx + this.ly * this.ly + this.lz * this.lz;
		if(l == 1.) {
			return;
		}
		if(l < 1e-10) {
			l = 0;
		} else {
			l = 1. / Math.sqrt(l);
		}
		this.lx *= l;
		this.ly *= l;
		this.lz *= l;
	}
	,__class__: h3d_col_Ray
};
var h3d_col_Plane = function(nx,ny,nz,d) {
	this.nx = nx;
	this.ny = ny;
	this.nz = nz;
	this.d = d;
};
h3d_col_Plane.__name__ = "h3d.col.Plane";
h3d_col_Plane.prototype = {
	__class__: h3d_col_Plane
};
var h3d_col_Point = function(x,y,z) {
	if(z == null) {
		z = 0.;
	}
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	this.x = x;
	this.y = y;
	this.z = z;
};
h3d_col_Point.__name__ = "h3d.col.Point";
h3d_col_Point.prototype = {
	__class__: h3d_col_Point
};
var h3d_col_Sphere = function(x,y,z,r) {
	if(r == null) {
		r = 0.;
	}
	if(z == null) {
		z = 0.;
	}
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	var sx = x;
	var sy = y;
	var sz = z;
	var sr = r;
	if(sr == null) {
		sr = 0.;
	}
	if(sz == null) {
		sz = 0.;
	}
	if(sy == null) {
		sy = 0.;
	}
	if(sx == null) {
		sx = 0.;
	}
	this.x = sx;
	this.y = sy;
	this.z = sz;
	this.r = sr;
};
h3d_col_Sphere.__name__ = "h3d.col.Sphere";
h3d_col_Sphere.prototype = {
	rayIntersection: function(r,bestMatch) {
		var r2 = this.r * this.r;
		var px = r.px + r.lx;
		var py = r.py + r.ly;
		var pz = r.pz + r.lz;
		var a = r.lx * r.lx + r.ly * r.ly + r.lz * r.lz;
		var b = 2 * r.lx * (this.x - px) + 2 * r.ly * (this.y - py) + 2 * r.lz * (this.z - pz);
		var c = this.x * this.x + this.y * this.y + this.z * this.z + (px * px + py * py + pz * pz) - 2 * (this.x * px + this.y * py + this.z * pz) - r2;
		var d = b * b - 4 * a * c;
		if(d < 0) {
			return -1;
		}
		d = Math.sqrt(d);
		var t = (-b + d) / (2 * a);
		return 1 - t;
	}
	,inFrustum: function(f,m) {
		if(m != null) {
			return this.inFrustumMatrix(f,m);
		}
		return f.hasSphere(this);
	}
	,inFrustumMatrix: function(f,m) {
		var oldX = this.x;
		var oldY = this.y;
		var oldZ = this.z;
		var oldR = this.r;
		var x = this.x;
		var y = this.y;
		var z = this.z;
		if(z == null) {
			z = 0.;
		}
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		var v_x = x;
		var v_y = y;
		var v_z = z;
		var px = v_x * m._11 + v_y * m._21 + v_z * m._31 + m._41;
		var py = v_x * m._12 + v_y * m._22 + v_z * m._32 + m._42;
		var pz = v_x * m._13 + v_y * m._23 + v_z * m._33 + m._43;
		v_x = px;
		v_y = py;
		v_z = pz;
		this.x = v_x;
		this.y = v_y;
		this.z = v_z;
		var v = null;
		if(v == null) {
			v = new h3d_Vector();
		}
		v.x = Math.sqrt(m._11 * m._11 + m._12 * m._12 + m._13 * m._13);
		v.y = Math.sqrt(m._21 * m._21 + m._22 * m._22 + m._23 * m._23);
		v.z = Math.sqrt(m._31 * m._31 + m._32 * m._32 + m._33 * m._33);
		if(m._11 * (m._22 * m._33 - m._23 * m._32) + m._12 * (m._23 * m._31 - m._21 * m._33) + m._13 * (m._21 * m._32 - m._22 * m._31) < 0) {
			v.x *= -1;
			v.y *= -1;
			v.z *= -1;
		}
		var scale = v;
		this.r *= Math.max(Math.max(scale.x,scale.y),scale.z);
		var res = f.hasSphere(this);
		this.x = oldX;
		this.y = oldY;
		this.z = oldZ;
		this.r = oldR;
		return res;
	}
	,__class__: h3d_col_Sphere
};
var h3d_impl_Feature = $hxEnums["h3d.impl.Feature"] = { __ename__:true,__constructs__:null
	,StandardDerivatives: {_hx_name:"StandardDerivatives",_hx_index:0,__enum__:"h3d.impl.Feature",toString:$estr}
	,FloatTextures: {_hx_name:"FloatTextures",_hx_index:1,__enum__:"h3d.impl.Feature",toString:$estr}
	,AllocDepthBuffer: {_hx_name:"AllocDepthBuffer",_hx_index:2,__enum__:"h3d.impl.Feature",toString:$estr}
	,HardwareAccelerated: {_hx_name:"HardwareAccelerated",_hx_index:3,__enum__:"h3d.impl.Feature",toString:$estr}
	,MultipleRenderTargets: {_hx_name:"MultipleRenderTargets",_hx_index:4,__enum__:"h3d.impl.Feature",toString:$estr}
	,Queries: {_hx_name:"Queries",_hx_index:5,__enum__:"h3d.impl.Feature",toString:$estr}
	,SRGBTextures: {_hx_name:"SRGBTextures",_hx_index:6,__enum__:"h3d.impl.Feature",toString:$estr}
	,ShaderModel3: {_hx_name:"ShaderModel3",_hx_index:7,__enum__:"h3d.impl.Feature",toString:$estr}
	,BottomLeftCoords: {_hx_name:"BottomLeftCoords",_hx_index:8,__enum__:"h3d.impl.Feature",toString:$estr}
	,Wireframe: {_hx_name:"Wireframe",_hx_index:9,__enum__:"h3d.impl.Feature",toString:$estr}
	,InstancedRendering: {_hx_name:"InstancedRendering",_hx_index:10,__enum__:"h3d.impl.Feature",toString:$estr}
};
h3d_impl_Feature.__constructs__ = [h3d_impl_Feature.StandardDerivatives,h3d_impl_Feature.FloatTextures,h3d_impl_Feature.AllocDepthBuffer,h3d_impl_Feature.HardwareAccelerated,h3d_impl_Feature.MultipleRenderTargets,h3d_impl_Feature.Queries,h3d_impl_Feature.SRGBTextures,h3d_impl_Feature.ShaderModel3,h3d_impl_Feature.BottomLeftCoords,h3d_impl_Feature.Wireframe,h3d_impl_Feature.InstancedRendering];
h3d_impl_Feature.__empty_constructs__ = [h3d_impl_Feature.StandardDerivatives,h3d_impl_Feature.FloatTextures,h3d_impl_Feature.AllocDepthBuffer,h3d_impl_Feature.HardwareAccelerated,h3d_impl_Feature.MultipleRenderTargets,h3d_impl_Feature.Queries,h3d_impl_Feature.SRGBTextures,h3d_impl_Feature.ShaderModel3,h3d_impl_Feature.BottomLeftCoords,h3d_impl_Feature.Wireframe,h3d_impl_Feature.InstancedRendering];
var h3d_impl_RenderFlag = $hxEnums["h3d.impl.RenderFlag"] = { __ename__:true,__constructs__:null
	,CameraHandness: {_hx_name:"CameraHandness",_hx_index:0,__enum__:"h3d.impl.RenderFlag",toString:$estr}
};
h3d_impl_RenderFlag.__constructs__ = [h3d_impl_RenderFlag.CameraHandness];
h3d_impl_RenderFlag.__empty_constructs__ = [h3d_impl_RenderFlag.CameraHandness];
var h3d_impl_InputNames = function(names) {
	this.id = h3d_impl_InputNames.UID++;
	this.names = names;
};
h3d_impl_InputNames.__name__ = "h3d.impl.InputNames";
h3d_impl_InputNames.get = function(names) {
	var key = names.join("|");
	var i = h3d_impl_InputNames.CACHE.h[key];
	if(i == null) {
		i = new h3d_impl_InputNames(names.slice());
		h3d_impl_InputNames.CACHE.h[key] = i;
	}
	return i;
};
h3d_impl_InputNames.prototype = {
	__class__: h3d_impl_InputNames
};
var h3d_impl_Driver = function() { };
h3d_impl_Driver.__name__ = "h3d.impl.Driver";
h3d_impl_Driver.prototype = {
	hasFeature: function(f) {
		return false;
	}
	,setRenderFlag: function(r,value) {
	}
	,isSupportedFormat: function(fmt) {
		return false;
	}
	,isDisposed: function() {
		return true;
	}
	,begin: function(frame) {
	}
	,generateMipMaps: function(texture) {
		throw haxe_Exception.thrown("Mipmaps auto generation is not supported on this platform");
	}
	,clear: function(color,depth,stencil) {
	}
	,init: function(onCreate,forceSoftware) {
		if(forceSoftware == null) {
			forceSoftware = false;
		}
	}
	,resize: function(width,height) {
	}
	,selectShader: function(shader) {
		return false;
	}
	,selectMaterial: function(pass) {
	}
	,uploadShaderBuffers: function(buffers,which) {
	}
	,selectBuffer: function(buffer) {
	}
	,draw: function(ibuf,startIndex,ntriangles) {
	}
	,setRenderZone: function(x,y,width,height) {
	}
	,setRenderTarget: function(tex,layer,mipLevel) {
		if(mipLevel == null) {
			mipLevel = 0;
		}
		if(layer == null) {
			layer = 0;
		}
	}
	,setRenderTargets: function(textures) {
	}
	,allocDepthBuffer: function(b) {
		return null;
	}
	,disposeDepthBuffer: function(b) {
	}
	,getDefaultDepthBuffer: function() {
		return null;
	}
	,end: function() {
	}
	,setDebug: function(b) {
	}
	,allocTexture: function(t) {
		return null;
	}
	,allocIndexes: function(count,is32) {
		return null;
	}
	,allocVertexes: function(m) {
		return null;
	}
	,disposeTexture: function(t) {
	}
	,disposeIndexes: function(i) {
	}
	,disposeVertexes: function(v) {
	}
	,uploadIndexBuffer: function(i,startIndice,indiceCount,buf,bufPos) {
	}
	,uploadVertexBuffer: function(v,startVertex,vertexCount,buf,bufPos) {
	}
	,uploadTexturePixels: function(t,pixels,mipLevel,side) {
	}
	,copyTexture: function(from,to) {
		return false;
	}
	,__class__: h3d_impl_Driver
};
var h3d_impl__$GlDriver_CompiledShader = function(s,vertex,shader) {
	this.s = s;
	this.vertex = vertex;
	this.shader = shader;
};
h3d_impl__$GlDriver_CompiledShader.__name__ = "h3d.impl._GlDriver.CompiledShader";
h3d_impl__$GlDriver_CompiledShader.prototype = {
	__class__: h3d_impl__$GlDriver_CompiledShader
};
var h3d_impl__$GlDriver_CompiledAttribute = function() {
};
h3d_impl__$GlDriver_CompiledAttribute.__name__ = "h3d.impl._GlDriver.CompiledAttribute";
h3d_impl__$GlDriver_CompiledAttribute.prototype = {
	__class__: h3d_impl__$GlDriver_CompiledAttribute
};
var h3d_impl__$GlDriver_CompiledProgram = function() {
};
h3d_impl__$GlDriver_CompiledProgram.__name__ = "h3d.impl._GlDriver.CompiledProgram";
h3d_impl__$GlDriver_CompiledProgram.prototype = {
	__class__: h3d_impl__$GlDriver_CompiledProgram
};
var h3d_impl_GlDriver = function(antiAlias) {
	if(antiAlias == null) {
		antiAlias = 0;
	}
	this.features = new haxe_ds_EnumValueMap();
	this.maxCompressedTexturesSupport = 0;
	this.rightHanded = false;
	this.firstShader = true;
	this.boundTextures = [];
	this.curTargets = [];
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
	this.currentDivisor = _g;
	this.curColorMask = -1;
	this.lastActiveIndex = 0;
	this.curStEnabled = false;
	this.curStMaskBits = -1;
	this.curStOpBits = -1;
	this.curMatBits = -1;
	this.maxIdxCurAttribs = 0;
	this.curAttribs = [];
	this.canvas = hxd_Window.getInstance().canvas;
	var options = { alpha : false, stencil : true, antialias : antiAlias > 0};
	if(h3d_impl_GlDriver.ALLOW_WEBGL2) {
		this.gl = this.canvas.getContext("webgl2",options);
	}
	if(this.gl == null) {
		this.gl = js_html__$CanvasElement_CanvasUtil.getContextWebGL(this.canvas,options);
	}
	if(this.gl == null) {
		throw haxe_Exception.thrown("Could not acquire GL context");
	}
	if(typeof(WebGLDebugUtils) != "undefined") {
		this.gl = WebGLDebugUtils.makeDebugContext(this.gl);
		this.glDebug = true;
	}
	this.commonFB = this.gl.createFramebuffer();
	this.programs = new haxe_ds_IntMap();
	this.defStencil = new h3d_mat_Stencil();
	var v = this.gl.getParameter(7938);
	var reg = new EReg("ES ([0-9]+\\.[0-9]+)","");
	if(reg.match(v)) {
		this.glES = parseFloat(reg.matched(1));
	}
	var reg = new EReg("[0-9]+\\.[0-9]+","");
	var v = this.gl.getParameter(35724);
	if(reg.match(v)) {
		this.glES = parseFloat(reg.matched(0));
		this.shaderVersion = Math.round(parseFloat(reg.matched(0)) * 100);
	}
	this.drawMode = 4;
	this.makeFeatures();
	if(this.hasFeature(h3d_impl_Feature.InstancedRendering) && this.glES < 3) {
		var extension = this.gl.getExtension("ANGLE_instanced_arrays");
		this.gl["vertexAttribDivisor"] = $bind(extension,extension.vertexAttribDivisorANGLE);
		this.gl["drawElementsInstanced"] = $bind(extension,extension.drawElementsInstancedANGLE);
	}
	hxsl_SharedShader.UNROLL_LOOPS = !this.hasFeature(h3d_impl_Feature.ShaderModel3);
	this.gl.pixelStorei(3333,1);
	this.gl.pixelStorei(3317,1);
};
h3d_impl_GlDriver.__name__ = "h3d.impl.GlDriver";
h3d_impl_GlDriver.__super__ = h3d_impl_Driver;
h3d_impl_GlDriver.prototype = $extend(h3d_impl_Driver.prototype,{
	setRenderFlag: function(r,value) {
		this.rightHanded = value > 0;
	}
	,setDebug: function(d) {
		this.debug = d;
	}
	,begin: function(frame) {
		this.frame = frame;
		this.resetStream();
		this.gl.useProgram(null);
		this.curShader = null;
		this.curBuffer = null;
	}
	,makeCompiler: function() {
		var glout = new hxsl_GlslOut();
		glout.glES = this.glES;
		glout.version = this.shaderVersion;
		glout.intelDriverFix = this.isIntelGpu;
		return glout;
	}
	,getDriverName: function(details) {
		var render = this.gl.getParameter(7937);
		if(details) {
			render += " GLv" + Std.string(this.gl.getParameter(7938));
		} else {
			render = render.split("/").shift();
		}
		render = render.split("WebGL ").join("");
		return "OpenGL " + render;
	}
	,compileShader: function(glout,shader) {
		var type = shader.vertex ? 35633 : 35632;
		var s = this.gl.createShader(type);
		if(shader.code == null) {
			shader.code = glout.run(shader.data);
			shader.data.funs = null;
		}
		this.gl.shaderSource(s,shader.code);
		this.gl.compileShader(s);
		var log = this.gl.getShaderInfoLog(s);
		if(this.gl.getShaderParameter(s,35713) != 1) {
			var log = this.gl.getShaderInfoLog(s);
			var lid = Std.parseInt(HxOverrides.substr(log,9,null));
			var line = lid == null ? null : shader.code.split("\n")[lid - 1];
			if(line == null) {
				line = "";
			} else {
				line = "(" + StringTools.trim(line) + ")";
			}
			var codeLines = shader.code.split("\n");
			var _g = 0;
			var _g1 = codeLines.length;
			while(_g < _g1) {
				var i = _g++;
				codeLines[i] = i + 1 + "\t" + codeLines[i];
			}
			throw haxe_Exception.thrown("An error occurred compiling the shaders: " + log + line + "\n\n" + codeLines.join("\n"));
		}
		return new h3d_impl__$GlDriver_CompiledShader(s,shader.vertex,shader);
	}
	,initShader: function(p,s,shader,rt) {
		var prefix = s.vertex ? "vertex" : "fragment";
		s.globals = this.gl.getUniformLocation(p.p,prefix + "Globals");
		s.params = this.gl.getUniformLocation(p.p,prefix + "Params");
		s.textures = [];
		var index = 0;
		var curT = null;
		var mode = 0;
		var name = "";
		var t = shader.textures;
		while(t != null) {
			var tt = t.type;
			var count = 1;
			switch(tt._hx_index) {
			case 15:
				var _g = tt.size;
				if(_g._hx_index == 0) {
					var n = _g.v;
					var t1 = tt.t;
					tt = t1;
					count = n;
				}
				break;
			case 17:
				var _g1 = tt.size;
				tt = hxsl_Type.TSampler2D;
				break;
			default:
			}
			if(tt != curT) {
				curT = tt;
				switch(tt._hx_index) {
				case 10:
					mode = 3553;
					name = "Textures";
					break;
				case 11:
					mode = 35866;
					name = "TexturesArray";
					break;
				case 12:
					mode = 34067;
					name = "TexturesCube";
					break;
				default:
					throw haxe_Exception.thrown("Unsupported texture type " + Std.string(tt));
				}
				index = 0;
			}
			var _g2 = 0;
			var _g3 = count;
			while(_g2 < _g3) {
				var i = _g2++;
				var loc = this.gl.getUniformLocation(p.p,prefix + name + "[" + index + "]");
				if(loc == null) {
					throw haxe_Exception.thrown("Texture " + rt.spec.instances[t.instance].shader.data.name + "." + t.name + " is missing from shader output");
				}
				s.textures.push({ u : loc, t : curT, mode : mode});
				++index;
			}
			t = t.next;
		}
		if(shader.bufferCount > 0) {
			var _g = [];
			var _g1 = 0;
			var _g2 = shader.bufferCount;
			while(_g1 < _g2) {
				var i = _g1++;
				_g.push(this.gl.getUniformBlockIndex(p.p,(shader.vertex ? "vertex_" : "") + "uniform_buffer" + i));
			}
			s.buffers = _g;
			var start = 0;
			if(!s.vertex) {
				start = rt.vertex.bufferCount;
			}
			var _g = 0;
			var _g1 = shader.bufferCount;
			while(_g < _g1) {
				var i = _g++;
				this.gl.uniformBlockBinding(p.p,s.buffers[i],i + start);
			}
		}
	}
	,selectShader: function(shader) {
		var p = this.programs.h[shader.id];
		if(p == null) {
			p = new h3d_impl__$GlDriver_CompiledProgram();
			var glout = this.makeCompiler();
			p.vertex = this.compileShader(glout,shader.vertex);
			p.fragment = this.compileShader(glout,shader.fragment);
			p.p = this.gl.createProgram();
			this.gl.attachShader(p.p,p.vertex.s);
			this.gl.attachShader(p.p,p.fragment.s);
			var log = null;
			try {
				this.gl.linkProgram(p.p);
				if(this.gl.getProgramParameter(p.p,35714) != 1) {
					log = this.gl.getProgramInfoLog(p.p);
				}
			} catch( _g ) {
				var e = haxe_Exception.caught(_g).unwrap();
				throw haxe_Exception.thrown("Shader linkage error: " + Std.string(e) + " (" + this.getDriverName(false) + ")");
			}
			this.gl.deleteShader(p.vertex.s);
			this.gl.deleteShader(p.fragment.s);
			if(log != null) {
				this.gl.deleteProgram(p.p);
				throw haxe_Exception.thrown("Program linkage failure: " + log + "\nVertex=\n" + shader.vertex.code + "\n\nFragment=\n" + shader.fragment.code);
			}
			this.firstShader = false;
			this.initShader(p,p.vertex,shader.vertex,shader);
			this.initShader(p,p.fragment,shader.fragment,shader);
			var attribNames = [];
			p.attribs = [];
			p.hasAttribIndex = [];
			p.stride = 0;
			var _g = 0;
			var _g1 = shader.vertex.data.vars;
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				if(v.kind._hx_index == 1) {
					var t = 5126;
					var size;
					var _g2 = v.type;
					switch(_g2._hx_index) {
					case 3:
						size = 1;
						break;
					case 5:
						var _g3 = _g2.t;
						var n = _g2.size;
						size = n;
						break;
					case 9:
						var n1 = _g2.size;
						t = 5120;
						size = n1;
						break;
					default:
						throw haxe_Exception.thrown("assert " + Std.string(v.type));
					}
					var index = this.gl.getAttribLocation(p.p,glout.varNames.h.hasOwnProperty(v.id) ? glout.varNames.h[v.id] : v.name);
					if(index < 0) {
						p.stride += size;
						continue;
					}
					var a = new h3d_impl__$GlDriver_CompiledAttribute();
					a.type = t;
					a.size = size;
					a.index = index;
					a.offset = p.stride;
					a.divisor = 0;
					if(v.qualifiers != null) {
						var _g4 = 0;
						var _g5 = v.qualifiers;
						while(_g4 < _g5.length) {
							var q = _g5[_g4];
							++_g4;
							if(q._hx_index == 9) {
								var n2 = q.v;
								a.divisor = n2;
							}
						}
					}
					p.attribs.push(a);
					p.hasAttribIndex[a.index] = true;
					attribNames.push(v.name);
					p.stride += size;
				}
			}
			p.inputs = h3d_impl_InputNames.get(attribNames);
			this.programs.h[shader.id] = p;
		}
		if(this.curShader == p) {
			return false;
		}
		this.setProgram(p);
		return true;
	}
	,setProgram: function(p) {
		this.gl.useProgram(p.p);
		var _g = 0;
		var _g1 = p.attribs;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(!this.curAttribs[a.index]) {
				this.gl.enableVertexAttribArray(a.index);
				this.curAttribs[a.index] = true;
				if(this.maxIdxCurAttribs < a.index) {
					this.maxIdxCurAttribs = a.index;
				}
			}
		}
		var lastIdxCurAttribTrue = 0;
		var _g = 0;
		var _g1 = this.maxIdxCurAttribs + 1;
		while(_g < _g1) {
			var i = _g++;
			if(this.curAttribs[i] && !p.hasAttribIndex[i]) {
				this.gl.disableVertexAttribArray(i);
				this.curAttribs[i] = false;
			} else if(this.curAttribs[i]) {
				lastIdxCurAttribTrue = i;
			}
		}
		this.maxIdxCurAttribs = lastIdxCurAttribTrue;
		this.curShader = p;
		this.curBuffer = null;
		var _g = 0;
		var _g1 = this.boundTextures.length;
		while(_g < _g1) {
			var i = _g++;
			this.boundTextures[i] = null;
		}
	}
	,uploadShaderBuffers: function(buf,which) {
		this.uploadBuffer(buf,this.curShader.vertex,buf.vertex,which);
		this.uploadBuffer(buf,this.curShader.fragment,buf.fragment,which);
	}
	,uploadBuffer: function(buffer,s,buf,which) {
		switch(which) {
		case 0:
			if(s.globals != null) {
				var a = buf.globals.subarray(0,s.shader.globalsSize * 4);
				this.gl.uniform4fv(s.globals,a);
			}
			break;
		case 1:
			if(s.params != null) {
				var a = buf.params.subarray(0,s.shader.paramsSize * 4);
				this.gl.uniform4fv(s.params,a);
			}
			break;
		case 2:
			var tcount = s.textures.length;
			var _g = 0;
			var _g1 = s.textures.length;
			while(_g < _g1) {
				var i = _g++;
				var t = buf.tex[i];
				var pt = s.textures[i];
				if(t == null || t.t == null && t.realloc == null) {
					switch(pt.t._hx_index) {
					case 10:
						var color = h3d_mat_Defaults.loadingTextureColor;
						t = h3d_mat_Texture.fromColor(color,(color >>> 24) / 255);
						break;
					case 12:
						t = h3d_mat_Texture.defaultCubeTexture();
						break;
					default:
						throw haxe_Exception.thrown("Missing texture");
					}
				}
				if(t != null && t.t == null && t.realloc != null) {
					var s1 = this.curShader;
					t.alloc();
					t.realloc();
					if(this.curShader != s1) {
						this.setProgram(s1);
						this.uploadShaderBuffers(buffer,0);
						this.uploadShaderBuffers(buffer,1);
						this.uploadShaderBuffers(buffer,2);
						return;
					}
				}
				t.set_lastFrame(this.frame);
				if(pt.u == null) {
					continue;
				}
				var idx = s.vertex ? i : this.curShader.vertex.textures.length + i;
				if(this.boundTextures[idx] != t.t) {
					this.boundTextures[idx] = t.t;
					var mode = this.getBindType(t);
					if(mode != pt.mode) {
						throw haxe_Exception.thrown("Texture format mismatch: " + Std.string(t) + " should be " + Std.string(pt.t));
					}
					this.gl.activeTexture(33984 + idx);
					this.gl.uniform1i(pt.u,idx);
					this.gl.bindTexture(mode,t.t.t);
					this.lastActiveIndex = idx;
				}
				var mip = t.mipMap._hx_index;
				var filter = t.filter._hx_index;
				var wrap = t.wrap._hx_index;
				var bits = mip | filter << 3 | wrap << 6;
				if(bits != t.t.bits) {
					t.t.bits = bits;
					var flags = h3d_impl_GlDriver.TFILTERS[mip][filter];
					var mode1 = pt.mode;
					this.gl.texParameteri(mode1,10240,flags[0]);
					this.gl.texParameteri(mode1,10241,flags[1]);
					var w = h3d_impl_GlDriver.TWRAP[wrap];
					this.gl.texParameteri(mode1,10242,w);
					this.gl.texParameteri(mode1,10243,w);
				}
				if(t.lodBias != t.t.bias) {
					t.t.bias = t.lodBias;
					this.gl.texParameterf(pt.mode,34045,t.lodBias);
				}
			}
			break;
		case 3:
			if(s.buffers != null) {
				var start = 0;
				if(!s.vertex && this.curShader.vertex.buffers != null) {
					start = this.curShader.vertex.buffers.length;
				}
				var _g = 0;
				var _g1 = s.buffers.length;
				while(_g < _g1) {
					var i = _g++;
					this.gl.bindBufferBase(35345,i + start,buf.buffers[i].buffer.vbuf.b);
				}
			}
			break;
		}
	}
	,selectMaterial: function(pass) {
		var bits = pass.bits;
		if(this.curTarget == null == this.rightHanded) {
			switch(pass.culling._hx_index) {
			case 1:
				bits = bits & -4 | 2;
				break;
			case 2:
				bits = bits & -4 | 1;
				break;
			default:
			}
		}
		this.selectMaterialBits(bits);
		if(this.curColorMask != pass.colorMask) {
			var m = pass.colorMask;
			this.gl.colorMask((m & 1) != 0,(m & 2) != 0,(m & 4) != 0,(m & 8) != 0);
			this.curColorMask = m;
		}
		var s = this.defStencil;
		if(pass.stencil == null) {
			if(this.curStEnabled) {
				this.gl.disable(2960);
				this.curStEnabled = false;
			}
		} else {
			s = pass.stencil;
			if(!this.curStEnabled) {
				this.gl.enable(2960);
				this.curStEnabled = true;
			}
		}
		this.selectStencilBits(s.opBits,s.maskBits);
	}
	,selectMaterialBits: function(bits) {
		var diff = bits ^ this.curMatBits;
		if(this.curMatBits < 0) {
			diff = -1;
		}
		if(diff == 0) {
			return;
		}
		var wireframe = (bits & 268435456) != 0;
		this.drawMode = wireframe ? 3 : 4;
		if((diff & 3) != 0) {
			var cull = bits & 3;
			if(cull == 0) {
				this.gl.disable(2884);
			} else {
				if(this.curMatBits < 0 || (this.curMatBits & 3) == 0) {
					this.gl.enable(2884);
				}
				this.gl.cullFace(h3d_impl_GlDriver.FACES[cull]);
			}
		}
		if((diff & 4194240) != 0) {
			var csrc = bits >> 6 & 15;
			var cdst = bits >> 10 & 15;
			var asrc = bits >> 14 & 15;
			var adst = bits >> 18 & 15;
			if(csrc == asrc && cdst == adst) {
				if(csrc == 0 && cdst == 1) {
					this.gl.disable(3042);
				} else {
					if(this.curMatBits < 0 || (this.curMatBits >> 6 & 15) == 0 && (this.curMatBits >> 10 & 15) == 1) {
						this.gl.enable(3042);
					}
					this.gl.blendFunc(h3d_impl_GlDriver.BLEND[csrc],h3d_impl_GlDriver.BLEND[cdst]);
				}
			} else {
				if(this.curMatBits < 0 || (this.curMatBits >> 6 & 15) == 0 && (this.curMatBits >> 10 & 15) == 1) {
					this.gl.enable(3042);
				}
				this.gl.blendFuncSeparate(h3d_impl_GlDriver.BLEND[csrc],h3d_impl_GlDriver.BLEND[cdst],h3d_impl_GlDriver.BLEND[asrc],h3d_impl_GlDriver.BLEND[adst]);
			}
		}
		if((diff & 264241152) != 0) {
			var cop = bits >> 22 & 7;
			var aop = bits >> 25 & 7;
			if(cop == aop) {
				this.gl.blendEquation(h3d_impl_GlDriver.OP[cop]);
			} else {
				this.gl.blendEquationSeparate(h3d_impl_GlDriver.OP[cop],h3d_impl_GlDriver.OP[aop]);
			}
		}
		if((diff & 4) != 0) {
			this.gl.depthMask((bits >> 2 & 1) != 0);
		}
		if((diff & 56) != 0) {
			var cmp = bits >> 3 & 7;
			if(cmp == 0) {
				this.gl.disable(2929);
			} else {
				if(this.curMatBits < 0 || (this.curMatBits >> 3 & 7) == 0) {
					this.gl.enable(2929);
				}
				this.gl.depthFunc(h3d_impl_GlDriver.COMPARE[cmp]);
			}
		}
		this.curMatBits = bits;
	}
	,selectStencilBits: function(opBits,maskBits) {
		var diffOp = opBits ^ this.curStOpBits;
		var diffMask = maskBits ^ this.curStMaskBits;
		if((diffOp | diffMask) == 0) {
			return;
		}
		if((diffOp & 4088) != 0) {
			this.gl.stencilOpSeparate(h3d_impl_GlDriver.FACES[2],h3d_impl_GlDriver.STENCIL_OP[opBits >> 6 & 7],h3d_impl_GlDriver.STENCIL_OP[opBits >> 9 & 7],h3d_impl_GlDriver.STENCIL_OP[opBits >> 3 & 7]);
		}
		if((diffOp & 16744448) != 0) {
			this.gl.stencilOpSeparate(h3d_impl_GlDriver.FACES[1],h3d_impl_GlDriver.STENCIL_OP[opBits >> 18 & 7],h3d_impl_GlDriver.STENCIL_OP[opBits >> 21 & 7],h3d_impl_GlDriver.STENCIL_OP[opBits >> 15 & 7]);
		}
		if((diffOp & 7 | diffMask & 16711935) != 0) {
			this.gl.stencilFuncSeparate(h3d_impl_GlDriver.FACES[2],h3d_impl_GlDriver.COMPARE[opBits & 7],maskBits >> 16 & 255,maskBits & 255);
		}
		if((diffOp & 28672 | diffMask & 16711935) != 0) {
			this.gl.stencilFuncSeparate(h3d_impl_GlDriver.FACES[1],h3d_impl_GlDriver.COMPARE[opBits >> 12 & 7],maskBits >> 16 & 255,maskBits & 255);
		}
		if((diffMask & 65280) != 0) {
			var w = maskBits >> 8 & 255;
			this.gl.stencilMaskSeparate(h3d_impl_GlDriver.FACES[2],w);
			this.gl.stencilMaskSeparate(h3d_impl_GlDriver.FACES[1],w);
		}
		this.curStOpBits = opBits;
		this.curStMaskBits = maskBits;
	}
	,clear: function(color,depth,stencil) {
		var bits = 0;
		if(color != null) {
			this.gl.colorMask(true,true,true,true);
			this.curColorMask = 15;
			this.gl.clearColor(color.x,color.y,color.z,color.w);
			bits |= 16384;
		}
		if(depth != null) {
			this.gl.depthMask(true);
			if(this.curMatBits >= 0) {
				this.curMatBits |= 4;
			}
			this.gl.clearDepth(depth);
			bits |= 256;
		}
		if(stencil != null) {
			this.selectStencilBits(this.defStencil.opBits,this.defStencil.maskBits);
			this.gl.clearStencil(stencil);
			bits |= 1024;
		}
		if(bits != 0) {
			this.gl.clear(bits);
		}
		if(this.curTarget != null) {
			this.curTarget.flags |= 1 << h3d_mat_TextureFlags.WasCleared._hx_index;
		}
	}
	,resize: function(width,height) {
		if(this.canvas.style.width == "") {
			var tmp = width / window.devicePixelRatio | 0;
			this.canvas.style.width = tmp + "px";
			var tmp = height / window.devicePixelRatio | 0;
			this.canvas.style.height = tmp + "px";
		}
		this.canvas.width = width;
		this.canvas.height = height;
		this.bufferWidth = width;
		this.bufferHeight = height;
		this.gl.viewport(0,0,width,height);
		if(this.defaultDepth != null) {
			this.disposeDepthBuffer(this.defaultDepth);
			this.defaultDepth.width = this.bufferWidth;
			this.defaultDepth.height = this.bufferHeight;
			this.defaultDepth.b = this.allocDepthBuffer(this.defaultDepth);
		}
	}
	,getChannels: function(t) {
		switch(t.internalFmt) {
		case 6407:
			return 6407;
		case 6408:
			return 6408;
		case 32856:
			return 32993;
		case 32857:
			return 6408;
		case 6403:case 33321:case 33325:case 33326:
			return 6403;
		case 33319:case 33323:case 33327:case 33328:
			return 33319;
		case 33777:case 33778:case 33779:
			return 6408;
		case 34837:case 34843:
			return 6407;
		case 35898:
			return 6407;
		case 35904:case 35905:
			return 6407;
		case 34836:case 34842:case 35906:case 35907:
			return 6408;
		default:
			throw haxe_Exception.thrown("Invalid format " + t.internalFmt);
		}
	}
	,isSupportedFormat: function(fmt) {
		switch(fmt._hx_index) {
		case 2:
			return true;
		case 3:case 4:
			return this.hasFeature(h3d_impl_Feature.FloatTextures);
		case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 16:case 17:
			return this.glES >= 3;
		case 14:case 15:
			return this.hasFeature(h3d_impl_Feature.SRGBTextures);
		case 21:
			var n = fmt.v;
			return n <= this.maxCompressedTexturesSupport;
		default:
			return false;
		}
	}
	,getBindType: function(t) {
		var isCube = (t.flags & 1 << h3d_mat_TextureFlags.Cube._hx_index) != 0;
		var isArray = (t.flags & 1 << h3d_mat_TextureFlags.IsArray._hx_index) != 0;
		if(isCube) {
			return 34067;
		} else if(isArray) {
			return 35866;
		} else {
			return 3553;
		}
	}
	,allocTexture: function(t) {
		var _gthis = this;
		if(h3d_impl_GlDriver.outOfMemoryCheck) {
			this.gl.getError();
		}
		var tt = this.gl.createTexture();
		var bind = this.getBindType(t);
		var tt1 = { t : tt, width : t.width, height : t.height, internalFmt : 6408, pixelFmt : 5121, bits : -1, bind : bind, bias : 0};
		var _g = t.format;
		switch(_g._hx_index) {
		case 1:
			tt1.internalFmt = 32856;
			break;
		case 2:
			break;
		case 3:
			if(this.hasFeature(h3d_impl_Feature.FloatTextures)) {
				tt1.pixelFmt = 5131;
				tt1.internalFmt = 34842;
			} else {
				throw haxe_Exception.thrown("Unsupported texture format " + Std.string(t.format));
			}
			break;
		case 4:
			if(this.hasFeature(h3d_impl_Feature.FloatTextures)) {
				tt1.internalFmt = 34836;
				tt1.pixelFmt = 5126;
			} else {
				throw haxe_Exception.thrown("Unsupported texture format " + Std.string(t.format));
			}
			break;
		case 5:
			tt1.internalFmt = 33321;
			break;
		case 6:
			tt1.internalFmt = 33325;
			tt1.pixelFmt = 5131;
			break;
		case 7:
			tt1.internalFmt = 33326;
			tt1.pixelFmt = 5126;
			break;
		case 8:
			tt1.internalFmt = 33323;
			break;
		case 9:
			tt1.internalFmt = 33327;
			tt1.pixelFmt = 5131;
			break;
		case 10:
			tt1.internalFmt = 33328;
			tt1.pixelFmt = 5126;
			break;
		case 11:
			tt1.internalFmt = 6407;
			break;
		case 12:
			tt1.internalFmt = 34843;
			tt1.pixelFmt = 5131;
			break;
		case 13:
			tt1.internalFmt = 34837;
			tt1.pixelFmt = 5126;
			break;
		case 14:
			tt1.internalFmt = 35905;
			break;
		case 15:
			tt1.internalFmt = 35907;
			break;
		case 16:
			tt1.internalFmt = 32857;
			tt1.pixelFmt = 33640;
			break;
		case 17:
			tt1.internalFmt = 35898;
			tt1.pixelFmt = 35899;
			break;
		case 21:
			var n = _g.v;
			if(n <= this.maxCompressedTexturesSupport) {
				if((t.width & 3) != 0 || (t.height & 3) != 0) {
					throw haxe_Exception.thrown("Compressed texture " + Std.string(t) + " has size " + t.width + "x" + t.height + " - must be a multiple of 4");
				}
				switch(n) {
				case 1:
					tt1.internalFmt = 33777;
					break;
				case 2:
					tt1.internalFmt = 33778;
					break;
				case 3:
					tt1.internalFmt = 33779;
					break;
				default:
					throw haxe_Exception.thrown("Unsupported texture format " + Std.string(t.format));
				}
			} else {
				throw haxe_Exception.thrown("Unsupported texture format " + Std.string(t.format));
			}
			break;
		default:
			throw haxe_Exception.thrown("Unsupported texture format " + Std.string(t.format));
		}
		t.set_lastFrame(this.frame);
		t.flags &= -1 - (1 << h3d_mat_TextureFlags.WasCleared._hx_index);
		this.gl.bindTexture(bind,tt1.t);
		var outOfMem = false;
		var _g = 0;
		var _g1 = t.get_mipLevels();
		while(_g < _g1) {
			var mip = _g++;
			var b = tt1.width >> mip;
			var w = 1 < b ? b : 1;
			var b1 = tt1.height >> mip;
			var h = 1 < b1 ? b1 : 1;
			if((t.flags & 1 << h3d_mat_TextureFlags.Cube._hx_index) != 0) {
				var _g2 = 0;
				while(_g2 < 6) {
					var i = _g2++;
					this.gl.texImage2D(h3d_impl_GlDriver.CUBE_FACES[i],mip,tt1.internalFmt,w,h,0,this.getChannels(tt1),tt1.pixelFmt,null);
					var tmp;
					if(!h3d_impl_GlDriver.outOfMemoryCheck) {
						tmp = false;
					} else {
						var err = _gthis.gl.getError();
						if(err == 1285) {
							outOfMem = true;
							tmp = true;
						} else {
							if(err != 0) {
								throw haxe_Exception.thrown("Failed to alloc texture " + Std.string(t.format) + "(error " + err + ")");
							}
							tmp = false;
						}
					}
					if(tmp) {
						break;
					}
				}
			} else if((t.flags & 1 << h3d_mat_TextureFlags.IsArray._hx_index) != 0) {
				this.gl.texImage3D(bind,mip,tt1.internalFmt,w,h,t.get_layerCount(),0,this.getChannels(tt1),tt1.pixelFmt,null);
				if(h3d_impl_GlDriver.outOfMemoryCheck) {
					var err1 = _gthis.gl.getError();
					if(err1 == 1285) {
						outOfMem = true;
					} else if(err1 != 0) {
						throw haxe_Exception.thrown("Failed to alloc texture " + Std.string(t.format) + "(error " + err1 + ")");
					}
				}
			} else {
				var _g3 = t.format;
				var tmp1;
				if(_g3._hx_index == 21) {
					var _g4 = _g3.v;
					tmp1 = true;
				} else {
					tmp1 = false;
				}
				if(!tmp1) {
					this.gl.texImage2D(bind,mip,tt1.internalFmt,w,h,0,this.getChannels(tt1),tt1.pixelFmt,null);
				}
				if(h3d_impl_GlDriver.outOfMemoryCheck) {
					var err2 = _gthis.gl.getError();
					if(err2 == 1285) {
						outOfMem = true;
					} else if(err2 != 0) {
						throw haxe_Exception.thrown("Failed to alloc texture " + Std.string(t.format) + "(error " + err2 + ")");
					}
				}
			}
		}
		this.restoreBind();
		if(outOfMem) {
			this.gl.deleteTexture(tt1.t);
			return null;
		}
		return tt1;
	}
	,restoreBind: function() {
		var t = this.boundTextures[this.lastActiveIndex];
		if(t == null) {
			this.gl.bindTexture(3553,null);
		} else {
			this.gl.bindTexture(t.bind,t.t);
		}
	}
	,allocDepthBuffer: function(b) {
		var r = this.gl.createRenderbuffer();
		if(b.format == null) {
			b.format = this.glES >= 3 ? h3d_mat_DepthFormat.Depth24Stencil8 : h3d_mat_DepthFormat.Depth16;
		}
		var format;
		switch(b.format._hx_index) {
		case 0:
			format = 33189;
			break;
		case 1:
			if(this.glES >= 3) {
				format = 33190;
			} else {
				throw haxe_Exception.thrown("Unsupported depth format " + Std.string(b.format));
			}
			break;
		case 2:
			format = 34041;
			break;
		default:
			throw haxe_Exception.thrown("Unsupported depth format " + Std.string(b.format));
		}
		this.gl.bindRenderbuffer(36161,r);
		this.gl.renderbufferStorage(36161,format,b.width,b.height);
		this.gl.bindRenderbuffer(36161,null);
		return { r : r};
	}
	,disposeDepthBuffer: function(b) {
		if(b.b != null && b.b.r != null) {
			this.gl.deleteRenderbuffer(b.b.r);
			b.b = null;
		}
	}
	,getDefaultDepthBuffer: function() {
		if(this.defaultDepth != null) {
			return this.defaultDepth;
		}
		this.defaultDepth = new h3d_mat_DepthBuffer(0,0);
		this.defaultDepth.width = this.bufferWidth;
		this.defaultDepth.height = this.bufferHeight;
		this.defaultDepth.b = this.allocDepthBuffer(this.defaultDepth);
		return this.defaultDepth;
	}
	,allocVertexes: function(m) {
		if(h3d_impl_GlDriver.outOfMemoryCheck) {
			this.gl.getError();
		}
		var b = this.gl.createBuffer();
		this.gl.bindBuffer(34962,b);
		if(m.size * m.stride == 0) {
			throw haxe_Exception.thrown("assert");
		}
		this.gl.bufferData(34962,m.size * m.stride * 4,(m.flags & 1 << h3d_BufferFlag.Dynamic._hx_index) != 0 ? 35048 : 35044);
		var outOfMem = h3d_impl_GlDriver.outOfMemoryCheck && this.gl.getError() == 1285;
		this.gl.bindBuffer(34962,null);
		if(outOfMem) {
			this.gl.deleteBuffer(b);
			return null;
		}
		return { b : b, stride : m.stride};
	}
	,allocIndexes: function(count,is32) {
		if(h3d_impl_GlDriver.outOfMemoryCheck) {
			this.gl.getError();
		}
		var b = this.gl.createBuffer();
		var size = is32 ? 4 : 2;
		this.gl.bindBuffer(34963,b);
		this.gl.bufferData(34963,count * size,35044);
		var outOfMem = h3d_impl_GlDriver.outOfMemoryCheck && this.gl.getError() == 1285;
		this.gl.bindBuffer(34963,null);
		this.curIndexBuffer = null;
		if(outOfMem) {
			this.gl.deleteBuffer(b);
			return null;
		}
		return { b : b, is32 : is32};
	}
	,disposeTexture: function(t) {
		var tt = t.t;
		if(tt == null) {
			return;
		}
		t.t = null;
		var _g = 0;
		var _g1 = this.boundTextures.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.boundTextures[i] == tt) {
				this.boundTextures[i] = null;
			}
		}
		this.gl.deleteTexture(tt.t);
	}
	,disposeIndexes: function(i) {
		this.gl.deleteBuffer(i.b);
	}
	,disposeVertexes: function(v) {
		this.gl.deleteBuffer(v.b);
	}
	,generateMipMaps: function(t) {
		var bind = this.getBindType(t);
		this.gl.bindTexture(bind,t.t.t);
		this.gl.generateMipmap(bind);
		this.restoreBind();
	}
	,resetStream: function() {
	}
	,uploadTexturePixels: function(t,pixels,mipLevel,side) {
		var cubic = (t.flags & 1 << h3d_mat_TextureFlags.Cube._hx_index) != 0;
		var face = cubic ? h3d_impl_GlDriver.CUBE_FACES[side] : (t.flags & 1 << h3d_mat_TextureFlags.IsArray._hx_index) != 0 ? 35866 : 3553;
		var bind = this.getBindType(t);
		this.gl.bindTexture(bind,t.t.t);
		pixels.convert(t.format);
		pixels.setFlip(false);
		var dataLen = pixels.dataSize;
		var buffer;
		switch(t.format._hx_index) {
		case 3:case 6:case 9:case 12:
			buffer = new Uint16Array(pixels.bytes.b.buffer,pixels.offset,dataLen >> 1);
			break;
		case 4:case 7:case 10:case 13:
			buffer = new Float32Array(pixels.bytes.b.buffer,pixels.offset,dataLen >> 2);
			break;
		case 16:case 17:
			buffer = new Uint32Array(pixels.bytes.b.buffer,pixels.offset,dataLen >> 2);
			break;
		default:
			buffer = new Uint8Array(pixels.bytes.b.buffer,pixels.offset,dataLen);
		}
		var _g = t.format;
		var tmp;
		if(_g._hx_index == 21) {
			var _g1 = _g.v;
			tmp = true;
		} else {
			tmp = false;
		}
		if(tmp) {
			if((t.flags & 1 << h3d_mat_TextureFlags.IsArray._hx_index) != 0) {
				this.gl.compressedTexSubImage3D(face,mipLevel,0,0,side,pixels.width,pixels.height,1,t.t.internalFmt,buffer);
			} else {
				this.gl.compressedTexImage2D(face,mipLevel,t.t.internalFmt,pixels.width,pixels.height,0,buffer);
			}
		} else if((t.flags & 1 << h3d_mat_TextureFlags.IsArray._hx_index) != 0) {
			this.gl.texSubImage3D(face,mipLevel,0,0,side,pixels.width,pixels.height,1,this.getChannels(t.t),t.t.pixelFmt,buffer);
		} else {
			this.gl.texImage2D(face,mipLevel,t.t.internalFmt,pixels.width,pixels.height,0,this.getChannels(t.t),t.t.pixelFmt,buffer);
		}
		t.flags |= 1 << h3d_mat_TextureFlags.WasCleared._hx_index;
		this.restoreBind();
	}
	,uploadVertexBuffer: function(v,startVertex,vertexCount,buf,bufPos) {
		var stride = v.stride;
		this.gl.bindBuffer(34962,v.b);
		var buf1 = buf.array;
		var sub = new Float32Array(buf1.buffer,bufPos * 4,vertexCount * stride);
		this.gl.bufferSubData(34962,startVertex * stride * 4,sub);
		this.gl.bindBuffer(34962,null);
	}
	,uploadIndexBuffer: function(i,startIndice,indiceCount,buf,bufPos) {
		var bits = i.is32 ? 2 : 1;
		this.gl.bindBuffer(34963,i.b);
		var buf1 = new Uint16Array(buf);
		var sub = new Uint16Array(buf1.buffer,bufPos << bits,indiceCount);
		this.gl.bufferSubData(34963,startIndice << bits,sub);
		this.gl.bindBuffer(34963,null);
		this.curIndexBuffer = null;
	}
	,selectBuffer: function(v) {
		if(v == this.curBuffer) {
			return;
		}
		if(this.curBuffer != null && v.buffer == this.curBuffer.buffer && (v.buffer.flags & 1 << h3d_BufferFlag.RawFormat._hx_index) != 0 == ((this.curBuffer.flags & 1 << h3d_BufferFlag.RawFormat._hx_index) != 0)) {
			this.curBuffer = v;
			return;
		}
		if(this.curShader == null) {
			throw haxe_Exception.thrown("No shader selected");
		}
		this.curBuffer = v;
		var m = v.buffer.vbuf;
		if(m.stride < this.curShader.stride) {
			throw haxe_Exception.thrown("Buffer stride (" + m.stride + ") and shader stride (" + this.curShader.stride + ") mismatch");
		}
		this.gl.bindBuffer(34962,m.b);
		if((v.flags & 1 << h3d_BufferFlag.RawFormat._hx_index) != 0) {
			var _g = 0;
			var _g1 = this.curShader.attribs;
			while(_g < _g1.length) {
				var a = _g1[_g];
				++_g;
				var pos = a.offset;
				this.gl.vertexAttribPointer(a.index,a.size,a.type,false,m.stride * 4,pos * 4);
				if(this.currentDivisor[a.index] != a.divisor) {
					this.currentDivisor[a.index] = a.divisor;
					this.gl.vertexAttribDivisor(a.index,a.divisor);
				}
			}
		} else {
			var offset = 8;
			var _g = 0;
			var _g1 = this.curShader.attribs.length;
			while(_g < _g1) {
				var i = _g++;
				var a = this.curShader.attribs[i];
				var pos;
				var _g2 = this.curShader.inputs.names[i];
				switch(_g2) {
				case "normal":
					if(m.stride < 6) {
						throw haxe_Exception.thrown("Buffer is missing NORMAL data, set it to RAW format ?");
					}
					pos = 3;
					break;
				case "position":
					pos = 0;
					break;
				case "uv":
					if(m.stride < 8) {
						throw haxe_Exception.thrown("Buffer is missing UV data, set it to RAW format ?");
					}
					pos = 6;
					break;
				default:
					var s = _g2;
					pos = offset;
					offset += a.size;
					if(offset > m.stride) {
						throw haxe_Exception.thrown("Buffer is missing '" + s + "' data, set it to RAW format ?");
					}
				}
				this.gl.vertexAttribPointer(a.index,a.size,a.type,false,m.stride * 4,pos * 4);
				if(this.currentDivisor[a.index] != a.divisor) {
					this.currentDivisor[a.index] = a.divisor;
					this.gl.vertexAttribDivisor(a.index,a.divisor);
				}
			}
		}
	}
	,draw: function(ibuf,startIndex,ntriangles) {
		if(ibuf != this.curIndexBuffer) {
			this.curIndexBuffer = ibuf;
			this.gl.bindBuffer(34963,ibuf.b);
		}
		if(ibuf.is32) {
			this.gl.drawElements(this.drawMode,ntriangles * 3,5125,startIndex * 4);
		} else {
			this.gl.drawElements(this.drawMode,ntriangles * 3,5123,startIndex * 2);
		}
	}
	,end: function() {
	}
	,isDisposed: function() {
		return this.gl.isContextLost();
	}
	,setRenderZone: function(x,y,width,height) {
		if(x == 0 && y == 0 && width < 0 && height < 0) {
			this.gl.disable(3089);
		} else {
			this.gl.enable(3089);
			if(this.curTarget == null) {
				y = this.bufferHeight - (y + height);
			}
			this.gl.scissor(x,y,width,height);
		}
	}
	,setDrawBuffers: function(k) {
		if(this.glES >= 3) {
			this.gl.drawBuffers(h3d_impl_GlDriver.CBUFFERS[k]);
		} else if(this.mrtExt != null) {
			this.mrtExt.drawBuffersWEBGL(h3d_impl_GlDriver.CBUFFERS[k]);
		}
	}
	,unbindTargets: function() {
		if(this.curTarget != null && this.numTargets > 1) {
			while(this.numTargets > 1) {
				this.gl.framebufferTexture2D(36160,36064 + --this.numTargets,3553,null,0);
				this.curTargets[this.numTargets] = null;
			}
			this.setDrawBuffers(1);
		}
	}
	,setRenderTarget: function(tex,layer,mipLevel) {
		if(mipLevel == null) {
			mipLevel = 0;
		}
		if(layer == null) {
			layer = 0;
		}
		this.unbindTargets();
		this.curTarget = tex;
		if(tex == null) {
			this.gl.bindFramebuffer(36160,null);
			this.gl.viewport(0,0,this.bufferWidth,this.bufferHeight);
			return;
		}
		if(tex.depthBuffer != null && (tex.depthBuffer.width != tex.width || tex.depthBuffer.height != tex.height)) {
			throw haxe_Exception.thrown("Invalid depth buffer size : does not match render target size");
		}
		if(mipLevel > 0 && this.glES == 1) {
			throw haxe_Exception.thrown("Cannot render to mipLevel in WebGL1, use upload() instead");
		}
		if(tex.t == null) {
			tex.alloc();
		}
		if((tex.flags & 1 << h3d_mat_TextureFlags.MipMapped._hx_index) != 0 && (tex.flags & 1 << h3d_mat_TextureFlags.WasCleared._hx_index) == 0) {
			var bind = this.getBindType(tex);
			this.gl.bindTexture(bind,tex.t.t);
			this.gl.generateMipmap(bind);
			this.restoreBind();
		}
		tex.set_lastFrame(this.frame);
		this.curTargetLayer = layer;
		this.curTargetMip = mipLevel;
		this.gl.bindFramebuffer(36160,this.commonFB);
		if((tex.flags & 1 << h3d_mat_TextureFlags.IsArray._hx_index) != 0) {
			this.gl.framebufferTextureLayer(36160,36064,tex.t.t,mipLevel,layer);
		} else {
			this.gl.framebufferTexture2D(36160,36064,(tex.flags & 1 << h3d_mat_TextureFlags.Cube._hx_index) != 0 ? h3d_impl_GlDriver.CUBE_FACES[layer] : 3553,tex.t.t,mipLevel);
		}
		if(tex.depthBuffer != null) {
			if(tex.depthBuffer.hasStencil() && tex.depthBuffer.format == h3d_mat_DepthFormat.Depth24Stencil8) {
				this.gl.framebufferRenderbuffer(36160,33306,36161,tex.depthBuffer.b.r);
			} else {
				this.gl.framebufferRenderbuffer(36160,33306,36161,null);
				this.gl.framebufferRenderbuffer(36160,36096,36161,tex.depthBuffer.b.r);
				this.gl.framebufferRenderbuffer(36160,36128,36161,tex.depthBuffer.hasStencil() ? tex.depthBuffer.b.r : null);
			}
		} else {
			this.gl.framebufferRenderbuffer(36160,33306,36161,null);
			this.gl.framebufferRenderbuffer(36160,36096,36161,null);
			this.gl.framebufferRenderbuffer(36160,36128,36161,null);
		}
		var w = tex.width >> mipLevel;
		if(w == 0) {
			w = 1;
		}
		var h = tex.height >> mipLevel;
		if(h == 0) {
			h = 1;
		}
		this.gl.viewport(0,0,w,h);
		var _g = 0;
		var _g1 = this.boundTextures.length;
		while(_g < _g1) {
			var i = _g++;
			this.boundTextures[i] = null;
		}
		if((tex.flags & 1 << h3d_mat_TextureFlags.WasCleared._hx_index) == 0) {
			tex.flags |= 1 << h3d_mat_TextureFlags.WasCleared._hx_index;
			this.clear(h3d_impl_GlDriver.BLACK);
		}
		if(this.glDebug) {
			var code = this.gl.checkFramebufferStatus(36160);
			if(code != 36053) {
				throw haxe_Exception.thrown("Invalid frame buffer: " + code);
			}
		}
	}
	,setRenderTargets: function(textures) {
		this.unbindTargets();
		this.setRenderTarget(textures[0]);
		if(textures.length < 2) {
			return;
		}
		this.numTargets = textures.length;
		var needClear = false;
		var _g = 1;
		var _g1 = textures.length;
		while(_g < _g1) {
			var i = _g++;
			var tex = textures[i];
			if(tex.t == null) {
				tex.alloc();
			}
			this.gl.framebufferTexture2D(36160,36064 + i,3553,tex.t.t,0);
			this.curTargets[i] = tex;
			tex.set_lastFrame(this.frame);
			if((tex.flags & 1 << h3d_mat_TextureFlags.WasCleared._hx_index) == 0) {
				tex.flags |= 1 << h3d_mat_TextureFlags.WasCleared._hx_index;
				needClear = true;
			}
		}
		this.setDrawBuffers(textures.length);
		if(needClear) {
			this.clear(h3d_impl_GlDriver.BLACK);
		}
	}
	,init: function(onCreate,forceSoftware) {
		if(forceSoftware == null) {
			forceSoftware = false;
		}
		var ready = false;
		if(window.document.readyState == "complete") {
			var _g = onCreate;
			var a1 = false;
			haxe_Timer.delay(function() {
				_g(a1);
			},1);
		} else {
			window.addEventListener("load",function(_) {
				if(!ready) {
					ready = true;
					onCreate(false);
				}
			});
		}
	}
	,hasFeature: function(f) {
		return this.features.get(f);
	}
	,makeFeatures: function() {
		var _g = 0;
		var _g1 = h3d_impl_Feature.__empty_constructs__.slice();
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.features.set(f,this.checkFeature(f));
		}
		if(this.gl.getExtension("WEBGL_compressed_texture_s3tc") != null) {
			this.maxCompressedTexturesSupport = 3;
		}
	}
	,checkFeature: function(f) {
		switch(f._hx_index) {
		case 0:
			if(this.glES >= 3) {
				return true;
			} else {
				return this.gl.getExtension("OES_standard_derivatives") != null;
			}
			break;
		case 1:
			if(this.glES >= 3) {
				if(this.gl.getExtension("EXT_color_buffer_float") != null) {
					return this.gl.getExtension("OES_texture_float_linear") != null;
				} else {
					return false;
				}
			} else if(this.gl.getExtension("OES_texture_float") != null && this.gl.getExtension("OES_texture_float_linear") != null && this.gl.getExtension("OES_texture_half_float") != null) {
				return this.gl.getExtension("OES_texture_half_float_linear") != null;
			} else {
				return false;
			}
			break;
		case 2:case 3:case 8:case 9:
			return true;
		case 4:
			if(this.glES >= 3) {
				return true;
			} else if(this.mrtExt == null) {
				return (this.mrtExt = this.gl.getExtension("WEBGL_draw_buffers")) != null;
			} else {
				return true;
			}
			break;
		case 6:
			if(this.glES >= 3) {
				return true;
			} else {
				return this.gl.getExtension("EXT_sRGB") != null;
			}
			break;
		case 7:
			if(this.glES >= 3) {
				return true;
			} else {
				return false;
			}
			break;
		case 10:
			if(this.glES >= 3) {
				return true;
			} else {
				return this.gl.getExtension("ANGLE_instanced_arrays") != null;
			}
			break;
		default:
			return false;
		}
	}
	,__class__: h3d_impl_GlDriver
});
var h3d_impl__$ManagedBuffer_FreeCell = function(pos,count,next) {
	this.pos = pos;
	this.count = count;
	this.next = next;
};
h3d_impl__$ManagedBuffer_FreeCell.__name__ = "h3d.impl._ManagedBuffer.FreeCell";
h3d_impl__$ManagedBuffer_FreeCell.prototype = {
	__class__: h3d_impl__$ManagedBuffer_FreeCell
};
var h3d_impl_ManagedBuffer = function(stride,size,flags) {
	var this1 = 0;
	this.flags = this1;
	if(flags != null) {
		var _g = 0;
		while(_g < flags.length) {
			var f = flags[_g];
			++_g;
			this.flags |= 1 << f._hx_index;
		}
	}
	this.size = size;
	this.stride = stride;
	this.freeList = new h3d_impl__$ManagedBuffer_FreeCell(0,size,null);
	this.mem = h3d_Engine.CURRENT.mem;
	this.mem.allocManaged(this);
};
h3d_impl_ManagedBuffer.__name__ = "h3d.impl.ManagedBuffer";
h3d_impl_ManagedBuffer.prototype = {
	uploadVertexBuffer: function(start,vertices,buf,bufPos) {
		if(bufPos == null) {
			bufPos = 0;
		}
		this.mem.driver.uploadVertexBuffer(this.vbuf,start,vertices,buf,bufPos);
	}
	,allocPosition: function(nvert,align) {
		var free = this.freeList;
		while(free != null) {
			if(free.count >= nvert) {
				var d = (align - free.pos % align) % align;
				if(d == 0) {
					break;
				}
				if(free.count >= nvert + d) {
					free.next = new h3d_impl__$ManagedBuffer_FreeCell(free.pos + d,free.count - d,free.next);
					free.count = d;
					free = free.next;
					break;
				}
			}
			free = free.next;
		}
		if(free == null) {
			return -1;
		}
		var pos = free.pos;
		free.pos += nvert;
		free.count -= nvert;
		return pos;
	}
	,allocBuffer: function(b) {
		var align = (b.flags & 1 << h3d_BufferFlag.Quads._hx_index) != 0 ? 4 : (b.flags & 1 << h3d_BufferFlag.Triangles._hx_index) != 0 ? 3 : 1;
		var p = this.allocPosition(b.vertices,align);
		if(p < 0) {
			return false;
		}
		b.position = p;
		b.buffer = this;
		return true;
	}
	,freeBuffer: function(b) {
		var prev = null;
		var f = this.freeList;
		var nvert = b.vertices;
		var end = b.position + nvert;
		while(f != null) {
			if(f.pos == end) {
				f.pos -= nvert;
				f.count += nvert;
				if(prev != null && prev.pos + prev.count == f.pos) {
					prev.count += f.count;
					prev.next = f.next;
				}
				nvert = 0;
				break;
			}
			if(f.pos > end) {
				if(prev != null && prev.pos + prev.count == b.position) {
					prev.count += nvert;
				} else {
					var n = new h3d_impl__$ManagedBuffer_FreeCell(b.position,nvert,f);
					if(prev == null) {
						this.freeList = n;
					} else {
						prev.next = n;
					}
				}
				nvert = 0;
				break;
			}
			prev = f;
			f = f.next;
		}
		if(nvert != 0) {
			throw haxe_Exception.thrown("assert");
		}
		if(this.freeList.count == this.size && (this.flags & 1 << h3d_BufferFlag.Managed._hx_index) == 0) {
			this.dispose();
		}
	}
	,dispose: function() {
		this.mem.freeManaged(this);
	}
	,__class__: h3d_impl_ManagedBuffer
};
var h3d_impl_MemoryManager = function(driver) {
	this.bufferCount = 0;
	this.texMemory = 0;
	this.usedMemory = 0;
	this.driver = driver;
};
h3d_impl_MemoryManager.__name__ = "h3d.impl.MemoryManager";
h3d_impl_MemoryManager.prototype = {
	init: function() {
		this.indexes = [];
		this.textures = [];
		this.buffers = [];
		this.depths = [];
		this.initIndexes();
	}
	,initIndexes: function() {
		var this1 = new Array(0);
		var indices = this1;
		var _g = 0;
		while(_g < 65533) {
			var i = _g++;
			indices.push(i);
		}
		this.triIndexes = h3d_Indexes.alloc(indices);
		var this1 = new Array(0);
		var indices = this1;
		var p = 0;
		var _g = 0;
		var _g1 = 16383;
		while(_g < _g1) {
			var i = _g++;
			var k = i << 2;
			indices.push(k);
			indices.push(k + 1);
			indices.push(k + 2);
			indices.push(k + 2);
			indices.push(k + 1);
			indices.push(k + 3);
		}
		indices.push(65533);
		this.quadIndexes = h3d_Indexes.alloc(indices);
	}
	,garbage: function() {
	}
	,cleanManagedBuffers: function() {
		var _g = 1;
		var _g1 = this.buffers.length;
		while(_g < _g1) {
			var i = _g++;
			var b = this.buffers[i];
			var prev = null;
			while(b != null) {
				if(b.freeList.count == b.size) {
					b.dispose();
					if(prev == null) {
						this.buffers[i] = b.next;
					} else {
						prev.next = b.next;
					}
				} else {
					prev = b;
				}
				b = b.next;
			}
		}
	}
	,allocManaged: function(m) {
		if(m.vbuf != null) {
			return;
		}
		var mem = m.size * m.stride * 4;
		if(mem == 0) {
			return;
		}
		while(this.usedMemory + mem > 4294967296. || this.bufferCount >= 65536 || (m.vbuf = this.driver.allocVertexes(m)) == null) {
			if(this.driver.isDisposed()) {
				return;
			}
			var size = this.usedMemory - this.freeMemorySize();
			this.garbage();
			this.cleanManagedBuffers();
			if(this.usedMemory - this.freeMemorySize() == size) {
				if(this.bufferCount >= 65536) {
					throw haxe_Exception.thrown("Too many buffers");
				}
				throw haxe_Exception.thrown("Memory full (" + Math.ceil(size / 1024) + " KB," + this.bufferCount + " buffers)");
			}
		}
		this.usedMemory += mem;
		this.bufferCount++;
	}
	,freeManaged: function(m) {
		if(m.vbuf == null) {
			return;
		}
		this.driver.disposeVertexes(m.vbuf);
		m.vbuf = null;
		this.usedMemory -= m.size * m.stride * 4;
		this.bufferCount--;
		if((m.flags & 1 << h3d_BufferFlag.Managed._hx_index) == 0) {
			var c = this.buffers[0];
			var prev = null;
			while(c != null) {
				if(c == m) {
					if(prev == null) {
						this.buffers[0] = m.next;
					} else {
						prev.next = m.next;
					}
					break;
				}
				prev = c;
				c = c.next;
			}
		}
	}
	,allocBuffer: function(b,stride) {
		var max = (b.flags & 1 << h3d_BufferFlag.Quads._hx_index) != 0 ? 65532 : (b.flags & 1 << h3d_BufferFlag.Triangles._hx_index) != 0 ? 65533 : 65534;
		if(b.vertices > max && (b.flags & 1 << h3d_BufferFlag.UniformBuffer._hx_index) == 0 && (b.flags & 1 << h3d_BufferFlag.LargeBuffer._hx_index) == 0) {
			if(max == 65534) {
				throw haxe_Exception.thrown("Cannot split buffer with " + b.vertices + " vertices if it's not Quads/Triangles");
			}
			var rem = b.vertices - max;
			b.vertices = max;
			this.allocBuffer(b,stride);
			var n = b;
			while(n.next != null) n = n.next;
			var flags = [];
			var _g = 0;
			var _g1 = h3d_impl_MemoryManager.ALL_FLAGS;
			while(_g < _g1.length) {
				var f = _g1[_g];
				++_g;
				if((b.flags & 1 << f._hx_index) != 0) {
					flags.push(f);
				}
			}
			n.next = new h3d_Buffer(rem,stride,flags);
			return;
		}
		if((b.flags & 1 << h3d_BufferFlag.Managed._hx_index) == 0) {
			var flags = null;
			if((b.flags & 1 << h3d_BufferFlag.Dynamic._hx_index) != 0) {
				if(flags == null) {
					flags = [];
				}
				flags.push(h3d_BufferFlag.Dynamic);
			}
			if((b.flags & 1 << h3d_BufferFlag.UniformBuffer._hx_index) != 0) {
				if(flags == null) {
					flags = [];
				}
				flags.push(h3d_BufferFlag.UniformBuffer);
			}
			var m = new h3d_impl_ManagedBuffer(stride,b.vertices,flags);
			m.next = this.buffers[0];
			this.buffers[0] = m;
			if(!m.allocBuffer(b)) {
				throw haxe_Exception.thrown("assert");
			}
			return;
		}
		var m = this.buffers[stride];
		var prev = null;
		while(m != null) {
			if(m.allocBuffer(b)) {
				return;
			}
			prev = m;
			m = m.next;
		}
		var align = (b.flags & 1 << h3d_BufferFlag.Triangles._hx_index) != 0 ? 3 : (b.flags & 1 << h3d_BufferFlag.Quads._hx_index) != 0 ? 4 : 0;
		if(m == null && align > 0) {
			var total = b.vertices;
			var size = total;
			while(size > 2048) {
				m = this.buffers[stride];
				size >>= 1;
				size -= size % align;
				b.vertices = size;
				while(m != null) {
					if(m.allocBuffer(b)) {
						var flags = [];
						var _g = 0;
						var _g1 = h3d_impl_MemoryManager.ALL_FLAGS;
						while(_g < _g1.length) {
							var f = _g1[_g];
							++_g;
							if((b.flags & 1 << f._hx_index) != 0) {
								flags.push(f);
							}
						}
						b.next = new h3d_Buffer(total - size,stride,flags);
						return;
					}
					m = m.next;
				}
			}
			b.vertices = total;
		}
		m = new h3d_impl_ManagedBuffer(stride,65533,[h3d_BufferFlag.Managed]);
		if(prev == null) {
			this.buffers[stride] = m;
		} else {
			prev.next = m;
		}
		if(!m.allocBuffer(b)) {
			throw haxe_Exception.thrown("assert");
		}
	}
	,deleteIndexes: function(i) {
		HxOverrides.remove(this.indexes,i);
		this.driver.disposeIndexes(i.ibuf);
		i.ibuf = null;
		this.usedMemory -= i.count * (i.is32 ? 4 : 2);
	}
	,allocIndexes: function(i) {
		i.ibuf = this.driver.allocIndexes(i.count,i.is32);
		this.indexes.push(i);
		this.usedMemory += i.count * (i.is32 ? 4 : 2);
	}
	,bpp: function(t) {
		return 4;
	}
	,cleanTextures: function(force) {
		if(force == null) {
			force = true;
		}
		this.textures.sort($bind(this,this.sortByLRU));
		var _g = 0;
		var _g1 = this.textures;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			if(t.realloc == null || t.t == null && t.realloc == null) {
				continue;
			}
			if(force || t.get_lastFrame() < hxd_Timer.frameCount - 3600) {
				t.dispose();
				return true;
			}
		}
		return false;
	}
	,sortByLRU: function(t1,t2) {
		return t1.get_lastFrame() - t2.get_lastFrame();
	}
	,deleteTexture: function(t) {
		if(!HxOverrides.remove(this.textures,t)) {
			return;
		}
		this.driver.disposeTexture(t);
		this.texMemory -= t.width * t.height * this.bpp(t);
	}
	,allocTexture: function(t) {
		var free = this.cleanTextures(false);
		t.t = this.driver.allocTexture(t);
		if(t.t == null) {
			if(this.driver.isDisposed()) {
				return;
			}
			if(!this.cleanTextures(true)) {
				throw haxe_Exception.thrown("Maximum texture memory reached");
			}
			this.allocTexture(t);
			return;
		}
		this.textures.push(t);
		this.texMemory += t.width * t.height * this.bpp(t);
	}
	,allocDepth: function(b) {
		var free = this.cleanTextures(false);
		b.b = this.driver.allocDepthBuffer(b);
		if(b.b == null) {
			if(this.driver.isDisposed()) {
				return;
			}
			if(!this.cleanTextures(true)) {
				throw haxe_Exception.thrown("Maximum texture memory reached");
			}
			this.allocDepth(b);
			return;
		}
		this.depths.push(b);
		this.texMemory += b.width * b.height * 4;
	}
	,deleteDepth: function(b) {
		if(!HxOverrides.remove(this.depths,b)) {
			return;
		}
		this.driver.disposeDepthBuffer(b);
		this.texMemory -= b.width * b.height * 4;
	}
	,onContextLost: function() {
		this.dispose();
		this.initIndexes();
	}
	,dispose: function() {
		if(this.triIndexes != null) {
			this.triIndexes.dispose();
		}
		if(this.quadIndexes != null) {
			this.quadIndexes.dispose();
		}
		this.triIndexes = null;
		this.quadIndexes = null;
		var _g = 0;
		var _g1 = this.textures.slice();
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			t.dispose();
		}
		var _g = 0;
		var _g1 = this.depths.slice();
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			b.dispose();
		}
		var _g = 0;
		var _g1 = this.buffers.slice();
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			var b1 = b;
			while(b1 != null) {
				b1.dispose();
				b1 = b1.next;
			}
		}
		var _g = 0;
		var _g1 = this.indexes.slice();
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			i.dispose();
		}
		this.buffers = [];
		this.indexes = [];
		this.textures = [];
		this.bufferCount = 0;
		this.usedMemory = 0;
		this.texMemory = 0;
	}
	,freeMemorySize: function() {
		var size = 0;
		var _g = 0;
		var _g1 = this.buffers;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			var b1 = b;
			while(b1 != null) {
				var free = b1.freeList;
				while(free != null) {
					size += free.count * b1.stride * 4;
					free = free.next;
				}
				b1 = b1.next;
			}
		}
		return size;
	}
	,__class__: h3d_impl_MemoryManager
};
var h3d_impl_TextureCache = function(ctx) {
	this.position = 0;
	this.ctx = ctx;
	this.cache = [];
	var engine = h3d_Engine.CURRENT;
	this.defaultFormat = h3d_mat_Texture.nativeFormat;
	this.defaultDepthBuffer = h3d_mat_DepthBuffer.getDefault();
};
h3d_impl_TextureCache.__name__ = "h3d.impl.TextureCache";
h3d_impl_TextureCache.prototype = {
	begin: function() {
		while(this.cache.length > this.position) {
			var t = this.cache.pop();
			if(t != null) {
				t.dispose();
			}
		}
		this.position = 0;
	}
	,lookupTarget: function(name,width,height,format,isCube) {
		var t = this.cache[this.position];
		var _g = this.position + 1;
		var _g1 = this.cache.length;
		while(_g < _g1) {
			var i = _g++;
			var t2 = this.cache[i];
			if(t2 != null && !(t2.t == null && t2.realloc == null) && t2.width == width && t2.height == height && t2.format == format && isCube == ((t2.flags & 1 << h3d_mat_TextureFlags.Cube._hx_index) != 0)) {
				this.cache[this.position] = t2;
				this.cache[i] = t;
				return t2;
			}
		}
		if(t != null && t.name == name) {
			t.dispose();
			t = null;
		}
		var flags = [h3d_mat_TextureFlags.Target];
		if(isCube) {
			flags.push(h3d_mat_TextureFlags.Cube);
		}
		var newt = new h3d_mat_Texture(width,height,flags,format);
		if(t != null) {
			this.cache.splice(this.position,0,newt);
		} else {
			this.cache[this.position] = newt;
		}
		return newt;
	}
	,allocTarget: function(name,width,height,defaultDepth,format,isCube) {
		if(isCube == null) {
			isCube = false;
		}
		if(defaultDepth == null) {
			defaultDepth = true;
		}
		var t = this.cache[this.position];
		if(format == null) {
			format = this.defaultFormat;
		}
		if(t == null || t.t == null && t.realloc == null || t.width != width || t.height != height || t.format != format || isCube != ((t.flags & 1 << h3d_mat_TextureFlags.Cube._hx_index) != 0)) {
			t = this.lookupTarget(name,width,height,format,isCube);
		}
		t.depthBuffer = defaultDepth ? this.defaultDepthBuffer : null;
		t.setName(name);
		this.position++;
		return t;
	}
	,__class__: h3d_impl_TextureCache
};
var hxd_impl_AnyProps = function() { };
hxd_impl_AnyProps.__name__ = "hxd.impl.AnyProps";
hxd_impl_AnyProps.prototype = {
	set_props: function(p) {
		this.props = p;
		this.refreshProps();
		return p;
	}
	,getDefaultProps: function(kind) {
		return { };
	}
	,refreshProps: function() {
	}
	,__class__: hxd_impl_AnyProps
};
var h3d_mat_BaseMaterial = function(shader) {
	if(shader != null) {
		this.addPass(new h3d_mat_Pass("default",null)).addShader(shader);
	}
};
h3d_mat_BaseMaterial.__name__ = "h3d.mat.BaseMaterial";
h3d_mat_BaseMaterial.__super__ = hxd_impl_AnyProps;
h3d_mat_BaseMaterial.prototype = $extend(hxd_impl_AnyProps.prototype,{
	addPass: function(p) {
		var prev = null;
		var cur = this.passes;
		while(cur != null) {
			prev = cur;
			cur = cur.nextPass;
		}
		if(prev == null) {
			this.passes = p;
		} else {
			prev.nextPass = p;
		}
		p.nextPass = null;
		return p;
	}
	,removePass: function(p) {
		var prev = null;
		var cur = this.passes;
		while(cur != null) {
			if(cur == p) {
				if(prev == null) {
					this.passes = p.nextPass;
				} else {
					prev.nextPass = p.nextPass;
				}
				p.nextPass = null;
				return true;
			}
			prev = cur;
			cur = cur.nextPass;
		}
		return false;
	}
	,getPass: function(name) {
		var p = this.passes;
		while(p != null) {
			if(p.name == name) {
				return p;
			}
			p = p.nextPass;
		}
		return null;
	}
	,__class__: h3d_mat_BaseMaterial
});
var h3d_mat_Face = $hxEnums["h3d.mat.Face"] = { __ename__:true,__constructs__:null
	,None: {_hx_name:"None",_hx_index:0,__enum__:"h3d.mat.Face",toString:$estr}
	,Back: {_hx_name:"Back",_hx_index:1,__enum__:"h3d.mat.Face",toString:$estr}
	,Front: {_hx_name:"Front",_hx_index:2,__enum__:"h3d.mat.Face",toString:$estr}
	,Both: {_hx_name:"Both",_hx_index:3,__enum__:"h3d.mat.Face",toString:$estr}
};
h3d_mat_Face.__constructs__ = [h3d_mat_Face.None,h3d_mat_Face.Back,h3d_mat_Face.Front,h3d_mat_Face.Both];
h3d_mat_Face.__empty_constructs__ = [h3d_mat_Face.None,h3d_mat_Face.Back,h3d_mat_Face.Front,h3d_mat_Face.Both];
var h3d_mat_Blend = $hxEnums["h3d.mat.Blend"] = { __ename__:true,__constructs__:null
	,One: {_hx_name:"One",_hx_index:0,__enum__:"h3d.mat.Blend",toString:$estr}
	,Zero: {_hx_name:"Zero",_hx_index:1,__enum__:"h3d.mat.Blend",toString:$estr}
	,SrcAlpha: {_hx_name:"SrcAlpha",_hx_index:2,__enum__:"h3d.mat.Blend",toString:$estr}
	,SrcColor: {_hx_name:"SrcColor",_hx_index:3,__enum__:"h3d.mat.Blend",toString:$estr}
	,DstAlpha: {_hx_name:"DstAlpha",_hx_index:4,__enum__:"h3d.mat.Blend",toString:$estr}
	,DstColor: {_hx_name:"DstColor",_hx_index:5,__enum__:"h3d.mat.Blend",toString:$estr}
	,OneMinusSrcAlpha: {_hx_name:"OneMinusSrcAlpha",_hx_index:6,__enum__:"h3d.mat.Blend",toString:$estr}
	,OneMinusSrcColor: {_hx_name:"OneMinusSrcColor",_hx_index:7,__enum__:"h3d.mat.Blend",toString:$estr}
	,OneMinusDstAlpha: {_hx_name:"OneMinusDstAlpha",_hx_index:8,__enum__:"h3d.mat.Blend",toString:$estr}
	,OneMinusDstColor: {_hx_name:"OneMinusDstColor",_hx_index:9,__enum__:"h3d.mat.Blend",toString:$estr}
	,ConstantColor: {_hx_name:"ConstantColor",_hx_index:10,__enum__:"h3d.mat.Blend",toString:$estr}
	,ConstantAlpha: {_hx_name:"ConstantAlpha",_hx_index:11,__enum__:"h3d.mat.Blend",toString:$estr}
	,OneMinusConstantColor: {_hx_name:"OneMinusConstantColor",_hx_index:12,__enum__:"h3d.mat.Blend",toString:$estr}
	,OneMinusConstantAlpha: {_hx_name:"OneMinusConstantAlpha",_hx_index:13,__enum__:"h3d.mat.Blend",toString:$estr}
	,SrcAlphaSaturate: {_hx_name:"SrcAlphaSaturate",_hx_index:14,__enum__:"h3d.mat.Blend",toString:$estr}
};
h3d_mat_Blend.__constructs__ = [h3d_mat_Blend.One,h3d_mat_Blend.Zero,h3d_mat_Blend.SrcAlpha,h3d_mat_Blend.SrcColor,h3d_mat_Blend.DstAlpha,h3d_mat_Blend.DstColor,h3d_mat_Blend.OneMinusSrcAlpha,h3d_mat_Blend.OneMinusSrcColor,h3d_mat_Blend.OneMinusDstAlpha,h3d_mat_Blend.OneMinusDstColor,h3d_mat_Blend.ConstantColor,h3d_mat_Blend.ConstantAlpha,h3d_mat_Blend.OneMinusConstantColor,h3d_mat_Blend.OneMinusConstantAlpha,h3d_mat_Blend.SrcAlphaSaturate];
h3d_mat_Blend.__empty_constructs__ = [h3d_mat_Blend.One,h3d_mat_Blend.Zero,h3d_mat_Blend.SrcAlpha,h3d_mat_Blend.SrcColor,h3d_mat_Blend.DstAlpha,h3d_mat_Blend.DstColor,h3d_mat_Blend.OneMinusSrcAlpha,h3d_mat_Blend.OneMinusSrcColor,h3d_mat_Blend.OneMinusDstAlpha,h3d_mat_Blend.OneMinusDstColor,h3d_mat_Blend.ConstantColor,h3d_mat_Blend.ConstantAlpha,h3d_mat_Blend.OneMinusConstantColor,h3d_mat_Blend.OneMinusConstantAlpha,h3d_mat_Blend.SrcAlphaSaturate];
var h3d_mat_Compare = $hxEnums["h3d.mat.Compare"] = { __ename__:true,__constructs__:null
	,Always: {_hx_name:"Always",_hx_index:0,__enum__:"h3d.mat.Compare",toString:$estr}
	,Never: {_hx_name:"Never",_hx_index:1,__enum__:"h3d.mat.Compare",toString:$estr}
	,Equal: {_hx_name:"Equal",_hx_index:2,__enum__:"h3d.mat.Compare",toString:$estr}
	,NotEqual: {_hx_name:"NotEqual",_hx_index:3,__enum__:"h3d.mat.Compare",toString:$estr}
	,Greater: {_hx_name:"Greater",_hx_index:4,__enum__:"h3d.mat.Compare",toString:$estr}
	,GreaterEqual: {_hx_name:"GreaterEqual",_hx_index:5,__enum__:"h3d.mat.Compare",toString:$estr}
	,Less: {_hx_name:"Less",_hx_index:6,__enum__:"h3d.mat.Compare",toString:$estr}
	,LessEqual: {_hx_name:"LessEqual",_hx_index:7,__enum__:"h3d.mat.Compare",toString:$estr}
};
h3d_mat_Compare.__constructs__ = [h3d_mat_Compare.Always,h3d_mat_Compare.Never,h3d_mat_Compare.Equal,h3d_mat_Compare.NotEqual,h3d_mat_Compare.Greater,h3d_mat_Compare.GreaterEqual,h3d_mat_Compare.Less,h3d_mat_Compare.LessEqual];
h3d_mat_Compare.__empty_constructs__ = [h3d_mat_Compare.Always,h3d_mat_Compare.Never,h3d_mat_Compare.Equal,h3d_mat_Compare.NotEqual,h3d_mat_Compare.Greater,h3d_mat_Compare.GreaterEqual,h3d_mat_Compare.Less,h3d_mat_Compare.LessEqual];
var h3d_mat_StencilOp = $hxEnums["h3d.mat.StencilOp"] = { __ename__:true,__constructs__:null
	,Keep: {_hx_name:"Keep",_hx_index:0,__enum__:"h3d.mat.StencilOp",toString:$estr}
	,Zero: {_hx_name:"Zero",_hx_index:1,__enum__:"h3d.mat.StencilOp",toString:$estr}
	,Replace: {_hx_name:"Replace",_hx_index:2,__enum__:"h3d.mat.StencilOp",toString:$estr}
	,Increment: {_hx_name:"Increment",_hx_index:3,__enum__:"h3d.mat.StencilOp",toString:$estr}
	,IncrementWrap: {_hx_name:"IncrementWrap",_hx_index:4,__enum__:"h3d.mat.StencilOp",toString:$estr}
	,Decrement: {_hx_name:"Decrement",_hx_index:5,__enum__:"h3d.mat.StencilOp",toString:$estr}
	,DecrementWrap: {_hx_name:"DecrementWrap",_hx_index:6,__enum__:"h3d.mat.StencilOp",toString:$estr}
	,Invert: {_hx_name:"Invert",_hx_index:7,__enum__:"h3d.mat.StencilOp",toString:$estr}
};
h3d_mat_StencilOp.__constructs__ = [h3d_mat_StencilOp.Keep,h3d_mat_StencilOp.Zero,h3d_mat_StencilOp.Replace,h3d_mat_StencilOp.Increment,h3d_mat_StencilOp.IncrementWrap,h3d_mat_StencilOp.Decrement,h3d_mat_StencilOp.DecrementWrap,h3d_mat_StencilOp.Invert];
h3d_mat_StencilOp.__empty_constructs__ = [h3d_mat_StencilOp.Keep,h3d_mat_StencilOp.Zero,h3d_mat_StencilOp.Replace,h3d_mat_StencilOp.Increment,h3d_mat_StencilOp.IncrementWrap,h3d_mat_StencilOp.Decrement,h3d_mat_StencilOp.DecrementWrap,h3d_mat_StencilOp.Invert];
var h3d_mat_MipMap = $hxEnums["h3d.mat.MipMap"] = { __ename__:true,__constructs__:null
	,None: {_hx_name:"None",_hx_index:0,__enum__:"h3d.mat.MipMap",toString:$estr}
	,Nearest: {_hx_name:"Nearest",_hx_index:1,__enum__:"h3d.mat.MipMap",toString:$estr}
	,Linear: {_hx_name:"Linear",_hx_index:2,__enum__:"h3d.mat.MipMap",toString:$estr}
};
h3d_mat_MipMap.__constructs__ = [h3d_mat_MipMap.None,h3d_mat_MipMap.Nearest,h3d_mat_MipMap.Linear];
h3d_mat_MipMap.__empty_constructs__ = [h3d_mat_MipMap.None,h3d_mat_MipMap.Nearest,h3d_mat_MipMap.Linear];
var h3d_mat_Filter = $hxEnums["h3d.mat.Filter"] = { __ename__:true,__constructs__:null
	,Nearest: {_hx_name:"Nearest",_hx_index:0,__enum__:"h3d.mat.Filter",toString:$estr}
	,Linear: {_hx_name:"Linear",_hx_index:1,__enum__:"h3d.mat.Filter",toString:$estr}
};
h3d_mat_Filter.__constructs__ = [h3d_mat_Filter.Nearest,h3d_mat_Filter.Linear];
h3d_mat_Filter.__empty_constructs__ = [h3d_mat_Filter.Nearest,h3d_mat_Filter.Linear];
var h3d_mat_Wrap = $hxEnums["h3d.mat.Wrap"] = { __ename__:true,__constructs__:null
	,Clamp: {_hx_name:"Clamp",_hx_index:0,__enum__:"h3d.mat.Wrap",toString:$estr}
	,Repeat: {_hx_name:"Repeat",_hx_index:1,__enum__:"h3d.mat.Wrap",toString:$estr}
};
h3d_mat_Wrap.__constructs__ = [h3d_mat_Wrap.Clamp,h3d_mat_Wrap.Repeat];
h3d_mat_Wrap.__empty_constructs__ = [h3d_mat_Wrap.Clamp,h3d_mat_Wrap.Repeat];
var h3d_mat_Operation = $hxEnums["h3d.mat.Operation"] = { __ename__:true,__constructs__:null
	,Add: {_hx_name:"Add",_hx_index:0,__enum__:"h3d.mat.Operation",toString:$estr}
	,Sub: {_hx_name:"Sub",_hx_index:1,__enum__:"h3d.mat.Operation",toString:$estr}
	,ReverseSub: {_hx_name:"ReverseSub",_hx_index:2,__enum__:"h3d.mat.Operation",toString:$estr}
	,Min: {_hx_name:"Min",_hx_index:3,__enum__:"h3d.mat.Operation",toString:$estr}
	,Max: {_hx_name:"Max",_hx_index:4,__enum__:"h3d.mat.Operation",toString:$estr}
};
h3d_mat_Operation.__constructs__ = [h3d_mat_Operation.Add,h3d_mat_Operation.Sub,h3d_mat_Operation.ReverseSub,h3d_mat_Operation.Min,h3d_mat_Operation.Max];
h3d_mat_Operation.__empty_constructs__ = [h3d_mat_Operation.Add,h3d_mat_Operation.Sub,h3d_mat_Operation.ReverseSub,h3d_mat_Operation.Min,h3d_mat_Operation.Max];
var h3d_mat_TextureFlags = $hxEnums["h3d.mat.TextureFlags"] = { __ename__:true,__constructs__:null
	,Target: {_hx_name:"Target",_hx_index:0,__enum__:"h3d.mat.TextureFlags",toString:$estr}
	,Cube: {_hx_name:"Cube",_hx_index:1,__enum__:"h3d.mat.TextureFlags",toString:$estr}
	,MipMapped: {_hx_name:"MipMapped",_hx_index:2,__enum__:"h3d.mat.TextureFlags",toString:$estr}
	,ManualMipMapGen: {_hx_name:"ManualMipMapGen",_hx_index:3,__enum__:"h3d.mat.TextureFlags",toString:$estr}
	,IsNPOT: {_hx_name:"IsNPOT",_hx_index:4,__enum__:"h3d.mat.TextureFlags",toString:$estr}
	,NoAlloc: {_hx_name:"NoAlloc",_hx_index:5,__enum__:"h3d.mat.TextureFlags",toString:$estr}
	,Dynamic: {_hx_name:"Dynamic",_hx_index:6,__enum__:"h3d.mat.TextureFlags",toString:$estr}
	,AlphaPremultiplied: {_hx_name:"AlphaPremultiplied",_hx_index:7,__enum__:"h3d.mat.TextureFlags",toString:$estr}
	,WasCleared: {_hx_name:"WasCleared",_hx_index:8,__enum__:"h3d.mat.TextureFlags",toString:$estr}
	,Loading: {_hx_name:"Loading",_hx_index:9,__enum__:"h3d.mat.TextureFlags",toString:$estr}
	,Serialize: {_hx_name:"Serialize",_hx_index:10,__enum__:"h3d.mat.TextureFlags",toString:$estr}
	,IsArray: {_hx_name:"IsArray",_hx_index:11,__enum__:"h3d.mat.TextureFlags",toString:$estr}
};
h3d_mat_TextureFlags.__constructs__ = [h3d_mat_TextureFlags.Target,h3d_mat_TextureFlags.Cube,h3d_mat_TextureFlags.MipMapped,h3d_mat_TextureFlags.ManualMipMapGen,h3d_mat_TextureFlags.IsNPOT,h3d_mat_TextureFlags.NoAlloc,h3d_mat_TextureFlags.Dynamic,h3d_mat_TextureFlags.AlphaPremultiplied,h3d_mat_TextureFlags.WasCleared,h3d_mat_TextureFlags.Loading,h3d_mat_TextureFlags.Serialize,h3d_mat_TextureFlags.IsArray];
h3d_mat_TextureFlags.__empty_constructs__ = [h3d_mat_TextureFlags.Target,h3d_mat_TextureFlags.Cube,h3d_mat_TextureFlags.MipMapped,h3d_mat_TextureFlags.ManualMipMapGen,h3d_mat_TextureFlags.IsNPOT,h3d_mat_TextureFlags.NoAlloc,h3d_mat_TextureFlags.Dynamic,h3d_mat_TextureFlags.AlphaPremultiplied,h3d_mat_TextureFlags.WasCleared,h3d_mat_TextureFlags.Loading,h3d_mat_TextureFlags.Serialize,h3d_mat_TextureFlags.IsArray];
var h3d_mat_Defaults = function() { };
h3d_mat_Defaults.__name__ = "h3d.mat.Defaults";
h3d_mat_Defaults.get_shadowShader = function() {
	var s = h3d_mat_Defaults.shadowShader;
	if(s == null) {
		s = new h3d_shader_Shadow();
		h3d_mat_Defaults.set_shadowShader(s);
		h3d_mat_Defaults.shadowShader.setPriority(-1);
	}
	return s;
};
h3d_mat_Defaults.set_shadowShader = function(s) {
	return h3d_mat_Defaults.shadowShader = s;
};
var h3d_mat_DepthFormat = $hxEnums["h3d.mat.DepthFormat"] = { __ename__:true,__constructs__:null
	,Depth16: {_hx_name:"Depth16",_hx_index:0,__enum__:"h3d.mat.DepthFormat",toString:$estr}
	,Depth24: {_hx_name:"Depth24",_hx_index:1,__enum__:"h3d.mat.DepthFormat",toString:$estr}
	,Depth24Stencil8: {_hx_name:"Depth24Stencil8",_hx_index:2,__enum__:"h3d.mat.DepthFormat",toString:$estr}
};
h3d_mat_DepthFormat.__constructs__ = [h3d_mat_DepthFormat.Depth16,h3d_mat_DepthFormat.Depth24,h3d_mat_DepthFormat.Depth24Stencil8];
h3d_mat_DepthFormat.__empty_constructs__ = [h3d_mat_DepthFormat.Depth16,h3d_mat_DepthFormat.Depth24,h3d_mat_DepthFormat.Depth24Stencil8];
var h3d_mat_DepthBuffer = function(width,height,format) {
	this.width = width;
	this.height = height;
	this.format = format;
	if(width > 0) {
		this.alloc();
	}
};
h3d_mat_DepthBuffer.__name__ = "h3d.mat.DepthBuffer";
h3d_mat_DepthBuffer.getDefault = function() {
	return h3d_Engine.CURRENT.driver.getDefaultDepthBuffer();
};
h3d_mat_DepthBuffer.prototype = {
	hasStencil: function() {
		switch(this.format._hx_index) {
		case 0:case 1:
			return false;
		case 2:
			return true;
		}
	}
	,alloc: function() {
		h3d_Engine.CURRENT.mem.allocDepth(this);
	}
	,dispose: function() {
		if(this.b != null) {
			h3d_Engine.CURRENT.mem.deleteDepth(this);
			this.b = null;
		}
	}
	,isDisposed: function() {
		return this.b == null;
	}
	,__class__: h3d_mat_DepthBuffer
};
var h3d_mat_Material = function(texture) {
	this.mshader = new h3d_shader_BaseMesh();
	this.set_blendMode(h2d_BlendMode.None);
	h3d_mat_BaseMaterial.call(this,this.mshader);
	this.set_texture(texture);
};
h3d_mat_Material.__name__ = "h3d.mat.Material";
h3d_mat_Material.__super__ = h3d_mat_BaseMaterial;
h3d_mat_Material.prototype = $extend(h3d_mat_BaseMaterial.prototype,{
	set_castShadows: function(v) {
		if(this.castShadows == v) {
			return v;
		}
		if(this.passes != null) {
			if(v) {
				this.addPass(new h3d_mat_Pass("shadow",null,this.passes)).set_isStatic(this.staticShadows);
			} else {
				this.removePass(this.getPass("shadow"));
			}
		}
		return this.castShadows = v;
	}
	,set_receiveShadows: function(v) {
		if(v == this.receiveShadows) {
			return v;
		}
		if(this.passes != null) {
			var shadows = h3d_mat_Defaults.get_shadowShader();
			if(v) {
				this.passes.addShader(shadows);
			} else {
				this.passes.removeShader(shadows);
			}
		}
		return this.receiveShadows = v;
	}
	,set_blendMode: function(v) {
		if(this.passes != null) {
			this.passes.setBlendMode(v);
			switch(v._hx_index) {
			case 0:
				this.passes.set_depthWrite(true);
				this.passes.setPassName("default");
				break;
			case 1:
				this.passes.set_depthWrite(true);
				this.passes.setPassName("alpha");
				break;
			case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:
				this.passes.set_depthWrite(false);
				this.passes.setPassName("additive");
				break;
			}
		}
		return this.blendMode = v;
	}
	,set_texture: function(t) {
		if(t == null) {
			if(this.textureShader != null) {
				this.passes.removeShader(this.textureShader);
				this.textureShader = null;
			}
		} else {
			if(this.textureShader == null) {
				this.textureShader = new h3d_shader_Texture();
				this.passes.addShader(this.textureShader);
			}
			this.textureShader.texture__ = t;
		}
		return t;
	}
	,getDefaultProps: function(type) {
		var props;
		if(type == null) {
			props = { kind : "Opaque", shadows : true, culling : true, light : true};
		} else {
			switch(type) {
			case "particles3D":case "trail3D":
				props = { kind : "Alpha", shadows : false, culling : false, light : true};
				break;
			case "ui":
				props = { kind : "Alpha", shadows : false, culling : false, light : false};
				break;
			default:
				props = { kind : "Opaque", shadows : true, culling : true, light : true};
			}
		}
		return props;
	}
	,refreshProps: function() {
		if(this.props == null || this.passes == null) {
			return;
		}
		var props = this.props;
		switch(props.kind) {
		case "Add":
			this.set_blendMode(h2d_BlendMode.Add);
			break;
		case "Alpha":
			this.set_blendMode(h2d_BlendMode.Alpha);
			break;
		case "AlphaKill":case "Hidden":case "Opaque":
			this.set_blendMode(h2d_BlendMode.None);
			break;
		case "SoftAdd":
			this.set_blendMode(h2d_BlendMode.SoftAdd);
			break;
		}
		var tshader = this.textureShader;
		if(tshader != null) {
			tshader.constModified = true;
			tshader.killAlpha__ = props.kind == "AlphaKill";
			tshader.killAlphaThreshold__ = 0.5;
		}
		this.passes.set_culling(props.kind == "Hidden" ? h3d_mat_Face.Both : props.culling ? h3d_mat_Face.Back : h3d_mat_Face.None);
		this.passes.set_enableLights(props.light);
		var v = props.shadows;
		this.set_castShadows(v);
		this.set_receiveShadows(v);
		if(this.castShadows && this.receiveShadows) {
			this.getPass("shadow").set_culling(this.passes.culling);
		}
	}
	,__class__: h3d_mat_Material
});
var h3d_mat_MaterialDatabase = function() {
};
h3d_mat_MaterialDatabase.__name__ = "h3d.mat.MaterialDatabase";
h3d_mat_MaterialDatabase.prototype = {
	__class__: h3d_mat_MaterialDatabase
};
var h3d_mat_MaterialSetup = function(name) {
	if(this.database == null) {
		this.database = new h3d_mat_MaterialDatabase();
	}
	this.name = name;
};
h3d_mat_MaterialSetup.__name__ = "h3d.mat.MaterialSetup";
h3d_mat_MaterialSetup.prototype = {
	createRenderer: function() {
		return new h3d_scene_fwd_Renderer();
	}
	,createLightSystem: function() {
		return new h3d_scene_fwd_LightSystem();
	}
	,createMaterial: function() {
		return new h3d_mat_Material();
	}
	,__class__: h3d_mat_MaterialSetup
};
var h3d_mat_Pass = function(name,shaders,parent) {
	this.layer = 0;
	this.bits = 0;
	this.parentPass = parent;
	this.shaders = shaders;
	this.setPassName(name);
	this.set_culling(h3d_mat_Face.Back);
	var src = h3d_mat_Blend.One;
	var dst = h3d_mat_Blend.Zero;
	this.set_blendSrc(src);
	this.set_blendAlphaSrc(src);
	this.set_blendDst(dst);
	this.set_blendAlphaDst(dst);
	this.depth(true,h3d_mat_Compare.Less);
	this.set_blendOp(this.set_blendAlphaOp(h3d_mat_Operation.Add));
	this.colorMask = 15;
};
h3d_mat_Pass.__name__ = "h3d.mat.Pass";
h3d_mat_Pass.prototype = {
	setPassName: function(name) {
		this.name = name;
		this.passId = hxsl_Globals.allocID(name);
	}
	,setBlendMode: function(b) {
		switch(b._hx_index) {
		case 0:
			var src = h3d_mat_Blend.One;
			var dst = h3d_mat_Blend.Zero;
			this.set_blendSrc(src);
			this.set_blendAlphaSrc(src);
			this.set_blendDst(dst);
			this.set_blendAlphaDst(dst);
			this.set_blendOp(h3d_mat_Operation.Add);
			this.set_blendAlphaOp(h3d_mat_Operation.Add);
			break;
		case 1:
			var src = h3d_mat_Blend.SrcAlpha;
			var dst = h3d_mat_Blend.OneMinusSrcAlpha;
			this.set_blendSrc(src);
			this.set_blendAlphaSrc(src);
			this.set_blendDst(dst);
			this.set_blendAlphaDst(dst);
			this.set_blendOp(h3d_mat_Operation.Add);
			this.set_blendAlphaOp(h3d_mat_Operation.Add);
			break;
		case 2:
			var src = h3d_mat_Blend.SrcAlpha;
			var dst = h3d_mat_Blend.One;
			this.set_blendSrc(src);
			this.set_blendAlphaSrc(src);
			this.set_blendDst(dst);
			this.set_blendAlphaDst(dst);
			this.set_blendOp(h3d_mat_Operation.Add);
			this.set_blendAlphaOp(h3d_mat_Operation.Add);
			break;
		case 3:
			var src = h3d_mat_Blend.One;
			var dst = h3d_mat_Blend.OneMinusSrcAlpha;
			this.set_blendSrc(src);
			this.set_blendAlphaSrc(src);
			this.set_blendDst(dst);
			this.set_blendAlphaDst(dst);
			this.set_blendOp(h3d_mat_Operation.Add);
			this.set_blendAlphaOp(h3d_mat_Operation.Add);
			break;
		case 4:
			var src = h3d_mat_Blend.OneMinusDstColor;
			var dst = h3d_mat_Blend.One;
			this.set_blendSrc(src);
			this.set_blendAlphaSrc(src);
			this.set_blendDst(dst);
			this.set_blendAlphaDst(dst);
			this.set_blendOp(h3d_mat_Operation.Add);
			this.set_blendAlphaOp(h3d_mat_Operation.Add);
			break;
		case 5:
			var src = h3d_mat_Blend.DstColor;
			var dst = h3d_mat_Blend.Zero;
			this.set_blendSrc(src);
			this.set_blendAlphaSrc(src);
			this.set_blendDst(dst);
			this.set_blendAlphaDst(dst);
			this.set_blendOp(h3d_mat_Operation.Add);
			this.set_blendAlphaOp(h3d_mat_Operation.Add);
			break;
		case 6:
			var src = h3d_mat_Blend.DstColor;
			var dst = h3d_mat_Blend.OneMinusSrcAlpha;
			this.set_blendSrc(src);
			this.set_blendAlphaSrc(src);
			this.set_blendDst(dst);
			this.set_blendAlphaDst(dst);
			this.set_blendOp(h3d_mat_Operation.Add);
			this.set_blendAlphaOp(h3d_mat_Operation.Add);
			break;
		case 7:
			var src = h3d_mat_Blend.Zero;
			var dst = h3d_mat_Blend.OneMinusSrcColor;
			this.set_blendSrc(src);
			this.set_blendAlphaSrc(src);
			this.set_blendDst(dst);
			this.set_blendAlphaDst(dst);
			this.set_blendOp(h3d_mat_Operation.Add);
			this.set_blendAlphaOp(h3d_mat_Operation.Add);
			break;
		case 8:
			var src = h3d_mat_Blend.One;
			var dst = h3d_mat_Blend.OneMinusSrcColor;
			this.set_blendSrc(src);
			this.set_blendAlphaSrc(src);
			this.set_blendDst(dst);
			this.set_blendAlphaDst(dst);
			this.set_blendOp(h3d_mat_Operation.Add);
			this.set_blendAlphaOp(h3d_mat_Operation.Add);
			break;
		case 9:
			var src = h3d_mat_Blend.SrcAlpha;
			var dst = h3d_mat_Blend.One;
			this.set_blendSrc(src);
			this.set_blendAlphaSrc(src);
			this.set_blendDst(dst);
			this.set_blendAlphaDst(dst);
			this.set_blendOp(h3d_mat_Operation.ReverseSub);
			this.set_blendAlphaOp(h3d_mat_Operation.ReverseSub);
			break;
		case 10:
			this.set_blendSrc(h3d_mat_Blend.Zero);
			this.set_blendAlphaSrc(h3d_mat_Blend.Zero);
			this.set_blendDst(h3d_mat_Blend.Zero);
			this.set_blendAlphaDst(h3d_mat_Blend.Zero);
			this.set_blendAlphaSrc(h3d_mat_Blend.Zero);
			this.set_blendAlphaDst(h3d_mat_Blend.Zero);
			this.set_blendAlphaOp(h3d_mat_Operation.Max);
			this.set_blendOp(h3d_mat_Operation.Max);
			break;
		case 11:
			this.set_blendSrc(h3d_mat_Blend.Zero);
			this.set_blendAlphaSrc(h3d_mat_Blend.Zero);
			this.set_blendDst(h3d_mat_Blend.Zero);
			this.set_blendAlphaDst(h3d_mat_Blend.Zero);
			this.set_blendAlphaSrc(h3d_mat_Blend.Zero);
			this.set_blendAlphaDst(h3d_mat_Blend.Zero);
			this.set_blendAlphaOp(h3d_mat_Operation.Min);
			this.set_blendOp(h3d_mat_Operation.Min);
			break;
		}
	}
	,depth: function(write,test) {
		this.set_depthWrite(write);
		this.set_depthTest(test);
	}
	,addShader: function(s) {
		if(s == null) {
			return null;
		}
		this.shaders = hxsl_ShaderList.addSort(s,this.shaders);
		return s;
	}
	,removeShader: function(s) {
		var sl = this.shaders;
		var prev = null;
		while(sl != null) {
			if(sl.s == s) {
				if(prev == null) {
					this.shaders = sl.next;
				} else {
					prev.next = sl.next;
				}
				return true;
			}
			prev = sl;
			sl = sl.next;
		}
		return false;
	}
	,getShadersRec: function() {
		if(this.parentPass == null || this.parentShaders == this.parentPass.shaders) {
			return this.shaders;
		}
		var s = this.shaders;
		var prev = null;
		while(s != null && s != this.parentShaders) {
			prev = s;
			s = s.next;
		}
		this.parentShaders = this.parentPass.shaders;
		if(prev == null) {
			this.shaders = this.parentShaders;
		} else {
			prev.next = this.parentShaders;
		}
		return this.shaders;
	}
	,set_enableLights: function(v) {
		this.flags = this.flags & -2 | (v ? 1 : 0);
		return this.enableLights = v;
	}
	,set_isStatic: function(v) {
		this.flags = this.flags & -5 | (v ? 1 : 0) << 2;
		return this.isStatic = v;
	}
	,set_culling: function(v) {
		this.bits = this.bits & -4 | v._hx_index;
		return this.culling = v;
	}
	,set_depthWrite: function(v) {
		this.bits = this.bits & -5 | (v ? 1 : 0) << 2;
		return this.depthWrite = v;
	}
	,set_depthTest: function(v) {
		this.bits = this.bits & -57 | v._hx_index << 3;
		return this.depthTest = v;
	}
	,set_blendSrc: function(v) {
		this.bits = this.bits & -961 | v._hx_index << 6;
		return this.blendSrc = v;
	}
	,set_blendDst: function(v) {
		this.bits = this.bits & -15361 | v._hx_index << 10;
		return this.blendDst = v;
	}
	,set_blendAlphaSrc: function(v) {
		this.bits = this.bits & -245761 | v._hx_index << 14;
		return this.blendAlphaSrc = v;
	}
	,set_blendAlphaDst: function(v) {
		this.bits = this.bits & -3932161 | v._hx_index << 18;
		return this.blendAlphaDst = v;
	}
	,set_blendOp: function(v) {
		this.bits = this.bits & -29360129 | v._hx_index << 22;
		return this.blendOp = v;
	}
	,set_blendAlphaOp: function(v) {
		this.bits = this.bits & -234881025 | v._hx_index << 25;
		return this.blendAlphaOp = v;
	}
	,__class__: h3d_mat_Pass
};
var h3d_mat_Stencil = function() {
	this.opBits = 0;
	this.maskBits = 0;
	this.setOp(h3d_mat_StencilOp.Keep,h3d_mat_StencilOp.Keep,h3d_mat_StencilOp.Keep);
	this.setFunc(h3d_mat_Compare.Always);
};
h3d_mat_Stencil.__name__ = "h3d.mat.Stencil";
h3d_mat_Stencil.prototype = {
	setFront: function(stfail,dpfail,pass) {
		this.set_frontSTfail(stfail);
		this.set_frontDPfail(dpfail);
		this.set_frontPass(pass);
	}
	,setBack: function(stfail,dpfail,pass) {
		this.set_backSTfail(stfail);
		this.set_backDPfail(dpfail);
		this.set_backPass(pass);
	}
	,setOp: function(stfail,dpfail,pass) {
		this.setFront(stfail,dpfail,pass);
		this.setBack(stfail,dpfail,pass);
	}
	,setFunc: function(f,reference,readMask,writeMask) {
		if(writeMask == null) {
			writeMask = 255;
		}
		if(readMask == null) {
			readMask = 255;
		}
		if(reference == null) {
			reference = 0;
		}
		this.set_frontTest(this.set_backTest(f));
		this.set_reference(reference);
		this.set_readMask(readMask);
		this.set_writeMask(writeMask);
	}
	,set_readMask: function(v) {
		this.maskBits = this.maskBits & -256 | v & 255;
		return this.readMask = v;
	}
	,set_writeMask: function(v) {
		this.maskBits = this.maskBits & -65281 | (v & 255) << 8;
		return this.writeMask = v;
	}
	,set_reference: function(v) {
		this.maskBits = this.maskBits & -16711681 | (v & 255) << 16;
		return this.reference = v;
	}
	,set_frontTest: function(v) {
		this.opBits = this.opBits & -8 | v._hx_index;
		return this.frontTest = v;
	}
	,set_frontPass: function(v) {
		this.opBits = this.opBits & -57 | v._hx_index << 3;
		return this.frontPass = v;
	}
	,set_frontSTfail: function(v) {
		this.opBits = this.opBits & -449 | v._hx_index << 6;
		return this.frontSTfail = v;
	}
	,set_frontDPfail: function(v) {
		this.opBits = this.opBits & -3585 | v._hx_index << 9;
		return this.frontDPfail = v;
	}
	,set_backTest: function(v) {
		this.opBits = this.opBits & -28673 | v._hx_index << 12;
		return this.backTest = v;
	}
	,set_backPass: function(v) {
		this.opBits = this.opBits & -229377 | v._hx_index << 15;
		return this.backPass = v;
	}
	,set_backSTfail: function(v) {
		this.opBits = this.opBits & -1835009 | v._hx_index << 18;
		return this.backSTfail = v;
	}
	,set_backDPfail: function(v) {
		this.opBits = this.opBits & -14680065 | v._hx_index << 21;
		return this.backDPfail = v;
	}
	,__class__: h3d_mat_Stencil
};
var hxd_PixelFormat = $hxEnums["hxd.PixelFormat"] = { __ename__:true,__constructs__:null
	,ARGB: {_hx_name:"ARGB",_hx_index:0,__enum__:"hxd.PixelFormat",toString:$estr}
	,BGRA: {_hx_name:"BGRA",_hx_index:1,__enum__:"hxd.PixelFormat",toString:$estr}
	,RGBA: {_hx_name:"RGBA",_hx_index:2,__enum__:"hxd.PixelFormat",toString:$estr}
	,RGBA16F: {_hx_name:"RGBA16F",_hx_index:3,__enum__:"hxd.PixelFormat",toString:$estr}
	,RGBA32F: {_hx_name:"RGBA32F",_hx_index:4,__enum__:"hxd.PixelFormat",toString:$estr}
	,R8: {_hx_name:"R8",_hx_index:5,__enum__:"hxd.PixelFormat",toString:$estr}
	,R16F: {_hx_name:"R16F",_hx_index:6,__enum__:"hxd.PixelFormat",toString:$estr}
	,R32F: {_hx_name:"R32F",_hx_index:7,__enum__:"hxd.PixelFormat",toString:$estr}
	,RG8: {_hx_name:"RG8",_hx_index:8,__enum__:"hxd.PixelFormat",toString:$estr}
	,RG16F: {_hx_name:"RG16F",_hx_index:9,__enum__:"hxd.PixelFormat",toString:$estr}
	,RG32F: {_hx_name:"RG32F",_hx_index:10,__enum__:"hxd.PixelFormat",toString:$estr}
	,RGB8: {_hx_name:"RGB8",_hx_index:11,__enum__:"hxd.PixelFormat",toString:$estr}
	,RGB16F: {_hx_name:"RGB16F",_hx_index:12,__enum__:"hxd.PixelFormat",toString:$estr}
	,RGB32F: {_hx_name:"RGB32F",_hx_index:13,__enum__:"hxd.PixelFormat",toString:$estr}
	,SRGB: {_hx_name:"SRGB",_hx_index:14,__enum__:"hxd.PixelFormat",toString:$estr}
	,SRGB_ALPHA: {_hx_name:"SRGB_ALPHA",_hx_index:15,__enum__:"hxd.PixelFormat",toString:$estr}
	,RGB10A2: {_hx_name:"RGB10A2",_hx_index:16,__enum__:"hxd.PixelFormat",toString:$estr}
	,RG11B10UF: {_hx_name:"RG11B10UF",_hx_index:17,__enum__:"hxd.PixelFormat",toString:$estr}
	,R16U: {_hx_name:"R16U",_hx_index:18,__enum__:"hxd.PixelFormat",toString:$estr}
	,RGB16U: {_hx_name:"RGB16U",_hx_index:19,__enum__:"hxd.PixelFormat",toString:$estr}
	,RGBA16U: {_hx_name:"RGBA16U",_hx_index:20,__enum__:"hxd.PixelFormat",toString:$estr}
	,S3TC: ($_=function(v) { return {_hx_index:21,v:v,__enum__:"hxd.PixelFormat",toString:$estr}; },$_._hx_name="S3TC",$_.__params__ = ["v"],$_)
};
hxd_PixelFormat.__constructs__ = [hxd_PixelFormat.ARGB,hxd_PixelFormat.BGRA,hxd_PixelFormat.RGBA,hxd_PixelFormat.RGBA16F,hxd_PixelFormat.RGBA32F,hxd_PixelFormat.R8,hxd_PixelFormat.R16F,hxd_PixelFormat.R32F,hxd_PixelFormat.RG8,hxd_PixelFormat.RG16F,hxd_PixelFormat.RG32F,hxd_PixelFormat.RGB8,hxd_PixelFormat.RGB16F,hxd_PixelFormat.RGB32F,hxd_PixelFormat.SRGB,hxd_PixelFormat.SRGB_ALPHA,hxd_PixelFormat.RGB10A2,hxd_PixelFormat.RG11B10UF,hxd_PixelFormat.R16U,hxd_PixelFormat.RGB16U,hxd_PixelFormat.RGBA16U,hxd_PixelFormat.S3TC];
hxd_PixelFormat.__empty_constructs__ = [hxd_PixelFormat.ARGB,hxd_PixelFormat.BGRA,hxd_PixelFormat.RGBA,hxd_PixelFormat.RGBA16F,hxd_PixelFormat.RGBA32F,hxd_PixelFormat.R8,hxd_PixelFormat.R16F,hxd_PixelFormat.R32F,hxd_PixelFormat.RG8,hxd_PixelFormat.RG16F,hxd_PixelFormat.RG32F,hxd_PixelFormat.RGB8,hxd_PixelFormat.RGB16F,hxd_PixelFormat.RGB32F,hxd_PixelFormat.SRGB,hxd_PixelFormat.SRGB_ALPHA,hxd_PixelFormat.RGB10A2,hxd_PixelFormat.RG11B10UF,hxd_PixelFormat.R16U,hxd_PixelFormat.RGB16U,hxd_PixelFormat.RGBA16U];
var h3d_mat_Texture = function(w,h,flags,format) {
	this.lodBias = 0.;
	var engine = h3d_Engine.CURRENT;
	this.mem = engine.mem;
	if(format == null) {
		format = h3d_mat_Texture.nativeFormat;
	}
	this.id = ++h3d_mat_Texture.UID;
	this.format = format;
	var this1 = 0;
	this.flags = this1;
	if(flags != null) {
		var _g = 0;
		while(_g < flags.length) {
			var f = flags[_g];
			++_g;
			this.flags |= 1 << f._hx_index;
		}
	}
	var tw = 1;
	var th = 1;
	while(tw < w) tw <<= 1;
	while(th < h) th <<= 1;
	if(tw != w || th != h) {
		this.flags |= 1 << h3d_mat_TextureFlags.IsNPOT._hx_index;
	}
	if((this.flags & 1 << h3d_mat_TextureFlags.Target._hx_index) != 0) {
		this.realloc = function() {
		};
	}
	this.width = w;
	this.height = h;
	this.set_mipMap((this.flags & 1 << h3d_mat_TextureFlags.MipMapped._hx_index) != 0 ? h3d_mat_MipMap.Nearest : h3d_mat_MipMap.None);
	this.set_filter(h3d_mat_Filter.Linear);
	this.set_wrap(h3d_mat_Wrap.Clamp);
	this.bits &= 32767;
	if((this.flags & 1 << h3d_mat_TextureFlags.NoAlloc._hx_index) == 0) {
		this.alloc();
	}
};
h3d_mat_Texture.__name__ = "h3d.mat.Texture";
h3d_mat_Texture.fromColor = function(color,alpha) {
	if(alpha == null) {
		alpha = 1.;
	}
	var engine = h3d_Engine.CURRENT;
	var aval = alpha * 255 | 0;
	if(aval < 0) {
		aval = 0;
	} else if(aval > 255) {
		aval = 255;
	}
	var key = color & 16777215 | aval << 24;
	var t = engine.textureColorCache.h[key];
	if(t != null) {
		return t;
	}
	var t = new h3d_mat_Texture(1,1,null);
	t.clear(color,alpha);
	t.realloc = function() {
		t.clear(color,alpha);
	};
	engine.textureColorCache.h[key] = t;
	return t;
};
h3d_mat_Texture.defaultCubeTexture = function() {
	var engine = h3d_Engine.CURRENT;
	var t = engine.resCache.h[h3d_mat_Texture.__id__];
	if(t != null) {
		return t;
	}
	t = new h3d_mat_Texture(1,1,[h3d_mat_TextureFlags.Cube]);
	t.clear(2105376);
	t.realloc = function() {
		t.clear(2105376);
	};
	engine.resCache.set(h3d_mat_Texture,t);
	return t;
};
h3d_mat_Texture.prototype = {
	set_lastFrame: function(lf) {
		if(this._lastFrame != h3d_mat_Texture.PREVENT_AUTO_DISPOSE) {
			this._lastFrame = lf;
		}
		return this._lastFrame;
	}
	,get_lastFrame: function() {
		return this._lastFrame;
	}
	,get_mipLevels: function() {
		if((this.flags & 1 << h3d_mat_TextureFlags.MipMapped._hx_index) == 0) {
			return 1;
		}
		var lv = 1;
		var w = this.width;
		var h = this.height;
		while(w >> lv >= 1 || h >> lv >= 1) ++lv;
		return lv;
	}
	,get_layerCount: function() {
		if((this.flags & 1 << h3d_mat_TextureFlags.Cube._hx_index) != 0) {
			return 6;
		} else {
			return 1;
		}
	}
	,alloc: function() {
		if(this.t == null) {
			this.mem.allocTexture(this);
		}
	}
	,toString: function() {
		var str = this.name;
		if(this.name == null) {
			str = "Texture_" + this.id;
		}
		return str + "(" + this.width + "x" + this.height + ")";
	}
	,setName: function(n) {
		this.name = n;
	}
	,set_mipMap: function(m) {
		this.bits = this.bits & -4 | m._hx_index;
		return this.mipMap = m;
	}
	,set_filter: function(f) {
		this.bits = this.bits & -25 | f._hx_index << 3;
		return this.filter = f;
	}
	,set_wrap: function(w) {
		this.bits = this.bits & -193 | w._hx_index << 6;
		return this.wrap = w;
	}
	,clear: function(color,alpha,layer) {
		if(layer == null) {
			layer = -1;
		}
		if(alpha == null) {
			alpha = 1.;
		}
		this.alloc();
		if(this.width == 0 || this.height == 0) {
			return;
		}
		if(this.width != 1 || this.height != 1) {
			var engine = h3d_Engine.CURRENT;
			color |= ((alpha < 0. ? 0. : alpha > 1. ? 1. : alpha) * 255 | 0) << 24;
			if(layer < 0) {
				var _g = 0;
				var _g1 = this.get_layerCount();
				while(_g < _g1) {
					var i = _g++;
					engine.pushTarget(this,i);
					engine.clear(color);
					engine.popTarget();
				}
			} else {
				engine.pushTarget(this,layer);
				engine.clear(color);
				engine.popTarget();
			}
		} else {
			var p = hxd_Pixels.alloc(this.width,this.height,h3d_mat_Texture.nativeFormat);
			var k = 0;
			var b = color & 255;
			var g = color >> 8 & 255;
			var r = color >> 16 & 255;
			var a = alpha * 255 | 0;
			if(a < 0) {
				a = 0;
			} else if(a > 255) {
				a = 255;
			}
			switch(h3d_mat_Texture.nativeFormat._hx_index) {
			case 1:
				var tmp = r;
				r = b;
				b = tmp;
				break;
			case 2:
				break;
			default:
				throw haxe_Exception.thrown("TODO");
			}
			var _g = 0;
			var _g1 = this.width * this.height;
			while(_g < _g1) {
				var i = _g++;
				p.bytes.b[k++] = r;
				p.bytes.b[k++] = g;
				p.bytes.b[k++] = b;
				p.bytes.b[k++] = a;
			}
			if(layer < 0) {
				var _g = 0;
				var _g1 = this.get_layerCount();
				while(_g < _g1) {
					var i = _g++;
					this.uploadPixels(p,0,i);
				}
			} else {
				this.uploadPixels(p,0,layer);
			}
			p.dispose();
		}
	}
	,checkSize: function(width,height,mip) {
		var mw = this.width >> mip;
		if(mw == 0) {
			mw = 1;
		}
		var mh = this.height >> mip;
		if(mh == 0) {
			mh = 1;
		}
		if(width != mw || height != mh) {
			throw haxe_Exception.thrown("Invalid upload size : " + width + "x" + height + " should be " + mw + "x" + mh);
		}
	}
	,checkMipMapGen: function(mipLevel,layer) {
		if(mipLevel == 0 && (this.flags & 1 << h3d_mat_TextureFlags.MipMapped._hx_index) != 0 && (this.flags & 1 << h3d_mat_TextureFlags.ManualMipMapGen._hx_index) == 0 && layer == this.get_layerCount() - 1) {
			this.mem.driver.generateMipMaps(this);
		}
	}
	,uploadPixels: function(pixels,mipLevel,layer) {
		if(layer == null) {
			layer = 0;
		}
		if(mipLevel == null) {
			mipLevel = 0;
		}
		this.alloc();
		this.checkSize(pixels.width,pixels.height,mipLevel);
		this.mem.driver.uploadTexturePixels(this,pixels,mipLevel,layer);
		this.flags |= 1 << h3d_mat_TextureFlags.WasCleared._hx_index;
		this.checkMipMapGen(mipLevel,layer);
	}
	,dispose: function() {
		if(this.t != null) {
			this.mem.deleteTexture(this);
		}
	}
	,__class__: h3d_mat_Texture
};
var h3d_mat_TextureArray = function(w,h,layers,flags,format) {
	this.layers = layers;
	if(flags == null) {
		flags = [];
	}
	flags.push(h3d_mat_TextureFlags.IsArray);
	h3d_mat_Texture.call(this,w,h,flags,format);
};
h3d_mat_TextureArray.__name__ = "h3d.mat.TextureArray";
h3d_mat_TextureArray.__super__ = h3d_mat_Texture;
h3d_mat_TextureArray.prototype = $extend(h3d_mat_Texture.prototype,{
	get_layerCount: function() {
		return this.layers;
	}
	,toString: function() {
		return h3d_mat_Texture.prototype.toString.call(this) + "[" + this.layers + "]";
	}
	,__class__: h3d_mat_TextureArray
});
var h3d_pass_Base = function(name) {
	this.name = name;
};
h3d_pass_Base.__name__ = "h3d.pass.Base";
h3d_pass_Base.prototype = {
	setContext: function(ctx) {
		this.ctx = ctx;
	}
	,draw: function(passes,sort) {
	}
	,__class__: h3d_pass_Base
};
var h3d_pass_ScreenFx = function(shader,output) {
	this.shader = shader;
	this.shaders = new hxsl_ShaderList(shader);
	this.manager = new h3d_pass_ShaderManager(output);
	this.pass = new h3d_mat_Pass("screenfx",new hxsl_ShaderList(shader));
	this.pass.set_culling(h3d_mat_Face.None);
	this.pass.depth(false,h3d_mat_Compare.Always);
};
h3d_pass_ScreenFx.__name__ = "h3d.pass.ScreenFx";
h3d_pass_ScreenFx.prototype = {
	get_engine: function() {
		if(this._engine == null) {
			this._engine = h3d_Engine.CURRENT;
		}
		return this._engine;
	}
	,render: function() {
		if(this.primitive == null) {
			this.primitive = h3d_prim_Plane2D.get();
		}
		this.shader.flipY__ = this.get_engine().driver.hasFeature(h3d_impl_Feature.BottomLeftCoords) && this.get_engine().getCurrentTarget() != null ? -1 : 1;
		var rts = this.manager.compileShaders(this.shaders);
		this.get_engine().selectMaterial(this.pass);
		this.get_engine().selectShader(rts);
		if(this.buffers == null) {
			this.buffers = new h3d_shader_Buffers(rts);
		} else {
			var _this = this.buffers;
			_this.vertex.grow(rts.vertex);
			_this.fragment.grow(rts.fragment);
		}
		this.manager.fillGlobals(this.buffers,rts);
		this.manager.fillParams(this.buffers,rts,this.shaders);
		this.get_engine().uploadShaderBuffers(this.buffers,0);
		this.get_engine().uploadShaderBuffers(this.buffers,1);
		this.get_engine().uploadShaderBuffers(this.buffers,2);
		this.primitive.render(this.get_engine());
	}
	,dispose: function() {
	}
	,__class__: h3d_pass_ScreenFx
};
var h3d_pass_Blur = function(radius,gain,linear,quality) {
	if(quality == null) {
		quality = 1.;
	}
	if(linear == null) {
		linear = 0.;
	}
	if(gain == null) {
		gain = 1.;
	}
	if(radius == null) {
		radius = 1.;
	}
	this.cubeDir = [h3d_Matrix.L([0,0,-1,0,0,-1,0,0,1,0,0,0]),h3d_Matrix.L([0,0,1,0,0,-1,0,0,-1,0,0,0]),h3d_Matrix.L([1,0,0,0,0,0,1,0,0,1,0,0]),h3d_Matrix.L([1,0,0,0,0,0,-1,0,0,-1,0,0]),h3d_Matrix.L([1,0,0,0,0,-1,0,0,0,1,0,0]),h3d_Matrix.L([-1,0,0,0,0,-1,0,0,0,0,-1,0])];
	h3d_pass_ScreenFx.call(this,new h3d_shader_Blur());
	this.set_radius(radius);
	this.set_quality(quality);
	this.set_gain(gain);
	this.set_linear(linear);
};
h3d_pass_Blur.__name__ = "h3d.pass.Blur";
h3d_pass_Blur.__super__ = h3d_pass_ScreenFx;
h3d_pass_Blur.prototype = $extend(h3d_pass_ScreenFx.prototype,{
	set_radius: function(r) {
		if(this.radius == r) {
			return r;
		}
		this.values = null;
		return this.radius = r;
	}
	,set_quality: function(q) {
		if(this.quality == q) {
			return q;
		}
		this.values = null;
		return this.quality = q;
	}
	,set_gain: function(s) {
		if(this.gain == s) {
			return s;
		}
		this.values = null;
		return this.gain = s;
	}
	,set_linear: function(b) {
		if(this.linear == b) {
			return b;
		}
		this.values = null;
		return this.linear = b;
	}
	,gauss: function(x,s) {
		if(s <= 0) {
			if(x == 0) {
				return 1;
			} else {
				return 0;
			}
		}
		var sq = s * s;
		var p = Math.pow(2.718281828459,-(x * x) / (2 * sq));
		return p / Math.sqrt(2 * Math.PI * sq);
	}
	,calcValues: function() {
		this.values = [];
		this.offsets = [];
		var tot = 0.;
		var f = this.quality;
		var qadj = (f < 0. ? 0. : f > 1. ? 1. : f) * 0.7 + 0.3;
		var width;
		if(this.radius > 0) {
			var a = this.radius - 1;
			width = Math.ceil((a < 1 ? 1 : a) * qadj / 2);
		} else {
			width = 0;
		}
		var sigma = Math.sqrt(this.radius);
		var _g = 0;
		var _g1 = width + 1;
		while(_g < _g1) {
			var i = _g++;
			var i1 = i * 2;
			var i2 = i == 0 ? 0 : i * 2 - 1;
			var g1 = this.gauss(i1,sigma);
			var g2 = this.gauss(i2,sigma);
			var g = g1 + g2;
			this.values[i] = g;
			this.offsets[i] = i == 0 ? 0 : (g1 * i1 + g2 * i2) / (g * i * Math.sqrt(qadj));
			tot += g;
			if(i > 0) {
				tot += g;
			}
		}
		var minVal = this.values[0] * (0.01 / qadj);
		while(this.values.length > 2) {
			var last = this.values[this.values.length - 1];
			if(last > minVal) {
				break;
			}
			tot -= last * 2;
			this.values.pop();
		}
		tot /= this.gain;
		var _g = 0;
		var _g1 = this.values.length;
		while(_g < _g1) {
			var i = _g++;
			this.values[i] /= tot;
		}
		if(this.linear > 0) {
			var m = this.gain / (this.values.length * 2 - 1);
			var _g = 0;
			var _g1 = this.values.length;
			while(_g < _g1) {
				var i = _g++;
				var a = this.values[i];
				this.values[i] = a + this.linear * (m - a);
				var a1 = this.offsets[i];
				this.offsets[i] = a1 + this.linear * ((i == 0 ? 0 : (i * 2 - 0.5) / (i * qadj)) - a1);
			}
		}
	}
	,apply: function(ctx,src,output) {
		if(this.radius <= 0 && this.shader.fixedColor__ == null) {
			if(output != null) {
				h3d_pass_Copy.run(src,output);
			}
			return;
		}
		if(output == null) {
			output = src;
		}
		if(this.values == null) {
			this.calcValues();
		}
		var isCube = (src.flags & 1 << h3d_mat_TextureFlags.Cube._hx_index) != 0;
		var faceCount = isCube ? 6 : 1;
		var tmp = ctx.textures.allocTarget(src.name + "BlurTmp",src.width,src.height,false,src.format,isCube);
		var _this = this.shader;
		_this.constModified = true;
		_this.Quality__ = this.values.length;
		this.shader.values__ = this.values;
		this.shader.offsets__ = this.offsets;
		if(isCube) {
			this.shader.cubeTexture__ = src;
			var _this = this.shader;
			_this.constModified = true;
			_this.isCube__ = true;
		} else {
			this.shader.texture__ = src;
			var _this = this.shader;
			_this.constModified = true;
			_this.isCube__ = false;
		}
		var _this = this.shader.pixel__;
		var x = 1 / src.width;
		var y = 0;
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = 0.;
		_this.w = 1.;
		var _g = 0;
		var _g1 = faceCount;
		while(_g < _g1) {
			var i = _g++;
			this.get_engine().pushTarget(tmp,i);
			if(isCube) {
				this.shader.cubeDir__ = this.cubeDir[i];
			}
			this.render();
			this.get_engine().popTarget();
		}
		if(isCube) {
			this.shader.cubeTexture__ = tmp;
		} else {
			this.shader.texture__ = tmp;
		}
		var _this = this.shader.pixel__;
		var x = 0;
		var y = 1 / src.height;
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = 0.;
		_this.w = 1.;
		var outDepth = output.depthBuffer;
		output.depthBuffer = null;
		var _g = 0;
		var _g1 = faceCount;
		while(_g < _g1) {
			var i = _g++;
			this.get_engine().pushTarget(output,i);
			if(isCube) {
				this.shader.cubeDir__ = this.cubeDir[i];
			}
			this.render();
			this.get_engine().popTarget();
		}
		output.depthBuffer = outDepth;
	}
	,__class__: h3d_pass_Blur
});
var hxsl_Shader = function() {
	this.priority = 0;
	this.initialize();
};
hxsl_Shader.__name__ = "hxsl.Shader";
hxsl_Shader.prototype = {
	initialize: function() {
		this.constModified = true;
		if(this.shader != null) {
			return;
		}
		var cl = js_Boot.getClass(this);
		this.shader = cl._SHADER;
		if(this.shader == null) {
			var curClass = cl;
			while(curClass != null && curClass.SRC == null) curClass = curClass.__super__;
			if(curClass == null) {
				throw haxe_Exception.thrown(cl.__name__ + " has no shader source");
			}
			this.shader = curClass._SHADER;
			if(this.shader == null) {
				this.shader = new hxsl_SharedShader(curClass.SRC);
				curClass._SHADER = this.shader;
			}
		}
	}
	,setPriority: function(v) {
		this.priority = v;
	}
	,getParamValue: function(index) {
		throw haxe_Exception.thrown("assert");
	}
	,getParamFloatValue: function(index) {
		throw haxe_Exception.thrown("assert");
	}
	,updateConstants: function(globals) {
		throw haxe_Exception.thrown("assert");
	}
	,updateConstantsFinal: function(globals) {
		var c = this.shader.consts;
		while(c != null) {
			if(c.globalId == 0) {
				c = c.next;
				continue;
			}
			var v = globals.map.h[c.globalId];
			var _g = c.v.type;
			switch(_g._hx_index) {
			case 1:
				var v1 = v;
				if(v1 >>> c.bits != 0) {
					throw haxe_Exception.thrown("Constant " + c.v.name + " is outside range (" + v1 + " > " + ((1 << c.bits) - 1) + ")");
				}
				this.constBits |= v1 << c.pos;
				break;
			case 2:
				var v2 = v;
				if(v2) {
					this.constBits |= 1 << c.pos;
				}
				break;
			case 17:
				var count = _g.size;
				if(v == null) {
					c = c.next;
					continue;
				}
				var v3 = v;
				var sel = v3.channel;
				if(v3.texture == null) {
					sel = hxsl_Channel.Unknown;
				} else if(sel == null || sel == hxsl_Channel.Unknown) {
					switch(count) {
					case 1:
						if(v3.texture.format == h3d_mat_Texture.nativeFormat) {
							sel = hxsl_Channel.PackedFloat;
						} else {
							throw haxe_Exception.thrown("Constant " + c.v.name + " does not define channel select value");
						}
						break;
					case 3:
						if(v3.texture.format == h3d_mat_Texture.nativeFormat) {
							sel = hxsl_Channel.PackedNormal;
						} else {
							throw haxe_Exception.thrown("Constant " + c.v.name + " does not define channel select value");
						}
						break;
					default:
						throw haxe_Exception.thrown("Constant " + c.v.name + " does not define channel select value");
					}
				}
				this.constBits |= (globals.allocChannelID(v3.texture) << 3 | sel._hx_index) << c.pos;
				break;
			default:
				throw haxe_Exception.thrown("assert");
			}
			c = c.next;
		}
		var _this = this.shader;
		var constBits = this.constBits;
		var i = _this.instanceCache.h[constBits];
		this.instance = i == null ? _this.makeInstance(constBits) : i;
	}
	,toString: function() {
		var c = js_Boot.getClass(this);
		return c.__name__;
	}
	,__class__: hxsl_Shader
};
var h3d_shader_ScreenShader = function() {
	this.flipY__ = 0;
	hxsl_Shader.call(this);
};
h3d_shader_ScreenShader.__name__ = "h3d.shader.ScreenShader";
h3d_shader_ScreenShader.__super__ = hxsl_Shader;
h3d_shader_ScreenShader.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		if(index == 0) {
			return this.flipY__;
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		if(index == 0) {
			return this.flipY__;
		}
		return 0.;
	}
	,__class__: h3d_shader_ScreenShader
});
var h3d_pass__$Border_BorderShader = function() {
	this.color__ = new h3d_Vector();
	h3d_shader_ScreenShader.call(this);
};
h3d_pass__$Border_BorderShader.__name__ = "h3d.pass._Border.BorderShader";
h3d_pass__$Border_BorderShader.__super__ = h3d_shader_ScreenShader;
h3d_pass__$Border_BorderShader.prototype = $extend(h3d_shader_ScreenShader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.flipY__;
		case 1:
			return this.color__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		if(index == 0) {
			return this.flipY__;
		}
		return 0.;
	}
	,__class__: h3d_pass__$Border_BorderShader
});
var h3d_pass_Border = function(width,height,size) {
	if(size == null) {
		size = 1;
	}
	h3d_pass_ScreenFx.call(this,new h3d_pass__$Border_BorderShader());
	var this1 = hxd__$FloatBuffer_Float32Expand._new(0);
	var bbuf = this1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 0 / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - 0 / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = width / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - 0 / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 0 / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - size / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = width / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - size / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 0 / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - 0 / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = size / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - 0 / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 0 / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - height / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = size / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - height / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 0 / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - (height - size) / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = width / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - (height - size) / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 0 / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - height / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = width / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - height / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = (width - size) / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - 0 / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = width / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - 0 / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = (width - size) / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - height / height * 2;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = width / width * 2 - 1;
	if(bbuf.pos == bbuf.array.length) {
		var newSize = bbuf.array.length << 1;
		if(newSize < 128) {
			newSize = 128;
		}
		var newArray = new Float32Array(newSize);
		newArray.set(bbuf.array);
		bbuf.array = newArray;
	}
	bbuf.array[bbuf.pos++] = 1 - height / height * 2;
	this.primitive = new h3d_prim_RawPrimitive({ vbuf : bbuf, stride : 2, quads : true},true);
	var _this = this.shader.color__;
	var x = 1;
	var y = 1;
	var z = 1;
	var w = 1;
	if(w == null) {
		w = 1.;
	}
	if(z == null) {
		z = 0.;
	}
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	_this.x = x;
	_this.y = y;
	_this.z = z;
	_this.w = w;
};
h3d_pass_Border.__name__ = "h3d.pass.Border";
h3d_pass_Border.__super__ = h3d_pass_ScreenFx;
h3d_pass_Border.prototype = $extend(h3d_pass_ScreenFx.prototype,{
	dispose: function() {
		h3d_pass_ScreenFx.prototype.dispose.call(this);
		this.primitive.dispose();
	}
	,__class__: h3d_pass_Border
});
var h3d_pass_ColorMatrixShader = function() {
	this.maskChannel__ = new h3d_Vector();
	this.maskPower__ = 0;
	this.maskMatB__ = new h3d_Vector();
	this.maskMatA__ = new h3d_Vector();
	this.matrix2__ = new h3d_Matrix();
	this.matrix__ = new h3d_Matrix();
	h3d_shader_ScreenShader.call(this);
};
h3d_pass_ColorMatrixShader.__name__ = "h3d.pass.ColorMatrixShader";
h3d_pass_ColorMatrixShader.__super__ = h3d_shader_ScreenShader;
h3d_pass_ColorMatrixShader.prototype = $extend(h3d_shader_ScreenShader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.useAlpha__) {
			this.constBits |= 1;
		}
		if(this.useMask__) {
			this.constBits |= 2;
		}
		if(this.maskInvert__) {
			this.constBits |= 4;
		}
		if(this.hasSecondMatrix__) {
			this.constBits |= 8;
		}
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.flipY__;
		case 1:
			return this.texture__;
		case 2:
			return this.matrix__;
		case 3:
			return this.useAlpha__;
		case 4:
			return this.useMask__;
		case 5:
			return this.maskInvert__;
		case 6:
			return this.hasSecondMatrix__;
		case 7:
			return this.matrix2__;
		case 8:
			return this.mask__;
		case 9:
			return this.maskMatA__;
		case 10:
			return this.maskMatB__;
		case 11:
			return this.maskPower__;
		case 12:
			return this.maskChannel__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		switch(index) {
		case 0:
			return this.flipY__;
		case 11:
			return this.maskPower__;
		default:
		}
		return 0.;
	}
	,__class__: h3d_pass_ColorMatrixShader
});
var h3d_pass__$Copy_ArrayCopyShader = function() {
	this.layer__ = 0;
	h3d_shader_ScreenShader.call(this);
};
h3d_pass__$Copy_ArrayCopyShader.__name__ = "h3d.pass._Copy.ArrayCopyShader";
h3d_pass__$Copy_ArrayCopyShader.__super__ = h3d_shader_ScreenShader;
h3d_pass__$Copy_ArrayCopyShader.prototype = $extend(h3d_shader_ScreenShader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.flipY__;
		case 1:
			return this.texture__;
		case 2:
			return this.layer__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		if(index == 0) {
			return this.flipY__;
		}
		return 0.;
	}
	,__class__: h3d_pass__$Copy_ArrayCopyShader
});
var h3d_pass__$Copy_CopyShader = function() {
	h3d_shader_ScreenShader.call(this);
};
h3d_pass__$Copy_CopyShader.__name__ = "h3d.pass._Copy.CopyShader";
h3d_pass__$Copy_CopyShader.__super__ = h3d_shader_ScreenShader;
h3d_pass__$Copy_CopyShader.prototype = $extend(h3d_shader_ScreenShader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.flipY__;
		case 1:
			return this.texture__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		if(index == 0) {
			return this.flipY__;
		}
		return 0.;
	}
	,__class__: h3d_pass__$Copy_CopyShader
});
var h3d_pass_Copy = function() {
	h3d_pass_ScreenFx.call(this,new h3d_pass__$Copy_CopyShader());
};
h3d_pass_Copy.__name__ = "h3d.pass.Copy";
h3d_pass_Copy.run = function(from,to,blend,pass,layer) {
	var engine = h3d_Engine.CURRENT;
	if(to != null && from != null && (blend == null || blend == h2d_BlendMode.None) && pass == null && layer == null && engine.driver.copyTexture(from,to)) {
		return;
	}
	var inst = engine.resCache.h[h3d_pass_Copy.__id__];
	if(inst == null) {
		inst = new h3d_pass_Copy();
		engine.resCache.set(h3d_pass_Copy,inst);
	}
	inst.apply(from,to,blend,pass,layer);
};
h3d_pass_Copy.__super__ = h3d_pass_ScreenFx;
h3d_pass_Copy.prototype = $extend(h3d_pass_ScreenFx.prototype,{
	apply: function(from,to,blend,customPass,layer) {
		if(to != null) {
			this.get_engine().pushTarget(to,layer != null ? layer : 0);
		}
		this.shader.texture__ = from;
		if(customPass != null) {
			var old = this.pass;
			this.pass = customPass;
			if(blend != null) {
				this.pass.setBlendMode(blend);
			}
			var h = this.shaders;
			while(h.next != null) h = h.next;
			h.next = this.pass.shaders;
			this.render();
			this.pass = old;
			h.next = null;
		} else {
			this.pass.setBlendMode(blend == null ? h2d_BlendMode.None : blend);
			this.render();
		}
		this.shader.texture__ = null;
		if(to != null) {
			this.get_engine().popTarget();
		}
	}
	,__class__: h3d_pass_Copy
});
var h3d_pass__$CubeCopy_CubeCopyShader = function() {
	this.mat__ = new h3d_Matrix();
	h3d_shader_ScreenShader.call(this);
};
h3d_pass__$CubeCopy_CubeCopyShader.__name__ = "h3d.pass._CubeCopy.CubeCopyShader";
h3d_pass__$CubeCopy_CubeCopyShader.__super__ = h3d_shader_ScreenShader;
h3d_pass__$CubeCopy_CubeCopyShader.prototype = $extend(h3d_shader_ScreenShader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.flipY__;
		case 1:
			return this.texture__;
		case 2:
			return this.mat__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		if(index == 0) {
			return this.flipY__;
		}
		return 0.;
	}
	,__class__: h3d_pass__$CubeCopy_CubeCopyShader
});
var h3d_pass_Default = function(name) {
	this.defaultSort = ($_=new h3d_pass_SortByMaterial(),$bind($_,$_.sort));
	h3d_pass_Base.call(this,name);
	this.manager = new h3d_pass_ShaderManager(this.getOutputs());
	this.initGlobals();
};
h3d_pass_Default.__name__ = "h3d.pass.Default";
h3d_pass_Default.__super__ = h3d_pass_Base;
h3d_pass_Default.prototype = $extend(h3d_pass_Base.prototype,{
	getCurrentPixelSize: function() {
		var t = this.ctx.engine.getCurrentTarget();
		return new h3d_Vector(2 / (t == null ? this.ctx.engine.width : t.width),2 / (t == null ? this.ctx.engine.height : t.height));
	}
	,getOutputs: function() {
		return [hxsl_Output.Value("output.color")];
	}
	,processShaders: function(p,shaders) {
		var p = this.ctx.extraShaders;
		while(p != null) {
			shaders = this.ctx.allocShaderList(p.s,shaders);
			p = p.next;
		}
		return shaders;
	}
	,setupShaders: function(passes) {
		var lightInit = false;
		var _g_o = passes.current;
		while(_g_o != null) {
			var tmp = _g_o;
			_g_o = _g_o.next;
			var p = tmp;
			var shaders = p.pass.getShadersRec();
			shaders = this.processShaders(p,shaders);
			if(p.pass.enableLights && this.ctx.lightSystem != null) {
				if(!lightInit) {
					this.ctx.lightSystem.initGlobals(this.manager.globals);
					lightInit = true;
				}
				shaders = this.ctx.lightSystem.computeLight(p.obj,shaders);
			}
			p.shader = this.manager.compileShaders(shaders,p.pass.batchMode);
			p.shaders = shaders;
			var t = p.shader.fragment.textures;
			if(t == null) {
				p.texture = 0;
			} else {
				var _this = this.manager;
				var opt = true;
				if(opt == null) {
					opt = false;
				}
				var t1;
				if(t.perObjectGlobal != null) {
					var v = _this.globals.map.h[t.perObjectGlobal.gid];
					if(v == null) {
						throw haxe_Exception.thrown("Missing global value " + t.perObjectGlobal.path + " for shader " + _this.shaderInfo(shaders,t.perObjectGlobal.path));
					}
					var _g = t.type;
					var t2;
					if(_g._hx_index == 17) {
						var _g1 = _g.size;
						t2 = true;
					} else {
						t2 = false;
					}
					t1 = t2 ? v.texture : v;
				} else {
					var si = shaders;
					var n = t.instance;
					while(--n > 0) si = si.next;
					var v1 = si.s.getParamValue(t.index);
					if(v1 == null && !opt) {
						throw haxe_Exception.thrown("Missing param value " + Std.string(si.s) + "." + t.name);
					}
					t1 = v1;
				}
				p.texture = t1 == null ? 0 : t1.id;
			}
		}
	}
	,drawObject: function(p) {
		this.ctx.drawPass = p;
		this.ctx.engine.selectMaterial(p.pass);
		p.obj.draw(this.ctx);
	}
	,draw: function(passes,sort) {
		if(passes.current == null) {
			return;
		}
		var _g = 0;
		var _g1 = this.ctx.sharedGlobals;
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			this.manager.globals.map.h[g.gid] = g.value;
		}
		this.setGlobals();
		this.setupShaders(passes);
		if(sort == null) {
			this.defaultSort(passes);
		} else {
			sort(passes);
		}
		this.ctx.currentManager = this.manager;
		var buf = this.ctx.shaderBuffers;
		var prevShader = null;
		var _g2_o = passes.current;
		while(_g2_o != null) {
			var tmp = _g2_o;
			_g2_o = _g2_o.next;
			var p = tmp;
			var v = p.obj.absPos;
			this.manager.globals.map.h[this.globalModelView_id] = v;
			if(p.shader.globals.h.hasOwnProperty(this.globalModelViewInverse_id)) {
				var v1 = p.obj.getInvPos();
				this.manager.globals.map.h[this.globalModelViewInverse_id] = v1;
			}
			if(prevShader != p.shader) {
				prevShader = p.shader;
				this.ctx.engine.selectShader(p.shader);
				if(buf == null) {
					buf = this.ctx.shaderBuffers = new h3d_shader_Buffers(p.shader);
				} else {
					var s = p.shader;
					buf.vertex.grow(s.vertex);
					buf.fragment.grow(s.fragment);
				}
				this.manager.fillGlobals(buf,p.shader);
				this.ctx.engine.uploadShaderBuffers(buf,0);
			}
			if(!p.pass.dynamicParameters) {
				this.manager.fillParams(buf,p.shader,p.shaders);
				this.ctx.engine.uploadShaderBuffers(buf,1);
				this.ctx.engine.uploadShaderBuffers(buf,2);
				this.ctx.engine.uploadShaderBuffers(buf,3);
			}
			this.drawObject(p);
		}
		var _this = this.ctx;
		_this.cachedPos = 0;
		_this.drawPass = null;
	}
	,initGlobals: function() {
		var this1 = hxsl_Globals.allocID("camera.view");
		this.cameraView_id = this1;
		var this1 = hxsl_Globals.allocID("camera.zNear");
		this.cameraNear_id = this1;
		var this1 = hxsl_Globals.allocID("camera.zFar");
		this.cameraFar_id = this1;
		var this1 = hxsl_Globals.allocID("camera.proj");
		this.cameraProj_id = this1;
		var this1 = hxsl_Globals.allocID("camera.position");
		this.cameraPos_id = this1;
		var this1 = hxsl_Globals.allocID("camera.projDiag");
		this.cameraProjDiag_id = this1;
		var this1 = hxsl_Globals.allocID("camera.projFlip");
		this.cameraProjFlip_id = this1;
		var this1 = hxsl_Globals.allocID("camera.viewProj");
		this.cameraViewProj_id = this1;
		var this1 = hxsl_Globals.allocID("camera.inverseViewProj");
		this.cameraInverseViewProj_id = this1;
		var this1 = hxsl_Globals.allocID("global.time");
		this.globalTime_id = this1;
		var this1 = hxsl_Globals.allocID("global.pixelSize");
		this.pixelSize_id = this1;
		var this1 = hxsl_Globals.allocID("global.modelView");
		this.globalModelView_id = this1;
		var this1 = hxsl_Globals.allocID("global.modelViewInverse");
		this.globalModelViewInverse_id = this1;
	}
	,setGlobals: function() {
		var v = this.ctx.camera.mcam;
		this.manager.globals.map.h[this.cameraView_id] = v;
		var v = this.ctx.camera.zNear;
		this.manager.globals.map.h[this.cameraNear_id] = v;
		var v = this.ctx.camera.zFar;
		this.manager.globals.map.h[this.cameraFar_id] = v;
		var v = this.ctx.camera.mproj;
		this.manager.globals.map.h[this.cameraProj_id] = v;
		var v = this.ctx.camera.pos;
		this.manager.globals.map.h[this.cameraPos_id] = v;
		var v = new h3d_Vector(this.ctx.camera.mproj._11,this.ctx.camera.mproj._22,this.ctx.camera.mproj._33,this.ctx.camera.mproj._44);
		this.manager.globals.map.h[this.cameraProjDiag_id] = v;
		var v = this.ctx.engine.driver.hasFeature(h3d_impl_Feature.BottomLeftCoords) && this.ctx.engine.getCurrentTarget() != null ? -1 : 1;
		this.manager.globals.map.h[this.cameraProjFlip_id] = v;
		var v = this.ctx.camera.m;
		this.manager.globals.map.h[this.cameraViewProj_id] = v;
		var v = this.ctx.camera.getInverseViewProj();
		this.manager.globals.map.h[this.cameraInverseViewProj_id] = v;
		var v = this.ctx.time;
		this.manager.globals.map.h[this.globalTime_id] = v;
		var v = this.getCurrentPixelSize();
		this.manager.globals.map.h[this.pixelSize_id] = v;
	}
	,__class__: h3d_pass_Default
});
var h3d_pass_Shadows = function(light) {
	this.pcfScale = 1.0;
	this.pcfQuality = 1;
	this.bias = 0.01;
	this.power = 30.0;
	this.samplingKind = h3d_pass_ShadowSamplingKind.None;
	this.size = 1024;
	this.mode = h3d_pass_RenderMode.None;
	this.enabled = true;
	if(this.format == null) {
		this.format = hxd_PixelFormat.R16F;
	}
	if(!h3d_Engine.CURRENT.driver.isSupportedFormat(this.format)) {
		this.format = h3d_mat_Texture.nativeFormat;
	}
	h3d_pass_Default.call(this,"shadow");
	this.light = light;
	this.blur = new h3d_pass_Blur(5);
	this.blur.set_quality(0.5);
	var _this = this.blur.shader;
	_this.constModified = true;
	_this.isDepth__ = this.format == h3d_mat_Texture.nativeFormat;
};
h3d_pass_Shadows.__name__ = "h3d.pass.Shadows";
h3d_pass_Shadows.__super__ = h3d_pass_Default;
h3d_pass_Shadows.prototype = $extend(h3d_pass_Default.prototype,{
	set_size: function(s) {
		if(s != this.size && this.staticTexture != null) {
			this.staticTexture.dispose();
			this.staticTexture = null;
		}
		return this.size = s;
	}
	,getShadowProj: function() {
		return this.lightCamera.m;
	}
	,isUsingWorldDist: function() {
		return false;
	}
	,getOutputs: function() {
		if(this.isUsingWorldDist()) {
			return [hxsl_Output.Swiz(hxsl_Output.Value("output.worldDist",1),[hxsl_Component.X,hxsl_Component.X,hxsl_Component.X,hxsl_Component.X])];
		}
		if(this.format == h3d_mat_Texture.nativeFormat) {
			return [hxsl_Output.PackFloat(hxsl_Output.Value("output.depth"))];
		}
		return [hxsl_Output.Swiz(hxsl_Output.Value("output.depth",1),[hxsl_Component.X,hxsl_Component.X,hxsl_Component.X,hxsl_Component.X])];
	}
	,createDefaultShadowMap: function() {
		var tex = h3d_mat_Texture.fromColor(16777215);
		tex.name = "defaultShadowMap";
		return tex;
	}
	,syncShader: function(texture) {
	}
	,filterPasses: function(passes) {
		if(!this.ctx.computingStatic) {
			switch(this.mode._hx_index) {
			case 0:
				return false;
			case 1:
				var tmp;
				if(this.staticTexture != null) {
					var _this = this.staticTexture;
					tmp = _this.t == null && _this.realloc == null;
				} else {
					tmp = true;
				}
				if(tmp) {
					this.staticTexture = this.createDefaultShadowMap();
				}
				this.syncShader(this.staticTexture);
				return false;
			case 2:
				return true;
			case 3:
				var tmp;
				if(this.staticTexture != null) {
					var _this = this.staticTexture;
					tmp = _this.t == null && _this.realloc == null;
				} else {
					tmp = true;
				}
				if(tmp) {
					this.staticTexture = this.createDefaultShadowMap();
				}
				return true;
			}
		} else {
			switch(this.mode._hx_index) {
			case 0:
				return false;
			case 1:
				var head = null;
				var prev = null;
				var disc = passes.discarded;
				var discQueue = passes.lastDisc;
				var cur = passes.current;
				while(cur != null) {
					if(cur.pass.isStatic == true) {
						if(head == null) {
							prev = cur;
							head = prev;
						} else {
							prev.next = cur;
							prev = cur;
						}
					} else if(disc == null) {
						discQueue = cur;
						disc = discQueue;
					} else {
						discQueue.next = cur;
						discQueue = cur;
					}
					cur = cur.next;
				}
				if(prev != null) {
					prev.next = null;
				}
				if(discQueue != null) {
					discQueue.next = null;
				}
				passes.current = head;
				passes.discarded = disc;
				passes.lastDisc = discQueue;
				return true;
			case 2:
				return false;
			case 3:
				var head = null;
				var prev = null;
				var disc = passes.discarded;
				var discQueue = passes.lastDisc;
				var cur = passes.current;
				while(cur != null) {
					if(cur.pass.isStatic == true) {
						if(head == null) {
							prev = cur;
							head = prev;
						} else {
							prev.next = cur;
							prev = cur;
						}
					} else if(disc == null) {
						discQueue = cur;
						disc = discQueue;
					} else {
						discQueue.next = cur;
						discQueue = cur;
					}
					cur = cur.next;
				}
				if(prev != null) {
					prev.next = null;
				}
				if(discQueue != null) {
					discQueue.next = null;
				}
				passes.current = head;
				passes.discarded = disc;
				passes.lastDisc = discQueue;
				return true;
			}
		}
	}
	,__class__: h3d_pass_Shadows
});
var h3d_pass_DirShadowMap = function(light) {
	this.minDist = -1.0;
	this.maxDist = -1.0;
	this.autoShrink = true;
	this.mergePass = new h3d_pass_ScreenFx(new h3d_shader_MinMaxShader());
	h3d_pass_Shadows.call(this,light);
	this.lightCamera = new h3d_Camera();
	this.lightCamera.orthoBounds = new h3d_col_Bounds();
	this.shader = this.dshader = new h3d_shader_DirShadow();
	this.border = new h3d_pass_Border(this.size,this.size);
	this.customDepth = h3d_Engine.CURRENT.driver.hasFeature(h3d_impl_Feature.AllocDepthBuffer);
	if(!this.customDepth) {
		this.depth = h3d_mat_DepthBuffer.getDefault();
	}
};
h3d_pass_DirShadowMap.__name__ = "h3d.pass.DirShadowMap";
h3d_pass_DirShadowMap.__super__ = h3d_pass_Shadows;
h3d_pass_DirShadowMap.prototype = $extend(h3d_pass_Shadows.prototype,{
	set_mode: function(m) {
		var _this = this.dshader;
		_this.constModified = true;
		_this.enable__ = m != h3d_pass_RenderMode.None;
		return this.mode = m;
	}
	,set_size: function(s) {
		if(this.border != null && this.size != s) {
			this.border.dispose();
			this.border = new h3d_pass_Border(s,s);
		}
		return h3d_pass_Shadows.prototype.set_size.call(this,s);
	}
	,calcShadowBounds: function(camera) {
		var bounds = camera.orthoBounds;
		if(this.autoShrink) {
			var mtmp = new h3d_Matrix();
			this.ctx.scene.iterVisibleMeshes(function(m) {
				if(m.primitive == null || !m.material.castShadows) {
					return;
				}
				var b = m.primitive.getBounds();
				if(b.xMin > b.xMax) {
					return;
				}
				mtmp.multiply3x4(m.getAbsPos(),camera.mcam);
				var x = b.xMin;
				var y = b.yMin;
				var z = b.zMin;
				if(z == null) {
					z = 0.;
				}
				if(y == null) {
					y = 0.;
				}
				if(x == null) {
					x = 0.;
				}
				var p_x = x;
				var p_y = y;
				var p_z = z;
				var px = p_x * mtmp._11 + p_y * mtmp._21 + p_z * mtmp._31 + mtmp._41;
				var py = p_x * mtmp._12 + p_y * mtmp._22 + p_z * mtmp._32 + mtmp._42;
				var pz = p_x * mtmp._13 + p_y * mtmp._23 + p_z * mtmp._33 + mtmp._43;
				p_x = px;
				p_y = py;
				p_z = pz;
				if(p_x < bounds.xMin) {
					bounds.xMin = p_x;
				}
				if(p_x > bounds.xMax) {
					bounds.xMax = p_x;
				}
				if(p_y < bounds.yMin) {
					bounds.yMin = p_y;
				}
				if(p_y > bounds.yMax) {
					bounds.yMax = p_y;
				}
				if(p_z < bounds.zMin) {
					bounds.zMin = p_z;
				}
				if(p_z > bounds.zMax) {
					bounds.zMax = p_z;
				}
				var x = b.xMin;
				var y = b.yMin;
				var z = b.zMax;
				if(z == null) {
					z = 0.;
				}
				if(y == null) {
					y = 0.;
				}
				if(x == null) {
					x = 0.;
				}
				var p_x = x;
				var p_y = y;
				var p_z = z;
				var px = p_x * mtmp._11 + p_y * mtmp._21 + p_z * mtmp._31 + mtmp._41;
				var py = p_x * mtmp._12 + p_y * mtmp._22 + p_z * mtmp._32 + mtmp._42;
				var pz = p_x * mtmp._13 + p_y * mtmp._23 + p_z * mtmp._33 + mtmp._43;
				p_x = px;
				p_y = py;
				p_z = pz;
				if(p_x < bounds.xMin) {
					bounds.xMin = p_x;
				}
				if(p_x > bounds.xMax) {
					bounds.xMax = p_x;
				}
				if(p_y < bounds.yMin) {
					bounds.yMin = p_y;
				}
				if(p_y > bounds.yMax) {
					bounds.yMax = p_y;
				}
				if(p_z < bounds.zMin) {
					bounds.zMin = p_z;
				}
				if(p_z > bounds.zMax) {
					bounds.zMax = p_z;
				}
				var x = b.xMin;
				var y = b.yMax;
				var z = b.zMin;
				if(z == null) {
					z = 0.;
				}
				if(y == null) {
					y = 0.;
				}
				if(x == null) {
					x = 0.;
				}
				var p_x = x;
				var p_y = y;
				var p_z = z;
				var px = p_x * mtmp._11 + p_y * mtmp._21 + p_z * mtmp._31 + mtmp._41;
				var py = p_x * mtmp._12 + p_y * mtmp._22 + p_z * mtmp._32 + mtmp._42;
				var pz = p_x * mtmp._13 + p_y * mtmp._23 + p_z * mtmp._33 + mtmp._43;
				p_x = px;
				p_y = py;
				p_z = pz;
				if(p_x < bounds.xMin) {
					bounds.xMin = p_x;
				}
				if(p_x > bounds.xMax) {
					bounds.xMax = p_x;
				}
				if(p_y < bounds.yMin) {
					bounds.yMin = p_y;
				}
				if(p_y > bounds.yMax) {
					bounds.yMax = p_y;
				}
				if(p_z < bounds.zMin) {
					bounds.zMin = p_z;
				}
				if(p_z > bounds.zMax) {
					bounds.zMax = p_z;
				}
				var x = b.xMin;
				var y = b.yMax;
				var z = b.zMax;
				if(z == null) {
					z = 0.;
				}
				if(y == null) {
					y = 0.;
				}
				if(x == null) {
					x = 0.;
				}
				var p_x = x;
				var p_y = y;
				var p_z = z;
				var px = p_x * mtmp._11 + p_y * mtmp._21 + p_z * mtmp._31 + mtmp._41;
				var py = p_x * mtmp._12 + p_y * mtmp._22 + p_z * mtmp._32 + mtmp._42;
				var pz = p_x * mtmp._13 + p_y * mtmp._23 + p_z * mtmp._33 + mtmp._43;
				p_x = px;
				p_y = py;
				p_z = pz;
				if(p_x < bounds.xMin) {
					bounds.xMin = p_x;
				}
				if(p_x > bounds.xMax) {
					bounds.xMax = p_x;
				}
				if(p_y < bounds.yMin) {
					bounds.yMin = p_y;
				}
				if(p_y > bounds.yMax) {
					bounds.yMax = p_y;
				}
				if(p_z < bounds.zMin) {
					bounds.zMin = p_z;
				}
				if(p_z > bounds.zMax) {
					bounds.zMax = p_z;
				}
				var x = b.xMax;
				var y = b.yMin;
				var z = b.zMin;
				if(z == null) {
					z = 0.;
				}
				if(y == null) {
					y = 0.;
				}
				if(x == null) {
					x = 0.;
				}
				var p_x = x;
				var p_y = y;
				var p_z = z;
				var px = p_x * mtmp._11 + p_y * mtmp._21 + p_z * mtmp._31 + mtmp._41;
				var py = p_x * mtmp._12 + p_y * mtmp._22 + p_z * mtmp._32 + mtmp._42;
				var pz = p_x * mtmp._13 + p_y * mtmp._23 + p_z * mtmp._33 + mtmp._43;
				p_x = px;
				p_y = py;
				p_z = pz;
				if(p_x < bounds.xMin) {
					bounds.xMin = p_x;
				}
				if(p_x > bounds.xMax) {
					bounds.xMax = p_x;
				}
				if(p_y < bounds.yMin) {
					bounds.yMin = p_y;
				}
				if(p_y > bounds.yMax) {
					bounds.yMax = p_y;
				}
				if(p_z < bounds.zMin) {
					bounds.zMin = p_z;
				}
				if(p_z > bounds.zMax) {
					bounds.zMax = p_z;
				}
				var x = b.xMax;
				var y = b.yMin;
				var z = b.zMax;
				if(z == null) {
					z = 0.;
				}
				if(y == null) {
					y = 0.;
				}
				if(x == null) {
					x = 0.;
				}
				var p_x = x;
				var p_y = y;
				var p_z = z;
				var px = p_x * mtmp._11 + p_y * mtmp._21 + p_z * mtmp._31 + mtmp._41;
				var py = p_x * mtmp._12 + p_y * mtmp._22 + p_z * mtmp._32 + mtmp._42;
				var pz = p_x * mtmp._13 + p_y * mtmp._23 + p_z * mtmp._33 + mtmp._43;
				p_x = px;
				p_y = py;
				p_z = pz;
				if(p_x < bounds.xMin) {
					bounds.xMin = p_x;
				}
				if(p_x > bounds.xMax) {
					bounds.xMax = p_x;
				}
				if(p_y < bounds.yMin) {
					bounds.yMin = p_y;
				}
				if(p_y > bounds.yMax) {
					bounds.yMax = p_y;
				}
				if(p_z < bounds.zMin) {
					bounds.zMin = p_z;
				}
				if(p_z > bounds.zMax) {
					bounds.zMax = p_z;
				}
				var x = b.xMax;
				var y = b.yMax;
				var z = b.zMin;
				if(z == null) {
					z = 0.;
				}
				if(y == null) {
					y = 0.;
				}
				if(x == null) {
					x = 0.;
				}
				var p_x = x;
				var p_y = y;
				var p_z = z;
				var px = p_x * mtmp._11 + p_y * mtmp._21 + p_z * mtmp._31 + mtmp._41;
				var py = p_x * mtmp._12 + p_y * mtmp._22 + p_z * mtmp._32 + mtmp._42;
				var pz = p_x * mtmp._13 + p_y * mtmp._23 + p_z * mtmp._33 + mtmp._43;
				p_x = px;
				p_y = py;
				p_z = pz;
				if(p_x < bounds.xMin) {
					bounds.xMin = p_x;
				}
				if(p_x > bounds.xMax) {
					bounds.xMax = p_x;
				}
				if(p_y < bounds.yMin) {
					bounds.yMin = p_y;
				}
				if(p_y > bounds.yMax) {
					bounds.yMax = p_y;
				}
				if(p_z < bounds.zMin) {
					bounds.zMin = p_z;
				}
				if(p_z > bounds.zMax) {
					bounds.zMax = p_z;
				}
				var x = b.xMax;
				var y = b.yMax;
				var z = b.zMax;
				if(z == null) {
					z = 0.;
				}
				if(y == null) {
					y = 0.;
				}
				if(x == null) {
					x = 0.;
				}
				var p_x = x;
				var p_y = y;
				var p_z = z;
				var px = p_x * mtmp._11 + p_y * mtmp._21 + p_z * mtmp._31 + mtmp._41;
				var py = p_x * mtmp._12 + p_y * mtmp._22 + p_z * mtmp._32 + mtmp._42;
				var pz = p_x * mtmp._13 + p_y * mtmp._23 + p_z * mtmp._33 + mtmp._43;
				p_x = px;
				p_y = py;
				p_z = pz;
				if(p_x < bounds.xMin) {
					bounds.xMin = p_x;
				}
				if(p_x > bounds.xMax) {
					bounds.xMax = p_x;
				}
				if(p_y < bounds.yMin) {
					bounds.yMin = p_y;
				}
				if(p_y > bounds.yMax) {
					bounds.yMax = p_y;
				}
				if(p_z < bounds.zMin) {
					bounds.zMin = p_z;
				}
				if(p_z > bounds.zMax) {
					bounds.zMax = p_z;
				}
			});
		} else if(this.mode == h3d_pass_RenderMode.Dynamic) {
			bounds.xMin = -1e20;
			bounds.xMax = 1e20;
			bounds.yMin = -1e20;
			bounds.yMax = 1e20;
			bounds.zMin = -1e20;
			bounds.zMax = 1e20;
		}
		if(this.mode == h3d_pass_RenderMode.Dynamic) {
			var cameraBounds = new h3d_col_Bounds();
			var zMax = 1.0;
			var zMin = 0.0;
			var n = this.ctx.camera.zNear;
			var f = this.ctx.camera.zFar;
			if(this.maxDist > 0) {
				var f1 = this.maxDist;
				var min = n;
				var max = f;
				if(max == null) {
					max = 1.;
				}
				if(min == null) {
					min = 0.;
				}
				zMax = ((f + n - 2.0 * n * f / (f1 < min ? min : f1 > max ? max : f1)) / (f - n) + 1.0) / 2.0;
			}
			if(this.minDist > 0) {
				var f1 = this.minDist;
				var min = n;
				var max = f;
				if(max == null) {
					max = 1.;
				}
				if(min == null) {
					min = 0.;
				}
				zMin = ((f + n - 2.0 * n * f / (f1 < min ? min : f1 > max ? max : f1)) / (f - n) + 1.0) / 2.0;
			}
			var _g = 0;
			var _g1 = this.ctx.camera.getFrustumCorners(zMax,zMin);
			while(_g < _g1.length) {
				var pt = _g1[_g];
				++_g;
				var m = camera.mcam;
				var px = pt.x * m._11 + pt.y * m._21 + pt.z * m._31 + pt.w * m._41;
				var py = pt.x * m._12 + pt.y * m._22 + pt.z * m._32 + pt.w * m._42;
				var pz = pt.x * m._13 + pt.y * m._23 + pt.z * m._33 + pt.w * m._43;
				var pw = pt.x * m._14 + pt.y * m._24 + pt.z * m._34 + pt.w * m._44;
				pt.x = px;
				pt.y = py;
				pt.z = pz;
				pt.w = pw;
				var x = pt.x;
				var y = pt.y;
				var z = pt.z;
				if(x < cameraBounds.xMin) {
					cameraBounds.xMin = x;
				}
				if(x > cameraBounds.xMax) {
					cameraBounds.xMax = x;
				}
				if(y < cameraBounds.yMin) {
					cameraBounds.yMin = y;
				}
				if(y > cameraBounds.yMax) {
					cameraBounds.yMax = y;
				}
				if(z < cameraBounds.zMin) {
					cameraBounds.zMin = z;
				}
				if(z > cameraBounds.zMax) {
					cameraBounds.zMax = z;
				}
			}
			if(this.autoShrink) {
				cameraBounds.zMin = bounds.zMin;
				bounds.intersection(bounds,cameraBounds);
			} else {
				bounds.load(cameraBounds);
			}
		}
		bounds.scaleCenter(1.01);
	}
	,setGlobals: function() {
		h3d_pass_Shadows.prototype.setGlobals.call(this);
		if(this.mode != h3d_pass_RenderMode.Mixed || this.ctx.computingStatic) {
			var _this = this.lightCamera.orthoBounds;
			_this.xMin = 1e20;
			_this.xMax = -1e20;
			_this.yMin = 1e20;
			_this.yMax = -1e20;
			_this.zMin = 1e20;
			_this.zMax = -1e20;
			this.calcShadowBounds(this.lightCamera);
			this.lightCamera.update();
		}
		var v = this.getShadowProj();
		this.manager.globals.map.h[this.cameraViewProj_id] = v;
	}
	,syncShader: function(texture) {
		var _this = this.dshader;
		_this.constModified = true;
		_this.shadowMap__ = texture;
		var _this = this.dshader;
		_this.constModified = true;
		_this.shadowMapChannel__ = this.format == h3d_mat_Texture.nativeFormat ? hxsl_Channel.PackedFloat : hxsl_Channel.R;
		this.dshader.shadowBias__ = this.bias;
		this.dshader.shadowPower__ = this.power;
		this.dshader.shadowProj__ = this.getShadowProj();
		var _this = this.dshader;
		_this.constModified = true;
		_this.USE_ESM__ = this.samplingKind == h3d_pass_ShadowSamplingKind.ESM;
		this.dshader.shadowPower__ = this.power;
		var _this = this.dshader;
		_this.constModified = true;
		_this.USE_PCF__ = this.samplingKind == h3d_pass_ShadowSamplingKind.PCF;
		var _this = this.dshader.shadowRes__;
		var x = texture.width;
		var y = texture.height;
		if(y == null) {
			y = 0.;
		}
		if(x == null) {
			x = 0.;
		}
		_this.x = x;
		_this.y = y;
		_this.z = 0.;
		_this.w = 1.;
		this.dshader.pcfScale__ = this.pcfScale;
		var _this = this.dshader;
		_this.constModified = true;
		_this.pcfQuality__ = this.pcfQuality;
	}
	,draw: function(passes,sort) {
		var _gthis = this;
		if(!this.enabled) {
			return;
		}
		if(!this.filterPasses(passes)) {
			return;
		}
		var f = function(col) {
			return col.inFrustum(_gthis.lightCamera.frustum);
		};
		var prevCollider = null;
		var prevResult = true;
		var head = null;
		var prev = null;
		var disc = passes.discarded;
		var discQueue = passes.lastDisc;
		var cur = passes.current;
		while(cur != null) {
			var col = cur.obj.cullingCollider;
			var tmp;
			if(col == null) {
				tmp = true;
			} else {
				if(col != prevCollider) {
					prevCollider = col;
					prevResult = f(col);
				}
				tmp = prevResult;
			}
			if(tmp) {
				if(head == null) {
					prev = cur;
					head = prev;
				} else {
					prev.next = cur;
					prev = cur;
				}
			} else if(disc == null) {
				discQueue = cur;
				disc = discQueue;
			} else {
				discQueue.next = cur;
				discQueue = cur;
			}
			cur = cur.next;
		}
		if(prev != null) {
			prev.next = null;
		}
		if(discQueue != null) {
			discQueue.next = null;
		}
		passes.current = head;
		passes.discarded = disc;
		passes.lastDisc = discQueue;
		var texture = this.ctx.textures.allocTarget("dirShadowMap",this.size,this.size,false,this.format);
		if(this.customDepth && (this.depth == null || this.depth.width != this.size || this.depth.height != this.size || this.depth.isDisposed())) {
			if(this.depth != null) {
				this.depth.dispose();
			}
			this.depth = new h3d_mat_DepthBuffer(this.size,this.size);
		}
		texture.depthBuffer = this.depth;
		if(this.mode != h3d_pass_RenderMode.Mixed || this.ctx.computingStatic) {
			var ct = this.ctx.camera.target;
			var slight = this.light == null ? this.ctx.lightSystem.shadowLight : this.light;
			var ldir = slight == null ? null : slight.getShadowDirection();
			if(ldir == null) {
				var _this = this.lightCamera.target;
				var x = 0;
				var y = 0;
				var z = -1;
				if(z == null) {
					z = 0.;
				}
				if(y == null) {
					y = 0.;
				}
				if(x == null) {
					x = 0.;
				}
				_this.x = x;
				_this.y = y;
				_this.z = z;
				_this.w = 1.;
			} else {
				var _this = this.lightCamera.target;
				var x = ldir.x;
				var y = ldir.y;
				var z = ldir.z;
				if(z == null) {
					z = 0.;
				}
				if(y == null) {
					y = 0.;
				}
				if(x == null) {
					x = 0.;
				}
				_this.x = x;
				_this.y = y;
				_this.z = z;
				_this.w = 1.;
				var _this = this.lightCamera.target;
				var k = _this.x * _this.x + _this.y * _this.y + _this.z * _this.z;
				if(k < 1e-10) {
					k = 0;
				} else {
					k = 1. / Math.sqrt(k);
				}
				_this.x *= k;
				_this.y *= k;
				_this.z *= k;
			}
			this.lightCamera.target.x += ct.x;
			this.lightCamera.target.y += ct.y;
			this.lightCamera.target.z += ct.z;
			var _this = this.lightCamera.pos;
			_this.x = ct.x;
			_this.y = ct.y;
			_this.z = ct.z;
			_this.w = ct.w;
			this.lightCamera.update();
		}
		this.ctx.engine.pushTarget(texture);
		this.ctx.engine.clear(16777215,1);
		h3d_pass_Shadows.prototype.draw.call(this,passes,sort);
		if(this.border != null) {
			this.border.render();
		}
		this.ctx.engine.popTarget();
		if(this.mode == h3d_pass_RenderMode.Mixed && !this.ctx.computingStatic) {
			var merge = this.ctx.textures.allocTarget("mergedDirShadowMap",this.size,this.size,false,this.format);
			this.mergePass.shader.texA__ = texture;
			this.mergePass.shader.texB__ = this.staticTexture;
			this.ctx.engine.pushTarget(merge);
			this.mergePass.render();
			this.ctx.engine.popTarget();
			texture = merge;
		}
		if(this.blur.radius > 0 && (this.mode != h3d_pass_RenderMode.Mixed || !this.ctx.computingStatic)) {
			this.blur.apply(this.ctx,texture);
		}
		this.syncShader(texture);
	}
	,__class__: h3d_pass_DirShadowMap
});
var h3d_pass_DefaultShadowMap = function(size,format) {
	if(size == null) {
		size = 1024;
	}
	if(format != null) {
		this.format = format;
	}
	h3d_pass_DirShadowMap.call(this,null);
	this.set_size(size);
	this.color = new h3d_Vector();
	this.set_mode(h3d_pass_RenderMode.Dynamic);
	this.shadowMapId = hxsl_Globals.allocID("shadow.map");
	this.shadowProjId = hxsl_Globals.allocID("shadow.proj");
	this.shadowColorId = hxsl_Globals.allocID("shadow.color");
	this.shadowPowerId = hxsl_Globals.allocID("shadow.power");
	this.shadowBiasId = hxsl_Globals.allocID("shadow.bias");
};
h3d_pass_DefaultShadowMap.__name__ = "h3d.pass.DefaultShadowMap";
h3d_pass_DefaultShadowMap.__super__ = h3d_pass_DirShadowMap;
h3d_pass_DefaultShadowMap.prototype = $extend(h3d_pass_DirShadowMap.prototype,{
	draw: function(passes,sort) {
		h3d_pass_DirShadowMap.prototype.draw.call(this,passes,sort);
		this.ctx.setGlobalID(this.shadowMapId,{ texture : this.dshader.shadowMap__, channel : this.format == h3d_mat_Texture.nativeFormat ? hxsl_Channel.PackedFloat : hxsl_Channel.R});
		this.ctx.setGlobalID(this.shadowProjId,this.getShadowProj());
		this.ctx.setGlobalID(this.shadowColorId,this.color);
		this.ctx.setGlobalID(this.shadowPowerId,this.power);
		this.ctx.setGlobalID(this.shadowBiasId,this.bias);
	}
	,__class__: h3d_pass_DefaultShadowMap
});
var h3d_pass__$HardwarePick_FixedColor = function() {
	this.viewport__ = new h3d_Vector();
	this.colorID__ = new h3d_Vector();
	hxsl_Shader.call(this);
};
h3d_pass__$HardwarePick_FixedColor.__name__ = "h3d.pass._HardwarePick.FixedColor";
h3d_pass__$HardwarePick_FixedColor.__super__ = hxsl_Shader;
h3d_pass__$HardwarePick_FixedColor.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.colorID__;
		case 1:
			return this.viewport__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_pass__$HardwarePick_FixedColor
});
var h3d_pass_PassList = function(current) {
	this.current = current;
	this.discarded = this.lastDisc = null;
};
h3d_pass_PassList.__name__ = "h3d.pass.PassList";
h3d_pass_PassList.prototype = {
	__class__: h3d_pass_PassList
};
var h3d_pass_PassObject = function() {
	this.texture = 0;
};
h3d_pass_PassObject.__name__ = "h3d.pass.PassObject";
h3d_pass_PassObject.prototype = {
	__class__: h3d_pass_PassObject
};
var h3d_pass_ShaderManager = function(output) {
	this.shaderCache = hxsl_Cache.get();
	this.globals = new hxsl_Globals();
	this.currentOutput = new hxsl_ShaderList(null);
	this.setOutput(output);
};
h3d_pass_ShaderManager.__name__ = "h3d.pass.ShaderManager";
h3d_pass_ShaderManager.prototype = {
	setOutput: function(output) {
		if(output == null) {
			output = [hxsl_Output.Value("output.color")];
		}
		this.currentOutput.s = this.shaderCache.getLinkShader(output);
	}
	,fillRec: function(v,type,out,pos) {
		switch(type._hx_index) {
		case 1:
			out[pos] = v;
			return 1;
		case 3:
			out[pos] = v;
			return 1;
		case 5:
			var _g = type.t;
			var n = type.size;
			var v1 = v;
			out[pos++] = v1.x;
			out[pos++] = v1.y;
			switch(n) {
			case 3:
				out[pos++] = v1.z;
				break;
			case 4:
				out[pos++] = v1.z;
				out[pos++] = v1.w;
				break;
			}
			return n;
		case 6:
			var m = v;
			out[pos++] = m._11;
			out[pos++] = m._21;
			out[pos++] = m._31;
			out[pos++] = 0;
			out[pos++] = m._12;
			out[pos++] = m._22;
			out[pos++] = m._32;
			out[pos++] = 0;
			out[pos++] = m._13;
			out[pos++] = m._23;
			out[pos++] = m._33;
			out[pos++] = 0;
			return 12;
		case 7:
			var m = v;
			out[pos++] = m._11;
			out[pos++] = m._21;
			out[pos++] = m._31;
			out[pos++] = m._41;
			out[pos++] = m._12;
			out[pos++] = m._22;
			out[pos++] = m._32;
			out[pos++] = m._42;
			out[pos++] = m._13;
			out[pos++] = m._23;
			out[pos++] = m._33;
			out[pos++] = m._43;
			out[pos++] = m._14;
			out[pos++] = m._24;
			out[pos++] = m._34;
			out[pos++] = m._44;
			return 16;
		case 8:
			var m = v;
			out[pos++] = m._11;
			out[pos++] = m._21;
			out[pos++] = m._31;
			out[pos++] = m._41;
			out[pos++] = m._12;
			out[pos++] = m._22;
			out[pos++] = m._32;
			out[pos++] = m._42;
			out[pos++] = m._13;
			out[pos++] = m._23;
			out[pos++] = m._33;
			out[pos++] = m._43;
			return 12;
		case 13:
			var vl = type.vl;
			var tot = 0;
			var _g = 0;
			while(_g < vl.length) {
				var vv = vl[_g];
				++_g;
				tot += this.fillRec(Reflect.field(v,vv.name),vv.type,out,pos + tot);
			}
			return tot;
		case 15:
			var _g = type.t;
			var _g1 = type.size;
			switch(_g._hx_index) {
			case 3:
				if(_g1._hx_index == 0) {
					var len = _g1.v;
					var v1 = v;
					var size = 0;
					var count = v1.length < len ? v1.length : len;
					var _g2 = 0;
					var _g3 = count;
					while(_g2 < _g3) {
						var i = _g2++;
						out[pos++] = v1[i];
					}
					return len;
				} else {
					throw haxe_Exception.thrown("assert " + Std.string(type));
				}
				break;
			case 5:
				if(_g.size == 4) {
					if(_g.t._hx_index == 1) {
						if(_g1._hx_index == 0) {
							var len = _g1.v;
							var v1 = v;
							var _g2 = 0;
							var _g3 = len;
							while(_g2 < _g3) {
								var i = _g2++;
								var n = v1[i];
								if(n == null) {
									break;
								}
								out[pos++] = n.x;
								out[pos++] = n.y;
								out[pos++] = n.z;
								out[pos++] = n.w;
							}
							return len * 4;
						} else {
							throw haxe_Exception.thrown("assert " + Std.string(type));
						}
					} else if(_g1._hx_index == 0) {
						var t = _g;
						var len = _g1.v;
						var v1 = v;
						var size = 0;
						var _g2 = 0;
						var _g3 = len;
						while(_g2 < _g3) {
							var i = _g2++;
							var n = v1[i];
							if(n == null) {
								break;
							}
							size = this.fillRec(n,t,out,pos);
							pos += size;
						}
						return len * size;
					} else {
						throw haxe_Exception.thrown("assert " + Std.string(type));
					}
				} else if(_g1._hx_index == 0) {
					var t = _g;
					var len = _g1.v;
					var v1 = v;
					var size = 0;
					var _g2 = 0;
					var _g3 = len;
					while(_g2 < _g3) {
						var i = _g2++;
						var n = v1[i];
						if(n == null) {
							break;
						}
						size = this.fillRec(n,t,out,pos);
						pos += size;
					}
					return len * size;
				} else {
					throw haxe_Exception.thrown("assert " + Std.string(type));
				}
				break;
			case 8:
				if(_g1._hx_index == 0) {
					var len = _g1.v;
					var v1 = v;
					var _g2 = 0;
					var _g3 = len;
					while(_g2 < _g3) {
						var i = _g2++;
						var m = v1[i];
						if(m == null) {
							break;
						}
						out[pos++] = m._11;
						out[pos++] = m._21;
						out[pos++] = m._31;
						out[pos++] = m._41;
						out[pos++] = m._12;
						out[pos++] = m._22;
						out[pos++] = m._32;
						out[pos++] = m._42;
						out[pos++] = m._13;
						out[pos++] = m._23;
						out[pos++] = m._33;
						out[pos++] = m._43;
					}
					return len * 12;
				} else {
					throw haxe_Exception.thrown("assert " + Std.string(type));
				}
				break;
			default:
				if(_g1._hx_index == 0) {
					var t = _g;
					var len = _g1.v;
					var v1 = v;
					var size = 0;
					var _g = 0;
					var _g1 = len;
					while(_g < _g1) {
						var i = _g++;
						var n = v1[i];
						if(n == null) {
							break;
						}
						size = this.fillRec(n,t,out,pos);
						pos += size;
					}
					return len * size;
				} else {
					throw haxe_Exception.thrown("assert " + Std.string(type));
				}
			}
			break;
		default:
			throw haxe_Exception.thrown("assert " + Std.string(type));
		}
	}
	,shaderInfo: function(shaders,path) {
		var name = path.split(".").pop();
		while(shaders != null) {
			var inst = shaders.s.instance;
			var _g = 0;
			var _g1 = inst.shader.vars;
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				if(v.name == name) {
					return shaders.s.toString();
				}
			}
			shaders = shaders.next;
		}
		return "(not found)";
	}
	,fillGlobals: function(buf,s) {
		var _gthis = this;
		var s1 = s.vertex;
		var g = s1.globals;
		var ptr = buf.vertex.globals;
		while(g != null) {
			var v = _gthis.globals.map.h[g.gid];
			if(v == null) {
				if(g.path == "__consts__") {
					_gthis.fillRec(s1.consts,g.type,ptr,g.pos);
					g = g.next;
					continue;
				}
				throw haxe_Exception.thrown("Missing global value " + g.path);
			}
			_gthis.fillRec(v,g.type,ptr,g.pos);
			g = g.next;
		}
		var s1 = s.fragment;
		var g = s1.globals;
		var ptr = buf.fragment.globals;
		while(g != null) {
			var v = _gthis.globals.map.h[g.gid];
			if(v == null) {
				if(g.path == "__consts__") {
					_gthis.fillRec(s1.consts,g.type,ptr,g.pos);
					g = g.next;
					continue;
				}
				throw haxe_Exception.thrown("Missing global value " + g.path);
			}
			_gthis.fillRec(v,g.type,ptr,g.pos);
			g = g.next;
		}
	}
	,fillParams: function(buf,s,shaders) {
		var _gthis = this;
		var curInstance = -1;
		var curInstanceValue = null;
		var buf1 = buf.vertex;
		var s1 = s.vertex;
		var p = s1.params;
		var ptr = buf1.params;
		while(p != null) {
			var v;
			if(p.perObjectGlobal == null) {
				if(p.type == hxsl_Type.TFloat) {
					var index = p.instance;
					var i;
					if(curInstance == index) {
						i = curInstanceValue;
					} else {
						var si = shaders;
						curInstance = index;
						while(--index > 0) si = si.next;
						curInstanceValue = si.s;
						i = curInstanceValue;
					}
					ptr[p.pos] = i.getParamFloatValue(p.index);
					p = p.next;
					continue;
				}
				var index1 = p.instance;
				var v1;
				if(curInstance == index1) {
					v1 = curInstanceValue;
				} else {
					var si1 = shaders;
					curInstance = index1;
					while(--index1 > 0) si1 = si1.next;
					curInstanceValue = si1.s;
					v1 = curInstanceValue;
				}
				v = v1.getParamValue(p.index);
				if(v == null) {
					throw haxe_Exception.thrown("Missing param value " + Std.string(curInstanceValue) + "." + p.name);
				}
			} else if(p.perObjectGlobal != null) {
				var v2 = _gthis.globals.map.h[p.perObjectGlobal.gid];
				if(v2 == null) {
					throw haxe_Exception.thrown("Missing global value " + p.perObjectGlobal.path + " for shader " + _gthis.shaderInfo(shaders,p.perObjectGlobal.path));
				}
				var _g = p.type;
				var v3;
				if(_g._hx_index == 17) {
					var _g1 = _g.size;
					v3 = true;
				} else {
					v3 = false;
				}
				v = v3 ? v2.texture : v2;
			} else {
				var si2 = shaders;
				var n = p.instance;
				while(--n > 0) si2 = si2.next;
				var v4 = si2.s.getParamValue(p.index);
				if(v4 == null) {
					throw haxe_Exception.thrown("Missing param value " + Std.string(si2.s) + "." + p.name);
				}
				v = v4;
			}
			_gthis.fillRec(v,p.type,ptr,p.pos);
			p = p.next;
		}
		var tid = 0;
		var p = s1.textures;
		while(p != null) {
			var opt = !h3d_pass_ShaderManager.STRICT;
			if(opt == null) {
				opt = false;
			}
			var t;
			if(p.perObjectGlobal != null) {
				var v = _gthis.globals.map.h[p.perObjectGlobal.gid];
				if(v == null) {
					throw haxe_Exception.thrown("Missing global value " + p.perObjectGlobal.path + " for shader " + _gthis.shaderInfo(shaders,p.perObjectGlobal.path));
				}
				var _g = p.type;
				var t1;
				if(_g._hx_index == 17) {
					var _g1 = _g.size;
					t1 = true;
				} else {
					t1 = false;
				}
				t = t1 ? v.texture : v;
			} else {
				var si = shaders;
				var n = p.instance;
				while(--n > 0) si = si.next;
				var v1 = si.s.getParamValue(p.index);
				if(v1 == null && !opt) {
					throw haxe_Exception.thrown("Missing param value " + Std.string(si.s) + "." + p.name);
				}
				t = v1;
			}
			if(p.pos < 0) {
				var arr = t;
				var _g2 = 0;
				var _g3 = -p.pos;
				while(_g2 < _g3) {
					var i = _g2++;
					buf1.tex[tid++] = arr[i];
				}
			} else {
				buf1.tex[tid++] = t;
			}
			p = p.next;
		}
		var p = s1.buffers;
		var bid = 0;
		while(p != null) {
			var opt = !h3d_pass_ShaderManager.STRICT;
			if(opt == null) {
				opt = false;
			}
			var b;
			if(p.perObjectGlobal != null) {
				var v = _gthis.globals.map.h[p.perObjectGlobal.gid];
				if(v == null) {
					throw haxe_Exception.thrown("Missing global value " + p.perObjectGlobal.path + " for shader " + _gthis.shaderInfo(shaders,p.perObjectGlobal.path));
				}
				var _g = p.type;
				var b1;
				if(_g._hx_index == 17) {
					var _g1 = _g.size;
					b1 = true;
				} else {
					b1 = false;
				}
				b = b1 ? v.texture : v;
			} else {
				var si = shaders;
				var n = p.instance;
				while(--n > 0) si = si.next;
				var v1 = si.s.getParamValue(p.index);
				if(v1 == null && !opt) {
					throw haxe_Exception.thrown("Missing param value " + Std.string(si.s) + "." + p.name);
				}
				b = v1;
			}
			buf1.buffers[bid++] = b;
			p = p.next;
		}
		var buf1 = buf.fragment;
		var s1 = s.fragment;
		var p = s1.params;
		var ptr = buf1.params;
		while(p != null) {
			var v;
			if(p.perObjectGlobal == null) {
				if(p.type == hxsl_Type.TFloat) {
					var index = p.instance;
					var i;
					if(curInstance == index) {
						i = curInstanceValue;
					} else {
						var si = shaders;
						curInstance = index;
						while(--index > 0) si = si.next;
						curInstanceValue = si.s;
						i = curInstanceValue;
					}
					ptr[p.pos] = i.getParamFloatValue(p.index);
					p = p.next;
					continue;
				}
				var index1 = p.instance;
				var v1;
				if(curInstance == index1) {
					v1 = curInstanceValue;
				} else {
					var si1 = shaders;
					curInstance = index1;
					while(--index1 > 0) si1 = si1.next;
					curInstanceValue = si1.s;
					v1 = curInstanceValue;
				}
				v = v1.getParamValue(p.index);
				if(v == null) {
					throw haxe_Exception.thrown("Missing param value " + Std.string(curInstanceValue) + "." + p.name);
				}
			} else if(p.perObjectGlobal != null) {
				var v2 = _gthis.globals.map.h[p.perObjectGlobal.gid];
				if(v2 == null) {
					throw haxe_Exception.thrown("Missing global value " + p.perObjectGlobal.path + " for shader " + _gthis.shaderInfo(shaders,p.perObjectGlobal.path));
				}
				var _g = p.type;
				var v3;
				if(_g._hx_index == 17) {
					var _g1 = _g.size;
					v3 = true;
				} else {
					v3 = false;
				}
				v = v3 ? v2.texture : v2;
			} else {
				var si2 = shaders;
				var n = p.instance;
				while(--n > 0) si2 = si2.next;
				var v4 = si2.s.getParamValue(p.index);
				if(v4 == null) {
					throw haxe_Exception.thrown("Missing param value " + Std.string(si2.s) + "." + p.name);
				}
				v = v4;
			}
			_gthis.fillRec(v,p.type,ptr,p.pos);
			p = p.next;
		}
		var tid = 0;
		var p = s1.textures;
		while(p != null) {
			var opt = !h3d_pass_ShaderManager.STRICT;
			if(opt == null) {
				opt = false;
			}
			var t;
			if(p.perObjectGlobal != null) {
				var v = _gthis.globals.map.h[p.perObjectGlobal.gid];
				if(v == null) {
					throw haxe_Exception.thrown("Missing global value " + p.perObjectGlobal.path + " for shader " + _gthis.shaderInfo(shaders,p.perObjectGlobal.path));
				}
				var _g = p.type;
				var t1;
				if(_g._hx_index == 17) {
					var _g1 = _g.size;
					t1 = true;
				} else {
					t1 = false;
				}
				t = t1 ? v.texture : v;
			} else {
				var si = shaders;
				var n = p.instance;
				while(--n > 0) si = si.next;
				var v1 = si.s.getParamValue(p.index);
				if(v1 == null && !opt) {
					throw haxe_Exception.thrown("Missing param value " + Std.string(si.s) + "." + p.name);
				}
				t = v1;
			}
			if(p.pos < 0) {
				var arr = t;
				var _g2 = 0;
				var _g3 = -p.pos;
				while(_g2 < _g3) {
					var i = _g2++;
					buf1.tex[tid++] = arr[i];
				}
			} else {
				buf1.tex[tid++] = t;
			}
			p = p.next;
		}
		var p = s1.buffers;
		var bid = 0;
		while(p != null) {
			var opt = !h3d_pass_ShaderManager.STRICT;
			if(opt == null) {
				opt = false;
			}
			var b;
			if(p.perObjectGlobal != null) {
				var v = _gthis.globals.map.h[p.perObjectGlobal.gid];
				if(v == null) {
					throw haxe_Exception.thrown("Missing global value " + p.perObjectGlobal.path + " for shader " + _gthis.shaderInfo(shaders,p.perObjectGlobal.path));
				}
				var _g = p.type;
				var b1;
				if(_g._hx_index == 17) {
					var _g1 = _g.size;
					b1 = true;
				} else {
					b1 = false;
				}
				b = b1 ? v.texture : v;
			} else {
				var si = shaders;
				var n = p.instance;
				while(--n > 0) si = si.next;
				var v1 = si.s.getParamValue(p.index);
				if(v1 == null && !opt) {
					throw haxe_Exception.thrown("Missing param value " + Std.string(si.s) + "." + p.name);
				}
				b = v1;
			}
			buf1.buffers[bid++] = b;
			p = p.next;
		}
	}
	,compileShaders: function(shaders,batchMode) {
		if(batchMode == null) {
			batchMode = false;
		}
		this.globals.maxChannels = 0;
		var _g_l = shaders;
		var _g_last = null;
		while(_g_l != _g_last) {
			var s = _g_l.s;
			_g_l = _g_l.next;
			var s1 = s;
			s1.updateConstants(this.globals);
		}
		this.currentOutput.next = shaders;
		var s = this.shaderCache.link(this.currentOutput,batchMode);
		this.currentOutput.next = null;
		return s;
	}
	,__class__: h3d_pass_ShaderManager
};
var h3d_pass_RenderMode = $hxEnums["h3d.pass.RenderMode"] = { __ename__:true,__constructs__:null
	,None: {_hx_name:"None",_hx_index:0,__enum__:"h3d.pass.RenderMode",toString:$estr}
	,Static: {_hx_name:"Static",_hx_index:1,__enum__:"h3d.pass.RenderMode",toString:$estr}
	,Dynamic: {_hx_name:"Dynamic",_hx_index:2,__enum__:"h3d.pass.RenderMode",toString:$estr}
	,Mixed: {_hx_name:"Mixed",_hx_index:3,__enum__:"h3d.pass.RenderMode",toString:$estr}
};
h3d_pass_RenderMode.__constructs__ = [h3d_pass_RenderMode.None,h3d_pass_RenderMode.Static,h3d_pass_RenderMode.Dynamic,h3d_pass_RenderMode.Mixed];
h3d_pass_RenderMode.__empty_constructs__ = [h3d_pass_RenderMode.None,h3d_pass_RenderMode.Static,h3d_pass_RenderMode.Dynamic,h3d_pass_RenderMode.Mixed];
var h3d_pass_ShadowSamplingKind = $hxEnums["h3d.pass.ShadowSamplingKind"] = { __ename__:true,__constructs__:null
	,None: {_hx_name:"None",_hx_index:0,__enum__:"h3d.pass.ShadowSamplingKind",toString:$estr}
	,PCF: {_hx_name:"PCF",_hx_index:1,__enum__:"h3d.pass.ShadowSamplingKind",toString:$estr}
	,ESM: {_hx_name:"ESM",_hx_index:2,__enum__:"h3d.pass.ShadowSamplingKind",toString:$estr}
};
h3d_pass_ShadowSamplingKind.__constructs__ = [h3d_pass_ShadowSamplingKind.None,h3d_pass_ShadowSamplingKind.PCF,h3d_pass_ShadowSamplingKind.ESM];
h3d_pass_ShadowSamplingKind.__empty_constructs__ = [h3d_pass_ShadowSamplingKind.None,h3d_pass_ShadowSamplingKind.PCF,h3d_pass_ShadowSamplingKind.ESM];
var h3d_pass_SortByMaterial = function() {
	this.textureCount = 1;
	this.shaderCount = 1;
	this.shaderIdMap = [];
	this.textureIdMap = [];
};
h3d_pass_SortByMaterial.__name__ = "h3d.pass.SortByMaterial";
h3d_pass_SortByMaterial.prototype = {
	sort: function(passes) {
		var _gthis = this;
		var shaderStart = this.shaderCount;
		var textureStart = this.textureCount;
		var _g_o = passes.current;
		while(_g_o != null) {
			var tmp = _g_o;
			_g_o = _g_o.next;
			var p = tmp;
			if(this.shaderIdMap[p.shader.id] < shaderStart || this.shaderIdMap[p.shader.id] == null) {
				this.shaderIdMap[p.shader.id] = this.shaderCount++;
			}
			if(this.textureIdMap[p.texture] < textureStart || this.textureIdMap[p.shader.id] == null) {
				this.textureIdMap[p.texture] = this.textureCount++;
			}
		}
		var list = passes.current;
		var tmp;
		if(list == null) {
			tmp = null;
		} else {
			var insize = 1;
			var nmerges;
			var psize = 0;
			var qsize = 0;
			var p;
			var q;
			var e;
			var tail;
			while(true) {
				p = list;
				list = null;
				tail = null;
				nmerges = 0;
				while(p != null) {
					++nmerges;
					q = p;
					psize = 0;
					var _g = 0;
					var _g1 = insize;
					while(_g < _g1) {
						var i = _g++;
						++psize;
						q = q.next;
						if(q == null) {
							break;
						}
					}
					qsize = insize;
					while(psize > 0 || qsize > 0 && q != null) {
						if(psize == 0) {
							e = q;
							q = q.next;
							--qsize;
						} else {
							var tmp1;
							if(!(qsize == 0 || q == null)) {
								var d = _gthis.shaderIdMap[p.shader.id] - _gthis.shaderIdMap[q.shader.id];
								tmp1 = (d != 0 ? d : _gthis.textureIdMap[p.texture] - _gthis.textureIdMap[q.texture]) <= 0;
							} else {
								tmp1 = true;
							}
							if(tmp1) {
								e = p;
								p = p.next;
								--psize;
							} else {
								e = q;
								q = q.next;
								--qsize;
							}
						}
						if(tail != null) {
							tail.next = e;
						} else {
							list = e;
						}
						tail = e;
					}
					p = q;
				}
				tail.next = null;
				if(nmerges <= 1) {
					break;
				}
				insize *= 2;
			}
			tmp = list;
		}
		passes.current = tmp;
	}
	,__class__: h3d_pass_SortByMaterial
};
var h3d_prim_Plane2D = function() {
	h3d_prim_Primitive.call(this);
};
h3d_prim_Plane2D.__name__ = "h3d.prim.Plane2D";
h3d_prim_Plane2D.get = function() {
	var engine = h3d_Engine.CURRENT;
	var inst = engine.resCache.h[h3d_prim_Plane2D.__id__];
	if(inst == null) {
		inst = new h3d_prim_Plane2D();
		engine.resCache.set(h3d_prim_Plane2D,inst);
	}
	return inst;
};
h3d_prim_Plane2D.__super__ = h3d_prim_Primitive;
h3d_prim_Plane2D.prototype = $extend(h3d_prim_Primitive.prototype,{
	alloc: function(engine) {
		var this1 = hxd__$FloatBuffer_Float32Expand._new(0);
		var v = this1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = -1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = -1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = 0;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = 1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = -1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = 1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = 0;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = 0;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = 1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = -1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = 1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = 1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = 1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = 1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = 1;
		if(v.pos == v.array.length) {
			var newSize = v.array.length << 1;
			if(newSize < 128) {
				newSize = 128;
			}
			var newArray = new Float32Array(newSize);
			newArray.set(v.array);
			v.array = newArray;
		}
		v.array[v.pos++] = 0;
		this.buffer = h3d_Buffer.ofFloats(v,4,[h3d_BufferFlag.Quads,h3d_BufferFlag.RawFormat]);
	}
	,render: function(engine) {
		var tmp;
		if(this.buffer != null) {
			var _this = this.buffer;
			tmp = _this.buffer == null || _this.buffer.vbuf == null;
		} else {
			tmp = true;
		}
		if(tmp) {
			this.alloc(engine);
		}
		engine.renderBuffer(this.buffer,engine.mem.quadIndexes,2,0,-1);
	}
	,__class__: h3d_prim_Plane2D
});
var h3d_prim_RawPrimitive = function(inf,persist) {
	if(persist == null) {
		persist = false;
	}
	h3d_prim_Primitive.call(this);
	this.onContextLost = function() {
		return inf;
	};
	this.bounds = inf.bounds;
	this.alloc(null);
	if(!persist) {
		this.onContextLost = null;
	}
};
h3d_prim_RawPrimitive.__name__ = "h3d.prim.RawPrimitive";
h3d_prim_RawPrimitive.__super__ = h3d_prim_Primitive;
h3d_prim_RawPrimitive.prototype = $extend(h3d_prim_Primitive.prototype,{
	alloc: function(engine) {
		if(this.onContextLost == null) {
			throw haxe_Exception.thrown("Cannot realloc " + Std.string(this));
		}
		var inf = this.onContextLost();
		var flags = [];
		if(inf.ibuf == null) {
			flags.push(inf.quads ? h3d_BufferFlag.Quads : h3d_BufferFlag.Triangles);
		}
		if(inf.stride < 8) {
			flags.push(h3d_BufferFlag.RawFormat);
		}
		this.buffer = h3d_Buffer.ofFloats(inf.vbuf,inf.stride,flags);
		this.vcount = this.buffer.vertices;
		this.tcount = inf.ibuf != null ? inf.ibuf.length / 3 | 0 : inf.quads ? this.vcount >> 1 : this.vcount / 3 | 0;
		if(inf.ibuf != null) {
			this.indexes = h3d_Indexes.alloc(inf.ibuf);
		} else if(this.indexes != null) {
			this.indexes.dispose();
			this.indexes = null;
		}
	}
	,getBounds: function() {
		if(this.bounds == null) {
			throw haxe_Exception.thrown("Bounds not defined for " + Std.string(this));
		}
		return this.bounds;
	}
	,__class__: h3d_prim_RawPrimitive
});
var h3d_scene_Object = function(parent) {
	var this1 = 0;
	this.flags = this1;
	this.absPos = new h3d_Matrix();
	this.absPos.identity();
	this.x = 0;
	var f = 1;
	var b = true;
	if(b) {
		this.flags |= f;
	} else {
		this.flags &= ~f;
	}
	this.y = 0;
	var f = 1;
	var b = true;
	if(b) {
		this.flags |= f;
	} else {
		this.flags &= ~f;
	}
	this.z = 0;
	var f = 1;
	var b = true;
	if(b) {
		this.flags |= f;
	} else {
		this.flags &= ~f;
	}
	this.scaleX = 1;
	var f = 1;
	var b = true;
	if(b) {
		this.flags |= f;
	} else {
		this.flags &= ~f;
	}
	this.scaleY = 1;
	var f = 1;
	var b = true;
	if(b) {
		this.flags |= f;
	} else {
		this.flags &= ~f;
	}
	this.scaleZ = 1;
	var f = 1;
	var b = true;
	if(b) {
		this.flags |= f;
	} else {
		this.flags &= ~f;
	}
	this.qRot = new h3d_Quat();
	var f = 1;
	var b = this.follow != null;
	if(b) {
		this.flags |= f;
	} else {
		this.flags &= ~f;
	}
	var f = 2;
	this.flags |= f;
	this.children = [];
	if(parent != null) {
		parent.addChild(this);
	}
};
h3d_scene_Object.__name__ = "h3d.scene.Object";
h3d_scene_Object.prototype = {
	set_cullingCollider: function(c) {
		this.cullingCollider = c;
		var f = 4096;
		this.flags &= ~f;
		return c;
	}
	,localToGlobal: function(pt) {
		this.syncPos();
		if(pt == null) {
			pt = new h3d_col_Point();
		}
		var m = this.absPos;
		var px = pt.x * m._11 + pt.y * m._21 + pt.z * m._31 + m._41;
		var py = pt.x * m._12 + pt.y * m._22 + pt.z * m._32 + m._42;
		var pz = pt.x * m._13 + pt.y * m._23 + pt.z * m._33 + m._43;
		pt.x = px;
		pt.y = py;
		pt.z = pz;
		return pt;
	}
	,getInvPos: function() {
		this.syncPos();
		if(this.invPos == null) {
			this.invPos = new h3d_Matrix();
			this.invPos._44 = 0;
		}
		if(this.invPos._44 == 0) {
			this.invPos.inverse3x4(this.absPos);
		}
		return this.invPos;
	}
	,addChild: function(o) {
		this.addChildAt(o,this.children.length);
	}
	,addChildAt: function(o,pos) {
		if(pos < 0) {
			pos = 0;
		}
		if(pos > this.children.length) {
			pos = this.children.length;
		}
		var p = this;
		while(p != null) {
			if(p == o) {
				throw haxe_Exception.thrown("Recursive addChild");
			}
			p = p.parent;
		}
		if(o.parent != null) {
			var old = (o.flags & 32) != 0;
			var f = 32;
			o.flags &= ~f;
			o.parent.removeChild(o);
			var f = 32;
			if(old) {
				o.flags |= f;
			} else {
				o.flags &= ~f;
			}
		}
		this.children.splice(pos,0,o);
		if((this.flags & 32) == 0 && (o.flags & 32) != 0) {
			o.onRemove();
		}
		o.parent = this;
		var f = 1;
		var b = true;
		if(b) {
			o.flags |= f;
		} else {
			o.flags &= ~f;
		}
		if((this.flags & 32) != 0) {
			if((o.flags & 32) == 0) {
				o.onAdd();
			} else {
				o.onParentChanged();
			}
		}
	}
	,iterVisibleMeshes: function(callb) {
		if((this.flags & 2) == 0 || (this.flags & 4) != 0 && (this.flags & 128) != 0) {
			return;
		}
		if((this.flags & 4) == 0) {
			var m = ((this) instanceof h3d_scene_Mesh) ? this : null;
			if(m != null) {
				callb(m);
			}
		}
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			o.iterVisibleMeshes(callb);
		}
	}
	,onParentChanged: function() {
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.onParentChanged();
		}
	}
	,onAdd: function() {
		var f = 32;
		this.flags |= f;
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.onAdd();
		}
	}
	,onRemove: function() {
		var f = 32;
		this.flags &= ~f;
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.onRemove();
		}
	}
	,removeChild: function(o) {
		if(HxOverrides.remove(this.children,o)) {
			if((o.flags & 32) != 0) {
				o.onRemove();
			}
			o.parent = null;
			var f = 1;
			var b = true;
			if(b) {
				o.flags |= f;
			} else {
				o.flags &= ~f;
			}
		}
	}
	,getScene: function() {
		var p = this;
		while(p.parent != null) p = p.parent;
		if(((p) instanceof h3d_scene_Scene)) {
			return p;
		} else {
			return null;
		}
	}
	,getAbsPos: function() {
		this.syncPos();
		return this.absPos;
	}
	,draw: function(ctx) {
	}
	,calcAbsPos: function() {
		this.qRot.toMatrix(this.absPos);
		this.absPos._11 *= this.scaleX;
		this.absPos._12 *= this.scaleX;
		this.absPos._13 *= this.scaleX;
		this.absPos._21 *= this.scaleY;
		this.absPos._22 *= this.scaleY;
		this.absPos._23 *= this.scaleY;
		this.absPos._31 *= this.scaleZ;
		this.absPos._32 *= this.scaleZ;
		this.absPos._33 *= this.scaleZ;
		this.absPos._41 = this.x;
		this.absPos._42 = this.y;
		this.absPos._43 = this.z;
		if(this.follow != null) {
			this.follow.syncPos();
			if((this.flags & 8) != 0) {
				var _this = this.absPos;
				var a = this.absPos;
				var b = this.parent.absPos;
				var m11 = a._11;
				var m12 = a._12;
				var m13 = a._13;
				var m21 = a._21;
				var m22 = a._22;
				var m23 = a._23;
				var a31 = a._31;
				var a32 = a._32;
				var a33 = a._33;
				var a41 = a._41;
				var a42 = a._42;
				var a43 = a._43;
				var b11 = b._11;
				var b12 = b._12;
				var b13 = b._13;
				var b21 = b._21;
				var b22 = b._22;
				var b23 = b._23;
				var b31 = b._31;
				var b32 = b._32;
				var b33 = b._33;
				var b41 = b._41;
				var b42 = b._42;
				var b43 = b._43;
				_this._11 = m11 * b11 + m12 * b21 + m13 * b31;
				_this._12 = m11 * b12 + m12 * b22 + m13 * b32;
				_this._13 = m11 * b13 + m12 * b23 + m13 * b33;
				_this._14 = 0;
				_this._21 = m21 * b11 + m22 * b21 + m23 * b31;
				_this._22 = m21 * b12 + m22 * b22 + m23 * b32;
				_this._23 = m21 * b13 + m22 * b23 + m23 * b33;
				_this._24 = 0;
				_this._31 = a31 * b11 + a32 * b21 + a33 * b31;
				_this._32 = a31 * b12 + a32 * b22 + a33 * b32;
				_this._33 = a31 * b13 + a32 * b23 + a33 * b33;
				_this._34 = 0;
				_this._41 = a41 * b11 + a42 * b21 + a43 * b31 + b41;
				_this._42 = a41 * b12 + a42 * b22 + a43 * b32 + b42;
				_this._43 = a41 * b13 + a42 * b23 + a43 * b33 + b43;
				_this._44 = 1;
				this.absPos._41 = this.x + this.follow.absPos._41;
				this.absPos._42 = this.y + this.follow.absPos._42;
				this.absPos._43 = this.z + this.follow.absPos._43;
			} else {
				this.absPos.multiply3x4(this.absPos,this.follow.absPos);
			}
		} else if(this.parent != null && (this.flags & 2048) == 0) {
			var _this = this.absPos;
			var a = this.absPos;
			var b = this.parent.absPos;
			var m11 = a._11;
			var m12 = a._12;
			var m13 = a._13;
			var m21 = a._21;
			var m22 = a._22;
			var m23 = a._23;
			var a31 = a._31;
			var a32 = a._32;
			var a33 = a._33;
			var a41 = a._41;
			var a42 = a._42;
			var a43 = a._43;
			var b11 = b._11;
			var b12 = b._12;
			var b13 = b._13;
			var b21 = b._21;
			var b22 = b._22;
			var b23 = b._23;
			var b31 = b._31;
			var b32 = b._32;
			var b33 = b._33;
			var b41 = b._41;
			var b42 = b._42;
			var b43 = b._43;
			_this._11 = m11 * b11 + m12 * b21 + m13 * b31;
			_this._12 = m11 * b12 + m12 * b22 + m13 * b32;
			_this._13 = m11 * b13 + m12 * b23 + m13 * b33;
			_this._14 = 0;
			_this._21 = m21 * b11 + m22 * b21 + m23 * b31;
			_this._22 = m21 * b12 + m22 * b22 + m23 * b32;
			_this._23 = m21 * b13 + m22 * b23 + m23 * b33;
			_this._24 = 0;
			_this._31 = a31 * b11 + a32 * b21 + a33 * b31;
			_this._32 = a31 * b12 + a32 * b22 + a33 * b32;
			_this._33 = a31 * b13 + a32 * b23 + a33 * b33;
			_this._34 = 0;
			_this._41 = a41 * b11 + a42 * b21 + a43 * b31 + b41;
			_this._42 = a41 * b12 + a42 * b22 + a43 * b32 + b42;
			_this._43 = a41 * b13 + a42 * b23 + a43 * b33 + b43;
			_this._44 = 1;
		}
		if(this.defaultTransform != null) {
			var _this = this.absPos;
			var a = this.defaultTransform;
			var b = this.absPos;
			var m11 = a._11;
			var m12 = a._12;
			var m13 = a._13;
			var m21 = a._21;
			var m22 = a._22;
			var m23 = a._23;
			var a31 = a._31;
			var a32 = a._32;
			var a33 = a._33;
			var a41 = a._41;
			var a42 = a._42;
			var a43 = a._43;
			var b11 = b._11;
			var b12 = b._12;
			var b13 = b._13;
			var b21 = b._21;
			var b22 = b._22;
			var b23 = b._23;
			var b31 = b._31;
			var b32 = b._32;
			var b33 = b._33;
			var b41 = b._41;
			var b42 = b._42;
			var b43 = b._43;
			_this._11 = m11 * b11 + m12 * b21 + m13 * b31;
			_this._12 = m11 * b12 + m12 * b22 + m13 * b32;
			_this._13 = m11 * b13 + m12 * b23 + m13 * b33;
			_this._14 = 0;
			_this._21 = m21 * b11 + m22 * b21 + m23 * b31;
			_this._22 = m21 * b12 + m22 * b22 + m23 * b32;
			_this._23 = m21 * b13 + m22 * b23 + m23 * b33;
			_this._24 = 0;
			_this._31 = a31 * b11 + a32 * b21 + a33 * b31;
			_this._32 = a31 * b12 + a32 * b22 + a33 * b32;
			_this._33 = a31 * b13 + a32 * b23 + a33 * b33;
			_this._34 = 0;
			_this._41 = a41 * b11 + a42 * b21 + a43 * b31 + b41;
			_this._42 = a41 * b12 + a42 * b22 + a43 * b32 + b42;
			_this._43 = a41 * b13 + a42 * b23 + a43 * b33 + b43;
			_this._44 = 1;
		}
		if(this.invPos != null) {
			this.invPos._44 = 0;
		}
	}
	,sync: function(ctx) {
	}
	,syncRec: function(ctx) {
		if(this.currentAnimation != null) {
			var old = this.parent;
			var dt = ctx.elapsedTime;
			while(dt > 0 && this.currentAnimation != null) dt = this.currentAnimation.update(dt);
			if(this.currentAnimation != null && (ctx.visibleFlag && (this.flags & 2) != 0 && (this.flags & 4) == 0 || (this.flags & 64) != 0)) {
				this.currentAnimation.sync();
			}
			if(this.parent == null && old != null) {
				return;
			}
		}
		var old = ctx.visibleFlag;
		if((this.flags & 2) == 0 || (this.flags & 4) != 0 && (this.flags & 128) != 0) {
			ctx.visibleFlag = false;
		}
		if(ctx.cullingCollider != null && (this.cullingCollider == null || (this.flags & 4096) != 0)) {
			this.set_cullingCollider(ctx.cullingCollider);
			var f = 4096;
			this.flags |= f;
		} else if((this.flags & 4096) != 0) {
			this.set_cullingCollider(null);
		}
		var prevCollider = ctx.cullingCollider;
		if((this.flags & 128) != 0) {
			ctx.cullingCollider = this.cullingCollider;
		}
		var changed = (this.flags & 1) != 0;
		if(changed) {
			this.calcAbsPos();
		}
		this.sync(ctx);
		var f = 1;
		var b = this.follow != null;
		if(b) {
			this.flags |= f;
		} else {
			this.flags &= ~f;
		}
		this.lastFrame = ctx.frame;
		var p = 0;
		var len = this.children.length;
		while(p < len) {
			var c = this.children[p];
			if(c == null) {
				break;
			}
			if(c.lastFrame != ctx.frame) {
				if(changed) {
					var f = 1;
					var b = true;
					if(b) {
						c.flags |= f;
					} else {
						c.flags &= ~f;
					}
				}
				c.syncRec(ctx);
			}
			if(this.children[p] != c) {
				p = 0;
				len = this.children.length;
			} else {
				++p;
			}
		}
		ctx.visibleFlag = old;
		ctx.cullingCollider = prevCollider;
	}
	,syncPos: function() {
		if(this.parent != null) {
			this.parent.syncPos();
		}
		if((this.flags & 1) != 0) {
			var f = 1;
			var b = this.follow != null;
			if(b) {
				this.flags |= f;
			} else {
				this.flags &= ~f;
			}
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				var f = 1;
				var b = true;
				if(b) {
					c.flags |= f;
				} else {
					c.flags &= ~f;
				}
			}
		}
	}
	,emit: function(ctx) {
	}
	,emitRec: function(ctx) {
		if((this.flags & 2) == 0 || (this.flags & 4) != 0 && (this.flags & 128) != 0 && !ctx.computingStatic) {
			return;
		}
		if((this.flags & 1) != 0) {
			if(this.currentAnimation != null) {
				this.currentAnimation.sync();
			}
			var f = 1;
			var b = this.follow != null;
			if(b) {
				this.flags |= f;
			} else {
				this.flags &= ~f;
			}
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				var f = 1;
				var b = true;
				if(b) {
					c.flags |= f;
				} else {
					c.flags &= ~f;
				}
			}
		}
		if((this.flags & 4) == 0 || ctx.computingStatic) {
			this.emit(ctx);
		}
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.emitRec(ctx);
		}
	}
	,__class__: h3d_scene_Object
};
var h3d_scene_Mesh = function(primitive,material,parent) {
	h3d_scene_Object.call(this,parent);
	this.set_primitive(primitive);
	if(material == null) {
		material = h3d_mat_MaterialSetup.current.createMaterial();
		material.set_props(material.getDefaultProps());
	}
	this.material = material;
};
h3d_scene_Mesh.__name__ = "h3d.scene.Mesh";
h3d_scene_Mesh.__super__ = h3d_scene_Object;
h3d_scene_Mesh.prototype = $extend(h3d_scene_Object.prototype,{
	draw: function(ctx) {
		this.primitive.render(ctx.engine);
	}
	,emit: function(ctx) {
		var p = this.material.passes;
		while(p != null) {
			ctx.emitPass(p,this).index = 0;
			p = p.nextPass;
		}
	}
	,onAdd: function() {
		h3d_scene_Object.prototype.onAdd.call(this);
		if(this.primitive != null) {
			this.primitive.incref();
		}
	}
	,onRemove: function() {
		if(this.primitive != null) {
			this.primitive.decref();
		}
		h3d_scene_Object.prototype.onRemove.call(this);
	}
	,set_primitive: function(prim) {
		if(prim != this.primitive && (this.flags & 32) != 0) {
			if(this.primitive != null) {
				this.primitive.decref();
			}
			if(prim != null) {
				prim.incref();
			}
		}
		return this.primitive = prim;
	}
	,__class__: h3d_scene_Mesh
});
var h3d_scene_Interactive = function(shape,parent) {
	this.hitPoint = new h3d_Vector();
	this.mouseDownButton = -1;
	this.propagateEvents = false;
	this.cancelEvents = false;
	h3d_scene_Object.call(this,parent);
	this.shape = shape;
	this.set_cursor(hxd_Cursor.Button);
};
h3d_scene_Interactive.__name__ = "h3d.scene.Interactive";
h3d_scene_Interactive.__super__ = h3d_scene_Object;
h3d_scene_Interactive.prototype = $extend(h3d_scene_Object.prototype,{
	onAdd: function() {
		this.scene = this.getScene();
		if(this.scene != null) {
			this.scene.addEventTarget(this);
		}
		h3d_scene_Object.prototype.onAdd.call(this);
	}
	,onRemove: function() {
		if(this.scene != null) {
			this.scene.removeEventTarget(this);
			this.scene = null;
		}
		h3d_scene_Object.prototype.onRemove.call(this);
	}
	,getInteractiveScene: function() {
		return this.scene;
	}
	,handleEvent: function(e) {
		if(this.propagateEvents) {
			e.propagate = true;
		}
		if(this.cancelEvents) {
			e.cancel = true;
		}
		switch(e.kind._hx_index) {
		case 0:
			if(this.enableRightButton || e.button == 0) {
				this.mouseDownButton = e.button;
				this.onPush(e);
				if(e.cancel) {
					this.mouseDownButton = -1;
				}
			}
			break;
		case 1:
			if(this.enableRightButton || e.button == 0) {
				this.onRelease(e);
				if(this.mouseDownButton == e.button) {
					this.onClick(e);
				}
			}
			this.mouseDownButton = -1;
			break;
		case 2:
			this.onMove(e);
			break;
		case 3:
			this.onOver(e);
			break;
		case 4:
			this.onOut(e);
			break;
		case 5:
			this.onWheel(e);
			break;
		case 6:
			this.onFocus(e);
			break;
		case 7:
			this.onFocusLost(e);
			break;
		case 8:
			this.onKeyDown(e);
			break;
		case 9:
			this.onKeyUp(e);
			break;
		case 10:
			if(this.enableRightButton || e.button == 0) {
				this.onRelease(e);
				if(this.mouseDownButton == e.button) {
					this.onReleaseOutside(e);
				}
			}
			this.mouseDownButton = -1;
			break;
		case 11:
			this.onTextInput(e);
			break;
		case 12:
			this.onCheck(e);
			break;
		}
	}
	,set_cursor: function(c) {
		this.cursor = c;
		if(this.scene != null && this.scene.events != null) {
			this.scene.events.updateCursor(this);
		}
		return c;
	}
	,onOver: function(e) {
	}
	,onOut: function(e) {
	}
	,onPush: function(e) {
	}
	,onRelease: function(e) {
	}
	,onReleaseOutside: function(e) {
	}
	,onClick: function(e) {
	}
	,onMove: function(e) {
	}
	,onWheel: function(e) {
	}
	,onFocus: function(e) {
	}
	,onFocusLost: function(e) {
	}
	,onKeyUp: function(e) {
	}
	,onKeyDown: function(e) {
	}
	,onCheck: function(e) {
	}
	,onTextInput: function(e) {
	}
	,__class__: h3d_scene_Interactive
});
var h3d_scene_Light = function(shader,parent) {
	this.priority = 0;
	this.cullingDistance = -1;
	h3d_scene_Object.call(this,parent);
	this.shader = shader;
};
h3d_scene_Light.__name__ = "h3d.scene.Light";
h3d_scene_Light.__super__ = h3d_scene_Object;
h3d_scene_Light.prototype = $extend(h3d_scene_Object.prototype,{
	emit: function(ctx) {
		ctx.emitLight(this);
	}
	,getShadowDirection: function() {
		return null;
	}
	,__class__: h3d_scene_Light
});
var h3d_scene_LightSystem = function() {
	this.ambientLight = new h3d_Vector(1,1,1);
};
h3d_scene_LightSystem.__name__ = "h3d.scene.LightSystem";
h3d_scene_LightSystem.prototype = {
	initGlobals: function(globals) {
	}
	,cullLights: function() {
		var l = this.ctx.lights;
		var prev = null;
		var s = new h3d_col_Sphere();
		while(l != null) {
			s.x = l.absPos._41;
			s.y = l.absPos._42;
			s.z = l.absPos._43;
			s.r = l.cullingDistance;
			if(l.cullingDistance > 0 && !this.ctx.computingStatic && !this.ctx.camera.frustum.hasSphere(s)) {
				if(prev == null) {
					this.ctx.lights = l.next;
				} else {
					prev.next = l.next;
				}
				l = l.next;
				continue;
			}
			this.lightCount++;
			l.objectDistance = 0.;
			prev = l;
			l = l.next;
		}
	}
	,initLights: function(ctx) {
		this.lightCount = 0;
		this.ctx = ctx;
		this.cullLights();
		if(this.shadowLight == null || (this.shadowLight.flags & 32) == 0) {
			var l = ctx.lights;
			while(l != null) {
				var dir = l.getShadowDirection();
				if(dir != null) {
					this.shadowLight = l;
					break;
				}
				l = l.next;
			}
		}
	}
	,computeLight: function(obj,shaders) {
		return shaders;
	}
	,__class__: h3d_scene_LightSystem
};
var h3d_scene__$RenderContext_SharedGlobal = function(gid,value) {
	this.gid = gid;
	this.value = value;
};
h3d_scene__$RenderContext_SharedGlobal.__name__ = "h3d.scene._RenderContext.SharedGlobal";
h3d_scene__$RenderContext_SharedGlobal.prototype = {
	__class__: h3d_scene__$RenderContext_SharedGlobal
};
var h3d_scene_RenderContext = function() {
	h3d_impl_RenderContext.call(this);
	this.cachedShaderList = [];
	this.cachedPassObjects = [];
};
h3d_scene_RenderContext.__name__ = "h3d.scene.RenderContext";
h3d_scene_RenderContext.__super__ = h3d_impl_RenderContext;
h3d_scene_RenderContext.prototype = $extend(h3d_impl_RenderContext.prototype,{
	start: function() {
		this.sharedGlobals = [];
		this.lights = null;
		this.drawPass = null;
		this.passes = null;
		this.lights = null;
		this.cachedPos = 0;
		this.visibleFlag = true;
		this.time += this.elapsedTime;
		this.frame++;
	}
	,setGlobalID: function(gid,value) {
		var _g = 0;
		var _g1 = this.sharedGlobals;
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			if(g.gid == gid) {
				g.value = value;
				return;
			}
		}
		this.sharedGlobals.push(new h3d_scene__$RenderContext_SharedGlobal(gid,value));
	}
	,emitPass: function(pass,obj) {
		var o = this.allocPool;
		if(o == null) {
			o = new h3d_pass_PassObject();
			o.nextAlloc = this.allocFirst;
			this.allocFirst = o;
		} else {
			this.allocPool = o.nextAlloc;
		}
		o.pass = pass;
		o.obj = obj;
		o.next = this.passes;
		this.passes = o;
		return o;
	}
	,allocShaderList: function(s,next) {
		var sl = this.cachedShaderList[this.cachedPos++];
		if(sl == null) {
			sl = new hxsl_ShaderList(null);
			this.cachedShaderList[this.cachedPos - 1] = sl;
		}
		sl.s = s;
		sl.next = next;
		return sl;
	}
	,emitLight: function(l) {
		l.next = this.lights;
		this.lights = l;
	}
	,done: function() {
		this.drawPass = null;
		var p = this.allocFirst;
		while(p != null && p != this.allocPool) {
			p.obj = null;
			p.pass = null;
			p.shader = null;
			p.shaders = null;
			p.next = null;
			p.index = 0;
			p.texture = 0;
			p = p.nextAlloc;
		}
		if(this.allocPool != null) {
			this.allocFirst = this.allocFirst.nextAlloc;
		}
		this.allocPool = this.allocFirst;
		var _g = 0;
		var _g1 = this.cachedShaderList;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.s = null;
			c.next = null;
		}
		this.passes = null;
		this.lights = null;
	}
	,__class__: h3d_scene_RenderContext
});
var h3d_scene_PassObjects = function() {
	this.passes = new h3d_pass_PassList();
};
h3d_scene_PassObjects.__name__ = "h3d.scene.PassObjects";
h3d_scene_PassObjects.prototype = {
	__class__: h3d_scene_PassObjects
};
var h3d_scene_Renderer = function() {
	this.hasSetTarget = false;
	this.emptyPasses = new h3d_pass_PassList();
	this.allPasses = [];
	this.passObjects = new haxe_ds_StringMap();
	this.set_props(this.getDefaultProps());
	var _g = $bind(this,this.depthSort);
	var frontToBack = true;
	this.frontToBack = function(passes) {
		_g(frontToBack,passes);
	};
	var _g1 = $bind(this,this.depthSort);
	var frontToBack1 = false;
	this.backToFront = function(passes) {
		_g1(frontToBack1,passes);
	};
};
h3d_scene_Renderer.__name__ = "h3d.scene.Renderer";
h3d_scene_Renderer.__super__ = hxd_impl_AnyProps;
h3d_scene_Renderer.prototype = $extend(hxd_impl_AnyProps.prototype,{
	depthSort: function(frontToBack,passes) {
		var cam = this.ctx.camera.m;
		var _g_o = passes.current;
		while(_g_o != null) {
			var tmp = _g_o;
			_g_o = _g_o.next;
			var p = tmp;
			var z = p.obj.absPos._41 * cam._13 + p.obj.absPos._42 * cam._23 + p.obj.absPos._43 * cam._33 + cam._43;
			var w = p.obj.absPos._41 * cam._14 + p.obj.absPos._42 * cam._24 + p.obj.absPos._43 * cam._34 + cam._44;
			p.depth = z / w;
		}
		if(frontToBack) {
			var list = passes.current;
			var tmp;
			if(list == null) {
				tmp = null;
			} else {
				var insize = 1;
				var nmerges;
				var psize = 0;
				var qsize = 0;
				var p;
				var q;
				var e;
				var tail;
				while(true) {
					p = list;
					list = null;
					tail = null;
					nmerges = 0;
					while(p != null) {
						++nmerges;
						q = p;
						psize = 0;
						var _g = 0;
						var _g1 = insize;
						while(_g < _g1) {
							var i = _g++;
							++psize;
							q = q.next;
							if(q == null) {
								break;
							}
						}
						qsize = insize;
						while(psize > 0 || qsize > 0 && q != null) {
							if(psize == 0) {
								e = q;
								q = q.next;
								--qsize;
							} else if(qsize == 0 || q == null || (p.pass.layer == q.pass.layer ? p.depth > q.depth ? 1 : -1 : p.pass.layer - q.pass.layer) <= 0) {
								e = p;
								p = p.next;
								--psize;
							} else {
								e = q;
								q = q.next;
								--qsize;
							}
							if(tail != null) {
								tail.next = e;
							} else {
								list = e;
							}
							tail = e;
						}
						p = q;
					}
					tail.next = null;
					if(nmerges <= 1) {
						break;
					}
					insize *= 2;
				}
				tmp = list;
			}
			passes.current = tmp;
		} else {
			var list = passes.current;
			var tmp;
			if(list == null) {
				tmp = null;
			} else {
				var insize = 1;
				var nmerges;
				var psize = 0;
				var qsize = 0;
				var p;
				var q;
				var e;
				var tail;
				while(true) {
					p = list;
					list = null;
					tail = null;
					nmerges = 0;
					while(p != null) {
						++nmerges;
						q = p;
						psize = 0;
						var _g = 0;
						var _g1 = insize;
						while(_g < _g1) {
							var i = _g++;
							++psize;
							q = q.next;
							if(q == null) {
								break;
							}
						}
						qsize = insize;
						while(psize > 0 || qsize > 0 && q != null) {
							if(psize == 0) {
								e = q;
								q = q.next;
								--qsize;
							} else if(qsize == 0 || q == null || (p.pass.layer == q.pass.layer ? p.depth > q.depth ? -1 : 1 : p.pass.layer - q.pass.layer) <= 0) {
								e = p;
								p = p.next;
								--psize;
							} else {
								e = q;
								q = q.next;
								--qsize;
							}
							if(tail != null) {
								tail.next = e;
							} else {
								list = e;
							}
							tail = e;
						}
						p = q;
					}
					tail.next = null;
					if(nmerges <= 1) {
						break;
					}
					insize *= 2;
				}
				tmp = list;
			}
			passes.current = tmp;
		}
	}
	,resetTarget: function() {
		if(this.hasSetTarget) {
			this.ctx.engine.popTarget();
			this.hasSetTarget = false;
		}
	}
	,has: function(name) {
		return this.passObjects.h[name] != null;
	}
	,get: function(name) {
		var p = this.passObjects.h[name];
		if(p == null) {
			return this.emptyPasses;
		}
		p.rendered = true;
		return p.passes;
	}
	,render: function() {
		throw haxe_Exception.thrown("Not implemented");
	}
	,computeStatic: function() {
		throw haxe_Exception.thrown("Not implemented");
	}
	,start: function() {
	}
	,process: function(passes) {
		this.hasSetTarget = false;
		var _g = 0;
		var _g1 = this.allPasses;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			p.setContext(this.ctx);
		}
		var _g = 0;
		while(_g < passes.length) {
			var p = passes[_g];
			++_g;
			this.passObjects.h[p.name] = p;
		}
		this.ctx.textures.begin();
		if(this.ctx.computingStatic) {
			this.computeStatic();
		} else {
			this.render();
		}
		this.resetTarget();
		var _g = 0;
		while(_g < passes.length) {
			var p = passes[_g];
			++_g;
			this.passObjects.h[p.name] = null;
		}
	}
	,__class__: h3d_scene_Renderer
});
var h3d_scene_Scene = function(createRenderer,createLightSystem) {
	if(createLightSystem == null) {
		createLightSystem = true;
	}
	if(createRenderer == null) {
		createRenderer = true;
	}
	h3d_scene_Object.call(this,null);
	this.window = hxd_Window.getInstance();
	this.eventListeners = [];
	this.hitInteractives = [];
	this.interactives = [];
	this.camera = new h3d_Camera();
	var engine = h3d_Engine.CURRENT;
	if(engine != null) {
		this.camera.screenRatio = engine.width / engine.height;
	}
	this.ctx = new h3d_scene_RenderContext();
	if(createRenderer) {
		this.set_renderer(h3d_mat_MaterialSetup.current.createRenderer());
	}
	if(createLightSystem) {
		this.lightSystem = h3d_mat_MaterialSetup.current.createLightSystem();
	}
};
h3d_scene_Scene.__name__ = "h3d.scene.Scene";
h3d_scene_Scene.__super__ = h3d_scene_Object;
h3d_scene_Scene.prototype = $extend(h3d_scene_Object.prototype,{
	setEvents: function(events) {
		this.events = events;
	}
	,dispatchListeners: function(event) {
		var _g = 0;
		var _g1 = this.eventListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(event);
			if(!event.propagate) {
				break;
			}
		}
	}
	,set_renderer: function(r) {
		this.renderer = r;
		if(r != null) {
			r.ctx = this.ctx;
		}
		return r;
	}
	,sortHitPointByCameraDistance: function(i1,i2) {
		var z1 = i1.hitPoint.w;
		var z2 = i2.hitPoint.w;
		if(z1 > z2) {
			return -1;
		}
		return 1;
	}
	,dispatchEvent: function(event,to) {
		var i = to;
		i.handleEvent(event);
	}
	,isInteractiveVisible: function(i) {
		var o = i;
		while(o != this) {
			if(o == null || (o.flags & 2) == 0) {
				return false;
			}
			o = o.parent;
		}
		return true;
	}
	,handleEvent: function(event,last) {
		if(this.interactives.length == 0) {
			return null;
		}
		if(this.hitInteractives.length == 0) {
			var screenX = (event.relX / this.window.get_width() - 0.5) * 2;
			var screenY = -(event.relY / this.window.get_height() - 0.5) * 2;
			var p0 = this.camera.unproject(screenX,screenY,0);
			var p1 = this.camera.unproject(screenX,screenY,1);
			var x = p0.x;
			var y = p0.y;
			var z = p0.z;
			if(z == null) {
				z = 0.;
			}
			if(y == null) {
				y = 0.;
			}
			if(x == null) {
				x = 0.;
			}
			var p1_x = x;
			var p1_y = y;
			var p1_z = z;
			var x = p1.x;
			var y = p1.y;
			var z = p1.z;
			if(z == null) {
				z = 0.;
			}
			if(y == null) {
				y = 0.;
			}
			if(x == null) {
				x = 0.;
			}
			var p2_x = x;
			var p2_y = y;
			var p2_z = z;
			var r = new h3d_col_Ray();
			r.px = p1_x;
			r.py = p1_y;
			r.pz = p1_z;
			r.lx = p2_x - p1_x;
			r.ly = p2_y - p1_y;
			r.lz = p2_z - p1_z;
			r.normalize();
			var r1 = r;
			var saveR_px = r1.px;
			var saveR_py = r1.py;
			var saveR_pz = r1.pz;
			var saveR_lx = r1.lx;
			var saveR_ly = r1.ly;
			var saveR_lz = r1.lz;
			var priority = -2147483648;
			var _g = 0;
			var _g1 = this.interactives;
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(i.priority < priority) {
					continue;
				}
				var p = i;
				while(p != null && (p.flags & 2) != 0) p = p.parent;
				if(p != null) {
					continue;
				}
				var minv = i.getInvPos();
				var x = r1.px;
				var y = r1.py;
				var z = r1.pz;
				if(z == null) {
					z = 0.;
				}
				if(y == null) {
					y = 0.;
				}
				if(x == null) {
					x = 0.;
				}
				var p_x = x;
				var p_y = y;
				var p_z = z;
				var p_w = 1.;
				var px = p_x * minv._11 + p_y * minv._21 + p_z * minv._31 + p_w * minv._41;
				var py = p_x * minv._12 + p_y * minv._22 + p_z * minv._32 + p_w * minv._42;
				var pz = p_x * minv._13 + p_y * minv._23 + p_z * minv._33 + p_w * minv._43;
				p_x = px;
				p_y = py;
				p_z = pz;
				r1.px = p_x;
				r1.py = p_y;
				r1.pz = p_z;
				var x1 = r1.lx;
				var y1 = r1.ly;
				var z1 = r1.lz;
				if(z1 == null) {
					z1 = 0.;
				}
				if(y1 == null) {
					y1 = 0.;
				}
				if(x1 == null) {
					x1 = 0.;
				}
				var l_x = x1;
				var l_y = y1;
				var l_z = z1;
				var l_w = 1.;
				var px1 = l_x * minv._11 + l_y * minv._21 + l_z * minv._31;
				var py1 = l_x * minv._12 + l_y * minv._22 + l_z * minv._32;
				var pz1 = l_x * minv._13 + l_y * minv._23 + l_z * minv._33;
				l_x = px1;
				l_y = py1;
				l_z = pz1;
				r1.lx = l_x;
				r1.ly = l_y;
				r1.lz = l_z;
				r1.normalize();
				if(r1.lx != r1.lx) {
					r1.px = saveR_px;
					r1.py = saveR_py;
					r1.pz = saveR_pz;
					r1.lx = saveR_lx;
					r1.ly = saveR_ly;
					r1.lz = saveR_lz;
					continue;
				}
				var hit = i.shape.rayIntersection(r1,i.bestMatch);
				if(hit < 0) {
					r1.px = saveR_px;
					r1.py = saveR_py;
					r1.pz = saveR_pz;
					r1.lx = saveR_lx;
					r1.ly = saveR_ly;
					r1.lz = saveR_lz;
					continue;
				}
				var x2 = r1.px + hit * r1.lx;
				var y2 = r1.py + hit * r1.ly;
				var z2 = r1.pz + hit * r1.lz;
				if(z2 == null) {
					z2 = 0.;
				}
				if(y2 == null) {
					y2 = 0.;
				}
				if(x2 == null) {
					x2 = 0.;
				}
				var hitPoint_x = x2;
				var hitPoint_y = y2;
				var hitPoint_z = z2;
				r1.px = saveR_px;
				r1.py = saveR_py;
				r1.pz = saveR_pz;
				r1.lx = saveR_lx;
				r1.ly = saveR_ly;
				r1.lz = saveR_lz;
				i.hitPoint.x = hitPoint_x;
				i.hitPoint.y = hitPoint_y;
				i.hitPoint.z = hitPoint_z;
				if(i.priority > priority) {
					while(this.hitInteractives.length > 0) this.hitInteractives.pop();
					priority = i.priority;
				}
				this.hitInteractives.push(i);
			}
			if(this.hitInteractives.length == 0) {
				return null;
			}
			if(this.hitInteractives.length > 1) {
				var _g = 0;
				var _g1 = this.hitInteractives;
				while(_g < _g1.length) {
					var i = _g1[_g];
					++_g;
					var m = i.invPos;
					var wfactor = 0.;
					if(i.preciseShape != null) {
						var x = r1.px;
						var y = r1.py;
						var z = r1.pz;
						if(z == null) {
							z = 0.;
						}
						if(y == null) {
							y = 0.;
						}
						if(x == null) {
							x = 0.;
						}
						var p_x = x;
						var p_y = y;
						var p_z = z;
						var p_w = 1.;
						var px = p_x * m._11 + p_y * m._21 + p_z * m._31 + p_w * m._41;
						var py = p_x * m._12 + p_y * m._22 + p_z * m._32 + p_w * m._42;
						var pz = p_x * m._13 + p_y * m._23 + p_z * m._33 + p_w * m._43;
						p_x = px;
						p_y = py;
						p_z = pz;
						r1.px = p_x;
						r1.py = p_y;
						r1.pz = p_z;
						var x1 = r1.lx;
						var y1 = r1.ly;
						var z1 = r1.lz;
						if(z1 == null) {
							z1 = 0.;
						}
						if(y1 == null) {
							y1 = 0.;
						}
						if(x1 == null) {
							x1 = 0.;
						}
						var l_x = x1;
						var l_y = y1;
						var l_z = z1;
						var l_w = 1.;
						var px1 = l_x * m._11 + l_y * m._21 + l_z * m._31;
						var py1 = l_x * m._12 + l_y * m._22 + l_z * m._32;
						var pz1 = l_x * m._13 + l_y * m._23 + l_z * m._33;
						l_x = px1;
						l_y = py1;
						l_z = pz1;
						r1.lx = l_x;
						r1.ly = l_y;
						r1.lz = l_z;
						r1.normalize();
						var hit = i.preciseShape.rayIntersection(r1,i.bestMatch);
						if(hit > 0) {
							var x2 = r1.px + hit * r1.lx;
							var y2 = r1.py + hit * r1.ly;
							var z2 = r1.pz + hit * r1.lz;
							if(z2 == null) {
								z2 = 0.;
							}
							if(y2 == null) {
								y2 = 0.;
							}
							if(x2 == null) {
								x2 = 0.;
							}
							var hitPoint_x = x2;
							var hitPoint_y = y2;
							var hitPoint_z = z2;
							i.hitPoint.x = hitPoint_x;
							i.hitPoint.y = hitPoint_y;
							i.hitPoint.z = hitPoint_z;
						} else {
							wfactor = 1.;
						}
						r1.px = saveR_px;
						r1.py = saveR_py;
						r1.pz = saveR_pz;
						r1.lx = saveR_lx;
						r1.ly = saveR_ly;
						r1.lz = saveR_lz;
					}
					var _this = i.hitPoint;
					var x3 = _this.x;
					var y3 = _this.y;
					var z3 = _this.z;
					var w = _this.w;
					if(w == null) {
						w = 1.;
					}
					if(z3 == null) {
						z3 = 0.;
					}
					if(y3 == null) {
						y3 = 0.;
					}
					if(x3 == null) {
						x3 = 0.;
					}
					var p_x1 = x3;
					var p_y1 = y3;
					var p_z1 = z3;
					var p_w1 = w;
					p_w1 = 1;
					var m1 = i.absPos;
					var px2 = p_x1 * m1._11 + p_y1 * m1._21 + p_z1 * m1._31 + p_w1 * m1._41;
					var py2 = p_x1 * m1._12 + p_y1 * m1._22 + p_z1 * m1._32 + p_w1 * m1._42;
					var pz2 = p_x1 * m1._13 + p_y1 * m1._23 + p_z1 * m1._33 + p_w1 * m1._43;
					p_x1 = px2;
					p_y1 = py2;
					p_z1 = pz2;
					var m2 = this.camera.m;
					var px3 = p_x1 * m2._11 + p_y1 * m2._21 + p_z1 * m2._31 + p_w1 * m2._41;
					var py3 = p_x1 * m2._12 + p_y1 * m2._22 + p_z1 * m2._32 + p_w1 * m2._42;
					var pz3 = p_x1 * m2._13 + p_y1 * m2._23 + p_z1 * m2._33 + p_w1 * m2._43;
					var iw = 1 / (p_x1 * m2._14 + p_y1 * m2._24 + p_z1 * m2._34 + p_w1 * m2._44);
					p_x1 = px3 * iw;
					p_y1 = py3 * iw;
					p_z1 = pz3 * iw;
					p_w1 = 1;
					i.hitPoint.w = p_z1 + wfactor;
				}
				this.hitInteractives.sort($bind(this,this.sortHitPointByCameraDistance));
			}
			this.hitInteractives.unshift(null);
		}
		while(this.hitInteractives.length > 0) {
			var i = this.hitInteractives.pop();
			if(i == null) {
				return null;
			}
			event.relX = i.hitPoint.x;
			event.relY = i.hitPoint.y;
			event.relZ = i.hitPoint.z;
			i.handleEvent(event);
			if(event.cancel) {
				event.cancel = false;
				event.propagate = false;
				continue;
			}
			if(!event.propagate) {
				while(this.hitInteractives.length > 0) this.hitInteractives.pop();
			}
			return i;
		}
		return null;
	}
	,addEventTarget: function(i) {
		if(this.interactives.indexOf(i) >= 0) {
			throw haxe_Exception.thrown("assert");
		}
		this.interactives.push(i);
	}
	,removeEventTarget: function(i) {
		if(HxOverrides.remove(this.interactives,i)) {
			if(this.events != null) {
				this.events.onRemove(i);
			}
			HxOverrides.remove(this.hitInteractives,i);
		}
	}
	,setElapsedTime: function(elapsedTime) {
		this.ctx.elapsedTime = elapsedTime;
	}
	,render: function(engine) {
		if((this.flags & 32) == 0) {
			this.onAdd();
		}
		var t = engine.getCurrentTarget();
		if(t == null) {
			this.camera.screenRatio = engine.width / engine.height;
		} else {
			this.camera.screenRatio = t.width / t.height;
		}
		this.camera.update();
		if(this.camera.rightHanded) {
			engine.driver.setRenderFlag(h3d_impl_RenderFlag.CameraHandness,1);
		}
		this.ctx.camera = this.camera;
		this.ctx.engine = engine;
		this.ctx.scene = this;
		this.ctx.start();
		this.renderer.start();
		this.syncRec(this.ctx);
		this.emitRec(this.ctx);
		var list = this.ctx.passes;
		var tmp;
		if(list == null) {
			tmp = null;
		} else {
			var insize = 1;
			var nmerges;
			var psize = 0;
			var qsize = 0;
			var p;
			var q;
			var e;
			var tail;
			while(true) {
				p = list;
				list = null;
				tail = null;
				nmerges = 0;
				while(p != null) {
					++nmerges;
					q = p;
					psize = 0;
					var _g = 0;
					var _g1 = insize;
					while(_g < _g1) {
						var i = _g++;
						++psize;
						q = q.next;
						if(q == null) {
							break;
						}
					}
					qsize = insize;
					while(psize > 0 || qsize > 0 && q != null) {
						if(psize == 0) {
							e = q;
							q = q.next;
							--qsize;
						} else if(qsize == 0 || q == null || p.pass.passId - q.pass.passId <= 0) {
							e = p;
							p = p.next;
							--psize;
						} else {
							e = q;
							q = q.next;
							--qsize;
						}
						if(tail != null) {
							tail.next = e;
						} else {
							list = e;
						}
						tail = e;
					}
					p = q;
				}
				tail.next = null;
				if(nmerges <= 1) {
					break;
				}
				insize *= 2;
			}
			tmp = list;
		}
		this.ctx.passes = tmp;
		var curPass = this.ctx.passes;
		var passes = [];
		var passIndex = -1;
		while(curPass != null) {
			var passId = curPass.pass.passId;
			var p = curPass;
			var prev = null;
			while(p != null && p.pass.passId == passId) {
				prev = p;
				p = p.next;
			}
			prev.next = null;
			var pobjs = this.ctx.cachedPassObjects[++passIndex];
			if(pobjs == null) {
				pobjs = new h3d_scene_PassObjects();
				this.ctx.cachedPassObjects[passIndex] = pobjs;
			}
			pobjs.name = curPass.pass.name;
			var _this = pobjs.passes;
			_this.current = curPass;
			_this.discarded = _this.lastDisc = null;
			passes.push(pobjs);
			curPass = p;
		}
		if(this.lightSystem != null) {
			this.ctx.lightSystem = this.lightSystem;
			this.lightSystem.initLights(this.ctx);
		}
		this.renderer.process(passes);
		if(this.camera.rightHanded) {
			engine.driver.setRenderFlag(h3d_impl_RenderFlag.CameraHandness,0);
		}
		this.ctx.done();
		this.ctx.scene = null;
		this.ctx.camera = null;
		this.ctx.engine = null;
		var _g = 0;
		var _g1 = passIndex;
		while(_g < _g1) {
			var i = _g++;
			var p = this.ctx.cachedPassObjects[i];
			p.name = null;
			var _this = p.passes;
			_this.current = null;
			_this.discarded = _this.lastDisc = null;
		}
	}
	,__class__: h3d_scene_Scene
});
var h3d_scene_fwd_LightSystem = function() {
	this.perPixelLighting = true;
	this.maxLightsPerObject = 6;
	h3d_scene_LightSystem.call(this);
	var _this = this.ambientLight;
	var x = 0.5;
	var y = 0.5;
	var z = 0.5;
	if(z == null) {
		z = 0.;
	}
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	_this.x = x;
	_this.y = y;
	_this.z = z;
	_this.w = 1.;
	this.ambientShader = new h3d_shader_AmbientLight();
	this.set_additiveLighting(true);
};
h3d_scene_fwd_LightSystem.__name__ = "h3d.scene.fwd.LightSystem";
h3d_scene_fwd_LightSystem.__super__ = h3d_scene_LightSystem;
h3d_scene_fwd_LightSystem.prototype = $extend(h3d_scene_LightSystem.prototype,{
	set_additiveLighting: function(b) {
		var value = this.ambientShader;
		var _this = ((value) instanceof h3d_shader_AmbientLight) ? value : null;
		_this.constModified = true;
		return _this.additive__ = b;
	}
	,initLights: function(ctx) {
		h3d_scene_LightSystem.prototype.initLights.call(this,ctx);
		if(this.lightCount <= this.maxLightsPerObject) {
			var list = ctx.lights;
			var cmp = $bind(this,this.sortLight);
			var tmp;
			if(list == null) {
				tmp = null;
			} else {
				var insize = 1;
				var nmerges;
				var psize = 0;
				var qsize = 0;
				var p;
				var q;
				var e;
				var tail;
				while(true) {
					p = list;
					list = null;
					tail = null;
					nmerges = 0;
					while(p != null) {
						++nmerges;
						q = p;
						psize = 0;
						var _g = 0;
						var _g1 = insize;
						while(_g < _g1) {
							var i = _g++;
							++psize;
							q = q.next;
							if(q == null) {
								break;
							}
						}
						qsize = insize;
						while(psize > 0 || qsize > 0 && q != null) {
							if(psize == 0) {
								e = q;
								q = q.next;
								--qsize;
							} else if(qsize == 0 || q == null || cmp(p,q) <= 0) {
								e = p;
								p = p.next;
								--psize;
							} else {
								e = q;
								q = q.next;
								--qsize;
							}
							if(tail != null) {
								tail.next = e;
							} else {
								list = e;
							}
							tail = e;
						}
						p = q;
					}
					tail.next = null;
					if(nmerges <= 1) {
						break;
					}
					insize *= 2;
				}
				tmp = list;
			}
			ctx.lights = tmp;
		}
	}
	,initGlobals: function(globals) {
		globals.set("global.ambientLight",this.ambientLight);
		globals.set("global.perPixelLighting",this.perPixelLighting);
	}
	,sortLight: function(l1,l2) {
		var p = l1.priority - l2.priority;
		if(p != 0) {
			return -p;
		}
		if(l1.objectDistance < l2.objectDistance) {
			return -1;
		} else {
			return 1;
		}
	}
	,computeLight: function(obj,shaders) {
		var _gthis = this;
		if(this.lightCount > this.maxLightsPerObject) {
			var l = this.ctx.lights;
			while(l != null) {
				if((obj.flags & 16) != 0) {
					var dx = l.absPos._41 - this.ctx.camera.target.x;
					var dy = l.absPos._42 - this.ctx.camera.target.y;
					var dz = l.absPos._43 - this.ctx.camera.target.z;
					if(dz == null) {
						dz = 0.;
					}
					l.objectDistance = dx * dx + dy * dy + dz * dz;
				} else {
					var dx1 = l.absPos._41 - obj.absPos._41;
					var dy1 = l.absPos._42 - obj.absPos._42;
					var dz1 = l.absPos._43 - obj.absPos._43;
					if(dz1 == null) {
						dz1 = 0.;
					}
					l.objectDistance = dx1 * dx1 + dy1 * dy1 + dz1 * dz1;
				}
				l = l.next;
			}
			var list = this.ctx.lights;
			var cmp = $bind(this,this.sortLight);
			var tmp;
			if(list == null) {
				tmp = null;
			} else {
				var insize = 1;
				var nmerges;
				var psize = 0;
				var qsize = 0;
				var p;
				var q;
				var e;
				var tail;
				while(true) {
					p = list;
					list = null;
					tail = null;
					nmerges = 0;
					while(p != null) {
						++nmerges;
						q = p;
						psize = 0;
						var _g = 0;
						var _g1 = insize;
						while(_g < _g1) {
							var i = _g++;
							++psize;
							q = q.next;
							if(q == null) {
								break;
							}
						}
						qsize = insize;
						while(psize > 0 || qsize > 0 && q != null) {
							if(psize == 0) {
								e = q;
								q = q.next;
								--qsize;
							} else if(qsize == 0 || q == null || cmp(p,q) <= 0) {
								e = p;
								p = p.next;
								--psize;
							} else {
								e = q;
								q = q.next;
								--qsize;
							}
							if(tail != null) {
								tail.next = e;
							} else {
								list = e;
							}
							tail = e;
						}
						p = q;
					}
					tail.next = null;
					if(nmerges <= 1) {
						break;
					}
					insize *= 2;
				}
				tmp = list;
			}
			this.ctx.lights = tmp;
		}
		shaders = _gthis.ctx.allocShaderList(this.ambientShader,shaders);
		var l = this.ctx.lights;
		var i = 0;
		while(l != null) {
			if(i++ == this.maxLightsPerObject) {
				break;
			}
			shaders = _gthis.ctx.allocShaderList(l.shader,shaders);
			l = l.next;
		}
		return shaders;
	}
	,__class__: h3d_scene_fwd_LightSystem
});
var h3d_scene_fwd_DepthPass = function() {
	this.enableSky = false;
	h3d_pass_Default.call(this,"depth");
	this.depthMapId = hxsl_Globals.allocID("depthMap");
};
h3d_scene_fwd_DepthPass.__name__ = "h3d.scene.fwd.DepthPass";
h3d_scene_fwd_DepthPass.__super__ = h3d_pass_Default;
h3d_scene_fwd_DepthPass.prototype = $extend(h3d_pass_Default.prototype,{
	getOutputs: function() {
		return [hxsl_Output.PackFloat(hxsl_Output.Value("output.depth"))];
	}
	,draw: function(passes,sort) {
		var texture = this.ctx.textures.allocTarget("depthMap",this.ctx.engine.width,this.ctx.engine.height,true);
		this.ctx.engine.pushTarget(texture);
		this.ctx.engine.clear(this.enableSky ? 0 : 16711680,1);
		h3d_pass_Default.prototype.draw.call(this,passes,sort);
		this.ctx.engine.popTarget();
		this.ctx.setGlobalID(this.depthMapId,{ texture : texture});
	}
	,__class__: h3d_scene_fwd_DepthPass
});
var h3d_scene_fwd_NormalPass = function() {
	h3d_pass_Default.call(this,"normal");
	this.normalMapId = hxsl_Globals.allocID("normalMap");
};
h3d_scene_fwd_NormalPass.__name__ = "h3d.scene.fwd.NormalPass";
h3d_scene_fwd_NormalPass.__super__ = h3d_pass_Default;
h3d_scene_fwd_NormalPass.prototype = $extend(h3d_pass_Default.prototype,{
	getOutputs: function() {
		return [hxsl_Output.PackNormal(hxsl_Output.Value("output.normal"))];
	}
	,draw: function(passes,sort) {
		var texture = this.ctx.textures.allocTarget("normalMap",this.ctx.engine.width,this.ctx.engine.height);
		this.ctx.engine.pushTarget(texture);
		this.ctx.engine.clear(8421504,1);
		h3d_pass_Default.prototype.draw.call(this,passes,sort);
		this.ctx.engine.popTarget();
		this.ctx.setGlobalID(this.normalMapId,texture);
	}
	,__class__: h3d_scene_fwd_NormalPass
});
var h3d_scene_fwd_Renderer = function() {
	this.shadow = new h3d_pass_DefaultShadowMap(1024);
	this.normal = new h3d_scene_fwd_NormalPass();
	this.depth = new h3d_scene_fwd_DepthPass();
	h3d_scene_Renderer.call(this);
	this.defaultPass = new h3d_pass_Default("default");
	this.allPasses = [this.defaultPass,this.depth,this.normal,this.shadow];
};
h3d_scene_fwd_Renderer.__name__ = "h3d.scene.fwd.Renderer";
h3d_scene_fwd_Renderer.__super__ = h3d_scene_Renderer;
h3d_scene_fwd_Renderer.prototype = $extend(h3d_scene_Renderer.prototype,{
	renderPass: function(p,passes,sort) {
		p.draw(passes,sort);
	}
	,render: function() {
		if(this.has("shadow")) {
			this.renderPass(this.shadow,this.get("shadow"));
		}
		if(this.has("depth")) {
			this.renderPass(this.depth,this.get("depth"));
		}
		if(this.has("normal")) {
			this.renderPass(this.normal,this.get("normal"));
		}
		this.renderPass(this.defaultPass,this.get("default"));
		this.renderPass(this.defaultPass,this.get("alpha"),this.backToFront);
		this.renderPass(this.defaultPass,this.get("additive"));
	}
	,__class__: h3d_scene_fwd_Renderer
});
var h3d_shader_AmbientLight = function() {
	hxsl_Shader.call(this);
};
h3d_shader_AmbientLight.__name__ = "h3d.shader.AmbientLight";
h3d_shader_AmbientLight.__super__ = hxsl_Shader;
h3d_shader_AmbientLight.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.additive__) {
			this.constBits |= 2;
		}
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		if(index == 0) {
			return this.additive__;
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_AmbientLight
});
var h3d_shader_Base2d = function() {
	this.viewportB__ = new h3d_Vector();
	this.viewportA__ = new h3d_Vector();
	this.halfPixelInverse__ = new h3d_Vector();
	this.uvPos__ = new h3d_Vector();
	this.filterMatrixB__ = new h3d_Vector();
	this.filterMatrixA__ = new h3d_Vector();
	this.absoluteMatrixB__ = new h3d_Vector();
	this.absoluteMatrixA__ = new h3d_Vector();
	this.color__ = new h3d_Vector();
	this.zValue__ = 0;
	hxsl_Shader.call(this);
};
h3d_shader_Base2d.__name__ = "h3d.shader.Base2d";
h3d_shader_Base2d.__super__ = hxsl_Shader;
h3d_shader_Base2d.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.isRelative__) {
			this.constBits |= 1;
		}
		if(this.hasUVPos__) {
			this.constBits |= 2;
		}
		if(this.killAlpha__) {
			this.constBits |= 4;
		}
		if(this.pixelAlign__) {
			this.constBits |= 8;
		}
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.zValue__;
		case 1:
			return this.texture__;
		case 2:
			return this.isRelative__;
		case 3:
			return this.color__;
		case 4:
			return this.absoluteMatrixA__;
		case 5:
			return this.absoluteMatrixB__;
		case 6:
			return this.filterMatrixA__;
		case 7:
			return this.filterMatrixB__;
		case 8:
			return this.hasUVPos__;
		case 9:
			return this.uvPos__;
		case 10:
			return this.killAlpha__;
		case 11:
			return this.pixelAlign__;
		case 12:
			return this.halfPixelInverse__;
		case 13:
			return this.viewportA__;
		case 14:
			return this.viewportB__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		if(index == 0) {
			return this.zValue__;
		}
		return 0.;
	}
	,__class__: h3d_shader_Base2d
});
var h3d_shader_BaseMesh = function() {
	this.specularColor__ = new h3d_Vector();
	this.specularAmount__ = 0;
	this.specularPower__ = 0;
	this.color__ = new h3d_Vector();
	hxsl_Shader.call(this);
	var _this = this.color__;
	var x = 1;
	var y = 1;
	var z = 1;
	if(z == null) {
		z = 0.;
	}
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	_this.x = x;
	_this.y = y;
	_this.z = z;
	_this.w = 1.;
	var _this = this.specularColor__;
	var x = 1;
	var y = 1;
	var z = 1;
	if(z == null) {
		z = 0.;
	}
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	_this.x = x;
	_this.y = y;
	_this.z = z;
	_this.w = 1.;
	this.specularPower__ = 50;
	this.specularAmount__ = 1;
};
h3d_shader_BaseMesh.__name__ = "h3d.shader.BaseMesh";
h3d_shader_BaseMesh.__super__ = hxsl_Shader;
h3d_shader_BaseMesh.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.color__;
		case 1:
			return this.specularPower__;
		case 2:
			return this.specularAmount__;
		case 3:
			return this.specularColor__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		switch(index) {
		case 1:
			return this.specularPower__;
		case 2:
			return this.specularAmount__;
		default:
		}
		return 0.;
	}
	,__class__: h3d_shader_BaseMesh
});
var h3d_shader_Blur = function() {
	this.cubeDir__ = new h3d_Matrix();
	this.fixedColor__ = new h3d_Vector();
	this.pixel__ = new h3d_Vector();
	this.offsets__ = [];
	this.values__ = [];
	this.Quality__ = 0;
	this.cameraInverseViewProj__ = new h3d_Matrix();
	h3d_shader_ScreenShader.call(this);
};
h3d_shader_Blur.__name__ = "h3d.shader.Blur";
h3d_shader_Blur.__super__ = h3d_shader_ScreenShader;
h3d_shader_Blur.prototype = $extend(h3d_shader_ScreenShader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		var v = this.Quality__;
		if(v >>> 8 != 0) {
			throw haxe_Exception.thrown("Quality" + " is out of range " + v + ">" + 255);
		}
		this.constBits |= v;
		if(this.isDepth__) {
			this.constBits |= 256;
		}
		if(this.hasFixedColor__) {
			this.constBits |= 512;
		}
		if(this.smoothFixedColor__) {
			this.constBits |= 1024;
		}
		if(this.isDepthDependant__) {
			this.constBits |= 2048;
		}
		if(this.hasNormal__) {
			this.constBits |= 4096;
		}
		if(this.isCube__) {
			this.constBits |= 8192;
		}
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.flipY__;
		case 1:
			return this.cameraInverseViewProj__;
		case 2:
			return this.texture__;
		case 3:
			return this.depthTexture__;
		case 4:
			return this.Quality__;
		case 5:
			return this.isDepth__;
		case 6:
			return this.values__;
		case 7:
			return this.offsets__;
		case 8:
			return this.pixel__;
		case 9:
			return this.hasFixedColor__;
		case 10:
			return this.smoothFixedColor__;
		case 11:
			return this.fixedColor__;
		case 12:
			return this.isDepthDependant__;
		case 13:
			return this.hasNormal__;
		case 14:
			return this.normalTexture__;
		case 15:
			return this.isCube__;
		case 16:
			return this.cubeTexture__;
		case 17:
			return this.cubeDir__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		if(index == 0) {
			return this.flipY__;
		}
		return 0.;
	}
	,__class__: h3d_shader_Blur
});
var h3d_shader_ShaderBuffers = function(s) {
	this.globals = new Float32Array(s.globalsSize << 2);
	this.params = new Float32Array(s.paramsSize << 2);
	var this1 = new Array(s.texturesCount);
	this.tex = this1;
	var tmp;
	if(s.bufferCount > 0) {
		var this1 = new Array(s.bufferCount);
		tmp = this1;
	} else {
		tmp = null;
	}
	this.buffers = tmp;
};
h3d_shader_ShaderBuffers.__name__ = "h3d.shader.ShaderBuffers";
h3d_shader_ShaderBuffers.prototype = {
	grow: function(s) {
		var ng = s.globalsSize << 2;
		var np = s.paramsSize << 2;
		var nt = s.texturesCount;
		var nb = s.bufferCount;
		if(this.globals.length < ng) {
			this.globals = new Float32Array(ng);
		}
		if(this.params.length < np) {
			this.params = new Float32Array(np);
		}
		if(this.tex.length < nt) {
			var this1 = new Array(nt);
			this.tex = this1;
		}
		if(nb > 0 && (this.buffers == null || this.buffers.length < nb)) {
			var this1 = new Array(nb);
			this.buffers = this1;
		}
	}
	,__class__: h3d_shader_ShaderBuffers
};
var h3d_shader_Buffers = function(s) {
	this.vertex = new h3d_shader_ShaderBuffers(s.vertex);
	this.fragment = new h3d_shader_ShaderBuffers(s.fragment);
};
h3d_shader_Buffers.__name__ = "h3d.shader.Buffers";
h3d_shader_Buffers.prototype = {
	__class__: h3d_shader_Buffers
};
var h3d_shader_ColorAdd = function(color) {
	if(color == null) {
		color = 0;
	}
	this.color__ = new h3d_Vector();
	hxsl_Shader.call(this);
	var _this = this.color__;
	_this.x = (color >> 16 & 255) / 255;
	_this.y = (color >> 8 & 255) / 255;
	_this.z = (color & 255) / 255;
	_this.w = (color >>> 24) / 255;
};
h3d_shader_ColorAdd.__name__ = "h3d.shader.ColorAdd";
h3d_shader_ColorAdd.__super__ = hxsl_Shader;
h3d_shader_ColorAdd.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		if(index == 0) {
			return this.color__;
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_ColorAdd
});
var h3d_shader_ColorKey = function(v) {
	if(v == null) {
		v = 0;
	}
	this.colorKey__ = new h3d_Vector();
	hxsl_Shader.call(this);
	var _this = this.colorKey__;
	_this.x = (v >> 16 & 255) / 255;
	_this.y = (v >> 8 & 255) / 255;
	_this.z = (v & 255) / 255;
	_this.w = (v >>> 24) / 255;
};
h3d_shader_ColorKey.__name__ = "h3d.shader.ColorKey";
h3d_shader_ColorKey.__super__ = hxsl_Shader;
h3d_shader_ColorKey.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		if(index == 0) {
			return this.colorKey__;
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_ColorKey
});
var h3d_shader_ColorMatrix = function(m) {
	this.matrix__ = new h3d_Matrix();
	hxsl_Shader.call(this);
	if(m != null) {
		this.matrix__.loadValues(m);
	} else {
		this.matrix__.identity();
	}
};
h3d_shader_ColorMatrix.__name__ = "h3d.shader.ColorMatrix";
h3d_shader_ColorMatrix.__super__ = hxsl_Shader;
h3d_shader_ColorMatrix.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		if(index == 0) {
			return this.matrix__;
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_ColorMatrix
});
var h3d_shader_DirShadow = function() {
	this.poissonDiskVeryHigh__ = [];
	this.poissonDiskHigh__ = [];
	this.poissonDiskLow__ = [];
	this.shadowBias__ = 0;
	this.shadowProj__ = new h3d_Matrix();
	this.shadowMapChannel__ = hxsl_Channel.Unknown;
	this.shadowRes__ = new h3d_Vector();
	this.pcfScale__ = 0;
	this.pcfQuality__ = 0;
	this.shadowPower__ = 0;
	hxsl_Shader.call(this);
	this.poissonDiskLow__ = [new h3d_Vector(-0.942,-0.399),new h3d_Vector(0.945,-0.768),new h3d_Vector(-0.094,-0.929),new h3d_Vector(0.344,0.293)];
	this.poissonDiskHigh__ = [new h3d_Vector(-0.326,-0.406),new h3d_Vector(-0.840,-0.074),new h3d_Vector(-0.696,0.457),new h3d_Vector(-0.203,0.621),new h3d_Vector(0.962,-0.195),new h3d_Vector(0.473,-0.480),new h3d_Vector(0.519,0.767),new h3d_Vector(0.185,-0.893),new h3d_Vector(0.507,0.064),new h3d_Vector(0.896,0.412),new h3d_Vector(-0.322,-0.933),new h3d_Vector(-0.792,-0.598)];
	this.poissonDiskVeryHigh__ = [new h3d_Vector(-0.613392,0.617481),new h3d_Vector(0.170019,-0.040254),new h3d_Vector(-0.299417,0.791925),new h3d_Vector(0.645680,0.493210),new h3d_Vector(-0.651784,0.717887),new h3d_Vector(0.421003,0.027070),new h3d_Vector(-0.817194,-0.271096),new h3d_Vector(-0.705374,-0.668203),new h3d_Vector(0.977050,-0.108615),new h3d_Vector(0.063326,0.142369),new h3d_Vector(0.203528,0.214331),new h3d_Vector(-0.667531,0.326090),new h3d_Vector(-0.098422,-0.295755),new h3d_Vector(-0.885922,0.215369),new h3d_Vector(0.566637,0.605213),new h3d_Vector(0.039766,-0.396100),new h3d_Vector(0.751946,0.453352),new h3d_Vector(0.078707,-0.715323),new h3d_Vector(-0.075838,-0.529344),new h3d_Vector(0.724479,-0.580798),new h3d_Vector(0.222999,-0.215125),new h3d_Vector(-0.467574,-0.405438),new h3d_Vector(-0.248268,-0.814753),new h3d_Vector(0.354411,-0.887570),new h3d_Vector(0.175817,0.382366),new h3d_Vector(0.487472,-0.063082),new h3d_Vector(-0.084078,0.898312),new h3d_Vector(0.488876,-0.783441),new h3d_Vector(0.470016,0.217933),new h3d_Vector(-0.696890,-0.549791),new h3d_Vector(-0.149693,0.605762),new h3d_Vector(0.034211,0.979980),new h3d_Vector(0.503098,-0.308878),new h3d_Vector(-0.016205,-0.872921),new h3d_Vector(0.385784,-0.393902),new h3d_Vector(-0.146886,-0.859249),new h3d_Vector(0.643361,0.164098),new h3d_Vector(0.634388,-0.049471),new h3d_Vector(-0.688894,0.007843),new h3d_Vector(0.464034,-0.188818),new h3d_Vector(-0.440840,0.137486),new h3d_Vector(0.364483,0.511704),new h3d_Vector(0.034028,0.325968),new h3d_Vector(0.099094,-0.308023),new h3d_Vector(0.693960,-0.366253),new h3d_Vector(0.678884,-0.204688),new h3d_Vector(0.001801,0.780328),new h3d_Vector(0.145177,-0.898984),new h3d_Vector(0.062655,-0.611866),new h3d_Vector(0.315226,-0.604297),new h3d_Vector(-0.780145,0.486251),new h3d_Vector(-0.371868,0.882138),new h3d_Vector(0.200476,0.494430),new h3d_Vector(-0.494552,-0.711051),new h3d_Vector(0.612476,0.705252),new h3d_Vector(-0.578845,-0.768792),new h3d_Vector(-0.772454,-0.090976),new h3d_Vector(0.504440,0.372295),new h3d_Vector(0.155736,0.065157),new h3d_Vector(0.391522,0.849605),new h3d_Vector(-0.620106,-0.328104),new h3d_Vector(0.789239,-0.419965),new h3d_Vector(-0.545396,0.538133),new h3d_Vector(-0.178564,-0.596057)];
};
h3d_shader_DirShadow.__name__ = "h3d.shader.DirShadow";
h3d_shader_DirShadow.__super__ = hxsl_Shader;
h3d_shader_DirShadow.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.enable__) {
			this.constBits |= 1;
		}
		if(this.USE_ESM__) {
			this.constBits |= 2;
		}
		if(this.USE_PCF__) {
			this.constBits |= 4;
		}
		var v = this.pcfQuality__;
		if(v >>> 8 != 0) {
			throw haxe_Exception.thrown("pcfQuality" + " is out of range " + v + ">" + 255);
		}
		this.constBits |= v << 3;
		if(this.shadowMap__ == null) {
			this.shadowMapChannel__ = hxsl_Channel.Unknown;
		} else if(this.shadowMapChannel__ == hxsl_Channel.Unknown) {
			if(this.shadowMap__.format == h3d_mat_Texture.nativeFormat) {
				this.shadowMapChannel__ = hxsl_Channel.PackedFloat;
			} else {
				throw haxe_Exception.thrown("shadowMap" + "Channel is not set");
			}
		}
		this.constBits |= (globals.allocChannelID(this.shadowMap__) << 3 | this.shadowMapChannel__._hx_index) << 11;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.enable__;
		case 1:
			return this.USE_ESM__;
		case 2:
			return this.shadowPower__;
		case 3:
			return this.USE_PCF__;
		case 4:
			return this.pcfQuality__;
		case 5:
			return this.pcfScale__;
		case 6:
			return this.shadowRes__;
		case 7:
			return this.shadowMap__;
		case 8:
			return this.shadowProj__;
		case 9:
			return this.shadowBias__;
		case 10:
			return this.poissonDiskLow__;
		case 11:
			return this.poissonDiskHigh__;
		case 12:
			return this.poissonDiskVeryHigh__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		switch(index) {
		case 2:
			return this.shadowPower__;
		case 5:
			return this.pcfScale__;
		case 9:
			return this.shadowBias__;
		default:
		}
		return 0.;
	}
	,__class__: h3d_shader_DirShadow
});
var h3d_shader_GenTexture = function() {
	this.color__ = new h3d_Vector();
	this.mode__ = 0;
	h3d_shader_ScreenShader.call(this);
};
h3d_shader_GenTexture.__name__ = "h3d.shader.GenTexture";
h3d_shader_GenTexture.__super__ = h3d_shader_ScreenShader;
h3d_shader_GenTexture.prototype = $extend(h3d_shader_ScreenShader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		var v = this.mode__;
		if(v >>> 8 != 0) {
			throw haxe_Exception.thrown("mode" + " is out of range " + v + ">" + 255);
		}
		this.constBits |= v;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.flipY__;
		case 1:
			return this.mode__;
		case 2:
			return this.color__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		if(index == 0) {
			return this.flipY__;
		}
		return 0.;
	}
	,__class__: h3d_shader_GenTexture
});
var h3d_shader_LineShader = function(width,lengthScale) {
	if(lengthScale == null) {
		lengthScale = 1.;
	}
	if(width == null) {
		width = 1.5;
	}
	this.width__ = 0;
	this.lengthScale__ = 0;
	hxsl_Shader.call(this);
	this.width__ = width;
	this.lengthScale__ = lengthScale;
};
h3d_shader_LineShader.__name__ = "h3d.shader.LineShader";
h3d_shader_LineShader.__super__ = hxsl_Shader;
h3d_shader_LineShader.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.lengthScale__;
		case 1:
			return this.width__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		switch(index) {
		case 0:
			return this.lengthScale__;
		case 1:
			return this.width__;
		default:
		}
		return 0.;
	}
	,__class__: h3d_shader_LineShader
});
var h3d_shader_MinMaxShader = function() {
	h3d_shader_ScreenShader.call(this);
};
h3d_shader_MinMaxShader.__name__ = "h3d.shader.MinMaxShader";
h3d_shader_MinMaxShader.__super__ = h3d_shader_ScreenShader;
h3d_shader_MinMaxShader.prototype = $extend(h3d_shader_ScreenShader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.isMax__) {
			this.constBits |= 1;
		}
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.flipY__;
		case 1:
			return this.texA__;
		case 2:
			return this.texB__;
		case 3:
			return this.isMax__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		if(index == 0) {
			return this.flipY__;
		}
		return 0.;
	}
	,__class__: h3d_shader_MinMaxShader
});
var h3d_shader_CubeMinMaxShader = function() {
	this.mat__ = new h3d_Matrix();
	h3d_shader_ScreenShader.call(this);
};
h3d_shader_CubeMinMaxShader.__name__ = "h3d.shader.CubeMinMaxShader";
h3d_shader_CubeMinMaxShader.__super__ = h3d_shader_ScreenShader;
h3d_shader_CubeMinMaxShader.prototype = $extend(h3d_shader_ScreenShader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.isMax__) {
			this.constBits |= 1;
		}
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.flipY__;
		case 1:
			return this.texA__;
		case 2:
			return this.texB__;
		case 3:
			return this.isMax__;
		case 4:
			return this.mat__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		if(index == 0) {
			return this.flipY__;
		}
		return 0.;
	}
	,__class__: h3d_shader_CubeMinMaxShader
});
var h3d_shader_NormalMap = function(texture) {
	hxsl_Shader.call(this);
	this.texture__ = texture;
};
h3d_shader_NormalMap.__name__ = "h3d.shader.NormalMap";
h3d_shader_NormalMap.__super__ = hxsl_Shader;
h3d_shader_NormalMap.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		if(index == 0) {
			return this.texture__;
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_NormalMap
});
var h3d_shader_Shadow = function() {
	hxsl_Shader.call(this);
};
h3d_shader_Shadow.__name__ = "h3d.shader.Shadow";
h3d_shader_Shadow.__super__ = hxsl_Shader;
h3d_shader_Shadow.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_Shadow
});
var h3d_shader_SignedDistanceField = function() {
	this.smoothing__ = 0.041666666666666664;
	this.alphaCutoff__ = 0.5;
	this.channel__ = 0;
	hxsl_Shader.call(this);
};
h3d_shader_SignedDistanceField.__name__ = "h3d.shader.SignedDistanceField";
h3d_shader_SignedDistanceField.__super__ = hxsl_Shader;
h3d_shader_SignedDistanceField.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		var v = this.channel__;
		if(v >>> 8 != 0) {
			throw haxe_Exception.thrown("channel" + " is out of range " + v + ">" + 255);
		}
		this.constBits |= v;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.channel__;
		case 1:
			return this.alphaCutoff__;
		case 2:
			return this.smoothing__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		switch(index) {
		case 1:
			return this.alphaCutoff__;
		case 2:
			return this.smoothing__;
		default:
		}
		return 0.;
	}
	,__class__: h3d_shader_SignedDistanceField
});
var h3d_shader_SkinBase = function() {
	this.bonesMatrixes__ = [];
	this.MaxBones__ = 0;
	hxsl_Shader.call(this);
	this.constModified = true;
	this.MaxBones__ = 34;
};
h3d_shader_SkinBase.__name__ = "h3d.shader.SkinBase";
h3d_shader_SkinBase.__super__ = hxsl_Shader;
h3d_shader_SkinBase.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		var v = this.MaxBones__;
		if(v >>> 8 != 0) {
			throw haxe_Exception.thrown("MaxBones" + " is out of range " + v + ">" + 255);
		}
		this.constBits |= v;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.MaxBones__;
		case 1:
			return this.bonesMatrixes__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_SkinBase
});
var h3d_shader_Skin = function() {
	h3d_shader_SkinBase.call(this);
};
h3d_shader_Skin.__name__ = "h3d.shader.Skin";
h3d_shader_Skin.__super__ = h3d_shader_SkinBase;
h3d_shader_Skin.prototype = $extend(h3d_shader_SkinBase.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		var v = this.MaxBones__;
		if(v >>> 8 != 0) {
			throw haxe_Exception.thrown("MaxBones" + " is out of range " + v + ">" + 255);
		}
		this.constBits |= v;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.MaxBones__;
		case 1:
			return this.bonesMatrixes__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_Skin
});
var h3d_shader_SkinTangent = function() {
	h3d_shader_SkinBase.call(this);
};
h3d_shader_SkinTangent.__name__ = "h3d.shader.SkinTangent";
h3d_shader_SkinTangent.__super__ = h3d_shader_SkinBase;
h3d_shader_SkinTangent.prototype = $extend(h3d_shader_SkinBase.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		var v = this.MaxBones__;
		if(v >>> 8 != 0) {
			throw haxe_Exception.thrown("MaxBones" + " is out of range " + v + ">" + 255);
		}
		this.constBits |= v;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.MaxBones__;
		case 1:
			return this.bonesMatrixes__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_SkinTangent
});
var h3d_shader_SpecularTexture = function(tex) {
	hxsl_Shader.call(this);
	this.texture__ = tex;
};
h3d_shader_SpecularTexture.__name__ = "h3d.shader.SpecularTexture";
h3d_shader_SpecularTexture.__super__ = hxsl_Shader;
h3d_shader_SpecularTexture.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		if(index == 0) {
			return this.texture__;
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_SpecularTexture
});
var h3d_shader_Texture = function(tex) {
	this.killAlphaThreshold__ = 0;
	hxsl_Shader.call(this);
	this.texture__ = tex;
	this.killAlphaThreshold__ = h3d_mat_Defaults.defaultKillAlphaThreshold;
};
h3d_shader_Texture.__name__ = "h3d.shader.Texture";
h3d_shader_Texture.__super__ = hxsl_Shader;
h3d_shader_Texture.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.additive__) {
			this.constBits |= 1;
		}
		if(this.killAlpha__) {
			this.constBits |= 2;
		}
		if(this.specularAlpha__) {
			this.constBits |= 4;
		}
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.additive__;
		case 1:
			return this.killAlpha__;
		case 2:
			return this.specularAlpha__;
		case 3:
			return this.killAlphaThreshold__;
		case 4:
			return this.texture__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		if(index == 3) {
			return this.killAlphaThreshold__;
		}
		return 0.;
	}
	,__class__: h3d_shader_Texture
});
var h3d_shader_UVDelta = function(dx,dy,sx,sy) {
	if(sy == null) {
		sy = 1.;
	}
	if(sx == null) {
		sx = 1.;
	}
	if(dy == null) {
		dy = 0.;
	}
	if(dx == null) {
		dx = 0.;
	}
	this.uvScale__ = new h3d_Vector();
	this.uvDelta__ = new h3d_Vector();
	hxsl_Shader.call(this);
	var _this = this.uvDelta__;
	var x = dx;
	var y = dy;
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	_this.x = x;
	_this.y = y;
	_this.z = 0.;
	_this.w = 1.;
	var _this = this.uvScale__;
	var x = sx;
	var y = sy;
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	_this.x = x;
	_this.y = y;
	_this.z = 0.;
	_this.w = 1.;
};
h3d_shader_UVDelta.__name__ = "h3d.shader.UVDelta";
h3d_shader_UVDelta.__super__ = hxsl_Shader;
h3d_shader_UVDelta.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.uvDelta__;
		case 1:
			return this.uvScale__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_UVDelta
});
var h3d_shader_VertexColorAlpha = function() {
	hxsl_Shader.call(this);
};
h3d_shader_VertexColorAlpha.__name__ = "h3d.shader.VertexColorAlpha";
h3d_shader_VertexColorAlpha.__super__ = hxsl_Shader;
h3d_shader_VertexColorAlpha.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.additive__) {
			this.constBits |= 1;
		}
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		if(index == 0) {
			return this.additive__;
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_VertexColorAlpha
});
var h3d_shader_VolumeDecal = function(objectWidth,objectHeight) {
	this.isCentered__ = true;
	this.tangent__ = new h3d_Vector();
	this.normal__ = new h3d_Vector();
	this.scale__ = new h3d_Vector();
	hxsl_Shader.call(this);
	var _this = this.normal__;
	var x = 0;
	var y = 0;
	var z = 1;
	if(z == null) {
		z = 0.;
	}
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	_this.x = x;
	_this.y = y;
	_this.z = z;
	_this.w = 1.;
	var _this = this.tangent__;
	var x = 1;
	var y = 0;
	var z = 0;
	if(z == null) {
		z = 0.;
	}
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	_this.x = x;
	_this.y = y;
	_this.z = z;
	_this.w = 1.;
	var _this = this.scale__;
	var x = 1 / objectWidth;
	var y = 1 / objectHeight;
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	_this.x = x;
	_this.y = y;
	_this.z = 0.;
	_this.w = 1.;
};
h3d_shader_VolumeDecal.__name__ = "h3d.shader.VolumeDecal";
h3d_shader_VolumeDecal.__super__ = hxsl_Shader;
h3d_shader_VolumeDecal.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.isCentered__) {
			this.constBits |= 64;
		}
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.scale__;
		case 1:
			return this.normal__;
		case 2:
			return this.tangent__;
		case 3:
			return this.isCentered__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: h3d_shader_VolumeDecal
});
var haxe_EntryPoint = function() { };
haxe_EntryPoint.__name__ = "haxe.EntryPoint";
haxe_EntryPoint.processEvents = function() {
	while(true) {
		var f = haxe_EntryPoint.pending.shift();
		if(f == null) {
			break;
		}
		f();
	}
	var time = haxe_MainLoop.tick();
	if(!haxe_MainLoop.hasEvents() && haxe_EntryPoint.threadCount == 0) {
		return -1;
	}
	return time;
};
haxe_EntryPoint.run = function() {
	var nextTick = haxe_EntryPoint.processEvents();
	if(typeof(window) != "undefined") {
		var $window = window;
		var rqf = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame;
		if(rqf != null) {
			rqf(haxe_EntryPoint.run);
		} else if(nextTick >= 0) {
			setTimeout(haxe_EntryPoint.run,nextTick * 1000);
		}
	} else if(nextTick >= 0) {
		setTimeout(haxe_EntryPoint.run,nextTick * 1000);
	}
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = "haxe.Exception";
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
	unwrap: function() {
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
haxe_Log.__name__ = "haxe.Log";
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
var haxe_MainEvent = function(f,p) {
	this.isBlocking = true;
	this.f = f;
	this.priority = p;
	this.nextRun = -Infinity;
};
haxe_MainEvent.__name__ = "haxe.MainEvent";
haxe_MainEvent.prototype = {
	__class__: haxe_MainEvent
};
var haxe_MainLoop = function() { };
haxe_MainLoop.__name__ = "haxe.MainLoop";
haxe_MainLoop.hasEvents = function() {
	var p = haxe_MainLoop.pending;
	while(p != null) {
		if(p.isBlocking) {
			return true;
		}
		p = p.next;
	}
	return false;
};
haxe_MainLoop.add = function(f,priority) {
	if(priority == null) {
		priority = 0;
	}
	if(f == null) {
		throw haxe_Exception.thrown("Event function is null");
	}
	var e = new haxe_MainEvent(f,priority);
	var head = haxe_MainLoop.pending;
	if(head != null) {
		head.prev = e;
	}
	e.next = head;
	haxe_MainLoop.pending = e;
	haxe_MainLoop.injectIntoEventLoop(0);
	return e;
};
haxe_MainLoop.injectIntoEventLoop = function(waitMs) {
};
haxe_MainLoop.sortEvents = function() {
	var list = haxe_MainLoop.pending;
	if(list == null) {
		return;
	}
	var insize = 1;
	var nmerges;
	var psize = 0;
	var qsize = 0;
	var p;
	var q;
	var e;
	var tail;
	while(true) {
		p = list;
		list = null;
		tail = null;
		nmerges = 0;
		while(p != null) {
			++nmerges;
			q = p;
			psize = 0;
			var _g = 0;
			var _g1 = insize;
			while(_g < _g1) {
				var i = _g++;
				++psize;
				q = q.next;
				if(q == null) {
					break;
				}
			}
			qsize = insize;
			while(psize > 0 || qsize > 0 && q != null) {
				if(psize == 0) {
					e = q;
					q = q.next;
					--qsize;
				} else if(qsize == 0 || q == null || (p.priority > q.priority || p.priority == q.priority && p.nextRun <= q.nextRun)) {
					e = p;
					p = p.next;
					--psize;
				} else {
					e = q;
					q = q.next;
					--qsize;
				}
				if(tail != null) {
					tail.next = e;
				} else {
					list = e;
				}
				e.prev = tail;
				tail = e;
			}
			p = q;
		}
		tail.next = null;
		if(nmerges <= 1) {
			break;
		}
		insize *= 2;
	}
	list.prev = null;
	haxe_MainLoop.pending = list;
};
haxe_MainLoop.tick = function() {
	haxe_MainLoop.sortEvents();
	var e = haxe_MainLoop.pending;
	var now = HxOverrides.now() / 1000;
	var wait = 1e9;
	while(e != null) {
		var next = e.next;
		var wt = e.nextRun - now;
		if(wt <= 0) {
			wait = 0;
			if(e.f != null) {
				e.f();
			}
		} else if(wait > wt) {
			wait = wt;
		}
		e = next;
	}
	return wait;
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = "haxe.Timer";
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	unwrap: function() {
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
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
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
haxe_io_Bytes.prototype = {
	blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	,getFloat: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat32(pos,true);
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
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
haxe_io_Encoding.__empty_constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_crypto_Base64 = function() { };
haxe_crypto_Base64.__name__ = "haxe.crypto.Base64";
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) {
		complement = true;
	}
	if(complement) {
		while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	}
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
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
haxe_crypto_BaseCode.__name__ = "haxe.crypto.BaseCode";
haxe_crypto_BaseCode.prototype = {
	initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g = 0;
		var _g1 = this.base.length;
		while(_g < _g1) {
			var i = _g++;
			tbl[this.base.b[i]] = i;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) {
			this.initTable();
		}
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = new haxe_io_Bytes(new ArrayBuffer(size));
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.b[pin++]];
				if(i == -1) {
					throw haxe_Exception.thrown("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255;
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_crypto_Md5 = function() {
};
haxe_crypto_Md5.__name__ = "haxe.crypto.Md5";
haxe_crypto_Md5.encode = function(s) {
	var m = new haxe_crypto_Md5();
	var h = m.doEncode(haxe_crypto_Md5.str2blks(s));
	return m.hex(h);
};
haxe_crypto_Md5.str2blks = function(str) {
	var str1 = haxe_io_Bytes.ofString(str);
	var nblk = (str1.length + 8 >> 6) + 1;
	var blks = [];
	var blksSize = nblk * 16;
	var _g = 0;
	var _g1 = blksSize;
	while(_g < _g1) {
		var i = _g++;
		blks[i] = 0;
	}
	var i = 0;
	var max = str1.length;
	var l = max * 8;
	while(i < max) {
		blks[i >> 2] |= str1.b[i] << (l + i) % 4 * 8;
		++i;
	}
	blks[i >> 2] |= 128 << (l + i) % 4 * 8;
	var k = nblk * 16 - 2;
	blks[k] = l & 255;
	blks[k] |= (l >>> 8 & 255) << 8;
	blks[k] |= (l >>> 16 & 255) << 16;
	blks[k] |= (l >>> 24 & 255) << 24;
	return blks;
};
haxe_crypto_Md5.prototype = {
	bitOR: function(a,b) {
		var lsb = a & 1 | b & 1;
		var msb31 = a >>> 1 | b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitXOR: function(a,b) {
		var lsb = a & 1 ^ b & 1;
		var msb31 = a >>> 1 ^ b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitAND: function(a,b) {
		var lsb = a & 1 & (b & 1);
		var msb31 = a >>> 1 & b >>> 1;
		return msb31 << 1 | lsb;
	}
	,addme: function(x,y) {
		var lsw = (x & 65535) + (y & 65535);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | lsw & 65535;
	}
	,hex: function(a) {
		var str = "";
		var hex_chr = "0123456789abcdef";
		var _g = 0;
		while(_g < a.length) {
			var num = a[_g];
			++_g;
			str += hex_chr.charAt(num >> 4 & 15) + hex_chr.charAt(num & 15);
			str += hex_chr.charAt(num >> 12 & 15) + hex_chr.charAt(num >> 8 & 15);
			str += hex_chr.charAt(num >> 20 & 15) + hex_chr.charAt(num >> 16 & 15);
			str += hex_chr.charAt(num >> 28 & 15) + hex_chr.charAt(num >> 24 & 15);
		}
		return str;
	}
	,rol: function(num,cnt) {
		return num << cnt | num >>> 32 - cnt;
	}
	,cmn: function(q,a,b,x,s,t) {
		return this.addme(this.rol(this.addme(this.addme(a,q),this.addme(x,t)),s),b);
	}
	,ff: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,c),this.bitAND(~b,d)),a,b,x,s,t);
	}
	,gg: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,d),this.bitAND(c,~d)),a,b,x,s,t);
	}
	,hh: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(this.bitXOR(b,c),d),a,b,x,s,t);
	}
	,ii: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(c,this.bitOR(b,~d)),a,b,x,s,t);
	}
	,doEncode: function(x) {
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var step;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			step = 0;
			a = this.ff(a,b,c,d,x[i],7,-680876936);
			d = this.ff(d,a,b,c,x[i + 1],12,-389564586);
			c = this.ff(c,d,a,b,x[i + 2],17,606105819);
			b = this.ff(b,c,d,a,x[i + 3],22,-1044525330);
			a = this.ff(a,b,c,d,x[i + 4],7,-176418897);
			d = this.ff(d,a,b,c,x[i + 5],12,1200080426);
			c = this.ff(c,d,a,b,x[i + 6],17,-1473231341);
			b = this.ff(b,c,d,a,x[i + 7],22,-45705983);
			a = this.ff(a,b,c,d,x[i + 8],7,1770035416);
			d = this.ff(d,a,b,c,x[i + 9],12,-1958414417);
			c = this.ff(c,d,a,b,x[i + 10],17,-42063);
			b = this.ff(b,c,d,a,x[i + 11],22,-1990404162);
			a = this.ff(a,b,c,d,x[i + 12],7,1804603682);
			d = this.ff(d,a,b,c,x[i + 13],12,-40341101);
			c = this.ff(c,d,a,b,x[i + 14],17,-1502002290);
			b = this.ff(b,c,d,a,x[i + 15],22,1236535329);
			a = this.gg(a,b,c,d,x[i + 1],5,-165796510);
			d = this.gg(d,a,b,c,x[i + 6],9,-1069501632);
			c = this.gg(c,d,a,b,x[i + 11],14,643717713);
			b = this.gg(b,c,d,a,x[i],20,-373897302);
			a = this.gg(a,b,c,d,x[i + 5],5,-701558691);
			d = this.gg(d,a,b,c,x[i + 10],9,38016083);
			c = this.gg(c,d,a,b,x[i + 15],14,-660478335);
			b = this.gg(b,c,d,a,x[i + 4],20,-405537848);
			a = this.gg(a,b,c,d,x[i + 9],5,568446438);
			d = this.gg(d,a,b,c,x[i + 14],9,-1019803690);
			c = this.gg(c,d,a,b,x[i + 3],14,-187363961);
			b = this.gg(b,c,d,a,x[i + 8],20,1163531501);
			a = this.gg(a,b,c,d,x[i + 13],5,-1444681467);
			d = this.gg(d,a,b,c,x[i + 2],9,-51403784);
			c = this.gg(c,d,a,b,x[i + 7],14,1735328473);
			b = this.gg(b,c,d,a,x[i + 12],20,-1926607734);
			a = this.hh(a,b,c,d,x[i + 5],4,-378558);
			d = this.hh(d,a,b,c,x[i + 8],11,-2022574463);
			c = this.hh(c,d,a,b,x[i + 11],16,1839030562);
			b = this.hh(b,c,d,a,x[i + 14],23,-35309556);
			a = this.hh(a,b,c,d,x[i + 1],4,-1530992060);
			d = this.hh(d,a,b,c,x[i + 4],11,1272893353);
			c = this.hh(c,d,a,b,x[i + 7],16,-155497632);
			b = this.hh(b,c,d,a,x[i + 10],23,-1094730640);
			a = this.hh(a,b,c,d,x[i + 13],4,681279174);
			d = this.hh(d,a,b,c,x[i],11,-358537222);
			c = this.hh(c,d,a,b,x[i + 3],16,-722521979);
			b = this.hh(b,c,d,a,x[i + 6],23,76029189);
			a = this.hh(a,b,c,d,x[i + 9],4,-640364487);
			d = this.hh(d,a,b,c,x[i + 12],11,-421815835);
			c = this.hh(c,d,a,b,x[i + 15],16,530742520);
			b = this.hh(b,c,d,a,x[i + 2],23,-995338651);
			a = this.ii(a,b,c,d,x[i],6,-198630844);
			d = this.ii(d,a,b,c,x[i + 7],10,1126891415);
			c = this.ii(c,d,a,b,x[i + 14],15,-1416354905);
			b = this.ii(b,c,d,a,x[i + 5],21,-57434055);
			a = this.ii(a,b,c,d,x[i + 12],6,1700485571);
			d = this.ii(d,a,b,c,x[i + 3],10,-1894986606);
			c = this.ii(c,d,a,b,x[i + 10],15,-1051523);
			b = this.ii(b,c,d,a,x[i + 1],21,-2054922799);
			a = this.ii(a,b,c,d,x[i + 8],6,1873313359);
			d = this.ii(d,a,b,c,x[i + 15],10,-30611744);
			c = this.ii(c,d,a,b,x[i + 6],15,-1560198380);
			b = this.ii(b,c,d,a,x[i + 13],21,1309151649);
			a = this.ii(a,b,c,d,x[i + 4],6,-145523070);
			d = this.ii(d,a,b,c,x[i + 11],10,-1120210379);
			c = this.ii(c,d,a,b,x[i + 2],15,718787259);
			b = this.ii(b,c,d,a,x[i + 9],21,-343485551);
			a = this.addme(a,olda);
			b = this.addme(b,oldb);
			c = this.addme(c,oldc);
			d = this.addme(d,oldd);
			i += 16;
		}
		return [a,b,c,d];
	}
	,__class__: haxe_crypto_Md5
};
var haxe_ds_ArraySort = function() { };
haxe_ds_ArraySort.__name__ = "haxe.ds.ArraySort";
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) {
			return;
		}
		var _g = from + 1;
		var _g1 = to;
		while(_g < _g1) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) {
					haxe_ds_ArraySort.swap(a,j - 1,j);
				} else {
					break;
				}
				--j;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	if(len1 == 0 || len2 == 0) {
		return;
	}
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) {
			haxe_ds_ArraySort.swap(a,pivot,from);
		}
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	var new_mid = first_cut + len22;
	haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	if(from == mid || mid == to) {
		return;
	}
	var n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) {
				p2 += shift;
			} else {
				p2 = from + (shift - (to - p2));
			}
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) {
			len = half;
		} else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else {
			len = half;
		}
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_BalancedTree = function() {
};
haxe_ds_BalancedTree.__name__ = "haxe.ds.BalancedTree";
haxe_ds_BalancedTree.iteratorLoop = function(node,acc) {
	if(node != null) {
		haxe_ds_BalancedTree.iteratorLoop(node.left,acc);
		acc.push(node.value);
		haxe_ds_BalancedTree.iteratorLoop(node.right,acc);
	}
};
haxe_ds_BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) {
				return node.value;
			}
			if(c < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return null;
	}
	,iterator: function() {
		var ret = [];
		haxe_ds_BalancedTree.iteratorLoop(this.root,ret);
		return new haxe_iterators_ArrayIterator(ret);
	}
	,setLoop: function(k,v,node) {
		if(node == null) {
			return new haxe_ds_TreeNode(null,k,v,null);
		}
		var c = this.compare(k,node.key);
		if(c == 0) {
			return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null ? 0 : node._height);
		} else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,balance: function(l,k,v,r) {
		var hl = l == null ? 0 : l._height;
		var hr = r == null ? 0 : r._height;
		if(hl > hr + 2) {
			var _this = l.left;
			var _this1 = l.right;
			if((_this == null ? 0 : _this._height) >= (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r));
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
			}
		} else if(hr > hl + 2) {
			var _this = r.right;
			var _this1 = r.left;
			if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right);
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
			}
		} else {
			return new haxe_ds_TreeNode(l,k,v,r,(hl > hr ? hl : hr) + 1);
		}
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) {
		h = -1;
	}
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) {
		var tmp;
		var _this = this.left;
		var _this1 = this.right;
		if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
			var _this = this.left;
			tmp = _this == null ? 0 : _this._height;
		} else {
			var _this = this.right;
			tmp = _this == null ? 0 : _this._height;
		}
		this._height = tmp + 1;
	} else {
		this._height = h;
	}
};
haxe_ds_TreeNode.__name__ = "haxe.ds.TreeNode";
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
haxe_ds_EnumValueMap.__name__ = "haxe.ds.EnumValueMap";
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1._hx_index - k2._hx_index;
		if(d != 0) {
			return d;
		}
		var p1 = Type.enumParameters(k1);
		var p2 = Type.enumParameters(k2);
		if(p1.length == 0 && p2.length == 0) {
			return 0;
		}
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) {
			return ld;
		}
		var _g = 0;
		var _g1 = a1.length;
		while(_g < _g1) {
			var i = _g++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) {
				return d;
			}
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) {
			return this.compare(v1,v2);
		} else if(((v1) instanceof Array) && ((v2) instanceof Array)) {
			return this.compareArgs(v1,v2);
		} else {
			return Reflect.compare(v1,v2);
		}
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = "haxe.ds.IntMap";
haxe_ds_IntMap.prototype = {
	remove: function(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
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
haxe_ds_List.__name__ = "haxe.ds.List";
haxe_ds_List.prototype = {
	add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = new haxe_ds__$List_ListNode(item,this.h);
		this.h = x;
		if(this.q == null) {
			this.q = x;
		}
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l.item == v) {
				if(prev == null) {
					this.h = l.next;
				} else {
					prev.next = l.next;
				}
				if(this.q == l) {
					this.q = prev;
				}
				this.length--;
				return true;
			}
			prev = l;
			l = l.next;
		}
		return false;
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
haxe_ds__$List_ListNode.__name__ = "haxe.ds._List.ListNode";
haxe_ds__$List_ListNode.prototype = {
	__class__: haxe_ds__$List_ListNode
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
haxe_ds_ObjectMap.__name__ = "haxe.ds.ObjectMap";
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) {
			return false;
		}
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return new haxe_iterators_ArrayIterator(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.prototype = {
	__class__: haxe_ds_StringMap
};
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
};
haxe_exceptions_PosException.__name__ = "haxe.exceptions.PosException";
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	toString: function() {
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
haxe_exceptions_NotImplementedException.__name__ = "haxe.exceptions.NotImplementedException";
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
	__class__: haxe_exceptions_NotImplementedException
});
var haxe_io_Input = function() { };
haxe_io_Input.__name__ = "haxe.io.Input";
haxe_io_Input.prototype = {
	readByte: function() {
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
	,readDouble: function() {
		var i1 = this.readInt32();
		var i2 = this.readInt32();
		if(this.bigEndian) {
			return haxe_io_FPHelper.i64ToDouble(i2,i1);
		} else {
			return haxe_io_FPHelper.i64ToDouble(i1,i2);
		}
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		if(this.bigEndian) {
			return ch2 | ch1 << 8;
		} else {
			return ch1 | ch2 << 8;
		}
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
haxe_io_BytesInput.__name__ = "haxe.io.BytesInput";
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	readByte: function() {
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
var haxe_io_Eof = function() {
};
haxe_io_Eof.__name__ = "haxe.io.Eof";
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
haxe_io_Error.__empty_constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds];
var haxe_io_FPHelper = function() { };
haxe_io_FPHelper.__name__ = "haxe.io.FPHelper";
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	haxe_io_FPHelper.helper.setInt32(0,low,true);
	haxe_io_FPHelper.helper.setInt32(4,high,true);
	return haxe_io_FPHelper.helper.getFloat64(0,true);
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_macro_Binop = $hxEnums["haxe.macro.Binop"] = { __ename__:true,__constructs__:null
	,OpAdd: {_hx_name:"OpAdd",_hx_index:0,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpMult: {_hx_name:"OpMult",_hx_index:1,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpDiv: {_hx_name:"OpDiv",_hx_index:2,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpSub: {_hx_name:"OpSub",_hx_index:3,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpAssign: {_hx_name:"OpAssign",_hx_index:4,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpEq: {_hx_name:"OpEq",_hx_index:5,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpNotEq: {_hx_name:"OpNotEq",_hx_index:6,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpGt: {_hx_name:"OpGt",_hx_index:7,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpGte: {_hx_name:"OpGte",_hx_index:8,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpLt: {_hx_name:"OpLt",_hx_index:9,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpLte: {_hx_name:"OpLte",_hx_index:10,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpAnd: {_hx_name:"OpAnd",_hx_index:11,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpOr: {_hx_name:"OpOr",_hx_index:12,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpXor: {_hx_name:"OpXor",_hx_index:13,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpBoolAnd: {_hx_name:"OpBoolAnd",_hx_index:14,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpBoolOr: {_hx_name:"OpBoolOr",_hx_index:15,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpShl: {_hx_name:"OpShl",_hx_index:16,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpShr: {_hx_name:"OpShr",_hx_index:17,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpUShr: {_hx_name:"OpUShr",_hx_index:18,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpMod: {_hx_name:"OpMod",_hx_index:19,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpAssignOp: ($_=function(op) { return {_hx_index:20,op:op,__enum__:"haxe.macro.Binop",toString:$estr}; },$_._hx_name="OpAssignOp",$_.__params__ = ["op"],$_)
	,OpInterval: {_hx_name:"OpInterval",_hx_index:21,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpArrow: {_hx_name:"OpArrow",_hx_index:22,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpIn: {_hx_name:"OpIn",_hx_index:23,__enum__:"haxe.macro.Binop",toString:$estr}
};
haxe_macro_Binop.__constructs__ = [haxe_macro_Binop.OpAdd,haxe_macro_Binop.OpMult,haxe_macro_Binop.OpDiv,haxe_macro_Binop.OpSub,haxe_macro_Binop.OpAssign,haxe_macro_Binop.OpEq,haxe_macro_Binop.OpNotEq,haxe_macro_Binop.OpGt,haxe_macro_Binop.OpGte,haxe_macro_Binop.OpLt,haxe_macro_Binop.OpLte,haxe_macro_Binop.OpAnd,haxe_macro_Binop.OpOr,haxe_macro_Binop.OpXor,haxe_macro_Binop.OpBoolAnd,haxe_macro_Binop.OpBoolOr,haxe_macro_Binop.OpShl,haxe_macro_Binop.OpShr,haxe_macro_Binop.OpUShr,haxe_macro_Binop.OpMod,haxe_macro_Binop.OpAssignOp,haxe_macro_Binop.OpInterval,haxe_macro_Binop.OpArrow,haxe_macro_Binop.OpIn];
haxe_macro_Binop.__empty_constructs__ = [haxe_macro_Binop.OpAdd,haxe_macro_Binop.OpMult,haxe_macro_Binop.OpDiv,haxe_macro_Binop.OpSub,haxe_macro_Binop.OpAssign,haxe_macro_Binop.OpEq,haxe_macro_Binop.OpNotEq,haxe_macro_Binop.OpGt,haxe_macro_Binop.OpGte,haxe_macro_Binop.OpLt,haxe_macro_Binop.OpLte,haxe_macro_Binop.OpAnd,haxe_macro_Binop.OpOr,haxe_macro_Binop.OpXor,haxe_macro_Binop.OpBoolAnd,haxe_macro_Binop.OpBoolOr,haxe_macro_Binop.OpShl,haxe_macro_Binop.OpShr,haxe_macro_Binop.OpUShr,haxe_macro_Binop.OpMod,haxe_macro_Binop.OpInterval,haxe_macro_Binop.OpArrow,haxe_macro_Binop.OpIn];
var haxe_macro_Unop = $hxEnums["haxe.macro.Unop"] = { __ename__:true,__constructs__:null
	,OpIncrement: {_hx_name:"OpIncrement",_hx_index:0,__enum__:"haxe.macro.Unop",toString:$estr}
	,OpDecrement: {_hx_name:"OpDecrement",_hx_index:1,__enum__:"haxe.macro.Unop",toString:$estr}
	,OpNot: {_hx_name:"OpNot",_hx_index:2,__enum__:"haxe.macro.Unop",toString:$estr}
	,OpNeg: {_hx_name:"OpNeg",_hx_index:3,__enum__:"haxe.macro.Unop",toString:$estr}
	,OpNegBits: {_hx_name:"OpNegBits",_hx_index:4,__enum__:"haxe.macro.Unop",toString:$estr}
	,OpSpread: {_hx_name:"OpSpread",_hx_index:5,__enum__:"haxe.macro.Unop",toString:$estr}
};
haxe_macro_Unop.__constructs__ = [haxe_macro_Unop.OpIncrement,haxe_macro_Unop.OpDecrement,haxe_macro_Unop.OpNot,haxe_macro_Unop.OpNeg,haxe_macro_Unop.OpNegBits,haxe_macro_Unop.OpSpread];
haxe_macro_Unop.__empty_constructs__ = [haxe_macro_Unop.OpIncrement,haxe_macro_Unop.OpDecrement,haxe_macro_Unop.OpNot,haxe_macro_Unop.OpNeg,haxe_macro_Unop.OpNegBits,haxe_macro_Unop.OpSpread];
var haxe_rtti_Meta = function() { };
haxe_rtti_Meta.__name__ = "haxe.rtti.Meta";
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.obj == null) {
		return { };
	} else {
		return meta.obj;
	}
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
var hxd_BitmapData = function(width,height) {
	if(!(width == -101 && height == -102)) {
		var canvas = window.document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		this.ctx = canvas.getContext("2d",null);
	}
};
hxd_BitmapData.__name__ = "hxd.BitmapData";
hxd_BitmapData.prototype = {
	__class__: hxd_BitmapData
};
var hxd_Cursor = $hxEnums["hxd.Cursor"] = { __ename__:true,__constructs__:null
	,Default: {_hx_name:"Default",_hx_index:0,__enum__:"hxd.Cursor",toString:$estr}
	,Button: {_hx_name:"Button",_hx_index:1,__enum__:"hxd.Cursor",toString:$estr}
	,Move: {_hx_name:"Move",_hx_index:2,__enum__:"hxd.Cursor",toString:$estr}
	,TextInput: {_hx_name:"TextInput",_hx_index:3,__enum__:"hxd.Cursor",toString:$estr}
	,Hide: {_hx_name:"Hide",_hx_index:4,__enum__:"hxd.Cursor",toString:$estr}
	,Custom: ($_=function(custom) { return {_hx_index:5,custom:custom,__enum__:"hxd.Cursor",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["custom"],$_)
	,Callback: ($_=function(f) { return {_hx_index:6,f:f,__enum__:"hxd.Cursor",toString:$estr}; },$_._hx_name="Callback",$_.__params__ = ["f"],$_)
};
hxd_Cursor.__constructs__ = [hxd_Cursor.Default,hxd_Cursor.Button,hxd_Cursor.Move,hxd_Cursor.TextInput,hxd_Cursor.Hide,hxd_Cursor.Custom,hxd_Cursor.Callback];
hxd_Cursor.__empty_constructs__ = [hxd_Cursor.Default,hxd_Cursor.Button,hxd_Cursor.Move,hxd_Cursor.TextInput,hxd_Cursor.Hide];
var hxd_CustomCursor = function(frames,speed,offsetX,offsetY) {
	this.frames = frames;
	this.speed = speed;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.frameDelay = 1 / speed;
	this.frameTime = 0;
	this.frameIndex = 0;
};
hxd_CustomCursor.__name__ = "hxd.CustomCursor";
hxd_CustomCursor.prototype = {
	reset: function() {
		this.frameTime = 0;
		this.frameIndex = 0;
	}
	,update: function(dt) {
		var newTime = this.frameTime + dt;
		var delay = this.frameDelay;
		var index = this.frameIndex;
		while(newTime >= delay) {
			newTime -= delay;
			++index;
		}
		this.frameTime = newTime;
		if(index >= this.frames.length) {
			index %= this.frames.length;
		}
		if(index != this.frameIndex) {
			this.frameIndex = index;
			return index;
		}
		return -1;
	}
	,__class__: hxd_CustomCursor
};
var hxd_EventKind = $hxEnums["hxd.EventKind"] = { __ename__:true,__constructs__:null
	,EPush: {_hx_name:"EPush",_hx_index:0,__enum__:"hxd.EventKind",toString:$estr}
	,ERelease: {_hx_name:"ERelease",_hx_index:1,__enum__:"hxd.EventKind",toString:$estr}
	,EMove: {_hx_name:"EMove",_hx_index:2,__enum__:"hxd.EventKind",toString:$estr}
	,EOver: {_hx_name:"EOver",_hx_index:3,__enum__:"hxd.EventKind",toString:$estr}
	,EOut: {_hx_name:"EOut",_hx_index:4,__enum__:"hxd.EventKind",toString:$estr}
	,EWheel: {_hx_name:"EWheel",_hx_index:5,__enum__:"hxd.EventKind",toString:$estr}
	,EFocus: {_hx_name:"EFocus",_hx_index:6,__enum__:"hxd.EventKind",toString:$estr}
	,EFocusLost: {_hx_name:"EFocusLost",_hx_index:7,__enum__:"hxd.EventKind",toString:$estr}
	,EKeyDown: {_hx_name:"EKeyDown",_hx_index:8,__enum__:"hxd.EventKind",toString:$estr}
	,EKeyUp: {_hx_name:"EKeyUp",_hx_index:9,__enum__:"hxd.EventKind",toString:$estr}
	,EReleaseOutside: {_hx_name:"EReleaseOutside",_hx_index:10,__enum__:"hxd.EventKind",toString:$estr}
	,ETextInput: {_hx_name:"ETextInput",_hx_index:11,__enum__:"hxd.EventKind",toString:$estr}
	,ECheck: {_hx_name:"ECheck",_hx_index:12,__enum__:"hxd.EventKind",toString:$estr}
};
hxd_EventKind.__constructs__ = [hxd_EventKind.EPush,hxd_EventKind.ERelease,hxd_EventKind.EMove,hxd_EventKind.EOver,hxd_EventKind.EOut,hxd_EventKind.EWheel,hxd_EventKind.EFocus,hxd_EventKind.EFocusLost,hxd_EventKind.EKeyDown,hxd_EventKind.EKeyUp,hxd_EventKind.EReleaseOutside,hxd_EventKind.ETextInput,hxd_EventKind.ECheck];
hxd_EventKind.__empty_constructs__ = [hxd_EventKind.EPush,hxd_EventKind.ERelease,hxd_EventKind.EMove,hxd_EventKind.EOver,hxd_EventKind.EOut,hxd_EventKind.EWheel,hxd_EventKind.EFocus,hxd_EventKind.EFocusLost,hxd_EventKind.EKeyDown,hxd_EventKind.EKeyUp,hxd_EventKind.EReleaseOutside,hxd_EventKind.ETextInput,hxd_EventKind.ECheck];
var hxd_Event = function(k,x,y) {
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	this.button = 0;
	this.kind = k;
	this.relX = x;
	this.relY = y;
};
hxd_Event.__name__ = "hxd.Event";
hxd_Event.prototype = {
	__class__: hxd_Event
};
var hxd__$FloatBuffer_Float32Expand = {};
hxd__$FloatBuffer_Float32Expand._new = function(length) {
	var this1 = { pos : length, array : new Float32Array(new ArrayBuffer(length << 2))};
	return this1;
};
var hxd_Key = function() { };
hxd_Key.__name__ = "hxd.Key";
hxd_Key.initialize = function() {
	if(hxd_Key.initDone) {
		hxd_Key.dispose();
	}
	hxd_Key.initDone = true;
	hxd_Key.keyPressed = [];
	hxd_Window.getInstance().addEventTarget(hxd_Key.onEvent);
};
hxd_Key.dispose = function() {
	if(hxd_Key.initDone) {
		hxd_Window.getInstance().removeEventTarget(hxd_Key.onEvent);
		hxd_Key.initDone = false;
		hxd_Key.keyPressed = [];
	}
};
hxd_Key.onEvent = function(e) {
	switch(e.kind._hx_index) {
	case 0:
		if(e.button < 5) {
			hxd_Key.keyPressed[e.button] = hxd_Timer.frameCount + 1;
		}
		break;
	case 1:
		if(e.button < 5) {
			hxd_Key.keyPressed[e.button] = -(hxd_Timer.frameCount + 1);
		}
		break;
	case 5:
		hxd_Key.keyPressed[e.wheelDelta > 0 ? 6 : 5] = hxd_Timer.frameCount + 1;
		break;
	case 8:
		if(!hxd_Key.ALLOW_KEY_REPEAT && hxd_Key.keyPressed[e.keyCode] > 0) {
			return;
		}
		hxd_Key.keyPressed[e.keyCode] = hxd_Timer.frameCount + 1;
		break;
	case 9:
		hxd_Key.keyPressed[e.keyCode] = -(hxd_Timer.frameCount + 1);
		break;
	default:
	}
};
var hxd_Flags = $hxEnums["hxd.Flags"] = { __ename__:true,__constructs__:null
	,ReadOnly: {_hx_name:"ReadOnly",_hx_index:0,__enum__:"hxd.Flags",toString:$estr}
	,AlphaPremultiplied: {_hx_name:"AlphaPremultiplied",_hx_index:1,__enum__:"hxd.Flags",toString:$estr}
	,FlipY: {_hx_name:"FlipY",_hx_index:2,__enum__:"hxd.Flags",toString:$estr}
};
hxd_Flags.__constructs__ = [hxd_Flags.ReadOnly,hxd_Flags.AlphaPremultiplied,hxd_Flags.FlipY];
hxd_Flags.__empty_constructs__ = [hxd_Flags.ReadOnly,hxd_Flags.AlphaPremultiplied,hxd_Flags.FlipY];
var hxd_Pixels = function(width,height,bytes,format,offset) {
	if(offset == null) {
		offset = 0;
	}
	this.width = width;
	this.height = height;
	this.bytes = bytes;
	this.set_innerFormat(format);
	this.offset = offset;
	var i = 0;
	if(i == null) {
		i = 0;
	}
	var this1 = i;
	this.flags = this1;
};
hxd_Pixels.__name__ = "hxd.Pixels";
hxd_Pixels.calcDataSize = function(width,height,format) {
	if(format._hx_index == 21) {
		var _g = format.v;
		return (height + 3 >> 2 << 2) * hxd_Pixels.calcStride(width,format);
	} else {
		return height * hxd_Pixels.calcStride(width,format);
	}
};
hxd_Pixels.calcStride = function(width,format) {
	var tmp;
	switch(format._hx_index) {
	case 3:case 20:
		tmp = 8;
		break;
	case 4:
		tmp = 16;
		break;
	case 5:
		tmp = 1;
		break;
	case 7:
		tmp = 4;
		break;
	case 8:
		tmp = 2;
		break;
	case 9:
		tmp = 4;
		break;
	case 10:
		tmp = 8;
		break;
	case 11:
		tmp = 3;
		break;
	case 12:case 19:
		tmp = 6;
		break;
	case 13:
		tmp = 12;
		break;
	case 0:case 1:case 2:case 14:case 15:
		tmp = 4;
		break;
	case 16:
		tmp = 4;
		break;
	case 17:
		tmp = 4;
		break;
	case 6:case 18:
		tmp = 2;
		break;
	case 21:
		var n = format.v;
		var blocks = width + 3 >> 2;
		if(n == 1 || n == 4) {
			return blocks << 1;
		}
		return blocks << 2;
	}
	return width * tmp;
};
hxd_Pixels.alloc = function(width,height,format) {
	return new hxd_Pixels(width,height,new haxe_io_Bytes(new ArrayBuffer(hxd_Pixels.calcDataSize(width,height,format))),format);
};
hxd_Pixels.prototype = {
	set_innerFormat: function(fmt) {
		this.innerFormat = fmt;
		this.stride = hxd_Pixels.calcStride(this.width,fmt);
		this.dataSize = hxd_Pixels.calcDataSize(this.width,this.height,fmt);
		this.bytesPerPixel = hxd_Pixels.calcStride(1,fmt);
		return fmt;
	}
	,invalidFormat: function() {
		throw haxe_Exception.thrown("Unsupported format for this operation : " + Std.string(this.innerFormat));
	}
	,copyInner: function() {
		var old = this.bytes;
		this.bytes = new haxe_io_Bytes(new ArrayBuffer(this.dataSize));
		this.bytes.blit(0,old,this.offset,this.dataSize);
		this.offset = 0;
		this.flags &= -1 - (1 << hxd_Flags.ReadOnly._hx_index);
	}
	,setFlip: function(b) {
		if(b == null) {
			b = false;
		}
		if((this.flags & 1 << hxd_Flags.FlipY._hx_index) != 0 == b) {
			return;
		}
		if((this.flags & 1 << hxd_Flags.ReadOnly._hx_index) != 0) {
			this.copyInner();
		}
		if(b) {
			this.flags |= 1 << hxd_Flags.FlipY._hx_index;
		} else {
			this.flags &= -1 - (1 << hxd_Flags.FlipY._hx_index);
		}
		if(this.stride % 4 != 0) {
			this.invalidFormat();
		}
		var _g = 0;
		var _g1 = this.height >> 1;
		while(_g < _g1) {
			var y = _g++;
			var p1 = y * this.stride + this.offset;
			var p2 = (this.height - 1 - y) * this.stride + this.offset;
			var _g2 = 0;
			var _g3 = this.stride >> 2;
			while(_g2 < _g3) {
				var x = _g2++;
				var a = this.bytes.getInt32(p1);
				var b = this.bytes.getInt32(p2);
				this.bytes.setInt32(p1,b);
				this.bytes.setInt32(p2,a);
				p1 += 4;
				p2 += 4;
			}
		}
	}
	,convert: function(target) {
		if(this.innerFormat == target || Type.enumEq(this.innerFormat,target)) {
			return;
		}
		if((this.flags & 1 << hxd_Flags.ReadOnly._hx_index) != 0) {
			this.copyInner();
		}
		var this1 = this.bytes.b;
		var bytes = this1;
		var _g = this.innerFormat;
		switch(_g._hx_index) {
		case 0:
			switch(target._hx_index) {
			case 1:
				var _g1 = 0;
				var _g2 = this.width * this.height;
				while(_g1 < _g2) {
					var i = _g1++;
					var p = (i << 2) + this.offset;
					var a = bytes[p];
					var r = bytes[p + 1];
					var g = bytes[p + 2];
					var b = bytes[p + 3];
					bytes[p++] = b;
					bytes[p++] = g;
					bytes[p++] = r;
					bytes[p] = a;
				}
				break;
			case 2:
				var _g1 = 0;
				var _g2 = this.width * this.height;
				while(_g1 < _g2) {
					var i = _g1++;
					var p = (i << 2) + this.offset;
					var a = bytes[p];
					var v = bytes[p + 1];
					bytes[p] = v;
					var v1 = bytes[p + 2];
					bytes[p + 1] = v1;
					var v2 = bytes[p + 3];
					bytes[p + 2] = v2;
					bytes[p + 3] = a;
				}
				break;
			default:
				throw haxe_Exception.thrown("Cannot convert from " + Std.string(this.innerFormat) + " to " + Std.string(target));
			}
			break;
		case 1:
			switch(target._hx_index) {
			case 0:
				var _g1 = 0;
				var _g2 = this.width * this.height;
				while(_g1 < _g2) {
					var i = _g1++;
					var p = (i << 2) + this.offset;
					var a = bytes[p];
					var r = bytes[p + 1];
					var g = bytes[p + 2];
					var b = bytes[p + 3];
					bytes[p++] = b;
					bytes[p++] = g;
					bytes[p++] = r;
					bytes[p] = a;
				}
				break;
			case 2:
				var _g1 = 0;
				var _g2 = this.width * this.height;
				while(_g1 < _g2) {
					var i = _g1++;
					var p = (i << 2) + this.offset;
					var b = bytes[p];
					var r = bytes[p + 2];
					bytes[p] = r;
					bytes[p + 2] = b;
				}
				break;
			default:
				throw haxe_Exception.thrown("Cannot convert from " + Std.string(this.innerFormat) + " to " + Std.string(target));
			}
			break;
		case 2:
			switch(target._hx_index) {
			case 0:
				var _g1 = 0;
				var _g2 = this.width * this.height;
				while(_g1 < _g2) {
					var i = _g1++;
					var p = (i << 2) + this.offset;
					var a = bytes[p + 3];
					var v = bytes[p + 2];
					bytes[p + 3] = v;
					var v1 = bytes[p + 1];
					bytes[p + 2] = v1;
					var v2 = bytes[p];
					bytes[p + 1] = v2;
					bytes[p] = a;
				}
				break;
			case 1:
				var _g1 = 0;
				var _g2 = this.width * this.height;
				while(_g1 < _g2) {
					var i = _g1++;
					var p = (i << 2) + this.offset;
					var b = bytes[p];
					var r = bytes[p + 2];
					bytes[p] = r;
					bytes[p + 2] = b;
				}
				break;
			case 5:
				var nbytes = new haxe_io_Bytes(new ArrayBuffer(this.width * this.height));
				var this1 = nbytes.b;
				var out = this1;
				var _g1 = 0;
				var _g2 = this.width * this.height;
				while(_g1 < _g2) {
					var i = _g1++;
					var v = bytes[i << 2];
					out[i] = v;
				}
				this.bytes = nbytes;
				break;
			default:
				throw haxe_Exception.thrown("Cannot convert from " + Std.string(this.innerFormat) + " to " + Std.string(target));
			}
			break;
		case 4:
			if(target._hx_index == 7) {
				var nbytes = new haxe_io_Bytes(new ArrayBuffer(this.height * this.width * 4));
				var this1 = nbytes.b;
				var out = this1;
				var _g1 = 0;
				var _g2 = this.width * this.height;
				while(_g1 < _g2) {
					var i = _g1++;
					nbytes.setFloat(i << 2,this.bytes.getFloat(i << 4));
				}
				this.bytes = nbytes;
			} else {
				throw haxe_Exception.thrown("Cannot convert from " + Std.string(this.innerFormat) + " to " + Std.string(target));
			}
			break;
		case 7:
			switch(target._hx_index) {
			case 1:case 2:
				var fbytes = this.bytes;
				var p = 0;
				var _g1 = 0;
				var _g2 = this.width * this.height;
				while(_g1 < _g2) {
					var i = _g1++;
					var v = fbytes.getFloat(p) * 255 | 0;
					if(v < 0) {
						v = 0;
					} else if(v > 255) {
						v = 255;
					}
					bytes[p++] = v;
					bytes[p++] = v;
					bytes[p++] = v;
					bytes[p++] = 255;
				}
				break;
			default:
				throw haxe_Exception.thrown("Cannot convert from " + Std.string(this.innerFormat) + " to " + Std.string(target));
			}
			break;
		case 18:
			if(target._hx_index == 7) {
				var nbytes = new haxe_io_Bytes(new ArrayBuffer(this.width * this.height * 4));
				var fbytes = this.bytes;
				var _g1 = 0;
				var _g2 = this.width * this.height;
				while(_g1 < _g2) {
					var i = _g1++;
					var nv = fbytes.getUInt16(i << 1);
					nbytes.setFloat(i << 2,nv / 65535.0);
				}
				this.bytes = nbytes;
			} else {
				throw haxe_Exception.thrown("Cannot convert from " + Std.string(this.innerFormat) + " to " + Std.string(target));
			}
			break;
		case 21:
			if(target._hx_index == 21) {
				var b = target.v;
				var a = _g.v;
				if(a != b) {
					throw haxe_Exception.thrown("Cannot convert from " + Std.string(this.innerFormat) + " to " + Std.string(target));
				}
			} else {
				throw haxe_Exception.thrown("Cannot convert from " + Std.string(this.innerFormat) + " to " + Std.string(target));
			}
			break;
		default:
			throw haxe_Exception.thrown("Cannot convert from " + Std.string(this.innerFormat) + " to " + Std.string(target));
		}
		this.set_innerFormat(target);
	}
	,dispose: function() {
		this.bytes = null;
	}
	,toString: function() {
		return "Pixels(" + this.width + "x" + this.height + " " + Std.string(this.innerFormat) + ")";
	}
	,__class__: hxd_Pixels
};
var hxd_SceneEvents = function($window) {
	this.defaultCursor = hxd_Cursor.Default;
	this.mouseCheckMove = true;
	this.enablePhysicalMouse = true;
	this.isOut = false;
	this.onOver = new hxd_Event(hxd_EventKind.EOver);
	this.onOut = new hxd_Event(hxd_EventKind.EOut);
	this.checkPos = new hxd_Event(hxd_EventKind.ECheck);
	this.focusLost = new hxd_Event(hxd_EventKind.EFocusLost);
	this.lastTouch = 0;
	this.mouseY = -1.;
	this.mouseX = -1.;
	this.overIndex = -1;
	this.scenes = [];
	this.pendingEvents = [];
	this.pushList = [];
	this.overList = [];
	this.overCandidates = [];
	if($window == null) {
		$window = hxd_Window.getInstance();
	}
	this.window = $window;
	$window.addEventTarget($bind(this,this.onEvent));
};
hxd_SceneEvents.__name__ = "hxd.SceneEvents";
hxd_SceneEvents.prototype = {
	onRemove: function(i) {
		if(i == this.currentFocus) {
			this.currentFocus = null;
		}
		if(this.overIndex >= 0) {
			var index = this.overList.indexOf(i);
			if(index >= 0) {
				HxOverrides.remove(this.overList,i);
				if(index < this.overIndex) {
					this.overIndex--;
				}
			}
		} else {
			HxOverrides.remove(this.overList,i);
			this.selectCursor();
		}
		HxOverrides.remove(this.pushList,i);
	}
	,addScene: function(s,index) {
		s.setEvents(this);
		if(index == null) {
			this.scenes.push(s);
		} else {
			this.scenes.splice(index,0,s);
		}
	}
	,blur: function() {
		if(this.currentFocus == null) {
			return;
		}
		this.focusLost.cancel = false;
		this.currentFocus.handleEvent(this.focusLost);
		if(!this.focusLost.cancel) {
			this.currentFocus = null;
		}
	}
	,checkFocus: function() {
		if(this.currentFocus == null) {
			return;
		}
		var s = this.currentFocus.getInteractiveScene();
		if(s == null) {
			this.currentFocus = null;
			return;
		}
		if(!s.isInteractiveVisible(this.currentFocus)) {
			this.blur();
		}
	}
	,emitEvent: function(event) {
		var oldX = event.relX;
		var oldY = event.relY;
		var overCandidateCount = 0;
		var handled = false;
		var checkOver = false;
		var fillOver = false;
		var checkPush = false;
		var cancelFocus = false;
		var updateCursor = false;
		this.overIndex = 0;
		switch(event.kind._hx_index) {
		case 0:
			cancelFocus = true;
			checkPush = true;
			break;
		case 1:
			checkPush = true;
			break;
		case 2:case 12:
			checkOver = true;
			fillOver = true;
			break;
		case 5:case 8:case 9:case 11:
			if(this.currentFocus != null) {
				event.relX = event.relY = 0;
				this.currentFocus.handleEvent(event);
				event.relX = oldX;
				event.relY = oldY;
				if(!event.propagate) {
					return;
				}
			}
			break;
		default:
		}
		var _g = 0;
		var _g1 = this.scenes;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			var last = null;
			while(true) {
				var i = s.handleEvent(event,last);
				if(i == null) {
					event.relX = oldX;
					event.relY = oldY;
					break;
				}
				if(checkOver) {
					if(fillOver) {
						var idx = this.overList.indexOf(i);
						if(idx == -1) {
							if(this.overCandidates.length == overCandidateCount) {
								this.overCandidates[overCandidateCount] = { i : i, s : s, x : event.relX, y : event.relY, z : event.relZ};
							} else {
								var info = this.overCandidates[overCandidateCount];
								info.i = i;
								info.s = s;
								info.x = event.relX;
								info.y = event.relY;
								info.z = event.relZ;
							}
							++overCandidateCount;
							this.overList.splice(this.overIndex++,0,i);
							updateCursor = true;
						} else {
							if(idx < this.overIndex) {
								while(true) {
									this.overList[idx] = this.overList[idx + 1];
									++idx;
									if(!(idx < this.overIndex)) {
										break;
									}
								}
								this.overList[this.overIndex] = i;
								updateCursor = true;
							} else if(idx > this.overIndex) {
								while(true) {
									this.overList[idx] = this.overList[idx - 1];
									--idx;
									if(!(idx > this.overIndex)) {
										break;
									}
								}
								this.overList[this.overIndex] = i;
								updateCursor = true;
							}
							this.overIndex++;
						}
						fillOver = event.propagate;
					}
				} else {
					if(checkPush) {
						if(event.kind == hxd_EventKind.EPush) {
							this.pushList.push(i);
						} else {
							HxOverrides.remove(this.pushList,i);
						}
					}
					if(cancelFocus && i == this.currentFocus) {
						cancelFocus = false;
					}
				}
				event.relX = oldX;
				event.relY = oldY;
				if(!event.propagate) {
					handled = true;
					break;
				}
				last = i;
				event.propagate = false;
			}
			if(handled) {
				break;
			}
		}
		if(cancelFocus && this.currentFocus != null) {
			this.blur();
		}
		if(checkOver) {
			if(this.overIndex < this.overList.length) {
				while(this.overIndex < this.overList.length) {
					var e = this.overList.pop();
					e.handleEvent(this.onOut);
				}
				updateCursor = true;
			}
			if(overCandidateCount != 0) {
				var i = 0;
				var ev = this.onOver;
				while(true) {
					var info = this.overCandidates[i++];
					ev.relX = info.x;
					ev.relY = info.y;
					ev.relZ = info.z;
					if(info.s.isInteractiveVisible(info.i)) {
						info.i.handleEvent(ev);
					} else {
						HxOverrides.remove(this.overList,info.i);
					}
					info.i = null;
					info.s = null;
					if(!(i < overCandidateCount)) {
						break;
					}
				}
			}
		}
		this.overIndex = -1;
		if(updateCursor) {
			this.selectCursor();
		}
		if(!handled && event != this.checkPos) {
			if(event.kind == hxd_EventKind.EPush) {
				this.pushList.push(null);
			} else if(event.kind == hxd_EventKind.ERelease) {
				HxOverrides.remove(this.pushList,null);
			}
			this.dispatchListeners(event);
		}
		if(event.kind == hxd_EventKind.ERelease && this.pushList.length > 0) {
			var _g = 0;
			var _g1 = this.pushList;
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(i == null) {
					event.kind = hxd_EventKind.EReleaseOutside;
					this.dispatchListeners(event);
					event.kind = hxd_EventKind.ERelease;
				} else {
					var s = i.getInteractiveScene();
					if(s == null) {
						continue;
					}
					event.kind = hxd_EventKind.EReleaseOutside;
					s.dispatchEvent(event,i);
					event.kind = hxd_EventKind.ERelease;
					event.relX = oldX;
					event.relY = oldY;
				}
			}
			this.pushList = [];
		}
	}
	,checkEvents: function() {
		var old = this.pendingEvents;
		var checkMoved = !this.mouseCheckMove;
		var checkFocused = this.currentFocus == null;
		if(old.length > 0) {
			this.pendingEvents = [];
			var _g = 0;
			while(_g < old.length) {
				var e = old[_g];
				++_g;
				var ox = e.relX;
				var oy = e.relY;
				switch(e.kind._hx_index) {
				case 0:case 1:
					this.mouseX = e.relX;
					this.mouseY = e.relY;
					this.lastTouch = e.touchId;
					break;
				case 2:
					checkMoved = true;
					this.mouseX = e.relX;
					this.mouseY = e.relY;
					this.lastTouch = e.touchId;
					break;
				case 3:
					this.isOut = false;
					this.selectCursor();
					continue;
				case 4:
					this.isOut = true;
					if(this.overList.length > 0) {
						var i = this.overList.length - 1;
						while(i >= 0) {
							this.onOut.cancel = false;
							this.overList[i].handleEvent(this.onOut);
							HxOverrides.remove(this.overList,this.overList[i]);
							--i;
						}
						this.selectCursor();
					}
					continue;
				case 5:case 8:case 9:case 11:
					if(!checkFocused) {
						checkFocused = true;
						this.checkFocus();
					}
					break;
				default:
				}
				if(this.currentDrag != null && (this.currentDrag.ref == null || this.currentDrag.ref == e.touchId)) {
					e.propagate = true;
					e.cancel = false;
					this.currentDrag.f(e);
					e.relX = ox;
					e.relY = oy;
					if(!e.propagate) {
						continue;
					}
				}
				this.emitEvent(e);
			}
		}
		if(!checkFocused) {
			this.checkFocus();
		}
		if(!checkMoved && !this.isOut && this.currentDrag == null) {
			this.checkPos.relX = this.mouseX;
			this.checkPos.relY = this.mouseY;
			this.checkPos.touchId = this.lastTouch;
			this.checkPos.cancel = false;
			this.checkPos.propagate = false;
			this.emitEvent(this.checkPos);
		}
	}
	,updateCursor: function(i) {
		if(this.overList.indexOf(i) != -1) {
			this.selectCursor();
		}
	}
	,selectCursor: function() {
		var cur = this.defaultCursor;
		var _g = 0;
		var _g1 = this.overList;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			if(o.cursor != null) {
				cur = o.cursor;
				break;
			}
		}
		if(cur._hx_index == 6) {
			var f = cur.f;
			f();
		} else {
			hxd_System.setCursor(cur);
		}
	}
	,onEvent: function(e) {
		if(!this.enablePhysicalMouse && e.kind == hxd_EventKind.EMove) {
			return;
		}
		this.pendingEvents.push(e);
	}
	,dispatchListeners: function(event) {
		var ox = event.relX;
		var oy = event.relY;
		event.propagate = true;
		var _g = 0;
		var _g1 = this.scenes;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			event.cancel = false;
			s.dispatchListeners(event);
			event.relX = ox;
			event.relY = oy;
			if(!event.propagate) {
				break;
			}
		}
	}
	,__class__: hxd_SceneEvents
};
var hxd_Platform = $hxEnums["hxd.Platform"] = { __ename__:true,__constructs__:null
	,IOS: {_hx_name:"IOS",_hx_index:0,__enum__:"hxd.Platform",toString:$estr}
	,Android: {_hx_name:"Android",_hx_index:1,__enum__:"hxd.Platform",toString:$estr}
	,WebGL: {_hx_name:"WebGL",_hx_index:2,__enum__:"hxd.Platform",toString:$estr}
	,PC: {_hx_name:"PC",_hx_index:3,__enum__:"hxd.Platform",toString:$estr}
	,Console: {_hx_name:"Console",_hx_index:4,__enum__:"hxd.Platform",toString:$estr}
	,FlashPlayer: {_hx_name:"FlashPlayer",_hx_index:5,__enum__:"hxd.Platform",toString:$estr}
};
hxd_Platform.__constructs__ = [hxd_Platform.IOS,hxd_Platform.Android,hxd_Platform.WebGL,hxd_Platform.PC,hxd_Platform.Console,hxd_Platform.FlashPlayer];
hxd_Platform.__empty_constructs__ = [hxd_Platform.IOS,hxd_Platform.Android,hxd_Platform.WebGL,hxd_Platform.PC,hxd_Platform.Console,hxd_Platform.FlashPlayer];
var hxd_SystemValue = $hxEnums["hxd.SystemValue"] = { __ename__:true,__constructs__:null
	,IsTouch: {_hx_name:"IsTouch",_hx_index:0,__enum__:"hxd.SystemValue",toString:$estr}
	,IsWindowed: {_hx_name:"IsWindowed",_hx_index:1,__enum__:"hxd.SystemValue",toString:$estr}
	,IsMobile: {_hx_name:"IsMobile",_hx_index:2,__enum__:"hxd.SystemValue",toString:$estr}
};
hxd_SystemValue.__constructs__ = [hxd_SystemValue.IsTouch,hxd_SystemValue.IsWindowed,hxd_SystemValue.IsMobile];
hxd_SystemValue.__empty_constructs__ = [hxd_SystemValue.IsTouch,hxd_SystemValue.IsWindowed,hxd_SystemValue.IsMobile];
var hxd_Timer = function() { };
hxd_Timer.__name__ = "hxd.Timer";
hxd_Timer.update = function() {
	hxd_Timer.frameCount++;
	var newTime = HxOverrides.now() / 1000;
	hxd_Timer.elapsedTime = newTime - hxd_Timer.lastTimeStamp;
	hxd_Timer.lastTimeStamp = newTime;
	if(hxd_Timer.elapsedTime < hxd_Timer.maxDeltaTime) {
		var a = hxd_Timer.elapsedTime;
		hxd_Timer.currentDT = a + hxd_Timer.smoothFactor * (hxd_Timer.currentDT - a);
	} else {
		hxd_Timer.elapsedTime = 1 / hxd_Timer.wantedFPS;
	}
	hxd_Timer.dt = hxd_Timer.currentDT;
};
hxd_Timer.skip = function() {
	hxd_Timer.lastTimeStamp = HxOverrides.now() / 1000;
};
var hxd_Window = function(canvas,globalEvents) {
	this.useScreenPixels = true;
	this.curMouseY = 0.;
	this.curMouseX = 0.;
	var _gthis = this;
	var customCanvas = canvas != null;
	this.eventTargets = new haxe_ds_List();
	this.resizeEvents = new haxe_ds_List();
	if(canvas == null) {
		canvas = window.document.getElementById("webgl");
		if(canvas == null) {
			throw haxe_Exception.thrown("Missing canvas #webgl");
		}
		if(canvas.getAttribute("globalEvents") == "1") {
			globalEvents = true;
		}
	}
	this.canvas = canvas;
	this.propagateKeyEvents = globalEvents;
	var propagate = canvas.getAttribute("propagateKeyEvents");
	if(propagate != null) {
		this.propagateKeyEvents = propagate != "0" && propagate != "false";
	}
	this.focused = globalEvents;
	this.element = globalEvents ? window : canvas;
	this.canvasPos = canvas.getBoundingClientRect();
	if(customCanvas) {
		canvas.addEventListener("mousemove",$bind(this,this.onMouseMove));
	} else {
		window.addEventListener("mousemove",$bind(this,this.onMouseMove));
	}
	this.element.addEventListener("mousedown",$bind(this,this.onMouseDown));
	this.element.addEventListener("mouseup",$bind(this,this.onMouseUp));
	this.element.addEventListener("wheel",$bind(this,this.onMouseWheel));
	this.element.addEventListener("touchstart",$bind(this,this.onTouchStart));
	this.element.addEventListener("touchmove",$bind(this,this.onTouchMove));
	this.element.addEventListener("touchend",$bind(this,this.onTouchEnd));
	this.element.addEventListener("keydown",$bind(this,this.onKeyDown));
	this.element.addEventListener("keyup",$bind(this,this.onKeyUp));
	this.element.addEventListener("keypress",$bind(this,this.onKeyPress));
	var _g = $bind(this,this.onFocus);
	var b = false;
	var tmp = function() {
		_g(b);
	};
	this.element.addEventListener("blur",tmp);
	var _g1 = $bind(this,this.onFocus);
	var b1 = true;
	var tmp = function() {
		_g1(b1);
	};
	this.element.addEventListener("focus",tmp);
	canvas.oncontextmenu = function(e) {
		e.stopPropagation();
		e.preventDefault();
		return false;
	};
	if(globalEvents) {
		canvas.addEventListener("mousedown",function(e) {
			_gthis.onMouseDown(e);
			e.stopPropagation();
			e.preventDefault();
		});
		this.element.addEventListener("contextmenu",function(e) {
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
	} else {
		if(canvas.getAttribute("tabindex") == null) {
			canvas.setAttribute("tabindex","1");
		}
		canvas.style.outline = "none";
	}
	this.curW = this.get_width();
	this.curH = this.get_height();
	this.timer = new haxe_Timer(100);
	this.timer.run = $bind(this,this.checkResize);
};
hxd_Window.__name__ = "hxd.Window";
hxd_Window.getInstance = function() {
	if(hxd_Window.inst == null) {
		hxd_Window.inst = new hxd_Window();
	}
	return hxd_Window.inst;
};
hxd_Window.prototype = {
	checkResize: function() {
		this.canvasPos = this.canvas.getBoundingClientRect();
		var cw = this.get_width();
		var ch = this.get_height();
		if(this.curW != cw || this.curH != ch) {
			this.curW = cw;
			this.curH = ch;
			this.onResize(null);
		}
	}
	,event: function(e) {
		var _g_head = this.eventTargets.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var et = val;
			et(e);
		}
	}
	,addEventTarget: function(et) {
		this.eventTargets.add(et);
	}
	,removeEventTarget: function(et) {
		var _g_head = this.eventTargets.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var e = val;
			if(Reflect.compareMethods(e,et)) {
				this.eventTargets.remove(e);
				break;
			}
		}
	}
	,addResizeEvent: function(f) {
		this.resizeEvents.push(f);
	}
	,removeResizeEvent: function(f) {
		var _g_head = this.resizeEvents.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var e = val;
			if(Reflect.compareMethods(e,f)) {
				this.resizeEvents.remove(f);
				break;
			}
		}
	}
	,onResize: function(e) {
		var _g_head = this.resizeEvents.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var r = val;
			r();
		}
	}
	,getPixelRatio: function() {
		if(this.useScreenPixels) {
			return window.devicePixelRatio;
		} else {
			return 1;
		}
	}
	,get_width: function() {
		return Math.round(this.canvasPos.width * this.getPixelRatio());
	}
	,get_height: function() {
		return Math.round(this.canvasPos.height * this.getPixelRatio());
	}
	,get_mouseX: function() {
		return Math.round((this.curMouseX - this.canvasPos.left) * this.getPixelRatio());
	}
	,get_mouseY: function() {
		return Math.round((this.curMouseY - this.canvasPos.top) * this.getPixelRatio());
	}
	,onMouseDown: function(e) {
		if(e.clientX != this.curMouseX || e.clientY != this.curMouseY) {
			this.onMouseMove(e);
		}
		var ev = new hxd_Event(hxd_EventKind.EPush,this.get_mouseX(),this.get_mouseY());
		var _g = e.button;
		var tmp;
		switch(_g) {
		case 1:
			tmp = 2;
			break;
		case 2:
			tmp = 1;
			break;
		default:
			var x = _g;
			tmp = x;
		}
		ev.button = tmp;
		this.event(ev);
	}
	,onMouseUp: function(e) {
		if(e.clientX != this.curMouseX || e.clientY != this.curMouseY) {
			this.onMouseMove(e);
		}
		var ev = new hxd_Event(hxd_EventKind.ERelease,this.get_mouseX(),this.get_mouseY());
		var _g = e.button;
		var tmp;
		switch(_g) {
		case 1:
			tmp = 2;
			break;
		case 2:
			tmp = 1;
			break;
		default:
			var x = _g;
			tmp = x;
		}
		ev.button = tmp;
		this.event(ev);
	}
	,onMouseMove: function(e) {
		this.curMouseX = e.clientX;
		this.curMouseY = e.clientY;
		this.event(new hxd_Event(hxd_EventKind.EMove,this.get_mouseX(),this.get_mouseY()));
	}
	,onMouseWheel: function(e) {
		e.preventDefault();
		var ev = new hxd_Event(hxd_EventKind.EWheel,this.get_mouseX(),this.get_mouseY());
		ev.wheelDelta = e.deltaY / 120;
		this.event(ev);
	}
	,onTouchStart: function(e) {
		e.preventDefault();
		var x;
		var y;
		var ev;
		var _g = 0;
		var _g1 = e.changedTouches;
		while(_g < _g1.length) {
			var touch = _g1[_g];
			++_g;
			x = Math.round((touch.clientX - this.canvasPos.left) * this.getPixelRatio());
			y = Math.round((touch.clientY - this.canvasPos.top) * this.getPixelRatio());
			ev = new hxd_Event(hxd_EventKind.EPush,x,y);
			ev.touchId = touch.identifier;
			this.event(ev);
		}
	}
	,onTouchMove: function(e) {
		e.preventDefault();
		var x;
		var y;
		var ev;
		var _g = 0;
		var _g1 = e.changedTouches;
		while(_g < _g1.length) {
			var touch = _g1[_g];
			++_g;
			x = Math.round((touch.clientX - this.canvasPos.left) * this.getPixelRatio());
			y = Math.round((touch.clientY - this.canvasPos.top) * this.getPixelRatio());
			ev = new hxd_Event(hxd_EventKind.EMove,x,y);
			ev.touchId = touch.identifier;
			this.event(ev);
		}
	}
	,onTouchEnd: function(e) {
		e.preventDefault();
		var x;
		var y;
		var ev;
		var _g = 0;
		var _g1 = e.changedTouches;
		while(_g < _g1.length) {
			var touch = _g1[_g];
			++_g;
			x = Math.round((touch.clientX - this.canvasPos.left) * this.getPixelRatio());
			y = Math.round((touch.clientY - this.canvasPos.top) * this.getPixelRatio());
			ev = new hxd_Event(hxd_EventKind.ERelease,x,y);
			ev.touchId = touch.identifier;
			this.event(ev);
		}
	}
	,onKeyUp: function(e) {
		var ev = new hxd_Event(hxd_EventKind.EKeyUp,this.get_mouseX(),this.get_mouseY());
		ev.keyCode = e.keyCode;
		this.event(ev);
		if(!this.propagateKeyEvents) {
			e.preventDefault();
			e.stopPropagation();
		}
	}
	,onKeyDown: function(e) {
		var ev = new hxd_Event(hxd_EventKind.EKeyDown,this.get_mouseX(),this.get_mouseY());
		ev.keyCode = e.keyCode;
		this.event(ev);
		if(!this.propagateKeyEvents) {
			switch(ev.keyCode) {
			case 8:case 9:case 16:case 17:case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:
				e.preventDefault();
				break;
			default:
			}
			e.stopPropagation();
		}
	}
	,onKeyPress: function(e) {
		var ev = new hxd_Event(hxd_EventKind.ETextInput,this.get_mouseX(),this.get_mouseY());
		ev.charCode = e.charCode;
		this.event(ev);
		if(!this.propagateKeyEvents) {
			e.preventDefault();
			e.stopPropagation();
		}
	}
	,onFocus: function(b) {
		this.event(new hxd_Event(b ? hxd_EventKind.EFocus : hxd_EventKind.EFocusLost));
		this.focused = b;
	}
	,set_displayMode: function(m) {
		var doc = window.document;
		var elt = doc.documentElement;
		var fullscreen = m != hxd_DisplayMode.Windowed;
		if(doc.fullscreenElement == elt == fullscreen) {
			return hxd_DisplayMode.Windowed;
		}
		if(m != hxd_DisplayMode.Windowed) {
			elt.requestFullscreen();
		} else {
			doc.exitFullscreen();
		}
		return m;
	}
	,__class__: hxd_Window
};
var hxd_System = function() { };
hxd_System.__name__ = "hxd.System";
hxd_System.setLoop = function(f) {
	if(!hxd_System.loopInit) {
		hxd_System.loopInit = true;
		hxd_System.browserLoop();
	}
	hxd_System.loopFunc = f;
};
hxd_System.browserLoop = function() {
	var $window = window;
	var rqf = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame;
	if(hxd_System.fpsLimit > 0) {
		window.setTimeout(function() {
			return rqf(hxd_System.browserLoop);
		},1000 / hxd_System.fpsLimit);
	} else {
		rqf(hxd_System.browserLoop);
	}
	if(hxd_System.loopFunc != null) {
		hxd_System.loopFunc();
	}
};
hxd_System.start = function(callb) {
	callb();
};
hxd_System.setNativeCursor = function(c) {
	if(hxd_System.currentNativeCursor != null && Type.enumEq(c,hxd_System.currentNativeCursor)) {
		return;
	}
	hxd_System.currentNativeCursor = c;
	hxd_System.currentCustomCursor = null;
	var canvas = hxd_Window.getInstance().canvas;
	if(canvas != null) {
		var tmp;
		switch(c._hx_index) {
		case 0:
			tmp = "default";
			break;
		case 1:
			tmp = "pointer";
			break;
		case 2:
			tmp = "move";
			break;
		case 3:
			tmp = "text";
			break;
		case 4:
			tmp = "none";
			break;
		case 5:
			var cur = c.custom;
			if(cur.alloc == null) {
				cur.alloc = [];
				var _g = 0;
				var _g1 = cur.frames;
				while(_g < _g1.length) {
					var frame = _g1[_g];
					++_g;
					cur.alloc.push("url(\"" + frame.ctx.canvas.toDataURL("image/png") + "\") " + cur.offsetX + " " + cur.offsetY + ", default");
				}
			}
			if(cur.frames.length > 1) {
				hxd_System.currentCustomCursor = cur;
				cur.reset();
			}
			tmp = cur.alloc[cur.frameIndex];
			break;
		case 6:
			var _g = c.f;
			throw haxe_Exception.thrown("assert");
		}
		canvas.style.cursor = tmp;
	}
};
hxd_System.getDefaultFrameRate = function() {
	return 60.;
};
hxd_System.getValue = function(s) {
	switch(s._hx_index) {
	case 0:
		if(hxd_System.get_platform() != hxd_Platform.Android) {
			return hxd_System.get_platform() == hxd_Platform.IOS;
		} else {
			return true;
		}
		break;
	case 1:
		return true;
	case 2:
		if(hxd_System.get_platform() != hxd_Platform.Android) {
			return hxd_System.get_platform() == hxd_Platform.IOS;
		} else {
			return true;
		}
		break;
	}
};
hxd_System.updateCursor = function() {
	if(hxd_System.currentCustomCursor != null) {
		var change = hxd_System.currentCustomCursor.update(hxd_Timer.elapsedTime);
		if(change != -1) {
			var canvas = hxd_Window.getInstance().canvas;
			if(canvas != null) {
				canvas.style.cursor = hxd_System.currentCustomCursor.alloc[change];
			}
		}
	}
};
hxd_System.get_platform = function() {
	var ua = $global.navigator.userAgent.toLowerCase();
	if(ua.indexOf("android") >= 0) {
		return hxd_Platform.Android;
	} else if(ua.indexOf("ipad") >= 0 || ua.indexOf("iphone") >= 0 || ua.indexOf("ipod") >= 0) {
		return hxd_Platform.IOS;
	} else {
		return hxd_Platform.PC;
	}
};
var hxd_DisplayMode = $hxEnums["hxd.DisplayMode"] = { __ename__:true,__constructs__:null
	,Windowed: {_hx_name:"Windowed",_hx_index:0,__enum__:"hxd.DisplayMode",toString:$estr}
	,Borderless: {_hx_name:"Borderless",_hx_index:1,__enum__:"hxd.DisplayMode",toString:$estr}
	,Fullscreen: {_hx_name:"Fullscreen",_hx_index:2,__enum__:"hxd.DisplayMode",toString:$estr}
	,FullscreenResize: {_hx_name:"FullscreenResize",_hx_index:3,__enum__:"hxd.DisplayMode",toString:$estr}
};
hxd_DisplayMode.__constructs__ = [hxd_DisplayMode.Windowed,hxd_DisplayMode.Borderless,hxd_DisplayMode.Fullscreen,hxd_DisplayMode.FullscreenResize];
hxd_DisplayMode.__empty_constructs__ = [hxd_DisplayMode.Windowed,hxd_DisplayMode.Borderless,hxd_DisplayMode.Fullscreen,hxd_DisplayMode.FullscreenResize];
var hxd_fs_NotFound = function(path) {
	this.path = path;
};
hxd_fs_NotFound.__name__ = "hxd.fs.NotFound";
hxd_fs_NotFound.prototype = {
	toString: function() {
		return "Resource file not found '" + this.path + "'";
	}
	,__class__: hxd_fs_NotFound
};
var hxd_impl_Allocator = function() {
};
hxd_impl_Allocator.__name__ = "hxd.impl.Allocator";
hxd_impl_Allocator.get = function() {
	if(hxd_impl_Allocator.inst == null) {
		hxd_impl_Allocator.inst = new hxd_impl_Allocator();
	}
	return hxd_impl_Allocator.inst;
};
hxd_impl_Allocator.prototype = {
	onContextLost: function() {
	}
	,__class__: hxd_impl_Allocator
};
var hxsl_Type = $hxEnums["hxsl.Type"] = { __ename__:true,__constructs__:null
	,TVoid: {_hx_name:"TVoid",_hx_index:0,__enum__:"hxsl.Type",toString:$estr}
	,TInt: {_hx_name:"TInt",_hx_index:1,__enum__:"hxsl.Type",toString:$estr}
	,TBool: {_hx_name:"TBool",_hx_index:2,__enum__:"hxsl.Type",toString:$estr}
	,TFloat: {_hx_name:"TFloat",_hx_index:3,__enum__:"hxsl.Type",toString:$estr}
	,TString: {_hx_name:"TString",_hx_index:4,__enum__:"hxsl.Type",toString:$estr}
	,TVec: ($_=function(size,t) { return {_hx_index:5,size:size,t:t,__enum__:"hxsl.Type",toString:$estr}; },$_._hx_name="TVec",$_.__params__ = ["size","t"],$_)
	,TMat3: {_hx_name:"TMat3",_hx_index:6,__enum__:"hxsl.Type",toString:$estr}
	,TMat4: {_hx_name:"TMat4",_hx_index:7,__enum__:"hxsl.Type",toString:$estr}
	,TMat3x4: {_hx_name:"TMat3x4",_hx_index:8,__enum__:"hxsl.Type",toString:$estr}
	,TBytes: ($_=function(size) { return {_hx_index:9,size:size,__enum__:"hxsl.Type",toString:$estr}; },$_._hx_name="TBytes",$_.__params__ = ["size"],$_)
	,TSampler2D: {_hx_name:"TSampler2D",_hx_index:10,__enum__:"hxsl.Type",toString:$estr}
	,TSampler2DArray: {_hx_name:"TSampler2DArray",_hx_index:11,__enum__:"hxsl.Type",toString:$estr}
	,TSamplerCube: {_hx_name:"TSamplerCube",_hx_index:12,__enum__:"hxsl.Type",toString:$estr}
	,TStruct: ($_=function(vl) { return {_hx_index:13,vl:vl,__enum__:"hxsl.Type",toString:$estr}; },$_._hx_name="TStruct",$_.__params__ = ["vl"],$_)
	,TFun: ($_=function(variants) { return {_hx_index:14,variants:variants,__enum__:"hxsl.Type",toString:$estr}; },$_._hx_name="TFun",$_.__params__ = ["variants"],$_)
	,TArray: ($_=function(t,size) { return {_hx_index:15,t:t,size:size,__enum__:"hxsl.Type",toString:$estr}; },$_._hx_name="TArray",$_.__params__ = ["t","size"],$_)
	,TBuffer: ($_=function(t,size) { return {_hx_index:16,t:t,size:size,__enum__:"hxsl.Type",toString:$estr}; },$_._hx_name="TBuffer",$_.__params__ = ["t","size"],$_)
	,TChannel: ($_=function(size) { return {_hx_index:17,size:size,__enum__:"hxsl.Type",toString:$estr}; },$_._hx_name="TChannel",$_.__params__ = ["size"],$_)
	,TMat2: {_hx_name:"TMat2",_hx_index:18,__enum__:"hxsl.Type",toString:$estr}
};
hxsl_Type.__constructs__ = [hxsl_Type.TVoid,hxsl_Type.TInt,hxsl_Type.TBool,hxsl_Type.TFloat,hxsl_Type.TString,hxsl_Type.TVec,hxsl_Type.TMat3,hxsl_Type.TMat4,hxsl_Type.TMat3x4,hxsl_Type.TBytes,hxsl_Type.TSampler2D,hxsl_Type.TSampler2DArray,hxsl_Type.TSamplerCube,hxsl_Type.TStruct,hxsl_Type.TFun,hxsl_Type.TArray,hxsl_Type.TBuffer,hxsl_Type.TChannel,hxsl_Type.TMat2];
hxsl_Type.__empty_constructs__ = [hxsl_Type.TVoid,hxsl_Type.TInt,hxsl_Type.TBool,hxsl_Type.TFloat,hxsl_Type.TString,hxsl_Type.TMat3,hxsl_Type.TMat4,hxsl_Type.TMat3x4,hxsl_Type.TSampler2D,hxsl_Type.TSampler2DArray,hxsl_Type.TSamplerCube,hxsl_Type.TMat2];
var hxsl_VecType = $hxEnums["hxsl.VecType"] = { __ename__:true,__constructs__:null
	,VInt: {_hx_name:"VInt",_hx_index:0,__enum__:"hxsl.VecType",toString:$estr}
	,VFloat: {_hx_name:"VFloat",_hx_index:1,__enum__:"hxsl.VecType",toString:$estr}
	,VBool: {_hx_name:"VBool",_hx_index:2,__enum__:"hxsl.VecType",toString:$estr}
};
hxsl_VecType.__constructs__ = [hxsl_VecType.VInt,hxsl_VecType.VFloat,hxsl_VecType.VBool];
hxsl_VecType.__empty_constructs__ = [hxsl_VecType.VInt,hxsl_VecType.VFloat,hxsl_VecType.VBool];
var hxsl_SizeDecl = $hxEnums["hxsl.SizeDecl"] = { __ename__:true,__constructs__:null
	,SConst: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"hxsl.SizeDecl",toString:$estr}; },$_._hx_name="SConst",$_.__params__ = ["v"],$_)
	,SVar: ($_=function(v) { return {_hx_index:1,v:v,__enum__:"hxsl.SizeDecl",toString:$estr}; },$_._hx_name="SVar",$_.__params__ = ["v"],$_)
};
hxsl_SizeDecl.__constructs__ = [hxsl_SizeDecl.SConst,hxsl_SizeDecl.SVar];
hxsl_SizeDecl.__empty_constructs__ = [];
var hxsl_Error = function(msg,pos) {
	this.msg = msg;
	this.pos = pos;
};
hxsl_Error.__name__ = "hxsl.Error";
hxsl_Error.t = function(msg,pos) {
	throw haxe_Exception.thrown(new hxsl_Error(msg,pos));
};
hxsl_Error.prototype = {
	toString: function() {
		return "Error(" + this.msg + ")@" + Std.string(this.pos);
	}
	,__class__: hxsl_Error
};
var hxsl_VarKind = $hxEnums["hxsl.VarKind"] = { __ename__:true,__constructs__:null
	,Global: {_hx_name:"Global",_hx_index:0,__enum__:"hxsl.VarKind",toString:$estr}
	,Input: {_hx_name:"Input",_hx_index:1,__enum__:"hxsl.VarKind",toString:$estr}
	,Param: {_hx_name:"Param",_hx_index:2,__enum__:"hxsl.VarKind",toString:$estr}
	,Var: {_hx_name:"Var",_hx_index:3,__enum__:"hxsl.VarKind",toString:$estr}
	,Local: {_hx_name:"Local",_hx_index:4,__enum__:"hxsl.VarKind",toString:$estr}
	,Output: {_hx_name:"Output",_hx_index:5,__enum__:"hxsl.VarKind",toString:$estr}
	,Function: {_hx_name:"Function",_hx_index:6,__enum__:"hxsl.VarKind",toString:$estr}
};
hxsl_VarKind.__constructs__ = [hxsl_VarKind.Global,hxsl_VarKind.Input,hxsl_VarKind.Param,hxsl_VarKind.Var,hxsl_VarKind.Local,hxsl_VarKind.Output,hxsl_VarKind.Function];
hxsl_VarKind.__empty_constructs__ = [hxsl_VarKind.Global,hxsl_VarKind.Input,hxsl_VarKind.Param,hxsl_VarKind.Var,hxsl_VarKind.Local,hxsl_VarKind.Output,hxsl_VarKind.Function];
var hxsl_VarQualifier = $hxEnums["hxsl.VarQualifier"] = { __ename__:true,__constructs__:null
	,Const: ($_=function(max) { return {_hx_index:0,max:max,__enum__:"hxsl.VarQualifier",toString:$estr}; },$_._hx_name="Const",$_.__params__ = ["max"],$_)
	,Private: {_hx_name:"Private",_hx_index:1,__enum__:"hxsl.VarQualifier",toString:$estr}
	,Nullable: {_hx_name:"Nullable",_hx_index:2,__enum__:"hxsl.VarQualifier",toString:$estr}
	,PerObject: {_hx_name:"PerObject",_hx_index:3,__enum__:"hxsl.VarQualifier",toString:$estr}
	,Name: ($_=function(n) { return {_hx_index:4,n:n,__enum__:"hxsl.VarQualifier",toString:$estr}; },$_._hx_name="Name",$_.__params__ = ["n"],$_)
	,Shared: {_hx_name:"Shared",_hx_index:5,__enum__:"hxsl.VarQualifier",toString:$estr}
	,Precision: ($_=function(p) { return {_hx_index:6,p:p,__enum__:"hxsl.VarQualifier",toString:$estr}; },$_._hx_name="Precision",$_.__params__ = ["p"],$_)
	,Range: ($_=function(min,max) { return {_hx_index:7,min:min,max:max,__enum__:"hxsl.VarQualifier",toString:$estr}; },$_._hx_name="Range",$_.__params__ = ["min","max"],$_)
	,Ignore: {_hx_name:"Ignore",_hx_index:8,__enum__:"hxsl.VarQualifier",toString:$estr}
	,PerInstance: ($_=function(v) { return {_hx_index:9,v:v,__enum__:"hxsl.VarQualifier",toString:$estr}; },$_._hx_name="PerInstance",$_.__params__ = ["v"],$_)
	,Doc: ($_=function(s) { return {_hx_index:10,s:s,__enum__:"hxsl.VarQualifier",toString:$estr}; },$_._hx_name="Doc",$_.__params__ = ["s"],$_)
	,Borrow: ($_=function(source) { return {_hx_index:11,source:source,__enum__:"hxsl.VarQualifier",toString:$estr}; },$_._hx_name="Borrow",$_.__params__ = ["source"],$_)
	,Sampler: ($_=function(name) { return {_hx_index:12,name:name,__enum__:"hxsl.VarQualifier",toString:$estr}; },$_._hx_name="Sampler",$_.__params__ = ["name"],$_)
};
hxsl_VarQualifier.__constructs__ = [hxsl_VarQualifier.Const,hxsl_VarQualifier.Private,hxsl_VarQualifier.Nullable,hxsl_VarQualifier.PerObject,hxsl_VarQualifier.Name,hxsl_VarQualifier.Shared,hxsl_VarQualifier.Precision,hxsl_VarQualifier.Range,hxsl_VarQualifier.Ignore,hxsl_VarQualifier.PerInstance,hxsl_VarQualifier.Doc,hxsl_VarQualifier.Borrow,hxsl_VarQualifier.Sampler];
hxsl_VarQualifier.__empty_constructs__ = [hxsl_VarQualifier.Private,hxsl_VarQualifier.Nullable,hxsl_VarQualifier.PerObject,hxsl_VarQualifier.Shared,hxsl_VarQualifier.Ignore];
var hxsl_Prec = $hxEnums["hxsl.Prec"] = { __ename__:true,__constructs__:null
	,Low: {_hx_name:"Low",_hx_index:0,__enum__:"hxsl.Prec",toString:$estr}
	,Medium: {_hx_name:"Medium",_hx_index:1,__enum__:"hxsl.Prec",toString:$estr}
	,High: {_hx_name:"High",_hx_index:2,__enum__:"hxsl.Prec",toString:$estr}
};
hxsl_Prec.__constructs__ = [hxsl_Prec.Low,hxsl_Prec.Medium,hxsl_Prec.High];
hxsl_Prec.__empty_constructs__ = [hxsl_Prec.Low,hxsl_Prec.Medium,hxsl_Prec.High];
var hxsl_Const = $hxEnums["hxsl.Const"] = { __ename__:true,__constructs__:null
	,CNull: {_hx_name:"CNull",_hx_index:0,__enum__:"hxsl.Const",toString:$estr}
	,CBool: ($_=function(b) { return {_hx_index:1,b:b,__enum__:"hxsl.Const",toString:$estr}; },$_._hx_name="CBool",$_.__params__ = ["b"],$_)
	,CInt: ($_=function(v) { return {_hx_index:2,v:v,__enum__:"hxsl.Const",toString:$estr}; },$_._hx_name="CInt",$_.__params__ = ["v"],$_)
	,CFloat: ($_=function(v) { return {_hx_index:3,v:v,__enum__:"hxsl.Const",toString:$estr}; },$_._hx_name="CFloat",$_.__params__ = ["v"],$_)
	,CString: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"hxsl.Const",toString:$estr}; },$_._hx_name="CString",$_.__params__ = ["v"],$_)
};
hxsl_Const.__constructs__ = [hxsl_Const.CNull,hxsl_Const.CBool,hxsl_Const.CInt,hxsl_Const.CFloat,hxsl_Const.CString];
hxsl_Const.__empty_constructs__ = [hxsl_Const.CNull];
var hxsl_FunctionKind = $hxEnums["hxsl.FunctionKind"] = { __ename__:true,__constructs__:null
	,Vertex: {_hx_name:"Vertex",_hx_index:0,__enum__:"hxsl.FunctionKind",toString:$estr}
	,Fragment: {_hx_name:"Fragment",_hx_index:1,__enum__:"hxsl.FunctionKind",toString:$estr}
	,Init: {_hx_name:"Init",_hx_index:2,__enum__:"hxsl.FunctionKind",toString:$estr}
	,Helper: {_hx_name:"Helper",_hx_index:3,__enum__:"hxsl.FunctionKind",toString:$estr}
};
hxsl_FunctionKind.__constructs__ = [hxsl_FunctionKind.Vertex,hxsl_FunctionKind.Fragment,hxsl_FunctionKind.Init,hxsl_FunctionKind.Helper];
hxsl_FunctionKind.__empty_constructs__ = [hxsl_FunctionKind.Vertex,hxsl_FunctionKind.Fragment,hxsl_FunctionKind.Init,hxsl_FunctionKind.Helper];
var hxsl_TGlobal = $hxEnums["hxsl.TGlobal"] = { __ename__:true,__constructs__:null
	,Radians: {_hx_name:"Radians",_hx_index:0,__enum__:"hxsl.TGlobal",toString:$estr}
	,Degrees: {_hx_name:"Degrees",_hx_index:1,__enum__:"hxsl.TGlobal",toString:$estr}
	,Sin: {_hx_name:"Sin",_hx_index:2,__enum__:"hxsl.TGlobal",toString:$estr}
	,Cos: {_hx_name:"Cos",_hx_index:3,__enum__:"hxsl.TGlobal",toString:$estr}
	,Tan: {_hx_name:"Tan",_hx_index:4,__enum__:"hxsl.TGlobal",toString:$estr}
	,Asin: {_hx_name:"Asin",_hx_index:5,__enum__:"hxsl.TGlobal",toString:$estr}
	,Acos: {_hx_name:"Acos",_hx_index:6,__enum__:"hxsl.TGlobal",toString:$estr}
	,Atan: {_hx_name:"Atan",_hx_index:7,__enum__:"hxsl.TGlobal",toString:$estr}
	,Pow: {_hx_name:"Pow",_hx_index:8,__enum__:"hxsl.TGlobal",toString:$estr}
	,Exp: {_hx_name:"Exp",_hx_index:9,__enum__:"hxsl.TGlobal",toString:$estr}
	,Log: {_hx_name:"Log",_hx_index:10,__enum__:"hxsl.TGlobal",toString:$estr}
	,Exp2: {_hx_name:"Exp2",_hx_index:11,__enum__:"hxsl.TGlobal",toString:$estr}
	,Log2: {_hx_name:"Log2",_hx_index:12,__enum__:"hxsl.TGlobal",toString:$estr}
	,Sqrt: {_hx_name:"Sqrt",_hx_index:13,__enum__:"hxsl.TGlobal",toString:$estr}
	,Inversesqrt: {_hx_name:"Inversesqrt",_hx_index:14,__enum__:"hxsl.TGlobal",toString:$estr}
	,Abs: {_hx_name:"Abs",_hx_index:15,__enum__:"hxsl.TGlobal",toString:$estr}
	,Sign: {_hx_name:"Sign",_hx_index:16,__enum__:"hxsl.TGlobal",toString:$estr}
	,Floor: {_hx_name:"Floor",_hx_index:17,__enum__:"hxsl.TGlobal",toString:$estr}
	,Ceil: {_hx_name:"Ceil",_hx_index:18,__enum__:"hxsl.TGlobal",toString:$estr}
	,Fract: {_hx_name:"Fract",_hx_index:19,__enum__:"hxsl.TGlobal",toString:$estr}
	,Mod: {_hx_name:"Mod",_hx_index:20,__enum__:"hxsl.TGlobal",toString:$estr}
	,Min: {_hx_name:"Min",_hx_index:21,__enum__:"hxsl.TGlobal",toString:$estr}
	,Max: {_hx_name:"Max",_hx_index:22,__enum__:"hxsl.TGlobal",toString:$estr}
	,Clamp: {_hx_name:"Clamp",_hx_index:23,__enum__:"hxsl.TGlobal",toString:$estr}
	,Mix: {_hx_name:"Mix",_hx_index:24,__enum__:"hxsl.TGlobal",toString:$estr}
	,Step: {_hx_name:"Step",_hx_index:25,__enum__:"hxsl.TGlobal",toString:$estr}
	,Smoothstep: {_hx_name:"Smoothstep",_hx_index:26,__enum__:"hxsl.TGlobal",toString:$estr}
	,Length: {_hx_name:"Length",_hx_index:27,__enum__:"hxsl.TGlobal",toString:$estr}
	,Distance: {_hx_name:"Distance",_hx_index:28,__enum__:"hxsl.TGlobal",toString:$estr}
	,Dot: {_hx_name:"Dot",_hx_index:29,__enum__:"hxsl.TGlobal",toString:$estr}
	,Cross: {_hx_name:"Cross",_hx_index:30,__enum__:"hxsl.TGlobal",toString:$estr}
	,Normalize: {_hx_name:"Normalize",_hx_index:31,__enum__:"hxsl.TGlobal",toString:$estr}
	,LReflect: {_hx_name:"LReflect",_hx_index:32,__enum__:"hxsl.TGlobal",toString:$estr}
	,Texture: {_hx_name:"Texture",_hx_index:33,__enum__:"hxsl.TGlobal",toString:$estr}
	,TextureLod: {_hx_name:"TextureLod",_hx_index:34,__enum__:"hxsl.TGlobal",toString:$estr}
	,Texel: {_hx_name:"Texel",_hx_index:35,__enum__:"hxsl.TGlobal",toString:$estr}
	,TextureSize: {_hx_name:"TextureSize",_hx_index:36,__enum__:"hxsl.TGlobal",toString:$estr}
	,ToInt: {_hx_name:"ToInt",_hx_index:37,__enum__:"hxsl.TGlobal",toString:$estr}
	,ToFloat: {_hx_name:"ToFloat",_hx_index:38,__enum__:"hxsl.TGlobal",toString:$estr}
	,ToBool: {_hx_name:"ToBool",_hx_index:39,__enum__:"hxsl.TGlobal",toString:$estr}
	,Vec2: {_hx_name:"Vec2",_hx_index:40,__enum__:"hxsl.TGlobal",toString:$estr}
	,Vec3: {_hx_name:"Vec3",_hx_index:41,__enum__:"hxsl.TGlobal",toString:$estr}
	,Vec4: {_hx_name:"Vec4",_hx_index:42,__enum__:"hxsl.TGlobal",toString:$estr}
	,IVec2: {_hx_name:"IVec2",_hx_index:43,__enum__:"hxsl.TGlobal",toString:$estr}
	,IVec3: {_hx_name:"IVec3",_hx_index:44,__enum__:"hxsl.TGlobal",toString:$estr}
	,IVec4: {_hx_name:"IVec4",_hx_index:45,__enum__:"hxsl.TGlobal",toString:$estr}
	,BVec2: {_hx_name:"BVec2",_hx_index:46,__enum__:"hxsl.TGlobal",toString:$estr}
	,BVec3: {_hx_name:"BVec3",_hx_index:47,__enum__:"hxsl.TGlobal",toString:$estr}
	,BVec4: {_hx_name:"BVec4",_hx_index:48,__enum__:"hxsl.TGlobal",toString:$estr}
	,Mat2: {_hx_name:"Mat2",_hx_index:49,__enum__:"hxsl.TGlobal",toString:$estr}
	,Mat3: {_hx_name:"Mat3",_hx_index:50,__enum__:"hxsl.TGlobal",toString:$estr}
	,Mat4: {_hx_name:"Mat4",_hx_index:51,__enum__:"hxsl.TGlobal",toString:$estr}
	,Mat3x4: {_hx_name:"Mat3x4",_hx_index:52,__enum__:"hxsl.TGlobal",toString:$estr}
	,Saturate: {_hx_name:"Saturate",_hx_index:53,__enum__:"hxsl.TGlobal",toString:$estr}
	,Pack: {_hx_name:"Pack",_hx_index:54,__enum__:"hxsl.TGlobal",toString:$estr}
	,Unpack: {_hx_name:"Unpack",_hx_index:55,__enum__:"hxsl.TGlobal",toString:$estr}
	,PackNormal: {_hx_name:"PackNormal",_hx_index:56,__enum__:"hxsl.TGlobal",toString:$estr}
	,UnpackNormal: {_hx_name:"UnpackNormal",_hx_index:57,__enum__:"hxsl.TGlobal",toString:$estr}
	,ScreenToUv: {_hx_name:"ScreenToUv",_hx_index:58,__enum__:"hxsl.TGlobal",toString:$estr}
	,UvToScreen: {_hx_name:"UvToScreen",_hx_index:59,__enum__:"hxsl.TGlobal",toString:$estr}
	,DFdx: {_hx_name:"DFdx",_hx_index:60,__enum__:"hxsl.TGlobal",toString:$estr}
	,DFdy: {_hx_name:"DFdy",_hx_index:61,__enum__:"hxsl.TGlobal",toString:$estr}
	,Fwidth: {_hx_name:"Fwidth",_hx_index:62,__enum__:"hxsl.TGlobal",toString:$estr}
	,ChannelRead: {_hx_name:"ChannelRead",_hx_index:63,__enum__:"hxsl.TGlobal",toString:$estr}
	,ChannelReadLod: {_hx_name:"ChannelReadLod",_hx_index:64,__enum__:"hxsl.TGlobal",toString:$estr}
	,ChannelFetch: {_hx_name:"ChannelFetch",_hx_index:65,__enum__:"hxsl.TGlobal",toString:$estr}
	,ChannelTextureSize: {_hx_name:"ChannelTextureSize",_hx_index:66,__enum__:"hxsl.TGlobal",toString:$estr}
	,Trace: {_hx_name:"Trace",_hx_index:67,__enum__:"hxsl.TGlobal",toString:$estr}
	,VertexID: {_hx_name:"VertexID",_hx_index:68,__enum__:"hxsl.TGlobal",toString:$estr}
	,InstanceID: {_hx_name:"InstanceID",_hx_index:69,__enum__:"hxsl.TGlobal",toString:$estr}
	,FragCoord: {_hx_name:"FragCoord",_hx_index:70,__enum__:"hxsl.TGlobal",toString:$estr}
	,FrontFacing: {_hx_name:"FrontFacing",_hx_index:71,__enum__:"hxsl.TGlobal",toString:$estr}
};
hxsl_TGlobal.__constructs__ = [hxsl_TGlobal.Radians,hxsl_TGlobal.Degrees,hxsl_TGlobal.Sin,hxsl_TGlobal.Cos,hxsl_TGlobal.Tan,hxsl_TGlobal.Asin,hxsl_TGlobal.Acos,hxsl_TGlobal.Atan,hxsl_TGlobal.Pow,hxsl_TGlobal.Exp,hxsl_TGlobal.Log,hxsl_TGlobal.Exp2,hxsl_TGlobal.Log2,hxsl_TGlobal.Sqrt,hxsl_TGlobal.Inversesqrt,hxsl_TGlobal.Abs,hxsl_TGlobal.Sign,hxsl_TGlobal.Floor,hxsl_TGlobal.Ceil,hxsl_TGlobal.Fract,hxsl_TGlobal.Mod,hxsl_TGlobal.Min,hxsl_TGlobal.Max,hxsl_TGlobal.Clamp,hxsl_TGlobal.Mix,hxsl_TGlobal.Step,hxsl_TGlobal.Smoothstep,hxsl_TGlobal.Length,hxsl_TGlobal.Distance,hxsl_TGlobal.Dot,hxsl_TGlobal.Cross,hxsl_TGlobal.Normalize,hxsl_TGlobal.LReflect,hxsl_TGlobal.Texture,hxsl_TGlobal.TextureLod,hxsl_TGlobal.Texel,hxsl_TGlobal.TextureSize,hxsl_TGlobal.ToInt,hxsl_TGlobal.ToFloat,hxsl_TGlobal.ToBool,hxsl_TGlobal.Vec2,hxsl_TGlobal.Vec3,hxsl_TGlobal.Vec4,hxsl_TGlobal.IVec2,hxsl_TGlobal.IVec3,hxsl_TGlobal.IVec4,hxsl_TGlobal.BVec2,hxsl_TGlobal.BVec3,hxsl_TGlobal.BVec4,hxsl_TGlobal.Mat2,hxsl_TGlobal.Mat3,hxsl_TGlobal.Mat4,hxsl_TGlobal.Mat3x4,hxsl_TGlobal.Saturate,hxsl_TGlobal.Pack,hxsl_TGlobal.Unpack,hxsl_TGlobal.PackNormal,hxsl_TGlobal.UnpackNormal,hxsl_TGlobal.ScreenToUv,hxsl_TGlobal.UvToScreen,hxsl_TGlobal.DFdx,hxsl_TGlobal.DFdy,hxsl_TGlobal.Fwidth,hxsl_TGlobal.ChannelRead,hxsl_TGlobal.ChannelReadLod,hxsl_TGlobal.ChannelFetch,hxsl_TGlobal.ChannelTextureSize,hxsl_TGlobal.Trace,hxsl_TGlobal.VertexID,hxsl_TGlobal.InstanceID,hxsl_TGlobal.FragCoord,hxsl_TGlobal.FrontFacing];
hxsl_TGlobal.__empty_constructs__ = [hxsl_TGlobal.Radians,hxsl_TGlobal.Degrees,hxsl_TGlobal.Sin,hxsl_TGlobal.Cos,hxsl_TGlobal.Tan,hxsl_TGlobal.Asin,hxsl_TGlobal.Acos,hxsl_TGlobal.Atan,hxsl_TGlobal.Pow,hxsl_TGlobal.Exp,hxsl_TGlobal.Log,hxsl_TGlobal.Exp2,hxsl_TGlobal.Log2,hxsl_TGlobal.Sqrt,hxsl_TGlobal.Inversesqrt,hxsl_TGlobal.Abs,hxsl_TGlobal.Sign,hxsl_TGlobal.Floor,hxsl_TGlobal.Ceil,hxsl_TGlobal.Fract,hxsl_TGlobal.Mod,hxsl_TGlobal.Min,hxsl_TGlobal.Max,hxsl_TGlobal.Clamp,hxsl_TGlobal.Mix,hxsl_TGlobal.Step,hxsl_TGlobal.Smoothstep,hxsl_TGlobal.Length,hxsl_TGlobal.Distance,hxsl_TGlobal.Dot,hxsl_TGlobal.Cross,hxsl_TGlobal.Normalize,hxsl_TGlobal.LReflect,hxsl_TGlobal.Texture,hxsl_TGlobal.TextureLod,hxsl_TGlobal.Texel,hxsl_TGlobal.TextureSize,hxsl_TGlobal.ToInt,hxsl_TGlobal.ToFloat,hxsl_TGlobal.ToBool,hxsl_TGlobal.Vec2,hxsl_TGlobal.Vec3,hxsl_TGlobal.Vec4,hxsl_TGlobal.IVec2,hxsl_TGlobal.IVec3,hxsl_TGlobal.IVec4,hxsl_TGlobal.BVec2,hxsl_TGlobal.BVec3,hxsl_TGlobal.BVec4,hxsl_TGlobal.Mat2,hxsl_TGlobal.Mat3,hxsl_TGlobal.Mat4,hxsl_TGlobal.Mat3x4,hxsl_TGlobal.Saturate,hxsl_TGlobal.Pack,hxsl_TGlobal.Unpack,hxsl_TGlobal.PackNormal,hxsl_TGlobal.UnpackNormal,hxsl_TGlobal.ScreenToUv,hxsl_TGlobal.UvToScreen,hxsl_TGlobal.DFdx,hxsl_TGlobal.DFdy,hxsl_TGlobal.Fwidth,hxsl_TGlobal.ChannelRead,hxsl_TGlobal.ChannelReadLod,hxsl_TGlobal.ChannelFetch,hxsl_TGlobal.ChannelTextureSize,hxsl_TGlobal.Trace,hxsl_TGlobal.VertexID,hxsl_TGlobal.InstanceID,hxsl_TGlobal.FragCoord,hxsl_TGlobal.FrontFacing];
var hxsl_Component = $hxEnums["hxsl.Component"] = { __ename__:true,__constructs__:null
	,X: {_hx_name:"X",_hx_index:0,__enum__:"hxsl.Component",toString:$estr}
	,Y: {_hx_name:"Y",_hx_index:1,__enum__:"hxsl.Component",toString:$estr}
	,Z: {_hx_name:"Z",_hx_index:2,__enum__:"hxsl.Component",toString:$estr}
	,W: {_hx_name:"W",_hx_index:3,__enum__:"hxsl.Component",toString:$estr}
};
hxsl_Component.__constructs__ = [hxsl_Component.X,hxsl_Component.Y,hxsl_Component.Z,hxsl_Component.W];
hxsl_Component.__empty_constructs__ = [hxsl_Component.X,hxsl_Component.Y,hxsl_Component.Z,hxsl_Component.W];
var hxsl_TExprDef = $hxEnums["hxsl.TExprDef"] = { __ename__:true,__constructs__:null
	,TConst: ($_=function(c) { return {_hx_index:0,c:c,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TConst",$_.__params__ = ["c"],$_)
	,TVar: ($_=function(v) { return {_hx_index:1,v:v,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TVar",$_.__params__ = ["v"],$_)
	,TGlobal: ($_=function(g) { return {_hx_index:2,g:g,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TGlobal",$_.__params__ = ["g"],$_)
	,TParenthesis: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TParenthesis",$_.__params__ = ["e"],$_)
	,TBlock: ($_=function(el) { return {_hx_index:4,el:el,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TBlock",$_.__params__ = ["el"],$_)
	,TBinop: ($_=function(op,e1,e2) { return {_hx_index:5,op:op,e1:e1,e2:e2,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TBinop",$_.__params__ = ["op","e1","e2"],$_)
	,TUnop: ($_=function(op,e1) { return {_hx_index:6,op:op,e1:e1,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TUnop",$_.__params__ = ["op","e1"],$_)
	,TVarDecl: ($_=function(v,init) { return {_hx_index:7,v:v,init:init,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TVarDecl",$_.__params__ = ["v","init"],$_)
	,TCall: ($_=function(e,args) { return {_hx_index:8,e:e,args:args,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TCall",$_.__params__ = ["e","args"],$_)
	,TSwiz: ($_=function(e,regs) { return {_hx_index:9,e:e,regs:regs,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TSwiz",$_.__params__ = ["e","regs"],$_)
	,TIf: ($_=function(econd,eif,eelse) { return {_hx_index:10,econd:econd,eif:eif,eelse:eelse,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TIf",$_.__params__ = ["econd","eif","eelse"],$_)
	,TDiscard: {_hx_name:"TDiscard",_hx_index:11,__enum__:"hxsl.TExprDef",toString:$estr}
	,TReturn: ($_=function(e) { return {_hx_index:12,e:e,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TReturn",$_.__params__ = ["e"],$_)
	,TFor: ($_=function(v,it,loop) { return {_hx_index:13,v:v,it:it,loop:loop,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TFor",$_.__params__ = ["v","it","loop"],$_)
	,TContinue: {_hx_name:"TContinue",_hx_index:14,__enum__:"hxsl.TExprDef",toString:$estr}
	,TBreak: {_hx_name:"TBreak",_hx_index:15,__enum__:"hxsl.TExprDef",toString:$estr}
	,TArray: ($_=function(e,index) { return {_hx_index:16,e:e,index:index,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TArray",$_.__params__ = ["e","index"],$_)
	,TArrayDecl: ($_=function(el) { return {_hx_index:17,el:el,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TArrayDecl",$_.__params__ = ["el"],$_)
	,TSwitch: ($_=function(e,cases,def) { return {_hx_index:18,e:e,cases:cases,def:def,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TSwitch",$_.__params__ = ["e","cases","def"],$_)
	,TWhile: ($_=function(e,loop,normalWhile) { return {_hx_index:19,e:e,loop:loop,normalWhile:normalWhile,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TWhile",$_.__params__ = ["e","loop","normalWhile"],$_)
	,TMeta: ($_=function(m,args,e) { return {_hx_index:20,m:m,args:args,e:e,__enum__:"hxsl.TExprDef",toString:$estr}; },$_._hx_name="TMeta",$_.__params__ = ["m","args","e"],$_)
};
hxsl_TExprDef.__constructs__ = [hxsl_TExprDef.TConst,hxsl_TExprDef.TVar,hxsl_TExprDef.TGlobal,hxsl_TExprDef.TParenthesis,hxsl_TExprDef.TBlock,hxsl_TExprDef.TBinop,hxsl_TExprDef.TUnop,hxsl_TExprDef.TVarDecl,hxsl_TExprDef.TCall,hxsl_TExprDef.TSwiz,hxsl_TExprDef.TIf,hxsl_TExprDef.TDiscard,hxsl_TExprDef.TReturn,hxsl_TExprDef.TFor,hxsl_TExprDef.TContinue,hxsl_TExprDef.TBreak,hxsl_TExprDef.TArray,hxsl_TExprDef.TArrayDecl,hxsl_TExprDef.TSwitch,hxsl_TExprDef.TWhile,hxsl_TExprDef.TMeta];
hxsl_TExprDef.__empty_constructs__ = [hxsl_TExprDef.TDiscard,hxsl_TExprDef.TContinue,hxsl_TExprDef.TBreak];
var hxsl_Tools = function() { };
hxsl_Tools.__name__ = "hxsl.Tools";
hxsl_Tools.allocVarId = function() {
	return ++hxsl_Tools.UID;
};
hxsl_Tools.getName = function(v) {
	if(v.qualifiers == null) {
		return v.name;
	}
	var _g = 0;
	var _g1 = v.qualifiers;
	while(_g < _g1.length) {
		var q = _g1[_g];
		++_g;
		if(q._hx_index == 4) {
			var n = q.n;
			return n;
		}
	}
	return v.name;
};
hxsl_Tools.getConstBits = function(v) {
	var _g = v.type;
	switch(_g._hx_index) {
	case 1:
		var _g1 = 0;
		var _g2 = v.qualifiers;
		while(_g1 < _g2.length) {
			var q = _g2[_g1];
			++_g1;
			if(q._hx_index == 0) {
				var n = q.max;
				if(n != null) {
					var bits = 0;
					while(n >= 1 << bits) ++bits;
					return bits;
				}
				return 8;
			}
		}
		break;
	case 2:
		return 1;
	case 17:
		var _g1 = _g.size;
		return 3 + hxsl_Tools.MAX_CHANNELS_BITS;
	default:
	}
	return 0;
};
hxsl_Tools.isConst = function(v) {
	var _g = v.type;
	var tmp;
	if(_g._hx_index == 17) {
		var _g1 = _g.size;
		tmp = true;
	} else {
		tmp = false;
	}
	if(tmp) {
		return true;
	}
	if(v.qualifiers != null) {
		var _g = 0;
		var _g1 = v.qualifiers;
		while(_g < _g1.length) {
			var q = _g1[_g];
			++_g;
			if(q._hx_index == 0) {
				var _g2 = q.max;
				return true;
			}
		}
	}
	return false;
};
hxsl_Tools.hasQualifier = function(v,q) {
	if(v.qualifiers != null) {
		var _g = 0;
		var _g1 = v.qualifiers;
		while(_g < _g1.length) {
			var q2 = _g1[_g];
			++_g;
			if(q2 == q) {
				return true;
			}
		}
	}
	return false;
};
hxsl_Tools.hasBorrowQualifier = function(v,path) {
	if(v.qualifiers != null) {
		var _g = 0;
		var _g1 = v.qualifiers;
		while(_g < _g1.length) {
			var q = _g1[_g];
			++_g;
			if(q._hx_index == 11) {
				var s = q.source;
				return path == s;
			}
		}
	}
	return false;
};
hxsl_Tools.isSampler = function(t) {
	switch(t._hx_index) {
	case 10:case 11:case 12:
		return true;
	case 17:
		var _g = t.size;
		return true;
	default:
		return false;
	}
};
hxsl_Tools.toString = function(t) {
	switch(t._hx_index) {
	case 5:
		var size = t.size;
		var t1 = t.t;
		var prefix;
		switch(t1._hx_index) {
		case 0:
			prefix = "I";
			break;
		case 1:
			prefix = "";
			break;
		case 2:
			prefix = "B";
			break;
		}
		return prefix + "Vec" + size;
	case 9:
		var n = t.size;
		return "Bytes" + n;
	case 13:
		var vl = t.vl;
		var _g = [];
		var _g1 = 0;
		while(_g1 < vl.length) {
			var v = vl[_g1];
			++_g1;
			_g.push(v.name + " : " + hxsl_Tools.toString(v.type));
		}
		return "{" + _g.join(",") + "}";
	case 15:
		var t1 = t.t;
		var s = t.size;
		var tmp = hxsl_Tools.toString(t1) + "[";
		var tmp1;
		switch(s._hx_index) {
		case 0:
			var i = s.v;
			tmp1 = "" + i;
			break;
		case 1:
			var v = s.v;
			tmp1 = v.name;
			break;
		}
		return tmp + tmp1 + "]";
	case 16:
		var t1 = t.t;
		var s = t.size;
		var tmp = "buffer " + hxsl_Tools.toString(t1) + "[";
		var tmp1;
		switch(s._hx_index) {
		case 0:
			var i = s.v;
			tmp1 = "" + i;
			break;
		case 1:
			var v = s.v;
			tmp1 = v.name;
			break;
		}
		return tmp + tmp1 + "]";
	default:
		return HxOverrides.substr($hxEnums[t.__enum__].__constructs__[t._hx_index]._hx_name,1,null);
	}
};
hxsl_Tools.hasSideEffect = function(e) {
	var _g = e.e;
	switch(_g._hx_index) {
	case 0:
		var _g1 = _g.c;
		return false;
	case 1:
		var _g1 = _g.v;
		return false;
	case 2:
		var _g1 = _g.g;
		return false;
	case 3:
		var e = _g.e;
		return hxsl_Tools.hasSideEffect(e);
	case 4:
		var el = _g.el;
		var _g1 = 0;
		while(_g1 < el.length) {
			var e = el[_g1];
			++_g1;
			if(hxsl_Tools.hasSideEffect(e)) {
				return true;
			}
		}
		return false;
	case 5:
		var _g1 = _g.op;
		var _g2 = _g.e1;
		var _g3 = _g.e2;
		switch(_g1._hx_index) {
		case 4:
			return true;
		case 20:
			var _g4 = _g1.op;
			return true;
		default:
			var e1 = _g2;
			var e2 = _g3;
			if(!hxsl_Tools.hasSideEffect(e1)) {
				return hxsl_Tools.hasSideEffect(e2);
			} else {
				return true;
			}
		}
		break;
	case 6:
		var _g1 = _g.op;
		var e1 = _g.e1;
		return hxsl_Tools.hasSideEffect(e1);
	case 7:
		var _g1 = _g.v;
		var _g1 = _g.init;
		return true;
	case 8:
		var e = _g.e;
		var pl = _g.args;
		var _g1 = e.e;
		var tmp;
		if(_g1._hx_index == 2) {
			var _g2 = _g1.g;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			return true;
		}
		var _g1 = 0;
		while(_g1 < pl.length) {
			var p = pl[_g1];
			++_g1;
			if(hxsl_Tools.hasSideEffect(p)) {
				return true;
			}
		}
		return false;
	case 9:
		var _g1 = _g.regs;
		var e = _g.e;
		return hxsl_Tools.hasSideEffect(e);
	case 10:
		var econd = _g.econd;
		var eif = _g.eif;
		var eelse = _g.eelse;
		if(!(hxsl_Tools.hasSideEffect(econd) || hxsl_Tools.hasSideEffect(eif))) {
			if(eelse != null) {
				return hxsl_Tools.hasSideEffect(eelse);
			} else {
				return false;
			}
		} else {
			return true;
		}
		break;
	case 11:case 14:case 15:
		return true;
	case 12:
		var _g1 = _g.e;
		return true;
	case 13:
		var _g1 = _g.v;
		var it = _g.it;
		var loop = _g.loop;
		if(!hxsl_Tools.hasSideEffect(it)) {
			return hxsl_Tools.hasSideEffect(loop);
		} else {
			return true;
		}
		break;
	case 16:
		var e = _g.e;
		var index = _g.index;
		if(!hxsl_Tools.hasSideEffect(e)) {
			return hxsl_Tools.hasSideEffect(index);
		} else {
			return true;
		}
		break;
	case 17:
		var el = _g.el;
		var _g1 = 0;
		while(_g1 < el.length) {
			var e = el[_g1];
			++_g1;
			if(hxsl_Tools.hasSideEffect(e)) {
				return true;
			}
		}
		return false;
	case 18:
		var e = _g.e;
		var cases = _g.cases;
		var def = _g.def;
		var _g1 = 0;
		while(_g1 < cases.length) {
			var c = cases[_g1];
			++_g1;
			var _g2 = 0;
			var _g3 = c.values;
			while(_g2 < _g3.length) {
				var v = _g3[_g2];
				++_g2;
				if(hxsl_Tools.hasSideEffect(v)) {
					return true;
				}
			}
			if(hxsl_Tools.hasSideEffect(c.expr)) {
				return true;
			}
		}
		if(!hxsl_Tools.hasSideEffect(e)) {
			if(def != null) {
				return hxsl_Tools.hasSideEffect(def);
			} else {
				return false;
			}
		} else {
			return true;
		}
		break;
	case 19:
		var _g1 = _g.normalWhile;
		var e = _g.e;
		var loop = _g.loop;
		if(!hxsl_Tools.hasSideEffect(e)) {
			return hxsl_Tools.hasSideEffect(loop);
		} else {
			return true;
		}
		break;
	case 20:
		var _g1 = _g.m;
		var _g1 = _g.args;
		var e = _g.e;
		return hxsl_Tools.hasSideEffect(e);
	}
};
hxsl_Tools.iter = function(e,f) {
	var _g = e.e;
	switch(_g._hx_index) {
	case 0:
		var _g1 = _g.c;
		break;
	case 1:
		var _g1 = _g.v;
		break;
	case 2:
		var _g1 = _g.g;
		break;
	case 3:
		var e = _g.e;
		f(e);
		break;
	case 4:
		var el = _g.el;
		var _g1 = 0;
		while(_g1 < el.length) {
			var e = el[_g1];
			++_g1;
			f(e);
		}
		break;
	case 5:
		var _g1 = _g.op;
		var e1 = _g.e1;
		var e2 = _g.e2;
		f(e1);
		f(e2);
		break;
	case 6:
		var _g1 = _g.op;
		var e1 = _g.e1;
		f(e1);
		break;
	case 7:
		var _g1 = _g.v;
		var init = _g.init;
		if(init != null) {
			f(init);
		}
		break;
	case 8:
		var e = _g.e;
		var args = _g.args;
		f(e);
		var _g1 = 0;
		while(_g1 < args.length) {
			var a = args[_g1];
			++_g1;
			f(a);
		}
		break;
	case 9:
		var _g1 = _g.regs;
		var e = _g.e;
		f(e);
		break;
	case 10:
		var econd = _g.econd;
		var eif = _g.eif;
		var eelse = _g.eelse;
		f(econd);
		f(eif);
		if(eelse != null) {
			f(eelse);
		}
		break;
	case 11:case 14:case 15:
		break;
	case 12:
		var e = _g.e;
		if(e != null) {
			f(e);
		}
		break;
	case 13:
		var _g1 = _g.v;
		var it = _g.it;
		var loop = _g.loop;
		f(it);
		f(loop);
		break;
	case 16:
		var e = _g.e;
		var index = _g.index;
		f(e);
		f(index);
		break;
	case 17:
		var el = _g.el;
		var _g1 = 0;
		while(_g1 < el.length) {
			var e = el[_g1];
			++_g1;
			f(e);
		}
		break;
	case 18:
		var e = _g.e;
		var cases = _g.cases;
		var def = _g.def;
		f(e);
		var _g1 = 0;
		while(_g1 < cases.length) {
			var c = cases[_g1];
			++_g1;
			var _g2 = 0;
			var _g3 = c.values;
			while(_g2 < _g3.length) {
				var v = _g3[_g2];
				++_g2;
				f(v);
			}
			f(c.expr);
		}
		if(def != null) {
			f(def);
		}
		break;
	case 19:
		var _g1 = _g.normalWhile;
		var e = _g.e;
		var loop = _g.loop;
		f(e);
		f(loop);
		break;
	case 20:
		var _g1 = _g.m;
		var _g1 = _g.args;
		var e = _g.e;
		f(e);
		break;
	}
};
hxsl_Tools.map = function(e,f) {
	var ed;
	var _g = e.e;
	switch(_g._hx_index) {
	case 0:
		var _g1 = _g.c;
		ed = e.e;
		break;
	case 1:
		var _g1 = _g.v;
		ed = e.e;
		break;
	case 2:
		var _g1 = _g.g;
		ed = e.e;
		break;
	case 3:
		var e1 = _g.e;
		ed = hxsl_TExprDef.TParenthesis(f(e1));
		break;
	case 4:
		var el = _g.el;
		var _g1 = [];
		var _g2 = 0;
		while(_g2 < el.length) {
			var e1 = el[_g2];
			++_g2;
			_g1.push(f(e1));
		}
		ed = hxsl_TExprDef.TBlock(_g1);
		break;
	case 5:
		var op = _g.op;
		var e1 = _g.e1;
		var e2 = _g.e2;
		ed = hxsl_TExprDef.TBinop(op,f(e1),f(e2));
		break;
	case 6:
		var op = _g.op;
		var e1 = _g.e1;
		ed = hxsl_TExprDef.TUnop(op,f(e1));
		break;
	case 7:
		var v = _g.v;
		var init = _g.init;
		ed = hxsl_TExprDef.TVarDecl(v,init != null ? f(init) : null);
		break;
	case 8:
		var e1 = _g.e;
		var args = _g.args;
		var ed1 = f(e1);
		var _g1 = [];
		var _g2 = 0;
		while(_g2 < args.length) {
			var a = args[_g2];
			++_g2;
			_g1.push(f(a));
		}
		ed = hxsl_TExprDef.TCall(ed1,_g1);
		break;
	case 9:
		var e1 = _g.e;
		var c = _g.regs;
		ed = hxsl_TExprDef.TSwiz(f(e1),c);
		break;
	case 10:
		var econd = _g.econd;
		var eif = _g.eif;
		var eelse = _g.eelse;
		ed = hxsl_TExprDef.TIf(f(econd),f(eif),eelse != null ? f(eelse) : null);
		break;
	case 11:case 14:case 15:
		ed = e.e;
		break;
	case 12:
		var e1 = _g.e;
		ed = hxsl_TExprDef.TReturn(e1 != null ? f(e1) : null);
		break;
	case 13:
		var v = _g.v;
		var it = _g.it;
		var loop = _g.loop;
		ed = hxsl_TExprDef.TFor(v,f(it),f(loop));
		break;
	case 16:
		var e1 = _g.e;
		var index = _g.index;
		ed = hxsl_TExprDef.TArray(f(e1),f(index));
		break;
	case 17:
		var el = _g.el;
		var _g1 = [];
		var _g2 = 0;
		while(_g2 < el.length) {
			var e1 = el[_g2];
			++_g2;
			_g1.push(f(e1));
		}
		ed = hxsl_TExprDef.TArrayDecl(_g1);
		break;
	case 18:
		var e1 = _g.e;
		var cases = _g.cases;
		var def = _g.def;
		var ed1 = f(e1);
		var _g1 = [];
		var _g2 = 0;
		while(_g2 < cases.length) {
			var c = cases[_g2];
			++_g2;
			var _g3 = [];
			var _g4 = 0;
			var _g5 = c.values;
			while(_g4 < _g5.length) {
				var v = _g5[_g4];
				++_g4;
				_g3.push(f(v));
			}
			_g1.push({ values : _g3, expr : f(c.expr)});
		}
		ed = hxsl_TExprDef.TSwitch(ed1,_g1,def == null ? null : f(def));
		break;
	case 19:
		var e1 = _g.e;
		var loop = _g.loop;
		var normalWhile = _g.normalWhile;
		ed = hxsl_TExprDef.TWhile(f(e1),f(loop),normalWhile);
		break;
	case 20:
		var m = _g.m;
		var args = _g.args;
		var e1 = _g.e;
		ed = hxsl_TExprDef.TMeta(m,args,f(e1));
		break;
	}
	return { e : ed, t : e.t, p : e.p};
};
hxsl_Tools.size = function(t) {
	switch(t._hx_index) {
	case 0:
		return 0;
	case 1:case 3:
		return 1;
	case 2:case 4:case 10:case 11:case 12:
		return 0;
	case 5:
		var _g = t.t;
		var n = t.size;
		return n;
	case 6:
		return 9;
	case 7:
		return 16;
	case 8:
		return 12;
	case 9:
		var s = t.size;
		return s;
	case 13:
		var vl = t.vl;
		var s = 0;
		var _g = 0;
		while(_g < vl.length) {
			var v = vl[_g];
			++_g;
			s += hxsl_Tools.size(v.type);
		}
		return s;
	case 14:
		var _g = t.variants;
		return 0;
	case 15:
		var _g = t.t;
		var _g1 = t.size;
		switch(_g1._hx_index) {
		case 0:
			var v = _g1.v;
			var t1 = _g;
			return hxsl_Tools.size(t1) * v;
		case 1:
			var _g = _g1.v;
			return 0;
		}
		break;
	case 16:
		var _g = t.size;
		if(_g._hx_index == 0) {
			var v = _g.v;
			var t1 = t.t;
			return hxsl_Tools.size(t1) * v;
		} else {
			return 0;
		}
		break;
	case 17:
		var n = t.size;
		return n;
	case 18:
		return 4;
	}
};
var hxsl_Tools2 = function() { };
hxsl_Tools2.__name__ = "hxsl.Tools2";
hxsl_Tools2.toString = function(g) {
	var n = $hxEnums[g.__enum__].__constructs__[g._hx_index]._hx_name;
	return n.charAt(0).toLowerCase() + HxOverrides.substr(n,1,null);
};
var hxsl_BatchShader = function() {
	this.Batch_Count__ = 0;
	hxsl_Shader.call(this);
};
hxsl_BatchShader.__name__ = "hxsl.BatchShader";
hxsl_BatchShader.__super__ = hxsl_Shader;
hxsl_BatchShader.prototype = $extend(hxsl_Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		var v = this.Batch_Count__;
		if(v >>> 17 != 0) {
			throw haxe_Exception.thrown("Batch_Count" + " is out of range " + v + ">" + 131071);
		}
		this.constBits |= v;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.Batch_Count__;
		case 1:
			return this.Batch_Buffer__;
		default:
		}
		return null;
	}
	,getParamFloatValue: function(index) {
		return 0.;
	}
	,__class__: hxsl_BatchShader
});
var hxsl_SearchMap = function() {
};
hxsl_SearchMap.__name__ = "hxsl.SearchMap";
hxsl_SearchMap.prototype = {
	__class__: hxsl_SearchMap
};
var hxsl_Cache = function() {
	this.constsToGlobal = false;
	this.linkCache = new hxsl_SearchMap();
	this.linkShaders = new haxe_ds_StringMap();
	this.batchShaders = new haxe_ds_IntMap();
	this.byID = new haxe_ds_StringMap();
};
hxsl_Cache.__name__ = "hxsl.Cache";
hxsl_Cache.get = function() {
	var c = hxsl_Cache.INST;
	if(c == null) {
		c = new hxsl_Cache();
		hxsl_Cache.INST = c;
	}
	return c;
};
hxsl_Cache.prototype = {
	getLinkShader: function(vars) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < vars.length) {
			var v = vars[_g1];
			++_g1;
			_g.push(Std.string(v));
		}
		var key = _g.join(",");
		var shader = this.linkShaders.h[key];
		if(shader != null) {
			return shader;
		}
		var s = new hxsl_SharedShader("");
		var id = HxOverrides.substr(haxe_crypto_Md5.encode(key),0,8);
		s.data = { name : "shaderLinker_" + id, vars : [], funs : []};
		var pos = null;
		var outVars_h = Object.create(null);
		var outputCount = 0;
		var tvec4 = hxsl_Type.TVec(4,hxsl_VecType.VFloat);
		var makeVec = function(g,size,args,makeOutExpr) {
			var out = [];
			var rem = size;
			var _g = 0;
			var _g1 = args.length;
			while(_g < _g1) {
				var i = _g++;
				var e = makeOutExpr(args[args.length - 1 - i],rem - (args.length - 1 - i));
				rem -= hxsl_Tools.size(e.t);
				out.unshift(e);
			}
			return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(g), t : hxsl_Type.TVoid, p : pos},out), t : hxsl_Type.TVec(size,hxsl_VecType.VFloat), p : pos};
		};
		var makeVar = function(name,t,parent) {
			var path = parent == null ? name : hxsl_Tools.getName(parent) + "." + name;
			var v = outVars_h[path];
			if(v != null) {
				return v;
			}
			v = { id : hxsl_Tools.allocVarId(), name : name, type : t, kind : hxsl_VarKind.Var, parent : parent};
			if(parent == null) {
				s.data.vars.push(v);
			} else {
				var _g = parent.type;
				if(_g._hx_index == 13) {
					var vl = _g.vl;
					vl.push(v);
				} else {
					throw haxe_Exception.thrown("assert");
				}
			}
			outVars_h[path] = v;
			return v;
		};
		var makeOutExpr = null;
		makeOutExpr = function(v,rem) {
			switch(v._hx_index) {
			case 0:
				var v1 = v.v;
				return { e : hxsl_TExprDef.TConst(hxsl_Const.CFloat(v1)), t : hxsl_Type.TFloat, p : pos};
			case 1:
				var vname = v.v;
				var size = v.size;
				var v1 = outVars_h[vname];
				if(v1 != null) {
					return { e : hxsl_TExprDef.TVar(v1), t : v1.type, p : pos};
				}
				var path = vname.split(".");
				var parent = null;
				while(path.length > 1) parent = makeVar(path.shift(),hxsl_Type.TStruct([]),parent);
				if(size != null) {
					rem = size;
				}
				v1 = makeVar(path.shift(),rem == 1 ? hxsl_Type.TFloat : hxsl_Type.TVec(rem,hxsl_VecType.VFloat),parent);
				return { e : hxsl_TExprDef.TVar(v1), t : v1.type, p : pos};
			case 2:
				var v1 = v.v;
				return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.PackNormal), t : hxsl_Type.TVoid, p : pos},[makeOutExpr(v1,3)]), t : tvec4, p : pos};
			case 3:
				var v1 = v.v;
				return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Pack), t : hxsl_Type.TVoid, p : pos},[makeOutExpr(v1,1)]), t : tvec4, p : pos};
			case 4:
				var args = v.a;
				return makeVec(hxsl_TGlobal.Vec2,2,args,makeOutExpr);
			case 5:
				var args = v.a;
				return makeVec(hxsl_TGlobal.Vec3,3,args,makeOutExpr);
			case 6:
				var args = v.a;
				return makeVec(hxsl_TGlobal.Vec4,4,args,makeOutExpr);
			case 7:
				var v1 = v.a;
				var comps = v.swiz;
				return { e : hxsl_TExprDef.TSwiz(makeOutExpr(v1,4),comps), t : hxsl_Type.TVec(comps.length,hxsl_VecType.VFloat), p : pos};
			}
		};
		var makeOutput = function(v) {
			outputCount += 1;
			var ov = { id : hxsl_Tools.allocVarId(), type : tvec4, name : "OUTPUT" + (outputCount - 1), kind : hxsl_VarKind.Output};
			s.data.vars.push(ov);
			return { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAssign,{ e : hxsl_TExprDef.TVar(ov), t : tvec4, p : pos},makeOutExpr(v,4)), t : hxsl_Type.TVoid, p : pos};
		};
		var defineFun = function(kind,vars) {
			var fv = { id : hxsl_Tools.allocVarId(), type : hxsl_Type.TFun([]), name : ("" + Std.string(kind)).toLowerCase(), kind : hxsl_VarKind.Function};
			var _g = [];
			var _g1 = 0;
			while(_g1 < vars.length) {
				var v = vars[_g1];
				++_g1;
				_g.push(makeOutput(v));
			}
			var f = { kind : kind, ref : fv, args : [], ret : hxsl_Type.TVoid, expr : { e : hxsl_TExprDef.TBlock(_g), p : pos, t : hxsl_Type.TVoid}};
			s.data.funs.push(f);
		};
		defineFun(hxsl_FunctionKind.Vertex,[hxsl_Output.Value("output.position")]);
		defineFun(hxsl_FunctionKind.Fragment,vars);
		shader = Object.create(hxsl_Shader.prototype);
		shader.shader = s;
		this.linkShaders.h[key] = shader;
		shader.updateConstantsFinal(null);
		return shader;
	}
	,link: function(shaders,batchMode) {
		var c = this.linkCache;
		var _g_l = shaders;
		var _g_last = null;
		while(_g_l != _g_last) {
			var s = _g_l.s;
			_g_l = _g_l.next;
			var s1 = s;
			var i = s1.instance;
			if(c.next == null) {
				c.next = new haxe_ds_IntMap();
			}
			var cs = c.next.h[i.id];
			if(cs == null) {
				cs = new hxsl_SearchMap();
				c.next.h[i.id] = cs;
			}
			c = cs;
		}
		if(c.linked == null) {
			c.linked = this.compileRuntimeShader(shaders,batchMode);
		}
		return c.linked;
	}
	,compileRuntimeShader: function(shaders,batchMode) {
		var shaderDatas = [];
		var index = 0;
		var _g_l = shaders;
		var _g_last = null;
		while(_g_l != _g_last) {
			var s = _g_l.s;
			_g_l = _g_l.next;
			var s1 = s;
			var i = s1.instance;
			shaderDatas.push({ inst : i, p : s1.priority, index : index++});
		}
		shaderDatas.reverse();
		haxe_ds_ArraySort.sort(shaderDatas,function(s1,s2) {
			return s2.p - s1.p;
		});
		var linker = new hxsl_Linker(batchMode);
		var s;
		try {
			var _g = [];
			var _g1 = 0;
			while(_g1 < shaderDatas.length) {
				var s1 = shaderDatas[_g1];
				++_g1;
				_g.push(s1.inst.shader);
			}
			s = linker.link(_g);
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(((_g1) instanceof hxsl_Error)) {
				var e = _g1;
				var _g1 = [];
				var _g2 = 0;
				while(_g2 < shaderDatas.length) {
					var s1 = shaderDatas[_g2];
					++_g2;
					_g1.push(hxsl_Printer.shaderToString(s1.inst.shader));
				}
				var shaders1 = _g1;
				e.msg += "\n\nin\n\n" + shaders1.join("\n-----\n");
				throw haxe_Exception.thrown(e);
			} else {
				throw _g;
			}
		}
		if(batchMode) {
			var checkRec = null;
			checkRec = function(v) {
				if(v.qualifiers != null && v.qualifiers.indexOf(hxsl_VarQualifier.PerObject) >= 0) {
					if(v.qualifiers.length == 1) {
						v.qualifiers = null;
					} else {
						v.qualifiers = v.qualifiers.slice();
						HxOverrides.remove(v.qualifiers,hxsl_VarQualifier.PerObject);
					}
					if(v.kind != hxsl_VarKind.Var) {
						v.kind = hxsl_VarKind.Local;
					}
				}
				var _g = v.type;
				if(_g._hx_index == 13) {
					var vl = _g.vl;
					var _g = 0;
					while(_g < vl.length) {
						var v = vl[_g];
						++_g;
						checkRec(v);
					}
				}
			};
			var _g = 0;
			var _g1 = s.vars;
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				checkRec(v);
			}
		}
		var paramVars = new haxe_ds_IntMap();
		var _g = 0;
		var _g1 = linker.allVars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			if(v.v.kind == hxsl_VarKind.Param) {
				var _g2 = v.v.type;
				if(_g2._hx_index == 13) {
					var _g3 = _g2.vl;
					continue;
				}
				var inf = shaderDatas[v.instanceIndex];
				paramVars.h[v.id] = { instance : inf.index, index : inf.inst.params.h[v.merged[0].id]};
			}
		}
		var prev = s;
		var s1;
		try {
			s1 = new hxsl_Splitter().split(s);
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(((_g1) instanceof hxsl_Error)) {
				var e = _g1;
				e.msg += "\n\nin\n\n" + hxsl_Printer.shaderToString(s);
				throw haxe_Exception.thrown(e);
			} else {
				throw _g;
			}
		}
		var prev = s1;
		var s = new hxsl_Dce().dce(s1.vertex,s1.fragment);
		var r = this.buildRuntimeShader(s.vertex,s.fragment,paramVars);
		var _g = [];
		var _g4_l = shaders;
		var _g4_last = null;
		while(_g4_l != _g4_last) {
			var s = _g4_l.s;
			_g4_l = _g4_l.next;
			var s1 = s;
			_g.push(new hxsl_ShaderInstanceDesc(s1.shader,s1.constBits));
		}
		r.spec = { instances : _g, signature : null};
		var _g = 0;
		var _g1 = shaderDatas.length;
		while(_g < _g1) {
			var i = _g++;
			var s = shaderDatas[shaderDatas.length - 1 - i];
			r.spec.instances[s.index].index = i;
		}
		var _g = [];
		var _g1 = 0;
		var _g2 = r.spec.instances;
		while(_g1 < _g2.length) {
			var i = _g2[_g1];
			++_g1;
			_g.push(i.shader.data.name + "_" + i.bits + "_" + i.index);
		}
		var signParts = _g;
		var tmp = signParts.join(":");
		r.spec.signature = haxe_crypto_Md5.encode(tmp);
		r.signature = haxe_crypto_Md5.encode(hxsl_Printer.shaderToString(r.vertex.data) + hxsl_Printer.shaderToString(r.fragment.data));
		r.batchMode = batchMode;
		var r2 = this.byID.h[r.signature];
		if(r2 != null) {
			r.id = r2.id;
		} else {
			this.byID.h[r.signature] = r;
		}
		return r;
	}
	,buildRuntimeShader: function(vertex,fragment,paramVars) {
		var r = new hxsl_RuntimeShader();
		r.vertex = this.flattenShader(vertex,hxsl_FunctionKind.Vertex,paramVars);
		r.vertex.vertex = true;
		r.fragment = this.flattenShader(fragment,hxsl_FunctionKind.Fragment,paramVars);
		r.globals = new haxe_ds_IntMap();
		this.initGlobals(r,r.vertex);
		this.initGlobals(r,r.fragment);
		return r;
	}
	,initGlobals: function(r,s) {
		var p = s.globals;
		while(p != null) {
			r.globals.h[p.gid] = true;
			p = p.next;
		}
		var p = s.params;
		while(p != null) {
			if(p.perObjectGlobal != null) {
				r.globals.h[p.perObjectGlobal.gid] = true;
			}
			p = p.next;
		}
	}
	,getPath: function(v) {
		if(v.parent == null) {
			return v.name;
		}
		return this.getPath(v.parent) + "." + v.name;
	}
	,flattenShader: function(s,kind,params) {
		var flat = new hxsl_Flatten();
		var c = new hxsl_RuntimeShaderData();
		var data = flat.flatten(s,kind,this.constsToGlobal);
		var textures = [];
		c.consts = flat.consts;
		c.texturesCount = 0;
		var g = flat.allocData.keys();
		while(g.hasNext()) {
			var g1 = g.next();
			var alloc = flat.allocData.h[g1.__id__];
			switch(g1.kind._hx_index) {
			case 0:
				var _g = [];
				var _g1 = 0;
				while(_g1 < alloc.length) {
					var a = alloc[_g1];
					++_g1;
					if(a.v != null) {
						_g.push(new hxsl_AllocGlobal(a.pos,this.getPath(a.v),a.v.type));
					}
				}
				var out = _g;
				var _g2 = 0;
				var _g3 = out.length - 1;
				while(_g2 < _g3) {
					var i = _g2++;
					out[i].next = out[i + 1];
				}
				var _g4 = g1.type;
				if(_g4._hx_index == 15) {
					var _g5 = _g4.t;
					var _g6 = _g4.size;
					if(_g5._hx_index == 5) {
						if(_g5.size == 4) {
							if(_g5.t._hx_index == 1) {
								if(_g6._hx_index == 0) {
									var size = _g6.v;
									c.globals = out[0];
									c.globalsSize = size;
								} else {
									throw haxe_Exception.thrown("assert");
								}
							} else {
								throw haxe_Exception.thrown("assert");
							}
						} else {
							throw haxe_Exception.thrown("assert");
						}
					} else {
						throw haxe_Exception.thrown("assert");
					}
				} else {
					throw haxe_Exception.thrown("assert");
				}
				break;
			case 2:
				var out1 = [];
				var count = 0;
				var _g7 = 0;
				while(_g7 < alloc.length) {
					var a1 = alloc[_g7];
					++_g7;
					if(a1.v == null) {
						continue;
					}
					var p = params.h[a1.v.id];
					if(p == null) {
						var ap = new hxsl_AllocParam(a1.v.name,a1.pos,-1,-1,a1.v.type);
						ap.perObjectGlobal = new hxsl_AllocGlobal(-1,this.getPath(a1.v),a1.v.type);
						out1.push(ap);
						++count;
						continue;
					}
					var ap1 = new hxsl_AllocParam(a1.v.name,a1.pos,p.instance,p.index,a1.v.type);
					var _g8 = a1.v.type;
					if(_g8._hx_index == 15) {
						var _g9 = _g8.size;
						var t = _g8.t;
						if(hxsl_Tools.isSampler(t)) {
							ap1.pos = -a1.size;
							count += a1.size;
						} else {
							++count;
						}
					} else {
						++count;
					}
					out1.push(ap1);
				}
				var _g10 = 0;
				var _g11 = out1.length - 1;
				while(_g10 < _g11) {
					var i1 = _g10++;
					out1[i1].next = out1[i1 + 1];
				}
				var _g12 = g1.type;
				if(_g12._hx_index == 15) {
					var _g13 = _g12.t;
					var _g14 = _g12.size;
					var t1 = _g13;
					if(hxsl_Tools.isSampler(t1)) {
						textures.push({ t : t1, all : out1});
						c.texturesCount += count;
					} else {
						switch(_g13._hx_index) {
						case 5:
							if(_g13.size == 4) {
								if(_g13.t._hx_index == 1) {
									if(_g14._hx_index == 0) {
										var size1 = _g14.v;
										c.params = out1[0];
										c.paramsSize = size1;
									} else {
										throw haxe_Exception.thrown("assert");
									}
								} else {
									throw haxe_Exception.thrown("assert");
								}
							} else {
								throw haxe_Exception.thrown("assert");
							}
							break;
						case 16:
							var _g15 = _g13.t;
							var _g16 = _g13.size;
							c.buffers = out1[0];
							c.bufferCount = out1.length;
							break;
						default:
							throw haxe_Exception.thrown("assert");
						}
					}
				} else {
					throw haxe_Exception.thrown("assert");
				}
				break;
			default:
				throw haxe_Exception.thrown("assert");
			}
		}
		if(textures.length > 0) {
			textures.sort(function(t1,t2) {
				return t1.t._hx_index - t2.t._hx_index;
			});
			c.textures = textures[0].all[0];
			var _g = 1;
			var _g1 = textures.length;
			while(_g < _g1) {
				var i = _g++;
				var prevAll = textures[i - 1].all;
				var prev = prevAll[prevAll.length - 1];
				prev.next = textures[i].all[0];
			}
		}
		if(c.globals == null) {
			c.globalsSize = 0;
		}
		if(c.params == null) {
			c.paramsSize = 0;
		}
		if(c.buffers == null) {
			c.bufferCount = 0;
		}
		c.data = data;
		return c;
	}
	,__class__: hxsl_Cache
};
var hxsl_Channel = $hxEnums["hxsl.Channel"] = { __ename__:true,__constructs__:null
	,Unknown: {_hx_name:"Unknown",_hx_index:0,__enum__:"hxsl.Channel",toString:$estr}
	,R: {_hx_name:"R",_hx_index:1,__enum__:"hxsl.Channel",toString:$estr}
	,G: {_hx_name:"G",_hx_index:2,__enum__:"hxsl.Channel",toString:$estr}
	,B: {_hx_name:"B",_hx_index:3,__enum__:"hxsl.Channel",toString:$estr}
	,A: {_hx_name:"A",_hx_index:4,__enum__:"hxsl.Channel",toString:$estr}
	,PackedFloat: {_hx_name:"PackedFloat",_hx_index:5,__enum__:"hxsl.Channel",toString:$estr}
	,PackedNormal: {_hx_name:"PackedNormal",_hx_index:6,__enum__:"hxsl.Channel",toString:$estr}
};
hxsl_Channel.__constructs__ = [hxsl_Channel.Unknown,hxsl_Channel.R,hxsl_Channel.G,hxsl_Channel.B,hxsl_Channel.A,hxsl_Channel.PackedFloat,hxsl_Channel.PackedNormal];
hxsl_Channel.__empty_constructs__ = [hxsl_Channel.Unknown,hxsl_Channel.R,hxsl_Channel.G,hxsl_Channel.B,hxsl_Channel.A,hxsl_Channel.PackedFloat,hxsl_Channel.PackedNormal];
var hxsl_Clone = function() {
	this.varMap = new haxe_ds_IntMap();
};
hxsl_Clone.__name__ = "hxsl.Clone";
hxsl_Clone.shaderData = function(s) {
	return new hxsl_Clone().shader(s);
};
hxsl_Clone.prototype = {
	tvar: function(v) {
		var v2 = this.varMap.h[v.id];
		if(v2 != null) {
			return v2;
		}
		v2 = { id : hxsl_Tools.allocVarId(), type : v.type, name : v.name, kind : v.kind};
		this.varMap.h[v.id] = v2;
		if(v.parent != null) {
			v2.parent = this.tvar(v.parent);
		}
		if(v.qualifiers != null) {
			v2.qualifiers = v.qualifiers.slice();
		}
		v2.type = this.ttype(v.type);
		return v2;
	}
	,tfun: function(f) {
		var tmp = this.ttype(f.ret);
		var f1 = f.kind;
		var tmp1 = this.tvar(f.ref);
		var _g = [];
		var _g1 = 0;
		var _g2 = f.args;
		while(_g1 < _g2.length) {
			var a = _g2[_g1];
			++_g1;
			_g.push(this.tvar(a));
		}
		return { ret : tmp, kind : f1, ref : tmp1, args : _g, expr : this.texpr(f.expr)};
	}
	,ttype: function(t) {
		switch(t._hx_index) {
		case 13:
			var vl = t.vl;
			var _g = [];
			var _g1 = 0;
			while(_g1 < vl.length) {
				var v = vl[_g1];
				++_g1;
				_g.push(this.tvar(v));
			}
			return hxsl_Type.TStruct(_g);
		case 14:
			var vars = t.variants;
			return hxsl_Type.TFun(vars);
		case 15:
			var t1 = t.t;
			var size = t.size;
			var tmp = this.ttype(t1);
			var tmp1;
			switch(size._hx_index) {
			case 0:
				var _g = size.v;
				tmp1 = size;
				break;
			case 1:
				var v = size.v;
				tmp1 = hxsl_SizeDecl.SVar(this.tvar(v));
				break;
			}
			return hxsl_Type.TArray(tmp,tmp1);
		default:
			return t;
		}
	}
	,texpr: function(e) {
		var e2 = hxsl_Tools.map(e,$bind(this,this.texpr));
		e2.t = this.ttype(e.t);
		var _g = e2.e;
		var tmp;
		switch(_g._hx_index) {
		case 1:
			var v = _g.v;
			tmp = hxsl_TExprDef.TVar(this.tvar(v));
			break;
		case 7:
			var v = _g.v;
			var init = _g.init;
			tmp = hxsl_TExprDef.TVarDecl(this.tvar(v),init);
			break;
		case 13:
			var v = _g.v;
			var it = _g.it;
			var loop = _g.loop;
			tmp = hxsl_TExprDef.TFor(this.tvar(v),it,loop);
			break;
		default:
			tmp = e2.e;
		}
		e2.e = tmp;
		return e2;
	}
	,shader: function(s) {
		var s1 = s.name;
		var _g = [];
		var _g1 = 0;
		var _g2 = s.vars;
		while(_g1 < _g2.length) {
			var v = _g2[_g1];
			++_g1;
			_g.push(this.tvar(v));
		}
		var tmp = _g;
		var _g = [];
		var _g1 = 0;
		var _g2 = s.funs;
		while(_g1 < _g2.length) {
			var f = _g2[_g1];
			++_g1;
			_g.push(this.tfun(f));
		}
		return { name : s1, vars : tmp, funs : _g};
	}
	,__class__: hxsl_Clone
};
var hxsl__$Dce_VarDeps = function(v) {
	this.v = v;
	this.used = false;
	this.deps = new haxe_ds_IntMap();
};
hxsl__$Dce_VarDeps.__name__ = "hxsl._Dce.VarDeps";
hxsl__$Dce_VarDeps.prototype = {
	__class__: hxsl__$Dce_VarDeps
};
var hxsl_Dce = function() {
};
hxsl_Dce.__name__ = "hxsl.Dce";
hxsl_Dce.prototype = {
	dce: function(vertex,fragment) {
		this.used = new haxe_ds_IntMap();
		this.channelVars = [];
		var inputs = [];
		var _g = 0;
		var _g1 = vertex.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			var i = this.get(v);
			if(v.kind == hxsl_VarKind.Input) {
				inputs.push(i);
			}
			if(v.kind == hxsl_VarKind.Output) {
				i.keep = true;
			}
		}
		var _g = 0;
		var _g1 = fragment.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			var i = this.get(v);
			if(v.kind == hxsl_VarKind.Output) {
				i.keep = true;
			}
		}
		var _g = 0;
		var _g1 = vertex.funs;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.check(f.expr,[],[]);
		}
		var _g = 0;
		var _g1 = fragment.funs;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.check(f.expr,[],[]);
		}
		var outExprs = [];
		while(true) {
			var v = this.used.iterator();
			while(v.hasNext()) {
				var v1 = v.next();
				if(v1.keep) {
					this.markRec(v1);
				}
			}
			while(inputs.length > 1 && !inputs[inputs.length - 1].used) inputs.pop();
			var _g = 0;
			while(_g < inputs.length) {
				var v2 = inputs[_g];
				++_g;
				this.markRec(v2);
			}
			outExprs = [];
			var _g1 = 0;
			var _g2 = vertex.funs;
			while(_g1 < _g2.length) {
				var f = _g2[_g1];
				++_g1;
				outExprs.push(this.mapExpr(f.expr,false));
			}
			var _g3 = 0;
			var _g4 = fragment.funs;
			while(_g3 < _g4.length) {
				var f1 = _g4[_g3];
				++_g3;
				outExprs.push(this.mapExpr(f1.expr,false));
			}
			this.markAsKeep = false;
			var _g5 = 0;
			while(_g5 < outExprs.length) {
				var e = outExprs[_g5];
				++_g5;
				this.checkBranches(e);
			}
			if(!this.markAsKeep) {
				break;
			}
		}
		var _g = 0;
		var _g1 = vertex.funs;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			f.expr = outExprs.shift();
		}
		var _g = 0;
		var _g1 = fragment.funs;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			f.expr = outExprs.shift();
		}
		var v = this.used.iterator();
		while(v.hasNext()) {
			var v1 = v.next();
			if(v1.used) {
				continue;
			}
			if(v1.v.kind == hxsl_VarKind.Input) {
				continue;
			}
			HxOverrides.remove(vertex.vars,v1.v);
			HxOverrides.remove(fragment.vars,v1.v);
		}
		return { fragment : fragment, vertex : vertex};
	}
	,get: function(v) {
		var vd = this.used.h[v.id];
		if(vd == null) {
			vd = new hxsl__$Dce_VarDeps(v);
			this.used.h[v.id] = vd;
		}
		return vd;
	}
	,markRec: function(v) {
		if(v.used) {
			return;
		}
		v.used = true;
		var d = v.deps.iterator();
		while(d.hasNext()) {
			var d1 = d.next();
			this.markRec(d1);
		}
	}
	,link: function(v,writeTo) {
		var vd = this.get(v);
		var _g = 0;
		while(_g < writeTo.length) {
			var w = writeTo[_g];
			++_g;
			if(w == null) {
				if(!vd.keep) {
					vd.keep = true;
					this.markAsKeep = true;
				}
				continue;
			}
			w.deps.h[v.id] = vd;
		}
	}
	,check: function(e,writeTo,isAffected) {
		var _g = e.e;
		switch(_g._hx_index) {
		case 1:
			var v = _g.v;
			this.link(v,writeTo);
			break;
		case 4:
			var el = _g.el;
			var noWrite = [];
			var _g1 = 0;
			var _g2 = el.length;
			while(_g1 < _g2) {
				var i = _g1++;
				this.check(el[i],i < el.length - 1 ? noWrite : writeTo,isAffected);
			}
			break;
		case 5:
			var _g1 = _g.op;
			var _g2 = _g.e1;
			var _g3 = _g.e2;
			switch(_g1._hx_index) {
			case 4:
				var _g4 = _g2.e;
				var _g5 = _g2.p;
				var _g5 = _g2.t;
				switch(_g4._hx_index) {
				case 1:
					var v = _g4.v;
					var e1 = _g3;
					var v1 = this.get(v);
					writeTo.push(v1);
					this.check(e1,writeTo,isAffected);
					writeTo.pop();
					if(isAffected.indexOf(v1) < 0) {
						isAffected.push(v1);
					}
					break;
				case 9:
					var _g5 = _g4.e;
					var _g6 = _g4.regs;
					var _g4 = _g5.e;
					var _g6 = _g5.p;
					var _g6 = _g5.t;
					if(_g4._hx_index == 1) {
						var v = _g4.v;
						var e1 = _g3;
						var v1 = this.get(v);
						writeTo.push(v1);
						this.check(e1,writeTo,isAffected);
						writeTo.pop();
						if(isAffected.indexOf(v1) < 0) {
							isAffected.push(v1);
						}
					} else {
						var _g4 = $bind(this,this.check);
						var writeTo1 = writeTo;
						var isAffected1 = isAffected;
						hxsl_Tools.iter(e,function(e) {
							_g4(e,writeTo1,isAffected1);
						});
					}
					break;
				default:
					var _g5 = $bind(this,this.check);
					var writeTo2 = writeTo;
					var isAffected2 = isAffected;
					hxsl_Tools.iter(e,function(e) {
						_g5(e,writeTo2,isAffected2);
					});
				}
				break;
			case 20:
				var _g6 = _g1.op;
				var _g1 = _g2.e;
				var _g6 = _g2.p;
				var _g6 = _g2.t;
				switch(_g1._hx_index) {
				case 1:
					var v = _g1.v;
					var e1 = _g3;
					var v1 = this.get(v);
					writeTo.push(v1);
					this.check(e1,writeTo,isAffected);
					writeTo.pop();
					if(isAffected.indexOf(v1) < 0) {
						isAffected.push(v1);
					}
					break;
				case 9:
					var _g2 = _g1.e;
					var _g6 = _g1.regs;
					var _g1 = _g2.e;
					var _g6 = _g2.p;
					var _g6 = _g2.t;
					if(_g1._hx_index == 1) {
						var v = _g1.v;
						var e1 = _g3;
						var v1 = this.get(v);
						writeTo.push(v1);
						this.check(e1,writeTo,isAffected);
						writeTo.pop();
						if(isAffected.indexOf(v1) < 0) {
							isAffected.push(v1);
						}
					} else {
						var _g1 = $bind(this,this.check);
						var writeTo3 = writeTo;
						var isAffected3 = isAffected;
						hxsl_Tools.iter(e,function(e) {
							_g1(e,writeTo3,isAffected3);
						});
					}
					break;
				default:
					var _g2 = $bind(this,this.check);
					var writeTo4 = writeTo;
					var isAffected4 = isAffected;
					hxsl_Tools.iter(e,function(e) {
						_g2(e,writeTo4,isAffected4);
					});
				}
				break;
			default:
				var _g3 = $bind(this,this.check);
				var writeTo5 = writeTo;
				var isAffected5 = isAffected;
				hxsl_Tools.iter(e,function(e) {
					_g3(e,writeTo5,isAffected5);
				});
			}
			break;
		case 7:
			var v = _g.v;
			var init = _g.init;
			if(init != null) {
				writeTo.push(this.get(v));
				this.check(init,writeTo,isAffected);
				writeTo.pop();
			} else {
				var _g6 = $bind(this,this.check);
				var writeTo6 = writeTo;
				var isAffected6 = isAffected;
				hxsl_Tools.iter(e,function(e) {
					_g6(e,writeTo6,isAffected6);
				});
			}
			break;
		case 8:
			var _g7 = _g.e;
			var _g8 = _g.args;
			var _g9 = _g7.e;
			var _g10 = _g7.p;
			var _g10 = _g7.t;
			if(_g9._hx_index == 2) {
				switch(_g9.g._hx_index) {
				case 63:
					if(_g8.length == 3) {
						var _g7 = _g8[0];
						var _g9 = _g8[2];
						var _g10 = _g7.e;
						var _g11 = _g7.p;
						var _g11 = _g7.t;
						if(_g10._hx_index == 1) {
							var _g7 = _g9.e;
							var _g11 = _g9.p;
							var _g11 = _g9.t;
							if(_g7._hx_index == 0) {
								var _g9 = _g7.c;
								if(_g9._hx_index == 2) {
									var cid = _g9.v;
									var uv = _g8[1];
									var c = _g10.v;
									this.check(uv,writeTo,isAffected);
									if(this.channelVars[cid] == null) {
										this.channelVars[cid] = c;
										this.link(c,writeTo);
									} else {
										this.link(this.channelVars[cid],writeTo);
									}
								} else {
									var _g7 = $bind(this,this.check);
									var writeTo7 = writeTo;
									var isAffected7 = isAffected;
									hxsl_Tools.iter(e,function(e) {
										_g7(e,writeTo7,isAffected7);
									});
								}
							} else {
								var _g9 = $bind(this,this.check);
								var writeTo8 = writeTo;
								var isAffected8 = isAffected;
								hxsl_Tools.iter(e,function(e) {
									_g9(e,writeTo8,isAffected8);
								});
							}
						} else {
							var _g10 = $bind(this,this.check);
							var writeTo9 = writeTo;
							var isAffected9 = isAffected;
							hxsl_Tools.iter(e,function(e) {
								_g10(e,writeTo9,isAffected9);
							});
						}
					} else {
						var _g11 = $bind(this,this.check);
						var writeTo10 = writeTo;
						var isAffected10 = isAffected;
						hxsl_Tools.iter(e,function(e) {
							_g11(e,writeTo10,isAffected10);
						});
					}
					break;
				case 64:
					if(_g8.length == 4) {
						var _g12 = _g8[0];
						var _g13 = _g8[3];
						var _g14 = _g12.e;
						var _g15 = _g12.p;
						var _g15 = _g12.t;
						if(_g14._hx_index == 1) {
							var _g12 = _g13.e;
							var _g15 = _g13.p;
							var _g15 = _g13.t;
							if(_g12._hx_index == 0) {
								var _g13 = _g12.c;
								if(_g13._hx_index == 2) {
									var cid = _g13.v;
									var lod = _g8[2];
									var uv = _g8[1];
									var c = _g14.v;
									this.check(uv,writeTo,isAffected);
									this.check(lod,writeTo,isAffected);
									if(this.channelVars[cid] == null) {
										this.channelVars[cid] = c;
										this.link(c,writeTo);
									} else {
										this.link(this.channelVars[cid],writeTo);
									}
								} else {
									var _g8 = $bind(this,this.check);
									var writeTo11 = writeTo;
									var isAffected11 = isAffected;
									hxsl_Tools.iter(e,function(e) {
										_g8(e,writeTo11,isAffected11);
									});
								}
							} else {
								var _g12 = $bind(this,this.check);
								var writeTo12 = writeTo;
								var isAffected12 = isAffected;
								hxsl_Tools.iter(e,function(e) {
									_g12(e,writeTo12,isAffected12);
								});
							}
						} else {
							var _g13 = $bind(this,this.check);
							var writeTo13 = writeTo;
							var isAffected13 = isAffected;
							hxsl_Tools.iter(e,function(e) {
								_g13(e,writeTo13,isAffected13);
							});
						}
					} else {
						var _g14 = $bind(this,this.check);
						var writeTo14 = writeTo;
						var isAffected14 = isAffected;
						hxsl_Tools.iter(e,function(e) {
							_g14(e,writeTo14,isAffected14);
						});
					}
					break;
				default:
					var _g15 = $bind(this,this.check);
					var writeTo15 = writeTo;
					var isAffected15 = isAffected;
					hxsl_Tools.iter(e,function(e) {
						_g15(e,writeTo15,isAffected15);
					});
				}
			} else {
				var _g16 = $bind(this,this.check);
				var writeTo16 = writeTo;
				var isAffected16 = isAffected;
				hxsl_Tools.iter(e,function(e) {
					_g16(e,writeTo16,isAffected16);
				});
			}
			break;
		case 10:
			var e1 = _g.econd;
			var eif = _g.eif;
			var eelse = _g.eelse;
			var affect = [];
			this.check(eif,writeTo,affect);
			if(eelse != null) {
				this.check(eelse,writeTo,affect);
			}
			var len = affect.length;
			var _g17 = 0;
			while(_g17 < writeTo.length) {
				var v = writeTo[_g17];
				++_g17;
				if(affect.indexOf(v) < 0) {
					affect.push(v);
				}
			}
			this.check(e1,affect,isAffected);
			var _g17 = 0;
			var _g18 = len;
			while(_g17 < _g18) {
				var i = _g17++;
				var v = affect[i];
				if(isAffected.indexOf(v) < 0) {
					isAffected.push(v);
				}
			}
			break;
		case 13:
			var v = _g.v;
			var it = _g.it;
			var loop = _g.loop;
			var affect = [];
			this.check(loop,writeTo,affect);
			this.check(it,affect,isAffected);
			var _g = 0;
			while(_g < affect.length) {
				var v = affect[_g];
				++_g;
				if(isAffected.indexOf(v) < 0) {
					isAffected.push(v);
				}
			}
			break;
		default:
			var _g = $bind(this,this.check);
			var writeTo17 = writeTo;
			var isAffected17 = isAffected;
			hxsl_Tools.iter(e,function(e) {
				_g(e,writeTo17,isAffected17);
			});
		}
	}
	,checkBranches: function(e) {
		var _g = e.e;
		if(_g._hx_index == 10) {
			var _g1 = _g.eif;
			var _g1 = _g.eelse;
			var cond = _g.econd;
			var writeTo = [null];
			this.check(cond,writeTo,[]);
		}
		hxsl_Tools.iter(e,$bind(this,this.checkBranches));
	}
	,mapExpr: function(e,isVar) {
		var _gthis = this;
		var _g = e.e;
		switch(_g._hx_index) {
		case 4:
			var el = _g.el;
			var out = [];
			var count = 0;
			var _g1 = 0;
			while(_g1 < el.length) {
				var e1 = el[_g1];
				++_g1;
				var isVar1 = isVar && count == el.length - 1;
				var e2 = this.mapExpr(e1,isVar1);
				if(hxsl_Tools.hasSideEffect(e2) || isVar1) {
					out.push(e2);
				}
				++count;
			}
			return { e : hxsl_TExprDef.TBlock(out), p : e.p, t : e.t};
		case 5:
			var _g1 = _g.op;
			var _g2 = _g.e1;
			var _g3 = _g.e2;
			switch(_g1._hx_index) {
			case 4:
				var _g3 = _g2.e;
				var _g4 = _g2.p;
				var _g4 = _g2.t;
				switch(_g3._hx_index) {
				case 1:
					var v = _g3.v;
					if(!this.get(v).used) {
						return { e : hxsl_TExprDef.TConst(hxsl_Const.CNull), t : e.t, p : e.p};
					} else {
						return hxsl_Tools.map(e,function(e) {
							return _gthis.mapExpr(e,true);
						});
					}
					break;
				case 9:
					var _g4 = _g3.e;
					var _g5 = _g3.regs;
					var _g3 = _g4.e;
					var _g5 = _g4.p;
					var _g5 = _g4.t;
					if(_g3._hx_index == 1) {
						var v = _g3.v;
						if(!this.get(v).used) {
							return { e : hxsl_TExprDef.TConst(hxsl_Const.CNull), t : e.t, p : e.p};
						} else {
							return hxsl_Tools.map(e,function(e) {
								return _gthis.mapExpr(e,true);
							});
						}
					} else {
						return hxsl_Tools.map(e,function(e) {
							return _gthis.mapExpr(e,true);
						});
					}
					break;
				default:
					return hxsl_Tools.map(e,function(e) {
						return _gthis.mapExpr(e,true);
					});
				}
				break;
			case 20:
				var _g3 = _g1.op;
				var _g1 = _g2.e;
				var _g3 = _g2.p;
				var _g3 = _g2.t;
				switch(_g1._hx_index) {
				case 1:
					var v = _g1.v;
					if(!this.get(v).used) {
						return { e : hxsl_TExprDef.TConst(hxsl_Const.CNull), t : e.t, p : e.p};
					} else {
						return hxsl_Tools.map(e,function(e) {
							return _gthis.mapExpr(e,true);
						});
					}
					break;
				case 9:
					var _g2 = _g1.e;
					var _g3 = _g1.regs;
					var _g1 = _g2.e;
					var _g3 = _g2.p;
					var _g3 = _g2.t;
					if(_g1._hx_index == 1) {
						var v = _g1.v;
						if(!this.get(v).used) {
							return { e : hxsl_TExprDef.TConst(hxsl_Const.CNull), t : e.t, p : e.p};
						} else {
							return hxsl_Tools.map(e,function(e) {
								return _gthis.mapExpr(e,true);
							});
						}
					} else {
						return hxsl_Tools.map(e,function(e) {
							return _gthis.mapExpr(e,true);
						});
					}
					break;
				default:
					return hxsl_Tools.map(e,function(e) {
						return _gthis.mapExpr(e,true);
					});
				}
				break;
			default:
				return hxsl_Tools.map(e,function(e) {
					return _gthis.mapExpr(e,true);
				});
			}
			break;
		case 7:
			var _g1 = _g.init;
			var v = _g.v;
			if(!this.get(v).used) {
				return { e : hxsl_TExprDef.TConst(hxsl_Const.CNull), t : e.t, p : e.p};
			} else {
				return hxsl_Tools.map(e,function(e) {
					return _gthis.mapExpr(e,true);
				});
			}
			break;
		case 8:
			var _g1 = _g.e;
			var _g2 = _g.args;
			var _g3 = _g1.e;
			var _g4 = _g1.p;
			var _g4 = _g1.t;
			if(_g3._hx_index == 2) {
				switch(_g3.g._hx_index) {
				case 63:
					if(_g2.length == 3) {
						var _g1 = _g2[0];
						var _g1 = _g2[2];
						var _g3 = _g1.e;
						var _g4 = _g1.p;
						var _g4 = _g1.t;
						if(_g3._hx_index == 0) {
							var _g1 = _g3.c;
							if(_g1._hx_index == 2) {
								var cid = _g1.v;
								var uv = _g2[1];
								var c = this.channelVars[cid];
								return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Texture), p : e.p, t : hxsl_Type.TVoid},[{ e : hxsl_TExprDef.TVar(c), t : c.type, p : e.p},this.mapExpr(uv,true)]), t : hxsl_Type.TVoid, p : e.p};
							} else {
								return hxsl_Tools.map(e,function(e) {
									return _gthis.mapExpr(e,true);
								});
							}
						} else {
							return hxsl_Tools.map(e,function(e) {
								return _gthis.mapExpr(e,true);
							});
						}
					} else {
						return hxsl_Tools.map(e,function(e) {
							return _gthis.mapExpr(e,true);
						});
					}
					break;
				case 64:
					if(_g2.length == 4) {
						var _g1 = _g2[0];
						var _g1 = _g2[3];
						var _g3 = _g1.e;
						var _g4 = _g1.p;
						var _g4 = _g1.t;
						if(_g3._hx_index == 0) {
							var _g1 = _g3.c;
							if(_g1._hx_index == 2) {
								var cid = _g1.v;
								var lod = _g2[2];
								var uv = _g2[1];
								var c = this.channelVars[cid];
								return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.TextureLod), p : e.p, t : hxsl_Type.TVoid},[{ e : hxsl_TExprDef.TVar(c), t : c.type, p : e.p},this.mapExpr(uv,true),this.mapExpr(lod,true)]), t : hxsl_Type.TVoid, p : e.p};
							} else {
								return hxsl_Tools.map(e,function(e) {
									return _gthis.mapExpr(e,true);
								});
							}
						} else {
							return hxsl_Tools.map(e,function(e) {
								return _gthis.mapExpr(e,true);
							});
						}
					} else {
						return hxsl_Tools.map(e,function(e) {
							return _gthis.mapExpr(e,true);
						});
					}
					break;
				case 65:
					switch(_g2.length) {
					case 3:
						var _g1 = _g2[0];
						var _g1 = _g2[2];
						var _g3 = _g1.e;
						var _g4 = _g1.p;
						var _g4 = _g1.t;
						if(_g3._hx_index == 0) {
							var _g1 = _g3.c;
							if(_g1._hx_index == 2) {
								var cid = _g1.v;
								var pos = _g2[1];
								var c = this.channelVars[cid];
								return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Texel), p : e.p, t : hxsl_Type.TVoid},[{ e : hxsl_TExprDef.TVar(c), t : c.type, p : e.p},this.mapExpr(pos,true)]), t : hxsl_Type.TVoid, p : e.p};
							} else {
								return hxsl_Tools.map(e,function(e) {
									return _gthis.mapExpr(e,true);
								});
							}
						} else {
							return hxsl_Tools.map(e,function(e) {
								return _gthis.mapExpr(e,true);
							});
						}
						break;
					case 4:
						var _g1 = _g2[0];
						var _g1 = _g2[3];
						var _g3 = _g1.e;
						var _g4 = _g1.p;
						var _g4 = _g1.t;
						if(_g3._hx_index == 0) {
							var _g1 = _g3.c;
							if(_g1._hx_index == 2) {
								var cid = _g1.v;
								var lod = _g2[2];
								var pos = _g2[1];
								var c = this.channelVars[cid];
								return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Texel), p : e.p, t : hxsl_Type.TVoid},[{ e : hxsl_TExprDef.TVar(c), t : c.type, p : e.p},this.mapExpr(pos,true),this.mapExpr(lod,true)]), t : hxsl_Type.TVoid, p : e.p};
							} else {
								return hxsl_Tools.map(e,function(e) {
									return _gthis.mapExpr(e,true);
								});
							}
						} else {
							return hxsl_Tools.map(e,function(e) {
								return _gthis.mapExpr(e,true);
							});
						}
						break;
					default:
						return hxsl_Tools.map(e,function(e) {
							return _gthis.mapExpr(e,true);
						});
					}
					break;
				case 66:
					switch(_g2.length) {
					case 2:
						var _g1 = _g2[0];
						var _g1 = _g2[1];
						var _g3 = _g1.e;
						var _g4 = _g1.p;
						var _g4 = _g1.t;
						if(_g3._hx_index == 0) {
							var _g1 = _g3.c;
							if(_g1._hx_index == 2) {
								var cid = _g1.v;
								var c = this.channelVars[cid];
								return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.TextureSize), p : e.p, t : hxsl_Type.TVoid},[{ e : hxsl_TExprDef.TVar(c), t : c.type, p : e.p}]), t : hxsl_Type.TVoid, p : e.p};
							} else {
								return hxsl_Tools.map(e,function(e) {
									return _gthis.mapExpr(e,true);
								});
							}
						} else {
							return hxsl_Tools.map(e,function(e) {
								return _gthis.mapExpr(e,true);
							});
						}
						break;
					case 3:
						var _g1 = _g2[0];
						var _g1 = _g2[2];
						var _g3 = _g1.e;
						var _g4 = _g1.p;
						var _g4 = _g1.t;
						if(_g3._hx_index == 0) {
							var _g1 = _g3.c;
							if(_g1._hx_index == 2) {
								var cid = _g1.v;
								var lod = _g2[1];
								var c = this.channelVars[cid];
								return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.TextureSize), p : e.p, t : hxsl_Type.TVoid},[{ e : hxsl_TExprDef.TVar(c), t : c.type, p : e.p},this.mapExpr(lod,true)]), t : hxsl_Type.TVoid, p : e.p};
							} else {
								return hxsl_Tools.map(e,function(e) {
									return _gthis.mapExpr(e,true);
								});
							}
						} else {
							return hxsl_Tools.map(e,function(e) {
								return _gthis.mapExpr(e,true);
							});
						}
						break;
					default:
						return hxsl_Tools.map(e,function(e) {
							return _gthis.mapExpr(e,true);
						});
					}
					break;
				default:
					return hxsl_Tools.map(e,function(e) {
						return _gthis.mapExpr(e,true);
					});
				}
			} else {
				return hxsl_Tools.map(e,function(e) {
					return _gthis.mapExpr(e,true);
				});
			}
			break;
		case 10:
			var e1 = _g.econd;
			var econd = _g.eif;
			var eelse = _g.eelse;
			var e2 = this.mapExpr(e1,true);
			var econd1 = this.mapExpr(econd,isVar);
			var eelse1 = eelse == null ? null : this.mapExpr(eelse,isVar);
			if(!isVar && !hxsl_Tools.hasSideEffect(econd1) && (eelse1 == null || !hxsl_Tools.hasSideEffect(eelse1))) {
				return { e : hxsl_TExprDef.TConst(hxsl_Const.CNull), t : e2.t, p : e2.p};
			}
			return { e : hxsl_TExprDef.TIf(e2,econd1,eelse1), p : e2.p, t : e2.t};
		case 13:
			var v = _g.v;
			var it = _g.it;
			var loop = _g.loop;
			var it1 = this.mapExpr(it,true);
			var loop1 = this.mapExpr(loop,false);
			if(!hxsl_Tools.hasSideEffect(loop1)) {
				return { e : hxsl_TExprDef.TConst(hxsl_Const.CNull), t : e.t, p : e.p};
			}
			return { e : hxsl_TExprDef.TFor(v,it1,loop1), p : e.p, t : e.t};
		default:
			return hxsl_Tools.map(e,function(e) {
				return _gthis.mapExpr(e,true);
			});
		}
	}
	,__class__: hxsl_Dce
};
var hxsl_Eval = function() {
	this.varMap = new haxe_ds_ObjectMap();
	this.funMap = new haxe_ds_ObjectMap();
	this.constants = new haxe_ds_IntMap();
};
hxsl_Eval.__name__ = "hxsl.Eval";
hxsl_Eval.prototype = {
	setConstant: function(v,c) {
		this.constants.h[v.id] = hxsl_TExprDef.TConst(c);
	}
	,mapVar: function(v) {
		var v2 = this.varMap.h[v.__id__];
		if(v2 != null) {
			if(v == v2) {
				return v2;
			} else {
				return this.mapVar(v2);
			}
		}
		if(v.parent != null) {
			this.mapVar(v.parent);
			v2 = this.varMap.h[v.__id__];
			if(v2 != null) {
				if(v == v2) {
					return v2;
				} else {
					return this.mapVar(v2);
				}
			}
		}
		var _g = v.type;
		var v21;
		if(_g._hx_index == 17) {
			var _g1 = _g.size;
			v21 = true;
		} else {
			v21 = false;
		}
		v2 = { id : v21 ? v.id : hxsl_Tools.allocVarId(), name : v.name, type : v.type, kind : v.kind};
		if(v.parent != null) {
			v2.parent = this.mapVar(v.parent);
		}
		if(v.qualifiers != null) {
			v2.qualifiers = v.qualifiers.slice();
		}
		this.varMap.set(v,v2);
		this.varMap.set(v2,v2);
		var _g = v2.type;
		switch(_g._hx_index) {
		case 13:
			var vl = _g.vl;
			var _g1 = [];
			var _g2 = 0;
			while(_g2 < vl.length) {
				var v = vl[_g2];
				++_g2;
				_g1.push(this.mapVar(v));
			}
			v2.type = hxsl_Type.TStruct(_g1);
			break;
		case 15:
			var _g1 = _g.size;
			if(_g1._hx_index == 1) {
				var vs = _g1.v;
				var t = _g.t;
				var c = this.constants.h[vs.id];
				if(c != null) {
					if(c == null) {
						hxsl_Error.t("Integer value expected for array size constant " + vs.name,null);
					} else if(c._hx_index == 0) {
						var _g1 = c.c;
						if(_g1._hx_index == 2) {
							var v = _g1.v;
							var _g1 = v2.type;
							var tmp;
							if(_g1._hx_index == 15) {
								var _g2 = _g1.t;
								var _g2 = _g1.size;
								tmp = true;
							} else {
								tmp = false;
							}
							v2.type = tmp ? hxsl_Type.TArray(t,hxsl_SizeDecl.SConst(v)) : hxsl_Type.TBuffer(t,hxsl_SizeDecl.SConst(v));
						} else {
							hxsl_Error.t("Integer value expected for array size constant " + vs.name,null);
						}
					} else {
						hxsl_Error.t("Integer value expected for array size constant " + vs.name,null);
					}
				} else {
					var vs2 = this.mapVar(vs);
					var _g1 = v2.type;
					var tmp;
					if(_g1._hx_index == 15) {
						var _g2 = _g1.t;
						var _g2 = _g1.size;
						tmp = true;
					} else {
						tmp = false;
					}
					v2.type = tmp ? hxsl_Type.TArray(t,hxsl_SizeDecl.SVar(vs2)) : hxsl_Type.TBuffer(t,hxsl_SizeDecl.SVar(vs2));
				}
			}
			break;
		case 16:
			var _g1 = _g.size;
			if(_g1._hx_index == 1) {
				var vs = _g1.v;
				var t = _g.t;
				var c = this.constants.h[vs.id];
				if(c != null) {
					if(c == null) {
						hxsl_Error.t("Integer value expected for array size constant " + vs.name,null);
					} else if(c._hx_index == 0) {
						var _g = c.c;
						if(_g._hx_index == 2) {
							var v = _g.v;
							var _g = v2.type;
							var tmp;
							if(_g._hx_index == 15) {
								var _g1 = _g.t;
								var _g1 = _g.size;
								tmp = true;
							} else {
								tmp = false;
							}
							v2.type = tmp ? hxsl_Type.TArray(t,hxsl_SizeDecl.SConst(v)) : hxsl_Type.TBuffer(t,hxsl_SizeDecl.SConst(v));
						} else {
							hxsl_Error.t("Integer value expected for array size constant " + vs.name,null);
						}
					} else {
						hxsl_Error.t("Integer value expected for array size constant " + vs.name,null);
					}
				} else {
					var vs2 = this.mapVar(vs);
					var _g = v2.type;
					var tmp;
					if(_g._hx_index == 15) {
						var _g1 = _g.t;
						var _g1 = _g.size;
						tmp = true;
					} else {
						tmp = false;
					}
					v2.type = tmp ? hxsl_Type.TArray(t,hxsl_SizeDecl.SVar(vs2)) : hxsl_Type.TBuffer(t,hxsl_SizeDecl.SVar(vs2));
				}
			}
			break;
		default:
		}
		return v2;
	}
	,checkSamplerRec: function(t) {
		if(hxsl_Tools.isSampler(t)) {
			return true;
		}
		switch(t._hx_index) {
		case 13:
			var vl = t.vl;
			var _g = 0;
			while(_g < vl.length) {
				var v = vl[_g];
				++_g;
				if(this.checkSamplerRec(v.type)) {
					return true;
				}
			}
			return false;
		case 15:
			var _g = t.size;
			var t1 = t.t;
			return this.checkSamplerRec(t1);
		case 16:
			var _g = t.t;
			var size = t.size;
			return true;
		default:
		}
		return false;
	}
	,needsInline: function(f) {
		var _g = 0;
		var _g1 = f.args;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(this.checkSamplerRec(a.type)) {
				return true;
			}
		}
		return false;
	}
	,'eval': function(s) {
		var funs = [];
		var _g = 0;
		var _g1 = s.funs;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			var f1 = f.kind;
			var f2 = this.mapVar(f.ref);
			var _g2 = [];
			var _g3 = 0;
			var _g4 = f.args;
			while(_g3 < _g4.length) {
				var a = _g4[_g3];
				++_g3;
				_g2.push(this.mapVar(a));
			}
			var f21 = { kind : f1, ref : f2, args : _g2, ret : f.ret, expr : f.expr};
			if(f.kind == hxsl_FunctionKind.Helper && this.inlineCalls || this.needsInline(f21)) {
				this.funMap.set(f21.ref,f);
			} else {
				funs.push(f21);
			}
		}
		var _g = 0;
		var _g1 = funs.length;
		while(_g < _g1) {
			var i = _g++;
			this.curFun = funs[i];
			this.curFun.expr = this.evalExpr(this.curFun.expr,false);
		}
		var s1 = s.name;
		var _g = [];
		var _g1 = 0;
		var _g2 = s.vars;
		while(_g1 < _g2.length) {
			var v = _g2[_g1];
			++_g1;
			_g.push(this.mapVar(v));
		}
		return { name : s1, vars : _g, funs : funs};
	}
	,hasReturn: function(e) {
		this.markReturn = false;
		this.hasReturnLoop(e);
		return this.markReturn;
	}
	,hasReturnLoop: function(e) {
		var _g = e.e;
		if(_g._hx_index == 12) {
			var _g1 = _g.e;
			this.markReturn = true;
		} else if(!this.markReturn) {
			hxsl_Tools.iter(e,$bind(this,this.hasReturnLoop));
		}
	}
	,handleReturn: function(e,isFinal) {
		if(isFinal == null) {
			isFinal = false;
		}
		var _g = e.e;
		switch(_g._hx_index) {
		case 3:
			var v = _g.e;
			var v1 = this.handleReturn(v,isFinal);
			return { e : hxsl_TExprDef.TParenthesis(v1), t : v1.t, p : e.p};
		case 4:
			var el = _g.el;
			var i = 0;
			var last = el.length;
			var out = [];
			_hx_loop1: while(i < last) {
				var e1 = el[i++];
				if(i == last) {
					out.push(this.handleReturn(e1,isFinal));
				} else {
					var _g1 = e1.e;
					switch(_g1._hx_index) {
					case 10:
						if(_g1.eelse == null) {
							var eif = _g1.eif;
							var econd = _g1.econd;
							if(isFinal && this.hasReturn(eif)) {
								out.push(this.handleReturn({ e : hxsl_TExprDef.TIf(econd,eif,{ e : hxsl_TExprDef.TBlock(el.slice(i)), t : e1.t, p : e1.p}), t : e1.t, p : e1.p}));
								break _hx_loop1;
							} else {
								out.push(this.handleReturn(e1));
							}
						} else {
							out.push(this.handleReturn(e1));
						}
						break;
					case 12:
						var e2 = _g1.e;
						out.push(this.handleReturn(e2,isFinal));
						break _hx_loop1;
					default:
						out.push(this.handleReturn(e1));
					}
				}
			}
			var t = isFinal ? out[out.length - 1].t : e.t;
			return { e : hxsl_TExprDef.TBlock(out), t : t, p : e.p};
		case 10:
			var cond = _g.econd;
			var eif = _g.eif;
			var eelse = _g.eelse;
			if(eelse != null && isFinal) {
				var cond1 = this.handleReturn(cond);
				var eif1 = this.handleReturn(eif,isFinal);
				return { e : hxsl_TExprDef.TIf(cond1,eif1,this.handleReturn(eelse,isFinal)), t : eif1.t, p : e.p};
			} else {
				return hxsl_Tools.map(e,$bind(this,this.handleReturnDef));
			}
			break;
		case 12:
			var v = _g.e;
			if(!isFinal) {
				hxsl_Error.t("Cannot inline not final return",e.p);
			}
			if(v == null) {
				return { e : hxsl_TExprDef.TBlock([]), t : hxsl_Type.TVoid, p : e.p};
			}
			return this.handleReturn(v,true);
		default:
			return hxsl_Tools.map(e,$bind(this,this.handleReturnDef));
		}
	}
	,handleReturnDef: function(e) {
		return this.handleReturn(e);
	}
	,evalCall: function(g,args,oldArgs,pos) {
		switch(g._hx_index) {
		case 38:
			if(args.length == 1) {
				var _g = args[0];
				var _g1 = _g.e;
				var _g2 = _g.p;
				var _g2 = _g.t;
				if(_g1._hx_index == 0) {
					var _g = _g1.c;
					if(_g._hx_index == 2) {
						var i = _g.v;
						return hxsl_TExprDef.TConst(hxsl_Const.CFloat(i));
					} else {
						return null;
					}
				} else {
					return null;
				}
			} else {
				return null;
			}
			break;
		case 63:case 64:
			var i;
			var _g = args[0].e;
			if(_g._hx_index == 0) {
				var _g1 = _g.c;
				if(_g1._hx_index == 2) {
					var i1 = _g1.v;
					i = i1;
				} else {
					hxsl_Error.t("Cannot eval complex channel " + hxsl_Printer.toString(args[0],true) + " " + this.constantsToString(),pos);
					throw haxe_Exception.thrown("assert");
				}
			} else {
				hxsl_Error.t("Cannot eval complex channel " + hxsl_Printer.toString(args[0],true) + " " + this.constantsToString(),pos);
				throw haxe_Exception.thrown("assert");
			}
			var channel = oldArgs[0];
			var _g = channel.e;
			var channel1;
			if(_g._hx_index == 1) {
				var v = _g.v;
				channel1 = hxsl_TExprDef.TVar(this.mapVar(v));
			} else {
				throw haxe_Exception.thrown("assert");
			}
			channel = { e : channel1, t : channel.t, p : channel.p};
			var count;
			var _g = channel.t;
			if(_g._hx_index == 17) {
				var i1 = _g.size;
				count = i1;
			} else {
				throw haxe_Exception.thrown("assert");
			}
			var channelMode = Type.createEnumIndex(hxsl_Channel,i & 7,null);
			var targs = [channel];
			var _g = 1;
			var _g1 = args.length;
			while(_g < _g1) {
				var i1 = _g++;
				targs.push(args[i1]);
			}
			targs.push({ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(i >> 3)), t : hxsl_Type.TInt, p : pos});
			var tget = { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(g), t : hxsl_Type.TVoid, p : pos},targs), t : hxsl_Type.TVoid, p : pos};
			switch(channelMode._hx_index) {
			case 0:
				var zero = { e : hxsl_TExprDef.TConst(hxsl_Const.CFloat(0.)), t : hxsl_Type.TFloat, p : pos};
				if(count == 1) {
					return zero.e;
				}
				return hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal([hxsl_TGlobal.Vec2,hxsl_TGlobal.Vec3,hxsl_TGlobal.Vec4][count - 2]), t : hxsl_Type.TVoid, p : pos},[zero]);
			case 1:case 2:case 3:case 4:
				var tmp;
				switch(count) {
				case 1:
					switch(channelMode._hx_index) {
					case 1:
						tmp = [hxsl_Component.X];
						break;
					case 2:
						tmp = [hxsl_Component.Y];
						break;
					case 3:
						tmp = [hxsl_Component.Z];
						break;
					case 4:
						tmp = [hxsl_Component.W];
						break;
					default:
						throw haxe_Exception.thrown("Invalid channel value " + Std.string(channelMode) + " for " + count + " channels");
					}
					break;
				case 2:
					switch(channelMode._hx_index) {
					case 1:
						tmp = [hxsl_Component.X,hxsl_Component.Y];
						break;
					case 2:
						tmp = [hxsl_Component.Y,hxsl_Component.Z];
						break;
					case 3:
						tmp = [hxsl_Component.Z,hxsl_Component.W];
						break;
					default:
						throw haxe_Exception.thrown("Invalid channel value " + Std.string(channelMode) + " for " + count + " channels");
					}
					break;
				case 3:
					switch(channelMode._hx_index) {
					case 1:
						tmp = [hxsl_Component.X,hxsl_Component.Y,hxsl_Component.Z];
						break;
					case 2:
						tmp = [hxsl_Component.Y,hxsl_Component.Z,hxsl_Component.W];
						break;
					default:
						throw haxe_Exception.thrown("Invalid channel value " + Std.string(channelMode) + " for " + count + " channels");
					}
					break;
				default:
					throw haxe_Exception.thrown("Invalid channel value " + Std.string(channelMode) + " for " + count + " channels");
				}
				return hxsl_TExprDef.TSwiz(tget,tmp);
			case 5:
				return hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Unpack), t : hxsl_Type.TVoid, p : pos},[tget]);
			case 6:
				return hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.UnpackNormal), t : hxsl_Type.TVoid, p : pos},[tget]);
			}
			break;
		case 67:
			var args1 = args;
			var _g = 0;
			while(_g < args1.length) {
				var a = args1[_g];
				++_g;
				haxe_Log.trace(hxsl_Printer.toString(a),{ fileName : a.p.file, lineNumber : 0, className : null, methodName : null});
			}
			return hxsl_TExprDef.TBlock([]);
		default:
			return null;
		}
	}
	,constantsToString: function() {
		var _g = [];
		var c = this.constants.keys();
		while(c.hasNext()) {
			var c1 = c.next();
			_g.push(c1 + " => " + hxsl_Printer.toString({ e : this.constants.h[c1], t : hxsl_Type.TVoid, p : null},true));
		}
		return _g.toString();
	}
	,ifBlock: function(e) {
		var tmp;
		if(e != null) {
			var _g = e.e;
			var tmp1;
			if(_g._hx_index == 10) {
				var _g1 = _g.econd;
				var _g1 = _g.eif;
				var _g1 = _g.eelse;
				tmp1 = true;
			} else {
				tmp1 = false;
			}
			tmp = !tmp1;
		} else {
			tmp = true;
		}
		if(tmp) {
			return e;
		}
		return { e : hxsl_TExprDef.TBlock([e]), t : e.t, p : e.p};
	}
	,evalExpr: function(e,isVal) {
		if(isVal == null) {
			isVal = true;
		}
		var _gthis = this;
		var d;
		var _g = e.e;
		switch(_g._hx_index) {
		case 0:
			var _g1 = _g.c;
			d = e.e;
			break;
		case 1:
			var v = _g.v;
			var c = this.constants.h[v.id];
			if(c != null) {
				d = c;
			} else {
				var v2 = this.mapVar(v);
				d = hxsl_TExprDef.TVar(v2);
			}
			break;
		case 2:
			var _g1 = _g.g;
			d = e.e;
			break;
		case 3:
			var e1 = _g.e;
			var e2 = this.evalExpr(e1,isVal);
			var _g1 = e2.e;
			if(_g1._hx_index == 0) {
				var _g2 = _g1.c;
				d = e2.e;
			} else {
				d = hxsl_TExprDef.TParenthesis(e2);
			}
			break;
		case 4:
			var el = _g.el;
			var out = [];
			var last = el.length - 1;
			var _g1 = 0;
			var _g2 = el.length;
			while(_g1 < _g2) {
				var i = _g1++;
				var isVal1 = isVal && i == last;
				var e1 = this.evalExpr(el[i],isVal1);
				var _g3 = e1.e;
				switch(_g3._hx_index) {
				case 0:
					var _g4 = _g3.c;
					if(isVal1) {
						out.push(e1);
					}
					break;
				case 1:
					var _g5 = _g3.v;
					if(isVal1) {
						out.push(e1);
					}
					break;
				default:
					out.push(e1);
				}
			}
			d = out.length == 1 && this.curFun.kind != hxsl_FunctionKind.Init ? out[0].e : hxsl_TExprDef.TBlock(out);
			break;
		case 5:
			var op = _g.op;
			var e1 = _g.e1;
			var e2 = _g.e2;
			var e11 = this.evalExpr(e1);
			var e21 = this.evalExpr(e2);
			switch(op._hx_index) {
			case 0:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					switch(_g3._hx_index) {
					case 2:
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 2) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a + b | 0));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 3:
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 3) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CFloat(a + b));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					default:
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 1:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					switch(_g3._hx_index) {
					case 2:
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 2) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a * b | 0));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 3:
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 3) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CFloat(a * b));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					default:
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 2:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					switch(_g3._hx_index) {
					case 2:
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 2) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a / b | 0));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 3:
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 3) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CFloat(a / b));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					default:
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 3:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					switch(_g3._hx_index) {
					case 2:
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 2) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a - b | 0));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 3:
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 3) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CFloat(a - b));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					default:
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 4:case 21:
				d = hxsl_TExprDef.TBinop(op,e11,e21);
				break;
			case 5:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					switch(_g3._hx_index) {
					case 0:
						d = _g2._hx_index == 0 ? _g2.c._hx_index == 0 ? hxsl_TExprDef.TConst(hxsl_Const.CBool(true)) : hxsl_TExprDef.TConst(hxsl_Const.CBool(false)) : hxsl_TExprDef.TBinop(op,e11,e21);
						break;
					case 1:
						var _g1 = _g3.b;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
								break;
							case 1:
								var b = _g4.b;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a == b ? 0 : 1) == 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 2:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
								break;
							case 2:
								var b = _g4.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a - b == 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 3:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
								break;
							case 3:
								var b = _g4.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a > b ? 1 : a == b ? 0 : -1) == 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 4:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g3 = _g2.c;
							switch(_g3._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
								break;
							case 4:
								var b = _g3.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a > b ? 1 : a == b ? 0 : -1) == 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 6:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					switch(_g3._hx_index) {
					case 0:
						d = _g2._hx_index == 0 ? _g2.c._hx_index == 0 ? hxsl_TExprDef.TConst(hxsl_Const.CBool(false)) : hxsl_TExprDef.TConst(hxsl_Const.CBool(true)) : hxsl_TExprDef.TBinop(op,e11,e21);
						break;
					case 1:
						var _g1 = _g3.b;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
								break;
							case 1:
								var b = _g4.b;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a == b ? 0 : 1) != 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 2:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
								break;
							case 2:
								var b = _g4.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a - b != 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 3:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
								break;
							case 3:
								var b = _g4.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a > b ? 1 : a == b ? 0 : -1) != 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 4:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g3 = _g2.c;
							switch(_g3._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
								break;
							case 4:
								var b = _g3.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a > b ? 1 : a == b ? 0 : -1) != 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 7:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					switch(_g3._hx_index) {
					case 0:
						d = _g2._hx_index == 0 ? _g2.c._hx_index == 0 ? hxsl_TExprDef.TConst(hxsl_Const.CBool(false)) : hxsl_TExprDef.TConst(hxsl_Const.CBool(false)) : hxsl_TExprDef.TBinop(op,e11,e21);
						break;
					case 1:
						var _g1 = _g3.b;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
								break;
							case 1:
								var b = _g4.b;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a == b ? 0 : 1) > 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 2:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
								break;
							case 2:
								var b = _g4.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a - b > 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 3:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
								break;
							case 3:
								var b = _g4.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a > b ? 1 : a == b ? 0 : -1) > 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 4:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g3 = _g2.c;
							switch(_g3._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
								break;
							case 4:
								var b = _g3.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a > b ? 1 : a == b ? 0 : -1) > 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 8:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					switch(_g3._hx_index) {
					case 0:
						d = _g2._hx_index == 0 ? _g2.c._hx_index == 0 ? hxsl_TExprDef.TConst(hxsl_Const.CBool(true)) : hxsl_TExprDef.TConst(hxsl_Const.CBool(false)) : hxsl_TExprDef.TBinop(op,e11,e21);
						break;
					case 1:
						var _g1 = _g3.b;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
								break;
							case 1:
								var b = _g4.b;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a == b ? 0 : 1) >= 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 2:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
								break;
							case 2:
								var b = _g4.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a - b >= 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 3:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
								break;
							case 3:
								var b = _g4.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a > b ? 1 : a == b ? 0 : -1) >= 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 4:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g3 = _g2.c;
							switch(_g3._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(true));
								break;
							case 4:
								var b = _g3.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a > b ? 1 : a == b ? 0 : -1) >= 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 9:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					switch(_g3._hx_index) {
					case 0:
						d = _g2._hx_index == 0 ? _g2.c._hx_index == 0 ? hxsl_TExprDef.TConst(hxsl_Const.CBool(false)) : hxsl_TExprDef.TConst(hxsl_Const.CBool(true)) : hxsl_TExprDef.TBinop(op,e11,e21);
						break;
					case 1:
						var _g1 = _g3.b;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
								break;
							case 1:
								var b = _g4.b;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a == b ? 0 : 1) < 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 2:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
								break;
							case 2:
								var b = _g4.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a - b < 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 3:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
								break;
							case 3:
								var b = _g4.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a > b ? 1 : a == b ? 0 : -1) < 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 4:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g3 = _g2.c;
							switch(_g3._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
								break;
							case 4:
								var b = _g3.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a > b ? 1 : a == b ? 0 : -1) < 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 10:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					switch(_g3._hx_index) {
					case 0:
						d = _g2._hx_index == 0 ? _g2.c._hx_index == 0 ? hxsl_TExprDef.TConst(hxsl_Const.CBool(true)) : hxsl_TExprDef.TConst(hxsl_Const.CBool(true)) : hxsl_TExprDef.TBinop(op,e11,e21);
						break;
					case 1:
						var _g1 = _g3.b;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
								break;
							case 1:
								var b = _g4.b;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a == b ? 0 : 1) <= 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 2:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
								break;
							case 2:
								var b = _g4.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a - b <= 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 3:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g4 = _g2.c;
							switch(_g4._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
								break;
							case 3:
								var b = _g4.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a > b ? 1 : a == b ? 0 : -1) <= 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 4:
						var _g1 = _g3.v;
						if(_g2._hx_index == 0) {
							var _g3 = _g2.c;
							switch(_g3._hx_index) {
							case 0:
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(false));
								break;
							case 4:
								var b = _g3.v;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool((a > b ? 1 : a == b ? 0 : -1) <= 0));
								break;
							default:
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 11:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					if(_g3._hx_index == 2) {
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 2) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a & b));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
					} else {
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 12:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					if(_g3._hx_index == 2) {
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 2) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a | b));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
					} else {
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 13:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					if(_g3._hx_index == 2) {
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 2) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a ^ b));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
					} else {
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 14:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					if(_g3._hx_index == 1) {
						var _g1 = _g3.b;
						if(_g2._hx_index == 0) {
							var _g3 = _g2.c;
							if(_g3._hx_index == 1) {
								var b = _g3.b;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a && b));
							} else {
								var a = _g1;
								d = a == false ? hxsl_TExprDef.TConst(hxsl_Const.CBool(a)) : e21.e;
							}
						} else {
							var a = _g1;
							d = a == false ? hxsl_TExprDef.TConst(hxsl_Const.CBool(a)) : e21.e;
						}
					} else if(_g2._hx_index == 0) {
						var _g1 = _g2.c;
						if(_g1._hx_index == 1) {
							var a = _g1.b;
							d = a == false ? hxsl_TExprDef.TConst(hxsl_Const.CBool(a)) : e11.e;
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
					} else {
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else if(_g2._hx_index == 0) {
					var _g1 = _g2.c;
					if(_g1._hx_index == 1) {
						var a = _g1.b;
						d = a == false ? hxsl_TExprDef.TConst(hxsl_Const.CBool(a)) : e11.e;
					} else {
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 15:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					if(_g3._hx_index == 1) {
						var _g1 = _g3.b;
						if(_g2._hx_index == 0) {
							var _g3 = _g2.c;
							if(_g3._hx_index == 1) {
								var b = _g3.b;
								var a = _g1;
								d = hxsl_TExprDef.TConst(hxsl_Const.CBool(a || b));
							} else {
								var a = _g1;
								d = a == true ? hxsl_TExprDef.TConst(hxsl_Const.CBool(a)) : e21.e;
							}
						} else {
							var a = _g1;
							d = a == true ? hxsl_TExprDef.TConst(hxsl_Const.CBool(a)) : e21.e;
						}
					} else if(_g2._hx_index == 0) {
						var _g1 = _g2.c;
						if(_g1._hx_index == 1) {
							var a = _g1.b;
							d = a == true ? hxsl_TExprDef.TConst(hxsl_Const.CBool(a)) : e11.e;
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
					} else {
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else if(_g2._hx_index == 0) {
					var _g1 = _g2.c;
					if(_g1._hx_index == 1) {
						var a = _g1.b;
						d = a == true ? hxsl_TExprDef.TConst(hxsl_Const.CBool(a)) : e11.e;
					} else {
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 16:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					if(_g3._hx_index == 2) {
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 2) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a << b));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
					} else {
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 17:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					if(_g3._hx_index == 2) {
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 2) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a >> b));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
					} else {
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 18:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					if(_g3._hx_index == 2) {
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 2) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a >>> b));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
					} else {
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 19:
				var _g1 = e11.e;
				var _g2 = e21.e;
				if(_g1._hx_index == 0) {
					var _g3 = _g1.c;
					switch(_g3._hx_index) {
					case 2:
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 2) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CInt(a % b | 0));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					case 3:
						if(_g2._hx_index == 0) {
							var _g1 = _g2.c;
							if(_g1._hx_index == 3) {
								var b = _g1.v;
								var a = _g3.v;
								d = hxsl_TExprDef.TConst(hxsl_Const.CFloat(a % b));
							} else {
								d = hxsl_TExprDef.TBinop(op,e11,e21);
							}
						} else {
							d = hxsl_TExprDef.TBinop(op,e11,e21);
						}
						break;
					default:
						d = hxsl_TExprDef.TBinop(op,e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TBinop(op,e11,e21);
				}
				break;
			case 20:
				var _g1 = op.op;
				d = hxsl_TExprDef.TBinop(op,e11,e21);
				break;
			case 22:
				throw haxe_Exception.thrown("assert");
			case 23:
				throw haxe_Exception.thrown("assert");
			}
			break;
		case 6:
			var op = _g.op;
			var e1 = _g.e1;
			var e2 = this.evalExpr(e1);
			var _g1 = e2.e;
			if(_g1._hx_index == 0) {
				var c = _g1.c;
				switch(op._hx_index) {
				case 2:
					if(c._hx_index == 1) {
						var b = c.b;
						d = hxsl_TExprDef.TConst(hxsl_Const.CBool(!b));
					} else {
						d = hxsl_TExprDef.TUnop(op,e2);
					}
					break;
				case 3:
					switch(c._hx_index) {
					case 2:
						var i = c.v;
						d = hxsl_TExprDef.TConst(hxsl_Const.CInt(-i));
						break;
					case 3:
						var f = c.v;
						d = hxsl_TExprDef.TConst(hxsl_Const.CFloat(-f));
						break;
					default:
						d = hxsl_TExprDef.TUnop(op,e2);
					}
					break;
				default:
					d = hxsl_TExprDef.TUnop(op,e2);
				}
			} else {
				d = hxsl_TExprDef.TUnop(op,e2);
			}
			break;
		case 7:
			var v = _g.v;
			var init = _g.init;
			d = hxsl_TExprDef.TVarDecl(this.mapVar(v),init == null ? null : this.evalExpr(init));
			break;
		case 8:
			var c = _g.e;
			var eargs = _g.args;
			var c1 = this.evalExpr(c);
			var _g1 = [];
			var _g2 = 0;
			while(_g2 < eargs.length) {
				var a = eargs[_g2];
				++_g2;
				_g1.push(this.evalExpr(a));
			}
			var args = _g1;
			var _g1 = c1.e;
			switch(_g1._hx_index) {
			case 1:
				var v = _g1.v;
				if(this.funMap.h.__keys__[v.__id__] != null) {
					var f = this.funMap.h[v.__id__];
					var outExprs = [];
					var undo = [];
					var _g2 = 0;
					var _g3 = f.args.length;
					while(_g2 < _g3) {
						var i = _g2++;
						var v = [f.args[i]];
						var e1 = args[i];
						var _g4 = e1.e;
						switch(_g4._hx_index) {
						case 0:
							var _g5 = _g4.c;
							var old = [this.constants.h[v[0].id]];
							undo.push((function(old,v) {
								return function() {
									if(old[0] == null) {
										_gthis.constants.remove(v[0].id);
									} else {
										_gthis.constants.h[v[0].id] = old[0];
									}
								};
							})(old,v));
							this.constants.h[v[0].id] = e1.e;
							break;
						case 1:
							var _g6 = _g4.v;
							var _g7 = _g6.id;
							var _g8 = _g6.name;
							var _g9 = _g6.parent;
							var _g10 = _g6.qualifiers;
							var _g11 = _g6.type;
							switch(_g6.kind._hx_index) {
							case 0:case 1:case 2:
								var old1 = [this.constants.h[v[0].id]];
								undo.push((function(old,v) {
									return function() {
										if(old[0] == null) {
											_gthis.constants.remove(v[0].id);
										} else {
											_gthis.constants.h[v[0].id] = old[0];
										}
									};
								})(old1,v));
								this.constants.h[v[0].id] = e1.e;
								break;
							default:
								var old2 = [this.varMap.h[v[0].__id__]];
								if(old2[0] == null) {
									undo.push((function(v) {
										return function() {
											_gthis.varMap.remove(v[0]);
										};
									})(v));
								} else {
									this.varMap.remove(v[0]);
									undo.push((function(old,v) {
										return function() {
											_gthis.varMap.set(v[0],old[0]);
										};
									})(old2,v));
								}
								var v2 = this.mapVar(v[0]);
								outExprs.push({ e : hxsl_TExprDef.TVarDecl(v2,e1), t : hxsl_Type.TVoid, p : e1.p});
							}
							break;
						default:
							var old3 = [this.varMap.h[v[0].__id__]];
							if(old3[0] == null) {
								undo.push((function(v) {
									return function() {
										_gthis.varMap.remove(v[0]);
									};
								})(v));
							} else {
								this.varMap.remove(v[0]);
								undo.push((function(old,v) {
									return function() {
										_gthis.varMap.set(v[0],old[0]);
									};
								})(old3,v));
							}
							var v21 = this.mapVar(v[0]);
							outExprs.push({ e : hxsl_TExprDef.TVarDecl(v21,e1), t : hxsl_Type.TVoid, p : e1.p});
						}
					}
					var e1 = this.handleReturn(this.evalExpr(f.expr,false),true);
					var _g2 = 0;
					while(_g2 < undo.length) {
						var u = undo[_g2];
						++_g2;
						u();
					}
					var _g2 = e1.e;
					if(_g2._hx_index == 4) {
						var el = _g2.el;
						var _g2 = 0;
						while(_g2 < el.length) {
							var e2 = el[_g2];
							++_g2;
							outExprs.push(e2);
						}
					} else {
						outExprs.push(e1);
					}
					d = hxsl_TExprDef.TBlock(outExprs);
				} else {
					d = hxsl_TExprDef.TCall(c1,args);
				}
				break;
			case 2:
				var g = _g1.g;
				var v1 = this.evalCall(g,args,eargs,e.p);
				d = v1 != null ? v1 : hxsl_TExprDef.TCall(c1,args);
				break;
			default:
				d = hxsl_Error.t("Cannot eval non-static call expresssion '" + new hxsl_Printer().exprString(c1) + "'",c1.p);
			}
			break;
		case 9:
			var e1 = _g.e;
			var r = _g.regs;
			d = hxsl_TExprDef.TSwiz(this.evalExpr(e1),r.slice());
			break;
		case 10:
			var econd = _g.econd;
			var eif = _g.eif;
			var eelse = _g.eelse;
			var econd1 = this.evalExpr(econd);
			var _g1 = econd1.e;
			if(_g1._hx_index == 0) {
				var _g2 = _g1.c;
				if(_g2._hx_index == 1) {
					var b = _g2.b;
					d = b ? this.evalExpr(eif,isVal).e : eelse == null ? hxsl_TExprDef.TConst(hxsl_Const.CNull) : this.evalExpr(eelse,isVal).e;
				} else if(isVal && eelse != null && this.eliminateConditionals) {
					d = hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Mix), t : e.t, p : e.p},[this.evalExpr(eelse,true),this.evalExpr(eif,true),{ e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.ToFloat), t : hxsl_Type.TFun([]), p : econd1.p},[econd1]), t : hxsl_Type.TFloat, p : e.p}]);
				} else {
					eif = this.evalExpr(eif,isVal);
					if(eelse != null) {
						eelse = this.evalExpr(eelse,isVal);
						var _g1 = eelse.e;
						if(_g1._hx_index == 0 && _g1.c._hx_index == 0) {
							eelse = null;
						}
					}
					eif = this.ifBlock(eif);
					eelse = this.ifBlock(eelse);
					d = hxsl_TExprDef.TIf(econd1,eif,eelse);
				}
			} else if(isVal && eelse != null && this.eliminateConditionals) {
				d = hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Mix), t : e.t, p : e.p},[this.evalExpr(eelse,true),this.evalExpr(eif,true),{ e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.ToFloat), t : hxsl_Type.TFun([]), p : econd1.p},[econd1]), t : hxsl_Type.TFloat, p : e.p}]);
			} else {
				eif = this.evalExpr(eif,isVal);
				if(eelse != null) {
					eelse = this.evalExpr(eelse,isVal);
					var _g1 = eelse.e;
					if(_g1._hx_index == 0 && _g1.c._hx_index == 0) {
						eelse = null;
					}
				}
				eif = this.ifBlock(eif);
				eelse = this.ifBlock(eelse);
				d = hxsl_TExprDef.TIf(econd1,eif,eelse);
			}
			break;
		case 11:
			d = hxsl_TExprDef.TDiscard;
			break;
		case 12:
			var e1 = _g.e;
			d = hxsl_TExprDef.TReturn(e1 == null ? null : this.evalExpr(e1));
			break;
		case 13:
			var v1 = _g.v;
			var it = _g.it;
			var loop = _g.loop;
			var v2 = this.mapVar(v1);
			var it1 = this.evalExpr(it);
			var e1;
			var _g1 = it1.e;
			if(_g1._hx_index == 5) {
				var _g2 = _g1.e1;
				var _g3 = _g1.e2;
				if(_g1.op._hx_index == 21) {
					var _g1 = _g2.e;
					var _g4 = _g2.p;
					var _g4 = _g2.t;
					if(_g1._hx_index == 0) {
						var _g2 = _g1.c;
						if(_g2._hx_index == 2) {
							var _g1 = _g3.e;
							var _g4 = _g3.p;
							var _g4 = _g3.t;
							if(_g1._hx_index == 0) {
								var _g3 = _g1.c;
								if(_g3._hx_index == 2) {
									var len = _g3.v;
									var start = _g2.v;
									if(this.unrollLoops) {
										var out = [];
										var _g1 = start;
										var _g2 = len;
										while(_g1 < _g2) {
											var i = _g1++;
											this.constants.h[v1.id] = hxsl_TExprDef.TConst(hxsl_Const.CInt(i));
											out.push(this.evalExpr(loop,false));
										}
										this.constants.remove(v1.id);
										e1 = hxsl_TExprDef.TBlock(out);
									} else {
										e1 = hxsl_TExprDef.TFor(v2,it1,this.ifBlock(this.evalExpr(loop,false)));
									}
								} else {
									e1 = hxsl_TExprDef.TFor(v2,it1,this.ifBlock(this.evalExpr(loop,false)));
								}
							} else {
								e1 = hxsl_TExprDef.TFor(v2,it1,this.ifBlock(this.evalExpr(loop,false)));
							}
						} else {
							e1 = hxsl_TExprDef.TFor(v2,it1,this.ifBlock(this.evalExpr(loop,false)));
						}
					} else {
						e1 = hxsl_TExprDef.TFor(v2,it1,this.ifBlock(this.evalExpr(loop,false)));
					}
				} else {
					e1 = hxsl_TExprDef.TFor(v2,it1,this.ifBlock(this.evalExpr(loop,false)));
				}
			} else {
				e1 = hxsl_TExprDef.TFor(v2,it1,this.ifBlock(this.evalExpr(loop,false)));
			}
			this.varMap.remove(v1);
			d = e1;
			break;
		case 14:
			d = hxsl_TExprDef.TContinue;
			break;
		case 15:
			d = hxsl_TExprDef.TBreak;
			break;
		case 16:
			var e1 = _g.e;
			var e2 = _g.index;
			var e11 = this.evalExpr(e1);
			var e21 = this.evalExpr(e2);
			var _g1 = e11.e;
			var _g2 = e21.e;
			if(_g1._hx_index == 17) {
				if(_g2._hx_index == 0) {
					var _g3 = _g2.c;
					if(_g3._hx_index == 2) {
						var i = _g3.v;
						var el = _g1.el;
						d = i >= 0 && i < el.length ? el[i].e : hxsl_TExprDef.TArray(e11,e21);
					} else {
						d = hxsl_TExprDef.TArray(e11,e21);
					}
				} else {
					d = hxsl_TExprDef.TArray(e11,e21);
				}
			} else {
				d = hxsl_TExprDef.TArray(e11,e21);
			}
			break;
		case 17:
			var el = _g.el;
			var _g1 = [];
			var _g2 = 0;
			while(_g2 < el.length) {
				var e1 = el[_g2];
				++_g2;
				_g1.push(this.evalExpr(e1));
			}
			d = hxsl_TExprDef.TArrayDecl(_g1);
			break;
		case 18:
			var e1 = _g.e;
			var cases = _g.cases;
			var def = _g.def;
			var e2 = this.evalExpr(e1);
			var _g1 = [];
			var _g2 = 0;
			while(_g2 < cases.length) {
				var c = cases[_g2];
				++_g2;
				var _g3 = [];
				var _g4 = 0;
				var _g5 = c.values;
				while(_g4 < _g5.length) {
					var v1 = _g5[_g4];
					++_g4;
					_g3.push(this.evalExpr(v1));
				}
				_g1.push({ values : _g3, expr : this.evalExpr(c.expr,isVal)});
			}
			var cases = _g1;
			var def1 = def == null ? null : this.evalExpr(def,isVal);
			var hasCase = false;
			var _g1 = e2.e;
			if(_g1._hx_index == 0) {
				var c = _g1.c;
				if(c._hx_index == 2) {
					var val = c.v;
					var _g1 = 0;
					while(_g1 < cases.length) {
						var c1 = cases[_g1];
						++_g1;
						var _g2 = 0;
						var _g3 = c1.values;
						while(_g2 < _g3.length) {
							var v1 = _g3[_g2];
							++_g2;
							var _g4 = v1.e;
							if(_g4._hx_index == 0) {
								var cst = _g4.c;
								switch(cst._hx_index) {
								case 2:
									var k = cst.v;
									if(k == val) {
										return c1.expr;
									}
									break;
								case 3:
									var k1 = cst.v;
									if(k1 == val) {
										return c1.expr;
									}
									break;
								default:
								}
							} else {
								hasCase = true;
							}
						}
					}
				} else {
					throw haxe_Exception.thrown("Unsupported switch constant " + Std.string(c));
				}
			} else {
				hasCase = true;
			}
			d = hasCase ? hxsl_TExprDef.TSwitch(e2,cases,def1) : def1 == null ? hxsl_TExprDef.TBlock([]) : def1.e;
			break;
		case 19:
			var cond = _g.e;
			var loop = _g.loop;
			var normalWhile = _g.normalWhile;
			var cond1 = this.evalExpr(cond);
			var loop1 = this.evalExpr(loop,false);
			d = hxsl_TExprDef.TWhile(cond1,this.ifBlock(loop1),normalWhile);
			break;
		case 20:
			var name = _g.m;
			var args = _g.args;
			var e1 = _g.e;
			var e2;
			if(name == "unroll") {
				var old4 = this.unrollLoops;
				this.unrollLoops = true;
				e2 = this.evalExpr(e1,isVal);
				this.unrollLoops = false;
			} else {
				e2 = this.evalExpr(e1,isVal);
			}
			d = hxsl_TExprDef.TMeta(name,args,e2);
			break;
		}
		return { e : d, t : e.t, p : e.p};
	}
	,__class__: hxsl_Eval
};
var hxsl__$Flatten_Alloc = function(g,t,pos,size) {
	this.g = g;
	this.t = t;
	this.pos = pos;
	this.size = size;
};
hxsl__$Flatten_Alloc.__name__ = "hxsl._Flatten.Alloc";
hxsl__$Flatten_Alloc.prototype = {
	__class__: hxsl__$Flatten_Alloc
};
var hxsl_ARead = $hxEnums["hxsl.ARead"] = { __ename__:true,__constructs__:null
	,AIndex: ($_=function(a) { return {_hx_index:0,a:a,__enum__:"hxsl.ARead",toString:$estr}; },$_._hx_name="AIndex",$_.__params__ = ["a"],$_)
	,AOffset: ($_=function(a,stride,delta) { return {_hx_index:1,a:a,stride:stride,delta:delta,__enum__:"hxsl.ARead",toString:$estr}; },$_._hx_name="AOffset",$_.__params__ = ["a","stride","delta"],$_)
};
hxsl_ARead.__constructs__ = [hxsl_ARead.AIndex,hxsl_ARead.AOffset];
hxsl_ARead.__empty_constructs__ = [];
var hxsl_Flatten = function() {
};
hxsl_Flatten.__name__ = "hxsl.Flatten";
hxsl_Flatten.prototype = {
	flatten: function(s,kind,constsToGlobal) {
		this.globals = [];
		this.params = [];
		this.outVars = [];
		if(constsToGlobal) {
			this.consts = [];
			var p = s.funs[0].expr.p;
			var gc = { id : hxsl_Tools.allocVarId(), name : "__consts__", kind : hxsl_VarKind.Global, type : null};
			this.econsts = { e : hxsl_TExprDef.TVar(gc), t : null, p : p};
			var s1 = s.name;
			var s2 = s.vars.slice();
			var _g = [];
			var _g1 = 0;
			var _g2 = s.funs;
			while(_g1 < _g2.length) {
				var f = _g2[_g1];
				++_g1;
				_g.push(this.mapFun(f,$bind(this,this.mapConsts)));
			}
			s = { name : s1, vars : s2, funs : _g};
			var _g = 0;
			var _g1 = s.vars;
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				var _g2 = v.type;
				if(_g2._hx_index == 9) {
					var _g3 = _g2.size;
					this.allocConst(255,p);
				}
			}
			if(this.consts.length > 0) {
				gc.type = this.econsts.t = hxsl_Type.TArray(hxsl_Type.TFloat,hxsl_SizeDecl.SConst(this.consts.length));
				s.vars.push(gc);
			}
		}
		this.varMap = new haxe_ds_ObjectMap();
		this.allocData = new haxe_ds_ObjectMap();
		var _g = 0;
		var _g1 = s.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this.gatherVar(v);
		}
		var prefix;
		switch(kind._hx_index) {
		case 0:
			prefix = "vertex";
			break;
		case 1:
			prefix = "fragment";
			break;
		default:
			throw haxe_Exception.thrown("assert");
		}
		this.pack(prefix + "Globals",hxsl_VarKind.Global,this.globals,hxsl_VecType.VFloat);
		this.pack(prefix + "Params",hxsl_VarKind.Param,this.params,hxsl_VecType.VFloat);
		var allVars = this.globals.concat(this.params);
		var textures = this.packTextures(prefix + "Textures",allVars,hxsl_Type.TSampler2D).concat(this.packTextures(prefix + "TexturesCube",allVars,hxsl_Type.TSamplerCube)).concat(this.packTextures(prefix + "TexturesArray",allVars,hxsl_Type.TSampler2DArray));
		this.packBuffers(allVars);
		var _g = [];
		var _g1 = 0;
		var _g2 = s.funs;
		while(_g1 < _g2.length) {
			var f = _g2[_g1];
			++_g1;
			_g.push(this.mapFun(f,$bind(this,this.mapExpr)));
		}
		var funs = _g;
		return { name : s.name, vars : this.outVars, funs : funs};
	}
	,mapFun: function(f,mapExpr) {
		return { kind : f.kind, ret : f.ret, args : f.args, ref : f.ref, expr : mapExpr(f.expr)};
	}
	,mapExpr: function(e) {
		var _g = e.e;
		switch(_g._hx_index) {
		case 1:
			var v = _g.v;
			var a = this.varMap.h[v.__id__];
			if(a != null) {
				e = this.access(a,v.type,e.p,hxsl_ARead.AIndex(a));
			}
			break;
		case 16:
			var _g1 = _g.e;
			var _g2 = _g1.e;
			var _g3 = _g1.t;
			if(_g2._hx_index == 1) {
				var v = _g2.v;
				var vp = _g1.p;
				var eindex = _g.index;
				var _g = eindex.e;
				var e1;
				if(_g._hx_index == 0) {
					var _g1 = _g.c;
					if(_g1._hx_index == 2) {
						var _g = _g1.v;
						e1 = true;
					} else {
						e1 = false;
					}
				} else {
					e1 = false;
				}
				if(!e1) {
					var a = this.varMap.h[v.__id__];
					if(a != null) {
						var _g = v.type;
						if(_g._hx_index == 15) {
							var _g1 = _g.t;
							var _g2 = _g.size;
							var t = _g1;
							if(hxsl_Tools.isSampler(t)) {
								eindex = this.toInt(this.mapExpr(eindex));
								e = this.access(a,t,vp,hxsl_ARead.AOffset(a,1,eindex));
							} else {
								var t = _g1;
								var stride = this.varSize(t,a.t);
								if(stride == 0 || (stride & 3) != 0) {
									throw haxe_Exception.thrown(new hxsl_Error("Dynamic access to an Array which size is not 4 components-aligned is not allowed",e.p));
								}
								stride >>= 2;
								eindex = this.toInt(this.mapExpr(eindex));
								e = this.access(a,t,vp,hxsl_ARead.AOffset(a,stride,stride == 1 ? eindex : { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpMult,eindex,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(stride)), t : hxsl_Type.TInt, p : vp}), t : hxsl_Type.TInt, p : vp}));
							}
						} else {
							throw haxe_Exception.thrown("assert");
						}
					}
				} else {
					e = hxsl_Tools.map(e,$bind(this,this.mapExpr));
				}
			} else {
				e = hxsl_Tools.map(e,$bind(this,this.mapExpr));
			}
			break;
		default:
			e = hxsl_Tools.map(e,$bind(this,this.mapExpr));
		}
		return this.optimize(e);
	}
	,mapConsts: function(e) {
		var _g = e.e;
		switch(_g._hx_index) {
		case 0:
			var c = _g.c;
			switch(c._hx_index) {
			case 2:
				var v = c.v;
				return this.allocConst(v,e.p);
			case 3:
				var v = c.v;
				return this.allocConst(v,e.p);
			default:
				return e;
			}
			break;
		case 2:
			var g = _g.g;
			switch(g._hx_index) {
			case 0:
				this.allocConst(Math.PI / 180,e.p);
				break;
			case 1:
				this.allocConst(180 / Math.PI,e.p);
				break;
			case 9:
				this.allocConst(1.4426950408889634,e.p);
				break;
			case 10:
				this.allocConst(0.6931471805599453,e.p);
				break;
			case 24:
				this.allocConst(1,e.p);
				break;
			case 26:
				this.allocConst(2.0,e.p);
				this.allocConst(3.0,e.p);
				break;
			case 54:
				this.allocConsts([1,255,65025,16581375],e.p);
				this.allocConsts([0.00392156862745098,0.00392156862745098,0.00392156862745098,0],e.p);
				break;
			case 55:
				this.allocConsts([1,0.00392156862745098,1.5378700499807768e-005,6.0308629411010845e-008],e.p);
				break;
			case 56:
				this.allocConst(1,e.p);
				this.allocConst(0.5,e.p);
				break;
			case 57:
				this.allocConst(0.5,e.p);
				break;
			case 58:
				this.allocConsts([0.5,0.5],e.p);
				this.allocConsts([0.5,-0.5],e.p);
				break;
			case 59:
				this.allocConsts([2,-2],e.p);
				this.allocConsts([-1,1],e.p);
				break;
			default:
			}
			break;
		case 5:
			var _g1 = _g.e1;
			var _g1 = _g.e2;
			if(_g.op._hx_index == 1) {
				var _g2 = _g1.e;
				var _g2 = _g1.p;
				if(_g1.t._hx_index == 8) {
					this.allocConst(1,e.p);
				}
			}
			break;
		case 8:
			var _g1 = _g.e;
			var _g2 = _g.args;
			var _g3 = _g1.e;
			var _g4 = _g1.p;
			var _g4 = _g1.t;
			if(_g3._hx_index == 2) {
				if(_g3.g._hx_index == 42) {
					if(_g2.length == 2) {
						var _g1 = _g2[0];
						var _g3 = _g2[1];
						var _g2 = _g1.e;
						var _g4 = _g1.p;
						var _g4 = _g1.t;
						if(_g2._hx_index == 1) {
							var _g1 = _g2.v;
							var _g2 = _g1.id;
							var _g2 = _g1.name;
							var _g2 = _g1.parent;
							var _g2 = _g1.qualifiers;
							var _g2 = _g1.type;
							switch(_g1.kind._hx_index) {
							case 0:
								if(_g4._hx_index == 5) {
									if(_g4.size == 3) {
										if(_g4.t._hx_index == 1) {
											var _g1 = _g3.e;
											var _g2 = _g3.p;
											var _g2 = _g3.t;
											if(_g1._hx_index == 0) {
												var _g2 = _g1.c;
												if(_g2._hx_index == 2) {
													if(_g2.v == 1) {
														return e;
													}
												}
											}
										}
									}
								}
								break;
							case 1:
								if(_g4._hx_index == 5) {
									if(_g4.size == 3) {
										if(_g4.t._hx_index == 1) {
											var _g1 = _g3.e;
											var _g2 = _g3.p;
											var _g2 = _g3.t;
											if(_g1._hx_index == 0) {
												var _g2 = _g1.c;
												if(_g2._hx_index == 2) {
													if(_g2.v == 1) {
														return e;
													}
												}
											}
										}
									}
								}
								break;
							case 2:
								if(_g4._hx_index == 5) {
									if(_g4.size == 3) {
										if(_g4.t._hx_index == 1) {
											var _g1 = _g3.e;
											var _g2 = _g3.p;
											var _g2 = _g3.t;
											if(_g1._hx_index == 0) {
												var _g2 = _g1.c;
												if(_g2._hx_index == 2) {
													if(_g2.v == 1) {
														return e;
													}
												}
											}
										}
									}
								}
								break;
							case 3:
								if(_g4._hx_index == 5) {
									if(_g4.size == 3) {
										if(_g4.t._hx_index == 1) {
											var _g1 = _g3.e;
											var _g2 = _g3.p;
											var _g2 = _g3.t;
											if(_g1._hx_index == 0) {
												var _g2 = _g1.c;
												if(_g2._hx_index == 2) {
													if(_g2.v == 1) {
														return e;
													}
												}
											}
										}
									}
								}
								break;
							default:
							}
						}
					}
				}
			}
			break;
		case 16:
			var _g1 = _g.e;
			var _g2 = _g.index;
			var _g = _g2.e;
			var _g3 = _g2.p;
			var _g3 = _g2.t;
			if(_g._hx_index == 0) {
				var _g3 = _g.c;
				if(_g3._hx_index == 2) {
					var _g = _g3.v;
					var eindex = _g2;
					var ea = _g1;
					return { e : hxsl_TExprDef.TArray(this.mapConsts(ea),eindex), t : e.t, p : e.p};
				} else {
					var eindex = _g2;
					var ea = _g1;
					var _g = ea.t;
					if(_g._hx_index == 15) {
						var _g3 = _g.size;
						var t = _g.t;
						var stride = this.varSize(t,hxsl_VecType.VFloat) >> 2;
						this.allocConst(stride,e.p);
					}
				}
			} else {
				var eindex = _g2;
				var ea = _g1;
				var _g = ea.t;
				if(_g._hx_index == 15) {
					var _g1 = _g.size;
					var t = _g.t;
					var stride = this.varSize(t,hxsl_VecType.VFloat) >> 2;
					this.allocConst(stride,e.p);
				}
			}
			break;
		default:
		}
		return hxsl_Tools.map(e,$bind(this,this.mapConsts));
	}
	,allocConst: function(v,p) {
		var index = this.consts.indexOf(v);
		if(index < 0) {
			index = this.consts.length;
			this.consts.push(v);
		}
		return { e : hxsl_TExprDef.TArray(this.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p};
	}
	,allocConsts: function(va,p) {
		var _gthis = this;
		var pad = va.length - 1 & 3;
		var index = -1;
		var _g = 0;
		var _g1 = this.consts.length - (va.length - 1);
		while(_g < _g1) {
			var i = _g++;
			if(i >> 2 != i + pad >> 2) {
				continue;
			}
			var found = true;
			var _g2 = 0;
			var _g3 = va.length;
			while(_g2 < _g3) {
				var j = _g2++;
				if(this.consts[i + j] != va[j]) {
					found = false;
					break;
				}
			}
			if(found) {
				index = i;
				break;
			}
		}
		if(index < 0) {
			while(this.consts.length >> 2 != this.consts.length + pad >> 2) this.consts.push(0);
			index = this.consts.length;
			var _g = 0;
			while(_g < va.length) {
				var v = va[_g];
				++_g;
				this.consts.push(v);
			}
		}
		switch(va.length) {
		case 1:
			return { e : hxsl_TExprDef.TArray(_gthis.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p};
		case 2:
			return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Vec2), t : hxsl_Type.TVoid, p : p},[{ e : hxsl_TExprDef.TArray(_gthis.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p},{ e : hxsl_TExprDef.TArray(_gthis.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index + 1)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p}]), t : hxsl_Type.TVec(2,hxsl_VecType.VFloat), p : p};
		case 3:
			return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Vec3), t : hxsl_Type.TVoid, p : p},[{ e : hxsl_TExprDef.TArray(_gthis.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p},{ e : hxsl_TExprDef.TArray(_gthis.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index + 1)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p},{ e : hxsl_TExprDef.TArray(_gthis.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index + 2)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p}]), t : hxsl_Type.TVec(3,hxsl_VecType.VFloat), p : p};
		case 4:
			return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Vec4), t : hxsl_Type.TVoid, p : p},[{ e : hxsl_TExprDef.TArray(_gthis.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p},{ e : hxsl_TExprDef.TArray(_gthis.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index + 1)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p},{ e : hxsl_TExprDef.TArray(_gthis.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index + 3)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p},{ e : hxsl_TExprDef.TArray(_gthis.econsts,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index + 4)), t : hxsl_Type.TInt, p : p}), t : hxsl_Type.TFloat, p : p}]), t : hxsl_Type.TVec(4,hxsl_VecType.VFloat), p : p};
		default:
			throw haxe_Exception.thrown("assert");
		}
	}
	,access: function(a,t,pos,acc) {
		var _gthis = this;
		switch(t._hx_index) {
		case 6:
			var tmp = this.access(a,hxsl_Type.TMat3x4,pos,acc);
			return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Mat3), t : hxsl_Type.TFun([]), p : pos},[tmp]), t : hxsl_Type.TMat3, p : pos};
		case 7:
			var tmp = hxsl_TExprDef.TGlobal(hxsl_TGlobal.Mat4);
			var tmp1 = hxsl_Type.TFun([]);
			var tmp2;
			switch(acc._hx_index) {
			case 0:
				var a1 = acc.a;
				var offs = a1.t == null ? a1.pos : a1.pos >> 2;
				tmp2 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(offs)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			case 1:
				var a1 = acc.a;
				var stride = acc.stride;
				var delta = acc.delta;
				var index = a1.t == null ? a1.pos : a1.pos >> 2;
				var offset = index == 0 ? delta : { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAdd,delta,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TInt, p : pos};
				tmp2 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},offset), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			}
			var tmp3;
			switch(acc._hx_index) {
			case 0:
				var a1 = acc.a;
				var offs = a1.t == null ? a1.pos : a1.pos >> 2;
				tmp3 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(offs + 1)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			case 1:
				var a1 = acc.a;
				var stride = acc.stride;
				var delta = acc.delta;
				var index = (a1.t == null ? a1.pos : a1.pos >> 2) + 1;
				var offset = index == 0 ? delta : { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAdd,delta,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TInt, p : pos};
				tmp3 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},offset), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			}
			var tmp4;
			switch(acc._hx_index) {
			case 0:
				var a1 = acc.a;
				var offs = a1.t == null ? a1.pos : a1.pos >> 2;
				tmp4 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(offs + 2)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			case 1:
				var a1 = acc.a;
				var stride = acc.stride;
				var delta = acc.delta;
				var index = (a1.t == null ? a1.pos : a1.pos >> 2) + 2;
				var offset = index == 0 ? delta : { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAdd,delta,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TInt, p : pos};
				tmp4 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},offset), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			}
			var tmp5;
			switch(acc._hx_index) {
			case 0:
				var a1 = acc.a;
				var offs = a1.t == null ? a1.pos : a1.pos >> 2;
				tmp5 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(offs + 3)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			case 1:
				var a1 = acc.a;
				var stride = acc.stride;
				var delta = acc.delta;
				var index = (a1.t == null ? a1.pos : a1.pos >> 2) + 3;
				var offset = index == 0 ? delta : { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAdd,delta,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TInt, p : pos};
				tmp5 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},offset), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			}
			return { e : hxsl_TExprDef.TCall({ e : tmp, t : tmp1, p : pos},[tmp2,tmp3,tmp4,tmp5]), t : hxsl_Type.TMat4, p : pos};
		case 8:
			var tmp = hxsl_TExprDef.TGlobal(hxsl_TGlobal.Mat3x4);
			var tmp1 = hxsl_Type.TFun([]);
			var tmp2;
			switch(acc._hx_index) {
			case 0:
				var a1 = acc.a;
				var offs = a1.t == null ? a1.pos : a1.pos >> 2;
				tmp2 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(offs)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			case 1:
				var a1 = acc.a;
				var stride = acc.stride;
				var delta = acc.delta;
				var index = a1.t == null ? a1.pos : a1.pos >> 2;
				var offset = index == 0 ? delta : { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAdd,delta,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TInt, p : pos};
				tmp2 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},offset), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			}
			var tmp3;
			switch(acc._hx_index) {
			case 0:
				var a1 = acc.a;
				var offs = a1.t == null ? a1.pos : a1.pos >> 2;
				tmp3 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(offs + 1)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			case 1:
				var a1 = acc.a;
				var stride = acc.stride;
				var delta = acc.delta;
				var index = (a1.t == null ? a1.pos : a1.pos >> 2) + 1;
				var offset = index == 0 ? delta : { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAdd,delta,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TInt, p : pos};
				tmp3 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},offset), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			}
			var tmp4;
			switch(acc._hx_index) {
			case 0:
				var a1 = acc.a;
				var offs = a1.t == null ? a1.pos : a1.pos >> 2;
				tmp4 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(offs + 2)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			case 1:
				var a1 = acc.a;
				var stride = acc.stride;
				var delta = acc.delta;
				var index = (a1.t == null ? a1.pos : a1.pos >> 2) + 2;
				var offset = index == 0 ? delta : { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAdd,delta,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TInt, p : pos};
				tmp4 = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},offset), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			}
			return { e : hxsl_TExprDef.TCall({ e : tmp, t : tmp1, p : pos},[tmp2,tmp3,tmp4]), t : hxsl_Type.TMat3x4, p : pos};
		case 15:
			var _g = t.size;
			if(_g._hx_index == 0) {
				var len = _g.v;
				var t1 = t.t;
				var stride = a.size / len | 0;
				var _g = [];
				var _g1 = 0;
				var _g2 = len;
				while(_g1 < _g2) {
					var i = _g1++;
					var a1 = new hxsl__$Flatten_Alloc(a.g,a.t,a.pos + stride * i,stride);
					_g.push(this.access(a1,t1,pos,hxsl_ARead.AIndex(a1)));
				}
				var earr = _g;
				return { e : hxsl_TExprDef.TArrayDecl(earr), t : t1, p : pos};
			} else {
				if(hxsl_Tools.isSampler(t)) {
					var e;
					switch(acc._hx_index) {
					case 0:
						var a1 = acc.a;
						var offs = a1.t == null ? a1.pos : a1.pos >> 2;
						e = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(offs)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TVec(4,a1.t), p : pos};
						break;
					case 1:
						var a1 = acc.a;
						var stride = acc.stride;
						var delta = acc.delta;
						var index = a1.t == null ? a1.pos : a1.pos >> 2;
						var offset = index == 0 ? delta : { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAdd,delta,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TInt, p : pos};
						e = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},offset), t : hxsl_Type.TVec(4,a1.t), p : pos};
						break;
					}
					e.t = t;
					return e;
				}
				var size = this.varSize(t,a.t);
				if(size > 4) {
					return hxsl_Error.t("Access not supported for " + hxsl_Tools.toString(t),null);
				}
				var e;
				switch(acc._hx_index) {
				case 0:
					var a1 = acc.a;
					var offs = a1.t == null ? a1.pos : a1.pos >> 2;
					e = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(offs)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TVec(4,a1.t), p : pos};
					break;
				case 1:
					var a1 = acc.a;
					var stride = acc.stride;
					var delta = acc.delta;
					var index = a1.t == null ? a1.pos : a1.pos >> 2;
					var offset = index == 0 ? delta : { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAdd,delta,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TInt, p : pos};
					e = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},offset), t : hxsl_Type.TVec(4,a1.t), p : pos};
					break;
				}
				if(size == 4) {
					if((a.pos & 3) != 0) {
						throw haxe_Exception.thrown("assert");
					}
				} else {
					var sw = [];
					var _g = 0;
					var _g1 = size;
					while(_g < _g1) {
						var i = _g++;
						sw.push(hxsl_Tools.SWIZ[i + (a.pos & 3)]);
					}
					e = { e : hxsl_TExprDef.TSwiz(e,sw), t : t, p : pos};
				}
				switch(t._hx_index) {
				case 1:
					e.t = hxsl_Type.TFloat;
					e = this.toInt(e);
					break;
				case 5:
					if(t.t._hx_index == 0) {
						var size = t.size;
						e.t = hxsl_Type.TVec(size,hxsl_VecType.VFloat);
						e = { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal([hxsl_TGlobal.IVec2,hxsl_TGlobal.IVec3,hxsl_TGlobal.IVec4][size - 2]), t : hxsl_Type.TFun([]), p : pos},[e]), t : t, p : pos};
					}
					break;
				default:
				}
				return e;
			}
			break;
		default:
			if(hxsl_Tools.isSampler(t)) {
				var e;
				switch(acc._hx_index) {
				case 0:
					var a1 = acc.a;
					var offs = a1.t == null ? a1.pos : a1.pos >> 2;
					e = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(offs)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TVec(4,a1.t), p : pos};
					break;
				case 1:
					var a1 = acc.a;
					var stride = acc.stride;
					var delta = acc.delta;
					var index = a1.t == null ? a1.pos : a1.pos >> 2;
					var offset = index == 0 ? delta : { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAdd,delta,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TInt, p : pos};
					e = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},offset), t : hxsl_Type.TVec(4,a1.t), p : pos};
					break;
				}
				e.t = t;
				return e;
			}
			var size = this.varSize(t,a.t);
			if(size > 4) {
				return hxsl_Error.t("Access not supported for " + hxsl_Tools.toString(t),null);
			}
			var e;
			switch(acc._hx_index) {
			case 0:
				var a1 = acc.a;
				var offs = a1.t == null ? a1.pos : a1.pos >> 2;
				e = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(offs)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			case 1:
				var a1 = acc.a;
				var stride = acc.stride;
				var delta = acc.delta;
				var index = a1.t == null ? a1.pos : a1.pos >> 2;
				var offset = index == 0 ? delta : { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAdd,delta,{ e : hxsl_TExprDef.TConst(hxsl_Const.CInt(index)), t : hxsl_Type.TInt, p : pos}), t : hxsl_Type.TInt, p : pos};
				e = { e : hxsl_TExprDef.TArray({ e : hxsl_TExprDef.TVar(a1.g), t : a1.g.type, p : pos},offset), t : hxsl_Type.TVec(4,a1.t), p : pos};
				break;
			}
			if(size == 4) {
				if((a.pos & 3) != 0) {
					throw haxe_Exception.thrown("assert");
				}
			} else {
				var sw = [];
				var _g = 0;
				var _g1 = size;
				while(_g < _g1) {
					var i = _g++;
					sw.push(hxsl_Tools.SWIZ[i + (a.pos & 3)]);
				}
				e = { e : hxsl_TExprDef.TSwiz(e,sw), t : t, p : pos};
			}
			switch(t._hx_index) {
			case 1:
				e.t = hxsl_Type.TFloat;
				e = this.toInt(e);
				break;
			case 5:
				if(t.t._hx_index == 0) {
					var size = t.size;
					e.t = hxsl_Type.TVec(size,hxsl_VecType.VFloat);
					e = { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal([hxsl_TGlobal.IVec2,hxsl_TGlobal.IVec3,hxsl_TGlobal.IVec4][size - 2]), t : hxsl_Type.TFun([]), p : pos},[e]), t : t, p : pos};
				}
				break;
			default:
			}
			return e;
		}
	}
	,toInt: function(e) {
		if(e.t == hxsl_Type.TInt) {
			return e;
		}
		return { e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.ToInt), t : hxsl_Type.TFun([]), p : e.p},[e]), t : hxsl_Type.TInt, p : e.p};
	}
	,optimize: function(e) {
		var _g = e.e;
		switch(_g._hx_index) {
		case 8:
			var _g1 = _g.e;
			var _g2 = _g.args;
			var _g3 = _g1.e;
			var _g4 = _g1.p;
			var _g4 = _g1.t;
			if(_g3._hx_index == 2) {
				if(_g3.g._hx_index == 52) {
					if(_g2.length == 1) {
						var _g1 = _g2[0];
						var _g2 = _g1.e;
						var _g3 = _g1.p;
						var _g3 = _g1.t;
						if(_g2._hx_index == 8) {
							var _g1 = _g2.e;
							var _g3 = _g1.e;
							var _g4 = _g1.p;
							var _g4 = _g1.t;
							if(_g3._hx_index == 2) {
								if(_g3.g._hx_index == 51) {
									var args = _g2.args;
									var rem = 0;
									var size = 0;
									while(size < 4) {
										var t = args[args.length - 1 - rem].t;
										size += this.varSize(t,hxsl_VecType.VFloat);
										++rem;
									}
									if(size == 4) {
										var _g1 = 0;
										var _g2 = rem;
										while(_g1 < _g2) {
											var i = _g1++;
											args.pop();
										}
										var emat;
										var _g1 = e.e;
										if(_g1._hx_index == 8) {
											var _g2 = _g1.args;
											var e1 = _g1.e;
											emat = e1;
										} else {
											throw haxe_Exception.thrown("assert");
										}
										return { e : hxsl_TExprDef.TCall(emat,args), t : e.t, p : e.p};
									}
								}
							}
						}
					}
				}
			}
			break;
		case 16:
			var _g1 = _g.e;
			var _g2 = _g.index;
			var _g = _g1.e;
			var _g3 = _g1.p;
			var _g3 = _g1.t;
			if(_g._hx_index == 17) {
				var _g1 = _g2.e;
				var _g3 = _g2.p;
				var _g3 = _g2.t;
				if(_g1._hx_index == 0) {
					var _g2 = _g1.c;
					if(_g2._hx_index == 2) {
						var i = _g2.v;
						var el = _g.el;
						if(i >= 0 && i < el.length) {
							return el[i];
						}
						hxsl_Error.t("Reading outside array bounds",e.p);
					}
				}
			}
			break;
		default:
		}
		return e;
	}
	,packTextures: function(name,vars,t) {
		var alloc = [];
		var g = { id : hxsl_Tools.allocVarId(), name : name, type : t, kind : hxsl_VarKind.Param};
		var pos = 0;
		var samplers = [];
		var _g = 0;
		while(_g < vars.length) {
			var v = vars[_g];
			++_g;
			var count = 1;
			if(v.type != t) {
				var _g1 = v.type;
				switch(_g1._hx_index) {
				case 15:
					var _g2 = _g1.size;
					if(_g2._hx_index == 0) {
						var n = _g2.v;
						var t2 = _g1.t;
						if(t2 == t) {
							count = n;
						} else {
							continue;
						}
					} else {
						continue;
					}
					break;
				case 17:
					var _g3 = _g1.size;
					if(t != hxsl_Type.TSampler2D) {
						continue;
					}
					break;
				default:
					continue;
				}
			}
			var a = new hxsl__$Flatten_Alloc(g,null,pos,count);
			a.v = v;
			if(v.qualifiers != null) {
				var _g4 = 0;
				var _g5 = v.qualifiers;
				while(_g4 < _g5.length) {
					var q = _g5[_g4];
					++_g4;
					if(q._hx_index == 12) {
						var name = q.name;
						var _g6 = 0;
						var _g7 = count;
						while(_g6 < _g7) {
							var i = _g6++;
							samplers[pos + i] = name;
						}
					}
				}
			}
			this.varMap.set(v,a);
			alloc.push(a);
			pos += count;
		}
		g.type = hxsl_Type.TArray(t,hxsl_SizeDecl.SConst(pos));
		if(samplers.length > 0) {
			var _g = 0;
			var _g1 = pos;
			while(_g < _g1) {
				var i = _g++;
				if(samplers[i] == null) {
					samplers[i] = "";
				}
			}
			if(g.qualifiers == null) {
				g.qualifiers = [];
			}
			g.qualifiers.push(hxsl_VarQualifier.Sampler(samplers.join(",")));
		}
		if(alloc.length > 0) {
			this.outVars.push(g);
			this.allocData.set(g,alloc);
		}
		return alloc;
	}
	,packBuffers: function(vars) {
		var alloc = [];
		var g = { id : hxsl_Tools.allocVarId(), name : "buffers", type : hxsl_Type.TVoid, kind : hxsl_VarKind.Param};
		var _g = 0;
		while(_g < vars.length) {
			var v = vars[_g];
			++_g;
			var _g1 = v.type;
			var tmp;
			if(_g1._hx_index == 16) {
				var _g2 = _g1.t;
				var _g3 = _g1.size;
				tmp = true;
			} else {
				tmp = false;
			}
			if(tmp) {
				var a = new hxsl__$Flatten_Alloc(g,null,alloc.length,1);
				a.v = v;
				alloc.push(a);
				this.outVars.push(v);
			}
		}
		g.type = hxsl_Type.TArray(hxsl_Type.TBuffer(hxsl_Type.TVoid,hxsl_SizeDecl.SConst(0)),hxsl_SizeDecl.SConst(alloc.length));
		this.allocData.set(g,alloc);
	}
	,pack: function(name,kind,vars,t) {
		var alloc = [];
		var apos = 0;
		var g = { id : hxsl_Tools.allocVarId(), name : name, type : hxsl_Type.TVec(0,t), kind : kind};
		var _g = 0;
		while(_g < vars.length) {
			var v = vars[_g];
			++_g;
			var tmp;
			if(!hxsl_Tools.isSampler(v.type)) {
				var _g1 = v.type;
				if(_g1._hx_index == 16) {
					var _g2 = _g1.t;
					var _g3 = _g1.size;
					tmp = true;
				} else {
					tmp = false;
				}
			} else {
				tmp = true;
			}
			if(tmp) {
				continue;
			}
			var _g4 = v.type;
			if(_g4._hx_index == 15) {
				var _g5 = _g4.size;
				var t1 = _g4.t;
				if(hxsl_Tools.isSampler(t1)) {
					continue;
				}
			}
			var size = this.varSize(v.type,t);
			var best = null;
			var _g6 = 0;
			while(_g6 < alloc.length) {
				var a = alloc[_g6];
				++_g6;
				if(a.v == null && a.size >= size && (best == null || best.size > a.size)) {
					best = a;
				}
			}
			if(best != null) {
				var free = best.size - size;
				if(free > 0) {
					var i = alloc.indexOf(best);
					var a1 = new hxsl__$Flatten_Alloc(g,t,best.pos + size,free);
					alloc.splice(i + 1,0,a1);
					best.size = size;
				}
				best.v = v;
				this.varMap.set(v,best);
			} else {
				var a2 = new hxsl__$Flatten_Alloc(g,t,apos,size);
				apos += size;
				a2.v = v;
				this.varMap.set(v,a2);
				alloc.push(a2);
				var pad = (4 - size % 4) % 4;
				if(pad > 0) {
					var a3 = new hxsl__$Flatten_Alloc(g,t,apos,pad);
					apos += pad;
					alloc.push(a3);
				}
			}
		}
		g.type = hxsl_Type.TArray(hxsl_Type.TVec(4,t),hxsl_SizeDecl.SConst(apos >> 2));
		if(apos > 0) {
			this.outVars.push(g);
			this.allocData.set(g,alloc);
		}
		return g;
	}
	,varSize: function(v,t) {
		switch(v._hx_index) {
		case 1:case 3:
			if(t == hxsl_VecType.VFloat) {
				return 1;
			} else {
				throw haxe_Exception.thrown(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
			}
			break;
		case 5:
			var n = v.size;
			var t2 = v.t;
			if(t == t2) {
				return n;
			} else {
				throw haxe_Exception.thrown(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
			}
			break;
		case 7:
			if(t == hxsl_VecType.VFloat) {
				return 16;
			} else {
				throw haxe_Exception.thrown(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
			}
			break;
		case 6:case 8:
			if(t == hxsl_VecType.VFloat) {
				return 12;
			} else {
				throw haxe_Exception.thrown(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
			}
			break;
		case 15:
			var _g = v.size;
			if(_g._hx_index == 0) {
				var n = _g.v;
				var at = v.t;
				return this.varSize(at,t) * n;
			} else {
				throw haxe_Exception.thrown(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
			}
			break;
		default:
			throw haxe_Exception.thrown(hxsl_Tools.toString(v) + " size unknown for type " + Std.string(t));
		}
	}
	,gatherVar: function(v) {
		var _g = v.type;
		if(_g._hx_index == 13) {
			var vl = _g.vl;
			var _g = 0;
			while(_g < vl.length) {
				var v1 = vl[_g];
				++_g;
				this.gatherVar(v1);
			}
		} else {
			switch(v.kind._hx_index) {
			case 0:
				if(hxsl_Tools.hasQualifier(v,hxsl_VarQualifier.PerObject)) {
					this.params.push(v);
				} else {
					this.globals.push(v);
				}
				break;
			case 2:
				this.params.push(v);
				break;
			default:
				this.outVars.push(v);
			}
		}
	}
	,__class__: hxsl_Flatten
};
var hxsl_Globals = function() {
	this.channels = [];
	this.map = new haxe_ds_IntMap();
};
hxsl_Globals.__name__ = "hxsl.Globals";
hxsl_Globals.allocID = function(path) {
	if(hxsl_Globals.MAP == null) {
		hxsl_Globals.MAP = new haxe_ds_StringMap();
		hxsl_Globals.ALL = [];
	}
	var id = hxsl_Globals.MAP.h[path];
	if(id == null) {
		id = hxsl_Globals.ALL.length;
		hxsl_Globals.ALL.push(path);
		hxsl_Globals.MAP.h[path] = id;
	}
	return id;
};
hxsl_Globals.prototype = {
	set: function(path,v) {
		var this1 = this.map;
		var key = hxsl_Globals.allocID(path);
		this1.h[key] = v;
	}
	,allocChannelID: function(t) {
		var _g = 0;
		var _g1 = this.maxChannels;
		while(_g < _g1) {
			var i = _g++;
			if(this.channels[i] == t) {
				return i;
			}
		}
		if(this.maxChannels == 1 << hxsl_Tools.MAX_CHANNELS_BITS) {
			throw haxe_Exception.thrown("Too many unique channels");
		}
		var i = this.maxChannels++;
		this.channels[i] = t;
		return i;
	}
	,__class__: hxsl_Globals
};
var js_Boot = function() { };
js_Boot.__name__ = "js.Boot";
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
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var hxsl_GlslOut = function() {
	this.outIndex = 0;
	this.uniformBuffer = 0;
	this.exprIds = 0;
	this.varNames = new haxe_ds_IntMap();
	this.allNames = new haxe_ds_StringMap();
};
hxsl_GlslOut.__name__ = "hxsl.GlslOut";
hxsl_GlslOut.prototype = {
	decl: function(s) {
		var _g = 0;
		var _g1 = this.decls;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d == s) {
				return;
			}
		}
		if(HxOverrides.cca(s,0) == 35) {
			this.decls.unshift(s);
		} else {
			this.decls.push(s);
		}
	}
	,addType: function(t) {
		switch(t._hx_index) {
		case 0:
			this.buf.b += Std.string("void");
			break;
		case 1:
			this.buf.b += Std.string("int");
			break;
		case 2:
			this.buf.b += Std.string("bool");
			break;
		case 3:
			this.buf.b += Std.string("float");
			break;
		case 4:
			this.buf.b += Std.string("string");
			break;
		case 5:
			var size = t.size;
			var k = t.t;
			switch(k._hx_index) {
			case 0:
				this.buf.b += Std.string("i");
				break;
			case 1:
				break;
			case 2:
				this.buf.b += Std.string("b");
				break;
			}
			this.buf.b += Std.string("vec");
			this.buf.b += Std.string(size);
			break;
		case 6:
			this.buf.b += Std.string("mat3");
			break;
		case 7:
			this.buf.b += Std.string("mat4");
			break;
		case 8:
			this.decl(hxsl_GlslOut.MAT34);
			this.buf.b += Std.string("_mat3x4");
			break;
		case 9:
			var n = t.size;
			this.buf.b += Std.string("vec");
			this.buf.b += Std.string(n);
			break;
		case 10:
			this.buf.b += Std.string("sampler2D");
			break;
		case 11:
			this.buf.b += Std.string("sampler2DArray");
			if(this.glES != null) {
				this.decl("precision lowp sampler2DArray;");
			}
			break;
		case 12:
			this.buf.b += Std.string("samplerCube");
			break;
		case 13:
			var vl = t.vl;
			this.buf.b += Std.string("struct { ");
			var _g = 0;
			while(_g < vl.length) {
				var v = vl[_g];
				++_g;
				this.addVar(v);
				this.buf.b += Std.string(";");
			}
			this.buf.b += Std.string(" }");
			break;
		case 14:
			var _g = t.variants;
			this.buf.b += Std.string("function");
			break;
		case 15:
			var t1 = t.t;
			var size = t.size;
			this.addType(t1);
			this.buf.b += Std.string("[");
			switch(size._hx_index) {
			case 0:
				var _g = size.v;
				if(_g == 1) {
					if(this.intelDriverFix) {
						this.buf.b += Std.string(2);
					} else {
						var v = _g;
						this.buf.b += Std.string(v);
					}
				} else {
					var v = _g;
					this.buf.b += Std.string(v);
				}
				break;
			case 1:
				var v = size.v;
				var v1 = this.varName(v);
				this.buf.b += Std.string(v1);
				break;
			}
			this.buf.b += Std.string("]");
			break;
		case 16:
			var _g = t.t;
			var _g = t.size;
			throw haxe_Exception.thrown("assert");
		case 17:
			var n = t.size;
			this.buf.b += Std.string("channel" + n);
			break;
		case 18:
			this.buf.b += Std.string("mat2");
			break;
		}
	}
	,addVar: function(v) {
		var _g = v.type;
		switch(_g._hx_index) {
		case 15:
			var t = _g.t;
			var size = _g.size;
			var old = v.type;
			v.type = t;
			this.addVar(v);
			v.type = old;
			this.buf.b += Std.string("[");
			switch(size._hx_index) {
			case 0:
				var _g1 = size.v;
				if(_g1 == 1) {
					if(this.intelDriverFix) {
						this.buf.b += Std.string(2);
					} else {
						var n = _g1;
						this.buf.b += Std.string(n);
					}
				} else {
					var n = _g1;
					this.buf.b += Std.string(n);
				}
				break;
			case 1:
				var v1 = size.v;
				var v2 = this.varName(v1);
				this.buf.b += Std.string(v2);
				break;
			}
			this.buf.b += Std.string("]");
			break;
		case 16:
			var t = _g.t;
			var size = _g.size;
			this.buf.b += Std.string((this.isVertex ? "vertex_" : "") + "uniform_buffer" + this.uniformBuffer++);
			this.buf.b += Std.string(" { ");
			v.type = hxsl_Type.TArray(t,size);
			this.addVar(v);
			v.type = hxsl_Type.TBuffer(t,size);
			this.buf.b += Std.string("; }");
			break;
		default:
			this.addType(v.type);
			this.buf.b += Std.string(" ");
			var v1 = this.varName(v);
			this.buf.b += Std.string(v1);
		}
	}
	,addValue: function(e,tabs) {
		var _g = e.e;
		switch(_g._hx_index) {
		case 4:
			var el = _g.el;
			var name = "val" + this.exprIds++;
			var tmp = this.buf;
			this.buf = new StringBuf();
			this.addType(e.t);
			this.buf.b += Std.string(" ");
			this.buf.b += Std.string(name);
			this.buf.b += Std.string("(void)");
			var el2 = el.slice();
			var last = el2[el2.length - 1];
			el2[el2.length - 1] = { e : hxsl_TExprDef.TReturn(last), t : e.t, p : last.p};
			var e2 = { t : hxsl_Type.TVoid, e : hxsl_TExprDef.TBlock(el2), p : e.p};
			this.addExpr(e2,"");
			this.exprValues.push(this.buf.b);
			this.buf = tmp;
			this.buf.b += Std.string(name);
			this.buf.b += Std.string("()");
			break;
		case 10:
			var econd = _g.econd;
			var eif = _g.eif;
			var eelse = _g.eelse;
			this.buf.b += Std.string("( ");
			this.addValue(econd,tabs);
			this.buf.b += Std.string(" ) ? ");
			this.addValue(eif,tabs);
			this.buf.b += Std.string(" : ");
			this.addValue(eelse,tabs);
			break;
		case 20:
			var _g1 = _g.m;
			var _g1 = _g.args;
			var e1 = _g.e;
			this.addValue(e1,tabs);
			break;
		default:
			this.addExpr(e,tabs);
		}
	}
	,addBlock: function(e,tabs) {
		this.addExpr(e,tabs);
	}
	,getFunName: function(g,args,rt) {
		switch(g._hx_index) {
		case 20:
			if(rt == hxsl_Type.TInt && this.glES != null) {
				this.decl("int _imod( int x, int y ) { return int(mod(float(x),float(y))); }");
				return "_imod";
			}
			break;
		case 33:
			var _g = args[0].t;
			switch(_g._hx_index) {
			case 10:case 11:
				if(this.glES != null && this.glES <= 2) {
					return "texture2D";
				}
				break;
			case 12:
				if(this.glES != null && this.glES <= 2) {
					return "textureCube";
				}
				break;
			case 17:
				var _g1 = _g.size;
				if(this.glES != null && this.glES <= 2) {
					return "texture2D";
				}
				break;
			default:
			}
			break;
		case 34:
			var _g = args[0].t;
			switch(_g._hx_index) {
			case 10:case 11:
				if(this.glES != null && this.glES <= 2) {
					this.decl("#extension GL_EXT_shader_texture_lod : enable");
					return "texture2DLodEXT";
				}
				break;
			case 12:
				if(this.glES != null && this.glES <= 2) {
					this.decl("#extension GL_EXT_shader_texture_lod : enable");
					return "textureCubeLodEXT";
				}
				break;
			case 17:
				var _g1 = _g.size;
				if(this.glES != null && this.glES <= 2) {
					this.decl("#extension GL_EXT_shader_texture_lod : enable");
					return "texture2DLodEXT";
				}
				break;
			default:
			}
			break;
		case 35:
			return "texelFetch";
		case 36:
			this.decl("vec2 _textureSize(sampler2D sampler, int lod) { return vec2(textureSize(sampler, lod)); }");
			this.decl("vec3 _textureSize(sampler2DArray sampler, int lod) { return vec3(textureSize(sampler, lod)); }");
			this.decl("vec2 _textureSize(samplerCube sampler, int lod) { return vec2(textureSize(sampler, lod)); }");
			return "_textureSize";
		case 50:
			if(args[0].t == hxsl_Type.TMat3x4) {
				this.decl(hxsl_GlslOut.MAT34);
				this.decl("mat3 _mat3( _mat3x4 v ) { return mat3(v.a.xyz,v.b.xyz,v.c.xyz); }");
				return "_mat3";
			}
			break;
		case 52:
			this.decl(hxsl_GlslOut.MAT34);
			if(args.length == 1) {
				this.decl("_mat3x4 mat_to_34( mat4 m ) { return _mat3x4(m[0],m[1],m[2]); }");
				return "mat_to_34";
			}
			break;
		case 54:
			this.decl("vec4 pack( float v ) { vec4 color = fract(v * vec4(1, 255, 255.*255., 255.*255.*255.)); return color - color.yzww * vec4(1. / 255., 1. / 255., 1. / 255., 0.); }");
			break;
		case 55:
			this.decl("float unpack( vec4 color ) { return dot(color,vec4(1., 1. / 255., 1. / (255. * 255.), 1. / (255. * 255. * 255.))); }");
			break;
		case 56:
			this.decl("vec4 packNormal( vec3 v ) { return vec4((v + vec3(1.)) * vec3(0.5),1.); }");
			break;
		case 57:
			this.decl("vec3 unpackNormal( vec4 v ) { return normalize((v.xyz - vec3(0.5)) * vec3(2.)); }");
			break;
		case 58:
			this.decl("vec2 screenToUv( vec2 v ) { return v * vec2(0.5,-0.5) + vec2(0.5,0.5); }");
			break;
		case 59:
			this.decl("vec2 uvToScreen( vec2 v ) { return v * vec2(2.,-2.) + vec2(-1., 1.); }");
			break;
		case 60:case 61:case 62:
			this.decl("#extension GL_OES_standard_derivatives:enable");
			break;
		default:
		}
		return hxsl_GlslOut.GLOBALS.get(g);
	}
	,addExpr: function(e,tabs) {
		var _g = e.e;
		switch(_g._hx_index) {
		case 0:
			var c = _g.c;
			switch(c._hx_index) {
			case 0:
				this.buf.b += Std.string("null");
				break;
			case 1:
				var b = c.b;
				this.buf.b += Std.string(b);
				break;
			case 2:
				var v = c.v;
				this.buf.b += Std.string(v);
				break;
			case 3:
				var f = c.v;
				var str = "" + f;
				this.buf.b += Std.string(str);
				if(str.indexOf(".") == -1 && str.indexOf("e") == -1) {
					this.buf.b += Std.string(".");
				}
				break;
			case 4:
				var v = c.v;
				this.buf.b += Std.string("\"" + v + "\"");
				break;
			}
			break;
		case 1:
			var v = _g.v;
			var v1 = this.varName(v);
			this.buf.b += Std.string(v1);
			break;
		case 2:
			var g = _g.g;
			var v = hxsl_GlslOut.GLOBALS.get(g);
			this.buf.b += Std.string(v);
			break;
		case 3:
			var e1 = _g.e;
			this.buf.b += Std.string("(");
			this.addValue(e1,tabs);
			this.buf.b += Std.string(")");
			break;
		case 4:
			var el = _g.el;
			this.buf.b += Std.string("{\n");
			var t2 = tabs + "\t";
			var _g1 = 0;
			while(_g1 < el.length) {
				var e1 = el[_g1];
				++_g1;
				this.buf.b += Std.string(t2);
				this.addExpr(e1,t2);
				this.newLine(e1);
			}
			this.buf.b += Std.string(tabs);
			this.buf.b += Std.string("}");
			break;
		case 5:
			var op = _g.op;
			var e1 = _g.e1;
			var e2 = _g.e2;
			var _g1 = e1.t;
			var _g2 = e2.t;
			switch(op._hx_index) {
			case 1:
				if(_g1._hx_index == 5) {
					if(_g1.size == 3) {
						if(_g1.t._hx_index == 1) {
							if(_g2._hx_index == 8) {
								this.decl(hxsl_GlslOut.MAT34);
								this.decl("vec3 m3x4mult( vec3 v, _mat3x4 m) { vec4 ve = vec4(v,1.0); return vec3(dot(m.a,ve),dot(m.b,ve),dot(m.c,ve)); }");
								var tmp;
								if(op._hx_index == 20) {
									var _g3 = op.op;
									tmp = true;
								} else {
									tmp = false;
								}
								if(tmp) {
									this.addValue(e1,tabs);
									this.buf.b += Std.string(" = ");
								}
								this.buf.b += Std.string("m3x4mult(");
								this.addValue(e1,tabs);
								this.buf.b += Std.string(",");
								this.addValue(e2,tabs);
								this.buf.b += Std.string(")");
							} else {
								this.addValue(e1,tabs);
								this.buf.b += Std.string(" ");
								var v = hxsl_Printer.opStr(op);
								this.buf.b += Std.string(v);
								this.buf.b += Std.string(" ");
								this.addValue(e2,tabs);
							}
						} else {
							this.addValue(e1,tabs);
							this.buf.b += Std.string(" ");
							var v = hxsl_Printer.opStr(op);
							this.buf.b += Std.string(v);
							this.buf.b += Std.string(" ");
							this.addValue(e2,tabs);
						}
					} else {
						this.addValue(e1,tabs);
						this.buf.b += Std.string(" ");
						var v = hxsl_Printer.opStr(op);
						this.buf.b += Std.string(v);
						this.buf.b += Std.string(" ");
						this.addValue(e2,tabs);
					}
				} else {
					this.addValue(e1,tabs);
					this.buf.b += Std.string(" ");
					var v = hxsl_Printer.opStr(op);
					this.buf.b += Std.string(v);
					this.buf.b += Std.string(" ");
					this.addValue(e2,tabs);
				}
				break;
			case 5:
				if(_g1._hx_index == 5) {
					var _g3 = _g1.t;
					if(_g2._hx_index == 5) {
						var _g3 = _g2.size;
						var _g3 = _g2.t;
						var n = _g1.size;
						this.buf.b += Std.string("vec" + n + "(");
						var v;
						switch(op._hx_index) {
						case 5:
							v = "equal";
							break;
						case 6:
							v = "notEqual";
							break;
						case 7:
							v = "greaterThan";
							break;
						case 8:
							v = "greaterThanEqual";
							break;
						case 9:
							v = "lessThan";
							break;
						case 10:
							v = "lessThanEqual";
							break;
						default:
							throw haxe_Exception.thrown("assert");
						}
						this.buf.b += Std.string(v);
						this.buf.b += Std.string("(");
						this.addValue(e1,tabs);
						this.buf.b += Std.string(",");
						this.addValue(e2,tabs);
						this.buf.b += Std.string("))");
					} else {
						this.addValue(e1,tabs);
						this.buf.b += Std.string(" ");
						var v = hxsl_Printer.opStr(op);
						this.buf.b += Std.string(v);
						this.buf.b += Std.string(" ");
						this.addValue(e2,tabs);
					}
				} else {
					this.addValue(e1,tabs);
					this.buf.b += Std.string(" ");
					var v = hxsl_Printer.opStr(op);
					this.buf.b += Std.string(v);
					this.buf.b += Std.string(" ");
					this.addValue(e2,tabs);
				}
				break;
			case 6:
				if(_g1._hx_index == 5) {
					var _g3 = _g1.t;
					if(_g2._hx_index == 5) {
						var _g3 = _g2.size;
						var _g3 = _g2.t;
						var n = _g1.size;
						this.buf.b += Std.string("vec" + n + "(");
						var v;
						switch(op._hx_index) {
						case 5:
							v = "equal";
							break;
						case 6:
							v = "notEqual";
							break;
						case 7:
							v = "greaterThan";
							break;
						case 8:
							v = "greaterThanEqual";
							break;
						case 9:
							v = "lessThan";
							break;
						case 10:
							v = "lessThanEqual";
							break;
						default:
							throw haxe_Exception.thrown("assert");
						}
						this.buf.b += Std.string(v);
						this.buf.b += Std.string("(");
						this.addValue(e1,tabs);
						this.buf.b += Std.string(",");
						this.addValue(e2,tabs);
						this.buf.b += Std.string("))");
					} else {
						this.addValue(e1,tabs);
						this.buf.b += Std.string(" ");
						var v = hxsl_Printer.opStr(op);
						this.buf.b += Std.string(v);
						this.buf.b += Std.string(" ");
						this.addValue(e2,tabs);
					}
				} else {
					this.addValue(e1,tabs);
					this.buf.b += Std.string(" ");
					var v = hxsl_Printer.opStr(op);
					this.buf.b += Std.string(v);
					this.buf.b += Std.string(" ");
					this.addValue(e2,tabs);
				}
				break;
			case 7:
				if(_g1._hx_index == 5) {
					var _g3 = _g1.t;
					if(_g2._hx_index == 5) {
						var _g3 = _g2.size;
						var _g3 = _g2.t;
						var n = _g1.size;
						this.buf.b += Std.string("vec" + n + "(");
						var v;
						switch(op._hx_index) {
						case 5:
							v = "equal";
							break;
						case 6:
							v = "notEqual";
							break;
						case 7:
							v = "greaterThan";
							break;
						case 8:
							v = "greaterThanEqual";
							break;
						case 9:
							v = "lessThan";
							break;
						case 10:
							v = "lessThanEqual";
							break;
						default:
							throw haxe_Exception.thrown("assert");
						}
						this.buf.b += Std.string(v);
						this.buf.b += Std.string("(");
						this.addValue(e1,tabs);
						this.buf.b += Std.string(",");
						this.addValue(e2,tabs);
						this.buf.b += Std.string("))");
					} else {
						this.addValue(e1,tabs);
						this.buf.b += Std.string(" ");
						var v = hxsl_Printer.opStr(op);
						this.buf.b += Std.string(v);
						this.buf.b += Std.string(" ");
						this.addValue(e2,tabs);
					}
				} else {
					this.addValue(e1,tabs);
					this.buf.b += Std.string(" ");
					var v = hxsl_Printer.opStr(op);
					this.buf.b += Std.string(v);
					this.buf.b += Std.string(" ");
					this.addValue(e2,tabs);
				}
				break;
			case 8:
				if(_g1._hx_index == 5) {
					var _g3 = _g1.t;
					if(_g2._hx_index == 5) {
						var _g3 = _g2.size;
						var _g3 = _g2.t;
						var n = _g1.size;
						this.buf.b += Std.string("vec" + n + "(");
						var v;
						switch(op._hx_index) {
						case 5:
							v = "equal";
							break;
						case 6:
							v = "notEqual";
							break;
						case 7:
							v = "greaterThan";
							break;
						case 8:
							v = "greaterThanEqual";
							break;
						case 9:
							v = "lessThan";
							break;
						case 10:
							v = "lessThanEqual";
							break;
						default:
							throw haxe_Exception.thrown("assert");
						}
						this.buf.b += Std.string(v);
						this.buf.b += Std.string("(");
						this.addValue(e1,tabs);
						this.buf.b += Std.string(",");
						this.addValue(e2,tabs);
						this.buf.b += Std.string("))");
					} else {
						this.addValue(e1,tabs);
						this.buf.b += Std.string(" ");
						var v = hxsl_Printer.opStr(op);
						this.buf.b += Std.string(v);
						this.buf.b += Std.string(" ");
						this.addValue(e2,tabs);
					}
				} else {
					this.addValue(e1,tabs);
					this.buf.b += Std.string(" ");
					var v = hxsl_Printer.opStr(op);
					this.buf.b += Std.string(v);
					this.buf.b += Std.string(" ");
					this.addValue(e2,tabs);
				}
				break;
			case 9:
				if(_g1._hx_index == 5) {
					var _g3 = _g1.t;
					if(_g2._hx_index == 5) {
						var _g3 = _g2.size;
						var _g3 = _g2.t;
						var n = _g1.size;
						this.buf.b += Std.string("vec" + n + "(");
						var v;
						switch(op._hx_index) {
						case 5:
							v = "equal";
							break;
						case 6:
							v = "notEqual";
							break;
						case 7:
							v = "greaterThan";
							break;
						case 8:
							v = "greaterThanEqual";
							break;
						case 9:
							v = "lessThan";
							break;
						case 10:
							v = "lessThanEqual";
							break;
						default:
							throw haxe_Exception.thrown("assert");
						}
						this.buf.b += Std.string(v);
						this.buf.b += Std.string("(");
						this.addValue(e1,tabs);
						this.buf.b += Std.string(",");
						this.addValue(e2,tabs);
						this.buf.b += Std.string("))");
					} else {
						this.addValue(e1,tabs);
						this.buf.b += Std.string(" ");
						var v = hxsl_Printer.opStr(op);
						this.buf.b += Std.string(v);
						this.buf.b += Std.string(" ");
						this.addValue(e2,tabs);
					}
				} else {
					this.addValue(e1,tabs);
					this.buf.b += Std.string(" ");
					var v = hxsl_Printer.opStr(op);
					this.buf.b += Std.string(v);
					this.buf.b += Std.string(" ");
					this.addValue(e2,tabs);
				}
				break;
			case 10:
				if(_g1._hx_index == 5) {
					var _g3 = _g1.t;
					if(_g2._hx_index == 5) {
						var _g3 = _g2.size;
						var _g3 = _g2.t;
						var n = _g1.size;
						this.buf.b += Std.string("vec" + n + "(");
						var v;
						switch(op._hx_index) {
						case 5:
							v = "equal";
							break;
						case 6:
							v = "notEqual";
							break;
						case 7:
							v = "greaterThan";
							break;
						case 8:
							v = "greaterThanEqual";
							break;
						case 9:
							v = "lessThan";
							break;
						case 10:
							v = "lessThanEqual";
							break;
						default:
							throw haxe_Exception.thrown("assert");
						}
						this.buf.b += Std.string(v);
						this.buf.b += Std.string("(");
						this.addValue(e1,tabs);
						this.buf.b += Std.string(",");
						this.addValue(e2,tabs);
						this.buf.b += Std.string("))");
					} else {
						this.addValue(e1,tabs);
						this.buf.b += Std.string(" ");
						var v = hxsl_Printer.opStr(op);
						this.buf.b += Std.string(v);
						this.buf.b += Std.string(" ");
						this.addValue(e2,tabs);
					}
				} else {
					this.addValue(e1,tabs);
					this.buf.b += Std.string(" ");
					var v = hxsl_Printer.opStr(op);
					this.buf.b += Std.string(v);
					this.buf.b += Std.string(" ");
					this.addValue(e2,tabs);
				}
				break;
			case 18:
				this.decl("int _ushr( int i, int j ) { return int(uint(i) >> uint(j)); }");
				this.buf.b += Std.string("_ushr(");
				this.addValue(e1,tabs);
				this.buf.b += Std.string(",");
				this.addValue(e2,tabs);
				this.buf.b += Std.string(")");
				break;
			case 19:
				if(e.t != hxsl_Type.TInt) {
					var tmp;
					if(op._hx_index == 20) {
						var _g3 = op.op;
						tmp = true;
					} else {
						tmp = false;
					}
					if(tmp) {
						this.addValue(e1,tabs);
						this.buf.b += Std.string(" = ");
					}
					this.addExpr({ e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Mod), t : hxsl_Type.TFun([]), p : e.p},[e1,e2]), t : e.t, p : e.p},tabs);
				} else {
					this.addValue(e1,tabs);
					this.buf.b += Std.string(" ");
					var v = hxsl_Printer.opStr(op);
					this.buf.b += Std.string(v);
					this.buf.b += Std.string(" ");
					this.addValue(e2,tabs);
				}
				break;
			case 20:
				switch(op.op._hx_index) {
				case 1:
					if(_g1._hx_index == 5) {
						if(_g1.size == 3) {
							if(_g1.t._hx_index == 1) {
								if(_g2._hx_index == 8) {
									this.decl(hxsl_GlslOut.MAT34);
									this.decl("vec3 m3x4mult( vec3 v, _mat3x4 m) { vec4 ve = vec4(v,1.0); return vec3(dot(m.a,ve),dot(m.b,ve),dot(m.c,ve)); }");
									var tmp;
									if(op._hx_index == 20) {
										var _g1 = op.op;
										tmp = true;
									} else {
										tmp = false;
									}
									if(tmp) {
										this.addValue(e1,tabs);
										this.buf.b += Std.string(" = ");
									}
									this.buf.b += Std.string("m3x4mult(");
									this.addValue(e1,tabs);
									this.buf.b += Std.string(",");
									this.addValue(e2,tabs);
									this.buf.b += Std.string(")");
								} else {
									this.addValue(e1,tabs);
									this.buf.b += Std.string(" ");
									var v = hxsl_Printer.opStr(op);
									this.buf.b += Std.string(v);
									this.buf.b += Std.string(" ");
									this.addValue(e2,tabs);
								}
							} else {
								this.addValue(e1,tabs);
								this.buf.b += Std.string(" ");
								var v = hxsl_Printer.opStr(op);
								this.buf.b += Std.string(v);
								this.buf.b += Std.string(" ");
								this.addValue(e2,tabs);
							}
						} else {
							this.addValue(e1,tabs);
							this.buf.b += Std.string(" ");
							var v = hxsl_Printer.opStr(op);
							this.buf.b += Std.string(v);
							this.buf.b += Std.string(" ");
							this.addValue(e2,tabs);
						}
					} else {
						this.addValue(e1,tabs);
						this.buf.b += Std.string(" ");
						var v = hxsl_Printer.opStr(op);
						this.buf.b += Std.string(v);
						this.buf.b += Std.string(" ");
						this.addValue(e2,tabs);
					}
					break;
				case 19:
					if(e.t != hxsl_Type.TInt) {
						var tmp;
						if(op._hx_index == 20) {
							var _g1 = op.op;
							tmp = true;
						} else {
							tmp = false;
						}
						if(tmp) {
							this.addValue(e1,tabs);
							this.buf.b += Std.string(" = ");
						}
						this.addExpr({ e : hxsl_TExprDef.TCall({ e : hxsl_TExprDef.TGlobal(hxsl_TGlobal.Mod), t : hxsl_Type.TFun([]), p : e.p},[e1,e2]), t : e.t, p : e.p},tabs);
					} else {
						this.addValue(e1,tabs);
						this.buf.b += Std.string(" ");
						var v = hxsl_Printer.opStr(op);
						this.buf.b += Std.string(v);
						this.buf.b += Std.string(" ");
						this.addValue(e2,tabs);
					}
					break;
				default:
					this.addValue(e1,tabs);
					this.buf.b += Std.string(" ");
					var v = hxsl_Printer.opStr(op);
					this.buf.b += Std.string(v);
					this.buf.b += Std.string(" ");
					this.addValue(e2,tabs);
				}
				break;
			default:
				this.addValue(e1,tabs);
				this.buf.b += Std.string(" ");
				var v = hxsl_Printer.opStr(op);
				this.buf.b += Std.string(v);
				this.buf.b += Std.string(" ");
				this.addValue(e2,tabs);
			}
			break;
		case 6:
			var op = _g.op;
			var e1 = _g.e1;
			var v;
			switch(op._hx_index) {
			case 0:
				v = "++";
				break;
			case 1:
				v = "--";
				break;
			case 2:
				v = "!";
				break;
			case 3:
				v = "-";
				break;
			case 4:
				v = "~";
				break;
			default:
				throw haxe_Exception.thrown("assert");
			}
			this.buf.b += Std.string(v);
			this.addValue(e1,tabs);
			break;
		case 7:
			var v = _g.v;
			var init = _g.init;
			this.locals.h[v.id] = v;
			if(init != null) {
				var v1 = this.varName(v);
				this.buf.b += Std.string(v1);
				this.buf.b += Std.string(" = ");
				this.addValue(init,tabs);
			} else {
				this.buf.b += Std.string("/*var*/");
			}
			break;
		case 8:
			var _g1 = _g.e;
			var _g2 = _g.args;
			var _g3 = _g1.e;
			var _g4 = _g1.p;
			var _g4 = _g1.t;
			if(_g3._hx_index == 2) {
				var _g4 = _g3.g;
				switch(_g4._hx_index) {
				case 35:
					var g = _g4;
					var args = _g2;
					var v = this.getFunName(g,args,e.t);
					this.buf.b += Std.string(v);
					this.buf.b += Std.string("(");
					this.addValue(args[0],tabs);
					this.buf.b += Std.string(", ");
					this.addValue(args[1],tabs);
					if(args.length != 2) {
						this.buf.b += Std.string(", ");
						this.addValue(args[2],tabs);
						this.buf.b += Std.string(")");
					} else {
						this.buf.b += Std.string(", 0)");
					}
					break;
				case 36:
					var g = _g4;
					var args = _g2;
					var v = this.getFunName(g,args,e.t);
					this.buf.b += Std.string(v);
					this.buf.b += Std.string("(");
					this.addValue(args[0],tabs);
					if(args.length != 1) {
						this.buf.b += Std.string(", ");
						this.addValue(args[1],tabs);
						this.buf.b += Std.string(")");
					} else {
						this.buf.b += Std.string(", 0)");
					}
					break;
				case 53:
					if(_g2.length == 1) {
						var e1 = _g2[0];
						this.buf.b += Std.string("clamp(");
						this.addValue(e1,tabs);
						this.buf.b += Std.string(", 0., 1.)");
					} else {
						var v = _g1;
						var args = _g2;
						var _g3 = v.e;
						if(_g3._hx_index == 2) {
							var g = _g3.g;
							var v1 = this.getFunName(g,args,e.t);
							this.buf.b += Std.string(v1);
						} else {
							this.addValue(v,tabs);
						}
						this.buf.b += Std.string("(");
						var first = true;
						var _g3 = 0;
						while(_g3 < args.length) {
							var e1 = args[_g3];
							++_g3;
							if(first) {
								first = false;
							} else {
								this.buf.b += Std.string(", ");
							}
							this.addValue(e1,tabs);
						}
						this.buf.b += Std.string(")");
					}
					break;
				default:
					var v = _g1;
					var args = _g2;
					var _g3 = v.e;
					if(_g3._hx_index == 2) {
						var g = _g3.g;
						var v1 = this.getFunName(g,args,e.t);
						this.buf.b += Std.string(v1);
					} else {
						this.addValue(v,tabs);
					}
					this.buf.b += Std.string("(");
					var first = true;
					var _g3 = 0;
					while(_g3 < args.length) {
						var e1 = args[_g3];
						++_g3;
						if(first) {
							first = false;
						} else {
							this.buf.b += Std.string(", ");
						}
						this.addValue(e1,tabs);
					}
					this.buf.b += Std.string(")");
				}
			} else {
				var v = _g1;
				var args = _g2;
				var _g1 = v.e;
				if(_g1._hx_index == 2) {
					var g = _g1.g;
					var v1 = this.getFunName(g,args,e.t);
					this.buf.b += Std.string(v1);
				} else {
					this.addValue(v,tabs);
				}
				this.buf.b += Std.string("(");
				var first = true;
				var _g1 = 0;
				while(_g1 < args.length) {
					var e1 = args[_g1];
					++_g1;
					if(first) {
						first = false;
					} else {
						this.buf.b += Std.string(", ");
					}
					this.addValue(e1,tabs);
				}
				this.buf.b += Std.string(")");
			}
			break;
		case 9:
			var e1 = _g.e;
			var regs = _g.regs;
			if(e1.t._hx_index == 3) {
				var _g1 = 0;
				while(_g1 < regs.length) {
					var r = regs[_g1];
					++_g1;
					if(r != hxsl_Component.X) {
						throw haxe_Exception.thrown("assert");
					}
				}
				switch(regs.length) {
				case 1:
					this.addValue(e1,tabs);
					break;
				case 2:
					this.decl("vec2 _vec2( float v ) { return vec2(v,v); }");
					this.buf.b += Std.string("_vec2(");
					this.addValue(e1,tabs);
					this.buf.b += Std.string(")");
					break;
				case 3:
					this.decl("vec3 _vec3( float v ) { return vec3(v,v,v); }");
					this.buf.b += Std.string("_vec3(");
					this.addValue(e1,tabs);
					this.buf.b += Std.string(")");
					break;
				case 4:
					this.decl("vec4 _vec4( float v ) { return vec4(v,v,v,v); }");
					this.buf.b += Std.string("_vec4(");
					this.addValue(e1,tabs);
					this.buf.b += Std.string(")");
					break;
				default:
					throw haxe_Exception.thrown("assert");
				}
			} else {
				this.addValue(e1,tabs);
				this.buf.b += Std.string(".");
				var _g1 = 0;
				while(_g1 < regs.length) {
					var r = regs[_g1];
					++_g1;
					var _this = this.buf;
					var _this1 = _this.b;
					var tmp;
					switch(r._hx_index) {
					case 0:
						tmp = "x";
						break;
					case 1:
						tmp = "y";
						break;
					case 2:
						tmp = "z";
						break;
					case 3:
						tmp = "w";
						break;
					}
					_this.b = _this1 + Std.string(tmp);
				}
			}
			break;
		case 10:
			var econd = _g.econd;
			var eif = _g.eif;
			var eelse = _g.eelse;
			this.buf.b += Std.string("if( ");
			this.addValue(econd,tabs);
			this.buf.b += Std.string(") ");
			this.addExpr(eif,tabs);
			if(eelse != null) {
				if(!this.isBlock(eif)) {
					this.buf.b += Std.string(";");
				}
				this.buf.b += Std.string(" else ");
				this.addExpr(eelse,tabs);
			}
			break;
		case 11:
			this.buf.b += Std.string("discard");
			break;
		case 12:
			var e1 = _g.e;
			if(e1 == null) {
				this.buf.b += Std.string("return");
			} else {
				this.buf.b += Std.string("return ");
				this.addValue(e1,tabs);
			}
			break;
		case 13:
			var v = _g.v;
			var it = _g.it;
			var loop = _g.loop;
			this.locals.h[v.id] = v;
			var _g1 = it.e;
			if(_g1._hx_index == 5) {
				if(_g1.op._hx_index == 21) {
					var e1 = _g1.e1;
					var e2 = _g1.e2;
					this.buf.b += Std.string("for(");
					this.buf.b += Std.string(v.name + "=");
					this.addValue(e1,tabs);
					this.buf.b += Std.string(";" + v.name + "<");
					this.addValue(e2,tabs);
					this.buf.b += Std.string(";" + v.name + "++) ");
					this.addBlock(loop,tabs);
				} else {
					throw haxe_Exception.thrown("assert");
				}
			} else {
				throw haxe_Exception.thrown("assert");
			}
			break;
		case 14:
			this.buf.b += Std.string("continue");
			break;
		case 15:
			this.buf.b += Std.string("break");
			break;
		case 16:
			var e1 = _g.e;
			var index = _g.index;
			this.addValue(e1,tabs);
			this.buf.b += Std.string("[");
			this.addValue(index,tabs);
			this.buf.b += Std.string("]");
			break;
		case 17:
			var el = _g.el;
			var _g1 = e.t;
			if(_g1._hx_index == 15) {
				var _g2 = _g1.size;
				var t = _g1.t;
				this.addType(t);
			} else {
				throw haxe_Exception.thrown("assert");
			}
			this.buf.b += Std.string("[" + el.length + "]");
			this.buf.b += Std.string("(");
			var first = true;
			var _g1 = 0;
			while(_g1 < el.length) {
				var e = el[_g1];
				++_g1;
				if(first) {
					first = false;
				} else {
					this.buf.b += Std.string(", ");
				}
				this.addValue(e,tabs);
			}
			this.buf.b += Std.string(")");
			break;
		case 18:
			var _g1 = _g.e;
			var _g1 = _g.cases;
			var _g1 = _g.def;
			this.buf.b += Std.string("switch(...)");
			break;
		case 19:
			var _g1 = _g.e;
			var _g2 = _g.loop;
			if(_g.normalWhile == false) {
				var loop = _g2;
				var e = _g1;
				var old = tabs;
				tabs += "\t";
				this.buf.b += Std.string("do ");
				this.addBlock(loop,tabs);
				this.buf.b += Std.string(" while( ");
				this.addValue(e,tabs);
				this.buf.b += Std.string(" )");
			} else {
				var loop = _g2;
				var e = _g1;
				this.buf.b += Std.string("while( ");
				this.addValue(e,tabs);
				this.buf.b += Std.string(" ) ");
				this.addBlock(loop,tabs);
			}
			break;
		case 20:
			var _g1 = _g.m;
			var _g1 = _g.args;
			var e = _g.e;
			this.addExpr(e,tabs);
			break;
		}
	}
	,varName: function(v) {
		if(v.kind == hxsl_VarKind.Output) {
			if(this.isVertex) {
				return "gl_Position";
			}
			if(this.glES != null && this.glES <= 2) {
				if(this.outIndexes == null) {
					return "gl_FragColor";
				}
				return "gl_FragData[" + this.outIndexes.h[v.id] + "]";
			}
		}
		var n = this.varNames.h[v.id];
		if(n != null) {
			return n;
		}
		n = v.name;
		if(Object.prototype.hasOwnProperty.call(hxsl_GlslOut.KWDS.h,n)) {
			n = "_" + n;
		}
		if(Object.prototype.hasOwnProperty.call(this.allNames.h,n)) {
			var k = 2;
			n += "_";
			while(Object.prototype.hasOwnProperty.call(this.allNames.h,n + k)) ++k;
			n += k;
		}
		this.varNames.h[v.id] = n;
		this.allNames.h[n] = v.id;
		return n;
	}
	,newLine: function(e) {
		if(this.isBlock(e)) {
			this.buf.b += Std.string("\n");
		} else {
			this.buf.b += Std.string(";\n");
		}
	}
	,isBlock: function(e) {
		var _g = e.e;
		switch(_g._hx_index) {
		case 4:
			var _g1 = _g.el;
			return true;
		case 13:
			var _g1 = _g.v;
			var _g1 = _g.it;
			var loop = _g.loop;
			return this.isBlock(loop);
		case 19:
			var _g1 = _g.e;
			if(_g.normalWhile == true) {
				var loop = _g.loop;
				return this.isBlock(loop);
			} else {
				return false;
			}
			break;
		default:
			return false;
		}
	}
	,initVar: function(v) {
		switch(v.kind._hx_index) {
		case 0:case 2:
			var _g = v.type;
			var tmp;
			if(_g._hx_index == 16) {
				var _g1 = _g.t;
				var _g1 = _g.size;
				tmp = true;
			} else {
				tmp = false;
			}
			if(tmp) {
				this.buf.b += Std.string("layout(std140) ");
			}
			this.buf.b += Std.string("uniform ");
			break;
		case 1:
			this.buf.b += Std.string(this.glES != null && this.glES <= 2 ? "attribute " : "in ");
			break;
		case 3:
			this.buf.b += Std.string(this.glES != null && this.glES <= 2 ? "varying " : this.isVertex ? "out " : "in ");
			break;
		case 4:
			break;
		case 5:
			if(this.glES != null && this.glES <= 2) {
				this.outIndexes.h[v.id] = this.outIndex++;
				return;
			}
			if(this.isVertex) {
				return;
			}
			if(this.glES != null) {
				this.buf.b += Std.string("layout(location=" + this.outIndex++ + ") ");
			}
			this.buf.b += Std.string("out ");
			break;
		case 6:
			return;
		}
		if(v.qualifiers != null) {
			var _g = 0;
			var _g1 = v.qualifiers;
			while(_g < _g1.length) {
				var q = _g1[_g];
				++_g;
				if(q._hx_index == 6) {
					var p = q.p;
					switch(p._hx_index) {
					case 0:
						this.buf.b += Std.string("lowp ");
						break;
					case 1:
						this.buf.b += Std.string("mediump ");
						break;
					case 2:
						this.buf.b += Std.string("highp ");
						break;
					}
				}
			}
		}
		this.addVar(v);
		this.buf.b += Std.string(";\n");
	}
	,initVars: function(s) {
		this.outIndex = 0;
		this.uniformBuffer = 0;
		this.outIndexes = new haxe_ds_IntMap();
		var _g = 0;
		var _g1 = s.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this.initVar(v);
		}
		this.buf.b += Std.string("\n");
		if(this.outIndex < 2) {
			this.outIndexes = null;
		} else if(!this.isVertex && (this.glES != null && this.glES <= 2)) {
			this.decl("#extension GL_EXT_draw_buffers : enable");
		}
	}
	,run: function(s) {
		this.locals = new haxe_ds_IntMap();
		this.decls = [];
		this.buf = new StringBuf();
		this.exprValues = [];
		this.decl("precision mediump float;");
		if(s.funs.length != 1) {
			throw haxe_Exception.thrown("assert");
		}
		var f = s.funs[0];
		this.isVertex = f.kind == hxsl_FunctionKind.Vertex;
		this.initVars(s);
		var tmp = this.buf;
		this.buf = new StringBuf();
		this.buf.b += Std.string("void main(void) {\n");
		var _g = f.expr.e;
		if(_g._hx_index == 4) {
			var el = _g.el;
			var _g = 0;
			while(_g < el.length) {
				var e = el[_g];
				++_g;
				this.buf.b += Std.string("\t");
				this.addExpr(e,"\t");
				this.newLine(e);
			}
		} else {
			this.addExpr(f.expr,"");
		}
		if(this.isVertex) {
			this.buf.b += Std.string("\tgl_Position.z += gl_Position.z - gl_Position.w;\n");
		}
		this.buf.b += Std.string("}");
		this.exprValues.push(this.buf.b);
		this.buf = tmp;
		var locals = Lambda.array(this.locals);
		locals.sort(function(v1,v2) {
			return Reflect.compare(v1.name,v2.name);
		});
		var _g = 0;
		while(_g < locals.length) {
			var v = locals[_g];
			++_g;
			this.addVar(v);
			this.buf.b += Std.string(";\n");
		}
		this.buf.b += Std.string("\n");
		var _g = 0;
		var _g1 = this.exprValues;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			this.buf.b += Std.string(e);
			this.buf.b += Std.string("\n\n");
		}
		if(this.glES != null) {
			this.decl("#version " + (this.version < 100 ? 100 : this.version) + (this.version > 150 ? " es" : ""));
		} else if(this.version != null) {
			this.decl("#version " + (this.version > 150 ? 150 : this.version));
		} else {
			this.decl("#version 130");
		}
		this.decls.push(this.buf.b);
		this.buf = null;
		return this.decls.join("\n");
	}
	,__class__: hxsl_GlslOut
};
var hxsl__$Linker_AllocatedVar = function() {
};
hxsl__$Linker_AllocatedVar.__name__ = "hxsl._Linker.AllocatedVar";
hxsl__$Linker_AllocatedVar.prototype = {
	__class__: hxsl__$Linker_AllocatedVar
};
var hxsl__$Linker_ShaderInfos = function(n,v) {
	this.name = n;
	this.uid = hxsl__$Linker_ShaderInfos.UID++;
	this.vertex = v;
	this.processed = new haxe_ds_IntMap();
	this.usedFunctions = [];
	this.read = new haxe_ds_IntMap();
	this.write = new haxe_ds_IntMap();
};
hxsl__$Linker_ShaderInfos.__name__ = "hxsl._Linker.ShaderInfos";
hxsl__$Linker_ShaderInfos.prototype = {
	__class__: hxsl__$Linker_ShaderInfos
};
var hxsl_Linker = function(batchMode) {
	if(batchMode == null) {
		batchMode = false;
	}
	this.debugDepth = 0;
	this.batchMode = batchMode;
};
hxsl_Linker.__name__ = "hxsl.Linker";
hxsl_Linker.prototype = {
	error: function(msg,p) {
		return hxsl_Error.t(msg,p);
	}
	,mergeVar: function(path,v,v2,p,shaderName) {
		switch(v.kind._hx_index) {
		case 2:
			if(!(shaderName != null && hxsl_Tools.hasBorrowQualifier(v2,shaderName))) {
				throw haxe_Exception.thrown("assert");
			}
			break;
		case 0:case 1:case 3:case 4:case 5:
			break;
		case 6:
			throw haxe_Exception.thrown("assert");
		}
		if(v.kind != v2.kind && v.kind != hxsl_VarKind.Local && v2.kind != hxsl_VarKind.Local) {
			this.error("'" + path + "' kind does not match : " + Std.string(v.kind) + " should be " + Std.string(v2.kind),p);
		}
		var _g = v.type;
		var _g1 = v2.type;
		if(_g._hx_index == 13) {
			if(_g1._hx_index == 13) {
				var fl2 = _g1.vl;
				var fl1 = _g.vl;
				var _g = 0;
				while(_g < fl1.length) {
					var f1 = fl1[_g];
					++_g;
					var ft = null;
					var _g1 = 0;
					while(_g1 < fl2.length) {
						var f2 = fl2[_g1];
						++_g1;
						if(f1.name == f2.name) {
							ft = f2;
							break;
						}
					}
					if(ft == null) {
						fl2.push(this.allocVar(f1,p,shaderName).v);
					} else {
						this.mergeVar(path + "." + ft.name,f1,ft,p,shaderName);
					}
				}
			} else if(!Type.enumEq(v.type,v2.type)) {
				this.error("'" + path + "' type does not match : " + hxsl_Tools.toString(v.type) + " should be " + hxsl_Tools.toString(v2.type),p);
			}
		} else if(!Type.enumEq(v.type,v2.type)) {
			this.error("'" + path + "' type does not match : " + hxsl_Tools.toString(v.type) + " should be " + hxsl_Tools.toString(v2.type),p);
		}
	}
	,allocVar: function(v,p,shaderName,path,parent) {
		var _gthis = this;
		if(v.parent != null && parent == null) {
			parent = this.allocVar(v.parent,p,shaderName);
			var p1 = parent.v;
			path = p1.name;
			p1 = p1.parent;
			while(p1 != null) {
				path = p1.name + "." + path;
				p1 = p1.parent;
			}
		}
		var key = path == null ? v.name : path + "." + v.name;
		if(v.qualifiers != null) {
			var _g = 0;
			var _g1 = v.qualifiers;
			while(_g < _g1.length) {
				var q = _g1[_g];
				++_g;
				if(q._hx_index == 4) {
					var n = q.n;
					key = n;
				}
			}
		}
		var v2 = this.varMap.h[key];
		var vname = v.name;
		if(v2 != null) {
			var _g = 0;
			var _g1 = v2.merged;
			while(_g < _g1.length) {
				var vm = _g1[_g];
				++_g;
				if(vm == v) {
					return v2;
				}
			}
			var tmp;
			var borrowed = hxsl_Tools.hasBorrowQualifier(v2.v,shaderName);
			if(!(v.kind == hxsl_VarKind.Param && !borrowed && !hxsl_Tools.hasQualifier(v,hxsl_VarQualifier.Shared) && !_gthis.isBatchShader || v.kind == hxsl_VarKind.Function || (v.kind == hxsl_VarKind.Var || v.kind == hxsl_VarKind.Local) && hxsl_Tools.hasQualifier(v,hxsl_VarQualifier.Private))) {
				var v1 = v2.v;
				var borrowed = hxsl_Tools.hasBorrowQualifier(v,v2.rootShaderName);
				tmp = v1.kind == hxsl_VarKind.Param && !borrowed && !hxsl_Tools.hasQualifier(v1,hxsl_VarQualifier.Shared) && !_gthis.isBatchShader || v1.kind == hxsl_VarKind.Function || (v1.kind == hxsl_VarKind.Var || v1.kind == hxsl_VarKind.Local) && hxsl_Tools.hasQualifier(v1,hxsl_VarQualifier.Private);
			} else {
				tmp = true;
			}
			if(tmp || v.kind == hxsl_VarKind.Param && v2.v.kind == hxsl_VarKind.Param) {
				var k = 2;
				while(true) {
					var a = this.varMap.h[key + k];
					if(a == null) {
						break;
					}
					var _g = 0;
					var _g1 = a.merged;
					while(_g < _g1.length) {
						var vm = _g1[_g];
						++_g;
						if(vm == v) {
							return a;
						}
					}
					++k;
				}
				vname += k;
				key += k;
			} else {
				v2.merged.push(v);
				this.mergeVar(key,v,v2.v,p,v2.rootShaderName);
				this.varIdMap.h[v.id] = v2.id;
				return v2;
			}
		}
		var vid = this.allVars.length + 1;
		var v2 = { id : vid, name : vname, type : v.type, kind : v.kind, qualifiers : v.qualifiers, parent : parent == null ? null : parent.v};
		var a = new hxsl__$Linker_AllocatedVar();
		a.v = v2;
		a.merged = [v];
		a.path = key;
		a.id = vid;
		a.parent = parent;
		a.instanceIndex = this.curInstance;
		a.rootShaderName = shaderName;
		this.allVars.push(a);
		this.varMap.h[key] = a;
		var _g = v2.type;
		if(_g._hx_index == 13) {
			var vl = _g.vl;
			var _g = [];
			var _g1 = 0;
			while(_g1 < vl.length) {
				var v = vl[_g1];
				++_g1;
				_g.push(this.allocVar(v,p,shaderName,key,a).v);
			}
			v2.type = hxsl_Type.TStruct(_g);
		}
		return a;
	}
	,mapExprVar: function(e) {
		var _g = e.e;
		switch(_g._hx_index) {
		case 1:
			var v = _g.v;
			if(!this.locals.h.hasOwnProperty(v.id)) {
				var v1 = this.allocVar(v,e.p);
				if(this.curShader != null && !this.curShader.write.h.hasOwnProperty(v1.id)) {
					this.curShader.read.h[v1.id] = v1;
					if(this.curShader.vertex == null && v1.v.kind == hxsl_VarKind.Var) {
						this.curShader.vertex = false;
					}
				}
				return { e : hxsl_TExprDef.TVar(v1.v), t : v1.v.type, p : e.p};
			}
			break;
		case 5:
			var op = _g.op;
			var e1 = _g.e1;
			var e2 = _g.e2;
			var _g1 = e1.e;
			switch(op._hx_index) {
			case 4:
				switch(_g1._hx_index) {
				case 1:
					var _g2 = _g1.v;
					var v = _g2;
					if(!this.locals.h.hasOwnProperty(v.id)) {
						var e21 = this.mapExprVar(e2);
						var v1 = this.allocVar(v,e1.p);
						if(this.curShader != null) {
							this.curShader.write.h[v1.id] = v1;
						}
						return { e : hxsl_TExprDef.TBinop(op,{ e : hxsl_TExprDef.TVar(v1.v), t : v1.v.type, p : e.p},e21), t : e.t, p : e.p};
					} else {
						var v = _g2;
						if(!this.locals.h.hasOwnProperty(v.id)) {
							var e11 = this.mapExprVar(e1);
							var e21 = this.mapExprVar(e2);
							var v1 = this.allocVar(v,e11.p);
							if(this.curShader != null) {
								this.curShader.write.h[v1.id] = v1;
							}
							return { e : hxsl_TExprDef.TBinop(op,e11,e21), t : e.t, p : e.p};
						}
					}
					break;
				case 9:
					var _g2 = _g1.e;
					var _g3 = _g1.regs;
					var _g3 = _g2.e;
					var _g4 = _g2.p;
					var _g4 = _g2.t;
					if(_g3._hx_index == 1) {
						var v = _g3.v;
						if(!this.locals.h.hasOwnProperty(v.id)) {
							var e11 = this.mapExprVar(e1);
							var e21 = this.mapExprVar(e2);
							var v1 = this.allocVar(v,e11.p);
							if(this.curShader != null) {
								this.curShader.write.h[v1.id] = v1;
							}
							return { e : hxsl_TExprDef.TBinop(op,e11,e21), t : e.t, p : e.p};
						}
					}
					break;
				default:
				}
				break;
			case 20:
				var _g2 = op.op;
				switch(_g1._hx_index) {
				case 1:
					var v = _g1.v;
					if(!this.locals.h.hasOwnProperty(v.id)) {
						var e11 = this.mapExprVar(e1);
						var e21 = this.mapExprVar(e2);
						var v1 = this.allocVar(v,e11.p);
						if(this.curShader != null) {
							this.curShader.write.h[v1.id] = v1;
						}
						return { e : hxsl_TExprDef.TBinop(op,e11,e21), t : e.t, p : e.p};
					}
					break;
				case 9:
					var _g2 = _g1.e;
					var _g3 = _g1.regs;
					var _g1 = _g2.e;
					var _g3 = _g2.p;
					var _g3 = _g2.t;
					if(_g1._hx_index == 1) {
						var v = _g1.v;
						if(!this.locals.h.hasOwnProperty(v.id)) {
							var e11 = this.mapExprVar(e1);
							var e21 = this.mapExprVar(e2);
							var v1 = this.allocVar(v,e11.p);
							if(this.curShader != null) {
								this.curShader.write.h[v1.id] = v1;
							}
							return { e : hxsl_TExprDef.TBinop(op,e11,e21), t : e.t, p : e.p};
						}
					}
					break;
				default:
				}
				break;
			default:
			}
			break;
		case 7:
			var _g1 = _g.init;
			var v = _g.v;
			this.locals.h[v.id] = true;
			break;
		case 11:
			if(this.curShader != null) {
				this.curShader.vertex = false;
				this.curShader.hasDiscard = true;
			}
			break;
		case 13:
			var _g1 = _g.it;
			var _g1 = _g.loop;
			var v = _g.v;
			this.locals.h[v.id] = true;
			break;
		default:
		}
		return hxsl_Tools.map(e,$bind(this,this.mapExprVar));
	}
	,addShader: function(name,vertex,e,p) {
		var s = new hxsl__$Linker_ShaderInfos(name,vertex);
		this.curShader = s;
		s.priority = p;
		s.body = this.mapExprVar(e);
		this.shaders.push(s);
		this.curShader = null;
		return s;
	}
	,sortByPriorityDesc: function(s1,s2) {
		if(s1.priority == s2.priority) {
			return s1.uid - s2.uid;
		}
		return s2.priority - s1.priority;
	}
	,buildDependency: function(s,v,isWritten) {
		var found = !isWritten;
		var _g = 0;
		var _g1 = this.shaders;
		while(_g < _g1.length) {
			var parent = _g1[_g];
			++_g;
			if(parent == s) {
				found = true;
				continue;
			} else if(!found) {
				continue;
			}
			if(!parent.write.h.hasOwnProperty(v.id)) {
				continue;
			}
			if(s.vertex) {
				if(parent.vertex == false) {
					continue;
				}
				if(parent.vertex == null) {
					parent.vertex = true;
				}
			}
			s.deps.set(parent,true);
			this.debugDepth++;
			this.initDependencies(parent);
			this.debugDepth--;
			if(!parent.read.h.hasOwnProperty(v.id)) {
				return;
			}
		}
		if(v.v.kind == hxsl_VarKind.Var) {
			this.error("Variable " + v.path + " required by " + s.name + " is missing initializer",null);
		}
	}
	,initDependencies: function(s) {
		if(s.deps != null) {
			return;
		}
		s.deps = new haxe_ds_ObjectMap();
		var r = s.read.iterator();
		while(r.hasNext()) {
			var r1 = r.next();
			this.buildDependency(s,r1,s.write.h.hasOwnProperty(r1.id));
		}
		if(s.vertex == null) {
			var d = s.deps.keys();
			while(d.hasNext()) {
				var d1 = d.next();
				if(d1.vertex == false) {
					s.vertex = false;
					break;
				}
			}
		}
		if(s.vertex) {
			var d = s.deps.keys();
			while(d.hasNext()) {
				var d1 = d.next();
				if(d1.vertex == null) {
					d1.vertex = true;
				}
			}
		}
	}
	,collect: function(cur,out,vertex) {
		if(cur.onStack) {
			this.error("Loop in shader dependencies (" + cur.name + ")",null);
		}
		if(cur.marked == vertex) {
			return;
		}
		cur.marked = vertex;
		cur.onStack = true;
		var _g = [];
		var d = cur.deps.keys();
		while(d.hasNext()) {
			var d1 = d.next();
			_g.push(d1);
		}
		var deps = _g;
		deps.sort($bind(this,this.sortByPriorityDesc));
		var _g = 0;
		while(_g < deps.length) {
			var d = deps[_g];
			++_g;
			this.collect(d,out,vertex);
		}
		if(cur.vertex == null) {
			cur.vertex = vertex;
		}
		if(cur.vertex == vertex) {
			out.push(cur);
		}
		cur.onStack = false;
	}
	,uniqueLocals: function(expr,locals) {
		var _g = expr.e;
		switch(_g._hx_index) {
		case 4:
			var el = _g.el;
			var _g1 = new haxe_ds_StringMap();
			var h = locals.h;
			var k_h = h;
			var k_keys = Object.keys(h);
			var k_length = k_keys.length;
			var k_current = 0;
			while(k_current < k_length) {
				var k = k_keys[k_current++];
				_g1.h[k] = true;
			}
			var locals1 = _g1;
			var _g1 = 0;
			while(_g1 < el.length) {
				var e = el[_g1];
				++_g1;
				this.uniqueLocals(e,locals1);
			}
			break;
		case 7:
			var _g1 = _g.init;
			var v = _g.v;
			if(Object.prototype.hasOwnProperty.call(locals.h,v.name)) {
				var k = 2;
				while(Object.prototype.hasOwnProperty.call(locals.h,v.name + k)) ++k;
				v.name += k;
			}
			locals.h[v.name] = true;
			break;
		default:
			var _g = $bind(this,this.uniqueLocals);
			var locals1 = locals;
			hxsl_Tools.iter(expr,function(expr) {
				_g(expr,locals1);
			});
		}
	}
	,link: function(shadersData) {
		var _gthis = this;
		this.varMap = new haxe_ds_StringMap();
		this.varIdMap = new haxe_ds_IntMap();
		this.allVars = [];
		this.shaders = [];
		this.locals = new haxe_ds_IntMap();
		var dupShaders = new haxe_ds_ObjectMap();
		var _g = [];
		var _g1 = 0;
		while(_g1 < shadersData.length) {
			var s = shadersData[_g1];
			++_g1;
			var s1 = s;
			var sreal = s1;
			if(dupShaders.h.__keys__[s1.__id__] != null) {
				s1 = hxsl_Clone.shaderData(s1);
			}
			dupShaders.set(s1,sreal);
			_g.push(s1);
		}
		shadersData = _g;
		this.curInstance = 0;
		var outVars = [];
		var _g = 0;
		while(_g < shadersData.length) {
			var s = shadersData[_g];
			++_g;
			this.isBatchShader = this.batchMode && StringTools.startsWith(s.name,"batchShader_");
			var _g1 = 0;
			var _g2 = s.vars;
			while(_g1 < _g2.length) {
				var v = _g2[_g1];
				++_g1;
				var v2 = this.allocVar(v,null,s.name);
				if(this.isBatchShader && v2.v.kind == hxsl_VarKind.Param && !StringTools.startsWith(v2.path,"Batch_")) {
					v2.v.kind = hxsl_VarKind.Local;
				}
				if(v.kind == hxsl_VarKind.Output) {
					outVars.push(v);
				}
			}
			var _g3 = 0;
			var _g4 = s.funs;
			while(_g3 < _g4.length) {
				var f = _g4[_g3];
				++_g3;
				var v1 = this.allocVar(f.ref,f.expr.p);
				v1.kind = f.kind;
			}
			this.curInstance++;
		}
		var priority = 0;
		var initPrio_init = [-3000];
		var initPrio_vert = [-2000];
		var initPrio_frag = [-1000];
		var _g = 0;
		while(_g < shadersData.length) {
			var s = shadersData[_g];
			++_g;
			var _g1 = 0;
			var _g2 = s.funs;
			while(_g1 < _g2.length) {
				var f = _g2[_g1];
				++_g1;
				var v = this.allocVar(f.ref,f.expr.p);
				if(v.kind == null) {
					throw haxe_Exception.thrown("assert");
				}
				switch(v.kind._hx_index) {
				case 0:case 1:
					this.addShader(s.name + "." + (v.kind == hxsl_FunctionKind.Vertex ? "vertex" : "fragment"),v.kind == hxsl_FunctionKind.Vertex,f.expr,priority);
					break;
				case 2:
					var prio;
					var status;
					switch(f.ref.name) {
					case "__init__fragment":
						prio = initPrio_frag;
						status = false;
						break;
					case "__init__vertex":
						prio = initPrio_vert;
						status = true;
						break;
					default:
						prio = initPrio_init;
						status = null;
					}
					var _g3 = f.expr.e;
					if(_g3._hx_index == 4) {
						var el = _g3.el;
						var index = 0;
						var _g4 = 0;
						while(_g4 < el.length) {
							var e = el[_g4];
							++_g4;
							this.addShader(s.name + "." + f.ref.name + index++,status,e,prio[0]++);
						}
					} else {
						this.addShader(s.name + "." + f.ref.name,status,f.expr,prio[0]++);
					}
					break;
				case 3:
					throw haxe_Exception.thrown("Unexpected helper function in linker " + v.v.name);
				}
			}
			++priority;
		}
		this.shaders.sort($bind(this,this.sortByPriorityDesc));
		var entry = new hxsl__$Linker_ShaderInfos("<entry>",false);
		entry.deps = new haxe_ds_ObjectMap();
		var _g = 0;
		while(_g < outVars.length) {
			var v = outVars[_g];
			++_g;
			this.buildDependency(entry,this.allocVar(v,null),false);
		}
		var _g = 0;
		var _g1 = this.shaders;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(s.hasDiscard) {
				this.initDependencies(s);
				entry.deps.set(s,true);
			}
		}
		var _g = 0;
		var _g1 = this.shaders;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(s.vertex != null) {
				continue;
			}
			var onlyParams = true;
			var r = s.read.iterator();
			while(r.hasNext()) {
				var r1 = r.next();
				if(r1.v.kind != hxsl_VarKind.Param) {
					onlyParams = false;
					break;
				}
			}
			if(onlyParams) {
				s.vertex = false;
			}
		}
		var v = [];
		var f = [];
		this.collect(entry,v,true);
		this.collect(entry,f,false);
		if(f.pop() != entry) {
			throw haxe_Exception.thrown("assert");
		}
		var _g = 0;
		var _g1 = this.shaders;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			s.marked = null;
		}
		var _g = 0;
		var _g1 = v.concat(f);
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			var d = s.deps.keys();
			while(d.hasNext()) {
				var d1 = d.next();
				if(d1.marked == null) {
					this.error(d1.name + " needed by " + s.name + " is unreachable",null);
				}
			}
			s.marked = true;
		}
		var outVars = [];
		var varMap_h = { };
		var addVar = null;
		addVar = function(v) {
			if(varMap_h.hasOwnProperty(v.id)) {
				return;
			}
			varMap_h[v.id] = true;
			if(v.v.parent != null) {
				addVar(v.parent);
			} else {
				outVars.push(v.v);
			}
		};
		var _g = 0;
		var _g1 = v.concat(f);
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			var v1 = s.read.iterator();
			while(v1.hasNext()) {
				var v2 = v1.next();
				addVar(v2);
			}
			var v3 = s.write.iterator();
			while(v3.hasNext()) {
				var v4 = v3.next();
				addVar(v4);
			}
		}
		var cleanVar = null;
		cleanVar = function(v) {
			var _g = v.type;
			if(_g._hx_index == 13) {
				var vl = _g.vl;
				if(v.kind != hxsl_VarKind.Input) {
					var vout = [];
					var _g = 0;
					while(_g < vl.length) {
						var v1 = vl[_g];
						++_g;
						if(varMap_h.hasOwnProperty(v1.id)) {
							cleanVar(v1);
							vout.push(v1);
						}
					}
					v.type = hxsl_Type.TStruct(vout);
				}
			}
		};
		var _g = 0;
		while(_g < outVars.length) {
			var v1 = outVars[_g];
			++_g;
			cleanVar(v1);
		}
		var build = function(kind,name,a) {
			var v = { id : hxsl_Tools.allocVarId(), name : name, type : hxsl_Type.TFun([{ ret : hxsl_Type.TVoid, args : []}]), kind : hxsl_VarKind.Function};
			outVars.push(v);
			var exprs = [];
			var _g = 0;
			while(_g < a.length) {
				var s = a[_g];
				++_g;
				var _g1 = s.body.e;
				if(_g1._hx_index == 4) {
					var el = _g1.el;
					var _g2 = 0;
					while(_g2 < el.length) {
						var e = el[_g2];
						++_g2;
						exprs.push(e);
					}
				} else {
					exprs.push(s.body);
				}
			}
			var expr = { e : hxsl_TExprDef.TBlock(exprs), t : hxsl_Type.TVoid, p : exprs.length == 0 ? null : exprs[0].p};
			_gthis.uniqueLocals(expr,new haxe_ds_StringMap());
			return { kind : kind, ref : v, ret : hxsl_Type.TVoid, args : [], expr : expr};
		};
		var funs = [build(hxsl_FunctionKind.Vertex,"vertex",v),build(hxsl_FunctionKind.Fragment,"fragment",f)];
		var s = dupShaders.keys();
		while(s.hasNext()) {
			var s1 = s.next();
			var sreal = dupShaders.h[s1.__id__];
			if(s1 == sreal) {
				continue;
			}
			var _g = 0;
			var _g1 = s1.vars.length;
			while(_g < _g1) {
				var i = _g++;
				this.allocVar(s1.vars[i],null).merged.unshift(sreal.vars[i]);
			}
		}
		return { name : "out", vars : outVars, funs : funs};
	}
	,__class__: hxsl_Linker
};
var hxsl_Output = $hxEnums["hxsl.Output"] = { __ename__:true,__constructs__:null
	,Const: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"hxsl.Output",toString:$estr}; },$_._hx_name="Const",$_.__params__ = ["v"],$_)
	,Value: ($_=function(v,size) { return {_hx_index:1,v:v,size:size,__enum__:"hxsl.Output",toString:$estr}; },$_._hx_name="Value",$_.__params__ = ["v","size"],$_)
	,PackNormal: ($_=function(v) { return {_hx_index:2,v:v,__enum__:"hxsl.Output",toString:$estr}; },$_._hx_name="PackNormal",$_.__params__ = ["v"],$_)
	,PackFloat: ($_=function(v) { return {_hx_index:3,v:v,__enum__:"hxsl.Output",toString:$estr}; },$_._hx_name="PackFloat",$_.__params__ = ["v"],$_)
	,Vec2: ($_=function(a) { return {_hx_index:4,a:a,__enum__:"hxsl.Output",toString:$estr}; },$_._hx_name="Vec2",$_.__params__ = ["a"],$_)
	,Vec3: ($_=function(a) { return {_hx_index:5,a:a,__enum__:"hxsl.Output",toString:$estr}; },$_._hx_name="Vec3",$_.__params__ = ["a"],$_)
	,Vec4: ($_=function(a) { return {_hx_index:6,a:a,__enum__:"hxsl.Output",toString:$estr}; },$_._hx_name="Vec4",$_.__params__ = ["a"],$_)
	,Swiz: ($_=function(a,swiz) { return {_hx_index:7,a:a,swiz:swiz,__enum__:"hxsl.Output",toString:$estr}; },$_._hx_name="Swiz",$_.__params__ = ["a","swiz"],$_)
};
hxsl_Output.__constructs__ = [hxsl_Output.Const,hxsl_Output.Value,hxsl_Output.PackNormal,hxsl_Output.PackFloat,hxsl_Output.Vec2,hxsl_Output.Vec3,hxsl_Output.Vec4,hxsl_Output.Swiz];
hxsl_Output.__empty_constructs__ = [];
var hxsl_Printer = function(varId) {
	if(varId == null) {
		varId = false;
	}
	this.varId = varId;
};
hxsl_Printer.__name__ = "hxsl.Printer";
hxsl_Printer.opStr = function(op) {
	switch(op._hx_index) {
	case 0:
		return "+";
	case 1:
		return "*";
	case 2:
		return "/";
	case 3:
		return "-";
	case 4:
		return "=";
	case 5:
		return "==";
	case 6:
		return "!=";
	case 7:
		return ">";
	case 8:
		return ">=";
	case 9:
		return "<";
	case 10:
		return "<=";
	case 11:
		return "&";
	case 12:
		return "|";
	case 13:
		return "^";
	case 14:
		return "&&";
	case 15:
		return "||";
	case 16:
		return "<<";
	case 17:
		return ">>";
	case 18:
		return ">>>";
	case 19:
		return "%";
	case 20:
		var op1 = op.op;
		return hxsl_Printer.opStr(op1) + "=";
	case 21:
		return "...";
	case 22:
		return "=>";
	case 23:
		return " in ";
	}
};
hxsl_Printer.toString = function(e,varId) {
	if(varId == null) {
		varId = false;
	}
	return new hxsl_Printer(varId).exprString(e);
};
hxsl_Printer.shaderToString = function(s,varId) {
	if(varId == null) {
		varId = false;
	}
	return new hxsl_Printer(varId).shaderString(s);
};
hxsl_Printer.prototype = {
	shaderString: function(s) {
		this.buffer = new StringBuf();
		var _g = 0;
		var _g1 = s.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this.addVar(v,null);
			this.buffer.b += Std.string(";\n");
		}
		if(s.vars.length > 0) {
			this.buffer.b += Std.string("\n");
		}
		var _g = 0;
		var _g1 = s.funs;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.addFun(f);
			this.buffer.b += Std.string("\n\n");
		}
		return this.buffer.b;
	}
	,exprString: function(e) {
		this.buffer = new StringBuf();
		this.addExpr(e,"");
		return this.buffer.b;
	}
	,addVar: function(v,defKind,tabs,parent) {
		if(tabs == null) {
			tabs = "";
		}
		if(v.qualifiers != null) {
			var _g = 0;
			var _g1 = v.qualifiers;
			while(_g < _g1.length) {
				var q = _g1[_g];
				++_g;
				var v1;
				switch(q._hx_index) {
				case 0:
					var max = q.max;
					v1 = "const" + (max == null ? "" : "(" + max + ")");
					break;
				case 1:
					v1 = "private";
					break;
				case 2:
					v1 = "nullable";
					break;
				case 3:
					v1 = "perObject";
					break;
				case 4:
					var n = q.n;
					v1 = "name('" + n + "')";
					break;
				case 5:
					v1 = "shared";
					break;
				case 6:
					var p = q.p;
					v1 = $hxEnums[p.__enum__].__constructs__[p._hx_index]._hx_name.toLowerCase() + "p";
					break;
				case 7:
					var min = q.min;
					var max1 = q.max;
					v1 = "range(" + min + "," + max1 + ")";
					break;
				case 8:
					v1 = "ignore";
					break;
				case 9:
					var n1 = q.v;
					v1 = "perInstance(" + n1 + ")";
					break;
				case 10:
					var s = q.s;
					v1 = "doc(\"" + StringTools.replace(s,"\"","\\\"") + "\")";
					break;
				case 11:
					var s1 = q.source;
					v1 = "borrow(" + s1 + ")";
					break;
				case 12:
					var s2 = q.name;
					v1 = "sampler(" + s2 + ")";
					break;
				}
				this.buffer.b += Std.string("@" + v1 + " ");
			}
		}
		if(v.kind != defKind) {
			switch(v.kind._hx_index) {
			case 0:
				this.buffer.b += Std.string("@global ");
				break;
			case 1:
				this.buffer.b += Std.string("@input ");
				break;
			case 2:
				this.buffer.b += Std.string("@param ");
				break;
			case 3:
				this.buffer.b += Std.string("@varying ");
				break;
			case 4:
				this.buffer.b += Std.string("@local ");
				break;
			case 5:
				this.buffer.b += Std.string("@output ");
				break;
			case 6:
				this.buffer.b += Std.string("@function ");
				break;
			}
		}
		this.buffer.b += Std.string("var ");
		if(v.parent == parent) {
			this.buffer.b += Std.string(v.name + (this.varId ? "@" + v.id : ""));
		} else {
			this.addVarName(v);
		}
		this.buffer.b += Std.string(" : ");
		var _g = v.type;
		if(_g._hx_index == 13) {
			var vl = _g.vl;
			this.buffer.b += Std.string("{");
			var first = true;
			var _g = 0;
			while(_g < vl.length) {
				var v1 = vl[_g];
				++_g;
				if(first) {
					first = false;
				} else {
					this.buffer.b += Std.string(", ");
				}
				this.addVar(v1,v1.kind,tabs,v1);
			}
			this.buffer.b += Std.string("}");
		} else {
			var v1 = hxsl_Tools.toString(v.type);
			this.buffer.b += Std.string(v1);
		}
	}
	,addFun: function(f) {
		this.buffer.b += Std.string("function " + f.ref.name + "(");
		var first = true;
		var _g = 0;
		var _g1 = f.args;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(first) {
				this.buffer.b += Std.string(" ");
				first = false;
			} else {
				this.buffer.b += Std.string(", ");
			}
			this.addVar(a,hxsl_VarKind.Local);
		}
		if(f.args.length > 0) {
			this.buffer.b += Std.string(" ");
		}
		var v = ") : " + hxsl_Tools.toString(f.ret) + " ";
		this.buffer.b += Std.string(v);
		this.addExpr(f.expr,"");
	}
	,addVarName: function(v) {
		if(v.parent != null) {
			this.addVarName(v.parent);
			this.buffer.b += Std.string(".");
		}
		this.buffer.b += Std.string(v.name);
		if(this.varId) {
			this.buffer.b += Std.string("@" + v.id);
		}
	}
	,addConst: function(c) {
		var _this = this.buffer;
		var _this1 = _this.b;
		var tmp;
		switch(c._hx_index) {
		case 0:
			tmp = "null";
			break;
		case 1:
			var b = c.b;
			tmp = b;
			break;
		case 2:
			var i = c.v;
			tmp = i;
			break;
		case 3:
			var f = c.v;
			tmp = f;
			break;
		case 4:
			var s = c.v;
			tmp = "\"" + s + "\"";
			break;
		}
		_this.b = _this1 + Std.string(tmp);
	}
	,addExpr: function(e,tabs) {
		var _g = e.e;
		switch(_g._hx_index) {
		case 0:
			var c = _g.c;
			this.addConst(c);
			break;
		case 1:
			var v = _g.v;
			this.addVarName(v);
			break;
		case 2:
			var g = _g.g;
			var v = hxsl_Tools2.toString(g);
			this.buffer.b += Std.string(v);
			break;
		case 3:
			var e = _g.e;
			this.buffer.b += Std.string("(");
			this.addExpr(e,tabs);
			this.buffer.b += Std.string(")");
			break;
		case 4:
			var el = _g.el;
			this.buffer.b += Std.string("{");
			tabs += "\t";
			var _g1 = 0;
			while(_g1 < el.length) {
				var e = el[_g1];
				++_g1;
				this.buffer.b += Std.string("\n" + tabs);
				this.addExpr(e,tabs);
				this.buffer.b += Std.string(";");
			}
			tabs = HxOverrides.substr(tabs,1,null);
			if(el.length > 0) {
				this.buffer.b += Std.string("\n" + tabs);
			}
			this.buffer.b += Std.string("}");
			break;
		case 5:
			var op = _g.op;
			var e1 = _g.e1;
			var e2 = _g.e2;
			this.addExpr(e1,tabs);
			var v = " " + hxsl_Printer.opStr(op) + " ";
			this.buffer.b += Std.string(v);
			this.addExpr(e2,tabs);
			break;
		case 6:
			var op = _g.op;
			var e = _g.e1;
			var v;
			switch(op._hx_index) {
			case 0:
				v = "++";
				break;
			case 1:
				v = "--";
				break;
			case 2:
				v = "!";
				break;
			case 3:
				v = "-";
				break;
			case 4:
				v = "~";
				break;
			default:
				throw haxe_Exception.thrown("assert");
			}
			this.buffer.b += Std.string(v);
			this.addExpr(e,tabs);
			break;
		case 7:
			var v = _g.v;
			var init = _g.init;
			this.addVar(v,hxsl_VarKind.Local,tabs);
			if(init != null) {
				this.buffer.b += Std.string(" = ");
				this.addExpr(init,tabs);
			}
			break;
		case 8:
			var e = _g.e;
			var el = _g.args;
			this.addExpr(e,tabs);
			this.buffer.b += Std.string("(");
			var first = true;
			var _g1 = 0;
			while(_g1 < el.length) {
				var e = el[_g1];
				++_g1;
				if(first) {
					first = false;
				} else {
					this.buffer.b += Std.string(", ");
				}
				this.addExpr(e,tabs);
			}
			this.buffer.b += Std.string(")");
			break;
		case 9:
			var e = _g.e;
			var regs = _g.regs;
			this.addExpr(e,tabs);
			this.buffer.b += Std.string(".");
			var _g1 = 0;
			while(_g1 < regs.length) {
				var r = regs[_g1];
				++_g1;
				this.buffer.b += Std.string(hxsl_Printer.SWIZ[r._hx_index]);
			}
			break;
		case 10:
			var cond = _g.econd;
			var eif = _g.eif;
			var eelse = _g.eelse;
			this.buffer.b += Std.string("if( ");
			this.addExpr(cond,tabs);
			this.buffer.b += Std.string(" ) ");
			this.addExpr(eif,tabs);
			if(eelse != null) {
				this.buffer.b += Std.string(" else ");
				this.addExpr(eelse,tabs);
			}
			break;
		case 11:
			this.buffer.b += Std.string("discard");
			break;
		case 12:
			var e = _g.e;
			this.buffer.b += Std.string("return");
			if(e != null) {
				this.buffer.b += Std.string(" ");
				this.addExpr(e,tabs);
			}
			break;
		case 13:
			var v = _g.v;
			var it = _g.it;
			var loop = _g.loop;
			this.buffer.b += Std.string("for( ");
			this.addVarName(v);
			this.buffer.b += Std.string(" in ");
			this.addExpr(it,tabs);
			this.buffer.b += Std.string(" ) ");
			this.addExpr(loop,tabs);
			break;
		case 14:
			this.buffer.b += Std.string("continue");
			break;
		case 15:
			this.buffer.b += Std.string("break");
			break;
		case 16:
			var e1 = _g.e;
			var e2 = _g.index;
			this.addExpr(e1,tabs);
			this.buffer.b += Std.string("[");
			this.addExpr(e2,tabs);
			this.buffer.b += Std.string("]");
			break;
		case 17:
			var el = _g.el;
			this.buffer.b += Std.string("[");
			var first = true;
			var _g1 = 0;
			while(_g1 < el.length) {
				var e = el[_g1];
				++_g1;
				if(first) {
					first = false;
				} else {
					this.buffer.b += Std.string(", ");
				}
				this.addExpr(e,tabs);
			}
			this.buffer.b += Std.string("]");
			break;
		case 18:
			var e = _g.e;
			var cases = _g.cases;
			var def = _g.def;
			this.buffer.b += Std.string("switch( ");
			this.addExpr(e,tabs);
			this.buffer.b += Std.string(") {");
			var old = tabs;
			var _g1 = 0;
			while(_g1 < cases.length) {
				var c = cases[_g1];
				++_g1;
				this.buffer.b += Std.string("\n" + tabs);
				this.buffer.b += Std.string("case ");
				var first = true;
				var _g2 = 0;
				var _g3 = c.values;
				while(_g2 < _g3.length) {
					var v = _g3[_g2];
					++_g2;
					if(first) {
						first = false;
					} else {
						this.buffer.b += Std.string(", ");
					}
					this.addExpr(v,tabs);
				}
				tabs += "\t";
				this.buffer.b += Std.string(":\n" + tabs);
				this.addExpr(c.expr,tabs);
				tabs = old;
			}
			if(def != null) {
				this.buffer.b += Std.string("\n" + tabs);
				tabs += "\t";
				this.buffer.b += Std.string("default:\n" + tabs);
				this.addExpr(def,tabs);
				tabs = old;
			}
			this.buffer.b += Std.string("\n" + tabs + "}");
			break;
		case 19:
			var _g1 = _g.e;
			var _g2 = _g.loop;
			if(_g.normalWhile == false) {
				var loop = _g2;
				var e = _g1;
				var old = tabs;
				tabs += "\t";
				this.buffer.b += Std.string("do {\n" + tabs);
				this.addExpr(loop,tabs);
				tabs = old;
				this.buffer.b += Std.string("\n" + tabs + "} while( ");
				this.addExpr(e,tabs);
				this.buffer.b += Std.string(" )");
			} else {
				var loop = _g2;
				var e = _g1;
				this.buffer.b += Std.string("while( ");
				this.addExpr(e,tabs);
				var old = tabs;
				tabs += "\t";
				this.buffer.b += Std.string(" ) {\n" + tabs);
				this.addExpr(loop,tabs);
				tabs = old;
				this.buffer.b += Std.string("\n" + tabs + "}");
			}
			break;
		case 20:
			var m = _g.m;
			var args = _g.args;
			var e = _g.e;
			this.buffer.b += Std.string("@");
			this.buffer.b += Std.string(m);
			if(args.length > 0) {
				this.buffer.b += Std.string("(");
				var first = true;
				var _g = 0;
				while(_g < args.length) {
					var c = args[_g];
					++_g;
					if(first) {
						first = false;
					} else {
						this.buffer.b += Std.string(", ");
					}
					this.addConst(c);
				}
				this.buffer.b += Std.string(")");
			}
			this.buffer.b += Std.string(" ");
			this.addExpr(e,tabs);
			break;
		}
	}
	,__class__: hxsl_Printer
};
var hxsl_AllocParam = function(name,pos,instance,index,type) {
	this.name = name;
	this.pos = pos;
	this.instance = instance;
	this.index = index;
	this.type = type;
};
hxsl_AllocParam.__name__ = "hxsl.AllocParam";
hxsl_AllocParam.prototype = {
	__class__: hxsl_AllocParam
};
var hxsl_AllocGlobal = function(pos,path,type) {
	this.pos = pos;
	this.path = path;
	this.gid = hxsl_Globals.allocID(path);
	this.type = type;
};
hxsl_AllocGlobal.__name__ = "hxsl.AllocGlobal";
hxsl_AllocGlobal.prototype = {
	__class__: hxsl_AllocGlobal
};
var hxsl_RuntimeShaderData = function() {
};
hxsl_RuntimeShaderData.__name__ = "hxsl.RuntimeShaderData";
hxsl_RuntimeShaderData.prototype = {
	__class__: hxsl_RuntimeShaderData
};
var hxsl_ShaderInstanceDesc = function(shader,bits) {
	this.shader = shader;
	this.bits = bits;
};
hxsl_ShaderInstanceDesc.__name__ = "hxsl.ShaderInstanceDesc";
hxsl_ShaderInstanceDesc.prototype = {
	__class__: hxsl_ShaderInstanceDesc
};
var hxsl_RuntimeShader = function() {
	this.id = hxsl_RuntimeShader.UID++;
};
hxsl_RuntimeShader.__name__ = "hxsl.RuntimeShader";
hxsl_RuntimeShader.prototype = {
	__class__: hxsl_RuntimeShader
};
var hxsl_Serializer = function() {
};
hxsl_Serializer.__name__ = "hxsl.Serializer";
hxsl_Serializer.prototype = {
	readVarInt: function() {
		var b = this.input.readByte();
		if(b < 128) {
			return b;
		}
		if(b == 255) {
			return this.input.readInt32();
		}
		return (b & 127) << 8 | this.input.readByte();
	}
	,readType: function() {
		switch(this.input.readByte()) {
		case 0:
			return hxsl_Type.TVoid;
		case 1:
			return hxsl_Type.TInt;
		case 2:
			return hxsl_Type.TBool;
		case 3:
			return hxsl_Type.TFloat;
		case 4:
			return hxsl_Type.TString;
		case 5:
			var bits = this.input.readByte();
			var v = hxsl_Serializer.TVECS.h[bits];
			if(v == null) {
				v = hxsl_Type.TVec(bits & 7,Type.createEnumIndex(hxsl_VecType,bits >> 3,null));
				hxsl_Serializer.TVECS.h[bits] = v;
			}
			return v;
		case 6:
			return hxsl_Type.TMat3;
		case 7:
			return hxsl_Type.TMat4;
		case 8:
			return hxsl_Type.TMat3x4;
		case 9:
			return hxsl_Type.TBytes(this.input.readInt32());
		case 10:
			return hxsl_Type.TSampler2D;
		case 11:
			return hxsl_Type.TSampler2DArray;
		case 12:
			return hxsl_Type.TSamplerCube;
		case 13:
			var id = this.readVarInt();
			var t = this.types[id];
			if(t != null) {
				return t;
			}
			var f = $bind(this,this.readVar);
			var _g = [];
			var _g1 = 0;
			var _g2 = this.readVarInt();
			while(_g1 < _g2) {
				var i = _g1++;
				_g.push(f());
			}
			t = hxsl_Type.TStruct(_g);
			this.types[id] = t;
			return t;
		case 14:
			return hxsl_Type.TFun(null);
		case 15:
			var t = this.readType();
			var v = this.readVar();
			return hxsl_Type.TArray(t,v == null ? hxsl_SizeDecl.SConst(this.readVarInt()) : hxsl_SizeDecl.SVar(v));
		case 16:
			var t = this.readType();
			var v = this.readVar();
			return hxsl_Type.TBuffer(t,v == null ? hxsl_SizeDecl.SConst(this.readVarInt()) : hxsl_SizeDecl.SVar(v));
		case 17:
			return hxsl_Type.TChannel(this.input.readByte());
		case 18:
			return hxsl_Type.TMat2;
		default:
			throw haxe_Exception.thrown("assert");
		}
	}
	,readString: function() {
		var len = this.readVarInt();
		var s = this.input.read(len).getString(0,len);
		return s;
	}
	,readConst: function() {
		switch(this.input.readByte()) {
		case 0:
			return hxsl_Const.CNull;
		case 1:
			return hxsl_Const.CBool(this.input.readByte() != 0);
		case 2:
			return hxsl_Const.CInt(this.input.readInt32());
		case 3:
			return hxsl_Const.CFloat(this.input.readDouble());
		case 4:
			return hxsl_Const.CString(this.readString());
		default:
			throw haxe_Exception.thrown("assert");
		}
	}
	,readExpr: function() {
		var _gthis = this;
		var k = this.input.readByte();
		if(k-- == 0) {
			return null;
		}
		var e;
		switch(k) {
		case 0:
			e = hxsl_TExprDef.TConst(this.readConst());
			break;
		case 1:
			e = hxsl_TExprDef.TVar(this.readVar());
			break;
		case 2:
			e = hxsl_TExprDef.TGlobal(hxsl_Serializer.TGLOBALS[this.input.readByte()]);
			break;
		case 3:
			e = hxsl_TExprDef.TParenthesis(this.readExpr());
			break;
		case 4:
			var f = $bind(this,this.readExpr);
			var _g = [];
			var _g1 = 0;
			var _g2 = this.readVarInt();
			while(_g1 < _g2) {
				var i = _g1++;
				_g.push(f());
			}
			e = hxsl_TExprDef.TBlock(_g);
			break;
		case 5:
			var op = this.input.readByte();
			e = hxsl_TExprDef.TBinop(op >= 128 ? haxe_macro_Binop.OpAssignOp(hxsl_Serializer.BOPS[op & 127]) : hxsl_Serializer.BOPS[op],this.readExpr(),this.readExpr());
			break;
		case 6:
			e = hxsl_TExprDef.TUnop(hxsl_Serializer.UNOPS[this.input.readByte()],this.readExpr());
			break;
		case 7:
			e = hxsl_TExprDef.TVarDecl(this.readVar(),this.readExpr());
			break;
		case 8:
			var e1 = this.readExpr();
			var f = $bind(this,this.readExpr);
			var _g = [];
			var _g1 = 0;
			var _g2 = this.readVarInt();
			while(_g1 < _g2) {
				var i = _g1++;
				_g.push(f());
			}
			e = hxsl_TExprDef.TCall(e1,_g);
			break;
		case 9:
			var e1 = this.readExpr();
			var bits = this.input.readUInt16();
			var swiz = hxsl_Serializer.TSWIZ.h[bits];
			if(swiz == null) {
				var _g = [];
				var _g1 = 0;
				var _g2 = (bits & 3) + 1;
				while(_g1 < _g2) {
					var i = _g1++;
					_g.push(hxsl_Serializer.REGS[bits >> i * 2 + 2 & 3]);
				}
				swiz = _g;
				hxsl_Serializer.TSWIZ.h[bits] = swiz;
			}
			e = hxsl_TExprDef.TSwiz(e1,swiz);
			break;
		case 10:
			e = hxsl_TExprDef.TIf(this.readExpr(),this.readExpr(),this.readExpr());
			break;
		case 11:
			e = hxsl_TExprDef.TDiscard;
			break;
		case 12:
			e = hxsl_TExprDef.TReturn(this.readExpr());
			break;
		case 13:
			e = hxsl_TExprDef.TFor(this.readVar(),this.readExpr(),this.readExpr());
			break;
		case 14:
			e = hxsl_TExprDef.TContinue;
			break;
		case 15:
			e = hxsl_TExprDef.TBreak;
			break;
		case 16:
			e = hxsl_TExprDef.TArray(this.readExpr(),this.readExpr());
			break;
		case 17:
			var f = $bind(this,this.readExpr);
			var _g = [];
			var _g1 = 0;
			var _g2 = this.readVarInt();
			while(_g1 < _g2) {
				var i = _g1++;
				_g.push(f());
			}
			e = hxsl_TExprDef.TArrayDecl(_g);
			break;
		case 18:
			var e1 = this.readExpr();
			var _g = [];
			var _g1 = 0;
			var _g2 = this.readVarInt();
			while(_g1 < _g2) {
				var i = _g1++;
				var f = $bind(_gthis,_gthis.readExpr);
				var _g3 = [];
				var _g4 = 0;
				var _g5 = _gthis.readVarInt();
				while(_g4 < _g5) {
					var i1 = _g4++;
					_g3.push(f());
				}
				_g.push({ values : _g3, expr : _gthis.readExpr()});
			}
			e = hxsl_TExprDef.TSwitch(e1,_g,this.readExpr());
			break;
		case 19:
			e = hxsl_TExprDef.TWhile(this.readExpr(),this.readExpr(),this.input.readByte() != 0);
			break;
		case 20:
			var e1 = this.readString();
			var f = $bind(this,this.readConst);
			var _g = [];
			var _g1 = 0;
			var _g2 = this.readVarInt();
			while(_g1 < _g2) {
				var i = _g1++;
				_g.push(f());
			}
			e = hxsl_TExprDef.TMeta(e1,_g,this.readExpr());
			break;
		default:
			throw haxe_Exception.thrown("assert");
		}
		return { e : e, t : this.readType(), p : null};
	}
	,readVar: function() {
		var id = this.readVarInt();
		if(id == 0) {
			return null;
		}
		var v = this.varMap.h[id];
		if(v != null) {
			return v;
		}
		v = { id : hxsl_Tools.allocVarId(), name : this.readString(), type : null, kind : null};
		this.varMap.h[id] = v;
		v.type = this.readType();
		v.kind = hxsl_Serializer.VKINDS[this.input.readByte()];
		v.parent = this.readVar();
		var nq = this.input.readByte();
		if(nq > 0) {
			v.qualifiers = [];
			var _g = 0;
			var _g1 = nq;
			while(_g < _g1) {
				var i = _g++;
				var qid = this.input.readByte();
				var q;
				switch(qid) {
				case 0:
					var n = this.input.readInt32();
					q = hxsl_VarQualifier.Const(n == 0 ? null : n);
					break;
				case 1:
					q = hxsl_VarQualifier.Private;
					break;
				case 2:
					q = hxsl_VarQualifier.Nullable;
					break;
				case 3:
					q = hxsl_VarQualifier.PerObject;
					break;
				case 4:
					q = hxsl_VarQualifier.Name(this.readString());
					break;
				case 5:
					q = hxsl_VarQualifier.Shared;
					break;
				case 6:
					q = hxsl_VarQualifier.Precision(hxsl_Serializer.PRECS[this.input.readByte()]);
					break;
				case 7:
					q = hxsl_VarQualifier.Range(this.input.readDouble(),this.input.readDouble());
					break;
				case 8:
					q = hxsl_VarQualifier.Ignore;
					break;
				case 9:
					q = hxsl_VarQualifier.PerInstance(this.input.readInt32());
					break;
				case 10:
					q = hxsl_VarQualifier.Doc(this.readString());
					break;
				case 11:
					q = hxsl_VarQualifier.Borrow(this.readString());
					break;
				case 12:
					q = hxsl_VarQualifier.Sampler(this.readString());
					break;
				default:
					throw haxe_Exception.thrown("assert");
				}
				v.qualifiers.push(q);
			}
		}
		return v;
	}
	,readFun: function() {
		var tmp = hxsl_Serializer.FKIND[this.input.readByte()];
		var tmp1 = this.readVar();
		var f = $bind(this,this.readVar);
		var _g = [];
		var _g1 = 0;
		var _g2 = this.readVarInt();
		while(_g1 < _g2) {
			var i = _g1++;
			_g.push(f());
		}
		return { kind : tmp, ref : tmp1, args : _g, ret : this.readType(), expr : this.readExpr()};
	}
	,unserialize: function(data) {
		this.input = new haxe_io_BytesInput(haxe_crypto_Base64.decode(data,false));
		if(this.input.readByte() != (hxsl_Serializer.SIGN & 255) || this.input.readByte() != (hxsl_Serializer.SIGN >> 8 & 255) || this.input.readByte() != (hxsl_Serializer.SIGN >> 16 & 255)) {
			throw haxe_Exception.thrown("Invalid HXSL data");
		}
		this.varMap = new haxe_ds_IntMap();
		this.types = [];
		var tmp = this.readString();
		var f = $bind(this,this.readVar);
		var _g = [];
		var _g1 = 0;
		var _g2 = this.readVarInt();
		while(_g1 < _g2) {
			var i = _g1++;
			_g.push(f());
		}
		var tmp1 = _g;
		var f = $bind(this,this.readFun);
		var _g = [];
		var _g1 = 0;
		var _g2 = this.readVarInt();
		while(_g1 < _g2) {
			var i = _g1++;
			_g.push(f());
		}
		return { name : tmp, vars : tmp1, funs : _g};
	}
	,__class__: hxsl_Serializer
};
var hxsl_ShaderList = function(s,n) {
	this.s = s;
	this.next = n;
};
hxsl_ShaderList.__name__ = "hxsl.ShaderList";
hxsl_ShaderList.addSort = function(s,shaders) {
	var prev = null;
	var hd = shaders;
	while(hd != null && hd.s.priority < s.priority) {
		prev = hd;
		hd = hd.next;
	}
	if(prev == null) {
		return new hxsl_ShaderList(s,shaders);
	}
	prev.next = new hxsl_ShaderList(s,prev.next);
	return shaders;
};
hxsl_ShaderList.prototype = {
	__class__: hxsl_ShaderList
};
var hxsl_ShaderInstance = function(shader) {
	this.id = hxsl_Tools.allocVarId();
	this.shader = shader;
	this.params = new haxe_ds_IntMap();
};
hxsl_ShaderInstance.__name__ = "hxsl.ShaderInstance";
hxsl_ShaderInstance.prototype = {
	__class__: hxsl_ShaderInstance
};
var hxsl_ShaderGlobal = function(v,gid) {
	this.v = v;
	this.globalId = gid;
};
hxsl_ShaderGlobal.__name__ = "hxsl.ShaderGlobal";
hxsl_ShaderGlobal.prototype = {
	__class__: hxsl_ShaderGlobal
};
var hxsl_ShaderConst = function(v,pos,bits) {
	this.v = v;
	this.pos = pos;
	this.bits = bits;
};
hxsl_ShaderConst.__name__ = "hxsl.ShaderConst";
hxsl_ShaderConst.prototype = {
	__class__: hxsl_ShaderConst
};
var hxsl_SharedShader = function(src) {
	this.instanceCache = new haxe_ds_IntMap();
	this.consts = null;
	this.globals = [];
	if(src == "") {
		return;
	}
	this.data = new hxsl_Serializer().unserialize(src);
	this.initialize();
};
hxsl_SharedShader.__name__ = "hxsl.SharedShader";
hxsl_SharedShader.prototype = {
	initialize: function() {
		var _g = 0;
		var _g1 = this.data.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this.browseVar(v);
		}
	}
	,makeInstance: function(constBits) {
		var $eval = new hxsl_Eval();
		var c = this.consts;
		while(c != null) {
			var c1 = c.v;
			var _g = c.v.type;
			var tmp;
			switch(_g._hx_index) {
			case 1:
				tmp = hxsl_Const.CInt(constBits >>> c.pos & (1 << c.bits) - 1);
				break;
			case 2:
				tmp = hxsl_Const.CBool((constBits >>> c.pos & 1) != 0);
				break;
			case 17:
				var _g1 = _g.size;
				tmp = hxsl_Const.CInt(constBits >>> c.pos & (1 << c.bits) - 1);
				break;
			default:
				throw haxe_Exception.thrown("assert");
			}
			$eval.setConstant(c1,tmp);
			c = c.next;
		}
		$eval.inlineCalls = true;
		$eval.unrollLoops = hxsl_SharedShader.UNROLL_LOOPS;
		var i = new hxsl_ShaderInstance($eval.eval(this.data));
		this.paramsCount = 0;
		var _g = 0;
		var _g1 = this.data.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this.addParam($eval,i,v);
		}
		this.instanceCache.h[constBits] = i;
		return i;
	}
	,addParam: function($eval,i,v) {
		var _g = v.type;
		if(_g._hx_index == 13) {
			var vl = _g.vl;
			var _g = 0;
			while(_g < vl.length) {
				var v1 = vl[_g];
				++_g;
				this.addParam($eval,i,v1);
			}
		} else if(v.kind == hxsl_VarKind.Param) {
			i.params.h[$eval.varMap.h[v.__id__].id] = this.paramsCount;
			this.paramsCount++;
		}
	}
	,browseVar: function(v,path) {
		v.id = hxsl_Tools.allocVarId();
		if(path == null) {
			path = hxsl_Tools.getName(v);
		} else {
			path += "." + v.name;
		}
		var _g = v.type;
		if(_g._hx_index == 13) {
			var vl = _g.vl;
			var _g = 0;
			while(_g < vl.length) {
				var vs = vl[_g];
				++_g;
				this.browseVar(vs,path);
			}
		} else {
			var globalId = 0;
			if(v.kind == hxsl_VarKind.Global) {
				globalId = hxsl_Globals.allocID(path);
				this.globals.push(new hxsl_ShaderGlobal(v,globalId));
			}
			if(!hxsl_Tools.isConst(v)) {
				return;
			}
			var bits = hxsl_Tools.getConstBits(v);
			if(bits > 0) {
				var pos = this.consts == null ? 0 : this.consts.pos + this.consts.bits;
				var c = new hxsl_ShaderConst(v,pos,bits);
				c.globalId = globalId;
				c.next = this.consts;
				this.consts = c;
			}
		}
	}
	,__class__: hxsl_SharedShader
};
var hxsl__$Splitter_VarProps = function(v) {
	this.v = v;
	this.read = 0;
	this.write = 0;
};
hxsl__$Splitter_VarProps.__name__ = "hxsl._Splitter.VarProps";
hxsl__$Splitter_VarProps.prototype = {
	__class__: hxsl__$Splitter_VarProps
};
var hxsl_Splitter = function() {
};
hxsl_Splitter.__name__ = "hxsl.Splitter";
hxsl_Splitter.prototype = {
	split: function(s) {
		var vfun = null;
		var vvars = new haxe_ds_IntMap();
		var ffun = null;
		var fvars = new haxe_ds_IntMap();
		this.varNames = new haxe_ds_StringMap();
		this.varMap = new haxe_ds_ObjectMap();
		var _g = 0;
		var _g1 = s.funs;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			switch(f.kind._hx_index) {
			case 0:
				this.vars = vvars;
				vfun = f;
				this.checkExpr(f.expr);
				break;
			case 1:
				this.vars = fvars;
				ffun = f;
				this.checkExpr(f.expr);
				break;
			default:
				throw haxe_Exception.thrown("assert");
			}
		}
		vfun = { ret : vfun.ret, ref : vfun.ref, kind : vfun.kind, args : vfun.args, expr : this.mapVars(vfun.expr)};
		var _g = 0;
		var _g1 = Lambda.array(vvars);
		while(_g < _g1.length) {
			var inf = _g1[_g];
			++_g;
			var v = inf.v;
			switch(v.kind._hx_index) {
			case 3:case 4:
				v.kind = fvars.h.hasOwnProperty(v.id) ? hxsl_VarKind.Var : hxsl_VarKind.Local;
				break;
			default:
			}
			switch(v.kind._hx_index) {
			case 3:case 5:
				if(inf.read > 0 || inf.write > 1) {
					var nv = { id : hxsl_Tools.allocVarId(), name : v.name, kind : v.kind, type : v.type};
					this.vars = vvars;
					var ninf = this.get(nv);
					v.kind = hxsl_VarKind.Local;
					var p = vfun.expr.p;
					var e = { e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAssign,{ e : hxsl_TExprDef.TVar(nv), t : nv.type, p : p},{ e : hxsl_TExprDef.TVar(v), t : v.type, p : p}), t : nv.type, p : p};
					this.addExpr(vfun,e);
					this.checkExpr(e);
					if(nv.kind == hxsl_VarKind.Var) {
						var old = fvars.h[v.id];
						this.varMap.set(v,nv);
						fvars.remove(v.id);
						var np = new hxsl__$Splitter_VarProps(nv);
						np.read = old.read;
						np.write = old.write;
						fvars.h[nv.id] = np;
					}
				}
				break;
			default:
			}
		}
		var finits = [];
		var todo = [];
		var inf = fvars.iterator();
		while(inf.hasNext()) {
			var inf1 = inf.next();
			var v = inf1.v;
			switch(v.kind._hx_index) {
			case 1:
				var nv = { id : hxsl_Tools.allocVarId(), name : v.name, kind : hxsl_VarKind.Var, type : v.type};
				this.uniqueName(nv);
				var i = vvars.h[v.id];
				if(i == null) {
					i = new hxsl__$Splitter_VarProps(v);
					vvars.h[v.id] = i;
				}
				i.read++;
				var vp = new hxsl__$Splitter_VarProps(nv);
				vp.write = 1;
				vvars.h[nv.id] = vp;
				var fp = new hxsl__$Splitter_VarProps(nv);
				fp.read = 1;
				todo.push(fp);
				this.addExpr(vfun,{ e : hxsl_TExprDef.TBinop(haxe_macro_Binop.OpAssign,{ e : hxsl_TExprDef.TVar(nv), t : v.type, p : vfun.expr.p},{ e : hxsl_TExprDef.TVar(v), t : v.type, p : vfun.expr.p}), t : v.type, p : vfun.expr.p});
				this.varMap.set(v,nv);
				inf1.local = true;
				break;
			case 3:
				if(inf1.write > 0) {
					var nv1 = { id : hxsl_Tools.allocVarId(), name : v.name, kind : hxsl_VarKind.Local, type : v.type};
					this.uniqueName(nv1);
					finits.push({ e : hxsl_TExprDef.TVarDecl(nv1,{ e : hxsl_TExprDef.TVar(v), t : v.type, p : ffun.expr.p}), t : hxsl_Type.TVoid, p : ffun.expr.p});
					this.varMap.set(v,nv1);
				}
				break;
			default:
			}
		}
		var _g = 0;
		while(_g < todo.length) {
			var v = todo[_g];
			++_g;
			fvars.h[v.v.id] = v;
		}
		var v = vvars.iterator();
		while(v.hasNext()) {
			var v1 = v.next();
			this.checkVar(v1,true,vvars,vfun.expr.p);
		}
		var v = fvars.iterator();
		while(v.hasNext()) {
			var v1 = v.next();
			this.checkVar(v1,false,vvars,ffun.expr.p);
		}
		var v = this.varMap.keys();
		while(v.hasNext()) {
			var v1 = v.next();
			var v2 = this.varMap.h[this.varMap.h[v1.__id__].__id__];
			if(v2 != null) {
				this.varMap.set(v1,v2);
			}
		}
		ffun = { ret : ffun.ret, ref : ffun.ref, kind : ffun.kind, args : ffun.args, expr : this.mapVars(ffun.expr)};
		var _g = ffun.expr.e;
		if(_g._hx_index == 4) {
			var el = _g.el;
			var _g = 0;
			while(_g < finits.length) {
				var e = finits[_g];
				++_g;
				el.unshift(e);
			}
		} else {
			finits.push(ffun.expr);
			ffun.expr = { e : hxsl_TExprDef.TBlock(finits), t : hxsl_Type.TVoid, p : ffun.expr.p};
		}
		var _g = [];
		var v = vvars.iterator();
		while(v.hasNext()) {
			var v1 = v.next();
			if(!v1.local) {
				_g.push(v1.v);
			}
		}
		var vvars = _g;
		var _g = [];
		var v = fvars.iterator();
		while(v.hasNext()) {
			var v1 = v.next();
			if(!v1.local) {
				_g.push(v1.v);
			}
		}
		var fvars = _g;
		vvars.sort(function(v1,v2) {
			return v1.id - v2.id;
		});
		fvars.sort(function(v1,v2) {
			return v1.id - v2.id;
		});
		return { vertex : { name : "vertex", vars : vvars, funs : [vfun]}, fragment : { name : "fragment", vars : fvars, funs : [ffun]}};
	}
	,addExpr: function(f,e) {
		var _g = f.expr.e;
		if(_g._hx_index == 4) {
			var el = _g.el;
			el.push(e);
		} else {
			f.expr = { e : hxsl_TExprDef.TBlock([f.expr,e]), t : hxsl_Type.TVoid, p : f.expr.p};
		}
	}
	,checkVar: function(v,vertex,vvars,p) {
		switch(v.v.kind._hx_index) {
		case 3:
			if(!vertex) {
				var i = vvars.h[v.v.id];
				if(i == null || i.write == 0) {
					throw haxe_Exception.thrown(new hxsl_Error("Varying " + v.v.name + " is not written by vertex shader",p));
				}
			}
			break;
		case 4:
			if(v.requireInit) {
				throw haxe_Exception.thrown(new hxsl_Error("Variable " + v.v.name + " is used without being initialized",p));
			}
			break;
		default:
		}
	}
	,mapVars: function(e) {
		var _g = e.e;
		switch(_g._hx_index) {
		case 1:
			var v = _g.v;
			var v2 = this.varMap.h[v.__id__];
			if(v2 == null) {
				return e;
			} else {
				return { e : hxsl_TExprDef.TVar(v2), t : e.t, p : e.p};
			}
			break;
		case 7:
			var v = _g.v;
			var init = _g.init;
			var v2 = this.varMap.h[v.__id__];
			if(v2 == null) {
				return hxsl_Tools.map(e,$bind(this,this.mapVars));
			} else {
				return { e : hxsl_TExprDef.TVarDecl(v2,this.mapVars(init)), t : e.t, p : e.p};
			}
			break;
		case 13:
			var v = _g.v;
			var it = _g.it;
			var loop = _g.loop;
			var v2 = this.varMap.h[v.__id__];
			if(v2 == null) {
				return hxsl_Tools.map(e,$bind(this,this.mapVars));
			} else {
				return { e : hxsl_TExprDef.TFor(v2,this.mapVars(it),this.mapVars(loop)), t : e.t, p : e.p};
			}
			break;
		default:
			return hxsl_Tools.map(e,$bind(this,this.mapVars));
		}
	}
	,get: function(v) {
		var i = this.vars.h[v.id];
		if(i == null) {
			var v2 = this.varMap.h[v.__id__];
			if(v2 != null) {
				return this.get(v2);
			}
			var oldName = v.name;
			this.uniqueName(v);
			if(v.kind == hxsl_VarKind.Local && oldName != v.name) {
				var nv = { id : hxsl_Tools.allocVarId(), name : v.name, kind : v.kind, type : v.type};
				this.varMap.set(v,nv);
				v.name = oldName;
				v = nv;
			}
			i = new hxsl__$Splitter_VarProps(v);
			this.vars.h[v.id] = i;
		}
		return i;
	}
	,uniqueName: function(v) {
		if(v.kind == hxsl_VarKind.Global || v.kind == hxsl_VarKind.Output || v.kind == hxsl_VarKind.Input) {
			return;
		}
		v.parent = null;
		var n = this.varNames.h[v.name];
		if(n != null && n != v) {
			var prefix = v.name;
			while(HxOverrides.cca(prefix,prefix.length - 1) >= 48 && HxOverrides.cca(prefix,prefix.length - 1) <= 57) prefix = HxOverrides.substr(prefix,0,-1);
			var k = prefix == v.name ? 2 : Std.parseInt(HxOverrides.substr(v.name,prefix.length,null));
			while(Object.prototype.hasOwnProperty.call(this.varNames.h,prefix + k)) ++k;
			v.name = prefix + k;
		}
		this.varNames.h[v.name] = v;
	}
	,checkExpr: function(e) {
		var _g = e.e;
		switch(_g._hx_index) {
		case 1:
			var v = _g.v;
			var inf = this.get(v);
			if(inf.write == 0) {
				inf.requireInit = true;
			}
			inf.read++;
			break;
		case 5:
			var _g1 = _g.op;
			var _g2 = _g.e1;
			var _g3 = _g.e2;
			switch(_g1._hx_index) {
			case 4:
				var _g4 = _g2.e;
				var _g5 = _g2.p;
				var _g5 = _g2.t;
				switch(_g4._hx_index) {
				case 1:
					var v = _g4.v;
					var e1 = _g3;
					var inf = this.get(v);
					inf.write++;
					this.checkExpr(e1);
					break;
				case 9:
					var _g5 = _g4.e;
					var _g6 = _g4.regs;
					var _g4 = _g5.e;
					var _g6 = _g5.p;
					var _g6 = _g5.t;
					if(_g4._hx_index == 1) {
						var v = _g4.v;
						var e1 = _g3;
						var inf = this.get(v);
						inf.write++;
						this.checkExpr(e1);
					} else {
						hxsl_Tools.iter(e,$bind(this,this.checkExpr));
					}
					break;
				default:
					hxsl_Tools.iter(e,$bind(this,this.checkExpr));
				}
				break;
			case 20:
				var _g4 = _g1.op;
				var _g1 = _g2.e;
				var _g4 = _g2.p;
				var _g4 = _g2.t;
				switch(_g1._hx_index) {
				case 1:
					var v = _g1.v;
					var e1 = _g3;
					var inf = this.get(v);
					if(inf.write == 0) {
						inf.requireInit = true;
					}
					inf.read++;
					inf.write++;
					this.checkExpr(e1);
					break;
				case 9:
					var _g2 = _g1.e;
					var _g4 = _g1.regs;
					var _g1 = _g2.e;
					var _g4 = _g2.p;
					var _g4 = _g2.t;
					if(_g1._hx_index == 1) {
						var v = _g1.v;
						var e1 = _g3;
						var inf = this.get(v);
						if(inf.write == 0) {
							inf.requireInit = true;
						}
						inf.read++;
						inf.write++;
						this.checkExpr(e1);
					} else {
						hxsl_Tools.iter(e,$bind(this,this.checkExpr));
					}
					break;
				default:
					hxsl_Tools.iter(e,$bind(this,this.checkExpr));
				}
				break;
			default:
				hxsl_Tools.iter(e,$bind(this,this.checkExpr));
			}
			break;
		case 7:
			var v = _g.v;
			var init = _g.init;
			var inf = this.get(v);
			inf.local = true;
			if(init != null) {
				this.checkExpr(init);
				inf.write++;
			}
			break;
		case 13:
			var v = _g.v;
			var it = _g.it;
			var loop = _g.loop;
			this.checkExpr(it);
			var inf = this.get(v);
			inf.local = true;
			inf.write++;
			this.checkExpr(loop);
			break;
		default:
			hxsl_Tools.iter(e,$bind(this,this.checkExpr));
		}
	}
	,__class__: hxsl_Splitter
};
var js_html__$CanvasElement_CanvasUtil = function() { };
js_html__$CanvasElement_CanvasUtil.__name__ = "js.html._CanvasElement.CanvasUtil";
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var name = "webgl";
	var ctx = canvas.getContext(name,attribs);
	if(ctx != null) {
		return ctx;
	}
	var name = "experimental-webgl";
	var ctx = canvas.getContext(name,attribs);
	if(ctx != null) {
		return ctx;
	}
	return null;
};
Math.__name__ = "Math";
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = String;
String.__name__ = "String";
Array.__name__ = "Array";
haxe_ds_ObjectMap.count = 0;
haxe_MainLoop.add(hxd_System.updateCursor,-1);
js_Boot.__toStr = ({ }).toString;
dn_Process.MAX_PROCESSES = 1024;
dn_Process.FIXED_UPDATE_FPS = 30;
dn_Process.UNIQ_ID = 0;
dn_Process.ROOTS = new dn_struct_FixedArray("RootProcesses",dn_Process.MAX_PROCESSES);
dn_Process.BEGINNING_OF_FRAME_CALLBACKS = new dn_struct_FixedArray(null,256);
dn_Process.END_OF_FRAME_CALLBACKS = new dn_struct_FixedArray(null,256);
dn_Process.RESIZE_REQUESTED = true;
dn_Process.PROFILING = false;
dn_Process.PROFILER_TIMES = new haxe_ds_StringMap();
dn_Cooldown.__meta__ = { obj : { indexes : ["test","jump","a","b","c"]}};
dn_Cooldown.DEFAULT_COUNT_LIMIT = 512;
h3d_Buffer.GUID = 0;
h3d_Engine.SOFTWARE_DRIVER = false;
h3d_Engine.ANTIALIASING = 0;
h3d_impl_InputNames.UID = 0;
h3d_impl_InputNames.CACHE = new haxe_ds_StringMap();
h3d_impl_GlDriver.ALLOW_WEBGL2 = true;
h3d_impl_GlDriver.BLACK = new h3d_Vector(0,0,0,0);
h3d_impl_GlDriver.outOfMemoryCheck = false;
h3d_impl_GlDriver.TFILTERS = [[[9728,9728],[9729,9729]],[[9728,9984],[9729,9985]],[[9728,9986],[9729,9987]]];
h3d_impl_GlDriver.TWRAP = [33071,10497];
h3d_impl_GlDriver.FACES = [0,1028,1029,1032];
h3d_impl_GlDriver.BLEND = [1,0,770,768,772,774,771,769,773,775,32769,32771,32770,32772,776];
h3d_impl_GlDriver.COMPARE = [519,512,514,517,516,518,513,515];
h3d_impl_GlDriver.STENCIL_OP = [7680,0,7681,7682,34055,7683,34056,5386];
h3d_impl_GlDriver.OP = [32774,32778,32779,32775,32776];
h3d_impl_GlDriver.CUBE_FACES = [34069,34070,34071,34072,34073,34074];
h3d_impl_GlDriver.CBUFFERS = (function($this) {
	var $r;
	var _g = [];
	{
		var _g1 = 0;
		while(_g1 < 32) {
			var i = _g1++;
			var _g2 = [];
			var _g3 = 0;
			var _g4 = i;
			while(_g3 < _g4) {
				var k = _g3++;
				_g2.push(36064 + k);
			}
			_g.push(_g2);
		}
	}
	$r = _g;
	return $r;
}(this));
h3d_impl_MemoryManager.ALL_FLAGS = h3d_BufferFlag.__empty_constructs__.slice();
h3d_mat_Defaults.defaultKillAlphaThreshold = 0.5;
h3d_mat_Defaults.loadingTextureColor = -65281;
h3d_mat_MaterialSetup.current = new h3d_mat_MaterialSetup("Default");
h3d_mat_Texture.UID = 0;
h3d_mat_Texture.PREVENT_AUTO_DISPOSE = 2147483647;
h3d_mat_Texture.nativeFormat = hxd_PixelFormat.RGBA;
h3d_pass_Blur.__meta__ = { obj : { ignore : ["shader"]}};
h3d_shader_ScreenShader.SRC = "HXSLF2gzZC5zaGFkZXIuU2NyZWVuU2hhZGVyBwEFaW5wdXQNAQICCHBvc2l0aW9uBQoBAQADAnV2BQoBAQABAAAEBWZsaXBZAwIAAAUGb3V0cHV0DQICBghwb3NpdGlvbgUMBAUABwVjb2xvcgUMBAUABAAACApwaXhlbENvbG9yBQwEAAAJDGNhbGN1bGF0ZWRVVgUKBAAACghfX2luaXRfXw4GAAALBnZlcnRleA4GAAACAgoAAAUCBgQCBwUMAggFDAUMBgQCCQUKAgMFCgUKAAALAAAFAQYEAgYFDAkDKg4ECgICBQoAAAMGAQoCAgUKBAADAgQDAwEDAAAAAAAAAAADAQMAAAAAAADwPwMFDAUMAA";
h3d_pass__$Border_BorderShader.SRC = "HXSLHWgzZC5wYXNzLl9Cb3JkZXIuQm9yZGVyU2hhZGVyCQEFaW5wdXQNAQICCHBvc2l0aW9uBQoBAQADAnV2BQoBAQABAAAEBWZsaXBZAwIAAAUGb3V0cHV0DQICBghwb3NpdGlvbgUMBAUABwVjb2xvcgUMBAUABAAACApwaXhlbENvbG9yBQwEAAAJDGNhbGN1bGF0ZWRVVgUKBAAACgVjb2xvcgUMAgAACwhfX2luaXRfXw4GAAAMBnZlcnRleA4GAAANCGZyYWdtZW50DgYAAAMCCwAABQIGBAIHBQwCCAUMBQwGBAIJBQoCAwUKBQoAAAwAAAUBBgQCBgUMCQMqDgQKAgIFCgAAAwYBCgICBQoEAAMCBAMDAQMAAAAAAAAAAAMBAwAAAAAAAPA/AwUMBQwAAQ0AAAUBBgQCCAUMAgoFDAUMAA";
h3d_pass_ColorMatrixShader.SRC = "HXSLGmgzZC5wYXNzLkNvbG9yTWF0cml4U2hhZGVyFQEFaW5wdXQNAQICCHBvc2l0aW9uBQoBAQADAnV2BQoBAQABAAAEBWZsaXBZAwIAAAUGb3V0cHV0DQICBghwb3NpdGlvbgUMBAUABwVjb2xvcgUMBAUABAAACApwaXhlbENvbG9yBQwEAAAJDGNhbGN1bGF0ZWRVVgUKBAAACgd0ZXh0dXJlCgIAAAsGbWF0cml4BwIAAAwIdXNlQWxwaGECAgABAAAAAAANB3VzZU1hc2sCAgABAAAAAAAOCm1hc2tJbnZlcnQCAgABAAAAAAAPD2hhc1NlY29uZE1hdHJpeAICAAEAAAAAABAHbWF0cml4MgcCAAARBG1hc2sKAgAAEghtYXNrTWF0QQULAgAAEwhtYXNrTWF0QgULAgAAFAltYXNrUG93ZXIDAgAAFQttYXNrQ2hhbm5lbAUMAgAAFghfX2luaXRfXw4GAAAXBnZlcnRleA4GAAAYBWFwcGx5DgYAABkIZnJhZ21lbnQOBgAABAIWAAAFAgYEAgcFDAIIBQwFDAYEAgkFCgIDBQoFCgAAFwAABQEGBAIGBQwJAyoOBAoCAgUKAAADBgEKAgIFCgQAAwIEAwMBAwAAAAAAAAAAAwEDAAAAAAAA8D8DBQwFDAADGAIaBWNvbG9yBQwEAAAbA21hdAcEAAAFDAUBDQsCDAIGAQIaBQwCGwcFDAYBCQMqDgIKAhoFDJIABQsBAwAAAAAAAPA/AwUMAhsHBQwFDAAAARkAAAUBCwINAgUFCBwFY29sb3IFDAQAAAkDIQ4CAgoKAgMFCgUMAAgdAnV2BQsEAAAJAykOAgIDBQoBAwAAAAAAAPA/AwULAAgeAWsDBAAACQMIDgIJAx0OAgkDIQ4CAhEKCQMoDgIJAx0OAgIdBQsCEgULAwkDHQ4CAh0FCwITBQsDBQoFDAIVBQwDAhQDAwAIHwZjb2xvcjIFDAQAAAsCDwIJAhgOAgIcBQwCEAcFDAIcBQwFDAAGBAIHBQwLAg4CCQMYDgMCHwUMCQIYDgICHAUMAgsHBQwCHgMFDAkDGA4DCQIYDgICHAUMAgsHBQwCHwUMAh4DBQwFDAUMAAYEAgcFDAkCGA4CCQMhDgICCgoCAwUKBQwCCwcFDAUMAAA";
h3d_pass__$Copy_ArrayCopyShader.SRC = "HXSLHmgzZC5wYXNzLl9Db3B5LkFycmF5Q29weVNoYWRlcgoBBWlucHV0DQECAghwb3NpdGlvbgUKAQEAAwJ1dgUKAQEAAQAABAVmbGlwWQMCAAAFBm91dHB1dA0CAgYIcG9zaXRpb24FDAQFAAcFY29sb3IFDAQFAAQAAAgKcGl4ZWxDb2xvcgUMBAAACQxjYWxjdWxhdGVkVVYFCgQAAAoHdGV4dHVyZQsCAAALBWxheWVyAQIAAAwIX19pbml0X18OBgAADQZ2ZXJ0ZXgOBgAADghmcmFnbWVudA4GAAADAgwAAAUCBgQCBwUMAggFDAUMBgQCCQUKAgMFCgUKAAANAAAFAQYEAgYFDAkDKg4ECgICBQoAAAMGAQoCAgUKBAADAgQDAwEDAAAAAAAAAAADAQMAAAAAAADwPwMFDAUMAAEOAAAFAQYEAggFDAkDIQ4CAgoLCQMpDgICCQUKCQMmDgECCwEDBQsFDAUMAA";
h3d_pass__$Copy_CopyShader.SRC = "HXSLGWgzZC5wYXNzLl9Db3B5LkNvcHlTaGFkZXIJAQVpbnB1dA0BAgIIcG9zaXRpb24FCgEBAAMCdXYFCgEBAAEAAAQFZmxpcFkDAgAABQZvdXRwdXQNAgIGCHBvc2l0aW9uBQwEBQAHBWNvbG9yBQwEBQAEAAAICnBpeGVsQ29sb3IFDAQAAAkMY2FsY3VsYXRlZFVWBQoEAAAKB3RleHR1cmUKAgAACwhfX2luaXRfXw4GAAAMBnZlcnRleA4GAAANCGZyYWdtZW50DgYAAAMCCwAABQIGBAIHBQwCCAUMBQwGBAIJBQoCAwUKBQoAAAwAAAUBBgQCBgUMCQMqDgQKAgIFCgAAAwYBCgICBQoEAAMCBAMDAQMAAAAAAAAAAAMBAwAAAAAAAPA/AwUMBQwAAQ0AAAUBBgQCCAUMCQMhDgICCgoCCQUKBQwFDAA";
h3d_pass__$CubeCopy_CubeCopyShader.SRC = "HXSLIWgzZC5wYXNzLl9DdWJlQ29weS5DdWJlQ29weVNoYWRlcgoBBWlucHV0DQECAghwb3NpdGlvbgUKAQEAAwJ1dgUKAQEAAQAABAVmbGlwWQMCAAAFBm91dHB1dA0CAgYIcG9zaXRpb24FDAQFAAcFY29sb3IFDAQFAAQAAAgKcGl4ZWxDb2xvcgUMBAAACQxjYWxjdWxhdGVkVVYFCgQAAAoHdGV4dHVyZQwCAAALA21hdAYCAAAMCF9faW5pdF9fDgYAAA0GdmVydGV4DgYAAA4IZnJhZ21lbnQOBgAAAwIMAAAFAgYEAgcFDAIIBQwFDAYEAgkFCgIDBQoFCgAADQAABQEGBAIGBQwJAyoOBAoCAgUKAAADBgEKAgIFCgQAAwIEAwMBAwAAAAAAAAAAAwEDAAAAAAAA8D8DBQwFDAABDgAABQIIDwJ1dgUKBAAABgMGAQIJBQoBAwAAAAAAAABAAwUKAQMAAAAAAADwPwMFCgAGBAIIBQwJAyEOAgIKDAkDHw4BBgEJAykOAgIPBQoBAwAAAAAAAPA/AwULAgsGBQsFCwUMBQwA";
h3d_pass__$HardwarePick_FixedColor.SRC = "HXSLIWgzZC5wYXNzLl9IYXJkd2FyZVBpY2suRml4ZWRDb2xvcgUBB2NvbG9ySUQFDAIAAAIIdmlld3BvcnQFDAIAAAMGb3V0cHV0DQECBAhwb3NpdGlvbgUMBAMABQdjb2xvcklEBQwEAwAEAAAGBnZlcnRleA4GAAAHCGZyYWdtZW50DgYAAAIABgAABQEGBAIEBQwGAQQGAAIEBQwGAQkDKg4DCgICBQwRAAUKAQMAAAAAAAAAAAMBAwAAAAAAAAAAAwUMCgIEBQwMAAMFDAUMBQwJAyoOAwoCAgUMOQAFCgEDAAAAAAAA8D8DAQMAAAAAAADwPwMFDAUMBQwAAQcAAAUBBgQCBQUMAgEFDAUMAA";
h3d_pass_ShaderManager.STRICT = true;
h3d_shader_AmbientLight.SRC = "HXSLF2gzZC5zaGFkZXIuQW1iaWVudExpZ2h0CgEGZ2xvYmFsDQECAgxhbWJpZW50TGlnaHQFCwABAAMQcGVyUGl4ZWxMaWdodGluZwIAAQEAAAAAAAAAAAQKcGl4ZWxDb2xvcgUMBAAABQ9saWdodFBpeGVsQ29sb3IFCwQAAAYKbGlnaHRDb2xvcgULBAAABwhhZGRpdGl2ZQICAAEAAAAAAAgIX19pbml0X18OBgAACRBfX2luaXRfX2ZyYWdtZW50DgYAAAoJY2FsY0xpZ2h0DgYAAAsGdmVydGV4DgYAAAwIZnJhZ21lbnQOBgAABQIIAAAFAQYEAgYFCwsCBwICAgULCQMpDgEBAwAAAAAAAAAAAwULBQsFCwACCQAABQEGBAIFBQsLAgcCAgIFCwkDKQ4BAQMAAAAAAAAAAAMFCwULBQsAAwoBDQpsaWdodENvbG9yBQsEAAAFCwUBDQsCBwICDQULBAYAAgIFCwYBCQMWDgIEBgMBAwAAAAAAAPA/AwICBQsFCwULAQMAAAAAAAAAAAMFCwINBQsFCwULBQsFCwAAAAsAAAUBCwcCAgMCAgaBCgIEBQySAAULCQIKDgECBgULBQsFCwAAAAEMAAAFAQsCAwIGgQoCBAUMkgAFCwkCCg4BAgUFCwULBQsAAAA";
h3d_shader_Base2d.SRC = "HXSLEWgzZC5zaGFkZXIuQmFzZTJkGwEFaW5wdXQNAQMCCHBvc2l0aW9uBQoBAQADAnV2BQoBAQAEBWNvbG9yBQwBAQABAAAFBm91dHB1dA0CAgYIcG9zaXRpb24FDAQFAAcFY29sb3IFDAQFAAQAAAgEdGltZQMAAAAJBnpWYWx1ZQMCAAAKB3RleHR1cmUKAgAACw5zcHJpdGVQb3NpdGlvbgUMBAAADBBhYnNvbHV0ZVBvc2l0aW9uBQwEAAANCnBpeGVsQ29sb3IFDAQAAA4MdGV4dHVyZUNvbG9yBQwEAAAPDGNhbGN1bGF0ZWRVVgUKAwAAEAppc1JlbGF0aXZlAgIAAQAAAAAAEQVjb2xvcgUMAgAAEg9hYnNvbHV0ZU1hdHJpeEEFCwIAABMPYWJzb2x1dGVNYXRyaXhCBQsCAAAUDWZpbHRlck1hdHJpeEEFCwIAABUNZmlsdGVyTWF0cml4QgULAgAAFghoYXNVVlBvcwICAAEAAAAAABcFdXZQb3MFDAIAABgJa2lsbEFscGhhAgIAAQAAAAAAGQpwaXhlbEFsaWduAgIAAQAAAAAAGhBoYWxmUGl4ZWxJbnZlcnNlBQoCAAAbCXZpZXdwb3J0QQULAgAAHAl2aWV3cG9ydEIFCwIAAB0Ob3V0cHV0UG9zaXRpb24FDAQAAB4IX19pbml0X18OBgAAHwZ2ZXJ0ZXgOBgAAIAhmcmFnbWVudA4GAAADAh4AAAUGBgQCCwUMCQMqDgMCAgUKAgkDAQMAAAAAAADwPwMFDAUMCwIQAgUDBgQKAgwFDAAAAwkDHQ4CCQMpDgIKAgsFDBEABQoBAwAAAAAAAPA/AwULAhIFCwMDBgQKAgwFDAQAAwkDHQ4CCQMpDgIKAgsFDBEABQoBAwAAAAAAAPA/AwULAhMFCwMDBgQKAgwFDDkABQoKAgsFDDkABQoFCgAGBAIMBQwCCwUMBQwABgQCDwUKCwIWAgYABgECAwUKCgIXBQw5AAUKBQoKAhcFDBEABQoFCgIDBQoFCgUKBgQCDQUMCwIQAgYBAhEFDAIEBQwFDAIEBQwFDAUMBgQCDgUMCQMhDgICCgoCDwUKBQwFDAaBAg0FDAIOBQwFDAAAHwAABQUIIQN0bXAFCwQAAAkDKQ4CCgIMBQwRAAUKAQMAAAAAAADwPwMFCwAGBAIhBQsJAykOAwkDHQ4CAiEFCwIUBQsDCQMdDgICIQULAhUFCwMBAwAAAAAAAPA/AwULBQsGBAIdBQwJAyoOAwkDHQ4CAiEFCwIbBQsDCQMdDgICIQULAhwFCwMKAgwFDDkABQoFDAUMCwIZAgaDCgIdBQwRAAUKAhoFCgUKAAAGBAIGBQwCHQUMBQwAASAAAAUCCwYOAhgCBgkKAg0FDAwAAwED/Knx0k1iUD8DAgIMAAAABgQCBwUMAg0FDAUMAA";
h3d_shader_BaseMesh.SRC = "HXSLE2gzZC5zaGFkZXIuQmFzZU1lc2gXAQZjYW1lcmENAQoCBHZpZXcHAAEAAwRwcm9qBwABAAQIcG9zaXRpb24FCwABAAUIcHJvakZsaXADAAEABghwcm9qRGlhZwULAAEABwh2aWV3UHJvagcAAQAID2ludmVyc2VWaWV3UHJvagcAAQAJBXpOZWFyAwABAAoEekZhcgMAAQALA2RpcgULAwEAAAAADAZnbG9iYWwNAgQNBHRpbWUDAAwADglwaXhlbFNpemUFCgAMAA8JbW9kZWxWaWV3BwAMAQMQEG1vZGVsVmlld0ludmVyc2UHAAwBAwAAABEFaW5wdXQNAwISCHBvc2l0aW9uBQsBEQATBm5vcm1hbAULAREAAQAAFAZvdXRwdXQNBAUVCHBvc2l0aW9uBQwEFAAWBWNvbG9yBQwEFAAXBWRlcHRoAwQUABgGbm9ybWFsBQsEFAAZCXdvcmxkRGlzdAMEFAAEAAAaEHJlbGF0aXZlUG9zaXRpb24FCwQAABsTdHJhbnNmb3JtZWRQb3NpdGlvbgULBAAAHBhwaXhlbFRyYW5zZm9ybWVkUG9zaXRpb24FCwQAAB0RdHJhbnNmb3JtZWROb3JtYWwFCwQAAB4RcHJvamVjdGVkUG9zaXRpb24FDAQAAB8KcGl4ZWxDb2xvcgUMBAAAIAVkZXB0aAMEAAAhCHNjcmVlblVWBQoEAAAiCXNwZWNQb3dlcgMEAAAjCXNwZWNDb2xvcgULBAAAJAl3b3JsZERpc3QDBAAAJQVjb2xvcgUMAgAAJg1zcGVjdWxhclBvd2VyAwIAAQcAAAAAAAAAAAAAAAAAAFlAJw5zcGVjdWxhckFtb3VudAMCAAEHAAAAAAAAAAAAAAAAAAAkQCgNc3BlY3VsYXJDb2xvcgULAgAAKQhfX2luaXRfXw4GAAAqEF9faW5pdF9fZnJhZ21lbnQOBgAAKwZ2ZXJ0ZXgOBgAALAhmcmFnbWVudA4GAAAEAikAAAULBgQCGgULAhIFCwULBgQCGwULBgECGgULCQM0DgECDwcIBQsFCwYEAh4FDAYBCQMqDgICGwULAQMAAAAAAADwPwMFDAIHBwUMBQwGBAIdBQsJAx8OAQQGAQITBQsJAzIOAQIPBwYFCwULBQsFCwYEAgsFCwkDHw4BBAYDAgQFCwIbBQsFCwULBQsFCwYEAh8FDAIlBQwFDAYEAiIDAiYDAwYEAiMFCwYBAigFCwInAwULBQsGBAIhBQoJAzoOAQYCCgIeBQwRAAUKCgIeBQwMAAMFCgUKBQoGBAIgAwYCCgIeBQwIAAMKAh4FDAwAAwMDBgQCJAMGAgkDGw4BBgMCGwULAgQFCwULAwIKAwMDAAIqAAAFBQYEAh0FCwkDHw4BAh0FCwULBQsGBAIhBQoJAzoOAQYCCgIeBQwRAAUKCgIeBQwMAAMFCgUKBQoGBAIgAwYCCgIeBQwIAAMKAh4FDAwAAwMDBgQCIgMCJgMDBgQCIwULBgECKAULAicDBQsFCwAAKwAABQIGBAIVBQwGAQIeBQwJAyoOBAEDAAAAAAAA8D8DAgUDAQMAAAAAAADwPwMBAwAAAAAAAPA/AwUMBQwFDAYEAhwFCwIbBQsFCwABLAAABQQGBAIWBQwCHwUMBQwGBAIXAwIgAwMGBAIYBQsCHQULBQsGBAIZAwIkAwMA";
h3d_shader_Blur.SRC = "HXSLD2gzZC5zaGFkZXIuQmx1choBBWlucHV0DQECAghwb3NpdGlvbgUKAQEAAwJ1dgUKAQEAAQAABAVmbGlwWQMCAAAFBm91dHB1dA0CAgYIcG9zaXRpb24FDAQFAAcFY29sb3IFDAQFAAQAAAgKcGl4ZWxDb2xvcgUMBAAACQxjYWxjdWxhdGVkVVYFCgQAAAoVY2FtZXJhSW52ZXJzZVZpZXdQcm9qBwIAAAsHdGV4dHVyZQoCAAAMDGRlcHRoVGV4dHVyZQoCAAANB1F1YWxpdHkBAgABAAAAAAAOB2lzRGVwdGgCAgABAAAAAAAPBnZhbHVlcw8DDQIAABAHb2Zmc2V0cw8DDQIAABEFcGl4ZWwFCgIAABINaGFzRml4ZWRDb2xvcgICAAEAAAAAABMQc21vb3RoRml4ZWRDb2xvcgICAAEAAAAAABQKZml4ZWRDb2xvcgUMAgAAFRBpc0RlcHRoRGVwZW5kYW50AgIAAQAAAAAAFgloYXNOb3JtYWwCAgABAAAAAAAXDW5vcm1hbFRleHR1cmUKAgAAGAZpc0N1YmUCAgABAAAAAAAZC2N1YmVUZXh0dXJlDAIAABoHY3ViZURpcgYCAAAbCF9faW5pdF9fDgYAABwGdmVydGV4DgYAAB0IZnJhZ21lbnQOBgAAHgtnZXRQb3NpdGlvbg4GAAAEAhsAAAUCBgQCBwUMAggFDAUMBgQCCQUKAgMFCgUKAAAcAAAFAQYEAgYFDAkDKg4ECgICBQoAAAMGAQoCAgUKBAADAgQDAwEDAAAAAAAAAAADAQMAAAAAAADwPwMFDAUMAAEdAAAFAgsCFQIFBggfBHBjdXIFCwQAAAkCHg4BAgMFCgULAAggBGNjdXIFDAQAAAkDIQ4CAgsKAgMFCgUMAAghBWNvbG9yBQwEAAAJAyoOBAEDAAAAAAAAAAADAQMAAAAAAAAAAAMBAwAAAAAAAAAAAwEDAAAAAAAAAAADBQwACCIEbmN1cgULBAAACQM5DgEJAyEOAgIXCgIDBQoFDAULABUGdW5yb2xsAA4jAWkBBAAABhUGAAcDAg0BAQECAQAAAAEBAg0BDwEAAAUICCQCdXYFCgQAAAYAAgMFCgYBAhEFChECEA8DDQsGCQIjAQECAAAAAAECBwMCIwEBAiMBAQMFCgUKAAglAWMFDAQAAAkDIQ4CAgsKAiQFCgUMAAgmAXAFCwQAAAkCHg4BAiQFCgULAAgnAWQDBAAACQMdDgIEBgMCJgULAh8FCwULBQsGAwImBQsCHwULBQsDAAgoAW4FCwQAAAkDOQ4BCQMhDgICFwoCJAUKBQwFCwAGBAIlBQwJAxgOAwIgBQwCJQUMCQMdDgICIgULAigFCwMFDAUMBgQCJQUMCQMYDgMCJQUMAiAFDAkDFQ4CBAYBCQMWDgIEBgMCJwMBA/yp8dJNYlA/AwMDAQMAAAAAAAAAAAMDAQMAAAAAAGr4QAMDAwEDAAAAAAAA8D8DAwUMBQwGgAIhBQwGAQIlBQwRAg8PAw0LBgkCIwEBAgAAAAABAgcDAiMBAQIjAQEDBQwFDAAAAAYEAggFDAIhBQwFDAALAg4CBQMIKQN2YWwDBAAAAQMAAAAAAAAAAAMAFQZ1bnJvbGwADioBaQEEAAAGFQYABwMCDQEBAQIBAAAAAQECDQEPAQAABQELAhgCBoACKQMGAQkDNw4BCQMhDgICGQwGAQkDKQ4CBgMGAQQGAAIDBQoGAQYBAhEFChECEA8DDQsGCQIqAQECAAAAAAECBwMCKgEBAioBAQMFCgkDJg4BAioBAwUKBQoFCgEDAAAAAAAAAEADBQoBAwAAAAAAAPA/AwUKAQMAAAAAAADwPwMFCwIaBgULBQwDEQIPDwMNCwYJAioBAQIAAAAAAQIHAwIqAQECKgEBAwMDBoACKQMGAQkDNw4BCQMhDgICCwoGAAIDBQoGAQYBAhEFChECEA8DDQsGCQIqAQECAAAAAAECBwMCKgEBAioBAQMFCgkDJg4BAioBAwUKBQoFDAMRAg8PAw0LBgkCKgEBAgAAAAABAgcDAioBAQIqAQEDAwMAAAAABgQCCAUMCQM2DgEJAxUOAgIpAwEDyxpQyv//7z8DAwUMBQwABQMIKwVjb2xvcgUMBAAACQMqDgQBAwAAAAAAAAAAAwEDAAAAAAAAAAADAQMAAAAAAAAAAAMBAwAAAAAAAAAAAwUMABUGdW5yb2xsAA4sAWkBBAAABhUGAAcDAg0BAQECAQAAAAEBAg0BDwEAAAUBCwIYAgaAAisFDAYBCQMhDgICGQwGAQkDKQ4CBgMGAQQGAAIDBQoGAQYBAhEFChECEA8DDQsGCQIsAQECAAAAAAECBwMCLAEBAiwBAQMFCgkDJg4BAiwBAwUKBQoFCgEDAAAAAAAAAEADBQoBAwAAAAAAAPA/AwUKAQMAAAAAAADwPwMFCwIaBgULBQwRAg8PAw0LBgkCLAEBAgAAAAABAgcDAiwBAQIsAQEDBQwFDAaAAisFDAYBCQMhDgICCwoGAAIDBQoGAQYBAhEFChECEA8DDQsGCQIsAQECAAAAAAECBwMCLAEBAiwBAQMFCgkDJg4BAiwBAwUKBQoFDBECDw8DDQsGCQIsAQECAAAAAAECBwMCLAEBAiwBAQMFDAUMAAAAAAYEAggFDAIrBQwFDAAAAAsCEgIFAgsCEwIGgQoCCAUMDAADCgIUBQwMAAMDBgQKAggFDAwAAwYBCgIUBQwMAAMJAyYOAQYHCgIIBQwMAAMBAwAAAAAAAAAAAwIDAwMABgQKAggFDJIABQsGAQoCFAUMkgAFCwoCCAUMDAADBQsFCwAAAAADHgEtAnV2BQoEAAAFCwUECC4FZGVwdGgDBAAACQM3DgEJAyEOAgIMCgItBQoFDAMACC8EdGVtcAUMBAAABgEJAyoOAwkDOw4BAi0FCgUKAi4DAQMAAAAAAADwPwMFDAIKBwUMAAgwCG9yaWdpbldTBQsEAAAGAgoCLwUMkgAFCwoCLwUMDAADBQsADQIwBQsAAA";
h3d_shader_ColorAdd.SRC = "HXSLE2gzZC5zaGFkZXIuQ29sb3JBZGQDAQpwaXhlbENvbG9yBQwEAAACBWNvbG9yBQsCAAADCGZyYWdtZW50DgYAAAEBAwAABQEGgAoCAQUMkgAFCwICBQsFCwA";
h3d_shader_ColorKey.SRC = "HXSLE2gzZC5zaGFkZXIuQ29sb3JLZXkDAQhjb2xvcktleQUMAgAAAgx0ZXh0dXJlQ29sb3IFDAQAAAMIZnJhZ21lbnQOBgAAAQEDAAAFAggEBWNkaWZmBQwEAAAGAwICBQwCAQUMBQwACwYJCQMdDgICBAUMAgQFDAMBA/Fo44i1+OQ+AwIMAAAAAA";
h3d_shader_ColorMatrix.SRC = "HXSLFmgzZC5zaGFkZXIuQ29sb3JNYXRyaXgDAQpwaXhlbENvbG9yBQwEAAACBm1hdHJpeAcCAAADCGZyYWdtZW50DgYAAAEBAwAABQEGBAIBBQwJAyoOAgoEBgEJAyoOAgoCAQUMkgAFCwEDAAAAAAAA8D8DBQwCAgcFDAUMkgAFCwoEBgECAQUMAgIHBQwFDAwAAwUMBQwA";
h3d_shader_DirShadow.SRC = "HXSLFGgzZC5zaGFkZXIuRGlyU2hhZG93EgEGZW5hYmxlAgIAAQAAAAAAAgdVU0VfRVNNAgIAAQAAAAAAAwtzaGFkb3dQb3dlcgMCAAAEB1VTRV9QQ0YCAgABAAAAAAAFCnBjZlF1YWxpdHkBAgABAAAAAAAGCHBjZlNjYWxlAwIAAAcJc2hhZG93UmVzBQoCAAAICXNoYWRvd01hcBEBAgAACQpzaGFkb3dQcm9qCAIAAAoKc2hhZG93QmlhcwMCAAALE3RyYW5zZm9ybWVkUG9zaXRpb24FCwQAAAwGc2hhZG93AwQAAA0JZGlyU2hhZG93AwQAAA4OcG9pc3NvbkRpc2tMb3cPBQwABAIAAA8PcG9pc3NvbkRpc2tIaWdoDwUMAAwCAAAQE3BvaXNzb25EaXNrVmVyeUhpZ2gPBQwAQAIAABEEcmFuZA4GAAASCGZyYWdtZW50DgYAAAIDEQETAXYDBAAAAwUCCBQCZHADBAAACQMdDgIJAyoOAQITAwUMCQMqDgQBA18pyxDH+ilAAwED9P3UeOmOU0ADAQOiRbbz/ZRGQAMBA1CNl24Sq1dAAwUMAwANCQMTDgEGAQkDAg4BAhQDAwEDUPwYc9Fd5UADAwMAAAESAAAFAgsCAQIFAQsCBAIFBwYEAgwDAQMAAAAAAADwPwMDCBUJdGV4ZWxTaXplBQoEAAAGAgEDAAAAAAAA8D8DAgcFCgUKAAgWCXNoYWRvd1BvcwULBAAABgECCwULAgkIBQsACBcIc2hhZG93VXYFCgQAAAkDOg4BCgIWBQsRAAUKBQoACBgEek1heAMEAAAJAzUOAQoCFgULCAADAwAIGQNyb3QDBAAABgEGAQkCEQ4BBgAGAAoCCwULAAADCgILBQsEAAMDCgILBQsIAAMDAwEDH4XrUbgeCUADAwEDAAAAAAAAAEADAwATBAIFAQEDAQECAQAAAAEFAggaDnNhbXBsZVN0cmVuZ3RoAwQAAAYCAQMAAAAAAADwPwMBAwAAAAAAABBAAwMADhsBaQEEAAAGFQECAAAAAAEBAgQAAAABDwEAAAUECBwGb2Zmc2V0BQoEAAAGAQYBChECDg8FDAAEAhsBBQwRAAUKAhUFCgUKAgYDBQoABgQCHAUKCQMoDgIGAwYBCQMDDgECGQMDCgIcBQoAAAMDBgEJAwIOAQIZAwMKAhwFCgQAAwMDBgAGAQkDAw4BAhkDAwoCHAUKBAADAwYBCQMCDgECGQMDCgIcBQoAAAMDAwUKBQoIHQVkZXB0aAMEAAAJA0AOAwIIEQEGAAIXBQoCHAUKBQoBAwAAAAAAAAAAAwMACwYHBgMCGAMCCgMDAh0DAgaDAgwDAhoDAwAAAAAAAQECAgAAAAEFAggeDnNhbXBsZVN0cmVuZ3RoAwQAAAYCAQMAAAAAAADwPwMBAwAAAAAAAChAAwMADh8BaQEEAAAGFQECAAAAAAEBAgwAAAABDwEAAAUECCAGb2Zmc2V0BQoEAAAGAQYBChECDw8FDAAMAh8BBQwRAAUKAhUFCgUKAgYDBQoABgQCIAUKCQMoDgIGAwYBCQMDDgECGQMDCgIgBQoAAAMDBgEJAwIOAQIZAwMKAiAFCgQAAwMDBgAGAQkDAw4BAhkDAwoCIAUKBAADAwYBCQMCDgECGQMDCgIgBQoAAAMDAwUKBQoIIQVkZXB0aAMEAAAJA0AOAwIIEQEGAAIXBQoCIAUKBQoBAwAAAAAAAAAAAwMACwYHBgMCGAMCCgMDAiEDAgaDAgwDAh4DAwAAAAAAAQECAwAAAAEFAggiDnNhbXBsZVN0cmVuZ3RoAwQAAAYCAQMAAAAAAADwPwMBAwAAAAAAAFBAAwMADiMBaQEEAAAGFQECAAAAAAEBAkAAAAABDwEAAAUECCQGb2Zmc2V0BQoEAAAGAQYBChECEA8FDABAAiMBBQwRAAUKAhUFCgUKAgYDBQoABgQCJAUKCQMoDgIGAwYBCQMDDgECGQMDCgIkBQoAAAMDBgEJAwIOAQIZAwMKAiQFCgQAAwMDBgAGAQkDAw4BAhkDAwoCJAUKBAADAwYBCQMCDgECGQMDCgIkBQoAAAMDAwUKBQoIJQVkZXB0aAMEAAAJA0AOAwIIEQEGAAIXBQoCJAUKBQoBAwAAAAAAAAAAAwMACwYHBgMCGAMCCgMDAiUDAgaDAgwDAiIDAwAAAAAAAAAACwICAgUFCCYJc2hhZG93UG9zBQsEAAAGAQILBQsCCQgFCwAIJwVkZXB0aAMEAAAJAz8OAgIIEQEJAzoOAQoCJgULEQAFCgUKAwAIKAR6TWF4AwQAAAkDNQ4BCgImBQsIAAMDAAgpBWRlbHRhAwQAAAYDCQMVDgIEBgACJwMCCgMDAwIoAwMCKAMDAAYEAgwDCQM1DgEJAwkOAQYBAgMDAikDAwMDAwAFBAgqCXNoYWRvd1BvcwULBAAABgECCwULAgkIBQsACCsIc2hhZG93VXYFCgQAAAkDOg4BCgIqBQsRAAUKBQoACCwFZGVwdGgDBAAACQM/DgICCBEBCgIrBQoRAAUKAwAGBAIMAwsGBwYDCgIqBQsIAAMCCgMDAiwDAgEDAAAAAAAAAAADAQMAAAAAAADwPwMDAwAAAAAAAAYEAg0DAgwDAwA";
h3d_shader_GenTexture.SRC = "HXSLFWgzZC5zaGFkZXIuR2VuVGV4dHVyZQoBBWlucHV0DQECAghwb3NpdGlvbgUKAQEAAwJ1dgUKAQEAAQAABAVmbGlwWQMCAAAFBm91dHB1dA0CAgYIcG9zaXRpb24FDAQFAAcFY29sb3IFDAQFAAQAAAgKcGl4ZWxDb2xvcgUMBAAACQxjYWxjdWxhdGVkVVYFCgQAAAoEbW9kZQECAAEAAAAAAAsFY29sb3IFDAIAAAwIX19pbml0X18OBgAADQZ2ZXJ0ZXgOBgAADghmcmFnbWVudA4GAAADAgwAAAUCBgQCBwUMAggFDAUMBgQCCQUKAgMFCgUKAAANAAAFAQYEAgYFDAkDKg4ECgICBQoAAAMGAQoCAgUKBAADAgQDAwEDAAAAAAAAAAADAQMAAAAAAADwPwMFDAUMAAEOAAAFARMEAgoBAQEBAQIAAAAAAQUBBgQCCAUMCwYHCQMbDgEKAgYFDBEABQoDAQMAAAAAAADwPwMCCQMqDgEBAwAAAAAAAAAAAwUMAgsFDAUMBQwAAAAA";
h3d_shader_LineShader.SRC = "HXSLFWgzZC5zaGFkZXIuTGluZVNoYWRlcgwBBmNhbWVyYQ0BAwIEdmlldwcAAQADBHByb2oHAAEABAh2aWV3UHJvagcAAQAAAAAFBmdsb2JhbA0CAgYJcGl4ZWxTaXplBQoABQAHCW1vZGVsVmlldwcABQEDAAAACAVpbnB1dA0DAwkIcG9zaXRpb24FCwEIAAoGbm9ybWFsBQsBCAALAnV2BQoBCAABAAAMBm91dHB1dA0EAQ0IcG9zaXRpb24FDAQMAAQAAA4RdHJhbnNmb3JtZWROb3JtYWwFCwQAAA8TdHJhbnNmb3JtZWRQb3NpdGlvbgULBAAAEBFwcm9qZWN0ZWRQb3NpdGlvbgUMBAAAEQtsZW5ndGhTY2FsZQMCAAASBXdpZHRoAwIAABMEcGRpcgUMBAAAFAhfX2luaXRfXw4GAAAVBnZlcnRleA4GAAACAhQAAAUBBQUIFgNkaXIFCwQAAAYBAgoFCwkDMg4BAgcHBgULAAYEAhMFDAYBCQMqDgIGAQIWBQsJAzIOAQICBwYFCwEDAAAAAAAA8D8DBQwCAwcFDAUMBoEKAhMFDBEABQoGAgEDAAAAAAAA8D8DCQMNDgEGAAYBCgITBQwAAAMKAhMFDAAAAwMGAQoCEwUMBAADCgITBQwEAAMDAwMDBQoGgAIPBQsGAQYBAhYFCwoCCwUKAAADBQsCEQMFCwULBgQCDgULCQMfDgECFgULBQsFCwAAABUAAAUBBoAKAhAFDBEABQoGAQYBBgEGAQQGAQoCEwUMBQAFCgkDKA4CAQMAAAAAAADwPwMBAwAAAAAAAPC/AwUKBQoFCgQGAwoCCwUKBAADAQMAAAAAAADgPwMDAwUKCgIQBQwIAAMFCgIGBQoFCgISAwUKBQoA";
h3d_shader_MinMaxShader.SRC = "HXSLF2gzZC5zaGFkZXIuTWluTWF4U2hhZGVyCwEFaW5wdXQNAQICCHBvc2l0aW9uBQoBAQADAnV2BQoBAQABAAAEBWZsaXBZAwIAAAUGb3V0cHV0DQICBghwb3NpdGlvbgUMBAUABwVjb2xvcgUMBAUABAAACApwaXhlbENvbG9yBQwEAAAJDGNhbGN1bGF0ZWRVVgUKBAAACgR0ZXhBCgIAAAsEdGV4QgoCAAAMBWlzTWF4AgIAAQAAAAAADQhfX2luaXRfXw4GAAAOBnZlcnRleA4GAAAPCGZyYWdtZW50DgYAAAMCDQAABQIGBAIHBQwCCAUMBQwGBAIJBQoCAwUKBQoAAA4AAAUBBgQCBgUMCQMqDgQKAgIFCgAAAwYBCgICBQoEAAMCBAMDAQMAAAAAAAAAAAMBAwAAAAAAAPA/AwUMBQwAAQ8AAAUDCBABYQUMBAAACQMhDgICCgoCCQUKBQwACBEBYgUMBAAACQMhDgICCwoCCQUKBQwABgQCCAUMCwIMAgkDFg4CAhAFDAIRBQwFDAkDFQ4CAhAFDAIRBQwFDAUMBQwA";
h3d_shader_CubeMinMaxShader.SRC = "HXSLG2gzZC5zaGFkZXIuQ3ViZU1pbk1heFNoYWRlcgwBBWlucHV0DQECAghwb3NpdGlvbgUKAQEAAwJ1dgUKAQEAAQAABAVmbGlwWQMCAAAFBm91dHB1dA0CAgYIcG9zaXRpb24FDAQFAAcFY29sb3IFDAQFAAQAAAgKcGl4ZWxDb2xvcgUMBAAACQxjYWxjdWxhdGVkVVYFCgQAAAoEdGV4QQwCAAALBHRleEIMAgAADAVpc01heAICAAEAAAAAAA0DbWF0BgIAAA4IX19pbml0X18OBgAADwZ2ZXJ0ZXgOBgAAEAhmcmFnbWVudA4GAAADAg4AAAUCBgQCBwUMAggFDAUMBgQCCQUKAgMFCgUKAAAPAAAFAQYEAgYFDAkDKg4ECgICBQoAAAMGAQoCAgUKBAADAgQDAwEDAAAAAAAAAAADAQMAAAAAAADwPwMFDAUMAAEQAAAFBQgRAnV2BQoEAAAGAwYBAgkFCgEDAAAAAAAAAEADBQoBAwAAAAAAAPA/AwUKAAgSA2RpcgULBAAABgEJAykOAgIRBQoBAwAAAAAAAPA/AwULAg0GBQsACBMBYQUMBAAACQMhDgICCgwCEgULBQwACBQBYgUMBAAACQMhDgICCwwCEgULBQwABgQCCAUMCwIMAgkDFg4CAhMFDAIUBQwFDAkDFQ4CAhMFDAIUBQwFDAUMBQwA";
h3d_shader_NormalMap.SRC = "HXSLFGgzZC5zaGFkZXIuTm9ybWFsTWFwCgEGY2FtZXJhDQECAghwb3NpdGlvbgULAAEAAwNkaXIFCwMBAAAAAAQGZ2xvYmFsDQIBBQltb2RlbFZpZXcHAAQBAwAAAAYFaW5wdXQNAwIHBm5vcm1hbAULAQYACAd0YW5nZW50BQsBBgABAAAJB3RleHR1cmUKAgAACgxjYWxjdWxhdGVkVVYFCgQAAAsTdHJhbnNmb3JtZWRQb3NpdGlvbgULBAAADBF0cmFuc2Zvcm1lZE5vcm1hbAULBAAADRJ0cmFuc2Zvcm1lZFRhbmdlbnQFDAMAAA4OX19pbml0X192ZXJ0ZXgOBgAADwhmcmFnbWVudA4GAAACAg4AAAUBBgQCDQUMCQMqDgIGAQIIBQsJAzIOAQIFBwYFCwsGBwkDHQ4CAggFCwIIBQsDAQMAAAAAAADgPwMCAQMAAAAAAADwPwMBAwAAAAAAAPC/AwMFDAUMAAEPAAAFBQgQAW4FCwQAAAIMBQsACBECbmYFCwQAAAkDOQ4BCQMhDgICCQoCCgUKBQwFCwAIEgR0YW5YBQsEAAAJAx8OAQoCDQUMkgAFCwULAAgTBHRhblkFCwQAAAYBCQMeDgICEAULAhIFCwULBwMKAg0FDAwAAwMFCwAGBAIMBQsJAx8OAQQGAAYABgEKAhEFCwAAAwISBQsFCwYBCgIRBQsEAAMCEwULBQsFCwYBCgIRBQsIAAMCEAULBQsFCwULBQsFCwA";
h3d_shader_Shadow.SRC = "HXSLEWgzZC5zaGFkZXIuU2hhZG93BgEGc2hhZG93DQEFAgNtYXARAQABAAMEcHJvaggAAQAEBWNvbG9yBQsAAQAFBXBvd2VyAwABAAYEYmlhcwMAAQAAAAAHCnBpeGVsQ29sb3IFDAQAAAgTdHJhbnNmb3JtZWRQb3NpdGlvbgULBAAACRhwaXhlbFRyYW5zZm9ybWVkUG9zaXRpb24FCwQAAAoJc2hhZG93UG9zBQsEAAEBCwhmcmFnbWVudA4GAAABAQsAAAUGCAwJc2hhZG93UG9zBQsEAAAGAQIJBQsCAwgFCwAIDQVkZXB0aAMEAAAJAz8OAgICEQEJAzoOAQoCDAULEQAFCgUKAwAIDgR6TWF4AwQAAAkDNQ4BCgIMBQsIAAMDAAgPBWRlbHRhAwQAAAYDCQMVDgIEBgACDQMCBgMDAwIOAwMCDgMDAAgQBXNoYWRlAwQAAAkDNQ4BCQMJDgEGAQIFAwIPAwMDAwAGgQoCBwUMkgAFCwYABgEEBgMBAwAAAAAAAPA/AwIQAwMDCgIEBQuSAAULBQsCEAMFCwULAA";
h3d_shader_SignedDistanceField.SRC = "HXSLHmgzZC5zaGFkZXIuU2lnbmVkRGlzdGFuY2VGaWVsZA4BBWlucHV0DQEDAghwb3NpdGlvbgUKAQEAAwJ1dgUKAQEABAVjb2xvcgUMAQEAAQAABQZvdXRwdXQNAgIGCHBvc2l0aW9uBQwEBQAHBWNvbG9yBQwEBQAEAAAIBHRpbWUDAAAACQ5zcHJpdGVQb3NpdGlvbgUMBAAAChBhYnNvbHV0ZVBvc2l0aW9uBQwEAAALCnBpeGVsQ29sb3IFDAQAAAwMdGV4dHVyZUNvbG9yBQwEAAANDGNhbGN1bGF0ZWRVVgUKAwAADg5vdXRwdXRQb3NpdGlvbgUMBAAADwdjaGFubmVsAQIAAQAAAAAAEAthbHBoYUN1dG9mZgMCAAARCXNtb290aGluZwMCAAASBm1lZGlhbg4GAAATCGZyYWdtZW50DgYAAAIDEgMUAXIDBAAAFQFnAwQAABYBYgMEAAADBQENCQMWDgIJAxUOAgIUAwIVAwMJAxUOAgkDFg4CAhQDAhUDAwIWAwMDAAABEwAABQQIFw10ZXh0dXJlU2FtcGxlBQwEAAACDAUMAAgYCGRpc3RhbmNlAwQAAAAABgQCGAMLBgUCDwEBAgAAAAABAgoCFwUMAAADCwYFAg8BAQIBAAAAAQIKAhcFDAQAAwsGBQIPAQECAgAAAAECCgIXBQwIAAMLBgUCDwEBAgMAAAABAgoCFwUMDAADCQISDgMKAhcFDAAAAwoCFwUMBAADCgIXBQwIAAMDAwMDAwMGBAIMBQwJAyoOBAEDAAAAAAAA8D8DAQMAAAAAAADwPwMBAwAAAAAAAPA/AwkDGg4DBgMCEAMCEQMDBgACEAMCEQMDAhgDAwUMBQwA";
h3d_shader_SkinBase.SRC = "HXSLE2gzZC5zaGFkZXIuU2tpbkJhc2UFARByZWxhdGl2ZVBvc2l0aW9uBQsEAAACE3RyYW5zZm9ybWVkUG9zaXRpb24FCwQAAAMRdHJhbnNmb3JtZWROb3JtYWwFCwQAAAQITWF4Qm9uZXMBAgABAAAAAAAFDWJvbmVzTWF0cml4ZXMPCAQCAAEIAA";
h3d_shader_Skin.SRC = "HXSLD2gzZC5zaGFkZXIuU2tpbggBEHJlbGF0aXZlUG9zaXRpb24FCwQAAAITdHJhbnNmb3JtZWRQb3NpdGlvbgULBAAAAxF0cmFuc2Zvcm1lZE5vcm1hbAULBAAABAhNYXhCb25lcwECAAEAAAAAAAUNYm9uZXNNYXRyaXhlcw8IBAIAAQgGBWlucHV0DQEEBwhwb3NpdGlvbgULAQYACAZub3JtYWwFCwEGAAkHd2VpZ2h0cwULAQYACgdpbmRleGVzCQQAAAABBgABAAALEnRyYW5zZm9ybWVkVGFuZ2VudAUMBAAADAZ2ZXJ0ZXgOBgAAAQAMAAAFAgYEAgIFCwYABgAGAQQGAQIBBQsRAgUPCAQJAyUOAQoCCgkEAAAAAAADAQgFCwULCgIJBQsAAAMFCwYBBAYBAgEFCxECBQ8IBAkDJQ4BCgIKCQQAAAAEAAMBCAULBQsKAgkFCwQAAwULBQsGAQQGAQIBBQsRAgUPCAQJAyUOAQoCCgkEAAAACAADAQgFCwULCgIJBQsIAAMFCwULBQsGBAIDBQsJAx8OAQYABgAGAQQGAQIIBQsJAzIOARECBQ8IBAkDJQ4BCgIKCQQAAAAAAAMBCAYFCwULCgIJBQsAAAMFCwYBBAYBAggFCwkDMg4BEQIFDwgECQMlDgEKAgoJBAAAAAQAAwEIBgULBQsKAgkFCwQAAwULBQsGAQQGAQIIBQsJAzIOARECBQ8IBAkDJQ4BCgIKCQQAAAAIAAMBCAYFCwULCgIJBQsIAAMFCwULBQsFCwA";
h3d_shader_SkinTangent.SRC = "HXSLFmgzZC5zaGFkZXIuU2tpblRhbmdlbnQIARByZWxhdGl2ZVBvc2l0aW9uBQsEAAACE3RyYW5zZm9ybWVkUG9zaXRpb24FCwQAAAMRdHJhbnNmb3JtZWROb3JtYWwFCwQAAAQITWF4Qm9uZXMBAgABAAAAAAAFDWJvbmVzTWF0cml4ZXMPCAQCAAEIBgVpbnB1dA0BBQcIcG9zaXRpb24FCwEGAAgGbm9ybWFsBQsBBgAJB3RhbmdlbnQFCwEGAAoHd2VpZ2h0cwULAQYACwdpbmRleGVzCQQAAAABBgABAAAMEnRyYW5zZm9ybWVkVGFuZ2VudAUMBAAADQZ2ZXJ0ZXgOBgAAAQANAAAFAwYEAgIFCwYABgAGAQQGAQIBBQsRAgUPCAQJAyUOAQoCCwkEAAAAAAADAQgFCwULCgIKBQsAAAMFCwYBBAYBAgEFCxECBQ8IBAkDJQ4BCgILCQQAAAAEAAMBCAULBQsKAgoFCwQAAwULBQsGAQQGAQIBBQsRAgUPCAQJAyUOAQoCCwkEAAAACAADAQgFCwULCgIKBQsIAAMFCwULBQsGBAIDBQsJAx8OAQYABgAGAQQGAQIIBQsJAzIOARECBQ8IBAkDJQ4BCgILCQQAAAAAAAMBCAYFCwULCgIKBQsAAAMFCwYBBAYBAggFCwkDMg4BEQIFDwgECQMlDgEKAgsJBAAAAAQAAwEIBgULBQsKAgoFCwQAAwULBQsGAQQGAQIIBQsJAzIOARECBQ8IBAkDJQ4BCgILCQQAAAAIAAMBCAYFCwULCgIKBQsIAAMFCwULBQsFCwYEAgwFDAkDKg4CCQMfDgEGAAYABgEEBgEKAgkFC5IABQsJAzIOARECBQ8IBAkDJQ4BCgILCQQAAAAAAAMBCAYFCwULCgIKBQsAAAMFCwYBBAYBCgIJBQuSAAULCQMyDgERAgUPCAQJAyUOAQoCCwkEAAAABAADAQgGBQsFCwoCCgULBAADBQsFCwYBBAYBCgIJBQuSAAULCQMyDgERAgUPCAQJAyUOAQoCCwkEAAAACAADAQgGBQsFCwoCCgULCAADBQsFCwULCgIMBQwMAAMFDAUMAA";
h3d_shader_SpecularTexture.SRC = "HXSLGmgzZC5zaGFkZXIuU3BlY3VsYXJUZXh0dXJlBAEHdGV4dHVyZQoCAAACDGNhbGN1bGF0ZWRVVgUKBAAAAwlzcGVjQ29sb3IFCwQAAAQIZnJhZ21lbnQOBgAAAQEEAAAFAQaBAgMFCwoJAyEOAgIBCgICBQoFDJIABQsFCwA";
h3d_shader_Texture.SRC = "HXSLEmgzZC5zaGFkZXIuVGV4dHVyZQsBBWlucHV0DQEBAgJ1dgUKAQEAAQAAAwhhZGRpdGl2ZQICAAEAAAAAAAQJa2lsbEFscGhhAgIAAQAAAAAABQ1zcGVjdWxhckFscGhhAgIAAQAAAAAABhJraWxsQWxwaGFUaHJlc2hvbGQDAgABBwAAAAAAAAAAAAAAAAAA8D8HB3RleHR1cmUKAgAACAxjYWxjdWxhdGVkVVYFCgQAAAkKcGl4ZWxDb2xvcgUMBAAACglzcGVjQ29sb3IFCwQAAAsGdmVydGV4DgYAAAwIZnJhZ21lbnQOBgAAAgALAAAFAQYEAggFCgICBQoFCgABDAAABQQIDQFjBQwEAAAJAyEOAgIHCgIIBQoFDAALBg4CBAIGCQYDCgINBQwMAAMCBgMDAQMAAAAAAAAAAAMCAgwAAAALAgMCBoACCQUMAg0FDAUMBoECCQUMAg0FDAUMAAsCBQIGgQIKBQsKAg0FDP4ABQsFCwAAAA";
h3d_shader_UVDelta.SRC = "HXSLEmgzZC5zaGFkZXIuVVZEZWx0YQQBB3V2RGVsdGEFCgIAAAIHdXZTY2FsZQUKAgAAAwxjYWxjdWxhdGVkVVYFCgQAAAQGdmVydGV4DgYAAAEABAAABQEGBAIDBQoGAAYBAgMFCgICBQoFCgIBBQoFCgUKAA";
h3d_shader_VertexColorAlpha.SRC = "HXSLG2gzZC5zaGFkZXIuVmVydGV4Q29sb3JBbHBoYQQBBWlucHV0DQEBAgVjb2xvcgUMAQEAAQAAAwpwaXhlbENvbG9yBQwEAAAECGFkZGl0aXZlAgIAAQAAAAAABQhmcmFnbWVudA4GAAABAQUAAAUBCwIEAgaAAgMFDAICBQwFDAaBAgMFDAICBQwFDAAA";
h3d_shader_VolumeDecal.SRC = "HXSLFmgzZC5zaGFkZXIuVm9sdW1lRGVjYWwYAQZjYW1lcmENAQoCBHZpZXcHAAEAAwRwcm9qBwABAAQIcG9zaXRpb24FCwABAAUIcHJvakZsaXADAAEABghwcm9qRGlhZwULAAEABwh2aWV3UHJvagcAAQAID2ludmVyc2VWaWV3UHJvagcAAQAJBXpOZWFyAwABAAoEekZhcgMAAQALA2RpcgULAwEAAAAADAZnbG9iYWwNAgQNBHRpbWUDAAwADglwaXhlbFNpemUFCgAMAA8JbW9kZWxWaWV3BwAMAQMQEG1vZGVsVmlld0ludmVyc2UHAAwBAwAAABEFaW5wdXQNAwISCHBvc2l0aW9uBQsBEQATBm5vcm1hbAULAREAAQAAFAZvdXRwdXQNBAUVCHBvc2l0aW9uBQwEFAAWBWNvbG9yBQwEFAAXBWRlcHRoAwQUABgGbm9ybWFsBQsEFAAZCXdvcmxkRGlzdAMEFAAEAAAaEHJlbGF0aXZlUG9zaXRpb24FCwQAABsTdHJhbnNmb3JtZWRQb3NpdGlvbgULBAAAHBhwaXhlbFRyYW5zZm9ybWVkUG9zaXRpb24FCwQAAB0RdHJhbnNmb3JtZWROb3JtYWwFCwQAAB4RcHJvamVjdGVkUG9zaXRpb24FDAQAAB8KcGl4ZWxDb2xvcgUMBAAAIAVkZXB0aAMEAAAhCHNjcmVlblVWBQoEAAAiCXNwZWNQb3dlcgMEAAAjCXNwZWNDb2xvcgULBAAAJAl3b3JsZERpc3QDBAAAJQhkZXB0aE1hcBEBAAAAJgVzY2FsZQUKAgAAJwZub3JtYWwFCwIAACgHdGFuZ2VudAULAgAAKQppc0NlbnRlcmVkAgIAAQAAAAAAKgxjYWxjdWxhdGVkVVYFCgQAACsSdHJhbnNmb3JtZWRUYW5nZW50BQwEAAAsDl9faW5pdF9fdmVydGV4DgYAAC0IZnJhZ21lbnQOBgAAAgIsAAAFAgYEAh0FCwkDHw4BBAYBAicFCwkDMg4BAg8HBgULBQsFCwULBgQCKwUMCQMqDgIJAx8OAQQGAQIoBQsJAzIOAQIPBwYFCwULBQsBAwAAAAAAAPA/AwUMBQwAAS0AAAUJCC4GbWF0cml4BwQAAAYBAggHAhAHBwAILwlzY3JlZW5Qb3MFCgQAAAYCCgIeBQwRAAUKCgIeBQwMAAMFCgAIMANydXYFDAQAAAkDKg4DAi8FCgkDPw4CAiURAQkDOg4BAi8FCgUKAwEDAAAAAAAA8D8DBQwACDEEd3BvcwUMBAAABgECMAUMAi4HBQwACDIEcHBvcwUMBAAABgECMAUMAggHBQwABgQCHAULBgIKAjIFDJIABQsKAjIFDAwAAwULBQsGBAIqBQoGAQImBQoEBgIKAjEFDBEABQoKAjEFDAwAAwUKBQoFCgUKCwIpAgaAAioFCgEDAAAAAAAA4D8DBQoAAAsGCQkDFQ4CCQMVDgIKAioFCgAAAwoCKgUKBAADAwkDFQ4CBgMBAwAAAAAAAPA/AwoCKgUKAAADAwYDAQMAAAAAAADwPwMKAioFCgQAAwMDAwEDAAAAAAAAAAADAgwAAAAA";
haxe_EntryPoint.pending = [];
haxe_EntryPoint.threadCount = 0;
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_io_FPHelper.helper = new DataView(new ArrayBuffer(8));
hxd_Key.initDone = false;
hxd_Key.keyPressed = [];
hxd_Key.ALLOW_KEY_REPEAT = false;
hxd_Timer.wantedFPS = 60.;
hxd_Timer.maxDeltaTime = 0.5;
hxd_Timer.smoothFactor = 0.95;
hxd_Timer.lastTimeStamp = HxOverrides.now() / 1000;
hxd_Timer.elapsedTime = 0.;
hxd_Timer.frameCount = 0;
hxd_Timer.dt = 1 / hxd_Timer.wantedFPS;
hxd_Timer.currentDT = 1 / hxd_Timer.wantedFPS;
hxd_System.setCursor = hxd_System.setNativeCursor;
hxd_System.loopInit = false;
hxd_System.fpsLimit = -1;
hxsl_Tools.UID = 0;
hxsl_Tools.SWIZ = hxsl_Component.__empty_constructs__.slice();
hxsl_Tools.MAX_CHANNELS_BITS = 3;
hxsl_BatchShader.SRC = "HXSLEGh4c2wuQmF0Y2hTaGFkZXICAQtCYXRjaF9Db3VudAECAAEAAAABAAIMQmF0Y2hfQnVmZmVyEAUMAQIAAAA";
hxsl_GlslOut.KWD_LIST = ["input","output","discard","dvec2","dvec3","dvec4","hvec2","hvec3","hvec4","fvec2","fvec3","fvec4","int","float","bool","long","short","double","half","fixed","unsigned","superp","lowp","mediump","highp","precision","invariant","discard","struct","asm","union","template","this","packed","goto","sizeof","namespace","noline","volatile","external","flat","input","output","out","attribute","const","uniform","varying","inout","void"];
hxsl_GlslOut.KWDS = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var _g1 = 0;
		var _g2 = hxsl_GlslOut.KWD_LIST;
		while(_g1 < _g2.length) {
			var k = _g2[_g1];
			++_g1;
			_g.h[k] = true;
		}
	}
	$r = _g;
	return $r;
}(this));
hxsl_GlslOut.GLOBALS = (function($this) {
	var $r;
	var m = new haxe_ds_EnumValueMap();
	{
		var _g = 0;
		var _g1 = hxsl_TGlobal.__empty_constructs__.slice();
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			var n = "" + Std.string(g);
			n = n.charAt(0).toLowerCase() + HxOverrides.substr(n,1,null);
			m.set(g,n);
		}
	}
	m.set(hxsl_TGlobal.ToInt,"int");
	m.set(hxsl_TGlobal.ToFloat,"float");
	m.set(hxsl_TGlobal.ToBool,"bool");
	m.set(hxsl_TGlobal.LReflect,"reflect");
	m.set(hxsl_TGlobal.Mat3x4,"_mat3x4");
	m.set(hxsl_TGlobal.VertexID,"gl_VertexID");
	m.set(hxsl_TGlobal.InstanceID,"gl_InstanceID");
	m.set(hxsl_TGlobal.IVec2,"ivec2");
	m.set(hxsl_TGlobal.IVec3,"ivec3");
	m.set(hxsl_TGlobal.IVec4,"ivec4");
	m.set(hxsl_TGlobal.BVec2,"bvec2");
	m.set(hxsl_TGlobal.BVec3,"bvec3");
	m.set(hxsl_TGlobal.BVec4,"bvec4");
	m.set(hxsl_TGlobal.FragCoord,"gl_FragCoord");
	m.set(hxsl_TGlobal.FrontFacing,"gl_FrontFacing");
	{
		var g = m.iterator();
		while(g.hasNext()) {
			var g1 = g.next();
			hxsl_GlslOut.KWDS.h[g1] = true;
		}
	}
	$r = m;
	return $r;
}(this));
hxsl_GlslOut.MAT34 = "struct _mat3x4 { vec4 a; vec4 b; vec4 c; };";
hxsl__$Linker_ShaderInfos.UID = 0;
hxsl_Printer.SWIZ = ["x","y","z","w"];
hxsl_RuntimeShader.UID = 0;
hxsl_Serializer.TVECS = new haxe_ds_IntMap();
hxsl_Serializer.BOPS = (function($this) {
	var $r;
	var ops = haxe_macro_Binop.__empty_constructs__.slice();
	ops.splice(haxe_macro_Binop.OpAssignOp(null)._hx_index,0,null);
	$r = ops;
	return $r;
}(this));
hxsl_Serializer.UNOPS = haxe_macro_Unop.__empty_constructs__.slice();
hxsl_Serializer.TGLOBALS = hxsl_TGlobal.__empty_constructs__.slice();
hxsl_Serializer.TSWIZ = new haxe_ds_IntMap();
hxsl_Serializer.REGS = [hxsl_Component.X,hxsl_Component.Y,hxsl_Component.Z,hxsl_Component.W];
hxsl_Serializer.VKINDS = hxsl_VarKind.__empty_constructs__.slice();
hxsl_Serializer.PRECS = hxsl_Prec.__empty_constructs__.slice();
hxsl_Serializer.FKIND = hxsl_FunctionKind.__empty_constructs__.slice();
hxsl_Serializer.SIGN = 9139229;
hxsl_SharedShader.UNROLL_LOOPS = false;
{
	Boot.main();
	haxe_EntryPoint.run();
}
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
