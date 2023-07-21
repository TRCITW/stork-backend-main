/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { UserTypes } from "./entity";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "auth";

export interface RequestSmsCodeRequest {
  phone: string;
}

export interface LoginClientRequest {
  phone: string;
  code: string;
  isRegistered?: boolean | undefined;
}

export interface LoginCourierRequest {
  phone: string;
  code: string;
}

export interface RegisterRequest {
}

export interface RequestSmsCodeResponse {
  isRegistered: boolean;
  userType: UserTypes;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
}

export interface UpdateAccessTokenResponse {
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  requestSmsCode(request: RequestSmsCodeRequest, metadata?: Metadata): Observable<RequestSmsCodeResponse>;

  loginClient(request: LoginClientRequest, metadata?: Metadata): Observable<LoginResponse>;

  loginCourier(request: LoginCourierRequest, metadata?: Metadata): Observable<LoginResponse>;

  updateAccessToken(request: Empty, metadata?: Metadata): Observable<UpdateAccessTokenResponse>;

  logoutClient(request: Empty, metadata?: Metadata): Observable<Empty>;

  logoutCourier(request: Empty, metadata?: Metadata): Observable<Empty>;
}

export interface AuthServiceController {
  requestSmsCode(
    request: RequestSmsCodeRequest,
    metadata?: Metadata,
  ): Promise<RequestSmsCodeResponse> | Observable<RequestSmsCodeResponse> | RequestSmsCodeResponse;

  loginClient(
    request: LoginClientRequest,
    metadata?: Metadata,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  loginCourier(
    request: LoginCourierRequest,
    metadata?: Metadata,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  updateAccessToken(
    request: Empty,
    metadata?: Metadata,
  ): Promise<UpdateAccessTokenResponse> | Observable<UpdateAccessTokenResponse> | UpdateAccessTokenResponse;

  logoutClient(request: Empty, metadata?: Metadata): void;

  logoutCourier(request: Empty, metadata?: Metadata): void;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "requestSmsCode",
      "loginClient",
      "loginCourier",
      "updateAccessToken",
      "logoutClient",
      "logoutCourier",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
