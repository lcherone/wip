/**
 * Index Controller
 *
 * As your see much of this file is not used, because / is
 *  handled by app.static(publicPath) which serves the
 *  ./app/dist folder
 *
 */
module.exports = app => {

  /*
   ** Controller
   */
  const controller = new class {

    constructor(app) {
      this.app = app
    }

    /**
     * Socket.io events
     */
    async socket(socket, io, clients) {
      socket.on('page:index', (data, cb) => {
        cb({
          data: 'foobarb'
        })
      })
      socket.on('announce', (data, cb) => {
        console.log('announce', clients)

        clients[socket.id].meta = data

        cb(clients)
      })
    }

    // /**
    //  * @route [GET] /
    //  * @param {*} req
    //  * @param {*} res
    //  * @param {*} next
    //  */
    // async get(req, res, next) {
    //   //
    //   try {
    //     res.render('pages/index', {
    //       socket_clients: this.app.get('socket_clients'),
    //       package: this.app.get('package')
    //     });
    //   } catch (err) {
    //     return next(err)
    //   }
    // }
  }(app)

  /*
   ** Router & Routes
   */
  const router = require('express').Router()

  // GET /[options.apiPath [/options.apiVersion]]/
  // router.get('/', (...args) => controller.get(...args))

  return {
    controller: controller,
    router: router
  }
}
