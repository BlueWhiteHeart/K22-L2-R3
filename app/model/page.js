module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const Page = app.model.define('pages', {
    id: {
      type: INTEGER,
      primaryKey: true
    },
    name: STRING,       // 页面名称
    name_en: STRING,    // 页面名称（英文）
    title: {            // 页面 title (用于 SEO)
      type: STRING,
      defaultValue: ''
    },
    path: {             // 访问路径
      type: STRING,
      defaultValue: '/'
    },
    keywords: {         // 页面 keywords (用于 SEO)
      type: STRING,
      defaultValue: ''
    },
    description: {      // 页面 description (用于 SEO)
      type: STRING,
      defaultValue: ''
    },
    parent_id: INTEGER, // 父级页面 id, 用于 tab
    banner_types: {     // 可拥有的 banner type, 以 , 分隔的字符串
      type: STRING,
      defaultValue: ''
    },
    visible: {          // 是否为可见导航 - 0.不可见, 1.可见
      type: INTEGER,
      defaultValue: 1
    }
  }, {
    underscored: true
  })

  return Page
}
