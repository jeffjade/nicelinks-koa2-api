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
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
    role: request.role
  }
}

// ========================================
// Login Route
// ========================================
exports.login = function (req, res, next) {
  let userInfo = setUserInfo(req.user)

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  })
}

// ========================================
// Registration Route
// ========================================
exports.register = async (ctx, next) => {
  // Check for registration errors
  console.log(ctx)
  const requestBody = ctx.request.body
  const response = ctx.response

  const email = requestBody.email
  const firstName = requestBody.firstName
  const lastName = requestBody.lastName
  const password = requestBody.password

  // Return error if no email provided
  if (!email) {
    return response.status(422).send({ error: 'You must enter an email address.'})
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return response.status(422).send({ error: 'You must enter your full name.'})
  }

  // Return error if no password provided
  if (!password) {
    return response.status(422).send({ error: 'You must enter a password.' })
  }

  UserModel.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err) }

      // If user is not unique, return error
    if (existingUser) {
      return response.status(422).send({ error: 'That email address is already in use.' })
    }

      // If email is unique and password was provided, create account
    let user = new UserModel({
      email: email,
      password: password,
      profile: { firstName: firstName, lastName: lastName }
    })

    user.save(function (err, user) {
      if (err) { return next(err) }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

      let userInfo = setUserInfo(user)

      response.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      })
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
