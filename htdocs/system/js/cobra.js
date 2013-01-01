(function(){
	cobra = {
		extend : function(obj){
			for(var i = arguments.length; i-- - 1;){
				var o = arguments[i];
				for(var name in o){
					if(o.hasOwnProperty(name)){
						obj[name] = o[name];
					}
				}
			}
			return obj;
		},

		_ : function(id){
			return typeof id === "string" ? document.getElementById(id) : id;
		},

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
					typeof(fn._id) === "undefined" && (fn._id = (+new Date()) + Math.random());
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
			this.addEvent(ele,type,fn);
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

		contains : function(refNode, otherNode){
			if(refNode.contains){
				this.contains = function(refNode, otherNode){
					return refNode.contains(otherNode);
				}
			}else if(typeof refNode.compareDocumentPosition === "function"){
				this.contains = function(){
					return !!(refNode.compareDocumentPosition(otherNode) & 16);
				}
			}
			return this.contains(refNode, otherNode);
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

		addClass : function(ele, className){
			var cls = className.split(/\s+/);
			var oldCls = ele.className;
			var r = null;
			for(var i = cls.length; i--;){
				r = new RegExp("\\b" + cls[i] + "\\b");
				if(!r.test(oldCls)){
					oldCls = cls[i] + " " + oldCls ;
				}
			}
			ele.className = oldCls;
			return this;
		},

		removeClass : function(ele, className){
			var cls = className.split(/\s+/);
			var oldCls = ele.className;
			var r = null;
			for(var i = cls.length; i--;){
				r = new RegExp("\\b" + cls[i] + "\\b", "g");
				oldCls = oldCls.replace(r, "");
			}
			ele.className = oldCls;
			return this;
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
			var offsetParent = ele.offsetParent || document.body;
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
		},

		dialog : function(options){
			var _this = this;
			this.dialog.init = function(options){
				var instance = this;
				this.box = typeof(options.box) === "string" ? document.getElementById(options.box) : options.box;
				this.content = typeof(options.content) === "string" ? document.getElementById(options.content) : options.content;
				this.msg = this.content ? this.content.outerHTML : options.msg;
				this.type = options.type;
				this.time = options.time;
				this.auto = options.auto;
				this.timer = null;
	
				this.inner = document.createElement("div");
				this.inner.className = "message_inner";
				this.cbox = document.createElement("div");
				this.cbox.className = "message_content";
				this.btn = document.createElement("span");
				this.btn.innerHTML = "X";
				this.btn.className = "close_message";

				this.inner.appendChild(this.cbox);
				this.inner.appendChild(this.btn);

				this.box.appendChild(this.inner);
				this.auto && this.show();

				_this.addEvent(this.btn,"click",_this.bind(this.hide,this));
				(this.time && this.auto) && (this.timer = setTimeout(_this.bind(this.hide,this),this.time));
			};

			function opacity(ele,start,end){
				var timer = null;
				var speed = 0;
				var type;
				type = start < end ? true : false;
				(function(){
					speed += (end - start) / 100;
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					start += speed;
					ele.style.opacity = start / 100;
					ele.style.filter = "alpha(opacity=" + start + ")";
					if(type){
						if(start >= end){
							clearTimeout(timer);
						}else{
							timer = setTimeout(arguments.callee,30);
						}
					}else{
						if(start <= end){
							clearTimeout(timer);
						}else{
							timer = setTimeout(arguments.callee,30);
						}
					}
				}());
			}

			this.dialog.init.prototype = {
				constructor : _this.dialog,
				show : function(){
					clearTimeout(this.timer);
					this.inner.className = this.inner.className.replace(/\s\w+_message$/g,"") + " " + this.type;
					this.cbox.innerHTML = this.msg;
					opacity(this.inner,0,100);
					this.inner.style.display = "block";
					this.time && (this.timer = setTimeout(_this.bind(this.hide,this),this.time));
				},
				hide : function(){
					clearTimeout(this.timer);
					opacity(this.inner,100,0);
					this.inner.style.display = "none";
				}
			};

			return new this.dialog.init(options);
		},

		calendar : (function(){

			function getMonthDays(date){
				return new Date(new Date(date.getFullYear(), date.getMonth() + 1) - 1).getDate();
			}

			function dateFormat(year, month, day){
				month = ("" + month).length < 2 ? "0" + month : month;
				day = ("" + day).length < 2 ? "0" + day : day;
				return year + "-" + month + "-" + day;
			}

			function nearDate(date, interval){
				if(arguments.length < 2){
					throw new Error("参数错误");
				}
				return new Date(date.getFullYear(), date.getMonth() + interval);
			}

			function updateCalendar(date, items, selected){
				var nDayNumber;
				var dAdjacent = null;
				var len = items.length;
				var now = new Date();
				var startWeekDay = new Date(date.getFullYear(), date.getMonth()).getDay();
				for(var i = len; i--;){
					var o = items[i];
					if(i < startWeekDay){
						dAdjacent = nearDate(date, -1);
						nDayNumber = i + getMonthDays(dAdjacent) - startWeekDay + 1;
						o.className = o.className.replace(/\s*disabled/g, "") + " disabled";
					}else if(i < getMonthDays(date) + startWeekDay){
						nDayNumber = i - startWeekDay + 1;
						dAdjacent = date;
						o.className = o.className.replace(/\s*disabled|\s+today/g, "");
						if(dateFormat(now.getFullYear(), now.getMonth(), now.getDate()) === dateFormat(date.getFullYear(), date.getMonth(), nDayNumber)){
							o.className += " today";
						}
						if(dateFormat(date.getFullYear(), date.getMonth() + 1, nDayNumber) === selected){
							o.className += ' selected';
						}else{
							o.className = o.className.replace(/\s*selected/g, "");
						}
					}else{
						dAdjacent = nearDate(date, 1);
						nDayNumber = i - getMonthDays(date) - startWeekDay + 1;
						o.className = o.className.replace(/\s*disabled/g,"") + " disabled";
					}
					o.innerHTML = nDayNumber;
					o.setAttribute("value",dateFormat(dAdjacent.getFullYear(), dAdjacent.getMonth() + 1, nDayNumber));
				}
			}

			function getId(){
				return Math.round(new Date() * Math.random());
			}

			function updateYear(oSelect, initialValue){
				var initialValue = initialValue || new Date().getFullYear();
				for(var i = initialValue + 11, j = 0; i-- - initialValue + 10; j++){
					oSelect.options[j] = new Option(i + "年",i);
					if(i === initialValue){
						oSelect.value = i;
					}
				}
			}

			function createCalendar(options){
				var o = {};
				var now = new Date();
				var tmp = ["calendar", "calendar_container", "select_year", "select_month", "day", "time", "hours", "minutes", "seconds", "prev", "next", "btn"];
				var days = [];
				for(var i = tmp.length; i--;){
					var name = tmp[i];
					o[name] = "calendar_id_" + getId();
				}
				var oCalendar = document.createElement("div");
				oCalendar.className = "calendar";
				oCalendar.id = o.calendar;

				var oCalendarContainer = document.createElement("dl");
				oCalendarContainer.className = "calendar_container";
				oCalendarContainer.id = o.calendar_container;
				oCalendar.appendChild(oCalendarContainer);

				var oSelect = document.createElement("dt");
				oSelect.className = "select";
				oCalendarContainer.appendChild(oSelect);

				var oSelectYear = document.createElement("select");
				oSelectYear.className = "select_year";
				oSelectYear.id = o.select_year;
				updateYear(oSelectYear);
				oSelect.appendChild(oSelectYear);

				var oSelectMonth = document.createElement("select");
				oSelectMonth.className = "select_month";
				oSelectMonth.id = o.select_month;
				for(var i = 0; i < 12; i++){
					var month = i < 9 ? "0" + (i + 1) : i + 1;
					oSelectMonth.options[i] = new Option(month + "月", i);
					if(now.getMonth() === i){
						oSelectMonth.value = i;
					}
				}
				oSelect.appendChild(oSelectMonth);

				var oPrevBtn = document.createElement("span");
				oPrevBtn.className = "prev";
				oPrevBtn.id = o.prev;
				oPrevBtn.innerHTML = "&lt;"
				oSelect.appendChild(oPrevBtn);

				var oNextBtn = document.createElement("span");
				oNextBtn.className = "next";
				oNextBtn.id = o.next;
				oNextBtn.innerHTML = "&gt;"
				oSelect.appendChild(oNextBtn);

				var oWeek = document.createElement("dt");
				oWeek.className = "week";
				for(var i = 7; i--;){
					var oWeekItem = document.createElement("span");
					oWeekItem.className = "week_item";
					switch(6 - i){
						case 0:
							oWeekItem.innerHTML = "日";
							break;
						case 1:
							oWeekItem.innerHTML = "一";
							break;
						case 2:
							oWeekItem.innerHTML = "二";
							break;
						case 3:
							oWeekItem.innerHTML = "三";
							break;
						case 4:
							oWeekItem.innerHTML = "四";
							break;
						case 5:
							oWeekItem.innerHTML = "五";
							break;
						case 6:
							oWeekItem.innerHTML = "六";
							break;
					}
					oWeek.appendChild(oWeekItem);
				}
				oCalendarContainer.appendChild(oWeek);

				var oDay = document.createElement("dd");
				oDay.className = "day";
				oDay.id = o.day;

				for(var i = 42; i--;){
					var oDayItem = document.createElement("a");
					oDayItem.className = "day_item";
					oDayItem.setAttribute("href", "javascript:;");
					days[i] = oDayItem;
					oDay.appendChild(oDayItem);
				}
				updateCalendar(now, days.reverse());
				oCalendarContainer.appendChild(oDay);

				var oTime = document.createElement("dt");
				oTime.className = "time";
				oTime.id = o.time;

				oTime.appendChild(document.createElement("span").appendChild(document.createTextNode("时间:")));

				var oHours = document.createElement("input");
				oHours.type = "text";
				oHours.id = o.hours;
				oHours.value = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
				oTime.appendChild(oHours);
				oTime.appendChild(document.createElement("span").appendChild(document.createTextNode(":")));

				var oMinutes = document.createElement("input");
				oMinutes.type = "text";
				oMinutes.id = o.minutes;
				oMinutes.value = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
				oTime.appendChild(oMinutes);
				oTime.appendChild(document.createElement("span").appendChild(document.createTextNode(":")));

				var oSeconds = document.createElement("input");
				oSeconds.type = "text";
				oSeconds.id = o.seconds;
				oSeconds.value = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
				oTime.appendChild(oSeconds);

				var oBtn = document.createElement("input");
				oBtn.type = "button";
				oBtn.className = "calendar_btn";
				oBtn.id = o.btn;
				oBtn.value = "确定";
				oTime.appendChild(oBtn);

				if(document.body.style.minWidth === undefined){
					var oMashframe = document.createElement("iframe");
					oMashframe.className = "maskframe";
					oMashframe.setAttribute("scrolling","no");
					oMashframe.setAttribute("frameborder","0");
					oCalendar.appendChild(oMashframe);
				}

				oCalendarContainer.appendChild(oTime);

				options.box.appendChild(oCalendar);

				return o;
			}

			function calendar(options){
				var _this = this;
				var eles = createCalendar(options);
				var now = new Date();
				var calendar = document.getElementById(eles.calendar);
				var days = document.getElementById(eles.day).getElementsByTagName("a");
				var selectYear = document.getElementById(eles.select_year);
				var selectMonth = document.getElementById(eles.select_month);
				var time = document.getElementById(eles.time);
				var hours = document.getElementById(eles.hours);
				var minutes = document.getElementById(eles.minutes);
				var seconds = document.getElementById(eles.seconds);
				var prev = document.getElementById(eles.prev);
				var next = document.getElementById(eles.next);
				var btn = document.getElementById(eles.btn);
				var selected = {
					target : null,
					date : ""
				};

				function selectDate(){
					var month = parseInt(selectMonth.value);
					var year = parseInt(selectYear.value);
					var date = new Date(year, month);
					_this.updateYear(selectYear, year);
					_this.updateCalendar(date, days, selected.date);
				}

				$.addEvent(selectYear, "change", selectDate);
				$.addEvent(selectMonth, "change", selectDate);
				if(!options.time){
					time.style.display = "none";
				}
				/*
				$.addEvent(document, "click", function(e){
					var e = $.getEvent(e);
					var target = e.target;
					if($.contains(calendar, target)){
						$.stopPropagation(e);
						if(target.id === eles.prev || target.id === eles.next){
							var nearMonth;
							if(target.id === eles.prev){
								nearMonth = new Date(selectYear.value, parseInt(selectMonth.value) - 1);
							}else if(target.id === eles.next){
								nearMonth = new Date(selectYear.value, parseInt(selectMonth.value) + 1);
							}
							if(selected.target){
								if(selected.date === selected.target.getAttribute("value")){
									selected.target.className = selected.target.className.replace(/\s*selected/g,"");
								}
							}
							selectMonth.value = nearMonth.getMonth();
							_this.updateYear(selectYear, nearMonth.getFullYear());
							_this.updateCalendar(nearMonth, days, selected.date);
						}else if(target.nodeName.toLowerCase() === "a"){
							if(target.className.indexOf("disabled") !== -1){return;}
							selected.target && (selected.target.className = selected.target.className.replace(/\s*selected/g,""));
							target.className += " selected";
							selected.target = target;
							selected.date = target.getAttribute("value");
							if(!options.time){
								if(document.getElementById(options.target).nodeName.toLowerCase() === "input"){
									document.getElementById(options.target).value = target.getAttribute("value");
								}else{
									document.getElementById(options.target).innerHTML = target.getAttribute("value");
								}
								calendar.style.display = "none";
							}
						}else if(target.id === eles.btn){
							var result = selected.date + " " + hours.value + ":" + minutes.value + ":" + seconds.value;
							if(document.getElementById(options.target).nodeName.toLowerCase() === "input"){
								document.getElementById(options.target).value = result;
							}else{
								document.getElementById(options.target).innerHTML = result;
							}
							calendar.style.display = "none";
						}
					}else{
						calendar.style.display = "none";
					}
				});
				*/
			}

			calendar.prototype = {
				constructor : this.calendar,
				updateCalendar : updateCalendar,
				updateYear : updateYear
			};

			return calendar;
		}())

		/*
		calendar : function(options){
			
			function getMonthDays(year, month){
				return new Date(new Date(year, month + 1) - 1).getDate();
			}

			function updateCalendar(day){
				for(var i = 42; i--;){
				
				}
			}
			function createCalendar(day){
				var startDay = day.getDay();
				var oCalendar = document.createElement("div");
				oCalendar.className = "calendar";
				oCalendar.style.cssText = "left:100px;top:100px;";
				var oCalendarContainer = document.createElement("dl");
				oCalendarContainer.className = "calendar_container";
				var oSelect = document.createElement("dt");
				oSelect.className = "select";
				var oSelectYear = document.createElement("select");
				oSelectYear.className = "select_year";
				var oSelectMonth = document.createElement("select");
				oSelectMonth.className = "select_month";
				var oWeek = document.createElement("dt");
				oWeek.className = "week";
				var oDay = document.createElement("dd");
				oDay.className = "day";
				var oTime = document.createElement("dt");
				oTime.className = "time";
				for(var i = 7; i--;){
					var oWeekItem = document.createElement("span");
					oWeekItem.className = "week_item";
					switch(6 - i){
						case 0:
							oWeekItem.innerHTML = "日";
							break;
						case 1:
							oWeekItem.innerHTML = "一";
							break;
						case 2:
							oWeekItem.innerHTML = "二";
							break;
						case 3:
							oWeekItem.innerHTML = "三";
							break;
						case 4:
							oWeekItem.innerHTML = "四";
							break;
						case 5:
							oWeekItem.innerHTML = "五";
							break;
						case 6:
							oWeekItem.innerHTML = "六";
							break;
					}
					oWeek.appendChild(oWeekItem);
				}
				for(var i = 42; i--;){
					var oDayItem = document.createElement("a");
					var nDayNumber;
					var dDate = null;
					oDayItem.className = "day_item";
					oDayItem.setAttribute("href","javascript:;");
					if(41 - i < startDay){
						nDayNumber = getMonthDays(day.getFullYear(), day.getMonth() - 1) - startDay + 41 - i;
						dDate = new Date(day.getFullYear(), day.getMonth() - 1);
						oDayItem.innerHTML = nDayNumber;
						oDayItem.className += " disabled";
						oDayItem.setAttribute("value", dDate.getFullYear() + "-" + (dDate.getMonth() + 1) + "-" + nDayNumber);
					}else if(41 - i < getMonthDays(day.getFullYear(),day.getMonth()) + startDay){
						nDayNumber = 42 - i - startDay;
						oDayItem.innerHTML = nDayNumber;
						oDayItem.setAttribute("value", day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + nDayNumber);
					}else{
						nDayNumber = 42 - i - getMonthDays(day.getFullYear(), day.getMonth() + 1) - startDay + 1;
						dDate = new Date(day.getFullYear(), day.getMonth() + 1);
						oDayItem.innerHTML = nDayNumber;
						oDayItem.className += " disabled";
						oDayItem.setAttribute("value", dDate.getFullYear() + "-" + (dDate.getMonth() + 1) + "-" + nDayNumber);
					}
					oDay.appendChild(oDayItem);
				}
				oSelect.appendChild(oSelectYear);
				oSelect.appendChild(oSelectMonth);
				oCalendarContainer.appendChild(oSelect);
				oCalendarContainer.appendChild(oWeek);
				oCalendarContainer.appendChild(oDay);
				oCalendarContainer.appendChild(oTime);
				oCalendar.appendChild(oCalendarContainer);
				document.body.appendChild(oCalendar);
			}
			function init(options){
				var _this = this;
				var handler = options.handler;
				var type = options.type;
				this.handler = typeof handler === "string" ? document.getElementById(handler) : handler;
				var now = new Date();

				createCalendar(new Date(now.getFullYear(), now.getMonth()));

				$.addEvent(this.handler, type, function(e){
					var e = $.getEvent(e);
					$.stopPropagation(e);
					_this.show();
				});
				$.addEvent(document, "click", function(){_this.id.style.display = "none"});
			}
			init.prototype = {
				constructor : $.calendar,
				show : function(){
					
				}
			};
			return new init(options);
		}
		*/


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
		}else if(target.className === "bt"){
			var oBc = $.next(target);
			if($.css(oBc,"display") !== "none"){
				oBc.style.display = "none";
			}else{
				oBc.style.display = "block";
			}
			$.preventDefault(e);
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
			this.posleft = 0;

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
							this.posleft = $.position(this.doing).left;
							this.doing.width = this.doing.offsetWidth;
							this.first = $.first(this.doing);
							this.last = $.last(this.doing);
							this.initial = this.last.innerHTML;
							this.persent = parseInt(this.last.innerHTML);
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
							var persent = parseInt(((e.clientX - this.posleft) / this.doing.width) * 100);
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
							if(this.persent === parseInt(this.initial)){
								return false;
							}
							if(confirm("确定要更新进度？")){
								$.ajax({
									url : url,
									context : _this,
									success : function(data){
										if(!(data * 1)){
											this.first.innerHTML = this.initial;
											this.first.style.width = this.initial;
											this.last.innerHTML = this.initial;
											var tips = $.dialog({
												box : "J_message",
												msg : "进度更新失败",
												type : "error_message",
												time : 4000,
												auto : true
											});
										}else{
											var tips = $.dialog({
												box : "J_message",
												msg : "进度更新成功",
												type : "right_message",
												time : 4000,
												auto : true
											});
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
	};

	var oD = Degree();
});
