"use strict";var precacheConfig=[["index.html","a91effe1d910a7109e5dfa465ece3a02"],["service-worker.js","6422afb4570a3c74ced6a381f633702f"],["static/css/0.7e608deb8ca1e07a9af0.css","789200d9d3ddba9c85259b930133e82f"],["static/css/1.2dce9e93e53f40305bb1.css","1815141a1dcd1955b2d3e87353b4e539"],["static/css/2.574957f464c5fefd2fc4.css","e5e8b516065f8ea642f1f635e3f8d856"],["static/css/app.768840557b5d9b958166.css","7fcc7e17a7412c40088a7d071a4112ca"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/js/0.2b81ed1bfaff910782ce.js","3e1252e96381d01e99b2b99961d91c70"],["static/js/1.b82b7b540506dbdf84a7.js","004da92afc7fb785546627444aa386d2"],["static/js/2.f75a7eaaeb9a5acc09f9.js","fcc31dafd838b8dc3a742f667b066e50"],["static/js/3.3b744c8bdd46d9073aa1.js","27c4527ff5a3b87059c6290564c51dc0"],["static/js/4.46eb5048d3ff7d19aa46.js","b75138cc49d97cad995a33912f818f7c"],["static/js/app.d07821b5f9a04103dce6.js","5f831a04a13744a0e310fed12e2f375c"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/polyfill.min.js","868eefa71408a0f3f61c490810fc4568"],["static/js/vendor.dll.js","e5005e24024f96f11b86a7ced9427fcd"]],cacheName="sw-precache-v3-your-app-name-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,!1);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});