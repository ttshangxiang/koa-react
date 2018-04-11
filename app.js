
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const views = require('koa-views')
const convert = require('koa-convert')
const dev = require('./build/dev')

// 配置文件
const config = require('./config')
// 路由
const routers = require('./back/routers/index')

const app = new Koa()

// 开发模式
if (process.env.NODE_ENV === 'development') {
  dev(app)
}

// 配置控制台日志中间件
app.use(koaLogger())

// 静态资源
app.use(static(path.join(__dirname, './dist')))
app.use(static(path.join(__dirname, './upload')))

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './back/views'), {
  extension: 'ejs'
}))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 错误
app.on('error', err => console.log(err))

// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)
