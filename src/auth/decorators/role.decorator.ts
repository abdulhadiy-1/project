import { SetMetadata } from '@nestjs/common';
import { AuthRole } from 'src/auth/enum/auth-role.enum'; 

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AuthRole[]) => SetMetadata(ROLES_KEY, roles);
