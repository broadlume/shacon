const path = require("path");

module.exports = {
  ...require("./../default/jest-preset"),
  setupFilesAfterEnv: [require.resolve("jest-enzyme")],
  testEnvironment: "enzyme",
  testEnvironmentOptions: {
    enzymeAdapter: "@wojtekmaj/enzyme-adapter-react-17",
  },
};
