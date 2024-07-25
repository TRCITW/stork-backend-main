import {Controller} from '@nestjs/common';
import {GoodsService} from './goods.service';
import {
  FetchDiscountsRequest,
  FetchDiscountsResponse,
  FetchGoodModelRequest,
  FetchGoodsRequest,
  FetchGoodsResponse,
  FetchRecommendedGoodsRequest,
  GOODS_SERVICE_NAME,
  GoodsServiceController,
  SearchGoodsRequest,
  ToggleGoodToWishlistRequest
} from "../proto-generated/goods";
import {Metadata} from "@grpc/grpc-js";
import {Good} from "../proto-generated/entity";
import {Observable} from "rxjs";
import {GrpcMethod, RpcException} from "@nestjs/microservices";
import {FetchRequest} from "../proto-generated/dto";
import {JwtService} from "@nestjs/jwt";
import {TokenDto} from "../auth/dto/token.dto";

@Controller('goods')
export class GoodsController implements GoodsServiceController {

  constructor(private readonly goodsService: GoodsService,
              private readonly jwtService: JwtService) {
  }

  @GrpcMethod(GOODS_SERVICE_NAME)
  fetchGoodModel(request: FetchGoodModelRequest, metadata?: Metadata): Promise<Good> | Observable<Good> | Good {
    return this.serializeToken(metadata)
        .then(token => this.goodsService.fetchProductModel(token.id, request.goodId))
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
        request.goodCategoryId,
        request.fetchDto?.limit,
        request.fetchDto?.offset
    )
  }

  @GrpcMethod(GOODS_SERVICE_NAME)
  toggleGoodToWishlist(request: ToggleGoodToWishlistRequest, metadata?: Metadata): void {
    this.serializeToken(metadata)
        .then(token => this.goodsService.toggleProductWishlist(request.goodId, token.id))
  }

  @GrpcMethod(GOODS_SERVICE_NAME)
  fetchDiscounts(request: FetchDiscountsRequest, metadata?: Metadata): Promise<FetchDiscountsResponse> | Observable<FetchDiscountsResponse> | FetchDiscountsResponse {
    return this.goodsService.fetchDiscounts(request.goodId)
  }

  @GrpcMethod(GOODS_SERVICE_NAME)
  fetchFavoriteGoods(request: FetchRequest, metadata?: Metadata): Promise<FetchGoodsResponse> | Observable<FetchGoodsResponse> | FetchGoodsResponse {
    return this.serializeToken(metadata)
        .then(token => this.goodsService.fetchFavorite(token.id, request.limit, request.offset))
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
