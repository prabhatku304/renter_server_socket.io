const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const User = require("../models/auth")
const path        = require('path');

const {signIn,signUp} = require('../handlers/auth');

const storage = multer.diskStorage({
        destination:'./public/uploads/',
        filename: function(req, file, cb){
           cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
        }
     });

     var imageFilter = function (req, file, cb) {
      // accept image files only
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {             //image must have a extension
          return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    };
    const upload = multer({ storage: storage, fileFilter: imageFilter})



router.post('/signup',signUp);
router.post('/signin',signIn);
router.post('/:id/upload',upload.single('myImage'),async function(req,res,next){

    try{   console.log(req.file.filename
        )
        const host = req.host;
        console.log(host)
        const filePath = req.protocol + "://" + host + "/" + req.file.filename;

          let userFind = await db.User.findById(req.params.id);
          console.log(userFind)
         userFind.idCard.push(filePath);
         userFind.save();
        console.log(userFind)
       
       res.send(userFind);
       return next()
    }  catch(err){
        return next(err)
    }


})


router.get('/user',async(req,res)=>{
        // db.User.find({})
        //    .then(data=>res.send(data))
        //    .catch(err=>console.log(err))
        let data = await db.User.find({});
        res.send(data) 
})

router.get('/user/:id',(req,res)=>{
            console.log("hello");
            console.log("hello");
          db.User.findById(req.params.id).then(data=>res.send(data)).catch(err=>console.log(err))
})

router.get("/check",(req,res)=>{res.send("check")})
router.get('/:id/ispay',async (req,res)=>{
         try{
              let user = await db.User.findById(req.params.id);
              let userDate = await db.UserPayDate(user.rentDate) ;
              res.send(userDate);
              return next();
         }catch(err){
             console.log(err)
             return next(err)
         }
})
module.exports = router;
