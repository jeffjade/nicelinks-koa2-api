import Models from './../models/index'
import $util from './../helper/util'
import Field from './../config/field'

const getNiceLinks = async (ctx, next) => {
  let options = $util.getQueryObject(ctx.request.url)
  return await Models.Links.find(options).exec().then(result => {
    ctx.body = result
  })
}

const addNiceLinks = async (ctx, next) => {
  let options = ctx.request.body
  try {
    return await Models.Links.create(options).then((result) => {
      ctx.status = 200
      ctx.body = {}
    })
  } catch (error) {
    console.log('Something has gone wrong, Error messages are as follows: '.red)
    console.log(error)
    ctx.status = 500
    ctx.body = 'Opps, Something Error :' + error
  }
}

const dispatchAction = async (ctx, next) => {
  let options = ctx.request.body
  console.log(options)
  try {
    return await Models.Links.findOne({'_id': options._id}).then((result) => {
      console.log(result)
      let likeIpArr = result.like_ip_arr
      likeIpArr[options.fingerprint] = !likeIpArr[options.fingerprint]

      let likeNum = 0
      for (let index in likeIpArr) {
        likeNum = likeIpArr[index] ? likeNum + 1 : likeNum
      }

      return Models.Links.update({'_id': options._id}, {$set: {'like_ip_arr': likeIpArr, 'like': likeNum}}).then(result => {
        ctx.status = 200
        ctx.body = {
          likeNum: likeNum
        }
      })
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
  addNiceLinks,
  dispatchAction
}
