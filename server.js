'use strict';

var express = require('express'),
    http = require('http');

var uploadController = require('./route/upload');
var app = express();

var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

app.use(multipartyMiddleware);

app.post('/upload/photo', uploadController.goUpload);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port', app.get('port'));
});
