let http = require('http')
let Koa = require('koa')
let path = require('path')
let views = require('koa-views')
let convert = require('koa-convert')
let json = require('koa-json')
let Bodyparser = require('koa-bodyparser')
let logger = require('koa-logger')
let koaStatic = require('koa-static-plus')
let koaOnError = require('koa-onerror')
let KoaHelmet = require('koa-helmet')
let session = require('koa-session2')
let KoaStatic = require('koa-static')
let KoaMount = require('koa-mount')
let config = require('./config')

const app = new Koa()
const bodyparser = Bodyparser()

// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(convert(logger()))
app.use(KoaHelmet())

app.proxy = true
app.use(session({ key: 'SESSIONID' }))
app.use(config.passport.initialize())
app.use(config.passport.session())

// static
app.use(convert(koaStatic(path.join(__dirname, '../public'), {
    pathPrefix: ''
})))

// upload avatar
app.use(KoaMount('/upload/avatar', KoaStatic(config.main.avatarUploadDir)))

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
    // 允许来自所有域名请求
    ctx.set("Access-Control-Allow-Origin", "*");
    // 这样就能只允许 http://localhost:8080 这个域名的请求了
    // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080"); 

    // 设置所允许的HTTP请求方法
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

    // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

    // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

    // Content-Type表示具体请求中的媒体类型信息
    ctx.set("Content-Type", "application/json;charset=utf-8");

    // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
    // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
    ctx.set("Access-Control-Allow-Credentials", true);

    // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
    // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
    // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
    ctx.set("Access-Control-Max-Age", 600)

    await require('./routes').routes()(ctx, next)
})

// 404
app.use(async(ctx) => {
    ctx.status = 404
    await ctx.render('404')
})

// error logger
app.on('error', async(err, ctx) => {
    console.log('error occured:', err)
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