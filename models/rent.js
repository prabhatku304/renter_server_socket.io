const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
            amount:{type:Number},
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
            
            
})

const Rent = mongoose.model('Rent',rentSchema);
module.exports = Rent;