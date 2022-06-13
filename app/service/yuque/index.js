const Base = require('../../core/base_service')
const SDK = require('@yuque/sdk')
const _ = require('lodash')

class YueQueService extends Base {
  constructor (props) {
    super(props)
    this.client = null
  }

  getClient () {
    if (!this.client) {
      this.client = new SDK({
        token: this.config.yuque.token,
        handler (res) {
          // should handler error yourself
          if (res.status !== 200) {
            const err = new Error(res.data.message)
            /* istanbul ignore next */
            err.status = res.data.status || res.status
            err.code = res.data.code
            err.data = res
            throw err
          }
          // return whatever you want
          const { data } = res.data
          return data
        }
      })
    }
    return this.client
  }

  async getDocsByRepoId (repoId) {
    const res = await this.getClient().docs.list({
      namespace: repoId
    })
    const listPublished = _.filter(res, e => e.status === 1)
    return _.map(
      listPublished,
      e => _.pick(e, ['id', 'title'])
    )
  }

  async getDocDetail ({ repoId, docId, data }) {
    const res = await this.getClient().docs.get({
      namespace: repoId,
      slug: docId,
      data
    })
    return res
  }
}

module.exports = YueQueService
