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
const messageRouter =  require('./Route/message')
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('tiny'));

  app.use('/api',authUser);
  app.use('/api',rentRouter);
  app.use('/api',messageRouter);

  let server = http.createServer(app);
  let io = socketIO(server);

  io.on("connection",(socket)=>{
    console.log("connection success");
    socket.on("join",(msg)=>{
      console.log(msg.temp);
    })
     socket.on('disconnect',()=>{
       console.log("dissconect")
     })
  })

  app.use(function(req,res,next){
    let err = new Error("not found");
    err.status = 404;
    next(err);
})

app.use(errorHandler);
  server.listen(process.env.PORT || 4000);

    