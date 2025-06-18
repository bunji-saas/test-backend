import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  public getRoot(): { message: string } {
    return { message: 'Welcome to the NestJS application!' };
  }
}
