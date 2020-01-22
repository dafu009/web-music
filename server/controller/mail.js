const nodemailer = require('nodemailer')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const { getUser } = require('./user')
function RandomNum (Min, Max) {
  let Range = Max - Min
  let Rand = Math.random()
  let num = Min + Math.round(Rand * Range)
  return num
}
let VerificationCode = 0

let transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secureConnection: true,
  auth: {
    user: '563569293@qq.com',
    pass: 'nvawuwxfmnjgbehe'
  }
})


const transmitMail = async (ctx) => {
  const { email } = ctx.request.body
  const { nickname, avatar } = await getUser(email)
  VerificationCode = RandomNum(100000, 999999)
  const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, '../mail-template/email.ejs'), 'utf-8'))
  
  const HTML = template({
    nickname,
    avatar,
    code: VerificationCode
  })

  let mailOptions = {
    from: '"邮箱验证"<563569293@qq.com>',
    to: email,
    subject: '邮箱验证',
    html: HTML
  }
  console.log(HTML)
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        return
      }
      console.log(info.messageId)
    })
    ctx.status = 200
    ctx.body = {
      success: 200,
      message: '验证码已发送'
    }
  } catch (err) {
    console.log(err)
  }
}

const checkCode = async (ctx) => {
  const { code } = ctx.request.body
  if (Number(code) === VerificationCode) {
    ctx.status = 200
    ctx.body = {
      success: true,
      message: '校验通过'
    }
  } else {
    ctx.status = 200
    ctx.body = {
      success: false,
      message: '校验失败,请重试'
    }
  }
}

module.exports = {
  transmitMail,
  checkCode
}