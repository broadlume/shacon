const { kebabCase } = require("lodash");
const { declare } = require("@babel/helper-plugin-utils");

module.exports = declare((api, _options) => {
  // see docs about api at https://babeljs.io/docs/en/config-files#apicache
  api.assertVersion("^7.0.0");

  return {
    presets: [["react-app", { flow: false, typescript: true }]],
    plugins: [
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
    ],
    env: {
      production: {
        plugins: ["babel-plugin-lodash"]
      }
    }
  };
});
