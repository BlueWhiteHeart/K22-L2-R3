module.exports = () => {
  return async function (ctx, next) {
    const { method, url } = ctx
    console.time(`${method} - ${url}`)
    await next()
    console.timeEnd(`${method} - ${url}`)
  }
}
