// 如何使用 Node.js SDK 可以访问官网 https://help.aliyun.com/document_detail/32068.html?spm=a2c4g.11186623.6.1398.50203fa1NE4GLl
const { green, red } = require('chalk')
const OSS = require('ali-oss')
const co = require('co')
const path = require('path')

// const BUCKETDOMAINURL = 'https://cappro.oss-cn-hangzhou.aliyuncs.com'
// const APPLICATIONDIR = 'homepage'
// const BUCKET = 'cappro'

// const ossOptions = {
//   region: 'oss-cn-hangzhou',
//   accessKeyId: 'LTAIUMxEdCdcuQ5E',
//   accessKeySecret: 'OO6p6MPh8nSsJjgoErSkNpRJkSex8p',
//   endpoint: 'oss-cn-hangzhou.aliyuncs.com'
// }

// // 正式上线时使用这个
// const BUCKETDOMAINURL = 'https://zhongcap.oss-cn-hangzhou.aliyuncs.com'
// const APPLICATIONDIR = 'homepage'
// // const BUCKET = 'zhongcap'

// const ossOptions = {
//   region: 'oss-cn-hangzhou',
//   accessKeyId: 'LTAI05YpE15P9CJM',
//   accessKeySecret: 'n1lO4qoLiC70TB4DJMA8dqQeMYekcT',
//   endpoint: 'oss-cn-hangzhou.aliyuncs.com',
//   bucket: 'zhongcap'
// }

// k22 上线
const BUCKETDOMAINURL = 'https://k22.oss-cn-hangzhou.aliyuncs.com'
const APPLICATIONDIR = 'homepage'

// node 配置项可参考
// https://help.aliyun.com/document_detail/64097.html?spm=a2c4g.11186623.4.1.11791ef0nCiYDW
const ossOptions = {
  // bucket 所在的区域
  region: 'oss-cn-hangzhou',
  // ram 用户 AccessKey 配置
  // 这边提供了一个仅有控制 bucket：k22 的权限用户
  accessKeyId: 'LTAI4G9dhnJwUZnVywuE3iRt',
  accessKeySecret: 'qmue6xcgUIIIS5E8aik9ZSDsnjYnYp',
  // OSS 域名
  endpoint: 'oss-cn-hangzhou.aliyuncs.com',
  // 通过控制台或 PutBucket 创建的 bucket
  bucket: 'k22'
}

const client = OSS(ossOptions)

// 上传文件
function uploadOss ({ pathOrStream, fileName }) {
  return new Promise((resolve, reject) => {
    co(function * () {
      // client.useBucket(BUCKET)
      yield client.put(`/${APPLICATIONDIR}/${fileName}`, pathOrStream)
      return resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

const upload = async ({ pathOrStream, fileName }) => {
  console.log(`----- 正在上传 ${fileName} -----`)
  try {
    await uploadOss({ pathOrStream, fileName })
    const applicationUrl = `${BUCKETDOMAINURL}/${APPLICATIONDIR}/${fileName}`
    console.log(green(`----- 上传成功，地址：${applicationUrl} -----`))
    return applicationUrl
  } catch (e) {
    console.log(red('----- 上传出错 -----'))
    throw new Error(e)
  }
}

const getDownloadUrl = (url, expires = 3000) => {
  const _url = decodeURIComponent(url)
  return client.signatureUrl(
    _url.replace(`${BUCKETDOMAINURL}/`, ''),
    {
      expires,
      response: {
        'content-disposition': `attachment; filename="${path.basename(_url)}";`
      }
    }
  )
}

module.exports = {
  upload,
  getDownloadUrl
}
