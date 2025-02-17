import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { UserRole } from 'src/common/enums/role.enum';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Auth([UserRole.admin])
  @Post('/create')
  async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.createUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User Successfully Created',
      user,
    });
  }

  @Auth([UserRole.admin])
  @Get('/')
  async getUsers(@Res() res) {
    const users = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json({
      users,
    });
  }

  @Auth([UserRole.admin,UserRole.user])
  @Get('/:id')
  async getUser(@Res() res, @Param('id') id) {
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  @Auth([UserRole.admin])
  @Put('/delete/:id')
  async deleteUser(
    @Res() res,
    @Body() { newStatus }: { newStatus: boolean },
    @Param('id') id,
  ) {
    const user = await this.userService.deleteUser(id, newStatus);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User Deleted Successfully',
      user,
    });
  }

  @Auth([UserRole.admin])
  @Put('/update/:id')
  async updateUser(
    @Res() res,
    @Body() updateUserDTO: UpdateUserDTO,
    @Param('id') id,
  ) {
    const user = await this.userService.updateUser(id, updateUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User Updated Successfully',
      user,
    });
  }

  @Auth([UserRole.admin,UserRole.user])
  @Put('/update')
  async updateOwnProfile(@Res() res, @Body() updateUserDTO: UpdateUserDTO) {
    const user = await this.userService.updateUser(
      updateUserDTO._id,
      updateUserDTO,
    );
    if (!user) throw new NotFoundException('User does not exist!');
    if (user._id !== updateUserDTO._id) {
      throw new NotFoundException('You are not authorized to perform this action');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User Updated Successfully',
      user,
    });
  }
}
