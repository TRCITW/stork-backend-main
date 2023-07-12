/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "users";

export interface UpdateFBMessagingTokenRequest {
  token?: string | undefined;
}

export const USERS_PACKAGE_NAME = "users";

export interface UsersServiceClient {
  updateFbMessagingToken(request: UpdateFBMessagingTokenRequest, metadata?: Metadata): Observable<Empty>;
}

export interface UsersServiceController {
  updateFbMessagingToken(request: UpdateFBMessagingTokenRequest, metadata?: Metadata): void;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["updateFbMessagingToken"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
