const winston       = require('winston');
const { timestamp } = winston.format;



// const DailyRotateFile = require('winston-daily-rotate-file');
// logger.configure({
//   level: 'verbose',
//   transports: [
//     new DailyRotateFile(opts)
//   ]
// });

var createLogger = winston.createLogger({
  
    level: 'info',
    format:winston.format.combine(
      winston.format.json(),timestamp()
    ),
    //format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      
      new winston.transports.File({ filename: 'serverlogs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'serverlogs/combined.log' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'serverlogs/exceptions.log' })
      ]
  });

  var createLoggerError = winston.createLogger({
    level: 'error',
    format:winston.format.combine(
      winston.format.json(),timestamp()
    ),
    // format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'serverlogs/error.log', level: 'error' }),
      //new winston.transports.File({ filename: 'serverlogs/combined.log' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'serverlogs/exceptions.log' })
      ]
  });

  var logInfo = function(data){
    createLogger.info(data);
  }
  var logError = function(data){
    createLoggerError.error(data);
  }

  module.exports= {logInfo,logError};