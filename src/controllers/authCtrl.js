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

// Set user info from request
function setUserInfo (request) {
  return {
    _id: request._id,
    username: request.username,
    email: request.email,
    role: request.role
  }
}

function sendResponse (ctx, status, body) {
  ctx.status = status
  ctx.body = body
}

const checkUser = async (params) => {
  try {
    const user = await UserModel.findOne(params).exec()
    if (user) {
      return { code: 201, msg: 'email exist' }
    } else {
      return { code: 0, msg: 'new user' }
    }
  } catch (error) {
    throw error
  }
}

const logoffUserById = (id) => {
  return new Promise(( resolve, reject) => {
    User.findOneAndRemove({ _id: id }, err => {
      if(err){
        reject(err);
      }
      console.log('logoff success')
      resolve();
    })
  })
}

// ========================================
// Login Route
// ========================================
exports.login = async (ctx, next) => {
  let userInfo = setUserInfo(ctx.request.body)

  return {
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  }
}

exports.login = (ctx, next) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      if (!user.active) {
        ctx.status = 423
        ctx.body = '此账号尚未激活'
        return
      }

      ctx.cookies.set('NiceLinksLoginCookie', true, {
        maxAge: 15 * 60 * 1000,
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
  // Check for registration errors
  const requestBody = ctx.request.body
  const response = ctx.response

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

  const checkUserResult = await checkUser({ email: email })

  if (checkUserResult.code) {
    ctx.status = 422
    ctx.body = checkUserResult.msg
  } else {
    let buf = crypto.randomBytes(20)
    console.log('buf')
    console.log(buf)

    let user = new UserModel({
      email: email,
      password: password,
      profile: {}
    })

    // 保证激活码不会重复
    user.activeToken = user._id + buf.toString('hex')
    user.activeExpires = Date.now() + 24 * 3600 * 1000
    let link = 'http://locolhost:4000/account/active/' + user.activeToken
    
    // 发送激活邮件
    sendMail({
      to: email,
      html: `欢迎加入 Nice Links，为保证可以正常使用，请在 24 小时内，击下面链接完成邮件验证：${link}`
    })

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

exports.active = async (ctx, next) => {
  const requestBody = ctx.request.body
  // 找到激活码对应的用户
  let user = User.findOne({
    activeToken: requestBody.activeToken,
    // 过期时间 > 当前时间
    activeExpires: {$gt: Date.now()}
  }).exec()

  // 激活码无效
  if (!user) {
    return res.render('message', {
    title: '激活失败',
    content: '您的激活链接无效，请重新 <a href="/account/signup">注册</a>'
    })
  }

  // 激活并保存
  user.active = true
  user.save(function (err, user) {
  if (err) return next(err)

  // 返回成功
  res.render('message', {
    title: '激活成功',
    content: user.username + '已成功激活，请前往 <a href="/login">登录</a>'
    })
  })
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