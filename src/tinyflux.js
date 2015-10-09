module.exports = function(React,Immutable){
	let ImmutableIs = Immutable.is.bind(Immutable);

	function shallowEqualImmutable(objA, objB) {
		if (objA === objB || ImmutableIs(objA, objB)) {
			return true;
		}

		if (typeof objA !== 'object' || objA === null ||
		  	typeof objB !== 'object' || objB === null) {
			return false;
		}

		let keysA = Object.keys(objA);
		let keysB = Object.keys(objB);

		if (keysA.length !== keysB.length) {
			return false;
		}

		// Test for A's keys different from B.
		let bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
		for (let i = 0; i < keysA.length; i++) {
			if (!bHasOwnProperty(keysA[i]) || !ImmutableIs(objA[keysA[i]], objB[keysA[i]])) {
				return false;
			}
		}

		return true;
	}

	let ComponentMixin = {
		shouldComponentUpdate(nextProps, nextState) {
			return !shallowEqualImmutable(this.props, nextProps) ||
				!shallowEqualImmutable(this.state, nextState);
		}
	};
	let storelisteners = new Set();
	function createComponent(proto){
		if( !proto.mixins )
			proto.mixins = [ComponentMixin];
		return React.createClass(proto);
	}
	function createStore(proto){
		//init store
		function StoreClass(){
			this.state = null;
		}
		StoreClass.prototype = proto;
		let store = new StoreClass();
		//init store action
		let storeAction = {};
		store.state = store.getInitialState();
		for( let methodName in store ){
			let methodResult = store[methodName];
			if( typeof methodResult != 'function' )
				continue;
			storeAction[methodName] = function(){
				let oldState = this.state;
				let result = methodResult.apply(store,arguments);
				if( ImmutableIs(oldState,store.state) )
					return result;
				for( let listener of storelisteners ){
					listener();
				}
				return result;
			}
		}
		storeAction.getState = ()=>{
			return store.state;
		}
		return storeAction;
	}
	function createAction(proto){
		//init action
		function ActionClass(){
		}
		ActionClass.prototype = proto;
		let action = new ActionClass();
		//init action action
		let actionAction = {};
		for( let methodName in action ){
			let methodResult = action[methodName];
			if( typeof methodResult != 'function' )
				continue;
			actionAction[methodName] = methodResult.bind(action);
		}
		return actionAction;
	}
	function connect(connectFilter,Component){
		return createComponent({
			getInitialState:function(){
				this._storeConnectFilter = connectFilter.bind(this);
				this._storelistener = ()=>{
					this.setState(this._storeConnectFilter());
				};
				storelisteners.add(this._storelistener);
				return this._storeConnectFilter();
			},
			componentWillReceiveProps:function(){
				this._storelistener();
			},
			componentWillUnmount:function(){
				storelisteners.delete(this._storelistener);
			},
			render:function(){
				return (<Component {...this.state}/>);
			}
		});
	}
	return {
		createAction:createAction,
		createStore:createStore,
		createComponent:createComponent,
		connect:connect
	};
}