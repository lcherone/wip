import {
  Storage
} from '../plugins/storage'

const storage = Storage({
  prefix: 'storage_',
  obfusck: 'no-dummy'
})

/**
 *
 */
export default function auth({
  next,
  router
}) {
  if (!storage.isset('state')) {
    return router.push({
      name: 'auth-sign-in'
    })
  }

  let state = storage.get('state')

  if (!state || !state.auth || !state.auth.token) {
    return router.push({
      name: 'auth-sign-in'
    })
  }

  return next()
}
