from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('', views.weather, name="weather"),

    re_path(r'^weather_data/(?P<lat>[-]?[0-9]{1,2}\.{1}[0-9]{1,8})/(?P<lon>[-]?[0-9]{1,3}\.{1}[0-9]{1,8})/$', views.weather_data),

    re_path(r'^reverse_geocode/(?P<lat>[-]?[0-9]{1,2}\.{1}[0-9]{1,8})/(?P<lon>[-]?[0-9]{1,3}\.{1}[0-9]{1,8})/$', views.reverse_geocode),

    re_path(r'^geocode/(?P<query>[\s\S]+)/$', views.geocode),

    # REST API URLs
    re_path(r'^rest/cart/(?P<id>[0-9]+)/$', views.CartViewSet.as_view({'get': 'list', 'put': 'update'})),

    re_path(r'^rest/location-list/(?P<id>[0-9]+)/$', views.LocationListViewSet.as_view({'get': 'list', 'put': 'update'})),

    # General URLs

    path('products/', views.products, name='products'),

    path('log-in/', views.log_in_page, name='log_in'),

    path('log-in/upgrade/', views.log_in_upgrade, name='log_in_upgrade'),

    path('log-out/', views.log_out, name='log_out'),

    path('sign-up/upgrade/', views.sign_up_upgrade, name='sign_up_upgrade'),

    path('password-reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),

    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),

    path('accounts/login/', views.reset_log_in, name="reset_log_in"),

    path('accounts/', include('django.contrib.auth.urls')),

    path('choose-plan/', views.choose_plan, name='choose_plan'),

    path('create-account/', views.sign_up, name='create_account'),

    path('cart-log-in/', views.cart_log_in, name="cart_log_in"),

    path('cart-sign-up/', views.cart_sign_up, name="cart_sign_up"),

    path('terms-of-use/', views.terms, name='terms'),

    path('settings/', views.settings, name='settings'),

    path('cancel-product/<int:id>/', views.cancel_product, name='cancel_product'),

    path('cancel-log-out/<int:id>/', views.cancel_log_out, name='cancel_log_out'),

    re_path(r'^checkout/add-product/(?P<id>[0-9]+)/$', views.add_product, name='chk_add_product'),

    path('checkout/cancel/', views.chk_cancel, name='chk_cancel'),

    path('ipn/', views.ipn, name='ipn'),

    # PayFast URLs
    path('payment/success/', views.payment_success, name='payment_success'),

    path('payment/cancel/', views.payment_cancel, name='payment_cancel'),

    path('payment/notify/', views.payment_notify, name='payment_notify'),

    path('sw.js', (TemplateView.as_view(template_name="sw.js", content_type="application/javascript")), name="service_worker"),

    re_path(r'^.*$', views.not_found, name="not_found"),
]
