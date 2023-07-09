/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { FetchRequest } from "./dto";
import { Brand, Good, GoodCategory, ManufacturerCountry } from "./entity";

export const protobufPackage = "catalog";

export interface FetchCatalogRequest {
  categoryId?: number | undefined;
}

export interface FetchCatalogResponse {
  data: Good[];
}

export interface FetchCategoriesResponse {
  data: GoodCategory[];
}

export interface FetchBrandsResponse {
  data: Brand[];
}

export interface FetchManufacturerCountriesResponse {
  data: ManufacturerCountry[];
}

export const CATALOG_PACKAGE_NAME = "catalog";

export interface CatalogServiceClient {
  fetchCatalog(request: FetchCatalogRequest, metadata?: Metadata): Observable<FetchCatalogResponse>;

  fetchCategories(request: FetchRequest, metadata?: Metadata): Observable<FetchCategoriesResponse>;

  fetchBrands(request: FetchRequest, metadata?: Metadata): Observable<FetchBrandsResponse>;

  fetchManufacturerCountries(
    request: FetchRequest,
    metadata?: Metadata,
  ): Observable<FetchManufacturerCountriesResponse>;
}

export interface CatalogServiceController {
  fetchCatalog(
    request: FetchCatalogRequest,
    metadata?: Metadata,
  ): Promise<FetchCatalogResponse> | Observable<FetchCatalogResponse> | FetchCatalogResponse;

  fetchCategories(
    request: FetchRequest,
    metadata?: Metadata,
  ): Promise<FetchCategoriesResponse> | Observable<FetchCategoriesResponse> | FetchCategoriesResponse;

  fetchBrands(
    request: FetchRequest,
    metadata?: Metadata,
  ): Promise<FetchBrandsResponse> | Observable<FetchBrandsResponse> | FetchBrandsResponse;

  fetchManufacturerCountries(
    request: FetchRequest,
    metadata?: Metadata,
  ):
    | Promise<FetchManufacturerCountriesResponse>
    | Observable<FetchManufacturerCountriesResponse>
    | FetchManufacturerCountriesResponse;
}

export function CatalogServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["fetchCatalog", "fetchCategories", "fetchBrands", "fetchManufacturerCountries"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CatalogService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CatalogService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CATALOG_SERVICE_NAME = "CatalogService";
