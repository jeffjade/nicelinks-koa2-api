webpackJsonp([4],{416:function(e,t,i){i(516);var s=i(2)(i(518),i(519),"data-v-ca846402",null);e.exports=s.exports},422:function(e,t,i){"use strict";t.a={data:function(){var e=this;return{title:e.$t("niceLinksStr"),siteTitle:e.$t("niceLinksStr"),titleTemplate:"%s | "+this.$t("niceLinksStr"),keywords:e.$t("keywords"),description:e.$t("description")}},created:function(){},metaInfo:function(){var e=this,t=this.title?this.title+" - "+this.siteTitle:""+this.siteTitle;return{title:this.title,titleTemplate:function(t){return t?t+" - "+e.siteTitle:""+e.siteTitle},meta:[{vmid:"title",name:"title",content:t},{vmid:"keywords",name:"keywords",content:this.keywords},{vmid:"description",name:"description",content:this.description},{vmid:"og:type",property:"og:type",content:"website"},{vmid:"og:title",property:"og:title",content:t},{vmid:"og:image",property:"og:image",content:"https://static.nicelinks.site/static/img/favicons/favicon.png"},{vmid:"og:keywords",property:"og:keywords",content:this.keywords},{vmid:"og:description",property:"og:description",content:this.description}]}},mounted:function(){},methods:{}}},516:function(e,t,i){var s=i(517);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);i(404)("d445c90a",s,!0)},517:function(e,t,i){(e.exports=i(403)()).push([e.i,"\n.entry-list[data-v-ca846402] {\n  padding: 0 3rem;\n}\n.entry-list .share-title[data-v-ca846402] {\n    padding: 2rem 0;\n    text-align: left;\n    font-weight: 700;\n}\n.entry-list .operate-area[data-v-ca846402] {\n    padding-bottom: 40px;\n}\n@media screen and (max-width: 375px) {\n.entry-list[data-v-ca846402] {\n    padding: 0 20px;\n}\n.entry-list .share-title[data-v-ca846402] {\n      padding: 20px 0;\n}\n}\n",""])},518:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i(11),l=i(422);t.default={name:"ShareLink",mixins:[l.a],data:function(){return{title:this.$t("shareNewLink"),isLoading:!1,fillForm:{urlPath:"",title:"",desc:"",keywords:"",classify:"",theme:"",tags:[],review:""},themeList:[],tagsList:s.default.tags,classifyList:s.default.classify,rules:{urlPath:[{required:!0,validator:this.$verifyUrl,trigger:"change,blur"}],title:[{required:!0,message:this.$t("pleaseEnter")+this.$t("linkNameStr"),trigger:"change,blur"}],theme:[{required:!0,message:this.$t("pleaseSelect")+this.$t("linkThemeStr"),trigger:"change,blur"}],classify:[{required:!0,message:this.$t("pleaseSelect")+this.$t("linkClassifyStr"),trigger:"change,blur"}]}}},props:{value:{type:Boolean,default:!1}},computed:{},watch:{"fillForm.classify":function(e){this.themeList=s.default.theme[this.fillForm.classify]||[]}},methods:{getLinkPageData:function(){var e=this;this.fillForm.urlPath&&(this.$_.endsWith(this.fillForm.urlPath,"/")||(this.fillForm.urlPath+="/"),this.$apis.crawlLinksInfo({url:this.fillForm.urlPath}).then(function(t){e.fillForm.title=t.title,e.fillForm.desc=t.desc,e.fillForm.keywords=t.keywords}).catch(function(t){e.$message.error(""+t)}))},resetForm:function(){this.$refs.fillForm.resetFields()},onResetClick:function(){this.resetForm()},onPublishClick:function(){var e=this;this.$refs.fillForm.validate(function(t){if(t){e.isLoading=!0;var i=e.$_.clone(e.fillForm,!0);i.userId=e.userInfo&&e.userInfo._id,i.role=e.userInfo&&e.userInfo.role,i.createdBy=e.userInfo&&e.userInfo.username,e.$apis.addNiceLinks(i).then(function(t){e.isLoading=!1,e.$message({message:e.$t("successAddTip"),type:"success"}),e.resetForm()}).catch(function(t){e.isLoading=!1,e.$message.error(""+t)})}})}},locales:{en:{successAddTip:"Well, you have successfully added the link，Pending audit."},zh:{successAddTip:"很好，您已成功添加该链接，正在待审核中."}}}},519:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"wrapper",attrs:{id:"share-link"}},[i("div",{directives:[{name:"loading",rawName:"v-loading.body",value:e.isLoading,expression:"isLoading",modifiers:{body:!0}}],staticClass:"panel-default"},[i("div",{staticClass:"panel-body"},[i("div",{staticClass:"main-container"},[i("div",{staticClass:"entry-list"},[i("h3",{staticClass:"share-title"},[e._v(e._s(e.$t("shareNewLink")))]),e._v(" "),i("section",{staticClass:"form form-horizontal"},[i("el-form",{ref:"fillForm",attrs:{model:e.fillForm,rules:e.rules}},[i("div",{staticClass:"form-group"},[i("div",{staticClass:"col-sm-12"},[i("el-form-item",{attrs:{prop:"urlPath"}},[i("el-input",{directives:[{name:"model",rawName:"v-model",value:e.fillForm.urlPath,expression:"fillForm.urlPath"}],attrs:{placeholder:e.$t("pleaseEnter")+e.$t("linkAddressStr")},domProps:{value:e.fillForm.urlPath},on:{blur:e.getLinkPageData,input:function(t){e.fillForm.urlPath=t}}})],1)],1)]),e._v(" "),i("div",{staticClass:"form-group"},[i("div",{staticClass:"col-sm-12"},[i("el-form-item",{attrs:{prop:"title"}},[i("el-input",{directives:[{name:"model",rawName:"v-model",value:e.fillForm.title,expression:"fillForm.title"}],attrs:{placeholder:e.$t("pleaseEnter")+e.$t("linkNameStr")},domProps:{value:e.fillForm.title},on:{input:function(t){e.fillForm.title=t}}})],1)],1)]),e._v(" "),i("div",{staticClass:"form-group"},[i("div",{staticClass:"col-sm-12"},[i("el-form-item",{attrs:{prop:"classify"}},[i("el-select",{directives:[{name:"model",rawName:"v-model",value:e.fillForm.classify,expression:"fillForm.classify"}],staticClass:"wrap-block",attrs:{placeholder:e.$t("pleaseSelect")+e.$t("linkClassifyStr")},domProps:{value:e.fillForm.classify},on:{input:function(t){e.fillForm.classify=t}}},e._l(e.classifyList,function(t){return i("el-option",{key:t.value,attrs:{label:e.$t(t.name),value:t.value}})}))],1)],1)]),e._v(" "),i("div",{staticClass:"form-group"},[i("div",{staticClass:"col-sm-12"},[i("el-form-item",{attrs:{prop:"theme"}},[i("el-select",{directives:[{name:"model",rawName:"v-model",value:e.fillForm.theme,expression:"fillForm.theme"}],staticClass:"wrap-block",attrs:{placeholder:e.$t("pleaseSelect")+e.$t("linkThemeStr")},domProps:{value:e.fillForm.theme},on:{input:function(t){e.fillForm.theme=t}}},e._l(e.themeList,function(t){return i("el-option",{key:t.key,attrs:{label:"en"===e.$getCurrentLang()?t.value:t.key,value:t.value}})}))],1)],1)]),e._v(" "),i("div",{staticClass:"form-group"},[i("div",{staticClass:"col-sm-12"},[i("el-form-item",{attrs:{prop:"tags"}},[i("el-select",{directives:[{name:"model",rawName:"v-model",value:e.fillForm.tags,expression:"fillForm.tags"}],staticClass:"wrap-block",attrs:{"allow-create":"",multiple:"",filterable:"","multiple-limit":3,placeholder:e.$t("pleaseSelect")+e.$t("linkTagsStr")},domProps:{value:e.fillForm.tags},on:{input:function(t){e.fillForm.tags=t}}},e._l(e.tagsList,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:e}})}))],1)],1)]),e._v(" "),i("div",{staticClass:"form-group"},[i("div",{staticClass:"col-sm-12"},[i("el-form-item",{attrs:{prop:"keywords"}},[i("el-input",{directives:[{name:"model",rawName:"v-model",value:e.fillForm.keywords,expression:"fillForm.keywords"}],attrs:{type:"textarea",maxlength:360,autosize:{minRows:3,maxRows:10},placeholder:e.$t("linkKeywordStr")},domProps:{value:e.fillForm.keywords},on:{input:function(t){e.fillForm.keywords=t}}})],1)],1)]),e._v(" "),i("div",{staticClass:"form-group"},[i("div",{staticClass:"col-sm-12"},[i("el-form-item",{attrs:{prop:"desc"}},[i("el-input",{directives:[{name:"model",rawName:"v-model",value:e.fillForm.desc,expression:"fillForm.desc"}],attrs:{type:"textarea",maxlength:360,autosize:{minRows:5,maxRows:10},placeholder:e.$t("linkDescStr")},domProps:{value:e.fillForm.desc},on:{input:function(t){e.fillForm.desc=t}}})],1)],1)]),e._v(" "),i("div",{staticClass:"form-group"},[i("div",{staticClass:"col-sm-12"},[i("el-form-item",{attrs:{prop:"review"}},[i("el-input",{directives:[{name:"model",rawName:"v-model",value:e.fillForm.review,expression:"fillForm.review"}],attrs:{type:"textarea",maxlength:360,autosize:{minRows:5,maxRows:10},placeholder:e.$t("linkReviewStr")},domProps:{value:e.fillForm.review},on:{input:function(t){e.fillForm.review=t}}})],1)],1)])])],1),e._v(" "),i("div",{staticClass:"operate-area"},[i("el-button",{on:{click:e.onResetClick}},[e._v("\n              "+e._s(this.$t("reset"))+"\n            ")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.onPublishClick}},[e._v("\n              "+e._s(this.$t("publish"))+"\n            ")])],1)]),e._v(" "),i("aside-list")],1)])])])},staticRenderFns:[]}}});