#-*-coding:utf-8-*-

import os

os.chdir("./package")
print os.getcwd()

try:
    __import__("django")
except ImportError:
    os.system("wget http://www.djangoproject.com/m/releases/1.3/Django-1.3.3.tar.gz")

os.system("yum install python-setuptools")
os.system("sudo apt-get install python-setuptools")
