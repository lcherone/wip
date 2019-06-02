/*
 ** Express Router
 */
const router = require('express').Router()

/**
 * Index Controller
 *
 * As your see much of this file is not used, because / is
 *  handled by app.static(publicPath) which serves the
 *  ./app/dist folder
 *
 */
module.exports = app => {

  /**
   * Controller
   */
  const controller = new class {

    constructor(app) {
      this.app = app
    }

    /**
     * Socket.io event(s)
     */
    async socket(socket, io, clients) {
      //
      socket.on('page:index', (data, cb) => {
        if (cb) cb({
          data: 'foobarb'
        })
      })

      //
      socket.on('announce', (data, cb) => {
        console.log('announce', socket.id)

        clients[socket.id].meta = data

        if (cb) cb(clients)
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

  /**
   * Route(s)
   */
  // router.get('/', (...args) => controller.get(...args))

  return {
    controller: controller,
    router: router
  }
}
