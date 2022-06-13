const Base = require('../../core/base_service')

class BannerService extends Base {
  async findOneByOpt (option) {
    const banner = await this.Banner.findOne(option)
    return banner
  }

  async findAllBanners (option) {
    const banners = await this.Banner.findAll(option)
    return banners
  }

  async create (data) {
    const res = await this.Banner.create(data)
    return res
  }
}

module.exports = BannerService
