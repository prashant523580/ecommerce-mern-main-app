const cacheName = "cache-version";
const urlToCache = ["index.html","offline.html", "favicon.png","account/orders"];

//install


self.addEventListener("install",(e) => {
    e.waitUntil(
        caches.open(cacheName)
        .then((cache) => {

            console.log("opened cache")
            return cache.addAll(urlToCache);
        }).catch((err) => console.log("installation error", err))
    )
})

//fetch
self.addEventListener("fetch",(e) => {
    e.respondWith(
        caches.match(e.request)
        .then(() => {
                return fetch(e.request)
                .catch(() => caches.match("offline.html"))
        })
    )
})

self.addEventListener("install",(e) => {
    const cacheLists = [];
    cacheLists.push(cacheName);
    e.waitUntil(
        caches.keys()
        .then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheLists.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
})
