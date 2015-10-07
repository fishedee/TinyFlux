'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var Immutable = require('immutable');

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

var ComponentMixin = {
	getInitialState: function getInitialState() {
		this._stores = new Map();
		if (this.initialize) this.initialize();
		var data = {};
		if (this.getData) data = this.getData();
		return data;
	},
	listen: function listen(store) {
		var _this = this;

		if (this._stores.has(store)) return;

		var trigger = function trigger() {
			if (_this.getData) {
				var data = _this.getData();
				_this.setState(data);
			}
		};
		store.on(trigger);
		this._stores.set(store, trigger);
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		return !shallowEqualImmutable(this.props, nextProps) || !shallowEqualImmutable(this.state, nextState);
	},
	componentWillUnmount: function componentWillUnmount() {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = this._stores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _step$value = _slicedToArray(_step.value, 2);

				var singleStore = _step$value[0];
				var singleTrigger = _step$value[1];

				singleStore.off(singleTrigger);
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

		this._stores = null;
	}
};

function createStore(proto) {
	//init store
	proto.on = function (listener) {
		this._listeners.add(listener);
	};
	proto.off = function (listener) {
		this._listeners['delete'](listener);
	};
	proto.trigger = function () {
		var data = this.getData();
		if (ImmutableIs(data, this._data)) return;
		this._data = data;
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = this._listeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var listener = _step2.value;

				setTimeout(listener, 0);
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
	};
	proto.listen = function (store) {
		store.on(this.trigger.bind(this));
	};
	proto._getData = function () {
		return this._data;
	};
	function StoreClass() {
		this._listeners = new Set();
		if (this.initialize) this.initialize();
		this._data = this.getData();
	}
	StoreClass.prototype = proto;
	var store = new StoreClass();
	//init store action
	var storeAction = {};
	storeAction.on = store.on.bind(store);
	storeAction.off = store.off.bind(store);
	storeAction.getData = store._getData.bind(store);
	for (var methodName in store) {
		var methodResult = store[methodName];
		if (typeof methodResult != 'function') continue;
		if (methodName.substr(0, 2) != 'on') continue;
		if (methodName.substr(2).length == 0) continue;
		var actionName = methodName.substr(2, 1).toLowerCase() + methodName.substr(3);
		storeAction[actionName] = methodResult.bind(store);
	}
	return storeAction;
}

module.exports = {
	createStore: createStore,
	ComponentMixin: ComponentMixin
};