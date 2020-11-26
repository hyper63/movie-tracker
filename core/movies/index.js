// As a User I want to
// list the movies I watched
// rank them
// add a new movie to the list
// remove a movie from the list
// document when I watched a movie
// and provide comments of the experience
const { map, prop, set, lensProp, assoc } = require('ramda')
const { Async } = require('crocks')
const schema = require('./schema')
const slugify = (title, year) => `${title.toLowerCase().replace(' ', '-')}-${year}`
module.exports = ({movies}) => {
  function list(startkey, limit=10) {
    return movies.list({startkey, limit})
      .map(prop('docs'))
      .map(map(schema))
  }

  function add(movie) {
    return Async.of(movie)
      .map(set(lensProp('id'), slugify(movie.title, movie.year)))
      .map(assoc('type', 'movie'))
      .map(r => { console.log(r); return r;})
      .map(schema) // should consider safeParse and Either
      .chain(movie => movies.create(movie))
      // validate response

  }

  return Object.freeze({
    list,
    add,
    /*
    rank,
    remove,
    log
    */
  })
}