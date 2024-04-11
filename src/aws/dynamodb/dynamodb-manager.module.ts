import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBManagerService } from './dynamodb-manager.service';
import { VARIABLES } from 'src/config/env.variables';

@Module({
  imports: [
    AwsSdkModule.forFeatures([
      {
        service: DynamoDB,
        serviceOptions: {
          endpoint: VARIABLES.DYNAMO_DB_ENDPOINT,
        },
      },
    ]),
  ],
  providers: [DynamoDBManagerService],
  exports: [DynamoDBManagerService],
})
export default class DynamoDBManagerModule {}
