import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  js.configs.recommended,

  // ✅ Config for plain JS/JSX (no TS rules)
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['node_modules', 'dist', 'build'],
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      hooks: hooksPlugin,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-key': 'warn',
      'react/jsx-uses-vars': 'error',
      'unused-imports/no-unused-imports': 'warn',
      'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }],
      'jsx-a11y/alt-text': 'warn',
      'no-undef': 'off',
    },
  },

  // ✅ Config for TypeScript (type-aware)
  // {
  //   files: ['**/*.{ts,tsx}'],
  //   ignores: ['node_modules', 'dist', 'build'],
  //   ...tseslint.configs.recommendedTypeChecked[0], // type-aware rules
  //   languageOptions: {
  //     ...tseslint.configs.recommendedTypeChecked[0].languageOptions,
  //     parserOptions: {
  //       project: ['./tsconfig.json'], // must be valid
  //       sourceType: 'module',
  //     },
  //   },
  //   plugins: {
  //     ...tseslint.configs.recommendedTypeChecked[0].plugins,
  //   },
  //   rules: {
  //     ...tseslint.configs.recommendedTypeChecked[0].rules,
  //     '@typescript-eslint/no-unused-vars': 'warn',
  //     '@typescript-eslint/explicit-function-return-type': 'off',
  //   },
  // },
];
