const Router = require('koa-router')

let router = new Router()

router.get('/bbb', async ctx => {
  ctx.body = '我是bbb'
})

module.exports = router.routes()