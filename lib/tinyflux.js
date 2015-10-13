'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (React, Immutable) {
	var ImmutableIs = Immutable.is.bind(Immutable);

	function shallowEqualImmutable(objA, objB) {
		if (objA === objB || ImmutableIs(objA, objB)) {
			return true;
		}

		if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
			return false;
		}

		var keysA = Object.keys(objA);
		var keysB = Object.keys(objB);

		if (keysA.length !== keysB.length) {
			return false;
		}

		// Test for A's keys different from B.
		var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
		for (var i = 0; i < keysA.length; i++) {
			if (!bHasOwnProperty(keysA[i]) || !ImmutableIs(objA[keysA[i]], objB[keysA[i]])) {
				return false;
			}
		}

		return true;
	}

	var Component = (function (_React$Component) {
		_inherits(Component, _React$Component);

		function Component() {
			_classCallCheck(this, Component);

			_get(Object.getPrototypeOf(Component.prototype), 'constructor', this).apply(this, arguments);
		}

		_createClass(Component, [{
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {
				return !shallowEqualImmutable(this.props, nextProps) || !shallowEqualImmutable(this.state, nextState);
			}
		}]);

		return Component;
	})(React.Component);

	var allStoreListener = new Set();
	var hasTrigger = false;

	var Store = function Store() {
		var _this = this;

		_classCallCheck(this, Store);

		this.__defineSetter__('state', function (state) {
			_this._state = state;
			if (allStoreListener.size == 0) return;
			if (hasTrigger == true) return;
			hasTrigger = true;
			setTimeout(function () {
				hasTrigger = false;
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = allStoreListener[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var singleListener = _step.value;

						singleListener();
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator['return']) {
							_iterator['return']();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}, 0);
		});
		this.__defineGetter__('state', function () {
			return _this._state;
		});
	};

	function connect(connectFilter, ConnectComponent) {
		return (function (_Component) {
			_inherits(TinyFluxConnect, _Component);

			function TinyFluxConnect(props) {
				var _this2 = this;

				_classCallCheck(this, TinyFluxConnect);

				_get(Object.getPrototypeOf(TinyFluxConnect.prototype), 'constructor', this).call(this, props);
				this._storelistener = function () {
					_this2.setState(connectFilter(_this2.props));
				};
				allStoreListener.add(this._storelistener);
				this.state = connectFilter(props);
			}

			_createClass(TinyFluxConnect, [{
				key: 'componentWillReceiveProps',
				value: function componentWillReceiveProps(nextProps) {
					this._storelistener(nextProps);
				}
			}, {
				key: 'componentWillUnmount',
				value: function componentWillUnmount() {
					allStoreListener['delete'](this._storelistener);
				}
			}, {
				key: 'render',
				value: function render() {
					return React.createElement(ConnectComponent, this.state);
				}
			}]);

			return TinyFluxConnect;
		})(Component);
	}
	return {
		Component: Component,
		Store: Store,
		connect: connect
	};
};