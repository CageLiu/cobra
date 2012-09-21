##-*-coding:utf-8-*-
from django.db import models

# Create your models here.
class Wiki(models.Model):
    title = models.CharField(max_length = 120,unique = True)
    doc = models.TextField()
    tags = models.CharField(max_length = 255)

    def __unicode__(self):
        return self.title
