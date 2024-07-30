import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import {DatabaseModule} from "../database/database.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [

    DatabaseModule,

    AuthModule

  ]
})
export class ClientsModule {}
