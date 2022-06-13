module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize

  const Banner = app.model.define('banner', {
    type: INTEGER,          // 类型, 对应 type 表里的 id
    title: TEXT,            // 主标题
    title_en: TEXT,
    subtitle: TEXT,         // 副标题
    subtitle_en: TEXT,
    content: TEXT,          // 内容
    content_en: TEXT,
    description: TEXT,      // 描述介绍
    description_en: TEXT,   // 描述介绍
    content_origin: {       // 中文内容来源, 1: 后台配置, 2. 语雀
      type: INTEGER,
      defaultValue: 1
    },
    content_origin_id: {    // 来源 id
      type: INTEGER,
      allowNull: true
    },
    content_en_origin: {       // 英文内容来源, 1: 后台配置, 2. 语雀
      type: INTEGER,
      defaultValue: 1
    },
    content_en_origin_id: {    // 来源 id
      type: INTEGER,
      allowNull: true
    },
    status: {               // 轮播状态 - 0: 已下线, 1: 展示中
      type: INTEGER,
      validate: {
        isIn: [[0, 1]]
      },
      defaultValue: 1
    },
    url: {                  // 图片地址
      type: STRING,
      defaultValue: ''
    },
    url_en: {               // 英文版图片地址
      type: STRING,
      defaultValue: ''
    },
    href: {                 // 点击跳转地址
      type: STRING
    },
    icon: {                 // 小图标地址
      type: STRING
    },
    authority: TEXT         // 可看权限的用户 id 集合
  }, {
    underscored: true
  })

  return Banner
}
