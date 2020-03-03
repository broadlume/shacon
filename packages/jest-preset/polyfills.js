require("react-app-polyfill/jsdom");

function buildFakeAnalytics() {
  const analytics = {};
  const noop = () => void 0;
  const methods = [
    "trackLink",
    "trackForm",
    "identify",
    "reset",
    "group",
    "track",
    "ready",
    "alias",
    "debug",
    "page",
    "on"
    // "trackSubmit",
    // "trackClick",
    // "pageview",
    // "once",
    // "off",
  ];

  methods.forEach(key => {
    analytics[key] = noop;
  });

  return analytics;
}

// Hack until this is resolved:
// https://github.com/facebook/react/issues/14769
const originalError = console.error;

console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }

  originalError.call(console, ...args);
};

window.analytics = buildFakeAnalytics();
