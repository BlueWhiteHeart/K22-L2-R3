module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const Type = app.model.define('types', {
    // 轮播图片类型
    // 1.首页主轮播 2.关于我们 3.项目BP
    // 4.团队主题图 5.团队成员板块
    // 6.被投公司主题图 7.高科技类型 8.消费升级类型 
    // 9.现代教育类型 10.金融创新类型 11.文化媒体类型
    // 12.社会责任主题图 13.社会责任内容板块
    // 14.创智主题图 15.创智内容板块
    // 16.公益主题图 17.公益内容板块
    // 18.在行主题图 19.在行内容板块
    // 20.新闻主轮播 21.新闻最新板块 22.新闻推荐板块
    // 23.联系主题图 24.联系定位图 25.健康医疗
    id: {
      type: INTEGER,
      primaryKey: true
    },
    description: STRING,
    description_en: STRING
  }, {
    underscored: true
  })

  return Type
}
