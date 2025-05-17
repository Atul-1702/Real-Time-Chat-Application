const userCollection = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const CustomError = require("../utils/cutom.error");

async function signup(req, res, next) {
  const { firstname, email, password } = req.body;
  if (!firstname || !email || !password) {
    return next(new CustomError("All fields are required.", 400));
  }
  const user = new userCollection(req.body);
  await user.save();
  return res.status(201).json({
    success: true,
    message: "User created successfully.",
  });
}

async function signin(req, res, next) {
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    return next(new CustomError("All field are required.", 400));
  }
  const user = await userCollection
    .findOne({ email: req.body.email })
    .select("password");
  if (!user) {
    return next(new CustomError("User does not exists.", 401));
  }
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return next(new CustomError("Password is not correct.", 401));
  }
  const token = jsonwebtoken.sign(
    { userId: user._id },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "1d" }
  );
  return res.status(200).json({
    success: true,
    message: "Login Successful.",
    token,
  });
}

module.exports = {
  signup,
  signin,
};
