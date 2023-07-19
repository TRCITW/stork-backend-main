import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  CancelOrderRequest,
  CreateOrderRequest, ORDERS_SERVICE_NAME,
  OrdersServiceController,
  RepeatOrderRequest
} from "../proto-generated/orders";
import {Metadata} from "@grpc/grpc-js";
import {Order} from "../proto-generated/entity";
import {Observable} from "rxjs";
import {GrpcMethod} from "@nestjs/microservices";

@Controller('orders')
export class OrdersController implements OrdersServiceController {

  constructor(private readonly ordersService: OrdersService) {}

  @GrpcMethod(ORDERS_SERVICE_NAME)
  cancelOrder(request: CancelOrderRequest, metadata?: Metadata): void {
    this.ordersService.cancelOrder(request.orderId)
  }

  @GrpcMethod(ORDERS_SERVICE_NAME)
  createOrder(request: CreateOrderRequest, metadata?: Metadata): Promise<Order> | Observable<Order> | Order {
    return this.ordersService.createOrder(request)
  }

  @GrpcMethod(ORDERS_SERVICE_NAME)
  repeatOrder(request: RepeatOrderRequest, metadata?: Metadata): Promise<Order> | Observable<Order> | Order {
    return this.ordersService.repeatOrder(request.orderId)
  }

}
