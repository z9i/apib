# apib

An API basic client.

> Very basic.

## Install

```bash
npm install apib
```

## Usage

```js
import Base from 'apib'

class API extends Base {
  request() {
    ...
  }
  ...
}

const api = new API(options)

```

## Build

Using [`rollup`](https://github.com/rollup/rollup).

```bash
rollup -c rollup.config.js
```

## Test

Using [`mocha`](https://mochajs.org)

## Case

- [terjoy-api](https://www.npmjs.com/package/terjoy-api)
- [udap](https://udap.hdk4.com)

## License

[MIT](LICENSE)
