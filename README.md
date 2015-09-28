# [TinyFlux](https://github.com/fishedee/TinyFlux)
TinyFlux is a predictable state container for JavaScript apps. 

It is very very tiny,just 20 line source code and has no dependencies

### Install

```
npm install --save tinyflux
```

### Examples

* [Counter](https://github.com/fishedee/TinyFlux/tree/master/examples/counter) ([source](https://github.com/fishedee/TinyFlux/tree/master/examples/counter))

### How To Use
ONLY 1 MINUTE , YOU KNOW EVERYTHING ABOUT TINYFLUX

#### Store
```js
import TinyFlux from 'tinyflux';

//1.create Class extends from TinyFlux.Store
//2.set your get function
//3.set your action function and call trigger when data change
//ok that's all
export default class MyStore extends TinyFlux.Store{
	constructor(){
		super();
		this.counter = 0;
	}
	increment(){
		this.counter++;
		this.trigger();
	}
	decrement(){
		this.counter--;
		this.trigger();
	}
	get(){
		return this.counter;
	}
}
```

#### Component
```js
import TinyFlux from "tinyflux"
import React from "react"
import Store from "./store"

//1.create Class extends from TinyFlux.Component
//2.create your store and connect to component
//3.call action method when you change
//ok that's all
export default class CounterComponent extends TinyFlux.Component{
	constructor(props){
		super(props);
		this.store = new Store();
		this.connect(this.store,'counter');
	}
	render(){
		return (
			<div>
				<div>{this.state.counter}</div>
				<button onClick={()=>this.store.increment()}>increment</button>
				<button onClick={()=>this.store.decrement()}>decrement</button>
			</div>
		);
	}
}
```

### License

MIT

