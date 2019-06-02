require('dotenv').config()
process.env.DEBUG_HIDE_DATE = true

const debug = require('debug')('app')
const path = require('path')

try {

  // App
  const app = require('@lib/express')({
    apiPath: '/1.0',
    basePath: path.join(__dirname),
    publicPath: path.join(__dirname, '../', '../', 'app', 'dist')
  })

  // Database
  app.express.set('database', new(require('@lib/orm'))({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    freeze: false,
    underscore: true
  }))

  // Socket.io
  app.socket = require('@lib/socket.io')(app)

  /*
   ** Add Models
   */
  app.addModels([
    'foo'
  ])

  /*
   ** Enable route controllers
   */
  app.addRoutes([
    'index', 'auth', 'user', 'test'
  ])

  /*
   ** Error handler
   */
  app.express.use((err, req, res, next) => {
    //
    debug(err.stack)

    //
    res.status(500).json({
      error: {
        message: err.message,
        name: err.name,
        fatal: err.fatal,
        errno: err.errno,
        code: err.code
      }
    })
  })

  /*
   ** Listen
   */
  app.listen(process.env.PORT || 8080, err => {
    if (err) throw err
    debug(`Server started: http://${process.env.HOST || 'localhost'}:${process.env.PORT || 8080}`)
  })
} catch (e) {
  console.error(e)
}
