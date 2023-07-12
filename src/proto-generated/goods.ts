/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { FetchRequest } from "./dto";
import { Good } from "./entity";

export const protobufPackage = "goods";

export interface FetchGoodModelRequest {
  goodId: number;
}

export interface FetchGoodsRequest {
  goodCategoryId?: number | undefined;
  fetchDto?: FetchRequest | undefined;
}

export interface FetchGoodsResponse {
  data: Good[];
}

export const GOODS_PACKAGE_NAME = "goods";

export interface GoodsServiceClient {
  fetchGoods(request: FetchGoodsRequest, metadata?: Metadata): Observable<FetchGoodsResponse>;

  fetchGoodModel(request: FetchGoodModelRequest, metadata?: Metadata): Observable<Good>;
}

export interface GoodsServiceController {
  fetchGoods(
    request: FetchGoodsRequest,
    metadata?: Metadata,
  ): Promise<FetchGoodsResponse> | Observable<FetchGoodsResponse> | FetchGoodsResponse;

  fetchGoodModel(request: FetchGoodModelRequest, metadata?: Metadata): Promise<Good> | Observable<Good> | Good;
}

export function GoodsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["fetchGoods", "fetchGoodModel"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("GoodsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("GoodsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const GOODS_SERVICE_NAME = "GoodsService";
