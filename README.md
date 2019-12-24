# portfolio

> My well-made Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Config Setup
Create account in Firebase and setup a Authenticate User email and password
Firebase Realtime Database Rules:

Copy&Past 
```
{
  "rules": {
    "inboxes":{
      ".read": "auth.uid != null",
      ".write" : "auth.uid != null"
    },
    "profile":{
      ".read": true,
			".write": "auth.uid != null"
    },
    "portfolio":{
        ".read": true,
        ".write" : "auth.uid != null"
    }
  }
}
```

Create a .env file in root project, add and complete with your Firebase SDK snippet firebaseConfig:

    NUXT_ENV_JWT_SECRET_KEY= randomKeyPassword
    NUXT_ENV_BASE_URL = http://localhost:3000
    NUXT_ENV_TINYMCE_API = yourTinyKey We use Tiny text editor get your api key at [TinyMCE](https://www.tiny.cloud/)
    NUXT_ENV_TITLE = My portfolio!
    NUXT_ENV_CONTENT = A passionate web developer introduces himself. Come and check my portfiolio!
    NUXT_ENV_WEBSITE_NAME = @Portfolio
    NUXT_ENV_FIREBASE_API_KEY = 
    NUXT_ENV_FIREBASE_AUTH_DOMAIN = 
    NUXT_ENV_FIREBASE_DATABASE_URL = 
    NUXT_ENV_FIREBASE_STORAGE_BUCKET = 





