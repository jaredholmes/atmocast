import os
import requests
import datetime
import sys
import json
import urllib.parse
import requests

from django.shortcuts import render, HttpResponseRedirect, reverse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django import forms, conf
from django.core.mail import send_mail
from django.http import QueryDict
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import viewsets

from .forms import LogInForm, SignUpForm
from .models import Product, LocationList
from .serializers import LocationListSerializer
from . import email

location_IQ_Key = os.environ.get('LOCATIONIQ_KEY')

# Create your views here.
def index(request):
    return render(request, 'weather_main/index.html')

def weather(request):
    proUser = False
    paidUser = False

    if request.user.is_authenticated:
        accepted_names = ['Atmocast Weather Pro',]
        paidUser = True

        for name in accepted_names:
            if Product.objects.filter(name=name).exists():
                product = Product.objects.get(name=name)
                if request.user.id in product.users:
                    proUser = True
                    user_lists = 0
                    for l in LocationList.objects.all():
                        if request.user.id == l.user.id:
                            user_lists += 1
                            break

                    if user_lists == 0:
                        loc_list = LocationList.objects.create(user=request.user)
                        loc_list.save()

                    break

    user_type = request.GET.get('type')

    return render(request, 'weather_main/weather.html', { 'proUser': proUser, 'paidUser': paidUser, 'userType': user_type })

def weather_data(request, lat, lon):
    if lat and lon:
        dark_sky_key = os.environ.get('DARKSKY_KEY')
        dark_sky_URL = 'https://api.darksky.net/forecast/' + dark_sky_key + '/' + lat + ',' + lon
        dark_sky_params = { 'exclude': 'minutely,alerts,flags' }
        response = requests.get(dark_sky_URL, params=dark_sky_params)
    else:
        response = 'Invalid co-ordinates given in request.'

    return HttpResponse(response)

def reverse_geocode(request, lat, lon):
    if lat and lon:
        reverse_geo_URL = 'https://us1.locationiq.com/v1/reverse.php'
        reverse_geo_params = {
            'key': location_IQ_Key,
            'lat': lat,
            'lon': lon,
            'format': 'json',
            'zoom': '14',
        }
        response = requests.get(reverse_geo_URL, params=reverse_geo_params)
    else:
        response = 'Invalid co-ordinates given in request.'

    return HttpResponse(response)

def geocode(request, query):
    if query:
        geo_URL = 'https://us1.locationiq.com/v1/search.php'
        geo_params = {
            'key': location_IQ_Key,
            'q': query,
            'format': 'json',
        }
        response = requests.get(geo_URL, params=geo_params)
    else:
        response = 'Invalid query given in request.'

    return HttpResponse(response);

# REST API Views
class LocationListViewSet(viewsets.ViewSet):

    def list(self, request, id):
        try:
            loc_list = LocationList.objects.get(user=id)
        except:
            return HttpResponse()
        else:
            serializer = LocationListSerializer(loc_list)
            return Response(serializer.data)

    def update(self, request, id):

        try:
            loc_list = LocationList.objects.get(user=id)
        except:
            return HttpResponse()
        else:
            serializer = LocationListSerializer(loc_list)

            locations = eval(request.body.decode('utf-8'))['params']['locations']
            loc_list.locations = locations

            loc_list.save()

            return Response(serializer.data)

def products(request):
    return render(request, 'weather_main/products.html')

def choose_plan(request):

    log_in_form = LogInForm()
    sign_up_form = SignUpForm()

    context  = {
        'products': Product.objects.all(),
        'stage': 'choose_plan',
        'log_in_form': log_in_form,
        'sign_up_form': sign_up_form,
    }

    return render(request, 'weather_main/choose_plan.html', context)

def add_product(request, id):
    if request.user.is_authenticated:
        product = Product.objects.get(id=id)
        product.users.append(request.user.id)
        product.save()
    return HttpResponseRedirect(reverse('weather'))

def chk_cancel(request):
    return render(request, 'weather_main/chk-cancel.html')

def log_in(request, base_template, success_url, extra_key, extra_val, add_products, no_products):

    context = {
        'products': Product.objects.all()
    }

    if extra_key and extra_val:
        context[extra_key] = extra_val

    if request.method == 'POST':
        log_in_form = LogInForm(request.POST)

        context['log_in_form'] = log_in_form

        if log_in_form.is_valid():
            data = log_in_form.cleaned_data
            user = authenticate(
                request,
                username=data['email'],
                password=data['password']
            )

            if user is not None:
                if add_products:
                    for i in user_products:
                        product = Product.objects.get(id=i)
                        product.users.append(user.id)
                        product.save()

                login(request, user)
                return HttpResponseRedirect(success_url)

            else:
                return render(request, base_template, context)

    else:
        context['log_in_form'] = LogInForm()

    return render(request, base_template, context)


def log_in_page(request):
    return log_in(request, 'weather_main/log_in.html', reverse('weather'), extra_key='', extra_val='', add_products=False, no_products=True)

def log_in_upgrade(request):
    return log_in(request, 'weather_main/log_in.html', reverse('choose_plan'), extra_key='', extra_val='', add_products=False, no_products=True)

def sign_up(request, base_template, success_url, extra_key, extra_val, add_products):
    if request.method == 'POST':
        sign_up_form = SignUpForm(request.POST)

        if sign_up_form.is_valid():
            data = sign_up_form.cleaned_data
            new_user = User.objects.create_user(username=data['email'], password=data['password'])
            new_user.save()

            loc_list = LocationList.objects.create(user=new_user)
            loc_list.save

            user = authenticate(
                request,
                username=data['email'],
                password=data['password'],
            )

            if add_products:
                for i in user_products:
                    product = Product.objects.get(id=i)
                    product.users.append(user.id)
                    product.save()

            login(request, user)

            mail_subject = 'Welcome to Atmocast!'

            mail_html = '<h4>Thank you for choosing Atmocast Weather!</h4><p>We hope you enjoy the service. If you have any feedback or questions, please do not hesitate to direct them to atmocastweather@gmail.com.</p><p>Please note that the Atmocast Pro free trial period ends on 1 December 2018, after which you will need to purchase an Atmocast Pro subsciption in order to continue using the service.</p><p>Kind regards,<br>Jared Holmes</p><p>Atmocast founder & engineer</p>'

            mail_message = 'Thank you for choosing Atmocast Weather!\n\nWe hope you enjoy the service. If you have any feedback or questions, please do not hesitate to direct them to atmocastweather@gmail.com.\nPlease note that the Atmocast Pro free trial period ends on 1 December 2018, after which you will need to purchase an Atmocast Pro subsciption in order to continue using the service.\n\nKind regards,\nJared Holmes\nAtmocast founder & engineer'

            mail_recip = user.username

            send_mail(from_email=conf.settings.DEFAULT_FROM_EMAIL, subject=mail_subject, message=mail_message, html_message=mail_html, recipient_list=[mail_recip])

            return HttpResponseRedirect(success_url)

    else:
        sign_up_form = SignUpForm()

    context = {
        'sign_up_form': sign_up_form,
        'products': Product.objects.all()
    }

    if extra_key and extra_val:
        context[extra_key] = extra_val

    return render(request, base_template, context)

def sign_up_upgrade(request):
    return sign_up(request, 'weather_main/sign_up.html', reverse('choose_plan'), extra_key='', extra_val='', add_products=False)

def log_out(request):
    if request.user.is_authenticated:
        logout(request)

    return HttpResponseRedirect(reverse('weather'))

def reset_log_in(request):
    return HttpResponseRedirect(reverse('log_in'))

def cart_log_in(request):
    return log_in(request, 'weather_main/choose_plan.html', reverse('weather'), extra_key='sign_up_form', extra_val=SignUpForm(), add_products=True, no_products=False)

def cart_sign_up(request):
    return sign_up(request, 'weather_main/choose_plan.html', reverse('weather'), extra_key='log_in_form', extra_val=LogInForm(), add_products=True)

def terms(request):
    return render(request, 'weather_main/terms.html')

def settings(request):
    if (request.user.is_authenticated):
        user_products = []

        for p in Product.objects.all():
            if len(p.users) > 0:
                if request.user.id in p.users:
                    user_products.append(p)

        return render(request, 'weather_main/settings.html', { 'products': user_products })
    else:
        return HttpResponseRedirect(reverse('weather'))

def cancel_product(request, id):
    if request.user.is_authenticated:
        product = Product.objects.get(id=id)

        if request.user.id in product.users:
            product.users.remove(request.user.id)
            product.save()

    return HttpResponseRedirect(reverse('settings'))

def cancel_log_out(request, id):
    cancel_product(request, id)
    return HttpResponseRedirect(reverse('log_out'))

# PayFast views
def payment_success(request):
    return HttpResponse('Successful payment!')

def payment_cancel(request):
    return HttpResponse('Cancelled payment.')

def payment_notify(request):
    return HttpResponse('Notify')

# PayPal IPN view.
# For the response flow description, see https://developer.paypal.com/docs/classic/ipn/integration-guide/IPNImplementation/
@csrf_exempt
def ipn(request):
    VERIFY_URL_PROD = 'https://ipnpb.paypal.com/cgi-bin/webscr'
    VERIFY_URL_TEST = 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr'
    # Switch as appropriate
    VERIFY_URL = VERIFY_URL_PROD

    # Txn types sent in response which indicate that the subscriber's payment has failed and the product should be removed from their account
    CANCELLED_TYPES = [
        'mp_cancel',
        'recurring_payment_expired',
        'recurring_payment_failed',
        'recurring_payment_profile_cancel',
        'recurring_payment_suspended',
        'recurring_payment_suspended_due_to_max_failed_payment',
        'subscr_cancel',
        'subscr_eot',
        'subscr_failed',
    ]

    # Parse response
    decoded_body = request.body.decode('utf-8')
    parsed_qs = urllib.parse.parse_qs(decoded_body)
    params = urllib.parse.parse_qsl(decoded_body)

    # Add '_notify-validate' parameter
    params.append(('cmd', '_notify-validate'))

    # Post back to PayPal for validation
    headers = {'content-type': 'application/x-www-form-urlencoded',
               'user-agent': 'Python-IPN-Verification-Script'}
    r = requests.post(VERIFY_URL, params=params, headers=headers, verify=True)
    r.raise_for_status()

    if r.text == 'VERIFIED':
        # Extract necessary items
        txn_type = parsed_qs['txn_type'][0]
        item_name = parsed_qs['item_name'][0]
        payer_email = parsed_qs['payer_email'][0]

        # Attempt to remove user from product's users
        for i in CANCELLED_TYPES:
            if i == txn_type:
                if User.objects.filter(username=payer_email).exists() and Product.objects.filter(name=item_name).exists():
                    user_id = User.objects.get(username=payer_email).id
                    product = Product.objects.get(name=item_name)
                    product.users.remove(user_id)
                    product.save()
                break

    return HttpResponse()

def not_found(request):
    return HttpResponseRedirect(reverse('weather'))
