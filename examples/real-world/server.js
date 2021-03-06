var express = require('express');
var compress = require('compression');

var app = new express();
var port = 3000;
app.use(compress());
app.use(express.static(__dirname+'/dist'));

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});