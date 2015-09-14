'use strict';

var P = require('bluebird');

module.exports = {
  POST: postTransactionRequest
};

/*--------------------------------------------------------------------------------*/

function postTransactionRequest(request) {
  request = JSON.parse(request);
  
  return P.resolve({
    transaction: request.method + ' ' + request.endpoint
  });
}
