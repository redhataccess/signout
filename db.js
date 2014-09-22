'use strict';
var config = require('./config/config'),
  mongoose = require('mongoose'),
  glob = require('glob');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function() {
  throw new Error('unable to connect to database at ' + config.db);
});

// Pull in models
glob.sync(config.root + '/app/models/*.js').forEach(function(model) {
  require(model);
});
