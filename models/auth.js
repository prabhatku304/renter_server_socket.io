const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
                username:{
                     type:String,
                     unique:true,
                     
                },
                email:{
                    type:String,
              
                },
                password:{
                    type:String,
                    unique:true
                },
                image:{
                    type:String
                },
                age: {
                    type:Number
                },
                mobile:{
                    type:Number
                },
                idCard:[],
                date:{
                    type:Date
                },
                rent:[{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Rent"
                }],
                message:[{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Message"
                }]

})

userSchema.pre('save',async function(next){
         try{
             if(!this.isModified('password')){
                 return next();
             }
             let hashPassword = await bcrypt.hash(this.password,10);
             this.password = hashPassword;
             return next(); 
         }catch(err){
             return next(err);
         }
})

userSchema.methods.comparePassword = async function(userPassword){
           try{
               let isMatch = await bcrypt.compare(this.password,userPassword);
               return isMatch;
           }catch(err){
               return next(err);
           }
}

const User = mongoose.model('User',userSchema);
module.exports = User;