"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","3c805acd195c1f3868f457fcc1cf3713"],["service-worker.js","e869272a8bbc178e9a04a0c6947f9856"],["static/css/app.74857a38cd385643b705109d5b58bd0a.css","bafb8edaa79673a042cf39d8c6ee45c1"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/js/0.3cb11cb20ce200a29d8c.js","f790fa24be8caff4cbf5bb2a2504090c"],["static/js/1.f378f706727008b85101.js","efaf9282d3785fc7e4be6f78863b2e6a"],["static/js/10.2b7b118026182301e431.js","31762b1e3ef79236973249930cfd706e"],["static/js/11.9bfdb92948dfefd091d1.js","1ca7214a443c41bf7c3d38ec94f6fba0"],["static/js/12.677d4ed9295f4945a2cd.js","4f6bb2f19e74d18f1e5d163aa8ba13d4"],["static/js/13.640c5dba8e9f081f25bd.js","f8b45c8f62c124fa30946b614db30d75"],["static/js/14.f4f086ed5f49e4861c0d.js","561357b795f7e64f040c1f6bbc773db2"],["static/js/15.56b1b857790030e30581.js","2911b0929270b83a7f5c8b6189037b23"],["static/js/16.409fd4e652a9b525adc6.js","6faa12c2f25ead8682542d156947d76b"],["static/js/2.1a260b13a970741c28e8.js","f3771a63d8fbc4f9a7ebcfa44ada60db"],["static/js/3.dcfa9279b7da9d03b6dd.js","158dc9f4058dff86362722ac0f7cbea3"],["static/js/4.6007a15a8c64ede01a0c.js","d45f254916747b4226c5810f1eadb600"],["static/js/5.ce8ea7c3a6590d46e3f7.js","8dad8b097092427c74429b3be083d9a4"],["static/js/6.727ef0d35d738d83dd6c.js","97bbd591e74dd6fe52f06d00b870e6d5"],["static/js/7.3b9e886ed18caf717ec6.js","b438aa094d5ac445f2559ef8d2b13b19"],["static/js/8.016dd1a54bd61c2404bb.js","ad96cf6944bb103eb8b6cb61c3022ef7"],["static/js/9.d09fabd47a7694ed835a.js","3a2ac437b1f830d90c2fbc75646a3c5b"],["static/js/app.c34a427dcda3ddfa62df.js","008f2945312eabf1c577b9e0eaabe5e5"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.b2fbd7f5b395bf0cfe54.js","c1c59bd65393d411830f5c108983a1b8"],["static/js/polyfill.min.js","868eefa71408a0f3f61c490810fc4568"],["static/js/vendor.dll.js","adea34afb01e28f10c32ee48a67da027"],["static/js/vendor.fa5c0a90587657edb99c.js","6d092cc666de9b0485b94e9c383251c9"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),s=createCacheKey(c,hashParamName,t,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});