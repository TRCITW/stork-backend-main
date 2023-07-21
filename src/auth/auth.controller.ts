import {Controller} from '@nestjs/common';
import {AuthService} from './auth.service';
import {GrpcMethod, RpcException} from "@nestjs/microservices";
import {
  AUTH_SERVICE_NAME,
  AuthServiceController, LoginClientRequest, LoginCourierRequest, LoginResponse,
  RequestSmsCodeRequest,
  RequestSmsCodeResponse,
  UpdateAccessTokenResponse
} from "../proto-generated/auth";
import {Metadata} from "@grpc/grpc-js";
import {Observable} from "rxjs";
import {Empty} from "../proto-generated/google/protobuf/empty";

@Controller('auth')
export class AuthController implements AuthServiceController {

  constructor(private readonly authService: AuthService) {
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  requestSmsCode(request: RequestSmsCodeRequest, metadata?: Metadata): Promise<RequestSmsCodeResponse> | Observable<RequestSmsCodeResponse> | RequestSmsCodeResponse {
    return this.authService.requestSms(request.phone)
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  updateAccessToken(request: Empty, metadata?: Metadata): Promise<UpdateAccessTokenResponse> | Observable<UpdateAccessTokenResponse> | UpdateAccessTokenResponse {
    throw new RpcException('only for mobile clients')
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  loginClient(request: LoginClientRequest, metadata?: Metadata): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse {
    return this.authService.loginClient(request.phone, request.code, request.isRegistered)
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  loginCourier(request: LoginCourierRequest, metadata?: Metadata): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse {
    return this.authService.loginCourier(request.phone, request.code)
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  logoutClient(request: Empty, metadata?: Metadata): void {
    // todo: - replace
    this.authService.logoutClient(1)
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  logoutCourier(request: Empty, metadata?: Metadata): void {
    // todo: - replace
    this.authService.logoutClient(1)
  }

}
