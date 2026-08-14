import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/utils';
import { Recipe } from '../recipes/utils';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Recipe])],
  providers: [SeedService],
})
export class SeedModule {}
