require('dotenv').config();
const express = require('express')
const app = express()
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const hsts = require('./middleware/hsts');
const mongoose = require('mongoose')

// DB 
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Db connected...'));

// Middleware
app.use(helmet());
app.use(cors({ origin: 'https://localhost:3000', optionsSuccessStatus: 200}))
app.use(express.json());
app.use(hsts);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/bulletinBoard', require('./routes/bulletinBoard'));

app.use(express.json())
app.use((reg,res,next)=>
{
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
 res.setHeader('Access-Control-Allow-Methods', '*');
 next();
});

module.exports = app;