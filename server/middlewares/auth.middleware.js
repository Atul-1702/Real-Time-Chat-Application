const jwt = require("jsonwebtoken");

function AuthMiddleware(req, res, next) {
  const token = req.body?.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }
  const user = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
  req.body.userId = user.userId;
  next();
}

module.exports = AuthMiddleware;
