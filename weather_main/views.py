import os
import requests
import datetime

from django.shortcuts import render, HttpResponseRedirect, reverse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django import forms
from django.http import QueryDict
from rest_framework.response import Response
from rest_framework import viewsets

from .forms import LogInForm, SignUpForm
from .models import Cart, Product, LocationList
from .serializers import CartSerializer, LocationListSerializer

location_IQ_Key = os.environ.get('LOCATIONIQ_KEY')

# Create your views here.
def index(request):
    return render(request, 'weather_main/index.html')

def weather(request):
    # To save space in rows, carts should expire after two days
    # This checks for two-day-old carts and deletes them
    # When payment is sorted out, the cart should instead be deleted in the payment view
    two_days_ago = datetime.date.today() - datetime.timedelta(days=2)
    old_carts = Cart.objects.filter(created__lte=two_days_ago)
    if old_carts:
        for cart in old_carts:
            cart.delete()

    # HTTP to HTTPS redirect
    if request.is_secure() or 'http://localhost' in request.build_absolute_uri():
        proUser = False
        paidUser = False

        if request.user.is_authenticated:
            accepted_names = ['Atmocast Pro (monthly subscription)', 'Atmocast Pro (annual subscription)']
            paidUser = True

            for name in accepted_names:
                if Product.objects.filter(name=name).exists():
                    product = Product.objects.get(name=name)
                    if request.user.id in product.users:
                        proUser = True
                        break
                        for l in LocationList.objects.all():
                            if request.user.id != l.user.id:
                                print(l.id)
                                loc_list = LocationList.objects.create(user=request.user)
                                LocationList.save()


        return render(request, 'weather_main/weather.html', { 'proUser': proUser, 'paidUser': paidUser })
    else:
        return HttpResponseRedirect('https://atmocast.com/weather/')

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

class CartViewSet(viewsets.ViewSet):

    def list(self, request, id):
        cart = Cart.objects.get(id=id)
        serializer = CartSerializer(cart)

        return Response(serializer.data)

    def update(self, request, id):
        cart = Cart.objects.get(id=id)
        serializer = CartSerializer(cart)

        for i in cart.products.all():
            cart.products.remove(i)

        # Get the 'products' URL parameter passed in with AJAX
        # request.body is a bytecode, which requires UTF-8 decoding to convert to a string literal of the params object
        # The string literal is then converted to an object using eval()
        products = eval(request.body.decode('utf-8'))['params']['products']

        # Check which products selected by the user match products in Product model and add those product objects to Cart's products

        # p is a dictionary, set as a JavaScript object in the template as an argument for the addToCart() function
        for p in products:
            match_product = Product.objects.filter(name=p['name'])
            # match_product is a queryset, therefore match_product[0] is the actual product
            if match_product:
                cart.products.add(match_product[0].id)
                cart.price += match_product[0].price

            cart.save()

        request.session['cart_products'] = []

        for p in cart.products.all():
            request.session['cart_products'].append(p.id)

        return Response(serializer.data)

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
    # Create an empty Cart object which is used in the template for AJAX request
    cart = Cart.objects.create(price=0.0)
    cart.save()

    # if request.method == 'POST':
    #     # return HttpResponseRedirect(reverse('create_account'))
    #     if 'repeat_password' in request.POST:
    #         sign_up_form = SignUpForm(request.POST)
    #     else:
    #         log_in_form = LogInForm(request.POST)
    #
    #     if request.user.is_authenticated:
    #         cart_items = cart.objects.all()
    #         for c in cart_items:
    #             print(c)
    #             c.product.users.append(request.user.id)

    context  = {
        'products': Product.objects.all(),
        'stage': 'choose_plan',
        'cart': cart,
        'log_in_form': log_in_form,
        'sign_up_form': sign_up_form,
    }

    return render(request, 'weather_main/choose_plan.html', context)

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
                for p in Product.objects.all():
                    if no_products and not user.id in p.users:
                        # Prevents the following error message from duplicating
                        if len(log_in_form.errors.as_data()) == 0:
                            log_in_form.add_error(None, 'Only paid users may log in. Please upgrade before proceeding.')

                    else:
                        if add_products:
                            user_products = request.session['cart_products']
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
                user_products = request.session['cart_products']
                for i in user_products:
                    product = Product.objects.get(id=i)
                    product.users.append(user.id)
                    product.save()

            login(request, user)

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

def not_found(request):
    return HttpResponseRedirect(reverse('weather'))
