import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import linksCtrl from '../controllers/linksCtrl'

const router = Router({
  prefix: '/api'
})

router.get('/', indexCtrl)

router.get('/getNiceLinks', linksCtrl.getNiceLinks)

router.post('/addNiceLinks', linksCtrl.addNiceLinks)

export default router
