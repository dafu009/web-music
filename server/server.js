const Koa = require('koa')
const app = new Koa()
// 路由
const Router = require('koa-router')
const router = new Router()
// 用于post请求的数据
const bodyParser = require('koa-bodyparser')

const PORT = 5000
app.use(bodyParser())

// user数据库操作
const UserController = require('./controller/user')

// 阿里云OSS 配置
const GetAliOSSCreds = require('./controller/oss')

// 图片生成校验
const ImageController = require('./controller/check')

// 邮箱验证
const MailController = require('./controller/mail')

// 登录
const loginRouter = new Router()
loginRouter.post('/login', UserController.Login)

//注册  
const registerRouter = new Router()
registerRouter.post('/register', UserController.Register)

// 更新数据
const upDateRouter = new Router()
upDateRouter.put('/update', UserController.Update)

// 更新邮箱
const updateEmail = new Router()
updateEmail.put('/updateEmail', UserController.updateEmail)

// 用户是否存在查询
const queryUserRouter = new Router()
queryUserRouter.get('/queryUser', UserController.queryUser)

// 获取OSS 配置
const getAliOSSOptionsRouter = new Router()
getAliOSSOptionsRouter.get('/getAliOssOptions', GetAliOSSCreds)

// 获取用户信息
const getUserInfo = new Router()
getUserInfo.get('/getUserInfo', UserController.GetUserInfo)

// 获取图片
const getImage = new Router()
getImage.get('/getRandomImage', ImageController.getRandomImg)

// 校验图盘准确性
const checkImage = new Router()
checkImage.get('/checkImage', ImageController.check)

// 邮箱验证码发送
const sendMailCode = new Router()
sendMailCode.post('/sendMailCode', MailController.transmitMail)

// 校验验证码
const checkMailCode = new Router()
checkMailCode.post('/checkMailCode', MailController.checkCode)
// 装载路由
router.use(
  '/api',
  loginRouter.routes(),
  loginRouter.allowedMethods()
)
router.use(
  '/api',
  registerRouter.routes(),
  registerRouter.allowedMethods()
)
router.use(
  '/api',
  queryUserRouter.routes(),
  queryUserRouter.allowedMethods()
)
router.use(
  '/api',
  getAliOSSOptionsRouter.routes(),
  getAliOSSOptionsRouter.allowedMethods()
)
router.use(
  '/api',
  getUserInfo.routes(),
  getUserInfo.allowedMethods()
)
router.use(
  '/api',
  getImage.routes(),
  getImage.allowedMethods()
)
router.use(
  '/api',
  checkImage.routes(),
  checkImage.allowedMethods()
)
router.use(
  '/api',
  upDateRouter.routes(),
  upDateRouter.allowedMethods()
)
router.use(
  '/api',
  sendMailCode.routes(),
  sendMailCode.allowedMethods()
)
router.use(
  '/api',
  checkMailCode.routes(),
  checkMailCode.allowedMethods()
)
router.use(
  '/api',
  updateEmail.routes(),
  updateEmail.allowedMethods()
)
// koa加载路由中间件
app.use(router.routes())
  .use(router.allowedMethods())

// koa监听
app.listen(PORT, () => {
  console.log(`The server is running at http://127.0.0.1:${PORT}`)
})