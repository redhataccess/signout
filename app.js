'use strict';
var express = require('express'),
  config = require('./config/config'),
  cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser())

require('./config/express')(app, config);

app.listen(config.port, config.ip);
