require('dotenv').config()

const debug = require('debug')('app:bootstrap')
const path = require('path')

try {

  // App
  const app = require('@lib/express')({
    publicPath: path.join(__dirname, '../', '../', 'app', 'dist')
  })

  // Socket.io
  app.socket = require('@lib/socket.io')(app)

  /*
   ** Enable route controllers
   */
  app.addRoutes([
    'index', 'test'
  ])

  /*
   ** Error handler
   */
  app.express.use((err, req, res, next) => {
    //
    debug(err.stack);

    //
    res.status(500).json({
      message: err.message,
      name: err.name,
      fatal: err.fatal,
      errno: err.errno,
      code: err.code
    });
  });

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
