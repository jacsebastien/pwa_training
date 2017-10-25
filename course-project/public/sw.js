// access to the service workers with "self"
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing Service Workers ...', event);
});

// need to close the tab or unregister to activate sw
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating Service Workers ...', event);
    // to be sure that service workers are activated correctly and will not failed
    return self.clients.claim();
});

// when html page load resources (css/script/images) or when we manually send fetch request from js
self.addEventListener('fetch', (event) => {
    console.log('[Service Worker] Fetching something ...', event);
    // intercept fetch event and override it
    event.respondWith(fetch(event.request));
});