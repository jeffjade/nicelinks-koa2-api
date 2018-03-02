"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","38f6a69c497cd8fa45cb56de45952b75"],["service-worker.js","244b1b75cd129a487e5fcd2bd8c54df8"],["static/css/app.6d9dc03d973a7a0a97ed1e053bd44203.css","dc87ba0237f433dd5cc225e0feef9657"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/js/0.79f168f3f3aa1d955171.js","343a7de22cc9b6fde73b02981ee97a32"],["static/js/1.9b794152c16a7327b452.js","4f8de6c9fd8c63265a1b9b0fefbb8db7"],["static/js/10.90249f9b6cdd7b0628b3.js","8a60c876b7de68fd439356270c7321b6"],["static/js/11.598627595ba6d02524fc.js","db7797525a385eb550fcf3e8d9e326ce"],["static/js/12.c25653de760e11c7d8ed.js","71bdce7707e736130e7e27a0e7579fdc"],["static/js/13.27579b62e46a2ebcbca8.js","f2fca7665fc26a0cc5817312c9c70e67"],["static/js/14.5c92fb045ab210b76085.js","24dcd03df5d4467be5efb5e2dd29740a"],["static/js/15.9a080c3d2d454cfc0a02.js","0466c0a43618abeda58e439a095389e6"],["static/js/16.84a6041eb7aa2638128e.js","d30508802a089836ac02d218a1ffc7c8"],["static/js/17.69a1fd6dd6837ab6f47f.js","c171a5f50d3cec7d0aa567ee524e56d2"],["static/js/2.09b8f7b190558aa68db7.js","8535c3b48b005ebf58c68661dfc88fb6"],["static/js/3.5c3a4d58201c5485ac85.js","2573fc9d66bff907694c1124840dba90"],["static/js/4.d93c13d1f11ac59c190f.js","38acbcfb6b3bcd57691ec493af68342e"],["static/js/5.4d10c9dc7020b29ae6ee.js","0f6ccfc63efa999ab451820ef9f410a1"],["static/js/6.41c3aeb635f1267d2a93.js","f34c8083983c0a7392a71feaf330f119"],["static/js/7.13eca1314d28b671c47f.js","037fd0c52baa9e6c32d6dd810f417e01"],["static/js/8.4e338577d848cd081ae8.js","5043f25ed48de4dffaa08532d1dd0a07"],["static/js/9.ecca680b08a91a3aff84.js","20581c884249003b6171a4a55f7334ad"],["static/js/app.23dd8cb8eeaff5f1918c.js","3d8a53716933f3d2f770c32106e6b704"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.6c636f3b88469141945c.js","e604665e66dc325b0b64334ad41ca937"],["static/js/polyfill.min.js","868eefa71408a0f3f61c490810fc4568"],["static/js/vendor.c429b567710394dbefb5.js","80e4c36d2e7fb967817cdd7836938feb"],["static/js/vendor.dll.js","adea34afb01e28f10c32ee48a67da027"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),s=createCacheKey(c,hashParamName,t,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});