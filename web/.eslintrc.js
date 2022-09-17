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
    "no-unused-vars": "off",
    "no-console": "off",
    "no-empty": "off",
    "linebreak-style": ["warn", "unix"]
  },
  settings: {}
}