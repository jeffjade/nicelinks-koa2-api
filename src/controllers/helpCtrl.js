let $util = require('./../helper/util')

const crawlLinksInfo = async(ctx, next) => {
    let options = ctx.request.query
    
    try {
      return await $util.getWebPageInfo(options.url).then(result => {
        $util.sendSuccess(ctx, result)
      })
    } catch (error) {
        ctx.status = 500
        ctx.body = 'Opps, Something Error :' + error
    }
}

module.exports = {
    crawlLinksInfo
}