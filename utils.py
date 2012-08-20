#-*-coding:utf-8-*-
import os
from cobra.config import TEMP_IMG_PATH,STATIC_PATH,STATIC_URL_STRING,SITE_ROOT
from random import Random
from cobra.apps.system.config import INTERVAL
import re


def walkDir(path,formats = False):
    """遍历目录下的所有文件"""

    result = {"files":[],"dirs":[]}

    if formats == "absolute":
        for item in path:
            for root, dirs, files in os.walk(item):
                for f in files:
                    result["files"].append(os.path.join(root,f))
                for d in dirs:
                    result["dirs"].append(os.path.join(root,d))
    elif formats == "relative":
        for item in path:
            for root, dirs, files in os.walk(item):
                for f in files:
                    result["files"].append(re.sub(item + "/","",os.path.join(root,f)))
                for d in dirs:
                    result["files"].append(re.sub(item + "/","",os.path.join(root,d)))
    else:
        for item in path:
            for root, dirs, files in os.walk(item):
                for f in files:
                    result["files"].append(f)
                for d in dirs:
                    result["dirs"].append(d)
    return result


#随机前景图中间件
class RandomImg(object):
    """为 request 对象添加一个 IMG 方法,用来返回一张随机的图片"""

    #属性映射列表
    attr_hash = {
        "a" : "alt",
        "c" : "class",
        "h" : "height",
        "i" : "id",
        "s" : "style",
        "t" : "title",
        "w" : "width"
    }
    
    def process_view(self,request,view,args,kwargs):
        ''''''
        imglist = walkDir([STATIC_PATH + TEMP_IMG_PATH])["files"]
        #print filelist
        def img(**kwargs):
            """创建 img 元素,kwargs 是 img 的属性列表,可以是字母、下划线或数字,不可含-"""

            ra = Random()
            index = ra.randint(0,len(imglist) - 1)
            attr = " ".join(["%s=%s" % (self.__class__.attr_hash.get(k,None) or k,v) for k,v in kwargs.items()])
            src = "/" + STATIC_URL_STRING + TEMP_IMG_PATH + imglist[index]
            tag = r"<img src=" + src + " " + attr + r" />"
            return tag
        request.IMG = img
        request.INTERVAL = INTERVAL
        request.STATIC = "/" + STATIC_URL_STRING + "/static"


def getChineseName(filename):
    name = ""
    if os.path.exists(filename):
        f = open(filename)
        for line in f.readlines():
            if line.startswith('''##title:'''):
                name = unicode(line,"utf-8")[8:] + u" : "
                break
        f.close()
    return name
    


#目录树生成方法
def dirTree(path, url = "/", pattern = ""):
    '''生成目录树的html'''

    if not path or not os.path.exists(path):
        return u"目录不存在或为空"
    container = []
    r = re.compile(pattern)
    def tree(path):
        rpath = re.sub(SITE_ROOT + "www/","",path)
        if not r.search(os.path.basename(path)):
            if os.path.isdir(path):
                container.append(r'''<li class="cobra_system_dir  clearfix"><span class="cobra_system_dir_name"><a href="''' + url + rpath + r'''/">''' + \
                unicode(os.path.basename(path).encode("utf-8"),"utf-8") + \
                r'''</a><i class="cobra_system_flag">&nbsp;</i><i class="cobra_system_type">&nbsp;</i></span></strong><ul class="cobra_system_sub_dir">''')
                for item in os.listdir(path):
                    tree(path+'/'+item)
                container.append(r"</ul></li>")
            else:
                title = getChineseName(path)
                if pattern:
                   not r.search(os.path.basename(path)) and container.append(r'''<li class="cobra_system_file clearfix">''' + \
                   r'''<span class="cobra_system_file_name"><a href="''' + url + rpath + r'''/">''' + \
                   title + unicode(os.path.basename(path).encode("utf-8"),"utf-8") + \
                   r'''</a><i class="cobra_system_type"></i></span></li>''')
                else:
                   container.append(r'''<li class="cobra_system_file clearfix"><span class="cobra_system_file_name"><a href="''' + url + rpath + r'''/">''' + \
                   title + unicode(os.path.basename(path).encode("utf-8"),"utf-8") + \
                   r'''</a><i class="cobra_system_type"></i></span></li>''')
    tree(path)
    container = r'''<ul id="J_system_dir_root">''' + "".join(container) + r'''</ul>'''
    return container
