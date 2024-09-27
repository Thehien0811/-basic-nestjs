import { Injectable } from '@nestjs/common';
import { UserFilter, UserPagination } from './dtos/user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(filter: UserFilter): Promise<UserPagination> {
    const items_per_page = Number(filter.items_per_page) || 10;
    const page = Number(filter.page) || 1;
    const search = filter.search || ``;

    const skip = page > 1 ? (page - 1) * items_per_page : 0;
    const users = await this.prismaService.user.findMany({
      take: items_per_page,
      skip: skip,
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
        ],
      },
      orderBy: {
        createAt: 'desc',
      },
    });

    const total = await this.prismaService.user.count();

    return {
      data: users,
      total: total,
      current_page: page,
      items_per_page: items_per_page,
    };
  }
}
