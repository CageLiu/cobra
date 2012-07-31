#-*-coding:utf-8-*-
# Create your views here.

from djangomako.shortcuts import render_to_response
from django.http import HttpResponseRedirect,HttpResponse,Http404

import os

from cobra import config as sc
from cobra.apps.tools.config import YUI_JAR_PATH
from cobra.apps.tools import config as tm



#视图开始
def index(request):
    '''首页'''
    page = "index page"
    return render_to_response("tools/index.html",locals())

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
