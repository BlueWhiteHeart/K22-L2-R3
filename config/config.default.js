// exports.validate = {
//   // convert: false,
//   // validateRoot: false,
// };

const pageInfos = require('./page.conf')

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_CMS'

  config.security = {
    csrf: {
      enable: false
    }
  }

  config.pageInfos = pageInfos

  config.view = {
    mapping: {
      '.pug': 'pug'
    }
  }

  config.pug = {}

  // 启用 file 模式
  config.multipart = {
    // 接收文件的大小
    fileSize: '50mb',
    // 允许接收的文件类型
    fileExtensions: [
      '.pdf',
      '.txt',
      '.xlsx',
      '.doc',
      '.docx'
    ]
  }

  // 配置 alinode
  config.alinode = {
    enable: true,
    appid: '87051',
    secret: '43f91bddfa488e4ade87f67915f78a640e6593c6'
  }

  return config
}
