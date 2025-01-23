const filesToCache = [
    	'./',
      './kurt.html',
      './main.js',
      './aux.js',
      './Passenger.js',
      './Boat.js',
      './style/kurt.css',
      './favicon.png',
      '../json/manifest.json',
      '../images/kurt/boat.png',
      '../images/kurt/goat.png',
      '../images/kurt/cabbage.png',
      '../images/kurt/farmer.png',
      '../images/kurt/wolf.png'
 ];

const staticCacheName = 'bridge-v1.5';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request)

			.then(response => {
				return caches.open(staticCacheName).then(cache => {
					cache.put(event.request.url, response.clone());
					return response;
				});
			});

    }).catch(error => {})
  );
});

self.addEventListener('activate', event => {

  const cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
