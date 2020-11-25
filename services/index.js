const createHyper63 = require('@hyper63/client')

module.exports = function ({host, client, secret, app}) {
  const hyper63 = createHyper63(host, client, secret, app)
  return hyper63.map(services => ({
    movies: {
      list({startkey, limit}) {
        return services.data.query({
          selectors: {
            type: 'movie',
            id: {
              '$gt': startkey
            }
          },
          limit
        }) 
      }
    },
    accounts: {
      list() {
        return services.data.query({
          selectors: {
            type: 'account'
          }
        })
      }
    }
  }))

  /*
  const movies = () => {
    function list({startkey, limit}) {
      return services.data.query({
        selectors: {
          type: 'movie',
          id: {
            '$gt': startkey
          }
        },
        limit
      })
    }
    return {
      list,
      create,
      get,
      update,
      remove
    }
  }

  function accounts() {
    return {

    }
  }
  return { movies: movies(), accounts: accounts() }
  */
}