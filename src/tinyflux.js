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
	
	class Component extends React.Component{
		shouldComponentUpdate(nextProps, nextState) {
			return !shallowEqualImmutable(this.props, nextProps) ||
				!shallowEqualImmutable(this.state, nextState);
		}
	}

	let allStoreListener = new Set();
	let hasTrigger = false;
	class Store{
		constructor(){
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
		}
	}
	function connect(connectFilter,ConnectComponent){
		return class TinyFluxConnect extends Component{
			constructor(props){
				super(props);
				this._storelistener = ()=>{
					this.setState(connectFilter(this.props));
				};
				allStoreListener.add(this._storelistener);
				this.state = connectFilter(props);
			}
			componentWillReceiveProps(nextProps){
				this._storelistener(nextProps);
			}
			componentWillUnmount(){
				allStoreListener.delete(this._storelistener);
			}
			render(){
				return (<ConnectComponent {...this.state}/>);
			}
		};
	}
	return {
		Component:Component,
		Store:Store,
		connect:connect
	};
}