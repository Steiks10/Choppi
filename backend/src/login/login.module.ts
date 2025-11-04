// login.module.ts
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginRepository } from './ports/login.repository';
import { ConcreteLoginRepository } from './login.repository';
import { LoginController } from './login.controller';

@Module({
  controllers: [LoginController],
  providers: [
    LoginService,
    { provide: LoginRepository, useClass: ConcreteLoginRepository },
  ],
  exports: [LoginService],
})
export class LoginModule {}