// const R = require('ramda')
const ViewBase = require('./index')
const { Op } = require('sequelize')

class ViewController extends ViewBase {
  // 渲染模版
  async renderBannerListTemplate (path, pageId) {
    // 获取页面
    const page = await this.Page.findOneByOpt({ where: { id: pageId } })
    // 获取 banner
    const banners = await this.findBannersByTypes(page.banner_types, [['updated_at', 'DESC']])
    // 获取 banner
    const bannerTypes = await this.getBannerTypes(page.banner_types)
    // 获取语雀文章
    const yuequeDocs = await this.YueQue.getDocsByRepoId(this.config.yuque.repoId)
    // 渲染页面
    await this.render(path, {
      bannerTypes,
      banners,
      yuequeDocs
    })
  }

  // 主页
  async home () {
    await this.renderBannerListTemplate('admin/home/index.pug', this.HomePageId)
  }

  // 关于我们
  async team () {
    await this.renderBannerListTemplate('admin/team/index.pug', this.TeamPageId)
  }

  // 被投公司
  async company () {
    await this.renderBannerListTemplate('admin/company/index.pug', this.CompanyPageId)
  }

  // 如何录入
  async doc () {
    await this.render('admin/doc/index.pug')
  }

  // 社会责任
  async socialResponsibility () {
    const pages = await this.Page.findAllPages({
      where: {
        id: {
          [Op.in]: [
            this.SocialResponsibilityPageId,
            this.CreateWisdomPageId,
            this.PublicWelfarePageId,
            this.BeasPageId
          ]
        }
      }
    })
    const typeIds = pages.reduce((prev, curt) => {
      return prev.concat(curt.toJSON().banner_types.split(','))
    }, [])
    const banners = await this.findBannersByTypes(typeIds, [['updated_at', 'DESC']])
    const bannerTypes = await this.getBannerTypes(typeIds)
    await this.render('admin/social_responsibility/index.pug', {
      bannerTypes,
      banners
    })
  }

  // 新闻
  async news () {
    await this.renderBannerListTemplate('admin/news/index.pug', this.NewsPageId)
  }

  // 联系我们
  async contact () {
    await this.renderBannerListTemplate('admin/contact/index.pug', this.ContactPageId)
  }

  //
  async info () {
    await this.renderBannerListTemplate('admin/info/index.pug', this.InfoPageId)
  }

  async user () {
    const users = await this.User.findAllUsers({
      order: [
        ['created_at', 'DESC']
      ]
    })
    await this.render('admin/user/index.pug', {
      users
    })
  }

  async userDetail () {
    const { id } = this.query
    let user
    if (id && !isNaN(id)) {
      user = await this.User.findOneByOpt({
        where: { id: parseInt(id, 10) }
      })
    }
    await this.render('admin/user/detail.pug', {
      user: user || {}
    })
  }

  async banner () {
    const { id } = this.query
    let banner
    if (id && !isNaN(id)) {
      banner = await this.Banner.findOneByOpt({ where: { id: parseInt(id, 10) } })
    }
    const bannerTypes = await this.Type.findAllTypes()
    await this.render('admin/banner/index.pug', {
      banner: banner || {},
      bannerTypes
    })
  }

  async infoCU () {
    const { id } = this.query
    let banner
    if (id && !isNaN(id)) {
      banner = await this.Banner.findOneByOpt({ where: { id: parseInt(id, 10) } })
    }
    const bannerTypes = await this.Type.findAllTypes({
      where: {
        id: {
          [Op.in]: [33, 34, 35]
        }
      }
    })
    await this.render('admin/info/cu.pug', {
      banner: banner || {},
      bannerTypes
    })
  }
}

module.exports = ViewController
