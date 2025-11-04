import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { loginDTO, loginResponse } from './dto/login.dto';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiBody({ type: loginDTO })
  @ApiOkResponse({ type: loginResponse })
  login(@Body() loginDto: loginDTO): Promise<loginResponse> {   
    return this.loginService.login(loginDto);
  }
}