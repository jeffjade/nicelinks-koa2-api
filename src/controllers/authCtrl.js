const jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    UserModel = require('../models/userModel'),
    config = require('../config/main'),
    passport = require('../config/passport'),
    sendMail = require('../helper/nodemailer'),
    $util = require('../helper/util')

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })

function generateToken(info) {
    return jwt.sign(info, config.secret, {
        expiresIn: 80 // in seconds
    })
}

const logoffUserById = (id) => {
    return new Promise((resolve, reject) => {
        UserModel.findOneAndRemove({ _id: id }, err => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

const setTokenAndSendMail = async (user, ctx) => {
    // 保证激活码不会重复
    let buf = crypto.randomBytes(20)
    user.activeToken = user._id + buf.toString('hex')
    user.activeExpires = Date.now() + 24 * 3600 * 1000
    let link = `${config.clientPath}/account?activeToken=` + user.activeToken

    // 发送激活邮件
    sendMail({ to: user.email, type: 'active', link: link })

    try {
        await new Promise((resolve, reject) => {
            user.save((err) => {
                if (err) { reject(err) }
                resolve()
            })
        })
        $util.sendSuccessWithMsg(ctx, 'sendEmailSuccess', user.email)
    } catch (err) {
        throw err
    }
}

// ========================================
// Login Route
// ========================================
exports.checkIsExisted = async(ctx, next) => {
    const requestBody = ctx.request.body
    const username = requestBody.username
    const foundUser = await $util.findUser({ username: username })
    if (foundUser) {
        return $util.sendFailure(ctx, 'nameHadRegistered')
    } else {
        return $util.sendSuccess(ctx, true)
    }
}

exports.login = (ctx, next) => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
            if (!user.active) {
                return $util.sendFailure(ctx, 'accountNoActive')
            }
            ctx.cookies.set('ns-is-login', true, {
                maxAge: 3600000,
                httpOnly: false
            })
            ctx.cookies.set('ns-user-id', user._id, {
                maxAge: 3600000,
                httpOnly: false
            })

            return $util.sendSuccess(ctx, {
                role: user.role,
                _id: user._id,
                username: user.username,
                profile: user.profile
            })
            // return ctx.login(user)
        } else {
            $util.sendFailure(ctx, 'wrongAccountOrPwd')
        }
    })(ctx, next)
}

exports.logout = (ctx, next) => {
    ctx.cookies.set('ns-is-login', false)
    ctx.logout()
    ctx.status = 200
    $util.sendSuccess(ctx, 'logout successfully')
}

exports.logoff = async(ctx) => {
    let id = ctx.request.body.id
    await logoffUserById(id)
    ctx.status = 200
    ctx.body = {
        success: true,
        message: 'Logoff Success'
    }
}

// ========================================
// Registration Route
// ========================================
exports.signup = async(ctx, next) => {
    const requestBody = ctx.request.body
    const email = requestBody.email
    const username = requestBody.username
    const password = requestBody.password

    // Return error if no email provided
    if (!email) { return $util.sendFailure(ctx, 'noUsername') }

    if (!username) { return $util.sendFailure(ctx, 'noUsername') }

    // Return error if no password provided
    if (!password) { return $util.sendFailure(ctx, 'noPassword') }

    const user = await $util.findUser({ email: email })
    if (user) {
        // 如果已经注册但未激活，重新发送激活信息
        if (!user.active) {
            if (new Date(user.activeExpires) >  new Date()) {
                return $util.sendFailure(ctx, 'pleaseActiveMailbox')
            }
            user.username = username
            user.password = password
            return setTokenAndSendMail(user, ctx)
        } else {
            return $util.sendFailure(ctx, 'mailboxHadRegistered')
        }
    } else {
        let user = new UserModel({
            username: username,
            email: email,
            password: password,
            registeTime: new Date(),
            profile: {}
        })
        return setTokenAndSendMail(user, ctx)
    }
}

// ========================================
// Active Account
// ========================================
exports.active = async(ctx, next) => {
    const requestBody = ctx.request.body
    let user = await UserModel.findOne({
        activeToken: requestBody.activeToken,
        // 过期时间 > 当前时间
        activeExpires: { $gt: Date.now() }
    }).exec()
    // 激活码无效
    if (!user) {
        return $util.sendFailure(ctx, 'activeValidationFailed')
    }
    // 激活并保存
    try {
        user.active = true
        user.activeTime = new Date()
        let activatedNum = await UserModel.findOne({active: true}).count()
        user.number = activatedNum + 1
        await new Promise((resolve, reject) => {
            user.save((err) => {
                if (err) { reject(err) }
                resolve()
            })
        })
        $util.sendSuccess(ctx, `Successfully Activated`)
    } catch (err) {
        throw err
    }
}

exports.requestResetPwd = async(ctx, next) => {
    const requestBody = ctx.request.body
    let user = await UserModel.findOne({email: requestBody.email}).exec()
    if (!user) {
        return $util.sendFailure(ctx, 'accountNotRegistered')
    }

    let successContent = 'sendEmailSuccess'
    if (!requestBody.resetPasswordToken) {
        let buf = crypto.randomBytes(20)
        user.resetPasswordToken = user._id + buf.toString('hex')
        user.resetPasswordExpires = Date.now() + 24 * 3600 * 1000
        let link = `${config.clientPath}/reset-pwd?email=${user.email}&resetPasswordToken=${user.resetPasswordToken}`
        sendMail({ to: user.email, type: 'reset', link: link })
    } else {
        if (requestBody.resetPasswordToken === user.resetPasswordToken) {
            user.password = requestBody.password
            successContent = `resetPwdSuccess`
        } else {
            return $util.sendFailure(ctx, 'tokenValidationFailed')
        }
    }

    try {
        await new Promise((resolve, reject) => {
            user.save((err) => {
                if (err) { reject(err) }
                resolve()
            })
        })
        return $util.sendSuccessWithMsg(ctx, successContent, user.email)
    } catch (err) {
        throw err
    }
}

exports.setProfile = async(ctx, next) => {
    const requestBody = ctx.request.body
    let user = await $util.findUser({ _id: requestBody._id })
    if (!user) {
        return $util.sendFailure(ctx, 'accountNotRegistered')
    } else {
        let profileList = requestBody.profile
        for (let key in profileList) {
            user.profile[key] = profileList[key] ||  ''
        }
        if (!user.username) { user.username = requestBody.username }
        await new Promise((resolve, reject) => {
            user.save((err) => {
                if (err) { reject(err) }
                resolve()
            })
        })
        $util.sendSuccess(ctx, 'Nice, Set Successfully')
    }
}

exports.getProfile = async (ctx, next) => {
    const requestBody = ctx.request.query
    let user = await $util.findUser({ _id: requestBody._id })
    if (!user) {
        return $util.sendFailure(ctx, 'accountNotRegistered')
    } else {
        return $util.sendSuccess(ctx, {
            username: user.username,
            profile: user.profile,
            email: user.email,
            role: user.role,
            _id: user._id
        })
    }
}

exports.getUserInfo = async (ctx, next) => {
    const requestBody = ctx.request.query
    let user = await $util.findUser({ username: requestBody.username })
    if (!user) {
        return $util.sendFailure(ctx, 'accountNotRegistered')
    } else {
        console.log(user)
        return $util.sendSuccess(ctx, {
            username: user.username,
            profile: user.profile,
            number: user.number,
            activeTime: user.activeTime,
            createdAt: user.createdAt,
            _id: user._id
        })
    }
}

exports.updateAvatar = async(ctx, next) => {
    const request = ctx.request
    let user = await $util.findUser({username: request.header.username})
    if (!user) {
        return $util.sendFailure(ctx, 'accountNotRegistered')
    } else {
        try{
            const avatarPath =  await $util.saveAvatarAndGetPath(ctx.response.req, request.header.imgname)
            user.profile.avatar = avatarPath
            await new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) { reject(err) }
                    resolve()
                })
            })
            return $util.sendSuccess(ctx, {
                message: '成功更新头像',
                path: avatarPath
            })
        } catch (err){
            console.log('上传图片失败', err)
            return $util.sendFailure(ctx, 'uploadAbatarFail')
		}
    }
}

exports.getAllUsers = async(ctx, next) => {
    let options = ctx.request.query
    let params = {active: options.active}
    let sortParam = {}
    options.sortTarget ? sortParam[options.sortTarget] = options.sortType : ''

    let limitNumber = parseInt(options.pageSize)
    let skipNumber = (parseInt(options.pageCount) - 1) * limitNumber
    try {

        let count = await UserModel.find({active: options.active}).count()
        return await UserModel.find(params)
            .sort(sortParam)
            .limit(limitNumber)
            .skip(skipNumber)
            .exec().then(async(result) => {
                $util.sendSuccess(ctx, {
                    data: result,
                    count: count
                })
            })
    } catch (error) {
        $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
    }
}