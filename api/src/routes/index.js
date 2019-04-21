
module.exports = app => {

  /*
   ** Controller
   */
  const controller = new class {

    constructor(app) {
      this.app = app
    }

    async socket(socket, io, clients) {
      socket.on('announce', (meta, cb) => {
        console.log('announce', clients)

        cb(clients)
      })
    }

    async get(req, res, next) {
      //
      try {
        console.log(this.app)
        // res.json('It Works!')
        res.render('pages/index', {
          socket_clients: this.app.get('socket_clients'),
          package: this.app.get('package')
        });
      } catch (err) {
        return next(err)
      }
    }
  }(app)

  /*
   ** Router & Routes
   */
  const {
    Router
  } = require('express')
  const router = Router()

  // GET /[options.apiPath [/options.apiVersion]]/
  router.get('/', (...args) => controller.get(...args))

  return {
    controller: controller,
    router: router
  }
}
