import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {CreateClientAddressDto} from "./dto/create-client-address.dto";
import {
    Brand,
    Client,
    ClientAddress, Good,
    GoodCategory,
    GoodDiscount,
    ManufacturerCountry,
    Media
} from "../proto-generated/entity";

@Injectable()
export class ClientsService {

    constructor(private readonly database: DatabaseService) {
    }

    async createAddress(dto: CreateClientAddressDto) {
        const data = await this.database.clientAddresses.create({
            data: {
                ...dto
            }
        })
        return data as ClientAddress
    }

    async destroyAddress(id?: number) {
        await this.database.clientAddresses.delete({
            where: {
                id: Number(id)
            }
        })
    }

    async validateClientAddress() {
    }

    async updateClientName(userId: number, name?: string) {
        await this.database.clients.update({
            where: {
                id: userId
            },
            data: {
                name
            }
        })
    }

    async updateClientEmail(userId: number, email?: string) {
        await this.database.clients.update({
            where: {
                id: userId
            },
            data: {
                email: email
            }
        })
    }

    async fetchUserRecommendations(userId: number, limit?: number, offset?: number) {
        const data = await this.database.clientRecommendations.findMany({
            where: {
                clientId: userId
            },
            take: Number(limit),
            skip: Number(offset),
            include: {
                good: {
                    include: {
                        brand: true,
                        manufacturerCountry: true,
                        remnants: true,
                        goodCategory: true,
                        goodDiscounts: true,
                        goodsMedia: {
                            include: {
                                media: true
                            }
                        }
                    }
                }
            }
        })
        return {
            data: data.map(i => ({
                ...i.good,
                brand: i?.good?.brand as Brand,
                category: i?.good?.goodCategory as GoodCategory,
                manufacturerCountry: i?.good?.manufacturerCountry as ManufacturerCountry,
                discounts: i?.good?.goodDiscounts.map(x => x as GoodDiscount) ?? [],
                media: i?.good?.goodsMedia.map(x => x.media as Media) ?? []
            } as Good))
        }
    }

    async fetchClientModel(clientId: number) {
        const data = await this.database.clients.findFirst({
            where: {
                id: Number(clientId)
            },
            include: {
                avatar: true,
                clientAddresses: true
            }
        })
        return {
            ...data,
            addresses: data?.clientAddresses.map(i => i as ClientAddress),
            avatar: data?.avatar as Media
        } as Client
    }

    async saveFBMessagingToken(clientId: number, token?: string) {
        await this.database.clients.update({
            where: {
                id: Number(clientId)
            },
            data: {
                firebasePushToken: token
            }
        })
    }

    async destroyClientAccount(userId: number) {
    }


}
