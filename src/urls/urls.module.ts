import { ConfigModule } from '@nestjs/config';
import { Module, forwardRef } from '@nestjs/common';

import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import DynamoDBManagerModule from 'src/aws/dynamodb/dynamodb-manager.module';
import S3ManagerModule from 'src/aws/s3/s3-manager.module';

@Module({
  controllers: [UrlsController],
  exports: [UrlsService],
  imports: [
    ConfigModule,
    forwardRef(() => DynamoDBManagerModule),
    forwardRef(() => S3ManagerModule),
  ],
  providers: [UrlsService],
})
export class UrlsModule {}
