var assert = require('assert')
  , sign = require('..')

describe('cf-signature', function () {
  var date = (new Date()).toUTCString()
    , apiKey = 'api-key'

  it('should normalize multiple foot mark (\')', function (done) {
    var unescapedUri = '/path/with/\'/\'/\'/'
      , escapedUri = '/path/with/%27/%27/%27/'
      , unescapedHash = sign(apiKey, 'GET', '', date, unescapedUri)
      , escapedHash = sign(apiKey, 'GET', '', date, escapedUri)

    assert.equal(unescapedHash, escapedHash)
    done()
  })

  it('should normalize multiple space escape sequence (+)', function (done) {
    var unescapedUri = '/path/with/+/+/+/'
      , escapedUri = '/path/with/%20/%20/%20/'
      , unescapedHash = sign(apiKey, 'GET', '', date, unescapedUri)
      , escapedHash = sign(apiKey, 'GET', '', date, escapedUri)

    assert.equal(unescapedHash, escapedHash)
    done()
  })

})
