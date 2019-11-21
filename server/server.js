const Koa = require('koa')
const app = new Koa()
// 路由
const Router = require('koa-router')
const router = new Router()
// 用于post请求的数据
const bodyParser = require('koa-bodyparser')

const PORT = 8888
app.use(bodyParser())

// user数据库操作
const UserController = require('./controller/user')

const checkToken = require('./token/checkToken')

// 登录
const loginRouter = new Router()
loginRouter.post('/login', UserController.Login)

//注册  
const registerRouter = new Router()
registerRouter.post('/register', UserController.Register)


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

// koa加载路由中间件
app.use(router.routes())
  .use(router.allowedMethods())

// koa监听
app.listen(PORT, () => {
  console.log(`The server is running at http://127.0.0.1:${PORT}`)
})