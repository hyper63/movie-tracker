// this can be done in middleware
const initServices = require('../services')
const initCore = require('../core')

const fork = (res, m) => m.fork(
  error => res.status(500).send({ error: error.message }),
  result => res.send(result)
)

module.exports = async ({method, query, body}, res) => {
  const services = await initServices({
    host: process.env.HOST,
    client: process.env.CLIENT,
    secret: process.env.SECRET,
    app: process.env.APP
  }).catch(err => {
    console.log(err);
    return ({ error: err.error }) 
  })
  if (services.error) {
    return res.status(500).send({error: services.error})
  }
  console.log(services)
  // inject services into core and get
  // movies business logic
  const {movies} = initCore(services)
  
  // GET /api/movies => []
  if (method === 'GET') {
    fork(res, movies.list(query.key))
  // POST /api/movies => {ok: true}
  } else if (method === 'POST') {
    fork(res, movies.add(body))
  }
}