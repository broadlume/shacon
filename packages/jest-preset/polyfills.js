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

window.analytics = buildFakeAnalytics();
