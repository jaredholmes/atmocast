from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path('', views.index, name="home"),

    re_path(r'^weather_data/(?P<lat>[-]?[0-9]{1,2}\.{1}[0-9]{1,8})/(?P<lon>[-]?[0-9]{1,3}\.{1}[0-9]{1,8})/$', views.weather_data),

    re_path(r'^reverse_geocode/(?P<lat>[-]?[0-9]{1,2}\.{1}[0-9]{1,8})/(?P<lon>[-]?[0-9]{1,3}\.{1}[0-9]{1,8})/$', views.reverse_geocode),

    re_path(r'^geocode/(?P<query>[\s\S]+)/$', views.geocode),

    path('sw.js', (TemplateView.as_view(template_name="sw.js", content_type="application/javascript")), name="service_worker"),

    re_path(r'^.*$', views.not_found, name="not_found"),
]
