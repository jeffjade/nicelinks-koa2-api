"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","7629032b4f70f2772889e34ea1d4b718"],["service-worker.js","00c46420757c0c3b432acf5042a2b6f3"],["static/css/app.21baaf8b8303feacc4f3c310dba6177c.css","9120dc14c007db9834398844f549ac22"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/js/0.e4816c5a974547d35ddf.js","5fb47bc8a29a06a3f20584775de18f38"],["static/js/1.f837dac78550c12e4322.js","1ba44adc15aeb0490f99e2227a94c4c1"],["static/js/10.38324b159a4f31d19b4e.js","d6d4f78407663b678f918d5dfd6468a8"],["static/js/11.cbbd055b5a925c8832db.js","7a70fe1dd366d4612245f27038a203d7"],["static/js/12.7cb87070c215dab32c7e.js","bf262f40d0aafbbb543699a4f7d2283a"],["static/js/13.dd5e554a2a7d81937ea3.js","253ec89f1f24ebb200a412f109f1b637"],["static/js/14.3e73204f4321582bc44c.js","d93192acc9d74733241914a2c6aac866"],["static/js/15.6de53eed47e7f86c5005.js","158039c369bd992046f9caa42c3e616e"],["static/js/16.030684bc054162ebf65b.js","f0f423dc02896dbc744a920ea02a3fc4"],["static/js/2.46c5e8317f6a8eb74f77.js","b3f4c0a4b3933c1ad6fd608093ede9f7"],["static/js/3.e04033d6b9568d074dd2.js","bc0f99dc5627df9a26eaeb6a3c84c5e0"],["static/js/4.0497e340b60308249aed.js","ba75a54660b9e7584fd555a1bc47a743"],["static/js/5.afdb2857dc71ddd2cd5b.js","afb55750f462dae6b1af8878a3e3207f"],["static/js/6.88e242bd4715ca70d142.js","b865cef84c87cc70fe001319377e41cf"],["static/js/7.0272061c1cde0e2fb4b2.js","b82bf1f5969504cb2225922304e52d62"],["static/js/8.fd5f17cd1c4f67b5fd54.js","930f91f3ddccee97174bf1501a5c3f12"],["static/js/9.d33a2f3ea85c9d32874c.js","174240bd7f0c9515b79077223d96cee2"],["static/js/app.5075931278cd985077c1.js","0439c19959024d106a1177cc7fc29d5e"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.a57bbcf4356c959269d2.js","0ed90be7401ffda41dc680c4fd19dd39"],["static/js/polyfill.min.js","868eefa71408a0f3f61c490810fc4568"],["static/js/vendor.a6031f891d5e0935ccda.js","386af48bafc14f34908089f56613f413"],["static/js/vendor.dll.js","adea34afb01e28f10c32ee48a67da027"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),s=createCacheKey(c,hashParamName,t,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});