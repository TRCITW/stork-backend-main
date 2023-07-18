import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import {grpcClientOptions} from "./grpc-client-options";
import {GrpcReflectionModule} from "nestjs-grpc-reflection";
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { FilterModule } from './filter/filter.module';
import { ClientsModule } from './clients/clients.module';
import { GoodsModule } from './goods/goods.module';
import { CourierModule } from './courier/courier.module';

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

    AuthModule,

    CategoriesModule,

    FilterModule,

    ClientsModule,

    GoodsModule,

    CourierModule
  ],
})
export class AppModule {}
