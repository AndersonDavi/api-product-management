import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '../../common/enums/role.enum';
import { AuthGuard } from '../guard/auth.guard';
import { RoleGuard } from '../guard/role.guard';
import { Roles } from './role.decorator';

export function Auth(roles: UserRole[]) {
  return applyDecorators(UseGuards(AuthGuard, RoleGuard), Roles(roles));
}
