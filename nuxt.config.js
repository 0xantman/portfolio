const env = require('dotenv').config();
var Editor = require('@tinymce/tinymce-vue');

module.exports = {
  router: {
    linkActiveClass: 'active',
    //active base url and modify with your folder name if your website is not at root folder
    //base: '/nodejs/'
  },
  mode: 'spa',
  env: env.parsed,
  Editor: Editor.default,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/vee-validate.js', mode: 'client'},
    {src:'~/plugins/vue-moment.js', mode: 'client'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  axios:{
    baseURL: '/'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@bazzite/nuxt-netlify',
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/admin/login', method: 'post', propertyName: 'token' },
          logout: false, //{ url: '/admin/logout', method: 'post', propertyName: false  },
          user: false//{ url: '/admin/backend', method: 'get', propertyName: false  }
        },


        //tokenRequired: false,
        //tokenType: false
        tokenRequired: true,
        tokenType: 'bearer'
      },
      redirect: {
        home: '/admin',
        login: '/login',
        logout: '/'
      }
    }
  },
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: [
      "vee-validate/dist/rules"
    ],

    extend (config, ctx) {
    }
  }
}
