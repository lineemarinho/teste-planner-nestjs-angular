import { IsOptional, IsString } from 'class-validator';

export class CategoriesFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
