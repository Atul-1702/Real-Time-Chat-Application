const userCollection = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const CustomError = require("../utils/cutom.error");

async function signup(req, res,next) {
  try {
    
    const { firstname, email, password } = req.body;
    if (!firstname || !email || !password) {

      // return res.status(400).json({
      //   success: false,
      //   message: "All fields are required.",
      // });

       
       return next(new CustomError("All fields are required.",400));
    }
    const user = new userCollection(req.body);
    await user.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (err) {
    if (err?.errorResponse?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email id already exists.",
      });
    }
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
}

async function signin(req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "All field are required.",
      });
    }
    const user = await userCollection.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exists.",
      });
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Password is not correct.",
      });
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
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  signup,
  signin,
};
