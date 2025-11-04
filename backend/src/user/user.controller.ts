import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO, CreateUserResponse, DeleteUserResponse } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({ type: CreateUserResponse })
  create(@Body() dto: CreateUserDTO): Promise<CreateUserResponse> {
    return this.userService.create(dto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteUserResponse })
  delete(@Param('id') id: string): Promise<DeleteUserResponse> {
    return this.userService.delete(id);
  }
}
