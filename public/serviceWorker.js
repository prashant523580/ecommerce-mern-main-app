const cacheName = "cache-version";
const urlToCache = ["index.html","offline.html", "favicon.png"];

//install


self.addEventListener("install",(e) => {
    e.waitUntil(
        caches.open(cacheName)
        .then((cache) => {

            // console.log("opened cache",cache)
            return cache.addAll(urlToCache);
        }).catch((err) => console.log("installation error", err))
    )
})

//fetch
self.addEventListener("fetch",(e) => {
    if (!(e.request.url.indexOf('http') === 0) || !(e.request.url.indexOf('https') === 0)  ) return; 
    // if (!(e.request.url.indexOf('http') === 0) ) return; 

    e.respondWith(
        caches.match(e.request)
        .then((res) => {
            if(res){
                return res
            }
                return res || fetch(e.request)
                .then((res) => {
                    //check if we recieved a valid response
                    if(!res || res.status !== 200 || res.type !== "basic"){
                        return res
                    }
                    //important: clone  the response . a response is a stream
                    //and because  we want the browser to consume the response
                    //as well as the  cache  consuming the response we need 
                    //to clone it  so we have two stream
                    var resToCache =  res.clone();
                    caches.open(cacheName)
                    .then((cache) => {
                        cache.put(e.request.url, resToCache);
                        return res
                    })
                })
                .catch(() => caches.match("offline.html"))
        })
    )
})

self.addEventListener("activate",(e) => {
    console.log("activate",e)
    const cacheLists = [];
    cacheLists.push(cacheName);
    e.waitUntil(
        caches.keys()
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




// fetch event
// self.addEventListener('fetch', evt => {
    // check if request is made by chrome extensions or web page
    // if request is made for web page url must contains http.
    // if (!(evt.request.url.indexOf('http') === 0)) return; 
    // skip the request. if request is not made with http protocol
  
//     evt.respondWith(
//       caches
//         .match(evt.request)
//         .then(
//           cacheRes =>
//             cacheRes ||
//             fetch(evt.request).then(fetchRes =>
//               caches.open(dynamicNames).then(cache => {
//                 cache.put(evt.request.url, fetchRes.clone());
//                 // check cached items size
//                 limitCacheSize(dynamicNames, 75);
//                 return fetchRes;
//               })
//             )
//         )
//         .catch(() => caches.match('/fallback'))
//     );
//   });
  
//   // cache size limit function
//   const limitCacheSize = (name, size) => {
//     caches.open(cacheName).then(cache => {
//       cache.keys().then(keys => {
//         if (keys.length > size) {
//           cache.delete(keys[0]).then(limitCacheSize(name, size));
//         }
//       });
//     });
//   };
  
  