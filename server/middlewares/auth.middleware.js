const jwt = require("jsonwebtoken");
const CustomError = require("../utils/cutom.error");

function AuthMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new CustomError("Access denied. No token provided.", 401));
  }
  const user = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  if (!user) {
    return next(new CustomError("Invalid or expired token.", 401));
  }
  console.log(user);
  req.body = { ...req.body, userId: user.userId };
  return next();
}

module.exports = AuthMiddleware;
