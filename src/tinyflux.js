import Immutable from 'immutable'

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
		this._stores = [];
		if( this.initialize )
			this.initialize();
		var data = {};
		for( let singleStore of this._stores ){
			let stateName = singleStore.stateName;
			let storeData = singleStore.store.get();
			if( singleStore.filter )
				storeData = singleStore.filter( storeData );
			data[stateName] = storeData;
		}
		return data;
	},
	connect(store,stateName){
		let self = this;
		let trigger = function(data){
			let stateData = {};
			stateData[stateName] = data;
			self.setState(stateData);
		};
		store.on(trigger);
		this._stores.push({
			store:store,
			trigger:trigger,
			stateName:stateName
		});
		
	},
	connectFilter(store,stateName,filter){
		let self = this;
		let trigger = function(data){
			let stateData = {};
			stateData[stateName] = filter(data);
			self.setState(stateData);
		};
		store.on(trigger);
		this._stores.push({
			store:store,
			trigger:trigger,
			stateName:stateName,
			filter:filter
		});
	},
	shouldComponentUpdate(nextProps, nextState) {
		return !shallowEqualImmutable(this.props, nextProps) ||
			!shallowEqualImmutable(this.state, nextState);
	},
	componentWillUnmount(){
		for( let singleStore of this._stores ){
			singleStore.store.off(singleStore.trigger);
		}
		this._stores = null;
	}
};

export function createStore(proto){
	//init store 
	proto.on = function(listener){
		this._listeners.add(listener);
	}
	proto.off = function(listener){
		this._listeners.delete(listener);
	}
	proto.trigger = function(){
		let data = this.get();
		if( ImmutableIs(data,this._data) )
			return;
		this._data = data;
		for( let listener of this._listeners ){
			listener(data);
		}
	}
	proto.connect = function(store,stateName){
		let trigger = (data)=>{
			this[stateName] = data;
			this.trigger();
		};
		store.on(trigger);
		this[stateName] = store.get();
	}
	proto.connectFilter = function(store,stateName,filter){
		let trigger = (data)=>{
			this[stateName] = filter(data);
			this.trigger();
		};
		store.on(trigger);
		this[stateName] = filter(store.get());
	}
	proto._get = function(){
		return this._data;
	}
	function StoreClass(){
		this._listeners = new Set();
		if( this.initialize )
			this.initialize();
		this._data = this.get();
	}
	StoreClass.prototype = proto;
	let store = new StoreClass();
	//init store action
	let storeAction = {};
	storeAction.on = store.on.bind(store);
	storeAction.off = store.off.bind(store);
	storeAction.get = store._get.bind(store);
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

export default {
	createStore,
	ComponentMixin
}