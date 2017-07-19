let { Links, Actions } = require('./../models/index')
let $util = require('./../helper/util')
let _ = require('lodash')

const assemblyResultWithAction = (source, target, key) => {
    let result = source.map(item => {
        for (let i in target) {
            let tItem = target[i]
            if ((item._id).toString() === (tItem.link_id).toString()) {
                item.isLikes = tItem.likes_list && !!tItem.likes_list[key] || false
                item.isDislikes = tItem.dislikes_list && !!tItem.dislikes_list[key] || false
                console.log(item)
            }
        }
        return item
    })
    return result
}

const getNiceLinks = async(ctx, next) => {
    let options = $util.getQueryObject(ctx.request.url)
    let params = {}
    let sortParam = {}

    options.classify ? params.classify = options.classify : ''
    options.sortTarget ? sortParam[options.sortTarget] = options.sortType : ''

    let limitNumber = parseInt(options.pageSize)
    let skipNumber = (parseInt(options.pageCount) - 1) * limitNumber
    try {
        return await Links.find(params)
            .sort(sortParam)
            .limit(limitNumber)
            .skip(skipNumber)
            .exec()
            .then(async(result) => {
                if (options.userId) {
                    let idArr = result.map(item => {
                        return item._id
                    })
                    await Actions.find({ link_id: { $in: idArr } }).then(actionResult => {
                        $util.sendSuccess(ctx, assemblyResultWithAction(_.cloneDeep(result), actionResult, options.userId))
                    })
                } else {
                    $util.sendSuccess(ctx, result)
                }
            })
    } catch (error) {
        ctx.status = 500
        ctx.body = 'Opps, Something Error :' + error
    }
}

const addNiceLinks = async(ctx, next) => {
    let options = ctx.request.body
    try {
        return await Links.create(options).then(async(result) => {
            let params = {
                link_id: result._id
            }
            await Actions.create(params).then(res => {
                $util.sendSuccess(ctx, result)
            })
        })
    } catch (error) {
        ctx.status = 500
        ctx.body = 'Opps, Something Error :' + error
    }
}

const dispatchAction = async(ctx, next) => {
    let options = ctx.request.body
    if (!$util.verifyUserIdEffective(options.userId)) {
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

        await Actions.findOne({ 'link_id': options._id }).then(result => {
            let actionTarget = options.action + '_list'
            let actionArr = result[actionTarget] || {}

            if (actionArr[options.userId]) {
                actionArr[options.userId] = null
                delete actionArr[options.userId]
            } else {
                actionArr[options.userId] = true
            }

            count = _.size(actionArr)
            linkSeting[options.action] = count
            actionsSetting[actionTarget] = actionArr
        })

        // update Links action record(likes or dislikes)
        await Links.update({ '_id': options._id }, { $set: linkSeting })

        await Actions.update({ 'link_id': options._id }, { $set: actionsSetting }).then(result => {
            $util.sendSuccess(ctx, { count: count })
        })
    } catch (error) {
        console.log('Something has gone wrong, Error messages are as follows: '.red)
        ctx.body = {
            sussess: false,
            messages: 'Opps, Something Error :' + error
        }
    }
}

const getMyPublish = async(ctx, next) => {
    let options = ctx.request.query
    try {
        return await Links.find({ 'userId': options.userId }).then(result => {
            $util.sendSuccess(ctx, result)
        })
    } catch (error) {
        ctx.status = 500
        ctx.body = 'Opps, Something Error :' + error
    }
}

module.exports = {
    getNiceLinks,
    addNiceLinks,
    dispatchAction,
    getMyPublish
}