import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ description: 'The title of the todo', example: 'Buy groceries' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the todo',
    example: 'Buy milk, eggs, and bread',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Whether the todo is completed',
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
