const db = require('../models');

exports.addMessage = async function (req,res,next){
                  try{
                      let messages = await db.Message.create({
                             text:req.body.text,
                             user:req.params.id
                      });
                       let user = await db.User.findById(req.params.id);
                      await user.message.push(messages._id);
                         user.save();
                         res.send(user)
                       return next()
                  }catch(err){
                      return next(err);
                  }
}

exports.oldMessage = async function(req,res,next){
                try{
                    let user = await db.User.findById(req.params.id);
                    console.log(user.message)
                    let message =   await db.Message.find({'_id':user.message});
                    res.send(message);
                    return next();
                }catch(err){
                    return next(err);
                }
}