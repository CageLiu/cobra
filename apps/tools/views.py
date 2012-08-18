#-*-coding:utf-8-*-
# Create your views here.

from djangomako.shortcuts import render_to_response
from django.http import HttpResponseRedirect,HttpResponse,Http404

import os,re

from cobra import config as sc
from cobra.apps.tools.config import YUI_JAR_PATH
from cobra.apps.tools import models as tm
from cobra.utils import dirTree,walkDir



#视图开始
def index(request):
    '''首页'''
    t = None
    return render_to_response("tools/index.html",locals())

#代码压缩
def compress(request):
    css = request.GET.getlist("css")
    js = request.GET.getlist("js")

    if css:
        for c in css:
            os.system("java -jar /var/www/cobra/apps/tools/yui.jar --type css --charset utf-8 /var/www/cobra/apps/tools/" + c + " -o " + c.split(".")[0] + "-min.css")
    if js:
        for j in js:
            os.system("java -jar /var/www/cobra/apps/tools/yui.jar --type js --charset utf-8 /var/www/cobra/apps/tools/" + j + " -o " + j.split(".")[0] + "-min.js")

    return HttpResponse("OK")

#文件监控,自动刷新
def inotify(request):
    '''检测指定目录的修改时间,并返回一个状态值
       请求形式:/system/inotify/?path=/projectname&file=/projectname/filepath
       path 和 file 参数的值均可在具体页面的view中得到
       如test项目abc目录下的index.html页面:
       /system/inotify/?path=/test&file=/test/abc/index.html
       多个文件用|分割
    '''

    import stat

    user_agent = request.META["HTTP_USER_AGENT"]

    if request.session.get(user_agent,None):
        pass
    else:
        request.session[user_agent] = {}

    newModifyTime = {}

    path = request.GET.get("path",None)
    curpage = request.GET.get("file",None)
    
    flist = eval(curpage)
    
    #获取所有相关文件
    files = [sc.P_PROJECT_PATH + path + '/' + f for f in flist]
    
    if request.session.get("currentpage",None):
        pass
    else:
        request.session["currentpage"] = files[0]

    files.extend([sc.P_STATIC_PATH + "/" + f for f in os.listdir(sc.P_STATIC_PATH) if os.path.isfile(sc.P_STATIC_PATH + "/" + f)])
    files.extend(walkDir([sc.P_STATIC_PATH + path],formats = "absolute")["files"])


    for f in files:
        try:
            filestat = os.stat(f)
            newModifyTime[f] = filestat[stat.ST_MTIME]
        except OSError:
            pass

    if request.session[user_agent] != newModifyTime:
        if not request.session[user_agent] or request.session["currentpage"] != files[0]:
            stat = "0"
            request.session["currentpage"] = files[0]
        else:
            stat = "1"
        request.session[user_agent] = newModifyTime
    else:
        stat = "0"

    return HttpResponse(stat)



def desc(request,tid = 0):
    try:
        t = tm.Tools.objects.get(id = tid)
    except tm.Tools.DoesNotExist:
        return HttpResponse("404 page")
    return render_to_response("tools/desc.html",locals())

def test(request):
    return HttpResponse("test page")
