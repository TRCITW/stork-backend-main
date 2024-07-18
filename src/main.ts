import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {grpcClientOptions} from "./grpc-client-options";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice(grpcClientOptions)

  app.enableCors()

  const port = process.env.PORT ?? 3000

  await app.startAllMicroservices()
  await app.listen(port, () => console.log(`Server started on port ${port}`))
}

bootstrap()
