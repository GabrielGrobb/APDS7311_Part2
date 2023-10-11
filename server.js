// https://www.w3schools.com/nodejs/default.asp

// const http = require('http');

// const PORT = 3000

// https://www.w3schools.com/nodejs/met_http_createserver.asp

// const server = http.createServer((req,res)=>{
//    res.end('Hello World');
// });

// server.listen(PORT)

// https://expressjs.com/en/starter/hello-world.html

//const express = require('express')
//const app = express()
//const port = 3000

// https://expressjs.com/en/4x/api.html#app.get

//app.get('/', (req,res)=>{
//    res.send('Hello World Express')
//})

//app.listen(port)

const http = require('https');
const app = require('./app');
const fs = require('fs');

const port = 3000;

const server = http.createServer(
    {
        key: fs.readFileSync('keys/privatekey.pem'),
        cert: fs.readFileSync('keys/certificate.pem')
    },app);
    
server.listen(port)