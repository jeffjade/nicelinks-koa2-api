"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","b0eccd8b5dcede2ceab3f0b9cc77bf88"],["service-worker.js","13eedc4114d9af683ccd69c211b1bc0f"],["static/css/app.9f16db5a7773812259ffaa84089353b1.css","b188b345a2bc45c5f54db27525251279"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/js/0.234a61e46736b6cec36a.js","febd56a8567ec85730ca7b5edb7a7532"],["static/js/1.f8c77631ddd734187e26.js","d2b4c3e0b592272cea2aeef85b9ed9ee"],["static/js/10.1bc347f1591941cec6ae.js","24fdec2a83f19ca09de22d4213b8b301"],["static/js/11.d356dc707f2180dc39e0.js","7d317290e96c4e8944bfd08a74909f22"],["static/js/12.00878920f4e5dbdf3b5e.js","f5bf07414847be9a033b25e3f35dfa01"],["static/js/2.94c85014072dfd3eecf1.js","e405b763fa3c674f627cc7776e84b91d"],["static/js/3.719d1d8654e1e566f145.js","7a8a8cde630b9819d4dabd762f48c8ac"],["static/js/4.dd75d019f90496fdedd2.js","1ed8803c88ac3721b4f588e0fa2e4152"],["static/js/5.a9d66f2af910b45b70ad.js","4d7070acf1efece97ee0b65e6f93152a"],["static/js/6.1ade881d945fe09de623.js","f18fe717a9940760a1feef5df376459e"],["static/js/7.3996171bbff962edac29.js","c23c1bb51d6ac21712764ec99fac49e3"],["static/js/8.7a0901447ebf03cccafa.js","6c06d158a171fb3d1f9c1e052c817ed1"],["static/js/9.8e683f3d8af25f7fa140.js","25406cb6e5412491897ab0779f5b2717"],["static/js/app.618511e0716cfebebc37.js","7268b0aef631411d8792e15662d3ead0"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.5de25a5f4f7961b9a870.js","f2e7715520c8eda23104bf7f2ac7b06e"],["static/js/vendor.54a8976121486346f939.js","6deab8d1348ea29c2d7c6651a9fcb8ad"],["static/js/vendor.dll.js","4fd04108269e671885848d88018285a3"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),s.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),s=createCacheKey(c,hashParamName,a,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var c=new Request(a,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});