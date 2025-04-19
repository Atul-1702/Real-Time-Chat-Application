
class CustomError extends Error{

    constructor(message="Unknown error!",statusCode=500){
      super(message);
      this.statusCode=statusCode;
      // Error.captureStackTrace(this,CustomError);
    }
}

module.exports =CustomError;