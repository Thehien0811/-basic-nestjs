import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class UserDTO {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;
}
