webpackJsonp([3],{414:function(t,e,l){l(492);var a=l(3)(l(494),l(498),null,null);t.exports=a.exports},492:function(t,e,l){var a=l(493);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);l(401)("127f79f0",a,!0)},493:function(t,e,l){(t.exports=l(400)()).push([t.i,"\n#manage-links .entry-list {\n  width: 100%;\n  padding: 15px;\n}\n#manage-links .entry-list .classify-title {\n    margin: 15px auto;\n}\n",""])},494:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l(34),i=l.n(a),s=l(495),o=l.n(s),n=l(10);e.default={name:"ManageLinks",data:function(){return{isLoading:!1,isShowDlgFlag:!1,activeName:"first",classifyList:n.default.classify,themeList:n.default.theme,tableData:[],tableControl:{totalCount:30,pageCount:1,pageSize:20,sortType:-1,sortTarget:"created"},currentRowData:{}}},components:{EditDialog:o.a},created:function(){this.initFetch()},watch:{activeName:function(t){this.initFetch()}},methods:{initFetch:function(){var t=this,e={};i()(e,this.tableControl),e.active=!("first"===this.activeName),this.isLoading=!0,this.$apis.getAllLinks(e).then(function(e){t.isLoading=!1,t.tableData=e}).catch(function(e){t.isLoading=!1,t.$message.error(""+e)}).finally(function(){t.isLoading=!1}),this.$apis.getAllLinksCount(e).then(function(e){t.tableControl.totalCount=e}).catch(function(t){})},fillThemeName:function(t,e){var l="";return this.themeList[t].map(function(t){t.value===e&&(l=t.key)}),l},handleClick:function(){},handleSizeChange:function(t){this.tableControl.pageSize=t,this.initFetch()},handleCurrentChange:function(t){this.tableControl.pageCount=t,this.initFetch()},handleEdit:function(t){this.isShowDlgFlag=!0,this.currentRowData=t},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除该条目, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.operatorId=e.userInfo&&e.userInfo._id,e.isLoading=!0,e.$apis.deleteNiceLinks(t).then(function(t){e.$message({type:"success",message:"删除成功!"}),e.initFetch(),e.isLoading=!1}).catch(function(t){e.isLoading=!1,e.$message.error(""+t)})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},onUpdateSuccess:function(){this.initFetch()},onCreaterClick:function(t){this.$router.push("/member/"+t)}},locales:{en:{approved:"Approved",unapproved:"Unapproved",isActived:"Is Actived",creater:"Creater"},zh:{approved:"已审核",unapproved:"未审核",isActived:"是否已激活",creater:"创建者"}}}},495:function(t,e,l){var a=l(3)(l(496),l(497),null,null);t.exports=a.exports},496:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l(10);e.default={name:"EditDialog",data:function(){return{isShowDlgFlag:!1,isLoading:!1,fillForm:{urlPath:"",title:"",desc:"",classify:"",theme:"",tags:[]},themeList:[],tagsList:a.default.tags,classifyList:a.default.classify,rules:{urlPath:[{required:!0,validator:this.$verifyUrl,trigger:"change,blur"}],title:[{required:!0,message:this.$t("pleaseEnter")+this.$t("linkNameStr"),trigger:"change,blur"}],theme:[{required:!0,message:this.$t("pleaseSelect")+this.$t("linkThemeStr"),trigger:"change,blur"}],classify:[{required:!0,message:this.$t("pleaseSelect")+this.$t("linkClassifyStr"),trigger:"change,blur"}]}}},props:{value:{type:Boolean,default:!1},pdata:{type:Object,default:{}}},computed:{},watch:{value:function(t){this.isShowDlgFlag=t},isShowDlgFlag:function(t){this.$emit("input",t)},"fillForm.classify":function(t){this.themeList=a.default.theme[this.fillForm.classify]||[]},pdata:function(t){this.fillForm=this.$_.cloneDeep(t)}},methods:{onCommitClick:function(){var t=this;this.$refs.fillForm.validate(function(e){if(e){t.isLoading=!0;var l=t.$_.clone(t.fillForm,!0);l.managerId=t.userInfo&&t.userInfo._id,l.managerRole=t.userInfo&&t.userInfo.role,t.$apis.updateNiceLinks(l).then(function(e){t.isLoading=!1,t.isShowDlgFlag=!1,t.$message({message:t.$t("successAddTip"),type:"success"}),t.$emit("update-success")}).catch(function(e){t.isLoading=!1,t.$message.error(""+e)})}})}},locales:{en:{successAddTip:"Well, you have successfully added the link"},zh:{successAddTip:"很好，您已成功修改该链接"}}}},497:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{attrs:{id:"edit-dialog"}},[l("el-dialog",{directives:[{name:"model",rawName:"v-model",value:t.isShowDlgFlag,expression:"isShowDlgFlag"},{name:"loading",rawName:"v-loading.body",value:t.isLoading,expression:"isLoading",modifiers:{body:!0}}],attrs:{stripe:"",title:t.$t("injectLinks"),size:"small"},domProps:{value:t.isShowDlgFlag},on:{input:function(e){t.isShowDlgFlag=e}}},[l("div",{staticClass:"form form-horizontal"},[l("el-form",{ref:"fillForm",attrs:{model:t.fillForm,rules:t.rules}},[l("div",{staticClass:"form-group"},[l("label",{staticClass:"col-sm-3 control-label"},[t._v(" "+t._s(this.$t("linkAddressStr"))+" "),l("em",[t._v("*")]),t._v("：")]),t._v(" "),l("div",{staticClass:"col-sm-8"},[l("el-form-item",{attrs:{prop:"urlPath"}},[l("el-input",{directives:[{name:"model",rawName:"v-model",value:t.fillForm.urlPath,expression:"fillForm.urlPath"}],attrs:{placeholder:this.$t("pleaseEnter")+this.$t("linkAddressStr")},domProps:{value:t.fillForm.urlPath},on:{input:function(e){t.fillForm.urlPath=e}}})],1)],1)]),t._v(" "),l("div",{staticClass:"form-group"},[l("label",{staticClass:"col-sm-3 control-label"},[t._v(" "+t._s(this.$t("linkNameStr"))+" "),l("em",[t._v("*")]),t._v("：")]),t._v(" "),l("div",{staticClass:"col-sm-8"},[l("el-form-item",{attrs:{prop:"title"}},[l("el-input",{directives:[{name:"model",rawName:"v-model",value:t.fillForm.title,expression:"fillForm.title"}],attrs:{placeholder:this.$t("pleaseEnter")+this.$t("linkNameStr")},domProps:{value:t.fillForm.title},on:{input:function(e){t.fillForm.title=e}}})],1)],1)]),t._v(" "),l("div",{staticClass:"form-group"},[l("label",{staticClass:"col-sm-3 control-label"},[t._v(" "+t._s(this.$t("linkClassifyStr"))+" "),l("em",[t._v("*")]),t._v("：")]),t._v(" "),l("div",{staticClass:"col-sm-8"},[l("el-form-item",{attrs:{prop:"classify"}},[l("el-select",{directives:[{name:"model",rawName:"v-model",value:t.fillForm.classify,expression:"fillForm.classify"}],staticClass:"wrap-block",attrs:{placeholder:this.$t("pleaseSelect")+this.$t("linkClassifyStr")},domProps:{value:t.fillForm.classify},on:{input:function(e){t.fillForm.classify=e}}},t._l(t.classifyList,function(e){return l("el-option",{key:e.key,attrs:{label:t.$t(e.name),value:e.value}})}))],1)],1)]),t._v(" "),l("div",{staticClass:"form-group"},[l("label",{staticClass:"col-sm-3 control-label"},[t._v(" "+t._s(this.$t("linkThemeStr"))+" "),l("em",[t._v("*")]),t._v("：")]),t._v(" "),l("div",{staticClass:"col-sm-8"},[l("el-form-item",{attrs:{prop:"theme"}},[l("el-select",{directives:[{name:"model",rawName:"v-model",value:t.fillForm.theme,expression:"fillForm.theme"}],staticClass:"wrap-block",attrs:{placeholder:this.$t("pleaseSelect")+this.$t("linkThemeStr")},domProps:{value:t.fillForm.theme},on:{input:function(e){t.fillForm.theme=e}}},t._l(t.themeList,function(t){return l("el-option",{key:t.key,attrs:{label:t.key,value:t.value}})}))],1)],1)]),t._v(" "),l("div",{staticClass:"form-group"},[l("label",{staticClass:"col-sm-3 control-label"},[t._v(" "+t._s(this.$t("linkTagsStr"))+" "),l("em",[t._v("*")]),t._v("：")]),t._v(" "),l("div",{staticClass:"col-sm-8"},[l("el-form-item",{attrs:{prop:"tags"}},[l("el-select",{directives:[{name:"model",rawName:"v-model",value:t.fillForm.tags,expression:"fillForm.tags"}],staticClass:"wrap-block",attrs:{"allow-create":"",multiple:"",filterable:"","multiple-limit":3,placeholder:this.$t("pleaseSelect")+this.$t("linkTagsStr")},domProps:{value:t.fillForm.tags},on:{input:function(e){t.fillForm.tags=e}}},t._l(t.tagsList,function(t,e){return l("el-option",{key:e,attrs:{label:t,value:t}})}))],1)],1)]),t._v(" "),l("div",{staticClass:"form-group"},[l("label",{staticClass:"col-sm-3 control-label"},[t._v(" "+t._s(this.$t("linkDescStr"))+" "),l("em",[t._v("*")]),t._v("：")]),t._v(" "),l("div",{staticClass:"col-sm-8"},[l("el-form-item",{attrs:{prop:"desc"}},[l("el-input",{directives:[{name:"model",rawName:"v-model",value:t.fillForm.desc,expression:"fillForm.desc"}],attrs:{type:"textarea",maxlength:360,autosize:{minRows:2,maxRows:10},placeholder:this.$t("pleaseSelect")+this.$t("linkDescStr")},domProps:{value:t.fillForm.desc},on:{input:function(e){t.fillForm.desc=e}}})],1)],1)]),t._v(" "),l("div",{staticClass:"form-group"},[l("label",{staticClass:"col-sm-3 control-label"},[t._v(" "+t._s(this.$t("isAcive"))+" "),l("em",[t._v("*")]),t._v("：")]),t._v(" "),l("div",{staticClass:"col-sm-8"},[l("el-switch",{directives:[{name:"model",rawName:"v-model",value:t.fillForm.active,expression:"fillForm.active"}],attrs:{"on-text":t.$t("yes"),"off-text":t.$t("no"),"on-color":"#13ce66","off-color":"#ff4949"},domProps:{value:t.fillForm.active},on:{input:function(e){t.fillForm.active=e}}})],1)])])],1),t._v(" "),l("div",{staticClass:"dialog-footer",slot:"footer"},[l("el-button",{on:{click:function(e){t.isShowDlgFlag=!1}}},[t._v(t._s(this.$t("cancel")))]),t._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:t.onCommitClick}},[t._v(t._s(this.$t("confirm")))])],1)])],1)},staticRenderFns:[]}},498:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"wrapper",attrs:{id:"manage-links"}},[l("div",{directives:[{name:"loading",rawName:"v-loading.body",value:t.isLoading,expression:"isLoading",modifiers:{body:!0}}],staticClass:"panel-default"},[l("div",{staticClass:"panel-body"},[l("div",{staticClass:"main-container"},[l("div",{staticClass:"entry-list"},[l("el-tabs",{directives:[{name:"model",rawName:"v-model",value:t.activeName,expression:"activeName"}],domProps:{value:t.activeName},on:{"tab-click":t.handleClick,input:function(e){t.activeName=e}}},[l("el-tab-pane",{attrs:{label:t.$t("unapproved"),name:"first"}}),t._v(" "),l("el-tab-pane",{attrs:{label:t.$t("approved"),name:"second"}})],1),t._v(" "),l("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:""}},[l("el-table-column",{attrs:{prop:"classify",label:t.$t("linkClassifyStr"),width:"100"},scopedSlots:{default:function(e){return[t._v("\n                "+t._s(t.$t(t.classifyList[e.row.classify].name))+"\n              ")]}}}),t._v(" "),l("el-table-column",{attrs:{prop:"active",label:t.$t("isActived"),width:"100"},scopedSlots:{default:function(e){return[l("el-tag",{attrs:{type:e.row.active?"success":"error"}},[t._v("\n                  "+t._s(e.row.active?t.$t("yes"):t.$t("no"))+"\n                ")])]}}}),t._v(" "),l("el-table-column",{attrs:{prop:"createdBy",label:t.$t("creater"),width:"100"},scopedSlots:{default:function(e){return[l("el-button",{attrs:{type:"text"},on:{click:function(l){t.onCreaterClick(e.row.createdBy)}}},[t._v("\n                  "+t._s(e.row.createdBy)+"\n                ")])]}}}),t._v(" "),l("el-table-column",{attrs:{prop:"theme",label:t.$t("linkThemeStr"),width:"100"},scopedSlots:{default:function(e){return[t._v("\n              "+t._s(t.fillThemeName(e.row.classify,e.row.theme))+"\n              ")]}}}),t._v(" "),l("el-table-column",{attrs:{prop:"urlPath",label:t.$t("linkAddressStr"),"min-width":"180"},scopedSlots:{default:function(e){return[l("a",{staticClass:"title-link",attrs:{href:e.row.urlPath,target:"_blank"}},[t._v("\n                  "+t._s(e.row.title)+"\n                ")])]}}}),t._v(" "),l("el-table-column",{attrs:{prop:"created",label:t.$t("createdDateStr"),width:"160"},scopedSlots:{default:function(e){return[t._v(t._s(t._f("dateConvert")(e.row.created)))]}}}),t._v(" "),l("el-table-column",{attrs:{label:t.$t("operation"),width:"160"},scopedSlots:{default:function(e){return[l("el-button",{attrs:{size:"small"},on:{click:function(l){t.handleEdit(e.row)}}},[t._v(t._s(t.$t("edit")))]),t._v(" "),l("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(l){t.handleDelete(e.row)}}},[t._v(t._s(t.$t("delete")))])]}}})],1),t._v(" "),l("div",{staticClass:"table-operate"},[l("el-pagination",{attrs:{total:t.tableControl.totalCount,"current-page":t.tableControl.pageCount,"page-size":t.tableControl.pageSize,"page-sizes":[20,50,100],layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)])])]),t._v(" "),l("edit-dialog",{directives:[{name:"model",rawName:"v-model",value:t.isShowDlgFlag,expression:"isShowDlgFlag"}],attrs:{pdata:t.currentRowData},domProps:{value:t.isShowDlgFlag},on:{"update-success":t.onUpdateSuccess,input:function(e){t.isShowDlgFlag=e}}})],1)},staticRenderFns:[]}}});