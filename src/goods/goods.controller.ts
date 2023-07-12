import {Controller} from '@nestjs/common';
import {GoodsService} from './goods.service';
import {
  FetchDiscountsRequest, FetchDiscountsResponse,
  FetchGoodModelRequest,
  FetchGoodsRequest,
  FetchGoodsResponse,
  FetchRecommendedGoodsRequest, GOODS_SERVICE_NAME,
  GoodsServiceController,
  SearchGoodsRequest,
  ToggleGoodToWishlistRequest
} from "../proto-generated/goods";
import {Metadata} from "@grpc/grpc-js";
import {Good} from "../proto-generated/entity";
import {Observable} from "rxjs";
import {GrpcMethod} from "@nestjs/microservices";
import {FILTER_SERVICE_NAME} from "../proto-generated/filter";

@Controller('goods')
export class GoodsController implements GoodsServiceController {

  constructor(private readonly goodsService: GoodsService) {
  }

  @GrpcMethod(GOODS_SERVICE_NAME)
  fetchGoodModel(request: FetchGoodModelRequest, metadata?: Metadata): Promise<Good> | Observable<Good> | Good {
    return this.goodsService.fetchProductModel(request.goodId)
  }

  @GrpcMethod(GOODS_SERVICE_NAME)
  fetchGoods(request: FetchGoodsRequest, metadata?: Metadata): Promise<FetchGoodsResponse> | Observable<FetchGoodsResponse> | FetchGoodsResponse {
    return this.goodsService.fetchProducts(
        request.goodCategoryId,
        request.countryId,
        request.brandId,
        request.fetchDto?.limit,
        request.fetchDto?.offset
    )
  }

  @GrpcMethod(GOODS_SERVICE_NAME)
  fetchRecommendedGoods(request: FetchRecommendedGoodsRequest, metadata?: Metadata): Promise<FetchGoodsResponse> | Observable<FetchGoodsResponse> | FetchGoodsResponse {
    return this.goodsService.fetchRecommendedGoods(
        request.goodId,
        request.fetchDto?.limit,
        request.fetchDto?.offset
    )
  }

  @GrpcMethod(GOODS_SERVICE_NAME)
  searchGoods(request: SearchGoodsRequest, metadata?: Metadata): Promise<FetchGoodsResponse> | Observable<FetchGoodsResponse> | FetchGoodsResponse {
    return this.goodsService.searchProducts(
        request.value,
        request.fetchDto?.limit,
        request.fetchDto?.offset
    )
  }

  @GrpcMethod(GOODS_SERVICE_NAME)
  toggleGoodToWishlist(request: ToggleGoodToWishlistRequest, metadata?: Metadata): void {
    // todo: - replace to userId
    this.goodsService.toggleProductWishlist(request.goodId, 1)
  }

  @GrpcMethod(GOODS_SERVICE_NAME)
  fetchDiscounts(request: FetchDiscountsRequest, metadata?: Metadata): Promise<FetchDiscountsResponse> | Observable<FetchDiscountsResponse> | FetchDiscountsResponse {
    return this.goodsService.fetchDiscounts(request.goodId)
  }

}
