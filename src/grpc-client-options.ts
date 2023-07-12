import { addReflectionToGrpcConfig } from "nestjs-grpc-reflection";
import { join } from 'path';
import { GrpcOptions, Transport } from "@nestjs/microservices";

export const grpcClientOptions: GrpcOptions = addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
        loader: {
            enums: String,
        },
        package: [
            'auth', 'dto', 'entity', 'categories', 'filter', 'goods', 'users'
        ],
        url: 'localhost:60101',
        protoPath: [
            join(__dirname, '/proto/auth.proto'),
            join(__dirname, '/proto/dto.proto'),
            join(__dirname, '/proto/entity.proto'),
            join(__dirname, '/proto/filter.proto'),
            join(__dirname, '/proto/goods.proto'),
            join(__dirname, '/proto/categories.proto'),
            join(__dirname, '/proto/users.proto'),
        ],
    },
})