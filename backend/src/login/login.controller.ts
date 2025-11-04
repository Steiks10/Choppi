import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import type { loginDTO, loginResponse } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() loginDto: loginDTO): Promise<loginResponse> {   
    return this.loginService.login(loginDto);
  }
}