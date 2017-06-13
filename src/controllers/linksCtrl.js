let Models = require('./../models/index')
let $util = require('./../helper/util')
let _ = require('lodash')

const getNiceLinks = async (ctx, next) => {
  let options = $util.getQueryObject(ctx.request.url)
  let params = {}
  let sortParam = {}

  options.classify ? params.classify = options.classify : ''
  options.sortTarget ? sortParam[options.sortTarget] = options.sortType : ''

  let limitNumber = parseInt(options.pageSize)
  let skipNumber = (parseInt(options.pageCount) - 1) * limitNumber
  try {
    return await Models.Links.find(params).sort(sortParam).limit(limitNumber).skip(skipNumber).exec().then(result => {
      console.log(result)
      ctx.body = result
    })
  } catch (error) {
    console.log(error)
    ctx.status = 500
    ctx.body = 'Opps, Something Error :' + error
  }
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
    let setting = {}
    let count = 0
    await Models.Links.findOne({'_id': options._id}).then((result) => {
      let actionTarget = options.action + '_list'
      let actionArr = result[actionTarget] || {}
  
      if (actionArr[options.fingerprint]) {
        actionArr[options.fingerprint] = null
        delete actionArr[options.fingerprint]
      } else {
        actionArr[options.fingerprint] = true
      }

      count = _.size(actionArr)
      setting[options.action] = count
      setting[actionTarget] = actionArr
    })

    return Models.Links.update({'_id': options._id}, {$set: setting}).then(result => {
      console.log('result')
      console.log(result)
      ctx.status = 200
      ctx.body = {
        sussess: true,
        count: count
      }
    })
  } catch (error) {
    console.log('Something has gone wrong, Error messages are as follows: '.red)
    console.log(error)
    ctx.status = 500
    ctx.body = 'Opps, Something Error :' + error
  }
}

module.exports =  {
  getNiceLinks,
  addNiceLinks,
  dispatchAction
}
