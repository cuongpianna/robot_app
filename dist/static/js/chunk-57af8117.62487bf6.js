(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57af8117"],{"0dd7":function(e,t,a){"use strict";a.r(t);var i=a("bcd1"),r=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,(function(){return i[e]}))}(o);t["default"]=r.a},1589:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("sticky",{attrs:{"z-index":10,"class-name":"sub-navbar"}},[a("div",{staticClass:"page-title"},[a("div",{staticClass:"title-container"},[a("router-link",{staticClass:"back-link",attrs:{to:"/"}},[a("font-awesome-icon",{staticClass:"icon-back",attrs:{icon:"chevron-left",color:"#424242"}})],1),e._v(" "),a("router-link",{staticClass:"title-page",attrs:{to:"/dashboard",title:"DashBoard"}},[e._v(e._s(e.generateTitleView("userMediaManagement","userMedia")))])],1),e._v(" "),a("div",{staticClass:"action-container"},[a("el-button",{staticClass:"btn-create-hotel",attrs:{icon:"el-icon-plus",type:"primary"},on:{click:e.redirectCreate}},[e._v(e._s(e.generateTitleView("create","userMedia")))])],1)])]),e._v(" "),a("v-card",{staticClass:"filter"},[a("v-container",{attrs:{fluid:""}},[a("v-row",[a("v-col",{staticClass:"vibotCol",attrs:{md:"3",cols:"12",sm:"6"}},[a("v-text-field",{staticClass:"vibotField",attrs:{label:e.generateTitleView("mediaName","userMedia")},model:{value:e.listQuery.name,callback:function(t){e.$set(e.listQuery,"name",t)},expression:"listQuery.name"}})],1),e._v(" "),a("v-col",{attrs:{"offset-md":"7"}}),e._v(" "),a("v-col",{staticClass:"search-right-wrap",attrs:{md:"2",sm:"6"}},[a("el-button",{staticClass:"btn-reset",attrs:{plain:""},on:{click:e.resetFilter}},[e._v("\n              "+e._s(e.generateTitleView("clear","usermanagement"))+"\n            ")]),e._v(" "),a("el-button",{staticClass:"btn-search",attrs:{type:"primary",plain:""},on:{click:e.getMedias}},[e._v(e._s(e.generateTitleView("search","usermanagement")))])],1)],1)],1)],1),e._v(" "),a("v-card",{staticClass:"table-users"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],key:0,staticClass:"table-list",staticStyle:{width:"100%"},attrs:{fit:"",data:e.listMedias,"highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"id",align:"center",width:"40"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("input",{directives:[{name:"model",rawName:"v-model",value:e.mediaSelected,expression:"mediaSelected"}],attrs:{type:"checkbox"},domProps:{value:i.mediaId,checked:Array.isArray(e.mediaSelected)?e._i(e.mediaSelected,i.mediaId)>-1:e.mediaSelected},on:{change:function(t){var a=e.mediaSelected,r=t.target,o=!!r.checked;if(Array.isArray(a)){var n=i.mediaId,s=e._i(a,n);r.checked?s<0&&(e.mediaSelected=a.concat([n])):s>-1&&(e.mediaSelected=a.slice(0,s).concat(a.slice(s+1)))}else e.mediaSelected=o}}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.generateTitleView("stt","usermanagement"),prop:"id",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){t.row;var i=t.$index;return[a("span",[e._v(e._s(i+1))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.generateTitleView("mediaName","userMedia"),"min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",{staticClass:"link-type"},[e._v(e._s(i.fileName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.generateTitleView("mediaType","userMedia"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.fileType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.generateTitleView("mediaPath","userMedia"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("a",{attrs:{href:i.mediaPath,target:"_blank"}},[e._v("Tải về")])]}}])}),e._v(" "),a("el-table-column",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{label:"Actions",align:"center","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.generateTitleView("deleteTooltip","userMedia"),placement:"top"}},[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.deleteMedia(i.id)}}},[a("i",{staticClass:"el-icon-delete"})])],1)]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.totalMedias>0,expression:"totalMedias>0"}],staticClass:"pagination-hotel",attrs:{total:e.totalMedias,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getPagination}})],1),e._v(" "),a("v-dialog",{attrs:{"max-width":"550"},model:{value:e.showDialog1,callback:function(t){e.showDialog1=t},expression:"showDialog1"}},[a("v-card",[a("v-card-title",[e._v(e._s(e.generateTitleView("uploadFileToRobots","userMedia")))]),e._v(" "),a("div",{staticClass:"md-contents"},[e.listRobots.length>0?a("md-table",{attrs:{"md-card":""},on:{"md-selected":e.onSelect},scopedSlots:e._u([{key:"md-table-row",fn:function(t){var i=t.item;return a("md-table-row",{attrs:{"md-selectable":"multiple","md-auto-select":""}},[a("md-table-cell",{attrs:{"md-label":e.generateTitleView("robotName","robot")}},[e._v(e._s(i.name))]),e._v(" "),a("md-table-cell",{attrs:{"md-label":e.generateTitleView("robotIp","robot")}},[e._v(e._s(i.ip))])],1)}}],null,!1,3417421612),model:{value:e.listRobots,callback:function(t){e.listRobots=t},expression:"listRobots"}}):a("div",{staticClass:"noCamera"},[e._v(e._s(e.generateTitleView("noCamera","camera")))])],1),e._v(" "),a("md-dialog-actions",[a("md-button",{staticClass:"md-primary",on:{click:function(t){return e.hideDialog()}}},[e._v(e._s(e.generateTitleView("close","camera")))]),e._v(" "),a("md-button",{staticClass:"md-primary",on:{click:function(t){return e.uploadMediaToRobot()}}},[e._v(e._s(e.generateTitleView("uploadMedia","userMedia")))])],1)],1)],1)],1)},r=[];a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return r}))},"2e08":function(e,t,a){var i=a("9def"),r=a("9744"),o=a("be13");e.exports=function(e,t,a,n){var s=String(o(e)),l=s.length,c=void 0===a?" ":String(a),d=i(t);if(d<=l||""==c)return s;var u=d-l,m=r.call(c,Math.ceil(u/c.length));return m.length>u&&(m=m.slice(0,u)),n?m+s:s+m}},"3b2b":function(e,t,a){var i=a("7726"),r=a("5dbc"),o=a("86cc").f,n=a("9093").f,s=a("aae3"),l=a("0bfb"),c=i.RegExp,d=c,u=c.prototype,m=/a/g,f=/a/g,g=new c(m)!==m;if(a("9e1e")&&(!g||a("79e5")((function(){return f[a("2b4c")("match")]=!1,c(m)!=m||c(f)==f||"/a/i"!=c(m,"i")})))){c=function(e,t){var a=this instanceof c,i=s(e),o=void 0===t;return!a&&i&&e.constructor===c&&o?e:r(g?new d(i&&!o?e.source:e,t):d((i=e instanceof c)?e.source:e,i&&o?l.call(e):t),a?this:u,c)};for(var v=function(e){e in c||o(c,e,{configurable:!0,get:function(){return d[e]},set:function(t){d[e]=t}})},h=n(d),b=0;h.length>b;)v(h[b++]);u.constructor=c,c.prototype=u,a("2aba")(i,"RegExp",c)}a("7a56")("RegExp")},4917:function(e,t,a){"use strict";var i=a("cb7c"),r=a("9def"),o=a("0390"),n=a("5f1b");a("214f")("match",1,(function(e,t,a,s){return[function(a){var i=e(this),r=void 0==a?void 0:a[t];return void 0!==r?r.call(a,i):new RegExp(a)[t](String(i))},function(e){var t=s(a,e,this);if(t.done)return t.value;var l=i(e),c=String(this);if(!l.global)return n(l,c);var d=l.unicode;l.lastIndex=0;var u,m=[],f=0;while(null!==(u=n(l,c))){var g=String(u[0]);m[f]=g,""===g&&(l.lastIndex=o(c,r(l.lastIndex),d)),f++}return 0===f?null:m}]}))},"5f0f":function(e,t,a){"use strict";var i=a("db7d"),r=a.n(i);r.a},"77cd":function(e,t,a){"use strict";a.r(t);var i=a("1589"),r=a("0dd7");for(var o in r)"default"!==o&&function(e){a.d(t,e,(function(){return r[e]}))}(o);a("5f0f");var n=a("2877"),s=Object(n["a"])(r["default"],i["a"],i["b"],!1,null,"475d4f20",null);t["default"]=s.exports},7954:function(e,t,a){"use strict";var i=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.checkNumber=n,t.exportExcel=s,t.parseTime=l,t.formatTime=c,t.param2Obj=d,t.checkEmail=u,t.hasClass=m,t.addClass=f,t.removeClass=g,t.hasPermissionAction=v,t.data2blob=h,a("34ef"),a("6762"),a("2fdb"),a("3b2b"),a("4917"),a("28a5"),a("f576"),a("a481"),a("6b54");var r=i(a("7037"));a("c5f6"),a("7cdf");var o=a("5c96");function n(e,t,a){var i=parseFloat(t);return 0===i?a():i?void setTimeout((function(){Number.isInteger(i)?i<=0?a(new Error("Vui lòng nhập số lớn hơn hoặc bằng 0")):i>1e10?a(new Error("Vui lòng nhập số nhỏ hơn 10 tỷ")):a():a(new Error("Vui lòng nhập số"))}),1e3):a(new Error("Phải là số lớn hơn hoặc bằng 0"))}function s(e){}function l(e,t){if(0===arguments.length)return null;var a,i=t||"{y}-{m}-{d} {h}:{i}:{s}";"object"===(0,r.default)(e)?a=e:("string"===typeof e&&/^[0-9]+$/.test(e)&&(e=parseInt(e)),"number"===typeof e&&10===e.toString().length&&(e*=1e3),a=new Date(e));var o={y:a.getFullYear(),m:a.getMonth()+1,d:a.getDate(),h:a.getHours(),i:a.getMinutes(),s:a.getSeconds(),a:a.getDay()},n=i.replace(/{([ymdhisa])+}/g,(function(e,t){var a=o[t];return"a"===t?["日","一","二","三","四","五","六"][a]:a.toString().padStart(2,"0")}));return n}function c(e,t){e=10===(""+e).length?1e3*parseInt(e):+e;var a=new Date(e),i=Date.now(),r=(i-a)/1e3;return r<30?"chỉ cần":r<3600?Math.ceil(r/60)+"vài phút trước":r<86400?Math.ceil(r/3600)+"vài giờ trước":r<172800?"1 ngày trước":t?l(e,t):a.getMonth()+1+"tháng"+a.getDate()+"ngày "+a.getHours()+" giờ"+a.getMinutes()+" phút"}function d(e){var t=e.split("?")[1];return t?JSON.parse('{"'+decodeURIComponent(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"').replace(/\+/g," ")+'"}'):{}}function u(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)}function m(e,t){return!!e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))}function f(e,t){m(e,t)||(e.className+=" "+t)}function g(e,t){if(m(e,t)){var a=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(a," ")}}function v(e,t,a,i){return e.includes(t)?(""!==a&&(window.location.href="/#/"+a),!0):((0,o.Message)({message:i,type:"error",duration:5e3}),!1)}function h(e,t){e=e.split(",")[1],e=window.atob(e);for(var a=new Uint8Array(e.length),i=0;i<e.length;i++)a[i]=e.charCodeAt(i);return new Blob([a],{type:t})}},9744:function(e,t,a){"use strict";var i=a("4588"),r=a("be13");e.exports=function(e){var t=String(r(this)),a="",o=i(e);if(o<0||o==1/0)throw RangeError("Count can't be negative");for(;o>0;(o>>>=1)&&(t+=t))1&o&&(a+=t);return a}},bcd1:function(e,t,a){"use strict";var i=a("dbce"),r=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("ac6a"),a("7f7f");var o=r(a("ded3")),n=r(a("333d")),s=r(a("b804")),l=a("7954"),c=a("6087"),d=a("2f62"),u=i(a("f264")),m=i(a("3e69")),f=a("53d2"),g=a("cf10"),v={model:"usermedia/",robotModel:"robot/"},h={isActive:!0},b={name:"Index",components:{Pagination:n.default,Sticky:s.default},data:function(){return{robotSelected:[],loading:!0,showDialog1:!1,listQuery:{page:1,limit:20,name:"",status:null},dialogForm:!1,user_id:"",currentUser:"",formUpdateStatus:JSON.parse(JSON.stringify(h)),mediaSelected:[],socket:null}},computed:(0,o.default)({},(0,d.mapGetters)({language:"language",listMedias:v.model+"listMedias",totalMedias:v.model+"totalMedias",listRobots:v.robotModel+"listRobots",userType:"userType",userId:"userId"})),mounted:function(){this.$store.commit("app/CHANGE_APP_TITLE","HỆ THỐNG GIÁM SÁT VÀ ĐIỀU KHIỂN ROBOT"),this.socket=this.initSocket(),this.roleList=this.$store.state.auth.roles,this.currentUser=this.$store.state.auth.name,this.currentUserId=this.$store.state.auth.id,this.getMedias()},methods:(0,o.default)((0,o.default)({},(0,d.mapActions)({actFetchAllMedia:v.model+m.ACT_FETCH_MEDIA_PAGING,actUploadMediaToRobot:v.model+m.ACT_UPLOAD_MEDIA_TO_ROBOT,actInsertMedia:v.model+m.ACT_INSERT_MEDIA,actFetchAllRobot:v.robotModel+f.ACT_FETCH_ROBOT_PAGING,actDeleteMedia:v.model+g.ACT_DELETE_MEDIA})),{},{getMedias:function(){var e=this;this.actFetchAllMedia({current_page:this.listQuery.page,name:this.listQuery.name,user_id:this.currentUserId,is_active:this.listQuery.status,limit:this.listQuery.limit}).then((function(t){e.loading=!1}))},getRobots:function(){var e=this;this.actFetchAllRobot({current_page:this.listQuery.page,name:this.listQuery.name,is_active:this.listQuery.status,limit:this.listQuery.limit,user_type:this.userType,user_id:this.userId}).then((function(t){e.loading=!1}))},uploadMediaToRobot:function(){var e=this;this.robotSelected.length>0?this.actUploadMediaToRobot({MediaIds:this.mediaSelected,RobotIds:this.robotSelected}).then((function(t){e.loading=!1,t.isSuccess?(e.$notify.success({title:"Tải media lên robot",message:"Tải media lên robot thành công",duration:2e3}),e.showDialog1=!1,e.robotSelected.forEach((function(t){e.mediaSelected.forEach((function(a){var i=b64EncodeUnicode("DownloadMedia_"+t+"_"+a);e.socket.send(i)}))}))):e.$notify.error({title:e.generateTitleView("error","message"),message:e.generateTitleView("errorMessage","message"),duration:2e3})})):this.$notify.error({title:"Chưa chọn robot",message:"Bạn cần chọn robot trước khi upload file",duration:2e3})},onSelect:function(e){var t=this;null!=e&&e.forEach((function(e){t.robotSelected.push(e.code)}))},deleteMedia:function(e){var t=this.hasPermissionAction(this.roleList,u.RobotDelete,"",this.generateTitleView("permissionMessage","message"));t&&this.actDeleteMedia(e)},hideDialog:function(){this.showDialog1=!1},openUploadMedia:function(){console.log(this.mediaSelected),this.mediaSelected.length>0?(this.showDialog1=!0,this.getRobots()):this.$notify.error({title:"Chưa chọn media",message:"Bạn cần chọn media trước khi upload file",duration:2e3})},resetFilter:function(){this.listQuery.status=null,this.listQuery.name=""},redirectCreate:function(){this.hasPermissionAction(this.roleList,u.RobotDelete,"usermedia/create",this.generateTitleView("permissionMessage","message"))},generateTitleView:c.generateTitleView,hasPermissionAction:l.hasPermissionAction,initSocket:function(){var e="wss://172.20.10.2:9000/agency/downloadMedia",t=new WebSocket(e),a=this;return t.onopen=function(){console.log("Connected.")},t.onclose=function(e){e.wasClean?console.log("Disconnected."):console.log("Connection lost."),console.log("Code: "+e.code+". Reason: "+e.reason),setTimeout((function(){a.socket=a.initSocket()}),1e3)},t.onmessage=function(e){var t=e.data;console.log("Data received: "+t)},t.onerror=function(e){console.log("Error: "+e.message)},t}})};t.default=b},ce84:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.scrollTo=n,Math.easeInOutQuad=function(e,t,a,i){return e/=i/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function r(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function n(e,t,a){var n=o(),s=e-n,l=20,c=0;t="undefined"===typeof t?500:t;var d=function e(){c+=l;var o=Math.easeInOutQuad(c,n,s,t);r(o),c<t?i(e):a&&"function"===typeof a&&a()};d()}},db7d:function(e,t,a){},f264:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RobotVersionDelete=t.RobotVersionEdit=t.RobotVersionView=t.RobotVersionCreate=t.CameraDelete=t.CameraEdit=t.CameraView=t.CameraCreate=t.AreaDelete=t.AreaEdit=t.AreaView=t.AreaCreate=t.UserMediaDelete=t.UserMediaView=t.UserMediaCreate=t.RobotDelete=t.RobotEdit=t.RobotView=t.RobotCreate=t.DoctorDelete=t.DoctorEdit=t.DoctorView=t.DoctorCreate=t.UserDelete=t.UserEdit=t.UserView=t.UserCreate=void 0;var i="UserManagement_Create";t.UserCreate=i;var r="UserManagement_View";t.UserView=r;var o="UserManagement_Edit";t.UserEdit=o;var n="UserManagement_Delete";t.UserDelete=n;var s="Doctor_Create";t.DoctorCreate=s;var l="Doctor_View";t.DoctorView=l;var c="Doctor_Edit";t.DoctorEdit=c;var d="Doctor_Delete";t.DoctorDelete=d;var u="Robot_Create";t.RobotCreate=u;var m="Robot_View";t.RobotView=m;var f="Robot_Edit";t.RobotEdit=f;var g="Robot_Delete";t.RobotDelete=g;var v="UserMedia_Create";t.UserMediaCreate=v;var h="UserMedia_View";t.UserMediaView=h;var b="UserMedia_Delete";t.UserMediaDelete=b;var p="Area_Create";t.AreaCreate=p;var _="Area_View";t.AreaView=_;var w="Area_Edit";t.AreaEdit=w;var C="Area_Delete";t.AreaDelete=C;var y="Camera_Create";t.CameraCreate=y;var M="Camera_View";t.CameraView=M;var T="Camera_Edit";t.CameraEdit=T;var D="Camera_Delete";t.CameraDelete=D;var V="RobotVersion_Create";t.RobotVersionCreate=V;var R="RobotVersion_View";t.RobotVersionView=R;var S="RobotVersion_Edit";t.RobotVersionEdit=S;var E="RobotVersion_Delete";t.RobotVersionDelete=E},f576:function(e,t,a){"use strict";var i=a("5ca1"),r=a("2e08"),o=a("a25f"),n=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);i(i.P+i.F*n,"String",{padStart:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0,!0)}})}}]);