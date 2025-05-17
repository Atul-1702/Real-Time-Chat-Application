function duplicateEmailError(error) {
  error.statusCode = 409;
  return {
    message: "User already exists.",
    success: false,
  };
}
function validationError(error) {
  error.statusCode = 401;
  return {
    message: error.message,
    success: false,
  };
}

function globalErrorHandler(error, req, res, next) {
  let statusCode = error.statusCode || 500;
  let responseObject = {
    success: false,
    message: error.message,
  };

  /* Duplicate email error handling */
  if (error?.errorResponse?.code === 11000) {
    responseObject = duplicateEmailError(error);
    statusCode = error.statusCode;
  } else {
    /* validation error handling */
    if (error?.errors?.name) {
      responseObject = validationError(error);
      statusCode = error.statusCode;
    }
  }

  if (process.env.NODE_ENV == "development") {
    responseObject = { ...responseObject, error, stack: error.stack };
  }

  res.status(statusCode).json(responseObject);
  return next();
}

module.exports = {
  globalErrorHandler,
};
