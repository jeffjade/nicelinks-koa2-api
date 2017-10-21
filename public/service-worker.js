"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","230ebf348c1cb7651fe60b7c467a7a40"],["service-worker.js","b5727a91187dccb0a4149d0aa8165ef7"],["static/css/app.05b705e15e62cd9f4dabed4bd63d156e.css","c5ff2726b29345fde64de6d6b7cf2726"],["static/css/app.d6920e1d9405925de1b68384f6697dae.css","9f63d447494371d1ccc1065cdc310b94"],["static/js/0.0291a8aa0bac7152d10c.js","8dbf6a423aa45adfefe9de2505d2755d"],["static/js/1.413a8be0860989901f32.js","98e1892180fba2605044f319011358a4"],["static/js/10.9f65ccbf4457728a06ff.js","57ee574b13d6d919158b03a9a413502f"],["static/js/11.de89cd8424bff1663c41.js","efc56fc9cb7f73089b145bc4e2ec2d3a"],["static/js/12.37c6c09fa7e21815bba4.js","6936e273e9e344336a28520a30d9fcb3"],["static/js/2.68d63f72aeee08074781.js","974e144721b340592fb05c14c47a9692"],["static/js/3.9bf32e721759b6a87f39.js","426f4bb305fa89eaa10a75ecf771f6f7"],["static/js/4.6d6ae2f397e459278e2b.js","d82ae5f20abd733c71521d467b0b92d3"],["static/js/5.b8379eb9a594c683352d.js","5c9ab71bdf50f01a57a48f9b99578be4"],["static/js/6.0f938b4643e39f4acb4b.js","02cb1b28d60f49d74bdc2283072238fc"],["static/js/7.0655a75365d46a8f814d.js","5686335461a7d96623f849d92cd9a66f"],["static/js/8.e5696413f8fce5310e28.js","20338db6904c3ab2fb58d9eb8f92bf12"],["static/js/9.e947f55ed4762240856a.js","79063161bedf08130829c30fa5b2135d"],["static/js/app.e766293e3ebff12253cd.js","d37e83f172f9dec234a4a7303432e569"],["static/js/autotrack.js","b9a8213eae619a8362c4496bef632aea"],["static/js/browsermodal.js","9bf6f461a553ddead8edc562e86f957e"],["static/js/manifest.6ffa05dceb64536467e3.js","a07c200eaa7dd91c1a4ed6e0b3381dcb"],["static/js/polyfill.min.js","868eefa71408a0f3f61c490810fc4568"],["static/js/vendor.50cf0f09b488a192e37b.js","924ed2c1cb827f802a62ae21f1fd0963"],["static/js/vendor.dll.js","e99e09a3bd6553e72f64dfbf617f442c"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,s){var c=new URL(e);return s&&c.pathname.match(s)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],s=new URL(t,self.location),c=createCacheKey(s,hashParamName,a,!1);return[s.toString(),c]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var s=new Request(a,{credentials:"same-origin"});return fetch(s).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});