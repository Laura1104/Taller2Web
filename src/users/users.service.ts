// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-C  ·  Implement UsersService
// ─────────────────────────────────────────────────────────────────────────────
// Create an in-memory service following the same pattern as ProductsService.
//
// Requirements:
//   - Store users in a private array
//   - Pre-populate with at least 2 seed users
//   - Implement: findAll, findOne(id), create(dto), update(id, dto), remove(id)
//   - findOne must throw NotFoundException when user is not found
//
// Interface to use:
//   export interface User {
//     id: number;
//     name: string;
//     email: string;
//     age: number;
//     role: string;
//   }
  
  // TODO: implement the service
// ─────────────────────────────────────────────────────────────────────────────

// TODO: import NotFoundException and your DTOs
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


export interface User {
  id:number;
  name:string;
  email: string;
  age:number;
  role?: UserRole;
}


@Injectable()
export class UsersService {
  private users: User[]=[
    { id:1, name:'Pepita Perez', email: 'pepita@gmail.com', age: 22, role: UserRole.STUDENT},
    {id:2, name:'Pepito Poveda', email: 'pepitop@gmail.com', age: 25, role: UserRole.ADMIN},

  ];
  private nextId=3;   


  findAll (): User[] {
    return this.users;
  }

  findByEmail(email: string): User {
  const user = this.users.find((u) => u.email === email);
  if (!user) {
    throw new NotFoundException(`User with email ${email} not found`);
  }
  return user;
}

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(dto: CreateUserDTO): User {

    if (this.users.find((u) => u.email === dto.email)) {
      throw new ConflictException('Email already registered');
    }
    const user: User = {
      id: this.nextId++,
      name: dto.name,
      email: dto.email,
      age: dto.age,
      role: dto.role,
    };
    this.users.push(user);
    return user;
  }

  update(id: number, dto: UpdateUserDto): User {
    const user = this.findOne(id);  // lanza 404 si no existe
    Object.assign(user, dto);
    return user;
  }

  remove(id: number): User {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u.id !== id);
    return user;
  }

}
