import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { NotAcceptableException, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

 
  app.setGlobalPrefix('/api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  


  app.enableCors({
    allowedHeaders: ['authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    optionsSuccessStatus: 200,
    origin: (reqOrigin, cb) => {
      const allowedOrigins = process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',')
        : ['*'];
      if (allowedOrigins.includes(reqOrigin) || allowedOrigins.includes('*')) {
        return cb(null, reqOrigin);
      } else
        cb(
          new NotAcceptableException(
            `${reqOrigin}'ga so'rov yuborishga ruhsat yo'q`,
          ),
        );
    },
  });

  const config = new DocumentBuilder()
    .setTitle('product')
    .setDescription('product')
    .setVersion('1.0')
    .addTag('cats')
=======
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setDescription('The restaurant API description')
    .setVersion('1.0')
    .addSecurityRequirements('bearer', ['bearer'])
>>>>>>> 5e9747d52eda172d0aa1d8646a3f9f542e77c33d
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
<<<<<<< HEAD

  console.log("dbpass", process.env.DB_PASSWORD)
 
=======
  app.useGlobalPipes(new ValidationPipe());
>>>>>>> 5e9747d52eda172d0aa1d8646a3f9f542e77c33d
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
