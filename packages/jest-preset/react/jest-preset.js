const path = require("path");

module.exports = {
  ...require("./../default/jest-preset"),
  setupFilesAfterEnv: [require.resolve("jest-enzyme")],
  testEnvironment: "enzyme",
  testEnvironmentOptions: {
    enzymeAdapter: "react16",
  },
};
