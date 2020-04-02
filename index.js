require('dotenv').config();

const express     =    require('express'),
      mongoose    =    require('mongoose'),
      bodyParser  =    require('body-parser'),
      morgan      =    require('morgan'),
      cors        =    require('cors'),
      socketIO    =    require('socket.io'),
      http        =    require('http'),
      app         =    express();

const authUser   =    require('./Route/auth');
const newMessage  =   require('./Route/message')
const rentRouter  =   require('./Route/rent');
const errorHandler = require('./handlers/err');
const messageRouter =  require('./Route/message');
const db            =  require('./models')
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('tiny'));

  app.use('/api',authUser);
  app.use('/api',rentRouter);
  app.use('/api',messageRouter);
  app.use(express.static('public/uploads'));

  let server = http.createServer(app);
  let io = socketIO(server);

  io.on("connection",async (socket)=>{
    console.log("connection success");
    
    socket.on("join",async (msg)=>{
   
     try{
      let newmsg = msg.temp;
      if(newmsg.newMessage && newmsg.newMessage.user._id){
         let user = await db.User.findById(newmsg.newMessage.user._id);
         let stringMessage = JSON.stringify(newmsg.newMessage);
         let message = await db.Message.create({user:user._id,text:stringMessage});
         await user.message.push(message._id);
        await user.save();
         
      }
     }catch(err){
       console.log(err);
     }
        
    })
     socket.on('disconnect',()=>{
       console.log("dissconect")
     })
  })

  app.get("/social-media/:id",(req,res,next)=>{
          let data = req.params.id;
          res.render('test.ejs',{data})
  })

  app.use(function(req,res,next){
    let err = new Error("not found");
    err.status = 404;
    next(err);
})

app.use(errorHandler);
  server.listen( 4000);

    