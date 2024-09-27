import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserFilter, UserPagination } from './dtos/user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(@Query() params: UserFilter): Promise<UserPagination> {
    return this.userService.getAll(params);
  }

  @Get(':id')
  getDetail(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getDetail(id);
  }
}
