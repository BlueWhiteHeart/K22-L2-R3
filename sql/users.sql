create database cms_dev;

use cms_dev;

--- 创建用户表

create table `users`(
  `id` int not null auto_increment,
  `account` varchar(45) not null comment '用户名',
  `password` varchar(45) default null comment '密码',
  `mobile` varchar(45) default null comment '电话',
  `email` varchar(45) default null comment '邮箱',
  `name` varchar(45) default null comment '姓名',
  `level` int default 2 comment '角色权限等级：1 超级管理员；2 管理员；3 投资人',
  `avatar` varchar(255) default null comment '头像地址',
  `status` int default 0 comment '账号状态：0 待审核；1 已激活；2 已冻结',
  `last_sign_in_at` datetime default null comment '最后登录时间',
  `created_at` datetime default NULL comment '创建时间',
  `updated_at` datetime default NULL comment '更新时间',
  primary key(`id`)
)engine=InnoDB auto_increment=1 default charset=utf8 comment='用户表';

-- 插入用户数据

INSERT INTO `cms_dev`.`users` (`id`, `account`, `password`, `mobile`, `email`, `name`, `level`, `status`) VALUES ('1', 'admin', '827ccb0eea8a706c4c34a16891f84e7b', '13212341234', 'test@mail.com', '管理员', '2', '1');
INSERT INTO `cms_dev`.`users` (`id`, `account`, `password`, `mobile`, `email`, `name`, `level`, `status`) VALUES ('2', 'user', '827ccb0eea8a706c4c34a16891f84e7b', '13212341234', 'test@mail.com', 'xx 投资人', '3', '1');