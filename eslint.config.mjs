import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintImport from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default [
  ...tseslint.config(eslint.configs.recommended, tseslint.configs.recommendedTypeChecked, {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }),
  eslintConfigPrettier,
  {
    plugins: {
      import: eslintImport,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': 'error',
    },
  },
  {
    rules: {
      curly: ['error', 'multi-line'],
      radix: ['error', 'always'],
      'no-console': ['error'],
      eqeqeq: ['error'],
      'no-useless-concat': ['error'],
      'prefer-template': ['error'],
      'no-constructor-return': ['error'],
      'no-duplicate-imports': ['error'],
      'no-inner-declarations': ['error'],
      'no-promise-executor-return': ['error'],
      'no-self-compare': ['error'],
      'no-template-curly-in-string': ['error'],
      'no-unreachable-loop': ['error'],
      'no-useless-assignment': ['error'],
      'require-atomic-updates': ['error'],
      // https://typescript-eslint.io/rules/naming-convention/
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['default'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'forbid',
        },
        {
          selector: ['variableLike', 'function', 'parameter'],
          modifiers: ['exported'],
          format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
        },
        {
          selector: ['memberLike'], // accessor, enumMember, method, parameterProperty, property
          modifiers: ['private', 'static'],
          format: ['camelCase'],
          filter: {
            regex: '^(forRoot|forRootAsync)$',
            match: false,
          },
        },
        {
          selector: ['memberLike'], // accessor, enumMember, method, parameterProperty, property
          modifiers: ['static'],
          format: ['UPPER_CASE'],
          filter: {
            regex: '^(forRoot|forRootAsync)$',
            match: false,
          },
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
        {
          selector: 'typeLike', // class, enum, interface, typeAlias, typeParameter,
          format: ['PascalCase'],
        },
        {
          selector: 'import',
          format: null,
          custom: {
            match: true,
            regex: '^(_|([A-Z][a-zA-Z0-9]*)+|[a-z]+)$',
          },
        },
        {
          selector: [
            'classProperty',
            'objectLiteralProperty',
            'typeProperty',
            'classMethod',
            'objectLiteralMethod',
            'typeMethod',
            'accessor',
            'enumMember',
          ],
          format: null, // means that we ignore them
          modifiers: ['requiresQuotes'], // Disable format when property needs quotes (ie: 'my.property.access' or 'my-property-access'),
        },
        {
          selector: ['objectLiteralProperty'],
          format: null, // means that we ignore them
        },
      ],
      'object-shorthand': ['error'],
      'no-else-return': ['error'],
    },
  },
  {
    files: ['tests/**/*.ts', 'src/**/*.test.ts'],
    rules: {
      'no-console': 'off', // Allow console in tests
    },
  },
];
