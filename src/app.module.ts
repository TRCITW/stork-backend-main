import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import {grpcClientOptions} from "./grpc-client-options";
import {GrpcReflectionModule} from "nestjs-grpc-reflection";
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [

    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
      isGlobal: true,
    }),

    GrpcReflectionModule.register(grpcClientOptions),

    DatabaseModule,

    AuthModule
  ],
})
export class AppModule {}
