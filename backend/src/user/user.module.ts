import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './ports/user.repository';
import { ConcreteUserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepository, useClass: ConcreteUserRepository },
  ],
  exports: [UserService],
})
export class UserModule {}
