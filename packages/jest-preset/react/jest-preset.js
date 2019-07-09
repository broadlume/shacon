const path = require("path");

module.exports = {
  ...require("./../default/jest-preset"),
  setupFilesAfterEnv: [path.resolve(__dirname, "./../setup-jest.js")],
  testEnvironment: "enzyme",
  testEnvironmentOptions: {
    enzymeAdapter: "react16"
  }
};
