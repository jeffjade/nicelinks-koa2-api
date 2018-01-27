let { Adverts } = require('./../models/index')
const $util = require('../helper/util')

exports.getSysConf = async (ctx, next) => {
  try {
    let advertsList = await Adverts.find({active: true})
    let result = {
      advertsList: advertsList
    }
    $util.sendSuccess(ctx, result)
  } catch (error) {
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.getAdverts = async(ctx, next) => {
  try {
    await Adverts.find().exec().then(async(result) => {
      $util.sendSuccess(ctx, result)
    })
  }  catch (error) {
      $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.updateAdverts = async(ctx, next) => {
  const requestBody = ctx.request.body
  let isUpdate = !!requestBody._id
  try {
    if (isUpdate) {
      let adsSetting = {
        path: requestBody.path,
        image: requestBody.image,
        alt: requestBody.alt,
        active: requestBody.active,
        sort: requestBody.sort,
        modifyTime: Date.now()
      }
      await Adverts.update({ '_id': requestBody._id }, { $set: adsSetting }).then(result => {
          $util.sendSuccess(ctx, result)
      })
    } else {
      await Adverts.create(requestBody).then(result => {
          $util.sendSuccess(ctx, result)
      })
    }
  }  catch (error) {
      $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.removeAdverts = async(ctx, next) => {
  const requestBody = ctx.request.body
  try {
    await Adverts.remove({ '_id': requestBody._id }).then(result => {
        $util.sendSuccess(ctx, result)
    })
  }  catch (error) {
      $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}