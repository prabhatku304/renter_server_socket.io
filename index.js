require('dotenv').config();

const express     =    require('express'),
      mongoose    =    require('mongoose'),
      bodyParser  =    require('body-parser'),
      morgan      =    require('morgan'),
      cors        =    require('cors'),
      app         =    express();

const authUser   =    require('./Route/auth');
const newMessage  =   require('./Route/message')
const rentRouter  =   require('./Route/rent');
const errorHandler = require('./handlers/err')
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('tiny'));

  app.use('/api',authUser);
  app.use('/api',rentRouter)

  app.use(function(req,res,next){
    let err = new Error("not found");
    err.status = 404;
    next(err);
})

app.use(errorHandler);
  app.listen(process.env.PORT || 4000);

    