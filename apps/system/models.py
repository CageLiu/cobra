#-*-coding:utf-8-*-

from django.db import models

#用户组
class Group(models.Model):
    name_en   = models.CharField(max_length = 20, unique = True)
    name_zh   = models.CharField(max_length = 40, unique = True)
    rights = models.TextField()
    desc   = models.CharField(max_length = 255)

    def __unicode__(self):
        return self.name_zh

#权限
class Rights(models.Model):
    rights = models.CharField(max_length = 50)

    def __unicode__(self):
        return self.rights

#用户
class User(models.Model):
    usm        = models.CharField(max_length = 100, unique = True)
    pwd        = models.CharField(max_length = 32)
    name_zh    = models.CharField(max_length = 100)
    email      = models.EmailField(unique = True)
    group      = models.IntegerField()
    department = models.CharField(max_length = 30)
    state      = models.IntegerField(default = 0)
    upic       = models.CharField(max_length = 30, default = "normal.png")
    regtime    = models.DateTimeField(auto_now_add = True)

    def __unicode__(self):
        return self.name_zh

#项目
class Project(models.Model):
    name_en   = models.CharField(max_length = 100, unique = True)
    name_zh   = models.CharField(max_length = 200 ,unique = True)
    summary   = models.TextField()
    state     = models.CharField(max_length = 20, default = "a_nostart")
    starttime = models.DateTimeField()
    period    = models.IntegerField()
    author    = models.IntegerField()
    manager   = models.IntegerField()
    ctime     = models.DateTimeField(auto_now_add = True)
    degree    = models.IntegerField(default = 0)
    weight    = models.CharField(max_length = 20, default = "a_commonly")
    refile    = models.TextField(default = r'"header.html","footer.html"')

    def __unicode__(self):
        return self.name_zh

#任务
class Task(models.Model):
    name    = models.CharField(max_length = 255)
    desc    = models.TextField()
    author  = models.IntegerField()
    state   = models.CharField(max_length = 50, default = "a_new")
    manager = models.IntegerField(default = 0)
    pid     = models.IntegerField(default = 0)
    degree  = models.IntegerField(default = 0)
    weight  = models.CharField(max_length = 20, default = "a_commonly")
    ctime     = models.DateTimeField(auto_now_add = True)

    def __unicode__(self):
        return self.name

class News(models.Model):
    name     = models.CharField(max_length = 255)
    ctime    = models.DateTimeField(auto_now_add = True)
    category = models.CharField(max_length = 30)
    cid      = models.IntegerField()
    content  = models.TextField()

    def __unicode__(self):
        return self.name

#用户 - 项目
class User_Project(models.Model):
    uid = models.IntegerField()
    pid = models.IntegerField()
    
    def __unicode__(self):
        return self.uid

#用户 - 任务
class User_Task(models.Model):
    uid = models.IntegerField()
    tid = models.IntegerField()

    def __unicode__(self):
        return self.uid
