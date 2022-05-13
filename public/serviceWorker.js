const cacheName = "cache-version";
const urlToCache = ["index.html","offline.html", "favicon.png","App.js","img/esewa.png","img/googleIcon.png","img/Login-illustration.svg"];

//install

const self = this;
self.addEventListener("install",(e) => {
    e.waitUntil(
        caches.open(cacheName)
        .then((cache) => {

            console.log("opened cache",cache)
            return cache.addAll(urlToCache);
        })
        .then(self.skipWaiting())
        .catch((err) => console.log("installation error", err))
    )
})


// self.addEventListener("activate",(e) => {
//     console.log("activate",e)
//     const cacheLists = [];
//     cacheLists.push(cacheName);
//     e.waitUntil(
//         caches.keys()
//         .then((cacheNames) =>
//             {
//                 return cacheNames.filter((cacheName ) => !cacheLists.includes(cacheName))
//             })
//         .then(cacheToDelete => {
//             return Promise.all(cacheToDelete.map(deleteCache => {
//                 return caches.delete(cacheToDelete)
//             }))
//         })
//         .then(() => self.clients.claim())
//     )
// })

self.addEventListener("fetch",(e) =>{
    if(e.request.url.startsWith(self.location.origin)){
            e.respondWith(
                caches.match(e.request).then(cachedResponse =>{
                    if(cachedResponse) return cachedResponse
                    return caches.open(urlToCache)
                    .then(cache =>{
                        return fetch(e.request)
                        .then(response => {

                            return cache.put(e.request, response.clone())
                            .then(() => {
                                return response;
                            })
                        })
                    })
                })
                
            )
    }    
})





//fetch
// self.addEventListener("fetch",(e) => {
//     if (!(e.request.url.indexOf('http') === 0)) return; 

//     e.respondWith(
//         caches.match(e.request)
//         .then((res) => {
//             if(res){
//                 return res
//             }
//                 return fetch(e.request)
//                 .then((res) => {
//                     if(!res || res.status !== 200 || res.type !== "basic"){
//                         return res
//                     }
   
//                     // var resToCache =  res.clone();
//                       caches.open(cacheName)
//                     .then((cache) => {
//                        return cache.put(e.request.url, res.clone()
//                          .then(() => {
//                              return res

//                          })    
//                         );
//                     })
//                 })
//                 .catch(() => caches.match("offline.html"))
//         })
//     )
// })

self.addEventListener("activate",(e) => {

    const cacheLists = [];
    cacheLists.push(cacheName);
    e.waitUntil(
        caches.keys(cacheName)
        .then((cacheNames) =>  Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheLists.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
})


self.addEventListener("sync",(e) => {
    console.log(e)
    if(e.tag == "bgSync"){
        e.waitUntil(
            console.log('bg')
        )
    }
})
