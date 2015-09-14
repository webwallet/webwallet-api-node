'use strict';

var P = require('bluebird');

module.exports = {
  POST: postDigitalCurrency
};

/*--------------------------------------------------------------------------------*/

function postDigitalCurrency(request) {
  request = JSON.parse(request);
  
  return P.resolve({
    currency: request.method + ' ' + request.endpoint
  });
}
