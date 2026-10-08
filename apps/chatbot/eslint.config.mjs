import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// `eslint-config-next` ships legacy (eslintrc) shareable configs. FlatCompat
// bridges them into the flat-config format ESLint 9 uses. This is the setup
// `create-next-app` scaffolds for Next 15 — kept because `next lint` is
// deprecated in Next 15 and removed in Next 16.
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
    { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
    ...compat.extends('next/core-web-vitals', 'next/typescript')
];

export default eslintConfig;
