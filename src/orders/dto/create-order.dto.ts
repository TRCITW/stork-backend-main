import {CreateOrderItemDto} from "./create-order-item.dto";

export interface CreateOrderDto {
    clientId?: number | null
    clientAddressId?: number | null
    goods: CreateOrderItemDto[]
}