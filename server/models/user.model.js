const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required."],
    trim: true,
  },
  lastname: {
    type: String,
    deafault: "",
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    trim: true,
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: [8, "Password must be at max 8 characters"],
  },
  profilepic: {
    type: String,
    deafault: "",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  }catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("user", userSchema);
