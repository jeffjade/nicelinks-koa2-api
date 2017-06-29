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
let cors = require('koa2-cors')

const app = new Koa()
const bodyparser = Bodyparser()

app.use(cors({
    origin: function(ctx) {
        console.log(ctx.header.referer)
        if (ctx.header.referer.indexOf('nicelinks.site') === -1) {
            return false
        }
        return '*'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

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