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
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.createUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User Successfully Created',
      user,
    });
  }

  @Get('/')
  async getUsers(@Res() res) {
    const users = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json({
      users,
    });
  }

  @Get('/:id')
  async getUser(@Res() res, @Param('id') id) {
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

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
}
