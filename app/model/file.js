module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize

  const File = app.model.define('file', {
    title: TEXT,            // 标题
    description: TEXT,      // 说明
    url: {                  // 链接地址
      type: STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    underscored: true
  })

  return File
}
