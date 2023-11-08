import {fakerRU} from "@faker-js/faker";
import {prisma} from "../database/prisma-client";

const createGood = (brandId?: number, goodCategoryId?: number, manufacturerCountryId?: number) => ({
    name: fakerRU.commerce.productName(),
    description: fakerRU.commerce.productDescription(),
    basePrice: Number(fakerRU.commerce.price({ min: 100, max: 25000 })),
    baseVolume: fakerRU.number.int({ min: 1, max: 20}),
    volumeDimension: 'kg',
    brandId: brandId ?? fakerRU.number.int({ min: 1, max: 100}),
    goodCategoryId: goodCategoryId ?? fakerRU.number.int({ min: 1, max: 100}),
    manufacturerCountryId: manufacturerCountryId ?? fakerRU.number.int({ min: 301, max: 400}),
})

const createCategory = () => ({
    name: fakerRU.commerce.department(),
    parentCategoryId: Math.random() > 0.5 ? fakerRU.number.int({ min: 1, max: 100 }) : undefined
})

const createDiscount = (goodId?: number) => ({
    discountAmount: fakerRU.number.int({ min: 10, max: 10_000 }),
    reason: fakerRU.lorem.words(10),
    goodId: goodId ?? fakerRU.number.int({ min: 1, max: 1000}),
})

const createCategories = async () => {
    const names = fakerRU.helpers.uniqueArray(createCategory, 100)

    await prisma.goodCategories.createMany({
        data: names
    })
}

const createGoods = async () => {
    const names = fakerRU.helpers.uniqueArray(createGood, 1000)

    await prisma.goods.createMany({
        data: names
    })
}

const createDiscounts = async () => {
    const names = fakerRU.helpers.uniqueArray(createDiscount, 3000)

    await prisma.goodDiscounts.createMany({
        data: names
    })
}

// createCategories()
// createGoods()
createDiscounts()