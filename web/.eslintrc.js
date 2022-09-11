module.exports = {
  parser: "@typescript-eslint/parser",
  extends: "eslint:recommended",
  env: {
    "commonjs": true,
    "node": true,
    "es6": true,
    "jest": true,
  },
  rules: {
    "no-console": "off",
    "curly": "warn",
    "linebreak-style": ["warn", "unix"]
  },
  settings: {
  }
}