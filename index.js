var crypto = require('crypto')

module.exports = function createSignature(key, method, contentType, date, path, ttl) {
  var hmac = crypto.createHmac('sha1', key)
    , pathNormalized = normalize(path)
    , packet = method + '\n' + contentType + '\n' + date + '\n' + pathNormalized

  if (ttl) packet += '\n' + ttl
  return hmac.update(packet).digest('base64')
}

function normalize(path) {
  return path.replace(/\+/g, '%20').replace(/\'/g, '%27')
}
