const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1/user'
const OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}
mongoose.connect(DB_URL, OPTIONS)

mongoose.connection
  .on('error', () => {
    console.log('Database connection failed')
  })
  .on('open', () => {
    console.log('Database connection successful')
  })

const schema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  create_time: Date,
  nickname: String,
  avatar: String,
  introduction: String,
  phone: Number,
  birthday: String,
  email: String
})

const model = {
  UserInfo: mongoose.model('UserInfo', schema)
}
// console.log(model)
module.exports = model