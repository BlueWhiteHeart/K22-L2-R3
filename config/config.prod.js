// const { Op } = require('sequelize')

exports.sequelize = {
  dialect: 'mysql',
  database: 'cms_dev',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: '12345678'
  // operatorsAliases: Op,
  // dialectOptions: {
  //   socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
  // }
}

exports.yuque = {
  token: '',
  repoId: '324592'
}
