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
  const { email, username } = ctx.request.body
  const doc_by_username = await getUser(username)
  const doc_by_email=await getUser(email)
  VerificationCode = RandomNum(100000, 999999)
  let HTML = null
  const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, '../mail-template/email.ejs'), 'utf-8'))

  if (!doc_by_email && !doc_by_username) {
    ctx.status = 200
    ctx.body = {
      success: false,
      message: '邮箱未绑定，请重试'
    }
    return
  }
  console.log(doc_by_username)
  if (doc_by_username) {
    HTML = template({
      nickname: doc_by_username.nickname,
      avatar: doc_by_username.avatar,
      code: VerificationCode
    })
  } else {
    HTML = template({
      nickname: doc_by_email.nickname,
      avatar: doc_by_email.avatar,
      code: VerificationCode
    })
  }

  let mailOptions = {
    from: '"邮箱验证"<563569293@qq.com>',
    to: email,
    subject: '邮箱验证',
    html: HTML
  }
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
      success: true,
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