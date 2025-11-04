// login.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginService } from './login.service';
import { LoginRepository } from './ports/login.repository';
import { ConcreteLoginRepository } from './login.repository';
import { LoginController } from './login.controller';
import { User } from '../domain/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', String(process.env.JWT_SECRET)),
        signOptions: { algorithm: 'HS256', expiresIn: '6h' },
      }),
    }),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    { provide: LoginRepository, useClass: ConcreteLoginRepository },
  ],
  exports: [LoginService],
})
export class LoginModule {}