(function(){
	cobra = {
		addEvent : function(ele,type,fn){
			if(document.addEventListener){
				this.addEvent = function(ele,type,fn){
					ele.addEventListener(type,fn,false);
				};
			}else if(document.attachEvent){
				this.addEvent = function(ele,type,fn){
					//var self = arguments.callee;
					//!self.count && (self.count = 0);
					//typeof(fn._id) === "undefined" && (fn._id = self.count++);
					typeof(fn._id) === "undefined" && (fn._id = (+new Date()));
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
			var e  = e || window.event;
			e.target = e.target || e.srcElement;
			e.from = e.relatedTarget || e.fromElement;
			e.to = e.relatedTarget || e.toElement;
			return e;
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
			var target = ele.firstChild;
			while(target !== null && target.nodeType !== 1){
				target = this.next(target);
			}
			return target;
		},

		last : function(ele){
			var target = ele.lastChild;
			while(target !== null && target.nodeType !== 1){
				target = this.prev(target);
			}
			return target;
		},

		next : function(ele){
			var target = ele.nextSibling;
			while(target !== null && target.nodeType !== 1){
				target = target.nextSibling;
			}
			return target;
		},

		prev : function(ele){
			var target = ele.previousSibling;
			while(target !== null && target.nodeType !== 1){
				target = target.previousSibling;
			}
			return target;
		},

		siblings : function(ele){
			var childrens = this.children(ele.parentNode);
			var tmp = [];
			for(var i = 0; i < childrens.length; i++){
				childrens[i] !== ele && (tmp.push(childrens[i]));
			}
			return tmp;
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
					var url = this.url = options["url"];
					var success = this.success = options["success"];
					var error = this.error = options["error"];
					var loop = this.loop = options["loop"];
					var interval = this.interval = options["interval"];
					var context = this.context = options["context"] || window;

					!options["cache"] && (url = this.url = options["url"] + "&r=" + (+new Date()));

					request.onreadystatechange = function(){
						(function(){
							if(this.readyState === 4){
								if(this.status === 200){
									success && (success.call(context,this.responseText));
								}else if(this.status !== 200){
									error && (error.call(context,this.responseText));
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

		form : function(id, options, callback){
			var oForm = typeof(id) === "string" ? document.getElementById(id) : id;
			
			this.form.init = function(id, options, fn){
				var instance = this;
				var form = oForm;

				//instance.verified = false;

			 	for(var i = 0; i < options.length; i++){
					var name = options[i].name;
					this[name] = {};
					this[name][name] = name;
					this[name].type = options[i].type;
					this[name].reg = options[i].reg;
					this[name].min_length = options[i].min_length;
					this[name].max_length = options[i].max_length;
					this[name].message = options[i].message;
					this[name].success = options[i].success || callback["success"];
					this[name].error = options[i].error || callback["error"];
					this[name].ajax = options[i].ajax;

					var item =form[name];

					$.addEvent(item,this[name].type,function(){
						var name = this.name;
						var item = instance[name];
						var min_length = item.min_length;
						var max_length = item.max_length;
						var reg = item.reg;
						var ajax = item.ajax;
						var success = item.success;
						var error = item.error;
						var value = this.value;
						var r = new RegExp("\\?" + name + "=.*","g");

						if(min_length && max_length && min_length < max_length){
							if(value.length < min_length || value > max_length){
								item.message = "长度必须位于" + min_length + " ~ " + max_length + "之间";
								item.verified = false;
								error.call(this,item.message);
								return false;
							}
						}else if(min_length){
							if(value.length < min_length){
								item.message = "长度至少为" + min_length;
								item.verified = false;
								error.call(this,item.message);
								return false;
							}
						}else if(max_length){
							if(value.length > max_length){
								item.message = "长度必须小于" + max_length;
								item.verified = false;
								error.call(this,item.message);
								return false;
							}
						}
						if(reg && !reg.test(value)){
							item.message = "格式不符合要求";
							item.verified = false;
							error.call(this,item.message);
							return false;
						}
						if(ajax){
							item.verified = false;
							ajax.url = ajax.url.replace(r,"") + "?" + name + "=" + encodeURIComponent(value);
							$.ajax(ajax);
						}
						item.message = "正确的输入";
						success.call(this,item.message);
						item.verified = true;
					});
				}
			};

			var f = new this.form.init(id, options,callback);
			oForm.verified = f;
			this.addEvent(oForm,"submit",function(e){
				var e = $.getEvent(e);
				var verified = true;
				for(var i in this.verified){
					if(!this.verified[i].verified){
						verified = false;
						this.verified[i].error.call(this[i],this.verified[i].message);
					}
				}
				if(verified){
					return true;
				}else{
					$.preventDefault(e);
					return false;
				}
			});
			return f;
		}


		/* instance */

		/*
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
				$.addEvent(document,"click",$.bind(this.action,this));
				$.mouseWheel(document,$.bind(this.action,this));
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

						case "click":
							if(target === this.drag.parentNode){
								t = e.clientY - $.position(this.drag.parentNode).top - this.drag.offsetHeight / 2;
								if(this.limit){
									if(t < this.rectT){
										t = this.rectT;
									}else if(t > this.rectB - this.drag.offsetHeight){
										t = this.rectB - this.drag.offsetHeight;
									}
								}
								this.drag.style.top = t + "px";
								this.interface.fire({
									type : "click",
									target : this.drag.parentNode,
									x : e.clientX,
									y : e.clientY
								});
							}
							break;

						default :
							var t = $.offset(this.drag).top - e * 40;
							if(this.limit){
								if(t < this.rectT){
									t = this.rectT;
								}else if(t > this.rectB - this.drag.offsetHeight){
									t = this.rectB - this.drag.offsetHeight;
								}
							}
							this.drag.style.top = t + "px";
							this.interface.fire({
								type : "mousewheel",
								target : this.handler,
								delta : e * 12
							});
							break;
					}
				}
			};
			return new this.DragDrop.init(options);
		},

		scroll : function(options){
			this.scroll.init = function(options){
				var body = this.body = options.body;
				var slider = this.slider = $.DragDrop(options.drag);
				this.bodyHeight = body.offsetHeight;
				this.sHeight = slider.drag.parentNode.offsetHeight;
				if(this.bodyHeight < this.sHeight){
					slider.drag.style.height = "100%";
				}else{
					slider.drag.style.height = ((this.sHeight * 2 - this.bodyHeight < 30) ? 30 : (this.sHeight * 2 - this.bodyHeight)) + "px";
				}

				function moveBody(e){
					var t = -(parseInt(slider.drag.style.top));
					if(this.sHeight - slider.drag.offsetHeight){
						body.style.marginTop = t * (this.bodyHeight - this.sHeight) / (this.sHeight - slider.drag.offsetHeight) + "px";
					}else{
						body.style.marginTop = 0;
					}
				}
				slider.interface.addHandler("doDrag",$.bind(moveBody,this));
				slider.interface.addHandler("doDrag",$.bind(function(){
					this.slider.drag.style.backgroundColor = "#3B5998";
				},this));
				slider.interface.addHandler("mousewheel",$.bind(moveBody,this));
				slider.interface.addHandler("click",$.bind(moveBody,this));
				slider.interface.addHandler("stopDrag",$.bind(function(){
					this.slider.drag.style.backgroundColor = "#555";
				},this));

				function resize(){
					var body = this.body;
					var slider = this.slider;
					var oldH = slider.drag.offsetHeight;
					var present = slider.drag.parentNode.offsetHeight / this.sHeight;
					var bodyHeight = this.bodyHeight = body.offsetHeight;
					var clientHeight = this.sHeight = slider.drag.parentNode.offsetHeight;
					var t = 0;
					if(bodyHeight < clientHeight){
						slider.drag.style.height = "100%";
					}else{
						slider.drag.style.height = ((clientHeight * 2 - bodyHeight < 30) ? 30 : (clientHeight * 2 - bodyHeight)) + "px";
					}
					if(slider.limit){
						if(slider.limit === slider.offsetParent){
							var width = slider.limit.offsetWidth;
							var height = slider.limit.offsetHeight;
							slider.rectT = 0;
							slider.rectL = 0;
						}else{
							var offset = $.offset(slider.offsetParent);
							slider.rectT = $.offset(slider.limit).top - offset.top;
							slider.rectL = $.offset(slider.limit).left - offset.left;
						}
						slider.rectB = slider.rectT + slider.limit.offsetHeight;
						slider.rectR = slider.rectL + slider.limit.offsetWidth;
					}
					t = (slider.drag.offsetHeight == clientHeight) ? 0 : (parseInt(slider.drag.style.top) * present);
					slider.drag.style.top = t + "px";
					body.style.marginTop = t ? (-t * (bodyHeight - clientHeight) / (clientHeight - slider.drag.offsetHeight) + "px") : 0; 
				};

				$.addEvent(window,"resize",$.bind(function(){
					$.throttle(resize,this,200);
				},this));
			};
			return new this.scroll.init(options);
		}
	*/

	};

	window.__$__ = {};
	window.$ = window.cobra = cobra;
}(window));

$.ready(function(){
	var oLayout = document.getElementById("J_layout_html");
	var oHd = document.getElementById("J_hd");
	var oFt = document.getElementById("J_ft");
	var oDhtml = document.documentElement;
	var J_static_box = document.getElementById("J_static_box");
	if(oDhtml.clientWidth <= 1000){
		oLayout.style.width = "1000px";
		oHd.style.width = "1000px";
		oFt.style.width = "1000px";
		oDhtml.style.overflowX = "scroll";
	}
	/*
	var oLayoutHtml = $.scroll({
		body : document.getElementById("J_layout_body"),
		drag : {
			drag : document.getElementById("J_layout_slider"),
			limit : document.getElementById("J_layout_scroll")
		}
	});
	*/

	function resize(){
		var oLayout = document.getElementById("J_layout_html");
		var oDhtml = document.documentElement;
		if(!oLayout){return false;}
		if(oDhtml.clientWidth <= 1000){
			oLayout.style.width = "1000px";
			oHd.style.width = "1000px";
			oFt.style.width = "1000px";
			oDhtml.style.overflowX = "scroll";
		}else{
			oLayout.style.width = "100%";
			oHd.style.width = "100%";
			oFt.style.width = "100%";
			oDhtml.style.overflowX = "hidden";
		}
	}
	$.addEvent(window,"resize",function(){
		$.throttle(resize);
	});


	$.addEvent(document,"click",function(e){
		var e = $.getEvent(e);
		var target = e.target;
		var url = "";
		var oBox = document.getElementById("J_static_box");
		var oPsdBox = document.getElementById("J_batch_psd_box")
		if(target.className === "cobra_system_flag"){
			fold(target)
		}else if(target.id === "J_get_static_list"){
			oPsdBox.style.display = "none";
			url ="/getree/?dir=" +  target.getAttribute("data") + "&url=/s/static/&tid=J_static_dir";
			oBox.innerHTML = "";
			oBox.className += " loading";
			$.ajax({
				url : url,
				success : function(data){
					target.innerHTML = "刷新";
					oBox.className = oBox.className.replace(/\sloading/g,"");
					oBox.innerHTML = data;
				},
				error : function(data){
					oBox.className = oBox.className.replace(/\sloading/g,"");
					oBox.innerHTML = data;
				}
			});
		}else if(target.id === "J_batch_psd"){
			oPsdBox.style.display = "block";
			if(!oPsdBox.ready){
				$.addEvent(oPsdBox,"click",function(e){
					var e = $.getEvent(e);
					var target = e.target;
					var oMsgBox = document.getElementById("J_batch_msg");
					var oPrefix = document.getElementById("J_batch_psd_prefix");
					var oPsdTips = document.getElementById("J_batch_tips");
					var list = [];
					var dir = target.getAttribute("data");
					var prefix = oPrefix.value;
					if(target.id === "J_batch_psd_btn" && !target.handling){
						target.handling = true;
						oPrefix.style.cssText = "background-color:#ddd;width:48px;text-align:center;";
						oPrefix.setAttribute("readonly","readonly");
						target.innerHTML = "正在处理";
						oPsdTips.innerHTML = "正在获取文件列表…";
						oPsdTips.style.display = "inline";
						oMsgBox.innerHTML = "";
						function revert(){
							target.innerHTML = "开始处理";
							oPsdTips.innerHTML = "";
							oPsdTips.style.display = "none";
							target.handling = false;
						}
						$.ajax({
							url : "/tools/getfile/?path=" + dir,
							success: function(result){
								if(result.length === 0){
									oMsgBox.innerHTML = "<p>没有发现 psd 文件！</p>";
									revert();
								}else{
									list = result.split(",");
									function batch(l,fn){
										var count = l.length;
										var len = count;
										if(!count){
											return fn();
										}
										for(var i = 0; i < len; i++){
											$.ajax({
												url : "/tools/batchpsd/?path=" + dir + "/&prefix=" + prefix + "&name=" + encodeURIComponent(list[i]),
												success : function(data){
													var oP = document.createElement("p");
													oP.innerHTML = decodeURIComponent(data);
													oMsgBox.appendChild(oP);
													oMsgBox.scrollTop = oMsgBox.scrollHeight;
													oPsdTips.innerHTML = "正在重命名和导出jpg…";
													count--;
													!count && fn();
												}
											});
										}
									}
									batch(list,function(){
										revert();
									});
								}
							}
						});
					}
					$.stopPropagation(e);
				});
				oPsdBox.ready = true;
			}
		}else{
			oPsdBox && (oPsdBox.style.display = "none");
		}
	});

	if(J_static_box !== null){
		$.addEvent(J_static_box,"click",function(e){
			var e = $.getEvent(e);
			var target = e.target;
			if(target.parentNode.className === "cobra_system_dir_name"){
				fold(target);
				$.preventDefault(e);
				$.stopPropagation(e);
			}
		});
	}

	function fold(target){
		var oPs = target.parentNode.parentNode;
		var oPsClassName = oPs.className;
		if(oPsClassName.indexOf(" close") !== -1){
			oPs.className = oPsClassName.replace(/\sclose/g,"");
		}else{
			oPs.className += " close";
		}
	}

	var Degree = function(){
		function init(){
			this.instance = $.event();
			this.doing = null;
			this.first = null;
			this.last = null;
			this.rel = null;
			this.initial = "";
			this.persent = 0;
			this.offsetleft = 0;

			$.addEvent(document,"mousedown",$.bind(this.action,this));
			$.addEvent(document,"mousemove",$.bind(this.action,this));
			$.addEvent(document,"mouseup",$.bind(this.action,this));
		}

		init.prototype = {
			constructor : Degree,
			action : function(e){
				var e = $.getEvent(e);
				var target = e.target;
				switch(e.type){
					case "mousedown":
						if(e.button == 2){return false;}
						if(target && target.className === "degreebar"){
							this.doing = target;
						}else if(target.parentNode && target.parentNode.className === "degreebar"){
							this.doing = target.parentNode;
						}else{
							return false;
						}
						this.rel = this.doing.getAttribute("rel");
						if(this.rel === null){
							this.doing = null;
							return false;
						}else{
							this.offsetleft = $.offset(this.doing).left;
							this.doing.width = this.doing.offsetWidth;
							this.first = $.first(this.doing);
							this.last = $.last(this.doing);
							this.initial = this.last.innerHTML;
							this.instance.fire({
								type : "start",
								x : e.clientX,
								y : e.clientY
							});
						}
						$.preventDefault(e);
						break;

					case "mousemove":
						if(this.doing){
							var persent = parseInt(((e.clientX - this.offsetleft) / this.doing.width) * 100) - 1;
							persent > 100 && (persent = 100);
							persent < 0 && (persent = 0);
							this.persent = persent;
							persent += "%";
							this.first.style.width = persent;
							this.first.innerHTML = persent;
							this.last.innerHTML = persent;
							$.preventDefault(e);
							this.instance.fire({
								type : "doing",
								x : e.clientX,
								y : e.clientY
							});
						}
						break;

					case "mouseup":
						if(this.doing){
							this.doing = null;
							var url = this.rel + "?d=" + this.persent;
							var _this = this;
							if(confirm("确定要更新进度？")){
								$.ajax({
									url : url,
									context : _this,
									success : function(data){
										if(!(data * 1)){
											this.first.innerHTML = this.initial;
											this.first.style.width = this.initial;
											this.last.innerHTML = this.initial;
											alert("更新失败!");
										}
									}
								});
							}else{
								this.first.innerHTML = this.initial;
								this.first.style.width = this.initial;
								this.last.innerHTML = this.initial;
							}
						}
						break;
				}
			}
		}
		return new init();
	}

	var oD = Degree();
});
