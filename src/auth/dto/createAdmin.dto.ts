import { ApiProperty } from "@nestjs/swagger"
import {  IsEmail, IsEnum, IsString,  MaxLength,  MinLength } from "class-validator"
import { AuthRole } from "src/auth/enum/auth-role.enum"

export class CreateAdminDto {
    @ApiProperty({example: "string"})
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    firstName:string

    @ApiProperty({example:"string"})
    @IsEmail()
    email: string
    
    @ApiProperty({example:"string"})
    @IsString()
    @MaxLength(16)
    @MinLength(8)
    password: string

    @ApiProperty({enum:AuthRole,example:AuthRole.ADMIN})
    @IsEnum(AuthRole)
    role: AuthRole;
}