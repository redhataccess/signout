'use strict';
var express = require('express');


function clearCookies(req, res) {
  for (var cookie in req.cookies) {
    res.cookie(cookie, '', {
      expires: new Date(1),
      path: '/',
      domain: '.redhat.com'
    });
  }
}

module.exports = function(app, config) {

  app.get('/img.gif', function(req, res) {
    clearCookies(req, res);
    var img = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': img.length
    });
    res.end(img);
  });

  app.all('*', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    clearCookies(req, res);
    if (req.method === 'GET') {
      res.redirect('https://access.redhat.com');
    } else {
      res.json({
        msg: 'nom nom'
      });
    }
  });

};
