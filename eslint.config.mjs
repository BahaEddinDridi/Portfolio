import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * Flat config, consumed directly from `eslint-config-next`.
 *
 * The previous setup bridged the legacy `.eslintrc` format through
 * `@eslint/eslintrc`'s `FlatCompat`, which ESLint 10 no longer tolerates.
 */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
