(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{367:function(t,n,e){"use strict";e.r(n);e(41);var r=e(11),o=(e(99),{asyncData:function(t){var n=t.$axios,e=t.$auth,o=t.redirect,c=(t.$emit,t.store);return n.$get("/admin/user/inbox/count").then((function(t){console.log(t),c.commit("notification/updateNews",t.unread),c.commit("notification/updateArchive",t.read)})).catch(function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.logout();case 2:o(302,"/login");case 3:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}())},computed:{news:function(){return this.$store.state.notification.news},archive:function(){return this.$store.state.notification.archive}}}),c=e(30),component=Object(c.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("b-container",{staticClass:"mt-5"},[e("b-row",[e("b-col",[e("b-nav",{attrs:{pills:"",vertical:""}},[e("NuxtLink",{staticClass:"nav-link",attrs:{to:"/admin/my-inbox/news"}},[t._v("\n                 News "),e("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.news))])],1),t._v(" "),e("NuxtLink",{staticClass:"nav-link",attrs:{to:"/admin/my-inbox/archive"}},[t._v("\n                Archive "),e("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.archive))])],1)],1)],1),t._v(" "),e("b-col",{attrs:{cols:"10"}},[e("nuxt-child")],1)],1)],1)}),[],!1,null,null,null);n.default=component.exports}}]);