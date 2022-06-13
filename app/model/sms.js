module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize

  const SMS = app.model.define('sms', {
    code: STRING,           // 类型, 对应 type 表里的 id
    mobile: STRING,         // 手机号
    ip: STRING,             // 访问 ip
    type: STRING,           // 短信用途类型
    state: {                // 是否有效 - 0: 无效, 1: 有效
      type: INTEGER,
      validate: {
        isIn: [[0, 1]]
      },
      defaultValue: 1
    },
  }, {
    underscored: true
  })

  SMS.sync()

  return SMS
}
