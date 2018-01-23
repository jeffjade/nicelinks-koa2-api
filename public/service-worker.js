"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","9aeb38896eb887e5945125b9b6dec490"],["service-worker.js","04342a6d042796a4d54e8913747dd6ff"],["static/css/app.54a980d1e492ba09628dae46e3781278.css","391282861f2b91c870d5bd472eabf255"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/js/0.566712210d54903ea032.js","3ebcbda3b2ac019ab64c337bf2d0221f"],["static/js/1.ddb8f3ea1568d6329832.js","e4a5286913e17643d98fcb73e2881d01"],["static/js/10.e679434a6624c13e22c1.js","b9b11566731673edcf447f641fc2beb0"],["static/js/11.22b65b07191a592dc3d7.js","36420a6e9b9f488d79c04c2a0d497d3e"],["static/js/12.f18e0b4b9a98ca491ca7.js","2aaba257257a40710ca0aa2288717979"],["static/js/13.55a371064cf9da8df66a.js","a5651f330803f8f080b16da537abed17"],["static/js/14.74c05a8d958e0a29e69b.js","b55b04488ad1f5b76bc9bbbe07d9e82b"],["static/js/15.66d3ce671cf3c84ac378.js","03524f5b67e93aba293ac1f341df10f3"],["static/js/16.fa5b9ee6a241f7b21c2d.js","70a85ac2c93e399672d33d5528b92968"],["static/js/2.17261a8080c5f6e9e8da.js","5c62bd9971b5527470779bdefad0b9c1"],["static/js/3.79663ba003eb0e6147b8.js","f6ab76e07ac7dae29a85c4c93d0a2c97"],["static/js/4.cc6abb5c877b4a6241cd.js","8f74c6dde061995d3db04ecada3c4b7d"],["static/js/5.7bb7c4cfc5549d4cde54.js","cac32e7d3f2018f4c29690a88374c665"],["static/js/6.05e5b5257181521fced5.js","fca66c4b0aff93d51d94a966477c7321"],["static/js/7.b5f7280247b1f4a37cf7.js","94e5c65765309bb00ea1051799342c3a"],["static/js/8.d737521f8b15ac9ca891.js","0cf634e0a86a72c2fa4d86c61599cafc"],["static/js/9.5e76c9699ae62104f083.js","32b2c0ec5be33b3985b26463110ad17f"],["static/js/app.ec0dca953365a62e2734.js","89cc9ab428716e6c92c9771dc96e9f10"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.76b6174b2624693a5615.js","59dbdfe7d0ed0bc0052cc6acc78d0ac0"],["static/js/polyfill.min.js","868eefa71408a0f3f61c490810fc4568"],["static/js/vendor.619be3d1983116062fad.js","0a6644883427a1db53bd86aaa91c38e0"],["static/js/vendor.dll.js","adea34afb01e28f10c32ee48a67da027"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),s=createCacheKey(c,hashParamName,t,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});