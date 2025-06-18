import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationQueryParams {
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  @Expose()
  page?: number = 0;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  @Expose()
  pageSize?: number = 10;
}

export class PaginationResult<T> {
  items: T[];
  total: number;
}
