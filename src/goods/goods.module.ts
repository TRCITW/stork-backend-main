import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
  controllers: [GoodsController],
  providers: [GoodsService],
  imports: [

    DatabaseModule

  ]
})
export class GoodsModule {}
