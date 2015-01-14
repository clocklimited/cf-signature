var crypto = require('crypto')

module.exports = function createSignature(key, method, contentType, date, path, ttl) {
  var hmac = crypto.createHmac('sha1', key)
    , packet = method + '\n' + contentType + '\n' + date + '\n' + path
  if (ttl) packet += '\n' + ttl
  return hmac.update(packet).digest('base64')
}
