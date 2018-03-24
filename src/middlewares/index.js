let config = require('./../config')

function applyMiddleware (app) {
  if (config.isOpenRedisFlag) {
    app.use(require('./cache').RedisCache)
  }
}

exports.applyMiddleware = applyMiddleware