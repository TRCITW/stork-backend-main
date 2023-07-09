/* eslint-disable */
import { wrappers } from "protobufjs";

export const protobufPackage = "entity";

export interface GoodCategory {
  id: number;
  createdAt?: Date | undefined;
  name?: string | undefined;
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

export const ENTITY_PACKAGE_NAME = "entity";

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;
