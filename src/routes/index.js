let Router = require('koa-router')
let linksCtrl = require('../controllers/linksCtrl')
let AuthController = require('../controllers/authCtrl')
let HelpController = require('../controllers/helpCtrl')
let fs = require("fs")
let {join} = require("path")

const router = Router({
    prefix: '/api'
})

// api cors
router.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  ctx.set('Access-Control-Allow-Origin', '*')
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

router.get('/getNiceLinks', linksCtrl.getNiceLinks)

router.get('/getLinksByTag', linksCtrl.getLinksByTag)

router.post('/addNiceLinks', linksCtrl.addNiceLinks)

router.post('/dispatchAction', linksCtrl.dispatchAction)

router.get('/getMyPublish', linksCtrl.getMyPublish)

// *********************Login Auth Register********************** Strat//

// Registration route
router.post('/checkIsExisted', AuthController.checkIsExisted)

router.post('/signup', AuthController.signup)

// Login router
router.post('/login', AuthController.login)

// logout router
router.post('/logout', AuthController.logout)

// logoff router
router.post('/logoff', AuthController.logoff)

router.post('/active', AuthController.active)

router.post('/requestResetPwd', AuthController.requestResetPwd)

router.post('/setProfile', AuthController.setProfile)

router.get('/getProfile', AuthController.getProfile)

// router.use('/auth', authRoutes.routes())

router.get('/crawlLinksInfo', HelpController.crawlLinksInfo)

module.exports = router