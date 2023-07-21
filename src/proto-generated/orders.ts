/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Order } from "./entity";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "orders";

export interface FetchOrderModelRequest {
  orderId: number;
}

export interface CreateOrderRequest {
  clientId?: number | undefined;
  clientAddressId?: number | undefined;
  goods: CreateOrderRequest_CreateOrderItem[];
}

export interface CreateOrderRequest_CreateOrderItem {
  goodId?: number | undefined;
  amount?: number | undefined;
}

export interface RepeatOrderRequest {
  orderId?: number | undefined;
}

export interface CancelOrderRequest {
  orderId?: number | undefined;
}

export const ORDERS_PACKAGE_NAME = "orders";

export interface OrdersServiceClient {
  createOrder(request: CreateOrderRequest, metadata?: Metadata): Observable<Order>;

  repeatOrder(request: RepeatOrderRequest, metadata?: Metadata): Observable<Order>;

  cancelOrder(request: CancelOrderRequest, metadata?: Metadata): Observable<Empty>;

  fetchOrderModel(request: FetchOrderModelRequest, metadata?: Metadata): Observable<Order>;
}

export interface OrdersServiceController {
  createOrder(request: CreateOrderRequest, metadata?: Metadata): Promise<Order> | Observable<Order> | Order;

  repeatOrder(request: RepeatOrderRequest, metadata?: Metadata): Promise<Order> | Observable<Order> | Order;

  cancelOrder(request: CancelOrderRequest, metadata?: Metadata): void;

  fetchOrderModel(request: FetchOrderModelRequest, metadata?: Metadata): Promise<Order> | Observable<Order> | Order;
}

export function OrdersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createOrder", "repeatOrder", "cancelOrder", "fetchOrderModel"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrdersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrdersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDERS_SERVICE_NAME = "OrdersService";
