const ApiCache = require('./../services/apiCache').ApiCache
const $util = require('./../helper/util')

exports.RedisCache =  async function (ctx, next) {
  const request = ctx.request
  if (request.url.indexOf('/api/') === -1 && request.method !== 'GET') {
    return await next()
  }

  const cacheKey = $util.getRedisCacheKey(ctx)
  // 设置 cacheKey 以便在获得数据库的结果处，将数据依据此 key 存入此 Redis;
  ctx.request.cacheKey = cacheKey

  try {
    const respResult = await ApiCache.get(cacheKey);
    if (respResult) {
      console.log(`✔  Get Api Result From Cache Success.`)
      return $util.sendSuccess(ctx, respResult.value, false)
    }
  } catch (error) {
    console.log(`❌ Get Api Cache Error: `, error)
  }
  return await next()
}