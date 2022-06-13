/*
 * @Author: senze.fan
 * @Description: Base Service
 */
const { Service } = require('egg')

module.exports = class Base extends Service {
  get User () {
    return this.ctx.model.User
  }

  get Page () {
    return this.ctx.model.Page
  }

  get Banner () {
    return this.ctx.model.Banner
  }

  get Type () {
    return this.ctx.model.Type
  }

  get SMS () {
    return this.ctx.model.Sms
  }
}
