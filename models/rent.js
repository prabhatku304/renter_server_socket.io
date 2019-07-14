const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
            amount:{type:Number}
         
            
})

const Rent = mongoose.model('Rent',rentSchema);
module.exports = Rent;