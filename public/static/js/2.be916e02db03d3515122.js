webpackJsonp([2,8],{562:function(e,n,t){t(579);var i=t(36)(t(574),t(585),null,null);e.exports=i.exports},574:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{isLoading:!1,checkLoading:!1,tipMessageObj:{},account:{email:"",username:"",password:""},_debounceSearch:null,rules:{username:[{required:!0,validator:this.validateUsername,trigger:"change,blur"}],email:[{required:!0,validator:this.validateEmail,trigger:"change,blur"}],password:[{required:!0,validator:this.validatePassword,trigger:"change,blur"}]}}},created:function(){this._debounceSearch=this.$_.debounce(this.queryUsername,300)},mounted:function(){},components:{},computed:{isSignUpPage:function(){return"/register"===this.$route.path}},methods:{composeParams:function(){return{email:this.account.email,username:this.account.username,password:this.$util.encryptPwd(this.account.password)}},queryUsername:function(){var e=this;return this.checkLoading=!0,this.$apis.checkIsExisted({username:this.account.username}).then(function(n){return e.checkLoading=!1,!0}).catch(function(n){return e.checkLoading=!1,e.tipMessageObj={message:n,type:"error"},!1})},validateUsername:function(e,n,t){!n||n.length<=0?t(new Error(this.$t("enterUsernameTip"))):this.$util.isLegalUsername(n)?this._debounceSearch()?t():t(new Error(this.$t("enterUsernameTip"))):t(new Error(this.$t("enterLegalUsernameTip")))},validateEmail:function(e,n,t){!n||n.length<=0?t(new Error(this.$t("enterEmailTip"))):this.$util.isLegalEmail(n)?t():t(new Error(this.$t("enterLegalEmailTip")))},validatePassword:function(e,n,t){return this.isSignUpPage?void(!n||n.length<=0?t(new Error(this.$t("enterPwdTip"))):this.$util.isLegalPassword(n)?t():t(new Error(this.$t("enterLegalPwdTip")))):void t()},onLoginClick:function(){var e=this;this.$refs.validateForm.validate(function(n){return!!n&&(e.isLoading=!1,void e.$apis.login(e.composeParams()).then(function(n){e.$store.commit("$vuexSetUserInfo",n),e.isLoading=!1,e.$router.push("/")}).catch(function(n){e.isLoading=!1,e.tipMessageObj={message:n,type:"error"}}))})},onSignupClick:function(){var e=this;this.$refs.validateForm.validate(function(n){return!!n&&(e.isLoading=!1,void e.$apis.signup(e.composeParams()).then(function(n){e.tipMessageObj={message:n,type:"success"}}).catch(function(n){e.isLoading=!1,e.tipMessageObj={message:n,type:"error"}}))})},onForgotPwdClick:function(){this.$router.push("forgot-pwd")}},locales:{en:{enterUsernameTip:"Please Enter UserName(Only letters and numbers，3-16)",enterLegalUsernameTip:"Please Enter UserName(Only letters and numbers，3-16)",enterEmailTip:"Please Enter Email",enterLegalEmailTip:"Please Enter A Valid Email Box",enterPwdTip:"Enter Password(Contains at least one letter and number, 6-18)",enterLegalPwdTip:"Enter A Valid Password",signupBottomTip:"Don't have an account ?",signinBottomTip:"Already have an account?"},zh:{enterUsernameTip:"请输入用户名(仅限字母和数字，3至16位)",enterLegalUsernameTip:"请输入用户名(仅限字母和数字，3至16位)",enterEmailTip:"请输入邮箱",enterLegalEmailTip:"请输入有效邮箱",enterPwdTip:"请输入密码(至少包含一个字母和数字，6至18位)",enterLegalPwdTip:"请输入合法密码",signupBottomTip:"你已拥有一个账号？",signinBottomTip:"还未拥有一个账号？"}}}},577:function(e,n,t){n=e.exports=t(558)(),n.push([e.i,"\n.login-wrap {\n  width: 520px;\n  margin: 0 auto;\n  padding-top: 150px;\n  min-height: 400px;\n  position: relative;\n}\n.login-wrap .login-bottom-tip {\n    font-size: 1.56rem;\n    padding: 15px 0;\n}\n.login-box {\n  width: 520px;\n  padding: 30px 30px 0px 30px;\n  height: 100%;\n  background-color: #fff;\n  clear: both;\n  display: table;\n  border-radius: 3px;\n  border: 1px solid #d7dce5;\n}\n.login-box .heading {\n    text-align: center;\n    margin-bottom: 30px;\n    font-size: 24px;\n    color: #707473;\n}\n.login-box img {\n    display: block;\n    margin: 0 auto 20px;\n}\n.login-box .el-form-item {\n    margin-bottom: 30px;\n}\n.login-box .el-button {\n    display: block;\n    width: 100%;\n    margin: 0 auto;\n    margin-bottom: 15px;\n}\n.login-box .el-input .icons {\n    display: block;\n    width: 20px;\n    height: 20px;\n    margin: 0;\n    padding: 0;\n}\n@media (max-width: 500px) {\n.login-wrap {\n    width: 100%;\n    padding-top: 60px;\n}\n.login-box {\n    width: 100%;\n    border: 0 none;\n}\n}\n",""])},579:function(e,n,t){var i=t(577);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);t(559)("7ed6ed77",i,!0)},585:function(e,n,t){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"login-wrap"},[t("div",{staticClass:"login-box"},[e._m(0),e._v(" "),t("h3",[e._v(e._s(e.isSignUpPage?e.$t("signUp"):e.$t("signIn")))]),e._v(" "),t("div",{staticClass:"form-group"},[e.tipMessageObj.message?t("el-alert",{attrs:{title:e.tipMessageObj.message,type:e.tipMessageObj.type}}):e._e()],1),e._v(" "),t("el-form",{ref:"validateForm",attrs:{model:e.account,rules:e.rules}},[e.isSignUpPage?t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{directives:[{name:"model",rawName:"v-model.trim.lazy",value:e.account.username,expression:"account.username",modifiers:{trim:!0,lazy:!0}}],attrs:{icon:e.checkLoading?"loading":"",autofocus:!0},domProps:{value:e.account.username},on:{change:function(n){e.account.username="string"==typeof n?n.trim():n},blur:function(n){e.$forceUpdate()}},nativeOn:{keydown:function(n){e._k(n.keyCode,"enter",13)||e.onLoginClick(n)}}},[t("template",{slot:"prepend"},[t("icon",{staticClass:"icons",attrs:{name:"login-user"}})],1)],2)],1):e._e(),e._v(" "),t("el-form-item",{attrs:{prop:"email"}},[t("el-input",{directives:[{name:"model",rawName:"v-model.trim",value:e.account.email,expression:"account.email",modifiers:{trim:!0}}],domProps:{value:e.account.email},on:{input:function(n){e.account.email="string"==typeof n?n.trim():n},blur:function(n){e.$forceUpdate()}},nativeOn:{keydown:function(n){e._k(n.keyCode,"enter",13)||e.onLoginClick(n)}}},[t("template",{slot:"prepend"},[t("icon",{staticClass:"icons",attrs:{name:"login-email"}})],1)],2)],1),e._v(" "),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{directives:[{name:"model",rawName:"v-model",value:e.account.password,expression:"account.password"}],attrs:{type:"password"},domProps:{value:e.account.password},on:{input:function(n){e.account.password=n}},nativeOn:{keydown:function(n){e._k(n.keyCode,"enter",13)||e.onLoginClick(n)}}},[t("template",{slot:"prepend"},[t("icon",{staticClass:"icons",attrs:{name:"password"}})],1)],2)],1),e._v(" "),e.isSignUpPage?t("el-button",{attrs:{loading:e.isLoading,size:"large"},on:{click:e.onSignupClick}},[e._v(e._s(e.$t("signUp")))]):t("el-button",{attrs:{type:"primary",loading:e.isLoading,size:"large"},on:{click:e.onLoginClick}},[e._v(e._s(e.$t("signIn")))]),e._v(" "),t("el-button",{attrs:{type:"text",loading:e.isLoading,size:"large"},on:{click:e.onForgotPwdClick}},[e._v(e._s(e.$t("forgetPwd")))])],1)],1),e._v(" "),t("div",{staticClass:"form-group login-bottom-tip"},[t("p",{staticClass:"text-center"},[e._v(e._s(e.isSignUpPage?e.$t("signupBottomTip"):e.$t("signinBottomTip"))+"\n      "),t("a",{staticClass:"el-button--text",attrs:{href:e.isSignUpPage?"/login":"/register"}},[e._v("\n      "+e._s(e.isSignUpPage?e.$t("signIn"):e.$t("signUp")))])])])])},staticRenderFns:[function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("a",{attrs:{href:"/"}},[i("img",{attrs:{src:t(192),alt:"nice links logo"}})])}]}}});