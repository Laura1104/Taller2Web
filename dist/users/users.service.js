"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
let UsersService = class UsersService {
    constructor() {
        this.users = [
            { id: 1, name: 'Pepita Perez', email: 'pepita@gmail.com', age: 22, role: create_user_dto_1.UserRole.STUDENT },
            { id: 2, name: 'Pepito Poveda', email: 'pepitop@gmail.com', age: 25, role: create_user_dto_1.UserRole.ADMIN },
        ];
        this.nextId = 3;
    }
    findAll() {
        return this.users;
    }
    findByEmail(email) {
        const user = this.users.find((u) => u.email === email);
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }
    findOne(id) {
        const user = this.users.find((u) => u.id === id);
        if (!user) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        return user;
    }
    create(dto) {
        if (this.users.find((u) => u.email === dto.email)) {
            throw new common_1.ConflictException('Email already registered');
        }
        const user = {
            id: this.nextId++,
            name: dto.name,
            email: dto.email,
            age: dto.age,
            role: dto.role,
        };
        this.users.push(user);
        return user;
    }
    update(id, dto) {
        const user = this.findOne(id);
        Object.assign(user, dto);
        return user;
    }
    remove(id) {
        const user = this.findOne(id);
        this.users = this.users.filter((u) => u.id !== id);
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map