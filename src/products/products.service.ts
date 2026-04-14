import { Injectable, NotFoundException } from '@nestjs/common'; //Injectable es que lo puedo usar en otros lados
//Se importan los Dtos
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


//Defino la forma del producto
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}



@Injectable()
export class ProductsService {
  // In-memory "database" – a plain array
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 999.99, description: 'A powerful laptop' },
    { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse' },
  ];

  //contador ids unicos
  private nextId = 3;


  //CRUD
  //Devuelvo todos los productos (array completo)
  findAll(): Product[] {
    return this.products;
  }


  //Busco un producto por su id
  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  //creo producto a partir de los datos que vienen del request
  create(dto: CreateProductDto): Product {
    const product: Product = {
      id: this.nextId++,
      name: dto.name,
      price: dto.price,
      description: dto.description ?? '',
    };
    this.products.push(product);
    return product;
  }

  //Actualizo un producto que ya existe
  update(id: number, dto: UpdateProductDto): Product {
    const product = this.findOne(id); // reuses findOne – throws if not found
    Object.assign(product, dto);
    return product;
  }
// elimina un producto del array
  remove(id: number): Product {
    const product = this.findOne(id);
    this.products = this.products.filter((p) => p.id !== id);
    return product;
  }
}
