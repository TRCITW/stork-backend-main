import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {GrpcMethod, RpcException} from "@nestjs/microservices";
import {
  AUTH_SERVICE_NAME,
  AuthServiceController,
  LoginRequest, LoginResponse,
  RecoverPassRequest, RegisterRequest,
  RegisterResponse, RequestSmsCodeRequest, RequestSmsCodeResponse, UpdateAccessTokenResponse
} from "../proto-generated/auth";
import {Metadata} from "@grpc/grpc-js";
import {Observable} from "rxjs";
import {Empty} from "../proto-generated/google/protobuf/empty";

@Controller('auth')
export class AuthController implements AuthServiceController {

  constructor(private readonly authService: AuthService) {
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  login(request: LoginRequest, metadata?: Metadata): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse {
    throw new RpcException('unimplemented')
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  logout(request: Empty, metadata?: Metadata): void {
    throw new RpcException('unimplemented')
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  recoverPass(request: RecoverPassRequest, metadata?: Metadata): void {
    throw new RpcException('unimplemented')
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  register(request: RegisterRequest, metadata?: Metadata): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse {
    throw new RpcException('unimplemented')
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  requestSmsCode(request: RequestSmsCodeRequest, metadata?: Metadata): Promise<RequestSmsCodeResponse> | Observable<RequestSmsCodeResponse> | RequestSmsCodeResponse {
    return this.authService.requestSms(request.phone)
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  updateAccessToken(request: Empty, metadata?: Metadata): Promise<UpdateAccessTokenResponse> | Observable<UpdateAccessTokenResponse> | UpdateAccessTokenResponse {
    throw new RpcException('unimplemented')
  }

}
