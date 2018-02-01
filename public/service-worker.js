"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","8a1b34a4260b11184eed884bde29640d"],["service-worker.js","38840179c2bc99d064703bdb743160b6"],["static/css/app.c661ce0b44eaafd7c316ae66216d8cde.css","656fec6abef99a5d6957ed6fb809089e"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/js/0.fcf538c640d61c242e49.js","fec77bd671456b907a43db0bf85d6d86"],["static/js/1.d3df39837f3f83630856.js","55ab25f35cfa25500d97e59b2f58a9b8"],["static/js/10.90249f9b6cdd7b0628b3.js","8a60c876b7de68fd439356270c7321b6"],["static/js/11.62b4e71dc96d7f49615a.js","80f758ae09690982741b85aad1066382"],["static/js/12.91c6a49ba771fb04817c.js","2d3b3e6fc1c52b82501d125fe427518f"],["static/js/13.27579b62e46a2ebcbca8.js","f2fca7665fc26a0cc5817312c9c70e67"],["static/js/14.1582d49d45034828dd59.js","4d8ee9d35367ca2849e27bdcda897e48"],["static/js/15.b9434df3ac0a9c6f5ac1.js","50d027da0d2e3b4d2a7e4ba548cec147"],["static/js/16.e31143bbee902e150497.js","4297375553133dd2d443b437364ca563"],["static/js/17.69a1fd6dd6837ab6f47f.js","c171a5f50d3cec7d0aa567ee524e56d2"],["static/js/2.09b8f7b190558aa68db7.js","8535c3b48b005ebf58c68661dfc88fb6"],["static/js/3.ed6828d5748bef173583.js","b70982cba10acd9699c839610a208350"],["static/js/4.d93c13d1f11ac59c190f.js","38acbcfb6b3bcd57691ec493af68342e"],["static/js/5.4d10c9dc7020b29ae6ee.js","0f6ccfc63efa999ab451820ef9f410a1"],["static/js/6.41c3aeb635f1267d2a93.js","f34c8083983c0a7392a71feaf330f119"],["static/js/7.13eca1314d28b671c47f.js","037fd0c52baa9e6c32d6dd810f417e01"],["static/js/8.4e338577d848cd081ae8.js","5043f25ed48de4dffaa08532d1dd0a07"],["static/js/9.ecca680b08a91a3aff84.js","20581c884249003b6171a4a55f7334ad"],["static/js/app.fdbc26aed28bbf3ad87d.js","13fd84d203781e784be371f82ef250eb"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.66424c430c653bf5ca42.js","c6e1bc30e30d6fcfcb1a6fc1ffcda764"],["static/js/polyfill.min.js","868eefa71408a0f3f61c490810fc4568"],["static/js/vendor.22e70b0df11a72e18935.js","37cd0405ba388b55b5cd1bedd9f1e21a"],["static/js/vendor.dll.js","adea34afb01e28f10c32ee48a67da027"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),s=createCacheKey(c,hashParamName,t,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});