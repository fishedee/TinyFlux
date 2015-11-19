import TinyFlux from "tinyflux";
import React from "react"
import Component from "../common/component"
import Store from "../common/store"

Store.setState(window.__INITIAL_STATE__);

React.render(
	<Component/>,
	document.getElementById('app')
);
