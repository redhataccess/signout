'use strict';
var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'cookiemonster'
    },
    ip: '127.0.0.1',
    port: 9000
  },

  production: {
    root: rootPath,
    app: {
      name: 'cookiemonster'
    },
    ip: process.env.OPENSHIFT_NODEDIY_IP,
    port: process.env.OPENSHIFT_NODEDIY_PORT
  }
};

module.exports = config[env];
