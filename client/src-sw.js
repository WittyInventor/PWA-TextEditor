const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// asset caching- means storing all the files, images, css, other codes in the devices, browsers etc.

registerRoute(
  //  define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  // destination means where exactly in those project files.
  // script means javascript, style means css, worker means service worker file - src-sw.js - could be called something else in other projects. 

  new StaleWhileRevalidate({
    // Name of the object: cache storage.
    // StaleWhileRevalidate means the files will stay the same until the below of 30 days of maximum age. 
    cacheName: 'asset-cache',
    plugins: [
      // This plugin will cache responses with these headers to a maximum-age of 30 days.
      // the plugin helper will keep the cache/storage information for 30 days. After 30 days it will keep the same or keep up the updates of the next 30 days from that specific files in cache/storage which is where the plugin is helping.analogy lawn management

      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// CacheableResponsePlugin statuses - 0 means its been opened. 200 means the requests for files have been received and accepted.  
