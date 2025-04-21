
const uncaughtException = process.on('uncaughtException',async(err)=>{
    console.log("Some uncaught exception has occured!");
    await require('mongoose').connection.close();
    process.exit(1);
  });

  module.exports = uncaughtException;