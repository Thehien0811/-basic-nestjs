import { User } from '@prisma/client';

export interface UserFilter {
  items_per_page?: number;
  page?: number;
  search?: string;
}

export interface UserPagination {
  data: User[];
  total: number;
  current_page: number;
  items_per_page: number;
}
