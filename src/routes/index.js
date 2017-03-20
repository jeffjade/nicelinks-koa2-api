import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import blogCtrl from '../controllers/blogCtrl'

const router = Router({
  prefix: '/api'
})

router.get('/', indexCtrl)

router.get('/getNiceBlog', blogCtrl.getNiceBlog)

// let options = {
//   url_path: 'http://jeffjade.com',
//   title: '晚晴幽草轩',
//   desc: '效率至上，經世济用',
//   tags: '前端',
//   like: 2
// }

router.post('/addNewBlog', blogCtrl.addNewBlog)

export default router
