const mongoose = require('mongoose');
const fileSchema = mongoose.Schema({
    file:{
        data: Buffer,
        contentType: String,
        filename: String
    },
    slno: {
        type: Number
    },
    Email_Address: {
        type: String,
        unique: true
    },
    FirstName_LastName:{
        type: String
    },
    Address: {
        type: String
    },
    Activity_Log: {
        type: String
    },
    Dob:{
        type: String
    },
    Job_Title: {
        type: String
    }

})
module.exports= mongoose.model('csvFileData',fileSchema);







