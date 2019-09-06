const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter: new Adapter() });

// Hack until this is resolved:
// https://github.com/facebook/react/issues/14769
const originalError = console.error;

console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }

  originalError.call(console, ...args);
};
