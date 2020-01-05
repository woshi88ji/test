const Router = require('koa-router')
const path = require('path')
const fs = require('await-fs')
const { md5 } = require('../../libs/common')
const {suffix} = require('../../config')
let router = new Router()

router.get('/login', async ctx => {
  await ctx.render('1', {})
})

router.post('/login', async ctx => {
  let { user, pass } = ctx.request.fields
  console.log(user, pass)
  console.log(suffix)
  let admin =JSON.parse(await fs.readFile(path.resolve(__dirname, '../../admin.json'))) 
  const result = md5(pass + suffix)
  console.log(admin)
  for (let i = 0; i < admin.length; i++) {
    if (user == admin[i].username) {
      if (admin[i].password == result) {
        ctx.body = `欢迎${admin[i].role}登录`
        break
      } else {
        ctx.body = '密码错误'
      }
    } else {
      ctx.body = '查无此人'

    }

  }
  
})
module.exports = router.routes()