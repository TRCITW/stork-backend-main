import {fakerRU} from "@faker-js/faker";
import {prisma} from "../database/prisma-client";
import {OrdersStates} from ".prisma/client";

const randomId: <T extends  { id: number }>(arr: T[]) => number | undefined = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr.at(randomIndex)?.id
}

const createOrder = (clientId?: number, clientAddressId?: number) => ({
    clientId: clientId,
    totalAmount: fakerRU.number.int({ min: 100, max: 15000 }) ,
    orderState: OrdersStates.CREATED,
    packages: fakerRU.number.int({ min: 1, max: 5 }),
    weightKg: fakerRU.number.int({ min: 1, max: 40 }) ,
    clientAddressId: clientAddressId,
    comment: fakerRU.lorem.words({ min: 3, max: 15 }),
})

const createOrderToGood = (goodId?: number, orderId?: number) => ({
    goodId: goodId,
    orderId: orderId,
    amount: fakerRU.number.int({ min: 1, max: 10 }),
})

const createOrders = async () => {
    const clients = await prisma.clients.findMany()
    const clientAddresses = await prisma.clientAddresses.findMany()
    const ordersData = fakerRU.helpers.uniqueArray(
        () => createOrder(randomId(clients), randomId(clientAddresses)),
        100
    )

    const orders = await prisma.$transaction(
        ordersData.map(data => prisma.orders.create({ data: data }))
    )

    const goods = await prisma.goods.findMany()
    const orderToGoodData = fakerRU.helpers.uniqueArray(
        () => createOrderToGood(randomId(goods), randomId(orders)),
        250
    )
    await prisma.orderToGoods.createMany({
        data: orderToGoodData
    })
}

createOrders()