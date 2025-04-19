
function globalErrorHandler(error, req, res,next) {
  statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
  return next();
}

module.exports = {
  globalErrorHandler,
};
