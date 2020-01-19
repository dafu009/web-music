let bufferRotate = 0
function RandomNum (Min, Max) {
  let Range = Max - Min
  let Rand = Math.random()
  let num = Min + Math.round(Rand * Range)
  return num
}

function getRandomPath () {
  let randomId = RandomNum(100, 1000)
  const path = `https://i.picsum.photos/id/${randomId}/200/200.jpg`
  return path
}

function getRandomRotate () {
  const randomRotate = RandomNum(60, 300)
  bufferRotate = randomRotate
  return randomRotate
}

const getRandomImg = async (ctx) => {
  const randomRotate = getRandomRotate()
  const randomPath = getRandomPath()
  ctx.status = 200
  ctx.body = {
    success: true,
    data: {
      rotate: randomRotate,
      path: randomPath
    }
  }
}
const check = async (ctx) => {
  const { rotate } = ctx.request.query
  if (rotate >= 350 && rotate <= 370 && rotate > bufferRotate) {
    ctx.status = 200
    ctx.body = {
      success: true,
      message: '校验通过'
    }
  } else {
    ctx.status = 200
    ctx.body = {
      success: false,
      message: '校验失败'
    }
  }
}

module.exports = {
  getRandomImg,
  check
}