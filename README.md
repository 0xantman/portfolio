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
Create file in /db folder database.db like this /db/database.db.
Create a .env file in root project and add :

    DEFAULT_EMAIL = yourEmail 
    DEFAULT_PASSWORD = yourPassword 
    TINYMCE_API = yourTinyKey We use Tiny text editor get your api key at [TinyMCE](https://www.tiny.cloud/).
    JWT_SECRET_KEY = create secure password hashing

In terminal cd root portfolio and run NODE migration.js for UPDATE the data in DB Admin.


