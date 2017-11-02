"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","3bdf6659f2f9d8188c1bcf9539adeb3a"],["service-worker.js","6811b4f8aa3d7daaf23bccfa0a906490"],["static/css/app.427374082b5903df109434418d4ec331.css","cfd56f2644b20ee74156e24d8bab9af5"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/js/0.bd4f959d1d85cb57204d.js","1dc1c3d813df415f106aaa0f1585d79f"],["static/js/1.6b33231baec43fe6396f.js","5aa0fcbb03bb58be12ba052ab2f0c63b"],["static/js/10.e528736081eb03298271.js","60a7124a0faed1d7371bb8413400feed"],["static/js/11.e849842f2863b92770a3.js","05da2c6a3121a63917fc0eeb58539af2"],["static/js/12.15f25ded8f06f4752eb0.js","84e79316206616957a104711cba9a5bf"],["static/js/13.3eb05dc359e4c5c05486.js","fe07efbd623ffcecdb012debe6405c7f"],["static/js/14.f9a72f0e4692eab7a304.js","fb92cf16ec5d45d738a25f5197097099"],["static/js/2.44ccdafbb22b9199c2c4.js","9adee991589b6a6886e04e894e39a1e5"],["static/js/3.849bf3c5660fc666a2cb.js","5d1ee05525a83b460a2b13b24cdcd5f7"],["static/js/4.710be10f2703b2901363.js","1868eae9fd5d4c532fef133ceebe24ac"],["static/js/5.78bbb1ce90596478507f.js","a8e08d24c599bb91e637c4f19914651f"],["static/js/6.5b470a58ca460e60d666.js","61560d86660763fa60ccfd269c744643"],["static/js/7.080e8b83d3de7b6ffc80.js","4f503c06f5e95b116ec9620d20c7a136"],["static/js/8.b3b0354ee829e565b36c.js","26cb197446e706f512fa89f204155ea2"],["static/js/9.593a589333a1e19a9bc4.js","58335d76eeda6d77cf5f5d897271a891"],["static/js/app.cf1fc9dd6f8ca812e717.js","b7740c3a4a5ac197886b3abc18eddcd9"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.8333822a80e515d299d9.js","e376e7f59b1d7f066d5744dca1d7258d"],["static/js/polyfill.min.js","868eefa71408a0f3f61c490810fc4568"],["static/js/vendor.069ddf7f570c56c02b08.js","ea2b3ba75f3621458e89833a5e2e3c32"],["static/js/vendor.dll.js","adea34afb01e28f10c32ee48a67da027"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),s=createCacheKey(c,hashParamName,t,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});