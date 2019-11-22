const User = require('../model.js').UserInfo
const sha1 = require('sha1')
const createToken = require('../token/createToken')

const WRONG_PASSWORD = 4000
const USER_NOT_EXIST = 4004
const USER_ALREADY_EXIST = 4005
const DONE = 2000
const SERVICE_LOST = 5000

const getUser = async (username) => {
  return new Promise((resolve, reject) => {

    User.findOne(
      { username },
      (err, doc) => {
        if (err) reject(err)
        resolve(doc)
      }
    )
  })
}

// 登录
const Login = async (ctx) => {
  const username = ctx.request.body.username
  const password = sha1(ctx.request.body.password);

  const doc = await getUser(username)

  if (!doc) {
    console.log('用户不存在')
    ctx.status = 200
    ctx.body = {
      success: false,
      code: USER_NOT_EXIST,
      message: '用户不存在'
    }
    return
  }
  if (doc.password === password) {
    console.log('密码正确')
    const token = createToken(username)
    doc.token = token
    await new Promise((resolve, reject) => {
      doc.save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
      })
    })
    ctx.status = 200
    ctx.body = {
      code: DONE,
      success: true,
      message: '登陆成功',
      info: {
        token,
        username,
        avatar: doc.avatar,
        createTime: doc.create_time,
        introduction: doc.introduction
      }
    }
  } else {
    console.log('密码错误')
    ctx.status = 200
    ctx.body = {
      code: WRONG_PASSWORD,
      success: false,
      message: '密码错误'
    }
  }
}

// 注册
const Register = async (ctx) => {
  let user = new User({
    username: ctx.request.body.username,
    password: sha1(ctx.request.body.password),
    token: createToken(this.username),
    create_time: new Date(),  // 十位时间戳
    avatar: '',
    introduction: ''
  })
  const doc = await getUser(user.username)
  if (doc) {
    ctx.status = 200;
    ctx.body = {
      code: USER_ALREADY_EXIST,
      success: false,
      message: '用户名已经存在'
    }
  } else {
    await new Promise((resolve, reject) => {
      user.save(err => {
        if (err) reject(err)
        resolve()
      })
    })
    ctx.status = 200;
    ctx.body = {
      code: DONE,
      success: true,
      message: '注册成功'
    }
  }
}

module.exports = {
  Login,
  Register
}
