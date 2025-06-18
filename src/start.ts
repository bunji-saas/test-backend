import { AddressInfo } from 'node:net';

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

export async function start(
  port: string = process.env.PORT || '',
): Promise<{ app: INestApplication; port: number }> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const httpServer = await app.listen(port ? Number.parseInt(port, 10) : 4567);
  const effectivePort = (httpServer.address() as AddressInfo).port;

  app.get(Logger).log(`Application started on port ${effectivePort}`);
  return { app, port: effectivePort };
}
