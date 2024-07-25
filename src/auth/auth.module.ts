import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {DatabaseModule} from "../database/database.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    DatabaseModule,

    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '120d'
      }
    }),
  ],
  exports: [
    JwtModule
  ]
})
export class AuthModule {}
