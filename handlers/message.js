const db = require('../models');

exports.addMessage = async function (req,res,next){
                  try{
                      let messages = await db.Message.create({
                             text:req.body.text,
                             user:req.params.id
                      });
                       let user = await db.User.findById(req.params.id);
                       user.message.push(messages._id);
                       await user.save();
                       return next()
                  }catch(err){
                      return next(err);
                  }
}

