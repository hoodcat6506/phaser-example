const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  './',
  './dist/main.js',
  './assets/images/particles/blue.png',
  './assets/images/skies/space3.png',
  './assets/images/sprites/phaser3-logo.png',
];

self.addEventListener('install', installHandler);
self.addEventListener('fetch', fetchHandler);

/**
 * Service Worker install handler
 *
 * @param {Event} event
 */
function installHandler(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }).then((result) => console.log('Caching success: ', result)),
  );
}

/**
 * Service Worker fetch handler
 *
 * @param {Event} event
 */
function fetchHandler(event) {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      }),
  );
}
