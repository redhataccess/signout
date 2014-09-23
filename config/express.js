'use strict';
var express = require('express');


module.exports = function(app, config) {

  app.all('*', function(req, res) {
    for (var cookie in req.cookies) {
      res.cookie(cookie, '', {
        expires: new Date(1),
        path: '/',
        domain: '.redhat.com'
      });
    }
    if (req.method === 'GET') {
      res.redirect('https://access.redhat.com');
    } else {
      res.json({
        msg: 'nom nom'
      });
    }
  });

};
