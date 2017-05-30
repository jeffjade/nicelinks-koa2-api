const jwt = require('jsonwebtoken'),
  crypto = require('crypto'),
  UserModel = require('../models/userModel'),
  config = require('../config/main')

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

  // UserModel.findOne({ email: email }, async (err, existingUser) => {
  //   console.log(err, existingUser, '111')
  //   if (err) { return next(err) }

  //     // If user is not unique, return error
  //   if (existingUser) {
  //     ctx.status = 422
  //     ctx.body = "That email address is already in use."
  //   }

  //     // If email is unique and password was provided, create account
  //   let user = new UserModel({
  //     email: email,
  //     password: password,
  //     profile: {}
  //   })

  //   user.save(async (err, user) => {
  //     if (err) { return next(err) }

  //       // Subscribe member to Mailchimp list
  //       // mailchimp.subscribeToNewsletter(user.email);

  //       // Respond with JWT if user was created

  //     let userInfo = await setUserInfo(user)

  //     ctx.status = 200
  //     ctx.body = {
  //       token: 'JWT ' + generateToken(userInfo),
  //       user: userInfo
  //     }
  //   })
  // })
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
