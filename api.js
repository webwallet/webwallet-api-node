'use strict';

/* Node Modules */
var http = require('http');
var cors = require('cors');
var a127 = require('a127-magic');
var express = require('express');
var api = express();

module.exports = api;

/* Initialize a127 framework */
a127.init(function(config) {
  /* Include middleware */
  api.use(cors());
  api.use(a127.middleware(config));

  /* Handle unsupported requests */
  api.use(function(err, req, res, next) {
    if (err && typeof err === 'object') {
      Object.defineProperty(err, 'message', { enumerable: true });
      if (err.allowedMethods) {
          res.status(405);
          err.message = 'Unsupported ' + req.method +' request.';
      }
      return res.json(err).end();
    } else {
      return res.status(405).json({
          message: 'Unsupported request.'
      }).end();
    }
  });

  /* Start server */
  http.createServer(api).listen(process.env.PORT || 8080, function (err) {
    if (err) throw err;
    console.log('Server running on port %s', 8080);
  });
});
