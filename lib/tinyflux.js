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