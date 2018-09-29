from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('sw.js', (TemplateView.as_view(template_name="sw.js", content_type="application/javascript")), name="service_worker"),
    re_path(r'^.*$', views.not_found, name="not_found"),
]
