import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {CreateOrderDto} from "./dto/create-order.dto";
import {RpcException} from "@nestjs/microservices";
import {Order} from "../proto-generated/entity";

@Injectable()
export class OrdersService {

    constructor(private readonly database: DatabaseService) {
    }

    async createOrder(dto: CreateOrderDto) {
        const goods = await this.database.goods.findMany({
            where: {
                id:{
                    in: dto.goods.map(i => i.goodId ?? 0)
                }
            },
            include: {
                goodDiscounts: true
            }
        })
        const amount = goods
            .map(i => i.basePrice ?? 0.0)
            .reduce((sum, current) => sum + current, 0)

        const data = await this.database.orders.create({
            data: {
                clientId: dto.clientId,
                clientAddressId: dto.clientAddressId,
                totalAmount: amount,
                orderToGoods: {
                    createMany: {
                        data: [
                            ...dto.goods.map(i => ({
                                goodId: i.goodId,
                                amount: i.amount
                            }))
                        ]
                    }
                }
            }
        })
        return data as Order
    }

    async repeatOrder(orderId?: number) {
        const order = await this.database.orders.findFirst({
            where: {
                id: orderId
            },
            include: {
                orderToGoods: {
                    include: {
                        good: true
                    }
                }
            }
        })
        if (!order) throw new RpcException('order is undefined')
        const dto: CreateOrderDto = {
            clientAddressId: order.clientAddressId,
            clientId: order.clientId,
            goods: order.orderToGoods.map(i => ({
                goodId: i.goodId,
                amount: i.amount
            }))
        }
        const data = await this.createOrder(dto)
        return data
    }

    async cancelOrder(orderId?: number) {
        await this.database.orders.update({
            where: {
                id: orderId
            },
            data: {
                orderState: 'CANCELED'
            }
        })
        await this.requestRefund()
        await this.database.courierDeliveryTask.updateMany({
            where: {
                orderId: orderId
            },
            data: {
                state: 'CANCELED'
            }
        })
    }

    async fetchOrderModel(orderId?: number) {
        const order = await this.database.orders.findFirst({
            where: {
                id: orderId
            },
            include: {
                client: {
                    include: {
                        clientAddresses: true
                    }
                },
                orderToGoods: {
                    include: {
                        good: true
                    }
                }
            }
        })
        if (!order) throw new RpcException('order is undefined')
        return {
            ...order,
            client: undefined
        } as Order
    }

    private async requestRefund() {
    }

}
