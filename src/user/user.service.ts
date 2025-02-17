import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './interfaces/user.interface';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find({ active: true }).select('-password');
    return users;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email, active: true });
    return user;
  }
  

  async getUser(userID: string): Promise<User | null> {
    const user = await this.userModel.findOne({ _id: userID, active: true }).select('-password');
    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = new this.userModel(createUserDTO);
    return await user.save();
  }

  async deleteUser(userID: string, newStatus: boolean): Promise<User | null> {
    const deactivatedUser = await this.userModel.findByIdAndUpdate(
      userID,
      { active: newStatus },
      { new: true },
    );
    return deactivatedUser;
  }

  async updateUser(
    userID: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<User | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userID,
      updateUserDTO,
      { new: true },
    ).select('-password');
    return updatedUser;
  }
}
