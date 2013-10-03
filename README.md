#dibs-flexwin
A wrapper for the [DIBS Payment Services](http://www.dibspayment.com/) [Flexwin API](http://tech.dibs.dk/dibs_api/flexwin/).

## Installation

```
$ npm install dibs-flexwin
```

## Docs

**Please note the following**:

 - a basic understanding of the DIBS API is required to use this library
 - the DIBS payment services gateway is NOT a free service and this library is useless
  without a DIBS account - please see [www.dibspayment.com](http://www.dibspayment.com/) for further information.

#### Usage

```
var flexwin = require('dibs-flexwin');
```

### Global Options

#### Test Mode
Set a global test mode.

```
flexwin.testMode = true;
```

### Methods

All methods recieve the same arguments and a callback function.

```
flexwin.[methodName](options, callback);
```

`options` - object with the request parameters.

 * check [http://tech.dibs.dk/dibs_api/flexwin/](http://tech.dibs.dk/dibs_api/flexwin/) for a list of mandatory and optional parameters to use in the `options` object, for each of the available methods.
 * the parameter types **must** be followed.

`callback` - a callback funtion that receives an `err` and a `data` object. The `data` object contains the answer from DIBS.

**For v0.0.1 only the following methods are available:**

#### createTicket
This service performs a credit and debit card check and saves the credit card information for recurring payments.

```
flexwin.createTicket(options, function (err, data){ ... });
```

#### authorizeTicket
Make a recurring payment using a ticket previously created via the createTicket service.

```
flexwin.authorizeTicket(options, function (err, data){ ... });
```

#### captureTransaction
The second part of any transaction is the capture process. Usually this take place at the time of shipping the goods to the customer.

```
flexwin.captureTransaction(options, function (err, data){ ... });
```

### Promises
`dibs-flexwin` uses the `mpromise` library. It allows the following syntax:

```
flexwin.authorizeTicket(ticketInfo)
.then(function(data){
	...
	return flexwin.captureTransaction(transInfo);
})
.then(function onSuccess(data){
	...
}, function onError(err){
	...
});
```

To know more about promises and the `mpromise` library check [https://npmjs.org/package/mpromise](https://npmjs.org/package/mpromise).

## License

[MIT](https://github.com/front/dibs/blob/master/LICENSE)
