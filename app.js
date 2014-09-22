'use strict';
var express = require('express'),
  config = require('./config/config');

// Init DB connection and require models
require('./db');

var app = express();

require('./config/express')(app, config);

app.listen(config.port, config.ip);
