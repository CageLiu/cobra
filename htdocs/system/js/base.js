/*
 *var cobra = {
 *    ajax : function(options){
 *        return new cobra.ajax.init(options);
 *    }
 *}
 *
 *cobra.ajax.init = function(options){
 *    this.request = this.create();
 *    this.data = this.getDetails(options);
 *};
 *
 *cobra.ajax.init.prototype = {
 *    create : function(){
 *        var request = null;
 *        try{
 *            request = new XMLHttpRequest();
 *        }catch(MS){
 *            try{
 *                request = new ActiveXObject("Msxml2.XMLHTTP");
 *            }catch(otherMs){
 *                try{
 *                    request = new ActiveXObject("Microsoft.XMLHTTP");
 *                }catch(failed){
 *                    return request;
 *                }
 *            }
 *        }
 *        return request;
 *    },
 *
 *    getDetails : function(options){
 *        var request = this.request;
 *        var url = this.url = options['url'] + "&r=" + (+new Date());
 *        var success = this.success = options['success'];
 *        var complete = this.complete = options['complete'];
 *        var error = this.error = options['error'];
 *        var start = this.start = options['start'];
 *        var stop = this.stop = options['stop'];
 *        var loop = this.loop = options['loop'] || false;
 *        var interval = this.interval = options['interval'] || 1000;
 *        if(request === null){
 *            alert("Unable to create request");
 *            return;
 *        }
 *        request.onreadystatechange = function(){
 *            document.title = +new Date();
 *            (function(){
 *                if(this.readyState === 4){
 *                    if(this.status === 200){
 *                        success(this.responseText);
 *                    }else if(this.status !== 200){
 *                        error(this.responseText);
 *                    }
 *                    if(loop){
 *                        setTimeout(function(){
 *                            var r = "&r=" + (+new Date());
 *                            url = url.replace(/&r=\d+/,r);
 *                            request.open("GET",url,true);
 *                            request.send(null);
 *                        },interval);
 *                    }
 *                }
 *            }).call(request);
 *        };
 *        request.open("GET",url,true);
 *        request.send(null);
 *    }
 *};
 */
