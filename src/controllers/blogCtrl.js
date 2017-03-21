import Models from './../models/index'
import $util from './../helper/util'
import Field from './../config/field'

const getNiceBlog = async (ctx, next) => {
  return await Models.Blog.find().exec().then(result => {
    ctx.body = result
  })
}

const addNewBlog = async (ctx, next) => {
  let params = $util.query(ctx.request.url)
  // let options = ctx.request.body

  console.log(options)
  try {
    return await Models.Blog.create(options).then((result) => {
      ctx.status = 200
      ctx.body = `Nice, Okay`
    })
  } catch (error) {
    console.log('Something has gone wrong, Error messages are as follows: '.red)
    console.log(error)
    ctx.status = 500
    ctx.body = 'Something Error :' + error
  }
}

export default {
  getNiceBlog,
  addNewBlog
}
