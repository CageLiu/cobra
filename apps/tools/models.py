#-*-coding:utf-8-*-
from django.db import models

# Create your models here.
class Tools(models.Model):
    name_en = models.CharField(max_length = 50,unique = True)
    name_zh = models.CharField(max_length = 50,unique = True)
    doc = models.TextField()

    def __unicode__(self):
        return self.name_zh
