const getAliOSSCreds = async (ctx) => {
  // 阿里云OSS 配置
  const oss_options = {
    region: 'oss-cn-shenzhen',
    endpoint: 'oss-cn-shenzhen.aliyuncs.com',
    accessKeyId: 'LTAI4FtXSsDMsUofFJL8DpKw',
    accessKeySecret: '4V1V8frkxgS1bxvCjQQ5ajCAeWqzjI',
    bucket: 'image-source-lsy'
  }
  ctx.status = 200
  ctx.body = {
    success: true,
    code: 200,
    exist: true,
    data: {
      oss_options
    }
  }
}

module.exports = getAliOSSCreds