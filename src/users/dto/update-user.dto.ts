// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-B  ·  Create UpdateUserDto
// ─────────────────────────────────────────────────────────────────────────────
// Same as CreateUserDto but every field is optional (PATCH semantics).
// ─────────────────────────────────────────────────────────────────────────────

// TODO: your code here

import{
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEmail,
    IsEnum,
    IsInt,
    IsPositive,
    MinLength,
    MaxLength,
    Min,
    Max,

} from 'class-validator'

import {UserRole} from './create-user.dto'
export class UpdateUserDto{
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(120)
    age?: number;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;


    
}