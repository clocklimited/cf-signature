# cf-signature

Sign requests for tests or external API calls to catfish.

## Installation

```
npm install --registry=http://npm.clockte.ch cf-signature
```

## Usage

### Header Signatures

```js

var sign = require('cf-signature')
  , date = (new Date()).toUTCString()
  , apiKey = 'api-key'
  , url = '/contacts/recent'
  , ttl = 6000
  , signature = sign(apiKey, 'GET', '', date, url, ttl)

```

### Querystring Signatures

```js

var sign = require('cf-signature/uri')
  , key = 'api-key'
  , uri = '/contacts/recent'
  , ttl = 6000
  , id = 'bb0ff34c3ab9c2a478cb7b8b61139a78'
  , signature = signUri(uri, key, id, ttl)

```

## Credits
[Paul Serby](https://github.com/serby/) follow me on twitter [@serby](http://twitter.com/serby)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
