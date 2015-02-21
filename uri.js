module.exports = signUri
var sign = require('./')
  , url = require('url')
  , extend = require('lodash.assign')

function signUri(uri, key, id, ttl) {
  if (uri === undefined) throw new Error('uri is required')
  var date = Date.now()
    , hash = sign(key, 'GET', '', date, uri, ttl)
    , urlParts = url.parse(uri, true)

  if (id === undefined) throw new Error('id is required')

  // Clear search so query is used
  urlParts.search = null
  extend(urlParts.query
    , { authorization: id + ':' + hash
      , 'x-cf-date':  date
      })

  return url.format(urlParts)
}
