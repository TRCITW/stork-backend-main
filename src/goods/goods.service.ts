import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../database/database.service";

@Injectable()
export class GoodsService {

    constructor(private readonly database: DatabaseService) {
    }

    


}
