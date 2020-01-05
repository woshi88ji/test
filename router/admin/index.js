const Router = require('koa-router')
const path = require('path')
const fs = require('await-fs')
const { md5 } = require('../../libs/common')
const { suffix } = require('../../config')
const svgCaptcha = require('svg-captcha')


let router = new Router()

router.get('/login', async ctx => {
  await ctx.render('admin/login', {
    host: ctx.HOST
  })
})

router.get('/captcha', async ctx => {
  let captcha = svgCaptcha.create({
    width: 100,
    height: 40
  })
  let time = new Date().getTime()
  ctx.session['tokenTime'] = time
  let cap = captcha.text.toLowerCase()
  await ctx.db.query(`INSERT INTO captcha  (token, cap) VALUES ('${time}', '${cap}')`)
  ctx.response.type = 'image/svg+xml'
  ctx.body = captcha.data
})



router.post('/login', async ctx => {
  let { user, pass, cap } = ctx.request.fields
  let admin = JSON.parse(await fs.readFile(path.resolve(__dirname, '../../admin.json')))
  const result = md5(pass + suffix)
  let db_cap = await ctx.db.query(`SELECT cap FROM captcha WHERE token=${ctx.session.tokenTime}`)
  
  if (cap != db_cap[0].cap) {
    ctx.body = '验证码有误'
  } else {

    let userInfo = admin.filter(item => {
      return item.username == user
    })[0]
    if (!userInfo) {
      ctx.body = '该用户不存在'
    } else {
      ctx.body = userInfo.password === result ? '欢迎登陆' : '密码错误'
    }
  }

  await ctx.db.query(`DELETE  FROM captcha  WHERE token=${ctx.session.tokenTime}`)




})

router.all('*', async ctx => {
  if (ctx.session.captcha) {
    await next()
  } else {
    ctx.redirect('admin, login', {})
  }
})

router.get('banner', async ctx => {
  ctx.render('admin/admin', {})
})

module.exports = router.routes()