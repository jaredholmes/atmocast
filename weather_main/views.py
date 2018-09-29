from django.shortcuts import render, HttpResponseRedirect, reverse

# Create your views here.
def index(request):
    return render(request, 'weather_main/index.html')

def not_found(request):
    return HttpResponseRedirect(reverse('home'))
