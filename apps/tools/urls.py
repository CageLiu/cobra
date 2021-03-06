#-*-coding:utf-8-*-
from django.conf.urls.defaults import patterns, include, url

from cobra.apps.tools import views as tv

urlpatterns = patterns('',
    (r'^$',tv.index),               #首页
    (r'^index/$',tv.index),         #首页
    (r'^(?P<tid>(\d+))/$',tv.desc), #
    (r'^compress/$',tv.compress),   #压缩
    (r'^inotify/$',tv.inotify),     #状态检测,自动刷新
    (r'^batchpsd/$',tv.batchpsd),       #批量重命名
    (r'^getfile/$',tv.getfile),     #返回文件列表
    (r'^json/(?P<aid>\d+)$',tv.getJson),     #返回文件列表
    (r'^ajax/$',tv.ajax),     #返回文件列表
    (r'^test/$',tv.test),     #返回文件列表
)
