(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a417404c"],{2357:function(e,t,s){"use strict";var a=s("a186"),r=s.n(a);r.a},"2e08":function(e,t,s){var a=s("9def"),r=s("9744"),i=s("be13");e.exports=function(e,t,s,n){var o=String(i(e)),l=o.length,u=void 0===s?" ":String(s),c=a(t);if(c<=l||""==u)return o;var m=c-l,d=r.call(u,Math.ceil(m/u.length));return d.length>m&&(d=d.slice(0,m)),n?d+o:o+d}},"3b2b":function(e,t,s){var a=s("7726"),r=s("5dbc"),i=s("86cc").f,n=s("9093").f,o=s("aae3"),l=s("0bfb"),u=a.RegExp,c=u,m=u.prototype,d=/a/g,g=/a/g,f=new u(d)!==d;if(s("9e1e")&&(!f||s("79e5")((function(){return g[s("2b4c")("match")]=!1,u(d)!=d||u(g)==g||"/a/i"!=u(d,"i")})))){u=function(e,t){var s=this instanceof u,a=o(e),i=void 0===t;return!s&&a&&e.constructor===u&&i?e:r(f?new c(a&&!i?e.source:e,t):c((a=e instanceof u)?e.source:e,a&&i?l.call(e):t),s?this:m,u)};for(var p=function(e){e in u||i(u,e,{configurable:!0,get:function(){return c[e]},set:function(t){c[e]=t}})},w=n(c),v=0;w.length>v;)p(w[v++]);m.constructor=u,u.prototype=m,s("2aba")(a,"RegExp",u)}s("7a56")("RegExp")},4917:function(e,t,s){"use strict";var a=s("cb7c"),r=s("9def"),i=s("0390"),n=s("5f1b");s("214f")("match",1,(function(e,t,s,o){return[function(s){var a=e(this),r=void 0==s?void 0:s[t];return void 0!==r?r.call(s,a):new RegExp(s)[t](String(a))},function(e){var t=o(s,e,this);if(t.done)return t.value;var l=a(e),u=String(this);if(!l.global)return n(l,u);var c=l.unicode;l.lastIndex=0;var m,d=[],g=0;while(null!==(m=n(l,u))){var f=String(m[0]);d[g]=f,""===f&&(l.lastIndex=i(u,r(l.lastIndex),c)),g++}return 0===g?null:d}]}))},7954:function(e,t,s){"use strict";var a=s("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.checkNumber=n,t.exportExcel=o,t.parseTime=l,t.formatTime=u,t.param2Obj=c,t.checkEmail=m,t.hasClass=d,t.addClass=g,t.removeClass=f,t.hasPermissionAction=p,t.data2blob=w,s("34ef"),s("6762"),s("2fdb"),s("3b2b"),s("4917"),s("28a5"),s("f576"),s("a481"),s("6b54");var r=a(s("7037"));s("c5f6"),s("7cdf");var i=s("5c96");function n(e,t,s){var a=parseFloat(t);return 0===a?s():a?void setTimeout((function(){Number.isInteger(a)?a<=0?s(new Error("Vui lòng nhập số lớn hơn hoặc bằng 0")):a>1e10?s(new Error("Vui lòng nhập số nhỏ hơn 10 tỷ")):s():s(new Error("Vui lòng nhập số"))}),1e3):s(new Error("Phải là số lớn hơn hoặc bằng 0"))}function o(e){}function l(e,t){if(0===arguments.length)return null;var s,a=t||"{y}-{m}-{d} {h}:{i}:{s}";"object"===(0,r.default)(e)?s=e:("string"===typeof e&&/^[0-9]+$/.test(e)&&(e=parseInt(e)),"number"===typeof e&&10===e.toString().length&&(e*=1e3),s=new Date(e));var i={y:s.getFullYear(),m:s.getMonth()+1,d:s.getDate(),h:s.getHours(),i:s.getMinutes(),s:s.getSeconds(),a:s.getDay()},n=a.replace(/{([ymdhisa])+}/g,(function(e,t){var s=i[t];return"a"===t?["日","一","二","三","四","五","六"][s]:s.toString().padStart(2,"0")}));return n}function u(e,t){e=10===(""+e).length?1e3*parseInt(e):+e;var s=new Date(e),a=Date.now(),r=(a-s)/1e3;return r<30?"chỉ cần":r<3600?Math.ceil(r/60)+"vài phút trước":r<86400?Math.ceil(r/3600)+"vài giờ trước":r<172800?"1 ngày trước":t?l(e,t):s.getMonth()+1+"tháng"+s.getDate()+"ngày "+s.getHours()+" giờ"+s.getMinutes()+" phút"}function c(e){var t=e.split("?")[1];return t?JSON.parse('{"'+decodeURIComponent(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"').replace(/\+/g," ")+'"}'):{}}function m(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)}function d(e,t){return!!e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))}function g(e,t){d(e,t)||(e.className+=" "+t)}function f(e,t){if(d(e,t)){var s=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(s," ")}}function p(e,t,s,a){return e.includes(t)?(""!==s&&(window.location.href="/#/"+s),!0):((0,i.Message)({message:a,type:"error",duration:5e3}),!1)}function w(e,t){e=e.split(",")[1],e=window.atob(e);for(var s=new Uint8Array(e.length),a=0;a<e.length;a++)s[a]=e.charCodeAt(a);return new Blob([s],{type:t})}},9744:function(e,t,s){"use strict";var a=s("4588"),r=s("be13");e.exports=function(e){var t=String(r(this)),s="",i=a(e);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(t+=t))1&i&&(s+=t);return s}},a186:function(e,t,s){},ce84:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.scrollTo=n,Math.easeInOutQuad=function(e,t,s,a){return e/=a/2,e<1?s/2*e*e+t:(e--,-s/2*(e*(e-2)-1)+t)};var a=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function r(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function i(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function n(e,t,s){var n=i(),o=e-n,l=20,u=0;t="undefined"===typeof t?500:t;var c=function e(){u+=l;var i=Math.easeInOutQuad(u,n,o,t);r(i),u<t?a(e):s&&"function"===typeof s&&s()};c()}},e2b7:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app-container"},[s("sticky",{attrs:{"z-index":10,"class-name":"sub-navbar"}},[s("div",{staticClass:"page-title"},[s("div",{staticClass:"title-container"},[s("router-link",{staticClass:"back-link",attrs:{to:"/"}},[s("font-awesome-icon",{staticClass:"icon-back",attrs:{icon:"chevron-left",color:"#424242"}})],1),e._v(" "),s("router-link",{staticClass:"title-page",attrs:{to:"/dashboard",title:"DashBoard"}},[e._v("\n          "+e._s(e.generateTitleView("user_management","usermanagement"))+"\n        ")])],1),e._v(" "),s("div",{staticClass:"action-container"},[s("el-button",{staticClass:"btn-create-hotel",attrs:{icon:"el-icon-plus",type:"primary"},on:{click:e.redirectCreate}},[e._v("\n          "+e._s(e.generateTitleView("create","usermanagement"))+"\n        ")])],1)])]),e._v(" "),s("md-card",{staticClass:"filter"},[s("div",{staticClass:"filter-content"},[s("el-form",{ref:"form",staticClass:"user-form",attrs:{"label-position":"top","label-width":"150px"}},[s("el-form-item",{staticClass:"item-account",attrs:{label:e.generateTitleView("username","usermanagement"),prop:"name"}},[s("el-input",{model:{value:e.listQuery.name,callback:function(t){e.$set(e.listQuery,"name",t)},expression:"listQuery.name"}})],1),e._v(" "),s("el-form-item",{staticClass:"item-status",attrs:{label:e.generateTitleView("status","usermanagement"),prop:"status"}},[s("el-select",{model:{value:e.listQuery.status,callback:function(t){e.$set(e.listQuery,"status",t)},expression:"listQuery.status"}},e._l(e.USER_STATUS,(function(t,a){return s("el-option",{key:a,attrs:{value:t.value,label:t.label}},[e._v(e._s(t.label)+"\n            ")])})),1)],1),e._v(" "),s("el-form-item",{staticClass:"item-status",attrs:{label:e.generateTitleView("usertype","usermanagement"),prop:"status"}},[s("el-select",{model:{value:e.listQuery.userType,callback:function(t){e.$set(e.listQuery,"userType",t)},expression:"listQuery.userType"}},e._l(e.USER_TYPE,(function(t,a){return s("el-option",{key:a,attrs:{value:t.value,label:t.label}},[e._v(e._s(t.label)+"\n            ")])})),1)],1)],1),e._v(" "),s("div",{staticClass:"item-action"},[s("el-button",{staticClass:"btn-reset",attrs:{plain:""},on:{click:e.resetFilter}},[e._v(e._s(e.generateTitleView("clear","usermanagement"))+"\n        ")]),e._v(" "),s("el-button",{staticClass:"btn-search",attrs:{type:"primary",plain:""},on:{click:e.getUsers}},[e._v("\n          "+e._s(e.generateTitleView("search","usermanagement"))+"\n        ")])],1)],1)]),e._v(" "),s("md-card",{staticClass:"table-users"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],key:0,staticClass:"table-list",staticStyle:{width:"100%"},attrs:{fit:"",data:e.listUsers,"highlight-current-row":""}},[s("el-table-column",{attrs:{label:e.generateTitleView("stt","usermanagement"),prop:"id",align:"center",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){t.row;var a=t.$index;return[s("span",[e._v(e._s(a+1))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:e.generateTitleView("username","usermanagement"),width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[s("span",[e._v(e._s(a.userName))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:e.generateTitleView("fullname","usermanagement"),"min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[s("span",{staticClass:"link-type"},[e._v(e._s(a.name))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:e.generateTitleView("resetpassword","usermanagement"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[s("font-awesome-icon",{staticClass:"icon-reset",attrs:{icon:"sync",color:"#123D8B"},on:{click:function(t){return e.showResetPassword(a.id)}}})]}}])}),e._v(" "),s("el-table-column",{attrs:{label:e.generateTitleView("email","usermanagement"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[s("span",[e._v(e._s(a.email))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:e.generateTitleView("usertype","usermanagement"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[s("span",[e._v(e._s(1==a.userType?"System Admin":e.generateTitleView("doctor","usermanagement")))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:e.generateTitleView("status","usermanagement"),"class-name":"status-col",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[s("div",[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.generateTitleView("account_status","usermanagement"),placement:"top"}},[s("el-toggle-button",{attrs:{value:!0,color:"#123D8B",sync:!0},on:{change:function(t){return e.updateUserStatus(a.id,t)}},model:{value:a.isActive,callback:function(t){e.$set(a,"isActive",t)},expression:"row.isActive"}})],1)],1)]}}])}),e._v(" "),s("el-table-column",{attrs:{label:e.generateTitleView("role","usermanagement"),align:"center","min-width":"220"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return e._l(a.roleUser,(function(t,a){return s("el-tag",{key:a,staticClass:"role-bg"},[e._v("\n            "+e._s(t.name)+"\n          ")])}))}}])}),e._v(" "),s("el-table-column",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{label:"Actions",align:"center",width:"200","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.generateTitleView("update","usermanagement"),placement:"top"}},[s("el-button",{attrs:{type:"primary",size:"mini",rounded:""},on:{click:function(t){return e.editUser(a.id)}}},[s("i",{staticClass:"el-icon-edit"})])],1),e._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.generateTitleView("delete","usermanagement"),placement:"top"}},[s("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.deleteUser(a.id)}}},[s("i",{staticClass:"el-icon-delete"})])],1)]}}])})],1),e._v(" "),s("pagination",{directives:[{name:"show",rawName:"v-show",value:e.totalUsers>0,expression:"totalUsers>0"}],staticClass:"pagination-hotel",attrs:{total:e.totalUsers,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getUsers}})],1),e._v(" "),s("el-dialog",{staticClass:"user-diaglog",attrs:{width:"660px",visible:e.dialogForm,title:e.generateTitleView("labelResetPassword","usermanagement"),"close-on-click-modal":e.clickOutsideDialog},on:{"update:visible":function(t){e.dialogForm=t}}},[s("el-form",{ref:"form-resetpassword",staticClass:"resetpassword-form",attrs:{model:e.formReset,rules:e.rules}},[s("el-form-item",{staticClass:"item-name",attrs:{label:e.generateTitleView("password","usermanagement"),prop:"password"}},[s("el-input",{attrs:{disabled:!1,type:"password"},model:{value:e.formReset.password,callback:function(t){e.$set(e.formReset,"password",t)},expression:"formReset.password"}})],1),e._v(" "),s("el-form-item",{staticClass:"item-name",attrs:{label:e.generateTitleView("repassword","usermanagement"),prop:"repassword"}},[s("el-input",{attrs:{disabled:!1,type:"password"},model:{value:e.formReset.repassword,callback:function(t){e.$set(e.formReset,"repassword",t)},expression:"formReset.repassword"}})],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"info",plain:""},on:{click:e.handleClosePopup}},[e._v(e._s(e.generateTitleView("close","usermanagement")))]),e._v(" "),s("el-button",{attrs:{type:"success"},on:{click:e.handleResetPassword}},[e._v(e._s(e.generateTitleView("save","usermanagement")))])],1)],1)],1)},r=[],i=(s("7f7f"),s("5530")),n=s("333d"),o=s("b800"),l=s("b804"),u=s("7954"),c=s("beca"),m=s("6087"),d=s("2f62"),g=s("f264"),f=s("90ec"),p={model:"usermanagement/"},w={password:"",repassword:""},v={isActive:!0},h={name:"UserIndex",components:{Pagination:n["default"],ElToggleButton:o["default"],Sticky:l["default"]},data:function(){var e=this,t=function(t,s,a){""!==e.formReset.password&&(s!==e.formReset.password?a(new Error):a())};return{loading:!0,rules:{password:[{required:!0,message:this.generateTitleView("passwordRequired","usermanagement"),trigger:"blur"},{validator:c["checkLengthPassword"],message:this.generateTitleView("passwordLength","usermanagement"),trigger:"blur"}],repassword:[{required:!0,message:this.generateTitleView("passwordRequired","usermanagement"),trigger:"blur"},{validator:t,message:this.generateTitleView("passwordConfirm","usermanagement"),trigger:"blur"}]},users:[],total:0,USER_STATUS:[{value:!0,label:this.generateTitleView("active","usermanagement")},{value:!1,label:this.generateTitleView("deactive","usermanagement")}],USER_TYPE:[{value:1,label:"System Admin"},{value:2,label:this.generateTitleView("doctor","usermanagement")}],USER_DELETE:[{value:!0,label:this.generateTitleView("deleted","usermanagement")},{value:!1,label:this.generateTitleView("working","usermanagement")}],listQuery:{page:1,limit:10,name:"",status:null,userType:null,isDelete:!1},dialogForm:!1,formReset:JSON.parse(JSON.stringify(w)),clickOutsideDialog:!1,user_id:"",currentUser:"",formUpdateStatus:JSON.parse(JSON.stringify(v)),roleList:[]}},computed:Object(i["a"])({},Object(d["mapGetters"])({language:"language",listUsers:p.model+"listUsers",totalUsers:p.model+"totalUsers"})),watch:{language:{immediate:!0,handler:function(e,t){this.USER_STATUS=[{value:!0,label:this.generateTitleView("active","module")},{value:!1,label:this.generateTitleView("deactive","module")}],this.USER_TYPE=[{value:1,label:"System Admin"},{value:2,label:this.generateTitleView("doctor","usermanagement")}],this.USER_DELETE=[{value:!0,label:this.generateTitleView("deleted","usermanagement")},{value:!1,label:this.generateTitleView("working","usermanagement")}],this.rules={password:[{required:!0,message:this.generateTitleView("passwordRequired","usermanagement"),trigger:"blur"},{validator:c["checkLengthPassword"],message:this.generateTitleView("passwordLength","usermanagement"),trigger:"blur"}],repassword:[{required:!0,message:this.generateTitleView("passwordRequired","usermanagement"),trigger:"blur"}]}}}},mounted:function(){this.$store.commit("app/CHANGE_APP_TITLE","HỆ THỐNG GIÁM SÁT VÀ ĐIỀU KHIỂN ROBOT"),this.roleList=this.$store.state.auth.roles,this.getUsers(),this.currentUser=this.$store.state.auth.name},methods:{getUsers:function(){var e=this,t=this.$store.dispatch(p.model+f["ACT_FETCH_USER_PAGING"],{current_page:this.listQuery.page,name:this.listQuery.name,is_active:this.listQuery.status,limit:this.listQuery.limit,user_type:this.listQuery.userType,is_delete:this.listQuery.isDelete}).then((function(t){e.loading=!1}));return t},resetForm:function(){this.resetForm.password="",this.resetForm.repassword=""},deleteUser:function(e){var t=this,s=this.hasPermissionAction(this.roleList,g["UserDelete"],"",this.generateTitleView("permissionMessage","message"));s&&this.$confirm(this.generateTitleView("textMessageDelete","message"),this.generateTitleView("titleMessageDelete","message"),{confirmButtonText:this.generateTitleView("textBtnOk","message"),cancelButtonText:this.generateTitleView("textBtnCancel","message"),type:"warning"}).then((function(){t.$store.dispatch(p.model+f["ACT_DELETE_USER"],{userID:e})}))},editUser:function(e){this.hasPermissionAction(this.roleList,g["UserEdit"],"users/edit/"+e,this.generateTitleView("permissionMessage","message"))},showResetPassword:function(e){var t=this.hasPermissionAction(this.roleList,g["UserEdit"],"",this.generateTitleView("permissionMessage","message"));t&&(this.user_id=e,this.dialogForm=!0)},handleClosePopup:function(){this.dialogForm=!1,this.formReset.password="",this.formReset.repassword=""},resetFilter:function(){this.listQuery.status=null,this.listQuery.name="",this.listQuery.userType=null,this.listQuery.isDelete=!1,this.getUsers()},handleResetPassword:function(){var e=this;this.$refs["form-resetpassword"].validate((function(t){if(t){e.formReset["id"]=e.user_id,e.formReset["modified"]=(new Date).toJSON(),e.formReset["modifiedBy"]=e.currentUser;var s=e.$store.dispatch(p.model+f["ACT_RESET_PASSWORD"],e.formReset).then((function(t){e.handleClosePopup(),e.resetForm(),t.isSuccess?(e.formReset.password="",e.formReset.repassword="",e.$notify.success({title:e.generateTitleView("success","message"),message:e.generateTitleView("successMessage","message"),duration:2e3}),setTimeout((function(){window.location.href="/#/users/index"}),2e3)):(e.$notify.error({title:e.generateTitleView("error","message"),message:e.generateTitleView("errorMessage","message"),duration:2e3}),setTimeout((function(){window.location.href="/#/users/index"}),2e3))}));return s}}))},updateUserStatus:function(e,t){var s=this,a=this.hasPermissionAction(this.roleList,g["UserEdit"],"",this.generateTitleView("permissionMessage","message"));if(a){var r={isActive:t.value,id:e},i=this.$store.dispatch(p.model+f["ACT_UPDATE_STATUS"],r).then((function(e){s.resetForm(),e.isSuccess?(s.$notify.success({title:s.generateTitleView("success","message"),message:s.generateTitleView("successMessage","message"),duration:2e3}),window.location.href="/#/users/index"):(s.$notify.error({title:s.generateTitleView("error","message"),message:s.generateTitleView("errorMessage","message"),duration:2e3}),window.location.href="/#/users/index")}));return i}},redirectCreate:function(){this.hasPermissionAction(this.roleList,g["UserCreate"],"users/create",this.generateTitleView("permissionMessage","message"))},generateTitleView:m["generateTitleView"],hasPermissionAction:u["hasPermissionAction"]}},b=h,_=(s("2357"),s("2877")),T=Object(_["a"])(b,a,r,!1,null,"7b4a4e53",null);t["default"]=T.exports},f264:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RobotVersionDelete=t.RobotVersionEdit=t.RobotVersionView=t.RobotVersionCreate=t.CameraDelete=t.CameraEdit=t.CameraView=t.CameraCreate=t.AreaDelete=t.AreaEdit=t.AreaView=t.AreaCreate=t.UserMediaDelete=t.UserMediaView=t.UserMediaCreate=t.RobotDelete=t.RobotEdit=t.RobotView=t.RobotCreate=t.DoctorDelete=t.DoctorEdit=t.DoctorView=t.DoctorCreate=t.UserDelete=t.UserEdit=t.UserView=t.UserCreate=void 0;var a="UserManagement_Create";t.UserCreate=a;var r="UserManagement_View";t.UserView=r;var i="UserManagement_Edit";t.UserEdit=i;var n="UserManagement_Delete";t.UserDelete=n;var o="Doctor_Create";t.DoctorCreate=o;var l="Doctor_View";t.DoctorView=l;var u="Doctor_Edit";t.DoctorEdit=u;var c="Doctor_Delete";t.DoctorDelete=c;var m="Robot_Create";t.RobotCreate=m;var d="Robot_View";t.RobotView=d;var g="Robot_Edit";t.RobotEdit=g;var f="Robot_Delete";t.RobotDelete=f;var p="UserMedia_Create";t.UserMediaCreate=p;var w="UserMedia_View";t.UserMediaView=w;var v="UserMedia_Delete";t.UserMediaDelete=v;var h="Area_Create";t.AreaCreate=h;var b="Area_View";t.AreaView=b;var _="Area_Edit";t.AreaEdit=_;var T="Area_Delete";t.AreaDelete=T;var V="Camera_Create";t.CameraCreate=V;var y="Camera_View";t.CameraView=y;var C="Camera_Edit";t.CameraEdit=C;var R="Camera_Delete";t.CameraDelete=R;var U="RobotVersion_Create";t.RobotVersionCreate=U;var E="RobotVersion_View";t.RobotVersionView=E;var S="RobotVersion_Edit";t.RobotVersionEdit=S;var D="RobotVersion_Delete";t.RobotVersionDelete=D},f576:function(e,t,s){"use strict";var a=s("5ca1"),r=s("2e08"),i=s("a25f"),n=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);a(a.P+a.F*n,"String",{padStart:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0,!0)}})}}]);