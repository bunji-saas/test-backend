import 'reflect-metadata';

import { Logger } from '@nestjs/common';

import { start } from './start';

start()
  .then(({ app }) => (app.get(Logger) || console).log(`Startup OK`))
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`Error on startup`, error);
  });
