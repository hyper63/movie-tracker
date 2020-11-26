const createRequest = require('./async-req')
const qs = require('querystring')
const { Async } = require('crocks')
const fetch = require('node-fetch')

/**
 * @param {string} host = provide the host url for hyper63 service
 * @param {string} client - provide unique string representing this client app
 * @param {string} secret - provide a shared secret used to sign the jwt 
 * @param {string} app - app name
 * @returns {Async}
 */
module.exports = (host, client, secret, app) => 
  Async.of(createRequest(fetch, client,secret))
    // data should be idempotent when creating databases -tnw
    //.chain($ => $.put(`${host}/data/${app}`).map(() => $))
    .chain($ => $.put(`${host}/cache/${app}`).map(() => $))
    
  // .chain($ => //$.put(`${host}/data/${app}`)
  //     Async.all([
  //       $.put(`${host}/data/${app}`),
  //       $.put(`${host}/cache/${app}`)
  //     ]).map(() => $)
  //   )
    .map($ => ({
      cache: {
        query: pattern => $.get(`${host}/cache/${app}?${qs.stringify({pattern: pattern || '*'})}`),
        post: doc => $.post(`${host}/cache/${app}`, doc),
        get: id => $.get(`${host}/cache/${app}/${id}`),
        put: doc => $.put(`${host}/cache/${app}/${doc.id}`, doc),
        remove: id => $.remove(`${host}/cache/${app}/${id}`)
      },
      data: {
        query: (criteria) => $.post(`${host}/data/${app}/_query`, criteria),
        list: (options) => $.get(`${host}/data/${app}${options ? '?' + qs.stringify(options) : ''}`),
        get: (id) => $.get(`${host}/data/${app}/${id}`),
        create: (doc) => $.post(`${host}/data/${app}`, doc),
        update: (id, doc) => $.put(`${host}/data/${app}/${id}`, doc),
        remove: (id) => $.remove(`${host}/data/${app}/${id}`)
      }
    }))  

