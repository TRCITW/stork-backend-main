/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { FetchRequest } from "./dto";
import { Brand, ManufacturerCountry } from "./entity";

export const protobufPackage = "filter";

export interface FetchBrandsResponse {
  data: Brand[];
}

export interface SearchManufacturerCountriesRequest {
  name?: string | undefined;
  fetchDto?: FetchRequest | undefined;
}

export interface FetchManufacturerCountriesResponse {
  data: ManufacturerCountry[];
}

export const FILTER_PACKAGE_NAME = "filter";

export interface FilterServiceClient {
  fetchBrands(request: FetchRequest, metadata?: Metadata): Observable<FetchBrandsResponse>;

  searchManufacturerCountries(
    request: SearchManufacturerCountriesRequest,
    metadata?: Metadata,
  ): Observable<FetchManufacturerCountriesResponse>;

  fetchManufacturerCountries(
    request: FetchRequest,
    metadata?: Metadata,
  ): Observable<FetchManufacturerCountriesResponse>;
}

export interface FilterServiceController {
  fetchBrands(
    request: FetchRequest,
    metadata?: Metadata,
  ): Promise<FetchBrandsResponse> | Observable<FetchBrandsResponse> | FetchBrandsResponse;

  searchManufacturerCountries(
    request: SearchManufacturerCountriesRequest,
    metadata?: Metadata,
  ):
    | Promise<FetchManufacturerCountriesResponse>
    | Observable<FetchManufacturerCountriesResponse>
    | FetchManufacturerCountriesResponse;

  fetchManufacturerCountries(
    request: FetchRequest,
    metadata?: Metadata,
  ):
    | Promise<FetchManufacturerCountriesResponse>
    | Observable<FetchManufacturerCountriesResponse>
    | FetchManufacturerCountriesResponse;
}

export function FilterServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["fetchBrands", "searchManufacturerCountries", "fetchManufacturerCountries"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FilterService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FilterService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FILTER_SERVICE_NAME = "FilterService";
