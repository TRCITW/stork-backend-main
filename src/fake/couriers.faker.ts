import {fakerRU} from "@faker-js/faker";
import {prisma} from "../database/prisma-client";
import {CourierWorkingShiftStates} from ".prisma/client";

const createCourier = () => ({
    name: fakerRU.person.fullName(),
    email: fakerRU.internet.email(),
    phone: fakerRU.phone.number('+79#########'),
    isBanned: Math.random() > 0.5,
    banReason: fakerRU.lorem.words(10),
})

const createCourierFines = () => ({
    amount: fakerRU.number.int({ min: 10, max: 1000}),
    courierId: fakerRU.number.int({ min: 10, max: 50}),
    reason: fakerRU.lorem.words(10),
})

const createCourierTasks = () => ({
    completed: fakerRU.date.past({ years: 1 }),
    courierId: fakerRU.number.int({ min: 1, max: 100 }),
    orderId: fakerRU.number.int({ min: 1, max: 100 }),
    reward: fakerRU.number.int({ min: 100, max: 1000 }),
    state: 'IN_WORK',
})

const createCourierSession = () => ({
    startedAt: fakerRU.date.past({ years: 1 }),
    completedAt: fakerRU.date.past({ years: 1 }),
    courierWorkingShiftState: CourierWorkingShiftStates.COMPLETED,
    courierId: fakerRU.number.int({ min: 10, max: 50 }),
})

const createCouriers = async () => {
    const couriers = fakerRU.helpers.uniqueArray(createCourier, 50)
    const fines = fakerRU.helpers.uniqueArray(createCourierFines, 500)
    // const tasks = fakerRU.helpers.uniqueArray(createCourierTasks, 300)
    const sessions = fakerRU.helpers.uniqueArray(createCourierSession, 300)

    await prisma.$transaction([
        prisma.couriers.createMany({
            data: couriers
        }),
        prisma.courierFines.createMany({
            data: fines
        }),
        prisma.courierWorkingShift.createMany({
            data: sessions
        })
    ])
}

createCouriers()