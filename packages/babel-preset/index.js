const { kebabCase } = require("lodash");
const { declare } = require("@babel/helper-plugin-utils");

const optimizationPlugins = [
  require.resolve("babel-plugin-graphql-tag"),
  require.resolve("babel-plugin-lodash"),
  [
    require.resolve("babel-plugin-transform-react-remove-prop-types"),
    {
      removeImport: true,
    },
  ],
  [
    require.resolve("babel-plugin-transform-imports"),
    {
      reactstrap: {
        transform: "reactstrap/es/${member}",
        preventFullImport: true,
      },
      "@franchises/form-helpers": {
        transform: (importName) =>
          `@franchises/form-helpers/src/${kebabCase(importName)}`,
        preventFullImport: true,
        skipDefaultConversion: true,
      },
    },
  ],
];

module.exports = declare((api, _options) => {
  api.assertVersion("^7.0.0");

  const env = process.env.BABEL_ENV || process.env.NODE_ENV;
  const isEnvDevelopment = env === "development";
  const isEnvProduction = env === "production";
  const isEnvTest = env === "test";

  return {
    presets: [
      [
        require.resolve("@babel/preset-react"),
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: isEnvDevelopment || isEnvTest,
          useBuiltIns: true,
          runtime: "automatic",
        },
      ],
      require.resolve("@babel/preset-typescript"),
    ],
    plugins: [
      // Optional chaining and nullish coalescing are supported in @babel/preset-env,
      // but not yet supported in webpack due to support missing from acorn.
      // These can be removed once webpack has support.
      // See https://github.com/facebook/create-react-app/issues/8445#issuecomment-588512250
      require.resolve("@babel/plugin-proposal-optional-chaining"),
      require.resolve("@babel/plugin-proposal-nullish-coalescing-operator"),
      [require.resolve("@babel/plugin-proposal-decorators"), false],
      // class { handleClick = () => { } }
      // Enable loose mode to use assignment instead of defineProperty
      // See discussion in https://github.com/facebook/create-react-app/issues/4263
      [
        require.resolve("@babel/plugin-proposal-class-properties"),
        {
          loose: true,
        },
      ],
      // Adds Numeric Separators
      require.resolve("@babel/plugin-proposal-numeric-separator"),
      // Polyfills the runtime needed for async/await, generators, and friends
      // https://babeljs.io/docs/en/babel-plugin-transform-runtime
      [
        require.resolve("@babel/plugin-transform-runtime"),
        {
          corejs: false,
          helpers: false,
          // By default, babel assumes babel/runtime version 7.0.0-beta.0,
          // explicitly resolving to match the provided helper functions.
          // https://github.com/babel/babel/issues/10261
          version: require("@babel/runtime/package.json").version,
          regenerator: true,
          // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
          // We should turn this on once the lowest version of Node LTS
          // supports ES Modules.
          useESModules: isEnvDevelopment || isEnvProduction,
          // Undocumented option that lets us encapsulate our runtime, ensuring
          // the correct version is used
          // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
          absoluteRuntime: path.dirname(
            require.resolve("@babel/runtime/package.json")
          ),
        },
      ],
    ],
    overrides: [
      {
        test: /\.tsx?$/,
        plugins: [
          [
            require.resolve("@babel/plugin-proposal-decorators"),
            { legacy: true },
          ],
        ],
      },
    ],
    env: {
      development: {
        // We use these in development to catch errors early. However we cannot
        // use them in the test env because it breaks coverage, amongst other
        // things.
        plugins: optimizationPlugins,
      },
      production: {
        plugins: [
          ...optimizationPlugins,
          // Latest stable ECMAScript features
          require.resolve("@babel/preset-env"),
          {
            // Allow importing core-js in entrypoint and use browserlist to select polyfills
            useBuiltIns: "entry",
            // Set the corejs version we are using to avoid warnings in console
            corejs: 3,
            // Exclude transforms that make all code slower
            exclude: ["transform-typeof-symbol"],
          },
        ],
      },
    },
  };
});
