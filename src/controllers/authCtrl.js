const jwt = require('jsonwebtoken'),
  crypto = require('crypto'),
  UserModel = require('../models/userModel'),
  config = require('../config/main')
  passport = require('../config/passport')

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
    let newUser = new UserModel({
      email: email,
      password: password,
      profile: {}
    })

    try {
      const user = await newUser.save()
      let userInfo = setUserInfo(user)
      ctx.status = 200
      ctx.body = {
        message: 'Congratulations on your successful registration',
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      }
    } catch (err) {
      throw err
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
