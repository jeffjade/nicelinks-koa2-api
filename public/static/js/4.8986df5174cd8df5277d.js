webpackJsonp([4,8],{300:function(e,i,t){var s=t(8)(t(322),t(309),null,null);e.exports=s.exports},309:function(e,i){e.exports={render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"wrapper",attrs:{id:"setting"}},[t("div",{directives:[{name:"loading",rawName:"v-loading.body",value:e.isLoading,expression:"isLoading",modifiers:{body:!0}}],staticClass:"panel-default"},[t("div",{staticClass:"panel-body"},[t("div",{staticClass:"main-container"},[t("div",{staticClass:"entry-list setting"},[t("el-card",{staticClass:"box-card"},[t("div",{staticClass:"clearfix",slot:"header"},[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v(e._s(e.$t("homePage")))]),e._v(" "),t("el-breadcrumb-item",[e._v(e._s(e.$t("accountSetting")))])],1)],1),e._v(" "),t("div",{staticClass:"form form-horizontal"},[t("el-form",{ref:"fillForm",attrs:{model:e.fillForm,rules:e.rules}},[t("div",{staticClass:"form-group"},[t("label",{staticClass:"col-sm-3 control-label"},[e._v(e._s(e.$t("setUsername"))),t("em",[e._v("*")]),e._v(":")]),e._v(" "),t("div",{staticClass:"col-sm-9"},[t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{directives:[{name:"model",rawName:"v-model",value:e.fillForm.username,expression:"fillForm.username"}],attrs:{disabled:!0,placeholder:""},domProps:{value:e.fillForm.username},on:{input:function(i){e.fillForm.username=i}}})],1)],1)]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",{staticClass:"col-sm-3 control-label"},[e._v(e._s(e.$t("setNickname"))),t("em",[e._v("*")]),e._v(":")]),e._v(" "),t("div",{staticClass:"col-sm-9"},[t("el-form-item",{attrs:{prop:"profile.nickname"}},[t("el-input",{directives:[{name:"model",rawName:"v-model",value:e.fillForm.profile.nickname,expression:"fillForm.profile.nickname"}],attrs:{placeholder:""},domProps:{value:e.fillForm.profile.nickname},on:{input:function(i){e.fillForm.profile.nickname=i}}})],1)],1)]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",{staticClass:"col-sm-3 control-label"},[e._v(e._s(e.$t("personalWebsite"))),t("em",[e._v("*")]),e._v(":")]),e._v(" "),t("div",{staticClass:"col-sm-9"},[t("el-form-item",{attrs:{prop:"profile.website"}},[t("el-input",{directives:[{name:"model",rawName:"v-model",value:e.fillForm.profile.website,expression:"fillForm.profile.website"}],attrs:{placeholder:""},domProps:{value:e.fillForm.profile.website},on:{input:function(i){e.fillForm.profile.website=i}}})],1)],1)]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",{staticClass:"col-sm-3 control-label"},[e._v(e._s(e.$t("profile"))+":")]),e._v(" "),t("div",{staticClass:"col-sm-9"},[t("el-input",{directives:[{name:"model",rawName:"v-model",value:e.fillForm.profile.description,expression:"fillForm.profile.description"}],attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},domProps:{value:e.fillForm.profile.description},on:{input:function(i){e.fillForm.profile.description=i}}})],1)])])],1),e._v(" "),t("div",{staticClass:"form-group"},[t("div",{staticClass:"col-sm-offset-3 col-sm-9 no-padding"},[t("el-button",{attrs:{loading:e.isLoading,type:"primary"},on:{click:e.onSaveClick}},[e._v(e._s(e.$t("saveSeting")))])],1)]),e._v(" "),e.tipMessageObj.message?t("el-alert",{attrs:{title:e.tipMessageObj.message,type:e.tipMessageObj.type}}):e._e()],1)],1),e._v(" "),t("aside-list")],1)])])])},staticRenderFns:[]}},322:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=t(46),r=t.n(s);i.default={name:"Setting",components:{},data:function(){return{tipMessageObj:{},isLoading:!1,fillForm:{_id:"",email:"",username:"",profile:{nickname:"",website:"",description:""}},rules:{username:[{required:!0,message:this.$t("pleaseEnter"),trigger:"change,blur"}],"profile.nickname":[{required:!0,message:this.$t("pleaseEnter"),trigger:"change,blur"}],"profile.website":[{required:!0,validator:this.$verifyUrl,trigger:"change,blur"}]}}},mounted:function(){this.initFetch()},methods:{initFetch:function(){var e=this;this.$apis.getProfile({_id:this.userInfo._id}).then(function(i){r()(e.fillForm,i)}).catch(function(i){e.errorAletTip(i,"error"),e.isLoading=!1})},errorAletTip:function(e,i){var t=this;this.tipMessageObj={message:e,type:i},setTimeout(function(){t.tipMessageObj={}},2e3)},onSaveClick:function(){var e=this;this.$refs.fillForm.validate(function(i){if(!i)return!1;e.isLoading=!0;var t=e.fillForm;e.$apis.setProfile(t).then(function(i){e.isLoading=!1,e.$message({message:i,type:"success"})}).catch(function(i){e.errorAletTip(i,"error"),e.isLoading=!1})})}},locales:{en:{},zh:{}}}}});