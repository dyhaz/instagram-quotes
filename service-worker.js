const CACHE_NAME = "firstpwa-v6";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/loading.html",
    "/pages/news.html",
    "/assets/css/materialize.min.css",
    "/assets/css/custom.css",
    "/assets/js/materialize.min.js",
    "/assets/js/nav.js",
    "/assets/js/api.js",
    "/assets/images/logo.png",
    "/assets/images/quote.png",
    "/assets/images/blog-1.jpg",
    "/assets/images/blog-2.png",
    "/manifest.json",
    "/icon.png",
    "/assets/font-awesome/css/font-awesome.min.css",
    "/assets/font-awesome/fonts/FontAwesome.otf",
    "/assets/font-awesome/fonts/fontawesome-webfont.eot",
    "/assets/font-awesome/fonts/fontawesome-webfont.svg",
    "/assets/font-awesome/fonts/fontawesome-webfont.ttf",
    "/assets/font-awesome/fonts/fontawesome-webfont.woff",
    "/assets/font-awesome/fonts/fontawesome-webfont.woff2"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
