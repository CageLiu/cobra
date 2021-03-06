#-*-coding:utf-8-*-

#团队名称
TEAMNAME = u"团队名称"

#服务器信息,可以用来指示文件存放的绝对路径
SERVER_INFO = {
        "ip" : "192.168.1.1",    #局域网ip,可让其他同事访问
        "name" : "name",         #服务器主机名
}

#系统根目录
SITE_ROOT = "/var/www/cobra/"

#静态文件URL的字符串
STATIC_URL_STRING = "s"

#临时图片目录
TEMP_IMG_PATH = "/media/temp_img/"

#系统相关静态文件路径
STATIC_PATH = SITE_ROOT + "htdocs"

#项目静态文件路径
P_STATIC_PATH = SITE_ROOT + "static"

#系统模板文件目录
S_PROJECT_PATH = SITE_ROOT + "templates"

#项目模板文件目录
P_PROJECT_PATH = SITE_ROOT + "www"

#静态文件URL
STATIC_URL = r'^' + STATIC_URL_STRING + r'(?P<path>.*)'

#静态文件类型
STATIC_TYPE = (
    "css",
    "img",
    "js",
)
