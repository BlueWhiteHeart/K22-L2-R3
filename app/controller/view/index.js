const R = require('ramda')
const Base = require('../../core/base_controller.js')
const { Op } = require('sequelize')
const moment = require('moment')
const _ = require('lodash')

moment.locale('zh-cn')

const newsBannerTypes = [21, 22]
const newsNoticeType = 26

const cleanPages = (pages) => {
  return pages.filter(e => e.visible === 1).reduce((prev, curt) => {
    const { visible, parent_id: pId } = curt
    if (+visible === 1) {
      if (pId) {
        const parent = prev.find(e => e.id === pId)
        if (parent) {
          parent.children = R.is(Array, parent.children) ? [...parent.children, curt] : [curt]
        }
      } else {
        prev.push(curt)
      }
    }
    return prev
  }, [])
}

const parse = (str) => typeof str === 'string' ? str.split('-').reduceRight((prev, total) => prev + total) : 0

const sortNews = (arr) => {
  return arr.sort((a, b) => parse(b.subtitle) - parse(a.subtitle))
}

const sortNewsNotice = (arr) => {
  return arr.sort((a, b) => {
    try {
      return moment(b.title).valueOf() - moment(a.title).valueOf()
    } catch (err) {
      return moment(b.updated_at).valueOf() - moment(a.updated_at).valueOf()
    }
  })
}

const isEn = (path) => {
  const regexp = /\/en/
  return regexp.test(path)
}

class ViewController extends Base {
  // 查询页面信息表
  async findPages (id) {
    const pages = await this.Page.findAllPages({
      where: {
        [Op.or]: [
          { visible: 1 },
          { id }
        ]
      }
    })
    // console.log(pages)
    return pages.map(e => e.toJSON())
  }

  // 获取 BannerType
  async getBannerTypes (types) {
    // 如果 types 不存在的话，就返回一个空数组
    if (
      !types ||
      (!R.is(String, types) && !R.is(Array, types))
    ) return []

    const _types = R.is(String, types) ? types.split(',') : types
    const allTypes = await this.Type.findAllTypes({
      where: {
        id: {
          [Op.in]: _types
        }
      }
    })
    return allTypes
  }

  // 获取 banner 详情
  async findBannersByTypes (types, order = [['updated_at', 'ASC']]) {
    if (
      !types ||
      (!R.is(String, types) && !R.is(Array, types))
    ) return []

    const _types = R.is(Array, types) ? types : types.split(',')
    const banners = await this.Banner.findAllBanners({
      order,
      where: {
        type: {
          [Op.in]: _types
        },
        status: 1
      },
      raw: true
    })
    return banners
  }

  // 页面渲染
  async renderPage (path, pageId, order, otherData = null, params = {}) {
    // 数据库查询页面
    const pages = await this.findPages(pageId)
    // 找到指定页面
    const page = pages.find(e => e.id === pageId)
    // 获取 banners 详情
    const banners = await this.findBannersByTypes(page.banner_types, order)
    // 获取 bannerTypes
    const bannerTypes = await this.getBannerTypes(page.banner_types)

    const {
      filterBanners = (val) => val
    } = params

    // console.log(pages)
    // console.log(cleanPages(pages))

    // 根据路径渲染
    await this.render(path, {
      pages: cleanPages(pages),
      page,
      banners: filterBanners(banners),
      bannerTypes,
      ...otherData
    })
  }

  // 渲染首页
  async index () {
    await this.renderPage('home/index.pug', this.HomePageId, [['created_at', 'ASC']], null, {
      filterBanners: (val) => {
        const banners = val.reduceRight((prev, curt) => {
          const { normal, news, newsNotice } = prev
          const { type } = curt
          if (newsBannerTypes.includes(type)) {
            news.unshift(curt)
          } else if (newsNoticeType === type) {
            newsNotice.unshift(curt)
          } else {
            normal.unshift(curt)
          }
          return prev
        }, { normal: [], news: [], newsNotice: [] })

        banners.news = sortNews(banners.news).slice(0, 16)
        banners.newsNotice = sortNewsNotice(banners.newsNotice).slice(0, 16)

        return Object.values(banners).reduce((prev, curt) => prev.concat(curt), [])
      }
    })
  }

  // 关于我们
  async team () {
    await this.renderPage('team/index.pug', this.TeamPageId)
  }

  // 被投公司
  async company () {
    await this.renderPage('company/index.pug', this.CompanyPageId)
  }

  // 社会责任
  async socialResponsibility () {
    await this.renderPage('social_responsibility/index.pug', this.SocialResponsibilityPageId)
  }

  // 创智
  async createWisdom () {
    await this.renderPage('social_responsibility/create_wisdom.pug', this.CreateWisdomPageId)
  }

  // 公益
  async publicWelfare () {
    await this.renderPage('social_responsibility/public_welfare.pug', this.PublicWelfarePageId)
  }

  // 在行
  async beas () {
    await this.renderPage('social_responsibility/beas.pug', this.BeasPageId)
  }

  // 新闻
  async news () {
    await this.renderPage('news/index.pug', this.NewsPageId)
  }

  // 联系我们
  async contact () {
    await this.renderPage('contact/index.pug', this.ContactPageId)
  }

  // 管理员登录
  async adminLogin () {
    await this.renderPage('login/admin.pug', this.LoginPageId)
  }

  // 投资人登录
  async login () {
    if (R.isNil(this.user) || R.isEmpty(this.user)) {
      await this.renderPage('login/index.pug', this.LoginPageId)
    } else {
      this.ctx.redirect(`${isEn(this.ctx.path) ? '/en/' : '/'}info`)
    }
  }

  // 投资人如登录，显示投资人主页；未登录，进入 "/"
  async info () {
    if (R.isNil(this.user) || R.isEmpty(this.user)) {
      this.ctx.redirect(`${isEn(this.ctx.path) ? '/en/' : '/'}`)
    } else {
      await this.renderPage('login/info.pug', this.InfoPageId, [['updated_at', 'DESC']], {
        user: R.pick(['name', 'id', 'mobile', 'avatar', 'account'], this.user)
      }, {
        filterBanners: arr => {
          if (!_.isArray(arr)) return []
          return _.filter(arr, banner => {
            const { authority, type } = banner
            // 32，39 展示类不需要过滤权限
            if (![33, 34, 35].includes(type)) {
              return true
            }
            // 33,34,35 需要过滤权限
            if (authority && _.isString(authority)) {
              const users = authority.split(',').map(e => +e)
              return _.includes(users, this.user.id)
            }
            return false
          })
        }
      })
    }
  }

  // 获取内容
  // content_origin：1 后台配置；2 语雀
  // content_origin_id：来源 id
  async detail () {
    const { id } = this.query
    const _id = +id
    if (_id > 0) {
      const banner = await this.Banner.findOneByOpt({
        where: { id: _id },
        raw: true
      })
      const banners = await this.findBannersByTypes([banner.type])
      let last, next
      for (const [index, item] of banners.entries()) {
        if (item.id === _id) {
          last = banners[index - 1]
          next = banners[index + 1]
          break
        }
      }
      const pages = await this.Page.findAllPages({
        where: { visible: 1 },
        raw: true
      })

      const contentOrigin = {}

      if (isEn(this.ctx.path)) {
        if (banner.content_en_origin === 2 && banner.content_en_origin_id) {
          contentOrigin.content_en = (
            await this.YueQue.getDocDetail({
              repoId: this.app.config.yuque.repoId,
              docId: banner.content_en_origin_id
            })
          ).body_html
        }
      } else {
        if (banner.content_origin === 2 && banner.content_origin_id) {
          contentOrigin.content = (
            await this.YueQue.getDocDetail({
              repoId: this.app.config.yuque.repoId,
              docId: banner.content_origin_id
            })
          ).body_html
        }
      }

      await this.render('social_responsibility/detail.pug', {
        last,
        next,
        banner,
        contentOrigin,
        pages: cleanPages(pages)
      })
    } else {
      return this.ctx.redirect(`${isEn(this.ctx.path) ? '/en/' : '/'}home`)
    }
  }
}

module.exports = ViewController
