import {fa, faker} from "@faker-js/faker";
import {prisma} from "../database/prisma-client";

export async function createRandomUser() {

    const client = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('+7900#######'),
    }

    const address = {
        address: faker.location.secondaryAddress(),
        flatNum: Number(faker.location.buildingNumber()),
        coordinate: `${faker.location.latitude()};${faker.location.longitude()}`,
        comment: faker.random.words(10)
    }

    await prisma.clients.create({
        data: {
            ...client,
            clientAddresses: {
                create: {
                    ...address
                }
            }
        }
    })
}

faker.helpers.multiple(createRandomUser, {
    count: 5,
})