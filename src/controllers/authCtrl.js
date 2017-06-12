const jwt = require('jsonwebtoken'),
  crypto = require('crypto'),
  UserModel = require('../models/userModel'),
  config = require('../config/main'),
  passport = require('../config/passport'),
  sendMail = require('../helper/nodemailer');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })

function generateToken (user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds
  })
}

function sendResponse (ctx, status, body) {
  ctx.status = status
  ctx.body = body
}

const findUser = (params) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne(params, (err, doc) => {
      if(err){
        reject(err)
      }
      resolve(doc)
    })
  })
}

const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    UserModel.find({}, (err, doc) => {
      if(err){
        reject(err)
      }
      resolve(doc)
    })
  })
}

const logoffUserById = (id) => {
  return new Promise(( resolve, reject) => {
    UserModel.findOneAndRemove({ _id: id }, err => {
      if(err){
        reject(err);
      }
      resolve();
    })
  })
}

// ========================================
// Login Route
// ========================================
exports.login = (ctx, next) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      if (!user.active) {
        ctx.status = 423
        ctx.body = '此账号尚未激活'
        return
      }

      ctx.cookies.set('NiceLinksLoginCookie', true, {
        maxAge: 30 * 60 * 1000,
        httpOnly: false
      })
      ctx.status = 200
      ctx.body = {
        role: user.role,
        _id: user._id
      }
      return ctx.login(user)
    } else {
      ctx.status = 422
      ctx.body = info.error
    }
  })(ctx, next)
}

exports.logout = (ctx, next) => {
  ctx.cookies.set('NiceLinksLoginCookie', false)
  ctx.logout()
  ctx.status = 200
  ctx.body = {
    success: true,
    message: 'logout successfully'
  }
}

exports.logoff = async( ctx ) => {
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
exports.register = async (ctx, next) => {
  const requestBody = ctx.request.body
  const email = requestBody.email
  const password = requestBody.password

  // Return error if no email provided
  if (!email) {
    return sendResponse(ctx, 420, 'You must enter an email address.')
  }

  // Return error if no password provided
  if (!password) {
    return sendResponse(ctx, 421, 'You must enter a password.')
  }

  const doc = await findUser({ email: email })

  if (doc) {
    return sendResponse(ctx, 422, 'The mailbox you filled in has been registered.')
  } else {
    let buf = crypto.randomBytes(20)
    let user = new UserModel({
      email: email,
      password: password,
      profile: {}
    })

    // 保证激活码不会重复
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
      ctx.status = 200
      ctx.body = {
        success: true,
        message: `已发送邮件至 ${user.email} 请在24小时内按照邮件提示激活。`
      }
    } catch (err) {
      throw err
    }
  }
}

// ========================================
// Active Account
// ========================================
exports.active = async (ctx, next) => {
  const requestBody = ctx.request.body
  // 找到激活码对应的用户
  let user = await UserModel.findOne({
    activeToken: requestBody.activeToken,
    // 过期时间 > 当前时间
    activeExpires: {$gt: Date.now()}
  }).exec()

  // 激活码无效
  if (!user) {
    ctx.status = 425
    ctx.body = "验证失败，验证链接无效或已经过期，请重新 <a href='/login'>注册</a>。"
    return
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

    ctx.status = 200
    ctx.body = {
      success: true,
      message: `Successfully Activated`
    }
  } catch (err) {
    throw err
  }
}

exports.requestResetPwd = async (ctx, next) => {
  const requestBody = ctx.request.body
  let user = await UserModel.findOne({
    email: requestBody.email
  }).exec()

  if (!user) {
    ctx.status = 426
    ctx.body = {
      success: false,
      message: "The corresponding account for this mailbox has not been found. Please check it."
    }
    return
  }

  user.resetPasswordToken = generateToken(user)
  user.resetPasswordExpires = Date.now() + 24 * 3600 * 1000
  let link = `${config.clientPath}/reset-pwd?resetPasswordToken=` + user.resetPasswordToken
  
  sendMail({ to: user.email, type: 'reset', link: link })

  try {
    await new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) { reject(err) }
        resolve()
      })
    })
    ctx.status = 200
    ctx.body = {
      success: true,
      message: `已发送邮件至 ${user.email} 请在 24 小时内按照邮件提示，进行重设密码。`
    }
  } catch (err) {
    throw err
  }
}

exports.setProfile = async (ctx, next) => {
  const requestBody = ctx.request.body
  let user = await findUser({_id: requestBody._id})
  if (!user) {
    ctx.status = 427
    ctx.body = {
      success: false,
      message: `没找见对用的账户。`
    }
  } else {
    let profileList = requestBody.profile
    for (let key in profileList) {
      user.profile[key] = profileList[key] ? profileList[key] : user.profile[key]
    }

    await new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) { reject(err) }
        resolve()
      })
    })

    ctx.status = 200
    ctx.body = {
      success: true,
      message: `Set Successfully`
    }
  }
}

exports.getProfile = async (ctx, next) => {
  const requestBody = ctx.request.body
  let user = await findUser({_id: requestBody._id})
  if (!user) {
    ctx.status = 427
    ctx.body = {
      success: false,
      message: `没找见对用的账户。`
    }
  } else {
    ctx.status = 200
    ctx.body = {
      success: true,
      value: {
        profile: user.profile,
        email: user.email,
        role: user.role,
        id: user._id
      }
    }
  }
}

// ========================================
// Authorization Middleware
// ========================================

// Role authorization check
exports.roleAuthorization = function (role) {
  return function (req, res, next) {
    const user = req.user

    UserModel.findById(user._id, function (err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' })
        return next(err)
      }

      // If user is found, check role.
      if (foundUser.role == role) {
        return next()
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' })
      return next('Unauthorized')
    })
  }
}
