const { kebabCase } = require("lodash");
const { declare } = require("@babel/helper-plugin-utils");

const optimizationPlugins = [
  "babel-plugin-graphql-tag",
  "babel-plugin-lodash",
  "babel-plugin-idx",
  [
    "babel-plugin-transform-imports",
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
    presets: [["react-app", { flow: false, typescript: true }]],
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
