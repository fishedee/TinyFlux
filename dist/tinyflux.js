(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Immutable"), require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["Immutable", "React"], factory);
	else if(typeof exports === 'object')
		exports["TinyFlux"] = factory(require("Immutable"), require("React"));
	else
		root["TinyFlux"] = factory(root["Immutable"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.createComponent = createComponent;
	exports.createStore = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _immutable = __webpack_require__(1);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var ImmutableIs = _immutable2['default'].is.bind(_immutable2['default']);

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

	var TinyFluxComponentMixin = {
		getInitialState: function getInitialState() {
			this._stores = [];
			if (this.initialize) this.initialize();
			var data = {};
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this._stores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var singleStore = _step.value;

					var stateName = singleStore.stateName;
					var storeData = singleStore.store.get();
					if (singleStore.filter) storeData = singleStore.filter(storeData);
					data[stateName] = storeData;
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

			return data;
		},
		connect: function connect(store, stateName) {
			var self = this;
			var trigger = function trigger(data) {
				var stateData = {};
				stateData[stateName] = data;
				self.setState(stateData);
			};
			store.on(trigger);
			this._stores.push({
				store: store,
				trigger: trigger,
				stateName: stateName
			});
		},
		connectFilter: function connectFilter(store, stateName, filter) {
			var self = this;
			var trigger = function trigger(data) {
				var stateData = {};
				stateData[stateName] = filter(data);
				self.setState(stateData);
			};
			store.on(trigger);
			this._stores.push({
				store: store,
				trigger: trigger,
				stateName: stateName,
				filter: filter
			});
		},
		shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
			return !shallowEqualImmutable(this.props, nextProps) || !shallowEqualImmutable(this.state, nextState);
		},
		componentWillUnmount: function componentWillUnmount() {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this._stores[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var singleStore = _step2.value;

					singleStore.store.off(singleStore.trigger);
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

			this._stores = null;
		}
	};

	function createComponent(proto) {
		if (!proto.mixins) {
			proto.mixins = [];
		}
		proto.mixins.push(TinyFluxComponentMixin);
		return _react2['default'].createClass(proto);
	}

	function createStore(proto) {
		//init store
		proto.on = function (listener) {
			this._listeners.add(listener);
		};
		proto.off = function (listener) {
			this._listeners['delete'](listener);
		};
		proto.trigger = function () {
			var data = this.get();
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this._listeners[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var listener = _step3.value;

					listener(data);
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3['return']) {
						_iterator3['return']();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}
		};
		function StoreClass() {
			this._listeners = new Set();
			if (this.initialize) this.initialize();
		}
		StoreClass.prototype = proto;
		var store = new StoreClass();
		//init store action
		var storeAction = {};
		storeAction.on = store.on.bind(store);
		storeAction.off = store.off.bind(store);
		storeAction.get = store.get.bind(store);
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

	exports['default'] = {
		createComponent: createComponent,
		createStore: createStore
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;