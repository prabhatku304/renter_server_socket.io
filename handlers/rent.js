const stripe = require('stripe')("sk_test_veBHxIl8huyM1xJ7XYu6Z8Wx");
const db = require('../models');

exports.RentHandler = async (req,res,next)=>{
               try{
                     
                     let user = await db.User.findById(req.params.id);
                     let newRent = await db.Rent.create({amount:req.body.amount,user:req.params.id});
                     console.log(newRent)
                     stripe.customer.create({
                         name:req.body.name,
                         source:req.body.token
                     }).then(customer=>{
                         stripe.charge.create({
                             amount:req.body.amount,
                             currency:"inr",
                             source:"tok_mastercard",
                             customer:customer.id
                         }).then(data=>res.send(data))
                          .catch(err=>console.log(err))
                     }).catch(err=>console.log(err))
                     return next();
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