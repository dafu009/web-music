const jwt = require('jsonwebtoken')
const UserControler = require('../controller/user')
const privateKey = require('./tokenKey')
module.exports = async (ctx) => {
  const token = ctx.get('Authorization')
  if (token === '') {
    ctx.status = 200
    ctx.body = {
      code: 400,
      success: true,
      isLogin: false,
      data: {
        message: '未登录',
        userInfo: {}
      }
    }
  }
  let tokenContent = null
  try {
    tokenContent = await jwt.verify(token, privateKey)
    const doc = await UserControler.getUser(tokenContent.username)
    ctx.status = 200
    ctx.body = {
      success: true,
      code: 200,
      isLogin: true,
      data: {
        username: doc.username,
        nickname: doc.nickname,
        avatar: doc.avatar,
        createTime: doc.create_time,
        introduction: doc.introduction,
        phone: doc.phone
      }
    }
  } catch (err) {
    ctx.throw(err)
    // ctx.status = 200
    // ctx.body = {
    //   success: true,
    //   isLogin: false,
    //   code: 401,
    //   data: {
    //     message: '登录已过期，请重新登录',
    //     userInfo: {}
    //   }
    // }
  }
}