import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { RegisterAuthDto } from './register-auth.dto';

const CombinedDto = IntersectionType(LoginAuthDto, RegisterAuthDto);

export class UpdateAuthDto extends PartialType(CombinedDto) {}
