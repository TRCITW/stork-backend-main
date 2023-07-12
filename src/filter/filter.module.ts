import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
  controllers: [FilterController],
  providers: [FilterService],
  imports: [

    DatabaseModule

  ]
})
export class FilterModule {}
