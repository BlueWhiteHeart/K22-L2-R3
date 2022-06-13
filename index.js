const egg = require('egg')

const workers = Number(process.argv[2] || require('os').cpus().length)
// 	os.cpus() 返回一个对象数组，包含所安装的每个 CPU/内核的信息

egg.startCluster({
  port: 8008,
  workers,
  baseDir: __dirname
})
