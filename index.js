module.exports = sign

var crypto = require('crypto')

function sign (key, method, contentType, date, uri, ttl) {
  if (key === undefined) throw new Error('key is required')
  if (method === undefined) throw new Error('method is required')
  if (uri === undefined) throw new Error('uri is required')
  var hmac = crypto.createHmac('sha256', key)
  var uriNormalized = normalize(uri)
  var packet = method + '\n' + contentType + '\n' + date + '\n' + uriNormalized

  if (ttl) packet += '\n' + ttl
  return hmac.update(packet).digest('base64')
}

function normalize (uri) {
  return uri.replace(/\+/g, '%20').replace(/'/g, '%27')
}
