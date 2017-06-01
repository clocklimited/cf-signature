var assert = require('assert')
var signUri = require('../uri')
var mockdate = require('mockdate')

describe('cf-signature', function () {
  describe('#signUri()', function () {
    it('should correctly sign URL', function () {
      mockdate.set('2000-01-01')
      var key = 'api-key'
      var uri = '/contacts/recent'
      var ttl = 6000
      var id = 'bb0ff34c3ab9c2a478cb7b8b61139a78'
      var signature = signUri(uri, key, id, ttl)

      assert.equal(signature,
        '/contacts/recent?authorization=bb0ff34c3ab9c2a478cb7b8b61139a78' +
        '%3A0zZoWhwVEp2xpq8cx7EZgCjcqLxS6BUVONnO6m1qoTA%3D&x-cf-date=946684800000')

      mockdate.reset('2000-01-01')
    })

    it('should correctly sign URL with existing querystring', function () {
      mockdate.set('2000-01-01')
      var key = 'api-key'
      var uri = '/contacts/recent?page=5'
      var ttl = 6000
      var id = 'bb0ff34c3ab9c2a478cb7b8b61139a78'
      var signature = signUri(uri, key, id, ttl)

      assert.equal(signature
        , '/contacts/recent?page=5&authorization=bb0ff34c3ab9c2a478cb7b8b61139a78' +
          '%3Ac%2FI5Tnm74Zel%2Bn7uPiUJCvZ7szrXeI7vwEaj79nKqwE%3D&x-cf-date=946684800000')

      mockdate.reset('2000-01-01')
    })

    it('should not require TTL', function () {
      mockdate.set('2000-01-01')
      var key = 'api-key'
      var uri = '/contacts/recent'
      var id = 'bb0ff34c3ab9c2a478cb7b8b61139a78'
      var signature = signUri(uri, key, id)

      assert.equal(signature,
        '/contacts/recent?authorization=bb0ff34c3ab9c2a478cb7b8b61139a78' +
        '%3ADM99KQjmJS2Z9oxAlDYw12dQSb%2Boem%2Fc3aQG%2FH4dBvo%3D&x-cf-date=946684800000')

      mockdate.reset('2000-01-01')
    })

    it('should require [ id ]', function () {
      var key = 'api-key'
      var uri = '/contacts/recent'
      assert.throws(function () {
        signUri(uri, key)
      }, /id is required/)
    })

    it('should require [ key ]', function () {
      var uri = '/contacts/recent'
      assert.throws(function () {
        signUri(uri)
      }, /key is required/)
    })

    it('should require [ uri ]', function () {
      assert.throws(function () {
        signUri()
      }, /uri is required/)
    })
  })
})
