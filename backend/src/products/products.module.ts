import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma.service';

@Module({
  // imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
