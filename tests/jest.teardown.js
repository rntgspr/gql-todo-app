const { disconnect } = require("../cypress/support/redis");

module.exports = async (...params) => {
  await disconnect();
  console.log("Redis disconnected...");
};
