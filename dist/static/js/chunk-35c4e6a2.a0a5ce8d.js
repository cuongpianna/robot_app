(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-35c4e6a2"],{"05d4":function(e,t,a){"use strict";var i=a("ecb9"),r=a.n(i);r.a},"2e08":function(e,t,a){var i=a("9def"),r=a("9744"),n=a("be13");e.exports=function(e,t,a,s){var o=String(n(e)),l=o.length,c=void 0===a?" ":String(a),u=i(t);if(u<=l||""==c)return o;var d=u-l,m=r.call(c,Math.ceil(d/c.length));return m.length>d&&(m=m.slice(0,d)),s?m+o:o+m}},"3b2b":function(e,t,a){var i=a("7726"),r=a("5dbc"),n=a("86cc").f,s=a("9093").f,o=a("aae3"),l=a("0bfb"),c=i.RegExp,u=c,d=c.prototype,m=/a/g,g=/a/g,f=new c(m)!==m;if(a("9e1e")&&(!f||a("79e5")((function(){return g[a("2b4c")("match")]=!1,c(m)!=m||c(g)==g||"/a/i"!=c(m,"i")})))){c=function(e,t){var a=this instanceof c,i=o(e),n=void 0===t;return!a&&i&&e.constructor===c&&n?e:r(f?new u(i&&!n?e.source:e,t):u((i=e instanceof c)?e.source:e,i&&n?l.call(e):t),a?this:d,c)};for(var v=function(e){e in c||n(c,e,{configurable:!0,get:function(){return u[e]},set:function(t){u[e]=t}})},p=s(u),b=0;p.length>b;)v(p[b++]);d.constructor=c,c.prototype=d,a("2aba")(i,"RegExp",c)}a("7a56")("RegExp")},4917:function(e,t,a){"use strict";var i=a("cb7c"),r=a("9def"),n=a("0390"),s=a("5f1b");a("214f")("match",1,(function(e,t,a,o){return[function(a){var i=e(this),r=void 0==a?void 0:a[t];return void 0!==r?r.call(a,i):new RegExp(a)[t](String(i))},function(e){var t=o(a,e,this);if(t.done)return t.value;var l=i(e),c=String(this);if(!l.global)return s(l,c);var u=l.unicode;l.lastIndex=0;var d,m=[],g=0;while(null!==(d=s(l,c))){var f=String(d[0]);m[g]=f,""===f&&(l.lastIndex=n(c,r(l.lastIndex),u)),g++}return 0===g?null:m}]}))},"6ca9":function(e,t,a){"use strict";a.r(t);var i=a("d0e6"),r=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,(function(){return i[e]}))}(n);t["default"]=r.a},7954:function(e,t,a){"use strict";var i=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.checkNumber=s,t.exportExcel=o,t.parseTime=l,t.formatTime=c,t.param2Obj=u,t.checkEmail=d,t.hasClass=m,t.addClass=g,t.removeClass=f,t.hasPermissionAction=v,t.data2blob=p,a("34ef"),a("6762"),a("2fdb"),a("3b2b"),a("4917"),a("28a5"),a("f576"),a("a481"),a("6b54");var r=i(a("7037"));a("c5f6"),a("7cdf");var n=a("5c96");function s(e,t,a){var i=parseFloat(t);return 0===i?a():i?void setTimeout((function(){Number.isInteger(i)?i<=0?a(new Error("Vui lòng nhập số lớn hơn hoặc bằng 0")):i>1e10?a(new Error("Vui lòng nhập số nhỏ hơn 10 tỷ")):a():a(new Error("Vui lòng nhập số"))}),1e3):a(new Error("Phải là số lớn hơn hoặc bằng 0"))}function o(e){}function l(e,t){if(0===arguments.length)return null;var a,i=t||"{y}-{m}-{d} {h}:{i}:{s}";"object"===(0,r.default)(e)?a=e:("string"===typeof e&&/^[0-9]+$/.test(e)&&(e=parseInt(e)),"number"===typeof e&&10===e.toString().length&&(e*=1e3),a=new Date(e));var n={y:a.getFullYear(),m:a.getMonth()+1,d:a.getDate(),h:a.getHours(),i:a.getMinutes(),s:a.getSeconds(),a:a.getDay()},s=i.replace(/{([ymdhisa])+}/g,(function(e,t){var a=n[t];return"a"===t?["日","一","二","三","四","五","六"][a]:a.toString().padStart(2,"0")}));return s}function c(e,t){e=10===(""+e).length?1e3*parseInt(e):+e;var a=new Date(e),i=Date.now(),r=(i-a)/1e3;return r<30?"chỉ cần":r<3600?Math.ceil(r/60)+"vài phút trước":r<86400?Math.ceil(r/3600)+"vài giờ trước":r<172800?"1 ngày trước":t?l(e,t):a.getMonth()+1+"tháng"+a.getDate()+"ngày "+a.getHours()+" giờ"+a.getMinutes()+" phút"}function u(e){var t=e.split("?")[1];return t?JSON.parse('{"'+decodeURIComponent(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"').replace(/\+/g," ")+'"}'):{}}function d(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)}function m(e,t){return!!e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))}function g(e,t){m(e,t)||(e.className+=" "+t)}function f(e,t){if(m(e,t)){var a=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(a," ")}}function v(e,t,a,i){return e.includes(t)?(""!==a&&(window.location.href="/#/"+a),!0):((0,n.Message)({message:i,type:"error",duration:5e3}),!1)}function p(e,t){e=e.split(",")[1],e=window.atob(e);for(var a=new Uint8Array(e.length),i=0;i<e.length;i++)a[i]=e.charCodeAt(i);return new Blob([a],{type:t})}},9744:function(e,t,a){"use strict";var i=a("4588"),r=a("be13");e.exports=function(e){var t=String(r(this)),a="",n=i(e);if(n<0||n==1/0)throw RangeError("Count can't be negative");for(;n>0;(n>>>=1)&&(t+=t))1&n&&(a+=t);return a}},c2de:function(e,t,a){"use strict";a.r(t);var i=a("eb7a"),r=a("6ca9");for(var n in r)"default"!==n&&function(e){a.d(t,e,(function(){return r[e]}))}(n);a("05d4");var s=a("2877"),o=Object(s["a"])(r["default"],i["a"],i["b"],!1,null,"696f301a",null);t["default"]=o.exports},ce84:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.scrollTo=s,Math.easeInOutQuad=function(e,t,a,i){return e/=i/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function r(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function n(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(e,t,a){var s=n(),o=e-s,l=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=l;var n=Math.easeInOutQuad(c,s,o,t);r(n),c<t?i(e):a&&"function"===typeof a&&a()};u()}},d0e6:function(e,t,a){"use strict";var i=a("dbce"),r=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("7f7f");var n=r(a("ded3")),s=r(a("333d")),o=r(a("b800")),l=r(a("b804")),c=a("7954"),u=a("6087"),d=a("2f62"),m=i(a("f264")),g=i(a("53d2")),f=a("c8a9"),v={model:"robot/",modelArea:"area/"},p={isActive:!0},b={name:"RobotIndex",components:{Pagination:s.default,ElToggleButton:o.default,Sticky:l.default},data:function(){return{areaSelected:{},showDialog:!1,selectedRobot:{map:{}},loading:!0,listQuery:{page:1,limit:10,name:"",status:null},user_id:"",formUpdateStatus:JSON.parse(JSON.stringify(p)),listMapQuery:{page:1,limit:10,name:"",status:null},headers:[{text:"Tên địa điểm",value:"name"}]}},computed:(0,n.default)({},(0,d.mapGetters)({language:"language",listRobots:v.model+"listRobots",totalRobots:v.model+"totalRobots",listAreas:v.modelArea+"listAllChildArea",listParentArea:v.model+"listParentArea",parentAreaModel:v.model+"parentAreaModel",listChildrenArea:v.model+"listChildrenArea",userType:"userType",userId:"userId"})),mounted:function(){this.$store.commit("app/CHANGE_APP_TITLE","HỆ THỐNG GIÁM SÁT VÀ ĐIỀU KHIỂN ROBOT"),this.roleList=this.$store.state.auth.roles,this.getRobots()},methods:(0,n.default)((0,n.default)({},(0,d.mapActions)({actFetchAllRobot:v.model+g.ACT_FETCH_ROBOT_PAGING,actDeleteRobot:v.model+g.ACT_DELETE_ROBOT,actUpdateStatusRobot:v.model+g.ACT_UPDATE_ROBOT_STATUS,actGetChildArea:v.modelArea+f.ACT_GET_ALL_CHILD_AREA,actSetMap:v.model+g.ACT_SET_MAP,actGetParentArea:v.model+g.ACT_GET_PARENT_AREA,actGetChildAreaByParent:v.model+g.ACT_GET_CHILD_AREA_BY_PARENT,actSetParentArea:v.model+g.ACT_SET_PARENT_AREA})),{},{getRobots:function(){var e=this;this.actFetchAllRobot({current_page:this.listQuery.page,name:this.listQuery.name,is_active:this.listQuery.status,limit:this.listQuery.limit,user_type:this.userType,user_id:this.userId}).then((function(t){e.loading=!1}))},deleteDoctor:function(e){var t=this,a=this.hasPermissionAction(this.roleList,m.RobotDelete,"",this.generateTitleView("permissionMessage","message"));a&&this.$confirm(this.generateTitleView("textMessageDelete","message"),this.generateTitleView("titleMessageDelete","message"),{confirmButtonText:this.generateTitleView("textBtnOk","message"),cancelButtonText:this.generateTitleView("textBtnCancel","message"),type:"warning"}).then((function(){t.actDeleteRobot({userID:e})}))},editDoctor:function(e){this.hasPermissionAction(this.roleList,m.RobotEdit,"users/robots/edit/"+e,this.generateTitleView("permissionMessage","message"))},resetFilter:function(){this.listQuery.status=null,this.listQuery.name="",this.getRobots()},updateRobotStatus:function(e,t){var a=this,i=this.hasPermissionAction(this.roleList,m.UserEdit,"",this.generateTitleView("permissionMessage","message"));if(i){var r={isActive:t.value,id:e};this.actUpdateStatusRobot(r).then((function(e){e.isSuccess?(a.$notify.success({title:a.generateTitleView("success","message"),message:a.generateTitleView("successMessage","message"),duration:2e3}),window.location.href="/#/users/robots/index"):(a.$notify.error({title:a.generateTitleView("error","message"),message:a.generateTitleView("errorMessage","message"),duration:2e3}),window.location.href="/#/users/robots/index")}))}},redirectCreate:function(){this.hasPermissionAction(this.roleList,m.RobotDelete,"users/robots/create",this.generateTitleView("permissionMessage","message"))},openSetMapModal:function(e){var t=this,a=JSON.parse(JSON.stringify(e));this.showDialog=!0,this.selectedRobot=a,this.selectedRobot.map=[this.selectedRobot.map],a.map&&null!=a.map[0]?(this.actSetParentArea(a.map[0].parentId),this.actGetParentArea().then((function(){t.actGetChildAreaByParent({ParentId:a.map[0].parentId})}))):(this.actGetParentArea(),this.actSetParentArea(""))},onSelect:function(e){this.areaSelected=e},setMap:function(){var e=this;this.selectedRobot.map=this.selectedRobot.map[0],this.actSetMap(this.selectedRobot).then((function(t){t.isSuccess?(e.$notify.success({title:e.generateTitleView("success","message"),message:e.generateTitleView("successMessage","message"),duration:2e3}),e.showDialog=!1,e.getRobots()):(e.$notify.error({title:e.generateTitleView("error","message"),message:e.generateTitleView("errorMessage","message"),duration:2e3}),e.showDialog=!1)}))},changeAreaParent:function(e){this.actGetChildAreaByParent({ParentId:e})},generateTitleView:u.generateTitleView,hasPermissionAction:c.hasPermissionAction})};t.default=b},eb7a:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("sticky",{attrs:{"z-index":10,"class-name":"sub-navbar"}},[a("div",{staticClass:"page-title"},[a("div",{staticClass:"title-container"},[a("router-link",{staticClass:"back-link",attrs:{to:"/"}},[a("font-awesome-icon",{staticClass:"icon-back",attrs:{icon:"chevron-left",color:"#424242"}})],1),e._v(" "),a("router-link",{staticClass:"title-page",attrs:{to:"/dashboard",title:"DashBoard"}},[e._v("\n          "+e._s(e.generateTitleView("robotManagement","robot"))+"\n        ")])],1),e._v(" "),a("div",{staticClass:"action-container"},[a("el-button",{staticClass:"btn-create-hotel",attrs:{icon:"el-icon-plus",type:"primary"},on:{click:e.redirectCreate}},[e._v("\n          "+e._s(e.generateTitleView("create","robot"))+"\n        ")])],1)])]),e._v(" "),a("v-card",{staticClass:"filter"},[a("v-container",{attrs:{fluid:""}},[a("v-row",[a("v-col",{staticClass:"vibotCol",attrs:{md:"3",cols:"12",sm:"6"}},[a("v-text-field",{staticClass:"vibotField",attrs:{label:e.generateTitleView("robotName","robot")},model:{value:e.listQuery.name,callback:function(t){e.$set(e.listQuery,"name",t)},expression:"listQuery.name"}})],1),e._v(" "),a("v-col",{attrs:{md:"6",sm:"1"}}),e._v(" "),a("v-col",{staticClass:"search-right-wrap",attrs:{md:"3",sm:"5"}},[a("el-button",{staticClass:"btn-reset",attrs:{plain:""},on:{click:e.resetFilter}},[e._v(e._s(e.generateTitleView("clear","usermanagement"))+"\n          ")]),e._v(" "),a("el-button",{staticClass:"btn-search",attrs:{type:"primary",plain:""},on:{click:e.getRobots}},[e._v("\n            "+e._s(e.generateTitleView("search","usermanagement"))+"\n          ")])],1)],1)],1)],1),e._v(" "),a("v-card",{staticClass:"table-users"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],key:0,staticClass:"table-list",staticStyle:{width:"100%"},attrs:{fit:"",data:e.listRobots,"highlight-current-row":""}},[a("el-table-column",{attrs:{label:e.generateTitleView("stt","usermanagement"),prop:"id",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){t.row;var i=t.$index;return[a("span",[e._v(e._s(i+1))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.generateTitleView("robotName","robot"),"min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",{staticClass:"link-type"},[e._v(e._s(i.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.generateTitleView("code","robot"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.code))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.generateTitleView("status","usermanagement"),"class-name":"status-col",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("div",[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.generateTitleView("robotStatus","robot"),placement:"top"}},[a("el-toggle-button",{attrs:{value:!0,color:"#123D8B",sync:!0},on:{change:function(t){return e.updateRobotStatus(i.id,t)}},model:{value:i.isActive,callback:function(t){e.$set(i,"isActive",t)},expression:"row.isActive"}})],1)],1)]}}])}),e._v(" "),a("el-table-column",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{label:"Actions",align:"center","class-name":"small-padding fixed-width",width:200},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.generateTitleView("updateTooltip","robot"),placement:"top"}},[a("el-button",{attrs:{type:"primary",size:"mini",rounded:""},on:{click:function(t){return e.editDoctor(i.id)}}},[a("i",{staticClass:"el-icon-edit"})])],1),e._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.generateTitleView("deleteTooltip","robot"),placement:"top"}},[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.deleteDoctor(i.id)}}},[a("i",{staticClass:"el-icon-delete"})])],1),e._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.generateTitleView("setMap","robot"),placement:"top"}},[a("el-button",{staticClass:"editMapbtn",attrs:{size:"mini"},on:{click:function(t){return e.openSetMapModal(i)}}},[a("i",{staticClass:"el-icon-share"})])],1)]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.totalRobots>0,expression:"totalRobots>0"}],staticClass:"pagination-hotel",attrs:{total:e.totalRobots,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getRobots}})],1),e._v(" "),a("v-dialog",{attrs:{"max-width":"550"},model:{value:e.showDialog,callback:function(t){e.showDialog=t},expression:"showDialog"}},[a("v-card",[a("v-card-title",[e._v(e._s(e.generateTitleView("setAreaTitle","area")))]),e._v(" "),a("div",{staticClass:"search"},[a("v-select",{attrs:{items:e.listParentArea,"item-text":"name","item-value":"id",label:e.generateTitleView("selectArea","robot"),dense:""},on:{change:e.changeAreaParent},model:{value:e.parentAreaModel,callback:function(t){e.parentAreaModel=t},expression:"parentAreaModel"}})],1),e._v(" "),a("div",{staticClass:"md-contents"},[e.listChildrenArea.length>0?a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.listChildrenArea,"single-select":!0,"item-key":"name","show-select":""},model:{value:e.selectedRobot.map,callback:function(t){e.$set(e.selectedRobot,"map",t)},expression:"selectedRobot.map"}}):a("div",{staticClass:"noCamera"},[e._v("\n          "+e._s(e.generateTitleView("noCamera","camera"))+"\n        ")])],1),e._v(" "),a("md-dialog-actions",[a("md-button",{staticClass:"md-primary",on:{click:function(t){e.showDialog=!1}}},[e._v(e._s(e.generateTitleView("close","camera"))+"\n        ")]),e._v(" "),a("button",{staticClass:"btn-control btn-primary",on:{click:e.setMap}},[e._v(e._s(e.generateTitleView("addCamera","camera"))+"\n        ")])],1)],1)],1)],1)},r=[];a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return r}))},ecb9:function(e,t,a){},f264:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RobotVersionDelete=t.RobotVersionEdit=t.RobotVersionView=t.RobotVersionCreate=t.CameraDelete=t.CameraEdit=t.CameraView=t.CameraCreate=t.AreaDelete=t.AreaEdit=t.AreaView=t.AreaCreate=t.UserMediaDelete=t.UserMediaView=t.UserMediaCreate=t.RobotDelete=t.RobotEdit=t.RobotView=t.RobotCreate=t.DoctorDelete=t.DoctorEdit=t.DoctorView=t.DoctorCreate=t.UserDelete=t.UserEdit=t.UserView=t.UserCreate=void 0;var i="UserManagement_Create";t.UserCreate=i;var r="UserManagement_View";t.UserView=r;var n="UserManagement_Edit";t.UserEdit=n;var s="UserManagement_Delete";t.UserDelete=s;var o="Doctor_Create";t.DoctorCreate=o;var l="Doctor_View";t.DoctorView=l;var c="Doctor_Edit";t.DoctorEdit=c;var u="Doctor_Delete";t.DoctorDelete=u;var d="Robot_Create";t.RobotCreate=d;var m="Robot_View";t.RobotView=m;var g="Robot_Edit";t.RobotEdit=g;var f="Robot_Delete";t.RobotDelete=f;var v="UserMedia_Create";t.UserMediaCreate=v;var p="UserMedia_View";t.UserMediaView=p;var b="UserMedia_Delete";t.UserMediaDelete=b;var h="Area_Create";t.AreaCreate=h;var w="Area_View";t.AreaView=w;var _="Area_Edit";t.AreaEdit=_;var C="Area_Delete";t.AreaDelete=C;var A="Camera_Create";t.CameraCreate=A;var T="Camera_View";t.CameraView=T;var R="Camera_Edit";t.CameraEdit=R;var V="Camera_Delete";t.CameraDelete=V;var y="RobotVersion_Create";t.RobotVersionCreate=y;var D="RobotVersion_View";t.RobotVersionView=D;var M="RobotVersion_Edit";t.RobotVersionEdit=M;var E="RobotVersion_Delete";t.RobotVersionDelete=E},f576:function(e,t,a){"use strict";var i=a("5ca1"),r=a("2e08"),n=a("a25f"),s=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(n);i(i.P+i.F*s,"String",{padStart:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0,!0)}})}}]);