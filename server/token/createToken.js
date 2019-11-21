const jwt = require('jsonwebtoken')

module.exports = function (username) {
  const token = jwt.sign(
    { username },
    'yuebaba',
    {
      expiresIn: '60s'
    }
  )
  return token
}