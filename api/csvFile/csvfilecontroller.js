const uploadModel = require('./csvfilemodel');
const logger = require('../../logger/logger');
const constants = require('../../constant/constants');
const fs = require("fs");
const parse = require('csv-parse');
const path = require('path');
var async = require('async');
var csv = require("fast-csv");



class csvFileController {
    static async uploadCsvFile(req, res, next) {
        try {
        
            //     for (var i = 0; i < req.files.length; i++) {

            //     var parser = parse({ columns: true }, function (err, records) {
            //     // console.log(records[i]['Email Address'])

            //     userData = records

            //     }); 

            //     //    for (var i = 0; i < req.files.length; i++) {
            //     fs.createReadStream('public/uploads/' + req.files[i].filename).pipe(parser);
            // }
            // console.log(userData)

            var parser = parse({ columns: true }, function (err, records) {
                // console.log(records[i]['Email Address'])



            });
            var file1 = 'public/uploads/' + req.files[0].filename;   //job profile
            var file2 = 'public/uploads/' + req.files[1].filename;   //userData
            var stream = fs.createReadStream(file1);
            var stream2 = fs.createReadStream(file2);
            var fileData1 = [],
                fileData2 = [];
                console.log(file2)
            const file1Promise = new Promise((resolve) => {
                csv
                    .parseFile(file1, { headers: true })
                    .on('data', function (data) {
                        fileData1.push(data);
                    })
                    .on('end', function () {
                        console.log('done');
                        resolve();
                    });
            });

            const file2Promise = new Promise((resolve) => {
                csv
                    .parseFile(file2, { headers: true })
                    .on('data', function (data) {
                        fileData2.push(data);
                    })
                    .on('end', function () {
                        console.log('done');
                        resolve();
                    });
            });
            var arr = [];
            Promise.all([
                file1Promise,
                file2Promise,
            ])
                .then(() => {
                    var fileDataUser
                    fileData1.forEach((e1)=>{
                       
                     fileDataUser  = fileData2.filter(o => o['Email Address'] == e1["Email Address"]);
                     fileDataUser[0]['Job Title'] = e1['Job Title']
                    arr.push(fileDataUser[0])
                    let user = new uploadModel({
                        slno: fileDataUser[0]['Sl No'],
                        Email_Address: fileDataUser[0]['Email Address'],
                        FirstName_LastName:fileDataUser[0]['FirstName LastName'],
                        Address:fileDataUser[0]['Address'],
                        Activity_Log:fileDataUser[0]['Activity Log'],
                        Dob:fileDataUser[0]['Date of Birth'],
                        Job_Title:fileDataUser[0]['Job Title'],
                      });
                       let user_Data = user.save();
                    })
               
                    res.status(200).json({
                        status: "success",
                        message: constants.customMessage.DATA_RETURNED,
                        response: arr
                    })
                




                    // const fileData3 = fileData1.concat(fileData2);
                    // console.log(fileData2, "file2");

                    // const csvStream = csv.format({ headers: true });
                    // const writableStream = fs.createWriteStream('outputfile.csv');

                    // writableStream.on('finish', function () {
                    //     console.log('DONE!');
                    // });

                    // csvStream.pipe(writableStream);
                    // fileData3.forEach((data) => {
                    //     csvStream.write(data);
                    // });
                    // csvStream.end();
                });
        }
        catch (error) {
            console.log(error)
            logger.logError({
                error: error,
                request: req
            });
            res.status(400).json({
                status: "error",
                error: constants.err_desc.error_400_2,
                message: constants.customMessage.SOMETHING_WRONG
            })
        }
    }



    //Api to send limit in params
    static async fetchUserDetails(req,res,next){
        try{
           var number =  parseInt(req.params.limit)
            uploadModel.find().limit(number).then((data)=>{
                res.status(200).json({
                    status: "success",
                    message: constants.customMessage.DATA_RETURNED,
                    response: data
                })
            })
        }
        catch (error) {
            console.log(error)
            logger.logError({
                error: error,
                request: req
            });
            res.status(400).json({
                status: "error",
                error: constants.err_desc.error_400_2,
                message: constants.customMessage.SOMETHING_WRONG
            })
        }
    }
    static async fetchByJobTitle(req, res, next) {
        try {
            uploadModel.aggregate([
                { "$group": { _id: "$Job_Title", count: { $sum: 1 } } }
            ]).then((data) => {
                res.status(200).json({
                    status: "success",
                    message: constants.customMessage.DATA_RETURNED,
                    response: data
                })
            })
        }
        catch (error) {
            console.log(error)
            logger.logError({
                error: error,
                request: req
            });
            res.status(400).json({
                status: "error",
                error: constants.err_desc.error_400_2,
                message: constants.customMessage.SOMETHING_WRONG
            })
        }
    }
}

module.exports = csvFileController