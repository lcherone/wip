/*
 ** Express Router
 */
const router = require('express').Router()

/*
 ** Export function
 */
module.exports = app => {

  /**
   * Model(s)
   *  - It gets set into `app.modal.user` etc
   */
  const models = {
    user: require('./models/user')(app)
  }

  /**
   * Controller(s)
   */
  const controllers = {
    index: require('./controllers/index')(app)
  }

  //console.log(require('@acme-project/model/foo')(app))

  /**
   * Route(s)
   */
  router.get('/user', (...args) => controllers.index.get(...args))

  return {
    models: models,
    controllers: controllers,
    router: router
  }
}
