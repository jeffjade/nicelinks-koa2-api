webpackJsonp([13],{407:function(t,a,e){var s=e(2)(e(473),e(474),null,null);t.exports=s.exports},473:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(105);a.default={name:"Tags",mixins:[s.a],data:function(){return{}},watch:{},components:{},created:function(){this.fetchSearch()},mounted:function(){},methods:{}}},474:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"wrapper",attrs:{id:"tags-page"}},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticClass:"panel-default"},[e("div",{staticClass:"panel-body"},[e("div",{staticClass:"main-container"},[e("div",{staticClass:"entry-list"},[e("operate-tabs",{on:{"switch-tabs":t.onSwitchTabs}}),t._v(" "),e("links-list",{attrs:{pdata:t.niceLinksArr,"is-loading":t.isLoading}}),t._v(" "),e("load-more")],1),t._v(" "),e("aside-list")],1)])])])},staticRenderFns:[]}}});