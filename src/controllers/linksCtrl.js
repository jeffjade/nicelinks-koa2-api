let { Links, Actions } = require('./../models/index')
let $util = require('./../helper/util')
let sendMail = require('../helper/nodemailer')
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
		item.isDislikes = aItem.dislikes_list && aItem.dislikes_list[key] || false
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

const getNiceLinks = async (ctx, next) => {
	let options = $util.getQueryObject(ctx.request.url)
	// 默认只拉去已经审核通过的链接;
	let params = { active: true }
	let sortParam = {}

	options.classify ? params.classify = options.classify : ''
	options._id ? params._id = options._id : ''
	options.sortTarget ? sortParam[options.sortTarget] = options.sortType : ''
	options.theme ? params.theme = options.theme : ''

	let limitNumber = parseInt(options.pageSize)
	let skipNumber = (parseInt(options.pageCount) - 1) * limitNumber
	try {
		return await Links.find(params)
			.sort(sortParam)
			.limit(limitNumber)
			.skip(skipNumber)
			.exec().then(async (result) => {
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

const getLinksByTag = async (ctx, next) => {
	let options = ctx.request.query
	let sortParam = {}
	options.sortTarget ? sortParam[options.sortTarget] = options.sortType : ''
	let limitNumber = parseInt(options.pageSize)
	let skipNumber = (parseInt(options.pageCount) - 1) * limitNumber
	let params = {
		tags: options.tags,
		active: true
	}
	try {
		return await Links.find(params)
			.sort(sortParam)
			.limit(limitNumber)
			.skip(skipNumber)
			.exec().then(async (result) => {
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

const addNiceLinks = async (ctx, next) => {
	let options = ctx.request.body
	if (options.role === 'Admin') {
		options.active = await $util.checkRoleByUserId(options.userId, 'Admin')
	}
	try {
		return await Links.create(options).then(async (result) => {
			let params = {
				link_id: result._id
			}
			await Actions.create(params).then(res => {
				$util.sendSuccess(ctx, result)
			})
		})
	} catch (error) {
		if (error.code === 11000) {
			return $util.sendFailure(ctx, 'linkHaveBeenAdded')
		}
		$util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
	}
}

const updateNiceLinks = async (ctx, next) => {
	let options = ctx.request.body
	if (options.managerRole === 'Admin') {
		let checkAdmin = await $util.checkRoleByUserId(options.managerId, 'Admin')
		if (!checkAdmin) return
	} else {
		return $util.sendFailure(ctx, null, 'Opps, You do not have permission to control')
	}
	try {
		const user = await $util.findUser({ username: options.createdBy })
		if (options.active && user && user.role !== 'Admin') {
			let linkInUs = `https://nicelinks.site/post/${options._id}`
			sendMail({ to: user.email, type: 'notice', link: linkInUs })
		}
		return await Links.update({ '_id': options._id }, { $set: options }).then(async (result) => {
			$util.sendSuccess(ctx, result)
		})
	} catch (error) {
		$util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
	}
}

const deleteNiceLinks = async (ctx, next) => {
	let options = ctx.request.body
	let isAdmin = await $util.checkRoleByUserId(options.operatorId, 'Admin')
	if (!isAdmin) {
		return $util.sendFailure(ctx, null, 'Opps, You do not have permission to control')
	}
	try {
		return await Links.remove({ '_id': options._id }).then(async (result) => {
			$util.sendSuccess(ctx, result)
		})
	} catch (error) {
		$util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
	}
}

const dispatchAction = async (ctx, next) => {
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

const getAllTags = async (ctx, next) => {
	try {
		return await Links.find({active: true}).limit(1000).exec().then(async (result) => {
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

const getAllLinks = async (ctx, next) => {
	let options = ctx.request.query
	// 默认只拉去已经审核通过的链接;
	let params = { active: options.active }
	let sortParam = {}
	options.sortTarget ? sortParam[options.sortTarget] = options.sortType : ''

	let limitNumber = parseInt(options.pageSize)
	let skipNumber = (parseInt(options.pageCount) - 1) * limitNumber
	try {
		return await Links.find(params)
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

const getAllLinksCount = async (ctx, next) => {
	try {
		let options = ctx.request.query
		// 默认只拉去已经审核通过的链接;
		let params = { active: options.active }
		let count = await Links.find(params).count()
		$util.sendSuccess(ctx, count)
	} catch (error) {
		$util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
	}
}

const getMyPublish = async (ctx, next) => {
	let options = ctx.request.query
	let beVisitedUserId = await $util.findUserIdByUsername(options.username)
	try {
		return await Links.find({ 'userId': beVisitedUserId }).then(async (result) => {
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

const getMyLikes = async (ctx, next) => {
	let options = ctx.request.query
	let beVisitedUserId = await $util.findUserIdByUsername(options.username)
	let isVisitSelf = options.userId && options.userId === beVisitedUserId

	try {
		let allActiveLinks = await getAllActiveLinks()
		let idArr = allActiveLinks.map(item => {
			return item._id
		})
		await Actions.find({ link_id: { $in: idArr } }).then(actionResult => {
			let allLinks = assemblyResultWithAction(_.cloneDeep(allActiveLinks), actionResult, beVisitedUserId)
			let myLikeLinks = allLinks.filter(element => {
				return !!element.isLikes
			})
			// 如不是用户访问自己主页，则用自己 id 须再一次对结果检验，以得出用户自己是否对其也点赞了@09-23。
			if (!isVisitSelf) {
				myLikeLinks = assemblyResultWithAction(_.cloneDeep(myLikeLinks), actionResult, options.userId)
			}
			return $util.sendSuccess(ctx, myLikeLinks)
		})
	} catch (error) {
		$util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
	}
}

const getMyDislikes = async (ctx, next) => {
	let options = ctx.request.query
	let beVisitedUserId = await $util.findUserIdByUsername(options.username)
	let isVisitSelf = options.userId && options.userId === beVisitedUserId

	try {
		let allActiveLinks = await getAllActiveLinks()
		let idArr = allActiveLinks.map(item => {
			return item._id
		})
		await Actions.find({ link_id: { $in: idArr } }).then(actionResult => {
			let allLinks = assemblyResultWithAction(_.cloneDeep(allActiveLinks), actionResult, beVisitedUserId)
			let myDislikeLinks = allLinks.filter(element => {
				return !!element.isDislikes
			})

			// 如不是用户访问自己主页，则用自己 id 须再一次对结果检验，以得出用户自己是否对其也狂踩了@09-24。
			if (!isVisitSelf) {
				myDislikeLinks = assemblyResultWithAction(_.cloneDeep(myDislikeLinks), actionResult, options.userId)
			}
			return $util.sendSuccess(ctx, myDislikeLinks)
		})
	} catch (error) {
		$util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
	}
}

function assemblyNewResult (source, result, stype = 'title') {
	source.forEach(item => {
		if (!result[item._id]) {
			result[item._id] = Object.assign({}, item._doc)
			result[item._id]['stype'] = stype
		}
	})
}

const searchNiceLinks = async (ctx, next) => {
	let options = ctx.request.query
	const limitNumber = 100
	try {
		const titleList = await Links.find({
				title: { $regex: options.keyword },
				active: true
			}).limit(limitNumber)
		const descList = await Links.find({
				desc: { $regex: options.keyword },
				active: true
			}).limit(limitNumber)
		const keywordsList = await Links.find({
				keywords: { $regex: options.keyword },
				active: true
			}).limit(limitNumber)
		const reviewList = await Links.find({
				review: { $regex: options.keyword },
				active: true
			}).limit(limitNumber)
		let objArray = []
		assemblyNewResult(titleList, objArray, 'title')
		assemblyNewResult(descList, objArray, 'desc')
		assemblyNewResult(keywordsList, objArray, 'keywords')
		assemblyNewResult(reviewList, objArray, 'review')
		let searchResult = []
		for (let key in objArray) {
			searchResult.push(objArray[key])
		}
		return $util.sendSuccess(ctx, searchResult)
	} catch (error) {
		$util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
	}
}

const getRandomLinks = async (ctx, next) => {
  try {
    const options = ctx.request.query
    return await Links.aggregate([
      { $sample: { size: +options.size || 10 } }
    ]).then(async result => {
      $util.sendSuccess(ctx, result)
    })
  } catch (error) {
    return $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

module.exports = {
	getNiceLinks,
	getLinksByTag,
	getAllTags,
	getAllLinks,
	getAllLinksCount,
	addNiceLinks,
	updateNiceLinks,
	deleteNiceLinks,
	dispatchAction,
	getMyPublish,
	getMyLikes,
	getMyDislikes,
	searchNiceLinks,
	getRandomLinks
}