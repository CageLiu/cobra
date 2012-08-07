#-*-coding:utf-8-*-
# Create your views here.

from djangomako.shortcuts import render_to_response
from django.http import HttpResponseRedirect,HttpResponse,Http404

import os,re
from md5 import md5

from cobra import config as sc
from cobra.apps.system.config import PROJECT_STATE,TASK_STATE,WEIGHT
from cobra.apps.system import models as sm
from cobra.utils import dirTree,walkDir


#视图开始
def assign(request,**args):
    '''assign method'''
    if request.session.get('uid'):
        args['User'] = sm.User.objects.get(id = request.session['uid'])
        return args['view'](request,**args)
    else:
        full_path = request.get_full_path()
        return render_to_response('system/jump.html',locals())


def login(request):
    '''login view'''
    if request.session.get("uid"):
        return HttpResponseRedirect("/system/")

    ref_page = request.GET.get('ref_page','/system/')

    if "usm" in request.POST and "pwd" in request.POST:
        usm = request.POST["usm"]
        pwd = request.POST["pwd"]
        if len(usm) == 0:
            utips = u'用户名不能为空！'
        elif len(pwd) == 0:
            ptips = u'密码不能为空！'
        else:
            try:
                user = sm.User.objects.get(usm = usm)
                right_pwd = user.pwd
            except sm.User.DoesNotExist:
                utips = u'用户不存在！'
            else:
                #if right_pwd != md5(pwd).hexdigest():
                if right_pwd != pwd:
                    ptips = u'密码错误！'
                else:
                    request.session['uid'] = user.id
                    request.session.set_expiry(0)
                    return HttpResponseRedirect(ref_page)
    return render_to_response("system/login.html",locals())

def logout(request):
    ref_page = request.GET.get('ref_page',"/system/")
    try:
        del request.session['uid']
    except KeyError:
        pass
    return HttpResponseRedirect(ref_page)

def index(request):
    '''index view'''

    pfix = "index"

    WEIGHT_KEYS = WEIGHT.keys()
    WEIGHT_KEYS.sort()
    icon_guide_html = ""
    for key in WEIGHT_KEYS:
        icon_guide_html += '''<i class="item ''' + key + '''">&nbsp;</i>''' + WEIGHT[key]

    allProjects = sm.Project.objects.all().order_by("-id")
    allTasks = sm.Task.objects.all().order_by("-id")
    allUsers = sm.User.objects.all().order_by("department")

    uid = request.session.get("uid",None)
    try:
        cuser = sm.User.objects.get(id = uid)		
    except sm.User.DoesNotExist:
        cuser = None

    img = request.IMG
    dirs = request.GET.get("dir",None)

    return render_to_response("system/index.html",locals())


def add(request,**args):

    t = args["t"]

    pfix = t

    cuser = args["User"]

    allProjects = sm.Project.objects.all()
    allUsers = sm.User.objects.all()
    allTasks = sm.Task.objects.all()
    allGroups = sm.Group.objects.all()
    allRights = sm.Rights.objects.all()

    def create(model, flist = ["csrfmiddlewaretoken"] ,extra= {}):
        data = {k:v for k,v in request.POST.items() if k not in flist}
        data.update(extra)
        return model.objects.create(**data)

    if t:
        try:
            model = sm.__dict__[t.capitalize()]
            try:
                if request.method == "POST":
                    if t == "project":
                        extra = {"author" : cuser.id}
                        member = request.POST.getlist("member")
                        newObj = create(model ,flist = ["csrfmiddlewaretoken","member"], extra = extra)
                        for item in member:
                            u_p = {"uid":item,"pid":newObj.id}
                            sm.User_Project.objects.create(**u_p)
                    elif t == "user":
                        create(model,flist = ['csrfmiddlewaretoken','upic'])
                    elif t == "task":
                        extra = {"author" : cuser.id}
                        member = request.POST.getlist("member")
                        newObj = create(model, flist = ["csrfmiddlewaretoken","member"], extra = extra)
                        for item in member:
                            u_t = {"uid":item,"tid":newObj.id}
                            sm.User_Task.objects.create(**u_t)
                    elif t == "group":
                        create(model)
                    elif t == "rights":
                        create(model)
                    return HttpResponseRedirect("/system/v/" + t + "/")
            except :
                err_msg = u"请按正确的格式填写"
                return render_to_response("system/add_" + t + ".html",locals())
        except KeyError:
            return HttpResponse(u"404 page")
        return render_to_response("system/add_" + t + ".html",locals())
    else:
        return render_to_response("system/add.html",locals())

def edit(request,**args):

    t    = args["t"]
    item = args["item"]

    pfix = t

    if not t and not item:
        return HttpResponse("edit index page")
    elif t and not item:
        return HttpResponse("t is found")
    elif t and item:
        return HttpResponse("t and item is found")

def test(request):
    '''test view'''
    return HttpResponse("I am a test page")

def getree(request):
    '''get the dir or files'''
    dirs = request.GET.get("dir",None)
    #html = dirTree(dirs,pattern = ".*\.pyc$|\.swp$|^(__).*|^(m_).*|\.py$")
    html = dirTree(dirs,"")
    return HttpResponse(html)

def inotify(request):
    '''检测指定目录的修改时间,并返回一个状态值'''

    import stat
    if request.session.get("modifyTime",None):
        pass
    else:
        request.session["modifyTime"] = {}

    newModifyTime = {}

    path = request.GET.get("path",None)

    #获取所有相关目录
    dirs = []
    dirs.extend([
        sc.P_PROJECT_PATH, \
        sc.P_STATIC_PATH, \
        sc.P_PROJECT_PATH + path, \
        sc.P_STATIC_PATH + path \
    ])
    dirs.extend(walkDir([
        sc.P_PROJECT_PATH + path, \
        sc.P_STATIC_PATH + path \
    ],formats = "absolute")["dirs"])

    for d in dirs:
        filestat = os.stat(d)
        newModifyTime[d] = filestat[stat.ST_MTIME]

    if newModifyTime != request.session["modifyTime"]:
        stat = "1"
        request.session["modifyTime"] = newModifyTime
    else:
        stat = "0"
    return HttpResponse(stat)


def p(request,p = "", tpl = ""):
    '''view page'''

    img = request.IMG
    static = request.STATIC

    pfix = p

    if p:
        static_path = sc.P_STATIC_PATH + "/" + p
        tpl_path = sc.P_PROJECT_PATH + "/" + p

    if not p and not tpl:
        return HttpResponseRedirect("/system/v/project/")
    elif p and not tpl:
        #应该返回具体项目的目录树
        return HttpResponse(u"这里将显示项目的目录树")
    else:
        css_reg = re.compile("\w+\.css$")
        js_reg = re.compile("\w+\.js$")
        less_reg = re.compile("\w+\.less$")
        if os.path.exists(static_path):
            files = walkDir([static_path],formats = "relative")["files"]
            files.sort()
        if os.path.exists(tpl_path):
            tpls = [f for f in os.listdir(tpl_path) if not os.path.isdir(f)]
            tpls.sort()
        
        if os.path.isdir(tpl_path + "/" + tpl):
            return HttpResponse(dirTree(tpl_path + "/" + tpl),"")
        else:
            try:
                return render_to_response("system/view.html",locals())
            except :
                return HttpResponse(u"404 page")

def v(request,t = "", tid = ""):
    '''user view'''

    uid = request.session.get("uid",None)


    WEIGHT_KEYS = WEIGHT.keys()
    WEIGHT_KEYS.sort()
    icon_guide_html = ""
    for key in WEIGHT_KEYS:
        icon_guide_html += '''<i class="item ''' + key + '''">&nbsp;</i>''' + WEIGHT[key]

    if t == "user" and tid == str(uid):
        pfix = "gallery"
        uname = u"我"
    else:
        pfix = t
        try:
            uname = sm.User.objects.get(id = tid).name_zh
        except sm.User.DoesNotExist:
            pass

    if t:
        try:
            model = sm.__dict__[t.capitalize()]
        except KeyError:
            return HttpResponse(u"404 page")
        allProjects = sm.Project.objects.all()
        allUsers    = sm.User.objects.all()
        allTasks    = sm.Task.objects.all()
        allGroups   = sm.Group.objects.all()
        allRights   = sm.Rights.objects.all()
    if not t and not tid:
        return HttpResponseRedirect("/system/")
    elif t and not tid:
        templates = "system/list_" + t + ".html"
        return render_to_response(templates,locals())
    else:
        templates = "system/details_" + t + ".html"
        obj = model.objects.get(id = tid)
        if t == "project":
            related_tasks = sm.Task.objects.filter(pid = tid).order_by("-id")
            related_users = sm.User_Project.objects.filter(pid = tid).order_by("-id")
            pattern = ".*\.pyc$|\.swp$|\.py$|_import.html"
            path = sc.P_PROJECT_PATH + "/" + obj.name_en
            dirHtml = dirTree(path, "/system/p/", pattern)
        elif t == "task":
            related_users = sm.User_Task.objects.filter(tid = tid).order_by("-id")
        elif t == "user":
            related_tasks = sm.User_Task.objects.filter(uid = tid).order_by("-id")
            related_projects = sm.User_Project.objects.filter(uid = tid).order_by("-id")
        return render_to_response(templates,locals())

