require("dotenv").config({ path: "./config.env" });

/* Uncaught exception module */
require("./utils/uncaughtException");

const app = require("./app");
const mongodbConnection = require("./config/db.config");

const serverPORT = process.env.PORT || 3000;

const server = app.listen(serverPORT, async () => {
  console.log("App is running on port", serverPORT);
  await mongodbConnection();
});

/* Unhandled Promise  */
require("./utils/unhandledRejection")(server);
