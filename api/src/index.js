require('dotenv').config();

const debug = require('debug')('app:bootstrap')
const path = require('path')

console.log(__dirname)

try {
  // App instance
  const app = require('@projex/express')({
    publicPath: path.join(__dirname, '../', '../', 'app', 'dist')
  })

  // Enable socket.io
  app.socket = require('@projex/socket.io')(app)

  /*
   ** Enable route controllers
   */
  app.addRoutes([
    'index'
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
