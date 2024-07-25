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

export enum PaymentMethods {
  CARD = "CARD",
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
  isFavorite?: boolean | undefined;
  brand?: Brand | undefined;
  category?: GoodCategory | undefined;
  manufacturerCountry?: ManufacturerCountry | undefined;
  discounts: GoodDiscount[];
  /** repeated RecommendedGood recommendations = 15; */
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

export interface Client {
  id: number;
  createdAt?: Date | undefined;
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  isAllowMailing?: boolean | undefined;
  firebasePushToken?: string | undefined;
  isPushEnabled?: boolean | undefined;
  isMailingEnabled?: boolean | undefined;
  avatar?: Media | undefined;
  clientPaymentMethods: ClientPaymentMethod[];
  addresses: ClientAddress[];
}

export interface ClientAddress {
  id: number;
  createdAt?: Date | undefined;
  address?: string | undefined;
  clientId?: number | undefined;
  coordinate?: string | undefined;
  flatNum?: number | undefined;
  stage?: number | undefined;
  entrance?: number | undefined;
  comment?: string | undefined;
  isPrimary?: boolean | undefined;
  client?: Client | undefined;
}

export interface CourierDeliveryTask {
  id: number;
  createdAt?: Date | undefined;
  completedAt?: Date | undefined;
  completedAtLocationId?: number | undefined;
  courierId?: number | undefined;
  orderId?: number | undefined;
  reward?: number | undefined;
  state?: CourierDeliveryTaskStates_CourierDeliveryTaskStates | undefined;
  courier?: Courier | undefined;
}

export interface Courier {
  id: number;
  createdAt?: Date | undefined;
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  firebasePushToken?: string | undefined;
  isPushEnabled?: boolean | undefined;
  avatarId?: number | undefined;
  avatar?: Media | undefined;
}

export interface Order {
  id: number;
  createdAt?: Date | undefined;
  clientId?: number | undefined;
  totalAmount?: number | undefined;
  orderState?: OrdersStates_OrdersStates | undefined;
  packages?: number | undefined;
  weightKg?: number | undefined;
  clientAddressId?: number | undefined;
  comment?: string | undefined;
  client?: Client | undefined;
  clientAddress?: ClientAddress | undefined;
}

export interface ClientPaymentMethod {
  id: number;
  createdAt?: Date | undefined;
  type?: PaymentMethods | undefined;
  credentials?: string | undefined;
  description?: string | undefined;
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
