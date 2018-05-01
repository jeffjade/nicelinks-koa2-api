"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","b0db4ef23f54175b10cefc8b898a943b"],["service-worker.js","9fcb945e08b83bc7142fc51c48816bd7"],["static/css/app.5df1d95e60e023b6bcdc31d95544bbfc.css","7e65271c63d4ae1c546e95719805f53c"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/js/0.02dfcb05ff3cb43d5b6b.js","d3684b267dacbd52ff6dda659c18128a"],["static/js/1.7f68422f09ab892222e0.js","b6869cd96834ea7d1ed4f8d2dc6970be"],["static/js/10.22cc7a28d3f146df6f8f.js","cb0e5eecacefd9c4caefe8675dca32ac"],["static/js/11.ef52a3fbc0c166134681.js","eb476ca26af7e6217ff93694aeedfb1e"],["static/js/12.24e8f649227992ab74d3.js","c5f84b3de2b0fd3a8ed4ff930df4be99"],["static/js/13.44e0328f08e135391701.js","9553ca39ded7ba4c1874d09ef58d3d94"],["static/js/14.2042bec18b81445d571d.js","94821b1143a22ad4daa1fdf1560071f7"],["static/js/15.63458d563659b0dfaaa6.js","c094a28879c89dbc1c06cdfe4f4b6600"],["static/js/16.da7c050c3e8923b72707.js","6e42f71bc81782bc8d7a155520d5607a"],["static/js/2.8115576220f9c49f4693.js","4fb2e5d7e1b925d3ae8fd164ad15eacc"],["static/js/3.2307e23a04b07e693c41.js","250d3ecb5d04d6cbb630c350b61fbfbd"],["static/js/4.9893b09c680192626d57.js","0bb9cb86dbde7658d32e2ca37473d397"],["static/js/5.3674a5c8cf1d861681a3.js","791c256d64bb62caec975115af90e208"],["static/js/6.8d5a7fb8484acc693f9d.js","eaab2fd6372c2e0ea7e1ca5236542812"],["static/js/7.0cf2a0ffcf1f775a563c.js","d27b611bef34e67edbb7d349e65914b7"],["static/js/8.e09a4f28fd29b4c4d1ca.js","e1513643edce6c819485dde9d2234cc6"],["static/js/9.2050ad10290852b6cbc3.js","3255451981926f8bd1916ede631242b8"],["static/js/app.d45bd574f456398fb810.js","bb3f6d8379b45e91060819ddb169d96a"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.9d17d85c2792ab9209b6.js","23241d9240d93df5133a67ee269d447e"],["static/js/polyfill.min.js","868eefa71408a0f3f61c490810fc4568"],["static/js/vendor.80d8549efe74ee2d31f5.js","5faab7f5802048cc410f2031254e31c5"],["static/js/vendor.dll.js","a90d02dd10edd57b614d75c864702ac8"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),s.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),s=createCacheKey(c,hashParamName,a,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var c=new Request(a,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});