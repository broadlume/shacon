const { kebabCase } = require("lodash");
const { declare } = require("@babel/helper-plugin-utils");

const optimizationPlugins = [
  require.resolve("babel-plugin-graphql-tag"),
  require.resolve("babel-plugin-lodash"),
  require.resolve("babel-plugin-idx"),
  [
    require.resolve("babel-plugin-transform-imports"),
    {
      reactstrap: {
        transform: "reactstrap/lib/${member}",
        preventFullImport: true
      },
      "@franchises/form-helpers": {
        transform: importName =>
          `@franchises/form-helpers/src/${kebabCase(importName)}`,
        preventFullImport: true,
        skipDefaultConversion: true
      }
    }
  ]
];

module.exports = declare((api, _options) => {
  api.assertVersion("^7.0.0");

  return {
    presets: [
      [
        require.resolve("babel-preset-react-app"),
        { flow: false, typescript: true }
      ]
    ],
    plugins: ["@babel/plugin-proposal-optional-chaining"],
    env: {
      development: {
        // We use these in development to catch errors early. However we cannot
        // use them in the test env because it breaks coverage, amongst other
        // things.
        plugins: optimizationPlugins
      },
      production: {
        plugins: optimizationPlugins
      }
    }
  };
});
