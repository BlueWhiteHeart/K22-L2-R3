module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const User = app.model.define('users', {
    account: STRING,        // 账号
    password: STRING,       // 密码
    mobile: STRING,         // 联系方式
    email: STRING,          // 邮箱
    name: STRING,           // 姓名
    level: {                // 角色权限等级 - 1: 超级管理员, 2: 管理员, 3: 投资人
      type: INTEGER,
      validate: {
        isIn: [[1, 2, 3]]
      },
      defaultValue: 2
    },
    avatar: {               // 头像地址
      type: STRING,
      validate: {
        isUrl: true
      }
    },
    status: {               // 账号状态 - 0: 待审核, 1: 已激活, 2: 已冻结
      type: INTEGER,
      validate: {
        isIn: [[0, 1, 2]]
      },
      defaultValue: 0
    },
    last_sign_in_at: DATE   // 上次登录时间
  }, {
    underscored: true
  })

  return User
}
