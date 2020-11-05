const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const port = process.env.PORT || 8080;
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

var app = express();
dotenv.config({path:'./config/config.env'});
require('./db/db')

const csvFileRoute = require('./api/csvFile/csvfileroute');
const userRoute = require('./api/user/userroute')


app.use(cors());
app.use(morgan('common'));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cookieParser());
 //define the route for "/"
 app.get("/", function (request, response){
     //show this file when the "/" is requested
     response.sendFile(__dirname+"/views/uploadCsvfile.html");
 });
 
 app.use('/api/csvFile', csvFileRoute);
 app.use('/api/user', userRoute)

app.listen(port,()=>{
    console.log(`Server is runinng ${process.env.NODE_ENV} mode on port ${port}`);
});


module.exports = app ; 


