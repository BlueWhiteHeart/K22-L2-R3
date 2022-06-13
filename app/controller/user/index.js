const R = require('ramda')
const Base = require('../../core/base_controller.js')
const { MD5 } = require('../../lib/crypto')

class UserController extends Base {
  // 用户注册、更新
  before () {
    this.reqBody.level = +this.reqBody.level
    this.reqBody.status = +this.reqBody.status
    this.reqBody.mobile = this.reqBody.mobile || ''
    this.reqBody.name = this.reqBody.name || ''
    this.reqBody.email = this.reqBody.email || ''
  }

  // 请求字段类型验证
  get commonValidateKey () {
    return {
      account: 'string',
      password: 'string',
      mobile: {
        type: 'string',
        allowEmpty: true
      },
      name: {
        type: 'string',
        allowEmpty: true
      },
      email: {
        type: 'string',
        allowEmpty: true
      },
      level: 'int',
      status: 'int'
    }
  }

  // 取出 commonValidateKey 键里面的对应值
  pickNeedKey (obj) {
    return R.pickAll(Object.keys(this.commonValidateKey), obj)
  }

  // 用户注册
  async signUp () {
    // 获取用户注册信息
    this.before()
    // 验证用户注册请求, 信息字段
    this.validate(this.commonValidateKey)
    // 用户存在校验
    const isExisted = await this.User.findOneByOpt({
      where: { account: this.reqBody.account }
    })
    if (!R.isNil(isExisted)) {
      return this.fail('用户名已经注册!')
    }

    try {
      // 密码加密
      this.reqBody.password = MD5(this.reqBody.password)
      // 验证数据类型, 并在数据库插入用户数据
      await this.User.create(this.pickNeedKey(this.reqBody))
      this.success('创建用户成功!')
    } catch (err) {
      this.fail('创建用户失败!', err)
    }
  }

  // 投资人登录
  async userLogin () {
    // lever = 3-投资人
    // const { ctx } = this
    await this.login(3, '/info')
  }

  // 管理员、超级管理员登录
  async adminLogin () {
    // level = 1-超级管理员，2-管理员
    await this.login([1, 2], '/admin/home')
  }

  // 用户登录
  async login (level, href) {
    // 验证用户登录请求, 登录名类型
    this.validate({ account: 'string' })

    try {
      // 获取登录信息
      const { account, password } = await this.reqBody
      // 数据库查询并验证
      const user = await this.User.login({ account, password, level })
      // 配置 session
      this.ctx.session.user = user
      // 登录成功, 页面跳转
      this.success({ href })
    } catch (err) {
      // 登录失败
      this.fail(err.message || '登录异常', err)
    }
  }

  // 用户登出
  async logout () {
    // session 置空
    this.ctx.session.user = null
    // 页面重定向
    this.ctx.redirect('/')
  }

  // 用户信息更新
  async update () {
    // 获取用户更新信息
    this.before()
    // 验证用户更新请求, 信息字段
    this.validate(this.commonValidateKey)
    try {
      // 用户存在校验
      const isExisted = await this.User.findOneByOpt({
        where: { account: this.reqBody.account }
      })
      if (R.isNil(isExisted)) {
        return this.fail('该用户不存在!')
      }
      if (isExisted.password !== this.reqBody.password) {
        this.reqBody.password = MD5(this.reqBody.password)
      }
      await isExisted.update(this.pickNeedKey(this.reqBody))
      this.success('修改成功!')
    } catch (err) {
      this.fail('修改用户信息失败！')
    }
  }

  // 用户列表查询
  async list () {
    const { keyword = '', page = 1, pageSize = 10 } = this.query
    try {
      const res = await this.User.list({ keyword, page, pageSize })
      this.success(res)
    } catch (err) {
      this.fail('用户列表查询失败')
    }
  }
}

module.exports = UserController
