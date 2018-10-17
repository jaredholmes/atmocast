// Straight from pwabuilder.com
//This is the "Offline page" service worker

//Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener('install', function(event) {
  var offlinePage = new Request('offline.html');
  event.waitUntil(
    fetch(offlinePage).then(function(response) {
      return caches.open('pwabuilder-offline').then(function(cache) {
        // console.log('[PWA Builder] Cached offline page during Install'+ response.url);
        return cache.put(offlinePage, response);
      });
  }));

  event.waitUntil(
    caches.open('atmocache')
      .then(cache => {
        return cache.addAll([
          // Bundles
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/bundles/app.bundle.js',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/bundles/spinnerStyles.bundle.js',
          // Images
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons/logo-small.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons/close-dark.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons/close-light.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons/delete.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons/heart-filled.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons/heart-outline.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons/location.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons/menu.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons/search.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/clear-day-large.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/clear-day-small.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/clear-night-large.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/clear-night-small.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/cloudy-large.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/cloudy-small.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/fog-large.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/fog-small.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/partly-cloudy-day-large.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/partly-cloudy-day-small.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/partly-cloudy-night-large.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/partly-cloudy-night-small.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/rain-large.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/rain-small.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/sleet-large.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/sleet-small.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/snow-large.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/snow-small.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/wind-large.png',
          'https://atmocast.com/static/weather_main/www/static/weather_main/dist/icons//custom/wind-small.png',
        ])
      })
  );
});

//If any fetch fails, it will show the offline page.
//Maybe this should be limited to HTML documents?
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function(error) {
      // console.error( '[PWA Builder] Network request Failed. Serving offline page ' + error );
      return caches.open('pwabuilder-offline').then(function(cache) {
        return cache.match('offline.html');
      });
    }
  ));
});

//This is a event that can be fired from your page to tell the SW to update the offline page
self.addEventListener('refreshOffline', function(response) {
  return caches.open('pwabuilder-offline').then(function(cache) {
    // console.log('[PWA Builder] Offline page updated from refreshOffline event: '+ response.url);
    return cache.put(offlinePage, response);
  });
});
