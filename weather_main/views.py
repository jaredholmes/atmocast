from django.shortcuts import render, HttpResponseRedirect, reverse, HttpResponse

# Create your views here.
def index(request):
    # return HttpResponse(request.build_absolute_uri());
    if request.is_secure() or 'http://localhost' in request.build_absolute_uri():
        return render(request, 'weather_main/index.html')
    else:
        return HttpResponseRedirect('https://atmocast.com')

def not_found(request):
    return HttpResponseRedirect(reverse('home'))
