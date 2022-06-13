const Base = require('../../core/base_service')
const _ = require('lodash')
const { MD5 } = require('../../lib/crypto')
const { Op } = require('sequelize')
// const { type } = require('ramda')

class UserService extends Base {
  async findOneByOpt (option) {
    const user = await this.User.findOne(option)
    return user
  }

  async findAllUsers (option) {
    const users = await this.User.findAll(option)
    return users
  }

  async create (data) {
    const user = await this.User.create(data)
    return user
  }

  async list ({ keyword, page, pageSize }) {
    // 分页以下使用的 offse 和 limit 是数字类型
    page = parseInt(page)
    pageSize = parseInt(pageSize)
    // 模糊查: 登录名、姓名、电话、邮箱
    return this.User.findAndCountAll({
      where: {
        [Op.or]: [
          { account: { [Op.like]: `%${keyword}%` } },
          { name: { [Op.like]: `%${keyword}%` } },
          { mobile: { [Op.like]: `%${keyword}%` } },
          { email: { [Op.like]: `%${keyword}%` } }
        ],
        // 激活状态的用户
        status: 1
      },
      offset: (page - 1) * pageSize,
      limit: pageSize
    })
  }

  // 用户登录
  async login ({ account, password, level }) {
    const isExisted = await this.findOneByOpt({
      where: {
        [Op.or]: [
          { account: { [Op.eq]: account } }
          // 不使用 sms 服务，所以将手机验证暂时关闭
          // { mobile: { [Op.eq]: account } }
        ],
        level: _.isArray(level)
          ? { [Op.or]: level }
          : level
      }
    })

    // 检验是否为 null & undefined, 空的对象、集合、映射、set
    if (_.isNil(isExisted) || _.isEmpty(isExisted)) {
      throw new Error('用户名密码错误')
    }

    // 使用用户名密码验证
    if (password && isExisted.password !== MD5(password)) {
      throw new Error('用户名密码错误')
    }

    // 验证用户状态
    if (isExisted.status !== 1) {
      const msg = isExisted.status === 0 ? '账号未激活' : '账号已冻结'
      throw new Error(msg)
    }

    isExisted.last_sign_in_at = new Date()

    await isExisted.save()
    await isExisted.reload()

    return isExisted.toJSON()
  }
}

module.exports = UserService
