const path = require('path')
const fs = require('fs')
const Sequelize = require('sequelize')
const R = require('ramda')
const { sequelize: conf } = require(`../../config/config.${process.env.NODE_ENV === 'production' ? 'prod' : 'local'}.js`)

const sequelize = new Sequelize(conf.database, conf.username, conf.password, {
  host: conf.host,
  port: conf.port,
  dialect: conf.dialect,
  operatorsAliases: false,
  // dialectOptions: {
  //   socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
  // },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const initDB = async function () {
  console.log('[DB INIT]: 开始读取模型文件!')
  const modelPath = path.resolve(__dirname, '../../app/model')
  const modelFiles = fs.readdirSync(modelPath)

  const models = R.map(
    R.compose(
      require,
      path.resolve.bind(null, modelPath)
    )
  )(modelFiles)
  console.log('[DB INIT]: 成功读取模型文件!')

  console.log('[DB INIT]: 开始导入数据!')

  for (let [index, model] of models.entries()) {
    const _m = model({
      Sequelize: Sequelize,
      model: sequelize
    })
    await _m.sync({ force: true })

    const dataPath = path.resolve(
      __dirname,
      path.basename(modelFiles[index], '.js') + '.json'
    )
    if (fs.existsSync(dataPath)) {
      await _m.bulkCreate(require(dataPath))
    }
  }

  console.log('[DB INIT]: 成功导入数据!')
  process.exit()
}

try {
  initDB()
} catch (err) {
  console.log('[DB INIT]: 数据库初始化失败!')
  console.log('[DB INIT]: 错误信息 - ' + err)
  process.exit(1)
}
