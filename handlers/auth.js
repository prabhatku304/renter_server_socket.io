require('dotenv').load
const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signUp = async function(req,res,next){
                  try{
                      let newUser = await db.User.create(req.body);
                      let newUserDate = await db.UserPayDate.create({});
                      console.log(newUserDate)
                      newUser.rentDate = newUserDate;
                      newUser.save();

                      let {id,username,email} = newUser;
                      let token = jwt.sign({
                             id,
                             username,
                             email
                      },process.env.SECRET_KEY)
                     
                      return res.status(200).json({
                          id,
                          username,
                          token
                      })
                  }catch(err){
                      if(err.code===11000)
                      {
                          err.message="sorry please enter correct info"
                      }
                      return next({
                          status:400,
                          message:err.message
                      })
                  }
}

exports.signIn = async function(req,res,next){
       try{
           let user = await db.User.findOne({username:req.body.username});
           let {id,username,email} = user;
         
           let isMatch = await user.comparePassword(req.body.password);
          console.log(req.body.password)
           
           if(isMatch){
               let token = jwt.sign({
                   id,
                   username,
                   email
               },process.env.SECRET_KEY)

               return res.status(200).json({
                   token,
                   id,
                   username
               })
           }else{
               return next({
                   status:400,
                   message:"email is not valid"
               })
           }

       }catch(err){
           return next(err)
       }
}