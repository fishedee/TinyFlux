import express from 'express';
import compress from 'compression';
import React from 'react';
import Store from '../common/store';
import Component from '../common/component';

var app = new express();
var port = 3000;
app.use(compress());
app.get('/',async function(req,resp){
	try{
		await Store.fetch();
		var state = Store.getState();
		var html = React.renderToString(<Component/>);
		var result = renderPage(html,state);
		resp.send(result);
	}catch(e){
		console.log(e);
	}
});
app.use(express.static('dist'));

function renderPage(html,initialState){
	return `
	<!doctype html>
	<html>
	    <head>
	        <meta charset="utf-8">
	        <title>tiny flux</title>
	        <meta name="description" content="Hacker News clone written in ReactJS, RefluxJS, and Firebase">
	        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3">
	    </head>
	    <body>
	    	<body id="app">${html}</body>
	        <script>
	          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
	        </script>
	        <script src="/bundle.js"></script>
	    </body>
	</html>
	`
}

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});