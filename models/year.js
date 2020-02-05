const mongoose =  require('mongoose');

const userPaySchema =  new mongoose.Schema({
                  jan:{type:Boolean,default:false},
                  feb:{type:Boolean,default:false},
                  mar:{type:Boolean,default:false},
                  apr:{type:Boolean,default:false},
                  may:{type:Boolean,default:false},
                  jun:{type:Boolean,default:false},
                  jul:{type:Boolean,default:false},
                  aug:{type:Boolean,default:false},
                  sep:{type:Boolean,default:false},
                  oct:{type:Boolean,default:false},
                  nov:{type:Boolean,default:false},
                  dec:{type:Boolean,default:false},
                  

})


const UserPayDate = mongoose.model("UserPayDate",userPaySchema);
module.exports = UserPayDate;