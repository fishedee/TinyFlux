import Immutable from 'immutable'
import React from 'react'

var ImmutableIs = Immutable.is.bind(Immutable);

function shallowEqualImmutable(objA, objB) {
	if (objA === objB || ImmutableIs(objA, objB)) {
		return true;
	}

	if (typeof objA !== 'object' || objA === null ||
	  	typeof objB !== 'object' || objB === null) {
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

export class Component extends React.Component{
	constructor(props){
		super(props);
		this._stores = [];
	}
	shouldComponentUpdate(nextProps, nextState) {
	    return !shallowEqualImmutable(this.props, nextProps) ||
	           !shallowEqualImmutable(this.state, nextState);
	}
	connect(store,target){
		store.connect(this,target);
		this._stores.push( store );
	}
	componentWillUnmount(){
		for( var i = 0 ; i != _stores.length ; ++i )
			this._stores[i].disconnect(this);
	}
}

export class Store{
	constructor(){
		this._listeners = new Map();
		this._actions = new Array();
	}
	connect(component,target){
		let data = this.get();
		this._listeners.set(component,target);
		if( !component.state )
			component.state = {};
		component.state[target] = data;
	}
	disconnect(component){
		this._listeners.remove(component);
	}
	trigger(){
		let data = this.get();
		for( let [component,componentTarget] of this._listeners ){
			let stateData = {};
			stateData[componentTarget] = data;
			component.setState(stateData);
		}
	}
	getActions(){
		if( this._actions.length != 0 )
			return this._actions;
		let actions = this._actions;
		for( let i in this ){
			let methodName = i;
			if( typeof(this[i]) == 'function' )
				actions.push( this[i].bind(this) );
		}
		return actions;
	}
}

export default {
	Component,
	Store
}