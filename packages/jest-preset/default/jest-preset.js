const path = require("path");

module.exports = {
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/stories/",
    "/packages/webpack-config/",
    "/packages/common/",
    "/packages/bootstrap-theme/",
    "/packages/analytics/",
    "/packages/fs-wordpress-plugin/",
  ],
  transform: {
    "\\.(gql|graphql)$": require.resolve("jest-transform-graphql"),
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": path.resolve(
      __dirname,
      "./../file-mock.js"
    ),
    "^.+\\.tsx?$": path.resolve(__dirname, "./../babel-jest.js"),
  },
  testRegex: "(/__tests__/.*|(\\.|/)spec)\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: [path.resolve(__dirname, "./../polyfills.js")],
  transformIgnorePatterns: ["/node_modules/(?!@franchises).*/"],
  modulePathIgnorePatterns: ["/__helpers__/"],
  moduleNameMapper: {
    "\\.(scss|css|less)$": require.resolve("identity-obj-proxy"),
    "\\.(yml)": path.resolve(__dirname, "./../string-proxy.js"),
  },
};
