let http = require('http')
let fs = require('fs')
let Koa = require('koa')
let path = require('path')
let views = require('koa-views')
let convert = require('koa-convert')
let json = require('koa-json')
let Bodyparser = require('koa-bodyparser')
let koaStatic = require('koa-static-plus')
let koaOnError = require('koa-onerror')
let KoaHelmet = require('koa-helmet')
let KoaSession = require('koa-session2')
let KoaStatic = require('koa-static')
let KoaMount = require('koa-mount')
let KoaRedis = require('koa-redis')
let cors = require('koa2-cors')
let config = require('./config')
let logger = require('./helper/logger')
let applyMiddleware = require('./middlewares').applyMiddleware

const app = new Koa()
const bodyparser = Bodyparser()

applyMiddleware(app)

app.use(cors({
    origin: '*',
    maxAge: 1000,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 替换'x-koa-redis-cache' 为'x-server-cache' 同helmet信息隐藏
app.use(async (ctx, next) => {
  await next()
  if (ctx.response.get('x-koa-redis-cache')) {
    ctx.remove('x-koa-redis-cache')
    ctx.set('x-server-cache', true)
  }
})

// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(KoaHelmet())

app.proxy = true
app.use(KoaSession({
    store: new KoaRedis(config.redis.session),
    key: 'SESSIONID',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true
}))
app.use(config.passport.initialize())
app.use(config.passport.session())

// static
app.use(convert(koaStatic(path.join(__dirname, '../public'), {
    pathPrefix: ''
})))

app.use(KoaMount('/api/avatar', KoaStatic(config.main.avatarUploadDir)))

// views
app.use(views(path.join(__dirname, '../views'), {
    extension: 'ejs'
}))

// 500 error
koaOnError(app, {
    template: 'views/500.ejs'
})

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// response router
app.use(async(ctx, next) => {
    if (ctx.request.url.indexOf('api') === -1) {
        let filePath = __dirname + '/../public/index.html'
        let content = fs.readFileSync(filePath, 'utf8')
        ctx.body = content
        return
    }
    await require('./routes').routes()(ctx, next)
})

// 404
app.use(async(ctx) => {
    ctx.status = 404
    await ctx.render('404')
})

// error logger
app.on('error', async(err, ctx) => {
    logger.error('app.on error:', { err: err.stack })
})

const port = parseInt(config.main.port || '3000')
const server = http.createServer(app.callback())

server.listen(port)
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(port + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(port + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
})

server.on('listening', () => {
    console.log('Listening on port: %d', port)
})

module.exports = app