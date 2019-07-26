# apib

An API basic client.

> Very basic.

## Install

```bash
npm install apib
```

## Usage

```js
import API from 'apib'

const api = new API(options)

api.request('url', {
  ...
})

api.request({
  url: '...',
  ...
})
```

## Options

| name | type | note |
| ---- | ---- | ---- |
| debug | boolean | log out some info |
| baseUrl | string | **baseURL** for request |
| timeout | number | timeout for request |
| method | string | default method for request |
| code | number | success code for judgment |

> Using baseUrl, NOT baseURL, it may be a little confusing.

## Build

Using [`rollup`](https://github.com/rollup/rollup).

```bash
rollup -c rollup.config.js
```

## Test

Using [`mocha`](https://mochajs.org)

## License

[MIT](LICENSE)
