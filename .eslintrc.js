module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  plugins: ["react", "prettier", "@typescript-eslint"],
  extends: [
    "standard",
    "plugin:prettier/recommended",
    //"plugin:node/recommended",
    //"eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "next",
    //"plugin:react/jsx-runtime",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    project: ["tsconfig.json", "tailwind.config.js"],
  },
  overrides: [
    {
      files: ["hardhat.config.ts"],
      globals: { task: true },
    },
  ],
  rules: {
    "no-useless-constructor": 0,
    "no-use-before-define": "off",
    "node/no-unsupported-features/es-syntax": [
      "error",
      { version: "10", ignores: ["modules"] },
    ],
  },
};
