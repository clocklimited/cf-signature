var assert = require('assert')
var sign = require('..')

describe('cf-signature', function () {
  var date = (new Date()).toUTCString()
  var apiKey = 'api-key'

  it('should normalize multiple foot mark (\')', function (done) {
    var unescapedUri = '/path/with/\'/\'/\'/'
    var escapedUri = '/path/with/%27/%27/%27/'
    var unescapedHash = sign(apiKey, 'GET', '', date, unescapedUri)
    var escapedHash = sign(apiKey, 'GET', '', date, escapedUri)

    assert.equal(unescapedHash, escapedHash)
    done()
  })

  it('should normalize multiple space escape sequence (+)', function (done) {
    var unescapedUri = '/path/with/+/+/+/'
    var escapedUri = '/path/with/%20/%20/%20/'
    var unescapedHash = sign(apiKey, 'GET', '', date, unescapedUri)
    var escapedHash = sign(apiKey, 'GET', '', date, escapedUri)

    assert.equal(unescapedHash, escapedHash)
    done()
  })
})
