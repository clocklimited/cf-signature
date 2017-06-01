var url = require('url')
var sign = require('./')

function signUri (uri, key, id, ttl) {
  if (uri === undefined) throw new Error('uri is required')
  var date = Date.now()
  var hash = sign(key, 'GET', '', date, uri, ttl)
  var urlParts = url.parse(uri, true)

  if (id === undefined) throw new Error('id is required')

  // Clear search so query is used
  urlParts.search = null
  urlParts.query.authorization = id + ':' + hash
  urlParts.query['x-cf-date'] = date
  return url.format(urlParts)
}

module.exports = signUri
