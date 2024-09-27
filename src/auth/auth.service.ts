import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDTO } from './dtos/UserDTO';
import { User } from '.prisma/client';
import { hash, compare } from 'bcrypt';
import { SignUpDTO } from './dtos/SignUpDTO';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  create = async (user: UserDTO): Promise<User> => {
    let existUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existUser) {
      throw new HttpException(
        { message: 'User is exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await hash(user.password, 10);
    const res = await this.prismaService.user.create({
      data: { ...user, password: hashPassword },
    });
    return res;
  };

  signup = async (info: SignUpDTO): Promise<any> => {
    const { email, password } = info;
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException(
        { message: "User doesn't exist" },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        { message: 'Invalid password' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return { message: 'Login successful' };
  };
}
