import { Controller } from '@nestjs/common';
import { CourierService } from './courier.service';
import {
  COURIER_SERVICE_NAME,
  CourierServiceController,
  DeliveryTaskCompletedRequest,
  FetchTaskResponse, ReadyDeliveryRequest,
  StartDeliveryRequest
} from "../proto-generated/courier";
import {Empty} from "../proto-generated/google/protobuf/empty";
import {Metadata} from "@grpc/grpc-js";
import {FetchRequest} from "../proto-generated/dto";
import {Observable} from "rxjs";
import {GrpcMethod} from "@nestjs/microservices";

@Controller('courier')
export class CourierController implements CourierServiceController {

  constructor(private readonly courierService: CourierService) {}

  @GrpcMethod(COURIER_SERVICE_NAME)
  completeShift(request: Empty, metadata?: Metadata): void {
    // todo: replace user id
    this.courierService.completeShift(1)
  }

  @GrpcMethod(COURIER_SERVICE_NAME)
  deliveryTaskCompleted(request: DeliveryTaskCompletedRequest, metadata?: Metadata): void {
    this.courierService.deliveryTaskCompleted(request.taskId)
  }

  @GrpcMethod(COURIER_SERVICE_NAME)
  fetchAvailableTasks(request: FetchRequest, metadata?: Metadata): Promise<FetchTaskResponse> | Observable<FetchTaskResponse> | FetchTaskResponse {
    return this.courierService.fetchAvailableTasks(request.limit, request.offset)
  }

  @GrpcMethod(COURIER_SERVICE_NAME)
  fetchCourierTasks(request: Empty, metadata?: Metadata): Promise<FetchTaskResponse> | Observable<FetchTaskResponse> | FetchTaskResponse {
    // todo: replace user id
    return this.courierService.fetchCourierTasks(1)
  }

  @GrpcMethod(COURIER_SERVICE_NAME)
  fetchTaskHistory(request: FetchRequest, metadata?: Metadata): Promise<FetchTaskResponse> | Observable<FetchTaskResponse> | FetchTaskResponse {
    // todo: replace user id
    return this.courierService.fetchTaskHistory(1, request.limit, request.offset)
  }

  @GrpcMethod(COURIER_SERVICE_NAME)
  readyDelivery(request: ReadyDeliveryRequest, metadata?: Metadata): void {
    this.courierService.readyDelivery(request.taskId)
  }

  @GrpcMethod(COURIER_SERVICE_NAME)
  startDelivery(request: StartDeliveryRequest, metadata?: Metadata): void {
    // todo: replace user id
    this.courierService.startDelivery(1, request.orderId)
  }

  @GrpcMethod(COURIER_SERVICE_NAME)
  startShift(request: Empty, metadata?: Metadata): void {
    // todo: replace user id
    this.courierService.startShift(1)
  }

}
