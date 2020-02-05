const mongoose =  require('mongoose');

const userPaySchema =  new mongoose.Schema({
                  jan:{type:String,default:"jan"},
                  feb:{type:String,default:"feb"},
                  mar:{type:String,default:"mar"},
                  apr:{type:String,default:"apr"},
                  may:{type:String,default:"may"},
                  jun:{type:String,default:"jun"},
                  jul:{type:String,default:"jul"},
                  aug:{type:String,default:"aug"},
                  sep:{type:String,default:"sep"},
                  oct:{type:String,default:"oct"},
                  nov:{type:String,default:"nov"},
                  dec:{type:String,default:"dec"},
                  

})


const UserPayDate = mongoose.model("UserPayDate",userPaySchema);
module.exports = UserPayDate;