webpackJsonp([16],{414:function(t,i,e){var s=e(3)(e(516),e(517),null,null);t.exports=s.exports},424:function(t,i,e){"use strict";i.a={data:function(){var t=this;return{title:t.$t("niceLinksStr"),siteTitle:t.$t("niceLinksStr"),titleTemplate:"%s | "+this.$t("niceLinksStr"),keywords:t.$t("keywords"),description:t.$t("description")}},created:function(){},metaInfo:function(){var t=this;return{title:this.title,titleTemplate:function(i){return i?i+" - "+t.siteTitle:""+t.siteTitle},meta:[{name:"title",content:this.title?this.title+" - "+this.siteTitle:""+this.siteTitle},{name:"keywords",content:this.keywords},{vmid:"description",name:"description",content:this.description}]}},mounted:function(){},methods:{updatePageTitle:function(){}}}},516:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e(37),n=e(424);i.default={name:"Tags",mixins:[s.a,n.a],data:function(){return{}},watch:{},components:{},created:function(){this.$fetchSearch()},mounted:function(){this.title=this.$route.params.tags},methods:{}}},517:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"wrapper",attrs:{id:"tags-page"}},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticClass:"panel-default"},[e("div",{staticClass:"panel-body"},[e("div",{staticClass:"main-container"},[e("div",{staticClass:"entry-list"},[e("operate-tabs",{on:{"switch-tabs":t.$onSwitchTabs}}),t._v(" "),e("links-list",{attrs:{"is-abstract":!0,pdata:t.$niceLinksArray,"is-loading":t.isLoading}}),t._v(" "),e("load-more")],1),t._v(" "),e("aside-list")],1)])])])},staticRenderFns:[]}}});