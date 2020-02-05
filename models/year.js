const mongoose =  require('mongoose');

const userPaySchema =  new mongoose.Schema({
                  jan:{type:String,default:"jan"},
                  feb:{type:String,default:"feb"}
})