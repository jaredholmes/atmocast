from django.contrib import admin
from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name="home"),
    re_path(r'^.*$', views.not_found, name="not_found"),
]
