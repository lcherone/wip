const encryption = require('@lib/encryption')

/**
 * Sign-in Controller
 *
 * @module auth
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
        socket.on('auth:foo', (data, cb) => {
            console.log('test:foo', data)

            cb(clients)
        })
    }

    /**
     * [POST] /auth/sign-in
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    this.post = async (req, res, next) => {

        try {
            res.json(await app.model.auth.authenticate(req.body.email, req.body.password))

            //
            /*
            user = await app.model.auth.createUser({
                email: 'admin@example.com',
                password: 'admin',
                password_require_change: 1
            })
            await user.store()
            */

        } catch (err) {
            return next(err)
        }
    }

    return this
}

module.exports = Controller
