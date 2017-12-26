"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","101d8e8ed412fba5d666588006af1e93"],["service-worker.js","ab74215e3b5e5feea12eb25cdf837a01"],["static/css/app.b03881dd83c3b893b28e32324ed0df3d.css","5f9048f8dbf46b06509c6c10532830d9"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/js/0.111d4cf5bc2db259fe53.js","99cda1ec4484df5f399fc76d910647bf"],["static/js/1.3e389d210c6695776ee4.js","049e86d4587b6ef642987214b334e149"],["static/js/10.32f4f0038122e719829b.js","83215dac4788ea67dd877e18565f5dc1"],["static/js/11.da9dfa6bd0d44a6df351.js","1c771fedd904e582b5309ae6b4307545"],["static/js/12.1d7c7a0122afdb5659cd.js","9bc29c565bca97b5decba0affa074b20"],["static/js/13.f5e4db79e96170f6fec1.js","73e3ec760b19ed95db8ab0fd14ab19e3"],["static/js/14.b3cef5b05af4683feddd.js","0a689ab26f0bdca6a24ff126b7d21dcc"],["static/js/15.c319ce9ddbd47ee59252.js","9122151e4fa7a73ac1f1dd2b19072899"],["static/js/16.c9e277038687d638f055.js","93bff9b112229b2f1898dca3ebe725b0"],["static/js/2.e4e1dbdaee7ac7470196.js","3d44be8d07fb285bb28290084fbc37fe"],["static/js/3.4983c2720cd0a5dd0f0f.js","1abc46ab782343e98bfbc9b14e801886"],["static/js/4.73d3afc925bad0b2d4b4.js","9696426b98eb9d07754c06142b5b0244"],["static/js/5.22851a75586d0701a7a1.js","da06a361a18d5c7185d12c4d430aa858"],["static/js/6.120d5d7c58b6dbc5b015.js","7fa1041d99b76c98cab17d880e453d95"],["static/js/7.99955c3918f4912b95bc.js","f3006409562a9572fec4bbb942145872"],["static/js/8.da837987dacbefcd2112.js","fcdc9a5e9b6bc5fce2abe9c6f3ce6ef5"],["static/js/9.49697e0efa0b91b9389a.js","d74c07135351ae8c57c730b8bfae5584"],["static/js/app.bcf190226e895866b064.js","756d5152f6da1d3bf0a64a7bb73a1db8"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.8a1e951bfe541c547155.js","a5af46415f78a918128cf6dad1f177d9"],["static/js/polyfill.min.js","868eefa71408a0f3f61c490810fc4568"],["static/js/vendor.483d708bf3c86c23c1ae.js","10ff9ade07030ef60d149320b46a9b27"],["static/js/vendor.dll.js","adea34afb01e28f10c32ee48a67da027"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var s=new URL(e);return c&&s.pathname.match(c)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),s=createCacheKey(c,hashParamName,t,!1);return[c.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});