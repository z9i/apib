(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios')) :
  typeof define === 'function' && define.amd ? define(['axios'], factory) :
  (global = global || self, global.apib = factory(global.axios));
}(this, (function (axios) { 'use strict';

  axios = axios && Object.prototype.hasOwnProperty.call(axios, 'default') ? axios['default'] : axios;

  var version = "0.1.0";

  var API = /*#__PURE__*/function () {
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
      // https://jsperf.com/array-push-vs-string-concat

      /*
      let ret = []
      Object.keys(data).forEach(v => {
        ret.push(`${encodeURIComponent(v)}=${encodeURIComponent(data[v])}`)
      })
      return ret.join('&')
      */
      var ret = '';
      Object.keys(data).forEach(function (v) {
        ret = ret + "".concat(encodeURIComponent(v), "=").concat(encodeURIComponent(data[v]), "&");
      });
      return ret.slice(0, -1);
    }
    /**
     * 类型判断
     *
     * @param {*} unknown
     * @return {string}
     */
    ;

    _proto._type = function _type(unknown) {
      var type = Object.prototype.toString.call(unknown); // https://jsperf.com/replace-vs-slice/5
      // return type.replace('[object ', '').replace(']', '').toLowerCase()

      return type.slice(8, -1).toLowerCase();
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
          } catch (e) {// ignore
          } // const [name, ...value] = item.split('=')
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
     * @param {array<string>} args
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
    } // 需要自行实现 request 方法，基础方法不再进行提供
    ;

    _proto.request = function request() {
      throw new Error('Not implemented yet');
    };

    return API;
  }();

  return API;

})));
//# sourceMappingURL=apib.js.map
