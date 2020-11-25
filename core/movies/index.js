// As a User I want to
// list the movies I watched
// rank them
// add a new movie to the list
// remove a movie from the list
// document when I watched a movie
// and provide comments of the experience
const { map, prop } = require('ramda')
const { Async } = require('crocks')
const schema = require('./schema')

module.exports = ({movies}) => {
  function list(startkey, limit=10) {
    return movies.list({startkey, limit})
      .map(prop('docs'))
      .map(map(schema))
  }

  return Object.freeze({
    list,
    add,
    rank,
    remove,
    log
  })
}