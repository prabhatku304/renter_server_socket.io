const express = require('express');
const router = express.Router();
const db = require('../models');

const {signIn,signUp} = require('../handlers/auth');
 
router.post('/signup',signUp);
router.post('/signin',signIn);
router.get('/user',(req,res)=>{
        db.User.find({})
           .then(data=>res.send(data))
           .catch(err=>console.log("error"))
})

module.exports = router;