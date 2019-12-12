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

