import {fakerRU} from "@faker-js/faker";
import {prisma} from "../database/prisma-client";

const createStoreAddress = () => ({
    address: `${fakerRU.location.city()}, ${fakerRU.location.streetAddress()}`,
    storeId: fakerRU.number.int({ min: 1, max: 20})
})

const createStore = () => ({
    name: fakerRU.company.name(),
    IIN: `${fakerRU.number.int({ min: 10_000_000, max: 99_999_999})}`,
    OGRN: `${fakerRU.number.int({ min: 10_000_000, max: 99_999_999})}`,
    // storeAddresses: Array(Math.floor(Math.random() * 5)).fill(createStoreAddress()),
})

const createRemnant = () => ({
    goodId: fakerRU.number.int({ min: 1, max: 1000}),
    storeId: fakerRU.number.int({ min: 1, max: 20}),
    remnants: fakerRU.number.int({ min: 0, max: 10_000}),
})


const createStores = async () => {
    const stores = fakerRU.helpers.uniqueArray(createStore, 20)
    const remnants = fakerRU.helpers.uniqueArray(createRemnant, 2000)
    const addresses = fakerRU.helpers.uniqueArray(createStoreAddress, 20)

    await prisma.$transaction([
        prisma.stores.createMany({
            data: stores
        }),
        prisma.remnants.createMany({
            data: remnants
        }),
        prisma.storeAddresses.createMany({
            data: addresses
        })
    ])
}

createStores()