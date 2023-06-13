//1. importlarımız
const express = require('express');
const server = express();
const hobbitsRouter = require('./hobbits/hobbits-router');
const racesRouter = require('./races/races-router');


//2. middlewarelar
server.use(express.json());  //buna şimdilik takılmayalım...


//3. routerlar
server.use('/hobbits', hobbitsRouter);
server.use('/races', racesRouter);
server.use('/history', hobbitsRouter);
server.use('/users', hobbitsRouter);

//4.

//5. export
module.exports = server;