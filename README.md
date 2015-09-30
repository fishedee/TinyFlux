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

### How To Use
ONLY 1 MINUTE , YOU KNOW EVERYTHING ABOUT TINYFLUX

#### Store
```js
import TinyFlux from 'tinyflux';

//1.create Store by TinyFlux.createStore
//2.set your get function
//3.set your action function (must be start with on) and call trigger when data change
//ok that's all
export default TinyFlux.createStore({
	initialize(){
		this.counter = 0;
	},
	onIncrement(){
		this.counter++;
		this.trigger();
	},
	onDecrement(){
		this.counter--;
		this.trigger();
	},
	get(){
		return this.counter;
	}
});
```

#### Component
```js
import TinyFlux from "tinyflux"
import React from "react"
import Store from "./store"

//1.create Component by TinyFlux.createComponent
//2.connect your store to your component
//3.set action when event trigger
//ok that's all
export default TinyFlux.createComponent({
	initialize(){
		this.connect(store,'counter');
	},
	render(){
		return (
			<div>
				<div>{this.state.counter}</div>
				<button onClick={Store.increment}>increment</button>
				<button onClick={Store.decrement}>decrement</button>
			</div>
		);
	}
});
```

### License

MIT

