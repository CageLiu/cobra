(function(){
	cobra = {
		addEvent : function(ele,type,fn){
			if(document.addEventListener){
				this.addEvent = function(ele,type,fn){
					ele.addEventListener(type,fn,false);
				};
			}else if(document.attachEvent){
				this.addEvent = function(ele,type,fn){
					var self = arguments.callee;
					!self.count && (self.count = 0);
					typeof(fn._id) === "undefined" && (fn._id = self.count++);
					!ele.events && (ele.events = {})
					!ele.events[type] && (ele.events[type] = {});
					ele.events[type][fn._id] = fn;
					ele["on" + type] = function(){
						for(var i in this.events[type]){
							this.events[type][i].call(this);
						}
					}
				};
			}
			return this.addEvent(ele,type,fn);
		},

		delEvent : function(ele,type,fn){
			if(document.removeEventListener){
				this.delEvent = function(ele,type,fn){
					ele.removeEventListener(type,fn,false);
				}
			}else if(document.detachEvent){
				this.delEvent = function(ele,type,fn){
					(ele.events && ele.events[type]) && (delete ele.events[type][fn._id]);
				}
			}
			return this.delEvent(ele,type,fn);
		},

		bind : function(fn,context){
			var outerArgs = [].slice.call(arguments,2);
			return function(){
				var innerArgs = [].slice.call(arguments);
				var finalArgs = innerArgs.concat(outerArgs);
				return fn.apply(context,finalArgs);
			};
		},

		throttle : function(fn,context,time){
			time = time || 100;
			clearTimeout(fn.tId);
			fn.tId = setTimeout(function(){
				fn.call(context);
			},time);
		},

		event : function(){
			this.event.init = function(){
				this.handlers = {};
			};

			this.event.init.prototype = {
				constructor : $.event.init,

				addHandler : function(type,fn){
					var handlers = this.handlers;
					typeof handlers[type] === "undefined" && (handlers[type] = []);
					handlers[type].push(fn);
				},

				fire : function(e){
					!e.target && (e.target = this);
					if(this.handlers[e.type] instanceof Array){
						var list = this.handlers[e.type];
						for(var i = 0, len = list.length; i < len; i++){
							list[i].call(this,e);
						}
					}
				},

				delHandler : function(type,fn){
					var handlers = this.handlers;			 
					if(handlers[type] instanceof Array){
						var list = handlers[type];
						for(var i = 0, len = list.length; i < len; i++){
							if(list[i] === fn){
								break;
							}
						}
						list.splice(i,1);
					}
				}
			};
			return new this.event.init();
		},

		ready : function(fn){
			this.addEvent(window,"load",fn);
		},

		mouseWheel : function(ele,fn){
			var roll = function(){
				var delta = 0;
				e = arguments[0] || window.event;
				delta = (e.wheelDelta) ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
				fn(delta);
			};			 
			this.addEvent(ele,"mousewheel",roll);
			this.addEvent(ele,"DOMMouseScroll",roll);
		},

		getEvent : function(e){
			return e || window.event;
		},

		getTarget : function(e){
			e = this.getEvent(e);
			return e.target || e.srcElement;
		},

		stopPropagation : function(e){
			e = this.getEvent(e);
			e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
			return false;
		},

		preventDefault : function(e){
			e = this.getEvent(e);
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			return false;
		},

		css : function(ele){
			var cssText = "";
			if(arguments.length === 2){
				if(typeof arguments[1] === "string"){
					return ele.currentStyle ? ele.currentStyle[arguments[1]] : getComputedStyle(ele,null)[arguments[1]];
				}else if(typeof arguments[1] === "object"){
					for(var i in arguments[1]){
						cssText += i + ":" + arguments[1][i];
						ele.style.cssText = cssText;
					}
				}
			}else if(arguments.length === 3 && typeof arguments[1] === "string" && typeof arguments[2] === "string"){
				cssText = arguments[1] + ":" + arguments[2];
				ele.style.cssText = cssText;
			}
		},

		offset : function(ele){
			var offsetParent = ele.offsetParent;
			var left = ele.offsetLeft;
			var top = ele.offsetTop;
			while(offsetParent && $.css(offsetParent,"position") === "static"){
				offsetParent = offsetParent.offsetParent;
				left += offsetParent.offsetLeft;
				top += offsetParent.offsetTop;
			};
			return {
				parent : offsetParent || document.body,
				left : left,
				top : top
			};
		},









		/* instance */

		DragDrop : function(options){
			this.DragDrop.init = function(options){
				this.interface = $.event();
				this.drag      = document;
				this.lockX     = false;
				this.lockY     = false;
				this.draging   = false;
				this.limit     = null;
				this.disX = this.disY = 0;
				for(var item in options){
					options.hasOwnProperty(item) && (this[item] = options[item]);
				}
				this.handler   = this.drag;
				this.offsetParent = $.offset(this.drag).parent;
				if(this.limit){
					if(this.limit === this.offsetParent){
						var width = this.limit.offsetWidth;
						var height = this.limit.offsetHeight;
						this.rectT = 0;
						this.rectL = 0;
					}else{
						var offset = $.offset(this.offsetParent);
						this.rectT = $.offset(this.limit).top - offset.top;
						this.rectL = $.offset(this.limit).left - offset.left;
					}
					this.rectB = this.rectT + this.limit.offsetHeight;
					this.rectR = this.rectL + this.limit.offsetWidth;
					this.drag.style.cssText = "left:" + this.rectL + "px;top:" + this.rectT + "px";
				}


				$.addEvent(document,"mousedown",$.bind(this.action,this));
				$.addEvent(document,"mousemove",$.bind(this.action,this));
				$.addEvent(document,"mouseup",$.bind(this.action,this));
			};

			this.DragDrop.init.prototype = {
				constructor : $.DragDrop.init,
				
				action : function(e){
					var e = $.getEvent(e);
					var target = $.getTarget(e);
					
					switch(e.type){
						case "mousedown":
							if(target === this.handler){
								var offset = $.offset(this.drag);
								this.draging = true;
								this.disX = e.clientX - offset.left;
								this.disY = e.clientY - offset.top;
								this.interface.fire({
									type   : "startDrag",
									target : this.handler,
									x      : e.clientX,
									y      : e.clientY
								});
								$.preventDefault(e);
							}
							break; 
						case "mousemove":
							if(this.draging){
								if(this.lockX && this.lockY){
									return false;
								}
								if(this.lockX){
									var t = e.clientY - this.disY;
									if(this.limit){
										if(t < this.rectT){
											t = this.rectT;
										}else if(t > this.rectB - this.drag.offsetHeight){
											t = this.rectB - this.drag.offsetHeight;
										}
									}
									this.drag.style.top = t + "px";
								}else if(this.lockY){
									var l = e.clientX - this.disX;
									if(this.limit){
										if(l < this.rectL){
											l = this.rectL;
										}else if(l > this.rectR - this.drag.offsetWidth){
											l = this.rectR - this.drag.offsetWidth;
										}
									}
									this.drag.style.left = l + "px";
								}else{
									var t = e.clientY - this.disY;
									var l = e.clientX - this.disX;
									if(this.limit){
										if(t < this.rectT){
											t = this.rectT;
										}else if(t > this.rectB - this.drag.offsetHeight){
											t = this.rectB - this.drag.offsetHeight;
										}
									}
									if(this.limit){
										if(l < this.rectL){
											l = this.rectL;
										}else if(l > this.rectR - this.drag.offsetWidth){
											l = this.rectR - this.drag.offsetWidth;
										}
									}
									this.drag.style.top = t + "px";
									this.drag.style.left = l + "px";
								}
								this.interface.fire({
									type   : "doDrag",
									target : this.handler,
									x      : e.clientX,
									y      : e.clientY
								});
								$.preventDefault(e);
							}
							break;

						case "mouseup":
							this.draging = false;
							this.interface.fire({
								type   : "stopDrag",
								target : this.handler,
								x      : e.clientX,
								y      : e.clientY
							});
							break;
					}
				}

			};

			return new this.DragDrop.init(options);
		}

	};

	window.$ = window.cobra = cobra;
}(window));

$.ready(function(){
	var a = $.DragDrop({
		drag : document.getElementById("J_layout_slider"),
		limit : document.getElementById("J_layout_scroll")
		//limit : document
		//lockY : true
		//lockX : true
	});
	a.interface.addHandler("startDrag",function(e){
		document.title = e.x + "||" + e.y;
	});
	//alert($.offsetParent(a.drag).nodeName);
	//alert(a.drag.offsetParent.id);
});
