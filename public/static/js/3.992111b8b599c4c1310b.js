(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{426:function(e,i,t){t(500);var a=t(4)(t(498),t(493),null,null);e.exports=a.exports},429:function(e,i,t){"use strict";i.a={data:function(){var e=this;return{title:e.$t("niceLinksStr"),siteTitle:e.$t("niceLinksStr"),titleTemplate:"%s | "+this.$t("niceLinksStr"),keywords:e.$t("keywords"),description:e.$t("description")}},created:function(){},metaInfo:function(){var e=this,i=this.title?this.title+" - "+this.siteTitle:""+this.siteTitle;return{title:this.title,titleTemplate:function(i){return i?i+" - "+e.siteTitle:""+e.siteTitle},meta:[{vmid:"title",name:"title",content:i},{vmid:"keywords",name:"keywords",content:this.keywords},{vmid:"description",name:"description",content:this.description},{vmid:"og:type",property:"og:type",content:"website"},{vmid:"og:title",property:"og:title",content:i},{vmid:"og:image",property:"og:image",content:"https://static.nicelinks.site/static/img/favicons/favicon.png"},{vmid:"og:keywords",property:"og:keywords",content:this.keywords},{vmid:"og:description",property:"og:description",content:this.description}]}},mounted:function(){},methods:{}}},430:function(e,i,t){t(434);var a=t(4)(t(432),t(431),null,null);e.exports=a.exports},431:function(e,i){e.exports={render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"jade-markdown"},[t("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.onHandleClick},model:{value:e.activeName,callback:function(i){e.activeName=i},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:e.$t("write"),name:"write"}}),e._v(" "),t("el-tab-pane",{attrs:{label:e.$t("preview"),name:"preview"}})],1),e._v(" "),"write"===e.activeName?t("div",{staticClass:"write-area"},[t("el-input",{attrs:{type:"textarea",placeholder:e.placeholder,maxlength:3600,autosize:{minRows:6,maxRows:21}},on:{change:e.onChangeEvent},model:{value:e.originalVal,callback:function(i){e.originalVal=i},expression:"originalVal"}})],1):e._e(),e._v(" "),"preview"===e.activeName?t("preview-md",{staticClass:"preview-area",attrs:{value:e.originalVal}}):e._e()],1)},staticRenderFns:[]}},432:function(e,i,t){"use strict";t.r(i);var a=t(90),r=t.n(a);i.default={name:"Markdown",data:function(){return{activeName:"write",originalVal:""}},props:{value:{type:String,default:""},placeholder:{type:String,default:""}},watch:{value:function(e){this.originalVal=e}},components:{PreviewMd:r.a},created:function(){},mounted:function(){this.originalVal=this.value},methods:{onChangeEvent:function(e){this.$emit("input",e)},onHandleClick:function(){}},locales:{en:{write:"Write",preview:"Preview"},zh:{write:"编写",preview:"预览"}}}},433:function(e,i,t){(e.exports=t(8)()).push([e.i,".jade-markdown{padding:15px 0;border:1px solid #d1d5da;border-radius:3px}.jade-markdown .el-tabs--card .el-tabs__nav{height:36px;margin-left:15px}.jade-markdown .el-tabs--card .el-tabs__nav .el-tabs__item{height:36px;line-height:36px}.jade-markdown .preview-area,.jade-markdown .write-area{padding:0 15px}",""])},434:function(e,i,t){var a=t(433);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals),t(7)("2fc04698",a,!0)},435:function(e,i,t){"use strict";t.r(i);var a=t(130),r=t.n(a),o=t(12),p=t.n(o),c=t(65),s=t.n(c),n=t(26),l=t.n(n),v={zh:{hint:"点击，或拖动图片至此处",loading:"正在上传……",noSupported:"浏览器不支持该功能，请使用IE10以上或其他现在浏览器！",success:"上传成功",fail:"图片上传失败",preview:"头像预览",btn:{off:"取消",close:"关闭",back:"上一步",save:"保存"},error:{onlyImg:"仅限图片格式",outOfSize:"单文件大小不能超过 ",lowestPx:"图片最低像素为（宽*高）："}},en:{hint:"Click or drag the file here to upload",loading:"Uploading…",noSupported:"Browser is not supported, please use IE10+ or other browsers",success:"Upload success",fail:"Upload failed",preview:"Preview",btn:{off:"Cancel",close:"Close",back:"Back",save:"Save"},error:{onlyImg:"Image only",outOfSize:"Image exceeds size limit: ",lowestPx:"Image's size is too low. Expected at least: "}}},d={jpg:"image/jpeg",png:"image/png",gif:"image/gif",svg:"image/svg+xml",psd:"image/photoshop"};i.default={name:"UploadAvatar",props:{field:{type:String,default:"avatar"},ki:{default:0},value:{default:!0},url:{type:String,default:""},params:{type:Object,default:null},headers:{type:Object,default:null},width:{type:Number,default:200},height:{type:Number,default:200},noCircle:{type:Boolean,default:!1},maxSize:{type:Number,default:10240},langType:{type:String,default:"zh"},langExt:{type:Object,default:null},imgFormat:{type:String,default:"png"}},data:function(){var e=this,i=e.imgFormat,t=e.langType,a=e.langExt,r=e.width,o=e.height,p=!0,c=-1===["jpg","png"].indexOf(i)?"jpg":i,s=v[t]?v[t]:v.en,n=d[c];return e.imgFormat=c,a&&l()(s,a),"function"!=typeof FormData&&(p=!1),{mime:n,lang:s,isSupported:p,isSupportTouch:document.hasOwnProperty("ontouchstart"),step:1,loading:0,progress:0,hasError:!1,errorMsg:"",ratio:r/o,sourceImg:null,sourceImgUrl:"",createImgUrl:"",imgData:"",sourceImgMouseDown:{on:!1,mX:0,mY:0,x:0,y:0},previewContainer:{width:100,height:100},sourceImgContainer:{width:240,height:180},scale:{zoomAddOn:!1,zoomSubOn:!1,range:1,x:0,y:0,width:0,height:0,maxWidth:0,maxHeight:0,minWidth:0,minHeight:0,naturalWidth:0,naturalHeight:0}}},computed:{progressStyle:function(){return{width:this.progress+"%"}},sourceImgStyle:function(){var e=this.scale,i=this.sourceImgMasking;return{top:e.y+i.y+"px",left:e.x+i.x+"px",width:e.width+"px",height:e.height+"px"}},sourceImgMasking:function(){var e=this.width,i=this.height,t=this.ratio,a=this.sourceImgContainer,r=a.width/a.height,o=0,p=0,c=a.width,s=a.height,n=1;return t<r&&(n=a.height/i,c=a.height*t,o=(a.width-c)/2),r<t&&(n=a.width/e,s=a.width/t,p=(a.height-s)/2),{scale:n,x:o,y:p,width:c,height:s}},sourceImgShadeStyle:function(){var e=this.sourceImgMasking,i=this.sourceImgContainer,t=e;return{width:(t.width===i.width?t.width:(i.width-t.width)/2)+"px",height:(t.height===i.height?t.height:(i.height-t.height)/2)+"px"}},previewStyle:function(){this.width,this.height;var e=this.ratio,i=this.previewContainer,t=i.width,a=i.height,r=t/a;return e<r&&(t=i.height*e),r<e&&(a=i.width/e),{width:t+"px",height:a+"px"}}},watch:{value:function(e){e&&1!==this.loading&&this.reset()}},methods:{ripple:function(e){!function(e,i){var t=l()({ele:e.target,type:"hit",bgc:"rgba(0, 0, 0, 0.15)"},i),a=t.ele;if(a){var r=a.getBoundingClientRect(),o=a.querySelector(".e-ripple");switch(o?o.className="e-ripple":((o=document.createElement("span")).className="e-ripple",o.style.height=o.style.width=Math.max(r.width,r.height)+"px",a.appendChild(o)),t.type){case"center":o.style.top=r.height/2-o.offsetHeight/2+"px",o.style.left=r.width/2-o.offsetWidth/2+"px";break;default:o.style.top=e.pageY-r.top-o.offsetHeight/2-document.body.scrollTop+"px",o.style.left=e.pageX-r.left-o.offsetWidth/2-document.body.scrollLeft+"px"}o.style.backgroundColor=t.bgc,o.className="e-ripple z-active"}}(e)},off:function(){var e=this;setTimeout(function(){e.$emit("input",!1),3===e.step&&2===e.loading&&e.setStep(1)},200)},setStep:function(e){var i=this;setTimeout(function(){i.step=e},200)},preventDefault:function(e){return e.preventDefault(),!1},handleClick:function(e){1!==this.loading&&e.target!==this.$refs.fileinput&&(e.preventDefault(),document.activeElement!==this.$refs&&this.$refs.fileinput.click())},handleChange:function(e){if(e.preventDefault(),1!==this.loading){var i=e.target.files||e.dataTransfer.files;this.reset(),this.checkFile(i[0])&&this.setSourceImg(i[0])}},checkFile:function(e){var i=this,t=i.lang,a=i.maxSize;return-1===e.type.indexOf("image")?(i.hasError=!0,i.errorMsg=t.error.onlyImg,!1):!(e.size/1024>a&&(i.hasError=!0,i.errorMsg=t.error.outOfSize+a+"kb",1))},reset:function(){this.loading=0,this.hasError=!1,this.errorMsg="",this.progress=0},setSourceImg:function(e){var i=this,t=new FileReader;t.onload=function(e){i.sourceImgUrl=t.result,i.startCrop()},t.readAsDataURL(e)},startCrop:function(){var e=this,i=e.width,t=e.height,a=e.ratio,r=e.scale,o=e.sourceImgUrl,p=e.sourceImgMasking,c=e.lang,s=p,n=new Image;n.src=o,n.onload=function(){var o=n.naturalWidth,p=n.naturalHeight,l=o/p,v=s.width,d=s.height,u=0,g=0;if(o<i||p<t)return e.hasError=!0,e.errorMsg=c.error.lowestPx+i+"*"+t,!1;l<a&&(d=v/l,g=(s.height-d)/2),a<l&&(v=d*l,u=(s.width-v)/2),r.range=0,r.x=u,r.y=g,r.width=v,r.height=d,r.minWidth=v,r.minHeight=d,r.maxWidth=o*s.scale,r.maxHeight=p*s.scale,r.naturalWidth=o,r.naturalHeight=p,e.sourceImg=n,e.createImg(),e.setStep(2)}},imgStartMove:function(e){if(e.preventDefault(),this.isSupportTouch&&!e.targetTouches)return!1;var i=e.targetTouches?e.targetTouches[0]:e,t=this.sourceImgMouseDown,a=this.scale,r=t;r.mX=i.screenX,r.mY=i.screenY,r.x=a.x,r.y=a.y,r.on=!0},imgMove:function(e){if(e.preventDefault(),this.isSupportTouch&&!e.targetTouches)return!1;var i=e.targetTouches?e.targetTouches[0]:e,t=this.sourceImgMouseDown,a=t.on,r=t.mX,o=t.mY,p=t.x,c=t.y,s=this.scale,n=this.sourceImgMasking,l=p+(i.screenX-r),v=c+(i.screenY-o);a&&(0<l&&(l=0),0<v&&(v=0),l<n.width-s.width&&(l=n.width-s.width),v<n.height-s.height&&(v=n.height-s.height),s.x=l,s.y=v)},startZoomAdd:function(e){var i=this,t=i.scale;t.zoomAddOn=!0,function e(){if(t.zoomAddOn){var a=100<=t.range?100:++t.range;i.zoomImg(a),setTimeout(function(){e()},60)}}()},endZoomAdd:function(e){this.scale.zoomAddOn=!1},startZoomSub:function(e){var i=this,t=i.scale;t.zoomSubOn=!0,function e(){if(t.zoomSubOn){var a=t.range<=0?0:--t.range;i.zoomImg(a),setTimeout(function(){e()},60)}}()},endZoomSub:function(e){this.scale.zoomSubOn=!1},zoomChange:function(e){this.zoomImg(e.target.value)},zoomImg:function(e){var i=this,t=this.sourceImgMasking,a=(this.sourceImgMouseDown,this.scale),r=a.maxWidth,o=a.maxHeight,p=a.minWidth,c=a.minHeight,s=a.width,n=a.height,l=a.x,v=a.y,d=(a.range,t),u=d.width,g=d.height,h=p+(r-p)*e/100,m=c+(o-c)*e/100,f=u/2-h/s*(u/2-l),w=g/2-m/n*(g/2-v);0<f&&(f=0),0<w&&(w=0),f<u-h&&(f=u-h),w<g-m&&(w=g-m),a.x=f,a.y=w,a.width=h,a.height=m,a.range=e,setTimeout(function(){a.range===e&&i.createImg()},300)},createImg:function(e){var i=this,t=i.mime,a=i.sourceImg,r=i.scale,o=r.x,p=r.y,c=r.width,s=r.height,n=i.sourceImgMasking.scale,l=i.$refs.canvas,v=l.getContext("2d");e&&(i.sourceImgMouseDown.on=!1),v.clearRect(0,0,i.width,i.height),v.drawImage(a,o/n,p/n,c/n,s/n),i.createImgUrl=l.toDataURL(t)},prepareUpload:function(){var e=this.url,i=this.createImgUrl,t=this.field,a=this.ki;this.$emit("crop-success",i,t,a),"string"==typeof e&&e?this.upload():this.off()},upload:function(){var e=this,i=this,t=this.lang,a=(this.imgFormat,this.mime,this.url,this.params,this.headers),o=this.field,c=this.ki,n=this.createImgUrl;this.imgData=new FormData;var l=function(e){for(var i=atob(e.split(",")[1]),t=e.split(",")[0].split(":")[1].split(";")[0],a=new ArrayBuffer(i.length),r=new Uint8Array(a),o=0;o<i.length;o++)r[o]=i.charCodeAt(o);return new Blob([a],{type:t})}(n);this.imgData.append("file",l),this.imgData.append("user",this.userInfo._id||"");var v=function(e){e.lengthComputable&&(i.progress=100*Math.round(e.loaded)/e.total)};i.reset(),i.loading=1,i.setStep(3),new s.a(function(i,t){var o=new XMLHttpRequest;o.open("POST","/api/updateAvatar",!0),o.onreadystatechange=function(e){200===this.status||201===this.status?i(a.imgname):t(this.status)},o.upload.addEventListener("progress",v,!1),"object"===(void 0===a?"undefined":p()(a))&&a&&r()(a).forEach(function(e){o.setRequestHeader(e,a[e])}),e.userInfo._id,e.imgData,o.send(e.imgData)}).then(function(t){i.value&&(i.loading=2,i.reset(),e.$message({type:"success",message:"成功更新头像"}),i.$emit("crop-upload-success",t,o,c))},function(e){i.value&&(i.loading=3,i.reset(),i.hasError=!0,i.errorMsg=t.fail,i.$emit("crop-upload-fail",e,o,c))})}},created:function(){var e=this;document.addEventListener("keyup",function(i){!e.value||"Escape"!==i.key&&27!==i.keyCode||e.off()})}}},493:function(e,i){e.exports={render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"wrapper",attrs:{id:"setting"}},[t("div",{directives:[{name:"loading",rawName:"v-loading.body",value:e.isLoading,expression:"isLoading",modifiers:{body:!0}}],staticClass:"panel-default"},[t("div",{staticClass:"panel-body"},[t("div",{staticClass:"main-container"},[t("div",{staticClass:"entry-list setting"},[t("el-card",{staticClass:"box-card"},[t("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v(e._s(e.$t("homePage")))]),e._v(" "),t("el-breadcrumb-item",[e._v(e._s(e.$t("accountSetting")))])],1)],1),e._v(" "),t("div",{staticClass:"form form-horizontal"},[t("el-form",{ref:"fillForm",attrs:{model:e.fillForm,rules:e.rules}},[t("div",{staticClass:"form-group"},[t("label",{staticClass:"col-sm-3 control-label"},[e._v(e._s(e.$t("setUsername"))),t("em",[e._v("*")]),e._v(":")]),e._v(" "),t("div",{staticClass:"col-sm-9"},[t("el-input",{attrs:{placeholder:"",disabled:!0},model:{value:e.fillForm.username,callback:function(i){e.$set(e.fillForm,"username",i)},expression:"fillForm.username"}})],1)]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",{staticClass:"col-sm-3 control-label"},[e._v(e._s(e.$t("setNickname"))+":")]),e._v(" "),t("div",{staticClass:"col-sm-9"},[t("el-form-item",{attrs:{prop:"profile.nickname"}},[t("el-input",{attrs:{placeholder:""},model:{value:e.fillForm.profile.nickname,callback:function(i){e.$set(e.fillForm.profile,"nickname",i)},expression:"fillForm.profile.nickname"}})],1)],1)]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",{staticClass:"col-sm-3 control-label"},[e._v(e._s(e.$t("personalWebsite"))+":")]),e._v(" "),t("div",{staticClass:"col-sm-9"},[t("el-form-item",{attrs:{prop:"profile.website"}},[t("el-input",{attrs:{placeholder:""},model:{value:e.fillForm.profile.website,callback:function(i){e.$set(e.fillForm.profile,"website",i)},expression:"fillForm.profile.website"}})],1)],1)]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",{staticClass:"col-sm-3 control-label"},[e._v(e._s(e.$t("profile"))+":")]),e._v(" "),t("div",{staticClass:"col-sm-9"},[t("markdown",{model:{value:e.fillForm.profile.description,callback:function(i){e.$set(e.fillForm.profile,"description",i)},expression:"fillForm.profile.description"}})],1)])])],1),e._v(" "),t("div",{staticClass:"form-group operation-area"},[t("div",{staticClass:"col-sm-offset-3 col-sm-9 no-padding"},[t("el-button",{attrs:{loading:e.isLoading,type:"primary"},on:{click:e.onSaveClick}},[e._v(e._s(e.$t("saveSeting")))])],1)]),e._v(" "),e.tipMessageObj.message?t("el-alert",{attrs:{title:e.tipMessageObj.message,type:e.tipMessageObj.type}}):e._e(),e._v(" "),t("hr"),e._v(" "),t("div",{staticClass:"form-group"},[t("div",{staticClass:"col-sm-12"},[t("div",{staticClass:"update-avatar-area"},[t("img",{staticClass:"preview-avatar",attrs:{src:e.imgDataUrl}}),e._v(" "),t("br"),e._v(" "),t("el-button",{attrs:{loading:e.isLoading,type:"text"},on:{click:e.onUpdateAvatarClick}},[e._v("\n                    "+e._s(e.$t("updateAvatar"))+"\n                  ")])],1)])])],1)],1),e._v(" "),t("aside-list")],1)])]),e._v(" "),t("upload-avatar",{attrs:{field:"image",width:100,height:100,url:"/api/uploadAvatar",params:e.params,headers:e.headers,"img-format":"png"},on:{"crop-success":e.onCropSuccess,"crop-upload-success":e.onCropUploadSuccess,"crop-upload-fail":e.onCropUploadFail},model:{value:e.isShowUploadAvatar,callback:function(i){e.isShowUploadAvatar=i},expression:"isShowUploadAvatar"}})],1)},staticRenderFns:[]}},494:function(e,i){e.exports={render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],staticClass:"vue-image-crop-upload"},[t("div",{staticClass:"vicp-wrap"},[t("div",{staticClass:"vicp-close",on:{click:e.off}},[t("i",{staticClass:"vicp-icon4"})]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:1===e.step,expression:"step === 1"}],staticClass:"vicp-step1"},[t("div",{staticClass:"vicp-drop-area",on:{dragleave:e.preventDefault,dragover:e.preventDefault,dragenter:e.preventDefault,click:e.handleClick,drop:e.handleChange}},[t("i",{directives:[{name:"show",rawName:"v-show",value:1!==e.loading,expression:"loading !== 1"}],staticClass:"vicp-icon1"},[t("i",{staticClass:"vicp-icon1-arrow"}),e._v(" "),t("i",{staticClass:"vicp-icon1-body"}),e._v(" "),t("i",{staticClass:"vicp-icon1-bottom"})]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:1!==e.loading,expression:"loading !== 1"}],staticClass:"vicp-hint"},[e._v(e._s(e.lang.hint))]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:!e.isSupported,expression:"!isSupported"}],staticClass:"vicp-no-supported-hint"},[e._v(e._s(e.lang.noSupported))]),e._v(" "),1===e.step?t("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"fileinput",attrs:{type:"file"},on:{change:e.handleChange}}):e._e()]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"vicp-error"},[t("i",{staticClass:"vicp-icon2"}),e._v(" "+e._s(e.errorMsg)+"\n      ")]),e._v(" "),t("div",{staticClass:"vicp-operate"},[t("a",{on:{click:e.off,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.off))])])]),e._v(" "),2===e.step?t("div",{staticClass:"vicp-step2"},[t("div",{staticClass:"vicp-crop"},[t("div",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"vicp-crop-left"},[t("div",{staticClass:"vicp-img-container"},[t("img",{ref:"img",staticClass:"vicp-img",style:e.sourceImgStyle,attrs:{src:e.sourceImgUrl,draggable:"false"},on:{drag:e.preventDefault,dragstart:e.preventDefault,dragend:e.preventDefault,dragleave:e.preventDefault,dragover:e.preventDefault,dragenter:e.preventDefault,drop:e.preventDefault,touchstart:e.imgStartMove,touchmove:e.imgMove,touchend:e.createImg,touchcancel:e.createImg,mousedown:e.imgStartMove,mousemove:e.imgMove,mouseup:e.createImg,mouseout:e.createImg}}),e._v(" "),t("div",{staticClass:"vicp-img-shade vicp-img-shade-1",style:e.sourceImgShadeStyle}),e._v(" "),t("div",{staticClass:"vicp-img-shade vicp-img-shade-2",style:e.sourceImgShadeStyle})]),e._v(" "),t("div",{staticClass:"vicp-range"},[t("input",{attrs:{type:"range",step:"1",min:"0",max:"100"},domProps:{value:e.scale.range},on:{input:e.zoomChange}}),e._v(" "),t("i",{staticClass:"vicp-icon5",on:{mousedown:e.startZoomSub,mouseout:e.endZoomSub,mouseup:e.endZoomSub}}),e._v(" "),t("i",{staticClass:"vicp-icon6",on:{mousedown:e.startZoomAdd,mouseout:e.endZoomAdd,mouseup:e.endZoomAdd}})])]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"vicp-crop-right"},[t("div",{staticClass:"vicp-preview"},[t("div",{staticClass:"vicp-preview-item"},[t("img",{style:e.previewStyle,attrs:{src:e.createImgUrl}}),e._v(" "),t("span",[e._v(e._s(e.lang.preview))])]),e._v(" "),e.noCircle?e._e():t("div",{staticClass:"vicp-preview-item"},[t("img",{style:e.previewStyle,attrs:{src:e.createImgUrl}}),e._v(" "),t("span",[e._v(e._s(e.lang.preview))])])])])]),e._v(" "),t("div",{staticClass:"vicp-operate"},[t("a",{on:{click:function(i){e.setStep(1)},mousedown:e.ripple}},[e._v(e._s(e.lang.btn.back))]),e._v(" "),t("a",{staticClass:"vicp-operate-btn",on:{click:e.prepareUpload,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.save))])])]):e._e(),e._v(" "),3===e.step?t("div",{staticClass:"vicp-step3"},[t("div",{staticClass:"vicp-upload"},[t("span",{directives:[{name:"show",rawName:"v-show",value:1===e.loading,expression:"loading === 1"}],staticClass:"vicp-loading"},[e._v(e._s(e.lang.loading))]),e._v(" "),t("div",{staticClass:"vicp-progress-wrap"},[t("span",{directives:[{name:"show",rawName:"v-show",value:1===e.loading,expression:"loading === 1"}],staticClass:"vicp-progress",style:e.progressStyle})]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"vicp-error"},[t("i",{staticClass:"vicp-icon2"}),e._v(" "+e._s(e.errorMsg)+"\n        ")]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:2===e.loading,expression:"loading === 2"}],staticClass:"vicp-success"},[t("i",{staticClass:"vicp-icon3"}),e._v(" "+e._s(e.lang.success)+"\n        ")])]),e._v(" "),t("div",{staticClass:"vicp-operate"},[t("a",{on:{click:function(i){e.setStep(2)},mousedown:e.ripple}},[e._v(e._s(e.lang.btn.back))]),e._v(" "),t("a",{on:{click:e.off,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.close))])])]):e._e(),e._v(" "),t("canvas",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"canvas",attrs:{width:e.width,height:e.height}})])])},staticRenderFns:[]}},495:function(e,i,t){(e.exports=t(8)()).push([e.i,'@keyframes vicp_progress{0%{background-position-y:0}to{background-position-y:40px}}@keyframes vicp{0%{opacity:0;transform:scale(0) translatey(-60px)}to{opacity:1;transform:scale(1) translatey(0)}}.vue-image-crop-upload{width:100%;height:100%;background-color:rgba(0,0,0,.65);-webkit-tap-highlight-color:transparent;-moz-tap-highlight-color:transparent}.vue-image-crop-upload,.vue-image-crop-upload .vicp-wrap{position:fixed;display:block;box-sizing:border-box;z-index:10000;top:0;bottom:0;left:0;right:0}.vue-image-crop-upload .vicp-wrap{box-shadow:0 1px 3px 0 rgba(0,0,0,.23);margin:auto;width:600px;height:330px;padding:25px;background-color:#fff;border-radius:2px;animation:vicp .12s ease-in}.vue-image-crop-upload .vicp-wrap .vicp-close{position:absolute;right:-30px;top:-30px}.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4{position:relative;display:block;width:30px;height:30px;cursor:pointer;transition:transform .18s;transform:rotate(0)}.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4:after,.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4:before{box-shadow:0 1px 3px 0 rgba(0,0,0,.23);content:"";position:absolute;top:12px;left:4px;width:20px;height:3px;transform:rotate(45deg);background-color:#fff}.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4:after{transform:rotate(-45deg)}.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4:hover{transform:rotate(90deg)}.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area{position:relative;box-sizing:border-box;padding:35px;height:170px;background-color:rgba(0,0,0,.03);text-align:center;border:1px dashed rgba(0,0,0,.08);overflow:hidden}.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1{display:block;margin:0 auto 6px;width:42px;height:42px;overflow:hidden}.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 .vicp-icon1-arrow{display:block;margin:0 auto;width:0;height:0;border-bottom:14.7px solid rgba(0,0,0,.3);border-left:14.7px solid transparent;border-right:14.7px solid transparent}.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 .vicp-icon1-body{display:block;width:12.6px;height:14.7px;margin:0 auto;background-color:rgba(0,0,0,.3)}.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 .vicp-icon1-bottom{box-sizing:border-box;display:block;height:12.6px;border:6px solid rgba(0,0,0,.3);border-top:none}.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-hint{display:block;padding:15px;font-size:14px;color:#666;line-height:30px}.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-no-supported-hint{display:block;position:absolute;top:0;left:0;padding:30px;width:100%;height:60px;line-height:30px;background-color:#eee;text-align:center;color:#666;font-size:14px}.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area:hover{cursor:pointer;border-color:rgba(0,0,0,.1);background-color:rgba(0,0,0,.05)}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop{overflow:hidden}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left{float:left}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container{position:relative;display:block;width:240px;height:180px;background-color:#e5e5e0;overflow:hidden}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img{position:absolute;display:block;cursor:move;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade{box-shadow:0 2px 6px 0 rgba(0,0,0,.18);position:absolute;background-color:hsla(210,8%,95%,.8)}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade.vicp-img-shade-1{top:0;left:0}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade.vicp-img-shade-2{bottom:0;right:0}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range{position:relative;margin:30px 0;width:240px;height:18px}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5,.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6{position:absolute;top:0;width:18px;height:18px;border-radius:100%;background-color:rgba(0,0,0,.08)}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5:hover,.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6:hover{box-shadow:0 1px 3px 0 rgba(0,0,0,.12);cursor:pointer;background-color:rgba(0,0,0,.14)}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5{left:0}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5:before{position:absolute;content:"";display:block;left:3px;top:8px;width:12px;height:2px;background-color:#fff}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6{right:0}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6:before{position:absolute;content:"";display:block;left:3px;top:8px;width:12px;height:2px;background-color:#fff}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6:after{position:absolute;content:"";display:block;top:3px;left:8px;width:2px;height:12px;background-color:#fff}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]{display:block;padding-top:5px;margin:0 auto;width:180px;height:8px;vertical-align:top;background:transparent;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus{outline:none}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-webkit-slider-thumb{box-shadow:0 2px 6px 0 rgba(0,0,0,.18);-webkit-appearance:none;appearance:none;margin-top:-3px;width:12px;height:12px;background-color:#61c091;border-radius:100%;border:none;transition:.2s}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-moz-range-thumb{box-shadow:0 2px 6px 0 rgba(0,0,0,.18);-moz-appearance:none;appearance:none;width:12px;height:12px;background-color:#61c091;border-radius:100%;border:none;transition:.2s}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-thumb{box-shadow:0 2px 6px 0 rgba(0,0,0,.18);appearance:none;width:12px;height:12px;background-color:#61c091;border:none;border-radius:100%;transition:.2s}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:active::-moz-range-thumb{box-shadow:0 1px 3px 0 rgba(0,0,0,.23);width:14px;height:14px}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:active::-ms-thumb{box-shadow:0 1px 3px 0 rgba(0,0,0,.23);width:14px;height:14px}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:active::-webkit-slider-thumb{box-shadow:0 1px 3px 0 rgba(0,0,0,.23);margin-top:-4px;width:14px;height:14px}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-webkit-slider-runnable-track{box-shadow:0 1px 3px 0 rgba(0,0,0,.12);width:100%;height:6px;cursor:pointer;border-radius:2px;border:none;background-color:rgba(68,170,119,.3)}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-moz-range-track{box-shadow:0 1px 3px 0 rgba(0,0,0,.12);width:100%;height:6px;cursor:pointer;border-radius:2px;border:none;background-color:rgba(68,170,119,.3)}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-track{box-shadow:0 1px 3px 0 rgba(0,0,0,.12);width:100%;cursor:pointer;background:transparent;border-color:transparent;color:transparent;height:6px;border-radius:2px;border:none}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-fill-lower{background-color:rgba(68,170,119,.3)}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-fill-upper{background-color:rgba(68,170,119,.15)}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-webkit-slider-runnable-track{background-color:rgba(68,170,119,.5)}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-moz-range-track{background-color:rgba(68,170,119,.5)}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-ms-fill-lower{background-color:rgba(68,170,119,.45)}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-ms-fill-upper{background-color:rgba(68,170,119,.25)}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right{float:right}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview{height:150px;overflow:hidden}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item{position:relative;padding:5px;width:100px;height:100px;float:left;margin-right:16px}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item span{position:absolute;bottom:-30px;width:100%;font-size:14px;color:#bbb;display:block;text-align:center}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item img{position:absolute;display:block;top:0;bottom:0;left:0;right:0;margin:auto;padding:3px;background-color:#fff;border:1px solid rgba(0,0,0,.15);overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item:nth-child(2){margin-right:0}.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item:nth-child(2) img{border-radius:100%}.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload{position:relative;box-sizing:border-box;padding:35px;height:170px;background-color:rgba(0,0,0,.03);text-align:center;border:1px dashed #ddd}.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-loading{display:block;padding:15px;font-size:16px;color:#999;line-height:30px}.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap{margin-top:12px;background-color:rgba(0,0,0,.08);border-radius:3px}.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap .vicp-progress{position:relative;display:block;height:5px;border-radius:3px;background-color:#4a7;box-shadow:0 2px 6px 0 rgba(68,170,119,.3);transition:width .15s linear;background-image:linear-gradient(-45deg,hsla(0,0%,100%,.2) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.2) 0,hsla(0,0%,100%,.2) 75%,transparent 0,transparent);background-size:40px 40px;animation:vicp_progress .5s linear infinite}.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap .vicp-progress:after{content:"";position:absolute;display:block;top:-3px;right:-3px;width:9px;height:9px;border:1px solid rgba(245,246,247,.7);box-shadow:0 1px 4px 0 rgba(68,170,119,.7);border-radius:100%;background-color:#4a7}.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-error,.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-success{height:100px;line-height:100px}.vue-image-crop-upload .vicp-wrap .vicp-operate{position:absolute;right:20px;bottom:20px}.vue-image-crop-upload .vicp-wrap .vicp-operate a{position:relative;float:left;display:block;margin-left:10px;width:100px;height:36px;line-height:36px;text-align:center;cursor:pointer;font-size:14px;color:#4a7;border-radius:2px;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.vue-image-crop-upload .vicp-wrap .vicp-operate a:hover{background-color:rgba(0,0,0,.03)}.vue-image-crop-upload .vicp-wrap .vicp-error,.vue-image-crop-upload .vicp-wrap .vicp-success{display:block;font-size:14px;line-height:24px;height:24px;color:#d10;text-align:center;vertical-align:top}.vue-image-crop-upload .vicp-wrap .vicp-success{color:#4a7}.vue-image-crop-upload .vicp-wrap .vicp-icon3{position:relative;display:inline-block;width:20px;height:20px;top:4px}.vue-image-crop-upload .vicp-wrap .vicp-icon3:after{position:absolute;top:3px;left:6px;width:6px;height:10px;border-width:0 2px 2px 0;border-color:#4a7;border-style:solid;transform:rotate(45deg);content:""}.vue-image-crop-upload .vicp-wrap .vicp-icon2{position:relative;display:inline-block;width:20px;height:20px;top:4px}.vue-image-crop-upload .vicp-wrap .vicp-icon2:after,.vue-image-crop-upload .vicp-wrap .vicp-icon2:before{content:"";position:absolute;top:9px;left:4px;width:13px;height:2px;background-color:#d10;transform:rotate(45deg)}.vue-image-crop-upload .vicp-wrap .vicp-icon2:after{transform:rotate(-45deg)}.e-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transform:scale(0);opacity:1}.e-ripple.z-active{opacity:0;transform:scale(2);transition:opacity 1.2s ease-out,transform .6s ease-out}@media screen and (max-width:960px){.main .vue-image-crop-upload .vicp-wrap{position:absolute;width:100%;height:90%;max-height:500px}.main .vue-image-crop-upload .vicp-wrap .vicp-crop .vicp-crop-left{float:none}.main .vue-image-crop-upload .vicp-wrap .vicp-crop .vicp-crop-left .vicp-img-container{height:180px;margin:auto}.main .vue-image-crop-upload .vicp-wrap .vicp-crop .vicp-crop-right{float:none}.main .vue-image-crop-upload .vicp-wrap .vicp-crop .vicp-crop-right .vicp-preview{margin:auto;width:100%;height:130px}.main .vue-image-crop-upload .vicp-wrap .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item{display:inline-block;float:none;margin:auto}}',""])},496:function(e,i,t){var a=t(495);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals),t(7)("701f7359",a,!0)},497:function(e,i,t){t(496);var a=t(4)(t(435),t(494),null,null);e.exports=a.exports},498:function(e,i,t){"use strict";t.r(i);var a=t(26),r=t.n(a),o=t(429),p=t(497),c=t.n(p),s=t(430),n=t.n(s);i.default={name:"Setting",mixins:[o.a],components:{UploadAvatar:c.a,Markdown:n.a},data:function(){return{title:this.$t("accountSetting"),tipMessageObj:{},isLoading:!1,fillForm:{_id:"",email:"",username:"",profile:{nickname:"",website:"",description:""}},rules:{"profile.nickname":[{required:!1,validator:this.isTheLegalNick,trigger:"change,blur"}],"profile.website":[{required:!1,validator:this.isTheLegalUrl,trigger:"change,blur"}]},isShowUploadAvatar:!1,params:{token:"131421",name:"avatar"},headers:{imgname:"",username:""},imgDataUrl:"https://image.nicelinks.site/default-avatar.jpeg"}},mounted:function(){this.initFetch()},methods:{initFetch:function(){var e=this,i=this.userInfo._id;this.$apis.getProfile({_id:i}).then(function(t){r()(e.fillForm,t);var a=new Date(e.$util.getCurrentDate()).Format("yyyy-MM-dd"),o=e.$util.getCurrentDateHMS();t.profile.avatar&&(e.imgDataUrl="/api/avatar/"+t.profile.avatar),e.headers.imgname=[a,o,i].join("-"),e.headers.username=e.userInfo.username||""}).catch(function(i){e.errorAlertTip("Err: "+i,"error"),e.isLoading=!1})},errorAlertTip:function(e,i){var t=this;this.tipMessageObj={message:e,type:i},setTimeout(function(){t.tipMessageObj={}},2e3)},isTheLegalNick:function(e,i,t){i&&!this.$util.isLegalNick(i)?t(new Error(this.$t("enterLegalNick"))):t()},isTheLegalUrl:function(e,i,t){i&&!this.$util.isLegalUrl(i)?t(new Error(this.$t("enterLegalUrl"))):t()},onSaveClick:function(){var e=this;this.$gtagTracking("save-setting","setting","save-setting"),this.$refs.fillForm.validate(function(i){if(i){e.isLoading=!0;var t=e.$_.cloneDeep(e.fillForm);delete t.username,e.$apis.setProfile(t).then(function(i){e.$message({message:i,type:"success"}),e.$getUserInfo()}).catch(function(i){e.errorAlertTip(i,"error")}).finally(function(){e.isLoading=!1})}})},onUpdateAvatarClick:function(){this.$gtagTracking("update-avatar","setting","update-avatar"),this.isShowUploadAvatar=!0},onCropSuccess:function(e){this.imgDataUrl=e},onCropUploadFail:function(){},onCropUploadSuccess:function(e){this.imgDataUrl="/api/avatar/"+e,this.$getUserInfo()}},locales:{en:{enterLegalNick:"Please enter 3 ~ 15 arbitrary characters."},zh:{enterLegalNick:"请输入 3 ～ 15 位任意字符"}}}},499:function(e,i,t){(e.exports=t(8)()).push([e.i,".update-avatar-area{width:200px;text-align:center;margin:auto}.update-avatar-area .preview-avatar{border:1px solid #d1dbe5;border-radius:50%}.setting .form-group .el-input,.setting .form-group .el-textarea{max-width:768px;width:100%}@media (max-width:768px){.setting .form-horizontal .form-group{margin-left:0;margin-right:0}.setting .operation-area{margin-left:15px}}",""])},500:function(e,i,t){var a=t(499);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals),t(7)("abecfeac",a,!0)}}]);