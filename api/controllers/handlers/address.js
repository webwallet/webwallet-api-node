'use strict';

var P = require('bluebird');

module.exports = {
  POST: postWalletAddress
};

/*--------------------------------------------------------------------------------*/

function postWalletAddress(request) {
  request = JSON.parse(request);
  
  return P.resolve({
    address: request.method + ' ' + request.endpoint
  });
}
