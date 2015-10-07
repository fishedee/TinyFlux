let Immutable = require('immutable');

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
	getInitialState(){
		this._stores = new Map();
		if( this.initialize )
			this.initialize();
		let data = {};
		if( this.getData )
			data = this.getData();
		return data;
	},
	listen(store){
		if( this._stores.has(store) )
			return;

		let trigger = ()=>{
			if( this.getData ){
				let data = this.getData();
				this.setState(data);
			}
		};
		store.on(trigger);
		this._stores.set(store,trigger);
	},
	shouldComponentUpdate(nextProps, nextState) {
		return !shallowEqualImmutable(this.props, nextProps) ||
			!shallowEqualImmutable(this.state, nextState);
	},
	componentWillUnmount(){
		for( let [singleStore,singleTrigger] of this._stores ){
			singleStore.off(singleTrigger);
		}
		this._stores = null;
	}
};

function createStore(proto){
	//init store 
	proto.on = function(listener){
		this._listeners.add(listener);
	}
	proto.off = function(listener){
		this._listeners.delete(listener);
	}
	proto.trigger = function(){
		let data = this.getData();
		if( ImmutableIs(data,this._data) )
			return;
		this._data = data;
		for( let listener of this._listeners ){
			setTimeout(listener,0);
		}
	}
	proto.listen = function(store){
		store.on(this.trigger.bind(this));
	}
	proto._getData = function(){
		return this._data;
	}
	function StoreClass(){
		this._listeners = new Set();
		if( this.initialize )
			this.initialize();
		this._data = this.getData();
	}
	StoreClass.prototype = proto;
	let store = new StoreClass();
	//init store action
	let storeAction = {};
	storeAction.on = store.on.bind(store);
	storeAction.off = store.off.bind(store);
	storeAction.getData = store._getData.bind(store);
	for( let methodName in store ){
		let methodResult = store[methodName];
		if( typeof methodResult != 'function' )
			continue;
		if( methodName.substr(0,2) != 'on' )
			continue;
		if( methodName.substr(2).length == 0 )
			continue;
		let actionName = methodName.substr(2,1).toLowerCase() + methodName.substr(3);
		storeAction[actionName] = methodResult.bind(store);
	}
	return storeAction;
}

module.exports = {
	createStore,
	ComponentMixin
};