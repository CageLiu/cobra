#-*-coding:utf-8-*-
from django.conf.urls.defaults import patterns, include, url

from cobra.apps.tools import views as tv

urlpatterns = patterns('',
    (r'^$',tv.index),               #首页
    (r'^index/$',tv.index),         #首页
    (r'^compress/$',tv.compress),         #压缩
)
