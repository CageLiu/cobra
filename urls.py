from django.conf.urls.defaults import patterns, include, url

import config

urlpatterns = patterns('',
    (r'^system/',include('cobra.apps.system.urls')),
    (r'^tools/',include('cobra.apps.tools.urls')),
    (config.STATIC_URL,'django.views.static.serve',{'document_root':config.STATIC_PATH}),               #e.g:/s/system/css/style.css
)




