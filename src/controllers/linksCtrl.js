let { Links, Actions } = require('./../models/index')
let $util = require('./../helper/util')
let _ = require('lodash')

const getActionListByLinkId = (actionList, linkId) => {
    // only one result for action-list with  LinkID(So, Get 0)
    return actionList.filter(item => {
        return item.link_id.toString() === linkId
    })[0]
}

const assemblyResultWithAction = (source, target, key) => {
    for (let item of source) {
        let aItem = getActionListByLinkId(target, item._id.toString())
        item.isLikes = aItem.likes_list && aItem.likes_list[key] || false
        item.isDislikes = aItem.dislikes_list && aItem.dislikes_list[key] ||false
    }
    return source
}

const getAllActiveLinks = (params = {}) => {
    return new Promise((resolve, reject) => {
        params.active = true
        Links.find(params).then((result) => {
            return resolve(result)
        })
    })
}

/*------------------------------api---------------------------*/

const getNiceLinks = async(ctx, next) => {
    let options = $util.getQueryObject(ctx.request.url)
    // 默认只拉去已经审核通过的链接;
    let params = {active: true}
    let sortParam = {}

    options.classify ? params.classify = options.classify : ''
    options._id ? params._id = options._id : ''
    options.sortTarget ? sortParam[options.sortTarget] = options.sortType : ''

    let limitNumber = parseInt(options.pageSize)
    let skipNumber = (parseInt(options.pageCount) - 1) * limitNumber
    try {
        return await Links.find(params)
            .sort(sortParam)
            .limit(limitNumber)
            .skip(skipNumber)
            .exec().then(async(result) => {
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
        $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
    }
}

const getLinksByTag = async(ctx, next) => {
    let options = ctx.request.query
    let sortParam = {}
    options.sortTarget ? sortParam[options.sortTarget] = options.sortType : ''
    let limitNumber = parseInt(options.pageSize)
    let skipNumber = (parseInt(options.pageCount) - 1) * limitNumber
    try {
        return await Links.find({'tags':  options.tags})
            .sort(sortParam)
            .limit(limitNumber)
            .skip(skipNumber)
            .exec().then(async(result) => {
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
        $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
    }
}

const addNiceLinks = async(ctx, next) => {
    let options = ctx.request.body
    if (options.role === 'Admin') {
        options.active = await $util.checkRoleByUserId(options.userId, 'Admin')
    }
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
        $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
    }
}

const updateNiceLinks = async(ctx, next) => {
    let options = ctx.request.body
    if (options.role === 'Admin') {
        options.active = await $util.checkRoleByUserId(options.userId, 'Admin')
    } else {
        return $util.sendFailure(ctx, null, 'Opps, You do not have permission to control')
    }
    try {
        return await Links.update({ '_id': options._id }, { $set: options }).then(async(result) => {
            $util.sendSuccess(ctx, result)
        })
    } catch (error) {
        $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
    }
}

const deleteNiceLinks = async(ctx, next) => {
    let options = ctx.request.body
    let isAdmin = await $util.checkRoleByUserId(options.operatorId, 'Admin')
    if (!isAdmin) {
        return $util.sendFailure(ctx, null, 'Opps, You do not have permission to control')
    }
    try {
        return await Links.remove({ '_id': options._id }).then(async(result) => {
            $util.sendSuccess(ctx, result)
        })
    } catch (error) {
        $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
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
        $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
    }
}

const getAllTags = async(ctx, next) => {
    try {
        return await Links.find({}).limit(1000).exec().then(async(result) => {
            let allTagsArr = []
            result.map(item => {
                allTagsArr = allTagsArr.concat(item.tags)
            })
            allTagsArr = [...new Set(allTagsArr)]
            $util.sendSuccess(ctx, allTagsArr)
        })
    } catch (error) {
        $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
    }
}

const getAllLinks = async(ctx, next) => {
    let options = ctx.request.query
    // 默认只拉去已经审核通过的链接;
    let params = {active: options.active}
    let sortParam = {}
    options.sortTarget ? sortParam[options.sortTarget] = options.sortType : ''

    let limitNumber = parseInt(options.pageSize)
    let skipNumber = (parseInt(options.pageCount) - 1) * limitNumber
    try {
        return await Links.find(params)
            .sort(sortParam)
            .limit(limitNumber)
            .skip(skipNumber)
            .exec().then(async(result) => {
                $util.sendSuccess(ctx, result)
            })
    } catch (error) {
        $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
    }
}

const getMyPublish = async(ctx, next) => {
    let options = ctx.request.query
    try {
        return await Links.find({ 'userId': options.userId }).then(async(result) => {
            let idArr = result.map(item => {
                return item._id
            })
            await Actions.find({ link_id: { $in: idArr } }).then(actionResult => {
                $util.sendSuccess(ctx, assemblyResultWithAction(_.cloneDeep(result), actionResult, options.userId))
            })
        })
    } catch (error) {
        $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
    }
}

const getMyLikes = async(ctx, next) => {
    let options = ctx.request.query
    try {
        let allActiveLinks  = await getAllActiveLinks()
        let idArr = allActiveLinks.map(item => {
            return item._id
        })
        await Actions.find({ link_id: { $in: idArr } }).then(actionResult => {
            let allLinks = assemblyResultWithAction(_.cloneDeep(allActiveLinks), actionResult, options.userId)
            let myLikeLinks = allLinks.filter(element => {
                return !!element.isLikes
            })
            return $util.sendSuccess(ctx, myLikeLinks)
        })
    } catch (error) {
        $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
    }
}

const getMyDislikes = async(ctx, next) => {
    let options = ctx.request.query
    try {
        let allActiveLinks  = await getAllActiveLinks()
        let idArr = allActiveLinks.map(item => {
            return item._id
        })
        await Actions.find({ link_id: { $in: idArr } }).then(actionResult => {
            let allLinks = assemblyResultWithAction(_.cloneDeep(allActiveLinks), actionResult, options.userId)
            let myDislikeLinks = allLinks.filter(element => {
                return !!element.isDislikes
            })
            return $util.sendSuccess(ctx, myDislikeLinks)
        })
    } catch (error) {
        $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
    }
}

module.exports = {
    getNiceLinks,
    getLinksByTag,
    getAllTags,
    getAllLinks,
    addNiceLinks,
    updateNiceLinks,
    deleteNiceLinks,
    dispatchAction,
    getMyPublish,
    getMyLikes,
    getMyDislikes
}