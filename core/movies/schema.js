const z = require('zod')

module.exports = function (data) {
  const schema = z.object({
    id: z.string(),
    type: z.string(),
    title: z.string(),
    year: z.string(),
    rating: z.string(),
    log: z.array(
      z.object({
        date: z.string(),
        comments: z.string()
      })
    ),
    genre: z.array(z.string()),
    rank: z.string()
  })
  return schema.parse(data)
}