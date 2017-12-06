'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodeGettext = require('node-gettext');

var _nodeGettext2 = _interopRequireDefault(_nodeGettext);

var _fs = require('fs');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var I18n = function () {
  function I18n(_ref) {
    var _this = this;

    var _ref$locales = _ref.locales,
        locales = _ref$locales === undefined ? ['en_EN'] : _ref$locales,
        _ref$defaultLanguage = _ref.defaultLanguage,
        defaultLanguage = _ref$defaultLanguage === undefined ? 'en_EN' : _ref$defaultLanguage,
        _ref$path = _ref.path,
        path = _ref$path === undefined ? null : _ref$path;
    (0, _classCallCheck3.default)(this, I18n);
    this.isInit = false;
    this.gettext = null;

    this.locales = locales;
    this.defaultLanguage = defaultLanguage;
    this.path = path;

    // global.__ is here to let gettext parse the string to put them on .po file
    global.__ = function (string) {
      return string;
    };

    this.gettext = new _nodeGettext2.default();
    this.gettext.setTextDomain(this.defaultLanguage);
    this.locales.forEach(function (locale) {
      try {
        var file = (0, _fs.readFileSync)((0, _path.join)(_this.path, locale + '.po'));
        _this.gettext.addTranslations(locale, file);
      } catch (err) {
        console.error('[ERROR:I18n] can not find file ' + locale + '.po');
      }
    });
  }

  (0, _createClass3.default)(I18n, [{
    key: 'middleware',
    get: function get() {
      var _this2 = this;

      return function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
          var locale;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  locale = ctx.get('Accept-Language') || _this2.defaultLanguage;

                  if (!_this2.locales.includes(locale)) {
                    locale = _this2.defaultLanguage;
                  }
                  ctx.__ = ctx.state.__ = function (string) {
                    return _this2.gettext.dgettext(locale, string);
                  };
                  _context.next = 5;
                  return next();

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }();
    }
  }]);
  return I18n;
}();

exports.default = I18n;