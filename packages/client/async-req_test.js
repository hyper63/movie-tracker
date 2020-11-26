const test = require('tape')
const fetchMock = require('fetch-mock')

const createRequest = require('./async-req.js')

const fetch = fetchMock.sandbox().put('http://localhost:6363/cache/foo', {ok: true})

test('create cache', t => {
  t.plan(1)
  const $ = createRequest(fetch, 'test', 'secret')
  $.put(`http://localhost:6363/cache/foo`)
   .fork(
     e => {
       t.ok(false)
     },
     r => {
       t.ok(true)
     }
   )
})