'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (React, Immutable) {
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

	var ImmutableMixin = {
		shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
			return !shallowEqualImmutable(this.props, nextProps) || !shallowEqualImmutable(this.state, nextState);
		}
	};

	var allStoreListener = new Set();
	var hasTrigger = false;
	function createComponentClass(proto) {
		if (!proto.mixins) proto.mixins = [];
		proto.mixins.push(ImmutableMixin);
		return React.createClass(proto);
	}
	function createStoreClass(proto) {
		if (proto.mixins) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = proto.mixins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var singleMixin = _step.value;

					for (var methodName in singleMixin) {
						var methodResult = singleMixin[methodName];
						if (proto.hasOwnProperty(methodName)) continue;
						proto[methodName] = methodResult;
					}
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
		}
		function StoreClass() {
			var _this = this;

			this._state = this.getInitialState();
			this.__defineSetter__('state', function (state) {
				_this._state = state;
				if (allStoreListener.size == 0) return;
				if (hasTrigger == true) return;
				hasTrigger = true;
				setTimeout(function () {
					hasTrigger = false;
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = allStoreListener[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var singleListener = _step2.value;

							singleListener();
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2['return']) {
								_iterator2['return']();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}, 0);
			});
			this.__defineGetter__('state', function () {
				return _this._state;
			});
			this.getState = function () {
				return this.state;
			};
			this.setState = function (state) {
				this.state = state;
			};
			for (var methodName in this) {
				var methodResult = this[methodName];
				if (typeof methodResult != 'function') continue;
				if (methodName == 'getInitialState') continue;
				if (methodName.substr(0, 1) == '_') continue;
				this[methodName] = methodResult.bind(this);
			}
		}
		StoreClass.prototype = proto;
		return StoreClass;
	}
	function connect(connectFilter, ConnectComponent) {
		return createComponentClass({
			getInitialState: function getInitialState() {
				var _this2 = this;

				this._connectFilter = connectFilter.bind(this);
				this._storelistener = function () {
					_this2.setState(_this2._connectFilter(_this2.props));
				};
				if (typeof window == 'object') {
					allStoreListener.add(this._storelistener);
				}
				return this._connectFilter(this.props);
			},
			componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
				this.setState(this._connectFilter(nextProps));
			},
			componentWillUnmount: function componentWillUnmount() {
				if (typeof window == 'object') {
					allStoreListener['delete'](this._storelistener);
				}
			},
			render: function render() {
				return React.createElement(ConnectComponent, this.state);
			}
		});
	}
	return {
		Component: {
			createClass: createComponentClass
		},
		createComponent: createComponentClass,
		Store: {
			createClass: createStoreClass
		},
		createStore: createStoreClass,
		connect: connect
	};
};

module.exports = exports['default'];