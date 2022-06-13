const Base = require('../../core/base_service')

class TypeService extends Base {
  async findOneByOpt (option) {
    const type = await this.Type.findOne(option)
    return type
  }

  async findAllTypes (option) {
    const types = await this.Type.findAll(option)
    return types
  }
}

module.exports = TypeService
