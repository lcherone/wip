/*
 ** Express Router
 */
const router = require('express').Router()

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
      //
      socket.on('test:foo', (data, cb) => {
        console.log('test:foo', data)

        cb(clients)
      })
    }

    /**
     * [GET] /test
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    async get(req, res, next) {

      console.log(this.app.model)

      try {
        res.json({
          message: 'Hello from /test'
        })
      } catch (err) {
        return next(err)
      }
    }
  }(app)

  //
  router.get('/test', (...args) => controller.get(...args))

  return {
    controller: controller,
    router: router
  }
}
