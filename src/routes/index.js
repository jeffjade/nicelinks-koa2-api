let Router = require('koa-router')
let linksCtrl = require('../controllers/linksCtrl')
let AuthController = require('../controllers/authCtrl')
let fs = require("fs")
let {join} = require("path")

const router = Router({
    prefix: '/api'
})

// api cors
router.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
})

// api options method
router.options('*', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.status = 200
  await next()
})

router.get('/index', async (ctx, next) => {
  let indexPage = join(__dirname, '../../public/index.html')
  let content = await fs.readFileSync(indexPage, 'utf-8')
  ctx.body = content
})

router.get('/login', ctx => {
  ctx.redirect('/login/')
})

router.get('/getNiceLinks', linksCtrl.getNiceLinks)

router.post('/addNiceLinks', linksCtrl.addNiceLinks)

router.post('/dispatchAction', linksCtrl.dispatchAction)

router.get('/getMyPublish', linksCtrl.getMyPublish)

// *********************Login Auth Register********************** Strat//
const authRoutes = Router()

// api cors
authRoutes.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
})

// api options method
authRoutes.options('*', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.status = 200
  await next()
})

// Registration route
authRoutes.post('/checkIsExisted', AuthController.checkIsExisted)

authRoutes.post('/signup', AuthController.signup)

// Login router
router.post('/login', AuthController.login)

// logout router
authRoutes.post('/logout', AuthController.logout)

// logoff router
authRoutes.post('/logoff', AuthController.logoff)

authRoutes.post('/active', AuthController.active)

authRoutes.post('/requestResetPwd', AuthController.requestResetPwd)

authRoutes.post('/setProfile', AuthController.setProfile)

authRoutes.get('/getProfile', AuthController.getProfile)

// router.use('/auth', authRoutes.routes())

module.exports = router