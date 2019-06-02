/**
 *
 */
const path = require('path')
const bcrypt = require('bcryptjs')

/**
 *
 */
module.exports = app => {

  /**
   *
   */
  const database = app.get('database')
  const jwt = require('@lib/jwt')({
    certsPath: path.join(app.get('basePath'), '../', '.files', 'jwt')
  })

  /**
   *
   */
  this.create = async function (data) {
    let user = new database.row('user', data)

    user.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
    user.createdDate = new Date()

    return user
  }

  /**
   *
   */
  this.authenticate = async function (email, password) {

    let user = await database.findOne('user', 'email = ?', [
      email
    ])

    if (user.id) {
      //
      if (!bcrypt.compareSync(password, user.password)) {
        return {
          error: 'Invalid username or password'
        }
      }
      return {
        token: jwt.sign({
          id: user.id
        })
      }
    }
    return {
      error: 'Invalid username or password'
    }
  }

  /**
   *
   */
  this.fromToken = async function (req) {
    // sanity check token is set
    if (!req.headers.authorization || (req.headers.authorization && req.headers.authorization.charAt(6) !== ' ')) {
      return false
    }

    let parts = req.headers.authorization.split(' ')

    if (parts.length !== 2 || !parts[1]) {
      return false
    }

    try {
      let decoded = jwt.verify(parts[1])

      return await database.load('user', decoded.id)
    } catch (e) {
      return {
        error: {
          name: e.name,
          massage: e.massage
        }
      }
    }
  }

  return this
}
