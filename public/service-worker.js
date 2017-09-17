"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","5044ae22b06929f8214b608d2dd0aa8b"],["service-worker.js","63c750f75ee78cb6c68dbccc374ef488"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/css/app.ed975dd426dfee53fbc3942c0a4e93db.css","dc4c886cac46e4365d5ea887ed19cb4b"],["static/js/0.16ce01739985dfa6fc61.js","1f75992f7975f2eab4419a1844d05048"],["static/js/1.168e04566bef21451248.js","84bc25a332e3ab6fa95bc1781103a740"],["static/js/10.ef844abc4d87ee48f899.js","5e9c6c09499ed2e348291eba44abe9ff"],["static/js/11.8055bc64e89b462ccb53.js","d378628e2deb69d431649b3f922603cc"],["static/js/12.9ea9d5c9b9934d3d4e7d.js","9b2487e762d1c2de0990160279cc9f53"],["static/js/2.ee3b5d194c7da2e45a32.js","c4c1c65c704e83c791ea406038c7b6f6"],["static/js/3.b119cfeeb3ee861728c3.js","6d555d10cb168f801e682eeb07091844"],["static/js/4.b56a2970d6fc50736c6b.js","337142029424954fa970bfc2e1eaee76"],["static/js/5.c50f3c2fc6e36fb67117.js","f9005208f35568c7df6cdfc954fd000e"],["static/js/6.bac07ee9257615f1ac43.js","45d36b183f607afa3526699d18e74687"],["static/js/7.f562fd2c3524e2bc2145.js","bbd072d5e1ec62b8155bdb070c694574"],["static/js/8.402bae9b41d517d36371.js","1fdbf6a58c85af19267632ee10ba3a52"],["static/js/9.25d09cfe38c36299aafc.js","9d0704a6b43130d78b02adbb407c8c6a"],["static/js/app.15e86b733e9cdcdc4bcb.js","b926d26f5e3a23844757c6ac35e80660"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.85622196843afa4894d4.js","f79af1a20aa0b987d7c0a425ca9e1db9"],["static/js/vendor.ce0507066ccc64135743.js","aa2684e3650a185b10bae34f98201523"],["static/js/vendor.dll.js","4fd04108269e671885848d88018285a3"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),s.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),s=createCacheKey(c,hashParamName,a,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var c=new Request(a,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});