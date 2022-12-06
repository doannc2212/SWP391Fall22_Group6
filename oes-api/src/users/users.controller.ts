import {
  Controller,
  UseGuards,
  Get,
  Put,
  Body,
  Req,
  Delete,
  Patch,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('search')
  async searchUser(@UserEntity() user: User): Promise<User> {
    user.password = undefined;
    return user;
  }

  @Get('me')
  async me(@UserEntity() user: User): Promise<User> {
    user.password = undefined;
    return user;
  }

  @Put('updateProfile')
  async updateProfile(
    @UserEntity() user: User,
    @Body() newUserData: UpdateUserInput
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  @Put('changePassword')
  changePassword(
    @UserEntity() { id, password }: User,
    @Body() data: ChangePasswordInput
  ) {
    return this.usersService.changePassword(id, password, data);
  }

  @Put()
  async updateUser(@Body() data: UpdateUserInput & { id: string }) {
    const { id, ...newUserData } = data;
    return this.usersService.updateUser(id, newUserData);
  }

  // @Put()
  // async clearExamination(@Body() { id }: { id: string }) {
  //   return this.usersService.clearExamination(id);
  // }

  // @Put()
  // async appendExamination(@Body() { id }: { id: string }) {
  //   return this.usersService.appendExamination(id);
  // }

  @Patch()
  async updateMultipleUser(@Body() data: UpdateUserInput & { ids: string[] }) {
    const { ids, ...newUserData } = data;
    return this.usersService.updateMultipleUser(ids, newUserData);
  }

  @Get()
  async getUser(@Req() req: Request): Promise<User> {
    const id = req.query.id as string;
    return this.usersService.getUser(id);
  }

  @Delete()
  async deleteUser(@Req() req: Request): Promise<User> {
    const id = req.query.id as string;
    return this.usersService.deleteUser(id);
  }
}
