from django.db import models
from django.contrib.postgres.fields import JSONField, ArrayField
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    description = models.TextField(default='A great product.')
    frequency = models.CharField(default='monthly', max_length=20)
    users = ArrayField(models.IntegerField(), blank=True, null=True)

class LocationList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    locations = JSONField(default=dict)
