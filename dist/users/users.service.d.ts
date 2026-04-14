import { CreateUserDTO, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    role?: UserRole;
}
export declare class UsersService {
    private users;
    private nextId;
    findAll(): User[];
    findByEmail(email: string): User;
    findOne(id: number): User;
    create(dto: CreateUserDTO): User;
    update(id: number, dto: UpdateUserDto): User;
    remove(id: number): User;
}
