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
		}
	};

	window.$ = window.cobra = cobra;
}(window));
