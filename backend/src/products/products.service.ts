import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({
        data: createProductDto,
      });
    } catch (error) {
      console.log({ error });
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.code);
        if (error.code === 'P2002') {
          throw new ConflictException('Product with this name already exists');
        }
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const productFound = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productFound) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return productFound;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productFound = await this.prisma.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });

    if (!productFound) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return productFound;
  }

  async remove(id: number) {
    const deletedProduct = await this.prisma.product.delete({
      where: {
        id,
      },
    });

    if (!deletedProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }
  }
}
