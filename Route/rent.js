const express = require('express');
 const router  = express.Router();
 const {RentHandler,RentHistory}   =  require('../handlers/rent')
const stripe = require('stripe')("sk_live_jOQyiYtAu6uolrkvR9EJ70qh")
// const Razorpay = require('razorpay');

// const instance = new Razorpay({
//     key_id:"",
//     key_secret:""
// })

 router.post('/:id/rent',RentHandler);
router.get('/:id/rent/history',RentHistory)
// router.get('/secret',async (req,res)=>{
//         try{
//             const paymentIntent =  await stripe.paymentIntents.create({
//                 amount: 1099,
//                 currency: 'inr',
//               });
//             res.send(paymentIntent.client_secret)
//         }catch(err){
//             console.log(err)
//         }
// })
router.post('/secret',async (req,res,next)=>{
    try{
        console.log(req.body)
       let charge =await stripe.customers.create({
            email:"prabhatkmr5789@gmail.com",
            source:req.body.source.id
      })
          console.log(charge)
         let cnf = await stripe.paymentIntents.create({
             amount:req.body.amount,
             currency:"inr",
             payment_method_types: ['card'],
         })
        console.log(cnf)
        res.send(cnf.client_secret)
    }catch(err){
        console.log("hello"+err)
    }
    
       
})

// router.post('/razorpay',async (req,res,next)=>{
//           try{
//                 let amount = 5000;
//                 const pay = await instance.payments.capture({customer_id,amount})
//                 console.log(pay)
//                 res.send(pay)

//           }catch(err){
//                console.log(err);
//           }
// })

module.exports = router;