import { Module } from '@nestjs/common';
import { CourierService } from './courier.service';
import { CourierController } from './courier.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
  controllers: [CourierController],
  providers: [CourierService],
  imports: [

    DatabaseModule

  ]
})
export class CourierModule {}
