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
            'auth', 'catalog', 'dto', 'entity'
        ],
        url: 'localhost:60001',
        protoPath: [
            join(__dirname, '/proto/auth.proto'),
            join(__dirname, '/proto/catalog.proto'),
            join(__dirname, '/proto/dto.proto'),
            join(__dirname, '/proto/entity.proto'),
        ],
    },
})