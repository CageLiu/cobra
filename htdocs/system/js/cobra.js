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
		}

	};

	window.$ = window.cobra = cobra;
}(window));

/*
 *a = $.event();
 *function fn(e){
 *    alert(e.dis);
 *}
 *a.addHandler("abc",fn);
 *a.fire({
 *    type : "abc",
 *    dis : "asodoo"
 *})
 */
