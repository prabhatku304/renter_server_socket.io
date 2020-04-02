const mongoose = require('mongoose');

mongoose.set('debug',true);
mongoose.Promise = Promise;
 mongoose.connect('mongodb://localhost/rent',{    useNewUrlParser: true,

useUnifiedTopology: true,
}).then(res=>console.log("succ")).catch(err=>console.log(err));

module.exports.User = require('./auth');
module.exports.Message = require('./message');
module.exports.Rent = require('./rent');
module.exports.UserPayDate = require('./year')