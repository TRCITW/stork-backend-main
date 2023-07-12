import {Controller} from '@nestjs/common';
import {FilterService} from './filter.service';
import {
  FetchBrandsResponse,
  FetchManufacturerCountriesResponse,
  FILTER_SERVICE_NAME,
  FilterServiceController,
  SearchManufacturerCountriesRequest
} from "../proto-generated/filter";
import {FetchRequest} from "../proto-generated/dto";
import {Metadata} from "@grpc/grpc-js";
import {Observable} from "rxjs";
import {GrpcMethod} from "@nestjs/microservices";

@Controller('filter')
export class FilterController implements FilterServiceController {

  constructor(private readonly filterService: FilterService) {
  }

  @GrpcMethod(FILTER_SERVICE_NAME)
  fetchBrands(request: FetchRequest, metadata?: Metadata): Promise<FetchBrandsResponse> | Observable<FetchBrandsResponse> | FetchBrandsResponse {
    return this.filterService.fetchBrands(request.limit, request.offset)
  }

  @GrpcMethod(FILTER_SERVICE_NAME)
  fetchManufacturerCountries(request: FetchRequest, metadata?: Metadata): Promise<FetchManufacturerCountriesResponse> | Observable<FetchManufacturerCountriesResponse> | FetchManufacturerCountriesResponse {
    return this.filterService.fetchCountries(request.limit, request.offset)
  }

  @GrpcMethod(FILTER_SERVICE_NAME)
  searchManufacturerCountries(request: SearchManufacturerCountriesRequest, metadata?: Metadata): Promise<FetchManufacturerCountriesResponse> | Observable<FetchManufacturerCountriesResponse> | FetchManufacturerCountriesResponse {
    return this.filterService.searchCountries(request.name, request.fetchDto?.limit, request.fetchDto?.offset)
  }

}
