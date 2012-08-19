#-*-coding:utf-8-*-

from django.conf.urls.defaults import patterns, include, url

from cobra.apps.wiki import views as wv

urlpatterns = patterns('',
    (r'^$',wv.index),
)
