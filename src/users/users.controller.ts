// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-D  ·  Implement UsersController
// ─────────────────────────────────────────────────────────────────────────────
// Wire up ALL 5 endpoints under the '/users' path.
// Use ParseIntPipe for the :id param in every route that needs it.
//
//   GET    /users
//   GET    /users/:id
//   POST   /users          (201)
//   PATCH  /users/:id
//   DELETE /users/:id
// ─────────────────────────────────────────────────────────────────────────────


// TODO: import all decorators and pipes you need
// TODO: import your DTOs
import {
  Query,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
  ) {}

    // TODO: implement the 5 route handlers
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('search')
  findByEmail(@Query('email') email: string) {
  return this.usersService.findByEmail(email);
  }


  @Get(':id/tasks')
  getTasksForUser(@Param('id', ParseIntPipe) id: number) {
  const user = this.usersService.findOne(id);
  const allTasks = this.tasksService.findAll();
  return allTasks.filter((t) =>
    t.title.toLowerCase().startsWith(user.name.toLowerCase()),
  );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
