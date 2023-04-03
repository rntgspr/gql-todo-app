const { populateRedis } = require("../cypress/support/redis");

module.exports = async () => populateRedis();
