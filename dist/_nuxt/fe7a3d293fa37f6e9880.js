(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{353:function(e,t,n){"use strict";var o={props:{items:{type:Array},archiveOption:{type:Boolean,default:!0}},data:function(){return{fields:["selected","date","email","subject","show_details"],isBusy:!1,selectedItems:[],selectedOption:null}},computed:{options:function(){return this.archiveOption?[{value:null,text:"Please select an option"},{value:"A",text:"Archive"},{value:"D",text:"Delete"}]:[{value:null,text:"Please select an option"},{value:"D",text:"Delete"}]}},methods:{onRowSelected:function(e){this.selectedItems=e},action:function(){var e=this;switch(this.selectedOption){case"A":this.$axios.post("/admin/user/inbox/action/archive",{data:this.selectedItems}).then((function(t){e.selectedItems=[],e.$emit("action"),e.$axios.get("/admin/user/inbox/count").then((function(t){e.$store.commit("notification/updateNews",t.data.unread),e.$store.commit("notification/updateArchive",t.data.read)}))})).catch((function(e){console.error(e)}));break;case"D":this.$axios.post("/admin/user/inbox/action/delete",{data:this.selectedItems}).then((function(t){e.selectedItems=[],e.$emit("action"),e.$axios.get("/admin/user/inbox/count").then((function(t){e.$store.commit("notification/updateNews",t.data.unread),e.$store.commit("notification/updateArchive",t.data.read)}))})).catch((function(e){console.error(e)}))}}}},r=n(30),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-card",{attrs:{"border-variant":"light",header:"Select rows to edit action"}},[n("b-card-text",[n("b-form-select",{attrs:{options:e.options},model:{value:e.selectedOption,callback:function(t){e.selectedOption=t},expression:"selectedOption"}})],1),e._v(" "),e.selectedOption?n("b-button",{staticClass:"mt-2",attrs:{block:"",disabled:!e.selectedOption||e.selectedItems.length<=0,variant:"A"==e.selectedOption?"primary":"danger"},on:{click:e.action}},["A"==e.selectedOption?n("span",[e._v(" Archive "+e._s(e.selectedItems.length)+" item(s)")]):n("span",[e._v("Delete "+e._s(e.selectedItems.length)+" item(s)")])]):e._e()],1),e._v(" "),0!=e.items.length?n("b-table",{attrs:{striped:"",hover:"",items:e.items,busy:e.isBusy,fields:e.fields,selectable:""},on:{"row-selected":e.onRowSelected},scopedSlots:e._u([{key:"table-busy",fn:function(){return[n("div",{staticClass:"text-center text-danger my-2"},[n("b-spinner",{staticClass:"align-middle"}),e._v(" "),n("strong",[e._v("Loading...")])],1)]},proxy:!0},{key:"cell(selected)",fn:function(t){return[t.rowSelected?[n("span",{attrs:{"aria-hidden":"true"}},[e._v("✓")]),e._v(" "),n("span",{staticClass:"sr-only"},[e._v("Selected")])]:[n("span",{attrs:{"aria-hidden":"true"}},[e._v(" ")]),e._v(" "),n("span",{staticClass:"sr-only"},[e._v("Not selected")])]]}},{key:"cell(date)",fn:function(t){return[e._v("\n              "+e._s(e._f("moment")(t.item.date,"dddd, MMMM Do YYYY, HH:mm"))+"\n          ")]}},{key:"cell(show_details)",fn:function(t){return[n("b-container",[t.item.unread?e._e():n("b-badge",{attrs:{pill:"",variant:"primary"}},[e._v("New")])],1),e._v(" "),n("NuxtLink",{staticClass:"nav-link",attrs:{to:"/admin/my-inbox/"+t.item.id}},[e._v("\n                  View\n              ")])]}}],null,!1,2989197330)}):n("div",[n("b-alert",{attrs:{show:"",variant:"warning"}},[e._v("There is no news today.")])],1)],1)}),[],!1,null,null,null);t.a=component.exports},358:function(e,t,n){"use strict";n.r(t);n(41);var o=n(11),r={asyncData:function(e){var t=e.$axios,n=e.$auth,r=e.redirect;e.$emit;return t.$get("/admin/user/inbox/archive").then((function(e){return{items:e.archive,inbox:e.inbox}})).catch(function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.logout();case 2:r(302,"/login");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},components:{Inbox:n(353).a},methods:{reload:function(){var e=this;this.$axios.get("/admin/user/inbox/archive").then((function(t){e.items=t.data.archive,e.inbox=t.data.inbox,console.log(t)}))}}},c=n(30),component=Object(c.a)(r,(function(){var e=this.$createElement;return(this._self._c||e)("Inbox",{attrs:{items:this.items,archiveOption:!1},on:{action:this.reload}})}),[],!1,null,null,null);t.default=component.exports}}]);