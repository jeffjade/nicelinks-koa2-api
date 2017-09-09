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

function sendResponse(ctx, status, body) {
    ctx.status = status
    ctx.body = body
}

const findUser = (params) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne(params, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}

const findAllUsers = () => {
    return new Promise((resolve, reject) => {
        UserModel.find({}, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
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
        $util.sendSuccess(ctx, null, `已发送邮件至 ${user.email} 请在24小时内按照邮件提示激活。`)
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
    const doc = await findUser({ username: username })
    if (doc) {
        return $util.sendFailure(ctx, 'nameHadRegistered')
    } else {
        $util.sendSuccess(ctx, true)
    }
}

exports.login = (ctx, next) => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
            if (!user.active) {
                return $util.sendFailure(ctx, 'accountNoActive')
            }
            ctx.cookies.set('NiceLinksLoginCookie', true, {
                maxAge: 30 * 60 * 1000,
                httpOnly: false
            })
            $util.sendSuccess(ctx, {
                role: user.role,
                _id: user._id,
                username: user.username
            })
            return ctx.login(user)
        } else {
            $util.sendFailure(ctx, 'wrongAccountOrPwd')
        }
    })(ctx, next)
}

exports.logout = (ctx, next) => {
    ctx.cookies.set('NiceLinksLoginCookie', false)
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
    if (!email) {
        return sendResponse(ctx, 420, 'You must enter an email address.')
    }

    if (!username) {
        return sendResponse(ctx, 420, 'You must enter an username.')
    }

    // Return error if no password provided
    if (!password) {
        return sendResponse(ctx, 421, 'You must enter a password.')
    }
    const user = await findUser({ email: email })

    if (user) {
        // 如果已经注册但未激活，重新发送激活信息
        if (!user.active) {
            user.username = username
            user.password = password
            return setTokenAndSendMail(user, ctx)
        } else {
            return sendResponse(ctx, 422, 'The mailbox you filled in has been registered.')
        }
    } else {
        let user = new UserModel({
            username: username,
            email: email,
            password: password,
            profile: {}
        })
        return setTokenAndSendMail(user)
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
        return $util.sendSuccess(ctx, successContent, user.email)
    } catch (err) {
        throw err
    }
}

exports.setProfile = async(ctx, next) => {
    const requestBody = ctx.request.body
    let user = await findUser({ _id: requestBody._id })
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
    let user = await findUser({ _id: requestBody._id })
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
