webpackJsonp([0],{405:function(n,t,e){e(426);var a=e(2)(e(428),e(456),null,null);n.exports=a.exports},422:function(n,t,e){"use strict";t.a={data:function(){var n=this;return{title:n.$t("niceLinksStr"),siteTitle:n.$t("niceLinksStr"),titleTemplate:"%s | "+this.$t("niceLinksStr"),keywords:n.$t("keywords"),description:n.$t("description")}},created:function(){},metaInfo:function(){var n=this,t=this.title?this.title+" - "+this.siteTitle:""+this.siteTitle;return{title:this.title,titleTemplate:function(t){return t?t+" - "+n.siteTitle:""+n.siteTitle},meta:[{vmid:"title",name:"title",content:t},{vmid:"keywords",name:"keywords",content:this.keywords},{vmid:"description",name:"description",content:this.description},{vmid:"og:type",property:"og:type",content:"website"},{vmid:"og:title",property:"og:title",content:t},{vmid:"og:image",property:"og:image",content:"https://static.nicelinks.site/static/img/favicons/favicon.png"},{vmid:"og:keywords",property:"og:keywords",content:this.keywords},{vmid:"og:description",property:"og:description",content:this.description},{vmid:"twitter:title",name:"twitter:title",content:t},{vmid:"twitter:image",property:"og:image",content:"https://static.nicelinks.site/static/img/favicons/favicon.png"},{vmid:"twitter:keywords",name:"twitter:keywords",content:this.keywords},{vmid:"twitter:description",name:"twitter:description",content:this.description}]}},mounted:function(){},methods:{}}},426:function(n,t,e){var a=e(427);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(404)("7fd5e4d0",a,!0)},427:function(n,t,e){(n.exports=e(403)()).push([n.i,"\n.flower-container {\n  padding-bottom: 8em;\n  margin: 0em 0 -6em;\n  overflow: hidden;\n}\n.flower-container .flower {\n  position: relative;\n  display: block;\n  height: 14em;\n  width: 14em;\n  margin: 5em auto 4.25em;\n  font-size: 22px;\n  transition: all 0.2s ease-out;\n}\n.flower-container .part {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n}\n.flower-container .part:nth-child(1) {\n  height: 10em;\n  width: 10em;\n  margin: -10em 0 0;\n  border-radius: 100% 0;\n  background: rgba(199, 212, 227, 0.5);\n  opacity: 0.6;\n  transform-origin: 0 100% 0;\n  background-color: rgba(199, 212, 227, 0.5) !important;\n  opacity: 1;\n  transform: rotate(0deg);\n  box-shadow: 0 2.75em 4.5em rgba(0, 0, 0, 0.2);\n}\n.flower-container .part:nth-child(2) {\n  height: 10em;\n  width: 10em;\n  margin: -10em 0 0;\n  border-radius: 100% 0;\n  background: rgba(199, 212, 227, 0.5);\n  opacity: 0.6;\n  transform-origin: 0 100% 0;\n  background-color: rgba(199, 212, 227, 0.5) !important;\n  opacity: 1;\n  transform: rotate(90deg);\n  box-shadow: 2.75em 0 4.5em rgba(0, 0, 0, 0.2);\n}\n.flower-container .part:nth-child(3) {\n  height: 10em;\n  width: 10em;\n  margin: -10em 0 0;\n  border-radius: 100% 0;\n  background: rgba(199, 212, 227, 0.5);\n  opacity: 0.6;\n  transform-origin: 0 100% 0;\n  background-color: rgba(199, 212, 227, 0.5) !important;\n  opacity: 1;\n  transform: rotate(180deg);\n  box-shadow: 0 -2.75em 4.5em rgba(0, 0, 0, 0.2);\n}\n.flower-container .part:nth-child(4) {\n  height: 10em;\n  width: 10em;\n  margin: -10em 0 0;\n  border-radius: 100% 0;\n  background: rgba(199, 212, 227, 0.5);\n  opacity: 0.6;\n  transform-origin: 0 100% 0;\n  background-color: rgba(199, 212, 227, 0.5) !important;\n  opacity: 1;\n  transform: rotate(270deg);\n  box-shadow: -2.75em 0 4.5em rgba(0, 0, 0, 0.2);\n}\n.flower-container .part:nth-child(5) {\n  background: rgba(121, 103, 158, 0.5);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: block;\n  height: 6em;\n  width: 6em;\n  opacity: 0.7;\n  border-radius: 100% 0;\n  margin-top: -6em;\n  margin-left: 0em;\n  transform-origin: 0 100% 0;\n  background-color: rgba(121, 103, 158, 0.5) !important;\n  transform: rotate(0deg);\n}\n.flower-container .part:nth-child(6) {\n  background: rgba(121, 103, 158, 0.5);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: block;\n  height: 6em;\n  width: 6em;\n  opacity: 0.7;\n  border-radius: 100% 0;\n  margin-top: -6em;\n  margin-left: 0em;\n  transform-origin: 0 100% 0;\n  background-color: rgba(121, 103, 158, 0.5) !important;\n  transform: rotate(45deg);\n}\n.flower-container .part:nth-child(7) {\n  background: rgba(121, 103, 158, 0.5);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: block;\n  height: 6em;\n  width: 6em;\n  opacity: 0.7;\n  border-radius: 100% 0;\n  margin-top: -6em;\n  margin-left: 0em;\n  transform-origin: 0 100% 0;\n  background-color: rgba(121, 103, 158, 0.5) !important;\n  transform: rotate(90deg);\n}\n.flower-container .part:nth-child(8) {\n  background: rgba(121, 103, 158, 0.5);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: block;\n  height: 6em;\n  width: 6em;\n  opacity: 0.7;\n  border-radius: 100% 0;\n  margin-top: -6em;\n  margin-left: 0em;\n  transform-origin: 0 100% 0;\n  background-color: rgba(121, 103, 158, 0.5) !important;\n  transform: rotate(135deg);\n}\n.flower-container .part:nth-child(9) {\n  background: rgba(121, 103, 158, 0.5);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: block;\n  height: 6em;\n  width: 6em;\n  opacity: 0.7;\n  border-radius: 100% 0;\n  margin-top: -6em;\n  margin-left: 0em;\n  transform-origin: 0 100% 0;\n  background-color: rgba(121, 103, 158, 0.5) !important;\n  transform: rotate(180deg);\n}\n.flower-container .part:nth-child(10) {\n  background: rgba(121, 103, 158, 0.5);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: block;\n  height: 6em;\n  width: 6em;\n  opacity: 0.7;\n  border-radius: 100% 0;\n  margin-top: -6em;\n  margin-left: 0em;\n  transform-origin: 0 100% 0;\n  background-color: rgba(121, 103, 158, 0.5) !important;\n  transform: rotate(225deg);\n}\n.flower-container .part:nth-child(11) {\n  background: rgba(121, 103, 158, 0.5);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: block;\n  height: 6em;\n  width: 6em;\n  opacity: 0.7;\n  border-radius: 100% 0;\n  margin-top: -6em;\n  margin-left: 0em;\n  transform-origin: 0 100% 0;\n  background-color: rgba(121, 103, 158, 0.5) !important;\n  transform: rotate(270deg);\n}\n.flower-container .part:nth-child(12) {\n  background: rgba(121, 103, 158, 0.5);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: block;\n  height: 6em;\n  width: 6em;\n  opacity: 0.7;\n  border-radius: 100% 0;\n  margin-top: -6em;\n  margin-left: 0em;\n  transform-origin: 0 100% 0;\n  background-color: rgba(121, 103, 158, 0.5) !important;\n  transform: rotate(315deg);\n}\n.cssanimations .flower-container .part {\n  opacity: 0;\n  animation: linear forwards 2s;\n}\n.cssanimations .part:nth-child(1) {\n  animation-name: show-large-leaf;\n  animation-delay: .5s;\n}\n.cssanimations .part:nth-child(2) {\n  animation-name: show-large-leaf;\n  animation-delay: 1s;\n}\n.cssanimations .part:nth-child(3) {\n  animation-name: show-large-leaf;\n  animation-delay: 1.5s;\n}\n.cssanimations .part:nth-child(4) {\n  animation-name: show-large-leaf;\n  animation-delay: 2s;\n}\n.cssanimations .part:nth-child(5) {\n  animation-name: show-small-leaf;\n  animation-delay: .25s;\n}\n.cssanimations .part:nth-child(6) {\n  animation-name: show-small-leaf;\n  animation-delay: .5s;\n}\n.cssanimations .part:nth-child(7) {\n  animation-name: show-small-leaf;\n  animation-delay: .75s;\n}\n.cssanimations .part:nth-child(8) {\n  animation-name: show-small-leaf;\n  animation-delay: 1s;\n}\n.cssanimations .part:nth-child(9) {\n  animation-name: show-small-leaf;\n  animation-delay: 1.25s;\n}\n.cssanimations .part:nth-child(10) {\n  animation-name: show-small-leaf;\n  animation-delay: 1.5s;\n}\n.cssanimations .part:nth-child(11) {\n  animation-name: show-small-leaf;\n  animation-delay: 1.75s;\n}\n.cssanimations .part:nth-child(12) {\n  animation-name: show-small-leaf;\n  animation-delay: 2s;\n}\n@keyframes show-large-leaf {\n0% {\n    opacity: 0;\n}\n100% {\n    opacity: 1;\n}\n}\n@keyframes show-small-leaf {\n0% {\n    opacity: 0;\n}\n100% {\n    opacity: .7;\n}\n}\n@keyframes show-text {\n0% {\n    opacity: 0;\n    transform: translateY(1em);\n}\n100% {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n",""])},428:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e(429),i=e.n(a),o=e(434),r=e.n(o),s=e(439),l=e.n(s),c=e(444),d=e.n(c),m=e(455),u=e(422);t.default={name:"Index",mixins:[m.a,u.a],data:function(){return{title:""}},components:{HomeLotus:i.a,NiceFantasy:r.a,Introduction:l.a,LinkCountup:d.a},beforeCreate:function(){},created:function(){},mounted:function(){},methods:{}}},429:function(n,t,e){e(430);var a=e(2)(e(432),e(433),null,null);n.exports=a.exports},430:function(n,t,e){var a=e(431);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(404)("a19dc256",a,!0)},431:function(n,t,e){(n.exports=e(403)()).push([n.i,"\n@media (min-width: 550px) {\n.twelve.columns {\n    width: 100%;\n    margin-left: 0;\n}\n}\n.flower-container {\n  position: relative;\n}\n.flower-container .unit-wrapper {\n    position: absolute;\n    width: 66%;\n    top: 0;\n    bottom: 25%;\n    left: 0;\n    right: 0;\n    margin: auto;\n    opacity: 0;\n    animation-delay: 2.75s;\n    animation: show-text 1s 2.5s forwards cubic-bezier(0.1, 0.95, 0.59, 1.22);\n}\n.flower-container .unit-wrapper .headline {\n      position: absolute;\n      top: calc(50% - 2em);\n      left: -10em;\n      right: -10em;\n      text-align: center;\n      font-weight: 400;\n      text-shadow: 0 0 2em #ffffff;\n}\n.flower-container .unit-wrapper .hero-description {\n      position: absolute;\n      top: 50%;\n      left: 0;\n      right: 0;\n      font-size: 18px;\n      line-height: 2.2rem;\n      text-align: center;\n      text-shadow: 0 0 2em #ffffff;\n}\n.flower-container .unit-wrapper .hero-description a {\n        box-sizing: border-box;\n        border: 1px solid #2c85ff;\n        padding: 0.25em 1em;\n        color: #2c85ff;\n        font-weight: bold;\n        line-height: 3em;\n        border-radius: 2em;\n        transition: all 0.15s ease;\n        box-sizing: border-box;\n}\n@media (max-width: 960px) {\n.hero-description br {\n    display: none;\n}\n}\n@media (max-width: 768px) {\n.flower-container .flower {\n    font-size: 1.8rem !important;\n}\n.flower-container .unit-wrapper {\n    width: 100%;\n}\n.flower-container .unit-wrapper .hero-description {\n      font-size: 2.2rem;\n      padding: 0px 20px;\n      line-height: 2.2rem;\n}\n}\n@media (max-width: 560px) {\n.flower-container .unit-wrapper .hero-description {\n    font-size: 2.1rem;\n    padding: 0px 10px;\n}\n}\n@media (max-width: 414px) {\n.flower-container .flower {\n    font-size: 1.6rem !important;\n}\n.flower-container .unit-wrapper .hero-description {\n    font-size: 1.8rem;\n    padding: 0px 10px;\n}\n}\n@media (max-width: 375px) {\n.flower-container .flower {\n    font-size: 1.3rem !important;\n}\n}\n@keyframes fade-in {\n0% {\n    opacity: 0;\n}\n100% {\n    opacity: 1;\n}\n}\n.fade-in {\n  animation-name: fade-in;\n}\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both;\n  visibility: visible;\n  animation-name: fade-in;\n}\n.animated.infinite {\n  animation-iteration-count: infinite;\n}\n.animated.hinge {\n  animation-duration: 6s;\n}\n",""])},432:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"HomeLotus",data:function(){return{}},components:{},created:function(){},methods:{},locales:{en:{niceLinksDesc:"NICE LINKS, as an open platform, is designed to gather around the world's excellent websites to explore the wider world of the Internet;<br>Here, you can easily find, learn, and share more useful or interesting things."},zh:{niceLinksDesc:"倾城之链，作为一个开放平台，旨在云集全球优秀网站，探索互联网中更广阔的世界；<br>在这里，你可以轻松发现、学习、分享更多有用或有趣的事物。"}}}},433:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("section",{staticClass:"lotus fade-in animated"},[e("article",{staticClass:"twelve columns cssanimations"},[e("div",{staticClass:"flower-container"},[n._m(0),n._v(" "),e("div",{staticClass:"unit-wrapper"},[e("h1",{staticClass:"headline large-font"},[n._v(n._s(n.$t("niceLinksStr")))]),n._v(" "),e("section",{staticClass:"hero-description"},[e("p",{domProps:{innerHTML:n._s(n.$t("niceLinksDesc"))}}),n._v(" "),e("router-link",{staticClass:"gtag-track",attrs:{to:"/explore/all","data-action":"mian-explore-all","data-category":"index","data-label":"explore-all"}},[n._v("\n            "+n._s(n.$t("exploreNice"))+"\n          ")])],1)])])])])},staticRenderFns:[function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"flower"},[e("span",{staticClass:"part"}),n._v(" "),e("span",{staticClass:"part"}),n._v(" "),e("span",{staticClass:"part"}),n._v(" "),e("span",{staticClass:"part"}),n._v(" "),e("span",{staticClass:"part"}),n._v(" "),e("span",{staticClass:"part"}),n._v(" "),e("span",{staticClass:"part"}),n._v(" "),e("span",{staticClass:"part"}),n._v(" "),e("span",{staticClass:"part"}),n._v(" "),e("span",{staticClass:"part"}),n._v(" "),e("span",{staticClass:"part"}),n._v(" "),e("span",{staticClass:"part"})])}]}},434:function(n,t,e){e(435);var a=e(2)(e(437),e(438),null,null);n.exports=a.exports},435:function(n,t,e){var a=e(436);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(404)("63c4644a",a,!0)},436:function(n,t,e){(n.exports=e(403)()).push([n.i,"\n.nice-fantasy {\n  position: relative;\n  background-color: #000000;\n}\n.nice-fantasy:before {\n    content: '';\n    position: absolute;\n    display: block;\n    width: 100%;\n    height: 50%;\n    top: 0;\n    left: 0;\n    background-color: #ffffff;\n    margin-top: -1px;\n}\n.nice-fantasy img {\n    position: relative;\n    display: block;\n    width: 90%;\n    max-width: 1280;\n    margin: 0 auto;\n    border-radius: 3px;\n}\n",""])},437:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"NiceFantasy",data:function(){return{isMobile:window.innerWidth<=960}},components:{},created:function(){},methods:{},locales:{}}},438:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("section",{staticClass:"nice-fantasy"},[e("img",{attrs:{src:"//image.nicelinks.site/nice-fantasy.jpg",alt:n.$t("niceLinksStr")}})])},staticRenderFns:[]}},439:function(n,t,e){e(440);var a=e(2)(e(442),e(443),null,null);n.exports=a.exports},440:function(n,t,e){var a=e(441);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(404)("ff11b928",a,!0)},441:function(n,t,e){(n.exports=e(403)()).push([n.i,'\n.introduction {\n  width: 100%;\n  height: 32rem;\n  padding: 0 15%;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  display: -ms-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-box-align: center;\n  -ms-align-items: center;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  color: #ffffff;\n  background-color: #000000;\n}\n.introduction .desc {\n    margin-top: 20px;\n    text-align: center;\n    font-size: 18px;\n    line-height: 2.6rem;\n}\n.share-more {\n  color: #000000;\n  background-color: #ffffff;\n}\n.share-more mark {\n    background-color: #ffffff;\n}\n@media (max-width: 768px) {\n.introduction {\n    padding: 0 1.8rem;\n}\n.introduction .desc {\n      text-align: left;\n      font-size: 1.8rem;\n      line-height: 2rem;\n}\n.introduction .desc br {\n        content: "";\n        display: block;\n        margin: 1rem 0;\n}\n}\n@media (max-width: 375px) {\n.introduction {\n    padding: 0 1.6rem;\n}\n.introduction .desc {\n      font-size: 1.6rem;\n}\n}\n',""])},442:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Introduction",data:function(){return{isMobile:window.innerWidth<=960}},components:{},created:function(){},methods:{},locales:{en:{forFindMoreTitle:"Explore a wider world for you",forFindMoreDesc:'In the information world, massive messages may make you worry about missing her at a loss; efforts to learn at the same time, it may miss more;<a href="/explore/all" class="gtag-track" data-action="find-explore-all" data-category="index" data-label="find-explore-all"><strong>「NICE LINKS」</strong></a>, that is for you to solve this kind of problem; here, you can browse all kinds of global crystallization of wisdom; rich vision at the same time, can be marked or share your love of the site, which can also provide reference for more people to dig the message.',forShareMoreTitle:"Share, for your favorite websites.",forShareMoreDesc:'<mark>In today\'s information age, even small individuals have their own brands. </mark>However, the individual is his own. <a href="/explore/all" class="gtag-track" data-action="share-explore-all" data-category="index" data-label="share-explore-all">「NICE LINKS」</a> as an open platform, encourage you to create your personal brand, brand your own style, speak for yourself and make your voice; If you have already done so, you can share it here, let more people know, and benefit from it. Of course, you can also share other interesting sites that you enjoy, so that your insights can benefit more people.'},zh:{forFindMoreTitle:"探索更广阔的世界，为您",forFindMoreDesc:'在这个信息化的世界，海量的讯息可能让您不知所措；担心错过她而努力汲取的同时，却可能错过更多；<br><a href="/explore/all" class="gtag-track" data-action="find-explore-all" data-category="index" data-label="find-explore-all"><strong>「倾城之链」</strong></a>的存在，即是为您解决这种困扰；在这里，您可以浏览全球各类智慧的结晶；<br>丰富视野的同时，可以标注抑或分享您喜欢的站点，从而为更多挖掘讯息的人提供建设性参考。',forShareMoreTitle:"分享，为您所欢喜的网站",forShareMoreDesc:'<mark>在当今这信息化时代，即便是再小的个体，也当有自己的品牌。</mark>然而，独立的才是自己的。<a href="/explore/all" class="gtag-track" data-action="share-explore-all" data-category="index" data-label="share-explore-all">「倾城之链」</a>作为一个开放平台，鼓励您创造属于您的个人品牌，烙印着自己的风格，替自己代言、发声；如果您已经这样做了，您可以尽情分享在这里，让更多人知道，且从中受益。<br>当然，您也可以分享出您欢喜的其他有意思站点，让您的见识惠及更多人。'}}}},443:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("section",[e("article",{staticClass:"introduction"},[e("h2",{staticClass:"medium-font"},[n._v(n._s(n.$t("forFindMoreTitle")))]),n._v(" "),e("p",{staticClass:"desc",domProps:{innerHTML:n._s(n.$t("forFindMoreDesc"))}})]),n._v(" "),e("article",{staticClass:"introduction share-more"},[e("h2",{staticClass:"medium-font"},[n._v(n._s(n.$t("forShareMoreTitle")))]),n._v(" "),e("p",{staticClass:"desc",domProps:{innerHTML:n._s(n.$t("forShareMoreDesc"))}})])])},staticRenderFns:[]}},444:function(n,t,e){e(445);var a=e(2)(e(447),e(454),null,null);n.exports=a.exports},445:function(n,t,e){var a=e(446);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(404)("11eec554",a,!0)},446:function(n,t,e){(n.exports=e(403)()).push([n.i,"\n.countup-area {\n  color: #000000;\n  width: 100%;\n  height: 32rem;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  display: -ms-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-box-align: center;\n  -ms-align-items: center;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  background: #f4f6fa;\n  background: linear-gradient(to top, #f4f6fa, #eef2f3);\n}\n.countup-area .countup-number {\n    display: block;\n    margin-top: 10px;\n}\n",""])},447:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e(448),i=e.n(a);t.default={name:"LinkCountup",data:function(){return{isMobile:window.innerWidth<=960,theDisplayCount:0,totalLinksCount:0,countUpoptions:{useEasing:!0,useGrouping:!0,separator:",",decimal:".",prefix:"",suffix:""}}},components:{CountUp:i.a},created:function(){var n=this,t={active:!0};this.$apis.getAllLinksCount(t).then(function(t){n.totalLinksCount=t,n.handleDisplayCount()}).catch(function(t){n.totalLinksCount=99,n.handleDisplayCount()})},methods:{handleDisplayCount:function(){var n=this,t=document.getElementById("countup-number");window.addEventListener("scroll",function(e){n.$util.isElementInViewport(t)&&(n.theDisplayCount=n.totalLinksCount)})},onCountUpCallback:function(n){}},locales:{en:{countupText:"The number of high quality websites has been included"},zh:{countupText:"已经收录优质网站个数"}}}},448:function(n,t,e){e(449);var a=e(2)(e(451),e(453),"data-v-be0f84ec",null);n.exports=a.exports},449:function(n,t,e){var a=e(450);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(404)("3371a311",a,!0)},450:function(n,t,e){(n.exports=e(403)()).push([n.i,"\n.countup[data-v-be0f84ec]{\n  font-size: 8.8rem;\n  background: #212121;\n  -webkit-background-clip:text;\n  background-clip:text;\n  color: transparent;\n  text-shadow: 0 3px 3px rgba(255,255,255,0.5);\n}\n",""])},451:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e(452),i=e.n(a);t.default={name:"CountUp",props:{start:{type:Number,required:!1,default:0},end:{type:Number,required:!0},decimals:{type:Number,required:!1,default:0},duration:{type:Number,required:!1,default:2},options:{type:Object,required:!1}},data:function(){return{instance:null}},computed:{},watch:{end:{handler:function(n){this.instance&&this.instance.update&&this.instance.update(n)},deep:!1}},methods:{init:function(){var n=this;if(!this.instance){var t=this.$el;this.instance=new i.a(t,this.start,this.end,this.decimals,this.duration,this.options),this.instance.start(function(){n.$emit("callback",n.instance)})}},destroy:function(){this.instance=null}},mounted:function(){this.init()},beforeDestroy:function(){this.destroy()},destroyed:function(){},start:function(n){this.instance&&this.instance.start&&this.instance.start(function(){n&&n(this.instance)})},pauseResume:function(){this.instance&&this.instance.pauseResume&&this.instance.pauseResume()},reset:function(){this.instance&&this.instance.reset&&this.instance.reset()},update:function(n){this.instance&&this.instance.update&&this.instance.update(n)}}},452:function(n,t,e){var a,i;!function(o,r){void 0!==(i="function"==typeof(a=r)?a.call(t,e,t,n):a)&&(n.exports=i)}(0,function(n,t,e){return function(n,t,e,a,i,o){for(var r=0,s=["webkit","moz","ms","o"],l=0;l<s.length&&!window.requestAnimationFrame;++l)window.requestAnimationFrame=window[s[l]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[s[l]+"CancelAnimationFrame"]||window[s[l]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(n,t){var e=(new Date).getTime(),a=Math.max(0,16-(e-r)),i=window.setTimeout(function(){n(e+a)},a);return r=e+a,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(n){clearTimeout(n)});var c=this;c.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:null,formattingFn:null};for(var d in o)o.hasOwnProperty(d)&&(c.options[d]=o[d]);""===c.options.separator&&(c.options.useGrouping=!1),c.options.prefix||(c.options.prefix=""),c.options.suffix||(c.options.suffix=""),c.d="string"==typeof n?document.getElementById(n):n,c.startVal=Number(t),c.endVal=Number(e),c.countDown=c.startVal>c.endVal,c.frameVal=c.startVal,c.decimals=Math.max(0,a||0),c.dec=Math.pow(10,c.decimals),c.duration=1e3*Number(i)||2e3,c.formatNumber=function(n){n=n.toFixed(c.decimals);var t,e,a,i;if(t=(n+="").split("."),e=t[0],a=t.length>1?c.options.decimal+t[1]:"",i=/(\d+)(\d{3})/,c.options.useGrouping)for(;i.test(e);)e=e.replace(i,"$1"+c.options.separator+"$2");return c.options.prefix+e+a+c.options.suffix},c.easeOutExpo=function(n,t,e,a){return e*(1-Math.pow(2,-10*n/a))*1024/1023+t},c.easingFn=c.options.easingFn?c.options.easingFn:c.easeOutExpo,c.formattingFn=c.options.formattingFn?c.options.formattingFn:c.formatNumber,c.version=function(){return"1.7.1"},c.printValue=function(n){var t=c.formattingFn(n);"INPUT"===c.d.tagName?this.d.value=t:"text"===c.d.tagName||"tspan"===c.d.tagName?this.d.textContent=t:this.d.innerHTML=t},c.count=function(n){c.startTime||(c.startTime=n),c.timestamp=n;var t=n-c.startTime;c.remaining=c.duration-t,c.options.useEasing?c.countDown?c.frameVal=c.startVal-c.easingFn(t,0,c.startVal-c.endVal,c.duration):c.frameVal=c.easingFn(t,c.startVal,c.endVal-c.startVal,c.duration):c.countDown?c.frameVal=c.startVal-(c.startVal-c.endVal)*(t/c.duration):c.frameVal=c.startVal+(c.endVal-c.startVal)*(t/c.duration),c.countDown?c.frameVal=c.frameVal<c.endVal?c.endVal:c.frameVal:c.frameVal=c.frameVal>c.endVal?c.endVal:c.frameVal,c.frameVal=Math.round(c.frameVal*c.dec)/c.dec,c.printValue(c.frameVal),t<c.duration?c.rAF=requestAnimationFrame(c.count):c.callback&&c.callback()},c.start=function(n){return c.callback=n,c.rAF=requestAnimationFrame(c.count),!1},c.pauseResume=function(){c.paused?(c.paused=!1,delete c.startTime,c.duration=c.remaining,c.startVal=c.frameVal,requestAnimationFrame(c.count)):(c.paused=!0,cancelAnimationFrame(c.rAF))},c.reset=function(){c.paused=!1,delete c.startTime,c.startVal=t,cancelAnimationFrame(c.rAF),c.printValue(c.startVal)},c.update=function(n){cancelAnimationFrame(c.rAF),c.paused=!1,delete c.startTime,c.startVal=c.frameVal,c.endVal=Number(n),c.countDown=c.startVal>c.endVal,c.rAF=requestAnimationFrame(c.count)},c.printValue(c.startVal)}})},453:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement;return(n._self._c||t)("strong",{staticClass:"countup"})},staticRenderFns:[]}},454:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"countup-area"},[e("h2",{staticClass:"medium-font"},[n._v(n._s(n.$t("countupText")))]),n._v(" "),e("CountUp",{staticClass:"countup-number",attrs:{id:"countup-number",start:0,end:n.theDisplayCount,decimals:0,duration:2.5,options:n.countUpoptions},on:{callback:n.onCountUpCallback}})],1)},staticRenderFns:[]}},455:function(n,t,e){"use strict";t.a={data:function(){return{}},computed:{},mounted:function(){this.sendGtagEventTracking()},methods:{sendGtagEventTracking:function(){var n=document.querySelectorAll(".gtag-track");[].forEach.call(n,function(n){var t=n.dataset.action,e=n.dataset.category,a=n.dataset.label;t&&e&&a&&(n.onclick=function(){(window.gtag||function(){})("event",t,{event_category:e,event_label:a})})},!1)}}}},456:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"wrapper"},[e("HomeLotus"),n._v(" "),e("NiceFantasy"),n._v(" "),e("Introduction"),n._v(" "),e("LinkCountup")],1)},staticRenderFns:[]}}});