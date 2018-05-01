"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","da8d38f6f0dc16f885f2f3a66e2cc5ff"],["service-worker.js","2c9cb89086557b148e0ccfe6ff244e5b"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/css/app.e7921eb2fe91cbcf73d2fb075eea4f69.css","21b64bea7c9c9cbe8061f6bc4da1af6e"],["static/js/0.02dfcb05ff3cb43d5b6b.js","d3684b267dacbd52ff6dda659c18128a"],["static/js/1.7f68422f09ab892222e0.js","b6869cd96834ea7d1ed4f8d2dc6970be"],["static/js/10.22cc7a28d3f146df6f8f.js","cb0e5eecacefd9c4caefe8675dca32ac"],["static/js/11.ef52a3fbc0c166134681.js","eb476ca26af7e6217ff93694aeedfb1e"],["static/js/12.24e8f649227992ab74d3.js","c5f84b3de2b0fd3a8ed4ff930df4be99"],["static/js/13.b6b646872af617090236.js","35f90a28f40e3bb23a070b66a0b2040c"],["static/js/14.525800ebe95bfe68f518.js","03e1880368dfcc93f5f1386841cee84a"],["static/js/15.e557a0609dfba77008f2.js","d851f363968e2b5e488c255eb559bbb2"],["static/js/16.da7c050c3e8923b72707.js","6e42f71bc81782bc8d7a155520d5607a"],["static/js/2.3aad14f4df8970c8a511.js","17396f2fe621e9dd92105c1843608b9d"],["static/js/3.82a8de1299c95070c718.js","1368e459345d19474232bfff7b36c08c"],["static/js/4.453a6e826eb009f143d3.js","02c1f71c1d0a8cc43cf8b8a80d7d0778"],["static/js/5.4b175050af594839b799.js","98bffae46da938dba684108a67cf9051"],["static/js/6.b96ed2238da2f105738c.js","9ecebc05d25afcaae1a846139bebf358"],["static/js/7.ee5b01e37d52fe2faac0.js","59743a691b100719d7af408d31b79453"],["static/js/8.6ffdf5215258bbd2739d.js","83b95ee4ef88caf502a101a5c0c1c6f5"],["static/js/9.0c515a8bd6890da7d0d1.js","9ab051e300099fedf02cb7592cbcf107"],["static/js/app.815c08b55844d9dd0006.js","b5e21f18b81a1dd83644199c08ce0985"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.2d9af6a26cf59d612f2c.js","2b33d482da05fefac63c496a468a3d24"],["static/js/polyfill.min.js","868eefa71408a0f3f61c490810fc4568"],["static/js/vendor.80d8549efe74ee2d31f5.js","5faab7f5802048cc410f2031254e31c5"],["static/js/vendor.dll.js","a90d02dd10edd57b614d75c864702ac8"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),s.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),s=createCacheKey(c,hashParamName,a,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var c=new Request(a,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});