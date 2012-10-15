#-*-coding:utf-8-*-
# Create your views here.

from djangomako.shortcuts import render_to_response
from django.http import HttpResponseRedirect,HttpResponse,Http404

import os,re

import Image

import cPickle as cp

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

    files.extend([sc.P_STATIC_PATH + "/" + f for f in os.listdir(sc.P_STATIC_PATH) if os.path.isfile(sc.P_STATIC_PATH + "/" + f) and not os.path.basename(f).startswith(".")])
    files.extend([f for f in walkDir([sc.P_STATIC_PATH + path],formats = "absolute")["files"] if not os.path.basename(f).startswith(".")])

    print "::"*100
    print files
    print "::"*100


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


def batchpsd(request):
    if request.GET.get("path") and request.GET.get("name") and request.GET.get("prefix"):
        path = request.GET["path"]
        name = request.GET["name"]
        prefix = request.GET["prefix"]

        pf = path + name
        dirs = os.path.dirname(pf)

        if os.path.dirname(name):
            rd = os.path.dirname(name) + "/"
        else:
            rd = ""

        if os.path.splitext(name)[1].lower() != ".psd":
            return HttpResponse(u'''<span class="bat_psd b_tips1">''' + name + u''' 不是 psd 文件，跳过!</span>''')

        if not os.path.exists(dirs + "/jpg"):
            os.makedirs(dirs + "/jpg")

        r = re.compile(r'^' + prefix + r"\d+_")

        try:
            f = open(path + "/.filelist")
            l = cp.load(f)
        except IOError:
            l = {"old":[],"new":[],"prefix":prefix}
            f = open(path + "/.filelist","w")
            cp.dump(l,f)
        finally:
            n = len(l["new"]) + 1
            f.close()

        if pf not in l["new"] and os.path.isfile(pf):
            oldname = os.path.dirname(pf) + "/" + r.sub("",os.path.basename(pf))
            if oldname in l["old"]:
                o_p_name = l["new"][l["old"].index(oldname)]
                try:
                    os.rename(pf,o_p_name)
                except:
                    return HttpResponse(u'''<span class="bat_psd b_tips6">文件 ''' + name + u''' 已不存在！</span>''')
                try:
                    psd = Image.open(o_p_name)
                    psd.save(dirs + "/jpg/" + os.path.splitext(os.path.basename(o_p_name))[0] + ".jpg",quality = 100)
                except: 
                    return HttpResponse(u'''<span class="bat_psd b_tips2">''' + name + u'''已使用新版本替换旧版本，编号保持不变！但导出 jpg 失败！请手动导出</span>''')
                return HttpResponse(u'''<span class="bat_psd b_tips3">''' + name + u'''已使用新版本替换旧版本，编号保持不变！</span>''')
            else:
                newName = dirs + "/" + prefix + str(n) + "_" + r.sub("",os.path.basename(pf))
                l["old"].append(pf)
                l["new"].append(newName)
                try:
                    os.rename(pf,newName)
                except:
                    return HttpResponse(u'''<span class="bat_psd b_tips6">文件 ''' + name + u''' 已不存在！</span>''')

                f = open(path + "/.filelist","w")
                cp.dump(l,f)
                f.close()
                try:
                    psd = Image.open(newName)
                    psd.save(dirs + "/jpg/" + os.path.splitext(os.path.basename(newName))[0] + ".jpg",quality = 100)
                except:
                    return HttpResponse(u'''<span class="bat_psd b_tips4">重命名：''' + name + u''' --&gt; ''' + rd + os.path.basename(newName) + u'''！但导出 jpg 失败！请手动导出</span>''')
                return HttpResponse(u'''<span class="bat_psd b_tips5">重命名：''' + name + u''' --&gt; ''' + rd + os.path.basename(newName) + u'''！并成功导出 jpg 到：''' + rd + '''jpg/''' +os.path.splitext(os.path.basename(newName))[0] + ".jpg" + u'''</span>''')
        else:
            return HttpResponse(u'''<span class="bat_psd b_tips1">''' + name + u''' 已符合命名规则，跳过!</span>''')
    else:
        return HttpResponse(u'''<span class="bat_psd b_tips7">参数错误!</span>''')


def getfile(request):
    r = re.compile('\.psd$',re.I)
    if request.GET.get("path"):
        path = request.GET["path"]
        l = [i for i in walkDir([path],formats = "relative")["files"] if r.search(i)]

    return HttpResponse(",".join(l))

def test(request):
    return render_to_response("tools/test.html",locals())
