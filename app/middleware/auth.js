module.exports = (level) => {
  return async function (ctx, next) {
    const { session } = ctx
    if (!session || !session.user) {
      return ctx.redirect(level === 3 ? '/login' : '/admin/login')
    } else {
      if (level && level >= session.user.level) {
        await next()
      } else {
        return (
          ctx.body = {
            success: false,
            errMsg: '权限不足'
          }
        )
      }
    }
  }
}
