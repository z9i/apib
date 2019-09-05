'use strict'

import axios from 'axios'

import { version } from '../package.json'

class API {
  axios = axios

  version = version

  constructor(options = {}) {
    this.options = options
  }

  log(...args) {
    if (this.options.debug) {
      console.log(...args) // eslint-disable-line no-console
    }
  }

  /**
   * 将对象转为 URL QueryString
   *
   * @param {object} data
   */
  _param(data) {
    let ret = []
    Object.keys(data).forEach(v => {
      ret.push(`${encodeURIComponent(v)}=${encodeURIComponent(data[v])}`)
    })
    return ret.join('&')
  }

  /**
   * 类型判断
   *
   * @param {*} unknown
   * @return {string}
   */
  _type(unknown) {
    const type = Object.prototype.toString.call(unknown)
    return type.replace('[object ', '').replace(']', '').toLowerCase()
  }

  /**
   * 将参数列表转为对象形式
   *
   * @param {array} args 参数原始对象，即 arguments
   * @param {array} names 参数名称对应的数组，可以给默认值，默认值需要能被 JSON.parse 解析。
   *
   * 注意：
   *  - 参数的值支持覆盖
   *  - 在遇到对象之后直接退出
   *
   * 示例：
   *   > _args ([1, 2, {xor: true}], ['offset', 'count'])
   *   < {offset: 1, count: 2, xor: true}
   */
  _args(args, names = []) {
    const options = {}
    names.forEach((item, index) => {
      if (item.indexOf('=') > -1) {
        const temp = item.split('=')
        const name = temp[0]
        names[index] = name
        try {
          options[name] = JSON.parse(temp.slice(1).join('='))
        } catch (e) {
          //
        }
        // const [name, ...value] = item.split('=')
        // names[index] = name
        // try {
        //   options[name] = JSON.parse(value.join('='))
        // } catch (e) {
        //   //
        // }
      }
    })
    for (let i = 0; i < args.length; i++) {
      if (this._type(args[i]) === 'object') {
        Object.assign(options, args[i])
        break
      } else if (
        this._type(args[i]) !== 'undefined'
        && this._type(names[i]) !== 'undefined'
      ) {
        options[names[i]] = args[i]
      }
    }
    return options
  }

  /**
   * 拼接链接地址
   *
   * @param  {array<string>} args
   */
  _join(...args) {
    let result = args[0] || ''
    for (let i = 1; i < args.length; i++) {
      if (args[i]) {
        result = result.replace(/\/+$/, '') + '/' + args[i].replace(/^\/+/, '')
      }
    }
    return result
  }

  // 需要自行实现 request 方法，基础方法不再进行提供
  request() {
    throw new Error('Not implemented yet')
  }

}

export default API
