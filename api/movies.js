// this can be done in middleware
const initServices = require('./services')
const initCore = require('./core')

const services = initServices({
  host: process.env.HOST,
  client: process.env.CLIENT,
  secret: process.env.SECRET,
  app: process.APP
})

const core = initCore(services)
const fork = (res, m) => m.fork(
  error => res.status(500).send({ error: error.message }),
  result => res.send(result)
)

module.exports = ({method, query}, res) => {
  if (method === 'GET') {
    fork(res, core.movies(query.key))
  }
}