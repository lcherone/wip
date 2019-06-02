const encryption = require('@lib/encryption')

/**
 * User Index Controller
 *
 * @module user
 */
const Controller = function (app) {

    /*
     ** Private variable(s)
     */
    let private = {
        i: 0
    }

    /**
     * Socket.io events
     */
    this.socket = (socket, io, clients) => {
        //
        socket.on('user:foo', (data, cb) => {
            console.log('user:foo', data)

            cb(clients)
        })
    }

    /**
     * [GET] /user
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    this.get = async (req, res, next) => {
        try {
          console.log(app.model)
            let user = await app.model.user.fromToken(req)



            //
            if (user.error) {
                return res.json(user)
            }

            res.json(user)
        } catch (err) {
            return next(err)
        }
    }

    return this
}

module.exports = Controller
