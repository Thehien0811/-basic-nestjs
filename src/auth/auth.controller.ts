import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express'; // Import Response type from express
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
  @HttpCode(200)
  async signup(@Body() body: SignUpDTO, @Res() res: Response): Promise<void> {
    const { access_token } = await this.authService.signup(body);
    console.log(access_token)
    res.setHeader('Authorization', `Bearer ${access_token}`);
    res.json({ message: 'Success' });
  }
}
