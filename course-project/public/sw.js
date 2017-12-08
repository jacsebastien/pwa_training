// access to the service workers with "self"
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing Service Workers ...', event);
    // wait until caches has finished before continuing because caches is a promise to avoid continuing before it's done
    event.waitUntil(
        // open a new cache if exists or create a new one and name it like we want
        // give version number to cache and update it each time the application's code is edited to force refresh
        caches.open('static-v2')
        .then((cache) => {
            console.log('[Service Worker] Precaching App Shell');
            // add path to the files that need to be stored in the cache (relative from web root file)
            cache.addAll([
                '/', // cache request (index is accessible with root path)
                '/index.html',
                '/src/js/app.js',
                '/src/js/feed.js',
                '/src/js/promise.js',
                '/src/js/fetch.js',
                '/src/js/material.min.js',
                '/src/css/app.css',
                '/src/css/feed.css',
                '/src/images/main-image.jpg',
                'https://fonts.googleapis.com/css?family=Roboto:400,700',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
            ]); 
            // cache.add('/index.html');
        })
    );
});

// need to close the tab or unregister to activate sw
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating Service Workers ...', event);
    // to be sure that service workers are activated correctly and will not failed
    return self.clients.claim();
});

// triggered each time page try to load resources (css/script/images) 
// or when we manually send fetch request from js
self.addEventListener('fetch', (event) => {
    // intercept fetch event and override it
    event.respondWith(
        // fetch data from cache if available
        // caches refer to the all chache storage
        // the key of cache is a request
        caches.match(event.request) 
        .then((response) => {
            // response = null if no cache found
            if(response) {
                // get it from cache if exists
                return response;
            } else {
                // if not found, continue with original network request
                return fetch(event.request)
                .then(res => {
                    // dynamic store request in cache
                    return caches.open('dynamic')
                    .then(cache => {
                        // res is instant consumed so it will be null, 
                        // use clone to get an clone of it with all data
                        cache.put(event.request.url, res.clone());
                        // return original res anyway
                        return res
                    })
                })
                .catch(error => {
                    
                });
            }
        })
    );
});