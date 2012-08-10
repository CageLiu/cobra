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
				constructor : __$__.event.init,

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
			var e = e || window.event;
			e.target = e.target || e.srcElement;
			e.from = e.relatedTarget || e.fromElement;
			e.to = e.relatedTarget || e.toElement;
			return e;
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
			while(offsetParent && __$__.css(offsetParent,"position") === "static"){
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

		position : function(ele){
			var offsetParent = ele.offsetParent || body;
			var left = ele.offsetLeft;
			var top = ele.offsetTop;
			while(offsetParent){
				left += offsetParent.offsetLeft;
				top += offsetParent.offsetTop;
				offsetParent = offsetParent.offsetParent;
			}
			return {
				left : left,
				top : top
			};
		},

		children : function(ele){
			var nodeList = [];
			var temp = ele.childNodes;
			var len = temp.length;
			while(len--){
				var o = temp[len];
				o.nodeType === 1 && nodeList.unshift(o);
			}
			return nodeList;
		},

		first : function(ele){
					
		},

		last : function(ele){
			   
		},

		siblings : function(ele){
				   
		},

		ajax : function(options){
		   function createXHR(){
			   if (window.XMLHttpRequest) {
				   return new XMLHttpRequest();
			   }
			   if (window.ActiveXObject) {
				   var msxmls = ['MSXML3', 'MSXML2', 'Microsoft']
					   for (var i=0; i < msxmls.length; i++) {
						   try {
							   return new ActiveXObject(msxmls[i]+'.XMLHTTP')
						   } catch (e) { }
					   }
				   throw new Error("No XML component installed!")
			   }
		   };		   
			this.ajax.init = function(options){
				this.request = createXHR();
				(function(options){
					var request = this.request;
					var url = this.url = options["url"] + "&r=" + (+new Date());
					var success = this.success = options["success"];
					var error = this.error = options["error"];
					var loop = this.loop = options["loop"];
					var interval = this.interval = options["interval"];

					request.onreadystatechange = function(){
						(function(){
							if(this.readyState === 4){
								if(this.status === 200){
									success && (success(this.responseText));
								}else if(this.status !== 200){
									error && (error(this.responseText));
								}
							}
						}).call(request);
					};
					request.open("GET",url,true);
					request.send(null);
				}.call(this,options));
			};
			return new this.ajax.init(options);
		},

		cookie : function(){
			return {
				get : function(name){
					var cookieName = encodeURIComponent(name) + "=";
					var cookieStart = document.cookie.indexOf(cookieName);
					var cookieValue = null;

					if(cookieStart > -1){
						var cookieEnd = document.cookie.indexOf(";",cookieStart);
						if(cookieEnd === -1){
							cookieEnd = document.cookie.length;
						}
						cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
					}
					return cookieValue;
				},

				set : function(options){
					  var cookieText = encodeURIComponent(options.name) + "=" + encodeURIComponent(options.value);
					  if(options.expirse instanceof Date){
					  	cookieText += "; expirse=" + options.expirse.toGMTString();
					  }
					  if(options.path){
					  	cookieText += "; path=" + options.path;
					  }
					  if(options.domain){
					  	cookieText += "; domain=" + options.domain;
					  }
					  if(options.secure){
					  	cookieText += "; secure";
					  }
					  document.cookie = cookieText;
				},
				
				del : function(options){
					options.value = "";
					options.expirse = new Date(0);
					this.set(options);
				}
			};	 
		}
	};

	window.__$__ = cobra;
}(window));
