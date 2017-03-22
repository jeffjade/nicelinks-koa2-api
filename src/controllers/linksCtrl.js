import Models from './../models/index'
import $util from './../helper/util'
import Field from './../config/field'

const getNiceLinks = async (ctx, next) => {
  return await Models.Links.find().exec().then(result => {
    ctx.body = result
  })
}

const addNiceLinks = async (ctx, next) => {
  let options = ctx.request.body
  try {
    return await Models.Links.create(options).then((result) => {
      ctx.status = 200
      ctx.body = `Nice, Okay`
    })
  } catch (error) {
    console.log('Something has gone wrong, Error messages are as follows: '.red)
    console.log(error)
    ctx.status = 500
    ctx.body = 'Opps, Something Error :' + error
  }
}

export default {
  getNiceLinks,
  addNiceLinks
}
