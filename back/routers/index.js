const router = require('koa-router')()
const koaProxy = require('koa-proxy')
const convert = require('koa-convert')
const path = require('path')
const config = require('../../config')
const uploadFile = require('../util/upload')

// koa-proxy是koa1的版本 需要用convert转换
const proxy = options => convert(koaProxy(options))

// node渲染例子
router.get('/ejs', async (ctx) => {
  await ctx.render('ejs', {
    data: '是node渲染的'
  })
})

// 异步上传例子
// 页面
router.get('/upload', async (ctx) => {
  await ctx.render('upload')
})
// 后台
router.post('/api/upload', async (ctx) => {
  // 上传文件请求处理
  let result = {
    success: false
  }
  let serverFilePath = path.join(__dirname, '../../upload/image')

  // 上传文件事件
  result = await uploadFile(ctx, {
    fileType: 'album',
    path: serverFilePath
  })
  ctx.body = result
})

// 代理转发（应该放最后）
router.get('/api/*', proxy({
  host: config.api,
  jar: true
}))

module.exports = router