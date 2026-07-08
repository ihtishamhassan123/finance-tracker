const express = require('express')
require('dotenv').config();
const bcrypt = require('bcrypt');
const cors = require ('cors');
const pool = require('./db');
const app = express()
const transactionRoutes = require('./routes/transactionRoutes');
const profileRoutes=require('./routes/profileRoutes')
const dashboardRoutes =require('./routes/dashboardRoutes')

app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use('/transactions',transactionRoutes);
app.use('/profile',profileRoutes)
app.use('/dashboard',dashboardRoutes)
app.get('/',(req,res)=>{

    res.send('Welcome to finance tracker Api')
})
app.listen(5000, () => {
  console.log('Server running on port 5000')
})

