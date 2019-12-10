const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');

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
        const filePath = req.protocol + "://" + host +':4000/' + req.file.filename;

          let userFind = await db.User.findById(req.params.id);
          console.log(filePath)
        userFind.idCard.push(filePath);
         await userFind.save();
         res.send(filePath)
    }  catch(err){
        return next(err)
    }


})

router.get('/image',(req,res)=>{
       db.Image.find({}).then(data=>res.send(data)).catch(err=>console.log(err))
})
router.get('/user',(req,res)=>{
        db.User.find({})
           .then(data=>res.send(data))
           .catch(err=>console.log(err))
})

router.get('/user/:id',(req,res)=>{
            console.log("hello");
            console.log("hello");
           db.User.findById(req.params.id).then(data=>res.send(data)).catch(err=>console.log(err))
})
module.exports = router;
