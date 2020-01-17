const jwt = require('jsonwebtoken')
const privateKey = require('./tokenKey')
module.exports = function (username) {
  const token = jwt.sign({ username }, privateKey, { expiresIn: '1h' })
  return token
}