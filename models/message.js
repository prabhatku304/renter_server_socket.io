const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
              text:{
                  type:String
              },
              user:{
                  type:mongoose.Schema.Types.ObjectId,
                  ref:"User"
              },
              date:{
                  type:Date.now
              }
})

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;