from django.shortcuts import render, HttpResponseRedirect, reverse, HttpResponse
import requests

# Create your views here.
def index(request):
    if request.is_secure() or 'http://localhost' in request.build_absolute_uri():
        return render(request, 'weather_main/index.html')
    else:
        return HttpResponseRedirect('https://atmocast.com')

def weather_data(request, lat, lon):
    if lat and lon:
        darkSkyURL = 'https://api.darksky.net/forecast/c11e01133c18e01ad3d20c3aeb1a9218/' + lat + ',' + lon
        darkSkyParams = { 'exclude': 'currently,minutely,alerts,flags' }
        response = requests.get(darkSkyURL, params=darkSkyParams)
    else:
        response = 'Invalid co-ordinates given in request.'

    return HttpResponse(response)

def not_found(request):
    return HttpResponseRedirect(reverse('home'))
