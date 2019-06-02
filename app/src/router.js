/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'

import checkAuth from './middleware/check-auth';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'index',
      component: () => import( /* webpackChunkName: "index" */ './pages/index.vue'),
      meta: {
        middleware: [checkAuth]
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import( /* webpackChunkName: "about" */ './pages/about.vue'),
      meta: {
        middleware: [checkAuth]
      }
    },
    {
      path: '/auth/sign-in',
      name: 'auth-sign-in',
      component: () => import( /* webpackChunkName: "auth-sign-in" */ './pages/auth/sign-in.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import( /* webpackChunkName: "auth-sign-in" */ './pages/users/index.vue'),
      meta: {
        middleware: [checkAuth]
      }
    },
    {
      path: '/*',
      name: 'notfound',
      component: () => import( /* webpackChunkName: "notfound" */ './pages/index.vue'),
      meta: {
        middleware: [checkAuth]
      }
    }
  ]
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index)
    subsequentMiddleware({
      ...context,
      next: nextMiddleware
    })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]

    const context = {
      from,
      next,
      router,
      to
    }

    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({
      ...context,
      next: nextMiddleware
    })
  }

  return next()
})

export default router
