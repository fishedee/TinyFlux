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
	
	let ImmutableMixin = {
		shouldComponentUpdate(nextProps, nextState) {
			return !shallowEqualImmutable(this.props, nextProps) ||
				!shallowEqualImmutable(this.state, nextState);
		}
	};

	let allStoreListener = new Set();
	let hasTrigger = false;
	function createComponentClass(proto){
		if( !proto.mixins )
			proto.mixins = [];
		proto.mixins.push(ImmutableMixin);
		return React.createClass(proto);
	}
	function createStoreClass(proto){
		if( proto.mixins ){
			for( let singleMixin of proto.mixins ){
				for( let methodName in singleMixin ){
					let methodResult = singleMixin[methodName];
					if( proto.hasOwnProperty(methodName))
						continue;
					proto[methodName] = methodResult;
				}
			}
		}
		function StoreClass(){
			this._state = this.getInitialState(); 
			this.__defineSetter__('state',(state)=>{
				this._state = state;
				if( allStoreListener.size == 0 )
					return;
				if( hasTrigger == true )
					return;
				hasTrigger = true;
				setTimeout(()=>{
					hasTrigger = false;
					for( let singleListener of allStoreListener ){
						singleListener();
					}
				},0);
			});
			this.__defineGetter__('state',()=>{
				return this._state;
			});
			for( let methodName in this ){
				let methodResult = this[methodName];
				if( typeof methodResult != 'function' )
					continue;
				if( methodName == 'getInitialState')
					continue;
				if( methodName.substr(0,1) == '_')
					continue;
				this[methodName] = methodResult.bind(this);
			}
		}
		StoreClass.prototype = proto;
		return StoreClass;
	}
	function connect(connectFilter,ConnectComponent){
		return createComponentClass({
			getInitialState(){
				this._connectFilter = connectFilter.bind(this);
				this._storelistener = ()=>{
					this.setState(this._connectFilter(this.props));
				};
				allStoreListener.add(this._storelistener);
				return this._connectFilter(this.props);
			},
			componentWillReceiveProps(nextProps){
				this.setState( this._connectFilter(nextProps) );
			},
			componentWillUnmount(){
				allStoreListener.delete(this._storelistener);
			},
			render(){
				return (<ConnectComponent {...this.state}/>);
			}
		});
	}
	return {
		Component:{
			createClass:createComponentClass
		},
		createComponent:createComponentClass,
		Store:{
			createClass:createStoreClass
		},
		createStore:createStoreClass,
		connect:connect
	};
}