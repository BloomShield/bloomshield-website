import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: here });

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: ["**/.next/**", "**/.next-dev/**", "node_modules/**", "out/**", "**/next-env.d.ts", ".qa/**"] },
  { files: ["tests/**/*.cjs"], rules: { "@typescript-eslint/no-require-imports": "off" } }
];

export default config;
