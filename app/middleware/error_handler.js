module.exports = () => {
  return async function (ctx, next) {
    try {
      await next()
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx)
      const status = err.status || 500

      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const errMsg = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        success: false,
        errMsg
      }
      if (status === 422) {
        try {
          const errs = (
            Array.isArray(err.errors) ? err.errors : [err.errors]
          ).reduce((prev, curt) => {
            const { message, field } = curt
            return prev + `${field}: ${message}; `
          }, '')
          ctx.body.errMsg = `字段不合法: ${errs}`
        } catch (err) {
          ctx.body.errMsg = '字段不合法'
        }
      }
      ctx.status = status
    }
  }
}
