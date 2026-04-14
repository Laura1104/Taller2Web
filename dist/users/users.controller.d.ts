import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TasksService } from 'src/tasks/tasks.service';
export declare class UsersController {
    private readonly usersService;
    private readonly tasksService;
    constructor(usersService: UsersService, tasksService: TasksService);
    findAll(): import("./users.service").User[];
    findByEmail(email: string): import("./users.service").User;
    getTasksForUser(id: number): import("src/tasks/tasks.service").Task[];
    findOne(id: number): import("./users.service").User;
    create(createUserDto: CreateUserDTO): import("./users.service").User;
    update(id: number, updateUserDto: UpdateUserDto): import("./users.service").User;
    remove(id: number): import("./users.service").User;
}
