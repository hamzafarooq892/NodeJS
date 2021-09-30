const express = require('express');
const path =  require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const pasport =  require('passport');
const mongoose =  require('mongoose');
const config =  require('./config/database');

//Connection
mongoose.connect(config.database);
//On connection 
mongoose.connection.on('connected',()=>{
    console.log('Connected to Datbase :'+config.database);
})

//On Error
mongoose.connection.on('error',(err)=>{
    console.log('Database error:'+err);
})

const app =  express();

const users = require('./routes/users');

//port number
const port =  3000;

//CORS middleware
app.use(cors());

//Set Static Folder
//app.use(express.static(path.join(__dirname,'public')));

//bodyParser middleware
app.use(bodyParser.json());

//passport middlware
app.use(pasport.initialize());
app.use(pasport.session());
require('./config/passport')(pasport);

//user
app.use('/users',users);

app.get('/',(req,res)=>{
    res.send('Invalid Entry Point');
})

app.listen(port,()=>{
    console.log('Server started on port #'+port);
})