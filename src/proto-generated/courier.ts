/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { FetchRequest } from "./dto";
import { CourierDeliveryTask } from "./entity";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "courier";

export interface StartDeliveryRequest {
  orderId?: number | undefined;
}

export interface ReadyDeliveryRequest {
  taskId?: number | undefined;
}

export interface DeliveryTaskCompletedRequest {
  taskId?: number | undefined;
}

export interface FetchTaskResponse {
  data: CourierDeliveryTask[];
}

export const COURIER_PACKAGE_NAME = "courier";

export interface CourierServiceClient {
  startShift(request: Empty, metadata?: Metadata): Observable<Empty>;

  completeShift(request: Empty, metadata?: Metadata): Observable<Empty>;

  fetchAvailableTasks(request: FetchRequest, metadata?: Metadata): Observable<FetchTaskResponse>;

  fetchCourierTasks(request: Empty, metadata?: Metadata): Observable<FetchTaskResponse>;

  startDelivery(request: StartDeliveryRequest, metadata?: Metadata): Observable<Empty>;

  readyDelivery(request: ReadyDeliveryRequest, metadata?: Metadata): Observable<Empty>;

  deliveryTaskCompleted(request: DeliveryTaskCompletedRequest, metadata?: Metadata): Observable<Empty>;

  fetchTaskHistory(request: FetchRequest, metadata?: Metadata): Observable<FetchTaskResponse>;
}

export interface CourierServiceController {
  startShift(request: Empty, metadata?: Metadata): void;

  completeShift(request: Empty, metadata?: Metadata): void;

  fetchAvailableTasks(
    request: FetchRequest,
    metadata?: Metadata,
  ): Promise<FetchTaskResponse> | Observable<FetchTaskResponse> | FetchTaskResponse;

  fetchCourierTasks(
    request: Empty,
    metadata?: Metadata,
  ): Promise<FetchTaskResponse> | Observable<FetchTaskResponse> | FetchTaskResponse;

  startDelivery(request: StartDeliveryRequest, metadata?: Metadata): void;

  readyDelivery(request: ReadyDeliveryRequest, metadata?: Metadata): void;

  deliveryTaskCompleted(request: DeliveryTaskCompletedRequest, metadata?: Metadata): void;

  fetchTaskHistory(
    request: FetchRequest,
    metadata?: Metadata,
  ): Promise<FetchTaskResponse> | Observable<FetchTaskResponse> | FetchTaskResponse;
}

export function CourierServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "startShift",
      "completeShift",
      "fetchAvailableTasks",
      "fetchCourierTasks",
      "startDelivery",
      "readyDelivery",
      "deliveryTaskCompleted",
      "fetchTaskHistory",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CourierService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CourierService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const COURIER_SERVICE_NAME = "CourierService";
