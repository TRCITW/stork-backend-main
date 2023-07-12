import {Controller} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {
  CATEGORIES_SERVICE_NAME,
  CategoriesServiceController,
  FetchCategoriesResponse,
  FetchChildCategoriesRequest
} from "../proto-generated/categories";
import {Metadata} from "@grpc/grpc-js";
import {Observable} from "rxjs";
import {FetchRequest} from "../proto-generated/dto";
import {GrpcMethod} from "@nestjs/microservices";

@Controller('categories')
export class CategoriesController implements CategoriesServiceController {

  constructor(private readonly categoriesService: CategoriesService) {
  }

  @GrpcMethod(CATEGORIES_SERVICE_NAME)
  fetchChildCategories(request: FetchChildCategoriesRequest, metadata?: Metadata): Promise<FetchCategoriesResponse> | Observable<FetchCategoriesResponse> | FetchCategoriesResponse {
    return this.categoriesService.fetchChildCategories(request.parentCategoryId)
  }

  @GrpcMethod(CATEGORIES_SERVICE_NAME)
  fetchParentCategories(request: FetchRequest, metadata?: Metadata): Promise<FetchCategoriesResponse> | Observable<FetchCategoriesResponse> | FetchCategoriesResponse {
    return this.categoriesService.fetchParentsCategories()
  }


}
