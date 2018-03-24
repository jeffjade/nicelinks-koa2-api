const Bluebird = require('bluebird')
// const zlib = Bluebird.promisifyAll(require('zlib'));

const RedisCache = require('./redisCache').RedisCache
const redisConfig = require('./../config').redis.client

// const gzip = (val) => {
//   return zlib.gzipAsync(val)
// }

// const unzip = (binary) => {
//   return zlib.unzipAsync(binary)
// }

const stringify = (string) => {
  return new Bluebird((resolve, reject) => {
    try {
      resolve(JSON.stringify(string))
    } catch (err) {
      reject(err)
    }
  })
}

const parse = (string) => {
  return new Bluebird((resolve, reject) => {
    try {
      resolve(JSON.parse(string))
    } catch (err) {
      reject(err)
    }
  })
}

const convert = (buffer) => {
  return new Bluebird((resolve, reject) => {
    try {
      resolve(buffer.toString())
    } catch (err) {
      reject(err)
    }
  })
}

class ApiCache extends RedisCache {
  constructor(settings) {
    super(settings)
  }

  async set (key, val) {
    let newVal = await stringify(val)
    return super.set(key, newVal)
  }

  async get (key) {
    const result = await super.get(key)
    if (!result) {
      return new Bluebird((resolve, reject) => {
        resolve(null)
      })
    }

    return super.get(key)
      .then(buffer => convert(buffer))
      .then(json => parse(json))
  }
}

exports.ApiCache = new ApiCache({
  options: {
    host: redisConfig.host,
    port: redisConfig.port || 39,
    db: redisConfig.db || 0,
    return_buffers: true
  }
})