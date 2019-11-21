const { User } = require('../model')
const sha1 = require('sha1')
const moment = require('moment')
const createToken = require('../token/createToken')
const isDBExist = (callback) => {
  if (!User) {
    console.log('database is undefined')
    callback()
    return
  }
}
const getUser = async (username) => {
  return new Promise((resolve, reject) => {
    isDBExist(reject)
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
  const username = ctx.request.body.name
  const password = sha1(ctx.request.body.pass);

  const doc = await getUser(username)

  if (!doc) {
    console.log('用户不存在')
    ctx.status = 200
    ctx.body = {
      success: false,
      info: false
    }
  }
  if (doc.password === password) {
    console.log('密码一致!')
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
      success: true,
      username,
      token,
      create_time: doc.create_time
    }
  }
}

// 注册
const Register = async (ctx) => {
  let user = new User({
    username: ctx.request.body.name,
    password: sha1(ctx.request.body.pass),
    token: createToken(this.username),
    create_time: moment().format('X'),  // 十位时间戳
    avatar: '',
    introduction: ''
  })
  const doc = await getUser(user.username)
  if (doc) {
    console.log('用户名已经存在');
    ctx.status = 200;
    ctx.body = {
      success: false
    }
  } else {
    await new Promise((resolve, reject) => {
      user.save(err => {
        if (err) reject(err)
        resolve()
      })
    })
    console.log('注册成功!')
    ctx.status = 200;
    ctx.body = {
      success: true
    }
  }
}

module.exports = {
  Login,
  Register
}
