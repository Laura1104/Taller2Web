// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 2-B  ·  Build the UpdateTaskDto
// ─────────────────────────────────────────────────────────────────────────────
// Requirements:
//   - Same fields as CreateTaskDto but ALL fields are optional (it's a PATCH)
//   - Re-use the same validators but add @IsOptional() to each field
// ─────────────────────────────────────────────────────────────────────────────

// TODO: import validators from 'class-validator'

import { IsString, IsEnum, IsNumber, IsPositive, IsOptional, MinLength, MaxLength } from 'class-validator';
import { TaskStatus } from './create-task.dto';



export class UpdateTaskDto {
  // TODO: implement the DTO (copy fields from CreateTaskDto and make them optional)
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
