# cf-signature

Sign requests for tests or external API calls to catfish.

## Installation

```
npm install cf-signature
```

## 2.0.0

cf-signature has been updated to use sha256 over sha1

## Usage

### Header Signatures

```js
var sign = require('cf-signature')
var date = (new Date()).toUTCString()
var apiKey = 'api-key'
var url = '/contacts/recent'
var ttl = 6000
var signature = sign(apiKey, 'GET', '', date, url, ttl)
```

### Querystring Signatures

```js
var sign = require('cf-signature/uri')
var key = 'api-key'
var uri = '/contacts/recent'
var ttl = 6000
var id = 'bb0ff34c3ab9c2a478cb7b8b61139a78'
var signature = signUri(uri, key, id, ttl)
```

## Credits
[Paul Serby](https://github.com/serby/) follow me on twitter [@serby](http://twitter.com/serby)

## Licence
Licenced under the [ISC](https://opensource.org/licenses/ISC)
