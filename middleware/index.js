const jwt = require('jsonwebtoken');

exports.loginRequired = function(req,res,next){
                      try{
                          let token = req.headers.authorization.split(" ")[1];
                          jwt.verify(token,process.env.SECRET_KEY,(decoded)=>{
                                   if(decoded){
                                       return next({
                                           status:200,
                                           message:"successful"
                                       })
                                   }else{
                                    return next({
                                        status:404,
                                        message:"please enter your password"
                                    })
                                }
                          })
                      }catch(err){
                        return next({
                            status:404,
                            message:"please enter your password"
                        })
                      }
}

exports.correctUser = function(req,res,next){
                try{
                    let token = req.headers.authorization.split(" ")[1];
                    jwt.verify(token,process.env.SECRET_KEY,(decoded)=>{
                           if(decoded && decoded.id===req.params.id){
                               return next({
                                   status:200,
                                   message:"correct user"
                               })
                           }else{
                               return next({
                                     status:400,
                                     message:"incorrect user"
                               })
                           }
                    })
                }catch(err){
                    return next({
                        status:400,
                        message:err.message
                    })
                }
}