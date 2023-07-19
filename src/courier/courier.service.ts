import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {RpcException} from "@nestjs/microservices";
import {CourierDeliveryTask} from "../proto-generated/entity";

@Injectable()
export class CourierService {

    constructor(private readonly database: DatabaseService) {
    }

    async startShift(userId: number) {
        await this.database.courierWorkingShift.updateMany({
            where: {
                courierId: userId,
                courierWorkingShiftState: {
                    in: ['STARTED']
                }
            },
            data: {
                courierWorkingShiftState: 'FAILURE',
                completedAt: new Date()
            }
        })
        await this.database.courierWorkingShift.create({
            data: {
                courierId: userId
            }
        })
    }

    async completeShift(userId: number) {
        await this.database.courierWorkingShift.updateMany({
            where: {
                courierId: userId,
                courierWorkingShiftState: {
                    in: ['STARTED']
                }
            },
            data: {
                courierWorkingShiftState: 'COMPLETED',
                completedAt: new Date()
            }
        })
    }

    async fetchAvailableTasks(take?: number, skip?: number) {
        const data = await this.database.orders.findMany({
            where: {
                orderState: 'ASSEMBLY'
            },
            include: {
                clientAddress: true,
                orderToGoods: {
                    include: {
                        good: true
                    }
                }
            }
        })
        return {
            data: data.map(i => i as CourierDeliveryTask)
        }
    }

    async fetchCourierTasks(userId: number) {
        const data = await this.database.courierDeliveryTask.findMany({
            where: {
                courierId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                order: {
                    include: {
                        clientAddress: true,
                        orderToGoods: {
                            include: {
                                good: true
                            }
                        }}
                }
            }
        })
        return {
            data: data.map(i => i as CourierDeliveryTask)
        }
    }

    async startDelivery(userId: number, orderId?: number) {
        const order = await this.database.orders.findFirst({
            where: {
                id: orderId
            }
        })
        if (order?.orderState !== 'ASSEMBLY') throw new RpcException('Заказ уже в работе')
        await this.database.courierDeliveryTask.create({
            data: {
                courierId: userId,
                orderId: orderId
            }
        })
        await this.database.orders.update({
            where: {
                id: orderId
            },
            data: {
                orderState: 'DELIVERY'
            }
        })
    }

    async readyDelivery(taskId?: number) {
        const task = await this.database.courierDeliveryTask.findFirst({
            where: {
                id: taskId
            },
        })
        const id = task?.orderId
        if (!id) throw new RpcException('task is undefined')
        await this.database.orders.update({
            where: {
                id: id
            },
            data: {
                orderState: 'DELIVERED'
            }
        })
    }

    async deliveryTaskCompleted(taskId?: number) {
        const task = await this.database.courierDeliveryTask.findFirst({
            where: {
                id: taskId
            },
        })
        const id = task?.orderId
        if (!id) throw new RpcException('task is undefined')
        await this.database.orders.update({
            where: {
                id: id
            },
            data: {
                orderState: 'CLIENT_CHECKED'
            }
        })
        await this.database.courierDeliveryTask.update({
            where: {
                id: taskId
            },
            data: {
                state: 'SUCCEED'
            }
        })
    }

    async fetchTaskHistory(userId: number, take?: number, skip?: number) {
        const data = await this.database.courierDeliveryTask.findMany({
            where: {
                courierId: userId
            },
            take,
            skip,
            orderBy: {
                createdAt: 'desc'
            }
        })
        return {
            data: data.map(i => i as CourierDeliveryTask)
        }
    }


}
