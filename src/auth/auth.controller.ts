import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get('list')
  // findMany() {
  //   return this.urlsService.findMany();
  // }
}
