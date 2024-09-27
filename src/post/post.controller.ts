import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostDTO } from './dtos/post.dto';
import { PostService } from './post.service';
import { Post as PrismaPost } from '@prisma/client';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() body: PostDTO): Promise<PrismaPost> {
    return this.postService.create(body);
  }
}
