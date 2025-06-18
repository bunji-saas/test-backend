import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  silent: false,
  forceExit: true,
  rootDir: 'src',
  // transform: {
  //   '^.+\\.ts$': 'ts-jest',
  // },
  testRegex: '\\.(e2e-test|test).ts$',
};

export default config;
