create database cms_dev;

use cms_dev;

--- 创建页面信息表

create table `pages`(
  `id` int not null auto_increment,
  `name` varchar(100) default null comment '页面名称',
  `name_en` varchar(100) default null comment '页面名称(英文)',
  `title` varchar(100) default null comment '页面 title - 用于 SEO',
  `path` varchar(100) default '/' comment '访问路径',
  `keywords` varchar(225) default null comment '页面关键词 - 用于 SEO',
  `description` varchar(225) default null comment '页面描述 - 用于 SEO',
  `parent_id` int default null comment '父级页面 id - 用于 tab',
  `banner_types` varchar(100) default null comment '可拥有的 banner type',
  `visible` int default 1 comment '是否为可见导航：0 不可见，1 可见',
  `created_at` datetime default NULL comment '创建时间',
  `updated_at` datetime default NULL comment '更新时间',
  primary key(`id`)
)engine=InnoDB auto_increment=1 default charset=utf8 comment='页面信息表';

-- 插入页面信息数据

INSERT INTO `cms_dev`.`pages` (`id`, `name`, `name_en`, `path`, `banner_types`, `visible`) VALUES ('1', '主页', 'Home', '/', '1,2,3,5,6,7,8,9,10,11,21,22,26', '1');
INSERT INTO `cms_dev`.`pages` (`id`, `name`, `name_en`, `path`, `banner_types`, `visible`) VALUES ('2', '关于我们', 'About Us', '/team', '4,5,36,37,38', '1');
INSERT INTO `cms_dev`.`pages` (`id`, `name`, `name_en`, `path`, `banner_types`, `visible`) VALUES ('3', '被投公司', 'Portfolio', '/company', '6,7,8,9,10,11', '1');
INSERT INTO `cms_dev`.`pages` (`id`, `name`, `name_en`, `path`, `banner_types`, `visible`) VALUES ('4', '社会责任', 'Social Resposibility', '/socialResponsibility', '12,13', '1');
INSERT INTO `cms_dev`.`pages` (`id`, `name`, `name_en`, `path`, `banner_types`, `visible`) VALUES ('5', '新闻', 'News', '/news', '20,21,22,26,27,28', '1');
INSERT INTO `cms_dev`.`pages` (`id`, `name`, `name_en`, `path`, `banner_types`, `visible`) VALUES ('6', '联系我们', 'Contact Us', '/contact', '23,24,29,30,31', '1');
INSERT INTO `cms_dev`.`pages` (`id`, `name`, `name_en`, `path`, `banner_types`, `visible`) VALUES ('7', '创智', 'Create Wisdom', '/socialResponsibility/createWisdom', '14,15', '0');
INSERT INTO `cms_dev`.`pages` (`id`, `name`, `name_en`, `path`, `banner_types`, `visible`) VALUES ('8', '公益', 'Public Welfare', '/socialResponsibility/publicWelfare', '16,17', '0');
INSERT INTO `cms_dev`.`pages` (`id`, `name`, `name_en`, `path`, `banner_types`, `visible`) VALUES ('9', '在行', 'Beas', '/socialResponsibility/beas', '18,19', '0');
INSERT INTO `cms_dev`.`pages` (`id`, `name`, `name_en`, `path`, `banner_types`, `visible`) VALUES ('10', '登录', 'Login', '/', '1', '0');
INSERT INTO `cms_dev`.`pages` (`id`, `name`, `name_en`, `path`, `banner_types`, `visible`) VALUES ('11', '投资人页', 'Info', '/info', '32,33,34,35,39', '0');
