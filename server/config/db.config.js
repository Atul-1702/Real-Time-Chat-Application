const mongoose = require("mongoose");

async function mongoDBConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected Successfully");
  } catch (err) {
    console.log("DB connection Failed", err);
  }
}

module.exports = mongoDBConnection;
