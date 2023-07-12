import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {GoodCategory} from "../proto-generated/entity";

@Injectable()
export class CategoriesService {

    constructor(private readonly database: DatabaseService) {
    }

    async fetchParentsCategories() {
        const data = await this.database.goodCategories.findMany({
            where: {
                parentCategoryId: null
            },
            include: {
                _count: {
                    select: {
                        childCategories: true
                    }
                }
            }
        })
        return {
            data: data.map(i => ({
                ...i,
                createdAt: new Date(i.createdAt ?? ''),
                childCategoriesCount: i._count.childCategories
            } as GoodCategory))
        }
    }

    async fetchChildCategories(parentId?: number) {
        const data = await this.database.goodCategories.findMany({
            where: {
                parentCategoryId: Number(parentId)
            },
            include: {
                _count: {
                    select: {
                       goods: true
                    }
                }
            }
        })
        return {
            data: data.map(i => ({
                ...i,
                createdAt: new Date(i.createdAt ?? ''),
                goodsCount: i._count.goods
            } as GoodCategory))
        }
    }


}
