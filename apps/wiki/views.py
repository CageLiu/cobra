#-*-coding:utf-8-*-
# Create your views here.

from djangomako.shortcuts import render_to_response

from django.http import HttpResponseRedirect, HttpResponse, Http404

import os,re

from cobra import config as sc
from cobra.apps.wiki import models as wm


#视图开始
def index(request):
    return render_to_response("wiki/index.html",locals())
