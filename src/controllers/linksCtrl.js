import Models from './../models/index'
import $util from './../helper/util'
import Field from './../config/field'

const getNiceLinks = async (ctx, next) => {
  let options = $util.getQueryObject(ctx.request.url)
  let params = {
    classify: options.classify
  }
  let sortParam = {}
  options.sortTarget ? sortParam[options.sortTarget] = options.sortType : ''

  console.log(sortParam)
  let limitNumber = parseInt(options.pageSize)
  let skipNumber = (parseInt(options.pageCount) - 1) * limitNumber
  return await Models.Links.find(params).sort(sortParam).limit(limitNumber).skip(skipNumber).exec().then(result => {
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
  try {
    return await Models.Links.findOne({'_id': options._id}).then((result) => {
      let actionTarget = options.action
      let actionArrTarget = actionTarget + '_arr'

      let actionArr = result[actionArrTarget]
      actionArr[options.fingerprint] = !actionArr[options.fingerprint]
      
      let count = 0
      for (let index in actionArr) {
        count = actionArr[index] ? count + 1 : count
      }

      let setting = {}
      setting[actionTarget] = count
      setting[actionArrTarget] = actionArr

      return Models.Links.update({'_id': options._id}, {$set: setting}).then(result => {
        ctx.status = 200
        ctx.body = {
          count: count
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
