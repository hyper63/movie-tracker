const movies = require('./movies')
module.exports = function (services) {
  return {
    movies: movies(services)
  }
}