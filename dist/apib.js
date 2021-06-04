(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.apib = factory());
}(this, (function () { 'use strict';

  var version = "0.2.0";

  var API = /*#__PURE__*/function () {
    function API() {
      this.version = version;
    }

    var _proto = API.prototype;

    /**
     * 将对象转为 URL QueryString
     *
     * @param {object} data
     */
    _proto.param = function param(data) {
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
     * @param {any} unknown
     * @param {boolen} keepCase 保持大小写
     * @return {string}
     */
    ;

    _proto.type = function type(unknown, keepCase) {
      var type = Object.prototype.toString.call(unknown).slice(8, -1); // https://jsperf.com/replace-vs-slice/5
      // return type.replace('[object ', '').replace(']', '').toLowerCase()

      return keepCase ? type : type.toLowerCase();
    }
    /**
     * 将参数列表转为对象形式
     *
     * @param {array} list 参数原始对象，即 arguments
     * @param {array} names 参数名称对应的数组，可以给默认值，默认值需要能被 JSON.parse 解析。
     *
     * 注意：
     *  - 参数的值支持覆盖
     *  - 在遇到对象之后直接退出
     *
     * 示例：
     *   > args([1, 2, {xor: true}], ['offset', 'count'])
     *   < {offset: 1, count: 2, xor: true}
     */
    ;

    _proto.args = function args(list) {
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
          }
        }
      });

      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var name = names[i];

        if (this.type(item) === 'object') {
          Object.assign(options, item);
          break;
        } else if (this.type(item) !== 'undefined' && this.type(name) !== 'undefined') {
          options[name] = item;
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

    _proto.join = function join() {
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
