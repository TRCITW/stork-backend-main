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
import {GrpcMethod} from "@nestjs/microservices";

@Controller('users')
export class ClientsController implements ClientsServiceController {

  constructor(private readonly clientsService: ClientsService) {
  }

  @GrpcMethod(CLIENTS_SERVICE_NAME)
  updateFirebaseMessagingToken(request: UpdateFBMessagingTokenRequest, metadata?: Metadata | undefined): void {
    // console.log(11111)
    // todo: - replace userId
    this.clientsService.saveFBMessagingToken(1, request.token)
  }

  @GrpcMethod(CLIENTS_SERVICE_NAME)
  createAddress(request: CreateAddressRequest, metadata?: Metadata): Promise<ClientAddress> | Observable<ClientAddress> | ClientAddress {
    // todo: - replace userId
    return this.clientsService.createAddress({...request, clientId: 1})
  }

  @GrpcMethod(CLIENTS_SERVICE_NAME)
  destroyAddress(request: DeleteRequest, metadata?: Metadata): void {
    this.clientsService.destroyAddress(request.id)
  }

  @GrpcMethod(CLIENTS_SERVICE_NAME)
  fetchClientModel(request: Empty, metadata?: Metadata): Promise<Client> | Observable<Client> | Client {
    // todo: - replace userId
    return this.clientsService.fetchClientModel(1)
  }

  @GrpcMethod(CLIENTS_SERVICE_NAME)
  fetchClientRecommendations(request: FetchRequest, metadata?: Metadata): Promise<FetchClientRecommendationsResponse> | Observable<FetchClientRecommendationsResponse> | FetchClientRecommendationsResponse {
    // todo: - replace userId
    return this.clientsService.fetchUserRecommendations(1, request.limit, request.offset)
  }



}
