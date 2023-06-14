const express = require('express');
const router = express.Router();
const { passwordCheck, nameCheck } = require('./auth-middleware')

router.post('/login', 
                nameCheck, 
                passwordCheck, 
                (req,res,next)=> {

    res.json({message: `Welcome back ${req.user.name}...`})
})

router.post('/register', nameCheck, passwordCheck, (req,res,next)=> {
    res.json({message: `Welcome ${req.body.name}...`})
})

module.exports = router;