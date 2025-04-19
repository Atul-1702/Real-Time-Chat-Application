require('dotenv').config({path:'./config.env'});
const app = require("./app");
const mongodbConnection = require("./config/db.config");

const serverPORT= process.env.PORT || 3000;

app.listen(serverPORT, async () => {
  console.log("App is running on port",serverPORT);
  await mongodbConnection();
});
