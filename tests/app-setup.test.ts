import { INestApplication } from '@nestjs/common';

import { start } from '../src/start';

export let app: INestApplication;
export const PORT = process.env.TEST_PORT || '0';

export async function startTestApp(): Promise<{ app: INestApplication; port: number }> {
  const { app, port } = await start(PORT);
  expect(app).toBeDefined();
  expect(port).toBeDefined();
  return { app, port };
}

export async function stopTestApp(): Promise<void> {
  if (app) {
    await app.close();
    console.log('Application de test arrêtée.');
  }
}
