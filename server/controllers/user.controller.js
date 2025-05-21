const userCollection = require("../models/user.model");

async function getUserDetails(req, res) {
  const user = await userCollection.find({ _id: req.body.userId });
  return res.status(200).json({
    success: true,
    message: "User details fetched successfully.",
    data: user,
  });
}

async function getAllUserDetails(req, res) {
  const allUsers = await userCollection.find({ _id: { $ne: req.body.userId } });
  return res.status(200).json({
    success: true,
    message: "All user details fetched successfully.",
    data: allUsers,
  });
}

module.exports = {
  getUserDetails,
  getAllUserDetails,
};
