import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

//Module agrega todo lo que pertenece a products en una unidad (cajita)
@Module({
  controllers: [ProductsController], //rutas http que pertenecen al modulo
  providers: [ProductsService], //servicios dentro de ese modulo
})
export class ProductsModule {}
