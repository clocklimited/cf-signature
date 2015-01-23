var assert = require('assert')
  , createSignature = require('../index.js')

describe('cf-signature', function () {
  var date = (new Date()).toUTCString()
    , apiKey = 'api-key'

  it('should normalize foot mark (\')', function (done) {
    var unescapedUri = '/path/with/\'/'
      , escapedUri = '/path/with/%27/'
      , unescapedHash = createSignature(apiKey, 'GET', '', date, unescapedUri)
      , escapedHash = createSignature(apiKey, 'GET', '', date, escapedUri)

    assert.equal(unescapedHash, escapedHash)
    done()
  })

  it('should normalize space escape sequence (+)', function (done) {
    var date = (new Date()).toUTCString()
      , unescapedUri = '/path/with/+/'
      , escapedUri = '/path/with/%20/'
      , unescapedHash = createSignature(apiKey, 'GET', '', date, unescapedUri)
      , escapedHash = createSignature(apiKey, 'GET', '', date, escapedUri)

    assert.equal(unescapedHash, escapedHash)
    done()
  })

})
