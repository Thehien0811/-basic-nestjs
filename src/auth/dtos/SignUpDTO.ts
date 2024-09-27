import { IsEmail, MinLength } from 'class-validator';
export class SignUpDTO {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
