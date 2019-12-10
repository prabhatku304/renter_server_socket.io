
const db = require('../models');

exports.RentHandler = async (req,res,next)=>{
               try{
                     let newRent = await db.Rent.create(req.body);
                     let user = await db.User.findById(req.params.id);
                     user.rent.push(newRent);
                     user.save();
                     return next(res.send(user));
               }catch(err){
                   return next(err);
               }
}

exports.RentHistory = async (req,res,next)=>{
    try{
          
          let user = await db.User.findById(req.params.id);
          
          res.send(user.rent)
          return next();
    }catch(err){
        return next(err);
    }
}