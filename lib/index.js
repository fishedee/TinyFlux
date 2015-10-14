'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _tinyfluxJs = require('./tinyflux.js');

var _tinyfluxJs2 = _interopRequireDefault(_tinyfluxJs);

exports['default'] = (0, _tinyfluxJs2['default'])(_react2['default'], _immutable2['default']);
module.exports = exports['default'];