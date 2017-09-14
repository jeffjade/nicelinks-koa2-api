"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","261a6888eba27bee64dfd9c8d2b10add"],["service-worker.js","258c82fc41ae69363c1bd8c500f7b601"],["static/css/app.bc51dc5cd52021113f6040c617e2bc89.css","97f416d7cb84149b27a663694866cfd1"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/js/0.fb78569894707bf8853b.js","440d3ad852415938d30fdf0e81b27867"],["static/js/1.0ced7a959625854c0230.js","7b1615ec4c0232c4d5466490014de513"],["static/js/10.b0f44135c08537737fe9.js","c539be56664e892dbb7c798562b67ed5"],["static/js/11.415e20a7c87409a712a1.js","934e76a4046501f6deadc8757b1af57b"],["static/js/12.7f685df0c27f667ce4fa.js","a2026863430130bee59d4a6ef7f30093"],["static/js/2.135838dc97d7c2092a25.js","471ed83609e5647070adcd1c17f4dd9a"],["static/js/3.520673f18bd75345b178.js","afe4556005a554b46843ebbff1cac9cd"],["static/js/4.9f34ffadf61ea84e7967.js","320e911f341ed9f85c3784f25c52b7dd"],["static/js/5.8cba79249405f0b3018e.js","e114b510f1798a7a9c32e00918bb6168"],["static/js/6.7ada35602badafda8e9e.js","86fb1f09e6f652d88da8215d0e04c760"],["static/js/7.ba4112dbaa4438cab225.js","8cc29de5e0b021bbcd1ebbe3eba49f2b"],["static/js/8.26a74c430545599d3359.js","a1881a93128f69cf12cf9e4e7a3ced95"],["static/js/9.d5461a87cbaffb8a0f08.js","40a443239266d64a3584b2451a5d2d84"],["static/js/app.85a50b15dffaa314fcde.js","8a899da5a7da99cffd5575b229210e40"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.c359a4c06861c8622b59.js","f162ed28eae9cdd4bb62ebe101172e6b"],["static/js/vendor.9236adbd7e9ef5c95041.js","462ecf8a463d54031366d9942250e6b5"],["static/js/vendor.dll.js","4fd04108269e671885848d88018285a3"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),s.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),s=createCacheKey(c,hashParamName,a,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var c=new Request(a,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});