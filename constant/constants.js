let err_desc = {
    "error_400_1": {
        "error_code": "400",
        "error_desc": "BODY_PARAM_MISSING",
        "message": "It seems that some body parameter is missing.Please reach to support."
    },
    "error_400_2": {
        "error_code": "400",
        "error_desc": "BAD_REQUEST",
        "message": "The request parameter is invalid.Please try again."
    },
    "error_401": {
        "error_code": "401",
        "error_desc": "UNAUTHORISED",
        "message": "You are not authorised to access this api.Please login and try again."
    },
    "error_403": {
        "error_code": "403",
        "error_desc": "ALREADY_EXISTS",
        "message": "Account already exists please login."
    },
    "error_404": {
        "error_code": "404",
        "error_desc": "DATA_NOT_FOUND",
        "message": "We could not find any data.Please try again."
    },
    "error_409": {
        "error_code": "409",
        "error_desc": "DATABASE_CONNECT",
        "message": "Connection to database failed .Please try again later."
    },
    "error_500": {
        "error_code": "500",
        "error_desc": "INTERNAL_SERVER_ERROR",
        "message": "Unable to get data from database."
    },
    "error_501": {
        "error_code": "501",
        "error_desc": "UNABLE_TO_PROCESS",
        "message": "CRUD operation could not be completed."
    },
    "error_501_2": {
        "error_code": "501",
        "error_desc": "UNABLE_TO_PROCESS",
        "message": "Data Invalid / Expired can not process."
    },
    "error_601": {
        "error_code": "601",
        "error_desc": "TYPE_MISMATCH",
        "message": "Type mismatch found."
    }
}

let customMessage = {

    "NO_DATA_FOUND": "Sorry no data found .Please try again.",
    "DATA_RETURNED": "Data returned successfully.",
    "UPDATED": "Your Profile has been updated successfully.",
    "UNAUTHORISED": "You are not authorised to access this app.Please login and try again.",
    "SAVED": "Data saved successfully",
    "MANDATORY": "Mandatory field is missing",
    "UPDATE": "Your Data has been updated successfully.",
}

module.exports = {
    err_desc,
    customMessage
};