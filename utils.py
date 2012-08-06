#-*-coding:utf-8-*-
import os
from cobra.config import TEMP_IMG_PATH,STATIC_PATH,STATIC_URL_STRING
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



#目录树生成方法
def dirTree(path,pattern = ""):
    '''生成目录树的html'''

    if not path:
        return ""
    container = []
    r = re.compile(pattern)
    def tree(path):
        if(os.path.isdir(path)):
            container.append(ur'''<li class="dir  clearfix"><span class="dir_name"><a href="#">''' + \
            os.path.basename(path) + \
            ur'''</a><i class="flag">&nbsp;</i><i class="type">&nbsp;</i></span></strong><ul class="sub_dir">''')
            for item in os.listdir(path):
                tree(path+'/'+item)
            container.append(ur"</ul></li>")
        else:
            if pattern:
               not r.search(os.path.basename(path)) and container.append(ur'''<li class="file clearfix"><span class="file_name"><a href="#">''' + \
               os.path.basename(path) + \
               ur'''</a><i class="type"></i></span></li>''')
            else:
               container.append(ur'''<li class="file clearfix"><span class="file_name"><a href="#">''' + \
               os.path.basename(path) + \
               ur'''</a><i class="type"></i></span></li>''')
    tree(path)
    container = ur'''<ul class="root" id="root">''' + "".join(container) + ur'''</ul>'''
    return container.decode().encode()
