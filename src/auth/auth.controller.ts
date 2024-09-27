import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from './dtos/UserDTO';
import { User } from '.prisma/client';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dtos/SignUpDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signin')
  signin(@Body() body: UserDTO): Promise<User> {
    return this.authService.create(body);
  }

  @Post('/signup')
  signup(@Body() body: SignUpDTO): Promise<any> {
    return this.authService.signup(body);
  }
}
