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

router.get('/getMyPublish', linksCtrl.getMyPublish)

// *********************Login Auth Register********************** Strat//
const authRoutes = Router()

// Registration route
authRoutes.post('/checkIsExisted', AuthController.checkIsExisted)

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

authRoutes.get('/getProfile', AuthController.getProfile)

router.use('/auth', authRoutes.routes())

// api cors
router.use(async(ctx, next) => {
    ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set('Access-Control-Allow-Origin', ctx.get('origin') || '*')
    await next()
})

// api options method
router.options('*', async(ctx, next) => {
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    ctx.set('Access-Control-Allow-Origin', ctx.get('origin') || '*')
    ctx.status = 204
    await next()
})

module.exports = router