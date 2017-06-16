let {Links, Actions} = require('./../models/index')
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
    return await Links.find(params).sort(sortParam).limit(limitNumber).skip(skipNumber).exec().then(result => {
      $util.sendSuccess(ctx, result)
    })
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Opps, Something Error :' + error
  }
}

const addNiceLinks = async (ctx, next) => {
  let options = ctx.request.body
  try {
    return await Links.create(options).then(async (result) => {
      await Actions.create({'link_id': result._id}).then(res => {
        $util.sendSuccess(ctx, result)
      })
    })
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Opps, Something Error :' + error
  }
}

const dispatchAction = async (ctx, next) => {
  let options = ctx.request.body
  if (!$util.verifyFingerprintEffective(options.fingerprint)) {
    ctx.status = 428
    ctx.body = {
      sussess: false,
      messages: '经验证，所传递的浏览器指纹不合法'
    }
    return
  }
  try {
    let linkSeting = {}
    let actionsSetting = {}
    let count = 0

    await Actions.findOne({'link_id': options._id}).then(result => {
      let actionTarget = options.action + '_list'
      let actionArr = result[actionTarget] || {}
  
      if (actionArr[options.fingerprint]) {
        actionArr[options.fingerprint] = null
        delete actionArr[options.fingerprint]
      } else {
        actionArr[options.fingerprint] = true
      }

      count = _.size(actionArr)
      linkSeting[options.action] = count
      actionsSetting[actionTarget] = actionArr
    })

    // update Links action record(likes or dislikes)
    await Links.update({'_id': options._id}, {$set: linkSeting})

    await Actions.update({'link_id': options._id}, {$set: actionsSetting}).then(result => {
      $util.sendSuccess(ctx, {count: count})
    })
  } catch (error) {
    console.log('Something has gone wrong, Error messages are as follows: '.red)
    ctx.body = {
      sussess: false,
      messages: 'Opps, Something Error :' + error
    }
  }
}

module.exports =  {
  getNiceLinks,
  addNiceLinks,
  dispatchAction
}
