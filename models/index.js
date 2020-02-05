const mongoose = require('mongoose');

mongoose.set('debug',true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/rent',{useNewUrlParser:true});

module.exports.User = require('./auth');
module.exports.Message = require('./message');
module.exports.Rent = require('./rent');
module.exports.UserPayDate = require('./year')