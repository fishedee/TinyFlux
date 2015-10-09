(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Immutable"), require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["Immutable", "React"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("Immutable"), require("React")) : factory(root["Immutable"], root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	var React = __webpack_require__(3);
	var Immutable = __webpack_require__(2);
	var TinyFluxHelper = __webpack_require__(1);

	module.exports = TinyFluxHelper(React, Immutable);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

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

		var ComponentMixin = {
			shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
				return !shallowEqualImmutable(this.props, nextProps) || !shallowEqualImmutable(this.state, nextState);
			}
		};
		var storelisteners = new Set();
		function createComponent(proto) {
			if (!proto.mixins) proto.mixins = [ComponentMixin];
			return React.createClass(proto);
		}
		function createStore(proto) {
			//init store
			function StoreClass() {
				this.state = null;
			}
			StoreClass.prototype = proto;
			var store = new StoreClass();
			//init store action
			var storeAction = {};
			store.state = store.getInitialState();

			var _loop = function (methodName) {
				var methodResult = store[methodName];
				if (typeof methodResult != 'function') return 'continue';
				storeAction[methodName] = function () {
					var oldState = this.state;
					var result = methodResult.apply(store, arguments);
					if (ImmutableIs(oldState, store.state)) return result;
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = storelisteners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var listener = _step.value;

							listener();
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

					return result;
				};
			};

			for (var methodName in store) {
				var _ret = _loop(methodName);

				if (_ret === 'continue') continue;
			}
			storeAction.getState = function () {
				return store.state;
			};
			return storeAction;
		}
		function createAction(proto) {
			//init action
			function ActionClass() {}
			ActionClass.prototype = proto;
			var action = new ActionClass();
			//init action action
			var actionAction = {};
			for (var methodName in action) {
				var methodResult = action[methodName];
				if (typeof methodResult != 'function') continue;
				actionAction[methodName] = methodResult.bind(action);
			}
			return actionAction;
		}
		function connect(connectFilter, Component) {
			return createComponent({
				getInitialState: function getInitialState() {
					var _this = this;

					this._storeConnectFilter = connectFilter.bind(this);
					this._storelistener = function () {
						_this.setState(_this._storeConnectFilter());
					};
					storelisteners.add(this._storelistener);
					return this._storeConnectFilter();
				},
				componentWillReceiveProps: function componentWillReceiveProps() {
					this._storelistener();
				},
				componentWillUnmount: function componentWillUnmount() {
					storelisteners['delete'](this._storelistener);
				},
				render: function render() {
					return React.createElement(Component, this.state);
				}
			});
		}
		return {
			createAction: createAction,
			createStore: createStore,
			createComponent: createComponent,
			connect: connect
		};
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;