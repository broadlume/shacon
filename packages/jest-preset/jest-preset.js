const path = require("path");

function build(config) {
  const jestConfig = {};
  const setupFiles = [require.resolve("./polyfills")];

  if (config && config.react) {
    Object.assign(jestConfig, {
      setupFilesAfterEnv: [require.resolve("jest-enzyme")],
      testEnvironment: "enzyme",
      testEnvironmentOptions: {
        enzymeAdapter: "react16"
      }
    });
  }

  return {
    ...jestConfig,
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "/stories/",
      "/packages/webpack-config/",
      "/packages/common/",
      "/packages/bootstrap-theme/"
    ],
    transform: {
      "\\.(gql|graphql)$": require.resolve("jest-transform-graphql"),
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": require.resolve(
        "./file-mock.js"
      ),
      "^.+\\.tsx?$": path.resolve("./babel-jest.js")
    },
    testRegex: "(/__tests__/.*|(\\.|/)spec)\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    setupFiles,
    // Allow for @franchises packages to be transformed
    transformIgnorePatterns: ["/node_modules/(?!@franchises).*/"],
    modulePathIgnorePatterns: ["/__helpers__/"],
    moduleNameMapper: {
      "\\.(scss|css|less)$": require.resolve("identity-obj-proxy"),
      "\\.(yml)": require.resolve("./string-proxy.js")
    }
  };
}

module.exports = build();

Object.defineProperty(module.exports, "build", {
  value: build,
  enumerable: false
});
