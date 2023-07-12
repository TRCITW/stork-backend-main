/* eslint-disable */
import { wrappers } from "protobufjs";

export const protobufPackage = "entity";

export enum PushCampaignStates {
  CREATED = "CREATED",
  SUCCEED = "SUCCEED",
  FAILURE = "FAILURE",
  CANCELED = "CANCELED",
}

export enum ManagerTypes {
  CONTENT_MANAGER = "CONTENT_MANAGER",
  ADMIN = "ADMIN",
}

export enum MediaTypes {
  VIDEO = "VIDEO",
  MEDIA_IMAGE = "MEDIA_IMAGE",
}

export enum UserTypes {
  MANAGER = "MANAGER",
  CLIENT = "CLIENT",
  COURIER = "COURIER",
}

export interface GoodCategory {
  id: number;
  createdAt?: Date | undefined;
  name?: string | undefined;
  parentCategoryId?: number | undefined;
  goodsCount?: number | undefined;
  childCategoriesCount?: number | undefined;
}

export interface Good {
  id: number;
  createdAt?: Date | undefined;
  name?: string | undefined;
  description?: string | undefined;
  basePrice?: number | undefined;
  baseVolume?: number | undefined;
  volumeDimension?: string | undefined;
  brandId?: number | undefined;
  goodCategoryId?: number | undefined;
  manufacturerCountryId?: number | undefined;
  brand?: Brand | undefined;
  category?: GoodCategory | undefined;
  manufacturerCountry?: ManufacturerCountry | undefined;
  discounts: GoodDiscount[];
  recommendations: RecommendedGood[];
  media: Media[];
}

export interface Brand {
  id: number;
  createdAt?: Date | undefined;
  name?: string | undefined;
}

export interface ManufacturerCountry {
  id: number;
  createdAt?: Date | undefined;
  name?: string | undefined;
}

export interface Media {
  id: number;
  createdAt?: Date | undefined;
  description?: string | undefined;
  path?: string | undefined;
  mediaType?: MediaTypes | undefined;
  isArchived?: boolean | undefined;
}

export interface RecommendedGood {
  id: number;
  createdAt?: Date | undefined;
  goodId?: number | undefined;
  recommendedGoodId?: number | undefined;
  good?: Good | undefined;
}

export interface ClientRecommendation {
  id: number;
  createdAt?: Date | undefined;
  goodId?: number | undefined;
  clientId?: number | undefined;
  good?: Good | undefined;
}

export interface GoodDiscount {
  id: number;
  createdAt?: Date | undefined;
  discountAmount?: number | undefined;
  reason?: string | undefined;
  goodId?: number | undefined;
  isArchived?: boolean | undefined;
  good?: Good | undefined;
}

export interface CourierDeliveryTaskStates {
}

export enum CourierDeliveryTaskStates_CourierDeliveryTaskStates {
  CREATED = "CREATED",
  IN_WORK = "IN_WORK",
  SUCCEED = "SUCCEED",
  CANCELED = "CANCELED",
}

export interface OrdersStates {
}

export enum OrdersStates_OrdersStates {
  CREATED = "CREATED",
  ASSEMBLY = "ASSEMBLY",
  DELIVERY = "DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export interface CourierWorkingShiftStates {
}

export enum CourierWorkingShiftStates_CourierWorkingShiftStates {
  STARTED = "STARTED",
  COMPLETED = "COMPLETED",
  FAILURE = "FAILURE",
}

export interface AppTypes {
}

export enum AppTypes_AppTypes {
  IOS = "IOS",
  ANDROID = "ANDROID",
  ADMIN = "ADMIN",
  WEB = "WEB",
}

export const ENTITY_PACKAGE_NAME = "entity";

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;
