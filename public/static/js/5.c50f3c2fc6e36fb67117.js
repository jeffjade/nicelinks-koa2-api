webpackJsonp([5],{383:function(t,s,n){n(445);var i=n(4)(n(447),n(448),null,null);t.exports=i.exports},445:function(t,s,n){var i=n(446);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(374)("714c7e52",i,!0)},446:function(t,s,n){(t.exports=n(373)()).push([t.i,"\n#tags-coll-page .entry-list {\n  padding: 15px;\n}\n#tags-coll-page .entry-list .classify-title {\n    margin: 15px auto;\n}\n",""])},447:function(t,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={name:"TagsCollections",data:function(){return{isLoading:!1,tagsList:[]}},watch:{},created:function(){var t=this;this.$apis.getAllTags().then(function(s){t.tagsList=s.sort()}).catch(function(s){t.isLoading=!1,t.$message.error(""+s)})},mounted:function(){},methods:{onItemClick:function(t){this.$router.push("/tags/"+t)}}}},448:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"wrapper",attrs:{id:"tags-coll-page"}},[n("div",{directives:[{name:"loading",rawName:"v-loading.body",value:t.isLoading,expression:"isLoading",modifiers:{body:!0}}],staticClass:"panel-default"},[n("div",{staticClass:"panel-body"},[n("div",{staticClass:"main-container"},[n("div",{staticClass:"entry-list"},[n("h3",{staticClass:"classify-title"},[t._v(t._s(t.$t("tagsCollection")))]),t._v(" "),t._l(t.tagsList,function(s,i){return n("el-button",{key:s,attrs:{type:"text"},on:{click:function(n){t.onItemClick(s)}}},[t._v(t._s(s)+"\n          ")])})],2),t._v(" "),n("aside-list")],1)])])])},staticRenderFns:[]}}});