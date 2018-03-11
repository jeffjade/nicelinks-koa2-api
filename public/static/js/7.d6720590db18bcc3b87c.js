webpackJsonp([7],{420:function(t,e,i){i(535);var n=i(2)(i(537),i(538),null,null);t.exports=n.exports},422:function(t,e,i){"use strict";e.a={data:function(){var t=this;return{title:t.$t("niceLinksStr"),siteTitle:t.$t("niceLinksStr"),titleTemplate:"%s | "+this.$t("niceLinksStr"),keywords:t.$t("keywords"),description:t.$t("description")}},created:function(){},metaInfo:function(){var t=this,e=this.title?this.title+" - "+this.siteTitle:""+this.siteTitle;return{title:this.title,titleTemplate:function(e){return e?e+" - "+t.siteTitle:""+t.siteTitle},meta:[{vmid:"title",name:"title",content:e},{vmid:"keywords",name:"keywords",content:this.keywords},{vmid:"description",name:"description",content:this.description},{vmid:"og:type",property:"og:type",content:"website"},{vmid:"og:title",property:"og:title",content:e},{vmid:"og:image",property:"og:image",content:"https://static.nicelinks.site/static/img/favicons/favicon.png"},{vmid:"og:keywords",property:"og:keywords",content:this.keywords},{vmid:"og:description",property:"og:description",content:this.description},{vmid:"twitter:card",name:"twitter:card",content:"summary"},{vmid:"twitter:site",name:"twitter:site",content:"@jeffjade2"},{vmid:"twitter:title",name:"twitter:title",content:e},{vmid:"twitter:image",property:"og:image",content:"https://static.nicelinks.site/static/img/favicons/favicon.png"},{vmid:"twitter:keywords",name:"twitter:keywords",content:this.keywords},{vmid:"twitter:description",name:"twitter:description",content:this.description}]}},mounted:function(){},methods:{}}},535:function(t,e,i){var n=i(536);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i(404)("7eb6f702",n,!0)},536:function(t,e,i){(t.exports=i(403)()).push([t.i,"\n#manage-users .entry-list {\n  width: 100%;\n  padding: 15px;\n}\n#manage-users .entry-list .classify-title {\n    margin: 15px auto;\n}\n",""])},537:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(422);e.default={name:"ManageAdverts",mixins:[n.a],data:function(){return{title:this.$t("manageAdverts"),isLoading:!1,tableData:[]}},components:{},created:function(){this.initFetch()},watch:{},methods:{initFetch:function(){var t=this;this.isLoading=!0,this.$apis.getAdverts({}).then(function(e){t.isLoading=!1,t.tableData=e}).catch(function(e){t.isLoading=!1,t.$message.error(""+e)}).finally(function(){t.isLoading=!1})},handleSave:function(t){var e=this;this.isLoading=!0,this.$apis.updateAdverts(t).then(function(t){e.isLoading=!1,e.$message({message:"已成功保存",type:"success"})}).catch(function(t){e.isLoading=!1,e.$message.error(""+t)}).finally(function(){e.isLoading=!1})},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除该条目, 是否继续?",this.$t("warmReminder"),{confirmButtonText:this.$t("confirm"),cancelButtonText:this.$t("cancel"),type:"warning"}).then(function(){e.isLoading=!0,e.$apis.removeAdverts(t).then(function(t){e.$message({message:"已成功删除",type:"success"}),e.initFetch()}).catch(function(t){e.isLoading=!1,e.$message.error(""+t)})}).catch(function(){})},onAddAdsClick:function(){this.tableData.push({path:"",image:"",alt:"",active:!0,sort:0,modifyTime:new Date})}},locales:{en:{approved:"Approved",unapproved:"Unapproved",isActived:"Is Actived",creater:"Creater"},zh:{approved:"已审核",unapproved:"未审核",isActived:"是否已激活",creater:"创建者"}}}},538:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wrapper",attrs:{id:"manage-users"}},[i("div",{directives:[{name:"loading",rawName:"v-loading.body",value:t.isLoading,expression:"isLoading",modifiers:{body:!0}}],staticClass:"panel-default"},[i("div",{staticClass:"panel-body"},[i("div",{staticClass:"main-container"},[i("div",{staticClass:"entry-list"},[i("el-carousel",{staticClass:"jade-gg-body",attrs:{trigger:"click","indicator-position":"outside",interval:3600,height:"256px"}},t._l(t.tableData,function(t,e){return i("el-carousel-item",{key:e},[i("a",{attrs:{href:t.path,target:"_blank"}},[i("img",{attrs:{src:t.image}})])])})),t._v(" "),i("div",{staticClass:"form-group"},[i("el-button",{attrs:{plain:!0,type:"success",size:"large"},on:{click:t.onAddAdsClick}},[t._v("添加广告\n            ")])],1),t._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:""}},[i("el-table-column",{attrs:{prop:"path",label:"地址","min-width":"200"},scopedSlots:{default:function(t){return[i("el-input",{directives:[{name:"model",rawName:"v-model",value:t.row.path,expression:"scope.row.path"}],domProps:{value:t.row.path},on:{input:function(e){t.row.path=e}}})]}}}),t._v(" "),i("el-table-column",{attrs:{prop:"image",label:"图片","min-width":"200"},scopedSlots:{default:function(t){return[i("el-input",{directives:[{name:"model",rawName:"v-model",value:t.row.image,expression:"scope.row.image"}],domProps:{value:t.row.image},on:{input:function(e){t.row.image=e}}})]}}}),t._v(" "),i("el-table-column",{attrs:{prop:"image",label:"描述","min-width":"160"},scopedSlots:{default:function(t){return[i("el-input",{directives:[{name:"model",rawName:"v-model",value:t.row.alt,expression:"scope.row.alt"}],domProps:{value:t.row.alt},on:{input:function(e){t.row.alt=e}}})]}}}),t._v(" "),i("el-table-column",{attrs:{prop:"image",label:"排序","min-width":"100"},scopedSlots:{default:function(t){return[i("el-input",{directives:[{name:"model",rawName:"v-model",value:t.row.sort,expression:"scope.row.sort"}],domProps:{value:t.row.sort},on:{input:function(e){t.row.sort=e}}})]}}}),t._v(" "),i("el-table-column",{attrs:{prop:"active",label:t.$t("isActived"),width:"100"},scopedSlots:{default:function(e){return[i("el-switch",{directives:[{name:"model",rawName:"v-model",value:e.row.active,expression:"scope.row.active"}],attrs:{"on-text":t.$t("yes"),"off-text":t.$t("no"),"on-color":"#13ce66","off-color":"#ff4949"},domProps:{value:e.row.active},on:{input:function(t){e.row.active=t}}})]}}}),t._v(" "),i("el-table-column",{attrs:{prop:"modifyTime",label:"修改时间",width:"160"},scopedSlots:{default:function(e){return[t._v("\n                "+t._s(t._f("dateConvert")(e.row.modifyTime))+"\n              ")]}}}),t._v(" "),i("el-table-column",{attrs:{label:t.$t("operation"),width:"160"},scopedSlots:{default:function(e){return[i("el-button",{attrs:{size:"small"},on:{click:function(i){t.handleSave(e.row)}}},[t._v(t._s(t.$t("save"))+"\n                ")]),t._v(" "),i("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(i){t.handleDelete(e.row)}}},[t._v(t._s(t.$t("delete"))+"\n                ")])]}}})],1)],1)])])])])},staticRenderFns:[]}}});