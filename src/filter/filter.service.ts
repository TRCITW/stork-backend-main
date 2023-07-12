import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {Brand, ManufacturerCountry} from "../proto-generated/entity";

@Injectable()
export class FilterService {

    constructor(private readonly database: DatabaseService) {
    }

    async fetchBrands(take?: number, skip?: number) {
        const data = await this.database.brands.findMany({
            take: Number(take),
            skip: Number(skip)
        })
        return {
            data: data.map(i => i as Brand)
        }
    }

    async searchCountries(name?: string, take?: number, skip?: number) {
        const data = await this.database.manufacturerCountries.findMany({
            where: {
                name: {
                    contains: String(name ?? ''),
                    mode: 'insensitive'
                }
            },
            orderBy:{
                name: 'desc'
            },
            take: Number(take),
            skip: Number(skip)
        })
        return {
            data: data.map(i => i as ManufacturerCountry)
        }
    }

    async fetchCountries(take?: number, skip?: number) {
        const data = await this.database.manufacturerCountries.findMany({
            orderBy:{
                name: 'desc'
            },
            take: Number(take),
            skip: Number(skip)
        })
        return {
            data: data.map(i => i as ManufacturerCountry)
        }
    }

}
