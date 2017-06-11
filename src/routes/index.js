let Router = require('koa-router')

let indexCtrl = require('../controllers/indexCtrl')
let linksCtrl = require('../controllers/linksCtrl')

let AuthController = require('../controllers/authCtrl')

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
authRoutes.post('/login', AuthController.login)

// logout router
authRoutes.post('/logout', AuthController.logout)

// logoff router
authRoutes.post('/logoff', AuthController.logoff)

authRoutes.post('/active', AuthController.active)

authRoutes.post('/requestResetPwd', AuthController.requestResetPwd)

authRoutes.post('/setProfile', AuthController.setProfile)

authRoutes.post('/getProfile', AuthController.getProfile)

router.use('/auth', authRoutes.routes())
// *********************Login Auth Register********************** Strat//

module.exports = router
