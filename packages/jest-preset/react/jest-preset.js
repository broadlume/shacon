const path = require("path");

module.exports = {
  ...require("./../default/jest-preset"),
  setupFilesAfterEnv: [require.resolve("./setup-tests")],
  testEnvironment: "jsdom",
};
