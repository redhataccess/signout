'use strict';

var express = require('express'),
  router = express.Router();

module.exports = function(app) {
  app.use('*', router);
};

router.all('*', function(req, res) {
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
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write('nom nom');
    res.end();
  }
});
