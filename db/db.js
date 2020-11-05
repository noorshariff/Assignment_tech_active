const mongoose = require('mongoose');
const logger   = require('../logger/logger');

// mongoose.connect("mongodb+srv://admin:AdminManish123@cluster0-kxtys.mongodb.net/clubRide?retryWrites=true&w=majority",{
    mongoose.connect("mongodb+srv://Noorjabeena:Mango07@assighnment.v7khv.mongodb.net/test",{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false,
    useUnifiedTopology : true 
}).then(()=>{
    console.log('Database connected successfully');
}).catch(err =>{
    logger.logError({                
        "error": err,
    });
    console.log("Connection failed" + err)
})