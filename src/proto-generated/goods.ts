/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { FetchRequest } from "./dto";
import { Good, GoodDiscount } from "./entity";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "goods";

export interface ToggleGoodToWishlistRequest {
  goodId?: number | undefined;
}

export interface FetchGoodModelRequest {
  goodId: number;
}

export interface FetchGoodsRequest {
  goodCategoryId?: number | undefined;
  brandId?: number | undefined;
  countryId?: number | undefined;
  fetchDto?: FetchRequest | undefined;
}

export interface FetchRecommendedGoodsRequest {
  goodId: number;
  fetchDto?: FetchRequest | undefined;
}

export interface SearchGoodsRequest {
  goodCategoryId?: number | undefined;
  value: string;
  fetchDto?: FetchRequest | undefined;
}

export interface FetchDiscountsRequest {
  goodId?: number | undefined;
}

export interface FetchGoodsResponse {
  data: Good[];
}

export interface FetchDiscountsResponse {
  data: GoodDiscount[];
}

export const GOODS_PACKAGE_NAME = "goods";

export interface GoodsServiceClient {
  fetchGoods(request: FetchGoodsRequest, metadata?: Metadata): Observable<FetchGoodsResponse>;

  fetchGoodModel(request: FetchGoodModelRequest, metadata?: Metadata): Observable<Good>;

  toggleGoodToWishlist(request: ToggleGoodToWishlistRequest, metadata?: Metadata): Observable<Empty>;

  fetchRecommendedGoods(request: FetchRecommendedGoodsRequest, metadata?: Metadata): Observable<FetchGoodsResponse>;

  searchGoods(request: SearchGoodsRequest, metadata?: Metadata): Observable<FetchGoodsResponse>;

  fetchDiscounts(request: FetchDiscountsRequest, metadata?: Metadata): Observable<FetchDiscountsResponse>;
}

export interface GoodsServiceController {
  fetchGoods(
    request: FetchGoodsRequest,
    metadata?: Metadata,
  ): Promise<FetchGoodsResponse> | Observable<FetchGoodsResponse> | FetchGoodsResponse;

  fetchGoodModel(request: FetchGoodModelRequest, metadata?: Metadata): Promise<Good> | Observable<Good> | Good;

  toggleGoodToWishlist(request: ToggleGoodToWishlistRequest, metadata?: Metadata): void;

  fetchRecommendedGoods(
    request: FetchRecommendedGoodsRequest,
    metadata?: Metadata,
  ): Promise<FetchGoodsResponse> | Observable<FetchGoodsResponse> | FetchGoodsResponse;

  searchGoods(
    request: SearchGoodsRequest,
    metadata?: Metadata,
  ): Promise<FetchGoodsResponse> | Observable<FetchGoodsResponse> | FetchGoodsResponse;

  fetchDiscounts(
    request: FetchDiscountsRequest,
    metadata?: Metadata,
  ): Promise<FetchDiscountsResponse> | Observable<FetchDiscountsResponse> | FetchDiscountsResponse;
}

export function GoodsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "fetchGoods",
      "fetchGoodModel",
      "toggleGoodToWishlist",
      "fetchRecommendedGoods",
      "searchGoods",
      "fetchDiscounts",
    ];
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
