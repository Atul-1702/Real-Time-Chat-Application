async function cleanupBeforeExit(server) {
  try {
    await require("mongoose").connection.close(); // Close database
    server.close(); // Stop accepting new requests
  } catch (err) {
    console.error("Error during cleanup:", err);
  }
}
module.exports = function (server) {
  process.on("unhandledRejection", async (err) => {
    await cleanupBeforeExit(server);
    console.log(`Unhandled promise in code.!`);
    console.log(err);
    process.exit(1);
  });
};
