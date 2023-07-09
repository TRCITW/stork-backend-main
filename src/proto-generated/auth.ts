/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "auth";

export interface RequestSmsCodeRequest {
  phone: string;
}

export interface LoginRequest {
}

export interface RegisterRequest {
}

export interface RecoverPassRequest {
}

export interface RequestSmsCodeResponse {
  isRegistered: boolean;
}

export interface LoginResponse {
}

export interface RegisterResponse {
}

export interface UpdateAccessTokenResponse {
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  requestSmsCode(request: RequestSmsCodeRequest, metadata?: Metadata): Observable<RequestSmsCodeResponse>;

  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  register(request: RegisterRequest, metadata?: Metadata): Observable<RegisterResponse>;

  updateAccessToken(request: Empty, metadata?: Metadata): Observable<UpdateAccessTokenResponse>;

  logout(request: Empty, metadata?: Metadata): Observable<Empty>;

  recoverPass(request: RecoverPassRequest, metadata?: Metadata): Observable<Empty>;
}

export interface AuthServiceController {
  requestSmsCode(
    request: RequestSmsCodeRequest,
    metadata?: Metadata,
  ): Promise<RequestSmsCodeResponse> | Observable<RequestSmsCodeResponse> | RequestSmsCodeResponse;

  login(request: LoginRequest, metadata?: Metadata): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  register(
    request: RegisterRequest,
    metadata?: Metadata,
  ): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  updateAccessToken(
    request: Empty,
    metadata?: Metadata,
  ): Promise<UpdateAccessTokenResponse> | Observable<UpdateAccessTokenResponse> | UpdateAccessTokenResponse;

  logout(request: Empty, metadata?: Metadata): void;

  recoverPass(request: RecoverPassRequest, metadata?: Metadata): void;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["requestSmsCode", "login", "register", "updateAccessToken", "logout", "recoverPass"];
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
