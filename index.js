const express = require('express');
const app=express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const mongodb = require('mongodb');

//middleware
app.use(cors());
app.use(express.json());


app.get('/', (req,res)=>{
    res.send('server running')
})

app.listen(port,()=>{
    console.log('server running on the port', port)
})