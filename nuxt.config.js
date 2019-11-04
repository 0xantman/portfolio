const env = require('dotenv').config();

module.exports = {
  router: {
    linkActiveClass: 'active'
  },
  mode: 'universal',
  env: env.parsed,
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
    ]
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
    { src: '~plugins/vee-validate.js' , ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
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
        home: '/',
      }
    }
  },
  axios: {
    baseURL: 'http://localhost:3000/',
    //credentials: true
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
