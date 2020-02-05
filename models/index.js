const mongoose = require('mongoose');

mongoose.set('debug',true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://prabhat:prabhat123@ds151247.mlab.com:51247/rent');

module.exports.User = require('./auth');
module.exports.Message = require('./message');
module.exports.Rent = require('./rent');
module.exports.UserPayDate = require('./year')