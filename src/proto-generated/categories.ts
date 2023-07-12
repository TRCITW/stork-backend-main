/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { FetchRequest } from "./dto";
import { GoodCategory } from "./entity";

export const protobufPackage = "categories";

export interface FetchChildCategoriesRequest {
  parentCategoryId?: number | undefined;
  fetchDto?: FetchRequest | undefined;
}

export interface FetchCategoriesResponse {
  data: GoodCategory[];
}

export const CATEGORIES_PACKAGE_NAME = "categories";

export interface CategoriesServiceClient {
  fetchParentCategories(request: FetchRequest, metadata?: Metadata): Observable<FetchCategoriesResponse>;

  fetchChildCategories(request: FetchChildCategoriesRequest, metadata?: Metadata): Observable<FetchCategoriesResponse>;
}

export interface CategoriesServiceController {
  fetchParentCategories(
    request: FetchRequest,
    metadata?: Metadata,
  ): Promise<FetchCategoriesResponse> | Observable<FetchCategoriesResponse> | FetchCategoriesResponse;

  fetchChildCategories(
    request: FetchChildCategoriesRequest,
    metadata?: Metadata,
  ): Promise<FetchCategoriesResponse> | Observable<FetchCategoriesResponse> | FetchCategoriesResponse;
}

export function CategoriesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["fetchParentCategories", "fetchChildCategories"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CategoriesService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CategoriesService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CATEGORIES_SERVICE_NAME = "CategoriesService";
