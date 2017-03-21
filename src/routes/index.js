import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import blogCtrl from '../controllers/blogCtrl'

const router = Router({
  prefix: '/api'
})

router.get('/', indexCtrl)

router.get('/getNiceBlog', blogCtrl.getNiceBlog)

router.post('/addNewBlog', blogCtrl.addNewBlog)

export default router
