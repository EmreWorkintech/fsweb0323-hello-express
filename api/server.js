//1. importlarımız
const express = require('express');
const server = express();
const morgan = require('morgan')
const hobbitsRouter = require('./hobbits/hobbits-router');
const racesRouter = require('./races/races-router');
const authRouter = require('./auth/auth-router')
const { restricted } = require('./auth/auth-middleware');

//2. middlewarelar
server.use(express.json());  //built-in middleware. Globalde kullandık.
server.use(morgan('dev'));  //third-party middleware

//3. routerlar
server.use('/hobbits', restricted, hobbitsRouter);
server.use('/races', racesRouter);
server.use('/history', hobbitsRouter);
server.use('/users', hobbitsRouter);
server.use('/auth', authRouter);


// namecheck -> passwordcheck -> endpoint -> error middleware 
//4. Error handler Middleware. Global'e ekledim.


server.use((err,req,res,next)=>{
    res
        .status(err.status || 500)
        .json({message: err.message || "Server error..."})
})

//5. export
module.exports = server;