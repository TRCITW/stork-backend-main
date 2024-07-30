import {Controller} from '@nestjs/common';
import {ClientsService} from './clients.service';
import {
  CLIENTS_SERVICE_NAME,
  ClientsServiceController,
  CreateAddressRequest,
  FetchClientRecommendationsResponse,
  UpdateFBMessagingTokenRequest
} from "../proto-generated/clients";
import {Metadata} from "@grpc/grpc-js";
import {Client, ClientAddress} from "../proto-generated/entity";
import {Observable} from "rxjs";
import {DeleteRequest, FetchRequest} from "../proto-generated/dto";
import {Empty} from "../proto-generated/google/protobuf/empty";
import {GrpcMethod, RpcException} from "@nestjs/microservices";
import {TokenDto} from "../auth/dto/token.dto";
import {JwtService} from "@nestjs/jwt";

@Controller('users')
export class ClientsController implements ClientsServiceController {

  constructor(private readonly clientsService: ClientsService,
              private readonly jwtService: JwtService) {
  }

  @GrpcMethod(CLIENTS_SERVICE_NAME)
  updateFirebaseMessagingToken(request: UpdateFBMessagingTokenRequest, metadata?: Metadata | undefined): void {
    this.serializeToken(metadata)
        .then(token => this.clientsService.saveFBMessagingToken(token.id, request.token))
  }

  @GrpcMethod(CLIENTS_SERVICE_NAME)
  createAddress(request: CreateAddressRequest, metadata?: Metadata): Promise<ClientAddress> | Observable<ClientAddress> | ClientAddress {
    return this.serializeToken(metadata)
        .then(token => this.clientsService.createAddress({...request, clientId: token.id}))
  }

  @GrpcMethod(CLIENTS_SERVICE_NAME)
  destroyAddress(request: DeleteRequest, metadata?: Metadata): void {
    this.clientsService.destroyAddress(request.id)
  }

  @GrpcMethod(CLIENTS_SERVICE_NAME)
  fetchClientModel(request: Empty, metadata?: Metadata): Promise<Client> | Observable<Client> | Client {
    return this.serializeToken(metadata)
        .then(token => this.clientsService.fetchClientModel(token.id))
  }

  @GrpcMethod(CLIENTS_SERVICE_NAME)
  fetchClientRecommendations(request: FetchRequest, metadata?: Metadata): Promise<FetchClientRecommendationsResponse> | Observable<FetchClientRecommendationsResponse> | FetchClientRecommendationsResponse {
    return this.serializeToken(metadata)
        .then(token => this.clientsService.fetchUserRecommendations(token.id, request.limit, request.offset))
  }

  private serializeToken<T>(metadata?: Metadata) {
    try {
      const token = metadata?.get('Authorization').at(0)
      if (token === undefined) throw new RpcException('UNAUTHORIZED')
      return this.jwtService.verifyAsync<TokenDto>(`${token}`)
    } catch (e) {
      throw new RpcException(e)
    }
  }



}
