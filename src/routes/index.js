import Router from 'koa-router'
import passport from 'passport'

import AuthController from '../controllers/authCtrl'
import indexCtrl from '../controllers/indexCtrl'
import linksCtrl from '../controllers/linksCtrl'

import passportService from '../config/passport'

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

const router = Router({
  prefix: '/api'
})

// *********************Login Auth Register********************** Strat//
// const authRoutes = Router()
// Registration route
router.post('/register', AuthController.register)

// Login router
router.post('/login', requireLogin, AuthController.login)

// router.use('/auth', authRoutes)
// *********************Login Auth Register********************** Strat//

router.get('/', indexCtrl)

router.get('/getNiceLinks', linksCtrl.getNiceLinks)

router.post('/addNiceLinks', linksCtrl.addNiceLinks)

router.post('/dispatchAction', linksCtrl.dispatchAction)

export default router
