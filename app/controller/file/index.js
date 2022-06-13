// const R = require('ramda')
const path = require('path')
const Base = require('../../core/base_controller.js')
const { upload, getDownloadUrl } = require('../../lib/oss')
const { computeFileSize } = require('../../lib/utils')

class FileController extends Base {
  async upload () {
    const stream = await this.ctx.getFileStream()
    const ext = path.extname(stream.filename)
    if (!['.pdf'].includes(ext)) {
      return this.fail('只能上 pdf 文件!')
    }
    try {
      const url = await upload({ pathOrStream: stream, fileName: `${Date.now()}${ext}` })
      const ContentLength = this.ctx.get('content-length')
      const size = computeFileSize(ContentLength)
      return this.success({ url, size })
    } catch (err) {
      return this.fail('服务端上传失败!', err)
    }
  }

  async download () {
    const { url } = this.query
    const res = await getDownloadUrl(url)
    this.ctx.redirect(res)
  }
}

module.exports = FileController
