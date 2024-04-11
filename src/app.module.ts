import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { AwsSdkModule } from 'nest-aws-sdk';
import { VARIABLES } from './config/env.variables';
import S3ManagerModule from './aws/s3/s3-manager.module';
import { UrlsModule } from './urls/urls.module';
import DynamoDBManagerModule from './aws/dynamodb/dynamodb-manager.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    AwsSdkModule.forRoot({
      defaultServiceOptions: VARIABLES.AWS_DEFAULT_SERVICE_OPTIONS,
    }),
    S3ManagerModule,
    DynamoDBManagerModule,
    AuthModule,
    UrlsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
