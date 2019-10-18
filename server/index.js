const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const apiRouter = require('../api/api');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const errorhandler = require('errorhandler');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
// var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
  
// }))


app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', apiRouter);

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
