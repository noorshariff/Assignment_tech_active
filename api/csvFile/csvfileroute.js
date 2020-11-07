const csvFileController = require('./csvfilecontroller');
const express = require('express');
const Router = express();
const upload = require('../../uploads/upload');
const auth = require('../../middleware/auth')

Router.post('/uploadcsvfile',upload.any(), csvFileController.uploadCsvFile);

Router.get('/fetchuserdetails/:limit',auth, csvFileController.fetchUserDetails);

Router.get('/fetchdatabyjobtitle',auth, csvFileController.fetchByJobTitle);

module.exports = Router ; 