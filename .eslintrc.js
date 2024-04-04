module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: { node: true, jest: true },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector: "ExportDefaultDeclaration",
        message: "Disallow default exports. Prefer named ones.",
      },
      {
        selector: "TSEnumDeclaration",
        message:
          "Disallow ts enums. Prefer array of values as const + union type.",
      },
    ],
    "no-return-await": "off",
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "@typescript-eslint/no-explicit-any": ["error"],
    "@typescript-eslint/return-await": ["error", "always"],
    "@typescript-eslint/promise-function-async": ["error"],
    "@typescript-eslint/no-misused-promises": ["error"],
    "@typescript-eslint/member-ordering": [
      "error",
      {
        default: [
          "private-field",
          "protected-field",
          "public-field",
          "constructor",
          "public-method",
          "protected-method",
          "private-method",
        ],
      },
    ],
    "max-classes-per-file": ["error", { ignoreExpressions: true, max: 1 }],
  },
};
