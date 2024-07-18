import {fakerRU} from "@faker-js/faker";
import {prisma} from "../database/prisma-client";

const createBrand = (name?: string) => ({
    name: name ?? fakerRU.company.name()
})

const createCountry = (name?: string) => ({
    name: name ?? fakerRU.location.country()
})

const createCountries = async () => {
    const names = fakerRU.helpers.uniqueArray(createCountry, 100)

    await prisma.manufacturerCountries.createMany({
        data: names
    })
}

const createBrands = async () => {
    const names = fakerRU.helpers.uniqueArray(createBrand, 100)

    await prisma.brands.createMany({
        data: names
    })
}

createCountries()
createBrands()