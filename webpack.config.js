const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    root: [path.resolve("./src")],
    alias: {
      "@general": path.resolve(__dirname, "./Components/General"),
    },
    extensions: ["", ".js", ".jsx"],
  },
};
