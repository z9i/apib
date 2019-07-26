(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios')) :
  typeof define === 'function' && define.amd ? define(['axios'], factory) :
  (global = global || self, global.apib = factory(global.axios));
}(this, function (axios) { 'use strict';

  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var version = "0.0.2";

  var API =
  /*#__PURE__*/
  function () {
    function API() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.axios = axios;
      this.version = version;
      this.options = options;
    }

    var _proto = API.prototype;

    _proto.log = function log() {
      if (this.options.debug) {
        var _console;

        (_console = console).log.apply(_console, arguments); // eslint-disable-line no-console

      }
    }
    /**
     * 将对象转为 URL QueryString
     *
     * @param {object} data
     */
    ;

    _proto._param = function _param(data) {
      var ret = [];
      Object.keys(data).forEach(function (v) {
        ret.push("".concat(encodeURIComponent(v), "=").concat(encodeURIComponent(data[v])));
      });
      return ret.join('&');
    }
    /**
     * 类型判断
     *
     * @param {*} unknown
     * @return {string}
     */
    ;

    _proto._type = function _type(unknown) {
      var type = Object.prototype.toString.call(unknown);
      return type.replace('[object ', '').replace(']', '').toLowerCase();
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
    ;

    _proto._args = function _args(args) {
      var names = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var options = {};
      names.forEach(function (item, index) {
        if (item.indexOf('=') > -1) {
          var temp = item.split('=');
          var name = temp[0];
          names[index] = name;

          try {
            options[name] = JSON.parse(temp.slice(1).join('='));
          } catch (e) {} //
          // const [name, ...value] = item.split('=')
          // names[index] = name
          // try {
          //   options[name] = JSON.parse(value.join('='))
          // } catch (e) {
          //   //
          // }

        }
      });

      for (var i = 0; i < args.length; i++) {
        if (this._type(args[i]) === 'object') {
          Object.assign(options, args[i]);
          break;
        } else if (this._type(args[i]) !== 'undefined' && this._type(names[i]) !== 'undefined') {
          options[names[i]] = args[i];
        }
      }

      return options;
    }
    /**
     * 拼接链接地址
     *
     * @param  {array<string>} args
     */
    ;

    _proto._join = function _join() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = args[0] || '';

      for (var i = 1; i < args.length; i++) {
        if (args[i]) {
          result = result.replace(/\/+$/, '') + '/' + args[i].replace(/^\/+/, '');
        }
      }

      return result;
    }
    /**
     * 通用请求封装
     */
    ;

    _proto.request = function request() {
      var _this = this;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var options = this._args(args, ['url']);

      if (!options.url) {
        throw new Error('url is required');
      }

      if (!options.method && this.options.method) {
        options.method = this.options.method;
      }

      var successCode = typeof this.options.code === 'number' ? this.options.code : 1;
      return new Promise(function (resolve, reject) {
        _this.axios.create({
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          },
          baseURL: _this.options.baseUrl,
          timeout: _this.options.timeout
        })(options).then(function (response) {
          var res = _objectSpread2({}, response.data);

          var code = +res.code;

          if (code === successCode) {
            resolve(res);
          } else {
            reject(res);
          }

          _this.log('then', {
            response: response,
            args: args,
            options: options,
            res: res,
            raw: JSON.stringify(res)
          });
        })["catch"](function (error) {
          reject(error);

          _this.log('catch', {
            error: error,
            args: args,
            options: options,
            response: error.response
          });
        });
      });
    };

    return API;
  }();

  return API;

}));
//# sourceMappingURL=apib.js.map
