const stripe = require('stripe')("sk_live_jOQyiYtAu6uolrkvR9EJ70qh");
const db = require('../models');

exports.RentHandler = async (req,res,next)=>{
               try{
                     
                     let user = await db.User.findById(req.params.id);
                     let newRent = await db.Rent.create({amount:req.body.amount,user:req.params.id});
                  
                    stripe.customers.create({
                      
                        email:req.body.email,
                        source:req.body.id
                    }).then(customer=>{
                        console.log(customer)
                        stripe.charges.create({
                        amount:"1000",
                        currency:"inr",
                        customer:customer.id,
                        description:"product purchased",
                        shipping:{
                            name:"prabhat kumar",
                            address:{
                                line1:"ramcharan tola mokama",
                                city:"mokama",
                                country:"IND",
                                postal_code:'803302'
                            }
                        }
                         }).then(data=>console.log(data))
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