 function caseStatus(status){
    let message=""
    switch (status) {
        case 400:
          message="Bad request. Params with errors"
          break;
        case 401:
          message="Unauthorized. Request Header or Token invalid."
          break;
        case 402:
            message="Unauthorized. Wrong Credentials."
            break;
        case 404:
            message="Not Found resource"
            break;
        case 201:
          message="Error. Wrong password."
          break;
        case 202:
          message="Error. Wrong id."
          break;
        case 203:
          message="Error. Wrong password."
          break;
        case 204:
          message="Sin contenido."
          break;
        case 205:
          message="Error. Reset content."
          break;
        case 200:
            message="Successful"
            break;
        default:
          message="Error."
          break;
      }
      return message;
 }
 
 function responseHandler(status, res){
    let response = res.response;
    response.status = status;
    response.body={
        code: (status == 200) ? 1 : 0,
        message: caseStatus(status),
    }

    return response;
 }

 module.exports = { responseHandler } 