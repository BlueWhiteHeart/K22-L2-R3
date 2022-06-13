module.exports = app => {
  const { router, controller, middleware } = app

  // ------------ 中间件 start ------------

  const auth = middleware.auth

  // ---------------- end ----------------

  ;[
    // 主页
    ['get', { path: ['/', '/en'], c: 'view.index.index' }],
    // 关于我们
    ['get', { path: ['/team', '/en/team'], c: 'view.index.team' }],
    // 被投公司
    ['get', { path: ['/company', '/en/company'], c: 'view.index.company' }],
    // 社会责任
    ['get', { path: ['/socialResponsibility', '/en/socialResponsibility'], c: 'view.index.socialResponsibility' }],
    // 社会责任 - 创智
    ['get', { path: ['/socialResponsibility/createWisdom', '/en/socialResponsibility/createWisdom'], c: 'view.index.createWisdom' }],
    // 社会责任 - 公益
    ['get', { path: ['/socialResponsibility/publicWelfare', '/en/socialResponsibility/publicWelfare'], c: 'view.index.publicWelfare' }],
    // 访问：社会责任 - 在行
    ['get', { path: ['/socialResponsibility/beas', '/en/socialResponsibility/beas'], c: 'view.index.beas' }],
    // 内容详情
    ['get', { path: ['/detail', '/en/detail'], c: 'view.index.detail' }],
    // 新闻
    ['get', { path: ['/news', '/en/news'], c: 'view.index.news' }],
    // 联系我们
    ['get', { path: ['/contact', '/en/contact'], c: 'view.index.contact' }],
    // 管理员登录
    ['get', { path: ['/admin/login'], c: 'view.index.adminLogin' }],
    // 登出
    ['get', { path: ['/logout'], c: 'user.index.logout' }],
    // 投资人如登录，显示投资人主页；未登录，进入 "/"
    ['get', { path: ['/info', '/en/info'], c: 'view.index.info' }],
    // 管理员 - 首页
    ['get', { path: '/admin/home', c: 'view.admin.home', middlewares: [auth(2)] }],
    // 管理员 - 团队页面
    ['get', { path: '/admin/team', c: 'view.admin.team', middlewares: [auth(2)] }],
    // 管理员 - 公司页面
    ['get', { path: '/admin/company', c: 'view.admin.company', middlewares: [auth(2)] }],
    // 管理员 - 社会页面
    ['get', { path: '/admin/socialResponsibility', c: 'view.admin.socialResponsibility', middlewares: [auth(2)] }],
    // 管理员 - 新闻页面
    ['get', { path: '/admin/news', c: 'view.admin.news', middlewares: [auth(2)] }],
    // 管理员 - 联系我们
    ['get', { path: '/admin/contact', c: 'view.admin.contact', middlewares: [auth(2)] }],
    // 管理员 - 投资文件
    ['get', { path: '/admin/info', c: 'view.admin.info', middlewares: [auth(2)] }],
    // 管理员 - 上传新文件 - 新增文件页面
    ['get', { path: '/admin/info/cu', c: 'view.admin.infoCU', middlewares: [auth(2)] }],
    // 管理员 - 投资文件 - 上传新文件 - 保存
    ['post', { path: '/banner/file', c: 'banner.index.updateFileBanner', middlewares: [auth(2)] }],
    // 管理员 - 用户管理页面
    ['get', { path: '/admin/user', c: 'view.admin.user', middlewares: [auth(2)] }],
    // 管理员 - 用户管理 - 新增用户页面
    ['get', { path: ['/admin/user/create', '/admin/user/detail'], c: 'view.admin.userDetail', middlewares: [auth(2)] }],
    // 管理员 - 用户管理 - 新增用户（新）
    ['post', { path: '/user', c: 'user.index.signUp', middlewares: [auth(2)] }],
    // 管理员 - 用户管理 - 修改用户信息
    ['put', { path: '/user', c: 'user.index.update', middlewares: [auth(2)] }],
    // 管理员 - 获取用户列表
    ['get', { path: '/users', c: 'user.index.list', middlewares: [auth(2)] }],
    // 管理员 - 如何录入
    ['get', { path: '/admin/doc', c: 'view.admin.doc', middlewares: [auth(2)] }],
    // 管理员 - 新增 banner 数据页面
    ['get', { path: '/admin/banner', c: 'view.admin.banner', middlewares: [auth(2)] }],
    // 管理员 - 新增 banner 数据
    ['post', { path: '/banner', c: 'banner.index.index', middlewares: [auth(2)] }],
    // 管理员 - 修改 banner 数据
    ['put', { path: '/banner', c: 'banner.index.update', middlewares: [auth(2)] }],
    // 管理员 - banner 图片上传
    ['post', { path: '/banner/upload', c: 'banner.index.upload', middlewares: [auth(2)] }],
    // 管理员 - 投资文件 - 上传新文件 - 文件上传
    ['post', { path: '/file/upload', c: 'file.index.upload', middlewares: [auth(2)] }],
    // 投资人 - 投资文件下载
    ['get', { path: '/file/download', c: 'file.index.download', middlewares: [auth(3)] }],
    // 管理员 - 投资文件 - 上传新文件 - 文件更新
    ['put', { path: '/banner/file', c: 'banner.index.updateFileBanner', middlewares: [auth(2)] }],
    // 投资人登录
    ['post', { path: '/login', c: 'user.index.userLogin' }],
    // 管理员登录
    ['post', { path: '/admin/login', c: 'user.index.adminLogin' }],
    // 暂时不使用 sms
    // ['post', { path: '/sms', c: 'user.index.sms' }],
    // 管理员 - 投资文件 - 权限设置页面
    ['get', { path: '/banner/authority', c: 'banner.index.getAuthorityUsers', middlewares: [auth(2)] }],
    // 管理员 - 投资文件 - 权限设置
    ['put', { path: '/banner/authority', c: 'banner.index.updateAuthority', middlewares: [auth(2)] }]
  ].forEach(obj => {
    const [method, { path, c, middlewares }] = obj
    const controllPath = c.split('.').reduce((prev, curt) => prev[curt], controller)

    ;(Array.isArray(path) ? path : [path]).forEach((el) => {
      router[method](
        el.startsWith('/') ? el : `/${el}`,
        ...(
          Array.isArray(middlewares)
            ? middlewares.concat(controllPath)
            : [controllPath]
        )
      )
    })
  })
}
