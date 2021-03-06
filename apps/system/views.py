#-*-coding:utf-8-*-
# Create your views here.

from djangomako.shortcuts import render_to_response
from django.http import HttpResponseRedirect,HttpResponse,Http404


import os,re,sys
from md5 import md5


from cobra import config as sc
from cobra.apps.system.config import PROJECT_STATE,TASK_STATE,WEIGHT
from cobra.apps.system import models as sm
from cobra.utils import dirTree,walkDir

import cPickle as cp

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
        return HttpResponseRedirect("/")

    ref_page = request.GET.get('ref_page','/')

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
    ref_page = request.GET.get('ref_page',"/")
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

    session = request.session

    uid = request.session.get("uid",None)
    try:
        cuser = sm.User.objects.get(id = uid)		
    except sm.User.DoesNotExist:
        cuser = None

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

    def createDir(pn,*target_dir):
        static_dir = sc.P_STATIC_PATH + "/" + pn
        for item in target_dir:
            if not os.path.exists(item):
                os.makedirs(item)

        if not os.path.exists(static_dir + "/_psd"):
            os.makedirs(static_dir + "/_psd")
        
        for item in sc.STATIC_TYPE:
            if not os.path.exists(static_dir + "/" + item):
                os.makedirs(static_dir + "/" + item)
            if item == "img":
                if not os.path.exists(static_dir + "/img/_slice"):
                    os.makedirs(static_dir + "/img/_slice")

    def touchFile(pn,**target_file):

        templates_path = sc.P_PROJECT_PATH + "/" + pn
        static_path = sc.P_STATIC_PATH + "/" + pn

        name_str = "##title:"
        author_str = '''<span class="cobra_system_moudle_author">'''

        h = open(sc.SITE_ROOT + "apps/system/module_fragment.html")
        mod_html = unicode(h.read(),"utf-8")
        h.close()

        if not os.path.isfile(templates_path + "/_import.html"):
            f = open(templates_path + "/_import.html","w")
            f.write("##-*-coding:utf-8-*-")
            f.close()

        for k,v in target_file.items():
            if not os.path.isfile(templates_path + "/_" + k + ".html"):
                f = open(templates_path + "/_" + k + ".html","w")
                s = mod_html[:mod_html.find(name_str) + len(name_str)] + v + mod_html[mod_html.find(name_str) + len(name_str):]
                s = s[:s.find(author_str) + len(author_str)] + v + s[s.find(author_str) + len(author_str):]
                s = s.encode("utf-8")
                f.write(s)
                f.close()

                for d in sc.STATIC_TYPE:
                    if d == "css" or d == "js":
                        static_cont = '''/* ''' + k + ''''s ''' + d + " file */" 
                        if not os.path.isfile(static_path + "/" + d + "/_" + k + "." + d):
                            f = open(static_path + "/" + d + "/_" + k + "." + d,"w")
                            f.write(static_cont)
                            f.close()
                        if d == "css":
                            if not os.path.isfile(static_path + "/css" + "/_" + k + ".less"):
                                f = open(static_path + "/css" + "/_" + k + ".less","w")
                                f.write('''/* ''' + k + ''''s less file */''')
                                f.close()

    if t:
        try:
            model = sm.__dict__[t.capitalize()]
            try:
                if request.method == "POST":
                    if t == "project":
                        extra = {"author" : cuser.id}
                        member = request.POST.getlist("member")
                        newObj = create(model ,flist = ["csrfmiddlewaretoken","member"], extra = extra)
                        templates_path = sc.P_PROJECT_PATH + "/" + newObj.name_en
                        static_path = sc.P_STATIC_PATH + "/" + newObj.name_en
                        ms = {}
                        createDir(newObj.name_en,templates_path,static_path)
                        for item in member:
                            cm = sm.User.objects.get(id = item)
                            if cm.department == 0:
                                ms.update({cm.usm:cm.name_zh})
                            u_p = {"uid":item,"pid":newObj.id}
                            sm.User_Project.objects.create(**u_p)
                        touchFile(newObj.name_en,**ms)
                        
                    elif t == "user":
                        newObj = create(model,flist = ['csrfmiddlewaretoken','upic'])
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
                    return HttpResponseRedirect("/v/" + t + "/" + str(newObj.id))
            except :
                err_msg = u"请按正确的格式填写"
                #return HttpResponse(sys.exc_info()[0])
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
    url = request.GET.get("url","")
    tid = request.GET.get("tid","J_system_dir_root")
    pattern = "\.pyc$|^\.|\.py$|_import\.html|^font$|.*footer\.html$|Thumbs\.db$"
    dirHtml = dirTree(dirs, url, pattern,tid = tid)
    return HttpResponse(dirHtml)

def p(request,p = "", tpl = ""):
    '''view page'''

    import time

    src = request.SRC
    static = request.STATIC

    pfix = p

    pdir = sc.P_PROJECT_PATH

    stamp = "?v=" + str(time.time())
    if p:
        static_path = sc.P_STATIC_PATH + "/" + p
        tpl_path = sc.P_PROJECT_PATH + "/" + p

        pattern = "\.pyc$|^\.|\.py$|_import.html|.*footer.*"
        dirHtml = dirTree(tpl_path, "/p/", pattern)
        dirHtml = re.sub("\n","",dirHtml)

        try:
            pobj = sm.Project.objects.get(name_en = p)
        except sm.Project.DoesNotExist:
            pobj = None

    if not p and not tpl:
        return HttpResponseRedirect("/v/project/")
    elif p and not tpl:
        if pobj:
            dirHtml = dirTree(tpl_path, "/p/", pattern)
            return render_to_response("system/dir.html",locals())
        else:
            return HttpResponse(u"404 page")
    else:
        css_reg = re.compile("\w+\.css$")
        js_reg = re.compile("\w+\.js$")
        less_reg = re.compile("\w+\.less$")
        tpl_filter = re.compile("^(.*\/)?_.*\.html$")
        merge_reg = re.compile("_merge.html$")
        import_reg = re.compile("_import.html$")
        if tpl.find("/") != -1:
            subDir = tpl[0:tpl.find("/")]
        else:
            subDir = None
        if os.path.exists(static_path):
            files = []
            for item in sc.STATIC_TYPE:
                files.extend([item + "/" +f for f in os.listdir(static_path + "/" + item) if not os.path.isdir(static_path + "/" + item + "/" + f)])
                if subDir:
                    subFiles = walkDir([static_path + "/" + item + "/" + subDir],formats = "relative")["files"]
                    files.extend(item + "/" + subDir + "/" + f for f in subFiles)
            files.sort()
            files.reverse()
        if os.path.exists(tpl_path):
            tplfiles = [f for f in os.listdir(tpl_path) if not os.path.isdir(tpl_path + "/" + f)]
            if subDir:
                subFiles = walkDir([tpl_path + "/" + subDir],formats = "relative")["files"]
                tplfiles.extend(subDir + "/" + f for f in subFiles)

            tpls = [f for f in tplfiles if tpl_filter.search(f)]
            tpls.sort()

       
        #如果是目录，则显示目录树
        if os.path.isdir(tpl_path + "/" + tpl):
            dirHtml = dirTree(tpl_path + "/" + tpl, "/p/", pattern)
            return render_to_response("system/dir.html",locals())
        #否则显示相应页面
        else:
            try:
                return render_to_response("system/view.html",locals())
            except:
                return HttpResponse(sys.exc_info()[0])
                #return HttpResponse(u"404")

def v(request,t = "", tid = ""):
    '''user view'''

    uid = request.session.get("uid",0)

    if uid:
        cuser = sm.User.objects.get(id = uid)
    else:
        cuser = None


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
        return HttpResponseRedirect("/")
    elif t and not tid:
        templates = "system/list_" + t + ".html"
        return render_to_response(templates,locals())
    else:
        templates = "system/details_" + t + ".html"
        obj = model.objects.get(id = tid)
        if t == "project":
            related_tasks = sm.Task.objects.filter(pid = tid).order_by("-id")
            related_users = sm.User_Project.objects.filter(pid = tid).order_by("-id")
            pattern = "\.pyc$|^\.|\.py$|_import.html|.*footer.*"
            path = sc.P_PROJECT_PATH + "/" + obj.name_en
            dirHtml = dirTree(path, "/p/", pattern)
            static_dir = sc.P_STATIC_PATH + "/" + obj.name_en

            psd_dir = sc.P_STATIC_PATH + "/" + obj.name_en + "/_psd"

            try:
                psd_prefix_file = open(psd_dir + "/.filelist")
                psd_prefix = cp.load(psd_prefix_file).get("prefix","")
                psd_prefix_file.close()
            except:
                psd_prefix = ""


            staticHtml = dirTree(sc.P_STATIC_PATH + "/" + obj.name_en,'/s/static/',"\.pyc$|^\.|\.py$|^font$|^_psd$",tid = "J_static_dir")
            #----ry code
            dirHtml = dirHtml
            #----ry code
        elif t == "task":
            related_users = sm.User_Task.objects.filter(tid = tid).order_by("-id")
        elif t == "user":
            related_tasks = sm.User_Task.objects.filter(uid = tid).order_by("-id")
            related_projects = sm.User_Project.objects.filter(uid = tid).order_by("-id")
        return render_to_response(templates,locals())

def addrfile(request):
    
    if request.session.get("uid",None):
        pid = request.GET['pid']
        f = request.GET['f']
        obj = sm.Project.objects.get(id = pid)
        files = obj.refile
        refile = re.compile(r'"' + f + r'"')
        if refile.search(files):
            return HttpResponse(u"已经存在")
        else:
            files += r',"' + f + r'"'
            obj.refile = files
            obj.save()
            return HttpResponse(u"添加成功!")
        return HttpResponse(files)
    else:
        return HttpResponse(u"请先登录")

def removerfile(request):
    if request.session.get("uid",None):
        pid = request.GET["pid"]
        f = request.GET["f"]
        if f == "header.html" or f == "footer.html":
            return HttpResponse("1")
        obj = sm.Project.objects.get(id = pid)
        files = obj.refile;
        refile = re.compile(''',?"''' + f + r'''"''')
        files = refile.sub("",files);
        obj.refile = files;
        obj.save()
        return HttpResponse(u"删除成功");
    else:
        return HttpResponse(u"请先登陆")

#更新进度
def updateDegree(request,t = "", tid = 0):
    if t == "" or tid == 0:
        return HttpResponse(u"非法路径")

    if request.GET.get("d"):
        model = sm.__dict__.get(t.capitalize(), None)
        d = request.GET["d"]
        if model == None:
            return HttpResponse(u"非法路径")
        obj = model.objects.get(id = tid)
        obj.degree = d
        obj.save()
        return  HttpResponse("1")
    else:
        return HttpResponse(u"参数错误")


#--------------------------------------------form verify-------------------------------------
def check(request,t = "", f = ""):
    if t == "" or f == "":
        return HttpResponse(u"非法路径")
    if request.GET.get(f):
        v = request.GET[f]
        model = sm.__dict__.get(t.capitalize(),None)
        if model == None:
            return HttpResponse(u"非法路径")
        try:
            model.objects.get(**{f : v})
            return HttpResponse("0")
        except:
            return HttpResponse("1")
        return HttpResponse(request.GET["v"])
    else:
        return HttpResponse(u"参数错误")
    return HttpResponse("check")
