;[
  ['get', { path: ['/', '/en'], c: 'view.index.index' }],
  ['get', { path: ['/team', '/en/team'], c: 'view.index.team' }],
  ['get', { path: ['/company', '/en/company'], c: 'view.index.company' }],
  ['get', { path: ['/socialResponsibility', '/en/socialResponsibility'], c: 'view.index.socialResponsibility' }],
  ['get', { path: ['/socialResponsibility/createWisdom', '/en/socialResponsibility/createWisdom'], c: 'view.index.createWisdom' }],
  ['get', { path: ['/socialResponsibility/publicWelfare', '/en/socialResponsibility/publicWelfare'], c: 'view.index.publicWelfare' }],
  ['get', { path: ['/socialResponsibility/beas', '/en/socialResponsibility/beas'], c: 'view.index.beas' }],
  ['get', { path: ['/detail', '/en/detail'], c: 'view.index.detail' }],
  ['get', { path: ['/news', '/en/news'], c: 'view.index.news' }],
  ['get', { path: ['/contact', '/en/contact'], c: 'view.index.contact' }],
  ['get', { path: ['/admin/login'], c: 'view.index.adminLogin' }],
  ['get', { path: ['/logout'], c: 'user.index.logout' }],
  ['get', { path: ['/info', '/en/info'], c: 'view.index.info' }],
  ['get', { path: '/admin/home', c: 'view.admin.home'}],
  ['get', { path: '/admin/team', c: 'view.admin.team'}],
  ['get', { path: '/admin/company', c: 'view.admin.company'}],
  ['get', { path: '/admin/socialResponsibility', c: 'view.admin.socialResponsibility'}],
  ['get', { path: '/admin/news', c: 'view.admin.news'}],
  ['get', { path: '/admin/user', c: 'view.admin.user'}],
  ['get', { path: '/admin/info', c: 'view.admin.info'}],
  ['get', { path: ['/admin/user/create', '/admin/user/detail'], c: 'view.admin.userDetail'}],
  ['get', { path: '/admin/doc', c: 'view.admin.doc'}],
  ['get', { path: '/admin/contact', c: 'view.admin.contact'}],
  ['get', { path: '/admin/banner', c: 'view.admin.banner'}],
  ['get', { path: '/admin/info/cu', c: 'view.admin.infoCU'}],
  ['post', { path: '/banner', c: 'banner.index.index'}],
  ['post', { path: '/banner/file', c: 'banner.index.updateFileBanner'}],
  ['post', { path: '/banner/upload', c: 'banner.index.upload'}],
  ['post', { path: '/file/upload', c: 'file.index.upload'}],
  ['get', { path: '/file/download', c: 'file.index.download'}],
  ['put', { path: '/banner', c: 'banner.index.update'}],
  ['put', { path: '/banner/file', c: 'banner.index.updateFileBanner'}],
  ['post', { path: '/user', c: 'user.index.signUp'}],
  ['post', { path: '/login', c: 'user.index.userLogin' }],
  ['post', { path: '/admin/login', c: 'user.index.adminLogin' }],
  ['post', { path: '/sms', c: 'user.index.sms' }],
  ['put', { path: '/user', c: 'user.index.update'}],
  ['get', { path: '/users', c: 'user.index.list'}],
  ['put', { path: '/banner/authority', c: 'banner.index.updateAuthority'}],
  ['get', { path: '/banner/authority', c: 'banner.index.getAuthorityUsers'}]
].forEach(obj => {
  const [method, { path, c }] = obj
  // banner.index.getAuthorityUsers.
  const controllPath = c.split('.').reduce((prev, curt) => {
    console.log('prev: ' + prev)
    console.log('curt: ' + curt)
  })

  console.log('controllPath:' + controllPath)
  // ;(Array.isArray(path) ? path : [path]).forEach((el) => {
  //   router[method](
  //     el.startsWith('/') ? el : `/${el}`,
  //     ...(
  //       Array.isArray(middlewares)
  //         ? middlewares.concat(controllPath)
  //         : [controllPath]
  //     )
  //   )
  // })
})