import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostDTO } from './dtos/post.dto';
import { PostService } from './post.service';
import { Post as PrismaPost } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() body: PostDTO): Promise<PrismaPost> {
    return this.postService.create(body);
  }
}