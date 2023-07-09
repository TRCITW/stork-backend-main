/* eslint-disable */

export const protobufPackage = "dto";

export interface FetchRequest {
  limit?: number | undefined;
  offset?: number | undefined;
}

export interface DeleteRequest {
  id?: number | undefined;
}

export interface DeleteMultipleRequest {
  ids: number[];
}

export interface SuccessAuthDto {
  token?: string | undefined;
}

export const DTO_PACKAGE_NAME = "dto";
