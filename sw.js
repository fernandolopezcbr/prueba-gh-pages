;
const CACHE_NAME = 'v1_cache_sitio_favoritos',
urlsToCache=[
    './',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css',
    './src/style.css',
    './script.js',
    './images/img-1.jpg',
    './images/img-11.png'
]

self.addEventListener('install', e=>{
e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>{
        return cache.addAll(urlsToCache)
        .then(()=>self.skipWaiting())
    })
    .catch(err => console.log("Fallo registro de cache",err))
)
})

self.addEventListener('activate', e=>{
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cachesNames =>{
            cachesNames.map(cacheName =>{
                if(cacheWhitelist.indexOf(cacheName)=== -1){
                    return caches.delete(cacheName)
                }
            })
        })
    )
    .then(()=> self.clients.claim())

})

self.addEventListener('fetch', e=>{

    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res){
                return res
            }

            return fetch(e.request)
        })
    )

})
