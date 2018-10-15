import os

from django.shortcuts import render, HttpResponseRedirect, reverse, HttpResponse
import requests

location_IQ_Key = os.environ.get('LOCATIONIQ_KEY')

# Create your views here.
def index(request):
    if request.is_secure() or 'http://localhost' in request.build_absolute_uri():
        return render(request, 'weather_main/index.html')
    else:
        return HttpResponseRedirect('https://atmocast.com')

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

def not_found(request):
    return HttpResponseRedirect(reverse('home'))
