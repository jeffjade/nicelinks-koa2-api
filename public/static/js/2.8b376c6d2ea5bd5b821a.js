webpackJsonp([2],{411:function(t,e,n){n(495);var i=n(2)(n(497),n(503),null,null);t.exports=i.exports},422:function(t,e,n){"use strict";e.a={data:function(){var t=this;return{title:t.$t("niceLinksStr"),siteTitle:t.$t("niceLinksStr"),titleTemplate:"%s | "+this.$t("niceLinksStr"),keywords:t.$t("keywords"),description:t.$t("description")}},created:function(){},metaInfo:function(){var t=this,e=this.title?this.title+" - "+this.siteTitle:""+this.siteTitle;return{title:this.title,titleTemplate:function(e){return e?e+" - "+t.siteTitle:""+t.siteTitle},meta:[{vmid:"title",name:"title",content:e},{vmid:"keywords",name:"keywords",content:this.keywords},{vmid:"description",name:"description",content:this.description},{vmid:"og:type",property:"og:type",content:"website"},{vmid:"og:title",property:"og:title",content:e},{vmid:"og:image",property:"og:image",content:"https://static.nicelinks.site/static/img/favicons/favicon.png"},{vmid:"og:keywords",property:"og:keywords",content:this.keywords},{vmid:"og:description",property:"og:description",content:this.description},{vmid:"twitter:title",name:"twitter:title",content:e},{vmid:"twitter:image",property:"og:image",content:"https://static.nicelinks.site/static/img/favicons/favicon.png"},{vmid:"twitter:keywords",name:"twitter:keywords",content:this.keywords},{vmid:"twitter:description",name:"twitter:description",content:this.description}]}},mounted:function(){},methods:{}}},495:function(t,e,n){var i=n(496);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(404)("e6a0b8a4",i,!0)},496:function(t,e,n){(t.exports=n(403)()).push([t.i,"\n.link-desc {\n  color: #707780;\n  margin: 15px auto;\n  padding-left: 10px;\n  word-break: break-all;\n  line-height: 1.8rem;\n  font-size: 14px;\n  word-spacing: 3px;\n  border-left: 2px solid #000000;\n}\n.link-keywords,\n.link-review {\n  margin: 15px 0;\n  color: #464547;\n  line-height: 1.8rem;\n}\n.link-keywords strong,\n  .link-review strong {\n    font-weight: 700;\n    color: #2e3135;\n}\n",""])},497:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(498),s=n.n(i),r=n(422);e.default={name:"Post",mixins:[r.a],data:function(){return{isLoading:!0,niceLinksArrayay:[],niceLinksDetail:{},currentPath:window.document.location.href,shareTitle:""}},watch:{},components:{SocialShare:s.a},created:function(){},mounted:function(){var t=this,e={};e._id=this.$route.params.id,e.userId=this.userInfo&&this.userInfo._id||"",this.$apis.getNiceLinks(e).then(function(e){e[0]?(t.niceLinksArrayay=e,t.niceLinksDetail=e[0],t.updatePageTitle(e[0])):t.$router.push("/404")}).catch(function(e){t.isLoading=!1,t.$message.error(""+e)}).finally(function(){t.isLoading=!1})},methods:{updatePageTitle:function(t){this.title=t.title,t.keywords&&(this.keywords=t.keywords),this.description=t.desc},createShareContent:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e="我在 #倾城之链# 发现优质网站 —— @NAME：@URL (@DESC)；欢迎前来围观、品评。".replace("@NAME",t.title||"");return(e=e.replace("@URL",t.urlPath||"")).replace("@DESC",t.desc||"")},createShareTags:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t.tags?t.tags.join(","):"Skill,Resource,Life,Information"}}}},498:function(t,e,n){n(499);var i=n(2)(n(501),n(502),null,null);t.exports=i.exports},499:function(t,e,n){var i=n(500);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(404)("bb5e5cf4",i,!0)},500:function(t,e,n){(t.exports=n(403)()).push([t.i,"\n.social-share {\n  padding-top: 1.2rem;\n}\n",""])},501:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"SocialShare",data:function(){return{}},props:{shareUrl:{type:String,default:"https://nicelinks.site"},shareContent:{type:String,default:"倾城之链"},hashtags:{type:String,default:""}},watch:{},components:{},created:function(){},mounted:function(){},methods:{}}},502:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("social-sharing",{attrs:{url:t.shareUrl,title:t.shareContent,description:t.shareContent,quote:t.shareContent,hashtags:t.hashtags,"twitter-user":"website"},inlineTemplate:{render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"social-share"},[n("network",{attrs:{network:"weibo"}},[n("icon",{staticClass:"icons",attrs:{name:"weibo"}})],1),t._v(" "),n("network",{attrs:{network:"email"}},[n("icon",{staticClass:"icons",attrs:{name:"email"}})],1),t._v(" "),n("network",{attrs:{network:"facebook"}},[n("icon",{staticClass:"icons",attrs:{name:"facebook"}})],1),t._v(" "),n("network",{attrs:{network:"twitter"}},[n("icon",{staticClass:"icons",attrs:{name:"twitter"}})],1),t._v(" "),n("network",{attrs:{network:"googleplus"}},[n("icon",{staticClass:"icons",attrs:{name:"googleplus"}})],1),t._v(" "),n("network",{attrs:{network:"pinterest"}},[n("icon",{staticClass:"icons",attrs:{name:"pinterest"}})],1)],1)},staticRenderFns:[]}})},staticRenderFns:[]}},503:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper",attrs:{id:"post-page"}},[n("div",{staticClass:"panel-default"},[n("div",{staticClass:"panel-body"},[n("div",{staticClass:"main-container"},[n("div",{staticClass:"entry-list"},[n("links-list",{attrs:{pdata:t.niceLinksArrayay,"is-loading":t.isLoading}},[n("social-share",{attrs:{"share-url":t.currentPath,"share-content":t.createShareContent(t.niceLinksDetail),hashtags:t.createShareTags(t.niceLinksDetail)},slot:"link-share"})],1)],1),t._v(" "),n("aside-list")],1)])])])},staticRenderFns:[]}}});