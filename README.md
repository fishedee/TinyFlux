# [TinyFlux](https://github.com/fishedee/TinyFlux)
TinyFlux is a predictable state container for JavaScript apps. 

It is very very tiny,just 150 line source code and has no dependencies

You can read an overview of ReFlux [here](https://github.com/reflux/refluxjs)

```
╔═════════╗       ╔════════╗       ╔═════════════════╗
║ Actions ║──────>║ Stores ║──────>║ View Components ║
╚═════════╝       ╚════════╝       ╚═════════════════╝
     ^                                      │
     └──────────────────────────────────────┘

```
Hower when we write more reflux , we will find action is more unnecessary.

action is almost equal the store method!

we always copy store method to action for declare action,so unnecessary.

```
╔════════╗       ╔═════════════════╗
║ Stores ║──────>║ View Components ║
╚════════╝       ╚═════════════════╝
     ^                   │
     └───────────────────┘

```
So this is the tinyflux architecture

we no longer declare action ever

action is generate by store method!

less is more!

### Install

```
npm install --save tinyflux
```

### Examples

* [Counter](https://github.com/fishedee/TinyFlux/tree/master/examples/counter) ([source](https://github.com/fishedee/TinyFlux/tree/master/examples/counter))
* [Todo](https://github.com/fishedee/TinyFlux/tree/master/examples/todo) ([source](https://github.com/fishedee/TinyFlux/tree/master/examples/todo))
* [Async](https://github.com/fishedee/TinyFlux/tree/master/examples/async) ([source](https://github.com/fishedee/TinyFlux/tree/master/examples/async))
* [Real-World](https://github.com/fishedee/TinyFlux/tree/master/examples/real-world) ([source](https://github.com/fishedee/TinyFlux/tree/master/examples/real-world))

### How To Use
ONLY 1 MINUTE , YOU KNOW EVERYTHING ABOUT TINYFLUX

#### Store
```js
import TinyFlux from 'tinyflux';

//1.create Store by TinyFlux.createStore
//2.set your action function
//3.set your get function
//ok that's all
let Store = TinyFlux.createStore({
	getInitialState(){
		return 0;
	},
	increment(){
		this.state++;
	},
	decrement(){
		this.state--;
	},
	get(){
		return this.state;
	}
});
export default new Store();
```

#### Component
```js
import TinyFlux from "tinyflux"
import React from "react"
import Store from "./store"

//1.create Component by TinyFlux.createComponent
//2.create mapStateToProps for map store data to component data
//3.connect 1 and 2 
//ok that's all
let Component = TinyFlux.createComponent({
	render(){
		return (
			<div>
				<div>{this.props.counter}</div>
				<button onClick={Store.increment}>increment</button>
				<button onClick={Store.decrement}>decrement</button>
			</div>
		);
	}
});

function mapStateToProps(){
	return {
		counter:Store.get()
	}
}
export default TinyFlux.connect(mapStateToProps,Component);
```

### License

MIT

