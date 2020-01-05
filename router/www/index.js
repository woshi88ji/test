const Router = require('koa-router')

let router = new Router()

router.get('/ccc', async ctx => {
  ctx.body = '我是ccc'
})

module.exports = router.routes()