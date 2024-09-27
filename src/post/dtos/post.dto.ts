import { IsInt, IsNotEmpty } from 'class-validator';

export class PostDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  summary: string;

  @IsNotEmpty()
  content: string;

  @IsInt()
  ownerID: number;
}
