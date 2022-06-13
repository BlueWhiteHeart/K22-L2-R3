const Base = require('../../core/base_service')

class PageService extends Base {
  async findOneByOpt (option) {
    const page = await this.Page.findOne(option)
    return page
  }

  async findAllPages (option) {
    const pages = await this.Page.findAll(option)
    return pages
  }
}

module.exports = PageService
