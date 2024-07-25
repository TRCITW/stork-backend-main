import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {Brand, Good, GoodCategory, GoodDiscount, ManufacturerCountry, Media} from "../proto-generated/entity";

@Injectable()
export class GoodsService {

    constructor(private readonly database: DatabaseService) {
    }

    async fetchProducts(categoryId?: number, countryId?: number, brandId?: number, limit?: number, skip?: number) {
        const data = await this.database.goods.findMany({
            where: {
                goodCategoryId: {
                    in: isNaN(Number(categoryId)) ? undefined : Number(categoryId)
                },
                manufacturerCountryId: {
                    in: isNaN(Number(countryId)) ? undefined : Number(countryId)
                },
                brandId: {
                    in: isNaN(Number(brandId)) ? undefined : Number(brandId)
                },
            },
            take: limit,
            skip: skip,
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
        })
        return {
            data: data.map(i => ({
                ...i,
                brand: i.brand as Brand,
                category: i.goodCategory as GoodCategory,
                manufacturerCountry: i.manufacturerCountry as ManufacturerCountry,
                discounts: i.goodDiscounts.map(x => x as GoodDiscount),
                media: i.goodsMedia.map(x => x.media as Media)
            } as Good))
        }
    }

    async fetchProductModel(id: number) {
        const data = await this.database.goods.findFirst({
            where: {
                id: Number(id)
            },
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
        })
        return {
            ...data,
            brand: data?.brand as Brand,
            category: data?.goodCategory as GoodCategory,
            manufacturerCountry: data?.manufacturerCountry as ManufacturerCountry,
            discounts: data?.goodDiscounts.map(x => x as GoodDiscount) ?? [],
            media: data?.goodsMedia.map(x => x.media as Media) ?? []
        } as Good
    }


    async searchProducts(value: string, categoryId?: number, limit?: number, skip?: number) {
        const data = await this.database.goods.findMany({
            where: {
                name: {
                    contains: String(value ?? ''),
                    mode: 'insensitive'
                },
                goodCategoryId: categoryId
            },
            take: limit,
            skip: skip,
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
        })
        return {
            data: data.map(i => ({
                ...i,
                brand: i.brand as Brand,
                category: i.goodCategory as GoodCategory,
                manufacturerCountry: i.manufacturerCountry as ManufacturerCountry,
                discounts: i.goodDiscounts.map(x => x as GoodDiscount),
                media: i.goodsMedia.map(x => x.media as Media)
            } as Good))
        }
    }

    async toggleProductWishlist(goodId?: number, userId?: number) {
        const isWishlist = await this.database.clientWishlistGoods.findFirst({
            where: {
                goodId: Number(goodId),
                clientId: Number(userId)
            }
        })
        if (isWishlist !== null) {
            await this.database.clientWishlistGoods.delete({
                where: {
                    id: isWishlist?.id
                }
            })
        } else {
            await this.database.clientWishlistGoods.create({
                data: {
                    goodId: Number(goodId),
                    clientId: Number(userId)
                }
            })
        }
    }

    async fetchRecommendedGoods(goodId: number, limit?: number, skip?: number) {
        const data = await this.database.recommendedGoods.findMany({
            where: {
                goodId: Number(goodId)
            },
            take: limit,
            skip: skip,
            include: {
                recommendedGood: {
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
                ...i.recommendedGood,
                brand: i.recommendedGood?.brand as Brand,
                category: i.recommendedGood?.goodCategory as GoodCategory,
                manufacturerCountry: i.recommendedGood?.manufacturerCountry as ManufacturerCountry,
                discounts: i.recommendedGood?.goodDiscounts.map(x => x as GoodDiscount) ?? [],
                media: i.recommendedGood?.goodsMedia.map(x => x.media as Media) ?? []
            } as Good))
        }
    }

    async fetchDiscounts(goodId?: number) {
        const data = await this.database.goodDiscounts.findMany({
            where: {
                goodId: Number(goodId)
            },
            include: {
                good: true
            }
        })
        return {
            data: data.map(i => ({
                ...i,
                good: i.good as Good
            } as GoodDiscount))
        }
    }

    async fetchFavorite(clientId: number, take?: number, offset?: number) {
        const data = await this.database.clientWishlistGoods.findMany({
            where: {
                clientId: clientId
            },
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
            },
            take: take ?? 1000,
            skip: offset ?? 0
        })
        const mapped = data
            .map(m => m.good)
            .filter(f => f !== undefined && f !== null)

        return {
            data: mapped.map(i => ({
                ...i,
                brand: i?.brand as Brand,
                category: i?.goodCategory as GoodCategory,
                manufacturerCountry: i?.manufacturerCountry as ManufacturerCountry,
                discounts: i?.goodDiscounts.map(x => x as GoodDiscount) ?? [],
                media: i?.goodsMedia.map(x => x.media as Media) ?? []
            } as Good))
        }
    }

}
