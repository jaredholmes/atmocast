from django.shortcuts import render, HttpResponse

# Create your views here.
def index(request):
    return render(request, 'weather_main/index.html')

def not_found(request):
    return HttpResponse('Not found')
