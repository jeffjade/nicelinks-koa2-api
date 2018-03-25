const Bluebird = require('bluebird')
const RedisCache = require('./redisCache').RedisCache
const redisConfig = require('./../config').redis.client

class PageCache extends RedisCache {
  constructor(settings) {
    super(settings)
  }

  async set (key, val) {
    const result = super.set(key, val)
    super.setExpire(key, 7 * 24 * 60 * 60)
    return result
  }

  async get (key) {
    const result = await super.get(key)
    if (!result) {
      return new Bluebird((resolve, reject) => {
        resolve(null)
      })
    }

    return super.get(key)
  }
}

exports.PageCache = new PageCache({
  options: {
    host: redisConfig.host,
    port: redisConfig.port || 39,
    db: redisConfig.db || 1,
    return_buffers: false
  }
})