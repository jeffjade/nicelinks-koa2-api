"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","2d7cf37ffcda8f5c15e06e0585f4549c"],["service-worker.js","d5b2c054aa51159e6e1298c89dd89914"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/css/app.d9c539112b49e5f223de9c6dfa12d62e.css","9ac6ba327bdeaedc97e2a45158d30dfd"],["static/js/0.ac299f34c664b17df316.js","d73b0d01dcc63affce08045be6cabe8d"],["static/js/1.6d7d3151c275ce4442ea.js","7aea2e657eb96708c1f65f26eacc28c8"],["static/js/10.367da406630ecdfa2980.js","2aef68be864fcf7c3c5a1913db2c6582"],["static/js/11.d45be71a29398471ea95.js","b4eb6dd7b395baabb705c4c59525630f"],["static/js/12.6ec31caa1e59388bc71a.js","362cc87b37cadfb88b7e45d845e75ac4"],["static/js/13.be87512719541f0fb731.js","8738351c36057b201de8a0202f326b30"],["static/js/14.0f910784817f823bbbe7.js","5864458001d2977c0e836158ee57ee4c"],["static/js/15.91b335d9b98f3d3cfd5a.js","ade9ab0d9a674748e15a7cd0d713dc42"],["static/js/16.06381e1eb4e5c067aec7.js","370c1f93e5419b93918e683cfb162758"],["static/js/2.05fe6646cfeea6814860.js","05063a63fe36bc83ceb4d91877bd8524"],["static/js/3.2d1f1a5cff8b9fe08b6b.js","5175f7df2764d05e7fa84e37348cf6aa"],["static/js/4.94a74ab4a590d086815f.js","67a19fa4661f7715d965268628d3580c"],["static/js/5.37b01d4b56034fa376a5.js","30785d8a9cc75ee396f0e3447ca50697"],["static/js/6.12ec664823ba4d8486c5.js","f7cc9cdf1c189e3b489982581c490a39"],["static/js/7.137f0645a26b79aff671.js","0384aef28bf503c0f4f3b58f53cc9a90"],["static/js/8.b6bf0d32a7fe417b2326.js","4851aaa2d582ddefae2b239992b76f50"],["static/js/9.4de82dc97f5e2084a2f5.js","bcc68a4ae92ee23ee83cd44052ff685d"],["static/js/app.8a1bb2de9aee68bd1c55.js","0efa1665a1dd491e02c27376eeaeb055"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.cdf59bdd3742532e62f5.js","ad2e9568f8e64a6ab1d6f74cf5413437"],["static/js/polyfill.min.js","868eefa71408a0f3f61c490810fc4568"],["static/js/vendor.1a88784e9bbe5af0e8df.js","9cbd09164b0ab33a380e116c49439832"],["static/js/vendor.dll.js","08767e6c3c7315c9d1293fd6255b8703"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),s=createCacheKey(c,hashParamName,t,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});