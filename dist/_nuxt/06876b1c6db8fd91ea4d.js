(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{361:function(t,n,e){"use strict";e.r(n);e(41);var r=e(11),o={asyncData:function(t){var n=t.$axios,e=t.$auth,o=t.redirect;t.$emit;return n.$get("/admin/user/my-portfolio").then((function(t){return console.log(t),{posts:t.data}})).catch(function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.logout();case 2:o(302,"/login");case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}())}},c=e(30),component=Object(c.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("b-container",t._l(t.posts,(function(n,r){return e("div",{key:r,staticClass:"card mb-3"},[e("div",{staticClass:"card-body"},[e("p",{staticClass:"card-text",domProps:{innerHTML:t._s(n.content)}}),t._v(" "),e("p",{staticClass:"card-text"},[e("small",{staticClass:"text-muted"},[t._v("Last updated "+t._s(n.date_time))])]),t._v(" "),e("b-button",{attrs:{to:"/admin/my-portfolio/"+n.id,variant:"primary"}},[t._v("Edit")])],1)])})),0)}),[],!1,null,null,null);n.default=component.exports}}]);