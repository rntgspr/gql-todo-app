module.exports = {
  globalSetup: "./tests/jest.setup.js",
  globalTeardown: "./tests/jest.teardown.js",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};
