import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3010 //parseInt(process.env.PORT)
      },
    },

  );

  await app.listen();
  console.log("microservice listening on port", process.env.PORT);
}
/* const app = await NestFactory.create(AppModule);
await app.listen(8001); */
bootstrap();
