import { Injectable } from '@nestjs/common';
import { PostDTO } from './dtos/post.dto';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(post: PostDTO): Promise<Post> {
        return this.prismaService.post.create({
            data: {...post}
        })
    }
}
