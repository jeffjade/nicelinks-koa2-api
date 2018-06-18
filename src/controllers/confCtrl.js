const { Adverts, Sentences } = require('./../models/index')
const $util = require('../helper/util')

exports.getSysConf = async (ctx, next) => {
  try {
    const advertsList = await Adverts.find({ active: true })
    const sentence = await Sentences.aggregate([
      { $match: { active: true } },
      { $sample: { size: 1 } }
    ])
    const result = {
      sentence: sentence[0],
      advertsList: advertsList
    }
    $util.sendSuccess(ctx, result)
  } catch (error) {
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

/* --------------------Adverts-------------------- */
exports.getAdverts = async (ctx, next) => {
  try {
    await Adverts.find().exec().then(async (result) => {
      $util.sendSuccess(ctx, result)
    })
  } catch (error) {
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.updateAdverts = async (ctx, next) => {
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
  } catch (error) {
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.removeAdverts = async (ctx, next) => {
  const requestBody = ctx.request.body
  try {
    await Adverts.remove({ '_id': requestBody._id }).then(result => {
      $util.sendSuccess(ctx, result)
    })
  } catch (error) {
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

/* --------------------Sentences-------------------- */
exports.getSentences = async (ctx, next) => {
  try {
    const options = ctx.request.query
    let sortParam = {}
    options.sortTarget ? sortParam[options.sortTarget] = options.sortType : ''
    let limitNumber = parseInt(options.pageSize)
    let skipNumber = (parseInt(options.pageCount) - 1) * limitNumber
    let params = {
        active: options.active
    }
    await Sentences.find(params)
      .sort(sortParam)
      .limit(limitNumber)
      .skip(skipNumber)
      .exec().then(async (result) => {
        $util.sendSuccess(ctx, result)
    })
  } catch (error) {
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.updateSentences = async (ctx, next) => {
  const requestBody = ctx.request.body
  let isUpdate = !!requestBody._id
  try {
    let sentencesSetting = {
      content: requestBody.content,
      type: requestBody.type,
      active: requestBody.active,
      createdBy: requestBody.createdBy
    }
    if (isUpdate) {
      sentencesSetting.modifyTime = Date.now()
      await Sentences.update({ '_id': requestBody._id }, { $set: sentencesSetting }).then(result => {
        $util.sendSuccess(ctx, result)
      })
    } else {
      await Sentences.create(sentencesSetting).then(result => {
        $util.sendSuccess(ctx, result)
      })
    }
  } catch (error) {
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.removeSentences = async (ctx, next) => {
  const requestBody = ctx.request.body
  try {
    await Sentences.remove({ '_id': requestBody._id }).then(result => {
      $util.sendSuccess(ctx, result)
    })
  } catch (error) {
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.getRandomSentence = async (ctx, next) => {
  try {
    return await Sentences.aggregate([
      { $match: { active: true } },
      { $sample: { size: 1 } }
    ]).then(async (result) => {
      $util.sendSuccess(ctx, result[0])
    })
  } catch (error) {
    return  $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}