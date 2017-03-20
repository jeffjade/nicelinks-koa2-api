export default async (ctx, next) => {
  const title = 'Nice Koa2 Blog-Api'

  await ctx.render('index', {
    title
  })
}
