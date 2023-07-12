/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { DeleteRequest, FetchRequest } from "./dto";
import { Client, ClientAddress, Good } from "./entity";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "clients";

export interface UpdateFBMessagingTokenRequest {
  token?: string | undefined;
}

export interface CreateAddressRequest {
  address?: string | undefined;
  coordinate?: string | undefined;
  flatNum?: number | undefined;
  clientId?: number | undefined;
  stage?: number | undefined;
  entrance?: number | undefined;
  comment?: string | undefined;
}

export interface UpdateTokenRequest {
  token?: string | undefined;
}

export interface FetchClientRecommendationsResponse {
  data: Good[];
}

export const CLIENTS_PACKAGE_NAME = "clients";

export interface ClientsServiceClient {
  updateFbMessagingToken(request: UpdateFBMessagingTokenRequest, metadata?: Metadata): Observable<Empty>;

  createAddress(request: CreateAddressRequest, metadata?: Metadata): Observable<ClientAddress>;

  destroyAddress(request: DeleteRequest, metadata?: Metadata): Observable<Empty>;

  fetchClientRecommendations(
    request: FetchRequest,
    metadata?: Metadata,
  ): Observable<FetchClientRecommendationsResponse>;

  fetchClientModel(request: Empty, metadata?: Metadata): Observable<Client>;
}

export interface ClientsServiceController {
  updateFbMessagingToken(request: UpdateFBMessagingTokenRequest, metadata?: Metadata): void;

  createAddress(
    request: CreateAddressRequest,
    metadata?: Metadata,
  ): Promise<ClientAddress> | Observable<ClientAddress> | ClientAddress;

  destroyAddress(request: DeleteRequest, metadata?: Metadata): void;

  fetchClientRecommendations(
    request: FetchRequest,
    metadata?: Metadata,
  ):
    | Promise<FetchClientRecommendationsResponse>
    | Observable<FetchClientRecommendationsResponse>
    | FetchClientRecommendationsResponse;

  fetchClientModel(request: Empty, metadata?: Metadata): Promise<Client> | Observable<Client> | Client;
}

export function ClientsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "updateFbMessagingToken",
      "createAddress",
      "destroyAddress",
      "fetchClientRecommendations",
      "fetchClientModel",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ClientsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ClientsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CLIENTS_SERVICE_NAME = "ClientsService";
