'use strict';

var GET    = 'GET';
var PUT    = 'PUT';
var POST   = 'POST';
var DELETE = 'DELETE';

var handlers = {
  '/address': require('./handlers/address'),
  '/currency': require('./handlers/currency'),
  '/transaction': require('./handlers/transaction')
};

module.exports = {
  'address.post':       handle(POST, '/address'),
  'currency.post':      handle(POST, '/currency'),
  'transaction.post':   handle(POST, '/transaction')
};

/*--------------------------------------------------------------------------------*/

function handle(method, endpoint) {
  var handler = handlers[endpoint];
  if (typeof handler !== 'object' || typeof handler[method] !== 'function') {
    throw new Error('Missing endpoint handler: ' + endpoint);
  }

  return function (req, res) {
    /* Message composition */
    var message = {
      method: method,
      endpoint: endpoint,
      params: {}
    };

    /* Parameter parsing */
    var params = req.swagger.params;
    for (var param in params) {
      message.params[param] = params[param].value;
    }

    /* Message queueing */
    var jsonMessage = JSON.stringify(message);

    return handler[method](jsonMessage)
      .then(function (response) {
        res.json(response).end();
      });
  }
}
