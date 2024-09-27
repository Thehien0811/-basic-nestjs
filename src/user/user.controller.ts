import { Controller, Get, Query } from '@nestjs/common';
import { UserFilter, UserPagination } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAll(@Query() params: UserFilter): Promise<UserPagination> {
    return this.userService.getAll(params);
  }
}
