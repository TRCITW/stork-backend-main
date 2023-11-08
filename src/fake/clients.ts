import {fakerRU} from "@faker-js/faker";
import {prisma} from "../database/prisma-client";
import {PaymentMethods} from ".prisma/client";

const createClientAddress = () => ({
    address: `${fakerRU.location.city()}, ${fakerRU.location.streetAddress()}`,
    flatNum: fakerRU.number.int({ min: 1, max: 600 }),
    stage: fakerRU.number.int({ min: 1, max: 100 }),
    entrance: fakerRU.number.int({ min: 1, max: 10 }),
    comment: fakerRU.lorem.slug({ min: 2, max: 30 }),
    clientId: fakerRU.number.int({ min: 1607, max: 2000 })
})

const createPaymentMethod = () => ({
    type: PaymentMethods.CARD,
    credentials: fakerRU.finance.creditCardNumber('**** **## #### ####'),
    clientId: fakerRU.number.int({ min: 1607, max: 2000 })
})

const createClient = () => ({
    name: fakerRU.person.fullName(),
    email: fakerRU.internet.email(),
    phone: fakerRU.phone.number('+79#########'),
    isBanned: Math.random() > 0.5,
    banReason: fakerRU.lorem.words(10),
    // clientAddresses: Array(Math.floor(Math.random() * 10)).fill(createClientAddress()),
    // clientPaymentMethods: Array(Math.floor(Math.random() * 5)).fill(createPaymentMethod())
})

const createClients = async () => {
    const clients = fakerRU.helpers.uniqueArray(createClient, 300)
    const paymentMethods = fakerRU.helpers.uniqueArray(createPaymentMethod, 200)
    const clientAddresses = fakerRU.helpers.uniqueArray(createClientAddress, 300)

    await prisma.$transaction([
        prisma.clients.createMany({
            data: clients
        }),
        prisma.clientAddresses.createMany({
            data: clientAddresses
        }),
        prisma.clientPaymentMethods.createMany({
            data: paymentMethods
        })
    ])
}

// npx ts-node src/fake/clients.ts
// dont forget to drop id sequence

createClients()