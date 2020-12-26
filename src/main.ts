import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  
  // Connect Kafka server
  const kafka = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      }
    }
  });
  kafka.listen(() => console.log('Microservice is listening'));

  // Connect Frontend
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
