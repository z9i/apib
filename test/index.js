'use strict'

const assert = require('assert')

const API = require('..')

const api = new API()

describe('args', function () {
  it('base', function () {
    function argsTest() {
      const options = api.args(arguments, ['offset', 'count'])
      assert.deepStrictEqual(options, {offset: 1, count: 2, xor: true})
    }
    argsTest(1, 2, {xor: true})
    argsTest(1, {xor: true, count: 2})
    argsTest({offset: 1, xor: true, count: 2})
  })

  it('default value', function () {
    assert.deepStrictEqual(api.args(['xovel'], ['name', 'type=1']), {name: 'xovel', type: 1})
  })

  it('ignore undefined args', function () {
    function argsTest() {
      const options = api.args(arguments, ['offset', 'count', 'mode'])
      assert.deepStrictEqual(options, {offset: 1, mode: 'fire'})
    }
    argsTest(1, ({}).m, 'fire')
    argsTest(1, undefined, 'fire')
  })

  it('ignore undefined names', function () {
    function argsTest() {
      const options = api.args(arguments, [, 'count', 'mode'])
      assert.deepStrictEqual(options, {count: 2, mode: 'fire'})
    }
    argsTest(1, 2, 'fire')
  })
})

describe('detect type', function () {
  it('It should return undefined', function () {
    assert.deepStrictEqual(api.type(), 'undefined')
    assert.deepStrictEqual(api.type({}.x), 'undefined')
    assert.deepStrictEqual(api.type(this.y), 'undefined')
  })

  it('It should return array', function () {
    assert.deepStrictEqual(api.type([]), 'array')
  })

  it('It should return object', function () {
    assert.deepStrictEqual(api.type({}), 'object')
    assert.deepStrictEqual(api.type(Object.create(null)), 'object')
    assert.deepStrictEqual(api.type(Object()), 'object')
  })

  it('It should support keep case', function () {
    assert.deepStrictEqual(api.type(new Date, true), 'Date')
    assert.deepStrictEqual(api.type(/1/, true), 'RegExp')
  })
})

describe('param url', function () {
  it('It should return a tring', function () {
    assert.deepStrictEqual(typeof api.param({}), 'string')
  })
  it('It could ignore string and number', function () {
    assert.deepStrictEqual(api.param({name: '6'}), 'name=6')
    assert.deepStrictEqual(api.param({name: 6}), 'name=6')
  })
  it('It should encodeURIComponent keys and values', function () {
    assert.deepStrictEqual(api.param({name: '1 2'}), 'name=1%202')
    assert.deepStrictEqual(api.param({'a,b': 6}), 'a%2Cb=6')
  })
  it('It sould support multi keys', function () {
    assert.deepStrictEqual(api.param({page: 1, size: 1}), 'page=1&size=1')
  })
})

describe('url combination', function () {
  it('It should support url combination', function () {
    assert.deepStrictEqual(api.join('foo', 'bar'), 'foo/bar')
  })
  it('It should handle trailing slash', function () {
    assert.deepStrictEqual(api.join('foo/', 'bar'), 'foo/bar')
  })
  it('It should handle initial slash', function () {
    assert.deepStrictEqual(api.join('foo', '/bar'), 'foo/bar')
  })
  it('It should handle both initial and trailing slash', function () {
    assert.deepStrictEqual(api.join('foo/', '/bar'), 'foo/bar')
  })
  it('It should support more than two parameters', function () {
    assert.deepStrictEqual(api.join('foo', 'bar', 'baz'), 'foo/bar/baz')
  })
})

describe('methods and properties', function () {
  it('It should have a method `request`', function () {
    assert.ok(typeof api.request === 'function')
  })
  it('It should have a property `version`', function () {
    assert.ok(typeof api.version === 'string')
  })
})
