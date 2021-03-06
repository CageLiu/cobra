#-*-coding:utf-8-*-
from django.conf.urls.defaults import patterns, include, url

from cobra.apps.system import views as sv

urlpatterns = patterns('',
    (r'^$',sv.index), #首页
    (r'^index/$',sv.index), #首页
    (r'^login/$',sv.login), #登录
    (r'^logout/$',sv.logout), #登出
    (r'^getree/$',sv.getree), #返回目录树
    (r'^v/((?P<t>\w+)/((?P<tid>\d+)/)?)?$',sv.v),
    (r'^p/((?P<p>\w+)/((?P<tpl>.+(/.)*)/)?)?$',sv.p), #项目相关|列表,详情,页面预览
    (r'^add/((?P<t>\w+)/)?$',sv.assign,{'view':sv.add}), #添加项目|用户|任务|组
    (r'^edit/((?P<t>\w+)/((?P<item>\w+)/)?)?$',sv.assign,{"view":sv.edit}), #编辑项目|用户|任务|组
    (r'^addrfile/$',sv.addrfile), #添加自动刷新关联文件
    (r'^removerfile/$',sv.removerfile), #添加自动刷新关联文件

    (r'^updatedegree/(?P<t>\w+)/(?P<tid>\d+)/$',sv.updateDegree), #添加自动刷新关联文件

    #--------------form verify--------------------------
    (r'^check/(?P<t>\w+)/(?P<f>\w+)/$',sv.check),
                                                                        
    (r'^test/$',sv.test), #测试页面
)
