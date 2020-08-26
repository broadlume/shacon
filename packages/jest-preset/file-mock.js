const path = require("path");

module.exports = {
  process(_src, filename) {
    return `module.exports = "${path.basename(filename)}"`;
  },
};
