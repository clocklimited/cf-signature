var assert = require('assert')
  , signUri = require('../uri')
  , mockdate = require('mockdate')

describe('cf-signature', function () {

  describe('#signUri()', function () {

    it('should correctly sign URL', function () {

      mockdate.set('2000-01-01')
      var key = 'api-key'
        , uri = '/contacts/recent'
        , ttl = 6000
        , id = 'bb0ff34c3ab9c2a478cb7b8b61139a78'
        , signature = signUri(uri, key, id, ttl)

      assert.equal(signature
        , '/contacts/recent?authorization=bb0ff34c3ab9c2a478cb7b8b61139a78' +
          '%3AKOwpBZlLVv1rKV%2BZ5uCRpqGiDr4%3D&x-cf-date=946684800000')

      mockdate.reset('2000-01-01')

    })

    it('should correctly sign URL with existing querystring', function () {

      mockdate.set('2000-01-01')
      var key = 'api-key'
        , uri = '/contacts/recent?page=5'
        , ttl = 6000
        , id = 'bb0ff34c3ab9c2a478cb7b8b61139a78'
        , signature = signUri(uri, key, id, ttl)

      assert.equal(signature
        , '/contacts/recent?page=5&authorization=bb0ff34c3ab9c2a478cb7b8b61139a78' +
          '%3AtGAyifmmCoxQ5JkGXlybQ0g3Pic%3D&x-cf-date=946684800000')

      mockdate.reset('2000-01-01')

    })

    it('should not require TTL', function () {

      mockdate.set('2000-01-01')
      var key = 'api-key'
        , uri = '/contacts/recent'
        , id = 'bb0ff34c3ab9c2a478cb7b8b61139a78'
        , signature = signUri(uri, key, id)

      assert.equal(signature
        , '/contacts/recent?authorization=bb0ff34c3ab9c2a478cb7b8b61139a78' +
          '%3A66CLLtXnihhP4NEhKSL%2FuZ3caEs%3D&x-cf-date=946684800000')

      mockdate.reset('2000-01-01')

    })

    it('should require [ id ]', function () {

      var key = 'api-key'
        , uri = '/contacts/recent'
      assert.throws(function() {
        signUri(uri, key)
      }, /id is required/)

    })

    it('should require [ key ]', function () {

      var uri = '/contacts/recent'
      assert.throws(function() {
        signUri(uri)
      }, /key is required/)

    })

    it('should require [ uri ]', function () {

      assert.throws(function() {
        signUri()
      }, /uri is required/)

    })

  })
})
