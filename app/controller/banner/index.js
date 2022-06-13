const path = require('path')
const R = require('ramda')
const Base = require('../../core/base_controller.js')
const { upload } = require('../../lib/oss')
const _ = require('lodash')
const { Op } = require('sequelize')

class BannerController extends Base {
  pickBannerNeedKey (obj) {
    return R.pickAll(
      Object.keys(this.commonValidateKey).concat(this.withoutValidateKey),
      obj
    )
  }

  get commonValidateKey () {
    return {
      title: {
        type: 'string',
        allowEmpty: true
      },
      title_en: {
        type: 'string',
        allowEmpty: true
      },
      subtitle: {
        type: 'string',
        allowEmpty: true
      },
      subtitle_en: {
        type: 'string',
        allowEmpty: true
      },
      description: {
        type: 'string',
        allowEmpty: true
      },
      description_en: {
        type: 'string',
        allowEmpty: true
      },
      content: {
        type: 'string',
        allowEmpty: true
      },
      content_en: {
        type: 'string',
        allowEmpty: true
      },
      type: 'int',
      url: {
        type: 'string',
        allowEmpty: true
      },
      url_en: {
        type: 'string',
        allowEmpty: true
      },
      status: 'int',
      href: {
        type: 'string',
        allowEmpty: true
      },
      icon: {
        type: 'string',
        allowEmpty: true
      },
      content_origin: {
        type: 'int',
        allowEmpty: true
      },
      content_en_origin: {
        type: 'int',
        allowEmpty: true
      }
    }
  }

  get withoutValidateKey () {
    return [
      'content_origin_id',
      'content_en_origin_id'
    ]
  }

  before () {
    [
      'title',
      'title_en',
      'subtitle',
      'subtitle_en',
      'content',
      'content_en',
      'description',
      'description_en',
      'url',
      'url_en',
      'href',
      'icon'
    ].forEach(e => {
      this.reqBody[e] = this.reqBody[e] || ''
    })
    this.reqBody.type = +this.reqBody.type
    this.reqBody.status = +this.reqBody.status
    this.reqBody.id = this.reqBody.id ? +this.reqBody.id : null
    this.reqBody.content_origin = this.reqBody.content_origin ? +this.reqBody.content_origin : 1
    this.reqBody.content_origin_id = this.reqBody.content_origin_id ? +this.reqBody.content_origin_id : null
    this.reqBody.content_en_origin = this.reqBody.content_en_origin ? +this.reqBody.content_en_origin : 1
    this.reqBody.content_en_origin_id = this.reqBody.content_en_origin_id ? +this.reqBody.content_en_origin_id : null
  }

  async index () {
    this.before()
    this.validate(this.commonValidateKey)
    try {
      await this.Banner.create(this.pickBannerNeedKey(this.reqBody))
      this.success('创建 Banner 成功!')
    } catch (err) {
      this.fail('创建 Banner 失败!', err)
    }
  }

  async update () {
    const { id } = this.reqBody
    this.before()
    this.validate({
      ...this.commonValidateKey,
      id: 'int'
    })

    try {
      const isExisted = await this.Banner.findOneByOpt({ where: { id } })
      if (R.isNil(isExisted)) {
        return this.fail('找不到指定的 Banner!')
      }
      await isExisted.update(this.pickBannerNeedKey(this.reqBody))
      this.success('修改成功!')
    } catch (err) {
      this.fail('修改 Banner 失败!', err)
    }
  }

  async updateFileBanner () {
    const { href, title, id } = this.reqBody
    if (
      !href ||
      !title ||
      !href.trim() ||
      !title.trim()
    ) {
      return this.fail('标题必须填写, 图片必须上传!')
    }
    this.reqBody.subtitle = path.extname(href).slice(1).toUpperCase()
    if (id && +id > 0) {
      await this.update()
    } else {
      await this.index()
    }
  }

  async upload () {
    const stream = await this.ctx.getFileStream()
    const ext = path.extname(stream.filename)
    if (!['.jpg', '.jpeg', '.png', '.gif', '.bmp', 'wbmp', '.webp'].includes(ext)) {
      return this.fail('请上传图片格式文件!')
    }
    try {
      const url = await upload({ pathOrStream: stream, fileName: `${Date.now()}${ext}` })
      return this.success({ url })
    } catch (err) {
      return this.fail('服务端上传失败!', err)
    }
  }

  async getAuthorityUsers () {
    const { id } = this.query
    try {
      if (!id) throw new Error('记录不存在')
      const { authority } = await this.Banner.findOneByOpt({
        where: { id: +id },
        attributes: ['authority'],
        raw: true
      })
      if (_.isEmpty(authority) || !authority) {
        return this.success([])
      } else {
        const users = await this.User.findAllUsers({
          where: {
            id: {
              [Op.in]: _.split(authority, ',')
            }
          },
          raw: true
        })
        return this.success(users)
      }
    } catch (err) {
      return this.fail('记录不存在', err)
    }
  }

  async updateAuthority () {
    const { id, users } = this.reqBody
    try {
      if (!id) throw new Error('记录不存在')
      const banner = await this.Banner.findOneByOpt({
        where: { id }
      })
      if (!banner) throw new Error('记录不存在')
      banner.authority = _.isArray(users) ? users.join(',') : ''
      await banner.save()
      return this.success('修改成功!')
    } catch (err) {
      return this.fail('修改失败', err)
    }
  }
}

module.exports = BannerController
