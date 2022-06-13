create database cms_dev;

use cms_dev;

--- 创建页面模块类型表

create table `types`(
  `id` int not null auto_increment,
  `description` varchar(225) default null comment '模块名称',
  `description_en` varchar(225) default null comment '模块名称（英）',
  `created_at` datetime default NULL comment '创建时间',
  `updated_at` datetime default NULL comment '更新时间',
  primary key(`id`)
)engine=InnoDB auto_increment=1 default charset=utf8 comment='页面模块类型表';


--- 插入页面模块类型数据

INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('1', '首页主轮播');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('2', '关于我们');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('3', '项目BP');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('4', '团队主题图');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('5', '团队成员板块');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('6', '被投公司主题图');
INSERT INTO `cms_dev`.`types` (`id`, `description`, `description_en`) VALUES ('7', '高科技类型', 'Technology');
INSERT INTO `cms_dev`.`types` (`id`, `description`, `description_en`) VALUES ('8', '消费升级类型', 'Consumption Integration');
INSERT INTO `cms_dev`.`types` (`id`, `description`, `description_en`) VALUES ('9', '现代教育类型', 'Education');
INSERT INTO `cms_dev`.`types` (`id`, `description`, `description_en`) VALUES ('10', '金融创新类型', 'FinTech');
INSERT INTO `cms_dev`.`types` (`id`, `description`, `description_en`) VALUES ('11', '文化媒体类型', 'Culture & Media');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('12', '社会责任主题图');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('13', '社会责任内容板块');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('14', '创智主题图');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('15', '创智内容板块');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('16', '公益主题图');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('17', '公益内容板块');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('18', '在行主题图');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('19', '在行内容板块');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('20', '新闻主轮播');
INSERT INTO `cms_dev`.`types` (`id`, `description`, `description_en`) VALUES ('21', '最新', 'Newest');
INSERT INTO `cms_dev`.`types` (`id`, `description`, `description_en`) VALUES ('22', '推荐', 'Highlight');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('23', '联系主题图');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('24', '联系定位图-pc');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('25', '健康医疗');
INSERT INTO `cms_dev`.`types` (`id`, `description`, `description_en`) VALUES ('26', '快讯', 'notice');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('27', '其他新闻主题图');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('28', '其他新闻板块');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('29', '地图-pc');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('30', '地图-mobile');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('31', '联系定位图-mobile');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('32', '投资人主题图');
INSERT INTO `cms_dev`.`types` (`id`, `description`, `description_en`) VALUES ('33', '选项一', '选项一');
INSERT INTO `cms_dev`.`types` (`id`, `description`, `description_en`) VALUES ('34', '选项二', '选项二');
INSERT INTO `cms_dev`.`types` (`id`, `description`, `description_en`) VALUES ('35', '选项三', '选项三');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('36', '团队-icon1');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('37', '团队-logo');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('38', '团队-icon2');
INSERT INTO `cms_dev`.`types` (`id`, `description`) VALUES ('39', '投资人页快讯');

