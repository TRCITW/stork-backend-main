import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import {DatabaseModule} from "../database/database.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [GoodsController],
  providers: [GoodsService],
  imports: [

    DatabaseModule,

    AuthModule

  ]
})
export class GoodsModule {}
