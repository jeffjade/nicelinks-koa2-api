import Router from 'koa-router'
// import passport from 'koa-passport'

import indexCtrl from '../controllers/indexCtrl'
import linksCtrl from '../controllers/linksCtrl'

import AuthController from '../controllers/authCtrl'
import passport from '../config/passport'

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })

const requireLogin = (ctx, next) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.cookies.set('NiceLinksLoginCookie', true, {
        maxAge: 15 * 60 * 1000,
        httpOnly: false
      })
      ctx.status = 200
      ctx.body = {
        role: user.role,
        _id: user._id
      }
      return ctx.login(user)
    } else {
      ctx.status = 422
      ctx.body = info
    }
  })(ctx, next)
}

const requireLogout = (ctx, next) => {
  ctx.cookies.set('NiceLinksLoginCookie', false)
  ctx.logout()
  ctx.status = 200
  ctx.body = {
    message: 'logout successfully'
  }
}

const router = Router({
  prefix: '/api'
})

router.get('/', indexCtrl)

router.get('/getNiceLinks', linksCtrl.getNiceLinks)

router.post('/addNiceLinks', linksCtrl.addNiceLinks)

router.post('/dispatchAction', linksCtrl.dispatchAction)

// *********************Login Auth Register********************** Strat//
const authRoutes = Router()

// Registration route
authRoutes.post('/signup', AuthController.register)

// Login router
authRoutes.post('/login', requireLogin)

// login logout
authRoutes.post('/logout', requireLogout)

router.use('/auth', authRoutes.routes())
// *********************Login Auth Register********************** Strat//

export default router
