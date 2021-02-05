const cacheName = 'version-2';
const staticAssets = [
	'./',
	'./index.html',
	'./offline.html',
	'./manifest.json',
	'./static/js/main.beb0aee2.chunk.js',
	'./static/js/2.ac686124.chunk.js',
	'./static/css/main.267c9747.chunk.css',
	'./static/media/bg.7b83f7cd.jpg',
	'./images/manifest-icon-192.png',
	'./images/favicon-196.png'
];

const self = this;

// Install SW
self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

// Activate the SW
self.addEventListener('activate', e => {
  self.clients.claim();
});

// Listen for requests
self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
