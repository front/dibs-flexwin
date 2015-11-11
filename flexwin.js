'use strict';

/**
 * A wrapper for the DIBS Payment Services Flexwin API
 */

var q = require('q');
var request = require('request');

request.defaults({
  jar: false,
  pool: false
});

module.exports = {

  /*
   *  Sets a global test mode
  */
  testMode: false,

  /*
   *  Endpoint for ticket creation
  */
  createTicketUri: 'https://payment.architrade.com/cgi-ssl/auth.cgi',

  /*
   *  This service performs a credit and debit card check and saves the credit card
   *  information for recurring payments.
  */
  createTicket: function(options) {
    return this.dibsRequest(options, this.createTicketUri);
  },

  /**
   *  Endpoint for ticket authorizations
  */
  authorizeTicketUri: 'https://payment.architrade.com/cgi-ssl/ticket_auth.cgi',

  /**
   *  Make a recurring payment using a ticket previously created via the
   *  createTicket service.
  */
  authorizeTicket: function(options) {
    return this.dibsRequest(options, this.authorizeTicketUri);
  },

  /**
   *  Endpoint for capturing transactions
  */
  captureTransactionUri: 'https://payment.architrade.com/cgi-bin/capture.cgi',

  /**
   *  The second part of any transaction is the capture process. Usually this take place
   *  at the time of shipping the goods to the customer.
  */
  captureTransaction: function(options) {
    return this.dibsRequest(options, this.captureTransactionUri);
  },

  /*
   *  Executes the https request to the DIBS server and fulfills the promise
   *  with the response JSON Object
  */
  dibsRequest: function(options, uri) {
    if (this.testMode) {
      options.test = 'yes';
    }
    options.textreply = 'yes';
    options.fullreply = 'yes';

    var self = this;
    var d = q.defer();

    request.post({
      uri: uri,
      form: options
    },
    function(err, res, body) {
      if (err) {
        return d.reject(err);
      }
      try {
        d.resolve(self.parseDibsResponse(body));
      }
      catch (err) {
        d.reject(err);
      }
    });

    return d.promise;
  },

  /*
   * Converts the DIBS text reply to a javascript object
  */
  parseDibsResponse: function(str) {
    var parts = str.split('&');
    var res = {};
    for(var i = 0, l = parts.length; i<l; i++) {
      var item = parts[i].split('=');
      res[item[0]] = decodeURIComponent(item[1]);
    }
    return res;
  }
};
