# cap-cms

## [项目说明](https://www.yuque.com/lanbaixin/xuqmuw/qrgbai)

* 项目编号: K22-L2-R3
* 项目名称: 企业官网配置平台
* 项目说明: 实现企业官网的 Banner/新闻管理发布
* 项目技术栈说明: Node.js + Egg.js + MongoDB + React + DraftJS + Webpack

---
## 使用说明
#### 数据库初始化

安装并配置好 MySQL 数据库环境以后，可使用 `/sql` 目录下 4 个数据库文件进行以下操作

* 创建数据表

* 插入初始化数据（测试用）

#### 安装依赖

``` sh
# install dependencies
npm install
```

---

#### 启动服务

``` sh
# start
npm run dev
```

#### 账号密码

> 投资人登录

* account：user

* password：12345

> 管理员登录 <http://localhost:7001/admin/login>

* account：admin

* password：12345

## 部署

#### 生产环境

```bash
npm start
npm stop
```

#### 开发环境

```bash
npm startdev
npm stopdev
```

## npm scripts

* `npm run lint` 代码风格检查
* `npm test` 本地单元测试与代码风格检查
* `npm run autod` 自动检测依赖升级
* `npm run debug` 断点调试
* `npm run cov` 测试覆盖率
* `npm run pkgfiles` 在发布前自动生成 pkg.files

## 项目设计

#### 数据模型及数据配置

本项目数据模型及数据配置，可参考 `/docs` 目录下 《模型设计与数据配置.md》


## [项目里程碑]

#### 里程碑 1 - 项目初始化

> 环境搭建，项目启动

* 完成项目环境搭建
* 完成项目目录结构初始化
* 项目可启动

> 注意事项

* 项目目录结构拆分合理
* 可访问 "/" 首页

#### 里程碑 2 - 表设计/数据服务

> 完成数据服务环境搭建与业务表设计

* 完成本地 MySQL 环境搭建与服务配置
* 完成语雀文库数据服务配置
* 完成阿里云 OSS 数据服务配置
* 完成用户、页面配置相关数据表设计
* 完成路由配置

  * 可切换中英文页面
  * 企业官网的访问与子页面访问
  * 企业后台的访问与子页面访问

* 完成 投资人/管理员/超级管理员 登录功能

  * 因为并不开放用户注册，登录可使用数据库已配置的用户数据

> 注意事项

* 表设计合理
* 路由配置完成，页面具体展现内容使用伪数据即可

  * 可切换中英文页面
  * 企业官网访问

    * 导航可渲染出数据库配置可视的页面
    * 各页面跳转正常

  * 企业后台访问，各页面跳转正常
  * 投资人页访问

* 用户可登录

  * 投资人 可登录、登出

    * 可访问企业官网
    * 可访问投资人页
    * 登出访问首页

  * 管理员/超级管理员  可登录、登出

    * 可访问企业后台
    * 登出访问首页

#### 里程碑 3 - 企业后台开发

> 完成后台页面及功能开发

* 完成后台页面的开发
* 完成页面数据配置相关功能

  * 配置数据页面展示
  * 新增、删除、编辑、查询、关联语雀文章

* 完成投资文件相关功能

  * 投资文件数据页面展示
  * 新增、编辑、查询、预览、下载、设置可见用户权限

* 完成用户管理相关功能

  * 用户信息展示
  * 新增、编辑

* 完成录入提示页的开发

> 注意事项

* 后台页面开发完成
* 页面数据配置相关功能完成
* 投资文件相关功能完成
* 用户管理相关功能完成
* 录入提示页的开发完成

#### 里程碑 4 - 企业官网/投资人页开发

> 要求

* 完成企业官网页面的开发

  * 完成各页面所需配置模块的渲染

* 完成投资人页的开发

  * 完成投资人页配置模块的渲染
  * 完成投资文件的展示、预览、下载

> 注意事项

* 企业官网开发完成
* 投资人页及功能开发完成

## License

ISC
