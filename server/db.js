const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/user')

mongoose.connection
  .on('error', () => {
    console.log('数据库连接出错！')
  })
  .on('open', () => {
    console.log('数据库连接成功！')
  })

const schema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  create_time: Date,
  avatar: String,
  introduction: String
})

const model = {
  UserInfo: mongoose.model('UserInfo', schema)
}

module.exports = model