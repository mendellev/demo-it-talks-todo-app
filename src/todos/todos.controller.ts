import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
    type: Todo,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({
    status: 200,
    description: 'Return all todos.',
    type: [Todo],
  })
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by id' })
  @ApiParam({ name: 'id', type: 'number', description: 'Todo ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the todo.',
    type: Todo,
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo' })
  @ApiParam({ name: 'id', type: 'number', description: 'Todo ID' })
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully updated.',
    type: Todo,
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Patch(':id/toggle')
  @ApiOperation({ summary: 'Toggle todo completion status' })
  @ApiParam({ name: 'id', type: 'number', description: 'Todo ID' })
  @ApiResponse({
    status: 200,
    description: 'The todo completion status has been toggled.',
    type: Todo,
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  toggleComplete(@Param('id') id: string): Promise<Todo> {
    return this.todosService.toggleComplete(+id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiParam({ name: 'id', type: 'number', description: 'Todo ID' })
  @ApiResponse({
    status: 204,
    description: 'The todo has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.todosService.remove(+id);
  }
}
