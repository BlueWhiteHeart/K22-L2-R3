/*
 * @Author: senze.fan
 * @Description: Base Controller
 */
const { Controller } = require('egg')
const _ = require('lodash')

module.exports = class Base extends Controller {
  test () {
    return 'this is the test'
  }

  // 用户 session
  get user () {
    return this.ctx.session.user
  }

  // 页面配置信息
  get pageInfos () {
    return this.ctx.app.config.pageInfos
  }

  // 请求内容
  get reqBody () {
    return this.ctx.request.body
  }

  get query () {
    return this.ctx.query
  }

  // service
  get User () {
    return this.service.user.index
  }

  get Page () {
    return this.service.page.index
  }

  get Banner () {
    return this.service.banner.index
  }

  get Type () {
    return this.service.type.index
  }

  get YueQue () {
    return this.service.yuque.index
  }

  get SMS () {
    return this.service.sms.index
  }

  get isMobile () {
    const userAgent = this.ctx.request.header['user-agent'].toLowerCase()
    const mList = ['iphone', 'android']
    return mList.some(item => userAgent.indexOf(item) > -1)
  }

  get HomePageId () { return 1 }
  get TeamPageId () { return 2 }
  get CompanyPageId () { return 3 }
  get SocialResponsibilityPageId () { return 4 }
  get NewsPageId () { return 5 }
  get ContactPageId () { return 6 }
  get CreateWisdomPageId () { return 7 }
  get PublicWelfarePageId () { return 8 }
  get BeasPageId () { return 9 }
  get LoginPageId () { return 10 }
  get InfoPageId () { return 11 }

  // 页面渲染
  async render (path, data) {
    // 先查看页面是否为 en 版
    const regexp = /\/en/
    const isEn = regexp.test(this.ctx.path)
    // 验证用户是否登录
    const isLogin = !_.isNil(this.user) && !_.isEmpty(this.user) && this.user.id
    await this.ctx.render(path, {
      isMobile: this.isMobile,
      isLogin: !!isLogin,
      isEn,
      ...this.pageInfos,
      data,
      pathname: this.ctx.path
    })
  }

  // log
  log (err, type = 'error') {
    this.ctx.logger[type](
      type === 'error' && !(err instanceof Error)
        ? new Error(err)
        : err
    )
  }

  // 验证
  validate (logic) {
    // 获取不同类型请求的数据
    const param = this.ctx.method.toLowerCase() === 'get' ? this.query : this.reqBody
    // 通过 logic 规则，验证请求的数据
    this.ctx.validate(logic, param)
  }

  // 请求成功
  success (data) {
    this.ctx.body = {
      success: true,
      data
    }
  }

  // 请求失败
  fail (errMsg, err = '') {
    if (err) this.log(err)
    this.ctx.body = {
      success: false,
      errMsg
      // err
    }
  }
}
