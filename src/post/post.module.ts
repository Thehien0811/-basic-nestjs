import { Module, ValidationPipe } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from 'src/prisma.service';

const POST_PIPE = 'POST_PIPE';
@Module({
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: POST_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
    PrismaService,
  ],
})
export class PostModule {}
